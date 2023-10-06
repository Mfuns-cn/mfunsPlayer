import ButtonPlay from "@/ui/Controller/button/ButtonPlay";
import ButtonPrev from "@/ui/Controller/button/ButtonPrev";
import ButtonNext from "@/ui/Controller/button/ButtonNext";
import LabelTime from "@/ui/Controller/label/LabelTime";
import ButtonLoop from "@/ui/Controller/button/ButtonLoop";

import ButtonPart from "@/ui/Controller/button/ButtonPart";
import ButtonVolume from "@/ui/Controller/button/ButtonVolume";
import ButtonSettings from "@/ui/Controller/button/ButtonSettings";
import ButtonPip from "@/ui/Controller/button/ButtonPip";
import ButtonWebfull from "@/ui/Controller/button/ButtonWebfull";
import ButtonFullscreen from "@/ui/Controller/button/ButtonFullscreen";

import { EmptyObject, PlayerPlugin } from "@/types";
import { fullScreenEnabled, pictureInPictureEnabled } from "@/utils";

// 1
export const buttonPlay = (): PlayerPlugin<"buttonPlay", EmptyObject, ButtonPlay> => {
  {
    return {
      name: "buttonPlay",
      create: (player) => new ButtonPlay(player, player.controller.$left, 1),
    };
  }
};

// 0
export const buttonPrev = (): PlayerPlugin<"buttonPrev", EmptyObject, ButtonPrev> => {
  {
    return {
      name: "buttonPrev",
      create: (player) => new ButtonPrev(player, player.controller.$left, 0),
      init: (player) => {
        player.plugin.buttonPrev.show(false);
      },
    };
  }
};

// 2
export const buttonNext = (): PlayerPlugin<"buttonNext", EmptyObject, ButtonNext> => {
  {
    return {
      name: "buttonNext",
      create: (player) => new ButtonNext(player, player.controller.$left, 2),
    };
  }
};

// 3
export const labelTime = (): PlayerPlugin<"labelTime", EmptyObject, LabelTime> => {
  {
    return {
      name: "labelTime",
      create: (player) => new LabelTime(player, player.controller.$left, 3),
    };
  }
};

// 4
export const buttonLoop = (): PlayerPlugin<"buttonLoop", EmptyObject, ButtonLoop> => {
  {
    return {
      name: "buttonLoop",
      create: (player) => new ButtonLoop(player, player.controller.$left, 4),
    };
  }
};

// 0
export const buttonPart = (): PlayerPlugin<"buttonPart", EmptyObject, ButtonPart> => {
  {
    return {
      name: "buttonPart",
      create: (player) => new ButtonPart(player, player.controller.$right, 0),
    };
  }
};

// 1
export const buttonVolume = (): PlayerPlugin<"buttonVolume", EmptyObject, ButtonVolume> => {
  {
    return {
      name: "buttonVolume",
      create: (player) => new ButtonVolume(player, player.controller.$right, 1),
    };
  }
};

// 2
export const buttonSettings = (): PlayerPlugin<"buttonSettings", EmptyObject, ButtonSettings> => {
  {
    return {
      name: "buttonSettings",
      create: (player, options) => new ButtonSettings(player, player.controller.$right, 2, options),
    };
  }
};

// 7
export const buttonPip = (): PlayerPlugin<"buttonPip", EmptyObject, ButtonPip | object> => {
  {
    return {
      name: "buttonPip",
      create: (player) =>
        pictureInPictureEnabled ? new ButtonPip(player, player.controller.$right, 7) : {},
    };
  }
};

// 8 -> 宽屏模式

// 9
export const buttonWebfull = (): PlayerPlugin<
  "buttonWebfull",
  EmptyObject,
  ButtonWebfull | object
> => {
  {
    return {
      name: "buttonWebfull",
      create: (player, options) =>
        options.feature?.webfull ? new ButtonWebfull(player, player.controller.$right, 9) : {},
    };
  }
};

// 10
export const buttonFullscreen = (): PlayerPlugin<
  "buttonFullscreen",
  EmptyObject,
  ButtonFullscreen | object
> => {
  {
    return {
      name: "buttonFullscreen",
      create: (player) =>
        fullScreenEnabled ? new ButtonFullscreen(player, player.controller.$right, 10) : {},
    };
  }
};

export const normalButtonList = () => [
  buttonPrev(),
  buttonPlay(),
  buttonNext(),
  labelTime(),
  buttonLoop(),
  buttonPart(),
  buttonVolume(),
  buttonSettings(),
  buttonPip(),
  buttonWebfull(),
  buttonFullscreen(),
];
