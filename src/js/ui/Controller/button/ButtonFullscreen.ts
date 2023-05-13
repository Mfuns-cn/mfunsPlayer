import { html, render } from "lit-html"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-fullscreen">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-fullscreen"></i>
      <i class="${classPrefix}-controller-icon mp-icon-fullscreen-exit"></i>
    </div>
    <div class="${classPrefix}-tooltip">进入全屏</div>
  </div>
`

export default class ButtonFullscreen {
  player: MfunsPlayer
  el: HTMLElement
  $iconWrap: HTMLElement
  $tooltip: HTMLElement

  constructor(player: MfunsPlayer, container: HTMLElement) {
    this.player = player
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!
    this.$iconWrap = fragment.querySelector(`.${classPrefix}-controller-icon-wrap`)!
    this.$tooltip = fragment.querySelector(`.${classPrefix}-tooltip`)!
    this.init()
    container.appendChild(fragment)
  }

  private init() {
    this.player.on("fullscreen", () => {
      this.el.classList.add("state-fullscreen")
      this.$tooltip.innerText = "退出全屏"
    })
    this.player.on("fullscreen_exit", () => {
      this.el.classList.remove("state-fullscreen")
      this.$tooltip.innerText = "进入全屏"
    })
    this.$iconWrap.addEventListener("click", () => {
      if (this.player.isFullscreen) {
        this.player.exitFullscreen()
      } else {
        this.player.fullscreen()
      }
    })
  }
}
