import { PlayerOptions, VideoPart, VideoSource } from "@/types"
import MfunsPlayer from "@/player"
import VideoLoader from "./Loader"

export default class Video {
  /** 播放器主体 */
  player: MfunsPlayer
  /** video对象 */
  el: HTMLVideoElement
  /** 视频加载模块 */
  loader: VideoLoader
  /** 视频分P列表 */
  list: VideoPart[]
  /** 当前视频分P */
  private currentPart: number

  ratio: [number, number] | null = null

  constructor(player: MfunsPlayer, options: PlayerOptions) {
    this.player = player
    this.el = this.player.template.$video
    this.loader = new VideoLoader(this)
    this.list = options.video.list
    this.currentPart = options.video.part || 1
    this.setRatio(options.ratio || null)

    this.initEvent()
    this.initKeepRatio()
  }

  /** 加载分P */
  async setPart(p: number, play = false) {
    this.currentPart = p
    const currentVideo = this.list[p - 1]
    // 目前播放器仅支持单一来源播放，故只选取第一个播放源
    this.loader.load(currentVideo.src[0])
    this.player.events.trigger("part_change", p)
    this.seek(0)
    if (play) {
      this.play()
    } else {
      this.player.template.el.classList.add("state-paused")
    }
  }

  /** 视频分P */
  get part() {
    return this.currentPart
  }

  /** 播放 */
  public play() {
    this.el.play()
  }

  /** 暂停 */
  public pause() {
    this.el.pause()
  }
  /** 上一P */
  public prev() {
    if (this.currentPart > 1) this.setPart(this.currentPart - 1, true)
  }
  /** 下一P */
  public next() {
    if (this.currentPart < this.list.length) this.setPart(this.currentPart + 1, true)
    this.play()
  }

  /** 跳转 */
  public seek(value: number) {
    this.el.currentTime = value > 0 ? (value < this.el.duration ? value : this.el.duration) : 0
  }

  /** 设置音量 */
  public setVolume(value: number) {
    this.el.volume = value > 0 ? (value < 1 ? value : 1) : 0
  }

  /** 设置倍速 */
  public setRate(value: number) {
    this.el.playbackRate = value
  }

  /** 设置循环播放 */
  public setLoop(flag: boolean) {
    this.el.loop = flag
    this.player.events.trigger("loop_change", flag)
  }

  /** 设置视频比例 */
  public setRatio(value: [number, number] | null) {
    this.ratio = value
    this.el.style.width = ""
    this.el.style.height = ""
    if (value) {
      const [ratioW, ratioH] = value
      this.el.style.aspectRatio = `${ratioW}/${ratioH}`
      this.el.style.objectFit = "fill"
      const { width, height } = this.el.getBoundingClientRect()
      const { width: cWidth, height: cHeight } =
        this.player.template.$videoArea.getBoundingClientRect()
      if (width == cWidth && height == cHeight) {
        this.rescale(width, height, ratioW, ratioH)
      }
    } else {
      this.el.style.aspectRatio = ""
      this.el.style.objectFit = ""
    }
    this.player.events.trigger("ratio_change", value)
  }

  /** 静音 */
  public mute(flag = true) {
    this.el.muted = flag
  }

  get muted(): boolean {
    return this.el.muted
  }

  get rate(): number {
    return this.el.playbackRate
  }

  get loop(): boolean {
    return this.el.loop
  }

  get volume(): number {
    return this.el.volume
  }

  get paused(): boolean {
    return this.el.paused
  }

  get duration(): number {
    return this.el.duration
  }

  get buffered(): TimeRanges {
    return this.el.buffered
  }

  get currentTime(): number {
    return this.el.currentTime
  }

  /** 监听视频事件 */
  public on<K extends keyof HTMLVideoElementEventMap>(
    type: K,
    listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.el.addEventListener(type, listener, options)
  }

  /** 移除视频事件 */
  public off<K extends keyof HTMLVideoElementEventMap>(
    type: K,
    listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void {
    this.el.removeEventListener(type, listener, options)
  }

  private initEvent() {
    this.on("play", () => {
      this.player.events.trigger("play")
      this.player.template.el.classList.remove("state-paused")
    })
    this.on("pause", () => {
      this.player.events.trigger("pause")
      this.player.template.el.classList.add("state-paused")
    })
    this.on("seeking", () => {
      this.player.events.trigger("seeking", this.currentTime)
      this.player.template.el.classList.add("state-seeking")
    })
    this.on("seeked", () => {
      this.player.events.trigger("seeked", this.currentTime)
      this.player.template.el.classList.remove("state-seeking")
    })
    this.on("volumechange", () => {
      this.player.events.trigger("volume_change", this.volume)
    })
    this.on("ratechange", () => {
      this.player.events.trigger("rate_change", this.rate)
    })
  }
  /** 保持视频比例 */
  private initKeepRatio() {
    this.player.on("resize", ([cWidth, cHeight]) => {
      if (this.ratio) {
        this.el.style.width = ""
        this.el.style.height = ""
        const [ratioW, ratioH] = this.ratio
        const { width, height } = this.el.getBoundingClientRect()
        console.log(`${width} x ${height} -- ${cWidth} x ${cHeight}`)
        if (Math.abs(width - cWidth) < 1 && Math.abs(height - cHeight) < 1) {
          // 该情况表示播放器大小可能已被固定，需要重新计算宽高
          this.rescale(cWidth, cHeight, ratioW, ratioH)
        }
      }
    })
  }

  /** 根据当前视频宽高重新维持视频比例 */
  private rescale(width: number, height: number, ratioW: number, ratioH: number) {
    const rwxh = ratioW * height
    const rhxw = ratioH * width
    if (rwxh < rhxw) {
      this.el.style.width = `${(rwxh / rhxw) * 100}%`
      this.el.style.height = "100%"
    } else {
      this.el.style.width = "100%"
      this.el.style.height = `${(rhxw / rwxh) * 100}%`
    }
  }
}
