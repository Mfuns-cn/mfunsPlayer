import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

declare module "@/types" {
  interface PluginExports {
    sources?: Sources;
  }
  export interface VideoInfo {
    /** 视频源列表 */
    sources?: VideoSource[];
  }
}

export interface VideoSource {
  url: string;
  type?: string;
}

export default class Sources extends BasePlugin {
  static pluginName = "sources";
  created() {
    this.player.hook.register("setVideo", (info) => {
      if (!info.url) {
        const source = info.sources?.[0];
        if (source) {
          info.url = source.url;
          info.type = source.type;
        }
      }
    });
  }
  /** 设置视频源 */
  set(v: VideoSource) {
    this.player.switchVideo({ url: v.url, type: v.type });
  }
}
