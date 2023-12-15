import Player from "@/player";
import { BasePlugin } from "@/plugin";

declare module "@/types" {
  interface PluginExports {
    pip?: Pip;
  }
  interface PlayerEventMap {
    /** 进入画中画模式 */
    "pip:enter": () => void;
    /** 退出画中画模式 */
    "pip:exit": () => void;
  }
}

export default class Pip extends BasePlugin {
  static pluginName = "pip";

  constructor(player: Player) {
    super(player);

    this.player.on("enterpictureinpicture", () => {
      this.player.$el.classList.add("state-pip");
      this.player.emit("pip:enter");
    });
    this.player.on("leavepictureinpicture", () => {
      this.player.$el.classList.remove("state-pip");
      this.player.emit("pip:exit");
    });
    // 进入画中画时，退出全屏模式
    this.player.on("pip:enter", () => {
      this.plugin.fullscreen?.exit();
    });
    // 进入全屏时，退出画中画模式
    this.player.on("fullscreen:enter", () => {
      this.exit();
    });
  }

  /** 进入画中画模式 */
  enter() {
    if (this.status) return;
    this.player.$video.requestPictureInPicture();
  }

  /** 退出画中画模式 */
  exit() {
    if (!this.status) return;
    document.exitPictureInPicture();
  }

  /** 是否已进入画中画模式 */
  get status(): boolean {
    return !!(document.pictureInPictureElement == this.player.$video);
  }
}
