import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { getFullscreenElement } from "@/utils";

declare module "@core" {
  interface Player {
    /** 是否为全屏模式 */
    isFullscreen?: boolean;
    /** 进入全屏模式 */
    enterFullscreen?: () => void;
    /** 退出全屏模式 */
    exitFullscreen?: () => void;
  }
}
declare module "@core" {
  interface PlayerEventMap {
    /** 进入全屏模式 */
    fullscreenEnter: () => void;
    /** 退出全屏模式 */
    fullscreenExit: () => void;
  }
}

export default class Fullscreen extends BasePlugin {
  static pluginName = "fullscreen";

  $el: HTMLElement;

  constructor(player: Player) {
    super(player);
    this.$el = this.player.$main;

    // --- 绑定属性 --- //
    this.player.define("isFullscreen", {
      get: () => this.status,
    });
    this.player.define("enterFullscreen", () => this.enter());
    this.player.define("exitFullscreen", () => this.exit());

    // --- 绑定事件 --- //
    const fullScreenChangeHandler = () => {
      if (this.status) {
        this.player.$el.classList.add("is-fullscreen");
        this.player.emit("fullscreenEnter");
      } else {
        this.player.$el.classList.remove("is-fullscreen");
        this.player.emit("fullscreenExit");
      }
    };
    this.$el.addEventListener("fullscreenchange", fullScreenChangeHandler);
    this.$el.addEventListener("webkitfullscreenchange", fullScreenChangeHandler);
    this.$el.addEventListener("mozfullscreenchange", fullScreenChangeHandler);
    this.$el.addEventListener("msfullscreenchange", fullScreenChangeHandler);
  }

  enter() {
    if (this.status) return;
    const el: any = this.$el;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.webkitEnterFullscreen) {
      // Safari for iOS
      el.webkitEnterFullscreen();
    } else if (el.webkitEnterFullScreen) {
      el.webkitEnterFullScreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
  }

  exit() {
    if (!this.status) return;
    const doc: any = document;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.webkitExitFullScreen) {
      doc.webkitExitFullScreen();
    } else if ((this.$el as any).msExitFullscreen!) {
      (this.$el as any).msExitFullscreen();
    }
  }

  get status(): boolean {
    return !!(getFullscreenElement() == this.$el);
  }
}
