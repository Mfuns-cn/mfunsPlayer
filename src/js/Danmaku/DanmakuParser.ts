import axios from "axios"
import { DanmakuInterface } from "../types"

interface DanmakuParseItem {
  data: any
  type: string
  origin?: string
}

interface DanmakuParserOptions {
  defaultParser: string
  list: { [key: string]: DanmakuParserFunction }
}

type DanmakuParserFunction = (data: any, origin?: string) => DanmakuInterface[]

/** 弹幕格式转换，将获取到的弹幕转换为播放器弹幕格式 */
export default class DanmakuParser {
  defaultParser: string

  list: { [key: string]: DanmakuParserFunction }

  constructor({ defaultParser }: DanmakuParserOptions) {
    this.defaultParser = defaultParser || "bilibili-xml"
    this.list = {
      dplayer: (
        data: {
          data: [number, number, number, number | string, string, number, number][]
        },
        origin?: string
      ) =>
        data.data.map((item) => ({
          time: item[0],
          mode: [1, 5, 4, 6][item[1]],
          color: item[2],
          user: item[3],
          content: item[4],
          size: 25,
          timestamp: 0,
          origin,
        })),
      "mfuns-v1": (
        data: {
          data: [number, number, number, number | string, string, number, number][]
        },
        origin?: string
      ) =>
        data.data.map((item) => ({
          time: item[0],
          mode: item[1],
          color: item[2],
          user: item[3],
          content: item[4],
          size: item[5] ?? 25,
          timestamp: item[6] ?? 0,
          origin: origin ?? "unknown",
        })),
      "bilibili-xml": (data: string) => {
        const bilibiliXMLParser = (xmlData: string) => {
          const dan: any[] = []
          const xmlDoc = new DOMParser().parseFromString(xmlData, "text/xml")
          // 获取xml文档的所有子节点
          const nodeList = xmlDoc.childNodes
          const generate = (nodeList: any) => {
            for (let i = 0; i < nodeList.length; i++) {
              const currentNode = nodeList[i]
              if (currentNode?.attributes?.length && i > 0) {
                const data = currentNode.attributes[0].nodeValue.split(",")
                data.push(currentNode.innerHTML)
                dan.push(data)
              } else if (currentNode.childNodes.length > 0) {
                generate(currentNode.childNodes)
              }
            }
          }
          generate(nodeList)
          return dan.map((el) => ({
            time: +el[0],
            mode: +el[1],
            color: +el[3],
            user: el[6],
            content: el[8],
            size: +el[2] ?? 25,
            timestamp: +el[4] ?? 0,
            origin: "bili",
          }))
        }
        return bilibiliXMLParser(data)
      },
    }
  }

  /** 将获取到的弹幕转换为播放器弹幕格式 */
  parse({ data, type, origin }: DanmakuParseItem) {
    const parser = this.list[type]
    try {
      return parser(data, origin)
    } catch (err) {
      console.error(err)
    }
  }
}
