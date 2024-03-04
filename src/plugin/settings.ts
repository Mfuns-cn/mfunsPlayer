import { classPrefix } from "@/config";
import Player from "@/player";
import { BasePlugin, PanelPlugin } from "@/plugin";
import { PlayerOptions } from "@/types";
import { Checkbox, Picker } from "@/components";
import { html, render } from "lit-html";

declare module "@core" {
  interface PlayerPlugins {
    settings?: Settings;
  }
}

const template = html`
  <div class="${classPrefix}-settings">
    <div class="${classPrefix}-settings-slot">
      <div class="${classPrefix}-panel-row">
        <div class="${classPrefix}-row-label">播放倍速</div>
        <div class="${classPrefix}-settings-rate-picker"></div>
      </div>
      <div class="${classPrefix}-panel-row">
        <div class="${classPrefix}-row-label">视频比例</div>
        <div class="${classPrefix}-settings-ratio-picker"></div>
      </div>
    </div>
    <div class="${classPrefix}-panel-row">
      <div class="${classPrefix}-row-label">播放方式</div>
      <div class="${classPrefix}-settings-play"></div>
    </div>
    <div class="${classPrefix}-panel-row">
      <div class="${classPrefix}-row-label">其他设置</div>
      <div class="${classPrefix}-settings-others"></div>
    </div>
  </div>
`;

export default class Settings extends PanelPlugin {
  static pluginName = "settings";
  name = "settings";
  title = "设置";

  $slot: HTMLElement;
  $play: HTMLElement;
  $others: HTMLElement;

  $ratePicker: HTMLElement;
  $ratioPicker: HTMLElement;

  pickerRate!: Picker;
  pickerRatio!: Picker;
  toggleAutoplay!: Checkbox;
  toggleAutopart!: Checkbox;

  constructor(player: Player) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, fragment.querySelector(`.${classPrefix}-settings`)!);
    this.$slot = this.$(`.${classPrefix}-settings-slot`)!;
    this.$play = this.$(`.${classPrefix}-settings-play`)!;
    this.$others = this.$(`.${classPrefix}-settings-others`)!;

    this.$ratePicker = this.$(`.${classPrefix}-settings-rate-picker`)!;
    this.$ratioPicker = this.$(`.${classPrefix}-settings-ratio-picker`)!;
  }
  init() {
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
      value: this.player.playbackRate || 1,
      onPick: (value) => {
        this.player.setPlaybackRate(Number(value));
      },
    });
    this.player.on("ratechange", (rate: number) => {
      this.pickerRate.setValue(rate);
    });

    this.pickerRatio = new Picker({
      container: this.$ratioPicker,
      list: [
        { value: "", label: "自动" },
        { value: "16/9", label: "16:9" },
        { value: "4/3", label: "4:3" },
      ],
      value: this.player.aspectRatio || "",
      onPick: (value) => {
        this.player.setAspectRatio?.((value || "") as string);
      },
    });
    this.player.on("aspectRatioChange", (ratio) => {
      this.pickerRatio.setValue(ratio);
    });
  }
}
