import { Picker, MultiPicker, Slider, Slider_vertical, Switch } from "./components";
import utils from "./utils";
// import Thumbnails from './thumbnails';
// import Icons from './icons';

class Controller {
  constructor(player) {
    const THIS = this;
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
    this.danmakuFontsize = "18";
    this.danmakuType = "right";
    this.danmakuColor = "#FFFFFF";
    this.videoScale = false;
    this.mask = document.createElement("div");
    this.mask.classList.add("heimu");
    this.player.template.videoWrap.addEventListener("mousemove", () => {
      this.setAutoHide();
    });
    this.player.template.controller.addEventListener("click", (event) => {
      window.event ? (window.event.cancelBubble = true) : event.stopPropagation();
    });
    this.isControllerfocus();
    this.initPlayButton();
    if (player.options.draggable) {
      this.initPlayedBar();
      this.initTimeLabel();
    }
    if (player.options.danmaku) {
      this.initDanmakuButton();
      this.initDanmakuSettingsButton();
      this.initDanmakuStyleButton();
      this.initDanmakuEmit();
    }
    if (typeof player.options.uid === "number") {
      !player.options.userIsLogined &&
        player.template.toLogin.addEventListener("click", () => {
          // player.options.toLogin && player.options.toLogin();
          player.fullScreen.isFullScreen("browser") && player.fullScreen.cancel("browser");
          player.fullScreen.isFullScreen("web") && player.fullScreen.cancel("web");
          this.isControl = false;
          const loginRes = player.options.toLogin ? player.options.toLogin() : confirm("这是登录表单，是否登录？");
          if (loginRes) {
            this.player.template.danmakuRoot.classList.remove("nologin");
            player.options.userIsLogined = true;
            !this.player.videoLoaded && this.player.template.danmakuRoot.classList.add("loading");
          }
        });
    }
    if (player.options.video.length > 1) {
      this.initPagelistButton();
    }
    if (player.options.widescreenSwitch) {
      this.initWidescreenButton();
    }
    this.initRepeatButton();
    this.initVolumeButton();
    this.initFullButton();
    this.initPictureInPicture();
    this.initSpeedButton();
    this.initSettingsButton();
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
    console.log("player click", this.isControl);
    if (!this.isControl && !this.player.isShowMenu && this.player.videoLoaded) {
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
      this.player.template.controllerTime.classList.add("inputting");
      this.player.template.time_input.value = utils.secondToTime(this.player.video.currentTime);
      this.player.template.time_input.focus();
      this.isControl = true;
    });
    this.player.template.time_input.addEventListener("blur", () => {
      const inputVal = this.player.template.time_input.value;
      this.player.template.controllerTime.classList.remove("inputting");
      if (/([0-9]?[0-9]?:?)([0-5]?[0-9]):([0-5][0-9])$/i.test(inputVal) && this.timeEdited) {
        this.player.seek(utils.textToSecond(inputVal));
      }
      this.timeEdit = false;
      this.isControl = false;
    });
    this.player.template.time_input.addEventListener("keydown", (event) => {
      this.timeEdited = true;
      let e = event || window.event;
      if (e.keyCode == 13) {
        this.player.template.video.currentTime = utils.textToSecond(this.player.template.time_input.value);
        //tem.video.play()
        this.player.template.controllerTime.classList.remove("inputting");
        this.player.template.time_input.value = "";
      }
      if (e.keyCode == 27) {
        this.player.template.controllerTime.classList.remove("inputting");
        this.player.template.time_input.value = "";
      }
    });
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
  repeatTrigger(loop) {
    this.player.template.repeat_btn.classList[`${loop ? "add" : "remove"}`]("button-repeat");
    this.player.template.repeat_tip.innerText = loop ? "关闭洗脑循环" : "开启洗脑循环";
  }
  initRepeatButton() {
    this.repeatTrigger(false);
    this.player.template.repeat_btn.addEventListener("click", () => {
      this.video.loop = !this.video.loop;
      this.repeatTrigger(this.video.loop);
    });
  }
  initVolumeButton() {
    const THIS = this;
    let control;
    this.components.volumeSlider = new Slider_vertical(
      this.template.volumeBar,
      0,
      100,
      1,
      this.player.options.volume * 100,
      {
        start() {
          // 开始调节滑动条（点按）
          THIS.isControl = true;
          THIS.template.volumeMask.classList.add("show");
        },
        change(value) {
          // 更改进度条值，不修改绑定数据
          THIS.template.volumeNum.innerText = Math.round(value);
        },
        update(value, controlFlag) {
          // 更改进度条值，修改绑定数据
          THIS.isControl = controlFlag;
          THIS.video.volume = value * 0.01;
          if (value === 0) {
            THIS.player.template.volumeIcon.classList.add("button-volume-off");
          } else {
            THIS.player.template.volumeIcon.classList.remove("button-volume-off");
          }
        },
        end() {
          // 结束滑动条调节（松手）
          // if (!THIS.template.volumeMask.classList.contains("show")) {
          setTimeout(() => {
            THIS.isControl = false;
          }, 50);
          // }
          THIS.player.template.volumeMask.classList.remove("show");
        },
      }
    );
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
  initSettingsButton() {
    const THIS = this;
    this.components.videoScalePicker = new Picker(this.template.video_scale_picker, "auto", {
      pick(value) {
        if (value == "auto") {
          THIS.videoScale = false;
        } else {
          value.replace(/^([0-9]+)-([0-9]+)$/, (match, w, h) => {
            if (match) {
              THIS.videoScale = [Number(w), Number(h)];
            }
          });
        }
        console.log(`视频比例已调整为：${value}`);
        THIS.player.resize();
      },
    });

    this.components.videoNextpageSwitch = new Switch(this.template.video_nextpage_switch, THIS.player.autoSwitch, {
      on() {
        // 打开开关
        THIS.player.autoSwitch = true;
        console.log("已开启自动切集");
      },
      off() {
        // 关闭开关
        THIS.player.autoSwitch = false;
        console.log("已关闭自动切集");
      },
    });
    this.components.videoAutoplaySwitch = new Switch(this.template.video_autoplay_switch, THIS.player.autoplay, {
      on() {
        // 打开开关
        THIS.player.autoplay = true;
        console.log("已开启自动开播");
      },
      off() {
        // 关闭开关
        THIS.player.autoplay = false;
        console.log("已关闭自动开播");
      },
    });
    this.components.videoBorderhiddenSwitch = new Switch(
      this.template.video_borderhidden_switch,
      !this.player.options.blackBorder,
      {
        on() {
          // 打开开关
          THIS.player.template.buildVideo(false);
          // THIS.player.danmaku.seek();
          console.log("已隐藏黑边");
        },
        off() {
          // 关闭开关
          THIS.player.template.buildVideo(true);
          // THIS.player.danmaku.seek();
          console.log("已显示黑边");
        },
      }
    );
    this.components.videoDarkmodeSwitch = new Switch(
      this.template.video_darkmode_switch,
      !this.player.options.blackBorder,
      {
        on() {
          // 打开开关
          document.body.classList.add("player-mode-blackmask");
          THIS.player.template.footBar.classList.add("darkmode");
          THIS.player.container.classList.add("mfunsPlayer-darkmode");
          document.body.appendChild(THIS.mask);
          console.log("已开启关灯模式");
        },
        off() {
          // 关闭开关
          if ([...document.body.childNodes].includes(THIS.mask)) {
            THIS.player.template.footBar.classList.remove("darkmode");
            THIS.player.container.classList.remove("mfunsPlayer-darkmode");
            document.body.classList.remove("player-mode-blackmask");
            document.body.removeChild(THIS.mask);
          }
          console.log("已关闭关灯模式");
        },
      }
    );
  }
  initDanmakuButton() {
    this.player.template.danmaku_btn.addEventListener("click", () => {
      if (!this.player.danmaku.showing) {
        this.player.danmaku.show();
      } else {
        this.player.danmaku.hide();
      }
    });
    this.player.on("danmaku_show", () => {
      this.player.template.danmaku_btn.classList.add("open");
      this.player.template.danmaku_btn.classList.remove("close");
    });
    this.player.on("danmaku_hide", () => {
      this.player.template.danmaku_btn.classList.add("close");
      this.player.template.danmaku_btn.classList.remove("open");
    });
  }
  initDanmakuEmit() {
    this.player.template.danmakuEmit.addEventListener("click", () => {
      const danmakuText = this.player.template.danmakuText.value;
      if (danmakuText.trim()) {
        this.player.danmaku.send({
          size: this.danmakuFontsize,
          type: this.danmakuType,
          color: this.danmakuColor,
          text: danmakuText,
        });
        this.player.template.danmakuText.value = "";
        this.player.template.danmakuText.blur();
      }
    });
  }
  initDanmakuSettingsButton() {
    const THIS = this;
    const shields = this.player.options.danmaku.shields;
    const opacity = this.player.options.danmaku.opacity ?? 1;
    const showArea = this.player.options.danmaku.limitArea ?? 4;
    const danmakuSize = this.player.options.danmaku.fontScale ?? 1;
    const danmakuSpeed = this.player.options.danmaku.speed ?? 1;
    this.components.danmakuFilterPicker = new MultiPicker(this.template.danmaku_filter_picker, shields, {
      created(thisArg) {
        console.log(thisArg);
      },
      pick(value) {
        console.log(`屏蔽弹幕类型：${value}`);
        THIS.player.danmaku.shield(value, true);
      },
      unpick(value) {
        console.log(`取消屏蔽弹幕类型：${value}`);
        THIS.player.danmaku.shield(value, false);
      },
      update(value) {
        console.log(`已屏蔽的弹幕类型有：${[...value]}`);
      },
    });
    // 弹幕透明度调节
    this.components.danmakuOpacitySlider = new Slider(this.template.danmaku_opacity_slider, 10, 100, 1, opacity * 100, {
      start() {
        // 开始调节滑动条（点按）
        THIS.isControl = true;
        THIS.template.danmakuSettings_panel.classList.add("show");
      },
      update(value, flag) {
        // 有关弹幕透明度更改请写在此处
        THIS.isControl = flag;
        THIS.player.danmaku.opacity(value / 100);
      },
      change(value) {
        THIS.template.danmaku_opacity_value.innerText = `${value}%`;
      },
      end() {
        // 结束滑动条调节（松手）
        // if (!THIS.template.danmakuSettings_panel.classList.contains("show")) {
        setTimeout(() => {
          THIS.isControl = false;
        }, 50);
        // }
        THIS.player.template.danmakuSettings_panel.classList.remove("show");
      },
    });
    // 弹幕区域调节
    this.components.danmakuShowareaSlider = new Slider(
      this.template.danmaku_showarea_slider,
      20,
      100,
      20,
      showArea * 20,
      {
        start() {
          // 开始调节滑动条（点按）
          console.log("--------");
          THIS.isControl = true;
          THIS.template.danmakuSettings_panel.classList.add("show");
        },
        update(value, flag) {
          // 有关弹幕显示区域的更改请写在此处
          THIS.isControl = flag;
          console.log(`已更改显示区域：${["1/4", "半屏", "3/4", "不重叠", "不限"][value / 20 - 1]}`);
        },
        change(value) {
          THIS.template.danmaku_showarea_value.innerText = ["1/4", "半屏", "3/4", "不重叠", "不限"][value / 20 - 1];
          THIS.player.danmaku.limitArea(value / 20);
        },
        end() {
          // 结束滑动条调节（松手）
          setTimeout(() => {
            THIS.isControl = false;
          }, 50);
          THIS.player.template.danmakuSettings_panel.classList.remove("show");
        },
      }
    );
    // 弹幕文字大小调节
    this.components.danmakuSizeSlider = new Slider(this.template.danmaku_size_slider, 50, 150, 1, danmakuSize * 100, {
      start() {
        THIS.isControl = true;
        THIS.template.danmakuSettings_panel.classList.add("show");
      },
      update(value, flag) {
        // 有关弹幕文字大小的更改请写在此处
        THIS.isControl = flag;
      },
      change(value) {
        THIS.template.danmaku_size_value.innerText = value + "%";
        THIS.player.danmaku.size(value / 100);
      },
      end() {
        // 结束滑动条调节（松手）
        setTimeout(() => {
          THIS.isControl = false;
        }, 50);
        THIS.player.template.danmakuSettings_panel.classList.remove("show");
      },
    });
    // 弹幕速度调节
    this.components.danmakuSpeedSlider = new Slider(
      this.template.danmaku_speed_slider,
      50,
      150,
      25,
      danmakuSpeed * 100,
      {
        start() {
          // 开始调节滑动条（点按）
          console.log("--------");
          THIS.isControl = true;
          THIS.template.danmakuSettings_panel.classList.add("show");
        },
        update(value, flag) {
          // 有关弹幕速度的更改请写在此处
          THIS.isControl = flag;
        },
        change(value) {
          THIS.template.danmaku_speed_value.innerText = utils.number2danmakuSpeed(value / 100);
          THIS.player.danmaku.speed(value / 100);
        },
        end() {
          // 结束滑动条调节（松手）
          setTimeout(() => {
            THIS.isControl = false;
          }, 50);
          THIS.player.template.danmakuSettings_panel.classList.remove("show");
        },
      }
    );
    this.components.danmakuCatchSwitch = new Switch(this.template.danmaku_catch_switch, this.player.options.danmaku.danmakuCatch, {
      on() {
        THIS.player.template.danmakuTipMask.style.display = ""  // 打开弹幕捕获模式，则取消tipMask的隐藏
      },
      off() {
        THIS.player.template.danmakuTipMask.style.display = "none"  // 关闭弹幕捕获模式，则隐藏tipMask
      }
    })
  }
  initDanmakuStyleButton() {
    const THIS = this;
    this.components.danmakuFontsizePicker = new Picker(this.template.danmaku_fontsize_picker, this.danmakuFontsize, {
      pick(value) {
        // 有关字体大小值的更改请写在此处
        THIS.danmakuFontsize = value;
        console.log(`已选择字体大小：${THIS.danmakuFontsize}`);
      },
    });
    this.components.danmakuTypePicker = new Picker(this.template.danmaku_type_picker, this.danmakuType, {
      pick(value) {
        // 有关弹幕模式值的更改请写在此处
        THIS.danmakuType = value;
        console.log(`已选择弹幕模式：${THIS.danmakuType}`);
      },
    });
    this.components.danmakuColorPicker = new Picker(this.template.danmaku_color_picker, this.danmakuColor, {
      pick(value) {
        if (/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value)) {
          // 有关弹幕颜色值的更改请写在此处
          THIS.danmakuColor = utils.color2Number(value);
          console.log(`已选择弹幕颜色：${THIS.danmakuColor}`);
          THIS.template.danmaku_color_input.value = value;
          THIS.template.danmaku_color_preview.style["background-color"] = value;
          if (value != value.toUpperCase()) {
            THIS.components.danmakuColorPicker.change(value.toUpperCase());
          }
        }
      },
    });
    this.template.danmaku_color_input.addEventListener("input", function () {
      this.value = "#" + this.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
      THIS.components.danmakuColorPicker.pick(this.value);
    });
    this.template.danmaku_color_preview.addEventListener("click", function () {
      THIS.components.danmakuColorPicker.pick(THIS.danmakuColor);
    });
  }
  initPictureInPicture() {
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
    this.video.addEventListener("enterpictureinpicture", () => {
      this.player.template.pip_btn.classList.add("button-picture-in-picture");
    });
    this.video.addEventListener("leavepictureinpicture", () => {
      this.player.template.pip_btn.classList.remove("button-picture-in-picture");
    });
  }
  widescreenTrigger(widescreen) {}
  initWidescreenButton() {
    this.template.widescreen_btn.addEventListener("click", () => {
      this.player.widescreen = !this.player.widescreen;

      let widescreen = this.player.widescreen;
      this.player.template.widescreen_btn.classList[`${widescreen ? "add" : "remove"}`]("exit");
      this.player.events.trigger(widescreen ? "widescreen" : "widescreen_cancel");
      console.log(widescreen ? "进入宽屏模式" : "退出宽屏模式");
      this.player.template.widescreen_tip.innerText = widescreen ? "退出宽屏" : "宽屏模式";
    });
  }
  setAutoHide(delay = 1500) {
    this.show();
    clearTimeout(this.autoHideTimer);
    this.autoHideTimer = setTimeout(() => {
      if (this.video.played.length && !this.isControl) {
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
    this.template.danmakuTip.classList.remove("show");
    this.template.controllerMask.style.cursor = "none";
    this.template.controllerMask.classList.add("hide");
    this.template.headBar.classList.add("hide");
    this.timeEdited = false;
    this.player.template.controllerTime.classList.remove("inputting");
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
