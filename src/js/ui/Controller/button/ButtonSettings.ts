import { html, render } from "lit-html"
import { SliderVertical } from "@/ui/components"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-settings">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-settings"></i>
    </div>
    <div class="${classPrefix}-controller-panel-wrap">
      <div class="${classPrefix}-controller-panel ${classPrefix}-controller-panel-settings"></div>
    </div>
  </div>
`

export default class ButtonSettings {
  player: MfunsPlayer
  el: HTMLElement
  $iconWrap: HTMLElement

  constructor(player: MfunsPlayer, container: HTMLElement) {
    this.player = player
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!
    this.$iconWrap = fragment.querySelector(`.${classPrefix}-controller-icon-wrap`)!
    this.init()
    container.appendChild(fragment)
  }

  private init() {
    this.$iconWrap.addEventListener("click", () => {
      this.player.side.toggle("settings")
    })
  }
}
