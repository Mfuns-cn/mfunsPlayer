import { Checkbox } from "@/components";
import Player from "@/player";
import { PlayerOptions } from "@/types";
import { BasePlugin } from "@/plugin";
import { ResizeObserver as ResizeObserverPonyfill } from "@juggle/resize-observer";

declare module "@core" {
  interface Player {
    aspectRatio?: string;
    setAspectRatio?: (value: string) => void;
  }
  interface PlayerEventMap {
    /** 视频比例 */
    aspectRatioChange: (value: string) => void;
  }
  interface PlayerOptions {
    /** 视频比例 */
    aspectRatio?: string;
  }
}

/** 视频比例 */

export default class AspectRatio extends BasePlugin {
  static pluginName = "aspectRatio";
  #ratio: [number, number] | null = null;
  private readonly observer?: ResizeObserver;
  constructor(player: Player) {
    super(player);

    // --- 初始化observer --- //
    const Observer = window.ResizeObserver || ResizeObserverPonyfill;
    if (Observer) {
      this.observer = new Observer(([item]) => {
        const { width, height } = item.contentRect;
        this._keepRatio(width, height);
      });
    }
  }
  apply(player: Player, options: PlayerOptions): void {
    this.#ratio = this._parse(options.aspectRatio || "");
  }
  init() {
    this.player.define("aspectRatio", { get: () => this._stringify(this.#ratio) });
    this.player.define("setAspectRatio", (value: string) => {
      this.set(value);
    });
  }
  mounted(): void {
    console.log("233333311111111");
    this.observer?.observe(this.player.$area);
    this._setRatio(this.#ratio);
  }
  set(value: string) {
    const ratio = this._parse(value);
    this.#ratio = ratio;
    this._setRatio(ratio);
    this.player.emit("aspectRatioChange", this._stringify(ratio));
  }
  /** 设置视频比例 */
  private _setRatio(ratio: [number, number] | null) {
    const video = this.player.$video;
    video.style.width = "";
    video.style.height = "";
    if (ratio) {
      const [ratioW, ratioH] = ratio;
      video.style.aspectRatio = `${ratioW}/${ratioH}`;
      video.style.objectFit = "fill";
      const { width, height } = video.getBoundingClientRect();
      const { width: cWidth, height: cHeight } = this.player.$area.getBoundingClientRect();
      if (width == cWidth && height == cHeight) {
        this._rescale(width, height, ratioW, ratioH);
      }
    } else {
      video.style.aspectRatio = "";
      video.style.objectFit = "";
    }
  }
  /** 保持视频比例 */
  private _keepRatio(cWidth: number, cHeight: number) {
    if (this.#ratio) {
      const video = this.player.$video;
      video.style.width = "";
      video.style.height = "";
      const [ratioW, ratioH] = this.#ratio;
      const { width, height } = video.getBoundingClientRect();
      console.log(`${width} x ${height} -- ${cWidth} x ${cHeight}`);
      if (Math.abs(width - cWidth) < 1 && Math.abs(height - cHeight) < 1) {
        // 该情况表示播放器大小可能已被固定，需要重新计算宽高
        this._rescale(cWidth, cHeight, ratioW, ratioH);
      }
    }
  }
  /** 根据当前视频宽高重新维持视频比例 */
  private _rescale(width: number, height: number, ratioW: number, ratioH: number) {
    const rwxh = ratioW * height;
    const rhxw = ratioH * width;
    const video = this.player.$video;
    if (rwxh < rhxw) {
      video.style.width = `${(rwxh / rhxw) * 100}%`;
      video.style.height = "100%";
    } else {
      video.style.width = "100%";
      video.style.height = `${(rhxw / rwxh) * 100}%`;
    }
  }
  private _parse(value: string): [number, number] | null {
    const [x, y] = value.split("/").map((n) => parseFloat(n));
    return x && y && isFinite(x) && isFinite(y) ? [x, y] : null;
  }
  private _stringify(ratio: [number, number] | null) {
    return ratio ? ratio.join("/") : "";
  }
}
