import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import {} from "../../wide";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_wide">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-wide"></i>
      <i class="mpicon-wide-exit"></i>
    </div>
    <div class="mpui-tooltip">宽屏模式</div>
  </div>
`;

export default class ButtonWide extends ControlsPlugin {
  static pluginName = "buttonWide";
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
    this.player.on("wide_enter", () => {
      this.$el.classList.add("state-on");
      this.$tooltip.innerText = "退出宽屏模式";
    });
    this.player.on("wide_exit", () => {
      this.$el.classList.remove("state-on");
      this.$tooltip.innerText = "宽屏模式";
    });
    this.$icon.addEventListener("click", () => {
      if (this.player.plugin.wide?.status) {
        this.player.plugin.wide?.exit();
      } else {
        this.player.plugin.wide?.enter();
      }
    });
  }
}
