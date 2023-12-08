import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_webfull">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-webfull"></i>
      <i class="mpicon-webfull-exit"></i>
    </div>
    <div class="mpui-tooltip">网页全屏</div>
  </div>
`;

export default class ButtonWebfull extends ControlsPlugin {
  static pluginName = "buttonWebfull";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonWebfull",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$right,
        order: 9,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  created() {
    this.player.on("webfull_enter", () => {
      this.$el.classList.add("state-on");
      this.$tooltip.innerText = "退出网页全屏";
    });
    this.player.on("webfull_exit", () => {
      this.$el.classList.remove("state-on");
      this.$tooltip.innerText = "网页全屏";
    });
    this.$icon.addEventListener("click", () => {
      if (this.player.isWebfull) {
        this.player.exitWebfull();
      } else {
        this.player.enterWebfull();
      }
    });
  }
}
