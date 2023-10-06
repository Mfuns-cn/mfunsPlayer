import Player from "@/player";
import { PlayerOptions } from "@/types";
import ModeFullscreen from "./ModeFullscreen";
import ModePip from "./ModePip";
import ModeWebfull from "./ModeWebfull";

export default class Mode {
  player: Player;

  protected modeFullscreen: ModeFullscreen;
  protected modeWebfull: ModeWebfull;
  protected modePip: ModePip;

  constructor(player: Player, options: PlayerOptions) {
    this.player = player;
    this.modeWebfull = new ModeWebfull(this.player);
    this.modeFullscreen = new ModeFullscreen(this.player);
    this.modePip = new ModePip(this.player);
    this.init();
  }
  init() {
    this.player.on("webfull", () => {
      this.player.exitFullscreen();
    });
    this.player.on("fullscreen", () => {
      this.player.exitWebfull();
    });

    const observer = new ResizeObserver(([item]) => {
      const { width, height } = item.contentRect;
      this.player.events.trigger("resize", [width, height]);
    });

    observer.observe(this.player.template.$videoWrap);
  }
  fullscreen() {
    this.modeFullscreen.enter();
  }

  exitFullscreen() {
    this.modeFullscreen.exit();
  }

  get isFullscreen() {
    return this.modeFullscreen.value;
  }

  pip() {
    this.modePip.enter();
  }

  exitPip() {
    this.modePip.exit();
  }

  get isPip() {
    return this.modePip.value;
  }

  webfull() {
    this.modeWebfull.enter();
  }

  exitWebfull() {
    this.modeWebfull.exit();
  }

  get isWebfull() {
    return this.modeWebfull.value;
  }

  wide() {}

  exitWide() {}

  get isWide() {
    return false;
  }

  /** 设置控制栏固定 */
  solid(flag: boolean) {
    this.player.template.el.classList.toggle("mode-solid", flag);
    this.player.events.trigger(flag ? "solid" : "solid_off");
  }
}
