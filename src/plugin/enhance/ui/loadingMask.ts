import { classPrefix } from "@/config";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";
import { createElement } from "@/utils";
import MfunsPlayer from "@/player";
import { html, render } from "lit-html";

declare module "@core" {
  interface PlayerOptions {
    loadingMask?: {
      delay?: number;
      getTips?: () => Promise<string | Node>;
    };
  }
}

const template = html`
  <div class="${classPrefix}-loadingmask-icon">
    <div class="${classPrefix}-loadingmask-image"></div>
  </div>
  <div class="${classPrefix}-loadingmask-info"></div>
  <div class="${classPrefix}-loadingmask-tips">Loading...</div>
`;

/** 加载画面 */

export default class LoadingMask extends BasePlugin {
  static pluginName = "loadingMask";
  $el: HTMLElement;
  $info: HTMLElement;
  $tips: HTMLElement;
  getTips?: () => Promise<string | Node>;
  delay: number = 0;

  constructor(player: MfunsPlayer) {
    super(player);
    this.$el = createElement("div", { class: `${classPrefix}-loadingmask` });
    render(template, this.$el);
    this.$info = this.$el.querySelector(`.${classPrefix}-loadingmask-info`)!;
    this.$tips = this.$el.querySelector(`.${classPrefix}-loadingmask-tips`)!;

    this.player.$main.appendChild(this.$el);
    /* if (!this.api?.loadingTips) {
      this.$tips.style.display = "none";
    } */
  }
  apply(player: MfunsPlayer, options: PlayerOptions): void {
    this.getTips = options.loadingMask?.getTips;
    this.delay = options.loadingMask?.delay || 0;
  }
  init() {
    this._toggle(true);
    this._add("init", "播放器初始化…");
    this.player.on("danmaku:loading", () => {
      this._add("danmaku", "请求弹幕数据中…");
    });
    this.player.on("danmaku:loaded", (dan, err) => {
      this._change("danmaku", (line) => {
        if (!err) {
          line.innerText = "请求弹幕数据中… [完成]";
        } else {
          line.innerText = `请求弹幕数据中… [失败] ${err}`;
        }
      });
    });
    this.player.on("videoChange", async () => {
      this._toggle(true);
      this._tips(await this.getTips?.());
    });
    this.player.on("videoLoad", () => {
      this._add("video", "请求视频数据中…");

      this.player.once("canplay", () => {
        this._change("video", (line) => {
          line.innerText = "请求视频数据中… [完成]";
          let timer = 0;
          const handler = () => {
            this._toggle(false);
            this._tips("Loading...");
            this._clear();
            window.clearTimeout(timer);
          };
          if (this.delay) {
            timer = window.setTimeout(handler, this.delay);
          } else {
            handler();
          }
        });
      });
      this.player.$video.addEventListener(
        "error",
        (err) => {
          this._change("video", (line) => {
            line.innerText = `请求视频数据中… [失败] ${err}`;
          });
        },
        { once: true }
      );
    });
    this.player.on("error", (err) => {
      this._add("error", `${err}`);
    });
  }
  ready() {
    this._change("init", (line) => {
      line.innerText = "播放器初始化… [完成]";
    });
  }
  private _clear() {
    this.$info.innerHTML = "";
  }
  private _add(id: string, content: string | Node) {
    const item = createElement("div", { class: `${classPrefix}-loadingmask-info-item` });
    item.dataset.id = id;
    item.append(content);
    this.$info.appendChild(item);
  }
  private _change(id: string, func: (line: HTMLElement) => void) {
    const item: HTMLElement | null = this.$info.querySelector(`[data-id="${id}"]`);
    item && func(item);
  }
  private _toggle(flag: boolean) {
    this.$el.classList.toggle("is-show", flag);
  }
  private _tips(content?: string | Node) {
    this.$tips.innerHTML = "";
    content && this.$tips.append(content);
  }
}
