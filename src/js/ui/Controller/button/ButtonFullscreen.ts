import MfunsPlayer from '@/player';
import { classPrefix } from '@/const';
import { html, render } from "lit-html";

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-fullscreen">
    <i class="${classPrefix}-controller-icon mp-icon-fullscreen"></i>
    <i class="${classPrefix}-controller-icon mp-icon-fullscreen-exit"></i>
  </div>
`

export default class ButtonFullscreen {
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
    this.player.on("fullscreen", () => {
      this.el.classList.add("state-fullscreen")
    })
    this.player.on("fullscreen_exit", () => {
      this.el.classList.remove("state-fullscreen")
    })
    this.el.addEventListener("click", () => {
      if (this.player.isFullscreen) {
        this.player.exitFullscreen()
      } else {
        this.player.fullscreen()
      }
    })
  }
}
