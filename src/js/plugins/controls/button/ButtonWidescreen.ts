import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import {} from "../../screen/widescreen";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_widescreen">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-widescreen"></i>
      <i class="mpicon-widescreen-exit"></i>
    </div>
    <div class="mpui-tooltip">宽屏模式</div>
  </div>
`;

export default class ButtonWidescreen extends ControlsPlugin {
  static pluginName = "buttonWidescreen";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonWide",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$right,
        order: 8,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  created() {
    this.player.on("widescreen:enter", () => {
      this.$el.classList.add("state-on");
      this.$tooltip.innerText = "退出宽屏模式";
    });
    this.player.on("widescreen:exit", () => {
      this.$el.classList.remove("state-on");
      this.$tooltip.innerText = "宽屏模式";
    });
    this.$icon.addEventListener("click", () => {
      const { widescreen } = this.plugin;
      if (!widescreen) return;
      if (!widescreen.status) {
        widescreen.enter();
      } else {
        widescreen.exit();
      }
    });
  }
}
