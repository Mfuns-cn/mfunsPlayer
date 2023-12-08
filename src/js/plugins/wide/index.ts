import type { PlayerOptions } from "@/types";
import Player from "@/player";
import { BasePlugin } from "@/plugin";

declare module "@/types" {
  interface PluginExports {
    wide?: Wide;
  }
  interface PlayerOptions {
    wide?: boolean;
    wideHandler?: (flag: boolean) => void;
  }
  interface PlayerEventMap {
    wide_enter: () => void;
    wide_exit: () => void;
  }
}

/** 宽屏模式插件 */

export default class Wide extends BasePlugin {
  static readonly pluginName = "wide";
  handler?: (flag: boolean) => void;
  constructor(player: Player, options: PlayerOptions) {
    super(player);
    options.wide && this.enter();
    this.handler = options.wideHandler;
  }
  enter() {
    this.player.$el.classList.add("state-wide");
    this.handler?.(true);
    this.player.emit("wide_enter");
  }
  exit() {
    this.player.$el.classList.remove("state-wide");
    this.handler?.(false);
    this.player.emit("wide_exit");
  }
  get status() {
    return this.player.$el.classList.contains("state-wide");
  }
}
