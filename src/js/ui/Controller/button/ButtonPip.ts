import MfunsPlayer from '@/player';
import { classPrefix } from '@/const';
import { html, render } from "lit-html";

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-pip">
    <i class="${classPrefix}-controller-icon mp-icon-pip"></i>
    <i class="${classPrefix}-controller-icon mp-icon-pip-exit"></i>
  </div>
`

export default class ButtonPip {
  player: MfunsPlayer
  el: HTMLElement
  constructor(player: MfunsPlayer, container: HTMLElement) {
    this.player = player
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!
    this.init()
    container.appendChild(fragment)
  }
  private init() {
    this.player.on("pip", () => {
      this.el.classList.add("state-pip")
    })
    this.player.on("pip_exit", () => {
      this.el.classList.remove("state-pip")
    })
    this.el.addEventListener("click", () => {
      if (this.player.isPip) {
        this.player.exitPip()
      } else {
        this.player.pip()
      }
    })
  }
}
