import type { Player } from "@/player";
import { PanelContainer } from "@/plugin";

export type { PlayerEventMap, PlayerPropertyMap } from "./PlayerEventMap";
export type { PlayerHookMap } from "./PlayerHookMap";

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

/** 播放器初始化选项 */
export interface PlayerOptions {
  /** 播放器容器 */
  container: HTMLElement;
  /** 视频信息 */
  video: VideoInfo;

  // --- 播放配置 --- //
  /** 音量 */
  volume?: number;
  /** 播放速率 */
  playbackRate?: number;
  /** 视频比例 */
  aspectRatio?: [number, number];
  /** 自动播放 */
  autoPlay?: boolean;
  /** 播放时间 */
  time?: number;
  /** 分P连播 */
  autoPart?: boolean;
  /** 循环播放 */
  loop?: boolean;
  /** 活跃持续时间 */
  activeTime?: number;
  /** 功能插件 */
  plugins?: PluginConstructor[];
  /** 控件设置 */
  controls?: Record<string, { container?: (player: Player) => HTMLElement; order?: number }>;
  /** 面板设置 */
  panels?: Record<
    string,
    {
      container?: (player: Player) => HTMLElement;
      onToggle?: (flag: boolean) => void;
      onUnmount?: () => void;
      mount?: (player: Player) => PanelContainer;
    }
  >;
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
