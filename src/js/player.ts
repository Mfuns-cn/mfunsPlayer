import Controller from "@/ui/Controller"
import Events from "@/Events"
import Template from "@/ui/Template"
import { PlayerOptions } from "@/types"
import Video from "@/Video"
import Mode from "@/Mode"
import HotKey from "@/ui/HotKey"
import Side from "@/ui/Side"
import ContextMenu from "@/ui/ContextMenu"
import Modal from "@/ui/Modal"
import Theme from "@/ui/Theme"
import State from "@/ui/State"
import Danmaku from "./Danmaku"

export default class MfunsPlayer {
  static readonly version = MFUNSPLAYER_VERSION
  static readonly gitHash = GIT_HASH
  /** 容器 */
  readonly container: HTMLElement
  /** 视频模块 */
  video: Video
  /** 播放列表模块 */
  playlist: any
  /** 事件模块 */
  events: Events
  /** 弹幕模块 */
  danmaku: Danmaku
  /** 播放器模式控制 */
  mode: Mode
  /** 播放器状态控制 */
  state: State
  /** 模板 */
  template: Template
  /** 主题样式 */
  theme: Theme
  /** 控制栏 */
  controller: Controller
  /** 右键菜单 */
  contextMenu: ContextMenu
  /** 控制栏 */
  side: Side
  /** 模态框 */
  modal: Modal
  /** 快捷键 */
  hotKey: HotKey
  /** 用户id */
  userId: string | number = 0
  /** 视频作者id */
  authorId: string | number | null = null

  constructor(options: PlayerOptions) {
    this.events = new Events()
    this.container = options.container
    // 注入模板
    this.template = new Template(this, options)
    // 初始化主题样式模块
    this.theme = new Theme(this, options)

    // 初始化功能
    this.video = new Video(this, options)
    this.mode = new Mode(this, options)
    this.state = new State(this, options)
    this.danmaku = new Danmaku(this, options)

    // 注入ui
    this.controller = new Controller(this, options)
    this.side = new Side(this, options)
    this.modal = new Modal(this, options)
    this.contextMenu = new ContextMenu(this, options)

    this.hotKey = new HotKey(this, options)

    this.init()

    this.setPart(1)
  }

  init() {}

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
    if (this.paused) {
      this.play()
    } else {
      this.pause()
    }
  }

  /** 上一P */
  public prev() {
    this.video.prev()
  }

  /** 下一P */
  public next() {
    this.video.next()
  }

  get paused() {
    return this.video.paused
  }

  /** 跳转 */
  public seek(value: number) {
    this.video.seek(value)
  }

  /** 设置音量 */
  public volume(value: number) {
    this.video.setVolume(value)
  }

  /** 设置倍速 */
  public setRate(value: number) {
    this.video.setRate(value)
  }

  /** 静音 */
  public mute(flag = true) {
    this.video.mute(flag)
  }

  /** 设置循环播放 */
  public setLoop(flag = true) {
    this.video.setLoop(flag)
  }

  /** 跳转分P */
  public setPart(p: number, play = false) {
    this.video.setPart(p, play)
  }

  /** 获取播放器当前时间(s) */
  public getTime() {
    return this.video.el.currentTime
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
    this.mode.webfull()
  }

  /** 退出网页全屏 */
  public exitWebfull() {
    this.mode.exitWebfull()
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
  public destory() {}
}
