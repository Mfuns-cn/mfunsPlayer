import { html, render } from "lit-html";
import { Picker, Checkbox } from "@/ui/components";
import Player from "@/player";
import { classPrefix } from "@/const";
import { PlayerOptions } from "@/types";

const template = (order?: number) => html`
  <div
    class="${classPrefix}-controller-button ${classPrefix}-controller-settings"
    style="${order ? `order: ${order}` : ""}"
  >
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
          <div class="${classPrefix}-row-label">其他设置</div>
        </div>
        <div class="${classPrefix}-panel-row ${classPrefix}-settings-others">
          <div class="${classPrefix}-settings-solid-checkbox"></div>
          <div class="${classPrefix}-settings-showPrevButton-checkbox"></div>
        </div>
      </div>
    </div>
  </div>
`;

export default class ButtonSettings {
  player: Player;
  el: HTMLElement;
  $iconWrap: HTMLElement;

  $ratePicker: HTMLElement;
  $scalePicker: HTMLElement;
  $solidCheckbox: HTMLElement;
  $showPrevButtonCheckbox: HTMLElement;
  $others: HTMLElement;

  pickerRate!: Picker;
  pickerScale!: Picker;
  checkboxSolid!: Checkbox;
  checkboxShowPrevButton!: Checkbox;

  constructor(
    player: Player,
    container: HTMLElement,
    order: number | undefined,
    options: PlayerOptions
  ) {
    this.player = player;
    const fragment = new DocumentFragment();
    render(template(order), fragment);
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!;
    this.$iconWrap = this.el.querySelector(`.${classPrefix}-controller-icon-wrap`)!;

    this.$ratePicker = this.el.querySelector(`.${classPrefix}-settings-rate-picker`)!;
    this.$scalePicker = this.el.querySelector(`.${classPrefix}-settings-scale-picker`)!;
    this.$solidCheckbox = this.el.querySelector(`.${classPrefix}-settings-solid-checkbox`)!;
    this.$showPrevButtonCheckbox = this.el.querySelector(
      `.${classPrefix}-settings-showPrevButton-checkbox`
    )!;
    this.$others = this.el.querySelector(`.${classPrefix}-settings-others`)!;

    this.init(options);
    container.appendChild(fragment);
  }

  private init(options: PlayerOptions) {
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
        this.player.setPlaybackRate(Number(value));
      },
    });
    this.player.on("ratechange", (rate: number) => {
      this.pickerRate.setValue(rate);
    });

    this.pickerScale = new Picker({
      container: this.$scalePicker,
      list: [{ value: "", label: "自动" }, { value: "16:9" }, { value: "4:3" }],
      value: "",
      onPick: (value) => {
        this.player.video.setRatio(
          value ? ((value as string).split(":").map((v) => Number(v)) as [number, number]) : null
        );
      },
    });
    this.player.on("change:aspectRatio", (ratio) => {
      this.pickerRate.setValue(ratio ? ratio.join(":") : "");
    });

    if (options.feature?.solid) {
      this.checkboxSolid = new Checkbox({
        container: this.$solidCheckbox,
        label: "固定控制栏",
        onToggle: (value) => {
          this.player.mode.solid(value);
        },
      });
    }
    this.checkboxShowPrevButton = new Checkbox({
      container: this.$showPrevButtonCheckbox,
      label: "显示上一P按钮（多P下生效）",
      onToggle: (value) => {
        (this.player.plugin.buttonPrev as any)?.show(value);
      },
    });
  }
}
