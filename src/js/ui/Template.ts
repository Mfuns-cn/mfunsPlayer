import { html, render } from "lit-html"
import MfunsPlayer from "@/player"
import { colorLuminance } from "@/utils"
import { classPrefix } from "@/const"
import { PlayerOptions, ThemeOptions } from "@/types"

const template = () => html`
  <div class="${classPrefix}">
    <div class="${classPrefix}-main">
      <div class="${classPrefix}-video-area">
        <div class="${classPrefix}-video-wrap">
          <video class="${classPrefix}-video"></video>
        </div>
        <div class="${classPrefix}-danmaku-wrap"></div>
        <div class="${classPrefix}-state-loading"></div>
        <div class="${classPrefix}-state-volume"></div>
        <div class="${classPrefix}-toast-wrap"></div>
      </div>
      <div class="${classPrefix}-side-wrap"></div>
      <div class="${classPrefix}-modal-wrap"></div>
      <div class="${classPrefix}-contextmenu-wrap"></div>
      <div class="${classPrefix}-header-wrap"></div>
      <div class="${classPrefix}-controller-wrap"></div>
      <div class="${classPrefix}-state-play"></div>
    </div>
    <div class="${classPrefix}-footbar"></div>
    <div class="${classPrefix}-miniplayer">
      <div class="${classPrefix}-miniplayer-content"></div>
    </div>
  </div>
`

export default class Template {
  player: MfunsPlayer
  /** 播放器容器 */
  container: HTMLElement
  /** 播放器主体元素 */
  el!: HTMLElement
  // 播放器部件
  $main!: HTMLElement
  $video!: HTMLVideoElement
  $videoArea!: HTMLElement
  $videoWrap!: HTMLElement
  $danmakuWrap!: HTMLElement
  $toastWrap!: HTMLElement
  $statusPlay!: HTMLElement
  $statusVolume!: HTMLElement
  $statusLoading!: HTMLElement
  $headerWrap!: HTMLElement
  $contextmenuWrap!: HTMLElement
  $modalWrap!: HTMLElement
  $controllerWrap!: HTMLElement
  $sideWrap!: HTMLElement
  $footbar!: HTMLElement
  $miniplayer!: HTMLElement

  constructor(player: MfunsPlayer, options: PlayerOptions) {
    this.player = player
    this.container = this.player.container
    this.init()
  }

  /** 初始化模板绑定 */
  private init() {
    render(template(), this.container)
    const $ = this.container.querySelector.bind(this.container)
    this.el = $(`.${classPrefix}`)!
    this.$main = $(`.${classPrefix}-main`)!
    this.$video = $(`.${classPrefix}-video`)!
    this.$videoArea = $(`.${classPrefix}-video-area`)!
    this.$videoWrap = $(`.${classPrefix}-video-wrap`)!
    this.$danmakuWrap = $(`.${classPrefix}-video-danmaku-wrap`)!
    this.$toastWrap = $(`.${classPrefix}-video-toast-wrap`)!
    this.$statusPlay = $(`.${classPrefix}-video-status-play`)!
    this.$statusVolume = $(`.${classPrefix}-video-status-volume`)!
    this.$statusLoading = $(`.${classPrefix}-video-status-loading`)!
    this.$headerWrap = $(`.${classPrefix}-header-wrap`)!
    this.$contextmenuWrap = $(`.${classPrefix}-contextmenu-wrap`)!
    this.$modalWrap = $(`.${classPrefix}-modal-wrap`)!
    this.$controllerWrap = $(`.${classPrefix}-controller-wrap`)!
    this.$sideWrap = $(`.${classPrefix}-side-wrap`)!
    this.$footbar = $(`.${classPrefix}-footbar`)!
    this.$miniplayer = $(`.${classPrefix}-miniplayer`)!
  }
}
