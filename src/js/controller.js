import { Picker, MultiPicker, Slider, Slider_vertical } from "./components";
import utils from "./utils";
// import Thumbnails from './thumbnails';
// import Icons from './icons';

class Controller {
  constructor(player) {
    const THIS = this
    this.player = player;
    this.template = player.template;
    this.components = player.components;
    this.video = player.video;
    this.autoHideTimer = null;
    this.volumeHideTimer = null;
    this.isSetVolume = false;
    this.isControl = false;
    this.controlLeaved = false;
    this.clickFlag = 0;
    this.controllTimer = null;
    this.showDanmaku = player.showDanmaku;
    this.danmakuFontsize = 22
    this.danmakuType = "right"
    this.danmakuColor = "#FFFFFF"
    this.player.template.videoWrap.addEventListener("mousemove", () => {
      this.setAutoHide();
    });
    this.player.template.controller.addEventListener("click", (event) => {
      window.event ? (window.event.cancelBubble = true) : event.stopPropagation();
    });
    this.isControllerfocus();
    this.initPlayButton();
    if (player.options.dragable) {
      this.initPlayedBar();
      this.initTimeLabel();
    }
    if (player.options.danmaku) {
      this.initDanmakuButton();
      this.initDanmakuSettingsButton();
      this.initDanmakuStyleButton();
    }
    this.initRepeatButton();
    this.initVolumeButton();
    this.initFullButton();
    this.initTroggle();
    this.initSpeedButton();
    this.initPagelistButton();
  }
  isControllerfocus() {
    this.template.controller.onmouseenter = () => {
      this.isControl = true;
      this.controlLeaved = false;
    };
    this.template.controller.onmouseleave = () => {
      this.isControl = false;
      this.controlLeaved = true;
    };
  }
  initPlayButton() {
    this.template.videoWrap.addEventListener("click", () => this.handleClick());
    this.template.play_btn.addEventListener("click", () => this.player.toggle());
  }
  handleClick() {
    console.log("click");
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
      this.player.template.currentTime.innerHTML = utils.secondToTime(percentage * this.player.video.duration);
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
      this.player.template.currentTime.innerHTML = utils.secondToTime(percentage * this.player.video.duration);
      this.player.bar.set("played", percentage, "width");
      this.player.seek(this.player.bar.get("played") * this.player.video.duration);
      setTimeout(() => {
        if (this.controlLeaved) this.isControl = false;
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
  initTimeLabel() {
    this.player.template.time_label.addEventListener("click", () => {
      this.player.template.controllerTime.classList.add("inputting")
      this.player.template.time_input.value = utils.secondToTime(this.player.video.currentTime)
      this.player.template.time_input.focus()
    })
    this.player.template.time_input.addEventListener("blur", () => {
      this.player.template.controllerTime.classList.remove("inputting")
    })
    this.player.template.time_input.addEventListener("keydown", (e) => {
      var e = e || window.event
      if (e.keyCode == 13) {
        this.player.template.video.currentTime = utils.textToSecond(this.player.template.time_input.value)
        //tem.video.play()
        this.player.template.controllerTime.classList.remove('inputting')
        this.player.template.time_input.value = ''
      }
      if (e.keyCode == 27) {
        this.player.template.controllerTime.classList.remove('inputting')
        this.player.template.time_input.value = ''
      }
    })
  }
  initFullButton() {
    this.player.template.fullscreen_btn.addEventListener("click", () => {
      // window.removeEventListener("resize");
      this.player.fullScreen.toggle("browser");
      this.player.resize();
    });
    this.player.template.webfull_btn.addEventListener("click", () => {
      this.player.fullScreen.toggle("web");
      this.player.resize();
    });
  }
  initPagelistButton() {
    for (let i = 0; i < this.player.template.pagelistItem.length; i++) {
      this.player.template.pagelistItem[i].addEventListener("click", (event) => {
        window.event ? (window.event.cancelBubble = true) : event.stopPropagation();
        this.player.switchVideo(i);
      });
    }
    this.player.template.next_btn.addEventListener("click", () => {
      const nextVideo = this.player.currentVideo + 1;
      this.player.switchVideo(nextVideo);
    });
  }

  initSpeedButton() {
    for (let i = 0; i < this.player.template.speedItem.length; i++) {
      this.player.template.speedItem[i].addEventListener("click", (event) => {
        window.event ? (window.event.cancelBubble = true) : event.stopPropagation();
        const currentSpeed = this.player.template.speedItem[i].dataset.speed;
        this.player.speed(currentSpeed);
        this.template.speedItem[i].classList.add("focus");
        this.template.speedInfo.innerHTML = currentSpeed !== "1.0" ? currentSpeed + "x" : "倍速";

        this.template.speedItem.forEach((element, index) => {
          if (index !== i) {
            element.classList.remove("focus");
          }
        });
      });
    }
  }
  initRepeatButton() {
    if(this.video.loop) {
      this.player.template.repeat_btn.classList.add("button-repeat")
      this.player.template.repeat_tip.innerText = "关闭洗脑循环"
    } else {
      this.player.template.repeat_btn.classList.remove("button-repeat")
      this.player.template.repeat_tip.innerText = "洗脑循环"
    }
    this.player.template.repeat_btn.addEventListener("click", () => {
      if(this.video.loop) {
        this.player.template.repeat_btn.classList.remove("button-repeat")
        this.player.template.repeat_tip.innerText = "洗脑循环"
        this.video.loop = false
      } else {
        this.player.template.repeat_btn.classList.add("button-repeat")
        this.player.template.repeat_tip.innerText = "关闭洗脑循环"
        this.video.loop = true
      }
    })
  }
  initVolumeButton() {
    const THIS = this
    this.components.volumeSlider = new Slider_vertical(this.template.volumeBar, 0, 100, 1, this.player.options.volume * 100,{
      start() {   // 开始调节滑动条（点按）
        THIS.isControl = true;
        THIS.template.volumeMask.classList.add("show");
      },
      change(value) {   // 更改进度条值，不修改绑定数据
        THIS.template.volumeNum.innerText = Math.round(value)
      },
      update(value) {   // 更改进度条值，修改绑定数据
        THIS.video.volume = value * 0.01
      },
      end() {       // 结束滑动条调节（松手）
        if (!THIS.template.volumeMask.classList.contains("show")) {
          setTimeout(() => {
            THIS.isControl = false;
          }, 150);
        }
        THIS.player.template.volumeMask.classList.remove("show");
      }
    })
    this.player.template.volumeIcon.addEventListener("click", (event) => {
      if (this.player.video.muted) {
        this.player.video.muted = false;
        if (this.video.volume) this.player.template.volumeIcon.classList.remove("button-volume-off");
        this.components.volumeSlider.change(this.video.volume * 100);
      } else {
        this.player.video.muted = true;
        this.player.template.volumeIcon.classList.add("button-volume-off");
        this.components.volumeSlider.change(0);
      }
    });
  }
  initDanmakuButton() {
    this.player.template.danmaku_btn.addEventListener("click", () => {
      this.player.showDanmaku = !this.player.showDanmaku;
      this.player.danmaku.showing = this.player.showDanmaku;
      if (this.player.showDanmaku) {
        this.player.template.danmaku_btn.classList.add("open");
        this.player.template.danmaku_btn.classList.remove("close");
        this.player.danmaku.show();
      } else {
        this.player.template.danmaku_btn.classList.add("close");
        this.player.template.danmaku_btn.classList.remove("open");
        this.player.danmaku.hide();
      }
    });
  }
  initDanmakuSettingsButton() {
    console.log('hellooo')
    const THIS = this
    this.components.danmakuFilterPicker = new MultiPicker(this.template.danmaku_filter_picker, null, {
      created(thisArg) {
        console.log(thisArg)
      },
      pick(value) {
        console.log(`屏蔽弹幕类型：${value}`)
      },
      unpick(value) {
        console.log(`取消屏蔽弹幕类型：${value}`)
      },
      update(value) {
        console.log(`已屏蔽的弹幕类型有：${[...value]}`)
      }
    })
    this.components.danmakuOpacitySlider = new Slider(this.template.danmaku_opacity_slider, 10, 100, 1, 100, {
      start() {   // 开始调节滑动条（点按）
        THIS.isControl = true;
        THIS.template.danmakuSettings_panel.classList.add("show");
      },
      update(value) {
        // 有关弹幕透明度更改请写在此处
        console.log(`已更改透明度：${value}%`)
      },
      change(value) {
        THIS.template.danmaku_opacity_value.innerText = `${value}%`
      },
      end() {       // 结束滑动条调节（松手）
        if (!THIS.template.danmakuSettings_panel.classList.contains("show")) {
          setTimeout(() => {
            THIS.isControl = false;
          }, 150);
        }
        THIS.player.template.danmakuSettings_panel.classList.remove("show");
      }
    })
    this.components.danmakuShowareaSlider = new Slider(this.template.danmaku_showarea_slider, 1, 5, 1, 1, {
      start() {   // 开始调节滑动条（点按）
        THIS.isControl = true;
        THIS.template.danmakuSettings_panel.classList.add("show");
      },
      update(value) {
        // 有关弹幕显示区域的更改请写在此处
        console.log(`已更改显示区域：${["0","1/4","半屏","3/4","不重叠","不限"][value]}`)
      },
      change(value) {
        THIS.template.danmaku_showarea_value.innerText = ["0","1/4","半屏","3/4","不重叠","不限"][value]
      },
      end() {       // 结束滑动条调节（松手）
        if (!THIS.template.danmakuSettings_panel.classList.contains("show")) {
          setTimeout(() => {
            THIS.isControl = false;
          }, 150);
        }
        THIS.player.template.danmakuSettings_panel.classList.remove("show");
      }
    })
  }
  initDanmakuStyleButton() {
    const THIS = this
    this.components.danmakuFontsizePicker = new Picker(this.template.danmaku_fontsize_picker, this.danmakuFontsize, {
      pick(value) {
        // 有关字体大小值的更改请写在此处
        THIS.danmakuFontsize = value
        console.log(`已选择字体大小：${THIS.danmakuFontsize}`)
      }
    })
    this.components.danmakuTypePicker = new Picker(this.template.danmaku_type_picker, this.danmakuType, {
      pick(value) {
        // 有关弹幕模式值的更改请写在此处
        THIS.danmakuType = value
        console.log(`已选择弹幕模式：${THIS.danmakuType}`)
      }
    })
    this.components.danmakuColorPicker = new Picker(this.template.danmaku_color_picker, this.danmakuColor, {
      pick(value) {
        if (/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value)) {
          // 有关弹幕颜色值的更改请写在此处
          THIS.danmakuColor = value
          console.log(`已选择弹幕颜色：${THIS.danmakuColor}`)
          THIS.template.danmaku_color_input.value = value
          THIS.template.danmaku_color_preview.style["background-color"] = value
          if (value != value.toUpperCase()) {
            THIS.components.danmakuColorPicker.change(value.toUpperCase())
          }
        }
      }
    })
    this.template.danmaku_color_input.addEventListener('input', function () {
      this.value = '#' + this.value.replace(/[^0-9A-Fa-f]/g, '').slice(0, 6)
      THIS.components.danmakuColorPicker.pick(this.value)
    })
    this.template.danmaku_color_preview.addEventListener('click', function () {
      THIS.components.danmakuColorPicker.pick(THIS.danmakuColor)
    })
  }
  initTroggle() {
    if (this.player.template.pip_btn) {
      this.player.template.pip_btn.addEventListener("click", () => {
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
    this.video.addEventListener('enterpictureinpicture', () => {
      this.player.template.pip_btn.classList.add('button-picture-in-picture')
    })
    this.video.addEventListener('leavepictureinpicture', () => {
      this.player.template.pip_btn.classList.remove('button-picture-in-picture')
    })
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
