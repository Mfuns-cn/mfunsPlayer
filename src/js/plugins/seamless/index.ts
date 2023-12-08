import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { LoadInfo, PlayerOptions } from "@/types";

declare module "@/types" {
  interface PluginExports {
    seamless?: Seamless;
  }
}

export default class Seamless extends BasePlugin {
  static pluginName = "seamless";
  constructor(player: Player, options: PlayerOptions) {
    super(player);
  }
  /** 无缝加载视频 */
  load(info: LoadInfo) {
    this.player.emit("video_load", info);
    const { url, type, play, time } = info;
    const oldVideo = this.player.$video;
    const video = oldVideo.cloneNode() as HTMLVideoElement;
    video.src = url;
    video.addEventListener(
      "loadedmetadata",
      () => {
        this.player.$content.insertBefore(video, oldVideo);
        video.currentTime = this.player.time;
        !this.player.paused && video.play();
        video.addEventListener(
          "canplay",
          () => {
            this.player.emit("video_load", info);
            this.player.isPip && video.requestPictureInPicture();
            this.player.bindVideo(video);
            oldVideo.remove();
            play == true && this.player.paused && this.player.play();
            play == false && !this.player.paused && this.player.pause();
            time != null && this.player.seek(time);
          },
          { once: true }
        );
      },
      { once: true }
    );
  }
  pluginsReady() {
    this.player.hook.register("switchVideo", (ctx) => {
      this.load(ctx);
      return false;
    });
  }
}
