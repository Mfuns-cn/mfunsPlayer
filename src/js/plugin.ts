import { PlayerOptions, Plugin, PluginExports } from "@/types";
import Player from ".";

export abstract class BasePlugin implements Plugin {
  static pluginName: string;
  protected player: Player;
  protected plugin: PluginExports;
  constructor(player: Player) {
    this.player = player;
    this.plugin = player.plugin;
  }
}

export abstract class ControlsPlugin extends BasePlugin {
  $el: HTMLElement;
  container?: HTMLElement;
  order?: number;
  constructor(
    player: Player,
    options: PlayerOptions,
    {
      name,
      defaultOptions,
      el,
      disabled,
    }: {
      name: string;
      defaultOptions: { container: (player: Player) => HTMLElement | undefined; order?: number };
      el: HTMLElement;
      disabled?: boolean;
    }
  ) {
    super(player);
    const opt = options.controls?.[name];
    this.container = (opt?.container || defaultOptions.container)?.(player);
    this.order = opt?.order || defaultOptions.order;

    this.$el = el;
    this.$el.style.order = (this.order || "").toString();
    !disabled && this.container?.append(this.$el);
  }
  $<T extends Element>(selectors: string) {
    return this.$el.querySelector<T>(selectors);
  }
}

export abstract class PanelPlugin extends BasePlugin {
  abstract title: string;
  $el: HTMLElement;
  container?: HTMLElement;
  onUnmount?: () => void;
  onToggle?: (flag: boolean) => void;
  shown = false;
  constructor(
    player: Player,
    options: PlayerOptions,
    {
      name,
      defaultOptions,
      el,
    }: {
      name: string;
      defaultOptions?: {
        container?: (player: Player) => HTMLElement;
        onToggle?: (flag: boolean) => void;
        onUnmount?: () => void;
        mount?: (player: Player) => PanelContainer | undefined;
      };
      el: HTMLElement;
    }
  ) {
    super(player);
    console.log(name);
    console.log(el);
    this.$el = el;
    const opt = options.panels?.[name] || defaultOptions;
    if (opt?.mount) {
      opt?.mount(player)?.mount(this);
    } else {
      this.container = opt?.container?.(player);
      this.onToggle = opt?.onToggle;
      this.onUnmount = opt?.onUnmount;
    }
  }

  mount(el: HTMLElement, onToggle?: (flag: boolean) => void, onUnmount?: () => void) {
    el.appendChild(this.$el);
    this.unmount();
    this.onToggle = onToggle;
    this.onUnmount = onUnmount;
  }
  unmount() {
    this.toggle(false);
    this.onUnmount?.();
    this.onToggle = void 0;
    this.onUnmount = void 0;
  }
  toggle(flag?: boolean) {
    this.shown = flag ?? !this.shown;
    this.onToggle?.(this.shown);
  }
  $<T extends Element>(selectors: string) {
    return this.$el.querySelector<T>(selectors);
  }
}

export interface PanelContainer {
  mount: (panel: PanelPlugin) => void;
}
