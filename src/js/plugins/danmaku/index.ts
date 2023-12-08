import { DanmakuItem, DanmakuSource } from "./types";
import { PlayerOptions, DanmakuApiOptions, PluginConstructor } from "@/types";
import Player from "@/player";
import DanmakuEngine from "./DanmakuEngine";
import { classPrefix } from "@/config";
import DanmakuParser from "./DanmakuParser";
import DanmakuOperate from "./DanmakuOperate";
import { BasePlugin } from "@/plugin";
import { createElement } from "@/utils";

declare module "@/types" {
  interface PlayerPropertyMap {
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
  interface PluginExports {
    danmaku?: Danmaku;
  }
}

/** 弹幕模块 */
export default class Danmaku extends BasePlugin {
  static readonly pluginName = "danmaku";

  /** 弹幕引擎，用于弹幕绘制 */
  engine: DanmakuEngine;

  /** 弹幕格式转换 */
  parser: DanmakuParser;

  /** 弹幕api */
  api?: DanmakuApiOptions;

  /** 弹幕操作 */
  operate: DanmakuOperate;

  /** 最新一条弹幕的id */
  lastDanmakuId: string | number = 0;

  /** 允许获取实时新增弹幕 */
  allowNewDanmaku: boolean;

  /** 弹幕池 */
  list: DanmakuItem[] = [];

  $el: HTMLElement;
  $rowContainer: HTMLDivElement;

  handler: Record<string, (dan: DanmakuItem[]) => void> = {};

  constructor(player: Player, options: PlayerOptions) {
    super(player);
    this.parser = new DanmakuParser({ defaultParser: "mfuns" });
    this.operate = new DanmakuOperate(this.player);
    this.api = options.danmaku?.api;
    this.allowNewDanmaku = false;

    this.$el = createElement("div", { class: `${classPrefix}-danmaku-wrap` });
    this.$rowContainer = this.$el.appendChild(
      createElement("div", { class: `${classPrefix}-row-danmaku-container` })
    );

    this.player.$content.after(this.$el);

    this.engine = new DanmakuEngine(this.$rowContainer, {
      fontScale: 1,
      fontFamily: "SimHei",
      fontWeight: "bold",
      speed: 1,
      opacity: 1,
      classPrefix: classPrefix,
      /** 颜色限制 */
      colorFilter: false,
      getTime: () => this.player.time,
    });
    this.player.on("play", () => {
      this.engine.play();
    });
    this.player.on("pause", () => {
      this.engine.pause();
    });
    this.player.on("seeking", () => {
      this.engine.pause();
      this.engine.seek();
    });
    this.player.on("seeked", () => {
      this.player.paused || this.engine.play();
    });
    this.player.on("video_change", (info) => {
      const { danmakuId, danmakuAddition } = info;
      console.log(danmakuAddition);
      this.reload(danmakuId, danmakuAddition);
    });
  }

  /** 加载附加弹幕 */
  loadAddition({ url, type, data }: DanmakuSource) {
    fetch(url)
      .then((response) => {
        if (/-xml$/.test(type)) {
          return response.text();
        } else {
          return response.json();
        }
      })
      .then((res) => {
        const danmakuData = data ? data(res) : res;
        const dan = this.parser.parse({ data: danmakuData, type });
        if (dan) {
          dan && this.add(dan);
          this.player.emit("danmaku:load_addition_end", url, dan);
        } else {
          throw "无法正确解析弹幕格式";
        }
      })
      .catch((err) => {
        this.player.emit("danmaku:load_addition_end", url, [], err);
        console.error(err);
      });
  }

  /** 加载弹幕 */
  private load(id: string | number) {
    const api = this.api;
    api
      ?.get({ id })
      .then((data) => {
        const dan = this.parser.parse({ data, type: api.type });
        if (dan) {
          this.add(dan);
          this.lastDanmakuId = dan[dan.length - 1].id;
          this.player.emit("danmaku:load_end", dan);
        } else {
          throw "无法正确解析弹幕格式";
        }
      })
      .catch((err) => {
        this.player.emit("danmaku:load_end", [], err);
      });
  }

