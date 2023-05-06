import { DanmakuMode } from "@/enum";

/** 播放器初始化选项 */
export interface PlayerOptions {
  /** 播放器容器 */
  container: HTMLElement;
  /** 视频信息 */
  video: VideoInfo;

  /** 播放器主题色 */
  themeColor: string;

  // 播放配置
  /** 音量 */
  volume?: number
  /** 播放速率 */
  rate?: number
  /** 自动播放 */
  autoPlay?: boolean
  /** 循环播放 */
  repeat?: boolean
}

/** 视频信息 */
export interface VideoInfo {
  /** 视频标题 */
  title: string
  /** 视频id */
  id: string
  /** 视频分P列表 */
  list: VideoPart[];
  /** 要播放的分P */
  part?: number
}

/** 视频源 */
export interface VideoSource {
  url: string;
  type: string;
}

/** 视频分P */
export interface VideoPart {
  title: string;
  src: VideoSource[];
  danmakuId?: number;
  danmakuAdditon?: {
    url: string;
    type: string;
    origin: string;
  };
}

/** 弹幕对象接口 */
export interface DanmakuInterface {
  /** 发送时间 */
  time: number;
  /** 弹幕内容 */
  content: string | any;
  /** 弹幕模式 */
  mode: DanmakuMode;
  /** 颜色 */
  color: number | string;
  /** 弹幕文字大小 */
  size: number;
  /** 时间戳 */
  timestamp: number;
  /** 发送用户 */
  user: string | number
  /** 弹幕来源平台 */
  platform?: string,
}

/** 弹幕源 */
export interface DanmakuSource {
  url: string,        // 弹幕url
  type?: string,      // 弹幕格式
  platform?: string,  // 平台名称，用于标记平台信息
  name?: string       // 弹幕来源名称
}
