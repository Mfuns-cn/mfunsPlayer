import { DanmakuInvokes, DanmakuItem } from "./types";
import { PlayerOptions } from "@/types";
import Player from "@/player";
import { classPrefix } from "@/config";
import { BasePlugin } from "@/plugin";
import { createElement } from "@/utils";

declare module "@core" {
  interface Player {
    danmaku?: Danmaku;
  }
}

declare module "@core" {
  interface PlayerValueMap {
    /** 弹幕不透明度 */
    "danmaku.opacity": number;
    /** 弹幕移动速度 */
    "danmaku.speed": number;
    /** 弹幕显示区域 */
    "danmaku.area": number;
    /** 弹幕大小 */
    "danmaku.scale": number;
    /** 弹幕字体 */
    "danmaku.font": string;
    /** 弹幕加粗 */
    "danmaku.bold": boolean;
  }
  interface PlayerPlugins {
    danmaku?: Danmaku;
  }
}

/** 弹幕模块
 *
 * 负责控制弹幕添加、移除、播放等基本操作
 */
export default class Danmaku extends BasePlugin {
  static readonly pluginName = "danmaku";

  $el: HTMLDivElement;

  handler: Record<string, (dan: DanmakuItem[]) => void> = {};

  private _status = true;

  get status() {
    return this._status;
  }

  invoke: DanmakuInvokes = {};

  constructor(player: Player) {
    super(player);

    this.$el = createElement("div", { class: `${classPrefix}-danmaku-wrap` });

    this.player.$content.after(this.$el);
  }
  init() {
    this.player.define("danmaku", { value: this });
  }

  apply(player: Player, options: PlayerOptions): void {
    this.invoke = options.danmakuInvoke || {};
  }

  /**
   * 添加弹幕到弹幕池
   * @param dan 要添加的弹幕
   * @param play 是否播放超时弹幕
   * */
  add(dan: DanmakuItem[], play?: boolean) {
    this.player.emit("danmaku:add", dan, play || false);
  }

  /**
   * 绘制一条弹幕
   * @param dm 要绘制的弹幕
   * */
  draw(dm: DanmakuItem) {
    this.player.emit("danmaku:draw", dm);
  }

  /**
   * 从弹幕池中移除弹幕
   * @param ids 要移除的弹幕id
   * */
  remove(dan: DanmakuItem[]) {
    this.player.emit("danmaku:remove", dan);
  }

  /** 清空弹幕池 */
  clear() {
    this.player.emit("danmaku:clear");
  }

  /** 切换弹幕显示 */
  toggle(flag?: boolean) {
    if (flag) {
      this._status = true;
      this.player.emit("danmaku:on");
    } else if (flag != null) {
      this._status = false;
      this.player.emit("danmaku:off");
    } else {
      this.toggle(!this._status);
    }
  }

  // 弹幕屏蔽

  /**
   * 弹幕类型屏蔽
   * @param type 类型
   * @param flag 设置是否屏蔽
   */
  filterType(type: string, flag: boolean) {
    this.player.emit("danmaku:filter", type, flag);
  }
}
