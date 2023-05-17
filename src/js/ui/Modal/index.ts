import { html, render } from "lit-html"
import { classPrefix } from "@/const"
import MfunsPlayer from "@/player"
import { PlayerOptions } from "@/types"
import ModalAbout from "./ModalAbout"
import ModalHotkey from "./ModalHotkey"

const template = () => html`
  <div class="${classPrefix}-modal-mask"></div>
  <div class="${classPrefix}-modal">
    <div class="${classPrefix}-modal-head">
      <div class="${classPrefix}-modal-title"></div>
      <div class="${classPrefix}-modal-close">
        <i class="${classPrefix}-controller-icon mp-icon-close"></i>
      </div>
    </div>
    <div class="${classPrefix}-modal-content"></div>
  </div>
`

export interface ModalPanel {
  title: string
  el: HTMLElement
}

export default class Modal {
  player: MfunsPlayer
  container: HTMLElement
  el: HTMLElement
  $mask: HTMLElement
  $content: HTMLElement
  $title: HTMLElement
  $close: HTMLElement
  list: { [key: string]: ModalPanel } = {}
  current = ""
  get isShow(): boolean {
    return this.container.classList.contains("state-show")
  }

  constructor(player: MfunsPlayer, options: PlayerOptions) {
    this.player = player
    this.container = player.template.$modalWrap
    render(template(), this.container)
    this.el = this.container.querySelector(`.${classPrefix}-modal`)!
    this.$mask = this.container.querySelector(`.${classPrefix}-modal-mask`)!
    this.$content = this.el.querySelector(`.${classPrefix}-modal-content`)!
    this.$title = this.el.querySelector(`.${classPrefix}-modal-title`)!
    this.$close = this.el.querySelector(`.${classPrefix}-modal-close`)!

    this.init(options)
  }

  private init(options: PlayerOptions) {
    this.$mask.addEventListener("click", () => {
      this.hide()
    })
    this.$close.addEventListener("click", () => {
      this.hide()
    })
    this.add("about", new ModalAbout())
    this.add("hotkey", new ModalHotkey())
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

  add(id: string, panel: ModalPanel) {
    this.list[id] = panel
    this.$content.append(panel.el)
  }

  private removeCurrent() {
    const panel = this.list[this.current]
    if (panel) panel.el.classList.remove("state-show")
    this.$title.innerText = ""
    this.current = ""
  }
}
