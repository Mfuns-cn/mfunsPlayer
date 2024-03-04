import Player from "./core-player";
import { PlayerOptions } from "@/types";
import DanmakuList from "../mfuns-plugin/danmakuList";
import { ButtonWebscreen } from "@plugin/controls";
import Hotkeys from "@plugin/panels/hotkeyInfo";
import About from "@plugin/panels/about";
import { presetBasic } from "@plugin/presets/basic";
import AutoPart from "@plugin/enhance/playback/autoPart";
import AutoPlay from "@plugin/enhance/playback/autoPlay";
import Theme from "@plugin/theme";
import Part from "@plugin/videoOptions/part";
import Seamless from "@plugin/patch/seamless";
import PartList from "@plugin/panels/partList";
import ButtonDanmakulist from "@plugin/controls/button/ButtonDanmakulist";
import ButtonQuality from "@plugin/controls/button/ButtonQuality";
import Quality from "@plugin/quality";
import VideoStatus from "@plugin/enhance/ui/videoStatus";
import LoadingMask from "@plugin/enhance/ui/loadingMask";
import VideoTitle from "@plugin/controls/videoTitle";
import Header from "@plugin/ui/header";
import { presetDanmaku } from "@plugin/presets/danmaku";
import VideoQuality from "@plugin/videoOptions/qualities";
import FlvLoader from "@plugin/videoLoader/flvLoader";
import HlsLoader from "@plugin/videoLoader/hlsLoader";
import DashLoader from "@plugin/videoLoader/dashLoader";
import AspectRatio from "@plugin/enhance/video/aspectRatio";

/** 预设插件 */
const plugins = [
  Quality,
  VideoQuality,
  Header,
  Part,
  Seamless,
  DanmakuList,
  AspectRatio,
  AutoPlay,
  AutoPart,
  Theme,
  VideoStatus,
  LoadingMask,
];
const controls = [ButtonDanmakulist, ButtonQuality, VideoTitle];
const panels = [About, Hotkeys, PartList];
const loaders = [FlvLoader, HlsLoader, DashLoader];

/** MfunsPlayer 标准版播放器
 *
 * 插件功能：快捷键、右键菜单、弹幕栏、弹幕列表
 */
export default class MfunsPlayer extends Player {
  constructor(options: PlayerOptions) {
    super({
      autoPart: true,
      controller: {
        controls: {
          top: ["progress"],
          left: ["prev", "play", "next", "time"],
          right: ["quality", "part", "volume", "settings", "pip", "fullscreen"],
        },
      },
      side: {
        panels: ["partList"],
      },
      ...options,
      plugins: [
        ...presetDanmaku,
        ...presetBasic,
        ...plugins,
        ...panels,
        ...controls,
        ...loaders,
        ...(options.plugins || []),
      ],
    });
  }
}
