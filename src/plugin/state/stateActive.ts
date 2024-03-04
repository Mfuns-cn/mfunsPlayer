import type { PlayerOptions } from "@/types";
import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { debounce } from "@/utils";

declare module "@core" {
  interface Player {
    /** 是否为活跃状态 */
    isActive?: boolean;
    /** 是否为操作中状态 */
    isControlled?: boolean;
    /** 设置活跃状态 */
    setActive?: () => void;
    /** 移除活跃状态 */
    removeActive?: () => void;
  }
  interface PlayerOptions {
    /** 活跃持续时间 */
    activeDuration?: number;
  }
  interface PlayerEventMap {
    active: () => void;
    inactive: () => void;
  }
  interface PlayerHookMap {
    inactive: void;
  }
  interface PlayerPlugins {
    stateActive?: StateActive;
  }
}

/** 活跃状态插件 */

export default class StateActive extends BasePlugin {
  static readonly pluginName = "stateActive";
  #status = false;
  #mousemove = false;
  /** 活跃持续时间 */
  public activeDuration: number = 3000;
  constructor(player: Player) {
    super(player);

    // --- 绑定属性 --- //
    this.player.define("isActive", {
      get: () => this.#status,
    });

    // --- 绑定事件 --- //
    const debounceRemoveActive = debounce(() => {
      this.#mousemove = false;
      this.remove();
    }, this.activeDuration);
    this.player.$main.addEventListener("mousemove", () => {
      this.#mousemove = true;
      this.set();
      debounceRemoveActive();
    });
    this.player.$main.addEventListener("mouseleave", () => {
      this.#mousemove = false;
      this.remove();
    });
  }

  apply(player: Player, options: PlayerOptions) {
    this.activeDuration = options.activeDuration ?? 3000;
  }

  /** 设置播放器活跃状态 */
  set() {
    if (this.#status) return;
    this.player.$el.classList.add("is-active");
    this.#status = true;
    this.player.emit("active");
  }
  /** 移除播放器活跃状态 */
  remove() {
    if (!this.#status || this.#mousemove || this.player.isControlled) return;
    this.player.hook.call("inactive").then((res) => {
      if (!res) return;
      this.player.$el.classList.remove("is-active");
      this.#status = false;
      this.player.emit("inactive");
    });
  }
}
