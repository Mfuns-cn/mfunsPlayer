import { html, render } from "lit-html"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-prev">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-prev"></i>
    </div>
    <div class="${classPrefix}-tooltip">上一P</div>
  </div>
`

export default class ButtonPrev {
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
    this.player.on("part_change", (p) => {
      if (p > 1) {
        this.el.classList.remove("state-firstpart")
      } else {
        this.el.classList.add("state-firstpart")
      }
    })
    this.$iconWrap.addEventListener("click", () => {
      this.player.prev()
    })
  }
  public show(flag: boolean) {
    this.el.style.display = flag ? "" : "none"
  }
}
