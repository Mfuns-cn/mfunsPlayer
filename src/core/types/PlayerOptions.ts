import { PanelContainer } from "@/plugin";
import { VideoInfo, PluginConstructor, PlayerExternals, IPlugin, PlayerInvokes } from "@/types";
import Player from "../../../player/core-player";

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
  /** 自动播放 */
  autoPlay?: boolean;
  /** 播放时间 */
  time?: number;
  /** 分P连播 */
  autoPart?: boolean;
  /** 循环播放 */
  loop?: boolean;
  /** 功能插件 */
  plugins?: (PluginConstructor | IPlugin)[];
  /** 外部扩展 */
  externals?: PlayerExternals;
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
  invoke?: PlayerInvokes;
}
