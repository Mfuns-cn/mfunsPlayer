import Bar from "./bar";
import FullScreen from "./fullscreen";
import Danmaku from "./danmaku";
import handleOption from "./options";
import Timer from "./timer";
import Controller from "./controller";
import HotKey from "./hotKey";
import Events from "./events";
import ContextMenu from "./contextmenu";
import Template from "./template";
import utils from "./utils";
import { getVideoTime } from "./video";
import DanmakuAuxiliary from "./danmakuAuxiliary";

let index = 0;
const instances = [];
export default class mfunsPlayer {
  constructor(options) {
    this.options = handleOption(options);
    this.template = new Template(this.options);
    this.events = new Events();
    this.container = options.container;
    this.container.classList.add("mfunsPlayer");
    this.unableTimeupdate = false;
    this.isPlayEnd = false;
    this.isSwitched = false;
    this.isShowMenu = false;
    this.plugins = {};
    this.components = {}
    this.playTimer = null;
    this.video = this.template.video;
    this.currentVideo = this.options.currentVideo;
    this.bar = new Bar(this.template);
    this.danmakuAuxiliary = null
    if (this.options.danmaku) {
      this.showDanmaku = options.danmaku.showDanmaku;
      this.danmakuOptions = {
        container: this.template.danmaku,
        opacity: this.options.danmaku.opacity,
        callback: (length) => {
          this.template.danmakuCount.innerHTML = `共 ${length} 条弹幕`;
        },
        error: (msg) => {
          this.notice(msg);
        },
        apiBackend: this.options.apiBackend,
        borderColor: this.options.theme,
        height: this.arrow ? 24 : 30,
        time: () => this.video.currentTime,
        isShow: this.showDanmaku,
        api: {
          link: this.options.video[this.options.currentVideo].danLink,
          id: this.options.video[this.options.currentVideo].danId,
          address: this.options.danmaku.api,
          token: this.options.danmaku.token,
        },
        events: this.events,
      };
      this.danmaku = new Danmaku(this.danmakuOptions);
    }
    this.controller = new Controller(this);
    this.timer = new Timer(this);
    this.fullScreen = new FullScreen(this);
    this.contextMenu = new ContextMenu(this);
    this.hotkey = new HotKey(this);

    this.initVideo(this.video, this.options.video.type);
    this.arrow = this.container.offsetWidth <= 500;

    if (this.options.autoplay) {
      this.play();
    }
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
    this.rescale = this.rescale.bind(this)

    index++;
    instances.push(this);
  }

