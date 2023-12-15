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
  /** 播放器相交状态 */
  intersecting = true;
  /** 播放器鼠标活跃状态，鼠标在播放器区域内移动时活跃 */
  mousemove = false;

  activeTime: number;

  resizeObserver?: ResizeObserver;

  intersectionObserver?: ResizeObserver;

  constructor(player: Player, options: PlayerOptions) {
    this.player = player;
    this.activeTime = options.activeTime ?? 3000;
    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(([item]) => {
        const { width, height } = item.contentRect;
        this.player.emit("resize", [width, height]);
      });
    }
    if (window.IntersectionObserver) {
      this.intersectionObserver = new window.IntersectionObserver(([item]) => {
        const { isIntersecting } = item;
        this.intersecting = isIntersecting;
        this.player.emit("intersection", isIntersecting);
      });
    }
    this.player.once("mounted", () => {
      this.resizeObserver?.observe(this.player.$el);
      this.intersectionObserver?.observe(this.player.$el);
    });
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
    this.player.on("video_change", () => {
      this.player.$el.classList.add("state-start");
    });
    this.player.on("play", () => {
      this.player.$el.classList.remove("state-start");
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
