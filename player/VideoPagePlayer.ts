import Player from "@/index";
import { PlayerOptions, PlayerPlugin } from "@/types";
import pluginHotkey from "@/plugins/hotkey";
import pluginContextMenu from "@/plugins/context-menu";
import pluginDanmakuBar from "@/plugins/danmaku-bar";
import pluginDanmakuList from "../plugins/danmaku-list";
import { normalButtonList } from "@/plugins/button";
import pluginWide from "@/plugins/wide";
import pluginBlackBorder from "../plugins/black-border";

type ArrayElementTypes<T> = T extends (infer U)[] ? U : never;

/** 内置插件 */
const initPlugins = () => [
  ...normalButtonList(),
  pluginHotkey(),
  pluginContextMenu(),
  pluginDanmakuBar(),
  pluginDanmakuList(),
  pluginBlackBorder({ padding: "8px" }),
  pluginWide(),
];

/** MfunsPlayer 播放页版播放器
 * 插件功能：快捷键、右键菜单、弹幕栏、弹幕列表、视频黑边、宽屏模式、关灯模式
 */
export default class MfunsPlayer<T extends PlayerPlugin = PlayerPlugin> extends Player<
  T | ArrayElementTypes<ReturnType<typeof initPlugins>>
> {
  constructor(config: PlayerOptions<T>, plugins: T[] = []) {
    super(config, [...initPlugins(), ...plugins]);
  }
}
