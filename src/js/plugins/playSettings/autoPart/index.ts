import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";
import { Checkbox } from "@/components";

declare module "@/types" {
  interface PlayerPropertyMap {
    /** 分P连播 */
    autoPart: boolean;
  }
  interface PlayerOptions {
    /** 分P连播 */
    autoPart?: boolean;
  }
}

/** 自动切换下一P */

export default class AutoPart extends BasePlugin {
  static pluginName = "autoPart";
  private _status = false;
  protected checkbox?: Checkbox;
  constructor(player: Player, options: PlayerOptions) {
    super(player);
    if (options.autoPart) this.toggle(true);
    this.player.hook.register("end", () => {
      if (this.status) {
        if (this.player.videoInfo.part != this.player.videoInfo.list?.length) {
          this.player.next();
          return false;
        }
      }
    });
  }
  pluginsReady() {
    if (this.plugin.settings) {
      const container = document.createElement("div");
      this.checkbox = new Checkbox({
        container,
        value: this.status,
        onToggle: (val) => {
          this.toggle(val);
        },
        label: "分P连播",
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
    this.player.emitChange("autoPart", v);
  }
  get status() {
    return this._status;
  }
}
