import { DanmakuMode } from "@/enum"
import { PlayerOptions, DanmakuApiOptions, DanmakuItem, DanmakuSource } from "@/types"
import MfunsPlayer from "@/player"
import DanmakuEngine from "./DanmakuEngine"
import { html, render } from "lit-html"
import { classPrefix } from "@/const"
import DanmakuParser from "./DanmakuParser"
import DanmakuOperate from "./DanmakuOperate"

const template = html` <div class="${classPrefix}-row-danmaku-container"></div> `

/** 弹幕模块 */
export default class Danmaku {
  /** 弹幕引擎，用于弹幕绘制 */
  engine: DanmakuEngine

  /** 弹幕格式转换 */
  parser: DanmakuParser

  /** 弹幕api */
  api?: DanmakuApiOptions

  /** 弹幕操作 */
  operate: DanmakuOperate

  /** 最新一条弹幕的id */
  lastDanmakuId: string | number = 0

  /** 允许获取实时新增弹幕 */
  allowNewDanmaku: boolean

  /** 弹幕池 */
  list: DanmakuItem[] = []

  player: MfunsPlayer

  el: HTMLElement
  $rowDanmakuContainer: HTMLDivElement

  constructor(player: MfunsPlayer, options: PlayerOptions) {
    this.player = player
    this.parser = new DanmakuParser({ defaultParser: "mfuns" })
    this.operate = new DanmakuOperate(this)
    this.el = this.player.template.$danmakuWrap
    this.api = options.danmaku?.api
    this.allowNewDanmaku = false
    render(template, this.el)
    this.$rowDanmakuContainer = this.el.querySelector(`.${classPrefix}-row-danmaku-container`)!
    this.engine = new DanmakuEngine(this.$rowDanmakuContainer, {
      fontScale: 1,
      fontFamily: "SimHei",
      fontWeight: "bold",
      speed: 1,
      opacity: 1,
      classPrefix: classPrefix,
      /** 颜色限制 */
      colorFilter: false,
      getTime: () => this.player.getTime(),
    })
    this.player.on("play", () => {
      this.engine.play()
    })
    this.player.on("pause", () => {
      this.engine.pause()
    })
    this.player.on("seeking", () => {
      this.engine.pause()
      this.engine.seek()
    })
    this.player.on("seeked", () => {
      this.player.paused || this.engine.play()
    })
    this.player.on("part_change", (p) => {
      const { danmakuId, danmakuAddition } = this.player.video.list[p - 1]
      this.reload(danmakuId, danmakuAddition)
    })
  }

  /** 加载附加弹幕 */
  loadAddition({ url, type, data }: DanmakuSource) {
    fetch(url)
      .then((response) => {
        if (/-xml$/.test(type)) {
          return response.text()
        } else {
          return response.json()
        }
      })
      .then((res) => {
        const danmakuData = data ? data(res) : res
        const dan = this.parser.parse({ data: danmakuData, type })
        dan && this.add(dan)
        this.player.events.trigger("danmaku:load_addition_end", url, dan || [])
      })
      .catch((err) => {
        this.player.events.trigger("danmaku:load_addition_fail", url, err)
        console.error(err)
      })
  }

  /** 加载弹幕 */
  private load(id: string | number) {
    const api = this.api
    api
      ?.get({ api: api.url, id })
      .then((data) => {
        const dan = this.parser.parse({ data, type: api.type })
        if (dan) {
          this.add(dan)
          this.lastDanmakuId = dan[dan.length - 1].id
        }
        this.player.events.trigger("danmaku:load_end", dan || [])
      })
      .catch((err) => {
        this.player.events.trigger("danmaku:load_fail", err)
      })
  }

