import MfunsPlayer from '@/player';
import { classPrefix } from '@/const';
import { html, render } from "lit-html";

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-play state-paused">
    <i class="${classPrefix}-controller-icon mp-icon-play"></i>
    <i class="${classPrefix}-controller-icon mp-icon-pause"></i>
  </div>
`

export default class ButtonPlay {
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
    this.player.on("pause", () => {
      this.el.classList.add("state-paused")
    })
    this.player.on("play", () => {
      this.el.classList.remove("state-paused")
    })
    this.el.addEventListener("click", () => {
      if (this.player.isPaused) {
        this.player.play()
      } else {
        this.player.pause()
      }
    })
  }
}
