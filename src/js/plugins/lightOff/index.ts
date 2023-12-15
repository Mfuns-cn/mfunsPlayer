import { Checkbox } from "@/components";
import Player from "@/player";
import { PlayerOptions } from "@/types";
import { BasePlugin } from "@/plugin";
import { createElement } from "@/utils";
import { classPrefix } from "@/config";

declare module "@/types" {
  interface PlayerPropertyMap {
    /** 关灯模式 */
    lightOff: boolean;
  }
}

export default class LightOff extends BasePlugin {
  static pluginName: "lightOff";
  status = false;
  checkbox?: Checkbox;
  $mask: HTMLElement;
  constructor(player: Player, options: PlayerOptions) {
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
      player.watch("lightOff", (flag) => this.checkbox?.setValue(flag));
    }
  }
  pluginsReady() {
    this.player.$el.append(this.$mask);
  }
  toggle(v: boolean) {
    if (v) {
      this.player.$el.classList.add("state-lightoff");
    } else {
      this.player.$el.classList.remove("state-lightoff");
    }
    this.player.emitChange("lightOff", v);
  }
}
