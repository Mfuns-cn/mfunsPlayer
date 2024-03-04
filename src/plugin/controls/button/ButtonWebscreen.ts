import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-webscreen">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-webscreen"></i>
      <i class="mpicon-webscreen-exit"></i>
    </div>
    <div class="mpui-tooltip">网页全屏</div>
  </div>
`;

export default class ButtonWebscreen extends ControlsPlugin {
  static pluginName = "buttonWebscreen";
  name = "webscreen";
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
    this.player.on("webscreenEnter", () => {
      this.$el.classList.add("is-on");
      this.$tooltip.innerText = "退出网页全屏";
    });
    this.player.on("webscreenExit", () => {
      this.$el.classList.remove("is-on");
      this.$tooltip.innerText = "网页全屏";
    });
    this.$icon.addEventListener("click", () => {
      if (!this.player.isWebscreen) {
        this.player.enterWebscreen?.();
      } else {
        this.player.exitWebscreen?.();
      }
    });
  }
  get ignored() {
    return !this.player.enterWebscreen;
  }
}
