import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { LoadInfo, MediaController, MediaLoader, PlayerOptions } from "@/types";
import type FlvJs from "flv.js";

declare module "@core" {
  interface PlayerExternals {
    flvjs: () => Promise<typeof FlvJs>;
  }
}
declare global {
  interface Window {
    flvjs?: typeof FlvJs;
  }
}

export interface FlvMediaController extends MediaController {
  kernel: FlvJs.Player | null;
}

export default class FlvLoader extends BasePlugin implements MediaLoader {
  static pluginName = "flvLoader";
  private flvjs?: typeof FlvJs;
  private _getFlvjs?: () => Promise<typeof FlvJs>;
  private _supported?: boolean;
  constructor(player: Player) {
    super(player);
  }
  apply(player: Player, options: PlayerOptions): void {
    this._getFlvjs = options.externals?.flvjs;
    this.player.loader.register("flv", this);
  }
  check(info: LoadInfo) {
    return info.type == "flv";
  }
  create(info: LoadInfo, video: HTMLVideoElement): FlvMediaController {
    const { type, url, live, play, time } = info;
    const controller: FlvMediaController = {
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
    this.initFlv().then(() => {
      const flvPlayer = this.flvjs!.createPlayer({
        type: type || "flv",
        url: url,
        cors: true,
        isLive: live,
      });
      controller.kernel = flvPlayer;
      const t = time === true ? this.player.currentTime : time === false ? 0 : time;
      flvPlayer.attachMediaElement(video);
      flvPlayer.load();
      t && (flvPlayer.currentTime = t);
      play && flvPlayer.play();
    });
    return controller;
  }
  /** 初始化flvjs */
  async initFlv() {
    if (this._supported == true) {
      return;
    } else if (this._supported == false) {
      throw new Error("播放器不支持flv加载");
    } else {
      this.flvjs ??= window.flvjs;
      if (!this.flvjs) {
        if (!this._getFlvjs) {
          throw new Error("flv.js初始化失败: 播放器未引入flv.js");
        } else {
          this.flvjs =
            (await this._getFlvjs().catch((e) => {
              throw new Error(`flv.js初始化失败: ${e}`);
            })) || void 0;
          this._supported = this.flvjs?.isSupported() || false;
          if (this._supported == false) throw new Error("播放器不支持flv加载");
        }
      }
    }
  }
}
