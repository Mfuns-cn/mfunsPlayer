import { DanmakuMode } from "@/enum"
import { PlayerOptions } from "@/types"
import MfunsPlayer from "@/player"
import { DanmakuItem, DanmakuSource } from "../types"
import DanmakuEngine from "./DanmakuEngine"
import { html, render } from "lit-html"
import { classPrefix } from "@/const"
import DanmakuParser from "./DanmakuParser"

const template = html` <div class="${classPrefix}-row-danmaku-container"></div> `

/** 弹幕模块 */
export default class Danmaku {
  /** 弹幕引擎，用于弹幕绘制 */
  engine: DanmakuEngine

  /** 弹幕格式转换 */
  parser: DanmakuParser

  /** 弹幕api */
  api: {
    url: string
    type: string
    /** 获取弹幕 */
    get: (arg: {
      api: string
      id: string | number
      offset?: string | number
      limit?: number
    }) => Promise<unknown>
    /** 发送弹幕 */
    send: (id: string, danmaku: DanmakuItem) => Promise<{ code: number; message: string }>
  }

  /** 最新一条弹幕的id */
  lastDanmakuId: string | number = 0

  /** 允许获取实时新增弹幕 */
  allowNewDanmaku: boolean

  /** 弹幕池 */
  list: DanmakuItem[] = []

  player: MfunsPlayer

  el: HTMLElement
  $rowDanmakuContainer: HTMLDivElement

  constructor(player: MfunsPlayer, option: PlayerOptions) {
    this.player = player
    this.parser = new DanmakuParser({ defaultParser: "mfuns" })
    this.el = this.player.template.$danmakuWrap
    this.api = option.danmaku.api
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
    this.player.on("seek", () => {
      this.engine.seek()
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
        this.player.events.trigger("danmaku:load_addition_end")
      })
      .catch((err) => {
        this.player.events.trigger("danmaku:load_addition_fail")
        console.error(err)
      })
  }

  /** 加载弹幕 */
  private load(id: string | number) {
    const api = this.api
    api
      .get({ api: api.url, id })
      .then((data) => {
        const dan = this.parser.parse({ data, type: api.type })
        if (dan) {
          this.add(dan)
          this.lastDanmakuId = dan[dan.length - 1].id
        }
        this.player.events.trigger("danmaku:load_end")
      })
      .catch((err) => {
        this.player.events.trigger("danmaku:load_fail")
      })
  }

  /** 加载实时新增弹幕 */
  loadNew(id: string | number) {
    this.player.events.trigger("danmaku:load_new_start")
    const api = this.api
    api
      .get({ api: api.url, id, offset: this.lastDanmakuId })
      .then((data) => {
        const dan = this.parser.parse({ data, type: api.type })
        if (dan) {
          this.add(dan)
          this.lastDanmakuId = dan[dan.length - 1].id
        }
        this.player.events.trigger("danmaku:load_new_end")
      })
      .catch((err) => {
        this.player.events.trigger("danmaku:load_new_fail")
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

  /** 添加弹幕到弹幕池 */
  add(dmlist: DanmakuItem[]) {
    const basicDanmaku: DanmakuItem[] = []
    const advancedDanmaku: Record<number, DanmakuItem[]> = {}
    dmlist.forEach((dm) => {
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
      this.player.events.trigger("danmaku:advanced_detected", parseInt(mode), advancedDanmaku[mode])
    }
  }

  /** 根据id从弹幕池中移除弹幕 */
  remove(ids: (string | number)[]) {
    this.engine.remove(ids)
  }

  /** 清空弹幕池 */
  clear() {
    this.engine.clear()
  }

  /** 弹幕类型屏蔽 */
  blockType(list: string[]) {}

  /** 弹幕来源屏蔽 */
  blockSource(list: string[]) {}
}

/** 支持下列事件
 *
 */
