import { LoadInfo, MediaController, PlayerOptions, VideoInfo } from "@/types";
import Player from "@/player";
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

export default class VideoController {
  /** 播放器主体 */
  player: Player;
  /** video对象 */
  $el: HTMLVideoElement;

  ratio: [number, number] | null = null;

  /** 视频信息 */
  info: VideoInfo = {};

  mediaController: MediaController | null = null;

  private detachEventController?: AbortController;

  constructor(player: Player, options: PlayerOptions) {
    this.player = player;

    this.$el = this.player.$content.appendChild(
      createElement("video", { class: `${classPrefix}-video` })
    );

    this._attachEvent(this.$el);

    this.player.on("ended", () => {
      this.player.hook.call("end").then((res) => {
        if (res) this.player.emit("end");
      });
    });
  }

  /** 设置视频 */
  public set(info: VideoInfo, play?: boolean, time?: number) {
    this.player.hook.call("video.set", info).then(async (res) => {
      if (res) {
        // 销毁并丢弃原视频控制实例
        this.mediaController?.destroy?.();
        this.mediaController = null;
        // 设置新视频信息
        this.info = info;
        this.player.emit("videoChange", { ...info });
        // 加载视频
        let { url, type, live } = info;
        const loadInfo = { url, type, play, time, live };
        this.player.hook.call("video.beforeLoad", loadInfo).then(() => {
          if (loadInfo.url) {
            this.load(loadInfo as LoadInfo);
          } else {
            this.player.throw(new Error("缺少视频播放信息"));
          }
        });
      }
    });
  }

  /** 加载视频 */
  public load(info: LoadInfo) {
    this.player.hook.call("video.load", info).then((res) => {
      if (res) {
        this.mediaController = this.player.loader.create(info, this.$el);
        this.player.emit("videoLoad", info);
      } else {
        this.player.throw(new Error("视频加载失败"));
      }
    });
  }

  /** 添加视频事件 */
  private _attachEvent(video: HTMLVideoElement) {
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

  public bind(el: HTMLVideoElement) {
    this.$el = el;
    this.detachEventController?.abort();
    this._attachEvent(el);
  }

  /** 获取播放信息 */
  getVideoInfo() {
    return {
      ...this.info,
    };
  }
  /** 获取媒体信息 */
  getMediaInfo() {
    return {
      url: this.mediaController?.url,
      type: this.mediaController?.type || "",
      live: this.mediaController?.live || false,
    };
  }
}
