import Player from "@/player";

export default class ModePip {
  player: Player;

  video: HTMLVideoElement;

  constructor(player: Player) {
    this.player = player;
    this.video = this.player.video.el;

    this.video.addEventListener("enterpictureinpicture", () => {
      this.player.template.el.classList.add("mode-pip");
      this.player.events.trigger("pip");
    });
    this.video.addEventListener("leavepictureinpicture", () => {
      this.player.template.el.classList.remove("mode-pip");
      this.player.events.trigger("pip_exit");
    });
  }

  /** 进入画中画模式 */
  enter() {
    if (this.value) return;
    this.video.requestPictureInPicture();
  }

  /** 退出画中画模式 */
  exit() {
    if (!this.value) return;
    document.exitPictureInPicture();
  }

  /** 是否已进入画中画模式 */
  get value(): boolean {
    return !!(document.pictureInPictureElement == this.video);
  }
}
