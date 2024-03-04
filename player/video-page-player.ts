import Player from "./core-player";
import { PlayerOptions } from "@/types";
import DanmakuList from "../mfuns-plugin/danmakuList";
import BlackBorder from "@plugin/enhance/video/blackBorder";
import Widescreen from "@plugin/screen/widescreen";
import { ButtonWebscreen, ButtonWidescreen } from "@plugin/controls";
import About from "@plugin/panels/about";
import Hotkeys from "@plugin/panels/hotkeyInfo";
import { presetBasic } from "@plugin/presets/basic";
import AutoPart from "@plugin/enhance/playback/autoPart";
import AutoPlay from "@plugin/enhance/playback/autoPlay";
import AutoSeek from "@plugin/enhance/playback/autoSeek";
import Theme from "@plugin/theme";
import Part from "@plugin/videoOptions/part";
import Seamless from "@plugin/patch/seamless";
import PartList from "@plugin/panels/partList";
import ButtonDanmakulist from "@plugin/controls/button/ButtonDanmakulist";
import Quality from "@plugin/quality";
import ButtonQuality from "@plugin/controls/button/ButtonQuality";
import VideoStatus from "@plugin/enhance/ui/videoStatus";
import LoadingMask from "@plugin/enhance/ui/loadingMask";
import VideoTitle from "@plugin/controls/videoTitle";
import Header from "@plugin/ui/header";
import Mini from "@plugin/enhance/ui/mini";
import LightOff from "@plugin/enhance/ui/lightOff";
import Webscreen from "@plugin/screen/webscreen";
import { presetDanmaku } from "@plugin/presets/danmaku";
import VideoQuality from "@plugin/videoOptions/qualities";
import HlsLoader from "@plugin/videoLoader/hlsLoader";
import DashLoader from "@plugin/videoLoader/dashLoader";
import FlvLoader from "@plugin/videoLoader/flvLoader";
import AspectRatio from "@plugin/enhance/video/aspectRatio";

/** 内置插件 */
const plugins = [
  Quality,
  VideoQuality,
  Header,
  Part,
  Seamless,
  DanmakuList,
  BlackBorder,
  AspectRatio,
  Webscreen,
  Widescreen,
  AutoPlay,
  AutoPart,
  AutoSeek,
  Theme,
  VideoStatus,
  LoadingMask,
  Mini,
  LightOff,
];

const panels = [About, Hotkeys, PartList];

const controls = [ButtonWebscreen, ButtonWidescreen, ButtonDanmakulist, ButtonQuality, VideoTitle];

const loaders = [FlvLoader, HlsLoader, DashLoader];

/** MfunsPlayer 播放页版播放器
 *
 * 插件功能：快捷键、右键菜单、弹幕栏、弹幕列表、视频黑边、宽屏模式、关灯模式
 */
export default class MfunsPlayer extends Player {
  constructor(options: PlayerOptions) {
    super({
      autoPart: true,
      controller: {
        controls: {
          top: ["progress"],
          left: ["prev", "play", "next", "time"],
          right: [
            "quality",
            "part",
            "volume",
            "settings",
            "pip",
            "widescreen",
            "webscreen",
            "fullscreen",
          ],
        },
      },
      ...options,
      plugins: [
        ...presetBasic,
        ...presetDanmaku,
        ...plugins,
        ...panels,
        ...controls,
        ...loaders,
        ...(options.plugins || []),
      ],
    });
  }
}
