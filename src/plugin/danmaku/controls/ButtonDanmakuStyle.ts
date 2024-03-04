import { PlayerOptions } from "@/types";
import { html, render } from "lit-html";
import { classPrefix } from "@/config";
import { Picker } from "@/components";
import { color2Number } from "@/utils";
import DanmakuBar from "../danmakuBar";
import { ControlsPlugin } from "@/plugin";
import { Player } from "@core";

declare global {
  interface Window {
    EyeDropper: {
      new (): {
        open: () => Promise<{ sRGBHex: string }>;
      };
    };
  }
}

const template = () => html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-danmakustyle">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-text"></i>
    </div>
    <div class="${classPrefix}-controls-panel-wrap">
      <div class="${classPrefix}-controls-panel ${classPrefix}-controls-panel-danmaku-style">
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
          <input
            class="${classPrefix}-danmaku-style-color-input mpui-input"
            type="text"
            value="#"
          />
          <div class="${classPrefix}-danmaku-style-color-preview"></div>
          ${window.EyeDropper
            ? html`<button class="${classPrefix}-danmaku-style-color-dropper mpui-button">
                拾取
              </button>`
            : ""}
        </div>
        <div class="${classPrefix}-danmaku-style-color-picker"></div>
      </div>
    </div>
  </div>
`;

export default class ButtonDanmakuStyle extends ControlsPlugin {
  name = "danmakuStyle";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  $sizePicker: HTMLElement;
  $modePicker: HTMLElement;
  $colorPicker: HTMLElement;
  $colorInput: HTMLInputElement;
  $colorPreview: HTMLElement;
  $colorDropper: HTMLElement | null;

  pickerSize!: Picker;
  pickerMode!: Picker;
  pickerColor!: Picker;

  colorList: number[] = [];
  sizeList: [number, string][] = [];
  modeList: number[] = [];

  get danmakuBar() {
    return this.player.danmakuBar;
  }
  constructor(player: Player) {
    const fragment = new DocumentFragment();
    render(template(), fragment);
    super(player, fragment.querySelector(`.${classPrefix}-controls-button`)!);
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;

    this.$sizePicker = this.$(`.${classPrefix}-danmaku-style-fontsize-picker`)!;
    this.$modePicker = this.$(`.${classPrefix}-danmaku-style-mode-picker`)!;
    this.$colorPicker = this.$(`.${classPrefix}-danmaku-style-color-picker`)!;
    this.$colorInput = this.$(`.${classPrefix}-danmaku-style-color-input`)!;
    this.$colorPreview = this.$(`.${classPrefix}-danmaku-style-color-preview`)!;
    this.$colorDropper = this.$(`.${classPrefix}-danmaku-style-color-dropper`);
  }

  apply(player: Player, options: PlayerOptions): void {
    if (options.danmakuStyle) {
      const { sizeList, colorList, modeList, defaultSize, defaultColor, defaultMode } =
        options.danmakuStyle;
      if (sizeList) {
        this.pickerSize.list = sizeList.map(([value, label]) => ({ value, label }));
        this.pickerSize.reload(defaultSize);
      }
      if (colorList) {
        this.pickerSize.list = colorList.map((value) => ({ value }));
        this.pickerSize.reload(defaultColor);
      }
      if (modeList) {
        this.pickerMode.list = [
          { value: 1, label: "滚动" },
          { value: 5, label: "顶部" },
          { value: 4, label: "底部" },
          { value: 6, label: "逆向" },
        ].filter((item) => modeList.indexOf(item.value) > -1);
        this.pickerMode.reload(defaultMode);
      }
    }
  }

  init(player: Player) {
    this.pickerSize = new Picker({
      container: this.$sizePicker,
      value: 25,
      list: defaultSizeList.map(([value, label]) => ({
        value,
        label,
      })),
      onPick: (value) => {
        this.danmakuBar!.danmakuSize = Number(value);
      },
    });
    this.pickerMode = new Picker({
      container: this.$modePicker,
      value: 1,
      list: [
        { value: 1, label: "滚动" },
        { value: 5, label: "顶部" },
        { value: 4, label: "底部" },
        { value: 6, label: "逆向" },
      ].filter((item) => defaultModeList.indexOf(item.value) > -1),
      onChange: (value) => {
        this.danmakuBar!.danmakuMode = Number(value) || 1;
      },
    });
    this.pickerColor = new Picker({
      container: this.$colorPicker,
      value: "#FFFFFF",
      list: defaultColorList.map((item) => ({ value: item })),
      onPick: (value) => {
        this.danmakuBar!.danmakuColor = color2Number(value as string);
      },
      onChange: (value) => {
        this.$colorInput.value = value as string;
        this.$colorPreview.style.backgroundColor = value as string;
      },
      template: (item) => html` <div style="background-color: ${item.value}"></div> `,
      condition: (item, value) => {
        return item.toLowerCase() == (value as string).toLowerCase();
      },
    });
    this.$colorInput.addEventListener("input", () => {
      const value = this.$colorInput.value;
      this.$colorInput.value = "#" + value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
      if (/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value)) {
        this.pickerColor.pick(value);
      }
    });
    if (this.$colorDropper) {
      this.$colorDropper.onclick = () => {
        if (window.EyeDropper) {
          const dropper = new window.EyeDropper();
          dropper.open().then(({ sRGBHex }) => {
            this.pickerColor.pick(sRGBHex);
          });
        }
      };
    }
  }
}

const defaultSizeList: [number, string][] = [
  [18, "小"],
  [25, "中"],
  [36, "大"],
];

const defaultModeList = [1, 5, 4];

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
];
