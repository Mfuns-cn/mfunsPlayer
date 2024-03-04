import { html, render } from "lit-html";
import { SliderVertical } from "@/components";
import Player from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-volume">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-volume"></i>
      <i class="mpicon-volume-off"></i>
    </div>

    <div class="${classPrefix}-controls-panel-wrap">
      <div class="${classPrefix}-controls-panel">
        <div class="${classPrefix}-button-volume-value">0</div>
        <div class="${classPrefix}-button-volume-slider"></div>
      </div>
    </div>
  </div>
`;

export default class ButtonVolume extends ControlsPlugin {
  static pluginName = "buttonVolume";
  name = "volume";
  $icon: HTMLElement;
  $slider: HTMLElement;
  $value: HTMLElement;
  slider!: SliderVertical;

  constructor(player: Player) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, fragment.querySelector(`.${classPrefix}-controls-button`)!);
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$slider = this.$(`.${classPrefix}-button-volume-slider`)!;
    this.$value = this.$(`.${classPrefix}-button-volume-value`)!;
  }

  init() {
    this.slider = new SliderVertical({
      container: this.$slider,
      min: 0,
      max: 100,
      step: 1,
      value: this.player.volume * 100,
      onChange: (value) => {
        this.$value.innerText = value.toString();
      },
      onDrag: (value) => {
        this.player.setVolume(value / 100);
      },
      onDragStart: (value) => {
        if (this.player.muted && value != 0) {
          this.player.setMuted(false);
        }
        this.$el.classList.add("is-control");
        this.player.isControlled = true;
      },
      onDragEnd: () => {
        this.$el.classList.remove("is-control");
        this.player.isControlled = false;
      },
    });
    this.player.on("volumechange", (value: number, muted: boolean) => {
      if (muted) {
        this.$el.classList.add("is-muted");
        this.slider.setValue(0);
      } else {
        this.$el.classList.remove("is-muted");
        this.slider.setValue(Math.round(value * 100));
      }
      if (value == 0) {
        this.$el.classList.add("is-muted");
      }
    });
    this.$icon.addEventListener("click", () => {
      if (this.player.muted || this.player.volume == 0) {
        if (this.player.volume == 0) {
          this.player.setVolume(0.1);
        }
        this.player.setMuted(true);
      } else {
        this.player.setMuted(false);
      }
    });
  }
}
