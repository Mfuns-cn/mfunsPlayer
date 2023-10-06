import { EmptyObject, PlayerPlugin } from "@/types";
import DanmakuList from "./DanmakuList";
import "./style.scss";

const name = "danmakuList";

export type PluginDanmakuList = PlayerPlugin<
  typeof name,
  {
    danmakuList: {
      autoScroll: boolean;
    };
  },
  DanmakuList
>;

/** 弹幕列表插件 */
const pluginDanmakuList = (): PluginDanmakuList => {
  let danmakuList: DanmakuList;
  return {
    name,
    create: (player) => {
      danmakuList = new DanmakuList(player);
      return danmakuList;
    },
    init: () => {
      danmakuList.init();
    },
  };
};

export default pluginDanmakuList;
