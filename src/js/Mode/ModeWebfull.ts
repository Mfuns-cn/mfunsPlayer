import Player from "@/player";

export default class ModeWebfull {
  player: Player;

  el: HTMLElement;

  constructor(player: Player) {
    this.player = player;
    this.el = this.player.template.el;
  }

  /** 进入网页全屏 */
  enter() {
    this.el.classList.add("mode-webfull");
    this.player.events.trigger("webfull");
  }

  /** 退出网页全屏 */
  exit() {
    this.el.classList.remove("mode-webfull");
    this.player.events.trigger("webfull_exit");
  }

  /** 是否处于网页全屏模式 */
  get value(): boolean {
    return this.el.classList.contains("mode-webfull");
  }
}
