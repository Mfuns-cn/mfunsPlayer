import Player from "@/player";
import { getFullscreenElement } from "@/utils";

declare module "@/types" {
  interface PluginExports {
    fullscreen?: Fullscreen;
  }
  interface PlayerEventMap {
    /** 进入全屏模式 */
    "fullscreen:enter": () => void;
    /** 退出全屏模式 */
    "fullscreen:exit": () => void;
  }
}

export default class Fullscreen {
  static pluginName = "fullscreen";

  player: Player;

  $el: HTMLElement;

  constructor(player: Player) {
    this.player = player;
    this.$el = this.player.$main;

    const fullScreenChangeHandler = () => {
      if (this.status) {
        this.player.$el.classList.add("state-fullscreen");
        this.player.emit("fullscreen:enter");
      } else {
        this.player.$el.classList.remove("state-fullscreen");
        this.player.emit("fullscreen:exit");
      }
    };
    this.$el.addEventListener("fullscreenchange", fullScreenChangeHandler);
    this.$el.addEventListener("webkitfullscreenchange", fullScreenChangeHandler);
    this.$el.addEventListener("mozfullscreenchange", fullScreenChangeHandler);
    this.$el.addEventListener("msfullscreenchange", fullScreenChangeHandler);
  }

  /** 进入全屏模式 */
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

  /** 退出全屏模式 */
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

  /** 是否处于全屏模式 */
  get status(): boolean {
    return !!(getFullscreenElement() == this.$el);
  }
}