  seek(time) {
    time = Math.max(time, 0);
    if (this.video.duration) {
      time = Math.min(time, this.video.duration);
    }
    if (this.video.currentTime < time) {
      this.notice(`快进 ${(time - this.video.currentTime).toFixed(0)} 秒`);
    } else if (this.video.currentTime > time) {
      this.notice(`快退 ${(this.video.currentTime - time).toFixed(0)} 秒`);
    }
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
    this.video.play();
    this.danmaku.play();
    this.timer.enableloadingChecker = true;

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
      if (this.isSwitched) {
        this.play();
      }
      this.isSwitched = false;
    });

    this.on("loadstart", () => {
      this.notice("正在加载视频内容...", true);
      this.videoLoaded = false;
    });
    this.on("error", () => {
      this.notice("视频播放失败，请检查网络情况");
    });
    this.on("loadedmetadata", () => {
      this.notice("视频加载完成", false);
      this.videoLoaded = true;
      getVideoTime(this.template);
    });
    this.on("progress", () => {
      const percentage = video.buffered.length ? video.buffered.end(video.buffered.length - 1) / video.duration : 0;
      this.bar.set("loaded", percentage, "width");
    });
    this.on("play", () => {
      clearTimeout(this.playTimer);
      if (this.playEnd) this.danmaku.seek();
      this.playEnd = false;
      this.controller.setAutoHide();
      this.container.classList.remove("mfunsPlayer-paused");
      this.container.classList.add("mfunsPlayer-playing");
      this.template.play_btn.classList.remove("button-paused");
      this.template.bezel.classList.add("bezel_play");
      if (this.playCallback) this.playCallback(this.video.currentTime);
      this.playTimer = setTimeout(() => {
        this.template.bezel.style.display = "none";
      }, 1500);
    });
    this.on("pause", () => {
      clearTimeout(this.playTimer);
      this.controller.setAutoHide();
      this.container.classList.add("mfunsPlayer-paused");
      this.container.classList.remove("mfunsPlayer-playing");
      this.template.play_btn.classList.add("button-paused");
      this.template.bezel.style.display = "block";
      this.template.bezel.classList.remove("bezel_play");
      if (this.pauseCallback) this.pauseCallback(this.video.currentTime);
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
      if (this.endedCallback) this.endedCallback(this.video.currentTime);
      this.playEnd = true;
    });
    this.on("seeking", () => {
      this.danmaku.seek()
    })
    for (let i = 0; i < this.events.videoEvents.length; i++) {
      video.addEventListener(this.events.videoEvents[i], () => {
        this.events.trigger(this.events.videoEvents[i]);
      });
    }
  }
  switchVideo(index) {
    this.currentVideo = index;
    this.handleSwitchVideo(index);
    this.bar.set("loaded", 0, "width");
    this.bar.set("played", 0, "width");
    this.isSwitched = true;
    const currentVideo = this.options.video[index];
    this.danmaku.reload(currentVideo.danId, currentVideo.danLink);
    this.video.src = currentVideo.url;
    this.template.headTitle.innerText = `${currentVideo.title}`;
  }
  handleSwitchVideo(index) {
    const total = this.template.pagelistItem.length - 1;
    if (index > total) return;
    this.template.next_btn.style.display = index === total ? "none" : "block";
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
  resize() {
    if (this.danmaku) {
      this.danmaku.resize();
    }
    if (this.controller.thumbnails) {
      this.controller.thumbnails.resize(
        160,
        (this.video.videoHeight / this.video.videoWidth) * 160,
        this.template.barWrap.offsetWidth
      );
    }
    window.removeEventListener("resize", this.rescale)
    if (this.controller.videoScale) {
      this.rescale()
      this.video.style['object-fit'] = "fill"
      window.addEventListener("resize", this.rescale)
    } else {
      this.video.style['object-fit'] = ""
      this.video.style.width = ""
      this.video.style.height = ""
    }
    this.events.trigger("resize");
  }
  rescale(){
    // 保持视频宽高比例
    //    (父元素宽/父元素高) * (视频宽%/视频高%) = 比例宽/比例高
    // => (父元素宽/父元素高) * (比例高/比例宽) = (视频高%/视频宽%)
    let hscale = this.template.videoMask.clientWidth * this.controller.videoScale[1]
    let wscale = this.template.videoMask.clientHeight * this.controller.videoScale[0]
    if (wscale > hscale) {
      this.video.style.width = `100%`
      this.video.style.height = `${hscale / wscale * 100}%`
    } else {
      this.video.style.height = `100%`
      this.video.style.width = `${wscale / hscale * 100}%`
    }
  }
  notice(text, alive = false, time = 2000, opacity = 0.8) {
    this.template.notice.innerHTML = text;
    this.template.notice.style.opacity = opacity;
    if (this.noticeTime) {
      clearTimeout(this.noticeTime);
    }
    // this.events.trigger("notice_show", text);
    if (time > 0 && !alive) {
      this.noticeTime = setTimeout(() => {
        this.template.notice.style.opacity = 0;
        this.events.trigger("notice_hide");
      }, time);
    }
  }
  mountDanmakuAuxiliary(el) {
    this.danmakuAuxiliary = new DanmakuAuxiliary(this, el)
  }
}
