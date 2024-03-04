import { Checkbox } from "@/components";
import Player from "@/player";
import { PlayerOptions } from "@/types";
import { BasePlugin } from "@/plugin";

declare module "@core" {
  interface PlayerEventMap {
    /** 视频黑边 */
    blackBorderChange: (flag: boolean) => void;
  }
  interface PlayerOptions {
    /** 视频黑边 */
    blackBorder?: boolean;
    /** 视频黑边边距 */
    blackBorderPadding?: string;
  }
}

/** 视频黑边 */

export default class BlackBorder extends BasePlugin {
  static pluginName = "blackBorder";
  padding: string = "";
  checkbox?: Checkbox;
  constructor(player: Player) {
    super(player);
    if (player.plugin.buttonSettings) {
      const container = document.createElement("div");
      this.checkbox = new Checkbox({
        container,
        value: !this.status,
        onToggle: (val) => {
          this.toggle(!val);
        },
        label: "隐藏黑边",
      });
      player.plugin.settings?.$others.appendChild(container);
    }
  }
  apply(player: Player, options: PlayerOptions): void {
    this.padding = options.blackBorderPadding || "8px";
    if (options.blackBorder) this.toggle(true);
  }
  toggle(v: boolean) {
    if (v) {
      this.player.$content.style.setProperty("--padding", this.padding);
    } else {
      this.player.$content.style.setProperty("--padding", "");
    }
    this.player.emit("blackBorderChange", v);
  }
  get status() {
    return !!this.player.$content.style.getPropertyValue("--padding");
  }
}
