import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";
import { pictureInPictureEnabled } from "@/utils";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-pip">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-pip"></i>
      <i class="mpicon-pip-exit"></i>
    </div>
    <div class="mpui-tooltip">画中画</div>
  </div>
`;

export default class ButtonPip extends ControlsPlugin {
  static pluginName = "buttonPip";
  name = "pip";
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
    this.player.on("enterpictureinpicture", () => {
      this.$el.classList.add("is-on");
      this.$tooltip.innerText = "退出画中画";
    });
    this.player.on("leavepictureinpicture", () => {
      this.$el.classList.remove("is-on");
      this.$tooltip.innerText = "画中画";
    });
    this.$icon.addEventListener("click", () => {
      if (this.player.isPip) {
        this.player.exitPip?.();
      } else {
        this.player.enterPip?.();
      }
    });
  }
  get ignored() {
    return !this.player.enterPip || !pictureInPictureEnabled;
  }
}
