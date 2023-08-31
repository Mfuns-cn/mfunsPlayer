import { DanmakuMode } from "./../enum"
/** 播放器弹幕引擎 */

import { DanmakuItem } from "@/types"
import { createArray, number2Color } from "@/utils"

export type TrackType = "roll" | "reverse" | "top" | "bottom"

interface DanmakuEngineOptions {
  fontScale?: number
  fontFamily?: string
  fontWeight?: string
  speed?: number
  opacity?: number
  classPrefix?: string
  /** 颜色限制 */
  colorFilter?: boolean
  /** 获取当前时间函数 */
  getTime: () => number
}

export default class DanmakuEngine {
  /** 暂停状态 */
  public paused = false

  /** 隐藏状态 */
  public hidden = false

  /** 弹幕容器 */
  public readonly container: HTMLDivElement
  /** 弹幕字号缩放 */
  public fontScale: number
  /** 字体 */
  public fontFamily: string
  /** 字重 */
  public fontWeight: string
  /** 弹幕移动速度 */
  public speed: number
  /** 弹幕不透明度 */
  public opacity: number
  /** 基准轨道高度 */
  public baseTrackHeight: number
  /** 轨道边距 */
  public trackPadding: number
  /** 限制区域 */
  public limitArea: number
  /** 颜色屏蔽 */
  public colorFilter: boolean
  /** 类型屏蔽 */
  public typeFilter: Record<TrackType, boolean> = {
    roll: false,
    reverse: false,
    top: false,
    bottom: false,
  }
  /** 允许重叠 */
  public overlap: boolean
  /** 类名前缀 */
  public classPrefix: string
  /** 获取当前时间函数 */
  public getTime: () => number
  /** 当前时间 */
  private time = 0

  /** 弹幕池 */
  private danmakuPool: DanmakuItem[] = []
  /** 待添加弹幕索引 */
  private currentIndex = 0
  /** 文字测量上下文 */
  private measureContext: CanvasRenderingContext2D | null = null

  /** 弹幕发射位置与播放器边界的距离 */
  public startDistance = 2
  /** 时间偏移 */
  public timeOffset = 0
  /** 滚动弹幕基准速度 */
  public baseSpeed = 100
  /** 静止弹幕基准持续时间 */
  public baseDuration = 5
  /** 弹幕速度增加率k值
   * 弹幕速度 = baseSpeed * (1 + deltaSpeed * 弹幕宽度)
   */
  public deltaSpeed = 0.002

  /** 弹幕轨道高度 */
  private trackHeights: Record<TrackType, number[]> = {
    roll: [],
    reverse: [],
    top: [],
    bottom: [],
  }

  /** 弹幕轨道 */
  private danmakuTracks: Record<TrackType, HTMLElement[][]> = {
    roll: [],
    reverse: [],
    top: [],
    bottom: [],
  }

  constructor(container: HTMLDivElement, options: DanmakuEngineOptions) {
    this.container = container
    this.fontScale = options.fontScale ?? 1
    this.baseTrackHeight = 28
    this.trackPadding = 6
    this.speed = options.speed ?? 1
    this.opacity = options.opacity ?? 1
    this.limitArea = 1
    this.overlap = false
    this.fontFamily = options.fontFamily ?? "SimHei"
    this.fontWeight = options.fontWeight ?? "bold"
    this.classPrefix = options.classPrefix ?? "mfuns"
    this.colorFilter = options.colorFilter || false
    this.getTime = options.getTime

    this.container.classList.add(`${this.classPrefix}-danmaku`)
    this.checkDanmaku()
  }

  play() {
    this.paused = false
    this.container.classList.remove("state-paused")
  }

  pause() {
    this.paused = true
    this.container.classList.add("state-paused")
  }

  /** 发生跳转 */
  seek() {
    // 清屏
    this.clear()
    // 重新获取当前时间及待添加弹幕索引
    this.time = this.getTime()
    const index = this.danmakuPool.findIndex((d) => this.time <= d.time)
    this.currentIndex = index === -1 ? this.danmakuPool.length : index
  }

