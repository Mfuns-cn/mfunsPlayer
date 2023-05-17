import { classPrefix } from "@/const"
import MfunsPlayer from "@/player"
import { PlayerOptions } from "@/types"
import { html, render } from "lit-html"

const template = (list: MenuItem[]) => html`
  <ul class="${classPrefix}-contextmenu">
    ${list.map(
      ({ name, onClick }) => html`
        <li class="${classPrefix}-contextmenu-item" @click=${onClick}>${name}</li>
      `
    )}
  </ul>
`

interface MenuItem {
  name: string
  onClick?: () => void
}

export default class ContextMenu {
  player: MfunsPlayer
  container: HTMLElement
  el: HTMLElement
  private isShow = false
  constructor(player: MfunsPlayer, options: PlayerOptions) {
    this.player = player

    const menuList: MenuItem[] = [
      {
        name: "快捷键说明",
        onClick: () => {
          this.player.modal.show("hotkey")
        },
      },
      {
        name: `Mfuns Player v${MfunsPlayer.version}-${MfunsPlayer.gitHash}`,
        onClick: () => {
          this.player.modal.show("about")
        },
      },
    ]

    this.container = this.player.template.$contextmenuWrap
    render(template(menuList), this.container)
    this.el = this.container.querySelector(`.${classPrefix}-contextmenu`)!

    this.player.template.$videoArea.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault()
      const clientRect = this.player.template.$videoArea.getBoundingClientRect()
      this.show(e.clientX - clientRect.left, e.clientY - clientRect.top)
    })
    this.container.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault()
      const clientRect = this.container.getBoundingClientRect()
      this.show(e.clientX - clientRect.left, e.clientY - clientRect.top)
    })
    document.addEventListener("click", () => {
      if (this.isShow) {
        this.hide()
      }
    })
  }
  show(x: number, y: number) {
    this.container.classList.add("state-show")
    const clientRect = this.player.template.$videoArea.getBoundingClientRect()
    if (x + this.el.offsetWidth >= clientRect.width) {
      this.el.style.right = clientRect.width - x + "px"
      this.el.style.left = "initial"
    } else {
      this.el.style.left = x + "px"
      this.el.style.right = "initial"
    }
    if (y + this.el.offsetHeight >= clientRect.height) {
      this.el.style.bottom = clientRect.height - y + "px"
      this.el.style.top = "initial"
    } else {
      this.el.style.top = y + "px"
      this.el.style.bottom = "initial"
    }
    this.isShow = true
  }
  hide() {
    this.container.classList.remove("state-show")
    this.isShow = false
  }
}
