import { PlayerOptions } from "@/types";
import Danmaku from "../danmaku/danmaku";
import DanmakuEngine from "../danmaku/danmakuEngine";
import DanmakuLoader from "../danmaku/danmakuLoader";
import DanmakuOperate from "../danmaku/danmakuOperate";
import ButtonDanmakuToggle from "../danmaku/controls/ButtonDanmakuToggle";
import DanmakuBar from "../danmaku/danmakuBar";
import ButtonDanmakuSettings from "../danmaku/controls/ButtonDanmakuSettings";
import DanmakuMenu from "../danmaku/danmakuMenu";

const danmakuPlugins = [
  Danmaku,
  DanmakuEngine,
  DanmakuLoader,
  DanmakuOperate,
  DanmakuBar,
  DanmakuMenu,
];
const danmakuControls = [ButtonDanmakuToggle, ButtonDanmakuSettings];

export const presetDanmaku = [...danmakuPlugins, ...danmakuControls];
