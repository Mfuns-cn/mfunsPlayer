import type { PlayerOptions } from "@/types";
import Player from "@/player";
import { BasePlugin } from "@/plugin";

declare module "@core" {
  interface Player {
    /** 是否与视口交叉 */
    isIntersecting?: boolean;
  }
  interface PlayerEventMap {
    intersection: (flag: boolean) => void;
  }
}

/** 聚焦状态插件 */

export default class StateIntersecting extends BasePlugin {
  static readonly pluginName = "stateIntersecting";
  private _status = false;
  private readonly observer?: IntersectionObserver;
  constructor(player: Player) {
    super(player);

    // --- 绑定属性 --- //
    this.player.define("isIntersecting", {
      get: () => this._status,
    });

    // --- 初始化observer --- //
    if (window.IntersectionObserver) {
      this.observer = new window.IntersectionObserver(([item]) => {
        const { isIntersecting } = item;
        this._status = isIntersecting;
        this.player.emit("intersection", isIntersecting);
      });
    }
    this.player.once("mounted", () => {
      this.observer?.observe(this.player.$el);
    });
  }
}
