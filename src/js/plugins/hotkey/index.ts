import { EmptyObject, PlayerPlugin } from "@/types";
import Hotkey from "./Hotkey";

const name = "hotkey";

export type PluginHotkey = PlayerPlugin<typeof name, EmptyObject, Hotkey>;

/** 快捷键和手势操作插件 */
const pluginHotkey = (): PluginHotkey => {
  let hotkey: Hotkey;
  return {
    name,
    create: (player, options) => {
      hotkey = new Hotkey(player, options);
      return hotkey;
    },
  };
};

export default pluginHotkey;
