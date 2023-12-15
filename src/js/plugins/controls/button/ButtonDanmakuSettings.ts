import { MultiPicker, Slider } from "@/components";
import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";
import Danmaku from "@/plugins/danmaku";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_danmakusettings">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-danmaku-settings"></i>
    </div>
    <div class="${classPrefix}-controls-panel-wrap">
      <div class="${classPrefix}-controls-panel ${classPrefix}-controls-panel-danmaku-settings">
        <div class="${classPrefix}-panel-row">
          <div class="${classPrefix}-row-label">类型屏蔽</div>
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
`;

export default class ButtonDanmakuSettings extends ControlsPlugin {
  static pluginName = "buttonDanmakuSettings";
  danmaku: Danmaku;

  $icon: HTMLElement;

  $filterPicker: HTMLElement;
  $opacitySlider: HTMLElement;
  $areaSlider: HTMLElement;
  $sizeSlider: HTMLElement;
  $speedSlider: HTMLElement;

  $opacityValue: HTMLElement;
  $areaValue: HTMLElement;
  $sizeValue: HTMLElement;
  $speedValue: HTMLElement;

  pickerFilter!: MultiPicker;
  sliderOpacity!: Slider;
  sliderArea!: Slider;
  sliderSize!: Slider;
  sliderSpeed!: Slider;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonDanmakuSettings",
      defaultOptions: {
        container: (p) => p.plugin.danmakuBar?.$slot || p.plugin.controller?.$right,
        order: 1,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });

    this.danmaku = player.plugin.danmaku!;

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;

    this.$filterPicker = this.$(`.${classPrefix}-danmaku-settings-filter-picker`)!;
    this.$opacitySlider = this.$(`.${classPrefix}-danmaku-settings-opacity-slider`)!;
    this.$areaSlider = this.$(`.${classPrefix}-danmaku-settings-area-slider`)!;
    this.$sizeSlider = this.$(`.${classPrefix}-danmaku-settings-size-slider`)!;
    this.$speedSlider = this.$(`.${classPrefix}-danmaku-settings-speed-slider`)!;

    this.$opacityValue = this.$(`.${classPrefix}-danmaku-settings-opacity-value`)!;
    this.$areaValue = this.$(`.${classPrefix}-danmaku-settings-area-value`)!;
    this.$sizeValue = this.$(`.${classPrefix}-danmaku-settings-size-value`)!;
    this.$speedValue = this.$(`.${classPrefix}-danmaku-settings-speed-value`)!;
  }

  created() {
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
        this.danmaku.filter(value, flag);
      },
    });
    // 不透明度
    this.sliderOpacity = new Slider({
      container: this.$opacitySlider,
      min: 10,
      max: 100,
      step: 1,
      value: 100,
      onDrag: (value) => {
        this.danmaku.setOpacity(value / 100);
      },
      onChange: (value) => {
        this.$opacityValue.innerText = `${value}%`;
      },
    });
    // 显示区域
    this.sliderArea = new Slider({
      container: this.$areaSlider,
      min: 20,
      max: 105,
      step: 5,
      value: 25,
      onDrag: (value) => {
        const area = value / 100;
        this.danmaku.setArea(area > 100 ? 0 : area);
      },
      onChange: (value) => {
        this.$areaValue.innerText = value < 100 ? `${value}%` : value == 100 ? "不重叠" : "无限";
      },
    });
    this.sliderArea.drag(25);
    // 文字大小
    this.sliderSize = new Slider({
      container: this.$sizeSlider,
      min: 50,
      max: 200,
      step: 1,
      value: 100,
      onDrag: (value) => {
        this.danmaku.setScale(value / 100);
      },
      onChange: (value) => {
        this.$sizeValue.innerText = `${value}%`;
      },
    });
    // 弹幕速度
    this.sliderSpeed = new Slider({
      container: this.$speedSlider,
      min: 20,
      max: 180,
      step: 10,
      value: 100,
      divider: 5,
      onDrag: (value) => {
        this.danmaku.setSpeed(value / 100);
      },
      onChange: (value) => {
        this.$speedValue.innerText = `${value}%`;
      },
    });
  }
}
