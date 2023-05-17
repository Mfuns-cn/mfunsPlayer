import { html, render } from "lit-html"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-loop">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-loop"></i>
      <i class="${classPrefix}-controller-icon mp-icon-loop-off"></i>
    </div>
    <div class="${classPrefix}-tooltip">洗脑循环</div>
  </div>
`

export default class ButtonLoop {
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
    this.player.on("loop", () => {
      this.el.classList.add("state-loop")
      this.$tooltip.innerText = "关闭洗脑循环"
    })
    this.player.on("loop_off", () => {
      this.el.classList.remove("state-loop")
      this.$tooltip.innerText = "洗脑循环"
    })
    this.$iconWrap.addEventListener("click", () => {
      if (this.player.video.loop) {
        this.player.loop(false)
      } else {
        this.player.loop(true)
      }
    })
  }
}
