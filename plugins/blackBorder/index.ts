import { Checkbox } from "@/ui/components";
import "./style.scss";
import Player from "@/player";
import { PlayerOptions } from "@/types";
import { BasePlugin } from "@/plugin";

declare module "@/types" {
  interface PlayerPropertyMap {
    /** 视频黑边 */
    blackBorder: boolean;
  }
  interface PlayerOptions {
    /** 视频黑边 */
    blackBorder?: boolean;
    /** 视频黑边边距 */
    blackBorderPadding?: string;
  }
}

export default class BlackBorder extends BasePlugin {
  static pluginName: "blackBorder";
  padding: string;
  constructor(player: Player, options: PlayerOptions) {
    super(player);
    this.padding = options.blackBorderPadding || "8px";
    if (player.plugin.buttonSettings) {
      const container = document.createElement("div");
      new Checkbox({
        container,
        value: !this.status,
        onToggle: (val) => {
          this.toggle(!val);
        },
        label: "隐藏黑边",
      });
      player.plugin.settings?.$others.appendChild(container);
    }
    if (options.blackBorder) this.toggle(true);
  }
  toggle(v: boolean) {
    if (v) {
      this.player.$content.style.setProperty("--padding", this.padding);
    } else {
      this.player.$content.style.setProperty("--padding", "");
    }
    this.player.emitChange("blackBorder", v);
  }
  get status() {
    return !!this.player.$content.style.getPropertyValue("--padding");
  }
}
