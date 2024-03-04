import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";
import { Checkbox } from "@/components";

declare module "@core" {
  interface PlayerEventMap {
    /** 分P连播 */
    autoPartChange: (flag: boolean) => void;
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
  init() {
    this.player.hook.register("end", () => {
      if (this.status) {
        const { part, list } = this.player.getVideoInfo();
        if (part != list?.length) {
          this.player.next();
          return false;
        }
      }
    });
  }
  apply(player: Player, options: PlayerOptions): void {
    if (options.autoPart) this.toggle(true);
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
    this.player.emit("autoPartChange", v);
  }
  get status() {
    return this._status;
  }
}
