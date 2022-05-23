export default class HotKey {
  constructor(player) {
    window.onresize = () => {
      if (!player.fullScreen.isFullScreen("browser") && !player.fullScreen.isFullScreen("web")) {
        player.fullScreen.cancel("browser");
        const danmakuRoot = player.template.danmakuRoot;
        if ([...player.template.controllerWrap.childNodes].indexOf(danmakuRoot) > -1) {
          player.template.controllerWrap.removeChild(danmakuRoot);
          player.template.footBar.appendChild(danmakuRoot);
        }
      }
    };
    if (player.options.hotkey) {
      document.addEventListener("keydown", (e) => {
        console.log(e);
        if (player.focus) {
          const tag = document.activeElement.tagName.toUpperCase();
          const editable = document.activeElement.getAttribute("contenteditable");
          if (tag !== "INPUT" && tag !== "TEXTAREA" && editable !== "" && editable !== "true") {
            const event = e || window.event;
            let percentage;
            switch (event.keyCode) {
              case 27:
                player.fullScreen.cancel("web");
                break;
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