  /** 加载实时新增弹幕 */
  loadNew(id: string | number) {
    const offset = this.lastDanmakuId
    this.player.events.trigger("danmaku:load_new_start", offset)
    const api = this.api
    api
      ?.get({ api: api.url, id, offset: this.lastDanmakuId })
      .then((data) => {
        const dan = this.parser.parse({ data, type: api.type })
        if (dan) {
          this.add(dan)
          this.lastDanmakuId = dan[dan.length - 1].id
        }
        this.player.events.trigger("danmaku:load_new_end", offset, dan || [])
      })
      .catch((err) => {
        this.player.events.trigger("danmaku:load_new_fail", offset, err)
      })
  }

  /** 重载弹幕 */
  public async reload(id?: string | number, addition?: DanmakuSource[]) {
    this.player.events.trigger("danmaku:load_start")
    // 清空弹幕池
    this.engine.reset()
    id && this.load(id)
    addition?.forEach((ad) => {
      this.loadAddition(ad)
    })
  }

  /**
   * 添加弹幕到弹幕池
   * @param dan 要添加的弹幕
   * */
  add(dan: DanmakuItem[]) {
    const basicDanmaku: DanmakuItem[] = []
    const advancedDanmaku: Record<number, DanmakuItem[]> = {}
    dan.forEach((dm) => {
      if (dm.mode < 7) {
        basicDanmaku.push(dm)
      } else {
        if (advancedDanmaku[dm.mode]) {
          advancedDanmaku[dm.mode].push(dm)
        } else {
          advancedDanmaku[dm.mode] = [dm]
        }
      }
    })
    basicDanmaku.length && this.engine.add(basicDanmaku)
    for (const mode in advancedDanmaku) {
      this.player.events.trigger("danmaku:advanced", parseInt(mode), advancedDanmaku[mode])
    }
  }

  /**
   * 根据id从弹幕池中移除弹幕
   * @param ids 要移除的弹幕id
   * */
  remove(ids: (string | number)[]) {
    this.engine.remove(ids)
  }

  /** 清空弹幕池 */
  clear() {
    this.engine.clear()
  }

  /** 显示弹幕 */
  show() {
    this.engine.show()
    this.player.events.trigger("danmaku:on")
  }

  /** 隐藏弹幕 */
  hide() {
    this.engine.hide()
    this.player.events.trigger("danmaku:off")
  }

  /** 切换弹幕显示 */
  toggle() {
    if (this.engine.hidden) {
      this.show()
    } else {
      this.hide()
    }
  }

  // 弹幕屏蔽

  /**
   * 弹幕类型屏蔽
   * @param type 类型
   * @param flag 设置是否屏蔽
   */
  filter(type: string, flag: boolean) {
    switch (type) {
      case "roll":
        this.engine.setTrackFilter("roll", flag)
        this.engine.setTrackFilter("reverse", flag)
        break
      case "top":
      case "bottom":
        this.engine.setTrackFilter(type, flag)
        break
      case "color":
        this.engine.setColorFilter(flag)
        break
    }
    this.player.events.trigger("danmaku:filter", type, flag)
  }

  // 其他设置

  /** 设置弹幕不透明度 */
  setOpacity(value: number, save?: boolean) {
    this.engine.opacity = value
    this.player.events.trigger("setting:danmaku", "opacity", value, save)
  }
  /** 设置弹幕速度 */
  setSpeed(value: number, save?: boolean) {
    this.engine.speed = value
    this.player.events.trigger("setting:danmaku", "speed", value, save)
  }
  /** 设置弹幕区域 */
  setArea(value: number, save?: boolean) {
    this.engine.limitArea = value || Infinity
    this.player.events.trigger("setting:danmaku", "area", value, save)
  }
  /** 设置弹幕大小 */
  setSize(value: number, save?: boolean) {
    this.engine.fontScale = value
    this.player.events.trigger("setting:danmaku", "size", value, save)
  }
  /** 设置弹幕字体 */
  setFont(value: string, save?: boolean) {
    this.engine.fontFamily = value
    this.player.events.trigger("setting:danmaku", "font", value, save)
  }
  /** 设置弹幕加粗 */
  setBold(value: boolean, save?: boolean) {
    this.engine.fontWeight = value ? "bold" : ""
    this.player.events.trigger("setting:danmaku", "bold", value, save)
  }
}
