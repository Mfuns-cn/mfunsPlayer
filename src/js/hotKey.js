export default class HotKey {
  constructor(player) {
    this.template = player.template;
    this.container = player.template.hotkeyPanel;
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
        if (player.focus) {
          const tag = document.activeElement.tagName.toUpperCase();
          const editable = document.activeElement.getAttribute("contenteditable");
          const event = e || window.event;
          if (event.keyCode === 13) {
            const danmakuText = player.template.danmakuText.value;
            if (danmakuText.trim()) {
              player.danmaku.send({
                size: player.controller.danmakuFontsize,
                type: player.controller.danmakuType,
                color: player.controller.danmakuColor,
                text: danmakuText,
              });
              player.template.danmakuText.value = "";
              player.template.danmakuText.blur();
            }
          }
          if (tag !== "INPUT" && tag !== "TEXTAREA" && editable !== "" && editable !== "true") {
            let percentage;
            console.log(event.keyCode);
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
                if (!player.options.draggable) {
                  break;
                }
                player.seek(player.video.currentTime - 5);
                player.controller.setAutoHide();
                break;
              case 39:
                event.preventDefault();
                if (!player.options.draggable) {
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
              case 68:
                event.preventDefault();
                player.danmaku.toggle();
                break;
              case 70:
                event.preventDefault();
                player.fullScreen.toggle("browser");
                break;
              case 77:
                event.preventDefault();
                const videoVolume = player.volume();
                if (player.video.muted) {
                  player.volume(videoVolume);
                } else {
                  player.video.muted = true;
                  player.template.volumeIcon.classList.add("button-volume-off");
                  player.controller.components.volumeSlider.change(0);
                }
                break;
              case 188:
                player.switchVideo(player.currentVideo - 1);
                break;
              case 190:
                player.switchVideo(player.currentVideo + 1);
                break;
            }
          }
        }
      });
      this.template.hotkeyPanel.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      this.template.hotkeyPanelClose.addEventListener("click", (e) => {
        e.stopPropagation();
        this.hide();
      });
    }
  }
  show() {
    this.container.classList.remove("mfunsPlayer-hotkey-panel-hide");
  }

  hide() {
    this.container.classList.add("mfunsPlayer-hotkey-panel-hide");
  }
  triggle() {
    if (this.container.classList.contains("mfunsPlayer-hotkey-panel-hide")) {
      this.show();
    } else {
      this.hide();
    }
  }
}
