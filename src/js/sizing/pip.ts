import Player from "@/player";

export default class Pip {
  player: Player;

  constructor(player: Player) {
    this.player = player;

    this.player.on("enterpictureinpicture", () => {
      this.player.$el.classList.add("state-pip");
      this.player.emit("pip_enter");
    });
    this.player.on("leavepictureinpicture", () => {
      this.player.$el.classList.remove("state-pip");
      this.player.emit("pip_exit");
    });
  }

  /** 进入画中画模式 */
  enter() {
    if (this.status) return;
    this.player.$video.requestPictureInPicture();
  }

  /** 退出画中画模式 */
  exit() {
    if (!this.status) return;
    document.exitPictureInPicture();
  }

  /** 是否已进入画中画模式 */
  get status(): boolean {
    return !!(document.pictureInPictureElement == this.player.$video);
  }
}
