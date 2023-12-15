import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";
import { fullScreenEnabled } from "@/utils";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_fullscreen">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-fullscreen"></i>
      <i class="mpicon-fullscreen-exit"></i>
    </div>
    <div class="mpui-tooltip">进入全屏</div>
  </div>
`;

export default class ButtonFullscreen extends ControlsPlugin {
  static pluginName = "buttonFullscreen";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonFullscreen",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$right,
        order: 10,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
      disabled: !fullScreenEnabled,
    });
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  created() {
    this.player.on("fullscreen:enter", () => {
      this.$el.classList.add("state-on");
      this.$tooltip.innerText = "退出全屏";
    });
    this.player.on("fullscreen:exit", () => {
      this.$el.classList.remove("state-on");
      this.$tooltip.innerText = "进入全屏";
    });
    this.$icon.addEventListener("click", () => {
      const { fullscreen } = this.plugin;
      if (!fullscreen) return;
      if (!fullscreen.status) {
        fullscreen.enter();
      } else {
        fullscreen.exit();
      }
    });
  }
}
