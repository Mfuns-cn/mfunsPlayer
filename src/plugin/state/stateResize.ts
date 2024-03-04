import type { PlayerOptions } from "@/types";
import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { ResizeObserver as ResizeObserverPonyfill } from "@juggle/resize-observer";

declare module "@core" {
  interface PlayerEventMap {
    resize: (size: [number, number]) => void;
  }
}

/** 尺寸更改状态插件 */

export default class StateResize extends BasePlugin {
  static readonly pluginName = "stateResize";
  private readonly observer?: ResizeObserver;
  constructor(player: Player) {
    super(player);

    // --- 初始化observer --- //
    const Observer = window.ResizeObserver || ResizeObserverPonyfill;
    if (Observer) {
      this.observer = new Observer(([item]) => {
        const { width, height } = item.contentRect;
        this.player.emit("resize", [width, height]);
      });
    }
  }
  mounted() {
    this.observer?.observe(this.player.$el);
  }
}
