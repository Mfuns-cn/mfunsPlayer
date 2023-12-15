import type { PlayerOptions } from "@/types";
import Player from "@/player";
import { BasePlugin } from "@/plugin";

declare module "@/types" {
  interface PluginExports {
    widescreen?: Widescreen;
  }
  interface PlayerOptions {
    widescreen?: boolean;
    widescreenToggle?: (flag: boolean) => void;
  }
  interface PlayerEventMap {
    "widescreen:enter": () => void;
    "widescreen:exit": () => void;
  }
}

/** 宽屏模式插件 */

export default class Widescreen extends BasePlugin {
  static readonly pluginName = "widescreen";
  private _handler?: (flag: boolean) => void;
  constructor(player: Player, options: PlayerOptions) {
    super(player);
    options.widescreen && this.enter();
    this._handler = options.widescreenToggle;
  }
  enter() {
    if (this.status) return;
    this.player.$el.classList.add("state-widescreen");
    this._handler?.(true);
    this.player.emit("widescreen:enter");
  }
  exit() {
    if (!this.status) return;
    this.player.$el.classList.remove("state-widescreen");
    this._handler?.(false);
    this.player.emit("widescreen:exit");
  }
  get status() {
    return this.player.$el.classList.contains("state-widescreen");
  }
}
