import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";
import { Checkbox } from "@/components";

declare module "@core" {
  interface PlayerEventMap {
    /** 自动播放 */
    autoPlayChange: (flag: boolean) => void;
  }
}

/** 启用自动播放设置 */

export default class AutoPlay extends BasePlugin {
  static pluginName = "autoPlay";
  private _status = false;
  protected checkbox?: Checkbox;
  apply(player: Player, options: PlayerOptions) {
    if (options.autoPlay) this.toggle(true);
  }
  ready() {
    if (this.plugin.settings) {
      const container = document.createElement("div");
      this.checkbox = new Checkbox({
        container,
        value: this.status,
        onToggle: (val) => {
          this.toggle(val);
        },
        label: "自动播放",
      });
      this.plugin.settings.$play.appendChild(container);
    }
  }
  toggle(v: boolean) {
    if (v) {
      this._status = true;
    } else {
      this._status = false;
    }
    this.player.emit("autoPlayChange", v);
  }
  get status() {
    return this._status;
  }
}
