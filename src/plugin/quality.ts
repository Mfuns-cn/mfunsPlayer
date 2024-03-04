import { BasePlugin } from "@/plugin";

declare module "@core" {
  interface Player {
    quality?: Quality;
  }
}

declare module "@core" {
  export interface PlayerEventMap {
    /** 视频质量切换 */
    qualityChanging: (quality: QualityItem) => void;
    /** 视频质量切换完毕 */
    qualityChanged: (quality: QualityItem) => void;
    /** 视频质量切换失败 */
    qualityChangeFailed: (quality: QualityItem) => void;
    /** 视频质量列表更新 */
    qualityListUpdate: (quality: QualityItem[]) => void;
  }
}

export interface VideoSource {
  url: string;
  type: string;
  label?: string;
  quality?: string;
}
export interface QualityItem {
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 帧率 */
  frameRate?: number;
  /** 码率 */
  bitRate?: number;
  /** 视频源url */
  url?: string;
  /** 视频类型 */
  type?: string;
  /** 视频质量描述 */
  quality?: string;
  /** 视频质量切换逻辑 */
  change?: (url?: string) => Promise<void>;
}

export default class Quality extends BasePlugin {
  static pluginName = "quality";
  /** 当前视频质量 */
  current: QualityItem | null = null;
  /** 目标切换视频质量 */
  target: QualityItem | null = null;
  /** 视频质量列表 */
  list: QualityItem[] = [];
  init() {
    this.player.hook.register("video.set", () => {
      this.current = null;
      this.target = null;
      this.list = [];
    });
  }
  apply(): void {
    this.player.define("quality", { value: this });
  }
  /** 切换视频质量 */
  set(item: string | QualityItem) {
    let quality: QualityItem;
    if (typeof item == "string") {
      const result = this.list.find((item) => quality === item.quality);
      if (!result) {
        this._emitChangeFailed({});
        return;
      }
      quality = result;
    } else {
      quality = item;
    }
    if (quality.change) {
      quality.change(quality.url).then(
        () => {
          this.updateCurrent(quality);
        },
        () => {
          this._emitChangeFailed(quality);
        }
      );
    } else if (quality.url) {
      this.player.loadVideo({ url: quality.url, type: quality.type, play: true, time: true });
      this.player.once("canplay", () => {
        this.updateCurrent(quality);
      });
    }
  }
  private _emitChangeFailed(quality: QualityItem) {
    this.target = null;
    this.player.emit("qualityChangeFailed", quality);
  }
  /** 更新当前视频质量 */
  async updateCurrent(quality: QualityItem) {
    this.current = quality;
    this.target = null;
    this.player.emit("qualityChanged", quality);
  }
  /** 更新视频质量列表 */
  async updateList(list: QualityItem[]) {
    this.list = list;
    this.player.emit("qualityListUpdate", list);
  }
}
