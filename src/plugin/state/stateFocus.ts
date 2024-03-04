import type { PlayerOptions } from "@/types";
import Player from "@/player";
import { BasePlugin } from "@/plugin";

declare module "@core" {
  interface Player {
    /** 是否为聚焦状态 */
    isFocused?: boolean;
    /** 播放器聚焦 */
    focus?: () => void;
    /** 播放器取消聚焦 */
    blur?: () => void;
  }
  interface PlayerEventMap {
    focus: () => void;
    blur: () => void;
  }
}

/** 聚焦状态插件 */

export default class StateFocus extends BasePlugin {
  static readonly pluginName = "stateFocus";
  constructor(player: Player) {
    super(player);

    // --- 绑定属性 --- //
    this.player.define("isFocused", {
      get: () => this.status,
    });

    // --- 绑定事件 --- //
    document.addEventListener(
      "click",
      () => {
        this.toggle(false);
      },
      true
    );
    this.player.$el.addEventListener(
      "click",
      () => {
        this.toggle(true);
      },
      true
    );
  }

  /** 设置播放器聚焦状态 */
  toggle(flag: boolean) {
    if (this.status == flag) return;
    this.player.$el.classList.toggle("is-focus", flag);
    this.player.emit(flag ? "focus" : "blur");
  }

  get status() {
    return this.player.$el.classList.contains("is-focus");
  }
}
