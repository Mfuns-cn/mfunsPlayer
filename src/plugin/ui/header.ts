import { html, render } from "lit-html";
import { classPrefix } from "@/config";
import Player from "@/player";
import { PlayerOptions } from "@/types";

import { BasePlugin } from "@/plugin";
import { createElement } from "@/utils";

const template = () => html`
  <div class="${classPrefix}-header-mask"></div>
  <div class="${classPrefix}-header-main mpui-crystal">
    <div class="${classPrefix}-header-left"></div>
    <div class="${classPrefix}-header-center"></div>
    <div class="${classPrefix}-header-right"></div>
  </div>
`;

declare module "@core" {
  interface PlayerPlugins {
    header?: Header;
  }
}

/** 控制栏 */
export default class Header extends BasePlugin {
  static pluginName = "header";
  player: Player;
  $el: HTMLElement;
  $main: HTMLElement;
  $left: HTMLElement;
  $center: HTMLElement;
  $right: HTMLElement;

  isHover = false;

  protected inactiveHook: () => boolean;
  protected mouseEnterHandler: () => void;
  protected mouseLeaveHandler: () => void;

  constructor(player: Player) {
    super(player);
    this.player = player;
    this.$el = createElement("div", { class: `${classPrefix}-header` });
    render(template(), this.$el);
    this.$main = this.$el.querySelector(`.${classPrefix}-header-main`)!;
    this.$left = this.$el.querySelector(`.${classPrefix}-header-left`)!;
    this.$center = this.$el.querySelector(`.${classPrefix}-header-center`)!;
    this.$right = this.$el.querySelector(`.${classPrefix}-header-right`)!;
    this.player.$main.append(this.$el);

    this.inactiveHook = () => !this.isHover;
    this.mouseEnterHandler = () => {
      this.isHover = true;
    };
    this.mouseLeaveHandler = () => {
      this.isHover = false;
    };
  }
  init() {
    this.player.hook.register("inactive", this.inactiveHook);
    this.$el.addEventListener("mouseenter", this.mouseEnterHandler);
    this.$el.addEventListener("mouseleave", this.mouseLeaveHandler);
  }
  destroy() {
    this.player.hook.unregister("inactive", this.inactiveHook);
    this.$el.removeEventListener("mouseenter", this.mouseEnterHandler);
    this.$el.removeEventListener("mouseleave", this.mouseLeaveHandler);
  }
}
