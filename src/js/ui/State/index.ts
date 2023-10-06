import { classPrefix } from "@/const";
import { debounce } from "@/utils/index";
import Player from "@/player";
import { PlayerOptions } from "@/types";
import { html, render } from "lit-html";

const template = () => html`
  <div class="${classPrefix}-state-loading"></div>
  <div class="${classPrefix}-state-volume"></div>
  <div class="${classPrefix}-state-paused"></div>
`;
export default class State {
  player: Player;
  container: HTMLElement;
  $stateLoading: HTMLElement;
  $stateVolume: HTMLElement;
  $statePaused: HTMLElement;

  /** 播放器聚焦状态，在点选播放器后聚焦 */
  focused = false;
  /** 播放器活跃状态 */
  active = false;
  /** 播放器鼠标活跃状态，鼠标在播放器区域内移动时活跃 */
  mousemove = false;

  constructor(player: Player, options: PlayerOptions) {
    this.player = player;
    this.container = player.template.$stateWrap;
    this.$stateLoading = this.container.querySelector(`.${classPrefix}-state-loading`)!;
    this.$stateVolume = this.container.querySelector(`.${classPrefix}-state-volume`)!;
    this.$statePaused = this.container.querySelector(`.${classPrefix}-state-paused`)!;

    render(template(), this.container);
    this.init();
  }
  init() {
    // 播放器聚焦
    document.addEventListener(
      "click",
      () => {
        this.focused = false;
      },
      true
    );
    this.player.template.el.addEventListener(
      "click",
      () => {
        this.focused = true;
      },
      true
    );
    // 播放器活跃
    const debounceRemoveActive = debounce(() => {
      this.mousemove = false;
      this.removeActive();
    }, 3000);
    this.player.template.$main.addEventListener("mousemove", () => {
      this.mousemove = true;
      this.setActive();
      debounceRemoveActive();
    });
    this.player.template.$main.addEventListener("mouseleave", () => {
      this.mousemove = false;
      this.removeActive();
    });
  }
  /** 设置播放器活跃状态 */
  public setActive() {
    if (this.active) return;
    this.player.template.el.classList.add("state-active");
    this.active = true;
  }
  /** 试图移除播放器活跃状态 */
  public removeActive() {
    if (
      !this.active ||
      this.player.controller.isHover ||
      this.player.controller.isControl ||
      this.mousemove
    ) {
      return;
    }
    this.player.template.el.classList.remove("state-active");
    this.active = false;
  }
}

/**
 * 活跃状态Active判定:
 * - 鼠标位于播放器主体范围内并持续移动，超过一定时间不移动或移出区域会取消Active状态
 * - 鼠标位于控制栏/顶栏区域
 * - 控制栏处于正在控制状态
 */
