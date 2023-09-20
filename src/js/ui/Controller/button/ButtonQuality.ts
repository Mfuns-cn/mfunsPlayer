import { VideoSource } from "@/types"
import { html, render } from "lit-html"
import { SliderVertical } from "@/ui/components"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-volume">
    <div class="${classPrefix}-controller-icon-wrap">
      <div class="${classPrefix}-controller-texticon">自动</div>
    </div>

    <div class="${classPrefix}-controller-panel-wrap">
      <div class="${classPrefix}-controller-panel"></div>
    </div>
  </div>
`

const templateList = (source: VideoSource[], onClick: (source: VideoSource) => void) => html`
  <ul>
    <li></li>
  </ul>
`

export default class ButtonQuality {
  player: MfunsPlayer
  el: HTMLElement
  $iconWrap: HTMLElement
  $texticon: HTMLElement
  $panel: HTMLElement
  slider!: SliderVertical

  constructor(player: MfunsPlayer, container: HTMLElement) {
    this.player = player
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!
    this.$iconWrap = fragment.querySelector(`.${classPrefix}-controller-icon-wrap`)!
    this.$texticon = fragment.querySelector(`.${classPrefix}-controller-texticon`)!
    this.$panel = fragment.querySelector(`.${classPrefix}-controller-panel`)!
    this.init()
    container.appendChild(fragment)
  }

  private init() {
    this.player.on("change:quality_start", (quality: string) => {
      this
    })
  }
}
