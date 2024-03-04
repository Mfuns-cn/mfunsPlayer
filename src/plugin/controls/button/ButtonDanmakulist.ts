import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-danmakulist">
    <div class="${classPrefix}-controls-button-icon">
      <div class="${classPrefix}-controls-button-text">弹幕列表</div>
    </div>
    <div class="mpui-tooltip">弹幕列表</div>
  </div>
`;

export default class ButtonDanmakulist extends ControlsPlugin {
  static pluginName = "buttonDanmakuList";
  name = "danmakuList";

  $icon: HTMLElement;
  $tooltip: HTMLElement;
  $text: HTMLElement;

  constructor(player: Player) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, fragment.querySelector(`.${classPrefix}-controls-button`)!);

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$text = this.$(`.${classPrefix}-controls-button-text`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  init() {
    this.$icon.addEventListener("click", () => {
      this.plugin.danmakuList?.toggle();
    });
  }
}
