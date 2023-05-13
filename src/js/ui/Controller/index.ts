import { html, render } from "lit-html"
import { classPrefix } from "@/const"
import MfunsPlayer from "@/player"
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

const template = () => html`
  <div class="${classPrefix}-controller-mask"></div>
  <div class="${classPrefix}-controller">
    <div class="${classPrefix}-controller-progress"></div>
    <div class="${classPrefix}-controller-content">
      <div class="${classPrefix}-controller-left"></div>
      <div class="${classPrefix}-controller-right"></div>
    </div>
  </div>
`

/** 控制栏 */
export default class Controller {
  player: MfunsPlayer

  container: HTMLElement

  el: HTMLElement

  $progress: HTMLElement

  $content: HTMLElement

  $left: HTMLElement

  $right: HTMLElement

  progressBar: ProgressBar

  buttonPlay: ButtonPlay

  buttonLoop: ButtonLoop

  buttonVolume: ButtonVolume

  buttonSettings: ButtonSettings

  buttonPip?: ButtonPip

  buttoFullScreen?: ButtonFullscreen

  labelTime: LabelTime

  constructor(player: MfunsPlayer, options: PlayerOptions) {
    this.player = player
    this.container = player.template.$controllerWrap
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-controller`)!
    this.$progress = this.el.querySelector(`.${classPrefix}-controller-progress`)!
    this.$content = this.el.querySelector(`.${classPrefix}-controller-content`)!
    this.$left = this.el.querySelector(`.${classPrefix}-controller-left`)!
    this.$right = this.el.querySelector(`.${classPrefix}-controller-right`)!

    // 进度条
    this.progressBar = new ProgressBar(this, options)
    // 控制栏左侧部件
    this.buttonPlay = new ButtonPlay(this.player, this.$left)
    this.labelTime = new LabelTime(this.player, this.$left)
    this.buttonLoop = new ButtonLoop(this.player, this.$left)
    // 控制栏右侧部件
    this.buttonVolume = new ButtonVolume(this.player, this.$right)
    this.buttonSettings = new ButtonSettings(this.player, this.$right)
    if (pictureInPictureEnabled) this.buttonPip = new ButtonPip(this.player, this.$right)
    if (fullScreenEnabled) this.buttoFullScreen = new ButtonFullscreen(this.player, this.$right)

    this.container.appendChild(fragment)
  }
}
