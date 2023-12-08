import ContextMenu from "@/plugins/contextMenu";
import Controller from "@/plugins/ui/controller";
import {
  ButtonPlay,
  ButtonPrev,
  ButtonNext,
  LabelTime,
  ButtonLoop,
  ButtonPart,
  ButtonVolume,
  ButtonSettings,
  ButtonPip,
  ButtonFullscreen,
} from "@/plugins/controls";
import Hotkey from "@/plugins/hotkey";
import Modal from "@/plugins/ui/modal";
import Progress from "@/plugins/progress";
import Settings from "@/plugins/settings";
import { PlayerOptions } from "@/types";
import Sources from "@/plugins/core/sources";
import Side from "@/plugins/ui/side";

/** 核心插件 */
export const corePlugins = [Sources];

/** 基础插件 */
export const basicPlugins = [Modal, Side, Controller, Settings, Hotkey, ContextMenu];

/** 基础控件 */
export const basicControls = [
  Progress,
  ButtonPlay,
  ButtonPrev,
  ButtonNext,
  LabelTime,
  ButtonLoop,
  ButtonPart,
  ButtonVolume,
  ButtonSettings,
  ButtonPip,
  ButtonFullscreen,
];

export function presetBasic(config: PlayerOptions): PlayerOptions {
  return {
    ...config,
    plugins: [...corePlugins, ...basicPlugins, ...basicControls, ...(config.plugins || [])],
  };
}
