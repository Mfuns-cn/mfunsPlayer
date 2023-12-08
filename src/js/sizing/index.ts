import Player from "@/player";
import { PlayerOptions } from "@/types";
import Fullscreen from "./fullscreen";
import Pip from "./pip";
import Webfull from "./webfull";

export default class Sizing {
  player: Player;

  public fullscreen: Fullscreen;
  public webfull: Webfull;
  public pip: Pip;

  constructor(player: Player, options: PlayerOptions) {
    this.player = player;
    this.webfull = new Webfull(this.player);
    this.fullscreen = new Fullscreen(this.player);
    this.pip = new Pip(this.player);
    this.init();
  }
  init() {
    // 进入网页全屏时，退出全屏模式
    this.player.on("webfull_enter", () => {
      this.player.exitFullscreen();
    });
    // 进入全屏时，退出网页全屏模式
    this.player.on("fullscreen_enter", () => {
      this.player.exitWebfull();
    });

    // video-wrap发生尺寸变化时，触发resize事件
    const observer = new ResizeObserver(([item]) => {
      const { width, height } = item.contentRect;
      this.player.emit("resize", [width, height]);
    });

    observer.observe(this.player.$content);
  }
}
