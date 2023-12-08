import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_play state-paused">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-play"></i>
      <i class="mpicon-pause"></i>
    </div>
    <div class="mpui-tooltip">播放</div>
  </div>
`;

export default class ButtonPlay extends ControlsPlugin {
  static pluginName = "buttonPlay";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonPlay",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$left,
        order: 1,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  created() {
    this.player.on("pause", () => {
      this._change(false);
    });
    this.player.on("play", () => {
      this._change(true);
    });
    this.player.on("video_change", () => {
      this._change(false);
    });
    this.$icon.addEventListener("click", () => {
      this.player.toggle();
    });
  }
  /** 设置按钮状态 */
  private _change(flag: boolean) {
    this.$el.classList.toggle("state-on", flag);
    this.$tooltip.innerText = flag ? "暂停" : "播放";
  }
}
