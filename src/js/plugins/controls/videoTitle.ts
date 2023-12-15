import { classPrefix } from "@/config";
import Player from "@/player";
import { createElement } from "@/utils";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

export default class VideoTitle extends ControlsPlugin {
  static pluginName = "videoTitle";

  constructor(player: Player, options: PlayerOptions) {
    super(player, options, {
      name: "videoTitle",
      defaultOptions: {
        container: (p) => p.plugin.header?.$left,
        order: 0,
      },
      el: createElement("div", { class: `${classPrefix}-videotitle` }),
    });
  }

  created() {
    this.player.on("video_change", (info) => {
      console.log(info.title);
      this.$el.innerText = info.title || "";
    });
  }
}
