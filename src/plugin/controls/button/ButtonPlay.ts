import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-play is-paused">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-play"></i>
      <i class="mpicon-pause"></i>
    </div>
    <div class="mpui-tooltip">播放</div>
  </div>
`;

export default class ButtonPlay extends ControlsPlugin {
  static pluginName = "buttonPlay";
  name = "play";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, fragment.querySelector(`.${classPrefix}-controls-button`)!);
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  init() {
    this.player.on("pause", () => {
      this._change(false);
    });
    this.player.on("play", () => {
      this._change(true);
    });
    this.player.on("videoChange", () => {
      this._change(false);
    });
    this.$icon.addEventListener("click", () => {
      this.player.paused ? this.player.play() : this.player.pause();
    });
  }
  /** 设置按钮状态 */
  private _change(flag: boolean) {
    this.$el.classList.toggle("is-on", flag);
    this.$tooltip.innerText = flag ? "暂停" : "播放";
  }
}
