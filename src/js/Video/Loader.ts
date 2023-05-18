import FlvJs from "@lib/types/flv"
import HlsJs from "@lib/types/hls"
import DashJs from "@lib/types/dash"
import MfunsPlayer from "@/player"
import Video from "@/Video"
import { VideoSource } from "@/types"

declare global {
  let flvjs: typeof FlvJs | undefined
  let Hls: typeof HlsJs | undefined
  let dashjs: typeof DashJs | undefined
}

interface CurrentSource extends VideoSource {
  destory: () => void
}

export default class VideoLoader {
  video: Video
  current: CurrentSource | null = null
  list: Map<string, (player: MfunsPlayer, url: string) => void> = new Map()
  constructor(video: Video) {
    this.video = video
  }
  /** 加载视频源 */
  public load(src: VideoSource) {
    this.destoryCurrent()
    switch (src.type) {
      case "flv":
        this.loadFlv(src)
        break
      case "dash":
        this.loadDash(src)
        break
      case "hls":
      case "m3u8":
        this.loadHls(src)
        break
      default:
        this.loadNormal(src)
    }
  }
  /** 一般加载方式 */
  public loadNormal(src: VideoSource) {
    this.video.el.src = src.url
    this.current = {
      ...src,
      destory: () => {
        this.video.el.src = ""
      },
    }
  }
  /** 加载flv */
  public loadFlv(src: VideoSource) {
    if (flvjs?.isSupported()) {
      const flvPlayer = flvjs.createPlayer({
        type: src.type,
        url: src.url,
        cors: true,
      })
      flvPlayer.attachMediaElement(this.video.el)
      flvPlayer.load()
      this.current = {
        ...src,
        destory: () => {
          flvPlayer.destroy()
        },
      }
    } else {
      console.error("不支持flv加载")
    }
  }
  /** 加载hls */
  public loadHls(src: VideoSource) {
    if (Hls?.isSupported()) {
      const hls = new Hls()
      hls.attachMedia(this.video.el)
      hls.loadSource(src.url)
      this.current = {
        ...src,
        destory: () => {
          hls.destroy()
        },
      }
    } else {
      console.error("不支持hls加载")
    }
  }
  /** 加载dash */
  public loadDash(src: VideoSource) {
    if (dashjs) {
      // eslint-disable-next-line new-cap
      const dashPlayer = dashjs.MediaPlayer().create()
      dashPlayer.initialize(this.video.el, src.url, true)
      this.current = {
        ...src,
        destory: () => {
          dashPlayer.destroy()
        },
      }
    } else {
      console.error("不支持dash加载")
    }
  }
  /** 销毁当前播放 */
  private destoryCurrent() {
    this.current?.destory()
    this.current = null
  }
}
