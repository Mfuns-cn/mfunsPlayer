import { html, render } from "lit-html"
import { Picker, Slider, Checkbox } from "@/ui/components"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-settings">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-settings"></i>
    </div>
    <div class="${classPrefix}-controller-panel-wrap">
      <div class="${classPrefix}-controller-panel ${classPrefix}-controller-panel-settings">
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">播放倍速</div>
          <div class="${classPrefix}-settings-rate-picker"></div>
        </div>
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">视频比例</div>
          <div class="${classPrefix}-settings-scale-picker"></div>
        </div>
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">界面设置</div>
          <div class="${classPrefix}-settings-fixedcontroller-checkbox"></div>
          <div class="${classPrefix}-settings-showPrevButton-checkbox"></div>
        </div>
      </div>
    </div>
  </div>
`

export default class ButtonSettings {
  player: MfunsPlayer
  el: HTMLElement
  $iconWrap: HTMLElement

  $ratePicker: HTMLElement
  $scalePicker: HTMLElement
  $fixedcontrollerCheckbox: HTMLElement
  $showPrevButtonCheckbox: HTMLElement

  pickerRate!: Picker
  pickerScale!: Picker
  checkboxFixedcontroller!: Checkbox
  checkboxShowPrevButton!: Checkbox

  constructor(player: MfunsPlayer, container: HTMLElement) {
    this.player = player
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!
    this.$iconWrap = this.el.querySelector(`.${classPrefix}-controller-icon-wrap`)!

    this.$ratePicker = this.el.querySelector(`.${classPrefix}-settings-rate-picker`)!
    this.$scalePicker = this.el.querySelector(`.${classPrefix}-settings-scale-picker`)!
    this.$fixedcontrollerCheckbox = this.el.querySelector(
      `.${classPrefix}-settings-fixedcontroller-checkbox`
    )!
    this.$showPrevButtonCheckbox = this.el.querySelector(
      `.${classPrefix}-settings-showPrevButton-checkbox`
    )!

    this.init()
    container.appendChild(fragment)
  }

  private init() {
    this.pickerRate = new Picker({
      container: this.$ratePicker,
      list: [
        { value: 0.5, label: "0.5" },
        { value: 0.75, label: "0.75" },
        { value: 1, label: "1.0" },
        { value: 1.25, label: "1.25" },
        { value: 1.5, label: "1.5" },
        { value: 2, label: "2.0" },
      ],
      value: 1,
      onPick: (value) => {
        this.player.setRate(Number(value))
      },
    })
    this.player.on("rate_change", (rate: number) => {
      this.pickerRate.setValue(rate)
    })

    this.pickerScale = new Picker({
      container: this.$scalePicker,
      list: [{ value: "", label: "自动" }, { value: "16:9" }, { value: "4:3" }],
      value: "",
    })
    this.checkboxFixedcontroller = new Checkbox({
      container: this.$fixedcontrollerCheckbox,
      label: "固定控制栏",
      onToggle: (value) => {
        this.player.mode.fixedController(value)
      },
    })
    this.checkboxShowPrevButton = new Checkbox({
      container: this.$showPrevButtonCheckbox,
      label: "显示上一P按钮（多P下生效）",
      onToggle: (value) => {
        this.player.controller.buttonPrev.show(value)
      },
    })
  }
}
