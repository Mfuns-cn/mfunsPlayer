import { PlayerOptions } from "@/types"
import MfunsPlayer from "@/player"
import { keyCode } from "@/utils/KeyCode.enum"

export default class HotKey {
  player: MfunsPlayer
  controlMask: HTMLElement

  constructor(player: MfunsPlayer, options: PlayerOptions) {
    this.player = player
    this.controlMask = this.player.template.$videoArea
    this.initKey()
    this.initMask()
  }

  initKey() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (this.player.state.focused) {
        switch (e.keyCode) {
          case keyCode.Space:
            e.preventDefault()
            this.player.toggle()
            break
          case keyCode.LeftArrow:
            e.preventDefault()
            this.player.seek(this.player.time - 5)
            break
          case keyCode.RightArrow:
            e.preventDefault()
            this.player.seek(this.player.time + 5)
            break
          case keyCode.UpArrow:
            e.preventDefault()
            this.player.setVolume(this.player.volume + 0.1)
            break
          case keyCode.DownArrow:
            e.preventDefault()
            this.player.setVolume(this.player.volume - 0.1)
            break
        }
      }
    })
  }

  initMask() {
    this.controlMask.addEventListener("click", () => {
      this.player.toggle()
    })
  }
}
