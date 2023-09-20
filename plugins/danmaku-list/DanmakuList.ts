import { secondToTime } from "@/utils"
import { dateFormat } from "@/utils/index"
import { DanmakuItem, PlayerPlugin } from "@/types"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"
import { html, render } from "lit-html"
import { VirtualList } from "./VirtualList"

const template = (sort: { time: () => void; content: () => void; date: () => void }) => html`
  <div class="${classPrefix}-side-panel ${classPrefix}-danmaku-list">
    <div class="${classPrefix}-danmaku-list-main">
      <div class="${classPrefix}-danmaku-list-head">
        <div class="list-column col-time" @click=${sort.time}>时间</div>
        <div class="list-column col-content" @click=${sort.content}>弹幕内容</div>
        <div class="list-column col-date" @click=${sort.date}>发送时间</div>
      </div>
      <div class="${classPrefix}-danmaku-list-container">
        <div class="${classPrefix}-danmaku-list-list"></div>
      </div>
      <div class="${classPrefix}-danmaku-list-status">
        <div class="status-loading-text">弹幕列表装填中……</div>
        <div class="status-failed-text">弹幕加载失败 X_X</div>
        <div class="status-empty-text">还没有弹幕哦，快来发弹幕^_^</div>
      </div>
    </div>
    <div class="${classPrefix}-danmaku-auxiliary-foot"></div>
  </div>
`

const getDanmakuListItem = (
  danmaku: DanmakuItem,
  index: number,
  operation: (dm: DanmakuItem) => [string, (dm: DanmakuItem) => void, unknown][]
) => {
  const t = html`
    <div class="list-row" data-index="${index}" data-mode="${danmaku.mode}">
      <div class="list-cell col-time">${secondToTime(danmaku.time)}</div>
      <div class="list-cell col-content">${danmaku.content}</div>
      <div class="list-cell col-date">
        ${danmaku.date ? dateFormat(new Date(danmaku.date * 1000), "yy-MM-dd HH:mm") : "-"}
      </div>
      ${operation.length
        ? html` <div class="list-operate">
            ${operation(danmaku).map(
              ([label, onClick]) => html`<div
                class="list-operate-btn"
                @click=${() => {
                  onClick(danmaku)
                }}
              >
                ${label}
              </div>`
            )}
          </div>`
        : ""}
    </div>
  `
  const fragment = new DocumentFragment()
  render(t, fragment)
  return fragment.firstElementChild! as HTMLElement
}

export default class DanmakuList {
  player: MfunsPlayer
  el: HTMLElement
  data: DanmakuItem[] = []
  sortedBy: keyof DanmakuItem = "time"
  sortOrder = 1 | -1

  list!: VirtualList<DanmakuItem>
  /** 是否随播放自动滚动 */
  autoScroll = true
  /** 是否挂载到播放器外部 */
  mounted = false

  $container: HTMLElement
  $status: HTMLElement
  $colTime: HTMLElement
  $colDate: HTMLElement
  $colContent: HTMLElement

