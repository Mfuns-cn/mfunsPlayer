import { PanelContainer } from "@/plugin";
import { VideoInfo, PluginConstructor } from "@/types";
import Player from "..";

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
