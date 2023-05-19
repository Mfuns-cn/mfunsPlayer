import { html, render } from "lit-html"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-webfull">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-webfull"></i>
      <i class="${classPrefix}-controller-icon mp-icon-webfull-exit"></i>
    </div>
    <div class="${classPrefix}-tooltip">网页全屏</div>
  </div>
`

export default class ButtonWebfull {
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
    this.player.on("webfull", () => {
      this.el.classList.add("state-webfull")
      this.$tooltip.innerText = "退出网页全屏"
    })
    this.player.on("webfull_exit", () => {
      this.el.classList.remove("state-webfull")
      this.$tooltip.innerText = "网页全屏"
    })
    this.$iconWrap.addEventListener("click", () => {
      if (this.player.isWebfull) {
        this.player.exitWebfull()
      } else {
        this.player.webfull()
      }
    })
  }
}
