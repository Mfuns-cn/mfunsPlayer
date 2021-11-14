export default class HotKey {
  constructor(player) {
    window.onresize = () => {
      if (!this.checkFull()) {
        player.fullScreen.cancel("browser");
      } else {
      }
    };
    if (player.options.hotkey) {
      document.addEventListener("keydown", (e) => {
        if (player.focus) {
          const tag = document.activeElement.tagName.toUpperCase();
          const editable = document.activeElement.getAttribute("contenteditable");
          if (tag !== "INPUT" && tag !== "TEXTAREA" && editable !== "" && editable !== "true") {
            const event = e || window.event;
            let percentage;
            switch (event.keyCode) {
              case 32:
                event.preventDefault();
                player.toggle();
                break;
              case 37:
                event.preventDefault();
                if (!player.options.dragable) {
                  break;
                }
                player.seek(player.video.currentTime - 5);
                player.controller.setAutoHide();
                break;
              case 39:
                event.preventDefault();
                if (!player.options.dragable) {
                  break;
                }
                player.seek(player.video.currentTime + 5);
                player.controller.setAutoHide();
                break;
              case 38:
                event.preventDefault();
                percentage = player.volume() + 0.1;
                player.volume(percentage);
                break;
              case 40:
                event.preventDefault();
                percentage = player.volume() - 0.1;
                player.volume(percentage);
                break;
            }
          }
        }
      });
    }
  }
  checkFull() {
    let isFull = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    if (isFull === undefined) isFull = false;
    return isFull;
  }
}
