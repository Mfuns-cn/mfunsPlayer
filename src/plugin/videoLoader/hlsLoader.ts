import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { LoadInfo, MediaController, PlayerOptions } from "@/types";
import type Hls from "hls.js";

declare module "@core" {
  interface PlayerExternals {
    hlsjs: () => Promise<typeof Hls>;
  }
}
declare global {
  interface Window {
    Hls?: typeof Hls;
  }
}

export interface HlsMediaController extends MediaController {
  kernel: Hls | null;
}

export default class HlsLoader extends BasePlugin {
  static pluginName = "hlsLoader";
  private Hls?: typeof Hls;
  private _getHlsjs?: () => Promise<typeof Hls>;
  private _supported?: boolean;
  constructor(player: Player) {
    super(player);
  }
  apply(player: Player, options: PlayerOptions): void {
    this._getHlsjs = options.externals?.hlsjs;
    this.player.loader.register("hls", this);
  }
  check(info: LoadInfo) {
    return info.type == "hls" || info.type == "m3u8";
  }
  create(info: LoadInfo, video: HTMLVideoElement): HlsMediaController {
    const { type, url, live, play, time } = info;
    const controller: HlsMediaController = {
      kernel: null,
      type: type || "",
      url: url,
      live: live || false,
      mediaElement: video,
      destroy() {
        this.kernel?.destroy();
        this.kernel = null;
      },
    };
    this.initHls().then(() => {
      const hlsPlayer = new this.Hls!();
      controller.kernel = hlsPlayer;
      const t = time === true ? this.player.currentTime : time;
      hlsPlayer.attachMedia(video);
      hlsPlayer.on(this.Hls!.Events.MEDIA_ATTACHED, () => {
        hlsPlayer.loadSource(url);
      });
      this.player.once("loadedmetadata", () => {
        if (t) {
          this.player.seek(t);
        }
        if (play) {
          this.player.play();
        }
      });
      return true;
    });
    return controller;
  }

  /** 初始化hls.js */
  async initHls() {
    if (this._supported == true) {
      return;
    } else if (this._supported == false) {
      throw new Error("播放器不支持hls加载");
    } else {
      this.Hls ??= window.Hls;
      if (!this.Hls) {
        if (!this._getHlsjs) {
          this.throw(new Error("hls.js初始化失败: 播放器未引入hls.js"));
        } else {
          this.Hls =
            (await this._getHlsjs().catch((e) => {
              this.throw(new Error(`hls.js初始化失败: ${e}`));
            })) || void 0;
          this._supported = this.Hls?.isSupported() || false;
          if (this._supported == false) throw new Error("播放器不支持hls加载");
        }
      }
    }
  }
}
