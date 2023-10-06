import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/const";

const template = (order?: number) => html`
  <div
    class="${classPrefix}-controller-button ${classPrefix}-controller-part"
    style="${order ? `order: ${order}` : ""}"
  >
    <div class="${classPrefix}-controller-icon-wrap">
      <div class="${classPrefix}-controller-texticon">P0</div>
    </div>
    <div class="${classPrefix}-tooltip">分P列表</div>
  </div>
`;

export default class ButtonPart {
  player: Player;
  el: HTMLElement;
  $iconWrap: HTMLElement;
  $tooltip: HTMLElement;
  $texticon: HTMLElement;

  constructor(player: Player, container: HTMLElement, order?: number) {
    this.player = player;
    const fragment = new DocumentFragment();
    render(template(order), fragment);
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!;
    this.$iconWrap = fragment.querySelector(`.${classPrefix}-controller-icon-wrap`)!;
    this.$tooltip = fragment.querySelector(`.${classPrefix}-tooltip`)!;
    this.$texticon = fragment.querySelector(`.${classPrefix}-controller-texticon`)!;
    this.init();
    container.appendChild(fragment);
  }

  private init() {
    if (this.player.video.list.length < 2) {
      this.el.classList.add("state-singlepart");
    }
    this.$iconWrap.addEventListener("click", () => {
      this.player.side.toggle("partlist");
    });
    this.player.on("part", (p) => {
      this.$texticon.innerText = `P${p}`;
    });
  }
}
