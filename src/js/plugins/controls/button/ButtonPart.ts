import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_part">
    <div class="${classPrefix}-controls-button-icon">
      <div class="${classPrefix}-controls-button-text">P0</div>
    </div>
    <div class="mpui-tooltip">分P列表</div>
  </div>
`;

export default class ButtonPart extends ControlsPlugin {
  static pluginName = "buttonPart";
  $icon: HTMLElement;
  $text: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonPart",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$right,
        order: 0,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$text = this.$(`.${classPrefix}-controls-button-text`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  created() {
    this.$icon.addEventListener("click", () => {
      this.plugin.partList?.toggle();
    });
    this.player.on("video_change", (info) => {
      this.$text.innerText = `P${info.part}`;
      this.$el.classList.toggle("state-show", (info.list?.length || 1) > 1);
    });
  }
}
