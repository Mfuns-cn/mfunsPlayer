import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-part">
    <div class="${classPrefix}-controls-button-icon">
      <div class="${classPrefix}-controls-button-text">P0</div>
    </div>
    <div class="mpui-tooltip">分P列表</div>
  </div>
`;

export default class ButtonPart extends ControlsPlugin {
  static pluginName = "buttonPart";
  name = "part";
  $icon: HTMLElement;
  $text: HTMLElement;
  $tooltip: HTMLElement;

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
      this.plugin.partList?.toggle();
    });
    this.player.on("videoChange", (info) => {
      this.$text.innerText = `P${info.part}`;
      this.$el.classList.toggle("is-show", (info.list?.length || 1) > 1);
    });
  }
}
