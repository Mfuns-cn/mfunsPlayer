import { Checkbox } from "@/components";
import Player from "@/player";
import { PlayerOptions } from "@/types";
import { BasePlugin } from "@/plugin";
import { createElement } from "@/utils";
import { classPrefix } from "@/config";

declare module "@core" {
  interface PlayerEventMap {
    /** 关灯模式 */
    lightOffChange: (flag: boolean) => void;
  }
}

/** 关灯模式 */

export default class LightOff extends BasePlugin {
  static pluginName = "lightOff";
  status = false;
  checkbox?: Checkbox;
  $mask: HTMLElement;
  constructor(player: Player) {
    super(player);
    this.$mask = createElement("div", { class: `${classPrefix}-lightoff-mask` });
    if (player.plugin.buttonSettings) {
      const container = document.createElement("div");
      this.checkbox = new Checkbox({
        container,
        value: this.status,
        onToggle: (val) => {
          this.toggle(val);
        },
        label: "关灯模式",
      });
      player.plugin.settings?.$others.appendChild(container);
      player.on("lightOffChange", (flag) => this.checkbox?.setValue(flag));
    }
  }
  ready() {
    this.player.$el.append(this.$mask);
  }
  toggle(v: boolean) {
    if (v) {
      this.player.$el.classList.add("is-lightoff");
    } else {
      this.player.$el.classList.remove("is-lightoff");
    }
    this.player.emit("lightOffChange", v);
  }
}
