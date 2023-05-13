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
      if (this.player.isFocused) {
        switch (e.keyCode) {
          case keyCode.Space:
            e.preventDefault()
            this.player.toggle()
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
