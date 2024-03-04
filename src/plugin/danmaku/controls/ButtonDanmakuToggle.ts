import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-danmakutoggle is-on">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-danmaku-off"></i>
      <i class="mpicon-danmaku"></i>
    </div>
    <div class="mpui-tooltip">关闭弹幕</div>
  </div>
`;

export default class ButtonDanmakuToggle extends ControlsPlugin {
  static pluginName = "buttonDanmakuToggle";
  name = "danmakuToggle";

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
    this.player.on("danmaku:on", () => {
      this._change(true);
    });
    this.player.on("danmaku:off", () => {
      this._change(false);
    });
    this.$icon.addEventListener("click", () => {
      this.plugin.danmaku?.toggle();
    });
  }

  /** 设置按钮状态 */
  private _change(flag: boolean) {
    this.$el.classList.toggle("is-on", flag);
    this.$tooltip.innerText = flag ? "关闭弹幕" : "开启弹幕";
  }
}
