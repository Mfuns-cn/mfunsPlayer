import Player from "@/player";

export default class Webfull {
  player: Player;

  $el: HTMLElement;

  constructor(player: Player) {
    this.player = player;
    this.$el = this.player.$el;
  }

  /** 进入网页全屏 */
  enter() {
    this.$el.classList.add("state-webfull");
    this.player.emit("webfull_enter");
  }

  /** 退出网页全屏 */
  exit() {
    this.$el.classList.remove("state-webfull");
    this.player.emit("webfull_exit");
  }

  /** 是否处于网页全屏模式 */
  get status(): boolean {
    return this.$el.classList.contains("state-webfull");
  }
}
