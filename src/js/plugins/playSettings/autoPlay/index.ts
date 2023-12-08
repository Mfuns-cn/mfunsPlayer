import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";
import { Checkbox } from "@/ui/components";

declare module "@/types" {
  interface PlayerPropertyMap {
    /** 自动播放 */
    autoPlay: boolean;
  }
}

/** 启用自动播放设置 */

export default class AutoPlay extends BasePlugin {
  static pluginName = "autoPlay";
  private _status = false;
  protected checkbox?: Checkbox;
  constructor(player: Player, options: PlayerOptions) {
    super(player);
    if (options.autoPlay) this.toggle(true);
  }
  pluginsReady() {
    if (this.player.plugin.settings) {
      const container = document.createElement("div");
      this.checkbox = new Checkbox({
        container,
        value: this.status,
        onToggle: (val) => {
          this.toggle(val);
        },
        label: "自动播放",
      });
      this.player.plugin.settings.$play.appendChild(container);
    }
  }
  toggle(v: boolean) {
    if (v) {
      this._status = true;
    } else {
      this._status = false;
    }
    this.player.emitChange("autoPlay", v);
  }
  get status() {
    return this._status;
  }
}
