import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/const";

const template = (order?: number) => html`
  <div
    class="${classPrefix}-controller-button ${classPrefix}-controller-loop"
    style="${order ? `order: ${order}` : ""}"
  >
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-loop"></i>
      <i class="${classPrefix}-controller-icon mp-icon-loop-off"></i>
    </div>
    <div class="${classPrefix}-tooltip">洗脑循环</div>
  </div>
`;

export default class ButtonLoop {
  player: Player;
  el: HTMLElement;
  $iconWrap: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player, container: HTMLElement, order?: number) {
    this.player = player;
    const fragment = new DocumentFragment();
    render(template(order), fragment);
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!;
    this.$iconWrap = fragment.querySelector(`.${classPrefix}-controller-icon-wrap`)!;
    this.$tooltip = fragment.querySelector(`.${classPrefix}-tooltip`)!;
    this.init();
    container.appendChild(fragment);
  }

  private init() {
    this.player.on("change:loop", (flag) => {
      this.el.classList.toggle("state-loop", flag);
      this.$tooltip.innerText = flag ? "关闭洗脑循环" : "洗脑循环";
    });
    this.$iconWrap.addEventListener("click", () => {
      if (this.player.video.loop) {
        this.player.video.setLoop(false);
      } else {
        this.player.video.setLoop(true);
      }
    });
  }
}
