import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

const themeOptionsVars = {
  primaryColor: "--mp-primary-color",
  secondaryColor: "--mp-secondary-color",
  borderRadius: "--mp-border-radius",
  bgLight: "--mp-bg-light",
  bgDark: "--mp-bg-dark",
  bgBlack: "--mp-bg-black",
};

export type ThemeOptions = Partial<Record<keyof typeof themeOptionsVars, string>>;

declare module "@/types" {
  interface PluginExports {
    theme?: Theme;
  }
  interface PlayerOptions {
    theme?: ThemeOptions;
    /** 颜色模式 */
    colorScheme?: ThemeColorScheme;
  }
}

export type ThemeColorScheme = "light" | "dark" | "auto";

export default class Theme extends BasePlugin {
  static pluginName = "theme";
  private properties: ThemeOptions = {};
  /** 绑定了主题变量的DOM元素 */
  private themeElement: HTMLElement[];
  /** 匹配暗黑模式 */
  private _matchDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  private _handleDarkScheme: (e: MediaQueryListEvent) => void;
  constructor(player: Player, options: PlayerOptions) {
    super(player);
    this.themeElement = [this.player.container];
    this.setTheme(options.theme || {});
    this._handleDarkScheme = (e) => {
      this.player.$el.classList.toggle("mpui-dark", e.matches);
    };
  }
  /** 设置主题 */
  setTheme(theme: ThemeOptions) {
    Object.assign(this.properties, theme);
    this.themeElement.forEach((el) => {
      let name: keyof ThemeOptions;
      for (name in theme) {
        el.style.setProperty(themeOptionsVars[name], theme[name]!);
      }
    });
  }
  /** 设置某个主题属性 */
  set(name: keyof ThemeOptions, value: string) {
    this.properties[name] = value;
    this.themeElement.forEach((el) => {
      el.style.setProperty(themeOptionsVars[name], value);
    });
  }
  get(name: keyof ThemeOptions) {
    return this.properties[name];
  }
  /** 为元素绑定主题变量 */
  public bind(el: HTMLElement) {
    this.themeElement.push(el);
    let name: keyof typeof themeOptionsVars;
    for (name in this.properties) {
      const value = this.properties[name];
      value && el.style.setProperty(themeOptionsVars[name], value);
    }
  }
  setColorScheme(scheme: ThemeColorScheme) {
    this.player.$el.classList.toggle("mpui-dark", scheme == "dark");
    if (scheme == "auto") {
      this._matchDarkScheme.addEventListener("change", this._handleDarkScheme);
    } else {
      this._matchDarkScheme.removeEventListener("change", this._handleDarkScheme);
    }
  }
}
