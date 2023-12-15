import type { Player } from "@/player";

export type { PlayerEventMap, PlayerPropertyMap } from "./PlayerEventMap";
export type { PlayerHookMap } from "./PlayerHookMap";
export type { PlayerOptions } from "./PlayerOptions";

/** 播放器插件注册函数 */
export interface PluginConstructor {
  /** 插件名称 */
  readonly pluginName: string;
  /** 插件创建 */
  new (player: Player, options: PlayerOptions): Plugin;
}

/** 播放器插件 */
export interface Plugin {
  /** 插件创建前 */
  beforeCreate?: (options: PlayerOptions) => void;
  /** 插件创建后 */
  created?: (options: PlayerOptions) => void;
  /** 所有插件加载后 */
  pluginsReady?: (options: PlayerOptions) => void;
  /** 播放器挂载后 */
  playerMounted?: (options: PlayerOptions) => void;
  /** 播放器挂载后 */
  videlInitialized?: (options: PlayerOptions) => void;
  /** 执行销毁 */
  destroy?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface OperationResult {
  success: boolean;
  message?: string;
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
  /** 视频播放url */
  url?: string;
  /** 视频类型 */
  type?: string;
}

/** 作者信息->视频信息 */
export interface VideoInfo {
  /** 作者信息 */
  author?: {
    name: string;
    id: number;
  };
}

/** 视频加载信息 */
export interface LoadInfo {
  url: string;
  type?: string;
  play?: boolean;
  time?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PluginExports {}
