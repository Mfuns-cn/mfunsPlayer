import { PlayerOptions, IPlugin } from "@/types";
import Player from "@/player";

export abstract class BasePlugin implements IPlugin {
  static pluginName: string;
  protected readonly player: Player;
  /** 播放器插件 @deprecated */
  protected readonly plugin: Player["plugin"];
  /** 抛出错误 */
  protected readonly throw: Player["throw"];
  constructor(player: Player) {
    this.player = player;
    this.plugin = player.plugin;
    this.throw = player.throw;
  }
  /** 插件创建后 */
  init?(player: Player): void;
  /** 作为插件注册 */
  apply?(player: Player, options: PlayerOptions): void;
  /** 所有插件加载后 */
  ready?(player: Player): void;
  /** 播放器挂载后 */
  mounted?(player: Player): void;
  /** 执行销毁 */
  destroy?(): void;
}

export interface IControls extends IPlugin {
  $el: HTMLElement;
  ignored?: boolean;
}

export interface IPanel extends IPlugin {
  $el: HTMLElement;
  title?: string;
  mount(
    el: HTMLElement,
    opt?: { onToggle?: (flag: boolean) => void; onUnmount?: () => void }
  ): void;
  unmount(): void;
  toggle(flag?: boolean): void;
}

export interface IMenu extends IPlugin {
  icon?: HTMLElement | ((player: Player) => HTMLElement);
  content: string | HTMLElement | ((player: Player) => string | HTMLElement);
  onClick?: (player: Player) => void;
}

/** 界面插件 */
export abstract class UIPlugin extends BasePlugin {
  $el: HTMLElement;
  $<T extends Element>(selectors: string) {
    return this.$el.querySelector<T>(selectors);
  }
  constructor(player: Player, el: HTMLElement) {
    super(player);
    this.$el = el;
  }
}

/** 菜单插件 */
export abstract class MenuPlugin extends BasePlugin implements IMenu {
  abstract name: string;
  abstract content: string | HTMLElement | ((player: Player) => string | HTMLElement);
  apply(player: Player) {
    player.menu.register(this.name, this);
  }
}

/** 控制组件插件 */
export abstract class ControlsPlugin extends UIPlugin implements IControls {
  abstract name: string;
  apply(player: Player, options: PlayerOptions) {
    player.controls.register(this.name, this);
  }
  show() {
    this.$el.style.display = "";
  }
  hide() {
    this.$el.style.display = "none";
  }
}

/** 面板插件 */
export abstract class PanelPlugin extends UIPlugin implements IPanel {
  abstract name: string;
  abstract title?: string;
  container?: HTMLElement;
  onUnmount?: () => void;
  onToggle?: (flag: boolean) => void;
  shown = false;
  constructor(player: Player, el: HTMLElement) {
    super(player, el);
  }
  apply(player: Player, options: PlayerOptions): void {
    player.panel.register(this.name, this);
  }
  /** 挂载 */
  mount(el: HTMLElement, opt?: { onToggle?: (flag: boolean) => void; onUnmount?: () => void }) {
    el.appendChild(this.$el);
    this.unmount();
    this.onToggle = opt?.onToggle;
    this.onUnmount = opt?.onUnmount;
  }
  /** 卸载 */
  unmount() {
    this.toggle(false);
    this.onUnmount?.();
    this.onToggle = undefined;
    this.onUnmount = undefined;
  }
  /** 切换显示隐藏状态 */
  toggle(flag?: boolean) {
    this.shown = flag ?? !this.shown;
    this.onToggle?.(this.shown);
  }
}

export interface PanelContainer {
  mount: (panel: PanelPlugin) => void;
}
export type UIOptionsItem<T> = (new (player: Player) => T) | T | string;
