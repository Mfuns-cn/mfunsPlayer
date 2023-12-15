import { PlayerOptions } from "@/types";
import Player from "@/player";
import { keyCode } from "@/utils/KeyCode.enum";

export default class Hotkey {
  static readonly pluginName = "hotkey";
  player: Player;
  controlMask: HTMLElement;

  constructor(player: Player, options: PlayerOptions) {
    this.player = player;
    this.controlMask = this.player.$area;
    this.initKey();
    this.initMask();
  }

  initKey() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName.toUpperCase();
      const editable = document.activeElement?.getAttribute("contenteditable");
      if (this.player.focused) {
        if (tag == "INPUT" || tag == "TEXTAREA" || editable == "" || editable == "true") return;
        switch (e.keyCode) {
          case keyCode.Space:
            e.preventDefault();
            this.player.toggle();
            break;
          case keyCode.LeftArrow:
            e.preventDefault();
            this.player.seek(this.player.time - 5);
            break;
          case keyCode.RightArrow:
            e.preventDefault();
            this.player.seek(this.player.time + 5);
            break;
          case keyCode.UpArrow:
            e.preventDefault();
            this.player.setVolume(this.player.volume + 0.1);
            break;
          case keyCode.DownArrow:
            e.preventDefault();
            this.player.setVolume(this.player.volume - 0.1);
            break;
        }
      }
    });
  }

  initMask() {
    this.controlMask.addEventListener("click", () => {
      this.player.toggle();
    });
  }
}
