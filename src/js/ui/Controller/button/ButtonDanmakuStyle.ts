import { PlayerOptions } from "@/types"
import { html, render } from "lit-html"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"
import { Picker } from "@/ui/components"
import { color2Number } from "@/utils"
import DanmakuBar from "../DanmakuBar"

declare global {
  class EyeDropper {
    open: () => Promise<{ sRGBHex: string }>
  }
}

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-danmaku-style">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-text"></i>
    </div>
    <div class="${classPrefix}-controller-panel-wrap">
      <div class="${classPrefix}-controller-panel ${classPrefix}-controller-panel-danmaku-style">
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">字号</div>
          <div class="${classPrefix}-danmaku-style-fontsize-picker"></div>
        </div>
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">模式</div>
          <div class="${classPrefix}-danmaku-style-mode-picker"></div>
        </div>
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">颜色</div>
          <input class="${classPrefix}-danmaku-style-color-input mp-input" type="text" value="#" />
          <div class="${classPrefix}-danmaku-style-color-preview"></div>
          ${EyeDropper
            ? html`<button class="${classPrefix}-danmaku-style-color-dropper mp-button">
                拾取
              </button>`
            : ""}
        </div>
        <div class="${classPrefix}-danmaku-style-color-picker"></div>
      </div>
    </div>
  </div>
`

export default class ButtonDanmakuStyle {
  danmakuBar: DanmakuBar
  player: MfunsPlayer
  el: HTMLElement
  $iconWrap: HTMLElement
  $tooltip: HTMLElement

  $fontsizePicker: HTMLElement
  $modePicker: HTMLElement
  $colorPicker: HTMLElement
  $colorInput: HTMLInputElement
  $colorPreview: HTMLElement
  $colorDropper: HTMLElement | null

  pickerFontsize!: Picker
  pickerMode!: Picker
  pickerColor!: Picker

  constructor(danmakuBar: DanmakuBar, container: HTMLElement, options: PlayerOptions) {
    this.danmakuBar = danmakuBar
    this.player = danmakuBar.player
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!
    this.$iconWrap = this.el.querySelector(`.${classPrefix}-controller-icon-wrap`)!
    this.$tooltip = this.el.querySelector(`.${classPrefix}-tooltip`)!

    this.$fontsizePicker = this.el.querySelector(`.${classPrefix}-danmaku-style-fontsize-picker`)!
    this.$modePicker = this.el.querySelector(`.${classPrefix}-danmaku-style-mode-picker`)!
    this.$colorPicker = this.el.querySelector(`.${classPrefix}-danmaku-style-color-picker`)!
    this.$colorInput = this.el.querySelector(`.${classPrefix}-danmaku-style-color-input`)!
    this.$colorPreview = this.el.querySelector(`.${classPrefix}-danmaku-style-color-preview`)!
    this.$colorDropper = this.el.querySelector(`.${classPrefix}-danmaku-style-color-dropper`)

    this.init(options)
    container.appendChild(fragment)
  }

  private init(options: PlayerOptions) {
    this.pickerFontsize = new Picker({
      container: this.$fontsizePicker,
      value: 25,
      list: (options.danmakuBar?.fontSizeList || defaultFontSizeList).map(([value, label]) => ({
        value,
        label,
      })),
      onChange: (value) => {
        this.danmakuBar.danmakuFontSize = Number(value)
      },
    })
    this.pickerMode = new Picker({
      container: this.$modePicker,
      value: 1,
      list: [
        { value: 1, label: "滚动" },
        { value: 5, label: "顶部" },
        { value: 4, label: "底部" },
        { value: 6, label: "逆向" },
      ].filter(
        (item) => (options.danmakuBar?.modeList || defaultModeList).indexOf(item.value) > -1
      ),
      onChange: (value) => {
        this.danmakuBar.danmakuMode = Number(value) || 1
      },
    })
    this.pickerColor = new Picker({
      container: this.$colorPicker,
      value: "#FFFFFF",
      list: (options.danmakuBar?.colorList || defaultColorList).map((item) => ({ value: item })),
      onPick: (value) => {
        this.danmakuBar.danmakuColor = color2Number(value as string)
      },
      onChange: (value) => {
        this.$colorInput.value = value as string
        this.$colorPreview.style.backgroundColor = value as string
      },
      template: (item) => html` <div style="background-color: ${item.value}"></div> `,
      condition: (item, value) => {
        return item.toLowerCase() == (value as string).toLowerCase()
      },
    })
    this.$colorInput.addEventListener("input", (e) => {
      const value = this.$colorInput.value
      this.$colorInput.value = "#" + value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6)
      if (/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value)) {
        this.pickerColor.pick(value)
      }
    })
    if (this.$colorDropper) {
      this.$colorDropper.onclick = () => {
        if (EyeDropper) {
          const dropper = new EyeDropper()
          dropper.open().then(({ sRGBHex }) => {
            this.pickerColor.pick(sRGBHex)
          })
        }
      }
    }
  }
}

const defaultFontSizeList: [number, string][] = [
  [18, "小"],
  [25, "中"],
  [36, "大"],
]

const defaultModeList = [1, 5, 4]

const defaultColorList = [
  "#FE0302",
  "#FFFF00",
  "#00CD00",
  "#00FF00",
  "#4E6EF2",
  "#89D5FF",
  "#7B7FF7",
  "#757575",
  "#FFFFFF",
  "#FB7229",
]
