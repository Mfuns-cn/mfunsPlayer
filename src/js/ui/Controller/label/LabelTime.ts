import { html, render } from "lit-html";
import { classPrefix } from "@/const";
import Player from "@/player";
import { secondToTime, timeToSecond } from "@/utils";

const template = (order?: number) => html`
  <div class="${classPrefix}-controller-time" style="${order ? `order: ${order}` : ""}">
    <div class="${classPrefix}-controller-time-label">
      <span class="${classPrefix}-controller-time-current">00:00</span>
      <span>/</span>
      <span class="${classPrefix}-controller-time-total">00:00</span>
    </div>
    <input class="${classPrefix}-controller-time-input mp-input" />
  </div>
`;

export default class LabelTime {
  player: Player;
  el: HTMLElement;
  $label: HTMLElement;
  $current: HTMLElement;
  $total: HTMLElement;
  $input: HTMLInputElement;
  /** 点按时的值 */
  private valueBeforeEdited = "";

  constructor(player: Player, container: HTMLElement, order?: number) {
    this.player = player;
    const fragment = new DocumentFragment();
    render(template(order), fragment);
    this.el = fragment.querySelector(`.${classPrefix}-controller-time`)!;
    this.$label = fragment.querySelector(`.${classPrefix}-controller-time-label`)!;
    this.$current = fragment.querySelector(`.${classPrefix}-controller-time-current`)!;
    this.$total = fragment.querySelector(`.${classPrefix}-controller-time-total`)!;
    this.$input = fragment.querySelector(`.${classPrefix}-controller-time-input`)!;
    this.init();
    container.appendChild(fragment);
  }

  init() {
    this.player.on("timeupdate", (time) => {
      this.$current.innerText = secondToTime(time);
    });
    this.player.on("durationchange", (time) => {
      this.$total.innerText = secondToTime(time);
    });
    this.$label.addEventListener("click", () => {
      this.el.classList.add("state-input");
      this.$input.value = secondToTime(this.player.time);
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
    this.el.classList.remove("state-input");
    this.$input.value = "";
    this.valueBeforeEdited = "";
  }
}
