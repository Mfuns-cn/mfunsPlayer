import MfunsPlayer from "@/player"
import { PlayerOptions, ThemeOptions } from "@/types"
const themeOptionsVars = {
  primaryColor: "--mp-primary-color",
  secondaryColor: "--mp-secondary-color",
  borderRadius: "--mp-border-radius",
  bgWhite: "--mp-bg-white",
  bgBlack: "--mp-bg-black",
  panelWhite: "--mp-panel-white",
  panelBlack: "--mp-panel-black",
}

export default class Theme implements ThemeOptions {
  player: MfunsPlayer
  primaryColor?: string
  secondaryColor?: string
  borderRadius?: string
  bgWhite?: string
  bgBlack?: string
  panelWhite?: string
  panelBlack?: string
  /** 绑定了主题变量的DOM元素 */
  private themeElement: HTMLElement[]
  constructor(player: MfunsPlayer, options: PlayerOptions) {
    this.player = player
    this.themeElement = [this.player.container]
    this.setTheme(options.theme || {})
  }
  /** 设置主题 */
  setTheme(theme: ThemeOptions) {
    Object.assign(this, theme)
    this.themeElement.forEach((el) => {
      let name: keyof ThemeOptions
      for (name in theme) {
        el.style.setProperty(themeOptionsVars[name], theme[name]!)
      }
    })
  }
  /** 设置某个主题属性 */
  setThemeProperty(name: keyof ThemeOptions, value: string) {
    this[name] = value
    this.themeElement.forEach((el) => {
      el.style.setProperty(themeOptionsVars[name], value)
    })
  }
  /** 为元素绑定主题变量 */
  public addThemeElement(el: HTMLElement) {
    this.themeElement.push(el)
    let name: keyof typeof themeOptionsVars
    for (name in themeOptionsVars) {
      const value = this[name]
      value && el.style.setProperty(themeOptionsVars[name], value)
    }
  }
}
