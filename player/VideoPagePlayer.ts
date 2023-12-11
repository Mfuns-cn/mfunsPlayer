import Player from "@/index";
import { PlayerOptions } from "@/types";
import DanmakuList from "../plugins/danmakuList";
import DanmakuBar from "@/plugins/danmakuBar";
import BlackBorder from "../plugins/blackBorder";
import Danmaku from "@/plugins/danmaku";
import Wide from "@/plugins/wide";
import {
  // ButtonPip,
  ButtonWebfull,
} from "@/plugins/controls";
import ButtonDanmakuToggle from "@/plugins/controls/button/ButtonDanmakuToggle";
import ButtonDanmakuSettings from "@/plugins/controls/button/ButtonDanmakuSettings";
import About from "@/plugins/panels/about";
import Hotkeys from "@/plugins/panels/hotkeys";
import { presetBasic } from "../plugins/presets";
import ButtonWide from "@/plugins/controls/button/ButtonWide";
import AutoPart from "@/plugins/playSettings/autoPart";
import AutoPlay from "@/plugins/playSettings/autoPlay";
import SeekLast from "@/plugins/playSettings/seekLast";
import Theme from "@/plugins/theme";
import Part from "@/plugins/part";
import Seamless from "@/plugins/seamless";
import PartList from "@/plugins/panels/partList";
import ButtonDanmakulist from "@/plugins/controls/button/ButtonDanmakulist";
import Quality from "@/plugins/quality";
import ButtonQuality from "@/plugins/controls/button/ButtonQuality";
import VideoStatus from "@/plugins/videoStatus";
import LoadingMask from "@/plugins/loadingMask";

/** 内置插件 */
const plugins = [
  Part,
  Seamless,
  Danmaku,
  DanmakuBar,
  DanmakuList,
  BlackBorder,
  Wide,
  AutoPlay,
  AutoPart,
  SeekLast,
  Theme,
  Quality,
  VideoStatus,
  LoadingMask,
];

const panels = [About, Hotkeys, PartList];

const controls = [
  ButtonWebfull,
  ButtonWide,
  ButtonDanmakuToggle,
  ButtonDanmakuSettings,
  ButtonDanmakulist,
  ButtonQuality,
];

/** MfunsPlayer 播放页版播放器
 *
 * 插件功能：快捷键、右键菜单、弹幕栏、弹幕列表、视频黑边、宽屏模式、关灯模式
 */
export default class MfunsPlayer extends Player {
  constructor(config: PlayerOptions) {
    super(
      presetBasic({
        autoPart: true,
        ...config,
        plugins: [...plugins, ...panels, ...controls, ...(config.plugins || [])],
      })
    );
  }
}
