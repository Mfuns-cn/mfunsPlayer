import { classPrefix } from "@/config";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";
import { createElement } from "@/utils";
import MfunsPlayer from "@/player";
import { html, render } from "lit-html";

const template = html`
  <div class="${classPrefix}-videostatus-paused"></div>
  <div class="${classPrefix}-videostatus-loading">
    <div class="${classPrefix}-videostatus-loading-icon">
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
    <div class="${classPrefix}-videostatus-loading-content">正在缓冲</div>
    <div class="${classPrefix}-videostatus-loading-speed"></div>
  </div>
  <div class="${classPrefix}-videostatus-volume"></div>
`;

export default class VideoStatus extends BasePlugin {
  static pluginName = "videoStatus";
  $el: HTMLElement;
  $paused: HTMLElement;
  $loading: HTMLElement;
  $volume: HTMLElement;
  constructor(player: MfunsPlayer, options: PlayerOptions) {
    super(player);
    this.$el = createElement("div", { class: `${classPrefix}-videostatus` });
    render(template, this.$el);
    this.$paused = this.$el.querySelector(`.${classPrefix}-videostatus-paused`)!;
    this.$loading = this.$el.querySelector(`.${classPrefix}-videostatus-loading`)!;
    this.$volume = this.$el.querySelector(`.${classPrefix}-videostatus-volume`)!;

    this.player.$area.appendChild(this.$el);
  }
}
