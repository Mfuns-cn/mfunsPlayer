import Player from "@/player";
import { LoadInfo, MediaController, MediaLoader, PlayerHookMap } from "@/types";

export default class LoaderManager {
  protected list = new Map<string, MediaLoader>();
  protected player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  /** 注册加载器 */
  register(name: string, loader: MediaLoader) {
    this.list.set(name, loader);
  }

  /** 移除加载器 */
  unregister<T extends keyof PlayerHookMap>(name: T) {
    this.list.delete(name);
  }

  /** 创建媒体控制实例 */
  create(info: LoadInfo, video: HTMLVideoElement) {
    for (const [name, loader] of this.list) {
      if (loader.check(info)) return loader.create(info, video);
    }
    return this.createDefault(info, video);
  }

  /** 常规方式创建实例 */
  createDefault(info: LoadInfo, video: HTMLVideoElement): MediaController {
    const { type, url, live, play, time } = info;
    const controller: MediaController = {
      type: type || "",
      url: url,
      live: live || false,
      mediaElement: video,
      destroy() {
        this.mediaElement.src = "";
      },
    };
    const t = time === true ? this.player.currentTime : time;
    video.src = url;
    video.addEventListener(
      "loadeddata",
      () => {
        if (t) {
          this.player.seek(t);
        }
        if (play) {
          this.player.play();
        }
      },
      { once: true }
    );
    return controller;
  }
}
