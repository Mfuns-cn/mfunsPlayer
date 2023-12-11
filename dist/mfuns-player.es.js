class de {
  constructor(t) {
    this.initialized = !1, this.player = t;
  }
  get plugin() {
    return this.player.plugin;
  }
  /** 注册插件 */
  register(t, e) {
    var n, l, r, h;
    const s = new t(this.player, e);
    (n = s.created) == null || n.call(s, e), this.initialized && ((l = s.pluginsReady) == null || l.call(s, e), (r = s.playerMounted) == null || r.call(s, e), (h = s.videoInited) == null || h.call(s, e));
  }
  /** 批量注册插件 */
  pluginsRegister(t) {
    var e;
    (e = t.plugins) == null || e.forEach((s) => {
      var l;
      const n = new s(this.player, t);
      this.plugin[s.pluginName] = n, (l = n.created) == null || l.call(n, t);
    });
  }
  /** 所有插件注册完毕后执行 */
  pluginsReady(t) {
    var e;
    if (!this.initialized) {
      for (const s in this.plugin) {
        const n = this.plugin[s];
        (e = n.pluginsReady) == null || e.call(n, t);
      }
      this.initialized = !0;
    }
  }
  /** 播放器挂载后执行 */
  playerMounted(t) {
    var e;
    for (const s in this.plugin) {
      const n = this.plugin[s];
      (e = n.playerMounted) == null || e.call(n, t);
    }
  }
  /** 销毁所有插件 */
  destroy() {
    var t;
    for (const e in this.plugin) {
      const s = this.plugin[e];
      (t = s.destroy) == null || t.call(s);
    }
  }
}
class ue {
  constructor() {
    this.events = {}, this.customEventList = [];
  }
  /** 添加监听 */
  on(t, e) {
    this.events[t] || (this.events[t] = []), this.events[t].push(e);
  }
  /** 添加一次性监听 */
  once(t, e) {
    const s = (...n) => {
      e(...n), this.off(t, s);
    };
    this.on(t, s);
  }
  /** 移除监听 */
  off(t, e) {
    this.events[t] || (this.events[t] = []);
    const s = this.events[t].indexOf(e);
    s > -1 && this.events[t].splice(s, 1);
  }
  /** 触发事件 */
  emit(t, ...e) {
    if (this.events[t] && this.events[t].length)
      for (let s = 0; s < this.events[t].length; s++)
        this.events[t][s](...e);
  }
}
class pe {
  constructor(t) {
    this.current = null, this.list = /* @__PURE__ */ new Map(), this.video = t;
  }
  /** 加载视频源 */
  load(t) {
    switch (this.destroyCurrent(), t.type) {
      case "flv":
        this.loadFlv(t);
        break;
      case "dash":
        this.loadDash(t);
        break;
      case "hls":
      case "m3u8":
        this.loadHls(t);
        break;
      default:
        this.loadNormal(t);
    }
  }
  /** 一般加载方式 */
  loadNormal(t) {
    this.video.$video.src = t.url, this.current = {
      ...t,
      destroy: () => {
        this.video.$video.src = "";
      }
    };
  }
  /** 加载flv */
  loadFlv(t) {
    if (flvjs != null && flvjs.isSupported()) {
      const e = flvjs.createPlayer({
        type: t.type || "flv",
        url: t.url,
        cors: !0
      });
      e.attachMediaElement(this.video.$video), e.load(), this.current = {
        ...t,
        destroy: () => {
          e.destroy();
        }
      };
    } else
      console.error("不支持flv加载");
  }
  /** 加载hls */
  loadHls(t) {
    if (Hls != null && Hls.isSupported()) {
      const e = new Hls();
      e.attachMedia(this.video.$video), e.loadSource(t.url), this.current = {
        ...t,
        destroy: () => {
          e.destroy();
        }
      };
    } else
      console.error("不支持hls加载");
  }
  /** 加载dash */
  loadDash(t) {
    if (dashjs) {
      const e = dashjs.MediaPlayer().create();
      e.initialize(this.video.$video, t.url, !0), this.current = {
        ...t,
        destroy: () => {
          e.destroy();
        }
      };
    } else
      console.error("不支持dash加载");
  }
  /** 销毁当前播放 */
  destroyCurrent() {
    var t;
    (t = this.current) == null || t.destroy(), this.current = null;
  }
}
const j = (i, t) => Array.from({ length: i }, () => t), me = () => document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null, $e = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || !1, ve = document.pictureInPictureEnabled, ht = (i) => {
  const t = i.split(/[:：]/).slice(-3), e = parseInt(t[t.length - 1]) || 0, s = parseInt(t[t.length - 2]) || 0, n = parseInt(t[t.length - 3]) || 0;
  return e + s * 60 + n * 3600;
}, kt = (i, t, e = !1) => {
  let s = null, n = !1;
  return function(...r) {
    s && clearTimeout(s), e && !n ? (i.apply(this, r), n = !0) : s = setTimeout(() => {
      i.apply(this, r), clearTimeout(s), s = null, n = !1;
    }, t);
  };
};
function H(i, t, e) {
  const s = document.createElement(i);
  if (t)
    for (const n in t)
      s.setAttribute(n, t[n]);
  return e && s.append(e), s;
}
const z = (i, t = !0) => {
  if (i = i || 0, i === 0 || i === 1 / 0 || i.toString() === "NaN")
    return "00:00";
  const e = (r) => r < 10 ? `0${r}` : `${r}`, s = Math.floor(i / 3600), n = Math.floor((i - s * 3600) / 60), l = Math.floor(i - s * 3600 - n * 60);
  return t ? (s > 0 ? [s, n, l] : [n, l]).map(e).join(":") : [s * 60 + n, l].map(e).join(":");
}, ge = (i) => (i[0] === "#" && (i = i.substr(1)), i.length === 3 && (i = `${i[0]}${i[0]}${i[1]}${i[1]}${i[2]}${i[2]}`), parseInt(i, 16) + 0 & 16777215), fe = (i) => `#${`00000${i.toString(16)}`.slice(-6)}`, it = {
  yyyy: (i) => i.getFullYear().toString(),
  yy: (i) => i.getFullYear().toString().slice(-2),
  MM: (i) => (i.getMonth() + 1).toString().padStart(2, "0"),
  dd: (i) => i.getDate().toString().padStart(2, "0"),
  HH: (i) => i.getHours().toString().padStart(2, "0"),
  mm: (i) => i.getMinutes().toString().padStart(2, "0"),
  ss: (i) => i.getSeconds().toString().padStart(2, "0")
}, wt = (i, t) => t.replace(
  /yyyy|yy|MM|dd|HH|mm|ss/g,
  (e) => {
    var s;
    return (s = it[e]) == null ? void 0 : s.call(it, i);
  }
), a = "mfuns-player", ye = "https://github.com/Mfuns-cn/mfunsPlayer/tree/v3-beta", be = [
  { name: "Minteea", id: "Minteea", link: "https://github.com/Minteea" },
  { name: "鲁迪钨丝", id: "Rudiusu", link: "https://github.com/Rudiusu" }
], ct = {
  play: () => [],
  pause: () => [],
  ended: () => [],
  loadeddata: () => [],
  loadedmetadata: () => [],
  waiting: () => [],
  playing: () => [],
  canplay: () => [],
  canplaythrough: () => [],
  timeupdate: (i) => [i.currentTime],
  durationchange: (i) => [i.duration],
  progress: (i) => [i.buffered],
  seeking: (i) => [i.currentTime],
  seeked: (i) => [i.currentTime],
  volumechange: (i) => [i.volume, i.muted],
  ratechange: (i) => [i.playbackRate],
  enterpictureinpicture: () => [],
  leavepictureinpicture: () => []
};
class ke {
  constructor(t, e) {
    this.ratio = null, this.player = t, this.$video = this.player.$content.appendChild(
      H("video", { class: `${a}-video` })
    ), this.loader = new pe(this), this.setRatio(e.aspectRatio || null), this.attachEvent(this.$video), this.initKeepRatio(), this.player.on("play", () => {
      this.player.$el.classList.remove("state-paused");
    }), this.player.on("pause", () => {
      this.player.$el.classList.add("state-paused");
    }), this.player.on("waiting", () => {
      this.player.$el.classList.add("state-loading");
    }), this.player.on("playing", () => {
      this.player.$el.classList.remove("state-loading");
    });
  }
  /** 加载视频 */
  load(t) {
    this.player.emit("video_load", t);
    const { url: e, type: s, play: n, time: l } = t;
    console.log({ url: e, type: s }), this.loader.load({ url: e, type: s }), this.player.once("loadedmetadata", () => {
      l && this.seek(l), n ? this.play() : this.player.$el.classList.add("state-paused");
    });
  }
  // 同步视频方法
  /** 播放 */
  play() {
    this.$video.play();
  }
  /** 暂停 */
  pause() {
    this.$video.pause();
  }
  /** 跳转 */
  seek(t) {
    this.$video.currentTime = t > 0 ? t < this.$video.duration ? t : this.$video.duration : 0;
  }
  // 同步设置视频属性
  /** 设置音量 */
  setVolume(t) {
    this.$video.volume = t > 0 ? t < 1 ? t : 1 : 0;
  }
  /** 设置倍速 */
  setPlaybackRate(t) {
    this.$video.playbackRate = t;
  }
  /** 设置静音 */
  setMute(t) {
    this.$video.muted = t;
  }
  // 视频播放属性
  /** 设置循环播放 */
  setLoop(t) {
    this.$video.loop = t, this.player.emitChange("loop", t);
  }
  /** 设置视频比例 */
  setRatio(t) {
    if (this.ratio = t, this.$video.style.width = "", this.$video.style.height = "", t) {
      const [e, s] = t;
      this.$video.style.aspectRatio = `${e}/${s}`, this.$video.style.objectFit = "fill";
      const { width: n, height: l } = this.$video.getBoundingClientRect(), { width: r, height: h } = this.player.$area.getBoundingClientRect();
      n == r && l == h && this.rescale(n, l, e, s);
    } else
      this.$video.style.aspectRatio = "", this.$video.style.objectFit = "";
    this.player.emitChange("aspectRatio", t);
  }
  get muted() {
    return this.$video.muted;
  }
  get playbackRate() {
    return this.$video.playbackRate;
  }
  get loop() {
    return this.$video.loop;
  }
  get volume() {
    return this.$video.volume;
  }
  get paused() {
    return this.$video.paused;
  }
  get duration() {
    return this.$video.duration;
  }
  get currentTime() {
    return this.$video.currentTime;
  }
  /** 添加视频事件 */
  attachEvent(t) {
    this.detachEventController = new AbortController();
    for (const e in ct) {
      const s = ct[e];
      t.addEventListener(
        e,
        () => {
          this.player.emit(
            e,
            ...s(t)
          );
        },
        { signal: this.detachEventController.signal }
      );
    }
  }
  /** 移除视频事件 */
  detachEvent() {
    var t;
    (t = this.detachEventController) == null || t.abort();
  }
  /** 保持视频比例 */
  initKeepRatio() {
    this.player.on("resize", ([t, e]) => {
      if (this.ratio) {
        this.$video.style.width = "", this.$video.style.height = "";
        const [s, n] = this.ratio, { width: l, height: r } = this.$video.getBoundingClientRect();
        console.log(`${l} x ${r} -- ${t} x ${e}`), Math.abs(l - t) < 1 && Math.abs(r - e) < 1 && this.rescale(t, e, s, n);
      }
    });
  }
  /** 根据当前视频宽高重新维持视频比例 */
  rescale(t, e, s, n) {
    const l = s * e, r = n * t;
    l < r ? (this.$video.style.width = `${l / r * 100}%`, this.$video.style.height = "100%") : (this.$video.style.width = "100%", this.$video.style.height = `${r / l * 100}%`);
  }
}
class we {
  constructor(t) {
    this.player = t, this.$el = this.player.$main;
    const e = () => {
      this.status ? (this.player.$el.classList.add("state-fullscreen"), this.player.emit("fullscreen_enter")) : (this.player.$el.classList.remove("state-fullscreen"), this.player.emit("fullscreen_exit"));
    };
    this.$el.addEventListener("fullscreenchange", e), this.$el.addEventListener("webkitfullscreenchange", e), this.$el.addEventListener("mozfullscreenchange", e), this.$el.addEventListener("msfullscreenchange", e);
  }
  /** 进入全屏模式 */
  enter() {
    if (this.status)
      return;
    const t = this.$el;
    t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.webkitEnterFullscreen ? t.webkitEnterFullscreen() : t.webkitEnterFullScreen ? t.webkitEnterFullScreen() : t.msRequestFullscreen && t.msRequestFullscreen();
  }
  /** 退出全屏模式 */
  exit() {
    if (!this.status)
      return;
    const t = document;
    document.exitFullscreen ? document.exitFullscreen() : t.mozCancelFullScreen ? t.mozCancelFullScreen() : t.webkitExitFullscreen ? t.webkitExitFullscreen() : t.webkitExitFullScreen ? t.webkitExitFullScreen() : this.$el.msExitFullscreen && this.$el.msExitFullscreen();
  }
  /** 是否处于全屏模式 */
  get status() {
    return me() == this.$el;
  }
}
class xe {
  constructor(t) {
    this.player = t, this.player.on("enterpictureinpicture", () => {
      this.player.$el.classList.add("state-pip"), this.player.emit("pip_enter");
    }), this.player.on("leavepictureinpicture", () => {
      this.player.$el.classList.remove("state-pip"), this.player.emit("pip_exit");
    });
  }
  /** 进入画中画模式 */
  enter() {
    this.status || this.player.$video.requestPictureInPicture();
  }
  /** 退出画中画模式 */
  exit() {
    this.status && document.exitPictureInPicture();
  }
  /** 是否已进入画中画模式 */
  get status() {
    return document.pictureInPictureElement == this.player.$video;
  }
}
class Se {
  constructor(t) {
    this.player = t, this.$el = this.player.$el;
  }
  /** 进入网页全屏 */
  enter() {
    this.$el.classList.add("state-webfull"), this.player.emit("webfull_enter");
  }
  /** 退出网页全屏 */
  exit() {
    this.$el.classList.remove("state-webfull"), this.player.emit("webfull_exit");
  }
  /** 是否处于网页全屏模式 */
  get status() {
    return this.$el.classList.contains("state-webfull");
  }
}
class Le {
  constructor(t, e) {
    this.player = t, this.webfull = new Se(this.player), this.fullscreen = new we(this.player), this.pip = new xe(this.player), this.init();
  }
  init() {
    this.player.on("webfull_enter", () => {
      this.player.exitFullscreen();
    }), this.player.on("fullscreen_enter", () => {
      this.player.exitWebfull();
    }), new ResizeObserver(([e]) => {
      const { width: s, height: n } = e.contentRect;
      this.player.emit("resize", [s, n]);
    }).observe(this.player.$content);
  }
}
class _e {
  constructor(t, e) {
    this.focused = !1, this.active = !1, this.controlled = !1, this.mousemove = !1, this.player = t, this.activeTime = e.activeTime ?? 3e3, this.init();
  }
  focus() {
    this.focused || (this.focused = !0, this.player.$el.classList.add("state-focus"), this.player.emit("focus"));
  }
  blur() {
    this.focused && (this.focused = !1, this.player.$el.classList.remove("state-focus"), this.player.emit("blur"));
  }
  init() {
    document.addEventListener(
      "click",
      () => {
        this.blur();
      },
      !0
    ), this.player.$el.addEventListener(
      "click",
      () => {
        this.focus();
      },
      !0
    );
    const t = kt(() => {
      this.mousemove = !1, this.removeActive();
    }, this.activeTime);
    this.player.$main.addEventListener("mousemove", () => {
      this.mousemove = !0, this.setActive(), t();
    }), this.player.$main.addEventListener("mouseleave", () => {
      this.mousemove = !1, this.removeActive();
    });
  }
  /** 设置播放器活跃状态 */
  setActive() {
    this.active || (this.player.$el.classList.add("state-active"), this.active = !0, this.player.emit("active"));
  }
  /** 试图移除播放器活跃状态 */
  removeActive() {
    !this.active || this.mousemove || this.controlled || this.player.hook.call("inactive").then((t) => {
      t && (this.player.$el.classList.remove("state-active"), this.active = !1, this.player.emit("inactive"));
    });
  }
}
class Ee {
  constructor() {
    this.hooks = {}, this.customEventList = [];
  }
  /** 注册钩子 */
  register(t, e, s = !1) {
    let n = this.hooks[t];
    n || (n = [], this.hooks[t] = n), s ? n.unshift(e) : n.push(e);
  }
  /** 移除钩子 */
  unregister(t, e) {
    let s = this.hooks[t];
    s || (s = [], this.hooks[t] = s);
    const n = s.indexOf(e);
    n > -1 && s.splice(n, 1);
  }
  /** 调用钩子函数 */
  async call(t, e) {
    const s = this.hooks[t];
    if (s != null && s.length)
      for (const n of s) {
        const l = await n(e);
        if (l == !0)
          return console.log(`钩子提前结束调用: ${t}`), console.log(n), !0;
        if (l == !1)
          return console.log(`钩子被拦截: ${t}`), console.log(n), !1;
      }
    return console.log(`钩子调用完毕: ${t}`), console.log(e), !0;
  }
}
class B {
  constructor(t) {
    this.event = new ue(), this.hook = new Ee(), this.plugin = {}, this.videoInfo = {}, this.container = t.container, this.$el = H("div", { class: a }), this.$main = this.$el.appendChild(H("div", { class: `${a}-main` })), this.$area = this.$main.appendChild(H("div", { class: `${a}-area` })), this.$content = this.$area.appendChild(
      H("div", { class: `${a}-content` })
    ), this.pluginManager = new de(this), this.video = new ke(this, t), this.sizing = new Le(this, t), this.state = new _e(this, t), this.pluginManager.pluginsRegister(t), this.pluginManager.pluginsReady(t), this.container.appendChild(this.$el), this.pluginManager.playerMounted(t), this.setVideo(t.video, t.autoPlay, t.time);
  }
  get $video() {
    return this.video.$video;
  }
  // --- 播放相关 --- //
  /** 加载视频 */
  setVideo(t, e, s) {
    this.videoInfo = t, this.hook.call("setVideo", t).then((n) => {
      n && (this.emit("video_change", t), t.url ? this.loadVideo({ url: t.url, type: t.type, play: e, time: s }) : this.throw(new Error("缺少视频播放信息")));
    });
  }
  /** 加载视频 */
  loadVideo(t) {
    this.videoInfo.url = t.url, this.videoInfo.type = t.type, this.hook.call("loadVideo", t).then((e) => {
      e && this.video.load(t);
    });
  }
  /** 切换视频 */
  switchVideo(t) {
    this.videoInfo.url = t.url, this.videoInfo.type = t.type, this.hook.call("switchVideo", t).then((e) => {
      e && this.video.load({ time: this.time, play: !this.paused, ...t });
    });
  }
  /** 开始播放 */
  play() {
    this.hook.call("play").then((t) => {
      t && this.video.play();
    });
  }
  /** 暂停播放 */
  pause() {
    this.hook.call("pause").then((t) => {
      t && this.video.pause();
    });
  }
  /** 切换播放/暂停状态 */
  toggle() {
    this.paused ? this.play() : this.pause();
  }
  /** 切换上一个 */
  prev() {
    this.hook.call("prev");
  }
  /** 切换下一个 */
  next() {
    this.hook.call("next");
  }
  /** 当前播放器暂停状态 */
  get paused() {
    return this.video.paused;
  }
  /** 跳转
   * @param time 跳转时间点（秒）
   */
  seek(t) {
    this.hook.call("seek").then((e) => {
      e && this.video.seek(t);
    });
  }
  /** 设置音量
   * @param volume 音量（0-1）
   */
  setVolume(t) {
    this.video.setVolume(t);
  }
  /**
   * 静音
   */
  mute() {
    this.video.setMute(!0);
  }
  /**
   * 取消静音
   */
  unmute() {
    this.video.setMute(!1);
  }
  /** 设置倍速 */
  setPlaybackRate(t) {
    this.video.setPlaybackRate(t);
  }
  /** 设置视频循环 */
  setLoop(t) {
    this.video.setLoop(t);
  }
  /** 设置视频循环 */
  setRatio(t) {
    this.video.setRatio(t);
  }
  /** 当前播放时间 */
  get time() {
    return this.video.currentTime;
  }
  /** 当前播放总时间 */
  get duration() {
    return this.video.duration;
  }
  /** 当前播放音量 */
  get volume() {
    return this.video.volume;
  }
  /** 当前静音状态 */
  get muted() {
    return this.video.muted;
  }
  /** 当前静音状态 */
  get loop() {
    return this.video.loop;
  }
  /** 当前播放速度 */
  get playbackRate() {
    return this.video.playbackRate;
  }
  // --- 尺寸模式相关 ---//
  /** 播放器进入全屏 */
  enterFullscreen() {
    this.sizing.fullscreen.enter();
  }
  /** 播放器退出全屏 */
  exitFullscreen() {
    this.sizing.fullscreen.exit();
  }
  /** 当前播放器是否处于全屏模式 */
  get isFullscreen() {
    return this.sizing.fullscreen.status;
  }
  /** 播放器进入网页全屏 */
  enterWebfull() {
    this.sizing.webfull.enter();
  }
  /** 播放器退出网页全屏 */
  exitWebfull() {
    this.sizing.webfull.exit();
  }
  /** 当前播放器是否处于网页全屏模式 */
  get isWebfull() {
    return this.sizing.webfull.status;
  }
  /** 播放器进入画中画模式 */
  enterPip() {
    this.sizing.pip.enter();
  }
  /** 播放器退出画中画模式 */
  exitPip() {
    this.sizing.pip.exit();
  }
  /** 当前播放器是否处于画中画模式 */
  get isPip() {
    return this.sizing.pip.status;
  }
  // --- 播放器状态控制 --- //
  /** 播放器进入聚焦状态 */
  focus() {
    this.state.focus();
  }
  /** 播放器取消聚焦状态 */
  blur() {
    this.state.blur();
  }
  /** 当前播放器聚焦状态 */
  get focused() {
    return this.state.focused;
  }
  /** 播放器进入活跃状态 */
  setActive() {
    this.state.setActive();
  }
  /** 播放器取消活跃状态 */
  removeActive() {
    this.state.removeActive();
  }
  /** 当前播放器活跃状态 */
  get active() {
    return this.state.active;
  }
  /** 播放器进入控制状态 */
  set controlled(t) {
    this.state.controlled = t;
  }
  /** 播放器取消控制状态 */
  get controlled() {
    return this.state.controlled;
  }
  // --- 事件 --- //
  /** 绑定新的视频元素 */
  bindVideo(t) {
    this.video.$video = t, this.video.detachEvent(), this.video.attachEvent(t);
  }
  /** 监听事件 */
  on(t, e) {
    this.event.on(t, e);
  }
  /** 取消监听事件 */
  off(t, e) {
    this.event.off(t, e);
  }
  /** 一次性监听事件 */
  once(t, e) {
    this.event.once(t, e);
  }
  /** 发送事件 */
  emit(t, ...e) {
    this.event.emit(t, ...e);
  }
  /** 发送属性变化 */
  emitChange(t, e) {
    this.event.emit("change", t, e), this.event.emit(`change:${t}`, e);
  }
  /** 监听属性变化 */
  watch(t, e) {
    this.event.on(`change:${t}`, e);
  }
  /** 取消监听属性变化 */
  unwatch(t, e) {
    this.event.off(`change:${t}`, e);
  }
  throw(t) {
    console.error(t), this.emit("error", t);
  }
  /** 播放器销毁 */
  destroy() {
    this.pluginManager.destroy();
  }
}
B.version = "3.0.0-dev";
B.gitHash = "9e5fd3c";
console.log(
  `
 %c mfunsPlayer v3.0.0-dev 9e5fd3c %c https://github.com/Mfuns-cn 

`,
  "color: #fff; background: #7b7ff7; padding:5px 0;",
  "background: #f5f5f5; padding:5px 0;"
);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var nt;
const tt = window, O = tt.trustedTypes, dt = O ? O.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, rt = "$lit$", M = `lit$${(Math.random() + "").slice(9)}$`, xt = "?" + M, Te = `<${xt}>`, V = document, K = () => V.createComment(""), Y = (i) => i === null || typeof i != "object" && typeof i != "function", St = Array.isArray, Ae = (i) => St(i) || typeof (i == null ? void 0 : i[Symbol.iterator]) == "function", at = `[ 	
\f\r]`, U = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ut = /-->/g, pt = />/g, N = RegExp(`>|${at}(?:([^\\s"'>=/]+)(${at}*=${at}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mt = /'/g, $t = /"/g, Lt = /^(?:script|style|textarea|title)$/i, Fe = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), p = Fe(1), Q = Symbol.for("lit-noChange"), A = Symbol.for("lit-nothing"), vt = /* @__PURE__ */ new WeakMap(), R = V.createTreeWalker(V, 129, null, !1);
function _t(i, t) {
  if (!Array.isArray(i) || !i.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return dt !== void 0 ? dt.createHTML(t) : t;
}
const Pe = (i, t) => {
  const e = i.length - 1, s = [];
  let n, l = t === 2 ? "<svg>" : "", r = U;
  for (let h = 0; h < e; h++) {
    const o = i[h];
    let c, u, f = -1, y = 0;
    for (; y < o.length && (r.lastIndex = y, u = r.exec(o), u !== null); )
      y = r.lastIndex, r === U ? u[1] === "!--" ? r = ut : u[1] !== void 0 ? r = pt : u[2] !== void 0 ? (Lt.test(u[2]) && (n = RegExp("</" + u[2], "g")), r = N) : u[3] !== void 0 && (r = N) : r === N ? u[0] === ">" ? (r = n ?? U, f = -1) : u[1] === void 0 ? f = -2 : (f = r.lastIndex - u[2].length, c = u[1], r = u[3] === void 0 ? N : u[3] === '"' ? $t : mt) : r === $t || r === mt ? r = N : r === ut || r === pt ? r = U : (r = N, n = void 0);
    const _ = r === N && i[h + 1].startsWith("/>") ? " " : "";
    l += r === U ? o + Te : f >= 0 ? (s.push(c), o.slice(0, f) + rt + o.slice(f) + M + _) : o + M + (f === -2 ? (s.push(void 0), h) : _);
  }
  return [_t(i, l + (i[e] || "<?>") + (t === 2 ? "</svg>" : "")), s];
};
class G {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let l = 0, r = 0;
    const h = t.length - 1, o = this.parts, [c, u] = Pe(t, e);
    if (this.el = G.createElement(c, s), R.currentNode = this.el.content, e === 2) {
      const f = this.el.content, y = f.firstChild;
      y.remove(), f.append(...y.childNodes);
    }
    for (; (n = R.nextNode()) !== null && o.length < h; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const f = [];
          for (const y of n.getAttributeNames())
            if (y.endsWith(rt) || y.startsWith(M)) {
              const _ = u[r++];
              if (f.push(y), _ !== void 0) {
                const L = n.getAttribute(_.toLowerCase() + rt).split(M), m = /([.?@])?(.*)/.exec(_);
                o.push({ type: 1, index: l, name: m[2], strings: L, ctor: m[1] === "." ? He : m[1] === "?" ? Me : m[1] === "@" ? Ne : et });
              } else
                o.push({ type: 6, index: l });
            }
          for (const y of f)
            n.removeAttribute(y);
        }
        if (Lt.test(n.tagName)) {
          const f = n.textContent.split(M), y = f.length - 1;
          if (y > 0) {
            n.textContent = O ? O.emptyScript : "";
            for (let _ = 0; _ < y; _++)
              n.append(f[_], K()), R.nextNode(), o.push({ type: 2, index: ++l });
            n.append(f[y], K());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === xt)
          o.push({ type: 2, index: l });
        else {
          let f = -1;
          for (; (f = n.data.indexOf(M, f + 1)) !== -1; )
            o.push({ type: 7, index: l }), f += M.length - 1;
        }
      l++;
    }
  }
  static createElement(t, e) {
    const s = V.createElement("template");
    return s.innerHTML = t, s;
  }
}
function W(i, t, e = i, s) {
  var n, l, r, h;
  if (t === Q)
    return t;
  let o = s !== void 0 ? (n = e._$Co) === null || n === void 0 ? void 0 : n[s] : e._$Cl;
  const c = Y(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== c && ((l = o == null ? void 0 : o._$AO) === null || l === void 0 || l.call(o, !1), c === void 0 ? o = void 0 : (o = new c(i), o._$AT(i, e, s)), s !== void 0 ? ((r = (h = e)._$Co) !== null && r !== void 0 ? r : h._$Co = [])[s] = o : e._$Cl = o), o !== void 0 && (t = W(i, o._$AS(i, t.values), o, s)), t;
}
class De {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var e;
    const { el: { content: s }, parts: n } = this._$AD, l = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : V).importNode(s, !0);
    R.currentNode = l;
    let r = R.nextNode(), h = 0, o = 0, c = n[0];
    for (; c !== void 0; ) {
      if (h === c.index) {
        let u;
        c.type === 2 ? u = new Z(r, r.nextSibling, this, t) : c.type === 1 ? u = new c.ctor(r, c.name, c.strings, this, t) : c.type === 6 && (u = new Ie(r, this, t)), this._$AV.push(u), c = n[++o];
      }
      h !== (c == null ? void 0 : c.index) && (r = R.nextNode(), h++);
    }
    return R.currentNode = V, l;
  }
  v(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class Z {
  constructor(t, e, s, n) {
    var l;
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cp = (l = n == null ? void 0 : n.isConnected) === null || l === void 0 || l;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = W(this, t, e), Y(t) ? t === A || t == null || t === "" ? (this._$AH !== A && this._$AR(), this._$AH = A) : t !== this._$AH && t !== Q && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Ae(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== A && Y(this._$AH) ? this._$AA.nextSibling.data = t : this.$(V.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: s, _$litType$: n } = t, l = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = G.createElement(_t(n.h, n.h[0]), this.options)), n);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === l)
      this._$AH.v(s);
    else {
      const r = new De(l, this), h = r.u(this.options);
      r.v(s), this.$(h), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = vt.get(t.strings);
    return e === void 0 && vt.set(t.strings, e = new G(t)), e;
  }
  T(t) {
    St(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const l of t)
      n === e.length ? e.push(s = new Z(this.k(K()), this.k(K()), this, this.options)) : s = e[n], s._$AI(l), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) === null || s === void 0 || s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class et {
  constructor(t, e, s, n, l) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = l, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = A;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, n) {
    const l = this.strings;
    let r = !1;
    if (l === void 0)
      t = W(this, t, e, 0), r = !Y(t) || t !== this._$AH && t !== Q, r && (this._$AH = t);
    else {
      const h = t;
      let o, c;
      for (t = l[0], o = 0; o < l.length - 1; o++)
        c = W(this, h[s + o], e, o), c === Q && (c = this._$AH[o]), r || (r = !Y(c) || c !== this._$AH[o]), c === A ? t = A : t !== A && (t += (c ?? "") + l[o + 1]), this._$AH[o] = c;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class He extends et {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === A ? void 0 : t;
  }
}
const qe = O ? O.emptyScript : "";
class Me extends et {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== A ? this.element.setAttribute(this.name, qe) : this.element.removeAttribute(this.name);
  }
}
class Ne extends et {
  constructor(t, e, s, n, l) {
    super(t, e, s, n, l), this.type = 5;
  }
  _$AI(t, e = this) {
    var s;
    if ((t = (s = W(this, t, e, 0)) !== null && s !== void 0 ? s : A) === Q)
      return;
    const n = this._$AH, l = t === A && n !== A || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== A && (n === A || l);
    l && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, s;
    typeof this._$AH == "function" ? this._$AH.call((s = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && s !== void 0 ? s : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ie {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    W(this, t);
  }
}
const gt = tt.litHtmlPolyfillSupport;
gt == null || gt(G, Z), ((nt = tt.litHtmlVersions) !== null && nt !== void 0 ? nt : tt.litHtmlVersions = []).push("2.8.0");
const v = (i, t, e) => {
  var s, n;
  const l = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : t;
  let r = l._$litPart$;
  if (r === void 0) {
    const h = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : null;
    l._$litPart$ = r = new Z(t.insertBefore(K(), h), h, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
class Re {
  constructor({
    el: t,
    getData: e,
    itemHeight: s,
    createItem: n,
    overflow: l = 0
  }) {
    this.data = [], this.scrollTop = 0, this.renderStart = -1, this.renderEnd = -1, this.viewStart = 0, this.viewEnd = 0, this.throttle = !1, this.cleared = !1, this.$el = t, this.getData = e, this.itemHeight = s, this.createItem = n, this.overflow = l, this.renderStart = -1, this.renderEnd = -1, this.viewStart = 0, this.viewEnd = 0, this.throttle = !1, this.cleared = !1, this.$el.classList.add("vlist-container"), this.$content = document.createElement("div"), this.$content.classList.add("vlist-content"), this.$el.appendChild(this.$content), this.$el.addEventListener("scroll", () => {
      this.cleared || this.handleScroll();
    }), this.reload();
  }
  /** 重载列表 */
  reload() {
    this.clear(), this.data = this.getData(), console.log(this.data), this.renderStart = -1, this.renderEnd = -1, this.viewStart = 0, this.viewEnd = 0, this.throttle = !1, this.handleScroll(), this.cleared = !1;
  }
  /** 更新列表 */
  update() {
    this.data = this.getData(), this.handleScroll();
  }
  handleScroll() {
    if (!this.throttle) {
      const t = this.$el.clientHeight, e = this.$el.scrollTop;
      t && (this.scrollTop = e), this.viewStart = this.getViewStart(e), this.viewEnd = this.getViewEnd(e, t), (this.viewStart <= this.renderStart || this.viewEnd >= this.renderEnd) && this.render(t, e);
    }
  }
  render(t, e) {
    const s = this.renderStart, n = this.renderEnd;
    if (this.renderStart = this.getViewStart(e) - this.overflow, this.renderEnd = this.getViewEnd(e, t) + this.overflow, this.renderStart < s) {
      const l = document.createDocumentFragment(), r = Math.max(this.renderStart, 0), h = Math.min(s - 1, this.renderEnd, this.data.length - 1);
      for (let o = r; o <= h; o++)
        l.appendChild(this.createItem(this.data[o], o, this.data));
      this.$content.insertBefore(l, this.$content.firstElementChild);
    } else {
      const l = Math.max(s, 0), r = Math.min(this.renderStart - 1, n);
      for (let h = l; h <= r; h++) {
        const o = this.$content.firstElementChild;
        o && this.$content.removeChild(o);
      }
    }
    if (this.renderEnd > n) {
      const l = document.createDocumentFragment(), r = Math.max(n + 1, this.renderStart), h = Math.min(this.renderEnd, this.data.length - 1);
      for (let o = r; o <= h; o++)
        l.appendChild(this.createItem(this.data[o], o, this.data));
      this.$content.appendChild(l);
    } else {
      const l = Math.min(n, this.data.length - 1), r = Math.max(this.renderEnd + 1, s);
      for (let h = l; h >= r; h--) {
        const o = this.$content.lastElementChild;
        o && this.$content.removeChild(o);
      }
    }
    this.$content.style.paddingTop = `${this.renderStart > 0 ? this.renderStart * this.itemHeight : 0}px`, this.$content.style.paddingBottom = `${this.renderEnd < this.data.length - 1 ? (this.data.length - this.renderEnd - 1) * this.itemHeight : 0}px`;
  }
  getViewStart(t) {
    return Math.floor(t / this.itemHeight);
  }
  getViewEnd(t, e) {
    return Math.ceil((t + e) / this.itemHeight) - 1;
  }
  // 清空列表
  clear() {
    this.data = [], this.$content.innerHTML = "", this.$content.style.paddingTop = "0px", this.$content.style.paddingBottom = "0px", this.cleared = !0;
  }
  locateStart(t) {
    this.scrollTo(t * this.itemHeight);
  }
  locateEnd(t) {
    this.scrollTo(t * this.itemHeight - this.$el.clientHeight);
  }
  scrollTo(t) {
    this.$el.scrollTo({
      top: t,
      behavior: "auto"
    });
  }
}
class F {
  constructor(t) {
    this.player = t;
  }
}
class D extends F {
  constructor(t, e, {
    name: s,
    defaultOptions: n,
    el: l,
    disabled: r
  }) {
    var o, c, u;
    super(t);
    const h = (o = e.controls) == null ? void 0 : o[s];
    this.container = (c = (h == null ? void 0 : h.container) || n.container) == null ? void 0 : c(t), this.order = (h == null ? void 0 : h.order) || n.order, this.$el = l, this.$el.style.order = (this.order || "").toString(), !r && ((u = this.container) == null || u.append(this.$el));
  }
  $(t) {
    return this.$el.querySelector(t);
  }
}
class st extends F {
  constructor(t, e, {
    name: s,
    defaultOptions: n,
    el: l
  }) {
    var h, o, c;
    super(t), this.shown = !1, console.log(s), console.log(l), this.$el = l;
    const r = ((h = e.panels) == null ? void 0 : h[s]) || n;
    r != null && r.mount ? (o = r == null ? void 0 : r.mount(t)) == null || o.mount(this) : (this.container = (c = r == null ? void 0 : r.container) == null ? void 0 : c.call(r, t), this.onToggle = r == null ? void 0 : r.onToggle, this.onUnmount = r == null ? void 0 : r.onUnmount);
  }
  mount(t, e, s) {
    t.appendChild(this.$el), this.unmount(), this.onToggle = e, this.onUnmount = s;
  }
  unmount() {
    var t;
    this.toggle(!1), (t = this.onUnmount) == null || t.call(this), this.onToggle = void 0, this.onUnmount = void 0;
  }
  toggle(t) {
    var e;
    this.shown = t ?? !this.shown, (e = this.onToggle) == null || e.call(this, this.shown);
  }
  $(t) {
    return this.$el.querySelector(t);
  }
}
const Be = (i) => p`
  <div class="${a}-danmakulist">
    <div class="${a}-danmakulist-main">
      <div class="${a}-danmakulist-head">
        <div class="list-column col-time">时间</div>
        <div class="list-column col-content">弹幕内容</div>
        <div class="list-column col-date">发送时间</div>
      </div>
      <div class="${a}-danmakulist-select">
        <div class="${a}-danmakulist-select-info"></div>
        <div class="${a}-danmakulist-select-operate">
          <div class="list-operate-btn" @click=${i}>取消选择</div>
        </div>
      </div>
      <div class="${a}-danmakulist-container"></div>
      <div class="${a}-danmakulist-status">
        <div class="status-loading-text">弹幕列表装填中……</div>
        <div class="status-failed-text">弹幕加载失败 X_X</div>
        <div class="status-empty-text">还没有弹幕哦，快来发弹幕^_^</div>
      </div>
    </div>
    <div class="${a}-danmakulist-foot">
      <div class="${a}-danmakulist-foot-left">
        <span class="${a}-danmakulist-autoscroll">列表滚动[关]</span>
      </div>
      <div class="${a}-danmakulist-foot-right"></div>
    </div>
  </div>
`, Ve = (i, t, {
  operation: e,
  onClick: s,
  onDblclick: n,
  selected: l,
  focused: r,
  title: h
}) => {
  const o = p`
    <div
      class="${`list-row ${l(i) ? "state-selected" : ""} ${r(i) ? "state-focused" : ""}`.trim()}"
      data-index="${t}"
      data-mode="${i.mode}"
      @dblclick=${(u) => {
    n(u, i);
  }}
      @click=${(u) => {
    s(u, i);
  }}
      title="${h(i)}"
    >
      <div class="list-cell col-time">${z(i.time)}</div>
      <div class="list-cell col-content">${i.content}</div>
      <div class="list-cell col-date">
        ${i.date ? wt(new Date(i.date * 1e3), "yy-MM-dd HH:mm") : "-"}
      </div>
      ${e.length ? p`<div class="list-operate" title="">
            ${e(i).map(
    ([u, f]) => p`<div
                class="list-operate-btn"
                @click=${(y) => {
      y.stopPropagation(), f(i);
    }}
              >
                ${u}
              </div>`
  )}
          </div>` : ""}
    </div>
  `, c = new DocumentFragment();
  return v(o, c), c.firstElementChild;
};
class Et extends st {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(
      Be(() => this.select([])),
      s
    ), super(t, e, {
      name: "danmakuList",
      defaultOptions: {
        mount: (n) => n.plugin.side
      },
      el: s.querySelector(`.${a}-danmakulist`)
    }), this.title = "弹幕列表", this.data = [], this.selected = [], this.focused = null, this.sortedBy = "time", this.sortOrder = -1, this.autoScroll = !0, this.frozen = !1, this.mounted = !1, this.player = t, this.danmaku = t.plugin.danmaku, this.$main = this.$(`.${a}-danmakulist-main`), this.$container = this.$(`.${a}-danmakulist-container`), this.$status = this.$(`.${a}-danmakulist-status`), this.$colTime = this.$(".col-time"), this.$colDate = this.$(".col-date"), this.$colContent = this.$(".col-content"), this.$autoscroll = this.$(`.${a}-danmakulist-autoscroll`), this.$select = this.$(`.${a}-danmakulist-select`), this.$selectInfo = this.$(`.${a}-danmakulist-select-info`), this.$colTime.onclick = () => {
      this.setAutoScroll(!1), this.sortedBy == "time" ? this.sort("time", -this.sortOrder) : this.sort("time", 1);
    }, this.$colDate.onclick = () => {
      this.setAutoScroll(!1), this.sortedBy == "date" ? this.sort("date", -this.sortOrder) : this.sort("date", 1);
    }, this.$colContent.onclick = () => {
      this.setAutoScroll(!1), this.sortedBy == "content" ? this.sort("content", -this.sortOrder) : this.sort("content", 1);
    }, this.$autoscroll.onclick = () => {
      this.setAutoScroll(!this.autoScroll);
    }, this.player.watch("danmakuList.autoScroll", (n) => {
      n ? this.$autoscroll.innerText = "列表滚动[开]" : this.$autoscroll.innerText = "列表滚动[关]";
    }), this.autoScroll && this.player.emitChange("danmakuList.autoScroll", !0), this.player.on("danmakuList:select", (n) => {
      const l = n.length;
      this.$selectInfo.innerText = l ? `已选择${l}条弹幕` : "", this.$select.classList.toggle("state-show", l > 1);
    });
  }
  mount(t, e, s) {
    var l;
    super.mount(t, e, s);
    const n = (l = this.list) == null ? void 0 : l.scrollTop;
    console.log("mountpos: " + n), requestAnimationFrame(() => {
      var r;
      n != null && ((r = this.list) == null || r.scrollTo(n)), -this.autoScroll && this.locateByTime(this.player.time);
    });
  }
  toggle(t) {
    var e, s;
    if (super.toggle(t), this.shown) {
      const n = (e = this.list) == null ? void 0 : e.scrollTop;
      console.log("togglepos: " + n), n != null && ((s = this.list) == null || s.scrollTo(n)), this.autoScroll && this.locateByTime(this.player.time);
    }
  }
  created() {
    var n;
    const t = (n = this.danmaku) == null ? void 0 : n.api, e = this.danmaku.operate;
    this.list = new Re({
      el: this.$container,
      getData: () => this.data,
      itemHeight: 24,
      createItem: (l, r) => Ve(l, r, {
        operation: (h) => {
          const o = this.player.userId && h.user == this.player.userId;
          return [
            [
              "举报",
              (c) => {
                e.report(c);
              },
              !o && (t == null ? void 0 : t.danmakuReport)
            ],
            [
              "屏蔽",
              (c) => {
                e.blockUser(c.user, !0);
              },
              !o && (t == null ? void 0 : t.danmakuBlockUser)
            ],
            [
              "撤回",
              (c) => {
                e.recall(c);
              },
              o && (t == null ? void 0 : t.danmakuRecall)
            ]
          ].filter((c) => c[2]);
        },
        onClick: (h, o) => {
          this.clickSelect(o, h.shiftKey, h.ctrlKey);
        },
        onDblclick: (h, o) => {
          this.player.seek(o.time);
        },
        selected: (h) => this.selected.includes(h),
        focused: (h) => this.focused == h,
        title: (h) => `${h.content}
${l.date ? wt(new Date(l.date * 1e3), "yyyy-MM-dd HH:mm:ss") : "-"} @ ${z(l.time, !1)}`
      }),
      overflow: 5
    });
    const s = kt(() => {
      this.frozen = !1;
    }, 5e3);
    this.list.$el.addEventListener("wheel", () => {
      this.frozen = !0, s();
    }), this.list.$el.addEventListener("mousedown", () => {
      this.frozen = !0, s();
    }), this.$main.addEventListener("mouseleave", () => {
      this.frozen = !1;
    }), this.player.on("video_change", () => {
      this.clear();
    }), this.player.on("danmaku:loaded", (l) => {
      this.fill(l), this.autoScroll && this.sort("time");
    }), this.player.on("danmaku:addition_loaded", (l, r) => {
      this.fill(r), this.autoScroll && this.sort("time");
    }), this.player.on("timeupdate", (l) => {
      this.autoScroll && !this.frozen && this.locateByTime(l);
    }), this.player.on("danmaku:select", (l) => {
      this.locateByDanmaku(l), this.select([l]);
    });
  }
  /** 弹幕列表排序 */
  sort(t, e = 1) {
    this.sortedBy = t, this.sortOrder = e, this.data.sort((s, n) => {
      const l = s[this.sortedBy], r = n[this.sortedBy];
      return l > r ? e : l == r ? 0 : -e;
    }), this.list.reload();
  }
  /** 装填弹幕(重载列表) */
  fill(t) {
    this.data = this.data.concat(t), this.data.length ? (this.reload(), this.setStatus()) : this.setStatus("empty");
  }
  /** 添加弹幕(不重载列表) */
  add(t) {
    this.data = this.data.concat(t), this.data.length ? (this.list.update(), this.setStatus()) : this.setStatus("empty");
  }
  /** 重载弹幕列表 */
  reload() {
    this.sort(this.sortedBy, this.sortOrder), this.autoScroll && this.locateByTime(this.player.time);
  }
  clear() {
    this.list.clear(), this.data = [], this.setStatus("loading");
  }
  setStatus(t = "") {
    this.$status.dataset.status = t, console.log("弹幕加载状态" + t);
  }
  /** 根据播放时间定位 */
  locateByTime(t) {
    var s, n;
    let e = this.list.viewEnd;
    for (((s = this.data[e]) == null ? void 0 : s.time) > t && (e = 0); ((n = this.data[e + 1]) == null ? void 0 : n.time) <= t; )
      e++;
    this.list.locateEnd(e);
  }
  /** 定位弹幕 */
  locateByDanmaku(t) {
    const e = this.data.indexOf(t);
    e > -1 && (this.list.locateStart(e), this.frozen = !0);
  }
  setAutoScroll(t) {
    this.player.emitChange("danmakuList.autoScroll", t), this.autoScroll = t, t && (this.frozen = !1, this.sort("time"), this.locateByTime(this.player.time), this.list.handleScroll());
  }
  /** 设置选定状态 */
  select(t, e) {
    this.selected = t;
    const s = [];
    this.focused = e || (t.length == 1 ? t[0] : null);
    const n = this.data.indexOf(this.focused);
    t.forEach((l) => {
      const r = this.data.indexOf(l);
      s.push(r);
    });
    for (const l of this.list.$content.children)
      l.classList.toggle(
        "state-selected",
        s.includes(Number(l.dataset.index))
      ), l.classList.toggle(
        "state-focused",
        n == Number(l.dataset.index)
      );
    this.player.emit("danmakuList:select", this.selected);
  }
  /** 设置某条弹幕的选定状态，若选定则聚焦弹幕，否则取消聚焦 */
  toggleSelect(t, e) {
    const s = this.list.$content.querySelector(
      `[data-index="${this.data.indexOf(this.focused)}"]`
    ), n = this.list.$content.querySelector(`[data-index="${this.data.indexOf(t)}"]`);
    if (e)
      this.selected.includes(t) || this.selected.push(t), this.focused = t, n == null || n.classList.add("state-selected"), n == null || n.classList.add("state-focused");
    else if (!e) {
      const l = this.selected.indexOf(t);
      l > -1 && this.selected.splice(l, 1), n == null || n.classList.remove("state-selected"), s == null || s.classList.remove("state-focused");
    }
    this.player.emit("danmakuList:select", this.selected);
  }
  /** 单击选定弹幕 */
  clickSelect(t, e, s) {
    if (e)
      if (this.focused) {
        const n = this.data.indexOf(t), l = this.data.indexOf(this.focused);
        if (n == -1 || l == -1)
          this.select([t]);
        else {
          const r = n < l ? n : l, h = (n < l ? l : n) + 1;
          this.select(this.data.slice(r, h), this.focused);
        }
      } else
        this.select([t]);
    else
      s ? this.toggleSelect(t, !this.selected.includes(t)) : this.selected.length == 1 && this.selected[0] == t ? this.select([]) : this.select([t]);
  }
}
Et.pluginName = "danmakuList";
var I = /* @__PURE__ */ ((i) => (i[i.Backspace = 8] = "Backspace", i[i.Tab = 9] = "Tab", i[i.Enter = 13] = "Enter", i[i.Shift = 16] = "Shift", i[i.Ctrl = 17] = "Ctrl", i[i.Alt = 18] = "Alt", i[i.PauseBreak = 19] = "PauseBreak", i[i.CapsLock = 20] = "CapsLock", i[i.Escape = 27] = "Escape", i[i.Space = 32] = "Space", i[i.PageUp = 33] = "PageUp", i[i.PageDown = 34] = "PageDown", i[i.End = 35] = "End", i[i.Home = 36] = "Home", i[i.LeftArrow = 37] = "LeftArrow", i[i.UpArrow = 38] = "UpArrow", i[i.RightArrow = 39] = "RightArrow", i[i.DownArrow = 40] = "DownArrow", i[i.Insert = 45] = "Insert", i[i.Delete = 46] = "Delete", i[i.Zero = 48] = "Zero", i[
  i.ClosedParen = 48
  /* Zero */
] = "ClosedParen", i[i.One = 49] = "One", i[
  i.ExclamationMark = 49
  /* One */
] = "ExclamationMark", i[i.Two = 50] = "Two", i[
  i.AtSign = 50
  /* Two */
] = "AtSign", i[i.Three = 51] = "Three", i[
  i.PoundSign = 51
  /* Three */
] = "PoundSign", i[
  i.Hash = 51
  /* PoundSign */
] = "Hash", i[i.Four = 52] = "Four", i[
  i.DollarSign = 52
  /* Four */
] = "DollarSign", i[i.Five = 53] = "Five", i[
  i.PercentSign = 53
  /* Five */
] = "PercentSign", i[i.Six = 54] = "Six", i[
  i.Caret = 54
  /* Six */
] = "Caret", i[
  i.Hat = 54
  /* Caret */
] = "Hat", i[i.Seven = 55] = "Seven", i[
  i.Ampersand = 55
  /* Seven */
] = "Ampersand", i[i.Eight = 56] = "Eight", i[
  i.Star = 56
  /* Eight */
] = "Star", i[
  i.Asterik = 56
  /* Star */
] = "Asterik", i[i.Nine = 57] = "Nine", i[
  i.OpenParen = 57
  /* Nine */
] = "OpenParen", i[i.A = 65] = "A", i[i.B = 66] = "B", i[i.C = 67] = "C", i[i.D = 68] = "D", i[i.E = 69] = "E", i[i.F = 70] = "F", i[i.G = 71] = "G", i[i.H = 72] = "H", i[i.I = 73] = "I", i[i.J = 74] = "J", i[i.K = 75] = "K", i[i.L = 76] = "L", i[i.M = 77] = "M", i[i.N = 78] = "N", i[i.O = 79] = "O", i[i.P = 80] = "P", i[i.Q = 81] = "Q", i[i.R = 82] = "R", i[i.S = 83] = "S", i[i.T = 84] = "T", i[i.U = 85] = "U", i[i.V = 86] = "V", i[i.W = 87] = "W", i[i.X = 88] = "X", i[i.Y = 89] = "Y", i[i.Z = 90] = "Z", i[i.LeftWindowKey = 91] = "LeftWindowKey", i[i.RightWindowKey = 92] = "RightWindowKey", i[i.SelectKey = 93] = "SelectKey", i[i.Numpad0 = 96] = "Numpad0", i[i.Numpad1 = 97] = "Numpad1", i[i.Numpad2 = 98] = "Numpad2", i[i.Numpad3 = 99] = "Numpad3", i[i.Numpad4 = 100] = "Numpad4", i[i.Numpad5 = 101] = "Numpad5", i[i.Numpad6 = 102] = "Numpad6", i[i.Numpad7 = 103] = "Numpad7", i[i.Numpad8 = 104] = "Numpad8", i[i.Numpad9 = 105] = "Numpad9", i[i.Multiply = 106] = "Multiply", i[i.Add = 107] = "Add", i[i.Subtract = 109] = "Subtract", i[i.DecimalPoint = 110] = "DecimalPoint", i[i.Divide = 111] = "Divide", i[i.F1 = 112] = "F1", i[i.F2 = 113] = "F2", i[i.F3 = 114] = "F3", i[i.F4 = 115] = "F4", i[i.F5 = 116] = "F5", i[i.F6 = 117] = "F6", i[i.F7 = 118] = "F7", i[i.F8 = 119] = "F8", i[i.F9 = 120] = "F9", i[i.F10 = 121] = "F10", i[i.F11 = 122] = "F11", i[i.F12 = 123] = "F12", i[i.NumLock = 144] = "NumLock", i[i.ScrollLock = 145] = "ScrollLock", i[i.SemiColon = 186] = "SemiColon", i[i.Equals = 187] = "Equals", i[i.Comma = 188] = "Comma", i[i.Dash = 189] = "Dash", i[i.Period = 190] = "Period", i[
  i.UnderScore = 189
  /* Dash */
] = "UnderScore", i[
  i.PlusSign = 187
  /* Equals */
] = "PlusSign", i[i.ForwardSlash = 191] = "ForwardSlash", i[i.Tilde = 192] = "Tilde", i[
  i.GraveAccent = 192
  /* Tilde */
] = "GraveAccent", i[i.OpenBracket = 219] = "OpenBracket", i[i.ClosedBracket = 221] = "ClosedBracket", i[i.Quote = 222] = "Quote", i))(I || {});
const ze = ({ divider: i }) => p` <div
  class="${a}-slider ${a}-slider-horizontal"
  style="position: relative; width: 100%; height: 100%"
>
  <div
    class="${a}-slider-track"
    style="
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <div class="${a}-slider-bar" style="position: absolute; left: 0; height: 100%"></div>
    <div class="${a}-slider-thumb-track" style="height: 0px">
      <div
        class="${a}-slider-thumb"
        style="position: absolute; transform: translate(-50%, -50%)"
      ></div>
      ${i ? p`
            <div class="${a}-slider-divider">
              ${j(i, p`<div class="${a}-slider-divider-dot"></div>`)}
            </div>
          ` : ""}
    </div>
  </div>
</div>`;
class J {
  constructor({
    container: t,
    min: e,
    max: s,
    step: n,
    divider: l = 0,
    value: r = 0,
    onChange: h,
    onDragStart: o,
    onDragEnd: c,
    onDrag: u
  }) {
    this.container = t, this.min = e, this.max = s, this.step = n || 0, this.divider = l ? typeof l == "boolean" ? this.step : l : 0, this.value = isNaN(r) ? r : Number(r), this.onChange = h, this.onDragStart = o, this.onDragEnd = c, this.onDrag = u, v(ze({ divider: this.divider }), t), this.$el = this.container.querySelector(`.${a}-slider`), this.$track = this.$el.querySelector(`.${a}-slider-track`), this.$bar = this.$track.querySelector(`.${a}-slider-bar`), this.$thumbTrack = this.$track.querySelector(`.${a}-slider-thumb-track`), this.$thumb = this.$track.querySelector(`.${a}-slider-thumb`), this.$el.addEventListener("mousedown", (f) => {
      var w;
      const y = f, { clientX: _ } = y, L = this.$track.offsetWidth;
      let m = this.$thumbTrack.offsetWidth;
      m = m || L;
      const $ = (L - m) / 2, d = this.$el.getBoundingClientRect().left;
      let g = _ - d - $;
      g = g >= m ? m : g <= 0 ? 0 : g;
      const S = this.step ? Math.round(g / m * (this.max - this.min) / this.step) * this.step + this.min : g / m * (this.max - this.min) + this.min;
      (w = this.onDragStart) == null || w.call(this, S), this.value != S && this.drag(S);
      const k = (x) => {
        var ot;
        const P = x, { clientX: b } = P;
        P.preventDefault(), P.stopPropagation();
        let E = b - d - $;
        E = E >= m ? m : E <= 0 ? 0 : E;
        const q = this.step ? Math.round(E / m * (this.max - this.min) / this.step) * this.step + this.min : E / m * (this.max - this.min) + this.min;
        this.value != q && this.drag(q), (ot = window.getSelection()) == null || ot.removeAllRanges();
      }, T = (x) => {
        var b, E;
        x.stopPropagation(), (b = window.getSelection()) == null || b.removeAllRanges(), document.removeEventListener("mousemove", k), document.removeEventListener("mouseup", T), (E = this.onDragEnd) == null || E.call(this, S);
      };
      document.addEventListener("mousemove", k), document.addEventListener("mouseup", T);
    }), this.setValue(this.value);
  }
  /** 设置滑动条值 */
  setValue(t) {
    var s;
    this.value = t <= this.min ? this.min : t >= this.max ? this.max : t;
    const e = (this.value - this.min) / (this.max - this.min);
    this.$thumb.style.left = `${e * 100}%`, this.$bar.style.width = `${e * 100}%`, (s = this.onChange) == null || s.call(this, this.value);
  }
  /** 拖动滑动条到特定的值 */
  drag(t) {
    var e;
    this.setValue(t), (e = this.onDrag) == null || e.call(this, this.value);
  }
}
const Oe = () => p`
  <div
    class="${a}-slider ${a}-slider-vertical"
    style="position: relative; width: 100%; height: 100%"
  >
    <div
      class="${a}-slider-track"
      style="
        position: absolute;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center
      "
    >
      <div
        class="${a}-slider-bar"
        style="position: absolute; bottom: 0; width: 100%"
      ></div>
      <div class="${a}-slider-thumb-track" style="width: 0px">
        <div
          class="${a}-slider-thumb"
          style="position: absolute; transform: translate(-50%, -50%)"
        ></div>
      </div>
    </div>
  </div>
`;
class We {
  constructor({
    container: t,
    min: e,
    max: s,
    step: n,
    value: l = 0,
    onChange: r,
    onDragStart: h,
    onDragEnd: o,
    onDrag: c
  }) {
    this.container = t, this.min = e, this.max = s, this.step = n || 0, this.value = isNaN(l) ? l : Number(l), this.onChange = r, this.onDragStart = h, this.onDragEnd = o, this.onDrag = c, v(Oe(), t), this.$el = this.container.querySelector(`.${a}-slider`), this.$track = this.$el.querySelector(`.${a}-slider-track`), this.$bar = this.$track.querySelector(`.${a}-slider-bar`), this.$thumbTrack = this.$track.querySelector(`.${a}-slider-thumb-track`), this.$thumb = this.$track.querySelector(`.${a}-slider-thumb`), this.$el.addEventListener("mousedown", (u) => {
      var T;
      const f = u, { clientY: y } = f, _ = this.$track.offsetHeight;
      let L = this.$thumbTrack.offsetHeight;
      L = L || _;
      const m = (_ - L) / 2, $ = this.$el.getBoundingClientRect().top;
      let d = L - (y - $ - m);
      d = d >= L ? L : d <= 0 ? 0 : d;
      const g = this.step ? Math.round(d / L * (this.max - this.min) / this.step) * this.step + this.min : d / L * (this.max - this.min) + this.min;
      (T = this.onDragStart) == null || T.call(this, g), this.value != g && this.drag(g);
      const S = (w) => {
        var q;
        const x = w, { clientY: P } = x;
        x.preventDefault(), x.stopPropagation();
        let b = L - (P - $ - m);
        b = b >= L ? L : b <= 0 ? 0 : b;
        const E = this.step ? Math.round(b / L * (this.max - this.min) / this.step) * this.step + this.min : b / L * (this.max - this.min) + this.min;
        this.value != E && this.drag(E), (q = window.getSelection()) == null || q.removeAllRanges();
      }, k = (w) => {
        var P, b;
        w.stopPropagation(), (P = window.getSelection()) == null || P.removeAllRanges(), document.removeEventListener("mousemove", S), document.removeEventListener("mouseup", k), (b = this.onDragEnd) == null || b.call(this, g);
      };
      document.addEventListener("mousemove", S), document.addEventListener("mouseup", k);
    }), this.setValue(this.value);
  }
  /** 设置滑动条值 */
  setValue(t) {
    var s;
    this.value = Math.max(Math.min(t, this.max), this.min);
    const e = (this.value - this.min) / (this.max - this.min);
    this.$thumb.style.top = `${(1 - e) * 100}%`, this.$bar.style.height = `${Math.max(Math.min(e, 1), 0) * 100}%`, (s = this.onChange) == null || s.call(this, t);
  }
  /** 拖动滑动条到特定的值 */
  drag(t) {
    var e;
    this.setValue(t), (e = this.onDrag) == null || e.call(this, this.value);
  }
}
const Ue = ({
  list: i,
  template: t
}) => p`
  <ul class="${a}-picker">
    ${i.map(
  (e, s) => p`
        <li class="${a}-picker-item" data-value="${e.value}">
          ${(t == null ? void 0 : t(e, s)) || e.label || e.value}
        </li>
      `
)}
  </ul>
`;
class X {
  constructor({ container: t, value: e, onChange: s, onPick: n, list: l, template: r, condition: h }) {
    this.container = t, this.list = l, this.value = e ?? null, this.onChange = s, this.onPick = n, this.template = r, this.condition = h, this.reload();
  }
  /** 重载，一般用于列表项更改 */
  reload(t) {
    v(Ue({ list: this.list, template: this.template }), this.container), this.$el = this.container.querySelector(`.${a}-picker`), this.$items = this.$el.querySelectorAll(`.${a}-picker-item`), this.$items.forEach((e) => {
      e.addEventListener("click", () => {
        this.pick(e.getAttribute("data-value"));
      });
    }), this.setValue(t ?? this.value);
  }
  /** 设置值 */
  setValue(t) {
    var e;
    this.$items.forEach((s, n) => {
      (this.condition ? this.condition(s.getAttribute("data-value"), t) : s.getAttribute("data-value") == t) ? s.classList.add("state-picked") : s.classList.remove("state-picked");
    }), this.value = t, (e = this.onChange) == null || e.call(this, t);
  }
  /** 点选一个选项 */
  pick(t) {
    var e;
    this.setValue(t), (e = this.onPick) == null || e.call(this, t);
  }
}
const je = ({
  list: i,
  template: t
}) => p`
  <ul class="${a}-picker">
    ${i.map(
  (e, s) => p`
        <li class="${a}-picker-item" data-value="${e.value}">
          ${(t == null ? void 0 : t(e, s)) || e.label || e.value}
        </li>
      `
)}
  </ul>
`;
class Xe {
  /** 已选值 */
  get value() {
    return [...this.valueSet];
  }
  constructor({ container: t, value: e = [], list: s, onChange: n, onToggle: l }) {
    this.container = t, this.list = s, this.valueSet = new Set(e), this.onChange = n, this.onToggle = l, this.reload();
  }
  /** 重载，一般用于列表项更改 */
  reload(t) {
    v(je({ list: this.list, template: this.template }), this.container), this.$el = this.container.querySelector(`.${a}-picker`), this.$items = this.$el.querySelectorAll(`.${a}-picker-item`), this.$items.forEach((e) => {
      e.addEventListener("click", () => {
        this.toggle(e.getAttribute("data-value"));
      });
    }), this.setValue(t ?? this.value);
  }
  /** 设置值 */
  setValue(t) {
    var e;
    this.valueSet = new Set(t), this.$items.forEach((s, n) => {
      this.valueSet.has(s.getAttribute("data-value")) ? s.classList.add("state-picked") : s.classList.remove("state-picked");
    }), (e = this.onChange) == null || e.call(this, t);
  }
  /** 切换一个选项的选择状态 */
  toggle(t, e) {
    var n, l;
    const s = e ?? !this.valueSet.has(t);
    s ? this.valueSet.add(t) : this.valueSet.delete(t), this.$items.forEach((r, h) => {
      r.getAttribute("data-value") == t && r.classList.toggle("state-picked", s);
    }), (n = this.onChange) == null || n.call(this, this.value), (l = this.onToggle) == null || l.call(this, t, s);
  }
}
const Ke = ({ label: i }) => p`
  <div class="${a}-checkbox">
    <div class="${a}-checkbox-icon"></div>
    <div class="${a}-checkbox-label">${i}</div>
  </div>
`;
class Tt {
  constructor({ container: t, value: e = !1, onChange: s, onToggle: n, label: l }) {
    this.container = t, this.value = e, this.onChange = s, this.onToggle = n, this.label = l, v(Ke({ label: this.label }), this.container), this.$el = this.container.querySelector(`.${a}-checkbox`), this.$el.addEventListener("click", () => {
      this.toggle();
    }), this.setValue(this.value);
  }
  /** 设置开关状态 */
  setValue(t) {
    var e;
    this.value = t, this.$el.classList.toggle("state-checked", t), (e = this.onChange) == null || e.call(this, t);
  }
  /** 点按开关 */
  toggle(t = !this.value) {
    var e;
    this.setValue(t), (e = this.onToggle) == null || e.call(this, t);
  }
}
const Ye = () => p`
  <div class="${a}-controls-button ${a}-button_danmakustyle">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-text"></i>
    </div>
    <div class="${a}-controls-panel-wrap">
      <div class="${a}-controls-panel ${a}-controls-panel-danmaku-style">
        <div class="${a}-panel-row">
          <div class="${a}-row-label">字号</div>
          <div class="${a}-danmaku-style-fontsize-picker"></div>
        </div>
        <div class="${a}-panel-row">
          <div class="${a}-row-label">模式</div>
          <div class="${a}-danmaku-style-mode-picker"></div>
        </div>
        <div class="${a}-panel-row">
          <div class="${a}-row-label">颜色</div>
          <input
            class="${a}-danmaku-style-color-input mpui-input"
            type="text"
            value="#"
          />
          <div class="${a}-danmaku-style-color-preview"></div>
          ${window.EyeDropper ? p`<button class="${a}-danmaku-style-color-dropper mpui-button">
                拾取
              </button>` : ""}
        </div>
        <div class="${a}-danmaku-style-color-picker"></div>
      </div>
    </div>
  </div>
`;
class Qe {
  constructor(t, e, s) {
    this.danmakuBar = t;
    const n = new DocumentFragment();
    v(Ye(), n), this.$el = n.querySelector(`.${a}-controls-button`), this.$icon = this.$el.querySelector(`.${a}-controls-button-icon`), this.$tooltip = this.$el.querySelector(".mpui-tooltip"), this.$fontsizePicker = this.$el.querySelector(`.${a}-danmaku-style-fontsize-picker`), this.$modePicker = this.$el.querySelector(`.${a}-danmaku-style-mode-picker`), this.$colorPicker = this.$el.querySelector(`.${a}-danmaku-style-color-picker`), this.$colorInput = this.$el.querySelector(`.${a}-danmaku-style-color-input`), this.$colorPreview = this.$el.querySelector(`.${a}-danmaku-style-color-preview`), this.$colorDropper = this.$el.querySelector(`.${a}-danmaku-style-color-dropper`), this.init(s), e.appendChild(n);
  }
  init(t) {
    var e, s;
    this.pickerFontsize = new X({
      container: this.$fontsizePicker,
      value: 25,
      list: (((e = t.danmakuBar) == null ? void 0 : e.fontSizeList) || Ge).map(([n, l]) => ({
        value: n,
        label: l
      })),
      onChange: (n) => {
        this.danmakuBar.danmakuFontSize = Number(n);
      }
    }), this.pickerMode = new X({
      container: this.$modePicker,
      value: 1,
      list: [
        { value: 1, label: "滚动" },
        { value: 5, label: "顶部" },
        { value: 4, label: "底部" },
        { value: 6, label: "逆向" }
      ].filter(
        (n) => {
          var l;
          return (((l = t.danmakuBar) == null ? void 0 : l.modeList) || Ze).indexOf(n.value) > -1;
        }
      ),
      onChange: (n) => {
        this.danmakuBar.danmakuMode = Number(n) || 1;
      }
    }), this.pickerColor = new X({
      container: this.$colorPicker,
      value: "#FFFFFF",
      list: (((s = t.danmakuBar) == null ? void 0 : s.colorList) || Je).map((n) => ({ value: n })),
      onPick: (n) => {
        this.danmakuBar.danmakuColor = ge(n);
      },
      onChange: (n) => {
        this.$colorInput.value = n, this.$colorPreview.style.backgroundColor = n;
      },
      template: (n) => p` <div style="background-color: ${n.value}"></div> `,
      condition: (n, l) => n.toLowerCase() == l.toLowerCase()
    }), this.$colorInput.addEventListener("input", () => {
      const n = this.$colorInput.value;
      this.$colorInput.value = "#" + n.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6), /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(n) && this.pickerColor.pick(n);
    }), this.$colorDropper && (this.$colorDropper.onclick = () => {
      window.EyeDropper && new window.EyeDropper().open().then(({ sRGBHex: l }) => {
        this.pickerColor.pick(l);
      });
    });
  }
}
const Ge = [
  [18, "小"],
  [25, "中"],
  [36, "大"]
], Ze = [1, 5, 4], Je = [
  "#FE0302",
  "#FFFF00",
  "#00CD00",
  "#00FF00",
  "#4E6EF2",
  "#89D5FF",
  "#7B7FF7",
  "#757575",
  "#FFFFFF",
  "#FB7229"
], Ce = p`
  <div class="${a}-danmakubar">
    <div class="${a}-danmakubar-slot"></div>
    <div class="${a}-danmakubar-input-wrap">
      <div class="${a}-danmakubar-input-slot"></div>
      <input type="text" autocompleted="new-password" class="${a}-danmakubar-input" />
      <!-- 
      <div class="${a}-danmakubar-status-loading">弹幕功能加载中...</div>
      <div class="${a}-danmakubar-status-login">需要登录后才能发送弹幕哦~</div>
      -->
      <div class="${a}-danmakubar-send">发送</div>
    </div>
  </div>
`;
class At extends F {
  constructor(t, e) {
    var s;
    super(t), this.danmakuColor = 16777215, this.danmakuMode = 1, this.danmakuFontSize = 25, this.coolDownTimer = 0, this.controller = this.player.plugin.controller, this.danmaku = this.player.plugin.danmaku, this.$wrap = this.player.$el.appendChild(
      H("div", { class: `${a}-danmakubar-wrap` })
    ), v(Ce, this.$wrap), this.$el = this.$wrap.querySelector(`.${a}-danmakubar`), this.$send = this.$el.querySelector(`.${a}-danmakubar-send`), this.$input = this.$el.querySelector(`.${a}-danmakubar-input`), this.$slot = this.$el.querySelector(`.${a}-danmakubar-slot`), this.$inputSlot = this.$el.querySelector(`.${a}-danmakubar-input-slot`), this.buttonDanmakuStyle = new Qe(this, this.$inputSlot, e), this.player.on("fullscreen_enter", () => {
      this.moveToController();
    }), this.player.on("webfull_enter", () => {
      this.moveToController();
    }), this.player.on("fullscreen_exit", () => {
      this.moveToWrap();
    }), this.player.on("webfull_exit", () => {
      this.moveToWrap();
    }), this.$input.addEventListener("keydown", (n) => {
      n.keyCode == I.Enter && this.send();
    }), this.$send.onclick = () => {
      this.send();
    }, this.setPlaceHolder(((s = e.danmakuBar) == null ? void 0 : s.placeholder) || ts);
  }
  moveToWrap() {
    this.$wrap.appendChild(this.$el), this.controller.$center.classList.remove("state-bar");
  }
  moveToController() {
    this.controller.$center.appendChild(this.$el), this.controller.$center.classList.add("state-bar");
  }
  setPlaceHolder(t) {
    this.$input.placeholder = t;
  }
  /** 执行弹幕发送操作 */
  send() {
    !this.$input.value.trim() || this.coolDownTimer || (this.danmaku.operate.send(this.generateDanmaku()), this.$input.value = "");
  }
  /** 设置弹幕发送冷却 */
  setCoolDown(t) {
    this.coolDownTimer && window.clearInterval(this.coolDownTimer);
    let e = Math.round(t);
    this.$send.classList.add("state-disabled"), this.$send.innerText = `${e}秒`, this.coolDownTimer = window.setInterval(() => {
      e -= 1, e ? this.$send.innerText = `${e}秒` : (this.$send.innerText = "发送", this.$send.classList.remove("state-disabled"), window.clearInterval(this.coolDownTimer), this.coolDownTimer = 0);
    }, 1e3);
  }
  generateDanmaku() {
    return {
      time: this.player.time,
      content: this.$input.value,
      mode: this.danmakuMode,
      color: this.danmakuColor,
      size: this.danmakuFontSize
    };
  }
}
At.pluginName = "danmakuBar";
const ts = "发条弹幕吧~", es = p`
  <div class="${a}-controls-button ${a}-button_play state-paused">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-play"></i>
      <i class="mpicon-pause"></i>
    </div>
    <div class="mpui-tooltip">播放</div>
  </div>
`;
class Ft extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(es, s), super(t, e, {
      name: "buttonPlay",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$left;
        },
        order: 1
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  created() {
    this.player.on("pause", () => {
      this._change(!1);
    }), this.player.on("play", () => {
      this._change(!0);
    }), this.player.on("video_change", () => {
      this._change(!1);
    }), this.$icon.addEventListener("click", () => {
      this.player.toggle();
    });
  }
  /** 设置按钮状态 */
  _change(t) {
    this.$el.classList.toggle("state-on", t), this.$tooltip.innerText = t ? "暂停" : "播放";
  }
}
Ft.pluginName = "buttonPlay";
const ss = p`
  <div class="${a}-controls-button ${a}-button_prev">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-prev"></i>
    </div>
    <div class="mpui-tooltip">上一P</div>
  </div>
`;
class Pt extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(ss, s), super(t, e, {
      name: "buttonPrev",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$left;
        },
        order: 0
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  created() {
    this.$icon.addEventListener("click", () => {
      this.player.prev();
    });
  }
  show(t) {
    this.$el.style.display = t ? "" : "none";
  }
}
Pt.pluginName = "buttonPrev";
const is = p`
  <div class="${a}-controls-button ${a}-button_next">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-next"></i>
    </div>
    <div class="mpui-tooltip">下一P</div>
  </div>
`;
class Dt extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(is, s), super(t, e, {
      name: "buttonNext",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$left;
        },
        order: 2
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  created() {
    this.$icon.addEventListener("click", () => {
      this.player.next();
    });
  }
}
Dt.pluginName = "buttonNext";
const ns = p`
  <div class="${a}-videotime">
    <div class="${a}-videotime-label">
      <span class="${a}-videotime-current">00:00</span>
      <span class="${a}-videotime-divider">/</span>
      <span class="${a}-videotime-total">00:00</span>
    </div>
    <input class="${a}-videotime-input mpui-input" />
  </div>
`;
class Ht extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(ns, s), super(t, e, {
      name: "time",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$left;
        },
        order: 3
      },
      el: s.querySelector(`.${a}-videotime`)
    }), this.valueBeforeEdited = "", this.$label = this.$(`.${a}-videotime-label`), this.$current = this.$(`.${a}-videotime-current`), this.$total = this.$(`.${a}-videotime-total`), this.$input = this.$(`.${a}-videotime-input`);
  }
  created() {
    this.player.on("timeupdate", (t) => {
      this.$current.innerText = z(t);
    }), this.player.on("durationchange", (t) => {
      this.$total.innerText = z(t);
    }), this.$label.addEventListener("click", () => {
      this.$el.classList.add("state-input"), this.$input.value = z(this.player.time), this.valueBeforeEdited = this.$input.value, this.$input.focus();
    }), this.$input.addEventListener("blur", () => {
      const t = this.$input.value;
      t != this.valueBeforeEdited && (this.player.seek(ht(t)), this.player.play()), this.exitInput();
    }), this.$input.addEventListener("keydown", (t) => {
      const e = t || window.event;
      e.keyCode == 13 && (this.player.seek(ht(this.$input.value)), this.player.play(), this.exitInput()), e.keyCode == 27 && this.exitInput();
    });
  }
  /** 退出输入模式 */
  exitInput() {
    this.$el.classList.remove("state-input"), this.$input.value = "", this.valueBeforeEdited = "";
  }
}
Ht.pluginName = "videoTime";
const as = p`
  <div class="${a}-controls-button ${a}-button_loop">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-loop-off"></i>
      <i class="mpicon-loop"></i>
    </div>
    <div class="mpui-tooltip">洗脑循环</div>
  </div>
`;
class qt extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(as, s), super(t, e, {
      name: "buttonLoop",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$left;
        },
        order: 4
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  created() {
    this.player.watch("loop", (t) => {
      this.$el.classList.toggle("state-on", t), this.$tooltip.innerText = t ? "关闭洗脑循环" : "洗脑循环";
    }), this.$icon.addEventListener("click", () => {
      this.player.loop ? this.player.setLoop(!1) : this.player.setLoop(!0);
    });
  }
}
qt.pluginName = "buttonLoop";
const ls = p`
  <div class="${a}-controls-button ${a}-button_part">
    <div class="${a}-controls-button-icon">
      <div class="${a}-controls-button-text">P0</div>
    </div>
    <div class="mpui-tooltip">分P列表</div>
  </div>
`;
class Mt extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(ls, s), super(t, e, {
      name: "buttonPart",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$right;
        },
        order: 0
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$text = this.$(`.${a}-controls-button-text`), this.$tooltip = this.$(".mpui-tooltip");
  }
  created() {
    this.$icon.addEventListener("click", () => {
      var t;
      (t = this.player.plugin.partList) == null || t.toggle();
    }), this.player.on("video_change", (t) => {
      var e;
      this.$text.innerText = `P${t.part}`, this.$el.classList.toggle("state-show", (((e = t.list) == null ? void 0 : e.length) || 1) > 1);
    });
  }
}
Mt.pluginName = "buttonPart";
const rs = p`
  <div class="${a}-controls-button ${a}-button_volume">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-volume"></i>
      <i class="mpicon-volume-off"></i>
    </div>

    <div class="${a}-controls-panel-wrap">
      <div class="${a}-controls-panel">
        <div class="${a}-button_volume-value">0</div>
        <div class="${a}-button_volume-slider"></div>
      </div>
    </div>
  </div>
`;
class Nt extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(rs, s), super(t, e, {
      name: "buttonVolume",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$right;
        },
        order: 1
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$slider = this.$(`.${a}-button_volume-slider`), this.$value = this.$(`.${a}-button_volume-value`);
  }
  created() {
    this.slider = new We({
      container: this.$slider,
      min: 0,
      max: 100,
      step: 1,
      value: this.player.volume * 100,
      onChange: (t) => {
        this.$value.innerText = t.toString();
      },
      onDrag: (t) => {
        this.player.setVolume(t / 100);
      },
      onDragStart: (t) => {
        this.player.muted && t != 0 && this.player.unmute(), this.$el.classList.add("state-control"), this.player.controlled = !0;
      },
      onDragEnd: () => {
        this.$el.classList.remove("state-control"), this.player.controlled = !1;
      }
    }), this.player.on("volumechange", (t, e) => {
      e ? (this.$el.classList.add("state-muted"), this.slider.setValue(0)) : (this.$el.classList.remove("state-muted"), this.slider.setValue(Math.round(t * 100))), t == 0 && this.$el.classList.add("state-muted");
    }), this.$icon.addEventListener("click", () => {
      this.player.muted || this.player.volume == 0 ? (this.player.volume == 0 && this.player.setVolume(0.1), this.player.unmute()) : this.player.mute();
    });
  }
}
Nt.pluginName = "buttonVolume";
const os = p`
  <div class="${a}-controls-button ${a}-button_settings">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-settings"></i>
    </div>
    <div class="${a}-controls-panel-wrap">
      <div class="${a}-controls-panel"></div>
    </div>
  </div>
`;
class It extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(os, s), super(t, e, {
      name: "buttonSettings",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$right;
        },
        order: 2
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$panel = this.$(`.${a}-controls-panel`);
  }
  created(t) {
    this.$panel.appendChild(this.player.plugin.settings.$el);
  }
}
It.pluginName = "buttonSettings";
const hs = p`
  <div class="${a}-controls-button ${a}-button_pip">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-pip"></i>
      <i class="mpicon-pip-exit"></i>
    </div>
    <div class="mpui-tooltip">画中画</div>
  </div>
`;
class Rt extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(hs, s), super(t, e, {
      name: "buttonPip",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$right;
        },
        order: 7
      },
      el: s.querySelector(`.${a}-controls-button`),
      disabled: !ve
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  created() {
    this.player.on("pip_enter", () => {
      this.$el.classList.add("state-on"), this.$tooltip.innerText = "退出画中画";
    }), this.player.on("pip_exit", () => {
      this.$el.classList.remove("state-on"), this.$tooltip.innerText = "画中画";
    }), this.$icon.addEventListener("click", () => {
      this.player.isPip ? this.player.exitPip() : this.player.enterPip();
    });
  }
}
Rt.pluginName = "buttonPip";
const cs = p`
  <div class="${a}-controls-button ${a}-button_webfull">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-webfull"></i>
      <i class="mpicon-webfull-exit"></i>
    </div>
    <div class="mpui-tooltip">网页全屏</div>
  </div>
`;
class Bt extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(cs, s), super(t, e, {
      name: "buttonWebfull",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$right;
        },
        order: 9
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  created() {
    this.player.on("webfull_enter", () => {
      this.$el.classList.add("state-on"), this.$tooltip.innerText = "退出网页全屏";
    }), this.player.on("webfull_exit", () => {
      this.$el.classList.remove("state-on"), this.$tooltip.innerText = "网页全屏";
    }), this.$icon.addEventListener("click", () => {
      this.player.isWebfull ? this.player.exitWebfull() : this.player.enterWebfull();
    });
  }
}
Bt.pluginName = "buttonWebfull";
const ds = p`
  <div class="${a}-controls-button ${a}-button_fullscreen">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-fullscreen"></i>
      <i class="mpicon-fullscreen-exit"></i>
    </div>
    <div class="mpui-tooltip">进入全屏</div>
  </div>
`;
class Vt extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(ds, s), super(t, e, {
      name: "buttonFullscreen",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$right;
        },
        order: 10
      },
      el: s.querySelector(`.${a}-controls-button`),
      disabled: !$e
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  created() {
    this.player.on("fullscreen_enter", () => {
      this.$el.classList.add("state-on"), this.$tooltip.innerText = "退出全屏";
    }), this.player.on("fullscreen_exit", () => {
      this.$el.classList.remove("state-on"), this.$tooltip.innerText = "进入全屏";
    }), this.$icon.addEventListener("click", () => {
      this.player.isFullscreen ? this.player.exitFullscreen() : this.player.enterFullscreen();
    });
  }
}
Vt.pluginName = "buttonFullscreen";
var C = /* @__PURE__ */ ((i) => (i[i.roll = 1] = "roll", i[i.bottom = 4] = "bottom", i[i.top = 5] = "top", i[i.reverse = 6] = "reverse", i[i.special = 7] = "special", i[i.advanced = 9] = "advanced", i))(C || {});
class us {
  constructor(t, e) {
    this.paused = !1, this.hidden = !1, this.trackFilter = {
      roll: !1,
      reverse: !1,
      top: !1,
      bottom: !1
    }, this.userFilter = [], this.contentFilter = [], this.time = 0, this.danmakuPool = [], this.currentIndex = 0, this.measureContext = null, this.startDistance = 2, this.timeOffset = 0, this.baseSpeed = 100, this.baseDuration = 5, this.deltaSpeed = 2e-3, this.trackHeights = {
      roll: [],
      reverse: [],
      top: [],
      bottom: []
    }, this.danmakuTracks = {
      roll: [],
      reverse: [],
      top: [],
      bottom: []
    }, this.container = t, this.fontScale = e.fontScale ?? 1, this.baseTrackHeight = 28, this.trackPadding = 6, this.speed = e.speed ?? 1, this.opacity = e.opacity ?? 1, this.limitArea = 1, this.overlap = !1, this.fontFamily = e.fontFamily ?? "SimHei", this.fontWeight = e.fontWeight ?? "bold", this.classPrefix = e.classPrefix ?? "mfuns", this.colorFilter = e.colorFilter || !1, this.getTime = e.getTime, this.container.classList.add(`${this.classPrefix}-danmaku`), this.checkDanmaku();
  }
  play() {
    this.paused = !1, this.container.classList.remove("state-paused");
  }
  pause() {
    this.paused = !0, this.container.classList.add("state-paused");
  }
  /** 发生跳转 */
  seek() {
    this.clear(), this.time = this.getTime();
    const t = this.danmakuPool.findIndex((e) => this.time <= e.time);
    this.currentIndex = t === -1 ? this.danmakuPool.length : t;
  }
  /** 设置弹幕池 */
  setPool(t) {
    this.danmakuPool = [...t], this.danmakuPool.sort((s, n) => s.time - n.time);
    const e = this.danmakuPool.findIndex((s) => this.time <= s.time);
    this.currentIndex = e === -1 ? this.danmakuPool.length : e;
  }
  /** 重置弹幕池 */
  reset() {
    this.clear(), this.danmakuPool = [], this.currentIndex = 0;
  }
  /** 弹幕池添加弹幕 */
  add(t) {
    t.forEach((e) => {
      const s = this.danmakuPool.findIndex((n) => e.time <= n.time);
      this.danmakuPool.splice(s === -1 ? this.danmakuPool.length : s, 0, e), e.time < this.time && (this.currentIndex += 1);
    });
  }
  /** 弹幕池移除符合id的弹幕 */
  remove(t) {
    const e = [
      ...this.container.querySelectorAll(`.${this.classPrefix}-danmaku-item`)
    ];
    t.forEach((s) => {
      const n = this.danmakuPool.findIndex((r) => r.id == s);
      if (n === -1)
        return;
      this.danmakuPool.splice(n, 1), n < this.currentIndex && (this.currentIndex -= 1);
      const l = e.find((r) => r.dataset.id === s.toString());
      l && (l.innerHTML = "");
    });
  }
  /** 弹幕清屏 */
  clear(t) {
    if (t) {
      this.danmakuTracks[t] = [];
      return;
    }
    this.danmakuTracks = {
      roll: [],
      reverse: [],
      top: [],
      bottom: []
    }, this.trackHeights = {
      roll: [],
      reverse: [],
      top: [],
      bottom: []
    }, this.container.innerHTML = "";
  }
  /** 检查弹幕是否需要进入弹幕池 */
  checkDanmaku() {
    if (this.danmakuPool.length && !this.paused && !this.hidden) {
      let t = this.danmakuPool[this.currentIndex];
      const e = [];
      for (this.time = this.getTime(); t && t.time < this.time; )
        this.checkTrackFilter(t) && this.checkColorFilter(t) && this.checkUserFilter(t) && this.checkContentFilter(t) && e.push(t), this.currentIndex += 1, t = this.danmakuPool[this.currentIndex];
      this.draw(e);
    }
    window.requestAnimationFrame(() => {
      this.checkDanmaku();
    });
  }
  /** 设置弹幕类型过滤 */
  setTrackFilter(t, e) {
    this.trackFilter[t] = e, e && this.container.querySelectorAll(`.${this.classPrefix}-danmaku-${t}`).forEach((s) => {
      s.innerHTML = "";
    });
  }
  /** 检查弹幕类型过滤 */
  checkTrackFilter(t) {
    return !this.trackFilter[C[t.mode]];
  }
  /** 设置弹幕颜色过滤 */
  setColorFilter(t) {
    this.colorFilter = t, t && this.container.querySelectorAll(
      `.${this.classPrefix}-danmaku-item`
    ).forEach((s) => {
      s.style.color !== "rgb(255, 255, 255)" && (s.innerHTML = "");
    });
  }
  /** 检查弹幕颜色过滤 */
  checkColorFilter(t) {
    return !this.colorFilter || t.color === 16777215;
  }
  /** 设置内容过滤 */
  setContentFilter(t, e) {
    const s = this.contentFilter.indexOf(t);
    if (e) {
      if (s > -1)
        return;
      this.contentFilter.push(t);
      const n = this.container.querySelectorAll(
        `.${this.classPrefix}-danmaku-item`
      );
      typeof t == "string" ? n.forEach((l) => {
        l.innerText.includes(t) && (l.innerHTML = "");
      }) : n.forEach((l) => {
        t.test(l.innerText) && (l.innerHTML = "");
      });
    } else
      s > -1 && this.contentFilter.splice(s, 1);
  }
  /** 检查弹幕内容过滤 */
  checkContentFilter(t) {
    for (const e of this.contentFilter)
      if (typeof e == "string") {
        if (t.content.search(e))
          return !1;
      } else if (e.test(t.content))
        return !1;
    return !0;
  }
  /** 设置用户过滤 */
  setUserFilter(t, e) {
    const s = this.userFilter.indexOf(t);
    if (e) {
      if (s > -1)
        return;
      this.userFilter.push(t), this.container.querySelectorAll(
        `.${this.classPrefix}-danmaku-item`
      ).forEach((l) => {
        l.dataset.user == t && (l.innerHTML = "");
      });
    } else
      s > -1 && this.userFilter.splice(s, 1);
  }
  /** 检查用户过滤 */
  checkUserFilter(t) {
    return this.userFilter.indexOf(t.user) == -1;
  }
  /** 绘制弹幕 */
  draw(t) {
    var y, _, L;
    const e = this.baseTrackHeight * this.fontScale, s = this.container.offsetWidth, n = this.container.offsetHeight * this.limitArea, l = Math.floor(n / e);
    this.trackHeights.roll.length !== l && (this.trackHeights.roll = j(l, e)), this.trackHeights.reverse.length !== l && (this.trackHeights.reverse = j(l, e)), this.trackHeights.top.length !== l && (this.trackHeights.top = j(l, e)), this.trackHeights.bottom.length !== l && (this.trackHeights.bottom = j(l, e));
    const r = (m) => {
      const $ = this.container.getBoundingClientRect().right, d = m.getBoundingClientRect().right;
      return $ - d;
    }, h = (m) => {
      const $ = this.container.getBoundingClientRect().left;
      return m.getBoundingClientRect().left - $;
    }, o = (m) => this.baseSpeed * (1 + this.deltaSpeed * m) * this.speed, c = (m, $) => [
      ...this.container.querySelectorAll(`.${this.classPrefix}-danmaku-${m}`)
    ].filter((d) => d.dataset.track === `${$}`), u = (m, $, d) => {
      t:
        for (let g = 0; this.overlap || g < l; g++) {
          const S = c($, g);
          let k = this.danmakuTracks[$][g];
          if (this.danmakuTracks[$][g] = S, k && k.length) {
            if ($ === "roll") {
              const T = s / o(d);
              k.length !== S.length && (k = S);
              for (const w of k) {
                const x = r(w) - 10;
                if (this.trackHeights[$][g] = parseInt(w.style.fontSize) + this.trackPadding, x <= s - T * o(w.getBoundingClientRect().width) || x <= 0)
                  continue t;
              }
            } else if ($ === "reverse") {
              const T = s / o(d);
              k.length !== S.length && (k = S);
              for (const w of k) {
                const x = h(w) - 10;
                if (this.trackHeights[$][g] = parseInt(w.style.fontSize) + this.trackPadding, x <= s - T * o(w.getBoundingClientRect().width) || x <= 0)
                  continue t;
              }
            } else
              continue t;
            return this.danmakuTracks[$][g].push(m), m.addEventListener("animationend", () => {
              var w, x;
              const T = (w = this.danmakuTracks[$][g]) == null ? void 0 : w.indexOf(m);
              T && ((x = this.danmakuTracks[$][g]) == null || x.splice(T, 1));
            }), g;
          } else
            return Array.isArray(this.danmakuTracks[$][g]) ? this.danmakuTracks[$][g].push(m) : this.danmakuTracks[$][g] = [m], m.addEventListener("animationend", () => {
              var w, x;
              const T = (w = this.danmakuTracks[$][g]) == null ? void 0 : w.indexOf(m);
              T && ((x = this.danmakuTracks[$][g]) == null || x.splice(T, 1));
            }), g;
        }
      return -1;
    }, f = document.createDocumentFragment();
    for (let m = 0; m < t.length; m++) {
      const $ = t[m];
      if ($.mode >= 7)
        continue;
      const d = document.createElement("div");
      d.classList.add(`${this.classPrefix}-danmaku-item`), d.classList.add(`${this.classPrefix}-danmaku-${C[$.mode]}`), d.innerHTML = `${$.content.replace(/(\\n)/g, `
`)}`, typeof $.color == "number" ? d.style.color = fe($.color) : d.style.color = $.color, d.style.opacity = this.opacity.toString(), d.style.fontSize = +$.size * this.fontScale + "px", d.addEventListener("animationend", () => {
        [...this.container.children].indexOf(d) > -1 && this.container.removeChild(d);
      });
      const g = this.measureTextWidth(
        $.content,
        `${this.fontWeight} ${+$.size * this.fontScale}px ${this.fontFamily}`
      );
      let S = C[$.mode], k, T;
      switch (S) {
        case "roll":
        case "reverse":
          if (T = u(d, S, g), k = T % l, k >= 0) {
            const w = this.trackHeights[S].slice(0, l).reduce((E, q) => E + q, 0), x = this.trackHeights[S].slice(0, k).reduce((E, q) => E + q, 0) % w;
            if (x + parseInt(d.style.fontSize) + this.trackPadding > n) {
              (y = this.danmakuTracks[S][m]) == null || y.pop();
              return;
            }
            const P = o(g), b = g + s + this.startDistance * 2;
            d.dataset.track = T.toString(), d.style.width = g + 1 + "px", d.style.top = x + "px", d.style.fontFamily = this.fontFamily, d.style.fontWeight = this.fontWeight, d.style.setProperty("--duration", `${b / P}s`), d.style.setProperty("--offset", `${s + this.startDistance}px`), d.style.setProperty("--translateX", `${-b}px`);
          }
          break;
        case "top":
          if (k = u(d, S, 0) % l, k >= 0) {
            const w = [], x = this.danmakuTracks.top;
            for (const b of x)
              w.push(...b);
            const P = w.map((b) => parseInt(b.style.fontSize) + this.trackPadding).slice(0, k).reduce((b, E) => b + E, 0);
            if (P + parseInt(d.style.fontSize) + this.trackPadding > n) {
              (_ = this.danmakuTracks[S][m]) == null || _.pop();
              return;
            }
            d.dataset.track = k.toString(), d.style.width = g + 1 + "px", d.style.marginLeft = `-${(g + 1) * 0.5}px`, d.style.top = P + "px", d.style.fontFamily = this.fontFamily, d.style.fontWeight = this.fontWeight, d.style.setProperty("--duration", `${this.baseDuration / this.speed}s`);
          }
          break;
        case "bottom":
          if (S = "bottom", k = u(d, S, 0) % l, k >= 0) {
            const w = [], x = this.danmakuTracks.bottom;
            for (const b of x)
              w.push(...b);
            const P = w.map((b) => parseInt(b.style.fontSize) + this.trackPadding).slice(0, k).reduce((b, E) => b + E, 0);
            if (P + parseInt(d.style.fontSize) + this.trackPadding > n) {
              (L = this.danmakuTracks[S][m]) == null || L.pop();
              return;
            }
            d.dataset.track = k.toString(), d.style.width = g + 1 + "px", d.style.marginLeft = `-${(g + 1) * 0.5}px`, d.style.bottom = P + "px", d.style.fontFamily = this.fontFamily, d.style.fontWeight = this.fontWeight, d.style.setProperty("--duration", `${this.baseDuration / this.speed}s`);
          }
          break;
        default:
          k = -1, console.error(`无法处理的弹幕模式: ${$.mode}`);
      }
      k >= 0 && (d.dataset.id = $.id.toString(), d.dataset.user = $.user.toString(), this.container.appendChild(d));
    }
    return f;
  }
  /** 测量字体宽度 */
  measureTextWidth(t, e) {
    return this.measureContext || (this.measureContext = document.createElement("canvas").getContext("2d")), this.measureContext.font = e, this.measureContext.measureText(t).width;
  }
  /** 根据某一坐标捕获弹幕DOM */
  captureDanmakuDOM(t, e, s, n = !1) {
    const l = [], r = this.container.querySelectorAll(`.${this.classPrefix}-danmaku-item`);
    for (const h of r)
      if (h.innerHTML) {
        const o = h.getBoundingClientRect(), c = this.container.getBoundingClientRect(), u = o.left - c.left, f = o.right - c.left, y = o.top - c.top, _ = o.bottom - c.top;
        if (t >= u - s && t <= f + s && e >= y - s && e <= _ + s && (l.push(h), n))
          return l;
      }
    return l;
  }
  /** 根据某一坐标捕获弹幕 */
  captureDanmaku(t, e, s, n = !1) {
    const l = this.captureDanmakuDOM(t, e, s, n), r = [];
    for (const h of l) {
      const o = this.getDanmakuById(h.dataset.id);
      o && r.push(o);
    }
    return r;
  }
  /** 根据id获取弹幕 */
  getDanmakuById(t) {
    return this.danmakuPool.find((e) => e.id.toString() === t.toString());
  }
  /** 显示弹幕 */
  show() {
    this.hidden = !1;
  }
  /** 隐藏弹幕 */
  hide() {
    this.hidden = !0, this.clear();
  }
}
let ft = 1e3;
const yt = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
function ps() {
  const i = [], t = yt.length;
  for (let e = 0; e < 8; e++)
    i.push(yt[Math.floor(Math.random() * t)]);
  return ft++, i.join("") + `${ft}`;
}
class ms {
  constructor({ defaultParser: t }) {
    this.defaultParser = t || "bilibili-xml", this.list = {
      dplayer: (e) => e.map((s, n) => ({
        time: s[0],
        mode: [1, 5, 4, 6][s[1]],
        color: s[2],
        user: s[3],
        content: s[4],
        size: 25,
        date: 0,
        id: ps()
      })),
      mfuns: (e) => e.map((s) => ({
        time: s[0],
        mode: s[1],
        color: s[2],
        user: s[3],
        content: s[4],
        size: s[5],
        date: s[6] > 1 ? s[6] : 0,
        id: s[7]
      })),
      "bilibili-xml": (e) => ((n) => {
        const l = [], h = new DOMParser().parseFromString(n, "text/xml").childNodes, o = (c) => {
          var u;
          for (let f = 0; f < c.length; f++) {
            const y = c[f];
            if ((u = y == null ? void 0 : y.attributes) != null && u.length && f > 0) {
              const _ = y.attributes[0].nodeValue.split(","), L = y.innerHTML;
              l.push([L, _]);
            } else
              y.childNodes.length > 0 && o(y.childNodes);
          }
        };
        return o(h), l.map(([c, u]) => ({
          time: +u[0],
          mode: +u[1],
          color: +u[3],
          user: u[6],
          content: c,
          size: +u[2],
          date: +u[4],
          id: +u[7]
        }));
      })(e)
    };
  }
  /** 将获取到的弹幕转换为播放器弹幕格式 */
  parse({ data: t, type: e }) {
    const s = this.list[e];
    if (!s)
      throw "未知弹幕格式";
    return s(t);
  }
}
class $s {
  constructor(t) {
    this.player = t, this.danmaku = t.plugin.danmaku;
  }
  /**
   * 发送弹幕
   * @param danmaku 要发送的弹幕
   * @return 操作结果
   * */
  async send(t) {
    var e, s;
    if (!((s = (e = this.danmaku) == null ? void 0 : e.api) != null && s.danmakuSend))
      throw "发送失败";
    return await this.danmaku.api.danmakuSend(t, this.player.videoInfo.danmakuId || 0).then((n) => (this.danmaku.add([
      Object.assign(
        {
          id: `send:${Date.now()}`,
          date: Math.floor(Date.now() / 1e3),
          user: 0
        },
        t
      )
    ]), n)).catch((n) => {
      throw n;
    });
  }
  /**
   * 举报弹幕
   * @param danmaku 要举报的弹幕
   * @return 操作结果
   * */
  async report(t) {
    var e, s;
    if (!((s = (e = this.danmaku) == null ? void 0 : e.api) != null && s.danmakuReport))
      throw "操作失败";
    return await this.danmaku.api.danmakuReport(t).then((n) => (this.danmaku.remove([t.id]), n)).catch((n) => {
      throw n;
    });
  }
  /**
   * 删除弹幕
   * @param danmaku 要删除的弹幕
   * @return 操作结果
   * */
  async delete(t) {
    var e, s;
    if (!((s = (e = this.danmaku) == null ? void 0 : e.api) != null && s.danmakuDelete))
      throw "操作失败";
    return await this.danmaku.api.danmakuDelete(t).then((n) => (this.danmaku.remove(t.map((l) => l.id)), n)).catch((n) => {
      throw n;
    });
  }
  /**
   * 删除自己发送的弹幕
   * @param danmaku 要删除的弹幕
   * @return 操作结果
   * */
  async recall(t) {
    var e, s;
    if (!((s = (e = this.danmaku) == null ? void 0 : e.api) != null && s.danmakuRecall))
      throw "操作失败";
    return await this.danmaku.api.danmakuRecall(t).then((n) => (this.danmaku.remove([t.id]), n)).catch((n) => {
      throw n;
    });
  }
  /**
   * 屏蔽用户
   * @param user 用户id
   * @param flag 设置屏蔽状态
   * @return 操作结果
   * */
  async blockUser(t, e) {
    var s, n;
    if (!((n = (s = this.danmaku) == null ? void 0 : s.api) != null && n.danmakuBlockUser))
      throw "操作失败";
    return await this.danmaku.api.danmakuBlockUser(t, e).then(() => {
      this.danmaku.engine.setUserFilter(t, e), this.player.emit("danmaku:block_user", t, e);
    }).catch((l) => {
      throw l;
    });
  }
  /**
   * 屏蔽关键词
   * @param content 关键词内容
   * @param flag 设置屏蔽状态
   * @return 操作结果
   * */
  async blockContent(t, e) {
    var s, n;
    if (!((n = (s = this.danmaku) == null ? void 0 : s.api) != null && n.danmakuBlockContent))
      throw "操作失败";
    return await this.danmaku.api.danmakuBlockContent(t, e).then((l) => {
      this.danmaku.engine.setContentFilter(t, e), this.player.emit("danmaku:block_content", t, e);
    }).catch((l) => {
      throw l;
    });
  }
}
class zt extends F {
  constructor(t, e) {
    var s;
    super(t), this.lastDanmakuId = 0, this.list = [], this.handler = {}, this.format = ((s = e.danmaku) == null ? void 0 : s.format) || "mfuns", this.parser = new ms({ defaultParser: this.format }), this.operate = new $s(this.player), this.api = e.apis || {}, this.allowNewDanmaku = !1, this.$el = H("div", { class: `${a}-danmaku-wrap` }), this.$rowContainer = this.$el.appendChild(
      H("div", { class: `${a}-row-danmaku-container` })
    ), this.player.$content.after(this.$el), this.engine = new us(this.$rowContainer, {
      fontScale: 1,
      fontFamily: "SimHei",
      fontWeight: "bold",
      speed: 1,
      opacity: 1,
      classPrefix: a,
      /** 颜色限制 */
      colorFilter: !1,
      getTime: () => this.player.time
    }), this.player.on("play", () => {
      this.engine.play();
    }), this.player.on("pause", () => {
      this.engine.pause();
    }), this.player.on("seeking", () => {
      this.engine.pause(), this.engine.seek();
    }), this.player.on("seeked", () => {
      this.player.paused || this.engine.play();
    }), this.player.on("video_change", (n) => {
      const { danmakuId: l, danmakuAddition: r } = n;
      console.log(r), this.reload(l, r);
    });
  }
  /** 加载附加弹幕 */
  loadAddition({ url: t, type: e, data: s }) {
    fetch(t).then((n) => /-xml$/.test(e) ? n.text() : n.json()).then((n) => {
      const l = s ? s(n) : n, r = this.parser.parse({ data: l, type: e });
      if (r)
        r && this.add(r), this.player.emit("danmaku:addition_loaded", t, r);
      else
        throw "无法正确解析弹幕格式";
    }).catch((n) => {
      this.player.emit("danmaku:addition_loaded", t, [], n), console.error(n);
    });
  }
  /** 加载弹幕 */
  load(t) {
    var e, s;
    (s = (e = this.api).danmakuGet) == null || s.call(e, { id: t }).then((n) => {
      const l = this.parser.parse({ data: n, type: this.format });
      if (l)
        this.add(l), this.lastDanmakuId = l[l.length - 1].id, this.player.emit("danmaku:loaded", l);
      else
        throw "无法正确解析弹幕格式";
    }).catch((n) => {
      this.player.emit("danmaku:loaded", [], n);
    });
  }
  /** 加载实时新增弹幕 */
  loadNew(t) {
    var s, n;
    const e = this.lastDanmakuId;
    this.player.emit("danmaku:new_loading", e), (n = (s = this.api).danmakuGet) == null || n.call(s, { id: t, offset: this.lastDanmakuId }).then((l) => {
      const r = this.parser.parse({ data: l, type: this.format });
      if (r)
        this.add(r), this.lastDanmakuId = r[r.length - 1].id, this.player.emit("danmaku:new_loaded", e, r);
      else
        throw "无法正确解析弹幕格式";
    }).catch((l) => {
      this.player.emit("danmaku:new_loaded", e, [], l);
    });
  }
  /** 重载弹幕 */
  async reload(t, e) {
    this.player.emit("danmaku:loading"), this.engine.reset(), t && this.load(t), e == null || e.forEach((s) => {
      this.loadAddition(s);
    });
  }
  /**
   * 添加弹幕到弹幕池
   * @param dan 要添加的弹幕
   * */
  add(t) {
    var n, l;
    const e = [], s = {};
    t.forEach((r) => {
      r.mode < 7 ? e.push(r) : s[r.mode] ? s[r.mode].push(r) : s[r.mode] = [r];
    }), e.length && this.engine.add(e);
    for (const r in s)
      (l = (n = this.handler)[r]) == null || l.call(n, s[r]);
  }
  /**
   * 根据id从弹幕池中移除弹幕
   * @param ids 要移除的弹幕id
   * */
  remove(t) {
    this.engine.remove(t);
  }
  /** 清空弹幕池 */
  clear() {
    this.engine.clear();
  }
  /** 显示弹幕 */
  show() {
    this.engine.show(), this.player.emit("danmaku:on");
  }
  /** 隐藏弹幕 */
  hide() {
    this.engine.hide(), this.player.emit("danmaku:off");
  }
  /** 切换弹幕显示 */
  toggle() {
    this.engine.hidden ? this.show() : this.hide();
  }
  // 弹幕屏蔽
  /**
   * 弹幕类型屏蔽
   * @param type 类型
   * @param flag 设置是否屏蔽
   */
  filter(t, e) {
    switch (t) {
      case "roll":
        this.engine.setTrackFilter("roll", e), this.engine.setTrackFilter("reverse", e);
        break;
      case "top":
      case "bottom":
        this.engine.setTrackFilter(t, e);
        break;
      case "color":
        this.engine.setColorFilter(e);
        break;
    }
    this.player.emit("danmaku:filter", t, e);
  }
  // 弹幕播放属性设置
  /** 设置弹幕不透明度 */
  setOpacity(t) {
    this.engine.opacity = t, this.player.emitChange("danmaku.opacity", t);
  }
  /** 设置弹幕速度 */
  setSpeed(t) {
    this.engine.speed = t, this.player.emitChange("danmaku.speed", t);
  }
  /** 设置弹幕区域 */
  setArea(t) {
    this.engine.limitArea = t || 1 / 0, this.player.emitChange("danmaku.area", t);
  }
  /** 设置弹幕大小 */
  setScale(t) {
    this.engine.fontScale = t, this.player.emitChange("danmaku.scale", t);
  }
  /** 设置弹幕字体 */
  setFont(t) {
    this.engine.fontFamily = t, this.player.emitChange("danmaku.font", t);
  }
  /** 设置弹幕加粗 */
  setBold(t) {
    this.engine.fontWeight = t ? "bold" : "", this.player.emitChange("danmaku.bold", t);
  }
}
zt.pluginName = "danmaku";
const vs = p`
  <div class="${a}-controls-button ${a}-button_danmakutoggle state-on">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-danmaku-off"></i>
      <i class="mpicon-danmaku"></i>
    </div>
    <div class="mpui-tooltip">关闭弹幕</div>
  </div>
`;
class Ot extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(vs, s), super(t, e, {
      name: "buttonDanmakuToggle",
      defaultOptions: {
        container: (n) => {
          var l, r;
          return ((l = n.plugin.danmakuBar) == null ? void 0 : l.$slot) || ((r = n.plugin.controller) == null ? void 0 : r.$right);
        },
        order: 0
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  created() {
    this.player.on("danmaku:on", () => {
      this._change(!0);
    }), this.player.on("danmaku:off", () => {
      this._change(!1);
    }), this.$icon.addEventListener("click", () => {
      var t;
      (t = this.player.plugin.danmaku) == null || t.toggle();
    });
  }
  /** 设置按钮状态 */
  _change(t) {
    this.$el.classList.toggle("state-on", t), this.$tooltip.innerText = t ? "关闭弹幕" : "开启弹幕";
  }
}
Ot.pluginName = "buttonDanmakuToggle";
const gs = p`
  <div class="${a}-controls-button ${a}-button_danmakusettings">
    <div class="${a}-controls-button-icon">
      <i class="mpicon-danmaku-settings"></i>
    </div>
    <div class="${a}-controls-panel-wrap">
      <div class="${a}-controls-panel ${a}-controls-panel-danmaku-settings">
        <div class="${a}-panel-row">
          <div class="${a}-row-label">类型屏蔽</div>
          <div class="${a}-danmaku-settings-filter-picker"></div>
        </div>
        <div class="${a}-panel-row">
          <div class="${a}-row-label">不透明度</div>
          <div
            class="${a}-danmaku-settings-opacity-slider ${a}-slider-wrap"
          ></div>
          <div class="${a}-danmaku-settings-opacity-value ${a}-row-value"></div>
        </div>
        <div class="${a}-panel-row">
          <div class="${a}-row-label">显示区域</div>
          <div class="${a}-danmaku-settings-area-slider ${a}-slider-wrap"></div>
          <div class="${a}-danmaku-settings-area-value ${a}-row-value"></div>
        </div>
        <div class="${a}-panel-row">
          <div class="${a}-row-label">文字大小</div>
          <div class="${a}-danmaku-settings-size-slider ${a}-slider-wrap"></div>
          <div class="${a}-danmaku-settings-size-value ${a}-row-value"></div>
        </div>
        <div class="${a}-panel-row">
          <div class="${a}-row-label">弹幕速度</div>
          <div
            class="${a}-danmaku-settings-speed-slider  ${a}-slider-wrap"
          ></div>
          <div class="${a}-danmaku-settings-speed-value ${a}-row-value"></div>
        </div>
      </div>
    </div>
  </div>
`;
class Wt extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(gs, s), super(t, e, {
      name: "buttonDanmakuSettings",
      defaultOptions: {
        container: (n) => {
          var l, r;
          return ((l = n.plugin.danmakuBar) == null ? void 0 : l.$slot) || ((r = n.plugin.controller) == null ? void 0 : r.$right);
        },
        order: 1
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this.danmaku = t.plugin.danmaku, this.$icon = this.$(`.${a}-controls-button-icon`), this.$filterPicker = this.$(`.${a}-danmaku-settings-filter-picker`), this.$opacitySlider = this.$(`.${a}-danmaku-settings-opacity-slider`), this.$areaSlider = this.$(`.${a}-danmaku-settings-area-slider`), this.$sizeSlider = this.$(`.${a}-danmaku-settings-size-slider`), this.$speedSlider = this.$(`.${a}-danmaku-settings-speed-slider`), this.$opacityValue = this.$(`.${a}-danmaku-settings-opacity-value`), this.$areaValue = this.$(`.${a}-danmaku-settings-area-value`), this.$sizeValue = this.$(`.${a}-danmaku-settings-size-value`), this.$speedValue = this.$(`.${a}-danmaku-settings-speed-value`);
  }
  created() {
    this.pickerFilter = new Xe({
      container: this.$filterPicker,
      value: [],
      list: [
        { value: "roll", label: "滚动" },
        { value: "top", label: "顶部" },
        { value: "bottom", label: "底部" },
        { value: "color", label: "彩色" },
        { value: "special", label: "特殊" }
      ],
      onToggle: (t, e) => {
        this.danmaku.filter(t, e);
      }
    }), this.sliderOpacity = new J({
      container: this.$opacitySlider,
      min: 10,
      max: 100,
      step: 1,
      value: 100,
      onDrag: (t) => {
        this.danmaku.setOpacity(t / 100);
      },
      onChange: (t) => {
        this.$opacityValue.innerText = `${t}%`;
      }
    }), this.sliderArea = new J({
      container: this.$areaSlider,
      min: 20,
      max: 105,
      step: 5,
      value: 25,
      onDrag: (t) => {
        const e = t / 100;
        this.danmaku.setArea(e > 100 ? 0 : e);
      },
      onChange: (t) => {
        this.$areaValue.innerText = t < 100 ? `${t}%` : t == 100 ? "不重叠" : "无限";
      }
    }), this.sliderArea.drag(25), this.sliderSize = new J({
      container: this.$sizeSlider,
      min: 50,
      max: 200,
      step: 1,
      value: 100,
      onDrag: (t) => {
        this.danmaku.setScale(t / 100);
      },
      onChange: (t) => {
        this.$sizeValue.innerText = `${t}%`;
      }
    }), this.sliderSpeed = new J({
      container: this.$speedSlider,
      min: 20,
      max: 180,
      step: 10,
      value: 100,
      divider: 5,
      onDrag: (t) => {
        this.danmaku.setSpeed(t / 100);
      },
      onChange: (t) => {
        this.$speedValue.innerText = `${t}%`;
      }
    });
  }
}
Wt.pluginName = "buttonDanmakuSettings";
const fs = (i) => p`
  <div class="${a}-hotkeys">
    <div class="${a}-hotkeys-list">
      ${i.map(
  ({ key: t, description: e }) => p`
          <div class="${a}-hotkeys-list-item">
            <div class="${a}-hotkeys-list-key">${t}</div>
            <div class="${a}-hotkeys-list-description">${e}</div>
          </div>
        `
)}
    </div>
  </div>
`;
class Ut extends st {
  constructor(t, e) {
    const s = [
      { key: "Space", description: "播放/暂停" },
      { key: "→", description: "快进5秒" },
      { key: "←", description: "快退5秒" },
      { key: "↑", description: "音量增加10%" },
      { key: "↓", description: "音量降低10%" }
    ], n = new DocumentFragment();
    v(fs(s), n), super(t, e, {
      name: "hotkeys",
      defaultOptions: { mount: (l) => l.plugin.modal },
      el: n.querySelector(`.${a}-hotkeys`)
    }), this.title = "快捷键说明";
  }
}
Ut.pluginName = "hotkeys";
const ys = () => p`
  <div class="${a}-about">
    <div class="${a}-about-logo"></div>
    <div class="${a}-about-version">version ${B.version}-${B.gitHash}</div>
    <div>github：<a href="${ye}" target="_blank">mfuns-cn/mfunsPlayer</a></div>
    <div>开发者：</div>
    <ul class="${a}-about-developers">
      ${be.map(
  ({ name: i, link: t }) => p`
          <li>
            <a href="${t}" target="_blank">${i}</a>
          </li>
        `
)}
      <li></li>
    </ul>
  </div>
`;
class jt extends st {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(ys(), s), super(t, e, {
      name: "about",
      defaultOptions: { mount: (n) => n.plugin.modal },
      el: s.querySelector(`.${a}-about`)
    }), this.title = "关于";
  }
}
jt.pluginName = "about";
const bs = (i) => p`
  <div class="${a}-contextmenu">
    <ul class="${a}-contextmenu-danmaku mpui-black"></ul>
    <ul class="${a}-contextmenu-menu mpui-black">
      ${i.map(
  ({ name: t, onClick: e }) => p`
          <li class="${a}-contextmenu-item" @click=${e}>${t}</li>
        `
)}
    </ul>
  </div>
`, ks = (i, t, e, s) => p`
  ${i.map(
  (n) => p`
      <li
        class="${a}-contextmenu-danmaku-item"
        @click=${() => {
    e(n);
  }}
      >
        <div class="${a}-contextmenu-danmaku-item-content">${n.content}</div>
        <div class="${a}-contextmenu-danmaku-item-operate">
          ${t(n).map(
    ([l, r]) => p`<div
              class="${a}-contextmenu-danmaku-item-operate-btn"
              @click=${(h) => {
      h.stopPropagation(), r(n), s.hide();
    }}
            >
              ${l}
            </div>`
  )}
        </div>
      </li>
    `
)}
`, ws = (i) => {
  navigator.clipboard.writeText(i).then(
    (t) => {
    },
    (t) => {
    }
  );
};
class Xt extends F {
  constructor(t) {
    super(t), this.isShow = !1, this.player = t;
    const e = [
      {
        name: "快捷键说明",
        onClick: () => {
          var s;
          (s = this.player.plugin.hotkeys) == null || s.toggle(!0);
        }
      },
      {
        name: `Mfuns Player v${B.version}-${B.gitHash}`,
        onClick: () => {
          var s;
          (s = this.player.plugin.about) == null || s.toggle(!0);
        }
      }
    ];
    this.container = H("div", { class: `${a}-contextmenu-wrap` }), v(bs(e), this.container), this.$el = this.container.querySelector(`.${a}-contextmenu`), this.$danmaku = this.$el.querySelector(`.${a}-contextmenu-danmaku`), this.$menu = this.$el.querySelector(`.${a}-contextmenu-menu`), this.player.$main.appendChild(this.container);
  }
  created() {
    this.player.$area.addEventListener("contextmenu", (t) => {
      var r;
      t.preventDefault();
      const e = this.player.$area.getBoundingClientRect(), s = t.clientX - e.left, n = t.clientY - e.top;
      this.show(s, n);
      const l = (r = this.danmaku) == null ? void 0 : r.engine.captureDanmaku(s, n, 4);
      this.showDanmaku(l || []);
    }), this.container.addEventListener("contextmenu", (t) => {
      var r;
      t.preventDefault();
      const e = this.container.getBoundingClientRect(), s = t.clientX - e.left, n = t.clientY - e.top;
      this.show(s, n);
      const l = (r = this.danmaku) == null ? void 0 : r.engine.captureDanmaku(s, n, 4);
      this.showDanmaku(l || []);
    }), document.addEventListener("click", () => {
      this.isShow && this.hide();
    });
  }
  pluginsReady() {
    this.danmaku = this.player.plugin.danmaku;
  }
  show(t, e) {
    this.container.classList.add("state-show");
    const s = this.player.$area.getBoundingClientRect();
    t + this.$el.offsetWidth >= s.width ? (this.$el.style.right = s.width - t + "px", this.$el.style.left = "initial") : (this.$el.style.left = t + "px", this.$el.style.right = "initial"), e + this.$el.offsetHeight >= s.height ? (this.$el.style.bottom = s.height - e + "px", this.$el.style.top = "initial") : (this.$el.style.top = e + "px", this.$el.style.bottom = "initial"), this.isShow = !0;
  }
  showDanmaku(t) {
    var n, l;
    const e = (n = this.danmaku) == null ? void 0 : n.api, s = (l = this.danmaku) == null ? void 0 : l.operate;
    t != null && t.length ? this.$danmaku.style.display = "" : this.$danmaku.style.display = "none", v(
      ks(
        t,
        (r) => {
          const h = this.player.userId && r.user == this.player.userId;
          return [
            [
              "举报",
              (o) => {
                s == null || s.report(o);
              },
              !h && (e == null ? void 0 : e.danmakuReport)
            ],
            [
              "屏蔽",
              (o) => {
                s == null || s.blockUser(o.user, !0);
              },
              !h && (e == null ? void 0 : e.danmakuBlockUser)
            ],
            [
              "撤回",
              (o) => {
                s == null || s.recall(o);
              },
              h && (e == null ? void 0 : e.danmakuRecall)
            ],
            [
              "复制",
              (o) => {
                ws(o.content);
              },
              !0
            ]
          ].filter((o) => o[2]);
        },
        (r) => {
          this.player.emit("danmaku:select", r);
        },
        this
      ),
      this.$danmaku
    );
  }
  hide() {
    this.container.classList.remove("state-show"), this.isShow = !1;
  }
}
Xt.pluginName = "contextMenu";
const xs = () => p`
  <div class="${a}-controller-mask"></div>
  <div class="${a}-controller mpui-crystal">
    <div class="${a}-controller-top"></div>
    <div class="${a}-controller-content">
      <div class="${a}-controller-left"></div>
      <div class="${a}-controller-center"></div>
      <div class="${a}-controller-right"></div>
    </div>
  </div>
`;
class Kt extends F {
  constructor(t, e) {
    super(t), this.isHover = !1, this.player = t, this.container = document.createElement("div"), this.container.className = `${a}-controller-wrap`;
    const s = new DocumentFragment();
    v(xs(), s), this.$el = s.querySelector(`.${a}-controller`), this.$top = this.$el.querySelector(`.${a}-controller-top`), this.$content = this.$el.querySelector(`.${a}-controller-content`), this.$left = this.$el.querySelector(`.${a}-controller-left`), this.$center = this.$el.querySelector(`.${a}-controller-center`), this.$right = this.$el.querySelector(`.${a}-controller-right`), this.player.$main.append(this.container), this.inactiveHook = () => !this.isHover, this.mouseEnterHandler = () => {
      this.isHover = !0;
    }, this.mouseLeaveHandler = () => {
      this.isHover = !1;
    }, this.container.appendChild(s);
  }
  created(t) {
    this.player.hook.register("inactive", this.inactiveHook), this.container.addEventListener("mouseenter", this.mouseEnterHandler), this.container.addEventListener("mouseleave", this.mouseLeaveHandler);
  }
  destroy() {
    this.player.hook.unregister("inactive", this.inactiveHook), this.container.removeEventListener("mouseenter", this.mouseEnterHandler), this.container.removeEventListener("mouseleave", this.mouseLeaveHandler);
  }
}
Kt.pluginName = "controller";
class Yt {
  constructor(t, e) {
    this.player = t, this.controlMask = this.player.$area, this.initKey(), this.initMask();
  }
  initKey() {
    document.addEventListener("keydown", (t) => {
      if (this.player.focused)
        switch (t.keyCode) {
          case I.Space:
            t.preventDefault(), this.player.toggle();
            break;
          case I.LeftArrow:
            t.preventDefault(), this.player.seek(this.player.time - 5);
            break;
          case I.RightArrow:
            t.preventDefault(), this.player.seek(this.player.time + 5);
            break;
          case I.UpArrow:
            t.preventDefault(), this.player.setVolume(this.player.volume + 0.1);
            break;
          case I.DownArrow:
            t.preventDefault(), this.player.setVolume(this.player.volume - 0.1);
            break;
        }
    });
  }
  initMask() {
    this.controlMask.addEventListener("click", () => {
      this.player.toggle();
    });
  }
}
Yt.pluginName = "hotkey";
const Ss = () => p`
  <div class="${a}-modal-mask"></div>
  <div class="${a}-modal">
    <div class="${a}-modal-head">
      <div class="${a}-modal-title"></div>
      <div class="${a}-modal-close">
        <i class="mpicon-close"></i>
      </div>
    </div>
    <div class="${a}-modal-content"></div>
  </div>
`;
class Qt extends F {
  constructor(t, e) {
    super(t), this.current = null, this.container = H("div", { class: `${a}-modal-wrap` }), v(Ss(), this.container), this.$el = this.container.querySelector(`.${a}-modal`), this.$mask = this.container.querySelector(`.${a}-modal-mask`), this.$content = this.$el.querySelector(`.${a}-modal-content`), this.$title = this.$el.querySelector(`.${a}-modal-title`), this.$close = this.$el.querySelector(`.${a}-modal-close`), this.player.$main.appendChild(this.container);
  }
  get isShow() {
    return this.container.classList.contains("state-show");
  }
  created() {
    this.$mask.addEventListener("click", () => {
      this.hide();
    }), this.$close.addEventListener("click", () => {
      this.hide();
    });
  }
  hide() {
    var t;
    (t = this.current) == null || t.toggle(!1);
  }
  mount(t) {
    t.mount(this.$content, (e) => {
      if (e) {
        for (const s of this.$content.children)
          s.classList.toggle("state-show", s == t.$el);
        this.container.classList.add("state-show"), this.$title.innerText = t.title, this.current = t;
      } else
        this.current == t && (this.container.classList.remove("state-show"), t.$el.classList.remove("state-show"), this.$title.innerText = "", this.current = null);
    });
  }
}
Qt.pluginName = "modal";
const Ls = () => p`
  <div class="${a}-progress">
    <div class="${a}-progress-buffered"></div>
    <div class="${a}-progress-played"></div>
    <div class="${a}-progress-thumb-track">
      <div class="${a}-progress-thumb"></div>
    </div>
    <div class="${a}-progress-preview">
      <div class="${a}-progress-thumbnail"></div>
      <div class="${a}-progress-time"></div>
    </div>
    <div class="${a}-progress-tip"></div>
  </div>
`;
class Gt {
  constructor(t, e) {
    this.trackLength = 0, this.distance = 0, this.nMax = 0, this.nLeft = 0, this.isDragging = !1, this.isHover = !1, this.isActive = !1, this.player = t, this.controller = t.plugin.controller, this.container = this.controller.$top, v(Ls(), this.container), this.$el = this.container.querySelector(`.${a}-progress`), this.$buffered = this.$el.querySelector(`.${a}-progress-buffered`), this.$played = this.$el.querySelector(`.${a}-progress-played`), this.$thumbTrack = this.$el.querySelector(`.${a}-progress-thumb-track`), this.$thumb = this.$el.querySelector(`.${a}-progress-thumb`), this.$preview = this.$el.querySelector(`.${a}-progress-preview`), this.$thumbnail = this.$el.querySelector(`.${a}-progress-thumbnail`), this.$time = this.$el.querySelector(`.${a}-progress-time`), this.$tip = this.$el.querySelector(`.${a}-progress-tip`), this.container.addEventListener("mousedown", (l) => {
      const { clientX: r } = l;
      this.trackLength = this.$el.offsetWidth, this.nMax = this.$thumbTrack.offsetWidth || this.trackLength, this.nLeft = this.container.getBoundingClientRect().left, this.distance = r - this.nLeft, this.setPlayed(this.nValue), this.$el.classList.add(`${a}-progress-dragging`), this.isDragging = !0, document.addEventListener("mousemove", s), document.addEventListener("mouseup", n);
    });
    const s = (l) => {
      var h;
      const { clientX: r } = l;
      l.preventDefault(), l.stopPropagation(), this.distance = r - this.nLeft, this.setPlayed(this.nValue), this.updateTip(), (h = window.getSelection()) == null || h.removeAllRanges();
    }, n = (l) => {
      var r;
      l.stopPropagation(), (r = window.getSelection()) == null || r.removeAllRanges(), document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", n), this.$el.classList.remove(`${a}-progress-dragging`), this.isDragging = !1, this.isHover || this.setActive(!1), this.player.seek(this.nValue), this.player.play();
    };
    this.container.addEventListener("mouseenter", () => {
      this.isHover = !0, this.isDragging || this.updateTip();
    }), this.container.addEventListener("mousemove", (l) => {
      if (this.isDragging)
        return;
      const { clientX: r } = l;
      this.trackLength = this.$el.offsetWidth, this.nMax = this.$thumbTrack.offsetWidth || this.trackLength, this.nLeft = this.container.getBoundingClientRect().left, this.distance = r - this.nLeft, this.updateTip();
    }), this.container.addEventListener("mouseleave", () => {
      this.isHover = !1, this.isDragging || this.setActive(!1);
    }), this.player.on("timeupdate", (l) => {
      this.isDragging || this.setPlayed(l);
    }), this.player.on("progress", (l) => {
      this.setBuffered(l.length ? l.end(l.length - 1) : 0);
    });
  }
  /** 滑动距离 */
  get nLength() {
    const t = this.distance - this.thumbTrackX;
    return t >= this.nMax ? this.nMax : t <= 0 ? 0 : t;
  }
  /** 滑块轨道与总轨道距离差 */
  get thumbTrackX() {
    return (this.trackLength - this.nMax) / 2;
  }
  /** 滑动值 */
  get nValue() {
    return this.nLength / this.nMax * this.player.duration;
  }
  /** 设置已播放进度条位置 */
  setPlayed(t) {
    const e = t / this.player.duration || 0;
    this.$thumb.style.left = `${e * 100}%`, this.$played.style.width = `${e * 100}%`;
  }
  /** 设置已播放进度条位置 */
  setBuffered(t) {
    const e = t / this.player.duration || 0;
    this.$buffered.style.width = `${e * 100}%`;
  }
  /** 设置进度条活跃状态 */
  setActive(t) {
    this.isActive = t, this.$el.classList.toggle(`${a}-progress-active`, t), t ? this.player.controlled = !0 : this.player.controlled = !1;
  }
  /** 更新指针位置 */
  updateTip() {
    this.isActive || this.setActive(!0);
    let t = this.distance / this.trackLength;
    t = t >= 1 ? 1 : t <= 0 ? 0 : t, this.$tip.style.left = `${t * 100}%`, this.$preview.style.left = `${t * 100}%`, this.$time.innerText = z(this.nValue);
  }
}
Gt.pluginName = "progress";
const _s = p`
  <div class="${a}-settings">
    <div class="${a}-settings-slot">
      <div class="${a}-panel-row">
        <div class="${a}-row-label">播放倍速</div>
        <div class="${a}-settings-rate-picker"></div>
      </div>
      <div class="${a}-panel-row">
        <div class="${a}-row-label">视频比例</div>
        <div class="${a}-settings-ratio-picker"></div>
      </div>
    </div>
    <div class="${a}-panel-row">
      <div class="${a}-row-label">播放方式</div>
      <div class="${a}-settings-play"></div>
    </div>
    <div class="${a}-panel-row">
      <div class="${a}-row-label">其他设置</div>
      <div class="${a}-settings-others"></div>
    </div>
  </div>
`;
class Zt extends F {
  constructor(t, e) {
    super(t);
    const s = new DocumentFragment();
    v(_s, s), this.$el = s.querySelector(`.${a}-settings`), this.$slot = this.$el.querySelector(`.${a}-settings-slot`), this.$play = this.$el.querySelector(`.${a}-settings-play`), this.$others = this.$el.querySelector(`.${a}-settings-others`), this.$ratePicker = this.$el.querySelector(`.${a}-settings-rate-picker`), this.$ratioPicker = this.$el.querySelector(`.${a}-settings-ratio-picker`);
  }
  created(t) {
    this.pickerRate = new X({
      container: this.$ratePicker,
      list: [
        { value: 0.5, label: "0.5" },
        { value: 0.75, label: "0.75" },
        { value: 1, label: "1.0" },
        { value: 1.25, label: "1.25" },
        { value: 1.5, label: "1.5" },
        { value: 2, label: "2.0" }
      ],
      value: t.playbackRate || 1,
      onPick: (e) => {
        this.player.setPlaybackRate(Number(e));
      }
    }), this.player.on("ratechange", (e) => {
      this.pickerRate.setValue(e);
    }), this.pickerRatio = new X({
      container: this.$ratioPicker,
      list: [{ value: "", label: "自动" }, { value: "16:9" }, { value: "4:3" }],
      value: t.aspectRatio ? t.aspectRatio.join(":") : "",
      onPick: (e) => {
        this.player.setRatio(
          e ? e.split(":").map((s) => Number(s)) : null
        );
      }
    }), this.player.watch("aspectRatio", (e) => {
      this.pickerRatio.setValue(e ? e.join(":") : "");
    });
  }
}
Zt.pluginName = "settings";
class Jt extends F {
  created() {
    this.player.hook.register("setVideo", (t) => {
      var e;
      if (!t.url) {
        const s = (e = t.sources) == null ? void 0 : e[0];
        s && (t.url = s.url, t.type = s.type);
      }
    });
  }
  /** 设置视频源 */
  set(t) {
    this.player.switchVideo({ url: t.url, type: t.type });
  }
}
Jt.pluginName = "sources";
const Es = () => p`
  <div class="${a}-side-mask"></div>
  <div class="${a}-side">
    <div class="${a}-side-head">
      <div class="${a}-side-title"></div>
      <div class="${a}-side-close">
        <i class="mpicon-close"></i>
      </div>
    </div>
    <div class="${a}-side-content"></div>
  </div>
`;
class Ct extends F {
  constructor(t, e) {
    super(t), this.current = null, this.container = H("div", { class: `${a}-side-wrap` }), v(Es(), this.container), this.$el = this.container.querySelector(`.${a}-side`), this.$mask = this.container.querySelector(`.${a}-side-mask`), this.$content = this.$el.querySelector(`.${a}-side-content`), this.$title = this.$el.querySelector(`.${a}-side-title`), this.$close = this.$el.querySelector(`.${a}-side-close`), this.player.$main.appendChild(this.container);
  }
  get isShow() {
    return this.container.classList.contains("state-show");
  }
  created() {
    this.$mask.addEventListener("click", () => {
      this.hide();
    }), this.$close.addEventListener("click", () => {
      this.hide();
    });
  }
  hide() {
    var t;
    (t = this.current) == null || t.toggle(!1);
  }
  mount(t) {
    t.mount(this.$content, (e) => {
      var s;
      if (e) {
        (s = this.current) == null || s.toggle(!1);
        for (const n of this.$content.children)
          n.classList.toggle("state-show", n == t.$el);
        this.container.classList.add("state-show"), this.$title.innerText = t.title, this.current = t;
      } else
        this.current == t && (this.container.classList.remove("state-show"), t.$el.classList.remove("state-show"), this.$title.innerText = "", this.current = null);
    });
  }
}
Ct.pluginName = "side";
const Ts = [Jt], As = [Qt, Ct, Kt, Zt, Yt, Xt], Fs = [
  Gt,
  Ft,
  Pt,
  Dt,
  Ht,
  qt,
  Mt,
  Nt,
  It,
  Rt,
  Vt
];
function Ps(i) {
  return {
    ...i,
    plugins: [...Ts, ...As, ...Fs, ...i.plugins || []]
  };
}
class te extends F {
  constructor(t, e) {
    super(t), this._status = !1, e.autoPart && this.toggle(!0), this.player.hook.register("end", () => {
      var s;
      if (this.status && this.player.videoInfo.part != ((s = this.player.videoInfo.list) == null ? void 0 : s.length))
        return this.player.next(), !1;
    });
  }
  pluginsReady() {
    if (this.player.plugin.settings) {
      const t = document.createElement("div");
      this.checkbox = new Tt({
        container: t,
        value: this.status,
        onToggle: (e) => {
          this.toggle(e);
        },
        label: "分P连播"
      }), this.player.plugin.settings.$play.appendChild(t);
    }
  }
  toggle(t) {
    t ? this._status = !0 : this._status = !1, this.player.emitChange("autoPart", t);
  }
  get status() {
    return this._status;
  }
}
te.pluginName = "autoPart";
class ee extends F {
  constructor(t, e) {
    super(t), this._status = !1, e.autoPlay && this.toggle(!0);
  }
  pluginsReady() {
    if (this.player.plugin.settings) {
      const t = document.createElement("div");
      this.checkbox = new Tt({
        container: t,
        value: this.status,
        onToggle: (e) => {
          this.toggle(e);
        },
        label: "自动播放"
      }), this.player.plugin.settings.$play.appendChild(t);
    }
  }
  toggle(t) {
    t ? this._status = !0 : this._status = !1, this.player.emitChange("autoPlay", t);
  }
  get status() {
    return this._status;
  }
}
ee.pluginName = "autoPlay";
const lt = {
  primaryColor: "--mp-primary-color",
  secondaryColor: "--mp-secondary-color",
  borderRadius: "--mp-border-radius",
  bgWhite: "--mp-bg-white",
  bgBlack: "--mp-bg-black",
  panelWhite: "--mp-panel-white",
  panelBlack: "--mp-panel-black"
};
class se extends F {
  constructor(t, e) {
    super(t), this.properties = {}, this.themeElement = [this.player.container], this.setTheme(e.theme || {});
  }
  /** 设置主题 */
  setTheme(t) {
    Object.assign(this.properties, t), this.themeElement.forEach((e) => {
      let s;
      for (s in t)
        e.style.setProperty(lt[s], t[s]);
    });
  }
  /** 设置某个主题属性 */
  set(t, e) {
    this.properties[t] = e, this.themeElement.forEach((s) => {
      s.style.setProperty(lt[t], e);
    });
  }
  get(t) {
    return this.properties[t];
  }
  /** 为元素绑定主题变量 */
  addThemeElement(t) {
    this.themeElement.push(t);
    let e;
    for (e in this.properties) {
      const s = this.properties[e];
      s && t.style.setProperty(lt[e], s);
    }
  }
}
se.pluginName = "theme";
class ie extends F {
  constructor(t) {
    super(t);
  }
  created() {
    this.player.hook.register(
      "setVideo",
      (t) => {
        t.list && !t.url && !t.sources && (t.part || (t.part = 1), Object.assign(t, t.list[t.part - 1]));
      },
      !0
    ), this.player.hook.register("next", () => {
      if (this.list && this.part < this.num)
        return this.set(this.part + 1), !1;
    }), this.player.hook.register("prev", () => {
      if (this.list && this.part > 1)
        return this.set(this.part - 1), !1;
    });
  }
  /** 设置分P */
  set(t, e) {
    var n;
    const s = this.player.videoInfo;
    t > 0 && t <= (((n = s.list) == null ? void 0 : n.length) || 0) && this.player.setVideo(
      {
        ...s,
        url: void 0,
        type: void 0,
        sources: void 0,
        ...s.list[t - 1],
        part: t
      },
      e ?? !this.player.paused
    );
  }
  get num() {
    var t;
    return ((t = this.player.videoInfo.list) == null ? void 0 : t.length) || 0;
  }
  get list() {
    return this.player.videoInfo.list || [];
  }
  get part() {
    return this.player.videoInfo.part || 1;
  }
}
ie.pluginName = "part";
class ne extends F {
  constructor(t, e) {
    super(t);
  }
  /** 无缝加载视频 */
  load(t) {
    this.player.emit("video_load", t);
    const { url: e, type: s, play: n, time: l } = t, r = this.player.$video, h = r.cloneNode();
    h.src = e, h.addEventListener(
      "loadedmetadata",
      () => {
        this.player.$content.insertBefore(h, r), h.currentTime = this.player.time, !this.player.paused && h.play(), h.addEventListener(
          "canplay",
          () => {
            this.player.emit("video_load", t), this.player.isPip && h.requestPictureInPicture(), this.player.bindVideo(h), r.remove(), n == !0 && this.player.paused && this.player.play(), n == !1 && !this.player.paused && this.player.pause(), l != null && this.player.seek(l);
          },
          { once: !0 }
        );
      },
      { once: !0 }
    );
  }
  pluginsReady() {
    this.player.hook.register("switchVideo", (t) => (this.load(t), !1));
  }
}
ne.pluginName = "seamless";
const Ds = p`
  <div class="${a}-partlist">
    <ul class="${a}-partlist-list mpui-list"></ul>
  </div>
`, Hs = (i, t) => i.map(
  ({ title: e }, s) => p`
      <li
        class="${a}-partlist-item"
        @click=${() => {
    t(s + 1);
  }}
        data-part="${s + 1}"
      >
        <div class="${a}-partlist-item-id">P${s + 1}</div>
        <div class="${a}-partlist-item-title">${e}</div>
      </li>
    `
);
class ae extends st {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(Ds, s), super(t, e, {
      name: "partList",
      el: s.querySelector(`.${a}-partlist`),
      defaultOptions: {
        mount: (n) => n.plugin.side
      }
    }), this.title = "分P列表", this._part = 0, this._list = [], this.$list = this.$(`.${a}-partlist-list`);
  }
  created() {
    this.player.on("video_change", (t) => {
      this._update(t.list), this._select(t.part || 1);
    });
  }
  _update(t) {
    t != this._list && (this._list = t, v(
      Hs(t || [], (e) => {
        var s;
        (s = this.player.plugin.part) == null || s.set(e);
      }),
      this.$list
    ));
  }
  _select(t) {
    var e, s;
    (e = this.$list.querySelector(`li[data-part="${this._part}"]`)) == null || e.classList.remove("state-selected"), this._part = t, (s = this.$list.querySelector(`li[data-part="${t}"]`)) == null || s.classList.add("state-selected");
  }
}
ae.pluginName = "partList";
const qs = p`
  <div class="${a}-controls-button ${a}-button_danmakulist">
    <div class="${a}-controls-button-icon">
      <div class="${a}-controls-button-text">弹幕列表</div>
    </div>
    <div class="mpui-tooltip">弹幕列表</div>
  </div>
`;
class le extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(qs, s), super(t, e, {
      name: "buttonDanmakuList",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$right;
        }
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this.$icon = this.$(`.${a}-controls-button-icon`), this.$text = this.$(`.${a}-controls-button-text`), this.$tooltip = this.$(".mpui-tooltip");
  }
  created() {
    this.$icon.addEventListener("click", () => {
      var t;
      (t = this.player.plugin.danmakuList) == null || t.toggle();
    });
  }
}
le.pluginName = "buttonDanmakuList";
const Ms = p`
  <div class="${a}-controls-button ${a}-button_quality">
    <div class="${a}-controls-button-icon">
      <div class="${a}-controls-button-text">自动</div>
    </div>

    <div class="${a}-controls-panel-wrap">
      <div class="${a}-controls-panel">
        <ul class="${a}-button_quality-list"></ul>
      </div>
    </div>
  </div>
`, bt = (i, t) => i == null ? void 0 : i.map(
  ({ quality: e, label: s }) => p`
        <li
          class="${a}-button_quality-item"
          @click=${() => {
    t(e);
  }}
          data-value="${e}"
        >
          <span class="${a}-button_quality-item-label">${s || e}</span>
        </li>
      `
);
class re extends D {
  constructor(t, e) {
    const s = new DocumentFragment();
    v(Ms, s), super(t, e, {
      name: "buttonQuality",
      defaultOptions: {
        container: (n) => {
          var l;
          return (l = n.plugin.controller) == null ? void 0 : l.$right;
        }
      },
      el: s.querySelector(`.${a}-controls-button`)
    }), this._value = "", this.$icon = this.$(`.${a}-controls-button-icon`), this.$text = this.$(`.${a}-controls-button-text`), this.$panel = this.$(`.${a}-controls-panel`), this.$list = this.$(`.${a}-button_quality-list`);
  }
  created() {
    this.player.on("video_change", (t) => {
      this._update(t.sources);
    }), this.player.on("video_load", (t) => {
      var s;
      const e = (s = this.player.videoInfo.sources) == null ? void 0 : s.find(({ url: n }) => n == t.url);
      if (e != null && e.quality)
        this._select(e == null ? void 0 : e.quality, e.label);
      else {
        const { videoWidth: n, videoHeight: l } = this.player.$video;
        this._select(`${Math.min(n, l)}P`);
      }
    });
  }
  _update(t) {
    if (t == this._list)
      return;
    const e = [];
    if (t == null || t.forEach(({ quality: s, label: n }) => {
      s && !e.find((l) => l.quality == s) && e.push({ quality: s, label: n });
    }), e != null && e.length)
      v(
        bt(e, (s) => {
          var n;
          (n = this.player.plugin.quality) == null || n.set(s);
        }),
        this.$list
      );
    else {
      const { videoWidth: s, videoHeight: n } = this.player.$video;
      v(
        bt([{ quality: `${Math.min(s, n)}P` }], (l) => {
          var r;
          (r = this.player.plugin.quality) == null || r.set(l);
        }),
        this.$list
      );
    }
    this._list = t;
  }
  _select(t, e) {
    var s, n;
    (s = this.$list.querySelector(`li[data-value="${this._value}"]`)) == null || s.classList.remove("state-selected"), this._value = t, (n = this.$list.querySelector(`li[data-value="${t}"]`)) == null || n.classList.add("state-selected"), this.$text.innerText = e || t;
  }
}
re.pluginName = "buttonQuality";
class oe extends F {
  constructor(t, e) {
    super(t), this.value = "";
  }
  created() {
    this.player.hook.register("setVideo", (t) => {
      if (!t.url && t.sources) {
        const e = t.sources[0];
        t.url = e.url, t.type = e.type;
      }
    });
  }
  /** 切换视频质量
   */
  async set(t) {
    const e = this.player.videoInfo.sources;
    if (!e)
      return;
    let s = e.find((n) => n.quality == t);
    s || (s = this.findSourceByQuality(e, t)), this.player.switchVideo(s), this.player.emitChange("quality", s.quality || "");
  }
  /** 根据视频质量选择合适的视频源
   * 返回小于等于该质量的视频源中最大的一个
   */
  findSourceByQuality(t, e) {
    const s = [...t].sort(
      (l, r) => parseInt(r.quality || "") - parseInt(l.quality || "")
    );
    let n = s.find((l) => parseInt(l.quality || "") <= parseInt(e));
    return n || (n = s[s.length - 1]), n;
  }
}
oe.pluginName = "quality";
const Ns = p`
  <div class="${a}-videostatus-paused"></div>
  <div class="${a}-videostatus-loading">
    <div class="${a}-videostatus-loading-icon">
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
    <div class="${a}-videostatus-loading-content">正在缓冲</div>
    <div class="${a}-videostatus-loading-speed"></div>
  </div>
  <div class="${a}-videostatus-volume"></div>
`;
class he extends F {
  constructor(t, e) {
    super(t), this.$el = H("div", { class: `${a}-videostatus` }), v(Ns, this.$el), this.$paused = this.$el.querySelector(`.${a}-videostatus-paused`), this.$loading = this.$el.querySelector(`.${a}-videostatus-loading`), this.$volume = this.$el.querySelector(`.${a}-videostatus-volume`), this.player.$area.appendChild(this.$el);
  }
}
he.pluginName = "videoStatus";
const Is = p`
  <div class="${a}-loadingmask-info"></div>
  <div class="${a}-loadingmask-tips">Loading...</div>
`;
class ce extends F {
  constructor(t, e) {
    var s, n;
    super(t), this.$el = H("div", { class: `${a}-loadingmask` }), v(Is, this.$el), this.$info = this.$el.querySelector(`.${a}-loadingmask-info`), this.$tips = this.$el.querySelector(`.${a}-loadingmask-tips`), this.getTips = (s = e.loadingMask) == null ? void 0 : s.getTips, this.delay = ((n = e.loadingMask) == null ? void 0 : n.delay) || 0, this.player.$main.appendChild(this.$el);
  }
  created() {
    this._toggle(!0), this._add("init", "播放器初始化…"), this.player.on("danmaku:loading", () => {
      this._add("danmaku", "请求弹幕数据中…");
    }), this.player.on("danmaku:loaded", (t, e) => {
      this._change("danmaku", (s) => {
        e ? s.innerText = `请求弹幕数据中… [失败] ${e}` : s.innerText = "请求弹幕数据中… [完成]";
      });
    }), this.player.on("video_change", async () => {
      var t;
      this._toggle(!0), this._tips(await ((t = this.getTips) == null ? void 0 : t.call(this)));
    }), this.player.on("video_load", () => {
      this._add("video", "请求视频数据中…"), this.player.once("canplay", () => {
        this._change("video", (t) => {
          t.innerText = "请求视频数据中… [完成]";
          let e = 0;
          const s = () => {
            this._toggle(!1), this._tips("Loading..."), this._clear(), window.clearTimeout(e);
          };
          this.delay ? e = window.setTimeout(s, this.delay) : s();
        });
      }), this.player.$video.addEventListener(
        "error",
        (t) => {
          this._change("video", (e) => {
            e.innerText = `请求视频数据中… [失败] ${t}`;
          });
        },
        { once: !0 }
      );
    }), this.player.on("error", (t) => {
      this._add("error", `${t}`);
    });
  }
  pluginsReady() {
    this._change("init", (t) => {
      t.innerText = "播放器初始化… [完成]";
    });
  }
  _clear() {
    this.$info.innerHTML = "";
  }
  _add(t, e) {
    const s = H("div", { class: `${a}-loadingmask-info-item` });
    s.dataset.id = t, s.append(e), this.$info.appendChild(s);
  }
  _change(t, e) {
    const s = this.$info.querySelector(`[data-id="${t}"]`);
    s && e(s);
  }
  _toggle(t) {
    this.$el.classList.toggle("state-show", t);
  }
  _tips(t) {
    this.$tips.innerHTML = "", t && this.$tips.append(t);
  }
}
ce.pluginName = "loadingMask";
const Rs = [
  ie,
  ne,
  zt,
  At,
  Et,
  ee,
  te,
  se,
  oe,
  he,
  ce
], Bs = [
  Bt,
  Ot,
  Wt,
  le,
  re
], Vs = [jt, Ut, ae];
class zs extends B {
  constructor(t) {
    super(
      Ps({
        autoPart: !0,
        ...t,
        plugins: [...Rs, ...Vs, ...Bs, ...t.plugins || []]
      })
    );
  }
}
export {
  zs as default
};
//# sourceMappingURL=mfuns-player.es.js.map
(function(){"use strict";try{if(typeof document<"u"){var A=document.createElement("style");A.appendChild(document.createTextNode('@charset "UTF-8";@font-face{font-family:mfunsPlayerIcon;src:url(data:application/vnd.ms-fontobject;base64,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);src:url(data:application/vnd.ms-fontobject;base64,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) format("embedded-opentype"),url(data:font/ttf;base64,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) format("truetype"),url(data:font/woff;base64,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) format("woff"),url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIiA+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8bWV0YWRhdGE+R2VuZXJhdGVkIGJ5IEljb01vb248L21ldGFkYXRhPg0KPGRlZnM+DQo8Zm9udCBpZD0ibWZ1bnNQbGF5ZXJJY29uIiBob3Jpei1hZHYteD0iMTAyNCI+DQo8Zm9udC1mYWNlIHVuaXRzLXBlci1lbT0iMTAyNCIgYXNjZW50PSI5NjAiIGRlc2NlbnQ9Ii02NCIgLz4NCjxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeDIwOyIgaG9yaXotYWR2LXg9IjUxMiIgZD0iIiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MDA7IiBnbHlwaC1uYW1lPSJwbGF5IiBkPSJNMjEzLjM5OCA4NjAuMjM1Yy0wLjAwNCAwLTAuMDA4IDAtMC4wMTMgMC0yMy41OTMgMC00Mi43MTktMTkuMTI2LTQyLjcxOS00Mi43MTkgMC0wLjAwNCAwLTAuMDA4IDAtMC4wMTJ2MC4wMDEtNzM5LjAwOWMwLTAuMDQ1IDAtMC4wOTggMC0wLjE1MSAwLTIzLjUxNiAxOS4wNjQtNDIuNTggNDIuNTgtNDIuNTggNy44OTIgMCAxNS4yODIgMi4xNDcgMjEuNjE5IDUuODg5bC0wLjE5OC0wLjEwOCA2NDAgMzY5LjUwNGMxMi44NDMgNy41MTUgMjEuMzMzIDIxLjI0MSAyMS4zMzMgMzYuOTUxcy04LjQ5IDI5LjQzNi0yMS4xMzIgMzYuODQybC0wLjIwMSAwLjEwOS02NDAgMzY5LjUwNGMtNi4wOTIgMy42MTktMTMuNDI4IDUuNzY0LTIxLjI2NCA1Ljc4aC0wLjAwNXoiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMTsiIGdseXBoLW5hbWU9InBhdXNlIiBkPSJNNzI1LjMzMyA4NTMuMzMzaDg1LjMzM2MyMy41NjQgMCA0Mi42NjctMTkuMTAzIDQyLjY2Ny00Mi42Njd2LTcyNS4zMzNjMC0yMy41NjQtMTkuMTAzLTQyLjY2Ny00Mi42NjctNDIuNjY3aC04NS4zMzNjLTIzLjU2NCAwLTQyLjY2NyAxOS4xMDMtNDIuNjY3IDQyLjY2N3Y3MjUuMzMzYzAgMjMuNTY0IDE5LjEwMyA0Mi42NjcgNDIuNjY3IDQyLjY2N3pNMjEzLjMzMyA4NTMuMzMzaDg1LjMzM2MyMy41NjQgMCA0Mi42NjctMTkuMTAzIDQyLjY2Ny00Mi42Njd2LTcyNS4zMzNjMC0yMy41NjQtMTkuMTAzLTQyLjY2Ny00Mi42NjctNDIuNjY3aC04NS4zMzNjLTIzLjU2NCAwLTQyLjY2NyAxOS4xMDMtNDIuNjY3IDQyLjY2N3Y3MjUuMzMzYzAgMjMuNTY0IDE5LjEwMyA0Mi42NjcgNDIuNjY3IDQyLjY2N3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMjsiIGdseXBoLW5hbWU9InByZXYiIGQ9Ik04NTMuMTMgODQ1LjQyYzAuMDUzIDAgMC4xMTYgMCAwLjE3OSAwIDIzLjU3NyAwIDQyLjY5MS0xOS4xMTMgNDIuNjkxLTQyLjY5MSAwLTAuMDIwIDAtMC4wNDAgMC0wLjA2MHYwLjAwMy03MDkuMzQ1YzAtMC4wMTYgMC0wLjAzNSAwLTAuMDU0IDAtMjMuNTc5LTE5LjExNS00Mi42OTMtNDIuNjkzLTQyLjY5My0wLjA2MiAwLTAuMTI0IDAtMC4xODYgMGgwLjAxMGMtMTAuMDYxIDAuMDE2LTE5LjI5IDMuNTY4LTI2LjUxMyA5LjQ3OWwwLjA3NS0wLjA1OS00NDMuNjY5IDM1NC42NzNjLTkuODA0IDcuODg1LTE2LjAyNSAxOS44NzktMTYuMDI1IDMzLjMyN3M2LjIyMSAyNS40NDIgMTUuOTQzIDMzLjI2MmwwLjA4MyAwLjA2NCA0NDMuNjY5IDM1NC42NzNjNy4xNDkgNS44NTIgMTYuMzc3IDkuNDAzIDI2LjQzNSA5LjQyaDAuMDA0ek0xNzAuNjY2IDgzMmg4NS4zMzNjMjMuNTY0IDAgNDIuNjY3LTE5LjEwMyA0Mi42NjctNDIuNjY3di02ODIuNjY2YzAtMjMuNTY0LTE5LjEwMy00Mi42NjctNDIuNjY3LTQyLjY2N2gtODUuMzMzYy0yMy41NjQgMC00Mi42NjcgMTkuMTAzLTQyLjY2NyA0Mi42Njd2NjgyLjY2NmMwIDIzLjU2NCAxOS4xMDMgNDIuNjY3IDQyLjY2NyA0Mi42Njd6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJuZXh0IiBkPSJNMTcwLjg3IDg0NS40MmMtMC4wNTMgMC0wLjExNiAwLTAuMTc5IDAtMjMuNTc3IDAtNDIuNjkxLTE5LjExMy00Mi42OTEtNDIuNjkxIDAtMC4wMjAgMC0wLjA0MCAwLTAuMDYwdjAuMDAzLTcwOS4zNDVjMC0wLjAxNiAwLTAuMDM1IDAtMC4wNTQgMC0yMy41NzkgMTkuMTE1LTQyLjY5MyA0Mi42OTMtNDIuNjkzIDAuMDYyIDAgMC4xMjQgMCAwLjE4NiAwaC0wLjAxMGMxMC4wNjEgMC4wMTYgMTkuMjkgMy41NjggMjYuNTEzIDkuNDc5bC0wLjA3NS0wLjA1OSA0NDMuNjY5IDM1NC42NzNjOS44MDQgNy44ODUgMTYuMDI1IDE5Ljg3OSAxNi4wMjUgMzMuMzI3cy02LjIyMSAyNS40NDItMTUuOTQzIDMzLjI2MmwtMC4wODMgMC4wNjQtNDQzLjY2OSAzNTQuNjczYy03LjE0OSA1Ljg1Mi0xNi4zNzcgOS40MDMtMjYuNDM1IDkuNDJoLTAuMDA0ek03NjggODMyaDg1LjMzM2MyMy41NjQgMCA0Mi42NjctMTkuMTAzIDQyLjY2Ny00Mi42Njd2LTY4Mi42NjdjMC0yMy41NjQtMTkuMTAzLTQyLjY2Ny00Mi42NjctNDIuNjY3aC04NS4zMzNjLTIzLjU2NCAwLTQyLjY2NyAxOS4xMDMtNDIuNjY3IDQyLjY2N3Y2ODIuNjY3YzAgMjMuNTY0IDE5LjEwMyA0Mi42NjcgNDIuNjY3IDQyLjY2N3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkwNDsiIGdseXBoLW5hbWU9InJlcGVhdCIgZD0iTTIxMy4zMzMgNzA0aDU5Ny4zMzN2LTIzOC4zMjVsLTQyLjY2NyA0Mi42NjctNjAuMzQyLTYwLjM0MiAxNDUuNjc1LTE0NS42NzUgMTQ1LjY3NSAxNDUuNjc1LTYwLjM0MiA2MC4zNDItNDIuNjY3LTQyLjY2N3YyODAuOTkyYzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3YwaC02ODIuNjY3Yy0yMy41NjQgMC00Mi42NjctMTkuMTAzLTQyLjY2Ny00Mi42Njd2MC04NS4zMzNoODUuMzMzek04MTAuNjY3IDE5MmgtNTk3LjMzM3YyMzguMzI1bDQyLjY2Ny00Mi42NjcgNjAuMzQyIDYwLjM0Mi0xNDUuNjc1IDE0NS42NzUtMTQ1LjY3NS0xNDUuNjc1IDYwLjM0Mi02MC4zNDIgNDIuNjY3IDQyLjY2N3YtMjgwLjk5MmMwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGg2ODIuNjY3YzIzLjU2NCAwIDQyLjY2NyAxOS4xMDMgNDIuNjY3IDQyLjY2N3YwIDg1LjMzM2gtODUuMzMzeiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTA1OyIgZ2x5cGgtbmFtZT0icmVwZWF0LW9mZiIgZD0iTTkzOC42NjcgNTA4LjM0MmwtNDIuNjY3LTQyLjY2N3YyODAuOTkyYzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3YwaC00NjkuMzMzdi04NS4zMzNoNDI2LjY2N3YtMjM4LjMyNWwtNDIuNjY3IDQyLjY2Ny02MC4zNDItNjAuMzQyIDE0NS42NzUtMTQ1LjY3NSAxNDUuNjc1IDE0NS42NzV6TTIxMy4zMzMgMTkydjIzOC4zMjVsNDIuNjY3LTQyLjY2NyA2MC4zNDIgNjAuMzQyLTE0NS42NzUgMTQ1LjY3NS0xNDUuNjc1LTE0NS42NzUgNjAuMzQyLTYwLjM0MiA0Mi42NjcgNDIuNjY3di0yODAuOTkyYzAtMjMuNTY0IDE5LjEwMy00Mi42NjcgNDIuNjY3LTQyLjY2N3YwaDQ2OS4zMzN2ODUuMzMzek0xNDAuNDk2IDc1OS4xNjJsNjAuMzM3IDYwLjMzOCA2ODIuNjcxLTY4Mi42NjItNjAuMzM3LTYwLjMzOC02ODIuNjcxIDY4Mi42NjJ6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MGM7IiBnbHlwaC1uYW1lPSJ2b2x1bWUtb2ZmIiBkPSJNMjg1Ljc4MSA2NjEuMzMzaC0yMDAuNDQ4Yy0yMy41NjEtMC4wMDktNDIuNjU4LTE5LjEwNi00Mi42NjctNDIuNjY2di0zNDEuMzM0YzAuMDA5LTIzLjU2MSAxOS4xMDYtNDIuNjU4IDQyLjY2Ni00Mi42NjdoMjAwLjQ0OWwzMTEuNTUyLTIwNy43MDF2ODQyLjA2OXpNNTEyIDE4Ni4zNjhsLTIwMC40NDggMTMzLjYzMmgtMTgzLjU1MnYyNTZoMTgzLjU1MmwyMDAuNDQ4IDEzMy42MzJ6TTk2OC44MzIgNTQ1LjgyNmwtNjAuMzMxIDYwLjM0OC05Ny44MzUtOTcuODM1LTk3LjgzNSA5Ny44MzUtNjAuMzMxLTYwLjM0OCA5Ny44MjYtOTcuODI2LTk3LjgyNi05Ny44MzUgNjAuMzMxLTYwLjMzMSA5Ny44MzUgOTcuODM1IDk3LjgzNS05Ny44MzUgNjAuMzMxIDYwLjMzMS05Ny44MjYgOTcuODM1IDk3LjgyNiA5Ny44MjZ6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MGY7IiBnbHlwaC1uYW1lPSJ2b2x1bWUiIGQ9Ik0yODUuNzgxIDY2MS4zMzNoLTIwMC40NDhjLTIzLjU2MS0wLjAwOS00Mi42NTgtMTkuMTA2LTQyLjY2Ny00Mi42NjZ2LTM0MS4zMzRjMC4wMDktMjMuNTYxIDE5LjEwNi00Mi42NTggNDIuNjY2LTQyLjY2N2gyMDAuNDQ5bDMxMS41NTItMjA3LjcwMXY4NDIuMDY5ek01MTIgMTg2LjM2OGwtMjAwLjQ0OCAxMzMuNjMyaC0xODMuNTUydjI1NmgxODMuNTUybDIwMC40NDggMTMzLjYzMnpNNzI1LjMzMyA0NDhjMC0wLjA0MCAwLTAuMDg3IDAtMC4xMzQgMC01OC44NTktMjMuOTExLTExMi4xMzMtNjIuNTQ5LTE1MC42MzlsLTAuMDA2LTAuMDA2IDYwLjQxLTYwLjQxYzU0LjA0OCA1NC4wNDggODcuNDc4IDEyOC43MTUgODcuNDc4IDIxMS4xODlzLTMzLjQyOSAxNTcuMTQxLTg3LjQ3OCAyMTEuMTg5djBsLTYwLjQxLTYwLjQxYzM4LjY0NC0zOC41MTIgNjIuNTU1LTkxLjc4NiA2Mi41NTUtMTUwLjY0NSAwLTAuMDQ3IDAtMC4wOTQgMC0wLjE0MXYwLjAwN3pNODk2IDQ0OGMwLTAuMDcxIDAtMC4xNTYgMC0wLjI0MSAwLTEwNS45NDYtNDMuMDM5LTIwMS44MzktMTEyLjU4OC0yNzEuMTVsLTAuMDExLTAuMDExIDYwLjQ2Ny02MC40NjdjODQuOTMzIDg0LjkzMyAxMzcuNDY1IDIwMi4yNjYgMTM3LjQ2NSAzMzEuODY5cy01Mi41MzIgMjQ2LjkzNi0xMzcuNDY1IDMzMS44Njl2MGwtNjAuNDY3LTYwLjQ2N2M2OS41NTktNjkuMzIxIDExMi41OTgtMTY1LjIxNSAxMTIuNTk4LTI3MS4xNiAwLTAuMDg1IDAtMC4xNyAwLTAuMjU0djAuMDEzeiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTEwOyIgZ2x5cGgtbmFtZT0id2lkZXNjcmVlbiIgZD0iTTg1My4zMzMgNzQ2LjY2N3YtNTk3LjMzM2gtNjgyLjY2N3Y1OTcuMzMzaDY4Mi42Njd6TTg5NiA4MzJoLTc2OGMtMjMuNTY0IDAtNDIuNjY3LTE5LjEwMy00Mi42NjctNDIuNjY3djAtNjgyLjY2N2MwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGg3NjhjMjMuNTY0IDAgNDIuNjY3IDE5LjEwMyA0Mi42NjcgNDIuNjY3djAgNjgyLjY2N2MwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMzg0IDMwMi4zMjdsLTE0NS42NzMgMTQ1LjY3MyAxNDUuNjczIDE0NS42NzMgNjAuMzM5LTYwLjMzOS04NS4zMzMtODUuMzMzIDg1LjMzMy04NS4zMzMtNjAuMzM5LTYwLjMzOXpNNjQwIDMwMi4zMjdsLTYwLjMzOSA2MC4zMzkgODUuMzMzIDg1LjMzMy04NS4zMzMgODUuMzMzIDYwLjMzOSA2MC4zMzkgMTQ1LjY3My0xNDUuNjczLTE0NS42NzMtMTQ1LjY3M3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxMTsiIGdseXBoLW5hbWU9IndpZGVzY3JlZW4tZXhpdCIgZD0iTTg1My4zMzMgNzQ2LjY2N3YtNTk3LjMzM2gtNjgyLjY2N3Y1OTcuMzMzaDY4Mi42Njd6TTg5NiA4MzJoLTc2OGMtMjMuNTY0IDAtNDIuNjY3LTE5LjEwMy00Mi42NjctNDIuNjY3djAtNjgyLjY2N2MwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGg3NjhjMjMuNTY0IDAgNDIuNjY3IDE5LjEwMyA0Mi42NjcgNDIuNjY3djAgNjgyLjY2N2MwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMjk4LjY2NyAzMDIuMzI3bDE0NS42NzMgMTQ1LjY3My0xNDUuNjczIDE0NS42NzMtNjAuMzM5LTYwLjMzOSA4NS4zMzMtODUuMzMzLTg1LjMzMy04NS4zMzMgNjAuMzM5LTYwLjMzOXpNNzI1LjMzMyAzMDIuMzI3bDYwLjMzOSA2MC4zMzktODUuMzMzIDg1LjMzMyA4NS4zMzMgODUuMzMzLTYwLjMzOSA2MC4zMzktMTQ1LjY3My0xNDUuNjczIDE0NS42NzMtMTQ1LjY3M3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxMjsiIGdseXBoLW5hbWU9IndlYi1mdWxsc2NyZWVuIiBkPSJNODUzLjMzMyA3NDYuNjY3di01OTcuMzMzaC02ODIuNjY3djU5Ny4zMzNoNjgyLjY2N3pNODk2IDgzMmgtNzY4Yy0yMy41NjQgMC00Mi42NjctMTkuMTAzLTQyLjY2Ny00Mi42Njd2MC02ODIuNjY3YzAtMjMuNTY0IDE5LjEwMy00Mi42NjcgNDIuNjY3LTQyLjY2N3YwaDc2OGMyMy41NjQgMCA0Mi42NjcgMTkuMTAzIDQyLjY2NyA0Mi42Njd2MCA2ODIuNjY3YzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3Ywek0zNDEuMzMzIDQ0OHYxMjhoMTI4djg1LjMzM2gtMjEzLjMzM3YtMjEzLjMzM2g4NS4zMzN6TTY4Mi42NjcgNDQ4di0xMjhoLTEyOHYtODUuMzMzaDIxMy4zMzN2MjEzLjMzM2gtODUuMzMzeiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTEzOyIgZ2x5cGgtbmFtZT0id2ViLWZ1bGxzY3JlZW4tZXhpdCIgZD0iTTg1My4zMzMgNzQ2LjY2N3YtNTk3LjMzM2gtNjgyLjY2N3Y1OTcuMzMzaDY4Mi42Njd6TTg5NiA4MzJoLTc2OGMtMjMuNTY0IDAtNDIuNjY3LTE5LjEwMy00Mi42NjctNDIuNjY3djAtNjgyLjY2N2MwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGg3NjhjMjMuNTY0IDAgNDIuNjY3IDE5LjEwMyA0Mi42NjcgNDIuNjY3djAgNjgyLjY2N2MwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMzg0IDY2MS4zMzN2LTg1LjMzM2gtMTI4di04NS4zMzNoMjEzLjMzM3YxNzAuNjY3aC04NS4zMzN6TTY0MCAyMzQuNjY3djg1LjMzM2gxMjh2ODUuMzMzaC0yMTMuMzMzdi0xNzAuNjY3aDg1LjMzM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxNDsiIGdseXBoLW5hbWU9InBpY3R1cmUtaW4tcGljdHVyZSIgZD0iTTQyNi42NjcgMTQ5LjMzM2gtMjU2djU5Ny4zMzNoNjgyLjY2N3YtMjU2aDg1LjMzM3YyOTguNjY3YzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3YwaC03NjhjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTY4Mi42NjdjMC0yMy41NjQgMTkuMTAzLTQyLjY2NyA0Mi42NjctNDIuNjY3djBoMjk4LjY2N3pNODUzLjMzMyAzMjB2LTE3MC42NjdoLTI1NnYxNzAuNjY3aDI1NnpNODk2IDQwNS4zMzNoLTM0MS4zMzNjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTI1NmMwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGgzNDEuMzMzYzIzLjU2NCAwIDQyLjY2NyAxOS4xMDMgNDIuNjY3IDQyLjY2N3YwIDI1NmMwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMzg0IDY2MS4zMzN2LTY3LjY2MWwtOTcuODI2IDk3LjgzNS02MC4zNDgtNjAuMzQ4IDk3LjgzNS05Ny44MjZoLTY3LjY2MXYtODUuMzMzaDIxMy4zMzN2MjEzLjMzM2gtODUuMzMzeiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTE1OyIgZ2x5cGgtbmFtZT0icGljdHVyZS1pbi1waWN0dXJlLWV4aXQiIGQ9Ik00MjYuNjY3IDE0OS4zMzNoLTI1NnY1OTcuMzMzaDY4Mi42Njd2LTI1Nmg4NS4zMzN2Mjk4LjY2N2MwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MGgtNzY4Yy0yMy41NjQgMC00Mi42NjctMTkuMTAzLTQyLjY2Ny00Mi42Njd2MC02ODIuNjY3YzAtMjMuNTY0IDE5LjEwMy00Mi42NjcgNDIuNjY3LTQyLjY2N3YwaDI5OC42Njd6TTg1My4zMzMgMzIwdi0xNzAuNjY3aC0yNTZ2MTcwLjY2N2gyNTZ6TTg5NiA0MDUuMzMzaC0zNDEuMzMzYy0yMy41NjQgMC00Mi42NjctMTkuMTAzLTQyLjY2Ny00Mi42Njd2MC0yNTZjMC0yMy41NjQgMTkuMTAzLTQyLjY2NyA0Mi42NjctNDIuNjY3djBoMzQxLjMzM2MyMy41NjQgMCA0Mi42NjcgMTkuMTAzIDQyLjY2NyA0Mi42Njd2MCAyNTZjMCAyMy41NjQtMTkuMTAzIDQyLjY2Ny00Mi42NjcgNDIuNjY3djB6TTM0MS4zMzMgNDQ4djY3LjY2MWw5Ny44MjYtOTcuODM1IDYwLjM0OCA2MC4zNDgtOTcuODM1IDk3LjgyNmg2Ny42NjF2ODUuMzMzaC0yMTMuMzMzdi0yMTMuMzMzaDg1LjMzM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxZTsiIGdseXBoLW5hbWU9ImZ1bGxzY3JlZW4iIGQ9Ik0xNzAuNjY3IDU3NnYxNzAuNjY3aDE3MC42Njd2ODUuMzMzaC0yNTZ2LTI1Nmg4NS4zMzN6TTY4Mi42NjcgNzQ2LjY2N2gxNzAuNjY3di0xNzAuNjY3aDg1LjMzM3YyNTZoLTI1NnYtODUuMzMzek0zNDEuMzMzIDE0OS4zMzNoLTE3MC42Njd2MTcwLjY2N2gtODUuMzMzdi0yNTZoMjU2djg1LjMzM3pNODUzLjMzMyAzMjB2LTE3MC42NjdoLTE3MC42Njd2LTg1LjMzM2gyNTZ2MjU2aC04NS4zMzN6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MWY7IiBnbHlwaC1uYW1lPSJmdWxsc2NyZWVuLWV4aXQiIGQ9Ik0yNTYgODMydi0xNzAuNjY3aC0xNzAuNjY3di04NS4zMzNoMjU2djI1NmgtODUuMzMzek05MzguNjY3IDY2MS4zMzNoLTE3MC42Njd2MTcwLjY2N2gtODUuMzMzdi0yNTZoMjU2djg1LjMzM3pNODUuMzMzIDIzNC42NjdoMTcwLjY2N3YtMTcwLjY2N2g4NS4zMzN2MjU2aC0yNTZ2LTg1LjMzM3pNNzY4IDY0djE3MC42NjdoMTcwLjY2N3Y4NS4zMzNoLTI1NnYtMjU2aDg1LjMzM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkyMDsiIGdseXBoLW5hbWU9ImRhbm1ha3UiIGQ9Ik04OTYgODMyaC03NjhjLTIzLjU2MS0wLjAwOS00Mi42NTgtMTkuMTA2LTQyLjY2Ny00Mi42NjZ2LTc4OS4zMzRsMTg2LjcwOSAxNDkuMzMzaDYyMy45NTdjMjMuNTYxIDAuMDA5IDQyLjY1OCAxOS4xMDYgNDIuNjY3IDQyLjY2NnY1OTcuMzM0Yy0wLjAwOSAyMy41NjEtMTkuMTA2IDQyLjY1OC00Mi42NjYgNDIuNjY3aC0wLjAwMXpNODUzLjMzMyAyMzQuNjY3aC02MTEuMzI4bC03MS4zMzktNTcuMDg4djU2OS4wODhoNjgyLjY2N3pNMjU2IDY2MS4zMzNoMTI4di04NS4zMzNoLTEyOHY4NS4zMzN6TTQ2OS4zMzMgNjYxLjMzM2gyMTMuMzMzdi04NS4zMzNoLTIxMy4zMzN2ODUuMzMzek0yNTYgNDkwLjY2N2gyNTZ2LTg1LjMzM2gtMjU2djg1LjMzM3pNNTk3LjMzMyA0OTAuNjY3aDE3MC42Njd2LTg1LjMzM2gtMTcwLjY2N3Y4NS4zMzN6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MjE7IiBnbHlwaC1uYW1lPSJkYW5tYWt1LW9mZiIgZD0iTTUxMiAyMzQuNjY3aC0yNjkuOTk1bC03MS4zMzktNTcuMDg4djU2OS4wODhoNjgyLjY2N3YtMjU2aDg1LjMzM3YyOTguNjY3Yy0wLjAwOSAyMy41NjEtMTkuMTA2IDQyLjY1OC00Mi42NjYgNDIuNjY3aC03NjguMDAxYy0yMy41NjEtMC4wMDktNDIuNjU4LTE5LjEwNi00Mi42NjctNDIuNjY2di03ODkuMzM0bDE4Ni43MDkgMTQ5LjMzM2gyMzkuOTU3ek03NjggNDQ4Yy0xMTcuODIxIDAtMjEzLjMzMy05NS41MTMtMjEzLjMzMy0yMTMuMzMzczk1LjUxMy0yMTMuMzMzIDIxMy4zMzMtMjEzLjMzM2MxMTcuODIxIDAgMjEzLjMzMyA5NS41MTMgMjEzLjMzMyAyMTMuMzMzdjBjMCAxMTcuODIxLTk1LjUxMyAyMTMuMzMzLTIxMy4zMzMgMjEzLjMzM3Ywek04OTYgMjM0LjY2N2MtMC4wMjMtMjAuMDI1LTQuNjc3LTM4Ljk1Ny0xMi45NDgtNTUuNzkxbDAuMzMyIDAuNzQ3LTE3MC40MjggMTcwLjQyOGMxNi4xOCA3Ljk2IDM1LjIxOSAxMi42MTYgNTUuMzQ1IDEyLjYxNiA3MC41MjcgMCAxMjcuNy01Ny4xNzMgMTI3LjctMTI3LjcgMC0wLjEwNiAwLTAuMjExIDAtMC4zMTd2MC4wMTZ6TTY0MCAyMzQuNjY3YzAuMDIzIDIwLjAyNSA0LjY3NyAzOC45NTcgMTIuOTQ4IDU1Ljc5MWwtMC4zMzItMC43NDcgMTcwLjQyOC0xNzAuNDI4Yy0xNi4xOC03Ljk2MS0zNS4yMTktMTIuNjE3LTU1LjM0Ni0xMi42MTctNzAuNTI2IDAtMTI3LjY5OCA1Ny4xNzItMTI3LjY5OCAxMjcuNjk4IDAgMC4xMDYgMCAwLjIxMiAwIDAuMzE5di0wLjAxNnpNMjU2IDY2MS4zMzNoMTI4di04NS4zMzNoLTEyOHY4NS4zMzN6TTQ2OS4zMzMgNjYxLjMzM2gyMTMuMzMzdi04NS4zMzNoLTIxMy4zMzN2ODUuMzMzek0yNTYgNDkwLjY2N2gyNTZ2LTg1LjMzM2gtMjU2djg1LjMzM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkyMzsiIGdseXBoLW5hbWU9ImRhbm1ha3Utc2V0dGluZ3MiIGQ9Ik01MTIgMjM0LjY2N2gtMjY5Ljk5NWwtNzEuMzM5LTU3LjA4OHY1NjkuMDg4aDY4Mi42Njd2LTI1Nmg4NS4zMzN2Mjk4LjY2N2MtMC4wMDkgMjMuNTYxLTE5LjEwNiA0Mi42NTgtNDIuNjY2IDQyLjY2N2gtNzY4LjAwMWMtMjMuNTYxLTAuMDA5LTQyLjY1OC0xOS4xMDYtNDIuNjY3LTQyLjY2NnYtNzg5LjMzNGwxODYuNzA5IDE0OS4zMzNoMjM5Ljk1N3pNOTM4LjY2NyAyMzQuNjY3Yy0wLjA0NyAxNi4yNTMtMi4zNjMgMzEuOTQ2LTYuNjQ2IDQ2LjgwNGwwLjI5Ny0xLjIwMyA0MS43NjcgMjQuMTE1LTQyLjY2NyA3My45MDEtNDEuNzAzLTI0LjA3OGMtMjEuMTI5IDIxLjQ3My00Ny44NzcgMzcuMzU1LTc3Ljg2MiA0NS4yNjdsLTEuMTg3IDAuMjY2djQ4LjI2MWgtODUuMzMzdi00OC4yNjFjLTMxLjE3Mi04LjE3OC01Ny45Mi0yNC4wNjAtNzkuMDI3LTQ1LjUxbC0wLjAyMi0wLjAyMi00MS43MDMgMjQuMDc4LTQyLjY2Ny03My45MDEgNDEuNzY4LTI0LjExNWMtNC4wMzAtMTMuNjY0LTYuMzQ5LTI5LjM2Mi02LjM0OS00NS42MDJzMi4zMTktMzEuOTM4IDYuNjQzLTQ2Ljc4MWwtMC4yOTQgMS4xOC00MS43NjgtMjQuMTE1IDQyLjY2Ny03My45MDEgNDEuNzAzIDI0LjA3OGMyMS4xMjktMjEuNDczIDQ3Ljg3Ny0zNy4zNTUgNzcuODYyLTQ1LjI2N2wxLjE4Ny0wLjI2NnYtNDguMjYxaDg1LjMzM3Y0OC4yNjFjMzEuMTcyIDguMTc3IDU3LjkyIDI0LjA2MCA3OS4wMjcgNDUuNTFsMC4wMjIgMC4wMjMgNDEuNzAzLTI0LjA3OCA0Mi42NjcgNzMuOTAxLTQxLjc2OCAyNC4xMTVjMy45ODYgMTMuNjU2IDYuMzAyIDI5LjM0OSA2LjM0OSA0NS41NzV2MC4wMjZ6TTc2OCAxNDkuMzMzYy00Ny4xMjggMC04NS4zMzMgMzguMjA1LTg1LjMzMyA4NS4zMzNzMzguMjA1IDg1LjMzMyA4NS4zMzMgODUuMzMzYzQ3LjEyOCAwIDg1LjMzMy0zOC4yMDUgODUuMzMzLTg1LjMzM3YwYy0wLjA1NS00Ny4xMDYtMzguMjI3LTg1LjI3OS04NS4zMjktODUuMzMzaC0wLjAwNXpNMjU2IDY2MS4zMzNoMTI4di04NS4zMzNoLTEyOHY4NS4zMzN6TTQ2OS4zMzMgNjYxLjMzM2gyMTMuMzMzdi04NS4zMzNoLTIxMy4zMzN2ODUuMzMzek0yNTYgNDkwLjY2N2gyNTZ2LTg1LjMzM2gtMjU2djg1LjMzM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkyODsiIGdseXBoLW5hbWU9ImFkdmFuY2VkLWRhbm1ha3UiIGQ9Ik00NjkuMzMzIDIzNC42NjdoLTIyNy4zMjhsLTcxLjMzOS01Ny4wODh2NTY5LjA4OGg2ODIuNjY3di0yNTZoODUuMzMzdjI5OC42NjdjLTAuMDA5IDIzLjU2MS0xOS4xMDYgNDIuNjU4LTQyLjY2NiA0Mi42NjdoLTc2OC4wMDFjLTIzLjU2MS0wLjAwOS00Mi42NTgtMTkuMTA2LTQyLjY2Ny00Mi42NjZ2LTc4OS4zMzRsMTg2LjcwOSAxNDkuMzMzaDE5Ny4yOTF6TTc2OCAzMjkuNzg4YzI5LjM0NS0zNC42NTcgNjAuNDYzLTY1Ljc3NiA5My45NjUtOTQuMTY2bDEuMTU2LTAuOTU1Yy0zNC42NTgtMjkuMzQ1LTY1Ljc3Ni02MC40NjMtOTQuMTY3LTkzLjk2NmwtMC45NTQtMS4xNTVjLTI5LjM0NSAzNC42NTctNjAuNDYzIDY1Ljc3Ni05My45NjUgOTQuMTY2bC0xLjE1NiAwLjk1NWMzNC42NTggMjkuMzQ2IDY1Ljc3NiA2MC40NjQgOTQuMTY3IDkzLjk2N2wwLjk1NCAxLjE1NHpNNzY4IDQ3Ni4wMjZ2MGMtNjAuNDYxLTk5LjYyNy0xNDEuNzMyLTE4MC44OTgtMjM4LjI0NS0yMzkuNmwtMy4xMTQtMS43NTljOTkuNjI3LTYwLjQ2MiAxODAuODk4LTE0MS43MzMgMjM5LjYtMjM4LjI0NWwxLjc1OS0zLjExM2M2MC40NjIgOTkuNjI3IDE0MS43MzMgMTgwLjg5OCAyMzguMjQ1IDIzOS42bDMuMTEzIDEuNzU5Yy05OS42MjcgNjAuNDYyLTE4MC44OTggMTQxLjczMy0yMzkuNiAyMzguMjQ1bC0xLjc1OSAzLjExM3pNNzY4LTYuNjkydjB6TTI1NiA2NjEuMzMzaDEyOHYtODUuMzMzaC0xMjh2ODUuMzMzek00NjkuMzMzIDY2MS4zMzNoMjEzLjMzM3YtODUuMzMzaC0yMTMuMzMzdjg1LjMzM3pNMjU2IDQ5MC42NjdoMjU2di04NS4zMzNoLTI1NnY4NS4zMzN6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MmE7IiBnbHlwaC1uYW1lPSJ0ZXh0IiBkPSJNMTcwLjY2NyAxNDkuMzMzaDY4Mi42Njd2LTg1LjMzM2gtNjgyLjY2N3Y4NS4zMzN6TTc3Mi41MDggMTk0LjI1bDc2LjMxNyAzOC4xNjctMjk4LjY2NyA1OTcuMzI5aC03Ni4zMjFsLTI5OC42NjctNTk3LjMyOSA3Ni4zMjUtMzguMTY3IDczLjU0MSAxNDcuMDgzaDM3My45Mjl6TTM2Ny43MDMgNDI2LjY2N2wxNDQuMjk3IDI4OC41OTYgMTQ0LjI5OS0yODguNTk2eiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTJmOyIgZ2x5cGgtbmFtZT0ic2VuZC1kYW5tYWt1IiBkPSJNOTA0Ljg4IDQ2Ni42NzJsLTc0NS4yMjggNDExLjgzN2MtMi45ODUgMS42OTQtNi41NTcgMi42OTItMTAuMzYzIDIuNjkyLTExLjc1OCAwLTIxLjI4OS05LjUzMi0yMS4yODktMjEuMjg5IDAtMC4wMjYgMC0wLjA1MyAwLTAuMDc5djAuMDA0LTgyMy42NzNjMC0wLjAyMiAwLTAuMDQ4IDAtMC4wNzQgMC0xMS43NTggOS41MzItMjEuMjg5IDIxLjI4OS0yMS4yODkgMy44MDUgMCA3LjM3NyAwLjk5OCAxMC40NjkgMi43NDhsLTAuMTA2LTAuMDU1IDc0NS4yMjggNDExLjgzNmM2LjYxNyAzLjcwOCAxMS4wMTUgMTAuNjc2IDExLjAxNSAxOC42NzJzLTQuMzk4IDE0Ljk2My0xMC45MDcgMTguNjE2bC0wLjEwNyAwLjA1NXpNMjEzLjMzMyAxNDQuNjU1djI2MC42NzhoMjU2djg1LjMzM2gtMjU2djI2MC42NzlsNTQ4LjkxLTMwMy4zNDV6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MzA7IiBnbHlwaC1uYW1lPSJzZXR0aW5ncyIgZD0iTTQwNS4xNjMgODYxLjA5OWMwLjExLTEuOTg5IDAuMTczLTQuMzE3IDAuMTczLTYuNjU5IDAtNzAuNjg1LTU3LjMwMi0xMjcuOTg3LTEyNy45ODctMTI3Ljk4Ny0yNS44NTggMC00OS45MjQgNy42NjgtNzAuMDUwIDIwLjg1NGwwLjQ4Ny0wLjNjLTQ5LjM5Ny01MC4wNjMtODYuNDg2LTExMi4zOTQtMTA2LjI3OS0xODIuMDA1bC0wLjcyOS0yLjk5N2M0MS44MDYtMjEuNjIgNjkuODg4LTY0LjUzMyA2OS44ODgtMTE0LjAwNXMtMjguMDgyLTkyLjM4Ni02OS4xNzUtMTEzLjY3bC0wLjcxMy0wLjMzNmMyMC41MjItNzIuNjA5IDU3LjYxMS0xMzQuOTQgMTA3LjA1NC0xODUuMDUwbC0wLjA0NiAwLjA0N2MxOS42MzkgMTIuODg3IDQzLjcwNSAyMC41NTUgNjkuNTYzIDIwLjU1NSA3MC42ODUgMCAxMjcuOTg3LTU3LjMwMiAxMjcuOTg3LTEyNy45ODcgMC0yLjM0Mi0wLjA2My00LjY3LTAuMTg3LTYuOTgxbDAuMDE0IDAuMzIyYzMyLjA2MS04LjYxOCA2OC44NzEtMTMuNTY4IDEwNi44MzctMTMuNTY4czc0Ljc3NiA0Ljk1IDEwOS44MTkgMTQuMjRsLTIuOTgyLTAuNjcyYy0wLjExIDEuOTg5LTAuMTczIDQuMzE2LTAuMTczIDYuNjU4IDAgNzAuNjg1IDU3LjMwMiAxMjcuOTg3IDEyNy45ODcgMTI3Ljk4NyAyNS44NTggMCA0OS45MjQtNy42NjggNzAuMDUwLTIwLjg1NGwtMC40ODcgMC4zYzQ5LjM5NyA1MC4wNjQgODYuNDg1IDExMi4zOTQgMTA2LjI3OSAxODIuMDA2bDAuNzI5IDIuOTk3Yy00MS44MDYgMjEuNjItNjkuODg4IDY0LjUzMy02OS44ODggMTE0LjAwNXMyOC4wODIgOTIuMzg2IDY5LjE3NSAxMTMuNjdsMC43MTMgMC4zMzZjLTIwLjUyMyA3Mi42MDktNTcuNjExIDEzNC45NC0xMDcuMDU0IDE4NS4wNTBsMC4wNDYtMC4wNDdjLTE5LjYzOC0xMi44ODYtNDMuNzA1LTIwLjU1NC02OS41NjItMjAuNTU0LTcwLjY4NSAwLTEyNy45ODcgNTcuMzAyLTEyNy45ODcgMTI3Ljk4NyAwIDIuMzQyIDAuMDYzIDQuNjY5IDAuMTg3IDYuOThsLTAuMDE0LTAuMzIyYy0zMi4wNjEgOC42MTgtNjguODcxIDEzLjU2OC0xMDYuODM3IDEzLjU2OHMtNzQuNzc2LTQuOTUtMTA5LjgyLTE0LjI0MWwyLjk4MiAwLjY3MnpNNTQ0IDc4Ny43OTdjMjguODYtODUuODgzIDEwOC42My0xNDYuNjUxIDIwMi41OTItMTQ2LjY1MSAxNS40MDYgMCAzMC40MyAxLjYzNCA0NC45MDkgNC43MzdsLTEuNC0wLjI1MWMxMS42MzYtMTYuMDIzIDIyLjM2OC0zNC4yMjQgMzEuMzE2LTUzLjQyNWwwLjg1NS0yLjA0MmMtMzMuNjgtMzcuNTYtNTQuMjcyLTg3LjQ1OC01NC4yNzItMTQyLjE2NXMyMC41OTItMTA0LjYwNiA1NC40NDktMTQyLjM2NmwtMC4xNzcgMC4yYy05LjgwMy0yMS4yNDItMjAuNTM1LTM5LjQ0NC0zMi44MzctNTYuNDM0bDAuNjY3IDAuOTY3Yy0xMy4wNzkgMi44NTItMjguMTAzIDQuNDg1LTQzLjUwOSA0LjQ4NS05My45NjMgMC0xNzMuNzMyLTYwLjc2OC0yMDIuMTUzLTE0NS4xNDdsLTAuNDM5LTEuNTA0Yy0xMC40OTYtMS4wMjQtMjEuMjQ4LTEuNTM2LTMyLTEuNTM2cy0yMS41MDQgMC41MTItMzIgMS41MzZjLTI4Ljg2IDg1Ljg4My0xMDguNjMgMTQ2LjY1MS0yMDIuNTkyIDE0Ni42NTEtMTUuNDA2IDAtMzAuNDMtMS42MzQtNDQuOTA5LTQuNzM3bDEuNCAwLjI1MWMtMTEuNjM2IDE2LjAyMy0yMi4zNjggMzQuMjI0LTMxLjMxNiA1My40MjVsLTAuODU1IDIuMDQyYzMzLjY4IDM3LjU2IDU0LjI3MiA4Ny40NTggNTQuMjcyIDE0Mi4xNjVzLTIwLjU5MiAxMDQuNjA2LTU0LjQ0OSAxNDIuMzY2bDAuMTc3LTAuMmM5LjgwMyAyMS4yNDIgMjAuNTM1IDM5LjQ0NCAzMi44MzcgNTYuNDM0bC0wLjY2Ny0wLjk2N2MxMy4wNzktMi44NTIgMjguMTAzLTQuNDg1IDQzLjUwOS00LjQ4NSA5My45NjMgMCAxNzMuNzMyIDYwLjc2OCAyMDIuMTUzIDE0NS4xNDdsMC40NCAxLjUwNGMxMC40OTYgMS4wMjQgMjEuMjQ4IDEuNTM2IDMyIDEuNTM2czIxLjUwNC0wLjUxMiAzMi0xLjUzNnpNNTEyIDUzMy4zMzNjNDcuMTI4IDAgODUuMzMzLTM4LjIwNSA4NS4zMzMtODUuMzMzcy0zOC4yMDUtODUuMzMzLTg1LjMzMy04NS4zMzNjLTQ3LjEyOCAwLTg1LjMzMyAzOC4yMDUtODUuMzMzIDg1LjMzM3YwYzAuMDU1IDQ3LjEwNiAzOC4yMjcgODUuMjc4IDg1LjMyOCA4NS4zMzNoMC4wMDV6TTUxMiA2MTguNjY3Yy05NC4yNTcgMC0xNzAuNjY3LTc2LjQxLTE3MC42NjctMTcwLjY2N3M3Ni40MS0xNzAuNjY3IDE3MC42NjctMTcwLjY2N2M5NC4yNTcgMCAxNzAuNjY3IDc2LjQxIDE3MC42NjcgMTcwLjY2N3YwYzAgOTQuMjU3LTc2LjQxIDE3MC42NjctMTcwLjY2NyAxNzAuNjY3djB6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MzE7IiBnbHlwaC1uYW1lPSJjYXB0aW9uIiBkPSJNODUzLjMzMyA3NDYuNjY3di01OTcuMzMzaC02ODIuNjY3djU5Ny4zMzNoNjgyLjY2N3pNODk2IDgzMmgtNzY4Yy0yMy41NjQgMC00Mi42NjctMTkuMTAzLTQyLjY2Ny00Mi42Njd2MC02ODIuNjY3YzAtMjMuNTY0IDE5LjEwMy00Mi42NjcgNDIuNjY3LTQyLjY2N3YwaDc2OGMyMy41NjQgMCA0Mi42NjcgMTkuMTAzIDQyLjY2NyA0Mi42Njd2MCA2ODIuNjY3YzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3Ywek0zODQgMzYyLjY2N2MtMC4wMTcgMC0wLjAzNyAwLTAuMDU3IDAtNDcuMTI4IDAtODUuMzMzIDM4LjIwNS04NS4zMzMgODUuMzMzczM4LjIwNSA4NS4zMzMgODUuMzMzIDg1LjMzM2MyMy41NzggMCA0NC45MjMtOS41NjMgNjAuMzY3LTI1LjAyMWwwLjAwMS0wLjAwMSA2MC4zNjggNjAuMzY4Yy0zMC44ODUgMzAuODg1LTczLjU1MSA0OS45ODctMTIwLjY3OSA0OS45ODctOTQuMjU3IDAtMTcwLjY2Ny03Ni40MS0xNzAuNjY3LTE3MC42NjdzNzYuNDEtMTcwLjY2NyAxNzAuNjY3LTE3MC42NjdjNDcuMTI4IDAgODkuNzk1IDE5LjEwMyAxMjAuNjggNDkuOTg3djBsLTYwLjM2OCA2MC4zNjhjLTE1LjQwNS0xNS40NTgtMzYuNzE1LTI1LjAyMi02MC4yNTgtMjUuMDIyLTAuMDE5IDAtMC4wMzcgMC0wLjA1NiAwaDAuMDAzek02ODIuNjY3IDM2Mi42NjdjLTAuMDE3IDAtMC4wMzcgMC0wLjA1NyAwLTQ3LjEyOCAwLTg1LjMzMyAzOC4yMDUtODUuMzMzIDg1LjMzM3MzOC4yMDUgODUuMzMzIDg1LjMzMyA4NS4zMzNjMjMuNTc4IDAgNDQuOTIzLTkuNTYzIDYwLjM2Ny0yNS4wMjFsMC4wMDEtMC4wMDEgNjAuMzY4IDYwLjM2OGMtMzAuODg1IDMwLjg4NS03My41NTEgNDkuOTg3LTEyMC42NzkgNDkuOTg3LTk0LjI1NyAwLTE3MC42NjctNzYuNDEtMTcwLjY2Ny0xNzAuNjY3czc2LjQxLTE3MC42NjcgMTcwLjY2Ny0xNzAuNjY3YzQ3LjEyOCAwIDg5Ljc5NSAxOS4xMDMgMTIwLjY4IDQ5Ljk4N3YwbC02MC4zNjggNjAuMzY4Yy0xNS40MDUtMTUuNDU4LTM2LjcxNS0yNS4wMjItNjAuMjU4LTI1LjAyMi0wLjAxOSAwLTAuMDM3IDAtMC4wNTYgMGgwLjAwM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTk0MDsiIGdseXBoLW5hbWU9ImxlZnQtYXJyb3ciIGQ9Ik01MTIgODkyLjMzOWw2MC4zMzktNjAuMzM5LTM0MS4zMzMtMzQxLjMzM2g3MDcuNjYxdi04NS4zMzNoLTcwNy42NjFsMzQxLjMzMy0zNDEuMzMzLTYwLjMzOS02MC4zMzktNDQ0LjMzOSA0NDQuMzM5IDQ0NC4zMzkgNDQ0LjMzOXoiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTk0MTsiIGdseXBoLW5hbWU9InJpZ2h0LWFycm93IiBkPSJNNTEyIDg5Mi4zMzlsLTYwLjMzOS02MC4zMzkgMzQxLjMzMy0zNDEuMzMzaC03MDcuNjYxdi04NS4zMzNoNzA3LjY2MWwtMzQxLjMzMy0zNDEuMzMzIDYwLjMzOS02MC4zMzkgNDQ0LjMzOSA0NDQuMzM5LTQ0NC4zMzkgNDQ0LjMzOXoiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTk0NTsiIGdseXBoLW5hbWU9ImNsb3NlIiBkPSJNODgzLjQ5OSA3NTkuMTU5bC02MC4zMzEgNjAuMzM5LTMxMS4xNjgtMzExLjE1OS0zMTEuMTU5IDMxMS4xNTktNjAuMzM5LTYwLjMzOSAzMTEuMTU5LTMxMS4xNTktMzExLjE1OS0zMTEuMTY4IDYwLjMzOS02MC4zMzEgMzExLjE1OSAzMTEuMTU5IDMxMS4xNjgtMzExLjE1OSA2MC4zMzEgNjAuMzMxLTMxMS4xNTkgMzExLjE2OCAzMTEuMTU5IDMxMS4xNTl6IiAvPg0KPC9mb250PjwvZGVmcz48L3N2Zz4=) format("svg");font-weight:400;font-style:normal;font-display:block}[class^=mpicon-],[class*=" mpicon-"]{font-family:mfunsPlayerIcon!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mpicon-play:before{content:""}.mpicon-pause:before{content:""}.mpicon-prev:before{content:""}.mpicon-next:before{content:""}.mpicon-loop:before{content:""}.mpicon-loop-off:before{content:""}.mpicon-volume-off:before{content:""}.mpicon-volume:before{content:""}.mpicon-wide:before{content:""}.mpicon-wide-exit:before{content:""}.mpicon-webfull:before{content:""}.mpicon-webfull-exit:before{content:""}.mpicon-pip:before{content:""}.mpicon-pip-exit:before{content:""}.mpicon-fullscreen:before{content:""}.mpicon-fullscreen-exit:before{content:""}.mpicon-danmaku:before{content:""}.mpicon-danmaku-off:before{content:""}.mpicon-danmaku-settings:before{content:""}.mpicon-advanced-danmaku:before{content:""}.mpicon-text:before{content:""}.mpicon-send-danmaku:before{content:""}.mpicon-settings:before{content:""}.mpicon-caption:before{content:""}.mpicon-left-arrow:before{content:""}.mpicon-right-arrow:before{content:""}.mpicon-close:before{content:""}.mfuns-player{-webkit-user-select:none;user-select:none;width:100%;height:100%;font-size:12px;display:flex;flex-direction:column}.mfuns-player-main{position:relative;width:100%;flex-grow:1;overflow:hidden}.mfuns-player-area{position:relative;width:100%;height:100%}.mfuns-player-content{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center;background:black;box-sizing:border-box}.mfuns-player-content video{display:block;width:100%;height:100%}.mfuns-player-head-wrap{position:absolute}.mfuns-player-side-wrap,.mfuns-player-modal-wrap,.mfuns-player-contextmenu-wrap{position:absolute;width:100%;height:100%;top:0;left:0}.mfuns-player-danmaku-wrap{position:absolute;left:0;top:0;width:100%;height:100%}.mfuns-player-danmaku-wrap>div{position:absolute;left:0;top:0;width:100%;height:100%}.mfuns-player-tooltip{position:absolute;left:50%;top:-30px;transform:translate(-50%);white-space:nowrap;display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mfuns-player li{list-style:none}.mfuns-player.state-webfull{z-index:233333}.mfuns-player.state-webfull .mfuns-player-main{position:fixed;top:0;bottom:0;left:0;right:0;z-index:233333;height:100%}.mpui-input{font-family:inherit;font-size:inherit;height:20px;line-height:20px;border-radius:var(--mp-border-radius, 4px);padding:0 4px;outline:none;background-color:transparent;color:#fff;border:1px solid rgba(255,255,255,.2509803922);transition:all .2s}.mpui-input:hover{border-color:#ffffff80}.mpui-input:focus{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-button{font-family:inherit;font-size:inherit;height:22px;line-height:22px;border-radius:var(--mp-border-radius, 4px);padding:0 4px;outline:none;background-color:transparent;color:#ffffffe0;border:1px solid rgba(255,255,255,.5019607843);cursor:pointer;transition:all .2s}.mpui-button:hover{color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7)}.mpui-tooltip{position:absolute;left:50%;top:-30px;transform:translate(-50%);white-space:nowrap;display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mpui-slider{position:relative}.mpui-slider-track{width:4px;height:4px;border-radius:2px;background:rgba(255,255,255,.5019607843);margin:0 auto;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;cursor:pointer}.mpui-slider-bar{background:var(--mp-primary-color, #7b7ff7);border-radius:2px}.mpui-slider-thumb-track{position:relative;width:calc(100% - 12px);height:calc(100% - 12px)}.mpui-slider-thumb{z-index:1;width:12px;height:12px;border-radius:100%;background:var(--mp-primary-color, #7b7ff7)}.mpui-slider-divider{position:absolute;width:100%;display:flex;justify-content:space-between}.mpui-slider-divider-dot{height:4px;width:1px;background-color:#ffffffe0;transform:translateY(-50%)}.mpui-picker-item{display:inline-block;padding:0 5px;height:20px;line-height:20px;border-radius:var(--mp-border-radius, 4px);border:transparent solid 1px;transition:color .2s;cursor:pointer}.mpui-picker-item.state-checked{border:transparent solid 1px;border-color:var(--mp-primary-color, #7b7ff7);color:var(--mp-primary-color, #7b7ff7)}.mpui-picker-item:hover,.mpui-picker-item:active{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox{height:22px;cursor:pointer}.mpui-checkbox-icon{position:relative;display:inline-block;vertical-align:middle;margin:4px 0;width:13px;height:13px;border-radius:var(--mp-border-radius, 4px);border:solid;border-width:1px;border-color:#ffffff80;box-sizing:border-box;transition:all .2s}.mpui-checkbox-label{position:relative;display:inline-block;vertical-align:middle;line-height:22px;margin:0 2px;transition:all .2s}.mpui-checkbox:hover .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:hover .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:active .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:active .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox.state-checked .mpui-checkbox-icon{background-color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7);background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+DQogICAgPHBvbHlnb24gcG9pbnRzPSI0MCA3LjkyOSAyMCAyNy45MjkgMTAgMTcuOTI5IDIuOTI5IDI1IDIwIDQyLjA3MSA0Ny4wNzEgMTUgNDAgNy45MjkiIGZpbGw9IiNGRkYiLz4NCjwvc3ZnPg==);background-repeat:no-repeat;background-size:contain}.mfuns-player-slider{position:relative}.mfuns-player-slider-track{width:4px;height:4px;border-radius:2px;background:rgba(255,255,255,.5019607843);margin:0 auto;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;cursor:pointer}.mfuns-player-slider-bar{background:var(--mp-primary-color, #7b7ff7);border-radius:2px}.mfuns-player-slider-thumb-track{position:relative;width:calc(100% - 12px);height:calc(100% - 12px)}.mfuns-player-slider-thumb{z-index:1;width:12px;height:12px;border-radius:100%;background:var(--mp-primary-color, #7b7ff7)}.mfuns-player-slider-divider{position:absolute;width:100%;display:flex;justify-content:space-between}.mfuns-player-slider-divider-dot{height:4px;width:1px;background-color:#ffffffe0;transform:translateY(-50%)}.mfuns-player-picker-item{display:inline-block;padding:0 5px;height:20px;line-height:20px;border-radius:var(--mp-border-radius, 4px);border:transparent solid 1px;transition:color .2s;cursor:pointer}.mfuns-player-picker-item.state-picked{border:transparent solid 1px;border-color:var(--mp-primary-color, #7b7ff7);color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-picker-item:hover,.mfuns-player-picker-item:active{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-checkbox{height:22px;cursor:pointer}.mfuns-player-checkbox-icon{position:relative;display:inline-block;vertical-align:middle;margin:4px 0;width:13px;height:13px;border-radius:var(--mp-border-radius, 4px);border:solid;border-width:1px;border-color:#ffffff80;box-sizing:border-box;transition:all .2s}.mfuns-player-checkbox-label{position:relative;display:inline-block;vertical-align:middle;line-height:22px;margin:0 2px;transition:all .2s}.mfuns-player-checkbox:hover .mfuns-player-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-checkbox:hover .mfuns-player-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-checkbox:active .mfuns-player-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-checkbox:active .mfuns-player-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-checkbox.state-checked .mfuns-player-checkbox-icon{background-color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7);background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+DQogICAgPHBvbHlnb24gcG9pbnRzPSI0MCA3LjkyOSAyMCAyNy45MjkgMTAgMTcuOTI5IDIuOTI5IDI1IDIwIDQyLjA3MSA0Ny4wNzEgMTUgNDAgNy45MjkiIGZpbGw9IiNGRkYiLz4NCjwvc3ZnPg==);background-repeat:no-repeat;background-size:contain}.mfuns-player-input{font-family:inherit;font-size:inherit;height:20px;line-height:20px;border-radius:var(--mp-border-radius, 4px);padding:0 4px;outline:none;background-color:transparent;color:#fff;border:1px solid rgba(255,255,255,.2509803922);transition:all .2s}.mfuns-player-input:hover{border-color:#ffffff80}.mfuns-player-input:focus{border-color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-button{font-family:inherit;font-size:inherit;height:22px;line-height:22px;border-radius:var(--mp-border-radius, 4px);padding:0 4px;outline:none;background-color:transparent;color:#ffffffe0;border:1px solid rgba(255,255,255,.5019607843);cursor:pointer;transition:all .2s}.mfuns-player-button:hover{color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-list li{color:#ffffffe0}.mfuns-player-list li .state-selected{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-list li:hover{background-color:#ffffff40}.mfuns-player-danmaku{position:absolute;left:0;right:0;top:0;bottom:0;color:#fff}.mfuns-player-danmaku.state-paused .mfuns-player-danmaku-item{animation-play-state:paused}.mfuns-player-danmaku-top,.mfuns-player-danmaku-bottom{position:absolute;left:50%;text-align:center;visibility:hidden;white-space:pre;will-change:visibility;animation:danmaku-show var(--duration) linear;animation-play-state:running}.mfuns-player-danmaku-item{display:inline-block;-webkit-user-select:none;user-select:none;white-space:pre;text-shadow:rgb(0,0,0) 1px 0px 1px,rgb(0,0,0) 0px 1px 1px,rgb(0,0,0) 0px -1px 1px,rgb(0,0,0) -1px 0px 1px;cursor:default}.mfuns-player-danmaku-roll{position:absolute;left:var(--offset);white-space:pre;will-change:transform;animation:danmaku-roll var(--duration) linear;animation-play-state:running}.mfuns-player-danmaku-reverse{position:absolute;right:var(--offset);white-space:pre;will-change:transform;animation:danmaku-reverse var(--duration) linear;animation-play-state:running}@keyframes danmaku-roll{0%{transform:translate(0)}to{transform:translate(var(--translateX))}}@keyframes danmaku-reverse{0%{transform:translate(0)}to{transform:translate(calc(var(--translateX) * -1))}}@keyframes danmaku-show{0%{visibility:visible}to{visibility:visible}}.mfuns-player-controller-wrap{position:absolute;bottom:-50px;left:0;right:0;height:50px;transition:bottom .4s ease}.mfuns-player-controller-mask{opacity:0;position:absolute;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;bottom:0;left:0;right:0;height:100px;pointer-events:none;transition:opacity .4s ease}.mfuns-player-controller{position:absolute;bottom:0;left:0;right:0;height:50px;margin:0 15px;color:#ffffffe0}.mfuns-player-controller-content{height:calc(100% - 20px);position:relative;margin:15px 0 5px;display:flex;justify-content:space-between;align-items:center}.mfuns-player-controller-left{height:100%;max-width:200px;display:flex;align-items:center;flex-shrink:0}.mfuns-player-controller-right{height:100%;min-width:200px;display:flex;justify-content:flex-end;align-items:center;flex-shrink:0}.mfuns-player-controller-center{flex-grow:1}.mfuns-player-controller-center.state-bar{margin:0 60px;max-width:600px}.mfuns-player-controller-top{width:100%;height:14px;position:absolute;top:0;display:flex;align-items:center;cursor:pointer;box-sizing:border-box}.mfuns-player-controller-button{position:relative;height:30px;font-size:12px;display:flex;justify-content:center;cursor:pointer}.mfuns-player-controller-button .mfuns-player-controller-icon{font-size:21px;line-height:30px}.mfuns-player-controller-button .mfuns-player-controls-text{font-weight:700;font-size:14px;line-height:30px}.mfuns-player-controller-button:hover .mfuns-player-tooltip,.mfuns-player-controller-button:hover .mfuns-player-controls-panel-wrap{display:block}.mfuns-player-controller-button:hover .mfuns-player-controller-icon-wrap{transform:translateY(-2px)}.mfuns-player-controller-button:hover .mfuns-player-controller-icon-wrap:active{transform:translateY(1px)}.mfuns-player-controller-button.state-control .mfuns-player-controls-panel-wrap{display:block}.mfuns-player-controller-button.state-control .mfuns-player-controller-icon-wrap{transform:translateY(-2px)}.mfuns-player-controller-icon-wrap{padding:0 7px;transition:transform .3s ease}.mfuns-player-controller-panel-wrap{position:absolute;left:50%;bottom:100%;transform:translate(-50%);display:none;cursor:default}.mfuns-player-controller-panel{margin-bottom:20px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mfuns-player-controller-time{width:90px;text-align:center;font-size:13px;margin:0 5px;cursor:pointer}.mfuns-player-controller-time-label{width:100%;white-space:nowrap;text-align:center}.mfuns-player-controller-time-input{display:none;width:60px;margin:auto;font-size:13px;text-align:center}.mfuns-player-controller-time.state-input .mfuns-player-controller-time-label{display:none}.mfuns-player-controller-time.state-input .mfuns-player-controller-time-input{display:block}.mfuns-player.state-active .mfuns-player-controller-wrap{bottom:0}.mfuns-player.state-active .mfuns-player-controller-mask{opacity:1}.mfuns-player.mode-solid .mfuns-player-video-area{width:100%;height:calc(100% - 36px)}.mfuns-player.mode-solid .mfuns-player-controller-wrap{position:relative;bottom:0;background:var(--mp-bg-white, #ffffff);height:36px}.mfuns-player.mode-solid .mfuns-player-controller{height:100%;margin:0;color:#404040}.mfuns-player.mode-solid .mfuns-player-controller-mask{display:none}.mfuns-player.mode-solid .mfuns-player-controller-content{height:calc(100% - 6px);margin:6px 0 0}.mfuns-player.mode-solid .mfuns-player-controller-progress{height:14px;padding-bottom:2px;top:-8px;align-items:end}.mfuns-player.mode-solid .mfuns-player-controller-panel{background-color:var(--mp-bg-white, #ffffff);color:#404040}.mfuns-player.mode-solid .mfuns-player-controller .mfuns-player-slider-track,.mfuns-player.mode-solid .mfuns-player-controller-panel .mfuns-player-slider-track{background:#e6e6e6}.mfuns-player.mode-solid .mfuns-player-controller .mfuns-player-checkbox-icon,.mfuns-player.mode-solid .mfuns-player-controller-panel .mfuns-player-checkbox-icon{border-color:gray}.mfuns-player.mode-solid .mfuns-player-controller .mp-input,.mfuns-player.mode-solid .mfuns-player-controller-panel .mp-input{color:#404040;border:1px solid #e6e6e6}.mfuns-player.mode-solid .mfuns-player-controller .mp-input:hover,.mfuns-player.mode-solid .mfuns-player-controller-panel .mp-input:hover{border-color:gray}.mfuns-player.mode-solid .mfuns-player-controller .mp-input:focus,.mfuns-player.mode-solid .mfuns-player-controller-panel .mp-input:focus{border-color:var(--mp-primary-color, #7b7ff7)}.mfuns-player.mode-solid .mfuns-player-controller .mp-button,.mfuns-player.mode-solid .mfuns-player-controller-panel .mp-button{color:#404040;border:1px solid #808080}.mfuns-player.mode-solid .mfuns-player-controller .mp-button:hover,.mfuns-player.mode-solid .mfuns-player-controller-panel .mp-button:hover{color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7)}.mfuns-player.mode-solid.state-fullscreen .mfuns-player-video-area{height:100%}.mfuns-player.mode-solid.state-fullscreen .mfuns-player-controller-wrap{position:absolute;bottom:-50px}.mfuns-player.mode-solid.state-fullscreen.state-active .mfuns-player-controller-wrap{bottom:0}.mfuns-player-controls-button{position:relative;height:30px;font-size:12px;display:flex;justify-content:center;cursor:pointer}.mfuns-player-controls-button-icon{padding:0 7px;transition:transform .3s ease}.mfuns-player-controls-button-icon i{font-size:21px;line-height:30px;display:none}.mfuns-player-controls-button-icon i:nth-child(1){display:block}.mfuns-player-controls-button.state-on .mfuns-player-controls-button-icon i:nth-child(1){display:none}.mfuns-player-controls-button.state-on .mfuns-player-controls-button-icon i:nth-child(2){display:block}.mfuns-player-controls-button-text{font-weight:700;font-size:14px;line-height:30px}.mfuns-player-controls-button:hover .mpui-tooltip,.mfuns-player-controls-button:hover .mfuns-player-controls-panel-wrap{display:block}.mfuns-player-controls-button:hover .mfuns-player-controls-button-icon{transform:translateY(-2px)}.mfuns-player-controls-button:hover .mfuns-player-controls-button-icon:active{transform:translateY(1px)}.mfuns-player-controls-button.state-control .mfuns-player-controls-panel-wrap{display:block}.mfuns-player-controls-button.state-control .mfuns-player-controls-icon{transform:translateY(-2px)}.mfuns-player-controls-panel-wrap{position:absolute;left:50%;bottom:100%;transform:translate(-50%);display:none;cursor:default}.mfuns-player-controls-panel{margin-bottom:20px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mfuns-player-videotime{width:90px;text-align:center;font-size:13px;margin:0 5px;cursor:pointer}.mfuns-player-videotime-label{width:100%;white-space:nowrap;text-align:center}.mfuns-player-videotime-input{display:none;width:60px;margin:auto;font-size:13px;text-align:center}.mfuns-player-videotime.state-input .mfuns-player-videotime-label{display:none}.mfuns-player-videotime.state-input .mfuns-player-videotime-input{display:block}.mfuns-player-progress{position:relative;width:100%;height:4px;background-color:#ffffff40;transition:height .2s ease}.mfuns-player-progress-played{position:absolute;top:0;left:0;height:100%;background-color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-progress-buffered{position:absolute;top:0;left:0;height:100%;background-color:#ffffff80}.mfuns-player-progress-thumb-track{position:absolute;top:50%;left:0;width:100%;height:0}.mfuns-player-progress-thumb{position:absolute;transform:translate(-50%,-50%) scale(0);width:14px;height:14px;background-color:var(--mp-primary-color, #7b7ff7);border-radius:7px;transition:transform,border;transition-timing-function:ease;transition-duration:.2s;box-sizing:border-box;border:4px solid white}.mfuns-player-progress-preview{position:absolute;top:-12px;width:0;height:0}.mfuns-player-progress-time{position:absolute;left:50%;bottom:0;transform:translate(-50%);display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mfuns-player-progress-tip{display:none;position:absolute;top:-10px}.mfuns-player-progress-tip:after{content:"";display:block;position:absolute;bottom:-10px;left:50%;transform:translate(-50%);border:5px solid;border-color:var(--mp-primary-color, #7b7ff7) transparent transparent transparent}.mfuns-player-progress.mfuns-player-progress-active{height:6px}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-thumb{transform:translate(-50%,-50%) scale(1)}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-tip{display:block}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-time{display:inline-block}.mfuns-player-progress.mfuns-player-progress-dragging .mfuns-player-progress-thumb{border-width:2px}.mfuns-player.mode-solid .mfuns-player-progress{background-color:#e6e6e680}.mfuns-player.mode-solid .mfuns-player-progress-buffered{background-color:var(--mp-primary-color, #7b7ff7);opacity:.25}.mfuns-player.mode-solid .mfuns-player-progress-time{background-color:var(--mp-bg-white, #ffffff);color:#404040}.mfuns-player-side-wrap{display:none}.mfuns-player-side-wrap.state-show{display:block}.mfuns-player-side{position:absolute;right:20px;width:300px;top:50px;height:calc(100% - 120px);background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);color:#ffffffe0}.mfuns-player-side-mask{position:absolute;width:100%;height:100%}.mfuns-player-side-head{height:36px;padding:0 8px;font-size:14px;display:flex;justify-content:space-between}.mfuns-player-side-title{line-height:36px}.mfuns-player-side-content{height:calc(100% - 36px);overflow:hidden}.mfuns-player-side-content>*{position:relative;width:100%;height:100%;display:none}.mfuns-player-side-content>*.state-show{display:block}.mfuns-player-side-close{position:absolute;right:0;cursor:pointer}.mfuns-player-side-close i{padding:0 8px;font-size:21px;line-height:36px}.mfuns-player-side-panel{position:relative;width:100%;height:100%}.mfuns-player-side .mfuns-player-side-panel{display:none}.mfuns-player-side .mfuns-player-side-panel.state-show{display:block}.mfuns-player-modal-wrap{display:none}.mfuns-player-modal-wrap.state-show{display:block}.mfuns-player-modal{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);min-width:200px;min-height:150px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);color:#ffffffe0}.mfuns-player-modal-mask{position:absolute;width:100%;height:100%}.mfuns-player-modal-head{position:relative;height:30px;font-size:14px}.mfuns-player-modal-title{position:absolute;width:100%;text-align:center;line-height:36px}.mfuns-player-modal-close{position:absolute;right:0;cursor:pointer}.mfuns-player-modal-close i{padding:0 8px;font-size:21px;line-height:36px}.mfuns-player-modal-content>*{position:relative;width:100%;height:100%;display:none}.mfuns-player-modal-content>*.state-show{display:block}.mfuns-player-modal .mfuns-player-controller-icon{cursor:pointer;font-size:21px;line-height:30px}.mfuns-player-contextmenu-wrap{display:none}.mfuns-player-contextmenu-wrap.state-show{display:block}.mfuns-player-contextmenu{-webkit-user-select:none;user-select:none;position:absolute;min-width:200px;color:#ffffffe0}.mfuns-player-contextmenu li{height:36px;line-height:36px;cursor:pointer;padding:0 10px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mfuns-player-contextmenu li+li{border-top:1px solid rgba(255,255,255,.2509803922)}.mfuns-player-contextmenu li:hover{background-color:#ffffff40}.mfuns-player-contextmenu-danmaku,.mfuns-player-contextmenu-menu{background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);overflow:hidden}.mfuns-player-contextmenu-danmaku{margin-bottom:4px;max-width:400px}.mfuns-player-contextmenu-danmaku-item{display:flex;justify-content:space-between}.mfuns-player-contextmenu-danmaku-item-content{flex-grow:1}.mfuns-player-contextmenu-danmaku-item-operate{display:flex;flex-shrink:0}.mfuns-player-contextmenu-danmaku-item-operate-btn{padding:0 4px}.mfuns-player-contextmenu-danmaku-item-operate-btn:hover{background-color:#ffffff40}.mfuns-player-footbar{height:40px;width:100%;display:flex;position:relative;bottom:0;left:0;justify-content:space-between;align-items:center;background-color:var(--mp-bg-white, #ffffff);border-top:none;box-sizing:border-box;color:#404040}.mfuns-player.mode-nofootbar .mfuns-player-main{width:100%;height:100%}.mfuns-player.mode-nofootbar .mfuns-player-footbar,.mfuns-player-button_volume .mpicon-volume-off,.mfuns-player-button_volume.state-muted .mpicon-volume{display:none}.mfuns-player-button_volume.state-muted .mpicon-volume-off{display:block}.mfuns-player-button_volume-value{width:100%;text-align:center;padding-bottom:4px}.mfuns-player-button_volume-slider{width:100%;height:60px}.mfuns-player-button_volume .mfuns-player-controls-panel{width:30px;padding:4px 0 6px}.mfuns-player-button_settings .mfuns-player-controls-panel{width:250px;padding:5px 15px}.mfuns-player-button_part{display:none}.mfuns-player-button_part.state-show{display:flex}.mfuns-player-button_quality-list{min-width:50px;height:100%}.mfuns-player-button_quality-item{white-space:nowrap;padding:0 8px;height:30px;line-height:30px;display:flex;cursor:pointer}.mfuns-player-button_quality-item:hover{background-color:#ffffff40}.mfuns-player-button_quality-item.state-selected{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-button_next.state-lastpart{display:none}.mfuns-player-button_next:hover .mfuns-player-controls-button-icon{transform:translate(2px)}.mfuns-player-button_next:hover .mfuns-player-controls-button-icon:active{transform:translate(-1px)}.mfuns-player-button_prev.state-firstpart{display:none}.mfuns-player-button_prev:hover .mfuns-player-controls-button-icon{transform:translate(-2px)}.mfuns-player-button_prev:hover .mfuns-player-controls-button-icon:active{transform:translate(1px)}.mfuns-player-button_next .mfuns-player-controls-button-icon i,.mfuns-player-button_prev .mfuns-player-controls-button-icon i{font-size:16px}.mfuns-player-button_danmaku-toggle .mpicon-danmaku{display:none}.mfuns-player-button_danmaku-toggle.state-on{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-button_danmaku-toggle.state-on .mpicon-danmaku-off{display:none}.mfuns-player-button_danmaku-toggle.state-on .mpicon-danmaku{display:block}.mfuns-player-button_danmakusettings .mfuns-player-controls-panel{width:270px;padding:5px 15px}.mfuns-player-button_danmakusettings .mfuns-player-slider-wrap{width:160px}.mfuns-player-button_danmakustyle .mfuns-player-controls-panel{width:250px;padding:5px 15px}.mfuns-player-danmaku-style-color-input{width:60px}.mfuns-player-danmaku-style-color-preview{width:36px;height:18px;border:2px solid rgba(255,255,255,.6274509804);border-radius:var(--mp-border-radius, 4px);margin-left:8px}.mfuns-player-danmaku-style-color-dropper{margin-left:5px}.mfuns-player-danmaku-style-color-picker{margin-top:8px;margin-left:30px}.mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item{border:none;padding:0}.mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item>div{width:12px;height:12px;border:2px solid rgba(0,0,0,.2509803922);border-radius:var(--mp-border-radius, 4px)}.mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item.state-picked{border:none}.mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item.state-picked>div{border-color:#fff}.mode-solid .mfuns-player-danmaku-style-color-preview{border-color:#00000040}.mode-solid .mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item>div{border-color:#00000020;border-radius:var(--mp-border-radius, 4px)}.mode-solid .mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item.state-picked>div{border-color:#00000080}.mfuns-player-hotkeys-list{padding:5px 0;max-height:200px;overflow-y:auto}.mfuns-player-hotkeys-list-item{height:30px;line-height:30px;text-align:center}.mfuns-player-hotkeys-list-key{display:inline-block;width:80px}.mfuns-player-hotkeys-list-description{display:inline-block;width:180px}.mfuns-player-about{padding:10px}.mfuns-player-about-logo{width:360px;height:60px;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMjAiPjxwYXRoIGQ9Ik0uODk2LDEzLjc1OTc3di0xMS41MkgzLjQ1NjA1TDcuMzU5ODYsNi44OTYsMTEuMjQ4LDIuMjM5NzVoMi41NzYxN3YxMS41MkgxMS4zMjgxM3YtNy43MjhMNy4zNTk4NiwxMC43Njc1OCwzLjM3Niw2LjA0Nzg1djcuNzExOTJaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTE1LjY5NjI5LDEzLjc1OTc3di0xMGEyLjE4MDU5LDIuMTgwNTksMCwwLDEsLjMxOTgyLTEuMTUxODYsMi40ODIwOSwyLjQ4MjA5LDAsMCwxLC44NDgxNS0uODQ4MTQsMi4yMDk0NSwyLjIwOTQ1LDAsMCwxLDEuMTY4LS4zMTk4M0gyMS41ODRWMy45MDM4MUgxOC4xNDRWNC40OEgyMS41ODRWNi45Mjc3M0gxOC4xNDR2Ni44MzJaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTI0LjA0NzM2LDEzLjQzOTk0YTIuNDEyODUsMi40MTI4NSwwLDAsMS0uODM5ODQtLjg0ODE0LDIuMjIzMzIsMi4yMjMzMiwwLDAsMS0uMzEyLTEuMTUxODZWNC40OGgyLjQ0Nzc1djYuODMxNTRoNC41MTIyMVY0LjQ4aDIuNDQ3NzV2Ni45NmEyLjIyMzMyLDIuMjIzMzIsMCwwLDEtLjMxMiwxLjE1MTg2LDIuNDEyODUsMi40MTI4NSwwLDAsMS0uODM5ODQuODQ4MTQsMi4yMTA2OCwyLjIxMDY4LDAsMCwxLTEuMTY4LjMxOTgzSDI1LjIxNTMzQTIuMjA5NDUsMi4yMDk0NSwwLDAsMSwyNC4wNDczNiwxMy40Mzk5NFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJNMzQuMDMxMjUsMTMuNzU5NzdWNC40OGg3LjA4ODM4YTIuMjEwNzYsMi4yMTA3NiwwLDAsMSwxLjE2OC4zMTk4MiwyLjQxMjg4LDIuNDEyODgsMCwwLDEsLjgzOTg0Ljg0ODE1LDIuMjIzMzEsMi4yMjMzMSwwLDAsMSwuMzEyLDEuMTUxODV2Ni45Nkg0MC45OTE3di02LjgzMkgzNi40Nzk0OXY2LjgzMloiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJNNDUuOTE5OTIsMTMuNDM5OTRhMi40ODIxNSwyLjQ4MjE1LDAsMCwxLS44NDgxNC0uODQ4MTQsMi4xODA2LDIuMTgwNiwwLDAsMS0uMzE5ODMtMS4xNTE4NnYtLjQ2NDM1aDIuNDQ3NzZ2LjMzNTkzaDQuNTEyMnYtLjk2SDQ3LjA3MTc4YTIuMTgwNTksMi4xODA1OSwwLDAsMS0xLjE1MTg2LS4zMTk4MiwyLjQ4MjE4LDIuNDgyMTgsMCwwLDEtLjg0ODE0LS44NDgxNUEyLjE4MDU5LDIuMTgwNTksMCwwLDEsNDQuNzUyLDguMDMxNzRWNi43OTk4QTIuMTgwNTksMi4xODA1OSwwLDAsMSw0NS4wNzE3OCw1LjY0OGEyLjQ4MjE4LDIuNDgyMTgsMCwwLDEsLjg0ODE0LS44NDgxNUEyLjE4MDY4LDIuMTgwNjgsMCwwLDEsNDcuMDcxNzgsNC40OGg0Ljc2ODA2YTIuMjA5NTMsMi4yMDk1MywwLDAsMSwxLjE2OC4zMTk4MkEyLjQ4MjIxLDIuNDgyMjEsMCwwLDEsNTMuODU2LDUuNjQ4YTIuMTgwNTgsMi4xODA1OCwwLDAsMSwuMzE5ODIsMS4xNTE4NXYuNDYzODdINTEuNzExOTFWNi45Mjc3M2gtNC41MTIydi45Nmg0LjY0MDEzYTIuMjA5ODUsMi4yMDk4NSwwLDAsMSwxLjE2OC4zMjAzMSwyLjQ4MDc3LDIuNDgwNzcsMCwwLDEsLjg0ODE1Ljg0NzY1LDIuMTgyMjgsMi4xODIyOCwwLDAsMSwuMzE5ODIsMS4xNTIzNXYxLjIzMTkzQTIuMTgwNTksMi4xODA1OSwwLDAsMSw1My44NTYsMTIuNTkxOGEyLjQ4MjE4LDIuNDgyMTgsMCwwLDEtLjg0ODE1Ljg0ODE0LDIuMjA5NDUsMi4yMDk0NSwwLDAsMS0xLjE2OC4zMTk4M0g0Ny4wNzE3OEEyLjE4MDYsMi4xODA2LDAsMCwxLDQ1LjkxOTkyLDEzLjQzOTk0WiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik02MS4wMDczMiwxMy43NTk3N1YyLjI1NTg2aDkuNjAwMWExLjg0NzQyLDEuODQ3NDIsMCwwLDEsLjk2Nzc4LjI2MzY3LDEuOTgxMiwxLjk4MTIsMCwwLDEsLjY5NjI4LjY5NjI5LDEuODUsMS44NSwwLDAsMSwuMjU1ODYuOTZ2My4zNzZhMS44NSwxLjg1LDAsMCwxLS4yNTU4Ni45NiwxLjk4MTI4LDEuOTgxMjgsMCwwLDEtLjY5NjI4LjY5NjI5LDEuODQ3NDIsMS44NDc0MiwwLDAsMS0uOTY3NzguMjYzNjdoLTguMzA0MnY0LjI4ODA5Wm0xLjkxOTkzLTUuNjAwMWg3LjY4MDE3YS42MTQ4My42MTQ4MywwLDAsMCwuNDM5OTQtLjE3NTc4LjU3NDcuNTc0NywwLDAsMCwuMTg0MDktLjQzMjEzdi0zLjM3NmEuNjI4NTYuNjI4NTYsMCwwLDAtLjYyNC0uNjI0SDYyLjkyNzI1YS42Mjg1NC42Mjg1NCwwLDAsMC0uNjI0LjYyNHYzLjM3NmEuNTc0NzMuNTc0NzMsMCwwLDAsLjE4NDA4LjQzMjEzQS42MTQuNjE0LDAsMCwwLDYyLjkyNzI1LDguMTU5NjdaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTc0LjU2Njg5LDEzLjQ5NTYxYTIuMDE0NTUsMi4wMTQ1NSwwLDAsMS0uNzAzNjEtLjcwMzYyLDEuODQ1LDEuODQ1LDAsMCwxLS4yNjQxNi0uOTY4MjZWMS40Mzk5NGgxLjMxMlYxMS44MjM3M2EuNjI4NTQuNjI4NTQsMCwwLDAsLjYyNC42MjRINzcuMTAzdjEuMzEySDc1LjUzNTE2QTEuODQ1LDEuODQ1LDAsMCwxLDc0LjU2Njg5LDEzLjQ5NTYxWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik04MC4yMDcsMTMuNzU5NzdhMS44NDUsMS44NDUsMCwwLDEtLjk2ODI2LS4yNjQxNiwyLjAxNDQ2LDIuMDE0NDYsMCwwLDEtLjcwMzYxLS43MDM2MiwxLjg0NSwxLjg0NSwwLDAsMS0uMjY0MTYtLjk2ODI2VjguNDYzODdoOC4xMjc5M1Y2LjQxNTUzYS42Mjc3My42Mjc3MywwLDAsMC0uNjI0LS42MjM1NEg3OC4yNzFWNC40OGg3LjUwMzlhMS44NzcsMS44NzcsMCwwLDEsLjk4Mzg5LjI2MzY3LDIuMDIxMjgsMi4wMjEyOCwwLDAsMSwuNzA0MS43MDQxLDEuODQ0NTMsMS44NDQ1MywwLDAsMSwuMjY0MTYuOTY3Nzh2Ny4zNDQyNFptMC0xLjMxMmg2LjE5MTlWOS43NzU4OEg3OS41ODN2Mi4wNDc4NWEuNjI4NTQuNjI4NTQsMCwwLDAsLjYyNC42MjRaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTkwLjkyNjI3LDE3LjQzOTk0VjE2LjExMTgyaDUuNzkyYS42Mjc3Mi42Mjc3MiwwLDAsMCwuNjI0LS42MjR2LTEuNzI4aC02LjE5MTlhMS44NDIsMS44NDIsMCwwLDEtLjk2Nzc3LS4yNjQxNiwyLjAxNTg1LDIuMDE1ODUsMCwwLDEtLjcwNDEtLjcwMzYyLDEuODQ1LDEuODQ1LDAsMCwxLS4yNjQxNi0uOTY4MjZ2LTcuMzEyaDEuMzEydjcuMzEyYS42Mjg1NC42Mjg1NCwwLDAsMCwuNjI0LjYyNGg1LjU2Nzg3YS42Mjc3MS42Mjc3MSwwLDAsMCwuNjI0LS42MjR2LTcuMzEyaDEuMzEyVjE1LjQ4Nzc5YTEuOTIzODUsMS45MjM4NSwwLDAsMS0uMjU1ODYuOTgzODksMS45NTgzMSwxLjk1ODMxLDAsMCwxLS42OTU4LjcwNDEsMS44NzkxLDEuODc5MSwwLDAsMS0uOTg0MzguMjY0MTZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTEwMC45NjcyOSwxMy40OTU2MWEyLjAxNTg3LDIuMDE1ODcsMCwwLDEtLjcwNDExLS43MDM2MiwxLjg0NSwxLjg0NSwwLDAsMS0uMjY0MTYtLjk2ODI2VjYuNDE1NTNhMS44NDQ1MywxLjg0NDUzLDAsMCwxLC4yNjQxNi0uOTY3NzgsMi4wMjEzMSwyLjAyMTMxLDAsMCwxLC43MDQxMS0uNzA0MSwxLjg0NjExLDEuODQ2MTEsMCwwLDEsLjk2Nzc3LS4yNjM2N2g1LjU2Nzg3YTEuODc4NjgsMS44Nzg2OCwwLDAsMSwuOTg0MzcuMjYzNjcsMi4wMjQsMi4wMjQsMCwwLDEsLjcwMzYyLjcwNDEsMS44NDQ1MywxLjg0NDUzLDAsMCwxLC4yNjQxNi45Njc3OFY5Ljc3NTg4aC04LjE0NHYyLjA0Nzg1YS42Mjg1NC42Mjg1NCwwLDAsMCwuNjI0LjYyNGg3LjUydjEuMzEyaC03LjUyQTEuODQyLDEuODQyLDAsMCwxLDEwMC45NjcyOSwxMy40OTU2MVptLjM0Mzc1LTUuMDMxNzRIMTA4LjEyN1Y2LjQxNTUzYS42Mjc3MS42Mjc3MSwwLDAsMC0uNjI0LS42MjM1NGgtNS41Njc4N2EuNjI3NzEuNjI3NzEsMCwwLDAtLjYyNC42MjM1NFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJNMTExLjAwNjg0LDEzLjc1OTc3VjYuNDE1NTNhMS44NDQ1MywxLjg0NDUzLDAsMCwxLC4yNjQxNi0uOTY3NzgsMi4wMTk4OSwyLjAxOTg5LDAsMCwxLC43MDM2MS0uNzA0MSwxLjg0OTEsMS44NDkxLDAsMCwxLC45NjgyNi0uMjYzNjdoNS4yMTU4MlY1Ljc5MmgtNS4yMTU4MmEuNjI3NzEuNjI3NzEsMCwwLDAtLjYyNC42MjM1NHY3LjM0NDI0WiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==);background-size:cover}.mfuns-player-about a{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-partlist-list{scrollbar-width:thin;height:100%;overflow-y:auto}.mfuns-player-partlist-list::-webkit-scrollbar{width:5px}.mfuns-player-partlist-list::-webkit-scrollbar-thumb{background-color:gray}.mfuns-player-partlist-item{padding:0 8px;height:30px;line-height:30px;display:flex;cursor:pointer}.mfuns-player-partlist-item:hover{background-color:#ffffff40}.mfuns-player-partlist-item.state-selected{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-partlist-item-id{display:inline-block;width:40px;flex-shrink:0}.mfuns-player-partlist-item-title{display:inline-block;flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mfuns-player-panel-row{display:flex;padding:5px 0}.mfuns-player-row-label{flex-shrink:0;height:22px;line-height:22px;padding-right:10px}.mfuns-player-row-value{height:22px;line-height:22px;padding-left:10px}.mfuns-player-videostatus{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mfuns-player-videostatus-paused{display:none;position:absolute;bottom:60px;right:20px;width:65px;height:55px;background:url(data:image/png;base64,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);background-size:100% 100%}.mfuns-player-videostatus-loading{display:none;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:100px}.mfuns-player-videostatus-loading-icon{width:100%;display:flex;justify-content:center;align-items:center;font-size:16px;font-weight:700;height:35px}.mfuns-player-videostatus-loading-icon>span{width:20px;height:35px;font-size:16px;text-align:center;line-height:16px;color:var(--mp-primary-color, #7b7ff7);animation:loading-float 1.4s ease-in-out infinite;text-shadow:1px 1px #666}.mfuns-player-videostatus-loading-icon>span:nth-child(2){animation-delay:-1.2s}.mfuns-player-videostatus-loading-icon>span:nth-child(3){animation-delay:-1s}.mfuns-player-videostatus-loading-icon>span:nth-child(4){animation-delay:-.8s}.mfuns-player-videostatus-loading-icon>span:nth-child(5){animation-delay:-.6s}.mfuns-player-videostatus-loading-icon>span:nth-child(6){animation-delay:-.4s}.mfuns-player-videostatus-loading-icon>span:nth-child(7){animation-delay:-.2s}.mfuns-player-videostatus-loading-content{width:100%;text-align:center;font-size:14px;font-weight:700;color:#fff;text-shadow:1px 1px #666}.mfuns-player.state-paused .mfuns-player-videostatus-paused,.mfuns-player.state-loading .mfuns-player-videostatus-loading{display:block}@keyframes loading-float{0%,to{height:35px}50%{height:20px}}.mfuns-player-danmakubar{display:flex;flex-grow:1;justify-content:space-between;align-items:center;height:100%}.mfuns-player-danmakubar .mfuns-player-controller-icon-wrap{padding:0 5px}.mfuns-player-danmakubar.state-loading .mfuns-player-controller-danmaku-toggle,.mfuns-player-danmakubar.state-loading .mfuns-player-controller-danmaku-settings{pointer-events:none}.mfuns-player-danmakubar.state-loading .mfuns-player-danmakubar-input-wrap{background-image:linear-gradient(90deg,#e6e6e6 10%,#f0f0f0 24%,#f6f6f6 32%,#f6f6f6 68%,#f0f0f0 76%,#e6e6e6 90%);background-size:200% 100%;background-position:0% 0%;animation:skeleton-loading 1.4s linear infinite;cursor:not-allowed}.mfuns-player-danmakubar.state-loading .mfuns-player-danmakubar-input,.mfuns-player-danmakubar.state-loading .mfuns-player-controller-danmaku-style{display:none}.mfuns-player-danmakubar.state-loading .mfuns-player-danmaku-status-loading{display:block;padding-left:10px}.mfuns-player-danmakubar.state-loading .mfuns-player-danmakubar-send{background-color:#aaa;pointer-events:none;cursor:not-allowed}.mfuns-player-danmakubar-slot,.mfuns-player-danmakubar-input-slot{display:flex;flex-shrink:0}.mfuns-player-danmakubar-input-wrap{display:flex;flex-grow:1;align-items:center;position:relative;height:100%;background-color:#ffffff40;border-radius:var(--mp-border-radius, 4px)}.mfuns-player-danmakubar-input{font-size:13px;flex:5;height:30px;outline:none;border:none;margin-left:5px;color:#ffffffe0;background-color:transparent;box-sizing:border-box}.mfuns-player-danmakubar-input::-webkit-input-placeholder{color:#ffffff80}.mfuns-player-danmakubar-status-loading{font-size:13px;flex:5;height:32px;line-height:32px;color:#999;box-sizing:border-box;display:none}.mfuns-player-danmakubar-send{width:60px;display:flex;align-items:center;justify-content:center;height:30px;font-size:12px;color:#fff;background:var(--mp-primary-color, #7b7ff7);border-radius:0 var(--mp-border-radius, 4px) var(--mp-border-radius, 4px) 0;cursor:pointer}.mfuns-player.mode-solid .mfuns-player-controller .mfuns-player-danmakubar-input{color:#404040}.mfuns-player.mode-solid .mfuns-player-controller .mfuns-player-danmakubar-input::-webkit-input-placeholder{color:gray}.mfuns-player.mode-solid .mfuns-player-controller .mfuns-player-danmakubar-input-wrap{background-color:#e6e6e6}.mfuns-player-danmakubar-wrap{height:40px;background:white}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar .mfuns-player-controller-icon-wrap{padding:0 7px}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-input-wrap{height:100%;border-left:1px solid #e6e6e6;border-radius:0;background-color:transparent}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-input{font-family:inherit;height:100%;margin-left:5px;color:#404040}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-input::-webkit-input-placeholder{color:gray}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-send{background:var(--mp-primary-color, #7b7ff7);border-radius:var(--mp-border-radius, 4px);margin-right:6px}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-send.state-disabled{background:#e6e6e6;color:gray;cursor:not-allowed}@keyframes skeleton-loading{0%{background-position:200% 0%}to{background-position:0% 100%}}.mfuns-player-settings-play,.mfuns-player-settings-others{display:flex;flex-wrap:wrap;gap:0 10px}.mfuns-player-loadingmask{position:absolute;width:100%;height:100%;left:0;top:0;display:none;background:black;flex-direction:column;overflow:hidden;color:#ffffffe0}.mfuns-player-loadingmask.state-show{display:flex}.mfuns-player-loadingmask-info{display:flex;flex-direction:column;justify-content:end;flex-grow:1;padding:8px}.mfuns-player-loadingmask-tips{flex-shrink:0;height:24px;padding:0 8px}.mfuns-player-danmakulist{-webkit-user-select:none;user-select:none;width:100%;height:100%;box-sizing:border-box;font-size:12px}.mfuns-player-danmakulist .list-row,.mfuns-player-danmakulist .mfuns-player-danmakulist-head{position:relative;line-height:24px;height:24px;white-space:nowrap}.mfuns-player-danmakulist-head{box-shadow:1px 0 2px #ccc}.mfuns-player-danmakulist-head :hover{background-color:#e6e6e633}.mfuns-player-danmakulist-select{position:absolute;box-sizing:border-box;line-height:24px;height:24px;width:100%;top:0;padding:0 8px;justify-content:space-between;display:none;background:white}.mfuns-player-danmakulist-select.state-show{display:flex}.mfuns-player-danmakulist-container .list-row:hover,.mfuns-player-danmakulist-container .mfuns-player-danmakulist-head:hover{background-color:#e6e6e633}.mfuns-player-danmakulist-container .list-row:hover .list-operate,.mfuns-player-danmakulist-container .mfuns-player-danmakulist-head:hover .list-operate{display:flex}.mfuns-player-danmakulist-container .list-row:hover .col-date,.mfuns-player-danmakulist-container .mfuns-player-danmakulist-head:hover .col-date{visibility:hidden}.mfuns-player-danmakulist-container .list-row.state-selected,.mfuns-player-danmakulist-container .state-selected.mfuns-player-danmakulist-head{color:var(--mp-primary-color, #7b7ff7);background-color:#e6e6e680}.mfuns-player-danmakulist-container .list-row.state-focus,.mfuns-player-danmakulist-container .state-focus.mfuns-player-danmakulist-head{color:var(--mp-primary-color, #7b7ff7);background-color:#e6e6e6}.mfuns-player-danmakulist .list-column,.mfuns-player-danmakulist .list-cell{box-sizing:content-box;display:inline-block;height:100%;padding:0 4px;overflow:hidden}.mfuns-player-danmakulist .list-column.col-time,.mfuns-player-danmakulist .list-cell.col-time{padding-left:8px;width:40px}.mfuns-player-danmakulist .list-column.col-date,.mfuns-player-danmakulist .list-cell.col-date{padding-right:8px;width:90px;text-align:center}.mfuns-player-danmakulist .list-column.col-content,.mfuns-player-danmakulist .list-cell.col-content{width:calc(100% - 162px);text-overflow:ellipsis;white-space:overflow}.mfuns-player-danmakulist .list-operate{position:absolute;right:0;top:0;width:100px;height:100%;display:none;justify-content:flex-end;align-items:center}.mfuns-player-danmakulist .list-operate-btn{cursor:pointer;line-height:20px;margin-left:4px;padding:0 8px;border:1px solid var(--mp-primary-color, #7b7ff7);border-radius:var(--mp-border-radius, 4px);color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-danmakulist-main{position:relative;overflow:hidden;width:100%;height:calc(100% - 40px)}.mfuns-player-danmakulist-container{overflow:hidden;position:absolute;overflow-y:auto;scrollbar-width:thin;top:24px;left:0;width:100%;height:calc(100% - 24px)}.mfuns-player-danmakulist-container::-webkit-scrollbar{width:5px}.mfuns-player-danmakulist-container::-webkit-scrollbar-thumb{background-color:gray}.mfuns-player-danmakulist-status{position:absolute;top:50%;width:100%}.mfuns-player-danmakulist-status div{text-align:center;display:none;color:gray}.mfuns-player-danmakulist-status[data-status=loading] .status-loading-text,.mfuns-player-danmakulist-status[data-status=failed] .status-failed-text,.mfuns-player-danmakulist-status[data-status=empty] .status-empty-text{display:block}.mfuns-player-danmakulist-foot{border-top:1px solid #e6e6e6;display:flex;justify-content:space-between;height:40px}.mfuns-player-danmakulist-foot-left,.mfuns-player-danmakulist-foot-right{display:flex;align-items:center}.mfuns-player-danmakulist-autoscroll{cursor:pointer;padding:4px;margin:0 4px;color:#404040}')),document.head.appendChild(A)}}catch(M){console.error("vite-plugin-css-injected-by-js",M)}})();
