import MfunsPlayer from '@/player';
import { classPrefix } from '@/const';
import { html, render } from "lit-html";

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-play state-paused">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-play"></i>
      <i class="${classPrefix}-controller-icon mp-icon-pause"></i>
    </div>
    <div class="${classPrefix}-tooltip">播放</div>
  </div>
`

export default class ButtonPlay {
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
    this.player.on("pause", () => {
      this.el.classList.add("state-paused")
      this.$tooltip.innerText = "播放"
    })
    this.player.on("play", () => {
      this.el.classList.remove("state-paused")
      this.$tooltip.innerText = "暂停"
    })
    this.$iconWrap.addEventListener("click", () => {
      this.player.toggle()
    })
  }
}
