import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { VideoSource } from "@/plugins/core/sources";
import { ControlsPlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_quality">
    <div class="${classPrefix}-controls-button-icon">
      <div class="${classPrefix}-controls-button-text">自动</div>
    </div>

    <div class="${classPrefix}-controls-panel-wrap">
      <div class="${classPrefix}-controls-panel">
        <ul class="${classPrefix}-button_quality-list"></ul>
      </div>
    </div>
  </div>
`;

const templateList = (
  sources: { quality: string; label?: string }[] | undefined,
  onClick: (quality: string) => void
) =>
  sources?.map(
    ({ quality, label }) =>
      html`
        <li
          class="${classPrefix}-button_quality-item"
          @click=${() => {
            onClick(quality);
          }}
          data-value="${quality}"
        >
          <span class="${classPrefix}-button_quality-item-label">${label || quality}</span>
        </li>
      `
  );

export default class ButtonQuality extends ControlsPlugin {
  static pluginName = "buttonQuality";
  $icon: HTMLElement;
  $text: HTMLElement;
  $panel: HTMLElement;

  $list: HTMLElement;

  private _list?: VideoSource[];
  private _value = "";

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonQuality",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$right,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$text = this.$(`.${classPrefix}-controls-button-text`)!;
    this.$panel = this.$(`.${classPrefix}-controls-panel`)!;

    this.$list = this.$(`.${classPrefix}-button_quality-list`)!;
  }

  created() {
    this.player.on("video_change", (v) => {
      this._update(v.sources);
    });
    this.player.on("video_load", (info) => {
      const s = this.player.videoInfo.sources?.find(({ url }) => url == info.url);
      if (s?.quality) {
        this._select(s?.quality, s.label);
      } else {
        this.player.once("loadedmetadata", () => {
          const { videoWidth, videoHeight } = this.player.$video;
          this._select(`${Math.min(videoWidth, videoHeight)}P`);
        });
      }
    });
  }

  private _update(sources?: VideoSource[]) {
    if (sources && sources == this._list) return;
    const list: { quality: string; label?: string }[] = [];
    sources?.forEach(({ quality, label }) => {
      if (quality && !list.find((s) => s.quality == quality)) {
        list.push({ quality, label });
      }
    });
    if (!list.length) {
      this.player.once("loadedmetadata", () => {
        const { videoWidth, videoHeight } = this.player.$video;
        render(
          templateList([{ quality: `${Math.min(videoWidth, videoHeight)}P` }], (q) => {
            this.plugin.quality?.set(q);
          }),
          this.$list
        );
      });
    } else {
      console.log("mmmmmmmm");
      render(
        templateList(list, (q) => {
          this.plugin.quality?.set(q);
        }),
        this.$list
      );
    }
    this._list = sources;
  }
  private _select(quality: string, label?: string) {
    this.$list.querySelector(`li[data-value="${this._value}"]`)?.classList.remove("state-selected");
    this._value = quality;
    this.$list.querySelector(`li[data-value="${quality}"]`)?.classList.add("state-selected");
    this.$text.innerText = label || quality;
  }
}
