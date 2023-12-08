import FlvJs from "@lib/types/flv";
import HlsJs from "@lib/types/hls";
import DashJs from "@lib/types/dash";
import Player from "@/player";
import Video from "@/Video";

type VideoSource = { type?: string; url: string };

declare global {
  let flvjs: typeof FlvJs | undefined;
  let Hls: typeof HlsJs | undefined;
  let dashjs: typeof DashJs | undefined;
}

interface CurrentSource extends VideoSource {
  destroy: () => void;
}

export default class VideoLoader {
  video: Video;
  current: CurrentSource | null = null;
  list: Map<string, (player: Player, url: string) => void> = new Map();
  constructor(video: Video) {
    this.video = video;
  }
  /** 加载视频源 */
  public load(src: VideoSource) {
    this.destroyCurrent();
    switch (src.type) {
      case "flv":
        this.loadFlv(src);
        break;
      case "dash":
        this.loadDash(src);
        break;
      case "hls":
      case "m3u8":
        this.loadHls(src);
        break;
      default:
        this.loadNormal(src);
    }
  }
  /** 一般加载方式 */
  public loadNormal(src: VideoSource) {
    this.video.$video.src = src.url;
    this.current = {
      ...src,
      destroy: () => {
        this.video.$video.src = "";
      },
    };
  }
  /** 加载flv */
  public loadFlv(src: VideoSource) {
    if (flvjs?.isSupported()) {
      const flvPlayer = flvjs.createPlayer({
        type: src.type || "flv",
        url: src.url,
        cors: true,
      });
      flvPlayer.attachMediaElement(this.video.$video);
      flvPlayer.load();
      this.current = {
        ...src,
        destroy: () => {
          flvPlayer.destroy();
        },
      };
    } else {
      console.error("不支持flv加载");
    }
  }
  /** 加载hls */
  public loadHls(src: VideoSource) {
    if (Hls?.isSupported()) {
      const hls = new Hls();
      hls.attachMedia(this.video.$video);
      hls.loadSource(src.url);
      this.current = {
        ...src,
        destroy: () => {
          hls.destroy();
        },
      };
    } else {
      console.error("不支持hls加载");
    }
  }
  /** 加载dash */
  public loadDash(src: VideoSource) {
    if (dashjs) {
      // eslint-disable-next-line new-cap
      const dashPlayer = dashjs.MediaPlayer().create();
      dashPlayer.initialize(this.video.$video, src.url, true);
      this.current = {
        ...src,
        destroy: () => {
          dashPlayer.destroy();
        },
      };
    } else {
      console.error("不支持dash加载");
    }
  }
  /** 销毁当前播放 */
  private destroyCurrent() {
    this.current?.destroy();
    this.current = null;
  }
}
