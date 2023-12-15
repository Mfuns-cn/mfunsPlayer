import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

declare module "@/types" {
  interface PluginExports {
    part?: Part;
  }

  export interface VideoInfo {
    /** 视频分P列表 */
    list?: Omit<VideoInfo, "list" | "part">[];
    /** 要播放的分P */
    part?: number;
  }
}

export default class Part extends BasePlugin {
  static pluginName = "part";
  constructor(player: Player) {
    super(player);
  }
  created() {
    this.player.hook.register(
      "setVideo",
      (info) => {
        // 如果视频信息中存在list，且没有url或者sources，则设置part
        if (info.list && !info.url && !info.sources) {
          info.part ||= 1;
          Object.assign(info, info.list[info.part - 1]);
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
    this.player.hook.register("hasNext", () => (this.list && this.part! < this.num) || void 0);
    this.player.hook.register("hasPrev", () => (this.list && this.part! > 1) || void 0);
  }
  /** 设置分P */
  set(p: number, play?: boolean) {
    const info = this.player.videoInfo;
    if (p > 0 && p <= (info.list?.length || 0)) {
      this.player.setVideo(
        {
          ...info,
          url: void 0,
          type: void 0,
          sources: void 0,
          ...info.list![p - 1],
          part: p,
        },
        play ?? !this.player.paused
      );
    }
  }
  get num() {
    return this.player.videoInfo.list?.length || 0;
  }
  get list() {
    return this.player.videoInfo.list || [];
  }
  get part() {
    return this.player.videoInfo.part || 1;
  }
}