  constructor(player: MfunsPlayer) {
    this.player = player
    const fragment = new DocumentFragment()
    render(template({ time: () => {}, content: () => {}, date: () => {} }), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-danmaku-list`)!
    this.$container = fragment.querySelector(`.${classPrefix}-danmaku-list-container`)!
    this.$status = fragment.querySelector(`.${classPrefix}-danmaku-list-status`)!
    this.$colTime = fragment.querySelector(".col-time")!
    this.$colDate = fragment.querySelector(".col-date")!
    this.$colContent = fragment.querySelector(".col-content")!

    this.$colTime.onclick = () => {
      this.setAutoScroll(false)
      if (this.sortedBy == "time") {
        this.sort("time", -this.sortOrder)
      } else {
        this.sort("time", 1)
      }
    }
    this.$colDate.onclick = () => {
      this.setAutoScroll(false)
      if (this.sortedBy == "date") {
        this.sort("date", -this.sortOrder)
      } else {
        this.sort("date", 1)
      }
    }
  }
  init() {
    const api = this.player.danmaku.api
    const operate = this.player.danmaku.operate
    this.list = new VirtualList({
      el: this.$container,
      getData: () => {
        return this.data
      },
      itemHeight: 24,
      createItem: (danmaku, i) =>
        getDanmakuListItem(danmaku, i, (dm) => {
          const myDanmaku = dm.user == this.player.userId
          return [
            [
              "举报",
              (dm: DanmakuItem) => {
                operate.report(dm)
              },
              !myDanmaku && api?.report,
            ],
            [
              "屏蔽",
              (dm: DanmakuItem) => {
                operate.blockUser(dm.user, true)
              },
              !myDanmaku && api?.blockUser,
            ],
            [
              "撤回",
              (dm: DanmakuItem) => {
                operate.recall(dm)
              },
              myDanmaku && api?.recall,
            ],
          ].filter((v) => v[2]) as [string, (dm: DanmakuItem) => void, unknown][]
        }),
      overflow: 5,
    })

    this.list.el.addEventListener("wheel", () => {
      this.setAutoScroll(false)
    })
    this.list.el.addEventListener("mousedown", () => {
      this.setAutoScroll(false)
    })
    this.setAutoScroll(this.autoScroll)

    // 切换到新分P时，清空上一P弹幕
    this.player.on("part", () => {
      this.clear()
    })
    this.player.on("danmaku:load_end", (dan) => {
      this.fill(dan)
    })
    this.player.on("danmaku:load_addition_end", (url, dan) => {
      this.fill(dan)
    })
    this.player.on("timeupdate", (time) => {
      if (this.autoScroll) {
        this.locateByTime(time)
      }
    })
  }
  /** 弹幕列表排序 */
  sort(sortedBy: keyof DanmakuItem, sortOrder = 1) {
    this.sortedBy = sortedBy
    this.sortOrder = sortOrder
    this.data.sort((a, b) => {
      const at = a[this.sortedBy]
      const bt = b[this.sortedBy]
      // 排序
      return at > bt ? sortOrder : at == bt ? 0 : -sortOrder
    })
    this.list.reload()
  }
  /** 装填弹幕(重载列表) */
  fill(dan: DanmakuItem[]) {
    this.data = this.data.concat(dan)
    // 弹幕列表装填
    if (!this.data.length) {
      this.setStatus("empty")
    } else {
      this.reload()
      this.setStatus()
    }
  }
  /** 添加弹幕(不重载列表) */
  add(dan: DanmakuItem[]) {
    this.data = this.data.concat(dan)
    // 弹幕列表装填
    if (!this.data.length) {
      this.setStatus("empty")
    } else {
      this.list.update()
      this.setStatus()
    }
  }
  /** 重载弹幕列表 */
  reload() {
    this.sort(this.sortedBy, this.sortOrder)
    if (this.autoScroll) {
      this.locateByTime(this.player.time)
    }
  }
  clear() {
    // 清空弹幕列表
    this.list.clear()
    this.data = []
    this.setStatus("loading")
  }
  setStatus(status = "") {
    this.$status.dataset.status = status
    console.log("弹幕加载状态" + status)
  }
  /** 根据播放时间定位 */
  locateByTime(time: number) {
    let viewEnd = this.list.viewEnd
    if (this.data[viewEnd]?.time > time) {
      // 如果列表可视区域最后一项的时间超过当前时间, 则重头开始遍历, 否则从列表可视区域最后一项遍历
      viewEnd = 0
    }
    while (this.data[viewEnd + 1]?.time <= time) {
      // 遍历并检测下一项弹幕时间是否超过当前时间, 若超过, 则以当前弹幕为定位点
      viewEnd++
    }
    this.list.locateEnd(viewEnd)
  }
  setAutoScroll(flag: boolean) {
    // 设置自动滚动
    this.autoScroll = flag
    if (flag) {
      this.sort("time")
      this.locateByTime(this.player.time)
    }
  }
}
