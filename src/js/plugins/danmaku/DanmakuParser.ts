import { randomId } from "@/utils/randomId";
import { DanmakuItem } from "./types";

interface DanmakuParseItem {
  data: any;
  type: string;
  origin?: string;
}

interface DanmakuParserOptions {
  defaultParser: string;
  list?: Record<string, DanmakuParserFunction>;
}

type DanmakuParserFunction = (data: any) => DanmakuItem[];

/** 弹幕格式转换，将获取到的弹幕转换为播放器弹幕格式 */
export default class DanmakuParser {
  defaultParser: string;

  list: Record<string, DanmakuParserFunction>;

  constructor({ defaultParser }: DanmakuParserOptions) {
    this.defaultParser = defaultParser || "bilibili-xml";
    this.list = {
      dplayer: (data: [number, number, number, number | string, string, number, number][]) =>
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
      mfuns: (data: [number, number, number, string, string, number, number, number][]) =>
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
      "bilibili-xml": (data: string) => {
        const bilibiliXMLParser = (xmlData: string) => {
          const dan: [string, any[]][] = [];
          const xmlDoc = new DOMParser().parseFromString(xmlData, "text/xml");
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
        };
        return bilibiliXMLParser(data);
      },
    };
  }

  /** 将获取到的弹幕转换为播放器弹幕格式 */
  parse({ data, type }: DanmakuParseItem) {
    const parser = this.list[type];
    if (!parser) throw "未知弹幕格式";
    return parser(data);
  }
}
