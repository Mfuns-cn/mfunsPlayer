import utils from "./utils";
// import Thumbnails from './thumbnails';
// import Icons from './icons';

class Controller {
  constructor(player) {
    this.player = player;
    this.template = player.template;
    this.video = player.video;
    this.autoHideTimer = null;
    this.volumeHideTimer = null;
    this.isSetVolume = false;
    this.isControl = false;
    this.clickFlag = 0;
    this.controllTimer = null;
    this.showDanmaku = player.showDanmaku;
    this.player.template.videoWrap.addEventListener("mousemove", () => {
      this.setAutoHide();
    });

    this.isControllerfocus();
    this.initPlayButton();
    if (player.options.dragable) {
      this.initPlayedBar();
    }
    if (player.options.danmaku) {
      this.initDanmakuButton();
    }
    this.initVolumeButton();
    this.initFullButton();
    this.initTroggle();
    this.initSpeedButton();
  }
  isControllerfocus() {
    this.template.controller.onmouseenter = () => {
      this.isControl = true;
    };
    this.template.controller.onmouseleave = () => {
      this.isControl = false;
    };
  }
  initPlayButton() {
    if (this.player.videoLoaded) {
      this.template.videoWrap.addEventListener("click", () => this.handleClick());
      this.template.player_btn.addEventListener("click", () => this.player.toggle());
    }
  }
  handleClick() {
    if (!this.isControl && !this.player.isShowMenu) {
      this.player.toggle();
    } else {
      this.player.isShowMenu = false;
    }
  }
  initPlayedBar() {
    const thumbMove = (e) => {
      this.isControl = true;
      let percentage =
        ((e.clientX || e.changedTouches[0].clientX) -
          utils.getBoundingClientRectViewLeft(this.player.template.barWrap)) /
        this.player.template.barWrap.clientWidth;
      percentage = Math.max(percentage, 0);
      percentage = Math.min(percentage, 1);
      this.player.bar.set("played", percentage, "width");
      this.player.template.barTime.innerHTML = utils.secondToTime(percentage * this.player.video.duration);
      this.player.template.currentTime.innerHTML = utils.secondToTime(percentage * this.player.video.duration) + " /";
    };

    const thumbUp = (e) => {
      this.player.unableTimeupdate = false;

      document.removeEventListener(utils.nameMap.dragEnd, thumbUp);
      document.removeEventListener(utils.nameMap.dragMove, thumbMove);
      let percentage =
        ((e.clientX || e.changedTouches[0].clientX) -
          utils.getBoundingClientRectViewLeft(this.player.template.barWrap)) /
        this.player.template.barWrap.clientWidth;
      percentage = Math.max(percentage, 0);
      percentage = Math.min(percentage, 1);
      this.player.template.currentTime.innerHTML = utils.secondToTime(percentage * this.player.video.duration) + " /";
      this.player.bar.set("played", percentage, "width");
      this.player.seek(this.player.bar.get("played") * this.player.video.duration);
      setTimeout(() => {
        this.isControl = false;
      }, 50);
    };
    this.player.template.barWrap.addEventListener(utils.nameMap.dragStart, () => {
      // this.player.timer.disable("progress");
      document.addEventListener(utils.nameMap.dragMove, thumbMove);
      document.addEventListener(utils.nameMap.dragEnd, thumbUp);
      this.player.unableTimeupdate = true;
    });

    this.player.template.barWrap.addEventListener(utils.nameMap.dragMove, (e) => {
      if (this.player.video.duration) {
        const px = this.player.template.barWrap.getBoundingClientRect().left;
        const tx = (e.clientX || e.changedTouches[0].clientX) - px;
        if (tx < 0 || tx > this.player.template.barWrap.offsetWidth) {
          return;
        }
        const time = this.player.video.duration * (tx / this.player.template.barWrap.offsetWidth);
        // if (utils.isMobile) {
        //   this.thumbnails && this.thumbnails.show();
        // }
        // this.thumbnails && this.thumbnails.move(tx);
        this.player.template.barTime.style.left = `${tx - (time >= 3600 ? 25 : 20)}px`;
        this.player.template.barTime.style.display = "block";
        this.player.template.barTime.innerText = utils.secondToTime(time);
        this.player.template.barTime.classList.remove("hidden");
        // 防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      }
    });

    this.player.template.barWrap.addEventListener(utils.nameMap.dragEnd, () => {
      this.player.unableTimeupdate = false;
    });

    this.player.template.barWrap.addEventListener("mouseenter", () => {
      if (this.player.video.duration) {
        // this.thumbnails && this.thumbnails.show();
        this.player.template.barTime.classList.remove("hidden");
        this.player.template.thumb.classList.remove("hidden");
      }
    });
    this.player.template.barWrap.addEventListener("mouseleave", () => {
      if (this.player.video.duration) {
        // this.thumbnails && this.thumbnails.hide();
        this.player.template.barTime.classList.add("hidden");
        this.player.template.thumb.classList.add("hidden");
      }
    });
  }

  initFullButton() {
    this.player.template.browserFullButton.addEventListener("click", () => {
      // window.removeEventListener("resize");
      this.player.fullScreen.toggle("browser");
      this.player.resize();
    });
    this.player.template.webFullButton.addEventListener("click", () => {
      this.player.fullScreen.toggle("web");
      this.player.resize();
    });
  }
  initSquirtleButton() {
    for (let i = 0; i < this.player.template.speedItem.length; i++) {
      this.player.template.speedItem[i].addEventListener("click", () => {
        const currentSpeed = this.player.template.speedItem[i].dataset.speed;
        this.player.speed(currentSpeed);
        this.player.template.speedItem[i].classList.add("focus");
        this.player.template.speedInfo.innerHTML = currentSpeed !== "1.0" ? currentSpeed + "x" : "倍速";

        this.player.template.speedItem.forEach((element, index) => {
          if (index !== i) {
            element.classList.remove("focus");
          }
        });
      });
    }
  }
  initSpeedButton() {
    for (let i = 0; i < this.player.template.speedItem.length; i++) {
      this.player.template.speedItem[i].addEventListener("click", () => {
        const currentSpeed = this.player.template.speedItem[i].dataset.speed;
        this.player.speed(currentSpeed);
        this.player.template.speedItem[i].classList.add("focus");
        this.player.template.speedInfo.innerHTML = currentSpeed !== "1.0" ? currentSpeed + "x" : "倍速";

        this.player.template.speedItem.forEach((element, index) => {
          if (index !== i) {
            element.classList.remove("focus");
          }
        });
      });
    }
  }
  initVolumeButton() {
    const vHeight = 60;

    const volumeMove = (event) => {
      const e = event || window.event;
      this.isControl = true;
      this.player.template.volumeMask.classList.add("show");
      let rg = (e.clientY || e.changedTouches[0].clientY) - utils.getElementViewTop(this.player.template.volumeBar);
      const percentage = (vHeight - rg) / vHeight;
      this.player.volume(percentage);

      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    };
    const volumeUp = (event) => {
      this.player.template.volumeMask.classList.remove("show");
      document.removeEventListener(utils.nameMap.dragEnd, volumeUp);
      document.removeEventListener(utils.nameMap.dragMove, volumeMove);
      if (!this.player.template.volumeMask.classList.contains("show")) {
        setTimeout(() => {
          this.isControl = false;
        }, 150);
      }
    };
    this.player.template.volumeBar.addEventListener("click", (event) => {
      const e = event || window.event;
      let rg = (e.clientY || e.changedTouches[0].clientY) - utils.getElementViewTop(this.player.template.volumeBar);
      const percentage = (vHeight - rg) / vHeight;
      this.player.volume(percentage);
    });
    this.player.template.volumeBar.addEventListener(utils.nameMap.dragStart, (event) => {
      document.addEventListener(utils.nameMap.dragMove, volumeMove);
      document.addEventListener(utils.nameMap.dragEnd, volumeUp);
    });
    this.player.template.volumeMask.addEventListener("click", (event) => {
      window.event ? (window.event.cancelBubble = true) : event.stopPropagation();
    });
    this.player.template.volumeIcon.addEventListener("click", (event) => {
      if (this.player.video.muted) {
        this.player.video.muted = false;
        if (this.video.volume) this.player.template.volumeIcon.classList.remove("volume-icon-off");
        this.player.bar.set("volume", this.video.volume - 0.2, "height");
        this.template.volumeNum.innerHTML = `${(this.video.volume * 100).toFixed(0)}`;
      } else {
        this.player.video.muted = true;
        this.player.template.volumeIcon.classList.add("volume-icon-off");
        this.player.bar.set("volume", 0, "height");
        this.template.volumeNum.innerHTML = "0";
      }
    });
  }
  initDanmakuButton() {
    this.player.template.danmakuButton.addEventListener("click", () => {
      this.showDanmaku = !this.showDanmaku;
      this.player.danmaku.showing = this.showDanmaku;
      if (this.showDanmaku) {
        this.player.template.danmakuButton.classList.add("open");
        this.player.template.danmakuButton.classList.remove("close");
        this.player.danmaku.show();
      } else {
        this.player.template.danmakuButton.classList.add("close");
        this.player.template.danmakuButton.classList.remove("open");
        this.player.danmaku.hide();
      }
    });
  }
  initTroggle() {
    if (this.player.template.troggle) {
      this.player.template.troggle.addEventListener("click", () => {
        if (!document.pictureInPictureElement) {
          //开启
          this.video.requestPictureInPicture().catch((error) => {
            console.log(error, "Video failed to enter Picture-in-Picture mode.");
          });
        } else {
          //关闭
          // this.player.pause();
          document.exitPictureInPicture().catch((error) => {
            console.log(error, "Video failed to leave Picture-in-Picture mode.");
          });
        }
      });
    }
  }
  setAutoHide(delay = 1500) {
    this.show();
    clearTimeout(this.autoHideTimer);
    this.autoHideTimer = setTimeout(() => {
      if (this.video.played.length && !this.isControl && !this.video.paused) {
        this.hide();
      }
    }, delay);
  }

  show() {
    this.player.container.classList.remove("mfunsPlayer-hide-controller");
    this.template.controllerMask.style.cursor = "default";
    this.template.controllerMask.classList.remove("hide");
    this.template.headBar.classList.remove("hide");
  }

  hide() {
    this.player.container.classList.add("mfunsPlayer-hide-controller");
    this.template.controllerMask.style.cursor = "none";
    this.template.controllerMask.classList.add("hide");
    this.template.headBar.classList.add("hide");
  }

  isShow() {
    return !this.player.container.classList.contains("mfunsPlayer-controller-hide");
  }

  toggle() {
    if (this.isShow()) {
      this.hide();
    } else {
      this.show();
    }
  }

  destroy() {
    clearTimeout(this.autoHideTimer);
  }
}

export default Controller;
