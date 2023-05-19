import MfunsPlayer from "@/player"
import { getFullscreenElement } from "@/utils"

export default class ModeFullscreen {
  player: MfunsPlayer

  el: HTMLElement

  constructor(player: MfunsPlayer) {
    this.player = player
    this.el = this.player.template.$main

    const fullScreenChangeHandler = () => {
      if (this.value) {
        this.player.template.el.classList.add("mode-fullscreen")
        this.player.events.trigger("fullscreen")
      } else {
        this.player.template.el.classList.remove("mode-fullscreen")
        this.player.events.trigger("fullscreen_exit")
      }
    }
    this.el.addEventListener("fullscreenchange", fullScreenChangeHandler)
    this.el.addEventListener("webkitfullscreenchange", fullScreenChangeHandler)
    this.el.addEventListener("mozfullscreenchange", fullScreenChangeHandler)
    this.el.addEventListener("msfullscreenchange", fullScreenChangeHandler)
  }

  /** 进入全屏模式 */
  enter() {
    if (this.value) return
    const el: any = this.el
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen()
    } else if (el.webkitEnterFullscreen) {
      // Safari for iOS
      el.webkitEnterFullscreen()
    } else if (el.webkitEnterFullScreen) {
      el.webkitEnterFullScreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    }
  }

  /** 退出全屏模式 */
  exit() {
    if (!this.value) return
    const doc: any = document
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen()
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen()
    } else if (doc.webkitExitFullScreen) {
      doc.webkitExitFullScreen()
    } else if ((this.el as any).msExitFullscreen!) {
      ;(this.el as any).msExitFullscreen()
    }
  }

  /** 是否处于全屏模式 */
  get value(): boolean {
    return !!(getFullscreenElement() == this.el)
  }
}
