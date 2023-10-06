import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/const";

const template = (order?: number) => html`
  <div
    class="${classPrefix}-controller-button ${classPrefix}-controller-pip"
    style="${order ? `order: ${order}` : ""}"
  >
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-pip"></i>
      <i class="${classPrefix}-controller-icon mp-icon-pip-exit"></i>
    </div>
    <div class="${classPrefix}-tooltip">画中画</div>
  </div>
`;

export default class ButtonPip {
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
    this.player.on("pip", () => {
      this.el.classList.add("state-pip");
      this.$tooltip.innerText = "退出画中画";
    });
    this.player.on("pip_exit", () => {
      this.el.classList.remove("state-pip");
      this.$tooltip.innerText = "画中画";
    });
    this.$iconWrap.addEventListener("click", () => {
      if (this.player.isPip) {
        this.player.exitPip();
      } else {
        this.player.pip();
      }
    });
  }
}
