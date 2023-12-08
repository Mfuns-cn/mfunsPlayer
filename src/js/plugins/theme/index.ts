import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

const themeOptionsVars = {
  primaryColor: "--mp-primary-color",
  secondaryColor: "--mp-secondary-color",
  borderRadius: "--mp-border-radius",
  bgWhite: "--mp-bg-white",
  bgBlack: "--mp-bg-black",
  panelWhite: "--mp-panel-white",
  panelBlack: "--mp-panel-black",
};

export type ThemeOptions = Partial<Record<keyof typeof themeOptionsVars, string>>;

declare module "@/types" {
  interface PluginExports {
    theme?: Theme;
  }
  interface PlayerOptions {
    theme?: ThemeOptions;
  }
}

export default class Theme extends BasePlugin {
  static pluginName = "theme";
  private properties: ThemeOptions = {};
  /** 绑定了主题变量的DOM元素 */
  private themeElement: HTMLElement[];
  constructor(player: Player, options: PlayerOptions) {
    super(player);
    this.themeElement = [this.player.container];
    this.setTheme(options.theme || {});
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
  public addThemeElement(el: HTMLElement) {
    this.themeElement.push(el);
    let name: keyof typeof themeOptionsVars;
    for (name in this.properties) {
      const value = this.properties[name];
      value && el.style.setProperty(themeOptionsVars[name], value);
    }
  }
}
