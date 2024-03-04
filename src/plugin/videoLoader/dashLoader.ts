/* eslint-disable new-cap */
import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { LoadInfo, MediaController, MediaLoader, PlayerOptions } from "@/types";
import type dashjs from "dashjs";

declare module "@core" {
  interface PlayerExternals {
    dashjs: () => Promise<typeof dashjs>;
  }
}
declare global {
  interface Window {
    dashjs?: typeof dashjs;
  }
}

export interface DashMediaController extends MediaController {
  kernel: dashjs.MediaPlayerClass | null;
}

export default class DashLoader extends BasePlugin implements MediaLoader {
  static pluginName = "dashLoader";
  private dashjs?: typeof dashjs;
  private _getDashjs?: () => Promise<typeof dashjs>;
  private _supported?: boolean;
  constructor(player: Player) {
    super(player);
  }
  apply(player: Player, options: PlayerOptions): void {
    this._getDashjs = options.externals?.dashjs;
    this.player.loader.register("dash", this);
  }
  check(info: LoadInfo) {
    return info.type == "dash" || info.type == "m3u8";
  }
  create(info: LoadInfo, video: HTMLVideoElement): DashMediaController {
    const { type, url, live, play, time } = info;
    const controller: DashMediaController = {
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
    this.initDash().then(() => {
      const dashPlayer = this.dashjs!.MediaPlayer().create();
      controller.kernel = dashPlayer;
      const t = time === true ? this.player.currentTime : time === false ? 0 : time;
      dashPlayer.initialize(video, url, play, t);
    });
    return controller;
  }

  /** 初始化dash.js */
  async initDash() {
    if (this._supported == true) {
      return;
    } else if (this._supported == false) {
      throw new Error("播放器不支持dash加载");
    } else {
      this.dashjs ??= window.dashjs;
      if (!this.dashjs) {
        if (!this._getDashjs) {
          throw new Error("dash.js初始化失败: 播放器未引入dash.js");
        } else {
          this.dashjs =
            (await this._getDashjs().catch((e) => {
              throw new Error(`dash.js初始化失败: ${e}`);
            })) || undefined;
          this._supported = this.dashjs?.supportsMediaSource() || false;
          if (this._supported == false) throw new Error("播放器不支持dash加载");
        }
      }
    }
  }
}
