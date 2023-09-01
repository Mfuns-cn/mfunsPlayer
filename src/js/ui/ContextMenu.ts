import { classPrefix } from "@/const"
import MfunsPlayer from "@/player"
import { DanmakuApiOptions, DanmakuItem, PlayerOptions } from "@/types"
import { html, render } from "lit-html"

const template = (list: MenuItem[]) => html`
  <div class="${classPrefix}-contextmenu">
    <ul class="${classPrefix}-contextmenu-danmaku"></ul>
    <ul class="${classPrefix}-contextmenu-menu">
      ${list.map(
        ({ name, onClick }) => html`
          <li class="${classPrefix}-contextmenu-item" @click=${onClick}>${name}</li>
        `
      )}
    </ul>
  </div>
`
const templateDanmaku = (
  danmaku: DanmakuItem[],
  operation: (dm: DanmakuItem) => ({ name: string; onClick: (dm: DanmakuItem) => void } | null)[]
) => html`
  ${danmaku.map(
    (dm) => html`
      <li class="${classPrefix}-contextmenu-danmaku-item">
        <div class="${classPrefix}-contextmenu-danmaku-item-content">${dm.content}</div>
        <div class="${classPrefix}-contextmenu-danmaku-item-operate">
          ${operation(dm).map((op) =>
            op
              ? html`<div
                  class="${classPrefix}-contextmenu-danmaku-item-operate-btn"
                  @click=${() => {
                    op.onClick(dm)
                  }}
                >
                  ${op.name}
                </div>`
              : ""
          )}
        </div>
      </li>
    `
  )}
`

const copyClip = (content: string) => {
  navigator.clipboard.writeText(content).then(
    (res) => {
      // success
    },
    (rej) => {
      // fail
    }
  )
}

interface MenuItem {
  name: string
  onClick?: () => void
}

export default class ContextMenu {
  player: MfunsPlayer
  container: HTMLElement
  el: HTMLElement
  $danmaku: HTMLElement
  $menu: HTMLElement
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
    this.$danmaku = this.el.querySelector(`.${classPrefix}-contextmenu-danmaku`)!
    this.$menu = this.el.querySelector(`.${classPrefix}-contextmenu-menu`)!
    this.player.template.$videoArea.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault()
      const clientRect = this.player.template.$videoArea.getBoundingClientRect()
      const x = e.clientX - clientRect.left
      const y = e.clientY - clientRect.top
      this.show(x, y)
      const captured = this.player.danmaku.engine.captureDanmaku(x, y, 4)
      this.showDanmaku(captured)
    })
    this.container.addEventListener("contextmenu", (e: MouseEvent) => {
      e.preventDefault()
      const clientRect = this.container.getBoundingClientRect()
      const x = e.clientX - clientRect.left
      const y = e.clientY - clientRect.top
      this.show(x, y)
      const captured = this.player.danmaku.engine.captureDanmaku(x, y, 4)
      this.showDanmaku(captured)
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
  showDanmaku(danmaku: DanmakuItem[]) {
    const api = this.player.danmaku.api
    const operate = this.player.danmaku.operate
    if (danmaku.length) {
      this.$danmaku.style.display = ""
    } else {
      this.$danmaku.style.display = "none"
    }
    render(
      templateDanmaku(danmaku, (dm) => {
        const myDanmaku = dm.user == this.player.userId
        return [
          !myDanmaku && api.report
            ? {
                name: "举报",
                onClick: (dm) => {
                  operate.report(dm)
                },
              }
            : null,
          !myDanmaku && api.blockUser
            ? {
                name: "屏蔽",
                onClick: (dm) => {
                  operate.blockUser(dm.user, true)
                },
              }
            : null,
          myDanmaku && api.recall
            ? {
                name: "撤回",
                onClick: (dm) => {
                  operate.recall(dm)
                },
              }
            : null,
          {
            name: "复制",
            onClick: (dm) => {
              copyClip(dm.content)
            },
          },
        ]
      }),
      this.$danmaku
    )
  }
  hide() {
    this.container.classList.remove("state-show")
    this.isShow = false
  }
}
