import { classPrefix } from "@/config";
import Player from "@/player";
import { createElement } from "@/utils";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

export default class VideoTitle extends ControlsPlugin {
  static pluginName = "videoTitle";
  name = "title";

  constructor(player: Player) {
    super(player, createElement("div", { class: `${classPrefix}-videotitle` }));
  }

  init() {
    this.player.on("videoChange", (info) => {
      console.log(info.title);
      this.$el.innerText = info.title || "";
    });
  }
}
