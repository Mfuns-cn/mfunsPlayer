import { BasePlugin } from "@/plugin";
import { QualityItem } from "@plugin/quality";

declare module "@core" {
  interface VideoInfo {
    qualities?: QualityItem[];
  }
}
/** 将视频质量列表作为视频参数传入 */
export default class Qualities extends BasePlugin {
  /** 比较函数，若设置则根据该函数对清晰度列表排序 */
  compare?: (a: QualityItem, b: QualityItem) => number;
  /** 优先选择函数，默认情况下选择列表第一个值 */
  prior?: (list: QualityItem[]) => QualityItem;
  init() {
    this.player.on("videoChange", (info) => {
      if (info.qualities) {
        this.compare && info.qualities.sort((a, b) => this.compare!(a, b));
        this.player.quality?.updateList(info.qualities);
      }
    });
    this.player.hook.register("video.beforeLoad", (info) => {
      const list = this.player.getVideoInfo().qualities;
      let quality: QualityItem = {};
      if (!info.url && list) {
        quality = this.prior ? this.prior(list) : list[0];
        info.url = quality.url;
        info.type = quality.type;
      }
      this.player.quality?.updateCurrent(quality);
    });
  }
}
