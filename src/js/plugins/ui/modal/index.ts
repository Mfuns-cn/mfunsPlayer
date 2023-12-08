import { html, render } from "lit-html";
import { classPrefix } from "@/config";
import Player from "@/player";
import { PlayerOptions } from "@/types";
import { createElement } from "@/utils";
import { BasePlugin, PanelPlugin } from "@/plugin";

const template = () => html`
  <div class="${classPrefix}-modal-mask"></div>
  <div class="${classPrefix}-modal">
    <div class="${classPrefix}-modal-head">
      <div class="${classPrefix}-modal-title"></div>
      <div class="${classPrefix}-modal-close">
        <i class="mpicon-close"></i>
      </div>
    </div>
    <div class="${classPrefix}-modal-content"></div>
  </div>
`;

declare module "@/types" {
  interface PluginExports {
    modal?: Modal;
  }
}

export default class Modal extends BasePlugin {
  static readonly pluginName = "modal";
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
    this.container = createElement("div", { class: `${classPrefix}-modal-wrap` });
    render(template(), this.container);
    this.$el = this.container.querySelector(`.${classPrefix}-modal`)!;
    this.$mask = this.container.querySelector(`.${classPrefix}-modal-mask`)!;
    this.$content = this.$el.querySelector(`.${classPrefix}-modal-content`)!;
    this.$title = this.$el.querySelector(`.${classPrefix}-modal-title`)!;
    this.$close = this.$el.querySelector(`.${classPrefix}-modal-close`)!;

    this.player.$main.appendChild(this.container);
  }

  created() {
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
