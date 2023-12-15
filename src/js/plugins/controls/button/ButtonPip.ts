import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";
import { pictureInPictureEnabled } from "@/utils";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_pip">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-pip"></i>
      <i class="mpicon-pip-exit"></i>
    </div>
    <div class="mpui-tooltip">画中画</div>
  </div>
`;

export default class ButtonPip extends ControlsPlugin {
  static pluginName = "buttonPip";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonPip",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$right,
        order: 7,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
      disabled: !pictureInPictureEnabled,
    });
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  created() {
    this.player.on("pip:enter", () => {
      this.$el.classList.add("state-on");
      this.$tooltip.innerText = "退出画中画";
    });
    this.player.on("pip:exit", () => {
      this.$el.classList.remove("state-on");
      this.$tooltip.innerText = "画中画";
    });
    this.$icon.addEventListener("click", () => {
      const { pip } = this.plugin;
      if (!pip) return;
      if (pip.status) {
        pip.exit();
      } else {
        pip.enter();
      }
    });
  }
}
