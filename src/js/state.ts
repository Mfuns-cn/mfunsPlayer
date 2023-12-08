import { debounce } from "@/utils/index";
import Player from "@/player";
import { PlayerOptions } from "@/types";

export default class State {
  player: Player;

  /** 播放器聚焦状态，在点选播放器后聚焦 */
  focused = false;
  /** 播放器活跃状态 */
  active = false;
  /** 播放器控制状态 */
  controlled = false;
  /** 播放器鼠标活跃状态，鼠标在播放器区域内移动时活跃 */
  mousemove = false;

  activeTime: number;

  constructor(player: Player, options: PlayerOptions) {
    this.player = player;
    this.activeTime = options.activeTime ?? 3000;
    this.init();
  }
  focus() {
    if (this.focused) return;
    this.focused = true;
    this.player.$el.classList.add("state-focus");
    this.player.emit("focus");
  }
  blur() {
    if (!this.focused) return;
    this.focused = false;
    this.player.$el.classList.remove("state-focus");
    this.player.emit("blur");
  }
  init() {
    // 播放器聚焦
    document.addEventListener(
      "click",
      () => {
        this.blur();
      },
      true
    );
    this.player.$el.addEventListener(
      "click",
      () => {
        this.focus();
      },
      true
    );
    // 播放器活跃
    const debounceRemoveActive = debounce(() => {
      this.mousemove = false;
      this.removeActive();
    }, this.activeTime);
    this.player.$main.addEventListener("mousemove", () => {
      this.mousemove = true;
      this.setActive();
      debounceRemoveActive();
    });
    this.player.$main.addEventListener("mouseleave", () => {
      this.mousemove = false;
      this.removeActive();
    });
  }
  /** 设置播放器活跃状态 */
  public setActive() {
    if (this.active) return;
    this.player.$el.classList.add("state-active");
    this.active = true;
    this.player.emit("active");
  }
  /** 试图移除播放器活跃状态 */
  public removeActive() {
    if (!this.active || this.mousemove || this.controlled) return;
    this.player.hook.call("inactive").then((res) => {
      if (!res) return;
      this.player.$el.classList.remove("state-active");
      this.active = false;
      this.player.emit("inactive");
    });
  }
}

/**
 * 活跃状态Active判定:
 * - 鼠标位于播放器主体范围内并持续移动，超过一定时间不移动或移出区域会取消Active状态
 * - 鼠标位于控制栏/顶栏区域
 * - 控制栏处于正在控制状态
 */
