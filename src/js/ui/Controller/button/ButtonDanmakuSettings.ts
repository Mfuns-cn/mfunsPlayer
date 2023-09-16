import { MultiPicker, Picker, Slider } from "@/ui/components"
import { html, render } from "lit-html"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"
import { PlayerOptions } from "@/types"

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-danmaku-settings">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-danmaku-settings"></i>
    </div>
    <div class="${classPrefix}-controller-panel-wrap">
      <div class="${classPrefix}-controller-panel ${classPrefix}-controller-panel-danmaku-settings">
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">弹幕类型屏蔽</div>
          <div class="${classPrefix}-danmaku-settings-filter-picker"></div>
        </div>
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">不透明度</div>
          <div
            class="${classPrefix}-danmaku-settings-opacity-slider ${classPrefix}-slider-wrap"
          ></div>
          <div class="${classPrefix}-danmaku-settings-opacity-value ${classPrefix}-row-value"></div>
        </div>
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">显示区域</div>
          <div class="${classPrefix}-danmaku-settings-area-slider ${classPrefix}-slider-wrap"></div>
          <div class="${classPrefix}-danmaku-settings-area-value ${classPrefix}-row-value"></div>
        </div>
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">文字大小</div>
          <div class="${classPrefix}-danmaku-settings-size-slider ${classPrefix}-slider-wrap"></div>
          <div class="${classPrefix}-danmaku-settings-size-value ${classPrefix}-row-value"></div>
        </div>
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">弹幕速度</div>
          <div
            class="${classPrefix}-danmaku-settings-speed-slider  ${classPrefix}-slider-wrap"
          ></div>
          <div class="${classPrefix}-danmaku-settings-speed-value ${classPrefix}-row-value"></div>
        </div>
      </div>
    </div>
  </div>
`

export default class ButtonDanmakuSettings {
  player: MfunsPlayer
  el: HTMLElement
  $iconWrap: HTMLElement

  $filterPicker: HTMLElement
  $opacitySlider: HTMLElement
  $areaSlider: HTMLElement
  $sizeSlider: HTMLElement
  $speedSlider: HTMLElement

  $opacityValue: HTMLElement
  $areaValue: HTMLElement
  $sizeValue: HTMLElement
  $speedValue: HTMLElement

  pickerFilter!: MultiPicker
  sliderOpacity!: Slider
  sliderArea!: Slider
  sliderSize!: Slider
  sliderSpeed!: Slider

  constructor(player: MfunsPlayer, container: HTMLElement, options?: PlayerOptions) {
    this.player = player
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!
    this.$iconWrap = this.el.querySelector(`.${classPrefix}-controller-icon-wrap`)!

    this.$filterPicker = this.el.querySelector(`.${classPrefix}-danmaku-settings-filter-picker`)!
    this.$opacitySlider = this.el.querySelector(`.${classPrefix}-danmaku-settings-opacity-slider`)!
    this.$areaSlider = this.el.querySelector(`.${classPrefix}-danmaku-settings-area-slider`)!
    this.$sizeSlider = this.el.querySelector(`.${classPrefix}-danmaku-settings-size-slider`)!
    this.$speedSlider = this.el.querySelector(`.${classPrefix}-danmaku-settings-speed-slider`)!

    this.$opacityValue = this.el.querySelector(`.${classPrefix}-danmaku-settings-opacity-value`)!
    this.$areaValue = this.el.querySelector(`.${classPrefix}-danmaku-settings-area-value`)!
    this.$sizeValue = this.el.querySelector(`.${classPrefix}-danmaku-settings-size-value`)!
    this.$speedValue = this.el.querySelector(`.${classPrefix}-danmaku-settings-speed-value`)!

    this.init()
    container.appendChild(fragment)
  }

  private init() {
    // 弹幕类型屏蔽
    this.pickerFilter = new MultiPicker({
      container: this.$filterPicker,
      value: [],
      list: [
        { value: "roll", label: "滚动" },
        { value: "top", label: "顶部" },
        { value: "bottom", label: "底部" },
        { value: "color", label: "彩色" },
        { value: "special", label: "特殊" },
      ],
      onToggle: (value, flag) => {
        this.player.danmaku.filter(value, flag)
      },
    })
    // 不透明度
    this.sliderOpacity = new Slider({
      container: this.$opacitySlider,
      min: 10,
      max: 100,
      step: 1,
      value: 100,
      onDrag: (value) => {
        this.player.danmaku.setOpacity(value / 100)
      },
      onChange: (value) => {
        this.$opacityValue.innerText = `${value}%`
      },
    })
    // 显示区域
    this.sliderArea = new Slider({
      container: this.$areaSlider,
      min: 1,
      max: 9,
      step: 1,
      value: 2,
      divider: true,
      onDrag: (value) => {
        const area = value / 8
        this.player.danmaku.setArea(area == 9 ? 0 : area)
      },
      onChange: (value) => {
        this.$areaValue.innerText = value < 8 ? `${value / 8}` : value == 8 ? "不重叠" : "无限"
      },
    })
    // 文字大小
    this.sliderSize = new Slider({
      container: this.$sizeSlider,
      min: 50,
      max: 200,
      step: 1,
      value: 100,
      onDrag: (value) => {
        this.player.danmaku.setSize(value / 100)
      },
      onChange: (value) => {
        this.$sizeValue.innerText = `${value}%`
      },
    })
    // 弹幕速度
    this.sliderSpeed = new Slider({
      container: this.$speedSlider,
      min: 20,
      max: 180,
      step: 10,
      value: 100,
      divider: 5,
      onDrag: (value) => {
        this.player.danmaku.setSpeed(value / 100)
      },
      onChange: (value) => {
        this.$speedValue.innerText = `${value}%`
      },
    })
  }
}
