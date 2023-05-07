import MfunsPlayer from '@/player';
import { classPrefix } from '@/const';
import { html, render } from "lit-html";

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-loop">
    <i class="${classPrefix}-controller-icon mp-icon-loop"></i>
    <i class="${classPrefix}-controller-icon mp-icon-loop-off"></i>
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
    this.player.on("loop", () => {
      this.el.classList.add("state-loop")
    })
    this.player.on("loop_off", () => {
      this.el.classList.remove("state-loop")
    })
    this.el.addEventListener("click", () => {
      if (this.player.video.el.loop) {
        this.player.video.loop(false)
        console.log("a")
      } else {
        this.player.video.loop(true)
        console.log("b")
      }
    })
  }
}
