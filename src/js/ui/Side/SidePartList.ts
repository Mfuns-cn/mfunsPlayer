import Player from "@/player";
import { classPrefix, developers, repositoryLink } from "@/const";
import { html, render } from "lit-html";
import { VideoPart } from "@/types";

const template = (list: VideoPart[], setPart: (p: number) => void) => html`
  <div class="${classPrefix}-side-panel ${classPrefix}-partlist">
    <div class="${classPrefix}-partlist-list">
      ${list.map(
        ({ title }, index) => html`
          <div
            class="${classPrefix}-partlist-list-item"
            @click=${() => {
              setPart(index + 1);
            }}
          >
            <div class="${classPrefix}-partlist-list-id">P${index + 1}</div>
            <div class="${classPrefix}-partlist-list-title">${title}</div>
          </div>
        `
      )}
    </div>
  </div>
`;

export default class SidePartList {
  player: Player;
  title = "分P列表";
  /** 是否挂载到播放器外部 */
  mounted = false;
  el: HTMLElement;
  constructor(player: Player) {
    this.player = player;
    const fragment = new DocumentFragment();
    render(
      template(player.video.list, (p) => {
        this.player.setPart(p, true);
        this.player.side.hide();
      }),
      fragment
    );
    this.el = fragment.querySelector(`.${classPrefix}-side-panel`)!;
  }
}
