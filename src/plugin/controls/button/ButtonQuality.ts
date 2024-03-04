import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { QualityItem } from "@plugin/quality";
import { createElement } from "@/utils";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-quality">
    <div class="${classPrefix}-controls-button-icon">
      <div class="${classPrefix}-controls-button-text">自动</div>
    </div>

    <div class="${classPrefix}-controls-panel-wrap">
      <div class="${classPrefix}-controls-panel">
        <ul class="${classPrefix}-button-quality-list"></ul>
      </div>
    </div>
  </div>
`;

declare module "@plugin/quality" {
  interface QualityItem {
    label?: string | HTMLElement;
    buttonLabel?: string | HTMLElement;
  }
}

export default class ButtonQuality extends ControlsPlugin {
  static pluginName = "buttonQuality";
  name = "quality";
  $icon: HTMLElement;
  $text: HTMLElement;
  $panel: HTMLElement;

  $list: HTMLElement;

  private _itemMap = new Map<QualityItem, HTMLElement>();

  /** 获取label */
  getLabel?: (quality: QualityItem) => string | HTMLElement;
  /** 获取按钮label */
  getButtonLabel?: (quality: QualityItem) => string | HTMLElement;

  constructor(player: Player) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, fragment.querySelector(`.${classPrefix}-controls-button`)!);
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$text = this.$(`.${classPrefix}-controls-button-text`)!;
    this.$panel = this.$(`.${classPrefix}-controls-panel`)!;

    this.$list = this.$(`.${classPrefix}-button-quality-list`)!;
  }

  init() {
    this.player.on("qualityListUpdate", (list) => {
      this._updateList(list);
    });
    this.player.on("qualityChanging", (quality) => {
      this._updateItem(quality);
    });
    this.player.on("qualityChanged", (quality) => {
      this._updateItem(quality);
    });
    this.player.on("qualityChangeFailed", () => {
      this._updateItem(this.player.quality!.current || {});
    });
  }

  private _updateList(list: QualityItem[]) {
    this._itemMap = new Map();
    if (!list.length) {
      this.$panel.style.display = "none";
      this.$icon.style.cursor = "default";
    } else {
      this.$panel.style.display = "";
      this.$icon.style.cursor = "";
    }
    this.$list.innerHTML = "";
    const fragment = new DocumentFragment();
    list?.forEach((quality) => {
      const label = quality.label || this.getLabel?.(quality) || quality.quality;
      if (label) {
        const item = createElement(
          "li",
          {
            class: `${classPrefix}-button-quality-item`,
            "data-value": quality.quality || "",
          },
          typeof label == "string" ? new Text(label) : label
        );
        item.onclick = () => {
          this.player.quality?.set(quality);
        };
        this._itemMap.set(quality, item);
        fragment.appendChild(item);
      }
    });
    this.$list.appendChild(fragment);
  }

  private _updateItem(quality: QualityItem) {
    // 更新label内容
    const label =
      quality.buttonLabel ||
      this.getButtonLabel?.(quality) ||
      (typeof quality.label == "object" ? quality.label.cloneNode(true) : quality.label) ||
      this.getLabel?.(quality) ||
      quality.quality;

    if (!label) {
      this.hide();
    } else {
      this.show();
      if (typeof label == "string") {
        this.$text.innerText = label;
      } else {
        this.$text.innerHTML = "";
        this.$text.appendChild(label);
      }
    }
    // 更新列表checked
    this.$list.querySelectorAll("li").forEach((item) => {
      item.classList.toggle("is-checked", item == this._itemMap.get(quality));
    });
  }
  get ignored() {
    return !this.player.quality;
  }
}
