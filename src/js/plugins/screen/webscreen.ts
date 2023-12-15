import Player from "@/player";
import { BasePlugin } from "@/plugin";

declare module "@/types" {
  interface PluginExports {
    webscreen?: Webscreen;
  }
}

export default class Webscreen extends BasePlugin {
  static pluginName = "webscreen";

  constructor(player: Player) {
    super(player);

    // 进入网页全屏时，退出全屏模式
    this.player.on("webscreen:enter", () => {
      this.plugin.fullscreen?.exit();
    });
    // 进入全屏时，退出网页全屏模式
    this.player.on("fullscreen:enter", () => {
      this.exit();
    });
  }

  /** 进入网页全屏 */
  enter() {
    if (this.status) return;
    this.player.$el.classList.add("state-webscreen");
    this.player.emit("webscreen:enter");
  }

  /** 退出网页全屏 */
  exit() {
    if (!this.status) return;
    this.player.$el.classList.remove("state-webscreen");
    this.player.emit("webscreen:exit");
  }

  /** 是否处于网页全屏模式 */
  get status(): boolean {
    return this.player.$el.classList.contains("state-webscreen");
  }
}
