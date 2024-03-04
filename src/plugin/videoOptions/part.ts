import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { PlayerOptions, VideoInfo } from "@/types";

declare module "@core" {
  interface PlayerPlugins {
    part?: Part;
  }

  export interface VideoInfo {
    /** 视频分P列表 */
    list?: Omit<VideoInfo, "list" | "part">[];
    /** 要播放的分P */
    part?: number;
  }

  export interface PlayerEventMap {
    partListChange: (list: VideoInfo[]) => void;
    partChange: (part: number) => void;
  }
}

/** 视频分P功能，将多段视频作为一个分P视频加载 */

export default class Part extends BasePlugin {
  static pluginName = "part";
  constructor(player: Player) {
    super(player);
  }
  baseVideoInfo: VideoInfo | null = null;
  init() {
    this.player.hook.register(
      "video.set",
      (info) => {
        // 如果基本信息中的part与当前传入的part不一致，则更改当前分P列表
        if (!this.baseVideoInfo?.list || this.baseVideoInfo?.list != info.list) {
          this.baseVideoInfo = { ...info };
          this.player.emit("partListChange", []);
        }
        // 如果视频信息中存在list，则直接设置part
        if (info.list) {
          info.part ||= 1;
          Object.assign(info, info.list[info.part - 1]);
          info.hasNext ||= info.part! < info.list.length;
          info.hasPrev ||= info.part! > 1;
          this.player.emit("partChange", info.part);
        } else {
          this.player.emit("partChange", 1);
        }
      },
      true
    );
    this.player.hook.register("next", () => {
      // 如果视频信息中有list，且part<list.length，则设置下一P
      if (this.list && this.part! < this.num) {
        this.set(this.part + 1);
        return false;
      }
    });
    this.player.hook.register("prev", () => {
      // 如果视频信息中有list，且part>1，则设置上一P
      if (this.list && this.part! > 1) {
        this.set(this.part - 1);
        return false;
      }
    });
  }
  /** 设置分P */
  set(p: number, play?: boolean) {
    const info = this.player.getVideoInfo();
    if (p > 0 && p <= (info.list?.length || 0)) {
      this.player.setVideo(
        {
          ...this.baseVideoInfo,
          part: p,
        },
        play ?? !this.player.paused
      );
    }
  }
  get num() {
    return this.player.getVideoInfo().list?.length || 0;
  }
  get list() {
    return this.player.getVideoInfo().list || [];
  }
  get part() {
    return this.player.getVideoInfo().part || 1;
  }
}
