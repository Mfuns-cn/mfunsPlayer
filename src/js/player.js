import Bar from "./bar";
import FullScreen from "./fullscreen";
import Danmaku from "./danmaku";
import handleOption from "./options";
import Timer from "./timer";
import Controller from "./controller";
import HotKey from "./hotKey";
import HighEnergy from "./highEnergy";
import Events from "./events";
import VideoColor from "./videoColor";
import ContextMenu from "./contextmenu";
import InfoPanel from "./info-panel";
import Template from "./template";
import utils from "./utils";
import DanmakuAuxiliary from "./danmakuAuxiliary";
import { Switch } from "./components";
let index = 0;
const instances = [];
export default class mfunsPlayer {
  constructor(options) {
    this.options = handleOption(options);
    this.template = new Template(this.options);
    this.events = new Events();
    this.videoColor = new VideoColor(this);
    this.container = options.container;
    this.container.classList.add("mfunsPlayer");
    this.unableTimeupdate = false;
    this.isPlayEnd = false;
    this.isSwitched = false;
    this.isShowMenu = false;
    this.plugins = {};
    this.components = {};
    this.playTimer = null;
    this.video = this.template.video;
    this.currentVideo = this.options.currentVideo;
    this.bar = new Bar(this.template);
    this.danmakuAuxiliary = null;
    this.widescreen = options.widescreen;
    if (this.options.danmaku) {
      this.showDanmaku = options.danmaku.showDanmaku;
      this.danmakuOptions = {
        container: this.template.danmaku,
        opacity: this.options.danmaku.opacity ?? 1,
        fontScale: this.options.danmaku.fontScale ?? 1,
        speed: this.options.danmaku.speed ?? 1,
        limitArea: this.options.danmaku.limitArea ?? 4,
        callback: (length) => {
          this.template.danmakuCount.innerHTML = `共 ${length} 条弹幕`;
          this.danmakuLoaded = true;
          if (length) {
            this.loadHighEnergy();
          }

          this.videoLoaded && this.template.footBar.classList.remove("loading");
        },
        error: (msg) => {
          this.notice(msg, true);
        },
        apiBackend: this.options.apiBackend,
        borderColor: "#FFFFFF",
        height: this.arrow ? 24 : 28,
        time: () => this.video.currentTime,
        isShow: this.showDanmaku,
        danmakuCatch: this.options.danmaku.danmakuCatch ?? false,
        unlimited: false,
        api: {
          link: this.options.video[this.options.currentVideo].danLink,
          id: this.options.video[this.options.currentVideo].danId,
          address: this.options.danmaku.api,
          token: this.options.danmaku.token,
        },
        events: this.events,
      };
      this.danmaku = new Danmaku(this.danmakuOptions, this);
    }
    this.autoSwitch = this.options.autoSwitch;
    this.autoplay = this.options.autoplay;
    this.controller = new Controller(this);
    this.timer = new Timer(this);
    this.fullScreen = new FullScreen(this);
    this.contextMenu = new ContextMenu(this);
    this.hotkey = new HotKey(this);
    this.infoPanel = new InfoPanel(this);
    this.initVideo(this.video, this.options.video.type);
    this.arrow = this.container.offsetWidth <= 500;

    if (this.options.playCallback) this.playCallback = options.playCallback;
    if (this.options.pauseCallback) this.pauseCallback = options.pauseCallback;
    if (this.options.endedCallback) this.endedCallback = options.endedCallback;
    document.addEventListener(
      "click",
      () => {
        this.focus = false;
      },
      true
    );
    this.container.addEventListener(
      "click",
      () => {
        this.focus = true;
      },
      true
    );
    this.rescale = this.rescale.bind(this);

    index++;
    instances.push(this);
  }
  loadHighEnergy() {
    if (this.videoLoaded && this.danmakuLoaded) {
      if (!this.highEnergy) {
        this.highEnergy = new HighEnergy(this);
        this.highEnergy.resize();
        this.danmakuHighEnergySwitch = new Switch(
          this.template.danmaku_highEnergy_switch,
          this.options.danmaku.showHighEnergy,
          {
            on: () => {
              this.highEnergy && this.highEnergy.show(); // 显示高能进度条
            },
            off: () => {
              this.highEnergy && this.highEnergy.hide(); // 隐藏高能进度条
            },
          }
        );
      } else {
        this.highEnergy.reload();
      }
    }
  }
  seek(time) {
    console.log("seek");
    this.canplay = false;
    time = Math.max(time, 0);
    if (this.video.duration) {
      time = Math.min(time, this.video.duration);
    }
    if (this.video.currentTime < time) {
      this.notice(`快进 ${(time - this.video.currentTime).toFixed(0)} 秒`);
    } else if (this.video.currentTime > time) {
      this.notice(`快退 ${(this.video.currentTime - time).toFixed(0)} 秒`);
    }
    this.bar.set("played", time / this.video.duration, "width");
    this.template.currentTime.innerText = utils.secondToTime(time);
    // this.isPlayEnd = false;
    this.video.currentTime = time;
    /*
    已转移至video监听事件
    if (this.danmaku) {
      this.danmaku.seek();
    }
    */
  }
  pause() {
    this.video.pause();
    this.danmaku.pause();
    this.timer.enableloadingChecker = false;
  }
  play() {
    this.timer.enableloadingChecker = true;
    if (!this.canplay) return;

    this.video
      .play()
      .then(() => {
        console.log("play");
      })
      .catch((e) => {
        this.notice("视频播放异常，即将重载播放器");
        setTimeout(() => {
          this.reload();
        }, 500);
      });

    if (this.options.mutex) {
      for (let i = 0; i < instances.length; i++) {
        if (this !== instances[i]) {
          instances[i].pause();
        }
      }
    }
  }
  toggle() {
    if (this.video.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  initMSE(video, type) {
    this.type = type;
    switch (this.type) {
      // https://github.com/video-dev/hls.js
      case "hls":
        if (window.Hls) {
          if (window.Hls.isSupported()) {
            const options = this.options.pluginOptions.hls;
            const hls = new window.Hls(options);
            this.plugins.hls = hls;
            hls.loadSource(video.src);
            hls.attachMedia(video);
            this.events.on("destroy", () => {
              hls.destroy();
              delete this.plugins.hls;
            });
          } else {
            this.notice("Error: Hls is not supported.");
          }
        } else {
          this.notice("Error: Can't find Hls.");
        }
        break;

      // https://github.com/Bilibili/flv.js
      case "flv":
        if (window.flvjs) {
          if (window.flvjs.isSupported()) {
            const flvPlayer = window.flvjs.createPlayer(
              Object.assign(this.options.pluginOptions.flv.mediaDataSource || {}, {
                type: "flv",
                url: video.src,
              }),
              this.options.pluginOptions.flv.config
            );
            this.plugins.flvjs = flvPlayer;
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
            this.events.on("destroy", () => {
              flvPlayer.unload();
              flvPlayer.detachMediaElement();
              flvPlayer.destroy();
              delete this.plugins.flvjs;
            });
          } else {
            this.notice("Error: flvjs is not supported.");
          }
        } else {
          this.notice("Error: Can't find flvjs.");
        }
        break;

      // https://github.com/Dash-Industry-Forum/dash.js
      case "dash":
        if (window.dashjs) {
          const dashjsPlayer = window.dashjs.MediaPlayer().create().initialize(video, video.src, false);
          const options = this.options.pluginOptions.dash;
          dashjsPlayer.updateSettings(options);
          this.plugins.dash = dashjsPlayer;
          this.events.on("destroy", () => {
            window.dashjs.MediaPlayer().reset();
            delete this.plugins.dash;
          });
        } else {
          this.notice("Error: Can't find dashjs.");
        }
        break;

      // https://github.com/webtorrent/webtorrent
      case "webtorrent":
        if (window.WebTorrent) {
          if (window.WebTorrent.WEBRTC_SUPPORT) {
            this.container.classList.add("dplayer-loading");
            const options = this.options.pluginOptions.webtorrent;
            const client = new window.WebTorrent(options);
            this.plugins.webtorrent = client;
            const torrentId = video.src;
            video.src = "";
            video.preload = "metadata";
            video.addEventListener("durationchange", () => this.container.classList.remove("dplayer-loading"), {
              once: true,
            });
            client.add(torrentId, (torrent) => {
              const file = torrent.files.find((file) => file.name.endsWith(".mp4"));
              file.renderTo(this.video, {
                autoplay: this.options.autoplay,
                controls: false,
              });
            });
            this.events.on("destroy", () => {
              client.remove(torrentId);
              client.destroy();
              delete this.plugins.webtorrent;
            });
          } else {
            this.notice("Error: Webtorrent is not supported.");
          }
        } else {
          this.notice("Error: Can't find Webtorrent.");
        }
        break;
    }
  }
  on(name, callback) {
    this.events.on(name, callback);
  }
  initVideo(video, type) {
    this.initMSE(video, type);
    if (this.options.video.length > 1 && this.options.currentVideo <= this.template.pagelistItem.length) {
      this.template.pagelistItem[this.options.currentVideo].classList.add("focus");
    }
    this.on("canplay", () => {
      if (this.isSwitched || this.autoplay || this.reloadFlag) {
        //chrome禁止自动播放视频
        this.video.play().catch(() => {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(() => {
              this.play();
            })
            .catch(() => {
              // 获取权限错误，则静音播放
              this.video.muted = true;
              this.play();
            });
        });

        this.autoplay = false;
        this.isSwitched = false;
        this.reloadFlag = false;
      }

      console.log("canplay");
      this.template.loading.classList.remove("show");
      this.canplay = true;
    });
    this.on("loadstart", () => {
      this.notice(`正在${this.timeBeforeReload ? "重载" : "初始化"}视频...`, true);
      this.template.loading.classList.add("show");
      this.template.loadingSpeed.innerHTML = "";
      this.template.headBar.classList.add("disable");
      this.template.controllerMask.classList.add("disable");
      this.template.bezel.classList.add("hide");
      this.template.danmakuRoot.classList.add(this.options.userIsLogged ? "loading" : "nologin");
      this.videoLoaded = false;
      //一分钟后如果还处于loadstart阶段，则响应超时
      setTimeout(() => {
        if (!this.videoLoaded) {
          this.template.loading.classList.remove("show");
          !this.netwrokError &&
            this.notice("视频响应超时，您可以", true, 2000, 0.8, false, {
              callback: () => {
                this.reload();
              },
              text: "重新加载",
            });
        }
      }, 60000);
    });
    this.on("error", () => {
      //检查视频链接
      this.notice(error, true);
      this.options.apiBackend.read({
        url: this.video.src,
        error: (err) => {
          console.error(err);
          this.notice("视频加载失败,请检查网络设置或视频链接是否可用", true);
          this.netwrokError = true;
          this.template.loading.remove("show");
        },
      });
      this.template.loading.classList.remove("show");
    });
    this.on("loadedmetadata", (e) => {
      this.template.headBar.classList.remove("disable");
      this.template.controllerMask.classList.remove("disable");
      this.template.bezel.classList.remove("hide");
      this.danmakuLoaded && this.template.danmakuRoot.classList.remove("loading");
      this.notice("视频加载完成", false);
      this.videoLoaded = true;
      this.loadHighEnergy();
      this.template.currentTime.innerText = "00:00";
      this.template.totalTime.innerText = utils.secondToTime(this.video.duration);
      if (this.timeBeforeReload) {
        this.seek(this.timeBeforeReload);
        setTimeout(() => {
          this.notice(`已为你跳转至上次播放进度 ${utils.secondToTime(this.timeBeforeReload)}`);
        }, 500);
      }
    });
    this.on("progress", (e) => {
      const percentage = video.buffered.length ? video.buffered.end(video.buffered.length - 1) / video.duration : 0;
      this.bar.set("loaded", percentage, "width");
    });
    this.on("play", () => {
      clearTimeout(this.playTimer);
      this.playEnd && this.danmaku.seek();
      this.danmaku.play();
      if (this.videoLoaded) this.timer.enableloadingChecker = true;
      this.playEnd = false;
      this.controller.setAutoHide();
      this.container.classList.remove("mfunsPlayer-paused");
      this.container.classList.add("mfunsPlayer-playing");
      this.template.play_btn.classList.remove("button-paused");
      this.template.bezel.classList.add("bezel_play");
      this.playCallback && this.playCallback(this.video.currentTime);
      this.playTimer = setTimeout(() => {
        this.template.bezel.classList.add("hide");
      }, 1500);
    });
    this.on("pause", () => {
      clearTimeout(this.playTimer);
      this.controller.setAutoHide();
      this.container.classList.add("mfunsPlayer-paused");
      this.container.classList.remove("mfunsPlayer-playing");
      this.template.play_btn.classList.add("button-paused");
      this.template.bezel.classList.remove("hide");
      this.template.bezel.classList.remove("bezel_play");
      this.template.loading.classList.remove("show");
      this.pauseCallback && this.pauseCallback(this.video.currentTime);
    });
    this.on("timeupdate", () => {
      if (!this.unableTimeupdate) {
        this.bar.set("played", this.video.currentTime / this.video.duration, "width");
        const ct = parseInt(this.video.currentTime);
        this.template.currentTime.innerText = utils.secondToTime(ct);
      }
    });
    this.on("ended", () => {
      this.bar.set("played", 1, "width");
      this.endedCallback && this.endedCallback(this.video.currentTime);
      this.playEnd = true;
      this.autoSwitch && !this.video.loop && this.switchVideo(this.currentVideo + 1);
    });
    this.on("seeking", () => {
      this.danmaku.seek();
    });
    for (let i = 0; i < this.events.videoEvents.length; i++) {
      video.addEventListener(this.events.videoEvents[i], (e) => {
        this.events.trigger(this.events.videoEvents[i], e);
      });
    }
  }
  switchVideo(index) {
    const total = this.template.pagelistItem.length - 1;
    if (index > total || index < 0 || index === this.currentVideo) return;
    this.template.currentTime.innerText = "00:00";
    this.template.totalTime.innerText = "00:00";
    this.handleSwitchVideo(index, total);
    this.bar.set("loaded", 0, "width");
    this.bar.set("played", 0, "width");
    this.isSwitched = true;
    this.danmakuLoaded = false;
    this.videoLoaded = false;
    this.template.footBar.classList.add("loading");
    this.template.danmakuCount.innerHTML = "弹幕装填中...";
    const currentVideo = this.options.video[index];
    this.danmaku.reload(currentVideo.danId, currentVideo.danLink);
    this.video.src = currentVideo.url;
    this.template.headTitle.innerText = `${currentVideo.title}`;
  }
  handleSwitchVideo(index, total) {
    this.currentVideo = index;
    this.template.loadingSpeed.innerHTML = "";
    this.template.next_btn.style.display = index === total ? "none" : "flex";
    this.template.pagelistItem[index].classList.add("focus");
    this.template.pagelistItem.forEach((element, i) => {
      if (i !== index) {
        element.classList.remove("focus");
      }
    });
  }
  disableVideoEvents(event) {}

  volume(percentage, nonotice) {
    percentage = parseFloat(percentage);
    if (!isNaN(percentage)) {
      percentage = Math.max(percentage, 0);
      percentage = Math.min(percentage, 1);
      this.components.volumeSlider.change(percentage * 100);
      const formatPercentage = `${(percentage * 100).toFixed(0)}`;

      this.notice(`音量：${formatPercentage}%`);

      this.video.volume = percentage;
      if (this.video.muted) {
        this.video.muted = false;
      }
      this.switchVolumeIcon(formatPercentage);
    }

    return this.video.volume;
  }

  switchVolumeIcon(percentage) {
    if (percentage > 0) {
      this.template.volumeIcon.classList.remove("button-volume-off");
    } else {
      this.template.volumeIcon.classList.add("button-volume-off");
    }
  }
  speed(rate) {
    this.video.playbackRate = rate;
    return rate;
  }
  reload() {
    this.timeBeforeReload = this.video.currentTime;
    this.reloadFlag = true;
    this.timer.enabledownloadChecker = false;
    this.template.currentTime.innerText = "00:00";
    this.template.totalTime.innerText = "00:00";
    this.template.barTime.classList.add("hidden");
    this.bar.set("loaded", 0, "width");
    this.bar.set("played", 0, "width");
    const currentVideo = this.options.video[this.currentVideo];
    this.video.src = currentVideo.url;
    this.danmaku.reload(currentVideo.danId, currentVideo.danLink);
  }
  resize() {
    this.danmaku && this.danmaku.resize();
    if (this.controller.thumbnails) {
      this.controller.thumbnails.resize(
        160,
        (this.video.videoHeight / this.video.videoWidth) * 160,
        this.template.barWrap.offsetWidth
      );
    }
    window.removeEventListener("resize", this.rescale);
    if (this.controller.videoScale) {
      this.rescale();
      this.video.style["object-fit"] = "fill";
      window.addEventListener("resize", this.rescale);
    } else {
      this.video.style["object-fit"] = "";
      this.video.style.width = "";
      this.video.style.height = "";
    }
    this.events.trigger("resize");
  }
  rescale() {
    // 保持视频宽高比例
    //    (父元素宽/父元素高) * (视频宽%/视频高%) = 比例宽/比例高
    // => (父元素宽/父元素高) * (比例高/比例宽) = (视频高%/视频宽%)
    let hscale = this.template.videoMask.clientWidth * this.controller.videoScale[1];
    let wscale = this.template.videoMask.clientHeight * this.controller.videoScale[0];
    if (wscale > hscale) {
      this.video.style.width = `100%`;
      this.video.style.height = `${(hscale / wscale) * 100}%`;
    } else {
      this.video.style.height = `100%`;
      this.video.style.width = `${(wscale / hscale) * 100}%`;
    }
  }
  notice(text, alive = false, time = 2000, opacity = 0.8, showClose = false, todo) {
    console.log(text);
    this.template.noticeText.innerHTML = text;
    this.template.notice.style.opacity = opacity;
    this.noticeTime && clearTimeout(this.noticeTime);
    showClose && this.template.noticeClose.classList.add("show");
    this.template.noticeClose.addEventListener("click", () => {
      this.template.noticeClose.classList.remove("show");
      this.template.notice.style.opacity = 0;
    });
    if (todo) {
      this.template.noticeTodo.classList.add("show");
      this.template.noticeTodo.innerHTML = todo.text;
      this.template.noticeTodo.addEventListener("click", () => {
        todo.callback();
        this.template.noticeTodo.classList.remove("show");
      });
    }

    this.events.trigger("notice_show", text);
    if (time > 0 && !alive) {
      this.noticeTime = setTimeout(() => {
        this.template.notice.style.opacity = 0;
        this.events.trigger("notice_hide");
      }, time);
    }
  }
  mountDanmakuAuxiliary(el) {
    this.danmakuAuxiliary = new DanmakuAuxiliary(this, el);
  }
}
