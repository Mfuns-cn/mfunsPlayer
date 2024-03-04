import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-next is-autohide is-disabled">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-next"></i>
    </div>
    <div class="mpui-tooltip">下一P</div>
  </div>
`;

declare module "@core" {
  interface PlayerOptions {
    /** 视频切换按钮 */
    switchButton?: {
      /** 自动隐藏按钮，默认值为false */
      autoHide?: boolean;
      /** 只有一个视频时，隐藏所有切换按钮，默认值为true */
      singleHide?: boolean;
    };
  }
}

export default class ButtonNext extends ControlsPlugin {
  static pluginName = "buttonNext";
  $icon: HTMLElement;
  $tooltip: HTMLElement;
  name = "next";

  /** 只有单个视频时，隐藏所有切换按钮 */
  singleHide: boolean = true;

  constructor(player: Player) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, fragment.querySelector(`.${classPrefix}-controls-button`)!);

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$tooltip = this.$(".mpui-tooltip")!;
  }

  apply(player: Player, options: PlayerOptions): void {
    super.apply(player, options);
    this.singleHide = options.switchButton?.singleHide ?? true;
  }

  init(player: Player) {
    this.$icon.addEventListener("click", () => {
      this.player.next();
    });
    this.player.on("videoChange", (info) => {
      const { hasNext, hasPrev } = info;
      this.setDisabled(!hasNext);
      this.$el.classList.toggle("is-hidden", this.singleHide && !hasPrev && !hasNext);
    });
  }

  setDisabled(flag: boolean) {
    this.$el.classList.toggle("is-disabled", flag);
  }
  /** 自动隐藏上一个/下一个按钮 */
  setAutoHide(flag: boolean) {
    this.$el.classList.toggle("is-autohide", flag);
  }
  get disabled() {
    return this.$el.classList.contains("is-disabled");
  }
}
