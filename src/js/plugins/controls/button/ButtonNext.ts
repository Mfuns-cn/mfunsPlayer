import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_next">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-next"></i>
    </div>
    <div class="mpui-tooltip">下一P</div>
  </div>
`;

export default class ButtonNext extends ControlsPlugin {
  static pluginName = "buttonNext";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonNext",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$left,
        order: 2,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  created() {
    /* 
    this.player.on("video_change", (info) => {
      if (info.part! > this.player.videoInfo.list?.length) {
        this.$el.classList.remove("state-lastpart");
      } else {
        this.$el.classList.add("state-lastpart");
      }
    }); */
    this.$icon.addEventListener("click", () => {
      this.player.next();
    });
  }
}
