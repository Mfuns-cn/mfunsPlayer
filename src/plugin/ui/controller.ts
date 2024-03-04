import { html, render } from "lit-html";
import { classPrefix } from "@/config";
import Player from "@/player";
import { PlayerOptions } from "@/types";

import { BasePlugin, IControls, UIOptionsItem } from "@/plugin";

const template = () => html`
  <div class="${classPrefix}-controller-mask"></div>
  <div class="${classPrefix}-controller mpui-black">
    <div class="${classPrefix}-controller-top"></div>
    <div class="${classPrefix}-controller-content">
      <div class="${classPrefix}-controller-left"></div>
      <div class="${classPrefix}-controller-center"></div>
      <div class="${classPrefix}-controller-right"></div>
    </div>
  </div>
`;

declare module "@core" {
  interface PlayerPlugins {
    controller?: Controller;
  }
  interface PlayerOptions {
    controller?: { controls?: ControllerControls };
  }
}

export interface ControllerControls {
  left?: UIOptionsItem<IControls>[];
  center?: UIOptionsItem<IControls>[];
  right?: UIOptionsItem<IControls>[];
  top?: UIOptionsItem<IControls>[];
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

  protected inactiveHook: () => boolean | void;
  protected mouseEnterHandler: () => void;
  protected mouseLeaveHandler: () => void;
  protected controls: {
    left?: UIOptionsItem<IControls>[];
    center?: UIOptionsItem<IControls>[];
    right?: UIOptionsItem<IControls>[];
    top?: UIOptionsItem<IControls>[];
  } = {};

  constructor(player: Player) {
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

    this.inactiveHook = () => !this.isHover && void 0;
    this.mouseEnterHandler = () => {
      this.isHover = true;
    };
    this.mouseLeaveHandler = () => {
      this.isHover = false;
    };

    this.container.appendChild(fragment);
  }
  init() {
    this.player.hook.register("inactive", this.inactiveHook);
    this.container.addEventListener("mouseenter", this.mouseEnterHandler);
    this.container.addEventListener("mouseleave", this.mouseLeaveHandler);
  }
  apply(player: Player, options: PlayerOptions) {
    this.controls = options.controller?.controls || {};
  }
  ready() {
    this.setControls(this.controls);
  }
  /** 更新控制组件 */
  setControls(controls: ControllerControls) {
    const { left, center, right, top } = controls;
    this.build(this.$left, left);
    this.build(this.$center, center);
    this.build(this.$right, right);
    this.build(this.$top, top);
  }
  protected build(container: HTMLElement, list?: UIOptionsItem<IControls>[]) {
    container.innerHTML = "";
    const fragment = new DocumentFragment();
    list?.forEach((item) => {
      const el = this.player.controls.get(item)?.$el;
      if (el) fragment.appendChild(el);
    });
    container.appendChild(fragment);
  }
  destroy() {
    this.player.hook.unregister("inactive", this.inactiveHook);
    this.container.removeEventListener("mouseenter", this.mouseEnterHandler);
    this.container.removeEventListener("mouseleave", this.mouseLeaveHandler);
  }
}
