import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/const";
import { PluginWide } from ".";

const template = (order?: number) => html`
  <div
    class="${classPrefix}-controller-button ${classPrefix}-controller-wide"
    style="${order ? `order: ${order}` : ""}"
  >
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-wide"></i>
      <i class="${classPrefix}-controller-icon mp-icon-wide-exit"></i>
    </div>
    <div class="${classPrefix}-tooltip">宽屏模式</div>
  </div>
`;

export default class ButtonWide {
  player: Player<PluginWide>;
  el: HTMLElement;
  $iconWrap: HTMLElement;
  $tooltip: HTMLElement;

  constructor(player: Player<PluginWide>, container: HTMLElement, order?: number) {
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
    this.player.on("wide", () => {
      this.el.classList.add("state-wide");
      this.$tooltip.innerText = "退出宽屏模式";
    });
    this.player.on("wide_exit", () => {
      this.el.classList.remove("state-wide");
      this.$tooltip.innerText = "宽屏模式";
    });
    this.$iconWrap.addEventListener("click", () => {
      if (this.player.plugin.wide.status) {
        this.player.plugin.wide.exit();
      } else {
        this.player.plugin.wide.enter();
      }
    });
  }
}
