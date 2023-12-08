import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { VideoSource } from "@/plugins/core/sources";
import { PlayerOptions } from "@/types";

declare module "@/types" {
  interface PluginExports {
    quality?: Quality;
  }
  export interface VideoInfo {
    /** 视频源列表 */
    sources?: VideoSource[];
  }
  export interface PlayerPropertyMap {
    quality: string;
  }
}

declare module "@/plugins/core/sources" {
  interface VideoSource {
    url: string;
    type?: string;
    label?: string;
    quality?: string;
  }
}

export default class Quality extends BasePlugin {
  static pluginName = "quality";
  value = "";
  constructor(player: Player, options: PlayerOptions) {
    super(player);
  }
  created() {
    this.player.hook.register("setVideo", (info) => {
      if (!info.url && info.sources) {
        const source = info.sources[0];
        info.url = source.url;
        info.type = source.type;
      }
    });
  }
  /** 切换视频质量
   */
  async set(quality: string) {
    const sources = this.player.videoInfo.sources;
    if (!sources) return;
    let source = sources.find((src) => src.quality == quality);
    if (!source) source = this.findSourceByQuality(sources, quality);
    this.player.switchVideo(source);
    this.player.emitChange("quality", source.quality || "");
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
}
