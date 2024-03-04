import type { PlayerOptions } from "@/types";
import Player from "@/player";
import { BasePlugin } from "@/plugin";

declare module "@core" {
  interface Player {
    /** 是否为宽屏模式 */
    isWidescreen?: boolean;
    /** 进入宽屏模式 */
    enterWidescreen?: () => void;
    /** 退出宽屏模式 */
    exitWidescreen?: () => void;
  }
}

declare module "@core" {
  interface PlayerOptions {
    widescreen?: boolean;
  }
  interface PlayerInvokes {
    widescreen?: (flag: boolean) => void;
  }
  interface PlayerEventMap {
    widescreenEnter: () => void;
    widescreenExit: () => void;
  }
  interface PlayerPlugins {
    widescreen?: Widescreen;
  }
}

/** 宽屏模式插件 */

export default class Widescreen extends BasePlugin {
  static readonly pluginName = "widescreen";
  public invokeToggle?: (flag: boolean) => void;

  init() {
    // --- 绑定属性 --- //

    this.player.define("isWidescreen", {
      get: () => this.status,
    });
    this.player.define("enterWidescreen", () => this.enter());
    this.player.define("exitWidescreen", () => this.exit());
  }

  apply(player: Player, options: PlayerOptions): void {
    this.invokeToggle = options.invoke?.widescreen;
    options.widescreen && this.enter();
  }

  enter() {
    if (this.status) return;
    this.player.$el.classList.add("is-widescreen");
    this.invokeToggle?.(true);
    this.player.emit("widescreenEnter");
  }
  exit() {
    if (!this.status) return;
    this.player.$el.classList.remove("is-widescreen");
    this.invokeToggle?.(false);
    this.player.emit("widescreenExit");
  }
  get status() {
    return this.player.$el.classList.contains("is-widescreen");
  }
}
