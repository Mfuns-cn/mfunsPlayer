import { html, render } from "lit-html";
import { classPrefix } from "@/config";
import Player from "@/player";
import { secondToTime, timeToSecond } from "@/utils";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-videotime">
    <div class="${classPrefix}-videotime-label">
      <span class="${classPrefix}-videotime-current">00:00</span>
      <span class="${classPrefix}-videotime-divider">/</span>
      <span class="${classPrefix}-videotime-total">00:00</span>
    </div>
    <input class="${classPrefix}-videotime-input mpui-input" />
  </div>
`;

export default class VideoTime extends ControlsPlugin {
  static pluginName = "videoTime";
  name = "time";
  $label: HTMLElement;
  $current: HTMLElement;
  $total: HTMLElement;
  $input: HTMLInputElement;
  /** 点按时的值 */
  private valueBeforeEdited = "";

  constructor(player: Player) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, fragment.querySelector(`.${classPrefix}-videotime`)!);
    this.$label = this.$(`.${classPrefix}-videotime-label`)!;
    this.$current = this.$(`.${classPrefix}-videotime-current`)!;
    this.$total = this.$(`.${classPrefix}-videotime-total`)!;
    this.$input = this.$(`.${classPrefix}-videotime-input`)!;
  }

  init() {
    this.player.on("timeupdate", (time) => {
      this.$current.innerText = secondToTime(time);
    });
    this.player.on("seeking", (time) => {
      this.$current.innerText = secondToTime(time);
    });
    this.player.on("durationchange", (time) => {
      this.$total.innerText = secondToTime(time);
    });
    this.$label.addEventListener("click", () => {
      this.$el.classList.add("is-input");
      this.$input.value = secondToTime(this.player.currentTime);
      this.valueBeforeEdited = this.$input.value;
      this.$input.focus();
    });
    this.$input.addEventListener("blur", () => {
      const inputVal = this.$input.value;
      if (inputVal != this.valueBeforeEdited) {
        // 如果输入值有改动，则跳转
        this.player.seek(timeToSecond(inputVal));
        this.player.play();
      }
      this.exitInput();
    });
    this.$input.addEventListener("keydown", (event) => {
      const e = event || window.event;
      if (e.keyCode == 13) {
        this.player.seek(timeToSecond(this.$input.value));
        this.player.play();
        this.exitInput();
      }
      if (e.keyCode == 27) {
        this.exitInput();
      }
    });
  }

  /** 退出输入模式 */
  exitInput() {
    this.$el.classList.remove("is-input");
    this.$input.value = "";
    this.valueBeforeEdited = "";
  }
}
