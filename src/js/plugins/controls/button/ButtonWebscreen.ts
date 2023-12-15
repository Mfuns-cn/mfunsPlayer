import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_webscreen">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-webscreen"></i>
      <i class="mpicon-webscreen-exit"></i>
    </div>
    <div class="mpui-tooltip">网页全屏</div>
  </div>
`;

export default class ButtonWebscreen extends ControlsPlugin {
  static pluginName = "buttonWebscreen";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonWebscreen",
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
    this.player.on("webscreen:enter", () => {
      this.$el.classList.add("state-on");
      this.$tooltip.innerText = "退出网页全屏";
    });
    this.player.on("webscreen:exit", () => {
      this.$el.classList.remove("state-on");
      this.$tooltip.innerText = "网页全屏";
    });
    this.$icon.addEventListener("click", () => {
      const { webscreen } = this.plugin;
      if (!webscreen) return;
      if (!webscreen.status) {
        webscreen.enter();
      } else {
        webscreen.exit();
      }
    });
  }
}
