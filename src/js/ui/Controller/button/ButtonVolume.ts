import { html, render } from "lit-html"
import { SliderVertical } from "@/ui/components"
import MfunsPlayer from "@/player"
import { classPrefix } from "@/const"

const template = () => html`
  <div class="${classPrefix}-controller-button ${classPrefix}-controller-volume">
    <div class="${classPrefix}-controller-icon-wrap">
      <i class="${classPrefix}-controller-icon mp-icon-volume"></i>
      <i class="${classPrefix}-controller-icon mp-icon-volume-off"></i>
    </div>

    <div class="${classPrefix}-controller-panel-wrap">
      <div class="${classPrefix}-controller-panel">
        <div class="${classPrefix}-controller-volume-text">0</div>
        <div class="${classPrefix}-controller-volume-slider"></div>
      </div>
    </div>
  </div>
`

export default class ButtonVolume {
  player: MfunsPlayer
  el: HTMLElement
  $iconWrap: HTMLElement
  $slider: HTMLElement
  $text: HTMLElement
  slider!: SliderVertical

  constructor(player: MfunsPlayer, container: HTMLElement) {
    this.player = player
    const fragment = new DocumentFragment()
    render(template(), fragment)
    this.el = fragment.querySelector(`.${classPrefix}-controller-button`)!
    this.$iconWrap = fragment.querySelector(`.${classPrefix}-controller-icon-wrap`)!
    this.$slider = fragment.querySelector(`.${classPrefix}-controller-volume-slider`)!
    this.$text = fragment.querySelector(`.${classPrefix}-controller-volume-text`)!
    this.init()
    container.appendChild(fragment)
  }

  private init() {
    this.slider = new SliderVertical({
      container: this.$slider,
      min: 0,
      max: 100,
      step: 1,
      value: this.player.video.el.volume * 100,
      onChange: (value) => {
        this.$text.innerText = value.toString()
      },
      onDrag: (value) => {
        this.player.volume(value / 100)
      },
      onDragStart: (value) => {
        if (this.player.video.el.muted && value != 0) {
          this.player.mute(false)
        }
        this.el.classList.add("state-control")
        this.player.controller.setControl(true)
      },
      onDragEnd: () => {
        this.el.classList.remove("state-control")
        this.player.controller.setControl(false)
      },
    })
    this.player.on("volume_change", (value: number) => {
      if (this.player.video.muted) {
        this.el.classList.add("state-muted")
        this.slider.setValue(0)
      } else {
        this.el.classList.remove("state-muted")
        this.slider.setValue(Math.round(value * 100))
      }
      if (value == 0) {
        this.el.classList.add("state-muted")
      }
    })
    this.$iconWrap.addEventListener("click", () => {
      if (this.player.video.el.muted || this.player.video.el.volume == 0) {
        if (this.player.video.el.volume == 0) {
          this.player.video.el.volume = 0.1
        }
        this.player.mute(false)
      } else {
        this.player.mute(true)
      }
    })
  }
}
