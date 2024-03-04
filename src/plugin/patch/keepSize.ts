import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { LoadInfo, PlayerOptions } from "@/types";

export default class KeepSize extends BasePlugin {
  static pluginName = "keepSize";
  constructor(player: Player) {
    super(player);
  }
  ready() {}
}
