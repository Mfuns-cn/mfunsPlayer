import MfunsPlayer from "@/player"
import { PlayerOptions } from "@/types"
import ModeFullscreen from "./ModeFullscreen"
import ModePip from "./ModePip"

export default class Mode {
  player: MfunsPlayer

  protected modeFullscreen: ModeFullscreen

  protected modePip: ModePip

  constructor(player: MfunsPlayer, options: PlayerOptions) {
    this.player = player
    this.modeFullscreen = new ModeFullscreen(this.player)
    this.modePip = new ModePip(this.player)
  }

  fullscreen() {
    this.modeFullscreen.enter()
  }

  exitFullscreen() {
    this.modeFullscreen.exit()
  }

  get isFullscreen() {
    return this.modeFullscreen.value
  }

  pip() {
    this.modePip.enter()
  }

  exitPip() {
    this.modePip.exit()
  }

  get isPip() {
    return this.modePip.value
  }

  webfull() {}

  exitWebfull() {}

  get isWebfull() {
    return false
  }

  wide() {}

  exitWide() {}

  get isWide() {
    return false
  }

  /** 设置控制栏固定 */
  fixedController(flag: boolean) {
    this.player.template.el.classList.toggle("mode-fixedcontroller", flag)
    this.player.events.trigger(flag ? "fixedcontroller" : "fixedcontroller_off")
  }
}