  /** 设置弹幕池 */
  setPool(dan: DanmakuItem[]) {
    // 直接设置弹幕池并排序
    this.danmakuPool = [...dan]
    this.danmakuPool.sort((a, b) => a.time - b.time)
    const index = this.danmakuPool.findIndex((d) => this.time <= d.time)
    this.currentIndex = index === -1 ? this.danmakuPool.length : index
  }

  /** 重置弹幕池 */
  reset() {
    this.danmakuPool = []
    this.currentIndex = 0
  }

  /** 弹幕池添加弹幕 */
  add(dan: DanmakuItem[]) {
    dan.forEach((dm) => {
      /** 按时间顺序插入弹幕 */
      const index = this.danmakuPool.findIndex((d) => dm.time <= d.time)
      this.danmakuPool.splice(index === -1 ? this.danmakuPool.length : index, 0, dm)
      // 若插入弹幕的时间小于当前时间，则待添加弹幕索引+1
      if (dm.time < this.time) this.currentIndex += 1
    })
  }

  /** 弹幕池移除符合id的弹幕 */
  remove(ids: (string | number)[]) {
    const displayed = [
      ...this.container.querySelectorAll<HTMLElement>(`.${this.classPrefix}-danmaku-item`),
    ]
    ids.forEach((id) => {
      const index = this.danmakuPool.findIndex((dm) => dm.id == id)
      if (index === -1) return
      this.danmakuPool.splice(index, 1)
      // 移除位置若小于当前待添加弹幕位置，则待添加弹幕索引-1
      if (index < this.currentIndex) this.currentIndex -= 1
      // 从DOM中移除弹幕
      const el = displayed.find((d) => d.dataset.id === id.toString())
      if (el) {
        // 此处不移除DOM是为了使弹幕顺利完成动画，以便轨道自动清除弹幕DOM
        el.innerHTML = ""
      }
    })
  }

  /** 弹幕清屏 */
  clear(type?: TrackType) {
    if (type) {
      this.danmakuTracks[type] = []
      return
    }
    this.danmakuTracks = {
      roll: [],
      reverse: [],
      top: [],
      bottom: [],
    }
    this.trackHeights = {
      roll: [],
      reverse: [],
      top: [],
      bottom: [],
    }
    this.container.innerHTML = ""
  }

  /** 检查弹幕是否需要进入弹幕池 */
  checkDanmaku() {
    if (this.danmakuPool.length && !this.paused && !this.hidden) {
      let item = this.danmakuPool[this.currentIndex]
      const dan = []
      // 刷新当前时间
      this.time = this.getTime()
      // 若待添加弹幕时间小于当前时间，则持续添加弹幕直到下一条弹幕的时间不小于当前时间为止
      while (item && item.time < this.time) {
        if (this.checkTypeFilter(item)) {
          dan.push(item)
        }
        this.currentIndex += 1
        item = this.danmakuPool[this.currentIndex]
      }
      // console.log(this.currentIndex)

      if (this.colorFilter) {
        this.draw(
          dan.filter((el) => {
            return el.color === 16777215
          })
        )
      } else {
        this.draw(dan)
      }
    }
    window.requestAnimationFrame(() => {
      this.checkDanmaku()
    })
  }

  /** 设置弹幕类型过滤 */
  setTypeFilter(type: TrackType, value: boolean) {
    this.typeFilter[type] = value
    if (!value) {
      this.container
        .querySelectorAll<HTMLElement>(`.${this.classPrefix}-danmaku-${type}`)
        .forEach((el) => {
          el.innerHTML = ""
        })
    }
  }

  /** 检查弹幕类型过滤 */
  checkTypeFilter(dm: DanmakuItem) {
    return !this.typeFilter[DanmakuMode[dm.mode] as TrackType]
  }

  /** 设置弹幕颜色过滤 */
  setColorFilter(value: boolean) {
    this.colorFilter = value
    if (!value) {
      const items = this.container.querySelectorAll<HTMLElement>(
        `.${this.classPrefix}-danmaku-item`
      )
      items.forEach((el) => {
        if (el.style.color !== "rgb(255, 255, 255)") {
          el.innerHTML = ""
        }
      })
    }
  }

