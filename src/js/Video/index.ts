import { PlayerOptions, VideoInfo, VideoPart, VideoSource } from "@/types";
import Player from "@/player";
import VideoLoader from "./Loader";

export default class Video {
  /** 播放器主体 */
  player: Player;
  /** video对象 */
  el: HTMLVideoElement;
  /** 视频加载模块 */
  loader: VideoLoader;
  /** 视频分P列表 */
  list: VideoPart[];
  /** 当前视频分P */
  private currentPart: number;
  /** 当前视频质量 */
  private quality = "1080P";

  ratio: [number, number] | null = null;

  constructor(player: Player, options: PlayerOptions) {
    this.player = player;
    this.el = this.player.template.$video;
    this.loader = new VideoLoader(this);
    this.list = options.video.list;
    this.currentPart = options.video.part || 1;
    this.setRatio(options.aspectRatio || null);

    this.initEvent();
    this.initKeepRatio();
  }

  /** 设置视频 */
  async setVideo(video: VideoInfo, play = false) {
    const p = video.part || 1;
    this.list = video.list;
    this.currentPart = p;
    // 选择合适的播放源
    this.load(this.findSourceByQuality(this.partInfo.src, this.quality), play);
    this.player.events.trigger("video");
    this.player.events.trigger("part", p);
    this.seek(0);
  }

  /** 设置分P */
  async setPart(p: number, play = false) {
    this.currentPart = p;
    // 选择合适的播放源
    this.load(this.findSourceByQuality(this.partInfo.src, this.quality), play);
    this.player.events.trigger("part", p);
    this.seek(0);
  }

  /** 切换视频质量 */
  async setQuality(quality: string) {
    const currentVideoSource = this.partInfo.src;
    let source = currentVideoSource.find((src) => src.quality == quality);
    if (!source) source = this.findSourceByQuality(currentVideoSource, quality);
    this.load(source, !this.paused, this.duration);
  }

  /** 加载视频 */
  load(src: VideoSource, play?: boolean, time?: number) {
    this.loader.load(src);
    const onloadedmetadata = () => {
      this.player.events.trigger("video:load_end");
      if (time) {
        this.seek(time);
      }
      if (play) {
        this.play();
      } else {
        this.player.template.el.classList.add("state-paused");
      }
      this.el.removeEventListener("loadedmetadata", onloadedmetadata);
    };
    this.el.addEventListener("loadedmetadata", onloadedmetadata);
  }

  /** 根据视频质量选择合适的视频源
   * 返回小于等于该质量的视频源中最大的一个
   */
  private findSourceByQuality(sourceList: VideoSource[], quality: string) {
    // 视频质量从高到低排序
    const sortedSources: VideoSource[] = [...sourceList].sort(
      (a, b) => parseInt(b.quality || "") - parseInt(a.quality || "")
    );
    // 从前向后找，找到小于等于该分辨率的即可
    let source = sortedSources.find((src) => parseInt(src.quality || "") <= parseInt(quality));
    if (!source) {
      source = sortedSources[sortedSources.length - 1];
    }
    return source;
  }

  /** 视频分P */
  get part() {
    return this.currentPart;
  }

  get partInfo() {
    return this.list[this.currentPart - 1];
  }

  /** 上一P */
  public prev() {
    if (this.currentPart > 1) this.setPart(this.currentPart - 1, true);
  }
  /** 下一P */
  public next() {
    if (this.currentPart < this.list.length) this.setPart(this.currentPart + 1, true);
    this.play();
  }

  // 同步视频方法

  /** 播放 */
  public play() {
    this.el.play();
  }

  /** 暂停 */
  public pause() {
    this.el.pause();
  }

  /** 跳转 */
  public seek(value: number) {
    this.el.currentTime = value > 0 ? (value < this.el.duration ? value : this.el.duration) : 0;
  }

  // 同步设置视频属性

  /** 设置音量 */
  public setVolume(value: number) {
    this.el.volume = value > 0 ? (value < 1 ? value : 1) : 0;
  }

  /** 设置倍速 */
  public setPlaybackRate(value: number) {
    this.el.playbackRate = value;
  }

  // 视频播放属性