  /** 加载实时新增弹幕 */
  loadNew(id: string | number) {
    const offset = this.lastDanmakuId;
    this.player.emit("danmaku:load_new_start", offset);
    const api = this.api;
    api
      ?.get({ id, offset: this.lastDanmakuId })
      .then((data) => {
        const dan = this.parser.parse({ data, type: api.type });
        if (dan) {
          this.add(dan);
          this.lastDanmakuId = dan[dan.length - 1].id;
          this.player.emit("danmaku:load_new_end", offset, dan);
        } else {
          throw "无法正确解析弹幕格式";
        }
      })
      .catch((err) => {
        this.player.emit("danmaku:load_new_end", offset, [], err);
      });
  }

  /** 重载弹幕 */
  public async reload(id?: string | number, addition?: DanmakuSource[]) {
    this.player.emit("danmaku:load_start");
    // 清空弹幕池
    this.engine.reset();
    id && this.load(id);
    addition?.forEach((ad) => {
      this.loadAddition(ad);
    });
  }

  /**
   * 添加弹幕到弹幕池
   * @param dan 要添加的弹幕
   * */
  add(dan: DanmakuItem[]) {
    const basicDanmaku: DanmakuItem[] = [];
    const advancedDanmaku: Record<number, DanmakuItem[]> = {};
    dan.forEach((dm) => {
      if (dm.mode < 7) {
        basicDanmaku.push(dm);
      } else {
        if (advancedDanmaku[dm.mode]) {
          advancedDanmaku[dm.mode].push(dm);
        } else {
          advancedDanmaku[dm.mode] = [dm];
        }
      }
    });
    basicDanmaku.length && this.engine.add(basicDanmaku);
    for (const mode in advancedDanmaku) {
      this.handler[mode]?.(advancedDanmaku[mode]);
    }
  }

  /**
   * 根据id从弹幕池中移除弹幕
   * @param ids 要移除的弹幕id
   * */
  remove(ids: (string | number)[]) {
    this.engine.remove(ids);
  }

  /** 清空弹幕池 */
  clear() {
    this.engine.clear();
  }

  /** 显示弹幕 */
  show() {
    this.engine.show();
    this.player.emit("danmaku:on");
  }

  /** 隐藏弹幕 */
  hide() {
    this.engine.hide();
    this.player.emit("danmaku:off");
  }

  /** 切换弹幕显示 */
  toggle() {
    if (this.engine.hidden) {
      this.show();
    } else {
      this.hide();
    }
  }

  // 弹幕屏蔽

  /**
   * 弹幕类型屏蔽
   * @param type 类型
   * @param flag 设置是否屏蔽
   */
  filter(type: string, flag: boolean) {
    switch (type) {
      case "roll":
        this.engine.setTrackFilter("roll", flag);
        this.engine.setTrackFilter("reverse", flag);
        break;
      case "top":
      case "bottom":
        this.engine.setTrackFilter(type, flag);
        break;
      case "color":
        this.engine.setColorFilter(flag);
        break;
    }
    this.player.emit("danmaku:filter", type, flag);
  }

  // 弹幕播放属性设置

  /** 设置弹幕不透明度 */
  setOpacity(value: number) {
    this.engine.opacity = value;
    this.player.emitChange("danmaku.opacity", value);
  }
  /** 设置弹幕速度 */
  setSpeed(value: number) {
    this.engine.speed = value;
    this.player.emitChange("danmaku.speed", value);
  }
  /** 设置弹幕区域 */
  setArea(value: number) {
    this.engine.limitArea = value || Infinity;
    this.player.emitChange("danmaku.area", value);
  }
  /** 设置弹幕大小 */
  setScale(value: number) {
    this.engine.fontScale = value;
    this.player.emitChange("danmaku.scale", value);
  }
  /** 设置弹幕字体 */
  setFont(value: string) {
    this.engine.fontFamily = value;
    this.player.emitChange("danmaku.font", value);
  }
  /** 设置弹幕加粗 */
  setBold(value: boolean) {
    this.engine.fontWeight = value ? "bold" : "";
    this.player.emitChange("danmaku.bold", value);
  }
}
