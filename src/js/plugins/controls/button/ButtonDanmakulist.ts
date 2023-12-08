import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_danmakulist">
    <div class="${classPrefix}-controls-button-icon">
      <div class="${classPrefix}-controls-button-text">弹幕列表</div>
    </div>
    <div class="mpui-tooltip">弹幕列表</div>
  </div>
`;

export default class ButtonDanmakulist extends ControlsPlugin {
  static pluginName = "buttonDanmakuList";
  $icon: HTMLElement;
  $tooltip: HTMLElement;
  $text: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonDanmakuList",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$right,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$text = this.$(`.${classPrefix}-controls-button-text`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  created() {
    this.$icon.addEventListener("click", () => {
      this.player.plugin.danmakuList?.toggle();
    });
  }
}
