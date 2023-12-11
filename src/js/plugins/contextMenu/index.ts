import { classPrefix } from "@/config";
import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { DanmakuItem } from "@/plugins/danmaku/types";
import { html, render } from "lit-html";
import Danmaku from "../danmaku";
import { createElement } from "@/utils";

const template = (list: MenuItem[]) => html`
  <div class="${classPrefix}-contextmenu">
    <ul class="${classPrefix}-contextmenu-danmaku mpui-black"></ul>
    <ul class="${classPrefix}-contextmenu-menu mpui-black">
      ${list.map(
        ({ name, onClick }) => html`
          <li class="${classPrefix}-contextmenu-item" @click=${onClick}>${name}</li>
        `
      )}
    </ul>
  </div>
`;
const templateDanmaku = (
  danmaku: DanmakuItem[],
  operation: (dm: DanmakuItem) => [string, (dm: DanmakuItem) => void, unknown][],
  onClick: (dm: DanmakuItem) => void,
  menu: ContextMenu
) => html`
  ${danmaku.map(
    (dm) => html`
      <li
        class="${classPrefix}-contextmenu-danmaku-item"
        @click=${() => {
          onClick(dm);
        }}
      >
        <div class="${classPrefix}-contextmenu-danmaku-item-content">${dm.content}</div>
        <div class="${classPrefix}-contextmenu-danmaku-item-operate">
          ${operation(dm).map(
            ([label, onClick]) => html`<div
              class="${classPrefix}-contextmenu-danmaku-item-operate-btn"
              @click=${(e: MouseEvent) => {
                e.stopPropagation();
                onClick(dm);
                menu.hide();
              }}
            >
              ${label}
            </div>`
          )}
        </div>
      </li>
    `
  )}
`;

const copyClip = (content: string) => {
  navigator.clipboard.writeText(content).then(
    (res) => {
      // success
    },
    (rej) => {
      // fail
    }
  );
};

interface MenuItem {
  name: string;
  onClick?: () => void;
}

export default class ContextMenu extends BasePlugin {
  static pluginName = "contextMenu";
  player: Player;
  container: HTMLElement;
  danmaku?: Danmaku;
  $el: HTMLElement;
  $danmaku: HTMLElement;
  $menu: HTMLElement;
  private isShow = false;
  constructor(player: Player) {
    super(player);
    this.player = player;

    const menuList: MenuItem[] = [
      {
        name: "快捷键说明",
        onClick: () => {
          this.player.plugin.hotkeys?.toggle(true);
        },
      },
      {
        name: `Mfuns Player v${Player.version}-${Player.gitHash}`,
        onClick: () => {
          this.player.plugin.about?.toggle(true);
        },
      },
    ];
    this.container = createElement("div", { class: `${classPrefix}-contextmenu-wrap` });
    render(template(menuList), this.container);
    this.$el = this.container.querySelector(`.${classPrefix}-contextmenu`)!;
    this.$danmaku = this.$el.querySelector(`.${classPrefix}-contextmenu-danmaku`)!;
    this.$menu = this.$el.querySelector(`.${classPrefix}-contextmenu-menu`)!;

    this.player.$main.appendChild(this.container);
  }
  created() {
    this.player.$area.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault();
      const clientRect = this.player.$area.getBoundingClientRect();
      const x = e.clientX - clientRect.left;
      const y = e.clientY - clientRect.top;
      this.show(x, y);
      const captured = this.danmaku?.engine.captureDanmaku(x, y, 4);
      this.showDanmaku(captured || []);
    });
    this.container.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault();
      const clientRect = this.container.getBoundingClientRect();
      const x = e.clientX - clientRect.left;
      const y = e.clientY - clientRect.top;
      this.show(x, y);
      const captured = this.danmaku?.engine.captureDanmaku(x, y, 4);
      this.showDanmaku(captured || []);
    });
    document.addEventListener("click", () => {
      if (this.isShow) {
        this.hide();
      }
    });
  }
  pluginsReady() {
    this.danmaku = this.player.plugin.danmaku;
  }
  show(x: number, y: number) {
    this.container.classList.add("state-show");
    const clientRect = this.player.$area.getBoundingClientRect();
    if (x + this.$el.offsetWidth >= clientRect.width) {
      this.$el.style.right = clientRect.width - x + "px";
      this.$el.style.left = "initial";
    } else {
      this.$el.style.left = x + "px";
      this.$el.style.right = "initial";
    }
    if (y + this.$el.offsetHeight >= clientRect.height) {
      this.$el.style.bottom = clientRect.height - y + "px";
      this.$el.style.top = "initial";
    } else {
      this.$el.style.top = y + "px";
      this.$el.style.bottom = "initial";
    }
    this.isShow = true;
  }
  showDanmaku(danmaku: DanmakuItem[]) {
    const api = this.danmaku?.api;
    const operate = this.danmaku?.operate;
    if (danmaku?.length) {
      this.$danmaku.style.display = "";
    } else {
      this.$danmaku.style.display = "none";
    }
    render(
      templateDanmaku(
        danmaku,
        (dm) => {
          const myDanmaku = this.player.userId && dm.user == this.player.userId;
          return [
            [
              "举报",
              (dm: DanmakuItem) => {
                operate?.report(dm);
              },
              !myDanmaku && api?.danmakuReport,
            ],
            [
              "屏蔽",
              (dm: DanmakuItem) => {
                operate?.blockUser(dm.user, true);
              },
              !myDanmaku && api?.danmakuBlockUser,
            ],
            [
              "撤回",
              (dm: DanmakuItem) => {
                operate?.recall(dm);
              },
              myDanmaku && api?.danmakuRecall,
            ],
            [
              "复制",
              (dm: DanmakuItem) => {
                copyClip(dm.content);
              },
              true,
            ],
          ].filter((v) => v[2]) as [string, (dm: DanmakuItem) => void, unknown][];
        },
        (dm) => {
          this.player.emit("danmaku:select", dm);
        },
        this
      ),
      this.$danmaku
    );
  }
  hide() {
    this.container.classList.remove("state-show");
    this.isShow = false;
  }
}
