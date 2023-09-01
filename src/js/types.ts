import { DanmakuMode } from "@/enum"

/** 播放器初始化选项 */
export interface PlayerOptions {
  /** 播放器容器 */
  container: HTMLElement
  /** 视频信息 */
  video: VideoInfo
  /** 主题设置 */
  theme?: ThemeOptions
  // 播放配置
  /** 音量 */
  volume?: number
  /** 播放速率 */
  rate?: number
  /** 自动播放 */
  autoPlay?: boolean
  /** 循环播放 */
  loop?: boolean
  /** 宽屏模式 */
  wide?: boolean
  /** 弹幕设置 */
  danmaku: {
    /** 弹幕api */
    api: DanmakuApiOptions
  }
}

export interface OperationResult {
  ok: boolean
  code: number
  message?: string
}

export interface DanmakuApiOptions {
  /** 基准url */
  url: string
  /** 弹幕格式类型 */
  type: string
  /** 获取弹幕 */
  get: (arg: {
    api: string
    id: string | number
    offset?: string | number
    limit?: number
  }) => Promise<unknown>
  /** 发送弹幕 */
  send?: (arg: {
    api: string
    id: string | number
    danmaku: DanmakuItem
  }) => Promise<OperationResult>
  /** 举报弹幕 */
  report?: (arg: { api: string; danmaku: DanmakuItem }) => Promise<OperationResult>
  /** 视频作者删除弹幕 */
  delete?: (arg: { api: string; danmaku: DanmakuItem[] }) => Promise<OperationResult>
  /** 撤回自己发送的弹幕 */
  recall?: (arg: { api: string; danmaku: DanmakuItem }) => Promise<OperationResult>
  /** 添加内容屏蔽 */
  blockContent?: (arg: { api: string; content: string; flag: boolean }) => Promise<OperationResult>
  /** 添加用户屏蔽 */
  blockUser?: (arg: {
    api: string
    user: string | number
    flag: boolean
  }) => Promise<OperationResult>
  /** 获取屏蔽列表 */
  getBlockList?: (arg: { api: string; list: any }) => Promise<OperationResult>
}

export interface ThemeOptions {
  /** 播放器主色 */
  primaryColor?: string
  /** 播放器辅色 */
  secondaryColor?: string
  /** 播放器圆角尺寸 */
  borderRadius?: string
}

/** 播放列表项 */
export interface PlayListItem {
  /** 视频标题 */
  title: string
  /** 视频id */
  id: string
  /** 作者信息 */
  author?: {
    name: string
    id: number
  }
}

/** 视频信息 */
export interface VideoInfo {
  /** 视频标题 */
  title: string
  /** 视频id */
  id: string
  /** 视频分P列表 */
  list: VideoPart[]
  /** 要播放的分P */
  part?: number
  /** 作者信息 */
  author?: {
    name: string
    id: number
  }
}

/** 视频源 */
export interface VideoSource {
  url: string
  type: string
}

/** 视频分P */
export interface VideoPart {
  title: string
  src: VideoSource[]
  /** 弹幕id */
  danmakuId?: number
  /** 附加外挂弹幕 */
  danmakuAddition?: DanmakuSource[]
}

/** 弹幕对象接口 */
export interface DanmakuItem {
  /** 弹幕id */
  id: number | string
  /** 发送时间 */
  time: number
  /** 弹幕内容 */
  content: string
  /** 弹幕模式 */
  mode: DanmakuMode
  /** 颜色 */
  color: number | string
  /** 弹幕文字大小 */
  size: number
  /** 时间戳 */
  timestamp: number
  /** 发送用户 */
  user: string | number
}

/** 弹幕源 */
export interface DanmakuSource {
  /** 弹幕来源url */
  url: string
  /** 弹幕格式 */
  type: string
  /** 获取弹幕数据 */
  data?: (data: unknown) => unknown
  // platform?: string // 平台名称，用于标记平台信息
  // name?: string // 弹幕来源名称
}
