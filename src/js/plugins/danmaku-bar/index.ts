import { EmptyObject, PlayerPlugin } from "@/types";
import DanmakuBar from "./DanmakuBar";

const name = "danmakuBar";

export type PluginDanmakuBar = PlayerPlugin<typeof name, EmptyObject, DanmakuBar>;

/** 弹幕列表插件 */
const pluginDanmakuBar = (): PluginDanmakuBar => {
  let danmakuBar: DanmakuBar;
  return {
    name,
    create: (player, options) => {
      danmakuBar = new DanmakuBar(player, options);
      return danmakuBar;
    },
  };
};

export default pluginDanmakuBar;
