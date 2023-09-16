import { html, render } from "lit-html"
import { classPrefix } from "@/const"
import MfunsPlayer from "@/player"
import { PlayerOptions } from "@/types"
import SidePartList from "./SidePartList"
import SideDanmakuList from "./SideDanmakuList"

const template = () => html`
  <div class="${classPrefix}-side-mask"></div>
  <div class="${classPrefix}-side">
    <div class="${classPrefix}-side-head">
      <div class="${classPrefix}-side-title"></div>
      <div class="${classPrefix}-side-close">
        <i class="${classPrefix}-controller-icon mp-icon-close"></i>
      </div>
    </div>
    <div class="${classPrefix}-side-content"></div>
  </div>
`

export interface SidePanel {
  title: string
  el: HTMLElement
  mounted: boolean
}

export default class Side {
  player: MfunsPlayer
  container: HTMLElement
  el: HTMLElement
  $mask: HTMLElement
  $content: HTMLElement
  $title: HTMLElement
  $close: HTMLElement
  list: Record<string, SidePanel> = {}
  current = ""
  get isShow(): boolean {
    return this.container.classList.contains("state-show")
  }

  constructor(player: MfunsPlayer, options: PlayerOptions) {
    this.player = player
    this.container = player.template.$sideWrap
    render(template(), this.container)
    this.el = this.container.querySelector(`.${classPrefix}-side`)!
    this.$mask = this.container.querySelector(`.${classPrefix}-side-mask`)!
    this.$content = this.el.querySelector(`.${classPrefix}-side-content`)!
    this.$title = this.el.querySelector(`.${classPrefix}-side-title`)!
    this.$close = this.el.querySelector(`.${classPrefix}-side-close`)!

    // --- 事件 --- //
    this.$mask.addEventListener("click", () => {
      this.hide()
    })
    this.$close.addEventListener("click", () => {
      this.hide()
    })

    // --- 预装功能 --- //
    this.add("partlist", new SidePartList(this.player))
    this.add("danmakulist", new SideDanmakuList(this.player))
  }

  /** 显示特定侧边面板 */
  show(id: string) {
    const panel = this.list[id]
    if (panel && !panel.mounted) {
      if (id != this.current) {
        this.removeCurrent()
        this.current = id
        this.$title.innerText = panel.title
        panel.el.classList.add("state-show")
        this.player.events.trigger("side:show", id)
      }
      this.container.classList.add("state-show")
    } else {
      this.hide()
    }
    if (panel.mounted) {
      this.player.events.trigger("side:show_mounted", id)
    }
  }

  /** 切换面板状态 */
  toggle(id: string) {
    if (id == this.current && this.isShow) {
      this.hide()
    } else {
      this.show(id)
    }
  }

  /** 隐藏侧边面板 */
  hide() {
    this.container.classList.remove("state-show")
  }
  /** 添加面板 */
  add(id: string, panel: SidePanel) {
    this.list[id] = panel
    this.$content.append(panel.el)
  }

  mount(container: HTMLElement | null) {
    ;(container || this.el).append(this.$content)
  }

  /** 侧边面板挂载到其他元素 */
  mountPanel(id: string, container?: HTMLElement) {
    const panel = this.list[id]
    if (panel) {
      ;(container || this.$content).append(panel.el)
      panel.el.classList.remove("state-show")
      if (container) {
        panel.mounted = true
      } else {
        panel.mounted = false
      }
    }
    if (id == this.current) {
      this.removeCurrent()
    }
  }

  /** 清除当前面板显示 */
  private removeCurrent() {
    const panel = this.list[this.current]
    if (panel) panel.el.classList.remove("state-show")
    this.player.events.trigger("side:hide", this.current)
    this.$title.innerText = ""
    this.current = ""
  }
}
