import type { Player } from "@/player";
import { PlayerOptions } from "./PlayerOptions";
export { PlayerEventMap } from "./PlayerEventMap";
export { PlayerHookMap } from "./PlayerHookMap";
export { PlayerOptions } from "./PlayerOptions";

export interface PlayerPropertyDescriptor<T> extends PropertyDescriptor {
  value?: T;
  get?(): T;
  set?(v: T): void;
}

/** 播放器插件构造函数 */
export interface PluginConstructor {
  /** 插件名称 */
  readonly pluginName: string;
  /** 插件构造函数 */
  new (player: Player): IPlugin;
}

/** 播放器插件 */
export interface IPlugin {
  /** 插件名称 */
  pluginName?: string;
  /** 插件创建后 */
  init?: (player: Player) => void;
  /** 作为插件注册 */
  apply?: (player: Player, options: PlayerOptions) => void;
  /** 所有插件加载后 */
  ready?: (player: Player) => void;
  /** 播放器挂载后 */
  mounted?: (player: Player) => void;
  /** 执行销毁 */
  destroy?: () => void;
}

/** 播放列表项 */
export interface PlayListItem {
  /** 视频标题 */
  title: string;
  /** 视频id */
  id: string;
  /** 视频上传者信息 */
  author?: {
    name: string;
    id: number;
  };
}

/** 视频信息 */
export interface VideoInfo {
  /** 视频标题 */
  title?: string;
  /** 视频源url */
  url?: string;
  /** 视频类型 */
  type?: string;
  /** 是否为直播流 */
  live?: boolean;
  /** 是否有上一个视频 */
  hasPrev?: boolean;
  /** 是否有下一个视频 */
  hasNext?: boolean;
}

export interface LoadInfo {
  /** 视频源url */
  url: string;
  /** 视频类型 */
  type?: string;
  /** 是否为直播流 */
  live?: boolean;
  /** 是否播放视频 */
  play?: boolean;
  /** 视频播放时间，true表示从当前位置开始继续播放，false表示重新开始播放 */
  time?: number | boolean;
  /** 指定媒体加载器 */
  loader?: string;
}

/** 媒体信息 */
export interface MediaInfo {
  /** 视频源url */
  url: string;
  /** 视频类型 */
  type: string;
}

export interface MediaController {
  /** 视频类型 */
  type: string;
  /** 视频url */
  url: string;
  /** 是否为直播 */
  live?: boolean;
  /** 播放内核实例 */
  kernel?: any;
  /** 视频类型 */
  mediaElement: HTMLVideoElement;
  /** 加载视频源 */
  load?(info: LoadInfo): void;
  /** 是否支持加载新视频源 */
  supportLoad?(info: LoadInfo): boolean;
  /** 销毁控制实例 */
  destroy(): void;
}

export type MediaLoader = {
  /** 检测是否支持加载 */
  check(info: LoadInfo): boolean;
  /** 创建媒体控制实例 */
  create(info: LoadInfo, video: HTMLVideoElement): MediaController;
};

/** 播放器外部依赖 */
export interface PlayerExternals {}

/** 播放器外部调用 */
export interface PlayerInvokes {}

/** 播放器插件 */
export interface PlayerPlugins {}
