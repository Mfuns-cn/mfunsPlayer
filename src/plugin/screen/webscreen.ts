import Player from "@/player";
import { BasePlugin } from "@/plugin";

declare module "@core" {
  interface Player {
    /** 是否为网页全屏模式 */
    isWebscreen?: boolean;
    /** 进入网页全屏模式 */
    enterWebscreen?: () => void;
    /** 退出网页全屏模式 */
    exitWebscreen?: () => void;
  }
  interface PlayerEventMap {
    /** 进入网页全屏模式 */
    webscreenEnter: () => void;
    /** 退出网页全屏模式 */
    webscreenExit: () => void;
  }
}

export default class Webscreen extends BasePlugin {
  static pluginName = "webscreen";
  init() {
    // --- 绑定属性 --- //

    this.player.define("isWebscreen", {
      get: () => this.status,
    });
    this.player.define("enterWebscreen", () => this.enter());
    this.player.define("exitWebscreen", () => this.exit());

    // --- 绑定事件 --- //

    // 进入全屏模式时，退出网页全屏模式
    this.player.on("fullscreenEnter", () => {
      this.exit();
    });
    // 进入网页全屏模式时，退出全屏模式
    this.player.on("webscreenEnter", () => {
      this.player.exitFullscreen?.();
    });
  }

  // --- 内置方法 --- //
  /** 进入网页全屏 */
  enter() {
    if (this.status) return;
    this.player.$el.classList.add("is-webscreen");
    this.player.emit("webscreenEnter");
  }
  /** 退出网页全屏 */
  exit() {
    if (!this.status) return;
    this.player.$el.classList.remove("is-webscreen");
    this.player.emit("webscreenExit");
  }
  /** 当前状态 */
  get status(): boolean {
    return this.player.$el.classList.contains("is-webscreen");
  }
}
