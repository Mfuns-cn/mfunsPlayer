import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_prev">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-prev"></i>
    </div>
    <div class="mpui-tooltip">上一P</div>
  </div>
`;

export default class ButtonPrev extends ControlsPlugin {
  static pluginName = "buttonPrev";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonPrev",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$left,
        order: 0,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  created() {
    /* this.player.on("part_change", (p) => {
      if (p > 1) {
        this.$el.classList.remove("state-firstpart");
      } else {
        this.$el.classList.add("state-firstpart");
      }
    }); */
    this.$icon.addEventListener("click", () => {
      this.player.prev();
    });
  }
  public show(flag: boolean) {
    this.$el.style.display = flag ? "" : "none";
  }
}
