import type { DanmakuSendItem } from "@plugin/danmaku/types";
import { keyCode } from "@/utils/KeyCode.enum";
import { PlayerOptions } from "@/types";
import Player from "@/player";
import { classPrefix } from "@/config";
import { html, render } from "lit-html";
import Controller from "../ui/controller";
import { ControlsPlugin, IControls, UIOptionsItem } from "@/plugin";
import Danmaku from "./danmaku";

const template = html`
  <div class="${classPrefix}-danmakubar">
    <div class="${classPrefix}-danmakubar-slot"></div>
    <div class="${classPrefix}-danmakubar-input-wrap">
      <div class="${classPrefix}-danmakubar-input-slot"></div>
      <input type="text" autocompleted="new-password" class="${classPrefix}-danmakubar-input" />
      <div class="${classPrefix}-danmakubar-status-loading">弹幕功能加载中...</div>
      <div class="${classPrefix}-danmakubar-status-login">需要<a>登录</a>后才能发送弹幕哦~</div>
      <div class="${classPrefix}-danmakubar-send">发送</div>
    </div>
  </div>
`;

declare module "@core" {
  interface Player {
    danmakuBar?: DanmakuBar;
  }
}
declare module "@core" {
  interface PlayerOptions {
    /** 弹幕栏设置 */
    danmakuBar?: {
      controls: {
        left: UIOptionsItem<IControls>[];
        right: UIOptionsItem<IControls>[];
      };
      /** 占位文本 */
      placeholder?: string;
      /** 需要登录 */
      loginRequired?: boolean;
    };
    danmakuStyle?: {
      /** 选色列表 */
      colorList?: string[];
      /** 字号列表 */
      sizeList?: [number, string?][];
      /** 弹幕模式列表 */
      modeList?: number[];
      /** 默认弹幕字号 */
      defaultSize?: number;
      /** 默认弹幕模式 */
      defaultMode?: number;
      /** 默认弹幕模式 */
      defaultColor?: number;
    };
  }
  interface PlayerPlugins {
    danmakuBar?: DanmakuBar;
  }
}

/** 弹幕栏
 *
 * 前置插件: `danmaku`
 */
export default class DanmakuBar extends ControlsPlugin {
  static pluginName = "danmakuBar";
  name = "danmakuBar";

  $send: HTMLElement;
  $input: HTMLInputElement;
  $slot: HTMLElement;
  $inputSlot: HTMLElement;

  $logina: HTMLElement;

  controller: Controller;
  danmaku: Danmaku;

  danmakuColor = 0xffffff;
  danmakuMode = 1;
  danmakuSize = 25;

  /** 是否需要登录 */
  get loginRequired() {
    return this.$el.classList.contains("is-login");
  }

  /** 冷却计时器 */
  coolDownTimer = 0;

  constructor(player: Player) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, fragment.querySelector(`.${classPrefix}-danmakubar`)!);

    this.controller = this.plugin.controller!;
    this.danmaku = this.plugin.danmaku!;

    this.$send = this.$el.querySelector(`.${classPrefix}-danmakubar-send`)!;
    this.$input = this.$el.querySelector(`.${classPrefix}-danmakubar-input`)!;
    this.$slot = this.$el.querySelector(`.${classPrefix}-danmakubar-slot`)!;
    this.$inputSlot = this.$el.querySelector(`.${classPrefix}-danmakubar-input-slot`)!;
    this.$logina = this.$el.querySelector(`.${classPrefix}-danmakubar-status-login a`)!;

    this.$logina.onclick = () => this.player.login?.();

    this.player.on("videoChange", () => {
      this.setLoading(true);
    });
    this.player.on("loadeddata", () => {
      this.setLoading(false);
    });

    this.$input.addEventListener("keydown", (e) => {
      if (e.keyCode == keyCode.Enter) {
        this.send();
      }
    });
    this.$send.onclick = () => {
      this.send();
    };
  }

  apply(player: Player, options: PlayerOptions): void {
    if (options.danmakuBar?.loginRequired) {
      this.setLoginRequired(true);
    }
    this.setPlaceHolder(options.danmakuBar?.placeholder || defaultPlaceholder);
  }
  setPlaceHolder(placeholder: string) {
    this.$input.placeholder = placeholder;
  }
  /** 执行弹幕发送操作 */
  private send() {
    // 如果内容为空或只有空格，则不进行发送操作
    if (!this.$input.value.trim() || this.coolDownTimer) return;
    this.plugin.danmakuOperate?.send(this.generateDanmaku());
    this.$input.value = "";
  }
  /** 设置弹幕发送冷却 */
  public setCoolDown(time: number) {
    if (this.coolDownTimer) {
      window.clearInterval(this.coolDownTimer);
    }
    let t = Math.round(time);
    this.$send.classList.add("is-disabled");
    this.$send.innerText = `${t}秒`;
    this.coolDownTimer = window.setInterval(() => {
      t -= 1;
      if (t) {
        this.$send.innerText = `${t}秒`;
      } else {
        this.$send.innerText = "发送";
        this.$send.classList.remove("is-disabled");
        window.clearInterval(this.coolDownTimer);
        this.coolDownTimer = 0;
      }
    }, 1000);
  }
  generateDanmaku(): DanmakuSendItem {
    return {
      time: this.player.currentTime,
      content: this.$input.value,
      mode: this.danmakuMode,
      color: this.danmakuColor,
      size: this.danmakuSize,
    };
  }
  /** 设置登录限制 */
  private setLoginRequired(flag: boolean) {
    if (flag) {
      this.$el.classList.add("is-login");
    } else {
      this.$el.classList.remove("is-login");
    }
  }
  /** 设置加载状态 */
  private setLoading(flag: boolean) {
    if (flag) {
      this.$el.classList.add("is-loading");
    } else {
      this.$el.classList.remove("is-loading");
    }
  }
}

const defaultPlaceholder = "发条弹幕吧~";
