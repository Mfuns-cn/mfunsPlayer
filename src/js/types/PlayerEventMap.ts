import { PlayerOptions, VideoInfo } from "../types";

export interface PlayerEventMap {
  // --- 视频事件 --- //

  /** 视频开始播放 */
  play: () => void;
  /** 视频暂停播放 */
  pause: () => void;
  /** 视频播放完毕 */
  ended: () => void;

  /** 视频元数据加载完毕 */
  loadedmetadata: () => void;
  /** 视频首帧加载完毕 */
  loadeddata: () => void;
  /** 视频加载缓冲 */
  waiting: () => void;
  /** 视频加载缓冲后继续播放 */
  playing: () => void;
  /** 视频可播放 */
  canplay: () => void;
  /** 视频可流畅播放 */
  canplaythrough: () => void;

  /** 播放时间更新 */
  timeupdate: (time: number) => void;
  /** 视频时长改变 */
  durationchange: (time: number) => void;
  /** 缓冲数据更新 */
  progress: (buffered: TimeRanges) => void;
  /** 进度开始跳转 */
  seeking: (time: number) => void;
  /** 进度跳转成功 */
  seeked: (time: number) => void;
  /** 音量改变 */
  volumechange: (volume: number, muted: boolean) => void;
  /** 播放速率改变 */
  ratechange: (rate: number) => void;

  /** 进入画中画模式 */
  enterpictureinpicture: () => void;
  /** 退出画中画模式 */
  leavepictureinpicture: () => void;

  // --- 播放模式 --- //

  /** 播放结束 */
  end: () => void;

  /** 设置视频 */
  video_change: (video: VideoInfo) => void;
  /** 加载视频 */
  video_load: (video: VideoInfo) => void;

  /** 配置选项更改 */
  options_set: (options: Partial<PlayerOptions>) => void;

  /** 进入网页全屏模式 */
  "webscreen:enter": () => void;
  /** 退出网页全屏模式 */
  "webscreen:exit": () => void;

  /** 播放器聚焦 */
  focus: () => void;
  /** 播放器失焦 */
  blur: () => void;
  /** 播放器活跃 */
  active: () => void;
  /** 播放器取消活跃 */
  inactive: () => void;

  /** 播放器视频区域界面大小改变 */
  video_resize: (size: [number, number]) => void;

  /** 播放器尺寸改变 */
  resize: (size: [number, number]) => void;

  /** 播放器与视口相交区域改变 */
  intersection: (flag: boolean) => void;

  mounted: () => void;

  /** 播放器自定义属性更改 */
  change: <T extends keyof PlayerPropertyMap>(key: T, value: PlayerPropertyMap[T]) => void;

  error: (err: Error) => void;
}

type PlayerPropertyChangeEventMap = {
  [T in `change:${keyof PlayerPropertyMap}`]: T extends `change:${infer P}`
    ? P extends keyof PlayerPropertyMap
      ? PlayerPropertyMap[P]
      : never
    : never;
};

/** 播放器设置值表 */
export interface PlayerPropertyMap {
  /** 自动播放 */
  autoPlay: boolean;
  /** 自动切P */
  autoPart: boolean;
  /** 循环播放 */
  loop: boolean;
  /** 视频比例 */
  aspectRatio: [number, number] | null;
}
