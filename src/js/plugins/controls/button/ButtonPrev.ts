import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div
    class="${classPrefix}-controls-button ${classPrefix}-button_prev state-autohide state-disabled"
  >
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-prev"></i>
    </div>
    <div class="mpui-tooltip">上一P</div>
  </div>
`;

declare module "@/types" {
  interface PlayerOptions {
    /** 视频切换按钮 */
    switchButton?: {
      /** 自动隐藏按钮，默认值为false */
      autoHide?: boolean;
      /** 只有一个视频时，隐藏所有按钮，默认值为true */
      singleHide?: boolean;
    };
  }
}

export default class ButtonPrev extends ControlsPlugin {
  static pluginName = "buttonPrev";
  $icon: HTMLElement;
  $tooltip: HTMLElement;

  readonly singleHide;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonPrev",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$left,
        order: 0,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });
    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
    this.singleHide = options.switchButton?.singleHide ?? true;
  }

  created() {
    this.$icon.addEventListener("click", () => {
      this.player.prev();
    });
    this.player.on("video_change", () => {
      this.player.hook.call("hasPrev", void 0, false).then((res) => {
        this.setDisabled(!res);
        if (this.singleHide && !res) {
          this.player.hook.call("hasNext", void 0, false).then((res) => {
            this.$el.classList.toggle("state-hidden", !res);
          });
        } else {
          this.$el.classList.remove("state-hidden");
        }
      });
    });
  }
  public setDisabled(flag: boolean) {
    this.$el.classList.toggle("state-disabled", flag);
  }
  /** 自动隐藏上一个/下一个按钮 */
  setAutoHide(flag: boolean) {
    this.$el.classList.toggle("state-autohide", flag);
  }
  get disabled() {
    return this.$el.classList.contains("state-disabled");
  }
}
