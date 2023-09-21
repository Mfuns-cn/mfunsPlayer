/* eslint-disable @typescript-eslint/no-unused-vars */
import { EmptyObject, PlayerPlugin } from "@/types"
import DanmakuList from "./DanmakuList"

const id = "danmakuList"

const plugin = (): PlayerPlugin<typeof id, EmptyObject, { el: HTMLElement }> => {
  let danmakuList: DanmakuList
  return {
    id,
    create: (player, options) => {
      danmakuList = new DanmakuList(player)
      return {
        el: danmakuList.el,
      }
    },
    init: (player, options) => {
      danmakuList.init()
    },
    destroy: (player) => {},
  }
}

export default plugin
