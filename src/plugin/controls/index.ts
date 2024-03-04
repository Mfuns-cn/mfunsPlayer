import ButtonPlay from "./button/ButtonPlay";
import ButtonPrev from "./button/ButtonPrev";
import ButtonNext from "./button/ButtonNext";
import LabelTime from "./videoTime";
import ButtonLoop from "./button/ButtonLoop";

import ButtonPart from "./button/ButtonPart";
import ButtonVolume from "./button/ButtonVolume";
import ButtonSettings from "./button/ButtonSettings";
import ButtonPip from "./button/ButtonPip";
import ButtonWidescreen from "./button/ButtonWidescreen";
import ButtonWebscreen from "./button/ButtonWebscreen";
import ButtonFullscreen from "./button/ButtonFullscreen";

export {
  ButtonPlay,
  ButtonPrev,
  ButtonNext,
  LabelTime,
  ButtonLoop,
  ButtonPart,
  ButtonVolume,
  ButtonSettings,
  ButtonPip,
  ButtonWidescreen,
  ButtonWebscreen,
  ButtonFullscreen,
};

declare module "@core" {
  interface PlayerPlugins {
    buttonPlay?: ButtonPlay;
    buttonPrev?: ButtonPrev;
    buttonNext?: ButtonNext;
    labelTime?: LabelTime;
    buttonLoop?: ButtonLoop;
    buttonPart?: ButtonPart;
    buttonVolume?: ButtonVolume;
    buttonSettings?: ButtonSettings;
    buttonPip?: ButtonPip;
    buttonWebscreen?: ButtonWebscreen;
    buttonFullscreen?: ButtonFullscreen;
  }
}