  /** 绘制弹幕 */
  draw(dan: DanmakuItem[]) {
    /** 弹幕轨道高度 */
    const itemHeight = this.baseTrackHeight * this.fontScale
    /** 弹幕容器宽度 */
    const containerWidth = this.container.offsetWidth
    /** 弹幕区域高度 */
    const containerHeight = this.container.offsetHeight * this.limitArea
    /** 轨道数量 */
    const itemY = Math.floor(containerHeight / itemHeight)
    // console.log(itemY);
    if (this.trackHeights.roll.length !== itemY) {
      this.trackHeights.roll = createArray(itemY, itemHeight)
    }
    if (this.trackHeights.reverse.length !== itemY) {
      this.trackHeights.reverse = createArray(itemY, itemHeight)
    }
    if (this.trackHeights.top.length !== itemY) {
      this.trackHeights.top = createArray(itemY, itemHeight)
    }
    if (this.trackHeights.bottom.length !== itemY) {
      this.trackHeights.bottom = createArray(itemY, itemHeight)
    }
    /** 弹幕与弹幕容器右侧的距离(滚动弹幕) */
    const danItemRight = (el: HTMLElement) => {
      const containerRight = this.container.getBoundingClientRect().right
      const elRight = el.getBoundingClientRect().right
      return containerRight - elRight
    }
    /** 弹幕与弹幕容器左侧的距离(逆向弹幕) */
    const danItemLeft = (el: HTMLElement) => {
      const containerLeft = this.container.getBoundingClientRect().left
      const elLeft = el.getBoundingClientRect().left
      return elLeft - containerLeft
    }
    /** 获取弹幕速度 */
    const getSpeed = (width: number) => this.baseSpeed * (1 + this.deltaSpeed * width) * this.speed
    /** 获取单个轨道内所有弹幕 */
    const getDOMTrack = (type: string, i: number) => {
      return [
        ...this.container.querySelectorAll<HTMLElement>(`.${this.classPrefix}-danmaku-${type}`),
      ].filter((el: HTMLElement) => el.dataset.track === `${i}`)
    }
    /** 获取弹幕可进入的轨道 */
    const getTrack = (ele: HTMLElement, type: TrackType, width: number) => {
      // 对可用范围内的轨道进行一次遍历
      forTrack: for (let i = 0; this.overlap || i < itemY; i++) {
        const DOMTrack = getDOMTrack(type, i)
        /** 该轨道内的所有弹幕 */
        let track = this.danmakuTracks[type][i]
        this.danmakuTracks[type][i] = DOMTrack
        if (track && track.length) {
          // 如果该轨道存在弹幕
          if (type === "roll") {
            /** 弹幕从发射到触碰另一边边界到所需要的时间 */
            const enterTime = containerWidth / getSpeed(width)
            if (track.length !== DOMTrack.length) {
              //
              track = DOMTrack
            }
            for (const dm of track) {
              const danRight = danItemRight(dm) - 10
              this.trackHeights[type][i] = parseInt(dm.style.fontSize) + this.trackPadding
              // 如果滚动弹幕存在同一轨道碰撞的可能，则该轨道不可装填弹幕
              if (
                danRight <=
                  containerWidth - enterTime * getSpeed(dm.getBoundingClientRect().width) ||
                danRight <= 0
              ) {
                // 轨道高度设置为该条弹幕的高度
                continue forTrack
              }
            }
          } else if (type === "reverse") {
            /** 弹幕从发射到触碰另一边边界到所需要的时间 */
            const enterTime = containerWidth / getSpeed(width)
            if (track.length !== DOMTrack.length) {
              //
              track = DOMTrack
            }
            for (const dm of track) {
              const danLeft = danItemLeft(dm) - 10
              this.trackHeights[type][i] = parseInt(dm.style.fontSize) + this.trackPadding
              // 如果逆向弹幕存在同一轨道碰撞的可能，则该轨道不可装填弹幕
              if (
                danLeft <=
                  containerWidth - enterTime * getSpeed(dm.getBoundingClientRect().width) ||
                danLeft <= 0
              ) {
                continue forTrack
              }
            }
          } else {
            // 非滚动弹幕该轨道不可装填
            continue forTrack
          }
          // 轨道弹幕组遍历完毕，组内所有弹幕均完全进入容器，可以向该轨道装填弹幕
          this.danmakuTracks[type][i].push(ele)
          // 动画结束后，需从轨道弹幕组中移除该弹幕
          ele.addEventListener("animationend", () => {
            const index = this.danmakuTracks[type][i]?.indexOf(ele)
            index && this.danmakuTracks[type][i]?.splice(index, 1)
          })
          return i
        } else {
          // 如果该轨道没有弹幕，可以向该轨道装填弹幕
          if (Array.isArray(this.danmakuTracks[type][i])) {
            this.danmakuTracks[type][i].push(ele)
          } else {
            this.danmakuTracks[type][i] = [ele]
          }

          ele.addEventListener("animationend", () => {
            const index = this.danmakuTracks[type][i]?.indexOf(ele)
            index && this.danmakuTracks[type][i]?.splice(index, 1)
          })
          return i
        }
      }
      // 遍历完毕，所有轨道都不可用，返回-1
      return -1
    }

    const docFragment = document.createDocumentFragment()

    for (let i = 0; i < dan.length; i++) {
      const dm = dan[i]
      /** 忽略非普通弹幕 */
      if (dm.mode >= 7) {
        continue
      }
      /** 弹幕DOM */
      const item = document.createElement("div")
      item.classList.add(`${this.classPrefix}-danmaku-item`)
      item.classList.add(`${this.classPrefix}-danmaku-${DanmakuMode[dm.mode]}`)
      item.innerHTML = `<span>${dm.content.replace(/(\\n)/g, "\n")}</span>`
      if (typeof dm.color == "number") {
        item.style.color = number2Color(dm.color)
      } else {
        item.style.color = dm.color
      }
      item.style.opacity = this.opacity.toString()
      item.style.fontSize = +dm.size * this.fontScale + "px"
      /** 弹幕运动结束后，从DOM中移除该弹幕 */
      item.addEventListener("animationend", () => {
        if ([...this.container.children].indexOf(item) > -1) this.container.removeChild(item)
      })

      /** 弹幕内容宽度 */
      const itemWidth = this.measureTextWidth(
        dm.content,
        `${this.fontWeight} ${+dm.size * this.fontScale}px ${this.fontFamily}`
      )

      /** 轨道类型 */
      let trackType = DanmakuMode[dm.mode] as TrackType
      /** 轨道位置 */
      let track: number
      /** 轨道序号 */
      let trackIndex
      // adjust
      switch (trackType) {
        case "roll":
        case "reverse":
          // 无限弹幕模式下轨道序号可能大于itemY，可通过取余得到实际轨道位置
          trackIndex = getTrack(item, trackType, itemWidth)
          track = trackIndex % itemY
          // console.log(track);
          if (track >= 0) {
            const maxTop = this.trackHeights[trackType]
              .slice(0, itemY)
              .reduce((prev, cur) => prev + cur, 0)
            const top =
              this.trackHeights[trackType].slice(0, track).reduce((prev, cur) => prev + cur, 0) %
              maxTop
            // console.log(top, track);
            if (top + parseInt(item.style.fontSize) + this.trackPadding > containerHeight) {
              this.danmakuTracks[trackType][i]?.pop()
              return
            }
            const speed = getSpeed(itemWidth)
            const distance = itemWidth + containerWidth + this.startDistance * 2
            item.dataset.track = trackIndex.toString()
            item.style.width = itemWidth + 1 + "px"
            item.style.top = top + "px"
            item.style.fontFamily = this.fontFamily
            item.style.fontWeight = this.fontWeight
            item.style.setProperty("--duration", `${distance / speed}s`) // 持续时间
            item.style.setProperty("--offset", `${containerWidth + this.startDistance}px`) // 起始位置
            item.style.setProperty("--translateX", `${-distance}px`) // 位移距离
          }
          break
        case "top":
          track = getTrack(item, trackType, 0) % itemY
          if (track >= 0) {
            const topArr: HTMLElement[] = []
            const topDan = this.danmakuTracks.top
            for (const t of topDan) {
              topArr.push(...t)
            }
            const top = topArr
              .map((el) => {
                return parseInt(el.style.fontSize) + this.trackPadding
              })
              .slice(0, track)
              .reduce((prev, cur) => prev + cur, 0)

            if (top + parseInt(item.style.fontSize) + this.trackPadding > containerHeight) {
              this.danmakuTracks[trackType][i]?.pop()
              return
            }
            item.dataset.track = track.toString()
            item.style.width = itemWidth + 1 + "px"
            item.style.marginLeft = `-${(itemWidth + 1) * 0.5}px`
            item.style.top = top + "px"
            item.style.fontFamily = this.fontFamily
            item.style.fontWeight = this.fontWeight
            item.style.setProperty("--duration", `${this.baseDuration / this.speed}s`) // 持续时间
          }
          break
        case "bottom":
          trackType = "bottom"
          track = getTrack(item, trackType, 0) % itemY
          if (track >= 0) {
            const bottomArr: HTMLElement[] = []
            const bottomDan = this.danmakuTracks.bottom
            for (const t of bottomDan) {
              bottomArr.push(...t)
            }
            const bottom = bottomArr
              .map((el) => {
                return parseInt(el.style.fontSize) + this.trackPadding
              })
              .slice(0, track)
              .reduce((prev, cur) => prev + cur, 0)

            if (bottom + parseInt(item.style.fontSize) + this.trackPadding > containerHeight) {
              this.danmakuTracks[trackType][i]?.pop()
              return
            }
            item.dataset.track = track.toString()
            item.style.width = itemWidth + 1 + "px"
            item.style.marginLeft = `-${(itemWidth + 1) * 0.5}px`
            item.style.bottom = bottom + "px"
            item.style.fontFamily = this.fontFamily
            item.style.fontWeight = this.fontWeight
            item.style.setProperty("--duration", `${this.baseDuration / this.speed}s`) // 持续时间
          }
          break
        default:
          track = -1
          console.error(`无法处理的弹幕模式: ${dm.mode}`)
      }
      if (track >= 0) {
        item.dataset.id = dm.id.toString()
        // 添加弹幕到容器
        this.container.appendChild(item)
      }
    }
    return docFragment
  }
  /** 测量字体宽度 */
  measureTextWidth(text: string, font: string) {
    if (!this.measureContext) {
      this.measureContext = document.createElement("canvas").getContext("2d")!
    }
    this.measureContext.font = font
    return this.measureContext.measureText(text).width
  }
  /** 根据某一坐标捕获弹幕DOM */
  captureDanmakuDOM(x: number, y: number, range: number, single = false) {
    const result: HTMLElement[] = []
    // 遍历所有在屏上的弹幕
    const items = this.container.querySelectorAll<HTMLElement>(`.${this.classPrefix}-danmaku-item`)
    for (const el of items) {
      if (el.innerHTML) {
        // 获取检测边界
        const elRect = el.getBoundingClientRect()
        const containerRect = this.container.getBoundingClientRect()
        const edgeLeft = elRect.left - containerRect.left
        const edgeRight = elRect.right - containerRect.left
        const edgeTop = elRect.top - containerRect.top
        const edgeBottom = elRect.bottom - containerRect.top
        if (
          x >= edgeLeft - range &&
          x <= edgeRight + range &&
          y >= edgeTop - range &&
          y <= edgeBottom + range
        ) {
          result.push(el)
          // 如果只要求获取一个元素，则停止遍历以优化性能
          if (single) return result
        }
      }
    }
    console.log(result)
    return result
  }
  /** 根据某一坐标捕获弹幕 */
  captureDanmaku(x: number, y: number, range: number, single = false) {
    const resultDOM = this.captureDanmakuDOM(x, y, range, single)
    const result: DanmakuItem[] = []
    for (const el of resultDOM) {
      const dm = this.getDanmakuById(el.dataset.id!)
      if (dm) {
        result.push(dm)
      }
    }
    console.log(result)
    return result
  }
  /** 根据id获取弹幕 */
  getDanmakuById(id: string | number) {
    return this.danmakuPool.find((dm) => dm.id.toString() === id.toString())
  }
}
