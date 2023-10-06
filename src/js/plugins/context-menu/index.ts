/* eslint-disable @typescript-eslint/no-unused-vars */
import Player from "@/player";
import { EmptyObject, PlayerPlugin } from "@/types";
import ContextMenu from "./ContextMenu";

const name = "contextMenu";

export type PluginContextMenu = PlayerPlugin<typeof name, EmptyObject, ContextMenu>;

/** 右键菜单 */
const pluginContextMenu = (): PluginContextMenu => {
  let contextMenu: ContextMenu;
  return {
    name,
    create: (player, options) => {
      contextMenu = new ContextMenu(player);
      return contextMenu;
    },
  };
};

export default pluginContextMenu;
