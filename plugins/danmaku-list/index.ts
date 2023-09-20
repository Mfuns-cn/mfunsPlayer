/* eslint-disable @typescript-eslint/no-unused-vars */
import { PlayerPlugin } from "@/types"
import DanmakuList from "./DanmakuList"

const plugin: PlayerPlugin = () => {
  let danmakuList: DanmakuList
  return {
    id: "danmakuList",
    create: (player) => {
      danmakuList = new DanmakuList(player)
      return {
        el: danmakuList.el,
      }
    },
    init: (player) => {
      danmakuList.init()
    },
    destroy: (player) => {},
  }
}

export default plugin
