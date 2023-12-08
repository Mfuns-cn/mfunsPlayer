import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_loop">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-loop-off"></i>
      <i class="mpicon-loop"></i>
    </div>
    <div class="mpui-tooltip">洗脑循环</div>
  </div>
`;

export default class ButtonLoop extends ControlsPlugin {
  static pluginName = "buttonLoop";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonLoop",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$left,
        order: 4,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  created() {
    this.player.watch("loop", (flag) => {
      this.$el.classList.toggle("state-on", flag);
      this.$tooltip.innerText = flag ? "关闭洗脑循环" : "洗脑循环";
    });
    this.$icon.addEventListener("click", () => {
      if (this.player.loop) {
        this.player.setLoop(false);
      } else {
        this.player.setLoop(true);
      }
    });
  }
}
