import { html, render } from "lit-html"
import { classPrefix } from "@/const"
import Player from "@/player"
import { PlayerOptions } from "@/types"
import ProgressBar from "./ProgressBar"
import { fullScreenEnabled, pictureInPictureEnabled } from "@/utils"
import ButtonFullscreen from "./button/ButtonFullscreen"
import ButtonPip from "./button/ButtonPip"
import ButtonPlay from "./button/ButtonPlay"
import LabelTime from "./label/LabelTime"
import ButtonLoop from "./button/ButtonLoop"
import ButtonVolume from "./button/ButtonVolume"
import ButtonSettings from "./button/ButtonSettings"
import ButtonPart from "./button/ButtonPart"
import ButtonWebfull from "./button/ButtonWebfull"
import ButtonPrev from "./button/ButtonPrev"
import ButtonNext from "./button/ButtonNext"

const template = () => html`
  <div class="${classPrefix}-controller-mask"></div>
  <div class="${classPrefix}-controller mp-crystal">
    <div class="${classPrefix}-controller-progress"></div>
    <div class="${classPrefix}-controller-content">
      <div class="${classPrefix}-controller-left"></div>
      <div class="${classPrefix}-controller-center"></div>
      <div class="${classPrefix}-controller-right"></div>
    </div>
  </div>
`

/** 控制栏 */
export default class Controller {
  player: Player
  container: HTMLElement
  el: HTMLElement

  $progress: HTMLElement
  $content: HTMLElement
  $left: HTMLElement
  $center: HTMLElement
  $right: HTMLElement

  progressBar: ProgressBar

  isHover = false
  isControl = false

  constructor(player: Player, options: PlayerOptions) {
    this.player = player
    this.container = player.template.$controllerWrap
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-controller`)!
    this.$progress = this.el.querySelector(`.${classPrefix}-controller-progress`)!
    this.$content = this.el.querySelector(`.${classPrefix}-controller-content`)!
    this.$left = this.el.querySelector(`.${classPrefix}-controller-left`)!
    this.$center = this.el.querySelector(`.${classPrefix}-controller-center`)!
    this.$right = this.el.querySelector(`.${classPrefix}-controller-right`)!

    // 进度条
    this.progressBar = new ProgressBar(this, options)

    this.init()

    this.container.appendChild(fragment)
  }
  init() {
    this.container.addEventListener("mouseenter", () => {
      this.isHover = true
    })
    this.container.addEventListener("mouseleave", () => {
      this.isHover = false
    })
  }
  /** 设置播放器控制状态 */
  setControl(flag: boolean) {
    this.isControl = flag
    if (!flag) {
      this.player.state.removeActive()
    }
  }
}
