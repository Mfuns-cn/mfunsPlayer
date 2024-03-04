import { VideoInfo } from "@/types";

/** 弹幕模式 */
export enum DanmakuMode {
  roll = 1,
  bottom = 4,
  top = 5,
  reverse = 6,
  special = 7,
  advanced = 9,
}

/** 弹幕对象接口 */
export interface DanmakuItem {
  /** 弹幕id */
  id: number | string;
  /** 发送时间 */
  time: number;
  /** 弹幕内容 */
  content: string;
  /** 弹幕模式 */
  mode: DanmakuMode;
  /** 颜色 */
  color: number | string;
  /** 弹幕文字大小 */
  size: number;
  /** 日期 */
  date: number;
  /** 发送用户 */
  user: string | number;
  /** 弹幕是否在此播放器上发送 */
  fromHere?: boolean;
}

/** 弹幕发送对象接口 */
export type DanmakuSendItem = Omit<DanmakuItem, "id" | "date" | "user">;

/** 弹幕源 */
export interface DanmakuSource {
  /** 弹幕来源url */
  url: string;
  /** 弹幕格式 */
  type: string;
  /** 获取弹幕数据 */
  data?: (data: unknown) => unknown;
  // platform?: string // 平台名称，用于标记平台信息
  // name?: string // 弹幕来源名称
}

export interface DanmakuInvokes {
  /** 获取弹幕 */
  get?: (info: VideoInfo) => Promise<unknown>;
  /** 发送弹幕 */
  send?: (danmaku: DanmakuSendItem, info: VideoInfo) => Promise<void>;
  /** 举报弹幕 */
  report?: (danmaku: DanmakuItem, info: VideoInfo) => Promise<void>;
  /** 视频作者删除弹幕 */
  delete?: (danmaku: DanmakuItem[], info: VideoInfo) => Promise<void>;
  /** 撤回自己发送的弹幕 */
  recall?: (danmaku: DanmakuItem, info: VideoInfo) => Promise<void>;
  /** 添加内容屏蔽 */
  blockContent?: (content: string, flag: boolean) => Promise<void>;
  /** 添加用户屏蔽 */
  blockUser?: (user: string | number, flag: boolean) => Promise<void>;
}

export interface XMLDanmakuParser {
  type: "xml";
  parse: (raw: XMLDocument) => DanmakuItem[];
}
export interface JSONDanmakuParser {
  type: "json";
  parse: (raw: any) => DanmakuItem[];
}
export interface TextDanmakuParser {
  type: "text";
  parse: (raw: string) => DanmakuItem[];
}
export type DanmakuParser = XMLDanmakuParser | JSONDanmakuParser | TextDanmakuParser;

declare module "@core" {
  interface PlayerOptions {
    /** 弹幕设置 */
    danmaku?: {
      /** 弹幕格式类型 */
      type?: string;
      /** 类型屏蔽 */
      filter?: string[];
      /** 弹幕不透明度 */
      opacity?: number;
      /** 弹幕速度 */
      speed?: number;
      /** 弹幕显示区域 */
      area?: number;
      /** 弹幕大小 */
      scale?: number;
      /** 弹幕字体 */
      font?: string;
      /** 字体加粗 */
      bold?: boolean;
      /** 用户屏蔽 */
      blockUser: (string | number)[];
      /** 内容屏蔽 */
      blockContent: (string | RegExp)[];
    };
    danmakuInvoke: DanmakuInvokes;
  }

  interface VideoInfo {
    danmaku?: DanmakuSource[];
  }
}

declare module "@core" {
  interface PlayerEventMap {
    // --- 弹幕事件 --- //

    // 弹幕加载
    /** 弹幕开始加载 */
    "danmaku:loading": () => void;
    /** 弹幕加载完毕 */
    "danmaku:loaded": (dan: DanmakuItem[], from: { url?: string; id?: string | number }) => void;
    /** 弹幕加载失败 */
    "danmaku:loadFailed": (err: any, from: { url?: string; id?: string | number }) => void;

    // --- 弹幕事件 --- //
    /** 开启弹幕 */
    "danmaku:on": () => void;
    /** 关闭弹幕 */
    "danmaku:off": () => void;
    /** 弹幕池新增弹幕 */
    "danmaku:add": (dan: DanmakuItem[], play: boolean) => void;
    /** 弹幕池新增弹幕 */
    "danmaku:draw": (dm: DanmakuItem) => void;
    /** 弹幕池移除弹幕 */
    "danmaku:remove": (dan: DanmakuItem[]) => void;
    /** 弹幕池清空 */
    "danmaku:clear": () => void;
    /** 弹幕类型屏蔽 */
    "danmaku:filter": (type: string, flag: boolean) => void;

    // --- 弹幕操作 --- //
    /** 发送弹幕 */
    "danmaku:send": () => void;
    /** 选中指定弹幕 */
    "danmaku:select": (dm: DanmakuItem) => void;
    /** 屏蔽用户弹幕 */
    "danmaku:blockUser": (user: number | string, flag: boolean) => void;
    /** 屏蔽弹幕内容 */
    "danmaku:blockContent": (content: string, flag: boolean) => void;

    // --- 弹幕播放属性 --- //
    /** 弹幕不透明度更改 */
    "danmaku:opacityChange": (value: number) => void;
    /** 弹幕速度更改 */
    "danmaku:speedChange": (value: number) => void;
    /** 弹幕区域更改 */
    "danmaku:areaChange": (value: number) => void;
    /** 弹幕大小更改 */
    "danmaku:scaleChange": (value: number) => void;
    /** 弹幕字体更改 */
    "danmaku:fontChange": (value: string) => void;
    /** 弹幕粗体更改 */
    "danmaku:boldChange": (value: boolean) => void;
  }
}
