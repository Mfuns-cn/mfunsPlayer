import { html, render } from "lit-html"
import { classPrefix } from "@/const"
import MfunsPlayer from "@/player"
import { PlayerOptions } from "@/types"

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
}

export default class Side {
  player: MfunsPlayer
  container: HTMLElement
  el: HTMLElement
  $mask: HTMLElement
  $content: HTMLElement
  $title: HTMLElement
  $close: HTMLElement
  list: { [key: string]: SidePanel } = {}
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

    this.init(options)
  }

  private init(options: PlayerOptions) {
    this.$mask.addEventListener("click", () => {
      this.hide()
    })
    this.$close.addEventListener("click", () => {
      this.hide()
    })
  }

  show(id: string) {
    if (id != this.current) {
      const panel = this.list[id]
      if (panel) {
        this.removeCurrent()
        this.current = id
        this.$title.innerText = panel.title
        panel.el.classList.add("state-show")
      }
    }
    this.container.classList.add("state-show")
  }

  toggle(id: string) {
    if (id == this.current && this.isShow) {
      this.hide()
    } else {
      this.show(id)
    }
  }

  hide() {
    this.container.classList.remove("state-show")
  }

  add(id: string, panel: SidePanel) {
    this.list[id] = panel
    this.$content.append(panel.el)
  }

  mount(container: HTMLElement | null) {
    ;(container || this.el).append(this.$content)
  }

  mountPanel(id: string, container: HTMLElement | null) {
    const panel = this.list[id]
    if (panel) {
      ;(container || this.$content).append(panel.el)
      panel.el.classList.remove("state-show")
    }
    if (id == this.current) {
      this.removeCurrent()
    }
  }

  private removeCurrent() {
    const panel = this.list[this.current]
    if (panel) panel.el.classList.remove("state-show")
    this.$title.innerText = ""
    this.current = ""
  }
}
