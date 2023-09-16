import { html, render } from "lit-html"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-danmaku-switch state-on">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-danmaku"></i>
      <i class="${classPrefix}-controller-icon mp-icon-danmaku-off"></i>
    </div>
    <div class="${classPrefix}-tooltip">关闭弹幕</div>
  </div>
`

export default class ButtonDanmakuSwitch {
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
    this.player.on("danmaku:off", () => {
      this.el.classList.remove("state-on")
      this.$tooltip.innerText = "开启弹幕"
    })
    this.player.on("danmaku:on", () => {
      this.el.classList.add("state-on")
      this.$tooltip.innerText = "关闭弹幕"
    })
    this.$iconWrap.addEventListener("click", () => {
      this.player.danmaku.toggle()
    })
  }
}
