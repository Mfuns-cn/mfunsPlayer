import { html, render } from "lit-html"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-part">
    <div class="${classPrefix}-controller-icon-wrap">
      <div class="${classPrefix}-controller-texticon">弹幕列表</div>
    </div>
    <div class="${classPrefix}-tooltip">弹幕列表</div>
  </div>
`

export default class ButtonDanmakulist {
  player: MfunsPlayer
  el: HTMLElement
  $iconWrap: HTMLElement
  $tooltip: HTMLElement
  $texticon: HTMLElement

  constructor(player: MfunsPlayer, container: HTMLElement) {
    this.player = player
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!
    this.$iconWrap = fragment.querySelector(`.${classPrefix}-controller-icon-wrap`)!
    this.$tooltip = fragment.querySelector(`.${classPrefix}-tooltip`)!
    this.$texticon = fragment.querySelector(`.${classPrefix}-controller-texticon`)!
    this.init()
    container.appendChild(fragment)
  }

  private init() {
    this.$iconWrap.addEventListener("click", () => {
      this.player.side.toggle("danmakulist")
    })
  }
}
