import ContextMenu from "@plugin/ui/contextMenu";
import Controller from "@plugin/ui/controller";
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
} from "@plugin/controls";
import Hotkey from "@plugin/hotkey";
import Modal from "@plugin/ui/modal";
import Progress from "@plugin/controls/progress";
import Settings from "@plugin/settings";
import { PlayerOptions } from "@/types";
import Side from "@plugin/ui/side";
import Pip from "@plugin/screen/pip";
import Fullscreen from "@plugin/screen/fullscreen";
import User from "@plugin/videoOptions/user";
import StateActive from "../state/stateActive";
import StateFocus from "../state/stateFocus";
import StateResize from "../state/stateResize";
import StateIntersecting from "../state/stateIntersecting";

/** 核心插件 */
export const corePlugins = [
  StateActive,
  StateFocus,
  StateResize,
  StateIntersecting,
  Pip,
  Fullscreen,
];

/** 基础插件 */
export const basicPlugins = [Modal, Side, Controller, Settings, Hotkey, ContextMenu, User];

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

export const presetBasic = [...corePlugins, ...basicPlugins, ...basicControls];
