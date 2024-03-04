import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { LoadInfo, PlayerOptions } from "@/types";

export default class Seamless extends BasePlugin {
  static pluginName = "seamless";
  constructor(player: Player) {
    super(player);
  }
  /** 无缝加载视频 */
  load(info: LoadInfo) {
    this.player.emit("videoLoad", info);
    const { url, type, play, time } = info;
    const oldVideo = this.player.$video;
    const video = oldVideo.cloneNode() as HTMLVideoElement;
    const controller = this.player.loader.create(info, video);
    video.addEventListener(
      "loadedmetadata",
      () => {
        this.player.$content.insertBefore(video, oldVideo);
        const t = time === true ? this.player.currentTime : time || 0;
        video.currentTime = t;
        !this.player.paused && video.play();
        video.addEventListener(
          "canplay",
          () => {
            this.player.emit("videoLoad", info);
            this.player.isPip && video.requestPictureInPicture();
            this.player.attachMediaController(controller);
            oldVideo.remove();
            play == true && this.player.paused && this.player.play();
            play == false && !this.player.paused && this.player.pause();
          },
          { once: true }
        );
      },
      { once: true }
    );
  }
  ready() {
    this.player.hook.register("video.load", (ctx) => {
      /** 加载视频时，只有设置为从当前播放时间加载才能自动无缝加载 */
      if (ctx.time !== true) return;
      this.load(ctx);
      this.player.emit("videoLoad", ctx);
      return false;
    });
  }
}
