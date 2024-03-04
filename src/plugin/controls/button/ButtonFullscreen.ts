import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";
import { fullScreenEnabled } from "@/utils";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-fullscreen">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-fullscreen"></i>
      <i class="mpicon-fullscreen-exit"></i>
    </div>
    <div class="mpui-tooltip">进入全屏</div>
  </div>
`;

export default class ButtonFullscreen extends ControlsPlugin {
  static pluginName = "buttonFullscreen";
  name = "fullscreen";

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
    this.player.on("fullscreenEnter", () => {
      this.$el.classList.add("is-on");
      this.$tooltip.innerText = "退出全屏";
    });
    this.player.on("fullscreenExit", () => {
      this.$el.classList.remove("is-on");
      this.$tooltip.innerText = "进入全屏";
    });
    this.$icon.addEventListener("click", () => {
      if (!this.player.isFullscreen) {
        this.player.enterFullscreen?.();
      } else {
        this.player.exitFullscreen?.();
      }
    });
  }
  get ignored() {
    return !this.player.enterFullscreen || !fullScreenEnabled;
  }
}
