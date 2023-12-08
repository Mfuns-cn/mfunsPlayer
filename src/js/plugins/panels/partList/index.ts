import Player from "@/player";
import { classPrefix } from "@/config";
import { html, render } from "lit-html";
import { PlayerOptions, VideoInfo } from "@/types";
import { PanelPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-partlist">
    <ul class="${classPrefix}-partlist-list mpui-list"></ul>
  </div>
`;

const templateList = (list: Omit<VideoInfo, "list" | "part">[], setPart: (p: number) => void) =>
  list.map(
    ({ title }, index) => html`
      <li
        class="${classPrefix}-partlist-item"
        @click=${() => {
          setPart(index + 1);
        }}
        data-part="${index + 1}"
      >
        <div class="${classPrefix}-partlist-item-id">P${index + 1}</div>
        <div class="${classPrefix}-partlist-item-title">${title}</div>
      </li>
    `
  );

declare module "@/types" {
  interface PluginExports {
    partList?: PartList;
  }
}

export default class PartList extends PanelPlugin {
  static pluginName = "partList";
  title = "分P列表";
  $list: HTMLElement;
  private _part = 0;
  private _list: VideoInfo["list"] = [];

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "partList",
      el: fragment.querySelector(`.${classPrefix}-partlist`)!,
      defaultOptions: {
        mount: (p) => p.plugin.side,
      },
    });
    this.$list = this.$(`.${classPrefix}-partlist-list`)!;
  }
  created() {
    this.player.on("video_change", (v) => {
      this._update(v.list);
      this._select(v.part || 1);
    });
  }
  private _update(list: VideoInfo["list"]) {
    if (list == this._list) return;
    this._list = list;
    render(
      templateList(list || [], (p) => {
        this.player.plugin.part?.set(p);
      }),
      this.$list
    );
  }
  private _select(p: number) {
    this.$list.querySelector(`li[data-part="${this._part}"]`)?.classList.remove("state-selected");
    this._part = p;
    this.$list.querySelector(`li[data-part="${p}"]`)?.classList.add("state-selected");
  }
}