  /** 设置循环播放 */
  public setLoop(flag: boolean) {
    this.el.loop = flag;
    this.player.events.trigger("change:loop", flag);
  }

  /** 设置视频比例 */
  public setRatio(value: [number, number] | null) {
    this.ratio = value;
    this.el.style.width = "";
    this.el.style.height = "";
    if (value) {
      const [ratioW, ratioH] = value;
      this.el.style.aspectRatio = `${ratioW}/${ratioH}`;
      this.el.style.objectFit = "fill";
      const { width, height } = this.el.getBoundingClientRect();
      const { width: cWidth, height: cHeight } =
        this.player.template.$videoArea.getBoundingClientRect();
      if (width == cWidth && height == cHeight) {
        this.rescale(width, height, ratioW, ratioH);
      }
    } else {
      this.el.style.aspectRatio = "";
      this.el.style.objectFit = "";
    }
    this.player.events.trigger("change:aspectRatio", value);
  }

  /** 静音 */
  public mute(flag = true) {
    this.el.muted = flag;
  }

  get muted(): boolean {
    return this.el.muted;
  }

  get playbackRate(): number {
    return this.el.playbackRate;
  }

  get loop(): boolean {
    return this.el.loop;
  }

  get volume(): number {
    return this.el.volume;
  }

  get paused(): boolean {
    return this.el.paused;
  }

  get duration(): number {
    return this.el.duration;
  }

  get currentTime(): number {
    return this.el.currentTime;
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
      this.player.events.trigger("play");
      this.player.template.el.classList.remove("state-paused");
    });
    this.on("pause", () => {
      this.player.events.trigger("pause");
      this.player.template.el.classList.add("state-paused");
    });
    this.on("ended", () => {
      this.player.events.trigger("ended");
    });
    this.on("waiting", () => {
      this.player.events.trigger("waiting");
      this.player.template.el.classList.add("state-loading");
    });
    this.on("playing", () => {
      this.player.events.trigger("playing");
      this.player.template.el.classList.remove("state-loading");
    });
    this.on("seeking", () => {
      this.player.events.trigger("seeking", this.currentTime);
      this.player.template.el.classList.add("state-seeking");
    });
    this.on("seeked", () => {
      this.player.events.trigger("seeked", this.currentTime);
      this.player.template.el.classList.remove("state-seeking");
    });
    this.on("timeupdate", () => {
      this.player.events.trigger("timeupdate", this.currentTime);
    });
    this.on("progress", () => {
      const buffered = this.el.buffered;
      this.player.events.trigger(
        "progress",
        buffered.length ? buffered.end(buffered.length - 1) : 0
      );
    });
    this.on("durationchange", () => {
      this.player.events.trigger("durationchange", this.duration);
    });
    this.on("volumechange", () => {
      this.player.events.trigger("volumechange", this.volume, this.muted);
    });
    this.on("ratechange", () => {
      this.player.events.trigger("ratechange", this.playbackRate);
    });
  }
  /** 保持视频比例 */
  private initKeepRatio() {
    this.player.on("resize", ([cWidth, cHeight]) => {
      if (this.ratio) {
        this.el.style.width = "";
        this.el.style.height = "";
        const [ratioW, ratioH] = this.ratio;
        const { width, height } = this.el.getBoundingClientRect();
        console.log(`${width} x ${height} -- ${cWidth} x ${cHeight}`);
        if (Math.abs(width - cWidth) < 1 && Math.abs(height - cHeight) < 1) {
          // 该情况表示播放器大小可能已被固定，需要重新计算宽高
          this.rescale(cWidth, cHeight, ratioW, ratioH);
        }
      }
    });
  }

  /** 根据当前视频宽高重新维持视频比例 */
  private rescale(width: number, height: number, ratioW: number, ratioH: number) {
    const rwxh = ratioW * height;
    const rhxw = ratioH * width;
    if (rwxh < rhxw) {
      this.el.style.width = `${(rwxh / rhxw) * 100}%`;
      this.el.style.height = "100%";
    } else {
      this.el.style.width = "100%";
      this.el.style.height = `${(rhxw / rwxh) * 100}%`;
    }
  }
}
