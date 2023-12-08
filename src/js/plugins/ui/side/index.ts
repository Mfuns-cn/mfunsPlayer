import { html, render } from "lit-html";
import { classPrefix } from "@/config";
import Player from "@/player";
import { PlayerOptions } from "@/types";
import { BasePlugin, PanelPlugin } from "@/plugin";
import { createElement } from "@/utils";

const template = () => html`
  <div class="${classPrefix}-side-mask"></div>
  <div class="${classPrefix}-side">
    <div class="${classPrefix}-side-head">
      <div class="${classPrefix}-side-title"></div>
      <div class="${classPrefix}-side-close">
        <i class="mpicon-close"></i>
      </div>
    </div>
    <div class="${classPrefix}-side-content"></div>
  </div>
`;

declare module "@/types" {
  interface PluginExports {
    side?: Side;
  }
}

export default class Side extends BasePlugin {
  static readonly pluginName = "side";
  container: HTMLElement;
  $el: HTMLElement;
  $mask: HTMLElement;
  $content: HTMLElement;
  $title: HTMLElement;
  $close: HTMLElement;
  current: PanelPlugin | null = null;
  get isShow(): boolean {
    return this.container.classList.contains("state-show");
  }

  constructor(player: Player, options: PlayerOptions) {
    super(player);
    this.container = createElement("div", { class: `${classPrefix}-side-wrap` });
    render(template(), this.container);
    this.$el = this.container.querySelector(`.${classPrefix}-side`)!;
    this.$mask = this.container.querySelector(`.${classPrefix}-side-mask`)!;
    this.$content = this.$el.querySelector(`.${classPrefix}-side-content`)!;
    this.$title = this.$el.querySelector(`.${classPrefix}-side-title`)!;
    this.$close = this.$el.querySelector(`.${classPrefix}-side-close`)!;

    this.player.$main.appendChild(this.container);
  }
  created() {
    // --- 事件 --- //
    this.$mask.addEventListener("click", () => {
      this.hide();
    });
    this.$close.addEventListener("click", () => {
      this.hide();
    });
  }

  hide() {
    this.current?.toggle(false);
  }

  mount(panel: PanelPlugin) {
    panel.mount(this.$content, (flag) => {
      if (flag) {
        this.current?.toggle(false);
        for (const a of this.$content.children) {
          a.classList.toggle("state-show", a == panel.$el);
        }
        this.container.classList.add("state-show");
        this.$title.innerText = panel.title;
        this.current = panel;
      } else {
        if (this.current == panel) {
          this.container.classList.remove("state-show");
          panel.$el.classList.remove("state-show");
          this.$title.innerText = "";
          this.current = null;
        }
      }
    });
  }
}
