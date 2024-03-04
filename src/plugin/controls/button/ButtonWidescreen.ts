import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import {} from "../../screen/widescreen";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-widescreen">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-widescreen"></i>
      <i class="mpicon-widescreen-exit"></i>
    </div>
    <div class="mpui-tooltip">宽屏模式</div>
  </div>
`;

export default class ButtonWidescreen extends ControlsPlugin {
  static pluginName = "buttonWidescreen";
  name = "widescreen";
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
    this.player.on("widescreenEnter", () => {
      this.$el.classList.add("is-on");
      this.$tooltip.innerText = "退出宽屏模式";
    });
    this.player.on("widescreenExit", () => {
      this.$el.classList.remove("is-on");
      this.$tooltip.innerText = "宽屏模式";
    });
    this.$icon.addEventListener("click", () => {
      if (this.player.isWidescreen) {
        this.player.enterWidescreen?.();
      } else {
        this.player.exitWidescreen?.();
      }
    });
  }
  get ignored() {
    return !this.player.enterWidescreen;
  }
}
