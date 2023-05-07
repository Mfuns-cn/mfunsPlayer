import Controller from "@/ui/Controller"
import Events from "@/Events"
import Template from "@/ui/Template"
import { PlayerOptions } from "@/types"
import Video from "@/Video"
import Mode from "./Mode"
import HotKey from "./ui/HotKey"

export default class MfunsPlayer {
  static readonly version = MFUNSPLAYER_VERSION
  static readonly gitHash = GIT_HASH
  /** 设置项 */
  options: any

  /** 容器 */
  readonly container: HTMLElement
  /** 视频模块 */
  video: Video
  /** 播放列表模块 */
  playlist: any
  /** 事件模块 */
  events: Events
  /** 弹幕模块 */
  danmaku: any
  /** 播放器模式控制 */
  mode: Mode

  /** 模板 */
  template: Template
  /** 控制栏 */
  controller: Controller

  /** 快捷键 */
  hotKey: HotKey

  isFocused: boolean = false

  /** 插件 */
  readonly plugin: {[key: string]: any}

  constructor (options: PlayerOptions) {
    this.events = new Events()
    this.container = options.container
    // 注入模板
    this.template = new Template(this, options)

    // 初始化功能
    this.video = new Video(this, options)
    this.mode = new Mode(this, options)

    // 注入ui
    this.controller = new Controller(this, options)

    this.hotKey = new HotKey(this, options)


    this.plugin = {}

    this.init()

    this.part(1)
  }
  init() {
    document.addEventListener("click", () => {
      this.isFocused = false
    }, true)
    this.template.el.addEventListener("click", () => {
      this.isFocused = true
    }, true)
  }

  
  /** 播放相关 */

  /** 播放 */
  public play() {
    this.video.play()
  }
  /** 暂停 */
  public pause() {
    this.video.pause()
  }
  /** 切换播放/暂停状态 */
  public toggle() {
    if (this.isPaused) {
      this.play()
    } else {
      this.pause()
    }
  }
  get isPaused() {
    return this.video.isPaused
  }
  /** 跳转 */
  public seek(value: number) {
    this.video.seek(value)
  }
  /** 设置音量 */
  public volume(value: number) {
    this.video.volume(value)
  }
  /** 设置倍速 */
  public rate(value: number) {
    this.video.rate(value)
  }
  /** 静音 */
  public mute(flag: boolean = true) {
    this.video.mute(flag)
  }
  /** 跳转分P */
  public part(p: number) {
    this.video.loadPart(p)
  }

  
  /** 尺寸模式相关 */
  
  /** 全屏 */
  public fullscreen() {
    this.mode.fullscreen()
  }
  /** 退出全屏 */
  public exitFullscreen() {
    this.mode.exitFullscreen()
  }
  /** 是否处于全屏模式 */
  get isFullscreen() {
    return this.mode.isFullscreen
  }
  /** 网页全屏 */
  public webfull() {
    this.mode.fullscreen()
  }
  /** 退出网页全屏 */
  public exitWebfull() {
    this.mode.exitFullscreen()
  }
  /** 是否处于网页全屏 */
  get isWebfull() {
    return this.mode.isWebfull
  }
  /** 画中画模式 */
  public pip() {
    this.mode.pip()
  }
  /** 退出画中画模式 */
  public exitPip() {
    this.mode.exitPip()
  }
  /** 是否处于画中画模式 */
  get isPip() {
    return this.mode.isPip
  }
  /** 宽屏模式 */
  public wide() {
    this.mode.wide()
  }
  /** 退出宽屏模式 */
  public exitWide() {
    this.mode.exitWide()
  }
  /** 是否处于宽屏模式 */
  get isWide() {
    return this.mode.isWide
  }

  
  /** 监听事件 */
  public on(name: string, listener: (...args: any[]) => void) {
    this.events.on(name, listener)
  }
  /** 取消监听事件 */
  public off(name: string, listener: (...args: any[]) => void) {
    this.events.off(name, listener)
  }

  /** 播放器销毁 */
  public destory() {

  }
}