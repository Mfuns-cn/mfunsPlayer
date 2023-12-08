import { html, render } from "lit-html";
import { classPrefix } from "@/config";
import Player from "@/player";
import { PlayerOptions } from "@/types";

import { BasePlugin } from "@/plugin";

const template = () => html`
  <div class="${classPrefix}-controller-mask"></div>
  <div class="${classPrefix}-controller mpui-crystal">
    <div class="${classPrefix}-controller-top"></div>
    <div class="${classPrefix}-controller-content">
      <div class="${classPrefix}-controller-left"></div>
      <div class="${classPrefix}-controller-center"></div>
      <div class="${classPrefix}-controller-right"></div>
    </div>
  </div>
`;

declare module "@/types" {
  interface PluginExports {
    controller?: Controller;
  }
}

/** 控制栏 */
export default class Controller extends BasePlugin {
  static pluginName = "controller";
  player: Player;
  container: HTMLElement;
  $el: HTMLElement;
  $top: HTMLElement;
  $content: HTMLElement;
  $left: HTMLElement;
  $center: HTMLElement;
  $right: HTMLElement;

  isHover = false;

  protected inactiveHook: () => boolean;
  protected mouseEnterHandler: () => void;
  protected mouseLeaveHandler: () => void;

  constructor(player: Player, options: PlayerOptions) {
    super(player);
    this.player = player;
    this.container = document.createElement("div");
    this.container.className = `${classPrefix}-controller-wrap`;
    const fragment = new DocumentFragment();
    render(template(), fragment);
    this.$el = fragment.querySelector(`.${classPrefix}-controller`)!;
    this.$top = this.$el.querySelector(`.${classPrefix}-controller-top`)!;
    this.$content = this.$el.querySelector(`.${classPrefix}-controller-content`)!;
    this.$left = this.$el.querySelector(`.${classPrefix}-controller-left`)!;
    this.$center = this.$el.querySelector(`.${classPrefix}-controller-center`)!;
    this.$right = this.$el.querySelector(`.${classPrefix}-controller-right`)!;
    this.player.$main.append(this.container);

    this.inactiveHook = () => !this.isHover;
    this.mouseEnterHandler = () => {
      this.isHover = true;
    };
    this.mouseLeaveHandler = () => {
      this.isHover = false;
    };

    this.container.appendChild(fragment);
  }
  created(options: PlayerOptions) {
    this.player.hook.register("inactive", this.inactiveHook);
    this.container.addEventListener("mouseenter", this.mouseEnterHandler);
    this.container.addEventListener("mouseleave", this.mouseLeaveHandler);
  }
  destroy() {
    this.player.hook.unregister("inactive", this.inactiveHook);
    this.container.removeEventListener("mouseenter", this.mouseEnterHandler);
    this.container.removeEventListener("mouseleave", this.mouseLeaveHandler);
  }
}
