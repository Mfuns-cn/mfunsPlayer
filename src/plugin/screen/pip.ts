import Player from "@/player";
import { BasePlugin } from "@/plugin";

declare module "@core" {
  interface Player {
    /** 是否为画中画模式 */
    isPip?: boolean;
    /** 进入画中画模式 */
    enterPip?: () => void;
    /** 退出画中画模式 */
    exitPip?: () => void;
  }
}

export default class Pip extends BasePlugin {
  static pluginName = "pip";

  constructor(player: Player) {
    super(player);

    // --- 绑定属性 --- //
    this.player.define("isPip", {
      get: () => this.status,
    });
    this.player.define("enterPip", () => this.enter());
    this.player.define("exitPip", () => this.exit());

    // --- 绑定事件 --- //
    this.player.on("enterpictureinpicture", () => {
      this.player.$el.classList.add("is-pip");
      this.player.emit("enterpictureinpicture");
    });
    this.player.on("leavepictureinpicture", () => {
      this.player.$el.classList.remove("is-pip");
      this.player.emit("leavepictureinpicture");
    });
    // 进入画中画时，退出全屏模式
    this.player.on("enterpictureinpicture", () => {
      this.player.exitFullscreen?.();
    });
    // 进入全屏时，退出画中画模式
    this.player.on("fullscreenEnter", () => {
      this.exit();
    });
  }

  enter() {
    if (this.status) return;
    this.player.$video.requestPictureInPicture();
  }

  exit() {
    if (!this.status) return;
    document.exitPictureInPicture();
  }

  get status(): boolean {
    return !!(document.pictureInPictureElement == this.player.$video);
  }
}
