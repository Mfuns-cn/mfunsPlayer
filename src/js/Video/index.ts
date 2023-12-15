import { LoadInfo, PlayerOptions, VideoInfo } from "@/types";
import Player from "@/player";
import VideoLoader from "./Loader";
import { PlayerEventMap } from "@/types/PlayerEventMap";
import { createElement } from "@/utils";
import { classPrefix } from "@/config";

const videoEventMap: {
  [k in keyof PlayerEventMap & keyof HTMLVideoElementEventMap]?: (
    v: HTMLVideoElement
  ) => Parameters<PlayerEventMap[k]>;
} = {
  play: () => [],
  pause: () => [],
  ended: () => [],

  loadeddata: () => [],
  loadedmetadata: () => [],
  waiting: () => [],
  playing: () => [],
  canplay: () => [],
  canplaythrough: () => [],

  timeupdate: (v) => [v.currentTime],
  durationchange: (v) => [v.duration],
  progress: (v) => [v.buffered],
  seeking: (v) => [v.currentTime],
  seeked: (v) => [v.currentTime],
  volumechange: (v) => [v.volume, v.muted],
  ratechange: (v) => [v.playbackRate],

  enterpictureinpicture: () => [],
  leavepictureinpicture: () => [],
};

export default class Video {
  /** 播放器主体 */
  player: Player;
  /** video对象 */
  $video: HTMLVideoElement;
  /** 视频加载模块 */
  loader: VideoLoader;

  ratio: [number, number] | null = null;

  private detachEventController?: AbortController;

  constructor(player: Player, options: PlayerOptions) {
    this.player = player;

    this.$video = this.player.$content.appendChild(
      createElement("video", { class: `${classPrefix}-video` })
    );

    // 初始化视频
    this.loader = new VideoLoader(this);
    this.setRatio(options.aspectRatio || null);

    this.attachEvent(this.$video);
    this.initKeepRatio();

    this.player.on("play", () => {
      this.player.$el.classList.remove("state-paused");
    });
    this.player.on("pause", () => {
      this.player.$el.classList.add("state-paused");
    });
    this.player.on("waiting", () => {
      this.player.$el.classList.add("state-loading");
    });
    this.player.on("playing", () => {
      this.player.$el.classList.remove("state-loading");
    });
    this.player.on("ended", () => {
      this.player.hook.call("end").then((res) => {
        if (res) this.player.emit("end");
      });
    });
  }

  /** 加载视频 */
  load(info: LoadInfo) {
    this.player.emit("video_load", info);
    const { url, type, play, time } = info;
    console.log({ url, type });
    this.loader.load({ url, type });
    this.player.once("loadedmetadata", () => {
      if (time) {
        this.seek(time);
      }
      if (play) {
        this.play();
      } else {
        this.player.$el.classList.add("state-paused");
      }
    });
  }

  // 同步视频方法

  /** 播放 */
  public play() {
    this.$video.play();
  }

  /** 暂停 */
  public pause() {
    this.$video.pause();
  }

  /** 跳转 */
  public seek(value: number) {
    this.$video.currentTime =
      value > 0 ? (value < this.$video.duration ? value : this.$video.duration) : 0;
  }

  // 同步设置视频属性

  /** 设置音量 */
  public setVolume(value: number) {
    this.$video.volume = value > 0 ? (value < 1 ? value : 1) : 0;
  }

  /** 设置倍速 */
  public setPlaybackRate(value: number) {
    this.$video.playbackRate = value;
  }

  /** 设置静音 */
  public setMute(flag: boolean) {
    this.$video.muted = flag;
  }

  // 视频播放属性

  /** 设置循环播放 */
  public setLoop(flag: boolean) {
    this.$video.loop = flag;
    this.player.emitChange("loop", flag);
  }

  /** 设置视频比例 */
  public setRatio(value: [number, number] | null) {
    this.ratio = value;
    this.$video.style.width = "";
    this.$video.style.height = "";
    if (value) {
      const [ratioW, ratioH] = value;
      this.$video.style.aspectRatio = `${ratioW}/${ratioH}`;
      this.$video.style.objectFit = "fill";
      const { width, height } = this.$video.getBoundingClientRect();
      const { width: cWidth, height: cHeight } = this.player.$area.getBoundingClientRect();
      if (width == cWidth && height == cHeight) {
        this.rescale(width, height, ratioW, ratioH);
      }
    } else {
      this.$video.style.aspectRatio = "";
      this.$video.style.objectFit = "";
    }
    this.player.emitChange("aspectRatio", value);
  }

  get muted(): boolean {
    return this.$video.muted;
  }

  get playbackRate(): number {
    return this.$video.playbackRate;
  }

  get loop(): boolean {
    return this.$video.loop;
  }

  get volume(): number {
    return this.$video.volume;
  }

  get paused(): boolean {
    return this.$video.paused;
  }

  get duration(): number {
    return this.$video.duration;
  }

  get currentTime(): number {
    return this.$video.currentTime;
  }

  /** 添加视频事件 */
  attachEvent(video: HTMLVideoElement) {
    this.detachEventController = new AbortController();
    for (const eventName in videoEventMap) {
      const values =
        videoEventMap[eventName as keyof HTMLVideoElementEventMap & keyof PlayerEventMap]!;
      video.addEventListener(
        eventName,
        () => {
          this.player.emit(
            eventName as keyof HTMLVideoElementEventMap & keyof PlayerEventMap,
            ...values(video)
          );
        },
        { signal: this.detachEventController.signal }
      );
    }
  }
  /** 移除视频事件 */
  detachEvent() {
    this.detachEventController?.abort();
  }
  /** 保持视频比例 */
  private initKeepRatio() {
    this.player.on("video_resize", ([cWidth, cHeight]) => {
      if (this.ratio) {
        this.$video.style.width = "";
        this.$video.style.height = "";
        const [ratioW, ratioH] = this.ratio;
        const { width, height } = this.$video.getBoundingClientRect();
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
      this.$video.style.width = `${(rwxh / rhxw) * 100}%`;
      this.$video.style.height = "100%";
    } else {
      this.$video.style.width = "100%";
      this.$video.style.height = `${(rhxw / rwxh) * 100}%`;
    }
  }
}
