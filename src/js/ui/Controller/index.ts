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
import ButtonPart from "./button/ButtonPart"
import ButtonWebfull from "./button/ButtonWebfull"
import ButtonPrev from "./button/ButtonPrev"
import ButtonNext from "./button/ButtonNext"
import ButtonDanmakulist from "./button/ButtonDanmakulist"
import DanmakuBar from "./DanmakuBar"

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
  player: MfunsPlayer
  container: HTMLElement
  el: HTMLElement

  $progress: HTMLElement
  $content: HTMLElement
  $left: HTMLElement
  $center: HTMLElement
  $right: HTMLElement

  progressBar: ProgressBar
  danmakuBar: DanmakuBar

  buttonPlay: ButtonPlay
  buttonPrev: ButtonPrev
  buttonNext: ButtonNext
  buttonLoop: ButtonLoop
  buttonVolume: ButtonVolume
  buttonSettings: ButtonSettings
  // buttonDanmakulist: ButtonDanmakulist
  buttonPart: ButtonPart
  buttonPip?: ButtonPip
  buttonWebfull?: ButtonWebfull
  buttonFullScreen?: ButtonFullscreen

  labelTime: LabelTime

  isHover = false
  isControl = false

  constructor(player: MfunsPlayer, options: PlayerOptions) {
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
    // 弹幕栏
    this.danmakuBar = new DanmakuBar(this, options)

    // 控制栏左侧部件
    this.buttonPrev = new ButtonPrev(this.player, this.$left)
    this.buttonPlay = new ButtonPlay(this.player, this.$left)
    this.buttonNext = new ButtonNext(this.player, this.$left)
    this.labelTime = new LabelTime(this.player, this.$left)
    this.buttonLoop = new ButtonLoop(this.player, this.$left)
    // 控制栏右侧部件
    // this.buttonDanmakulist = new ButtonDanmakulist(this.player, this.$right)
    this.buttonPart = new ButtonPart(this.player, this.$right)
    this.buttonVolume = new ButtonVolume(this.player, this.$right)
    this.buttonSettings = new ButtonSettings(this.player, this.$right, options)
    if (pictureInPictureEnabled) this.buttonPip = new ButtonPip(this.player, this.$right)
    if (options.feature?.webfull) this.buttonWebfull = new ButtonWebfull(this.player, this.$right)
    if (fullScreenEnabled) this.buttonFullScreen = new ButtonFullscreen(this.player, this.$right)

    this.init()

    this.container.appendChild(fragment)
  }
  init() {
    this.buttonPrev.show(false)
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