import Player from "@/index";
import { PlayerOptions, PlayerPlugin } from "@/types";
import pluginHotkey from "@/plugins/hotkey";
import pluginContextMenu from "@/plugins/context-menu";
import pluginDanmakuList from "../plugins/danmaku-list";
import pluginDanmakuBar from "@/plugins/danmaku-bar";
import { normalButtonList } from "@/plugins/button";

type ArrayElementTypes<T> = T extends (infer U)[] ? U : never;

/** 内置插件 */
const initPlugins = () => [
  ...normalButtonList(),
  pluginHotkey(),
  pluginContextMenu(),
  pluginDanmakuBar(),
  pluginDanmakuList(),
];

/** MfunsPlayer 标准版播放器
 * 插件功能：快捷键、右键菜单、弹幕栏、弹幕列表
 */
export default class MfunsPlayer<T extends PlayerPlugin = PlayerPlugin> extends Player<
  T | ArrayElementTypes<ReturnType<typeof initPlugins>>
> {
  constructor(config: PlayerOptions<T>, plugins: T[] = []) {
    super(config, [...initPlugins(), ...plugins]);
  }
}
