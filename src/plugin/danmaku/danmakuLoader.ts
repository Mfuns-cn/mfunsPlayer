import { DanmakuItem, DanmakuParser, DanmakuSource } from "./types";
import { PlayerOptions, VideoInfo } from "@/types";
import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { randomId } from "@/utils/randomId";

declare module "@core" {
  interface PlayerPlugins {
    danmakuLoader?: DanmakuLoader;
  }
  interface PlayerOptions {
    danmakuParser?: Record<string, DanmakuParser>;
  }
}

/** 弹幕加载器
 *
 * 负责弹幕加载及格式转换
 *
 * 前置插件: `danmaku`
 */
export default class DanmakuLoader extends BasePlugin {
  static readonly pluginName = "danmakuLoader";

  /** 默认弹幕类型 */
  public type: string = "";

  public parser: Record<string, DanmakuParser> = defaultParsers;

  get danmaku() {
    return this.player.danmaku;
  }

  init() {
    this.player.on("videoChange", (info) => {
      this.reload(info);
    });
  }

  apply(player: Player, options: PlayerOptions): void {
    this.type = options.danmaku?.type || "";
    this.parser = Object.assign(this.parser, options.danmakuParser);
  }

  /** 从响应中获取数据 */
  protected async getResponseData<T extends DanmakuParser["type"]>(
    response: Response,
    type: T
  ): Promise<Parameters<DanmakuParser["parse"]>[0]> {
    if (type == "json") {
      return await response.json();
    } else if (type == "xml") {
      return new DOMParser().parseFromString(await response.text(), "text/xml");
    } else {
      return await response.text();
    }
  }

  parse(raw: any, type: string) {
    if (!type) {
      return raw as DanmakuItem[];
    } else {
      const parser = this.parser[type];
      if (!parser) throw "未知弹幕格式";
      try {
        return parser.parse(raw);
      } catch {
        throw "无法正确解析弹幕格式";
      }
    }
  }

  /** 加载附加弹幕文件 */
  loadSource({ url, type }: DanmakuSource) {
    fetch(url)
      .then((data) => this.getResponseData(data, this.parser[type].type))
      .then((data) => this.parse(data, type))
      .then((dan) => {
        dan && this.add(dan);
        this.player.emit("danmaku:loaded", dan, { url });
      })
      .catch((err) => {
        this.player.emit("danmaku:loadFailed", err, { url });
        console.error(err);
      });
  }

  /** 加载弹幕 */
  private load(info: VideoInfo) {
    this.danmaku!.invoke.get?.(info)
      .then((data) => this.parse(data as any, this.type))
      .then((dan) => {
        dan && this.add(dan);
        this.player.emit("danmaku:loaded", dan, info);
      })
      .catch((err) => {
        this.player.emit("danmaku:loadFailed", err, info);
      });
  }

  private add(dan: DanmakuItem[]) {
    this.danmaku!.add(dan);
  }

  /** 重载弹幕 */
  public async reload(info: VideoInfo) {
    // 清空弹幕池
    this.danmaku!.clear();
    this.player.emit("danmaku:loading");
    this.load(info);
    info.danmaku?.forEach((source) => {
      this.loadSource(source);
    });
  }
}

const defaultParsers: Record<string, DanmakuParser> = {
  "bilibili-xml": {
    type: "xml",
    parse: (xmlDoc: XMLDocument) => {
      const dan: [string, any][] = [];
      // 获取xml文档的所有子节点
      const nodeList = xmlDoc.childNodes;
      const generate = (nodeList: any) => {
        for (let i = 0; i < nodeList.length; i++) {
          const currentNode = nodeList[i];
          if (currentNode?.attributes?.length && i > 0) {
            const m = currentNode.attributes[0].nodeValue.split(",");
            const c = currentNode.innerHTML;
            dan.push([c, m]);
          } else if (currentNode.childNodes.length > 0) {
            generate(currentNode.childNodes);
          }
        }
      };
      generate(nodeList);
      return dan.map(([c, m]) => ({
        time: +m[0],
        mode: +m[1],
        color: +m[3],
        user: m[6],
        content: c,
        size: +m[2] ?? 25,
        date: +m[4] ?? 0,
        id: +m[7],
      }));
    },
  },
  dplayer: {
    type: "json",
    parse: (data: [number, number, number, number | string, string, number, number][]) =>
      data.map((item, i) => ({
        time: item[0],
        mode: [1, 5, 4, 6][item[1]],
        color: item[2],
        user: item[3],
        content: item[4],
        size: 25,
        date: 0,
        id: randomId(),
      })),
  },
  mfuns: {
    type: "json",
    parse: (data: [number, number, number, string, string, number, number, number][]) =>
      data.map((item) => ({
        time: item[0],
        mode: item[1],
        color: item[2],
        user: item[3],
        content: item[4],
        size: item[5],
        date: item[6] > 1 ? item[6] : 0,
        id: item[7],
      })),
  },
};
