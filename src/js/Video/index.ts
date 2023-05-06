import { PlayerOptions, VideoPart, VideoSource } from "@/types";
import MfunsPlayer from "@/player";
export default class Video {
  /** 播放器主体 */
  player: MfunsPlayer;
  /** video对象 */
  el: HTMLVideoElement;
  /** 视频分P列表 */
  list: VideoPart[];
  /** 当前视频索引 */
  private currentPart: number;
  /** 视频宽高比 */
  scale: [number, number] | null = null
  constructor(player: MfunsPlayer, options: PlayerOptions) {
    this.player = player;
    this.el = this.player.template.$video;
    this.list = options.video.list;
    this.currentPart = options.video.part || 1;

    this.initEvent()
  }
  /** 加载分P */
  async loadPart(p: number) {
    const currentVideo = this.list[p - 1];
    // 目前播放器仅支持单一来源播放，故只选取第一个播放源
    this.el.src = currentVideo.src[0].url;
    // this.player.emit("part_change", p)
  }
  /** 视频分P */
  get part() {
    return this.currentPart;
  }

  /** 播放 */
  public play() {
    this.el.play()
  }
  /** 暂停 */
  public pause() {
    this.el.pause()
  }
  /** 跳转 */
  public seek(value: number) {
    this.el.currentTime = value
  }
  /** 设置音量 */
  public volume(value: number) {
    this.el.volume = value
  }
  /** 设置倍速 */
  public rate(value: number) {
    this.el.playbackRate = value
  }
  /** 静音 */
  public mute(flag: boolean = true) {
    this.el.muted = flag
  }
  /** 保持视频宽高比 */
  public rescale() {

  }
  get isPaused(): boolean {
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
    this.el.addEventListener(type, listener, options);
  }
  /** 移除视频事件 */
  public off<K extends keyof HTMLVideoElementEventMap>(
    type: K,
    listener: (this: HTMLVideoElement, ev: HTMLVideoElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void {
    this.el.removeEventListener(type, listener, options);
  }

  private initEvent() {
    this.on("play", () => {
      this.player.events.trigger("play")
    })
    this.on("pause", () => {
      this.player.events.trigger("pause")
    })
  }
}
