import MfunsPlayer from '@/player';
import { classPrefix } from '@/const';
import { html, render } from "lit-html";

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-pip">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-pip"></i>
      <i class="${classPrefix}-controller-icon mp-icon-pip-exit"></i>
    </div>
    <div class="${classPrefix}-tooltip">画中画</div>
  </div>
`

export default class ButtonPip {
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
    this.player.on("pip", () => {
      this.el.classList.add("state-pip")
      this.$tooltip.innerText = "退出画中画"
    })
    this.player.on("pip_exit", () => {
      this.el.classList.remove("state-pip")
      this.$tooltip.innerText = "画中画"
    })
    this.$iconWrap.addEventListener("click", () => {
      if (this.player.isPip) {
        this.player.exitPip()
      } else {
        this.player.pip()
      }
    })
  }
}
