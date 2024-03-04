const J = (s, t) => Array.from({ length: s }, () => t), _s = () => document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement || null, Ts = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || !1, As = document.pictureInPictureEnabled, Mt = (s) => {
  const t = s.split(/[:：]/).slice(-3), e = parseInt(t[t.length - 1]) || 0, i = parseInt(t[t.length - 2]) || 0, n = parseInt(t[t.length - 3]) || 0;
  return e + i * 60 + n * 3600;
}, oe = (s, t, e = !1) => {
  let i = null, n = !1;
  return function(...l) {
    i && clearTimeout(i), e && !n ? (s.apply(this, l), n = !0) : i = setTimeout(() => {
      s.apply(this, l), clearTimeout(i), i = null, n = !1;
    }, t);
  };
};
function H(s, t, e) {
  const i = document.createElement(s);
  if (t)
    for (const n in t)
      i.setAttribute(n, t[n]);
  return e && i.append(e), i;
}
function Rt(s, t, e) {
  return s > t ? s < e ? s : e : t;
}
const z = (s, t = !0) => {
  if (s = s || 0, s === 0 || s === 1 / 0 || s.toString() === "NaN")
    return "00:00";
  const e = (l) => l < 10 ? `0${l}` : `${l}`, i = Math.floor(s / 3600), n = Math.floor((s - i * 3600) / 60), a = Math.floor(s - i * 3600 - n * 60);
  return t ? (i > 0 ? [i, n, a] : [n, a]).map(e).join(":") : [i * 60 + n, a].map(e).join(":");
}, Ds = (s) => `#${`00000${s.toString(16)}`.slice(-6)}`, kt = {
  yyyy: (s) => s.getFullYear().toString(),
  yy: (s) => s.getFullYear().toString().slice(-2),
  MM: (s) => (s.getMonth() + 1).toString().padStart(2, "0"),
  dd: (s) => s.getDate().toString().padStart(2, "0"),
  HH: (s) => s.getHours().toString().padStart(2, "0"),
  mm: (s) => s.getMinutes().toString().padStart(2, "0"),
  ss: (s) => s.getSeconds().toString().padStart(2, "0")
}, he = (s, t) => t.replace(
  /yyyy|yy|MM|dd|HH|mm|ss/g,
  (e) => {
    var i;
    return (i = kt[e]) == null ? void 0 : i.call(kt, s);
  }
), r = "mfuns-player", Fs = "https://github.com/Mfuns-cn/mfunsPlayer/tree/v3-beta", Ps = [
  { name: "Minteea", id: "Minteea", link: "https://github.com/Minteea" },
  { name: "鲁迪钨丝", id: "Rudiusu", link: "https://github.com/Rudiusu" }
], Nt = {
  play: () => [],
  pause: () => [],
  ended: () => [],
  loadeddata: () => [],
  loadedmetadata: () => [],
  waiting: () => [],
  playing: () => [],
  canplay: () => [],
  canplaythrough: () => [],
  timeupdate: (s) => [s.currentTime],
  durationchange: (s) => [s.duration],
  progress: (s) => [s.buffered],
  seeking: (s) => [s.currentTime],
  seeked: (s) => [s.currentTime],
  volumechange: (s) => [s.volume, s.muted],
  ratechange: (s) => [s.playbackRate],
  enterpictureinpicture: () => [],
  leavepictureinpicture: () => []
};
class Hs {
  constructor(t, e) {
    this.ratio = null, this.info = {}, this.mediaController = null, this.player = t, this.$el = this.player.$content.appendChild(
      H("video", { class: `${r}-video` })
    ), this._attachEvent(this.$el), this.player.on("ended", () => {
      this.player.hook.call("end").then((i) => {
        i && this.player.emit("end");
      });
    });
  }
  /** 设置视频 */
  set(t, e, i) {
    this.player.hook.call("video.set", t).then(async (n) => {
      var a, l;
      if (n) {
        (l = (a = this.mediaController) == null ? void 0 : a.destroy) == null || l.call(a), this.mediaController = null, this.info = t, this.player.emit("videoChange", { ...t });
        let { url: o, type: h, live: c } = t;
        const u = { url: o, type: h, play: e, time: i, live: c };
        this.player.hook.call("video.beforeLoad", u).then(() => {
          u.url ? this.load(u) : this.player.throw(new Error("缺少视频播放信息"));
        });
      }
    });
  }
  /** 加载视频 */
  load(t) {
    this.player.hook.call("video.load", t).then((e) => {
      e ? (this.mediaController = this.player.loader.create(t, this.$el), this.player.emit("videoLoad", t)) : this.player.throw(new Error("视频加载失败"));
    });
  }
  /** 添加视频事件 */
  _attachEvent(t) {
    this.detachEventController = new AbortController();
    for (const e in Nt) {
      const i = Nt[e];
      t.addEventListener(
        e,
        () => {
          this.player.emit(
            e,
            ...i(t)
          );
        },
        { signal: this.detachEventController.signal }
      );
    }
  }
  bind(t) {
    var e;
    this.$el = t, (e = this.detachEventController) == null || e.abort(), this._attachEvent(t);
  }
  /** 获取播放信息 */
  getVideoInfo() {
    return {
      ...this.info
    };
  }
  /** 获取媒体信息 */
  getMediaInfo() {
    var t, e, i;
    return {
      url: (t = this.mediaController) == null ? void 0 : t.url,
      type: ((e = this.mediaController) == null ? void 0 : e.type) || "",
      live: ((i = this.mediaController) == null ? void 0 : i.live) || !1
    };
  }
}
class Ms {
  constructor(t) {
    this.initialized = !1, this.player = t;
  }
  get plugin() {
    return this.player.plugin;
  }
  /** 注册插件 */
  register(t, e) {
    var n, a, l, o;
    const i = typeof t == "function" ? new t(this.player) : t;
    (n = i.init) == null || n.call(i, this.player), t.pluginName && (this.player.plugin[t.pluginName] = i), console.log(t.pluginName), (a = i.apply) == null || a.call(i, this.player, e), this.initialized && ((l = i.ready) == null || l.call(i, this.player), (o = i.mounted) == null || o.call(i, this.player));
  }
  /** 批量注册插件 */
  pluginsRegister(t) {
    var e;
    (e = t.plugins) == null || e.forEach((i) => {
      this.register(i, t);
    }), this.pluginsReady();
  }
  /** 所有插件注册完毕后执行 */
  pluginsReady() {
    var t;
    if (!this.initialized) {
      for (const e in this.plugin) {
        const i = this.plugin[e];
        (t = i.ready) == null || t.call(i, this.player);
      }
      this.initialized = !0;
    }
  }
  /** 播放器挂载后执行 */
  playerMounted() {
    var t;
    for (const e in this.plugin) {
      const i = this.plugin[e];
      (t = i.mounted) == null || t.call(i, this.player);
    }
  }
  /** 销毁所有插件 */
  destroy() {
    var t;
    for (const e in this.plugin) {
      const i = this.plugin[e];
      (t = i.destroy) == null || t.call(i);
    }
  }
}
class Rs {
  constructor() {
    this.hooks = {};
  }
  /** 注册钩子 */
  register(t, e, i = !1) {
    let n = this.hooks[t];
    n || (n = [], this.hooks[t] = n), i ? n.unshift(e) : n.push(e);
  }
  /** 移除钩子 */
  unregister(t, e) {
    let i = this.hooks[t];
    i || (i = [], this.hooks[t] = i);
    const n = i.indexOf(e);
    n > -1 && i.splice(n, 1);
  }
  /** 调用钩子函数
   * @param name 钩子名称
   * @param ctx 钩子上下文
   * @param defaultFunc 钩子在正常遍历完毕后最终执行的钩子函数
   */
  async call(t, e, i) {
    const n = this.hooks[t];
    if (n != null && n.length)
      for (const a of n) {
        const l = await a(e);
        if (l == !0)
          return console.log(`钩子提前结束调用: ${t}`), console.log(a), !0;
        if (l == !1)
          return console.log(`钩子被拦截: ${t}`), console.log(a), !1;
      }
    return console.log(`钩子调用完毕: ${t}`), console.log(e), (i == null ? void 0 : i(e)) ?? !0;
  }
}
class Ns {
  constructor(t) {
    this.list = /* @__PURE__ */ new Map(), this.player = t;
  }
  /** 注册控制组件 */
  register(t, e) {
    this.list.set(t, typeof e == "function" ? this.build(e) : e);
  }
  /** 移除控制组件 */
  unregister(t) {
    this.list.delete(t);
  }
  /** 获取控制组件 */
  get(t) {
    let e;
    switch (typeof t) {
      case "object":
        e = t;
        break;
      case "function":
        e = this.build(t);
        break;
      default:
        e = this.list.get(t);
        break;
    }
    return e != null && e.ignored ? void 0 : e;
  }
  /** 创建控制组件 */
  build(t) {
    var i, n, a;
    const e = new t(this.player);
    return (i = e.init) == null || i.call(e, this.player), (n = e.ready) == null || n.call(e, this.player), (a = e.mounted) == null || a.call(e, this.player), e;
  }
}
class Bs {
  constructor(t) {
    this.list = /* @__PURE__ */ new Map(), this.player = t;
  }
  /** 注册面板 */
  register(t, e) {
    this.list.set(t, typeof e == "function" ? this.build(e) : e);
  }
  /** 移除面板 */
  unregister(t) {
    this.list.delete(t);
  }
  /** 获取面板 */
  get(t) {
    switch (typeof t) {
      case "object":
        return t;
      case "function":
        return this.build(t);
      default:
        return this.list.get(t);
    }
  }
  /** 创建面板 */
  build(t) {
    var i, n, a;
    const e = new t(this.player);
    return (i = e.init) == null || i.call(e, this.player), (n = e.ready) == null || n.call(e, this.player), (a = e.mounted) == null || a.call(e, this.player), e;
  }
}
class Is {
  constructor(t) {
    this.list = /* @__PURE__ */ new Map(), this.player = t;
  }
  /** 注册菜单项 */
  register(t, e) {
    this.list.set(t, typeof e == "function" ? this.build(e) : e);
  }
  /** 移除菜单项 */
  unregister(t) {
    this.list.delete(t);
  }
  /** 获取菜单项 */
  get(t) {
    switch (typeof t) {
      case "object":
        return t;
      case "function":
        return this.build(t);
      default:
        return this.list.get(t);
    }
  }
  /** 创建菜单项 */
  build(t) {
    var i, n, a;
    const e = new t(this.player);
    return (i = e.init) == null || i.call(e, this.player), (n = e.ready) == null || n.call(e, this.player), (a = e.mounted) == null || a.call(e, this.player), e;
  }
}
class qs {
  constructor(t) {
    this.list = /* @__PURE__ */ new Map(), this.player = t;
  }
  /** 注册加载器 */
  register(t, e) {
    this.list.set(t, e);
  }
  /** 移除加载器 */
  unregister(t) {
    this.list.delete(t);
  }
  /** 创建媒体控制实例 */
  create(t, e) {
    for (const [i, n] of this.list)
      if (n.check(t))
        return n.create(t, e);
    return this.createDefault(t, e);
  }
  /** 常规方式创建实例 */
  createDefault(t, e) {
    const { type: i, url: n, live: a, play: l, time: o } = t, h = {
      type: i || "",
      url: n,
      live: a || !1,
      mediaElement: e,
      destroy() {
        this.mediaElement.src = "";
      }
    }, c = o === !0 ? this.player.currentTime : o;
    return e.src = n, e.addEventListener(
      "loadeddata",
      () => {
        c && this.player.seek(c), l && this.player.play();
      },
      { once: !0 }
    ), h;
  }
}
class Os {
  constructor() {
    this.listeners = {}, this.onceListeners = {}, this.customEventList = [];
  }
  /** 添加监听 */
  on(t, e) {
    this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push(e);
  }
  /** 添加一次性监听 */
  once(t, e) {
    this.onceListeners[t] || (this.onceListeners[t] = []), this.onceListeners[t].push(e);
  }
  /** 移除监听 */
  off(t, e) {
    this.listeners[t] || (this.listeners[t] = []);
    const i = this.listeners[t].indexOf(e);
    i > -1 && this.listeners[t].splice(i, 1);
  }
  /** 触发事件 */
  emit(t, ...e) {
    var i, n;
    if ((i = this.listeners[t]) != null && i.length)
      for (let a = 0; a < this.listeners[t].length; a++)
        this.listeners[t][a](...e);
    if ((n = this.onceListeners[t]) != null && n.length) {
      for (let a = 0; a < this.onceListeners[t].length; a++)
        this.onceListeners[t][a](...e);
      this.onceListeners[t] = [];
    }
  }
}
const Pt = class ce {
  constructor(t) {
    this.hook = new Rs(), this.plugin = {}, this._eventEmitter = new Os(), this.Player = ce, this.container = t.container, this.$el = H("div", { class: `${r} mpui` }), this.$main = this.$el.appendChild(H("div", { class: `${r}-main` })), this.$area = this.$main.appendChild(H("div", { class: `${r}-area` })), this.$content = this.$area.appendChild(
      H("div", { class: `${r}-content` })
    ), this._pluginManager = new Ms(this), this._videoController = new Hs(this, t), this.loader = new qs(this), this.controls = new Ns(this), this.panel = new Bs(this), this.menu = new Is(this), this.init(t);
  }
  /** 初始化播放器 */
  async init(t) {
    this.on("videoChange", () => {
      this.$el.classList.add("is-start");
    }), this.$el.classList.add("is-paused"), this.on("play", () => {
      this.$el.classList.remove("is-start"), this.$el.classList.remove("is-paused");
    }), this.on("pause", () => {
      this.$el.classList.add("is-paused");
    }), this.on("waiting", () => {
      this.$el.classList.add("is-loading");
    }), this.on("playing", () => {
      this.$el.classList.remove("is-loading");
    }), this._pluginManager.pluginsRegister(t), this.container.appendChild(this.$el), this._pluginManager.playerMounted(), this.emit("mounted"), this._videoController.set(t.video, t.autoPlay, t.time);
  }
  /** 播放器视频元素 */
  get $video() {
    return this._videoController.$el;
  }
  /** 获取视频信息 */
  getVideoInfo() {
    return this._videoController.getVideoInfo();
  }
  /** 获取媒体信息 */
  getMediaInfo() {
    return this._videoController.getMediaInfo();
  }
  /** 获取播放器的媒体元素 */
  getMediaElement() {
    return this._videoController.$el;
  }
  /** 绑定媒体元素 */
  attachMediaElement(t) {
    this._videoController.bind(t);
  }
  /** 获取媒体控制实例 */
  getMediaController() {
    return this._videoController.mediaController;
  }
  /** 绑定媒体控制实例 */
  attachMediaController(t) {
    this._videoController.mediaController = t, this._videoController.bind(t.mediaElement);
  }
  /** 设置视频内容 */
  setVideo(t, e, i) {
    return this._videoController.set(t, e, i);
  }
  /** 加载视频源 */
  loadVideo(t) {
    return this._videoController.load(t);
  }
  // --- 播放切换控制 --- //
  /** 切换上一个 */
  prev() {
    this.hook.call("prev");
  }
  /** 切换下一个 */
  next() {
    this.hook.call("next");
  }
  // --- 视频播放控制 --- //
  /** 当前播放器暂停状态 */
  get paused() {
    return this.$video.paused;
  }
  /** 当前播放时间 */
  get currentTime() {
    return this.$video.currentTime;
  }
  /** 当前播放总时间 */
  get duration() {
    return this.$video.duration;
  }
  /** 当前播放音量 */
  get volume() {
    return this.$video.volume;
  }
  /** 当前静音状态 */
  get muted() {
    return this.$video.muted;
  }
  /** 当前播放速度 */
  get playbackRate() {
    return this.$video.playbackRate;
  }
  /** 当前视频循环 */
  get loop() {
    return this.$video.loop;
  }
  /** 开始播放 */
  play() {
    this.hook.call("play").then((t) => {
      t && this.$video.play();
    });
  }
  /** 暂停播放 */
  pause() {
    this.hook.call("pause").then((t) => {
      t && this.$video.pause();
    });
  }
  /** 跳转
   * @param time 跳转时间点（秒）
   */
  seek(t) {
    this.hook.call("seek").then((e) => {
      e && (this.$video.currentTime = Rt(t, 0, this.$video.duration));
    });
  }
  /** 设置音量
   * @param volume 音量（0-1）
   */
  setVolume(t) {
    this.$video.volume = Rt(t, 0, 1);
  }
  /** 静音 */
  setMuted(t) {
    this.$video.muted = t;
  }
  /** 设置倍速 */
  setPlaybackRate(t) {
    this.$video.playbackRate = t;
  }
  /** 设置视频循环 */
  setLoop(t) {
    this.$video.loop = t, this.emit("loopChange", t);
  }
  // --- 事件 --- //
  /** 监听事件 */
  on(t, e) {
    this._eventEmitter.on(t, e);
  }
  /** 取消监听事件 */
  off(t, e) {
    this._eventEmitter.off(t, e);
  }
  /** 一次性监听事件 */
  once(t, e) {
    this._eventEmitter.once(t, e);
  }
  /** 发送事件 */
  emit(t, ...e) {
    this._eventEmitter.emit(t, ...e);
  }
  define(t, e) {
    Object.defineProperty(this, t, typeof e == "function" ? { value: e } : e);
  }
  /** 抛出错误 */
  throw(t) {
    console.error(t), this.emit("error", t);
  }
  /** 播放器销毁 */
  destroy() {
    this._pluginManager.destroy();
  }
};
Pt.version = "3.0.0-dev";
Pt.gitHash = "e2f17a6";
let At = Pt;
console.log(
  `
 %c mfunsPlayer v3.0.0-dev e2f17a6 %c https://github.com/Mfuns-cn 

`,
  "color: #fff; background: #7b7ff7; padding:5px 0;",
  "background: #f5f5f5; padding:5px 0;"
);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var xt;
const bt = window, G = bt.trustedTypes, Bt = G ? G.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Dt = "$lit$", B = `lit$${(Math.random() + "").slice(9)}$`, de = "?" + B, zs = `<${de}>`, U = document, nt = () => U.createComment(""), rt = (s) => s === null || typeof s != "object" && typeof s != "function", ue = Array.isArray, Vs = (s) => ue(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", St = `[ 	
\f\r]`, Q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, It = /-->/g, qt = />/g, I = RegExp(`>|${St}(?:([^\\s"'>=/]+)(${St}*=${St}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ot = /'/g, zt = /"/g, pe = /^(?:script|style|textarea|title)$/i, Ws = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), p = Ws(1), at = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), Vt = /* @__PURE__ */ new WeakMap(), V = U.createTreeWalker(U, 129, null, !1);
function me(s, t) {
  if (!Array.isArray(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Bt !== void 0 ? Bt.createHTML(t) : t;
}
const Cs = (s, t) => {
  const e = s.length - 1, i = [];
  let n, a = t === 2 ? "<svg>" : "", l = Q;
  for (let o = 0; o < e; o++) {
    const h = s[o];
    let c, u, f = -1, x = 0;
    for (; x < h.length && (l.lastIndex = x, u = l.exec(h), u !== null); )
      x = l.lastIndex, l === Q ? u[1] === "!--" ? l = It : u[1] !== void 0 ? l = qt : u[2] !== void 0 ? (pe.test(u[2]) && (n = RegExp("</" + u[2], "g")), l = I) : u[3] !== void 0 && (l = I) : l === I ? u[0] === ">" ? (l = n ?? Q, f = -1) : u[1] === void 0 ? f = -2 : (f = l.lastIndex - u[2].length, c = u[1], l = u[3] === void 0 ? I : u[3] === '"' ? zt : Ot) : l === zt || l === Ot ? l = I : l === It || l === qt ? l = Q : (l = I, n = void 0);
    const _ = l === I && s[o + 1].startsWith("/>") ? " " : "";
    a += l === Q ? h + zs : f >= 0 ? (i.push(c), h.slice(0, f) + Dt + h.slice(f) + B + _) : h + B + (f === -2 ? (i.push(void 0), o) : _);
  }
  return [me(s, a + (s[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class lt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let a = 0, l = 0;
    const o = t.length - 1, h = this.parts, [c, u] = Cs(t, e);
    if (this.el = lt.createElement(c, i), V.currentNode = this.el.content, e === 2) {
      const f = this.el.content, x = f.firstChild;
      x.remove(), f.append(...x.childNodes);
    }
    for (; (n = V.nextNode()) !== null && h.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const f = [];
          for (const x of n.getAttributeNames())
            if (x.endsWith(Dt) || x.startsWith(B)) {
              const _ = u[l++];
              if (f.push(x), _ !== void 0) {
                const L = n.getAttribute(_.toLowerCase() + Dt).split(B), v = /([.?@])?(.*)/.exec(_);
                h.push({ type: 1, index: a, name: v[2], strings: L, ctor: v[1] === "." ? js : v[1] === "?" ? Gs : v[1] === "@" ? Ys : wt });
              } else
                h.push({ type: 6, index: a });
            }
          for (const x of f)
            n.removeAttribute(x);
        }
        if (pe.test(n.tagName)) {
          const f = n.textContent.split(B), x = f.length - 1;
          if (x > 0) {
            n.textContent = G ? G.emptyScript : "";
            for (let _ = 0; _ < x; _++)
              n.append(f[_], nt()), V.nextNode(), h.push({ type: 2, index: ++a });
            n.append(f[x], nt());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === de)
          h.push({ type: 2, index: a });
        else {
          let f = -1;
          for (; (f = n.data.indexOf(B, f + 1)) !== -1; )
            h.push({ type: 7, index: a }), f += B.length - 1;
        }
      a++;
    }
  }
  static createElement(t, e) {
    const i = U.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Y(s, t, e = s, i) {
  var n, a, l, o;
  if (t === at)
    return t;
  let h = i !== void 0 ? (n = e._$Co) === null || n === void 0 ? void 0 : n[i] : e._$Cl;
  const c = rt(t) ? void 0 : t._$litDirective$;
  return (h == null ? void 0 : h.constructor) !== c && ((a = h == null ? void 0 : h._$AO) === null || a === void 0 || a.call(h, !1), c === void 0 ? h = void 0 : (h = new c(s), h._$AT(s, e, i)), i !== void 0 ? ((l = (o = e)._$Co) !== null && l !== void 0 ? l : o._$Co = [])[i] = h : e._$Cl = h), h !== void 0 && (t = Y(s, h._$AS(s, t.values), h, i)), t;
}
class Us {
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
    const { el: { content: i }, parts: n } = this._$AD, a = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : U).importNode(i, !0);
    V.currentNode = a;
    let l = V.nextNode(), o = 0, h = 0, c = n[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let u;
        c.type === 2 ? u = new ht(l, l.nextSibling, this, t) : c.type === 1 ? u = new c.ctor(l, c.name, c.strings, this, t) : c.type === 6 && (u = new Ks(l, this, t)), this._$AV.push(u), c = n[++h];
      }
      o !== (c == null ? void 0 : c.index) && (l = V.nextNode(), o++);
    }
    return V.currentNode = U, a;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class ht {
  constructor(t, e, i, n) {
    var a;
    this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cp = (a = n == null ? void 0 : n.isConnected) === null || a === void 0 || a;
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
    t = Y(this, t, e), rt(t) ? t === P || t == null || t === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : t !== this._$AH && t !== at && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Vs(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== P && rt(this._$AH) ? this._$AA.nextSibling.data = t : this.$(U.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: i, _$litType$: n } = t, a = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = lt.createElement(me(n.h, n.h[0]), this.options)), n);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === a)
      this._$AH.v(i);
    else {
      const l = new Us(a, this), o = l.u(this.options);
      l.v(i), this.$(o), this._$AH = l;
    }
  }
  _$AC(t) {
    let e = Vt.get(t.strings);
    return e === void 0 && Vt.set(t.strings, e = new lt(t)), e;
  }
  T(t) {
    ue(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const a of t)
      n === e.length ? e.push(i = new ht(this.k(nt()), this.k(nt()), this, this.options)) : i = e[n], i._$AI(a), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class wt {
  constructor(t, e, i, n, a) {
    this.type = 1, this._$AH = P, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = P;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, n) {
    const a = this.strings;
    let l = !1;
    if (a === void 0)
      t = Y(this, t, e, 0), l = !rt(t) || t !== this._$AH && t !== at, l && (this._$AH = t);
    else {
      const o = t;
      let h, c;
      for (t = a[0], h = 0; h < a.length - 1; h++)
        c = Y(this, o[i + h], e, h), c === at && (c = this._$AH[h]), l || (l = !rt(c) || c !== this._$AH[h]), c === P ? t = P : t !== P && (t += (c ?? "") + a[h + 1]), this._$AH[h] = c;
    }
    l && !n && this.j(t);
  }
  j(t) {
    t === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class js extends wt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === P ? void 0 : t;
  }
}
const Xs = G ? G.emptyScript : "";
class Gs extends wt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== P ? this.element.setAttribute(this.name, Xs) : this.element.removeAttribute(this.name);
  }
}
class Ys extends wt {
  constructor(t, e, i, n, a) {
    super(t, e, i, n, a), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = Y(this, t, e, 0)) !== null && i !== void 0 ? i : P) === at)
      return;
    const n = this._$AH, a = t === P && n !== P || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, l = t !== P && (n === P || a);
    a && this.element.removeEventListener(this.name, this, n), l && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ks {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Y(this, t);
  }
}
const Wt = bt.litHtmlPolyfillSupport;
Wt == null || Wt(lt, ht), ((xt = bt.litHtmlVersions) !== null && xt !== void 0 ? xt : bt.litHtmlVersions = []).push("2.8.0");
const $ = (s, t, e) => {
  var i, n;
  const a = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let l = a._$litPart$;
  if (l === void 0) {
    const o = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : null;
    a._$litPart$ = l = new ht(t.insertBefore(nt(), o), o, void 0, e ?? {});
  }
  return l._$AI(s), l;
};
class Qs {
  constructor({
    el: t,
    getData: e,
    itemHeight: i,
    createItem: n,
    overflow: a = 0
  }) {
    this.data = [], this.scrollTop = 0, this.renderStart = -1, this.renderEnd = -1, this.viewStart = 0, this.viewEnd = 0, this.throttle = !1, this.cleared = !1, this.$el = t, this.getData = e, this.itemHeight = i, this.createItem = n, this.overflow = a, this.renderStart = -1, this.renderEnd = -1, this.viewStart = 0, this.viewEnd = 0, this.throttle = !1, this.cleared = !1, this.$el.classList.add("vlist-container"), this.$content = document.createElement("div"), this.$content.classList.add("vlist-content"), this.$el.appendChild(this.$content), this.$el.addEventListener("scroll", () => {
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
    const i = this.renderStart, n = this.renderEnd;
    if (this.renderStart = this.getViewStart(e) - this.overflow, this.renderEnd = this.getViewEnd(e, t) + this.overflow, this.renderStart < i) {
      const a = document.createDocumentFragment(), l = Math.max(this.renderStart, 0), o = Math.min(i - 1, this.renderEnd, this.data.length - 1);
      for (let h = l; h <= o; h++)
        a.appendChild(this.createItem(this.data[h], h, this.data));
      this.$content.insertBefore(a, this.$content.firstElementChild);
    } else {
      const a = Math.max(i, 0), l = Math.min(this.renderStart - 1, n);
      for (let o = a; o <= l; o++) {
        const h = this.$content.firstElementChild;
        h && this.$content.removeChild(h);
      }
    }
    if (this.renderEnd > n) {
      const a = document.createDocumentFragment(), l = Math.max(n + 1, this.renderStart), o = Math.min(this.renderEnd, this.data.length - 1);
      for (let h = l; h <= o; h++)
        a.appendChild(this.createItem(this.data[h], h, this.data));
      this.$content.appendChild(a);
    } else {
      const a = Math.min(n, this.data.length - 1), l = Math.max(this.renderEnd + 1, i);
      for (let o = a; o >= l; o--) {
        const h = this.$content.lastElementChild;
        h && this.$content.removeChild(h);
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
class w {
  constructor(t) {
    this.player = t, this.plugin = t.plugin, this.throw = t.throw;
  }
}
class ve extends w {
  constructor(t, e) {
    super(t), this.$el = e;
  }
  $(t) {
    return this.$el.querySelector(t);
  }
}
class F extends ve {
  apply(t, e) {
    t.controls.register(this.name, this);
  }
  show() {
    this.$el.style.display = "";
  }
  hide() {
    this.$el.style.display = "none";
  }
}
class ct extends ve {
  constructor(t, e) {
    super(t, e), this.shown = !1;
  }
  apply(t, e) {
    t.panel.register(this.name, this);
  }
  /** 挂载 */
  mount(t, e) {
    t.appendChild(this.$el), this.unmount(), this.onToggle = e == null ? void 0 : e.onToggle, this.onUnmount = e == null ? void 0 : e.onUnmount;
  }
  /** 卸载 */
  unmount() {
    var t;
    this.toggle(!1), (t = this.onUnmount) == null || t.call(this), this.onToggle = void 0, this.onUnmount = void 0;
  }
  /** 切换显示隐藏状态 */
  toggle(t) {
    var e;
    this.shown = t ?? !this.shown, (e = this.onToggle) == null || e.call(this, this.shown);
  }
}
const Zs = (s) => p`
  <div class="${r}-danmakulist">
    <div class="${r}-danmakulist-main">
      <div class="${r}-danmakulist-head">
        <div class="list-column col-time">时间</div>
        <div class="list-column col-content">弹幕内容</div>
        <div class="list-column col-date">发送时间</div>
      </div>
      <div class="${r}-danmakulist-select">
        <div class="${r}-danmakulist-select-info"></div>
        <div class="${r}-danmakulist-select-operate">
          <div class="list-operate-btn" @click=${s}>取消选择</div>
        </div>
      </div>
      <div class="${r}-danmakulist-container"></div>
      <div class="${r}-danmakulist-status">
        <div class="status-loading-text">弹幕列表装填中……</div>
        <div class="status-failed-text">弹幕加载失败 X_X</div>
        <div class="status-empty-text">还没有弹幕哦，快来发弹幕^_^</div>
      </div>
    </div>
    <div class="${r}-danmakulist-foot">
      <div class="${r}-danmakulist-foot-left">
        <span class="${r}-danmakulist-autoscroll">列表滚动[关]</span>
      </div>
      <div class="${r}-danmakulist-foot-right"></div>
    </div>
  </div>
`, Js = (s, t, {
  operation: e,
  onClick: i,
  onDblclick: n,
  selected: a,
  focused: l,
  title: o
}) => {
  const h = p`
    <div
      class="${`list-row ${a(s) ? "is-selected" : ""} ${l(s) ? "is-focused" : ""}`.trim()}"
      data-index="${t}"
      data-mode="${s.mode}"
      @dblclick=${(u) => {
    n(u, s);
  }}
      @click=${(u) => {
    i(u, s);
  }}
      title="${o(s)}"
    >
      <div class="list-cell col-time">${z(s.time)}</div>
      <div class="list-cell col-content">${s.content}</div>
      <div class="list-cell col-date">
        ${s.date ? he(new Date(s.date * 1e3), "yy-MM-dd HH:mm") : "-"}
      </div>
      ${e.length ? p`<div class="list-operate" title="">
            ${e(s).map(
    ([u, f]) => p`<div
                class="list-operate-btn"
                @click=${(x) => {
      x.stopPropagation(), f(s);
    }}
              >
                ${u}
              </div>`
  )}
          </div>` : ""}
    </div>
  `, c = new DocumentFragment();
  return $(h, c), c.firstElementChild;
};
class ge extends ct {
  constructor(t) {
    const e = new DocumentFragment();
    $(
      Zs(() => this.select([])),
      e
    ), super(t, e.querySelector(`.${r}-danmakulist`)), this.name = "danmakuList", this.title = "弹幕列表", this.data = [], this.selected = [], this.focused = null, this.sortedBy = "time", this.sortOrder = -1, this.autoScroll = !0, this.frozen = !1, this.player = t, this.danmaku = t.plugin.danmaku, this.$main = this.$(`.${r}-danmakulist-main`), this.$container = this.$(`.${r}-danmakulist-container`), this.$status = this.$(`.${r}-danmakulist-status`), this.$colTime = this.$(".col-time"), this.$colDate = this.$(".col-date"), this.$colContent = this.$(".col-content"), this.$autoscroll = this.$(`.${r}-danmakulist-autoscroll`), this.$select = this.$(`.${r}-danmakulist-select`), this.$selectInfo = this.$(`.${r}-danmakulist-select-info`), this.$colTime.onclick = () => {
      this.setAutoScroll(!1), this.sortedBy == "time" ? this.sort("time", -this.sortOrder) : this.sort("time", 1);
    }, this.$colDate.onclick = () => {
      this.setAutoScroll(!1), this.sortedBy == "date" ? this.sort("date", -this.sortOrder) : this.sort("date", 1);
    }, this.$colContent.onclick = () => {
      this.setAutoScroll(!1), this.sortedBy == "content" ? this.sort("content", -this.sortOrder) : this.sort("content", 1);
    }, this.$autoscroll.onclick = () => {
      this.setAutoScroll(!this.autoScroll);
    }, this.player.on("danmakuList:autoScrollChange", (i) => {
      i ? this.$autoscroll.innerText = "列表滚动[开]" : this.$autoscroll.innerText = "列表滚动[关]";
    }), this.autoScroll && this.player.emit("danmakuList:autoScrollChange", !0), this.player.on("danmakuList:select", (i) => {
      const n = i.length;
      this.$selectInfo.innerText = n ? `已选择${n}条弹幕` : "", this.$select.classList.toggle("is-show", n > 1);
    });
  }
  mount(t, e) {
    var n;
    super.mount(t, e);
    const i = (n = this.list) == null ? void 0 : n.scrollTop;
    console.log("mountpos: " + i), requestAnimationFrame(() => {
      var a;
      i != null && ((a = this.list) == null || a.scrollTo(i)), -this.autoScroll && this.locateByTime(this.player.currentTime);
    });
  }
  toggle(t) {
    var e, i;
    if (super.toggle(t), this.shown) {
      const n = (e = this.list) == null ? void 0 : e.scrollTop;
      n != null && ((i = this.list) == null || i.scrollTo(n)), this.autoScroll && this.locateByTime(this.player.currentTime);
    }
  }
  init() {
    var n;
    const t = (n = this.plugin.danmaku) == null ? void 0 : n.invoke, e = this.plugin.danmakuOperate;
    this.list = new Qs({
      el: this.$container,
      getData: () => this.data,
      itemHeight: 24,
      createItem: (a, l) => Js(a, l, {
        operation: (o) => {
          const h = this.player.userId && o.user == this.player.userId;
          return [
            [
              "举报",
              (c) => {
                e == null || e.report(c);
              },
              !h && (t == null ? void 0 : t.report)
            ],
            [
              "屏蔽",
              (c) => {
                e == null || e.blockUser(c.user, !0);
              },
              !h && (t == null ? void 0 : t.blockUser)
            ],
            [
              "撤回",
              (c) => {
                e == null || e.recall(c);
              },
              h && (t == null ? void 0 : t.recall)
            ]
          ].filter((c) => c[2]);
        },
        onClick: (o, h) => {
          this.clickSelect(h, o.shiftKey, o.ctrlKey);
        },
        onDblclick: (o, h) => {
          this.player.seek(h.time);
        },
        selected: (o) => this.selected.includes(o),
        focused: (o) => this.focused == o,
        title: (o) => `${o.content}
${a.date ? he(new Date(a.date * 1e3), "yyyy-MM-dd HH:mm:ss") : "-"} @ ${z(a.time, !1)}`
      }),
      overflow: 5
    });
    const i = oe(() => {
      this.frozen = !1;
    }, 5e3);
    this.list.$el.addEventListener("wheel", () => {
      this.frozen = !0, i();
    }), this.list.$el.addEventListener("mousedown", () => {
      this.frozen = !0, i();
    }), this.$main.addEventListener("mouseleave", () => {
      this.frozen = !1;
    }), this.player.on("videoChange", () => {
      this.clear();
    }), this.player.on("danmaku:add", (a) => {
      this.fill(a), this.autoScroll && this.sort("time");
    }), this.player.on("timeupdate", (a) => {
      this.autoScroll && !this.frozen && this.locateByTime(a);
    }), this.player.on("danmaku:select", (a) => {
      this.locateByDanmaku(a), this.select([a]);
    });
  }
  /** 弹幕列表排序 */
  sort(t, e = 1) {
    this.sortedBy = t, this.sortOrder = e, this.data.sort((i, n) => {
      const a = i[this.sortedBy], l = n[this.sortedBy];
      return a > l ? e : a == l ? 0 : -e;
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
    this.sort(this.sortedBy, this.sortOrder), this.autoScroll && this.locateByTime(this.player.currentTime);
  }
  clear() {
    this.list.clear(), this.data = [], this.setStatus("loading");
  }
  setStatus(t = "") {
    this.$status.dataset.status = t, console.log("弹幕加载状态" + t);
  }
  /** 根据播放时间定位 */
  locateByTime(t) {
    var i, n;
    let e = this.list.viewEnd;
    for (((i = this.data[e]) == null ? void 0 : i.time) > t && (e = 0); ((n = this.data[e + 1]) == null ? void 0 : n.time) <= t; )
      e++;
    this.list.locateEnd(e);
  }
  /** 定位弹幕 */
  locateByDanmaku(t) {
    const e = this.data.indexOf(t);
    e > -1 && (this.list.locateStart(e), this.frozen = !0);
  }
  setAutoScroll(t) {
    this.player.emit("danmakuList:autoScrollChange", t), this.autoScroll = t, t && (this.frozen = !1, this.sort("time"), this.locateByTime(this.player.currentTime), this.list.handleScroll());
  }
  /** 设置选定状态 */
  select(t, e) {
    this.selected = t;
    const i = [];
    this.focused = e || (t.length == 1 ? t[0] : null);
    const n = this.data.indexOf(this.focused);
    t.forEach((a) => {
      const l = this.data.indexOf(a);
      i.push(l);
    });
    for (const a of this.list.$content.children)
      a.classList.toggle(
        "is-selected",
        i.includes(Number(a.dataset.index))
      ), a.classList.toggle(
        "is-focused",
        n == Number(a.dataset.index)
      );
    this.player.emit("danmakuList:select", this.selected);
  }
  /** 设置某条弹幕的选定状态，若选定则聚焦弹幕，否则取消聚焦 */
  toggleSelect(t, e) {
    const i = this.list.$content.querySelector(
      `[data-index="${this.data.indexOf(this.focused)}"]`
    ), n = this.list.$content.querySelector(`[data-index="${this.data.indexOf(t)}"]`);
    if (e)
      this.selected.includes(t) || this.selected.push(t), this.focused = t, n == null || n.classList.add("is-selected"), n == null || n.classList.add("is-focused");
    else if (!e) {
      const a = this.selected.indexOf(t);
      a > -1 && this.selected.splice(a, 1), n == null || n.classList.remove("is-selected"), i == null || i.classList.remove("is-focused");
    }
    this.player.emit("danmakuList:select", this.selected);
  }
  /** 单击选定弹幕 */
  clickSelect(t, e, i) {
    if (e)
      if (this.focused) {
        const n = this.data.indexOf(t), a = this.data.indexOf(this.focused);
        if (n == -1 || a == -1)
          this.select([t]);
        else {
          const l = n < a ? n : a, o = (n < a ? a : n) + 1;
          this.select(this.data.slice(l, o), this.focused);
        }
      } else
        this.select([t]);
    else
      i ? this.toggleSelect(t, !this.selected.includes(t)) : this.selected.length == 1 && this.selected[0] == t ? this.select([]) : this.select([t]);
  }
}
ge.pluginName = "danmakuList";
const ti = (s) => p`
  <div class="${r}-hotkeys">
    <div class="${r}-hotkeys-list">
      ${s.map(
  ({ key: t, description: e }) => p`
          <div class="${r}-hotkeys-list-item">
            <div class="${r}-hotkeys-list-key">${t}</div>
            <div class="${r}-hotkeys-list-description">${e}</div>
          </div>
        `
)}
    </div>
  </div>
`;
class $e extends ct {
  constructor(t) {
    const e = [
      { key: "Space", description: "播放/暂停" },
      { key: "→", description: "快进5秒" },
      { key: "←", description: "快退5秒" },
      { key: "↑", description: "音量增加10%" },
      { key: "↓", description: "音量降低10%" }
    ], i = new DocumentFragment();
    $(ti(e), i), super(t, i.querySelector(`.${r}-hotkeys`)), this.name = "hotkeyInfo", this.title = "快捷键说明";
  }
}
$e.pluginName = "hotkeyInfo";
const ei = () => p`
  <div class="${r}-about">
    <div class="${r}-about-logo"></div>
    <div class="${r}-about-version">version ${At.version}-${At.gitHash}</div>
    <div>github：<a href="${Fs}" target="_blank">mfuns-cn/mfunsPlayer</a></div>
    <div>开发者：</div>
    <ul class="${r}-about-developers">
      ${Ps.map(
  ({ name: s, link: t }) => p`
          <li>
            <a href="${t}" target="_blank">${s}</a>
          </li>
        `
)}
      <li></li>
    </ul>
  </div>
`;
class fe extends ct {
  constructor(t) {
    const e = new DocumentFragment();
    $(ei(), e), super(t, e.querySelector(`.${r}-about`)), this.name = "about", this.title = "关于";
  }
}
fe.pluginName = "about";
const si = () => p`
  <div class="${r}-contextmenu">
    <ul class="${r}-contextmenu-list mpui-black"></ul>
  </div>
`;
class ye extends w {
  constructor(t) {
    super(t), this.list = [], this.isShow = !1, this.player = t, this.container = H("div", { class: `${r}-contextmenu-wrap` }), $(si(), this.container), this.$el = this.container.querySelector(`.${r}-contextmenu`), this.$list = this.$el.querySelector(`.${r}-contextmenu-list`), this.player.$main.appendChild(this.container);
  }
  apply(t, e) {
    var i;
    this.list = ((i = e.contextMenu) == null ? void 0 : i.list) || [];
  }
  setMenu(t) {
    this.$list.innerHTML = "";
    const e = new DocumentFragment();
    t.forEach((i) => {
      const n = H("li", { class: `${r}-contextmenu-item` });
      i.onClick && (n.onclick = () => {
        var l;
        (l = i.onClick) == null || l.call(i, this.player);
      });
      let a;
      typeof i.content == "function" ? a = i.content(this.player) : a = i.content, typeof a == "object" ? n.appendChild(a) : n.innerText = a, e.appendChild(n);
    }), this.$list.appendChild(e);
  }
  init() {
    this.player.$area.addEventListener("contextmenu", (t) => {
      t.preventDefault();
      const e = this.player.$area.getBoundingClientRect(), i = t.clientX - e.left, n = t.clientY - e.top;
      this.show(i, n);
    }), this.container.addEventListener("contextmenu", (t) => {
      t.preventDefault();
      const e = this.container.getBoundingClientRect(), i = t.clientX - e.left, n = t.clientY - e.top;
      this.show(i, n);
    }), document.addEventListener("click", () => {
      this.isShow && this.hide();
    });
  }
  show(t, e) {
    this.container.classList.add("is-show");
    const i = this.player.$area.getBoundingClientRect();
    t + this.$el.offsetWidth >= i.width ? (this.$el.style.right = i.width - t + "px", this.$el.style.left = "initial") : (this.$el.style.left = t + "px", this.$el.style.right = "initial"), e + this.$el.offsetHeight >= i.height ? (this.$el.style.bottom = i.height - e + "px", this.$el.style.top = "initial") : (this.$el.style.top = e + "px", this.$el.style.bottom = "initial"), this.isShow = !0, this.player.emit("contextMenuShow", t, e);
  }
  hide() {
    this.container.classList.remove("is-show"), this.isShow = !1, this.player.emit("contextMenuHide");
  }
}
ye.pluginName = "contextMenu";
const ii = () => p`
  <div class="${r}-controller-mask"></div>
  <div class="${r}-controller mpui-black">
    <div class="${r}-controller-top"></div>
    <div class="${r}-controller-content">
      <div class="${r}-controller-left"></div>
      <div class="${r}-controller-center"></div>
      <div class="${r}-controller-right"></div>
    </div>
  </div>
`;
class be extends w {
  constructor(t) {
    super(t), this.isHover = !1, this.controls = {}, this.player = t, this.container = document.createElement("div"), this.container.className = `${r}-controller-wrap`;
    const e = new DocumentFragment();
    $(ii(), e), this.$el = e.querySelector(`.${r}-controller`), this.$top = this.$el.querySelector(`.${r}-controller-top`), this.$content = this.$el.querySelector(`.${r}-controller-content`), this.$left = this.$el.querySelector(`.${r}-controller-left`), this.$center = this.$el.querySelector(`.${r}-controller-center`), this.$right = this.$el.querySelector(`.${r}-controller-right`), this.player.$main.append(this.container), this.inactiveHook = () => !this.isHover && void 0, this.mouseEnterHandler = () => {
      this.isHover = !0;
    }, this.mouseLeaveHandler = () => {
      this.isHover = !1;
    }, this.container.appendChild(e);
  }
  init() {
    this.player.hook.register("inactive", this.inactiveHook), this.container.addEventListener("mouseenter", this.mouseEnterHandler), this.container.addEventListener("mouseleave", this.mouseLeaveHandler);
  }
  apply(t, e) {
    var i;
    this.controls = ((i = e.controller) == null ? void 0 : i.controls) || {};
  }
  ready() {
    this.setControls(this.controls);
  }
  /** 更新控制组件 */
  setControls(t) {
    const { left: e, center: i, right: n, top: a } = t;
    this.build(this.$left, e), this.build(this.$center, i), this.build(this.$right, n), this.build(this.$top, a);
  }
  build(t, e) {
    t.innerHTML = "";
    const i = new DocumentFragment();
    e == null || e.forEach((n) => {
      var l;
      const a = (l = this.player.controls.get(n)) == null ? void 0 : l.$el;
      a && i.appendChild(a);
    }), t.appendChild(i);
  }
  destroy() {
    this.player.hook.unregister("inactive", this.inactiveHook), this.container.removeEventListener("mouseenter", this.mouseEnterHandler), this.container.removeEventListener("mouseleave", this.mouseLeaveHandler);
  }
}
be.pluginName = "controller";
const ni = p`
  <div class="${r}-controls-button ${r}-button-play is-paused">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-play"></i>
      <i class="mpicon-pause"></i>
    </div>
    <div class="mpui-tooltip">播放</div>
  </div>
`;
class we extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(ni, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "play", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("pause", () => {
      this._change(!1);
    }), this.player.on("play", () => {
      this._change(!0);
    }), this.player.on("videoChange", () => {
      this._change(!1);
    }), this.$icon.addEventListener("click", () => {
      this.player.paused ? this.player.play() : this.player.pause();
    });
  }
  /** 设置按钮状态 */
  _change(t) {
    this.$el.classList.toggle("is-on", t), this.$tooltip.innerText = t ? "暂停" : "播放";
  }
}
we.pluginName = "buttonPlay";
const ri = p`
  <div class="${r}-controls-button ${r}-button-prev is-autohide is-disabled">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-prev"></i>
    </div>
    <div class="mpui-tooltip">上一P</div>
  </div>
`;
class ke extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(ri, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "prev", this.singleHide = !0, this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  apply(t, e) {
    var i;
    super.apply(t, e), this.singleHide = ((i = e.switchButton) == null ? void 0 : i.singleHide) ?? !0;
  }
  init() {
    this.$icon.addEventListener("click", () => {
      this.player.prev();
    }), this.player.on("videoChange", (t) => {
      const { hasNext: e, hasPrev: i } = t;
      this.setDisabled(!i), this.$el.classList.toggle("is-hidden", this.singleHide && !i && !e);
    });
  }
  setDisabled(t) {
    this.$el.classList.toggle("is-disabled", t);
  }
  /** 自动隐藏上一个/下一个按钮 */
  setAutoHide(t) {
    this.$el.classList.toggle("is-autohide", t);
  }
  get disabled() {
    return this.$el.classList.contains("is-disabled");
  }
}
ke.pluginName = "buttonPrev";
const ai = p`
  <div class="${r}-controls-button ${r}-button-next is-autohide is-disabled">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-next"></i>
    </div>
    <div class="mpui-tooltip">下一P</div>
  </div>
`;
class xe extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(ai, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "next", this.singleHide = !0, this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  apply(t, e) {
    var i;
    super.apply(t, e), this.singleHide = ((i = e.switchButton) == null ? void 0 : i.singleHide) ?? !0;
  }
  init(t) {
    this.$icon.addEventListener("click", () => {
      this.player.next();
    }), this.player.on("videoChange", (e) => {
      const { hasNext: i, hasPrev: n } = e;
      this.setDisabled(!i), this.$el.classList.toggle("is-hidden", this.singleHide && !n && !i);
    });
  }
  setDisabled(t) {
    this.$el.classList.toggle("is-disabled", t);
  }
  /** 自动隐藏上一个/下一个按钮 */
  setAutoHide(t) {
    this.$el.classList.toggle("is-autohide", t);
  }
  get disabled() {
    return this.$el.classList.contains("is-disabled");
  }
}
xe.pluginName = "buttonNext";
const li = p`
  <div class="${r}-videotime">
    <div class="${r}-videotime-label">
      <span class="${r}-videotime-current">00:00</span>
      <span class="${r}-videotime-divider">/</span>
      <span class="${r}-videotime-total">00:00</span>
    </div>
    <input class="${r}-videotime-input mpui-input" />
  </div>
`;
class Se extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(li, e), super(t, e.querySelector(`.${r}-videotime`)), this.name = "time", this.valueBeforeEdited = "", this.$label = this.$(`.${r}-videotime-label`), this.$current = this.$(`.${r}-videotime-current`), this.$total = this.$(`.${r}-videotime-total`), this.$input = this.$(`.${r}-videotime-input`);
  }
  init() {
    this.player.on("timeupdate", (t) => {
      this.$current.innerText = z(t);
    }), this.player.on("seeking", (t) => {
      this.$current.innerText = z(t);
    }), this.player.on("durationchange", (t) => {
      this.$total.innerText = z(t);
    }), this.$label.addEventListener("click", () => {
      this.$el.classList.add("is-input"), this.$input.value = z(this.player.currentTime), this.valueBeforeEdited = this.$input.value, this.$input.focus();
    }), this.$input.addEventListener("blur", () => {
      const t = this.$input.value;
      t != this.valueBeforeEdited && (this.player.seek(Mt(t)), this.player.play()), this.exitInput();
    }), this.$input.addEventListener("keydown", (t) => {
      const e = t || window.event;
      e.keyCode == 13 && (this.player.seek(Mt(this.$input.value)), this.player.play(), this.exitInput()), e.keyCode == 27 && this.exitInput();
    });
  }
  /** 退出输入模式 */
  exitInput() {
    this.$el.classList.remove("is-input"), this.$input.value = "", this.valueBeforeEdited = "";
  }
}
Se.pluginName = "videoTime";
const oi = p`
  <div class="${r}-controls-button ${r}-button-loop">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-loop-off"></i>
      <i class="mpicon-loop"></i>
    </div>
    <div class="mpui-tooltip">洗脑循环</div>
  </div>
`;
class Ee extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(oi, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "loop", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("loopChange", (t) => {
      this.$el.classList.toggle("is-on", t), this.$tooltip.innerText = t ? "关闭洗脑循环" : "洗脑循环";
    }), this.$icon.addEventListener("click", () => {
      this.player.loop ? this.player.setLoop(!1) : this.player.setLoop(!0);
    });
  }
}
Ee.pluginName = "buttonLoop";
const hi = p`
  <div class="${r}-controls-button ${r}-button-part">
    <div class="${r}-controls-button-icon">
      <div class="${r}-controls-button-text">P0</div>
    </div>
    <div class="mpui-tooltip">分P列表</div>
  </div>
`;
class Le extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(hi, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "part", this.$icon = this.$(`.${r}-controls-button-icon`), this.$text = this.$(`.${r}-controls-button-text`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.$icon.addEventListener("click", () => {
      var t;
      (t = this.plugin.partList) == null || t.toggle();
    }), this.player.on("videoChange", (t) => {
      var e;
      this.$text.innerText = `P${t.part}`, this.$el.classList.toggle("is-show", (((e = t.list) == null ? void 0 : e.length) || 1) > 1);
    });
  }
}
Le.pluginName = "buttonPart";
const ci = ({ divider: s }) => p` <div
  class="mpui-slider mpui-slider-horizontal"
  style="position: relative; width: 100%; height: 100%"
>
  <div
    class="mpui-slider-track"
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
    <div class="mpui-slider-bar" style="position: absolute; left: 0; height: 100%"></div>
    <div class="mpui-slider-thumb-track" style="height: 0px">
      <div
        class="mpui-slider-thumb"
        style="position: absolute; transform: translate(-50%, -50%)"
      ></div>
      ${s ? p`
            <div class="mpui-slider-divider">
              ${J(s, p`<div class="mpui-slider-divider-dot"></div>`)}
            </div>
          ` : ""}
    </div>
  </div>
</div>`;
class dt {
  constructor({
    container: t,
    min: e,
    max: i,
    step: n,
    divider: a = 0,
    value: l = 0,
    onChange: o,
    onDragStart: h,
    onDragEnd: c,
    onDrag: u
  }) {
    this.container = t, this.min = e, this.max = i, this.step = n || 0, this.divider = a ? typeof a == "boolean" ? this.step : a : 0, this.value = isNaN(l) ? l : Number(l), this.onChange = o, this.onDragStart = h, this.onDragEnd = c, this.onDrag = u, $(ci({ divider: this.divider }), t), this.$el = this.container.querySelector(".mpui-slider"), this.$track = this.$el.querySelector(".mpui-slider-track"), this.$bar = this.$track.querySelector(".mpui-slider-bar"), this.$thumbTrack = this.$track.querySelector(".mpui-slider-thumb-track"), this.$thumb = this.$track.querySelector(".mpui-slider-thumb"), this.$el.addEventListener("mousedown", (f) => {
      var k;
      const x = f, { clientX: _ } = x, L = this.$track.offsetWidth;
      let v = this.$thumbTrack.offsetWidth;
      v = v || L;
      const m = (L - v) / 2, d = this.$el.getBoundingClientRect().left;
      let g = _ - d - m;
      g = g >= v ? v : g <= 0 ? 0 : g;
      const E = this.step ? Math.round(g / v * (this.max - this.min) / this.step) * this.step + this.min : g / v * (this.max - this.min) + this.min;
      (k = this.onDragStart) == null || k.call(this, E), this.value != E && this.drag(E);
      const b = (S) => {
        var K;
        const A = S, { clientX: y } = A;
        A.preventDefault(), A.stopPropagation();
        let D = y - d - m;
        D = D >= v ? v : D <= 0 ? 0 : D;
        const M = this.step ? Math.round(D / v * (this.max - this.min) / this.step) * this.step + this.min : D / v * (this.max - this.min) + this.min;
        this.value != M && this.drag(M), (K = window.getSelection()) == null || K.removeAllRanges();
      }, T = (S) => {
        var y, D;
        S.stopPropagation(), (y = window.getSelection()) == null || y.removeAllRanges(), document.removeEventListener("mousemove", b), document.removeEventListener("mouseup", T), (D = this.onDragEnd) == null || D.call(this, E);
      };
      document.addEventListener("mousemove", b), document.addEventListener("mouseup", T);
    }), this.setValue(this.value);
  }
  /** 设置滑动条值 */
  setValue(t) {
    var i;
    this.value = t <= this.min ? this.min : t >= this.max ? this.max : t;
    const e = (this.value - this.min) / (this.max - this.min);
    this.$thumb.style.left = `${e * 100}%`, this.$bar.style.width = `${e * 100}%`, (i = this.onChange) == null || i.call(this, this.value);
  }
  /** 拖动滑动条到特定的值 */
  drag(t) {
    var e;
    this.setValue(t), (e = this.onDrag) == null || e.call(this, this.value);
  }
}
const di = () => p`
  <div
    class="mpui-slider mpui-slider-vertical"
    style="position: relative; width: 100%; height: 100%"
  >
    <div
      class="mpui-slider-track"
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
      <div class="mpui-slider-bar" style="position: absolute; bottom: 0; width: 100%"></div>
      <div class="mpui-slider-thumb-track" style="width: 0px">
        <div
          class="mpui-slider-thumb"
          style="position: absolute; transform: translate(-50%, -50%)"
        ></div>
      </div>
    </div>
  </div>
`;
class ui {
  constructor({
    container: t,
    min: e,
    max: i,
    step: n,
    value: a = 0,
    onChange: l,
    onDragStart: o,
    onDragEnd: h,
    onDrag: c
  }) {
    this.container = t, this.min = e, this.max = i, this.step = n || 0, this.value = isNaN(a) ? a : Number(a), this.onChange = l, this.onDragStart = o, this.onDragEnd = h, this.onDrag = c, $(di(), t), this.$el = this.container.querySelector(".mpui-slider"), this.$track = this.$el.querySelector(".mpui-slider-track"), this.$bar = this.$track.querySelector(".mpui-slider-bar"), this.$thumbTrack = this.$track.querySelector(".mpui-slider-thumb-track"), this.$thumb = this.$track.querySelector(".mpui-slider-thumb"), this.$el.addEventListener("mousedown", (u) => {
      var T;
      const f = u, { clientY: x } = f, _ = this.$track.offsetHeight;
      let L = this.$thumbTrack.offsetHeight;
      L = L || _;
      const v = (_ - L) / 2, m = this.$el.getBoundingClientRect().top;
      let d = L - (x - m - v);
      d = d >= L ? L : d <= 0 ? 0 : d;
      const g = this.step ? Math.round(d / L * (this.max - this.min) / this.step) * this.step + this.min : d / L * (this.max - this.min) + this.min;
      (T = this.onDragStart) == null || T.call(this, g), this.value != g && this.drag(g);
      const E = (k) => {
        var M;
        const S = k, { clientY: A } = S;
        S.preventDefault(), S.stopPropagation();
        let y = L - (A - m - v);
        y = y >= L ? L : y <= 0 ? 0 : y;
        const D = this.step ? Math.round(y / L * (this.max - this.min) / this.step) * this.step + this.min : y / L * (this.max - this.min) + this.min;
        this.value != D && this.drag(D), (M = window.getSelection()) == null || M.removeAllRanges();
      }, b = (k) => {
        var A, y;
        k.stopPropagation(), (A = window.getSelection()) == null || A.removeAllRanges(), document.removeEventListener("mousemove", E), document.removeEventListener("mouseup", b), (y = this.onDragEnd) == null || y.call(this, g);
      };
      document.addEventListener("mousemove", E), document.addEventListener("mouseup", b);
    }), this.setValue(this.value);
  }
  /** 设置滑动条值 */
  setValue(t) {
    var i;
    this.value = Math.max(Math.min(t, this.max), this.min);
    const e = (this.value - this.min) / (this.max - this.min);
    this.$thumb.style.top = `${(1 - e) * 100}%`, this.$bar.style.height = `${Math.max(Math.min(e, 1), 0) * 100}%`, (i = this.onChange) == null || i.call(this, t);
  }
  /** 拖动滑动条到特定的值 */
  drag(t) {
    var e;
    this.setValue(t), (e = this.onDrag) == null || e.call(this, this.value);
  }
}
const pi = ({
  list: s,
  template: t
}) => p`
  <ul class="mpui-picker">
    ${s.map(
  (e, i) => p`
        <li class="mpui-picker-item" data-value="${e.value}">
          ${(t == null ? void 0 : t(e, i)) || e.label || e.value}
        </li>
      `
)}
  </ul>
`;
class Ct {
  constructor({ container: t, value: e, onChange: i, onPick: n, list: a, template: l, condition: o }) {
    this.container = t, this.list = a, this.value = e, this.onChange = i, this.onPick = n, this.template = l, this.condition = o, this.reload();
  }
  /** 重载，一般用于列表项更改 */
  reload(t) {
    $(pi({ list: this.list, template: this.template }), this.container), this.$el = this.container.querySelector(".mpui-picker"), this.$items = this.$el.querySelectorAll(".mpui-picker-item"), this.$items.forEach((e) => {
      e.addEventListener("click", () => {
        this.pick(e.getAttribute("data-value") || void 0);
      });
    }), this.setValue(t ?? this.value);
  }
  /** 设置值 */
  setValue(t) {
    var e;
    this.$items.forEach((i, n) => {
      (this.condition ? this.condition(i.getAttribute("data-value"), t) : i.getAttribute("data-value") == t) ? i.classList.add("is-checked") : i.classList.remove("is-checked");
    }), this.value = t, (e = this.onChange) == null || e.call(this, t);
  }
  /** 点选一个选项 */
  pick(t) {
    var e;
    this.setValue(t), (e = this.onPick) == null || e.call(this, t);
  }
}
const mi = ({
  list: s,
  template: t
}) => p`
  <ul class="mpui-picker">
    ${s.map(
  (e, i) => p`
        <li class="mpui-picker-item" data-value="${e.value}">
          ${(t == null ? void 0 : t(e, i)) || e.label || e.value}
        </li>
      `
)}
  </ul>
`;
class vi {
  /** 已选值 */
  get value() {
    return [...this.valueSet];
  }
  constructor({ container: t, value: e = [], list: i, onChange: n, onToggle: a }) {
    this.container = t, this.list = i, this.valueSet = new Set(e), this.onChange = n, this.onToggle = a, this.reload();
  }
  /** 重载，一般用于列表项更改 */
  reload(t) {
    $(mi({ list: this.list, template: this.template }), this.container), this.$el = this.container.querySelector(".mpui-picker"), this.$items = this.$el.querySelectorAll(".mpui-picker-item"), this.$items.forEach((e) => {
      e.addEventListener("click", () => {
        this.toggle(e.getAttribute("data-value"));
      });
    }), this.setValue(t ?? this.value);
  }
  /** 设置值 */
  setValue(t) {
    var e;
    this.valueSet = new Set(t), this.$items.forEach((i, n) => {
      this.valueSet.has(i.getAttribute("data-value")) ? i.classList.add("is-checked") : i.classList.remove("is-checked");
    }), (e = this.onChange) == null || e.call(this, t);
  }
  /** 切换一个选项的选择状态 */
  toggle(t, e) {
    var n, a;
    const i = e ?? !this.valueSet.has(t);
    i ? this.valueSet.add(t) : this.valueSet.delete(t), this.$items.forEach((l, o) => {
      l.getAttribute("data-value") == t && l.classList.toggle("is-checked", i);
    }), (n = this.onChange) == null || n.call(this, this.value), (a = this.onToggle) == null || a.call(this, t, i);
  }
}
const gi = ({ label: s }) => p`
  <div class="mpui-checkbox">
    <div class="mpui-checkbox-icon"></div>
    <div class="mpui-checkbox-label">${s}</div>
  </div>
`;
class _e {
  constructor({ container: t, value: e = !1, onChange: i, onToggle: n, label: a }) {
    this.container = t, this.value = e, this.onChange = i, this.onToggle = n, this.label = a, $(gi({ label: this.label }), this.container), this.$el = this.container.querySelector(".mpui-checkbox"), this.$el.addEventListener("click", () => {
      this.toggle();
    }), this.setValue(this.value);
  }
  /** 设置开关状态 */
  setValue(t) {
    var e;
    this.value = t, this.$el.classList.toggle("is-checked", t), (e = this.onChange) == null || e.call(this, t);
  }
  /** 点按开关 */
  toggle(t = !this.value) {
    var e;
    this.setValue(t), (e = this.onToggle) == null || e.call(this, t);
  }
}
const $i = p`
  <div class="${r}-controls-button ${r}-button-volume">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-volume"></i>
      <i class="mpicon-volume-off"></i>
    </div>

    <div class="${r}-controls-panel-wrap">
      <div class="${r}-controls-panel">
        <div class="${r}-button-volume-value">0</div>
        <div class="${r}-button-volume-slider"></div>
      </div>
    </div>
  </div>
`;
class Te extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $($i, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "volume", this.$icon = this.$(`.${r}-controls-button-icon`), this.$slider = this.$(`.${r}-button-volume-slider`), this.$value = this.$(`.${r}-button-volume-value`);
  }
  init() {
    this.slider = new ui({
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
        this.player.muted && t != 0 && this.player.setMuted(!1), this.$el.classList.add("is-control"), this.player.isControlled = !0;
      },
      onDragEnd: () => {
        this.$el.classList.remove("is-control"), this.player.isControlled = !1;
      }
    }), this.player.on("volumechange", (t, e) => {
      e ? (this.$el.classList.add("is-muted"), this.slider.setValue(0)) : (this.$el.classList.remove("is-muted"), this.slider.setValue(Math.round(t * 100))), t == 0 && this.$el.classList.add("is-muted");
    }), this.$icon.addEventListener("click", () => {
      this.player.muted || this.player.volume == 0 ? (this.player.volume == 0 && this.player.setVolume(0.1), this.player.setMuted(!0)) : this.player.setMuted(!1);
    });
  }
}
Te.pluginName = "buttonVolume";
const fi = p`
  <div class="${r}-controls-button ${r}-button-settings">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-settings"></i>
    </div>
    <div class="${r}-controls-panel-wrap">
      <div class="${r}-controls-panel"></div>
    </div>
  </div>
`;
class Ae extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(fi, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "settings", this.$icon = this.$(`.${r}-controls-button-icon`), this.$panel = this.$(`.${r}-controls-panel`);
  }
  ready() {
    const t = this.player.panel.get("settings");
    t == null || t.mount(this.$panel);
  }
}
Ae.pluginName = "buttonSettings";
const yi = p`
  <div class="${r}-controls-button ${r}-button-pip">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-pip"></i>
      <i class="mpicon-pip-exit"></i>
    </div>
    <div class="mpui-tooltip">画中画</div>
  </div>
`;
class De extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(yi, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "pip", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("enterpictureinpicture", () => {
      this.$el.classList.add("is-on"), this.$tooltip.innerText = "退出画中画";
    }), this.player.on("leavepictureinpicture", () => {
      this.$el.classList.remove("is-on"), this.$tooltip.innerText = "画中画";
    }), this.$icon.addEventListener("click", () => {
      var t, e, i, n;
      this.player.isPip ? (e = (t = this.player).exitPip) == null || e.call(t) : (n = (i = this.player).enterPip) == null || n.call(i);
    });
  }
  get ignored() {
    return !this.player.enterPip || !As;
  }
}
De.pluginName = "buttonPip";
const bi = p`
  <div class="${r}-controls-button ${r}-button-widescreen">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-widescreen"></i>
      <i class="mpicon-widescreen-exit"></i>
    </div>
    <div class="mpui-tooltip">宽屏模式</div>
  </div>
`;
class wi extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(bi, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "widescreen", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("widescreenEnter", () => {
      this.$el.classList.add("is-on"), this.$tooltip.innerText = "退出宽屏模式";
    }), this.player.on("widescreenExit", () => {
      this.$el.classList.remove("is-on"), this.$tooltip.innerText = "宽屏模式";
    }), this.$icon.addEventListener("click", () => {
      var t, e, i, n;
      this.player.isWidescreen ? (e = (t = this.player).enterWidescreen) == null || e.call(t) : (n = (i = this.player).exitWidescreen) == null || n.call(i);
    });
  }
  get ignored() {
    return !this.player.enterWidescreen;
  }
}
wi.pluginName = "buttonWidescreen";
const ki = p`
  <div class="${r}-controls-button ${r}-button-webscreen">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-webscreen"></i>
      <i class="mpicon-webscreen-exit"></i>
    </div>
    <div class="mpui-tooltip">网页全屏</div>
  </div>
`;
class xi extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(ki, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "webscreen", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("webscreenEnter", () => {
      this.$el.classList.add("is-on"), this.$tooltip.innerText = "退出网页全屏";
    }), this.player.on("webscreenExit", () => {
      this.$el.classList.remove("is-on"), this.$tooltip.innerText = "网页全屏";
    }), this.$icon.addEventListener("click", () => {
      var t, e, i, n;
      this.player.isWebscreen ? (n = (i = this.player).exitWebscreen) == null || n.call(i) : (e = (t = this.player).enterWebscreen) == null || e.call(t);
    });
  }
  get ignored() {
    return !this.player.enterWebscreen;
  }
}
xi.pluginName = "buttonWebscreen";
const Si = p`
  <div class="${r}-controls-button ${r}-button-fullscreen">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-fullscreen"></i>
      <i class="mpicon-fullscreen-exit"></i>
    </div>
    <div class="mpui-tooltip">进入全屏</div>
  </div>
`;
class Fe extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(Si, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "fullscreen", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("fullscreenEnter", () => {
      this.$el.classList.add("is-on"), this.$tooltip.innerText = "退出全屏";
    }), this.player.on("fullscreenExit", () => {
      this.$el.classList.remove("is-on"), this.$tooltip.innerText = "进入全屏";
    }), this.$icon.addEventListener("click", () => {
      var t, e, i, n;
      this.player.isFullscreen ? (n = (i = this.player).exitFullscreen) == null || n.call(i) : (e = (t = this.player).enterFullscreen) == null || e.call(t);
    });
  }
  get ignored() {
    return !this.player.enterFullscreen || !Ts;
  }
}
Fe.pluginName = "buttonFullscreen";
var O = /* @__PURE__ */ ((s) => (s[s.Backspace = 8] = "Backspace", s[s.Tab = 9] = "Tab", s[s.Enter = 13] = "Enter", s[s.Shift = 16] = "Shift", s[s.Ctrl = 17] = "Ctrl", s[s.Alt = 18] = "Alt", s[s.PauseBreak = 19] = "PauseBreak", s[s.CapsLock = 20] = "CapsLock", s[s.Escape = 27] = "Escape", s[s.Space = 32] = "Space", s[s.PageUp = 33] = "PageUp", s[s.PageDown = 34] = "PageDown", s[s.End = 35] = "End", s[s.Home = 36] = "Home", s[s.LeftArrow = 37] = "LeftArrow", s[s.UpArrow = 38] = "UpArrow", s[s.RightArrow = 39] = "RightArrow", s[s.DownArrow = 40] = "DownArrow", s[s.Insert = 45] = "Insert", s[s.Delete = 46] = "Delete", s[s.Zero = 48] = "Zero", s[
  s.ClosedParen = 48
  /* Zero */
] = "ClosedParen", s[s.One = 49] = "One", s[
  s.ExclamationMark = 49
  /* One */
] = "ExclamationMark", s[s.Two = 50] = "Two", s[
  s.AtSign = 50
  /* Two */
] = "AtSign", s[s.Three = 51] = "Three", s[
  s.PoundSign = 51
  /* Three */
] = "PoundSign", s[
  s.Hash = 51
  /* PoundSign */
] = "Hash", s[s.Four = 52] = "Four", s[
  s.DollarSign = 52
  /* Four */
] = "DollarSign", s[s.Five = 53] = "Five", s[
  s.PercentSign = 53
  /* Five */
] = "PercentSign", s[s.Six = 54] = "Six", s[
  s.Caret = 54
  /* Six */
] = "Caret", s[
  s.Hat = 54
  /* Caret */
] = "Hat", s[s.Seven = 55] = "Seven", s[
  s.Ampersand = 55
  /* Seven */
] = "Ampersand", s[s.Eight = 56] = "Eight", s[
  s.Star = 56
  /* Eight */
] = "Star", s[
  s.Asterik = 56
  /* Star */
] = "Asterik", s[s.Nine = 57] = "Nine", s[
  s.OpenParen = 57
  /* Nine */
] = "OpenParen", s[s.A = 65] = "A", s[s.B = 66] = "B", s[s.C = 67] = "C", s[s.D = 68] = "D", s[s.E = 69] = "E", s[s.F = 70] = "F", s[s.G = 71] = "G", s[s.H = 72] = "H", s[s.I = 73] = "I", s[s.J = 74] = "J", s[s.K = 75] = "K", s[s.L = 76] = "L", s[s.M = 77] = "M", s[s.N = 78] = "N", s[s.O = 79] = "O", s[s.P = 80] = "P", s[s.Q = 81] = "Q", s[s.R = 82] = "R", s[s.S = 83] = "S", s[s.T = 84] = "T", s[s.U = 85] = "U", s[s.V = 86] = "V", s[s.W = 87] = "W", s[s.X = 88] = "X", s[s.Y = 89] = "Y", s[s.Z = 90] = "Z", s[s.LeftWindowKey = 91] = "LeftWindowKey", s[s.RightWindowKey = 92] = "RightWindowKey", s[s.SelectKey = 93] = "SelectKey", s[s.Numpad0 = 96] = "Numpad0", s[s.Numpad1 = 97] = "Numpad1", s[s.Numpad2 = 98] = "Numpad2", s[s.Numpad3 = 99] = "Numpad3", s[s.Numpad4 = 100] = "Numpad4", s[s.Numpad5 = 101] = "Numpad5", s[s.Numpad6 = 102] = "Numpad6", s[s.Numpad7 = 103] = "Numpad7", s[s.Numpad8 = 104] = "Numpad8", s[s.Numpad9 = 105] = "Numpad9", s[s.Multiply = 106] = "Multiply", s[s.Add = 107] = "Add", s[s.Subtract = 109] = "Subtract", s[s.DecimalPoint = 110] = "DecimalPoint", s[s.Divide = 111] = "Divide", s[s.F1 = 112] = "F1", s[s.F2 = 113] = "F2", s[s.F3 = 114] = "F3", s[s.F4 = 115] = "F4", s[s.F5 = 116] = "F5", s[s.F6 = 117] = "F6", s[s.F7 = 118] = "F7", s[s.F8 = 119] = "F8", s[s.F9 = 120] = "F9", s[s.F10 = 121] = "F10", s[s.F11 = 122] = "F11", s[s.F12 = 123] = "F12", s[s.NumLock = 144] = "NumLock", s[s.ScrollLock = 145] = "ScrollLock", s[s.SemiColon = 186] = "SemiColon", s[s.Equals = 187] = "Equals", s[s.Comma = 188] = "Comma", s[s.Dash = 189] = "Dash", s[s.Period = 190] = "Period", s[
  s.UnderScore = 189
  /* Dash */
] = "UnderScore", s[
  s.PlusSign = 187
  /* Equals */
] = "PlusSign", s[s.ForwardSlash = 191] = "ForwardSlash", s[s.Tilde = 192] = "Tilde", s[
  s.GraveAccent = 192
  /* Tilde */
] = "GraveAccent", s[s.OpenBracket = 219] = "OpenBracket", s[s.ClosedBracket = 221] = "ClosedBracket", s[s.Quote = 222] = "Quote", s))(O || {});
class Pe {
  constructor(t) {
    this.player = t, this.controlMask = this.player.$area;
  }
  apply() {
    this.initKey(), this.initMask();
  }
  initKey() {
    document.addEventListener("keydown", (t) => {
      var n, a;
      const e = (n = document.activeElement) == null ? void 0 : n.tagName.toUpperCase(), i = (a = document.activeElement) == null ? void 0 : a.getAttribute("contenteditable");
      if (this.player.isFocused) {
        if (e == "INPUT" || e == "TEXTAREA" || i == "" || i == "true")
          return;
        switch (t.keyCode) {
          case O.Space:
            t.preventDefault(), this.player.paused ? this.player.play() : this.player.pause();
            break;
          case O.LeftArrow:
            t.preventDefault(), this.player.seek(this.player.currentTime - 5);
            break;
          case O.RightArrow:
            t.preventDefault(), this.player.seek(this.player.currentTime + 5);
            break;
          case O.UpArrow:
            t.preventDefault(), this.player.setVolume(this.player.volume + 0.1);
            break;
          case O.DownArrow:
            t.preventDefault(), this.player.setVolume(this.player.volume - 0.1);
            break;
        }
      }
    });
  }
  initMask() {
    this.controlMask.addEventListener("click", () => {
      this.player.paused ? this.player.play() : this.player.pause();
    });
  }
}
Pe.pluginName = "hotkey";
var He = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
}, Ei = (s, t, e) => (He(s, t, "read from private field"), e ? e.call(s) : t.get(s)), Li = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, Ut = (s, t, e, i) => (He(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e), tt;
const _i = () => p`
  <div class="${r}-modal-mask"></div>
  <div class="${r}-modal">
    <div class="${r}-modal-head">
      <div class="${r}-modal-title"></div>
      <div class="${r}-modal-close">
        <i class="mpicon-close"></i>
      </div>
    </div>
    <div class="${r}-modal-content"></div>
  </div>
`;
class Me extends w {
  constructor(t) {
    super(t), this.current = null, Li(this, tt, []), this.container = H("div", { class: `${r}-modal-wrap` }), $(_i(), this.container), this.$el = this.container.querySelector(`.${r}-modal`), this.$mask = this.container.querySelector(`.${r}-modal-mask`), this.$content = this.$el.querySelector(`.${r}-modal-content`), this.$title = this.$el.querySelector(`.${r}-modal-title`), this.$close = this.$el.querySelector(`.${r}-modal-close`), this.player.$main.appendChild(this.container);
  }
  get isShow() {
    return this.container.classList.contains("is-show");
  }
  init() {
    this.$mask.addEventListener("click", () => {
      this.hide();
    }), this.$close.addEventListener("click", () => {
      this.hide();
    });
  }
  apply(t, e) {
    var i;
    Ut(this, tt, ((i = e.modal) == null ? void 0 : i.panels) || []);
  }
  ready() {
    Ei(this, tt).forEach((t) => {
      const e = this.player.panel.get(t);
      e && this.mount(e);
    }), Ut(this, tt, []);
  }
  /** 关闭模态框 */
  hide() {
    var t;
    (t = this.current) == null || t.toggle(!1);
  }
  /** 挂载一个面板 */
  mount(t) {
    t.mount(this.$content, {
      onToggle: (e) => {
        if (e) {
          for (const i of this.$content.children)
            i.classList.toggle("is-show", i == t.$el);
          this.container.classList.add("is-show"), this.$title.innerText = t.title || "", this.current = t;
        } else
          this.current == t && (this.container.classList.remove("is-show"), t.$el.classList.remove("is-show"), this.$title.innerText = "", this.current = null);
      }
    });
  }
}
tt = /* @__PURE__ */ new WeakMap();
Me.pluginName = "modal";
const Ti = () => p`
  <div class="${r}-progress">
    <div class="${r}-progress-bar">
      <div class="${r}-progress-buffered"></div>
      <div class="${r}-progress-played"></div>
      <div class="${r}-progress-thumb-track">
        <div class="${r}-progress-thumb"></div>
      </div>
      <div class="${r}-progress-preview">
        <div class="${r}-progress-thumbnail"></div>
        <div class="${r}-progress-time"></div>
      </div>
      <div class="${r}-progress-tip"></div>
    </div>
  </div>
`;
class Re extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(Ti(), e), super(t, e.querySelector(`.${r}-progress`)), this.name = "progress", this.trackLength = 0, this.distance = 0, this.nMax = 0, this.nLeft = 0, this.isDragging = !1, this.isHover = !1, this.isActive = !1, this.$bar = this.$(`.${r}-progress-bar`), this.$buffered = this.$(`.${r}-progress-buffered`), this.$played = this.$(`.${r}-progress-played`), this.$thumbTrack = this.$(`.${r}-progress-thumb-track`), this.$thumb = this.$(`.${r}-progress-thumb`), this.$preview = this.$(`.${r}-progress-preview`), this.$thumbnail = this.$(`.${r}-progress-thumbnail`), this.$time = this.$(`.${r}-progress-time`), this.$tip = this.$(`.${r}-progress-tip`), this.$el.addEventListener("mousedown", (a) => {
      const { clientX: l } = a;
      this.trackLength = this.$el.offsetWidth, this.nMax = this.$thumbTrack.offsetWidth || this.trackLength, this.nLeft = this.$el.getBoundingClientRect().left, this.distance = l - this.nLeft, this.setPlayed(this.nValue), this.$el.classList.add(`${r}-progress-dragging`), this.isDragging = !0, document.addEventListener("mousemove", i), document.addEventListener("mouseup", n);
    });
    const i = (a) => {
      var o;
      const { clientX: l } = a;
      a.preventDefault(), a.stopPropagation(), this.distance = l - this.nLeft, this.setPlayed(this.nValue), this.updateTip(), (o = window.getSelection()) == null || o.removeAllRanges();
    }, n = (a) => {
      var l;
      a.stopPropagation(), (l = window.getSelection()) == null || l.removeAllRanges(), document.removeEventListener("mousemove", i), document.removeEventListener("mouseup", n), this.$el.classList.remove(`${r}-progress-dragging`), this.isDragging = !1, this.isHover || this.setActive(!1), this.player.seek(this.nValue), this.player.play();
    };
    this.$el.addEventListener("mouseenter", () => {
      this.isHover = !0, this.isDragging || this.updateTip();
    }), this.$el.addEventListener("mousemove", (a) => {
      if (this.isDragging)
        return;
      const { clientX: l } = a;
      this.trackLength = this.$el.offsetWidth, this.nMax = this.$thumbTrack.offsetWidth || this.trackLength, this.nLeft = this.$el.getBoundingClientRect().left, this.distance = l - this.nLeft, this.updateTip();
    }), this.$el.addEventListener("mouseleave", () => {
      this.isHover = !1, this.isDragging || this.setActive(!1);
    }), this.player.on("timeupdate", (a) => {
      this.isDragging || this.setPlayed(a);
    }), this.player.on("progress", (a) => {
      this.setBuffered(a.length ? a.end(a.length - 1) : 0);
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
    this.isActive = t, this.$el.classList.toggle(`${r}-progress-active`, t), t ? this.player.isControlled = !0 : this.player.isControlled = !1;
  }
  /** 更新指针位置 */
  updateTip() {
    this.isActive || this.setActive(!0);
    let t = this.distance / this.trackLength;
    t = t >= 1 ? 1 : t <= 0 ? 0 : t, this.$tip.style.left = `${t * 100}%`, this.$preview.style.left = `${t * 100}%`, this.$time.innerText = z(this.nValue);
  }
}
Re.pluginName = "progress";
const Ai = p`
  <div class="${r}-settings">
    <div class="${r}-settings-slot">
      <div class="${r}-panel-row">
        <div class="${r}-row-label">播放倍速</div>
        <div class="${r}-settings-rate-picker"></div>
      </div>
      <div class="${r}-panel-row">
        <div class="${r}-row-label">视频比例</div>
        <div class="${r}-settings-ratio-picker"></div>
      </div>
    </div>
    <div class="${r}-panel-row">
      <div class="${r}-row-label">播放方式</div>
      <div class="${r}-settings-play"></div>
    </div>
    <div class="${r}-panel-row">
      <div class="${r}-row-label">其他设置</div>
      <div class="${r}-settings-others"></div>
    </div>
  </div>
`;
class Ne extends ct {
  constructor(t) {
    const e = new DocumentFragment();
    $(Ai, e), super(t, e.querySelector(`.${r}-settings`)), this.name = "settings", this.title = "设置", this.$slot = this.$(`.${r}-settings-slot`), this.$play = this.$(`.${r}-settings-play`), this.$others = this.$(`.${r}-settings-others`), this.$ratePicker = this.$(`.${r}-settings-rate-picker`), this.$ratioPicker = this.$(`.${r}-settings-ratio-picker`);
  }
  init() {
    this.pickerRate = new Ct({
      container: this.$ratePicker,
      list: [
        { value: 0.5, label: "0.5" },
        { value: 0.75, label: "0.75" },
        { value: 1, label: "1.0" },
        { value: 1.25, label: "1.25" },
        { value: 1.5, label: "1.5" },
        { value: 2, label: "2.0" }
      ],
      value: this.player.playbackRate || 1,
      onPick: (t) => {
        this.player.setPlaybackRate(Number(t));
      }
    }), this.player.on("ratechange", (t) => {
      this.pickerRate.setValue(t);
    }), this.pickerRatio = new Ct({
      container: this.$ratioPicker,
      list: [
        { value: "", label: "自动" },
        { value: "16/9", label: "16:9" },
        { value: "4/3", label: "4:3" }
      ],
      value: this.player.aspectRatio || "",
      onPick: (t) => {
        var e, i;
        (i = (e = this.player).setAspectRatio) == null || i.call(e, t || "");
      }
    }), this.player.on("aspectRatioChange", (t) => {
      this.pickerRatio.setValue(t);
    });
  }
}
Ne.pluginName = "settings";
var Be = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
}, Di = (s, t, e) => (Be(s, t, "read from private field"), e ? e.call(s) : t.get(s)), Fi = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, jt = (s, t, e, i) => (Be(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e), et;
const Pi = () => p`
  <div class="${r}-side-mask"></div>
  <div class="${r}-side">
    <div class="${r}-side-head">
      <div class="${r}-side-title"></div>
      <div class="${r}-side-close">
        <i class="mpicon-close"></i>
      </div>
    </div>
    <div class="${r}-side-content"></div>
  </div>
`;
class Ie extends w {
  constructor(t) {
    super(t), this.current = null, Fi(this, et, []), this.container = H("div", { class: `${r}-side-wrap` }), $(Pi(), this.container), this.$el = this.container.querySelector(`.${r}-side`), this.$mask = this.container.querySelector(`.${r}-side-mask`), this.$content = this.$el.querySelector(`.${r}-side-content`), this.$title = this.$el.querySelector(`.${r}-side-title`), this.$close = this.$el.querySelector(`.${r}-side-close`), this.player.$main.appendChild(this.container);
  }
  get isShow() {
    return this.container.classList.contains("is-show");
  }
  init() {
    this.$mask.addEventListener("click", () => {
      this.hide();
    }), this.$close.addEventListener("click", () => {
      this.hide();
    });
  }
  apply(t, e) {
    var i;
    jt(this, et, ((i = e.side) == null ? void 0 : i.panels) || []);
  }
  ready() {
    Di(this, et).forEach((t) => {
      const e = this.player.panel.get(t);
      e && this.mount(e);
    }), jt(this, et, []);
  }
  hide() {
    var t;
    (t = this.current) == null || t.toggle(!1);
  }
  mount(t) {
    t.mount(this.$content, {
      onToggle: (e) => {
        var i;
        if (e) {
          (i = this.current) == null || i.toggle(!1);
          for (const n of this.$content.children)
            n.classList.toggle("is-show", n == t.$el);
          this.container.classList.add("is-show"), this.$title.innerText = t.title || "", this.current = t;
        } else
          this.current == t && (this.container.classList.remove("is-show"), t.$el.classList.remove("is-show"), this.$title.innerText = "", this.current = null);
      }
    });
  }
}
et = /* @__PURE__ */ new WeakMap();
Ie.pluginName = "side";
class qe extends w {
  constructor(t) {
    super(t), this.player.define("isPip", {
      get: () => this.status
    }), this.player.define("enterPip", () => this.enter()), this.player.define("exitPip", () => this.exit()), this.player.on("enterpictureinpicture", () => {
      this.player.$el.classList.add("is-pip"), this.player.emit("enterpictureinpicture");
    }), this.player.on("leavepictureinpicture", () => {
      this.player.$el.classList.remove("is-pip"), this.player.emit("leavepictureinpicture");
    }), this.player.on("enterpictureinpicture", () => {
      var e, i;
      (i = (e = this.player).exitFullscreen) == null || i.call(e);
    }), this.player.on("fullscreenEnter", () => {
      this.exit();
    });
  }
  enter() {
    this.status || this.player.$video.requestPictureInPicture();
  }
  exit() {
    this.status && document.exitPictureInPicture();
  }
  get status() {
    return document.pictureInPictureElement == this.player.$video;
  }
}
qe.pluginName = "pip";
class Oe extends w {
  constructor(t) {
    super(t), this.$el = this.player.$main, this.player.define("isFullscreen", {
      get: () => this.status
    }), this.player.define("enterFullscreen", () => this.enter()), this.player.define("exitFullscreen", () => this.exit());
    const e = () => {
      this.status ? (this.player.$el.classList.add("is-fullscreen"), this.player.emit("fullscreenEnter")) : (this.player.$el.classList.remove("is-fullscreen"), this.player.emit("fullscreenExit"));
    };
    this.$el.addEventListener("fullscreenchange", e), this.$el.addEventListener("webkitfullscreenchange", e), this.$el.addEventListener("mozfullscreenchange", e), this.$el.addEventListener("msfullscreenchange", e);
  }
  enter() {
    if (this.status)
      return;
    const t = this.$el;
    t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.webkitEnterFullscreen ? t.webkitEnterFullscreen() : t.webkitEnterFullScreen ? t.webkitEnterFullScreen() : t.msRequestFullscreen && t.msRequestFullscreen();
  }
  exit() {
    if (!this.status)
      return;
    const t = document;
    document.exitFullscreen ? document.exitFullscreen() : t.mozCancelFullScreen ? t.mozCancelFullScreen() : t.webkitExitFullscreen ? t.webkitExitFullscreen() : t.webkitExitFullScreen ? t.webkitExitFullScreen() : this.$el.msExitFullscreen && this.$el.msExitFullscreen();
  }
  get status() {
    return _s() == this.$el;
  }
}
Oe.pluginName = "fullscreen";
var ze = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
}, Xt = (s, t, e) => (ze(s, t, "read from private field"), e ? e.call(s) : t.get(s)), Gt = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, Et = (s, t, e, i) => (ze(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e), st, $t;
class Ve extends w {
  constructor() {
    super(...arguments), Gt(this, st, 0), Gt(this, $t, 0);
  }
  init() {
    this.player.define("userId", { get: () => Xt(this, st) }), this.player.define("authorId", { get: () => Xt(this, $t) }), this.player.define("login", () => this.login()), this.player.on("videoChange", ({ author: t }) => {
      (t == null ? void 0 : t.id) != null && Et(this, $t, t.id || 0);
    });
  }
  apply(t, e) {
    var i;
    Et(this, st, e.userId || 0), this.invokeLogin = (i = e.invoke) == null ? void 0 : i.login;
  }
  /** 调用页面登录 */
  async login() {
    var t;
    await ((t = this.invokeLogin) == null ? void 0 : t.call(this).then((e) => {
      e != null && this.setUser(e);
    }));
  }
  /** 设置用户 */
  async setUser(t) {
    Et(this, st, t), this.player.emit("login", t);
  }
}
st = /* @__PURE__ */ new WeakMap();
$t = /* @__PURE__ */ new WeakMap();
Ve.pluginName = "user";
var We = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
}, ut = (s, t, e) => (We(s, t, "read from private field"), e ? e.call(s) : t.get(s)), Yt = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, Z = (s, t, e, i) => (We(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e), q, j;
class Ce extends w {
  constructor(t) {
    super(t), Yt(this, q, !1), Yt(this, j, !1), this.activeDuration = 3e3, this.player.define("isActive", {
      get: () => ut(this, q)
    });
    const e = oe(() => {
      Z(this, j, !1), this.remove();
    }, this.activeDuration);
    this.player.$main.addEventListener("mousemove", () => {
      Z(this, j, !0), this.set(), e();
    }), this.player.$main.addEventListener("mouseleave", () => {
      Z(this, j, !1), this.remove();
    });
  }
  apply(t, e) {
    this.activeDuration = e.activeDuration ?? 3e3;
  }
  /** 设置播放器活跃状态 */
  set() {
    ut(this, q) || (this.player.$el.classList.add("is-active"), Z(this, q, !0), this.player.emit("active"));
  }
  /** 移除播放器活跃状态 */
  remove() {
    !ut(this, q) || ut(this, j) || this.player.isControlled || this.player.hook.call("inactive").then((t) => {
      t && (this.player.$el.classList.remove("is-active"), Z(this, q, !1), this.player.emit("inactive"));
    });
  }
}
q = /* @__PURE__ */ new WeakMap();
j = /* @__PURE__ */ new WeakMap();
Ce.pluginName = "stateActive";
class Ue extends w {
  constructor(t) {
    super(t), this.player.define("isFocused", {
      get: () => this.status
    }), document.addEventListener(
      "click",
      () => {
        this.toggle(!1);
      },
      !0
    ), this.player.$el.addEventListener(
      "click",
      () => {
        this.toggle(!0);
      },
      !0
    );
  }
  /** 设置播放器聚焦状态 */
  toggle(t) {
    this.status != t && (this.player.$el.classList.toggle("is-focus", t), this.player.emit(t ? "focus" : "blur"));
  }
  get status() {
    return this.player.$el.classList.contains("is-focus");
  }
}
Ue.pluginName = "stateFocus";
var W = [], Hi = function() {
  return W.some(function(s) {
    return s.activeTargets.length > 0;
  });
}, Mi = function() {
  return W.some(function(s) {
    return s.skippedTargets.length > 0;
  });
}, Kt = "ResizeObserver loop completed with undelivered notifications.", Ri = function() {
  var s;
  typeof ErrorEvent == "function" ? s = new ErrorEvent("error", {
    message: Kt
  }) : (s = document.createEvent("Event"), s.initEvent("error", !1, !1), s.message = Kt), window.dispatchEvent(s);
}, ot;
(function(s) {
  s.BORDER_BOX = "border-box", s.CONTENT_BOX = "content-box", s.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(ot || (ot = {}));
var C = function(s) {
  return Object.freeze(s);
}, Ni = function() {
  function s(t, e) {
    this.inlineSize = t, this.blockSize = e, C(this);
  }
  return s;
}(), je = function() {
  function s(t, e, i, n) {
    return this.x = t, this.y = e, this.width = i, this.height = n, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, C(this);
  }
  return s.prototype.toJSON = function() {
    var t = this, e = t.x, i = t.y, n = t.top, a = t.right, l = t.bottom, o = t.left, h = t.width, c = t.height;
    return { x: e, y: i, top: n, right: a, bottom: l, left: o, width: h, height: c };
  }, s.fromRect = function(t) {
    return new s(t.x, t.y, t.width, t.height);
  }, s;
}(), Ht = function(s) {
  return s instanceof SVGElement && "getBBox" in s;
}, Xe = function(s) {
  if (Ht(s)) {
    var t = s.getBBox(), e = t.width, i = t.height;
    return !e && !i;
  }
  var n = s, a = n.offsetWidth, l = n.offsetHeight;
  return !(a || l || s.getClientRects().length);
}, Qt = function(s) {
  var t;
  if (s instanceof Element)
    return !0;
  var e = (t = s == null ? void 0 : s.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(e && s instanceof e.Element);
}, Bi = function(s) {
  switch (s.tagName) {
    case "INPUT":
      if (s.type !== "image")
        break;
    case "VIDEO":
    case "AUDIO":
    case "EMBED":
    case "OBJECT":
    case "CANVAS":
    case "IFRAME":
    case "IMG":
      return !0;
  }
  return !1;
}, it = typeof window < "u" ? window : {}, pt = /* @__PURE__ */ new WeakMap(), Zt = /auto|scroll/, Ii = /^tb|vertical/, qi = /msie|trident/i.test(it.navigator && it.navigator.userAgent), R = function(s) {
  return parseFloat(s || "0");
}, X = function(s, t, e) {
  return s === void 0 && (s = 0), t === void 0 && (t = 0), e === void 0 && (e = !1), new Ni((e ? t : s) || 0, (e ? s : t) || 0);
}, Jt = C({
  devicePixelContentBoxSize: X(),
  borderBoxSize: X(),
  contentBoxSize: X(),
  contentRect: new je(0, 0, 0, 0)
}), Ge = function(s, t) {
  if (t === void 0 && (t = !1), pt.has(s) && !t)
    return pt.get(s);
  if (Xe(s))
    return pt.set(s, Jt), Jt;
  var e = getComputedStyle(s), i = Ht(s) && s.ownerSVGElement && s.getBBox(), n = !qi && e.boxSizing === "border-box", a = Ii.test(e.writingMode || ""), l = !i && Zt.test(e.overflowY || ""), o = !i && Zt.test(e.overflowX || ""), h = i ? 0 : R(e.paddingTop), c = i ? 0 : R(e.paddingRight), u = i ? 0 : R(e.paddingBottom), f = i ? 0 : R(e.paddingLeft), x = i ? 0 : R(e.borderTopWidth), _ = i ? 0 : R(e.borderRightWidth), L = i ? 0 : R(e.borderBottomWidth), v = i ? 0 : R(e.borderLeftWidth), m = f + c, d = h + u, g = v + _, E = x + L, b = o ? s.offsetHeight - E - s.clientHeight : 0, T = l ? s.offsetWidth - g - s.clientWidth : 0, k = n ? m + g : 0, S = n ? d + E : 0, A = i ? i.width : R(e.width) - k - T, y = i ? i.height : R(e.height) - S - b, D = A + m + T + g, M = y + d + b + E, K = C({
    devicePixelContentBoxSize: X(Math.round(A * devicePixelRatio), Math.round(y * devicePixelRatio), a),
    borderBoxSize: X(D, M, a),
    contentBoxSize: X(A, y, a),
    contentRect: new je(f, h, A, y)
  });
  return pt.set(s, K), K;
}, Ye = function(s, t, e) {
  var i = Ge(s, e), n = i.borderBoxSize, a = i.contentBoxSize, l = i.devicePixelContentBoxSize;
  switch (t) {
    case ot.DEVICE_PIXEL_CONTENT_BOX:
      return l;
    case ot.BORDER_BOX:
      return n;
    default:
      return a;
  }
}, Oi = function() {
  function s(t) {
    var e = Ge(t);
    this.target = t, this.contentRect = e.contentRect, this.borderBoxSize = C([e.borderBoxSize]), this.contentBoxSize = C([e.contentBoxSize]), this.devicePixelContentBoxSize = C([e.devicePixelContentBoxSize]);
  }
  return s;
}(), Ke = function(s) {
  if (Xe(s))
    return 1 / 0;
  for (var t = 0, e = s.parentNode; e; )
    t += 1, e = e.parentNode;
  return t;
}, zi = function() {
  var s = 1 / 0, t = [];
  W.forEach(function(l) {
    if (l.activeTargets.length !== 0) {
      var o = [];
      l.activeTargets.forEach(function(c) {
        var u = new Oi(c.target), f = Ke(c.target);
        o.push(u), c.lastReportedSize = Ye(c.target, c.observedBox), f < s && (s = f);
      }), t.push(function() {
        l.callback.call(l.observer, o, l.observer);
      }), l.activeTargets.splice(0, l.activeTargets.length);
    }
  });
  for (var e = 0, i = t; e < i.length; e++) {
    var n = i[e];
    n();
  }
  return s;
}, te = function(s) {
  W.forEach(function(e) {
    e.activeTargets.splice(0, e.activeTargets.length), e.skippedTargets.splice(0, e.skippedTargets.length), e.observationTargets.forEach(function(n) {
      n.isActive() && (Ke(n.target) > s ? e.activeTargets.push(n) : e.skippedTargets.push(n));
    });
  });
}, Vi = function() {
  var s = 0;
  for (te(s); Hi(); )
    s = zi(), te(s);
  return Mi() && Ri(), s > 0;
}, Lt, Qe = [], Wi = function() {
  return Qe.splice(0).forEach(function(s) {
    return s();
  });
}, Ci = function(s) {
  if (!Lt) {
    var t = 0, e = document.createTextNode(""), i = { characterData: !0 };
    new MutationObserver(function() {
      return Wi();
    }).observe(e, i), Lt = function() {
      e.textContent = "".concat(t ? t-- : t++);
    };
  }
  Qe.push(s), Lt();
}, Ui = function(s) {
  Ci(function() {
    requestAnimationFrame(s);
  });
}, ft = 0, ji = function() {
  return !!ft;
}, Xi = 250, Gi = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, ee = [
  "resize",
  "load",
  "transitionend",
  "animationend",
  "animationstart",
  "animationiteration",
  "keyup",
  "keydown",
  "mouseup",
  "mousedown",
  "mouseover",
  "mouseout",
  "blur",
  "focus"
], se = function(s) {
  return s === void 0 && (s = 0), Date.now() + s;
}, _t = !1, Yi = function() {
  function s() {
    var t = this;
    this.stopped = !0, this.listener = function() {
      return t.schedule();
    };
  }
  return s.prototype.run = function(t) {
    var e = this;
    if (t === void 0 && (t = Xi), !_t) {
      _t = !0;
      var i = se(t);
      Ui(function() {
        var n = !1;
        try {
          n = Vi();
        } finally {
          if (_t = !1, t = i - se(), !ji())
            return;
          n ? e.run(1e3) : t > 0 ? e.run(t) : e.start();
        }
      });
    }
  }, s.prototype.schedule = function() {
    this.stop(), this.run();
  }, s.prototype.observe = function() {
    var t = this, e = function() {
      return t.observer && t.observer.observe(document.body, Gi);
    };
    document.body ? e() : it.addEventListener("DOMContentLoaded", e);
  }, s.prototype.start = function() {
    var t = this;
    this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), ee.forEach(function(e) {
      return it.addEventListener(e, t.listener, !0);
    }));
  }, s.prototype.stop = function() {
    var t = this;
    this.stopped || (this.observer && this.observer.disconnect(), ee.forEach(function(e) {
      return it.removeEventListener(e, t.listener, !0);
    }), this.stopped = !0);
  }, s;
}(), Ft = new Yi(), ie = function(s) {
  !ft && s > 0 && Ft.start(), ft += s, !ft && Ft.stop();
}, Ki = function(s) {
  return !Ht(s) && !Bi(s) && getComputedStyle(s).display === "inline";
}, Qi = function() {
  function s(t, e) {
    this.target = t, this.observedBox = e || ot.CONTENT_BOX, this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  return s.prototype.isActive = function() {
    var t = Ye(this.target, this.observedBox, !0);
    return Ki(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
  }, s;
}(), Zi = function() {
  function s(t, e) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = e;
  }
  return s;
}(), mt = /* @__PURE__ */ new WeakMap(), ne = function(s, t) {
  for (var e = 0; e < s.length; e += 1)
    if (s[e].target === t)
      return e;
  return -1;
}, vt = function() {
  function s() {
  }
  return s.connect = function(t, e) {
    var i = new Zi(t, e);
    mt.set(t, i);
  }, s.observe = function(t, e, i) {
    var n = mt.get(t), a = n.observationTargets.length === 0;
    ne(n.observationTargets, e) < 0 && (a && W.push(n), n.observationTargets.push(new Qi(e, i && i.box)), ie(1), Ft.schedule());
  }, s.unobserve = function(t, e) {
    var i = mt.get(t), n = ne(i.observationTargets, e), a = i.observationTargets.length === 1;
    n >= 0 && (a && W.splice(W.indexOf(i), 1), i.observationTargets.splice(n, 1), ie(-1));
  }, s.disconnect = function(t) {
    var e = this, i = mt.get(t);
    i.observationTargets.slice().forEach(function(n) {
      return e.unobserve(t, n.target);
    }), i.activeTargets.splice(0, i.activeTargets.length);
  }, s;
}(), Ze = function() {
  function s(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    vt.connect(this, t);
  }
  return s.prototype.observe = function(t, e) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Qt(t))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    vt.observe(this, t, e);
  }, s.prototype.unobserve = function(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Qt(t))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    vt.unobserve(this, t);
  }, s.prototype.disconnect = function() {
    vt.disconnect(this);
  }, s.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, s;
}();
class Je extends w {
  constructor(t) {
    super(t);
    const e = window.ResizeObserver || Ze;
    e && (this.observer = new e(([i]) => {
      const { width: n, height: a } = i.contentRect;
      this.player.emit("resize", [n, a]);
    }));
  }
  mounted() {
    var t;
    (t = this.observer) == null || t.observe(this.player.$el);
  }
}
Je.pluginName = "stateResize";
class ts extends w {
  constructor(t) {
    super(t), this._status = !1, this.player.define("isIntersecting", {
      get: () => this._status
    }), window.IntersectionObserver && (this.observer = new window.IntersectionObserver(([e]) => {
      const { isIntersecting: i } = e;
      this._status = i, this.player.emit("intersection", i);
    })), this.player.once("mounted", () => {
      var e;
      (e = this.observer) == null || e.observe(this.player.$el);
    });
  }
}
ts.pluginName = "stateIntersecting";
const Ji = [
  Ce,
  Ue,
  Je,
  ts,
  qe,
  Oe
], tn = [Me, Ie, be, Ne, Pe, ye, Ve], en = [
  Re,
  we,
  ke,
  xe,
  Se,
  Ee,
  Le,
  Te,
  Ae,
  De,
  Fe
], sn = [...Ji, ...tn, ...en];
class es extends w {
  constructor() {
    super(...arguments), this._status = !1;
  }
  init() {
    this.player.hook.register("end", () => {
      if (this.status) {
        const { part: t, list: e } = this.player.getVideoInfo();
        if (t != (e == null ? void 0 : e.length))
          return this.player.next(), !1;
      }
    });
  }
  apply(t, e) {
    e.autoPart && this.toggle(!0);
  }
  ready() {
    if (this.plugin.settings) {
      const t = document.createElement("div");
      this.checkbox = new _e({
        container: t,
        value: this.status,
        onToggle: (e) => {
          this.toggle(e);
        },
        label: "分P连播"
      }), this.plugin.settings.$play.appendChild(t);
    }
  }
  toggle(t) {
    t ? this._status = !0 : this._status = !1, this.player.emit("autoPartChange", t);
  }
  get status() {
    return this._status;
  }
}
es.pluginName = "autoPart";
class ss extends w {
  constructor() {
    super(...arguments), this._status = !1;
  }
  apply(t, e) {
    e.autoPlay && this.toggle(!0);
  }
  ready() {
    if (this.plugin.settings) {
      const t = document.createElement("div");
      this.checkbox = new _e({
        container: t,
        value: this.status,
        onToggle: (e) => {
          this.toggle(e);
        },
        label: "自动播放"
      }), this.plugin.settings.$play.appendChild(t);
    }
  }
  toggle(t) {
    t ? this._status = !0 : this._status = !1, this.player.emit("autoPlayChange", t);
  }
  get status() {
    return this._status;
  }
}
ss.pluginName = "autoPlay";
const Tt = {
  primaryColor: "--mp-primary-color",
  secondaryColor: "--mp-secondary-color",
  borderRadius: "--mp-border-radius",
  bgLight: "--mp-bg-light",
  bgDark: "--mp-bg-dark",
  bgBlack: "--mp-bg-black"
};
class is extends w {
  constructor(t) {
    super(t), this.properties = {}, this._matchDarkScheme = window.matchMedia("(prefers-color-scheme: dark)"), this.themeElement = [this.player.container], this._handleDarkScheme = (e) => {
      this.player.$el.classList.toggle("mpui-dark", e.matches);
    };
  }
  apply(t, e) {
    this.setTheme(e.theme || {});
  }
  /** 设置主题 */
  setTheme(t) {
    Object.assign(this.properties, t), this.themeElement.forEach((e) => {
      let i;
      for (i in t)
        e.style.setProperty(Tt[i], t[i]);
    });
  }
  /** 设置某个主题属性 */
  set(t, e) {
    this.properties[t] = e, this.themeElement.forEach((i) => {
      i.style.setProperty(Tt[t], e);
    });
  }
  get(t) {
    return this.properties[t];
  }
  /** 为元素绑定主题变量 */
  bind(t) {
    this.themeElement.push(t);
    let e;
    for (e in this.properties) {
      const i = this.properties[e];
      i && t.style.setProperty(Tt[e], i);
    }
  }
  setColorScheme(t) {
    this.player.$el.classList.toggle("mpui-dark", t == "dark"), t == "auto" ? this._matchDarkScheme.addEventListener("change", this._handleDarkScheme) : this._matchDarkScheme.removeEventListener("change", this._handleDarkScheme);
  }
}
is.pluginName = "theme";
class ns extends w {
  constructor(t) {
    super(t), this.baseVideoInfo = null;
  }
  init() {
    this.player.hook.register(
      "video.set",
      (t) => {
        var e, i;
        (!((e = this.baseVideoInfo) != null && e.list) || ((i = this.baseVideoInfo) == null ? void 0 : i.list) != t.list) && (this.baseVideoInfo = { ...t }, this.player.emit("partListChange", [])), t.list ? (t.part || (t.part = 1), Object.assign(t, t.list[t.part - 1]), t.hasNext || (t.hasNext = t.part < t.list.length), t.hasPrev || (t.hasPrev = t.part > 1), this.player.emit("partChange", t.part)) : this.player.emit("partChange", 1);
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
    const i = this.player.getVideoInfo();
    t > 0 && t <= (((n = i.list) == null ? void 0 : n.length) || 0) && this.player.setVideo(
      {
        ...this.baseVideoInfo,
        part: t
      },
      e ?? !this.player.paused
    );
  }
  get num() {
    var t;
    return ((t = this.player.getVideoInfo().list) == null ? void 0 : t.length) || 0;
  }
  get list() {
    return this.player.getVideoInfo().list || [];
  }
  get part() {
    return this.player.getVideoInfo().part || 1;
  }
}
ns.pluginName = "part";
class rs extends w {
  constructor(t) {
    super(t);
  }
  /** 无缝加载视频 */
  load(t) {
    this.player.emit("videoLoad", t);
    const { url: e, type: i, play: n, time: a } = t, l = this.player.$video, o = l.cloneNode(), h = this.player.loader.create(t, o);
    o.addEventListener(
      "loadedmetadata",
      () => {
        this.player.$content.insertBefore(o, l);
        const c = a === !0 ? this.player.currentTime : a || 0;
        o.currentTime = c, !this.player.paused && o.play(), o.addEventListener(
          "canplay",
          () => {
            this.player.emit("videoLoad", t), this.player.isPip && o.requestPictureInPicture(), this.player.attachMediaController(h), l.remove(), n == !0 && this.player.paused && this.player.play(), n == !1 && !this.player.paused && this.player.pause();
          },
          { once: !0 }
        );
      },
      { once: !0 }
    );
  }
  ready() {
    this.player.hook.register("video.load", (t) => {
      if (t.time === !0)
        return this.load(t), this.player.emit("videoLoad", t), !1;
    });
  }
}
rs.pluginName = "seamless";
const nn = p`
  <div class="${r}-partlist">
    <ul class="${r}-partlist-list mpui-list"></ul>
  </div>
`, rn = (s, t) => s.map(
  ({ title: e }, i) => p`
      <li
        class="${r}-partlist-item"
        @click=${() => {
    t(i + 1);
  }}
        data-part="${i + 1}"
      >
        <div class="${r}-partlist-item-id">P${i + 1}</div>
        <div class="${r}-partlist-item-title">${e}</div>
      </li>
    `
);
class as extends ct {
  constructor(t) {
    const e = new DocumentFragment();
    $(nn, e), super(t, e.querySelector(`.${r}-partlist`)), this.name = "partList", this.title = "分P列表", this._part = 0, this._list = [], this.$list = this.$(`.${r}-partlist-list`);
  }
  init() {
    this.player.on("videoChange", (t) => {
      this._update(t.list), this._select(t.part || 1);
    });
  }
  _update(t) {
    t != this._list && (this._list = t, $(
      rn(t || [], (e) => {
        var i;
        (i = this.plugin.part) == null || i.set(e);
      }),
      this.$list
    ));
  }
  _select(t) {
    var e, i;
    (e = this.$list.querySelector(`li[data-part="${this._part}"]`)) == null || e.classList.remove("is-selected"), this._part = t, (i = this.$list.querySelector(`li[data-part="${t}"]`)) == null || i.classList.add("is-selected");
  }
}
as.pluginName = "partList";
const an = p`
  <div class="${r}-controls-button ${r}-button-danmakulist">
    <div class="${r}-controls-button-icon">
      <div class="${r}-controls-button-text">弹幕列表</div>
    </div>
    <div class="mpui-tooltip">弹幕列表</div>
  </div>
`;
class ls extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(an, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "danmakuList", this.$icon = this.$(`.${r}-controls-button-icon`), this.$text = this.$(`.${r}-controls-button-text`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.$icon.addEventListener("click", () => {
      var t;
      (t = this.plugin.danmakuList) == null || t.toggle();
    });
  }
}
ls.pluginName = "buttonDanmakuList";
const ln = p`
  <div class="${r}-controls-button ${r}-button-quality">
    <div class="${r}-controls-button-icon">
      <div class="${r}-controls-button-text">自动</div>
    </div>

    <div class="${r}-controls-panel-wrap">
      <div class="${r}-controls-panel">
        <ul class="${r}-button-quality-list"></ul>
      </div>
    </div>
  </div>
`;
class os extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(ln, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "quality", this._itemMap = /* @__PURE__ */ new Map(), this.$icon = this.$(`.${r}-controls-button-icon`), this.$text = this.$(`.${r}-controls-button-text`), this.$panel = this.$(`.${r}-controls-panel`), this.$list = this.$(`.${r}-button-quality-list`);
  }
  init() {
    this.player.on("qualityListUpdate", (t) => {
      this._updateList(t);
    }), this.player.on("qualityChanging", (t) => {
      this._updateItem(t);
    }), this.player.on("qualityChanged", (t) => {
      this._updateItem(t);
    }), this.player.on("qualityChangeFailed", () => {
      this._updateItem(this.player.quality.current || {});
    });
  }
  _updateList(t) {
    this._itemMap = /* @__PURE__ */ new Map(), t.length ? (this.$panel.style.display = "", this.$icon.style.cursor = "") : (this.$panel.style.display = "none", this.$icon.style.cursor = "default"), this.$list.innerHTML = "";
    const e = new DocumentFragment();
    t == null || t.forEach((i) => {
      var a;
      const n = i.label || ((a = this.getLabel) == null ? void 0 : a.call(this, i)) || i.quality;
      if (n) {
        const l = H(
          "li",
          {
            class: `${r}-button-quality-item`,
            "data-value": i.quality || ""
          },
          typeof n == "string" ? new Text(n) : n
        );
        l.onclick = () => {
          var o;
          (o = this.player.quality) == null || o.set(i);
        }, this._itemMap.set(i, l), e.appendChild(l);
      }
    }), this.$list.appendChild(e);
  }
  _updateItem(t) {
    var i, n;
    const e = t.buttonLabel || ((i = this.getButtonLabel) == null ? void 0 : i.call(this, t)) || (typeof t.label == "object" ? t.label.cloneNode(!0) : t.label) || ((n = this.getLabel) == null ? void 0 : n.call(this, t)) || t.quality;
    e ? (this.show(), typeof e == "string" ? this.$text.innerText = e : (this.$text.innerHTML = "", this.$text.appendChild(e))) : this.hide(), this.$list.querySelectorAll("li").forEach((a) => {
      a.classList.toggle("is-checked", a == this._itemMap.get(t));
    });
  }
  get ignored() {
    return !this.player.quality;
  }
}
os.pluginName = "buttonQuality";
class hs extends w {
  constructor() {
    super(...arguments), this.current = null, this.target = null, this.list = [];
  }
  init() {
    this.player.hook.register("video.set", () => {
      this.current = null, this.target = null, this.list = [];
    });
  }
  apply() {
    this.player.define("quality", { value: this });
  }
  /** 切换视频质量 */
  set(t) {
    let e;
    if (typeof t == "string") {
      const i = this.list.find((n) => e === n.quality);
      if (!i) {
        this._emitChangeFailed({});
        return;
      }
      e = i;
    } else
      e = t;
    e.change ? e.change(e.url).then(
      () => {
        this.updateCurrent(e);
      },
      () => {
        this._emitChangeFailed(e);
      }
    ) : e.url && (this.player.loadVideo({ url: e.url, type: e.type, play: !0, time: !0 }), this.player.once("canplay", () => {
      this.updateCurrent(e);
    }));
  }
  _emitChangeFailed(t) {
    this.target = null, this.player.emit("qualityChangeFailed", t);
  }
  /** 更新当前视频质量 */
  async updateCurrent(t) {
    this.current = t, this.target = null, this.player.emit("qualityChanged", t);
  }
  /** 更新视频质量列表 */
  async updateList(t) {
    this.list = t, this.player.emit("qualityListUpdate", t);
  }
}
hs.pluginName = "quality";
const on = p`
  <div class="${r}-videostatus-paused"></div>
  <div class="${r}-videostatus-loading">
    <div class="${r}-videostatus-loading-icon">
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
    <div class="${r}-videostatus-loading-content">正在缓冲</div>
    <div class="${r}-videostatus-loading-speed"></div>
  </div>
  <div class="${r}-videostatus-volume"></div>
`;
class cs extends w {
  constructor(t) {
    super(t), this.$el = H("div", { class: `${r}-videostatus` }), $(on, this.$el), this.$paused = this.$el.querySelector(`.${r}-videostatus-paused`), this.$loading = this.$el.querySelector(`.${r}-videostatus-loading`), this.$volume = this.$el.querySelector(`.${r}-videostatus-volume`), this.player.$area.appendChild(this.$el);
  }
}
cs.pluginName = "videoStatus";
const hn = p`
  <div class="${r}-loadingmask-icon">
    <div class="${r}-loadingmask-image"></div>
  </div>
  <div class="${r}-loadingmask-info"></div>
  <div class="${r}-loadingmask-tips">Loading...</div>
`;
class ds extends w {
  constructor(t) {
    super(t), this.delay = 0, this.$el = H("div", { class: `${r}-loadingmask` }), $(hn, this.$el), this.$info = this.$el.querySelector(`.${r}-loadingmask-info`), this.$tips = this.$el.querySelector(`.${r}-loadingmask-tips`), this.player.$main.appendChild(this.$el);
  }
  apply(t, e) {
    var i, n;
    this.getTips = (i = e.loadingMask) == null ? void 0 : i.getTips, this.delay = ((n = e.loadingMask) == null ? void 0 : n.delay) || 0;
  }
  init() {
    this._toggle(!0), this._add("init", "播放器初始化…"), this.player.on("danmaku:loading", () => {
      this._add("danmaku", "请求弹幕数据中…");
    }), this.player.on("danmaku:loaded", (t, e) => {
      this._change("danmaku", (i) => {
        e ? i.innerText = `请求弹幕数据中… [失败] ${e}` : i.innerText = "请求弹幕数据中… [完成]";
      });
    }), this.player.on("videoChange", async () => {
      var t;
      this._toggle(!0), this._tips(await ((t = this.getTips) == null ? void 0 : t.call(this)));
    }), this.player.on("videoLoad", () => {
      this._add("video", "请求视频数据中…"), this.player.once("canplay", () => {
        this._change("video", (t) => {
          t.innerText = "请求视频数据中… [完成]";
          let e = 0;
          const i = () => {
            this._toggle(!1), this._tips("Loading..."), this._clear(), window.clearTimeout(e);
          };
          this.delay ? e = window.setTimeout(i, this.delay) : i();
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
  ready() {
    this._change("init", (t) => {
      t.innerText = "播放器初始化… [完成]";
    });
  }
  _clear() {
    this.$info.innerHTML = "";
  }
  _add(t, e) {
    const i = H("div", { class: `${r}-loadingmask-info-item` });
    i.dataset.id = t, i.append(e), this.$info.appendChild(i);
  }
  _change(t, e) {
    const i = this.$info.querySelector(`[data-id="${t}"]`);
    i && e(i);
  }
  _toggle(t) {
    this.$el.classList.toggle("is-show", t);
  }
  _tips(t) {
    this.$tips.innerHTML = "", t && this.$tips.append(t);
  }
}
ds.pluginName = "loadingMask";
class us extends F {
  constructor(t) {
    super(t, H("div", { class: `${r}-videotitle` })), this.name = "title";
  }
  init() {
    this.player.on("videoChange", (t) => {
      console.log(t.title), this.$el.innerText = t.title || "";
    });
  }
}
us.pluginName = "videoTitle";
const cn = () => p`
  <div class="${r}-header-mask"></div>
  <div class="${r}-header-main mpui-crystal">
    <div class="${r}-header-left"></div>
    <div class="${r}-header-center"></div>
    <div class="${r}-header-right"></div>
  </div>
`;
class ps extends w {
  constructor(t) {
    super(t), this.isHover = !1, this.player = t, this.$el = H("div", { class: `${r}-header` }), $(cn(), this.$el), this.$main = this.$el.querySelector(`.${r}-header-main`), this.$left = this.$el.querySelector(`.${r}-header-left`), this.$center = this.$el.querySelector(`.${r}-header-center`), this.$right = this.$el.querySelector(`.${r}-header-right`), this.player.$main.append(this.$el), this.inactiveHook = () => !this.isHover, this.mouseEnterHandler = () => {
      this.isHover = !0;
    }, this.mouseLeaveHandler = () => {
      this.isHover = !1;
    };
  }
  init() {
    this.player.hook.register("inactive", this.inactiveHook), this.$el.addEventListener("mouseenter", this.mouseEnterHandler), this.$el.addEventListener("mouseleave", this.mouseLeaveHandler);
  }
  destroy() {
    this.player.hook.unregister("inactive", this.inactiveHook), this.$el.removeEventListener("mouseenter", this.mouseEnterHandler), this.$el.removeEventListener("mouseleave", this.mouseLeaveHandler);
  }
}
ps.pluginName = "header";
class ms extends w {
  constructor(t) {
    super(t), this.handler = {}, this._status = !0, this.invoke = {}, this.$el = H("div", { class: `${r}-danmaku-wrap` }), this.player.$content.after(this.$el);
  }
  get status() {
    return this._status;
  }
  init() {
    this.player.define("danmaku", { value: this });
  }
  apply(t, e) {
    this.invoke = e.danmakuInvoke || {};
  }
  /**
   * 添加弹幕到弹幕池
   * @param dan 要添加的弹幕
   * @param play 是否播放超时弹幕
   * */
  add(t, e) {
    this.player.emit("danmaku:add", t, e || !1);
  }
  /**
   * 绘制一条弹幕
   * @param dm 要绘制的弹幕
   * */
  draw(t) {
    this.player.emit("danmaku:draw", t);
  }
  /**
   * 从弹幕池中移除弹幕
   * @param ids 要移除的弹幕id
   * */
  remove(t) {
    this.player.emit("danmaku:remove", t);
  }
  /** 清空弹幕池 */
  clear() {
    this.player.emit("danmaku:clear");
  }
  /** 切换弹幕显示 */
  toggle(t) {
    t ? (this._status = !0, this.player.emit("danmaku:on")) : t != null ? (this._status = !1, this.player.emit("danmaku:off")) : this.toggle(!this._status);
  }
  // 弹幕屏蔽
  /**
   * 弹幕类型屏蔽
   * @param type 类型
   * @param flag 设置是否屏蔽
   */
  filterType(t, e) {
    this.player.emit("danmaku:filter", t, e);
  }
}
ms.pluginName = "danmaku";
var yt = /* @__PURE__ */ ((s) => (s[s.roll = 1] = "roll", s[s.bottom = 4] = "bottom", s[s.top = 5] = "top", s[s.reverse = 6] = "reverse", s[s.special = 7] = "special", s[s.advanced = 9] = "advanced", s))(yt || {});
class dn {
  constructor(t, e) {
    this.paused = !1, this.hidden = !1, this.time = 0, this.list = [], this.currentIndex = 0, this.measureContext = null, this.startDistance = 2, this.timeOffset = 0, this.baseSpeed = 100, this.baseDuration = 5, this.deltaSpeed = 2e-3, this.trackHeights = {
      roll: [],
      reverse: [],
      top: [],
      bottom: []
    }, this.danmakuTracks = {
      roll: [],
      reverse: [],
      top: [],
      bottom: []
    }, this.container = t, this.fontScale = e.fontScale ?? 1, this.baseTrackHeight = 28, this.trackPadding = 6, this.speed = e.speed ?? 1, this.opacity = e.opacity ?? 1, this.limitArea = 1, this.overlap = !1, this.fontFamily = e.fontFamily ?? "SimHei", this.fontWeight = e.fontWeight ?? "bold", this.classPrefix = e.classPrefix ?? "meon", this.colorFilter = e.colorFilter || !1, this.trackFilter = Object.assign(
      {
        roll: !1,
        reverse: !1,
        top: !1,
        bottom: !1
      },
      e.trackFilter
    ), this.userFilter = e.userFilter || [], this.contentFilter = e.contentFilter || [], this.getTime = e.getTime, this.container.classList.add(`${this.classPrefix}-danmaku`), this.checkDanmaku();
  }
  play() {
    this.paused = !1, this.container.classList.remove("is-paused");
  }
  pause() {
    this.paused = !0, this.container.classList.add("is-paused");
  }
  /** 发生跳转 */
  seek() {
    this.clear(), this.time = this.getTime();
    const t = this.list.findIndex((e) => this.time <= e.time);
    this.currentIndex = t === -1 ? this.list.length : t;
  }
  /** 设置弹幕池 */
  setPool(t) {
    this.list = [...t], this.list.sort((i, n) => i.time - n.time);
    const e = this.list.findIndex((i) => this.time <= i.time);
    this.currentIndex = e === -1 ? this.list.length : e;
  }
  /** 重置弹幕池 */
  reset() {
    this.clear(), this.list = [], this.currentIndex = 0;
  }
  /** 弹幕池添加弹幕 */
  add(t, e) {
    t.forEach((i) => {
      const n = this.list.findIndex((a) => i.time <= a.time);
      this.list.splice(n === -1 ? this.list.length : n, 0, i), i.time < this.time && (this.currentIndex += 1, e && this.draw(t));
    });
  }
  /** 弹幕池移除弹幕 */
  remove(t) {
    const e = [
      ...this.container.querySelectorAll(`.${this.classPrefix}-danmaku-item`)
    ];
    t.forEach((i) => {
      const n = this.list.indexOf(i);
      if (n === -1)
        return;
      this.list.splice(n, 1), n < this.currentIndex && (this.currentIndex -= 1);
      const a = e.find((l) => l.dataset.id === i.id.toString());
      a && (a.innerHTML = "");
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
    if (this.list.length && !this.paused && !this.hidden) {
      let t = this.list[this.currentIndex];
      const e = [];
      for (this.time = this.getTime(); t && t.time < this.time; )
        this.checkTrackFilter(t) && this.checkColorFilter(t) && this.checkUserFilter(t) && this.checkContentFilter(t) && e.push(t), this.currentIndex += 1, t = this.list[this.currentIndex];
      this.draw(e);
    }
    window.requestAnimationFrame(() => {
      this.checkDanmaku();
    });
  }
  /** 设置弹幕类型过滤 */
  setTrackFilter(t, e) {
    this.trackFilter[t] = e, e && this.container.querySelectorAll(`.${this.classPrefix}-danmaku-${t}`).forEach((i) => {
      i.innerHTML = "";
    });
  }
  /** 检查弹幕类型过滤 */
  checkTrackFilter(t) {
    return !this.trackFilter[yt[t.mode]];
  }
  /** 设置弹幕颜色过滤 */
  setColorFilter(t) {
    this.colorFilter = t, t && this.container.querySelectorAll(
      `.${this.classPrefix}-danmaku-item`
    ).forEach((i) => {
      i.style.color !== "rgb(255, 255, 255)" && (i.innerHTML = "");
    });
  }
  /** 检查弹幕颜色过滤 */
  checkColorFilter(t) {
    return !this.colorFilter || t.color === 16777215;
  }
  /** 设置内容过滤 */
  setContentFilter(t, e) {
    const i = this.contentFilter.indexOf(t);
    if (e) {
      if (i > -1)
        return;
      this.contentFilter.push(t);
      const n = this.container.querySelectorAll(
        `.${this.classPrefix}-danmaku-item`
      );
      typeof t == "string" ? n.forEach((a) => {
        a.innerText.includes(t) && (a.innerHTML = "");
      }) : n.forEach((a) => {
        t.test(a.innerText) && (a.innerHTML = "");
      });
    } else
      i > -1 && this.contentFilter.splice(i, 1);
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
    const i = this.userFilter.indexOf(t);
    if (e) {
      if (i > -1)
        return;
      this.userFilter.push(t), this.container.querySelectorAll(
        `.${this.classPrefix}-danmaku-item`
      ).forEach((a) => {
        a.dataset.user == t && (a.innerHTML = "");
      });
    } else
      i > -1 && this.userFilter.splice(i, 1);
  }
  /** 检查用户过滤 */
  checkUserFilter(t) {
    return this.userFilter.indexOf(t.user) == -1;
  }
  /** 绘制弹幕 */
  draw(t) {
    var x, _, L;
    const e = this.baseTrackHeight * this.fontScale, i = this.container.offsetWidth, n = this.container.offsetHeight * this.limitArea, a = Math.floor(n / e);
    this.trackHeights.roll.length !== a && (this.trackHeights.roll = J(a, e)), this.trackHeights.reverse.length !== a && (this.trackHeights.reverse = J(a, e)), this.trackHeights.top.length !== a && (this.trackHeights.top = J(a, e)), this.trackHeights.bottom.length !== a && (this.trackHeights.bottom = J(a, e));
    const l = (v) => {
      const m = this.container.getBoundingClientRect().right, d = v.getBoundingClientRect().right;
      return m - d;
    }, o = (v) => {
      const m = this.container.getBoundingClientRect().left;
      return v.getBoundingClientRect().left - m;
    }, h = (v) => this.baseSpeed * (1 + this.deltaSpeed * v) * this.speed, c = (v, m) => [
      ...this.container.querySelectorAll(`.${this.classPrefix}-danmaku-${v}`)
    ].filter((d) => d.dataset.track === `${m}`), u = (v, m, d) => {
      t:
        for (let g = 0; this.overlap || g < a; g++) {
          const E = c(m, g);
          let b = this.danmakuTracks[m][g];
          if (this.danmakuTracks[m][g] = E, b && b.length) {
            if (m === "roll") {
              const T = i / h(d);
              b.length !== E.length && (b = E);
              for (const k of b) {
                const S = l(k) - 10;
                if (this.trackHeights[m][g] = parseInt(k.style.fontSize) + this.trackPadding, S <= i - T * h(k.getBoundingClientRect().width) || S <= 0)
                  continue t;
              }
            } else if (m === "reverse") {
              const T = i / h(d);
              b.length !== E.length && (b = E);
              for (const k of b) {
                const S = o(k) - 10;
                if (this.trackHeights[m][g] = parseInt(k.style.fontSize) + this.trackPadding, S <= i - T * h(k.getBoundingClientRect().width) || S <= 0)
                  continue t;
              }
            } else
              continue t;
            return this.danmakuTracks[m][g].push(v), v.addEventListener("animationend", () => {
              var k, S;
              const T = (k = this.danmakuTracks[m][g]) == null ? void 0 : k.indexOf(v);
              T && ((S = this.danmakuTracks[m][g]) == null || S.splice(T, 1));
            }), g;
          } else
            return Array.isArray(this.danmakuTracks[m][g]) ? this.danmakuTracks[m][g].push(v) : this.danmakuTracks[m][g] = [v], v.addEventListener("animationend", () => {
              var k, S;
              const T = (k = this.danmakuTracks[m][g]) == null ? void 0 : k.indexOf(v);
              T && ((S = this.danmakuTracks[m][g]) == null || S.splice(T, 1));
            }), g;
        }
      return -1;
    }, f = document.createDocumentFragment();
    for (let v = 0; v < t.length; v++) {
      const m = t[v];
      if (m.mode >= 7)
        continue;
      const d = document.createElement("div");
      d.classList.add(`${this.classPrefix}-danmaku-item`), d.classList.add(`${this.classPrefix}-danmaku-${yt[m.mode]}`), d.innerHTML = `${m.content.replace(/(\\n)/g, `
`)}`, typeof m.color == "number" ? d.style.color = Ds(m.color) : d.style.color = m.color, d.style.opacity = this.opacity.toString(), d.style.fontSize = +m.size * this.fontScale + "px", m.fromHere && (d.style.border = "2px solid white"), d.addEventListener("animationend", () => {
        [...this.container.children].indexOf(d) > -1 && this.container.removeChild(d);
      });
      const g = this.measureTextWidth(
        m.content,
        `${this.fontWeight} ${+m.size * this.fontScale}px ${this.fontFamily}`
      );
      let E = yt[m.mode], b, T;
      switch (E) {
        case "roll":
        case "reverse":
          if (T = u(d, E, g), b = T % a, b >= 0) {
            const k = this.trackHeights[E].slice(0, a).reduce((D, M) => D + M, 0), S = this.trackHeights[E].slice(0, b).reduce((D, M) => D + M, 0) % k;
            if (S + parseInt(d.style.fontSize) + this.trackPadding > n) {
              (x = this.danmakuTracks[E][v]) == null || x.pop();
              return;
            }
            const A = h(g), y = g + i + this.startDistance * 2;
            d.dataset.track = T.toString(), d.style.width = g + 1 + "px", d.style.top = S + "px", d.style.fontFamily = this.fontFamily, d.style.fontWeight = this.fontWeight, d.style.setProperty("--duration", `${y / A}s`), d.style.setProperty("--offset", `${i + this.startDistance}px`), d.style.setProperty("--translateX", `${-y}px`);
          }
          break;
        case "top":
          if (b = u(d, E, 0) % a, b >= 0) {
            const k = [], S = this.danmakuTracks.top;
            for (const y of S)
              k.push(...y);
            const A = k.map((y) => parseInt(y.style.fontSize) + this.trackPadding).slice(0, b).reduce((y, D) => y + D, 0);
            if (A + parseInt(d.style.fontSize) + this.trackPadding > n) {
              (_ = this.danmakuTracks[E][v]) == null || _.pop();
              return;
            }
            d.dataset.track = b.toString(), d.style.width = g + 1 + "px", d.style.marginLeft = `-${(g + 1) * 0.5}px`, d.style.top = A + "px", d.style.fontFamily = this.fontFamily, d.style.fontWeight = this.fontWeight, d.style.setProperty("--duration", `${this.baseDuration / this.speed}s`);
          }
          break;
        case "bottom":
          if (E = "bottom", b = u(d, E, 0) % a, b >= 0) {
            const k = [], S = this.danmakuTracks.bottom;
            for (const y of S)
              k.push(...y);
            const A = k.map((y) => parseInt(y.style.fontSize) + this.trackPadding).slice(0, b).reduce((y, D) => y + D, 0);
            if (A + parseInt(d.style.fontSize) + this.trackPadding > n) {
              (L = this.danmakuTracks[E][v]) == null || L.pop();
              return;
            }
            d.dataset.track = b.toString(), d.style.width = g + 1 + "px", d.style.marginLeft = `-${(g + 1) * 0.5}px`, d.style.bottom = A + "px", d.style.fontFamily = this.fontFamily, d.style.fontWeight = this.fontWeight, d.style.setProperty("--duration", `${this.baseDuration / this.speed}s`);
          }
          break;
        default:
          b = -1, console.error(`无法处理的弹幕模式: ${m.mode}`);
      }
      b >= 0 && (d.dataset.id = m.id.toString(), d.dataset.user = m.user.toString(), this.container.appendChild(d));
    }
    return f;
  }
  /** 测量字体宽度 */
  measureTextWidth(t, e) {
    return this.measureContext || (this.measureContext = document.createElement("canvas").getContext("2d")), this.measureContext.font = e, this.measureContext.measureText(t).width;
  }
  /** 根据某一坐标捕获弹幕DOM */
  captureDanmakuDOM(t, e, i, n = !1) {
    const a = [], l = this.container.querySelectorAll(`.${this.classPrefix}-danmaku-item`);
    for (const o of l)
      if (o.innerHTML) {
        const h = o.getBoundingClientRect(), c = this.container.getBoundingClientRect(), u = h.left - c.left, f = h.right - c.left, x = h.top - c.top, _ = h.bottom - c.top;
        if (t >= u - i && t <= f + i && e >= x - i && e <= _ + i && (a.push(o), n))
          return a;
      }
    return a;
  }
  /** 根据某一坐标捕获弹幕 */
  captureDanmaku(t, e, i, n = !1) {
    const a = this.captureDanmakuDOM(t, e, i, n), l = [];
    for (const o of a) {
      const h = this.getDanmakuById(o.dataset.id);
      h && l.push(h);
    }
    return l;
  }
  /** 根据id获取弹幕 */
  getDanmakuById(t) {
    return this.list.find((e) => e.id.toString() === t.toString());
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
class vs extends w {
  constructor(t) {
    super(t), this.$el = this.plugin.danmaku.$el.appendChild(
      H("div", { class: `${r}-rowdanmaku` })
    ), this.core = new dn(this.$el, {
      getTime: () => this.player.currentTime,
      classPrefix: r
    });
  }
  init() {
    this.player.on("play", () => {
      this.core.play();
    }), this.player.on("pause", () => {
      this.core.pause();
    }), this.player.on("seeking", () => {
      this.core.pause(), this.core.seek();
    }), this.player.on("seeked", () => {
      !this.player.paused && this.core.play();
    }), this.player.on("danmaku:filter", (t, e) => {
      switch (t) {
        case "top":
        case "bottom":
        case "roll":
        case "reverse":
          this.core.setTrackFilter(t, e);
          return;
        case "color":
          this.core.setColorFilter(e);
      }
    }), this.player.on("danmaku:add", (t, e) => {
      this.core.add(t, e);
    }), this.player.on("danmaku:remove", (t) => {
      this.core.remove(t);
    }), this.player.on("danmaku:draw", (t) => {
      this.core.draw([t]);
    }), this.player.on("danmaku:blockUser", (t, e) => {
      this.core.setUserFilter(t, e);
    }), this.player.on("danmaku:blockContent", (t, e) => {
      this.core.setContentFilter(t, e);
    }), this.player.on("danmaku:clear", () => {
      this.core.clear();
    }), this.player.on("danmaku:on", () => {
      this.core.show();
    }), this.player.on("danmaku:off", () => {
      this.core.hide();
    });
  }
  apply(t, e) {
    if (e.danmaku) {
      const { scale: i, font: n, bold: a, speed: l, opacity: o } = e.danmaku;
      i && this.setScale(i), n && this.setFont(n), a != null && this.setBold(a), l && this.setSpeed(l), o && this.setOpacity(o);
    }
  }
  // 弹幕播放属性设置
  /** 设置弹幕不透明度 */
  setOpacity(t) {
    this.core.opacity = t, this.player.emit("danmaku:opacityChange", t);
  }
  /** 设置弹幕速度 */
  setSpeed(t) {
    this.core.speed = t, this.player.emit("danmaku:speedChange", t);
  }
  /** 设置弹幕区域 */
  setArea(t) {
    this.core.limitArea = t, this.player.emit("danmaku:areaChange", t);
  }
  /** 设置弹幕大小 */
  setScale(t) {
    this.core.fontScale = t, this.player.emit("danmaku:scaleChange", t);
  }
  /** 设置弹幕字体 */
  setFont(t) {
    this.core.fontFamily = t, this.player.emit("danmaku:fontChange", t);
  }
  /** 设置弹幕加粗 */
  setBold(t) {
    this.core.fontWeight = t ? "bold" : "", this.player.emit("danmaku:boldChange", t);
  }
  /** 根据坐标捕获弹幕 */
  capture(t, e, i) {
    return this.core.captureDanmaku(t, e, i);
  }
}
vs.pluginName = "danmakuEngine";
let re = 1e3;
const ae = [
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
function un() {
  const s = [], t = ae.length;
  for (let e = 0; e < 8; e++)
    s.push(ae[Math.floor(Math.random() * t)]);
  return re++, s.join("") + `${re}`;
}
class gs extends w {
  constructor() {
    super(...arguments), this.type = "", this.parser = pn;
  }
  get danmaku() {
    return this.player.danmaku;
  }
  init() {
    this.player.on("videoChange", (t) => {
      this.reload(t);
    });
  }
  apply(t, e) {
    var i;
    this.type = ((i = e.danmaku) == null ? void 0 : i.type) || "", this.parser = Object.assign(this.parser, e.danmakuParser);
  }
  /** 从响应中获取数据 */
  async getResponseData(t, e) {
    return e == "json" ? await t.json() : e == "xml" ? new DOMParser().parseFromString(await t.text(), "text/xml") : await t.text();
  }
  parse(t, e) {
    if (e) {
      const i = this.parser[e];
      if (!i)
        throw "未知弹幕格式";
      try {
        return i.parse(t);
      } catch {
        throw "无法正确解析弹幕格式";
      }
    } else
      return t;
  }
  /** 加载附加弹幕文件 */
  loadSource({ url: t, type: e }) {
    fetch(t).then((i) => this.getResponseData(i, this.parser[e].type)).then((i) => this.parse(i, e)).then((i) => {
      i && this.add(i), this.player.emit("danmaku:loaded", i, { url: t });
    }).catch((i) => {
      this.player.emit("danmaku:loadFailed", i, { url: t }), console.error(i);
    });
  }
  /** 加载弹幕 */
  load(t) {
    var e, i;
    (i = (e = this.danmaku.invoke).get) == null || i.call(e, t).then((n) => this.parse(n, this.type)).then((n) => {
      n && this.add(n), this.player.emit("danmaku:loaded", n, t);
    }).catch((n) => {
      this.player.emit("danmaku:loadFailed", n, t);
    });
  }
  add(t) {
    this.danmaku.add(t);
  }
  /** 重载弹幕 */
  async reload(t) {
    var e;
    this.danmaku.clear(), this.player.emit("danmaku:loading"), this.load(t), (e = t.danmaku) == null || e.forEach((i) => {
      this.loadSource(i);
    });
  }
}
gs.pluginName = "danmakuLoader";
const pn = {
  "bilibili-xml": {
    type: "xml",
    parse: (s) => {
      const t = [], e = s.childNodes, i = (n) => {
        var a;
        for (let l = 0; l < n.length; l++) {
          const o = n[l];
          if ((a = o == null ? void 0 : o.attributes) != null && a.length && l > 0) {
            const h = o.attributes[0].nodeValue.split(","), c = o.innerHTML;
            t.push([c, h]);
          } else
            o.childNodes.length > 0 && i(o.childNodes);
        }
      };
      return i(e), t.map(([n, a]) => ({
        time: +a[0],
        mode: +a[1],
        color: +a[3],
        user: a[6],
        content: n,
        size: +a[2],
        date: +a[4],
        id: +a[7]
      }));
    }
  },
  dplayer: {
    type: "json",
    parse: (s) => s.map((t, e) => ({
      time: t[0],
      mode: [1, 5, 4, 6][t[1]],
      color: t[2],
      user: t[3],
      content: t[4],
      size: 25,
      date: 0,
      id: un()
    }))
  },
  mfuns: {
    type: "json",
    parse: (s) => s.map((t) => ({
      time: t[0],
      mode: t[1],
      color: t[2],
      user: t[3],
      content: t[4],
      size: t[5],
      date: t[6] > 1 ? t[6] : 0,
      id: t[7]
    }))
  }
};
class $s extends w {
  get danmaku() {
    return this.player.danmaku;
  }
  get invoke() {
    var t;
    return ((t = this.player.danmaku) == null ? void 0 : t.invoke) || {};
  }
  /**
   * 发送弹幕
   * @param danmaku 要发送的弹幕
   * @return 操作结果
   * */
  async send(t) {
    if (!this.invoke.send)
      throw "发送失败";
    return await this.invoke.send(t, this.player.getVideoInfo()).then((e) => (this.danmaku.add(
      [
        Object.assign(
          {
            id: `send:${Date.now()}`,
            date: Math.floor(Date.now() / 1e3),
            user: this.player.userId || 0,
            fromHere: !0
          },
          t
        )
      ],
      !0
    ), e)).catch((e) => {
      throw e;
    });
  }
  /**
   * 举报弹幕
   * @param danmaku 要举报的弹幕
   * @return 操作结果
   * */
  async report(t) {
    if (!this.invoke.report)
      throw "操作失败";
    return await this.invoke.report(t, this.player.getVideoInfo()).then((e) => (this.danmaku.remove([t]), e)).catch((e) => {
      throw e;
    });
  }
  /**
   * 删除弹幕
   * @param danmaku 要删除的弹幕
   * @return 操作结果
   * */
  async delete(t) {
    if (!this.invoke.delete)
      throw "操作失败";
    return await this.invoke.delete(t, this.player.getVideoInfo()).then((e) => (this.danmaku.remove(t), e)).catch((e) => {
      throw e;
    });
  }
  /**
   * 删除自己发送的弹幕
   * @param danmaku 要删除的弹幕
   * @return 操作结果
   * */
  async recall(t) {
    if (!this.invoke.recall)
      throw "操作失败";
    return await this.invoke.recall(t, this.player.getVideoInfo()).then((e) => (this.danmaku.remove([t]), e)).catch((e) => {
      throw e;
    });
  }
  /**
   * 屏蔽用户
   * @param user 用户id
   * @param flag 设置屏蔽状态
   * @return 操作结果
   * */
  async blockUser(t, e) {
    if (!this.invoke.blockUser)
      throw "操作失败";
    return await this.invoke.blockUser(t, e).then(() => {
      this.player.emit("danmaku:blockUser", t, e);
    }).catch((i) => {
      throw i;
    });
  }
  /**
   * 屏蔽关键词
   * @param content 关键词内容
   * @param flag 设置屏蔽状态
   * @return 操作结果
   * */
  async blockContent(t, e) {
    if (!this.invoke.blockContent)
      throw "操作失败";
    return await this.invoke.blockContent(t, e).then((i) => {
      this.player.emit("danmaku:blockContent", t, e);
    }).catch((i) => {
      throw i;
    });
  }
}
$s.pluginName = "danmakuOperate";
const mn = p`
  <div class="${r}-controls-button ${r}-button-danmakutoggle is-on">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-danmaku-off"></i>
      <i class="mpicon-danmaku"></i>
    </div>
    <div class="mpui-tooltip">关闭弹幕</div>
  </div>
`;
class fs extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(mn, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "danmakuToggle", this.$icon = this.$(`.${r}-controls-button-icon`), this.$tooltip = this.$(".mpui-tooltip");
  }
  init() {
    this.player.on("danmaku:on", () => {
      this._change(!0);
    }), this.player.on("danmaku:off", () => {
      this._change(!1);
    }), this.$icon.addEventListener("click", () => {
      var t;
      (t = this.plugin.danmaku) == null || t.toggle();
    });
  }
  /** 设置按钮状态 */
  _change(t) {
    this.$el.classList.toggle("is-on", t), this.$tooltip.innerText = t ? "关闭弹幕" : "开启弹幕";
  }
}
fs.pluginName = "buttonDanmakuToggle";
const vn = p`
  <div class="${r}-danmakubar">
    <div class="${r}-danmakubar-slot"></div>
    <div class="${r}-danmakubar-input-wrap">
      <div class="${r}-danmakubar-input-slot"></div>
      <input type="text" autocompleted="new-password" class="${r}-danmakubar-input" />
      <div class="${r}-danmakubar-status-loading">弹幕功能加载中...</div>
      <div class="${r}-danmakubar-status-login">需要<a>登录</a>后才能发送弹幕哦~</div>
      <div class="${r}-danmakubar-send">发送</div>
    </div>
  </div>
`;
class ys extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $(vn, e), super(t, e.querySelector(`.${r}-danmakubar`)), this.name = "danmakuBar", this.danmakuColor = 16777215, this.danmakuMode = 1, this.danmakuSize = 25, this.coolDownTimer = 0, this.controller = this.plugin.controller, this.danmaku = this.plugin.danmaku, this.$send = this.$el.querySelector(`.${r}-danmakubar-send`), this.$input = this.$el.querySelector(`.${r}-danmakubar-input`), this.$slot = this.$el.querySelector(`.${r}-danmakubar-slot`), this.$inputSlot = this.$el.querySelector(`.${r}-danmakubar-input-slot`), this.$logina = this.$el.querySelector(`.${r}-danmakubar-status-login a`), this.$logina.onclick = () => {
      var i, n;
      return (n = (i = this.player).login) == null ? void 0 : n.call(i);
    }, this.player.on("videoChange", () => {
      this.setLoading(!0);
    }), this.player.on("loadeddata", () => {
      this.setLoading(!1);
    }), this.$input.addEventListener("keydown", (i) => {
      i.keyCode == O.Enter && this.send();
    }), this.$send.onclick = () => {
      this.send();
    };
  }
  /** 是否需要登录 */
  get loginRequired() {
    return this.$el.classList.contains("is-login");
  }
  apply(t, e) {
    var i, n;
    (i = e.danmakuBar) != null && i.loginRequired && this.setLoginRequired(!0), this.setPlaceHolder(((n = e.danmakuBar) == null ? void 0 : n.placeholder) || gn);
  }
  setPlaceHolder(t) {
    this.$input.placeholder = t;
  }
  /** 执行弹幕发送操作 */
  send() {
    var t;
    !this.$input.value.trim() || this.coolDownTimer || ((t = this.plugin.danmakuOperate) == null || t.send(this.generateDanmaku()), this.$input.value = "");
  }
  /** 设置弹幕发送冷却 */
  setCoolDown(t) {
    this.coolDownTimer && window.clearInterval(this.coolDownTimer);
    let e = Math.round(t);
    this.$send.classList.add("is-disabled"), this.$send.innerText = `${e}秒`, this.coolDownTimer = window.setInterval(() => {
      e -= 1, e ? this.$send.innerText = `${e}秒` : (this.$send.innerText = "发送", this.$send.classList.remove("is-disabled"), window.clearInterval(this.coolDownTimer), this.coolDownTimer = 0);
    }, 1e3);
  }
  generateDanmaku() {
    return {
      time: this.player.currentTime,
      content: this.$input.value,
      mode: this.danmakuMode,
      color: this.danmakuColor,
      size: this.danmakuSize
    };
  }
  /** 设置登录限制 */
  setLoginRequired(t) {
    t ? this.$el.classList.add("is-login") : this.$el.classList.remove("is-login");
  }
  /** 设置加载状态 */
  setLoading(t) {
    t ? this.$el.classList.add("is-loading") : this.$el.classList.remove("is-loading");
  }
}
ys.pluginName = "danmakuBar";
const gn = "发条弹幕吧~", $n = p`
  <div class="${r}-controls-button ${r}-button-danmakusettings">
    <div class="${r}-controls-button-icon">
      <i class="mpicon-danmaku-settings"></i>
    </div>
    <div class="${r}-controls-panel-wrap">
      <div class="${r}-controls-panel ${r}-controls-panel-danmaku-settings">
        <div class="${r}-panel-row">
          <div class="${r}-row-label">类型屏蔽</div>
          <div class="${r}-danmaku-settings-filter-picker"></div>
        </div>
        <div class="${r}-panel-row">
          <div class="${r}-row-label">不透明度</div>
          <div
            class="${r}-danmaku-settings-opacity-slider ${r}-slider-wrap"
          ></div>
          <div class="${r}-danmaku-settings-opacity-value ${r}-row-value"></div>
        </div>
        <div class="${r}-panel-row">
          <div class="${r}-row-label">显示区域</div>
          <div class="${r}-danmaku-settings-area-slider ${r}-slider-wrap"></div>
          <div class="${r}-danmaku-settings-area-value ${r}-row-value"></div>
        </div>
        <div class="${r}-panel-row">
          <div class="${r}-row-label">文字大小</div>
          <div class="${r}-danmaku-settings-size-slider ${r}-slider-wrap"></div>
          <div class="${r}-danmaku-settings-size-value ${r}-row-value"></div>
        </div>
        <div class="${r}-panel-row">
          <div class="${r}-row-label">弹幕速度</div>
          <div
            class="${r}-danmaku-settings-speed-slider  ${r}-slider-wrap"
          ></div>
          <div class="${r}-danmaku-settings-speed-value ${r}-row-value"></div>
        </div>
      </div>
    </div>
  </div>
`;
class bs extends F {
  constructor(t) {
    const e = new DocumentFragment();
    $($n, e), super(t, e.querySelector(`.${r}-controls-button`)), this.name = "danmakuSettings", this.$icon = this.$(`.${r}-controls-button-icon`), this.$filterPicker = this.$(`.${r}-danmaku-settings-filter-picker`), this.$opacitySlider = this.$(`.${r}-danmaku-settings-opacity-slider`), this.$areaSlider = this.$(`.${r}-danmaku-settings-area-slider`), this.$sizeSlider = this.$(`.${r}-danmaku-settings-size-slider`), this.$speedSlider = this.$(`.${r}-danmaku-settings-speed-slider`), this.$opacityValue = this.$(`.${r}-danmaku-settings-opacity-value`), this.$areaValue = this.$(`.${r}-danmaku-settings-area-value`), this.$sizeValue = this.$(`.${r}-danmaku-settings-size-value`), this.$speedValue = this.$(`.${r}-danmaku-settings-speed-value`);
  }
  get danmaku() {
    return this.plugin.danmaku;
  }
  get danmakuEngine() {
    return this.plugin.danmakuEngine;
  }
  init() {
    this.pickerFilter = new vi({
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
        this.danmaku.filterType(t, e);
      }
    }), this.sliderOpacity = new dt({
      container: this.$opacitySlider,
      min: 10,
      max: 100,
      step: 1,
      value: 100,
      onDrag: (t) => {
        this.danmakuEngine.setOpacity(t / 100);
      },
      onChange: (t) => {
        this.$opacityValue.innerText = `${t}%`;
      }
    }), this.sliderArea = new dt({
      container: this.$areaSlider,
      min: 20,
      max: 105,
      step: 5,
      value: 25,
      onDrag: (t) => {
        const e = t / 100;
        this.danmakuEngine.setArea(e > 100 ? 0 : e);
      },
      onChange: (t) => {
        this.$areaValue.innerText = t < 100 ? `${t}%` : t == 100 ? "不重叠" : "无限";
      }
    }), this.sliderArea.drag(25), this.sliderSize = new dt({
      container: this.$sizeSlider,
      min: 50,
      max: 200,
      step: 1,
      value: 100,
      onDrag: (t) => {
        this.danmakuEngine.setScale(t / 100);
      },
      onChange: (t) => {
        this.$sizeValue.innerText = `${t}%`;
      }
    }), this.sliderSpeed = new dt({
      container: this.$speedSlider,
      min: 20,
      max: 180,
      step: 10,
      value: 100,
      divider: 5,
      onDrag: (t) => {
        this.danmakuEngine.setSpeed(t / 100);
      },
      onChange: (t) => {
        this.$speedValue.innerText = `${t}%`;
      }
    });
  }
}
bs.pluginName = "buttonDanmakuSettings";
const fn = (s, t, e, i) => p`
  ${s.map(
  (n) => p`
      <li
        class="${r}-contextmenu-danmaku-item"
        @click=${() => {
    e(n);
  }}
      >
        <div class="${r}-contextmenu-danmaku-item-content">${n.content}</div>
        <div class="${r}-contextmenu-danmaku-item-operate">
          ${t(n).map(
    ([a, l]) => p`<div
              class="${r}-contextmenu-danmaku-item-operate-btn"
              @click=${(o) => {
      o.stopPropagation(), l(n), i();
    }}
            >
              ${a}
            </div>`
  )}
        </div>
      </li>
    `
)}
`, yn = (s) => navigator.clipboard.writeText(s);
class ws extends w {
  constructor(t) {
    super(t), this.$el = H("ul", { class: `${r}-contextmenu-danmaku mpui-black` });
  }
  init() {
    this.player.on("contextMenuShow", (t, e) => {
      var n;
      const i = (n = this.plugin.danmakuEngine) == null ? void 0 : n.capture(t, e, 4);
      this.update(i || []);
    });
  }
  ready() {
    var t;
    (t = this.plugin.contextMenu) == null || t.$list.before(this.$el);
  }
  update(t) {
    var n;
    const e = (n = this.plugin.danmaku) == null ? void 0 : n.invoke, i = this.plugin.danmakuOperate;
    t != null && t.length ? this.$el.style.display = "" : this.$el.style.display = "none", $(
      fn(
        t,
        (a) => {
          const l = this.player.userId && a.user == this.player.userId;
          return [
            [
              "举报",
              (o) => {
                i == null || i.report(o);
              },
              !l && (e == null ? void 0 : e.report)
            ],
            [
              "屏蔽",
              (o) => {
                i == null || i.blockUser(o.user, !0);
              },
              !l && (e == null ? void 0 : e.blockUser)
            ],
            [
              "撤回",
              (o) => {
                i == null || i.recall(o);
              },
              l && (e == null ? void 0 : e.recall)
            ],
            [
              "复制",
              (o) => {
                yn(o.content);
              },
              !0
            ]
          ].filter((o) => o[2]);
        },
        (a) => {
          this.player.emit("danmaku:select", a);
        },
        () => {
          var a;
          (a = this.plugin.contextMenu) == null || a.hide();
        }
      ),
      this.$el
    );
  }
}
ws.pluginName = "danmakuMenu";
const bn = [
  ms,
  vs,
  gs,
  $s,
  ys,
  ws
], wn = [fs, bs], kn = [...bn, ...wn];
class xn extends w {
  init() {
    this.player.on("videoChange", (t) => {
      var e;
      t.qualities && (this.compare && t.qualities.sort((i, n) => this.compare(i, n)), (e = this.player.quality) == null || e.updateList(t.qualities));
    }), this.player.hook.register("video.beforeLoad", (t) => {
      var n;
      const e = this.player.getVideoInfo().qualities;
      let i = {};
      !t.url && e && (i = this.prior ? this.prior(e) : e[0], t.url = i.url, t.type = i.type), (n = this.player.quality) == null || n.updateCurrent(i);
    });
  }
}
class ks extends w {
  constructor(t) {
    super(t);
  }
  apply(t, e) {
    var i;
    this._getFlvjs = (i = e.externals) == null ? void 0 : i.flvjs, this.player.loader.register("flv", this);
  }
  check(t) {
    return t.type == "flv";
  }
  create(t, e) {
    const { type: i, url: n, live: a, play: l, time: o } = t, h = {
      kernel: null,
      type: i || "",
      url: n,
      live: a || !1,
      mediaElement: e,
      destroy() {
        var c;
        (c = this.kernel) == null || c.destroy(), this.kernel = null;
      }
    };
    return this.initFlv().then(() => {
      const c = this.flvjs.createPlayer({
        type: i || "flv",
        url: n,
        cors: !0,
        isLive: a
      });
      h.kernel = c;
      const u = o === !0 ? this.player.currentTime : o === !1 ? 0 : o;
      c.attachMediaElement(e), c.load(), u && (c.currentTime = u), l && c.play();
    }), h;
  }
  /** 初始化flvjs */
  async initFlv() {
    var t;
    if (this._supported != !0) {
      if (this._supported == !1)
        throw new Error("播放器不支持flv加载");
      if (this.flvjs ?? (this.flvjs = window.flvjs), !this.flvjs)
        if (this._getFlvjs) {
          if (this.flvjs = await this._getFlvjs().catch((e) => {
            throw new Error(`flv.js初始化失败: ${e}`);
          }) || void 0, this._supported = ((t = this.flvjs) == null ? void 0 : t.isSupported()) || !1, this._supported == !1)
            throw new Error("播放器不支持flv加载");
        } else
          throw new Error("flv.js初始化失败: 播放器未引入flv.js");
    }
  }
}
ks.pluginName = "flvLoader";
class xs extends w {
  constructor(t) {
    super(t);
  }
  apply(t, e) {
    var i;
    this._getHlsjs = (i = e.externals) == null ? void 0 : i.hlsjs, this.player.loader.register("hls", this);
  }
  check(t) {
    return t.type == "hls" || t.type == "m3u8";
  }
  create(t, e) {
    const { type: i, url: n, live: a, play: l, time: o } = t, h = {
      kernel: null,
      type: i || "",
      url: n,
      live: a || !1,
      mediaElement: e,
      destroy() {
        var c;
        (c = this.kernel) == null || c.destroy(), this.kernel = null;
      }
    };
    return this.initHls().then(() => {
      const c = new this.Hls();
      h.kernel = c;
      const u = o === !0 ? this.player.currentTime : o;
      return c.attachMedia(e), c.on(this.Hls.Events.MEDIA_ATTACHED, () => {
        c.loadSource(n);
      }), this.player.once("loadedmetadata", () => {
        u && this.player.seek(u), l && this.player.play();
      }), !0;
    }), h;
  }
  /** 初始化hls.js */
  async initHls() {
    var t;
    if (this._supported != !0) {
      if (this._supported == !1)
        throw new Error("播放器不支持hls加载");
      if (this.Hls ?? (this.Hls = window.Hls), !this.Hls) {
        if (!this._getHlsjs)
          this.throw(new Error("hls.js初始化失败: 播放器未引入hls.js"));
        else if (this.Hls = await this._getHlsjs().catch((e) => {
          this.throw(new Error(`hls.js初始化失败: ${e}`));
        }) || void 0, this._supported = ((t = this.Hls) == null ? void 0 : t.isSupported()) || !1, this._supported == !1)
          throw new Error("播放器不支持hls加载");
      }
    }
  }
}
xs.pluginName = "hlsLoader";
class Ss extends w {
  constructor(t) {
    super(t);
  }
  apply(t, e) {
    var i;
    this._getDashjs = (i = e.externals) == null ? void 0 : i.dashjs, this.player.loader.register("dash", this);
  }
  check(t) {
    return t.type == "dash" || t.type == "m3u8";
  }
  create(t, e) {
    const { type: i, url: n, live: a, play: l, time: o } = t, h = {
      kernel: null,
      type: i || "",
      url: n,
      live: a || !1,
      mediaElement: e,
      destroy() {
        var c;
        (c = this.kernel) == null || c.destroy(), this.kernel = null;
      }
    };
    return this.initDash().then(() => {
      const c = this.dashjs.MediaPlayer().create();
      h.kernel = c;
      const u = o === !0 ? this.player.currentTime : o === !1 ? 0 : o;
      c.initialize(e, n, l, u);
    }), h;
  }
  /** 初始化dash.js */
  async initDash() {
    var t;
    if (this._supported != !0) {
      if (this._supported == !1)
        throw new Error("播放器不支持dash加载");
      if (this.dashjs ?? (this.dashjs = window.dashjs), !this.dashjs)
        if (this._getDashjs) {
          if (this.dashjs = await this._getDashjs().catch((e) => {
            throw new Error(`dash.js初始化失败: ${e}`);
          }) || void 0, this._supported = ((t = this.dashjs) == null ? void 0 : t.supportsMediaSource()) || !1, this._supported == !1)
            throw new Error("播放器不支持dash加载");
        } else
          throw new Error("dash.js初始化失败: 播放器未引入dash.js");
    }
  }
}
Ss.pluginName = "dashLoader";
var Es = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
}, gt = (s, t, e) => (Es(s, t, "read from private field"), e ? e.call(s) : t.get(s)), Sn = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, le = (s, t, e, i) => (Es(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e), N;
class Ls extends w {
  constructor(t) {
    super(t), Sn(this, N, null);
    const e = window.ResizeObserver || Ze;
    e && (this.observer = new e(([i]) => {
      const { width: n, height: a } = i.contentRect;
      this._keepRatio(n, a);
    }));
  }
  apply(t, e) {
    le(this, N, this._parse(e.aspectRatio || ""));
  }
  init() {
    this.player.define("aspectRatio", { get: () => this._stringify(gt(this, N)) }), this.player.define("setAspectRatio", (t) => {
      this.set(t);
    });
  }
  mounted() {
    var t;
    console.log("233333311111111"), (t = this.observer) == null || t.observe(this.player.$area), this._setRatio(gt(this, N));
  }
  set(t) {
    const e = this._parse(t);
    le(this, N, e), this._setRatio(e), this.player.emit("aspectRatioChange", this._stringify(e));
  }
  /** 设置视频比例 */
  _setRatio(t) {
    const e = this.player.$video;
    if (e.style.width = "", e.style.height = "", t) {
      const [i, n] = t;
      e.style.aspectRatio = `${i}/${n}`, e.style.objectFit = "fill";
      const { width: a, height: l } = e.getBoundingClientRect(), { width: o, height: h } = this.player.$area.getBoundingClientRect();
      a == o && l == h && this._rescale(a, l, i, n);
    } else
      e.style.aspectRatio = "", e.style.objectFit = "";
  }
  /** 保持视频比例 */
  _keepRatio(t, e) {
    if (gt(this, N)) {
      const i = this.player.$video;
      i.style.width = "", i.style.height = "";
      const [n, a] = gt(this, N), { width: l, height: o } = i.getBoundingClientRect();
      console.log(`${l} x ${o} -- ${t} x ${e}`), Math.abs(l - t) < 1 && Math.abs(o - e) < 1 && this._rescale(t, e, n, a);
    }
  }
  /** 根据当前视频宽高重新维持视频比例 */
  _rescale(t, e, i, n) {
    const a = i * e, l = n * t, o = this.player.$video;
    a < l ? (o.style.width = `${a / l * 100}%`, o.style.height = "100%") : (o.style.width = "100%", o.style.height = `${l / a * 100}%`);
  }
  _parse(t) {
    const [e, i] = t.split("/").map((n) => parseFloat(n));
    return e && i && isFinite(e) && isFinite(i) ? [e, i] : null;
  }
  _stringify(t) {
    return t ? t.join("/") : "";
  }
}
N = /* @__PURE__ */ new WeakMap();
Ls.pluginName = "aspectRatio";
const En = [
  hs,
  xn,
  ps,
  ns,
  rs,
  ge,
  Ls,
  ss,
  es,
  is,
  cs,
  ds
], Ln = [ls, os, us], _n = [fe, $e, as], Tn = [ks, xs, Ss];
class An extends At {
  constructor(t) {
    super({
      autoPart: !0,
      controller: {
        controls: {
          top: ["progress"],
          left: ["prev", "play", "next", "time"],
          right: ["quality", "part", "volume", "settings", "pip", "fullscreen"]
        }
      },
      side: {
        panels: ["partList"]
      },
      ...t,
      plugins: [
        ...kn,
        ...sn,
        ...En,
        ..._n,
        ...Ln,
        ...Tn,
        ...t.plugins || []
      ]
    });
  }
}
export {
  An as default
};
//# sourceMappingURL=mfuns-player.es.js.map
(function(){"use strict";try{if(typeof document<"u"){var A=document.createElement("style");A.appendChild(document.createTextNode('@charset "UTF-8";@font-face{font-family:mfunsPlayerIcon;src:url(data:application/vnd.ms-fontobject;base64,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);src:url(data:application/vnd.ms-fontobject;base64,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) format("embedded-opentype"),url(data:font/ttf;base64,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) format("truetype"),url(data:font/woff;base64,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) format("woff"),url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIiA+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8bWV0YWRhdGE+R2VuZXJhdGVkIGJ5IEljb01vb248L21ldGFkYXRhPg0KPGRlZnM+DQo8Zm9udCBpZD0ibWZ1bnNQbGF5ZXJJY29uIiBob3Jpei1hZHYteD0iMTAyNCI+DQo8Zm9udC1mYWNlIHVuaXRzLXBlci1lbT0iMTAyNCIgYXNjZW50PSI5NjAiIGRlc2NlbnQ9Ii02NCIgLz4NCjxtaXNzaW5nLWdseXBoIGhvcml6LWFkdi14PSIxMDI0IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeDIwOyIgaG9yaXotYWR2LXg9IjUxMiIgZD0iIiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MDA7IiBnbHlwaC1uYW1lPSJwbGF5IiBkPSJNMjEzLjM5OCA4NjAuMjM1Yy0wLjAwNCAwLTAuMDA4IDAtMC4wMTMgMC0yMy41OTMgMC00Mi43MTktMTkuMTI2LTQyLjcxOS00Mi43MTkgMC0wLjAwNCAwLTAuMDA4IDAtMC4wMTJ2MC4wMDEtNzM5LjAwOWMwLTAuMDQ1IDAtMC4wOTggMC0wLjE1MSAwLTIzLjUxNiAxOS4wNjQtNDIuNTggNDIuNTgtNDIuNTggNy44OTIgMCAxNS4yODIgMi4xNDcgMjEuNjE5IDUuODg5bC0wLjE5OC0wLjEwOCA2NDAgMzY5LjUwNGMxMi44NDMgNy41MTUgMjEuMzMzIDIxLjI0MSAyMS4zMzMgMzYuOTUxcy04LjQ5IDI5LjQzNi0yMS4xMzIgMzYuODQybC0wLjIwMSAwLjEwOS02NDAgMzY5LjUwNGMtNi4wOTIgMy42MTktMTMuNDI4IDUuNzY0LTIxLjI2NCA1Ljc4aC0wLjAwNXoiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMTsiIGdseXBoLW5hbWU9InBhdXNlIiBkPSJNNzI1LjMzMyA4NTMuMzMzaDg1LjMzM2MyMy41NjQgMCA0Mi42NjctMTkuMTAzIDQyLjY2Ny00Mi42Njd2LTcyNS4zMzNjMC0yMy41NjQtMTkuMTAzLTQyLjY2Ny00Mi42NjctNDIuNjY3aC04NS4zMzNjLTIzLjU2NCAwLTQyLjY2NyAxOS4xMDMtNDIuNjY3IDQyLjY2N3Y3MjUuMzMzYzAgMjMuNTY0IDE5LjEwMyA0Mi42NjcgNDIuNjY3IDQyLjY2N3pNMjEzLjMzMyA4NTMuMzMzaDg1LjMzM2MyMy41NjQgMCA0Mi42NjctMTkuMTAzIDQyLjY2Ny00Mi42Njd2LTcyNS4zMzNjMC0yMy41NjQtMTkuMTAzLTQyLjY2Ny00Mi42NjctNDIuNjY3aC04NS4zMzNjLTIzLjU2NCAwLTQyLjY2NyAxOS4xMDMtNDIuNjY3IDQyLjY2N3Y3MjUuMzMzYzAgMjMuNTY0IDE5LjEwMyA0Mi42NjcgNDIuNjY3IDQyLjY2N3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkwMjsiIGdseXBoLW5hbWU9InByZXYiIGQ9Ik04NTMuMTMgODQ1LjQyYzAuMDUzIDAgMC4xMTYgMCAwLjE3OSAwIDIzLjU3NyAwIDQyLjY5MS0xOS4xMTMgNDIuNjkxLTQyLjY5MSAwLTAuMDIwIDAtMC4wNDAgMC0wLjA2MHYwLjAwMy03MDkuMzQ1YzAtMC4wMTYgMC0wLjAzNSAwLTAuMDU0IDAtMjMuNTc5LTE5LjExNS00Mi42OTMtNDIuNjkzLTQyLjY5My0wLjA2MiAwLTAuMTI0IDAtMC4xODYgMGgwLjAxMGMtMTAuMDYxIDAuMDE2LTE5LjI5IDMuNTY4LTI2LjUxMyA5LjQ3OWwwLjA3NS0wLjA1OS00NDMuNjY5IDM1NC42NzNjLTkuODA0IDcuODg1LTE2LjAyNSAxOS44NzktMTYuMDI1IDMzLjMyN3M2LjIyMSAyNS40NDIgMTUuOTQzIDMzLjI2MmwwLjA4MyAwLjA2NCA0NDMuNjY5IDM1NC42NzNjNy4xNDkgNS44NTIgMTYuMzc3IDkuNDAzIDI2LjQzNSA5LjQyaDAuMDA0ek0xNzAuNjY2IDgzMmg4NS4zMzNjMjMuNTY0IDAgNDIuNjY3LTE5LjEwMyA0Mi42NjctNDIuNjY3di02ODIuNjY2YzAtMjMuNTY0LTE5LjEwMy00Mi42NjctNDIuNjY3LTQyLjY2N2gtODUuMzMzYy0yMy41NjQgMC00Mi42NjcgMTkuMTAzLTQyLjY2NyA0Mi42Njd2NjgyLjY2NmMwIDIzLjU2NCAxOS4xMDMgNDIuNjY3IDQyLjY2NyA0Mi42Njd6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJuZXh0IiBkPSJNMTcwLjg3IDg0NS40MmMtMC4wNTMgMC0wLjExNiAwLTAuMTc5IDAtMjMuNTc3IDAtNDIuNjkxLTE5LjExMy00Mi42OTEtNDIuNjkxIDAtMC4wMjAgMC0wLjA0MCAwLTAuMDYwdjAuMDAzLTcwOS4zNDVjMC0wLjAxNiAwLTAuMDM1IDAtMC4wNTQgMC0yMy41NzkgMTkuMTE1LTQyLjY5MyA0Mi42OTMtNDIuNjkzIDAuMDYyIDAgMC4xMjQgMCAwLjE4NiAwaC0wLjAxMGMxMC4wNjEgMC4wMTYgMTkuMjkgMy41NjggMjYuNTEzIDkuNDc5bC0wLjA3NS0wLjA1OSA0NDMuNjY5IDM1NC42NzNjOS44MDQgNy44ODUgMTYuMDI1IDE5Ljg3OSAxNi4wMjUgMzMuMzI3cy02LjIyMSAyNS40NDItMTUuOTQzIDMzLjI2MmwtMC4wODMgMC4wNjQtNDQzLjY2OSAzNTQuNjczYy03LjE0OSA1Ljg1Mi0xNi4zNzcgOS40MDMtMjYuNDM1IDkuNDJoLTAuMDA0ek03NjggODMyaDg1LjMzM2MyMy41NjQgMCA0Mi42NjctMTkuMTAzIDQyLjY2Ny00Mi42Njd2LTY4Mi42NjdjMC0yMy41NjQtMTkuMTAzLTQyLjY2Ny00Mi42NjctNDIuNjY3aC04NS4zMzNjLTIzLjU2NCAwLTQyLjY2NyAxOS4xMDMtNDIuNjY3IDQyLjY2N3Y2ODIuNjY3YzAgMjMuNTY0IDE5LjEwMyA0Mi42NjcgNDIuNjY3IDQyLjY2N3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkwNDsiIGdseXBoLW5hbWU9InJlcGVhdCIgZD0iTTIxMy4zMzMgNzA0aDU5Ny4zMzN2LTIzOC4zMjVsLTQyLjY2NyA0Mi42NjctNjAuMzQyLTYwLjM0MiAxNDUuNjc1LTE0NS42NzUgMTQ1LjY3NSAxNDUuNjc1LTYwLjM0MiA2MC4zNDItNDIuNjY3LTQyLjY2N3YyODAuOTkyYzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3YwaC02ODIuNjY3Yy0yMy41NjQgMC00Mi42NjctMTkuMTAzLTQyLjY2Ny00Mi42Njd2MC04NS4zMzNoODUuMzMzek04MTAuNjY3IDE5MmgtNTk3LjMzM3YyMzguMzI1bDQyLjY2Ny00Mi42NjcgNjAuMzQyIDYwLjM0Mi0xNDUuNjc1IDE0NS42NzUtMTQ1LjY3NS0xNDUuNjc1IDYwLjM0Mi02MC4zNDIgNDIuNjY3IDQyLjY2N3YtMjgwLjk5MmMwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGg2ODIuNjY3YzIzLjU2NCAwIDQyLjY2NyAxOS4xMDMgNDIuNjY3IDQyLjY2N3YwIDg1LjMzM2gtODUuMzMzeiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTA1OyIgZ2x5cGgtbmFtZT0icmVwZWF0LW9mZiIgZD0iTTkzOC42NjcgNTA4LjM0MmwtNDIuNjY3LTQyLjY2N3YyODAuOTkyYzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3YwaC00NjkuMzMzdi04NS4zMzNoNDI2LjY2N3YtMjM4LjMyNWwtNDIuNjY3IDQyLjY2Ny02MC4zNDItNjAuMzQyIDE0NS42NzUtMTQ1LjY3NSAxNDUuNjc1IDE0NS42NzV6TTIxMy4zMzMgMTkydjIzOC4zMjVsNDIuNjY3LTQyLjY2NyA2MC4zNDIgNjAuMzQyLTE0NS42NzUgMTQ1LjY3NS0xNDUuNjc1LTE0NS42NzUgNjAuMzQyLTYwLjM0MiA0Mi42NjcgNDIuNjY3di0yODAuOTkyYzAtMjMuNTY0IDE5LjEwMy00Mi42NjcgNDIuNjY3LTQyLjY2N3YwaDQ2OS4zMzN2ODUuMzMzek0xNDAuNDk2IDc1OS4xNjJsNjAuMzM3IDYwLjMzOCA2ODIuNjcxLTY4Mi42NjItNjAuMzM3LTYwLjMzOC02ODIuNjcxIDY4Mi42NjJ6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MGM7IiBnbHlwaC1uYW1lPSJ2b2x1bWUtb2ZmIiBkPSJNMjg1Ljc4MSA2NjEuMzMzaC0yMDAuNDQ4Yy0yMy41NjEtMC4wMDktNDIuNjU4LTE5LjEwNi00Mi42NjctNDIuNjY2di0zNDEuMzM0YzAuMDA5LTIzLjU2MSAxOS4xMDYtNDIuNjU4IDQyLjY2Ni00Mi42NjdoMjAwLjQ0OWwzMTEuNTUyLTIwNy43MDF2ODQyLjA2OXpNNTEyIDE4Ni4zNjhsLTIwMC40NDggMTMzLjYzMmgtMTgzLjU1MnYyNTZoMTgzLjU1MmwyMDAuNDQ4IDEzMy42MzJ6TTk2OC44MzIgNTQ1LjgyNmwtNjAuMzMxIDYwLjM0OC05Ny44MzUtOTcuODM1LTk3LjgzNSA5Ny44MzUtNjAuMzMxLTYwLjM0OCA5Ny44MjYtOTcuODI2LTk3LjgyNi05Ny44MzUgNjAuMzMxLTYwLjMzMSA5Ny44MzUgOTcuODM1IDk3LjgzNS05Ny44MzUgNjAuMzMxIDYwLjMzMS05Ny44MjYgOTcuODM1IDk3LjgyNiA5Ny44MjZ6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MGY7IiBnbHlwaC1uYW1lPSJ2b2x1bWUiIGQ9Ik0yODUuNzgxIDY2MS4zMzNoLTIwMC40NDhjLTIzLjU2MS0wLjAwOS00Mi42NTgtMTkuMTA2LTQyLjY2Ny00Mi42NjZ2LTM0MS4zMzRjMC4wMDktMjMuNTYxIDE5LjEwNi00Mi42NTggNDIuNjY2LTQyLjY2N2gyMDAuNDQ5bDMxMS41NTItMjA3LjcwMXY4NDIuMDY5ek01MTIgMTg2LjM2OGwtMjAwLjQ0OCAxMzMuNjMyaC0xODMuNTUydjI1NmgxODMuNTUybDIwMC40NDggMTMzLjYzMnpNNzI1LjMzMyA0NDhjMC0wLjA0MCAwLTAuMDg3IDAtMC4xMzQgMC01OC44NTktMjMuOTExLTExMi4xMzMtNjIuNTQ5LTE1MC42MzlsLTAuMDA2LTAuMDA2IDYwLjQxLTYwLjQxYzU0LjA0OCA1NC4wNDggODcuNDc4IDEyOC43MTUgODcuNDc4IDIxMS4xODlzLTMzLjQyOSAxNTcuMTQxLTg3LjQ3OCAyMTEuMTg5djBsLTYwLjQxLTYwLjQxYzM4LjY0NC0zOC41MTIgNjIuNTU1LTkxLjc4NiA2Mi41NTUtMTUwLjY0NSAwLTAuMDQ3IDAtMC4wOTQgMC0wLjE0MXYwLjAwN3pNODk2IDQ0OGMwLTAuMDcxIDAtMC4xNTYgMC0wLjI0MSAwLTEwNS45NDYtNDMuMDM5LTIwMS44MzktMTEyLjU4OC0yNzEuMTVsLTAuMDExLTAuMDExIDYwLjQ2Ny02MC40NjdjODQuOTMzIDg0LjkzMyAxMzcuNDY1IDIwMi4yNjYgMTM3LjQ2NSAzMzEuODY5cy01Mi41MzIgMjQ2LjkzNi0xMzcuNDY1IDMzMS44Njl2MGwtNjAuNDY3LTYwLjQ2N2M2OS41NTktNjkuMzIxIDExMi41OTgtMTY1LjIxNSAxMTIuNTk4LTI3MS4xNiAwLTAuMDg1IDAtMC4xNyAwLTAuMjU0djAuMDEzeiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTEwOyIgZ2x5cGgtbmFtZT0id2lkZXNjcmVlbiIgZD0iTTg1My4zMzMgNzQ2LjY2N3YtNTk3LjMzM2gtNjgyLjY2N3Y1OTcuMzMzaDY4Mi42Njd6TTg5NiA4MzJoLTc2OGMtMjMuNTY0IDAtNDIuNjY3LTE5LjEwMy00Mi42NjctNDIuNjY3djAtNjgyLjY2N2MwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGg3NjhjMjMuNTY0IDAgNDIuNjY3IDE5LjEwMyA0Mi42NjcgNDIuNjY3djAgNjgyLjY2N2MwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMzg0IDMwMi4zMjdsLTE0NS42NzMgMTQ1LjY3MyAxNDUuNjczIDE0NS42NzMgNjAuMzM5LTYwLjMzOS04NS4zMzMtODUuMzMzIDg1LjMzMy04NS4zMzMtNjAuMzM5LTYwLjMzOXpNNjQwIDMwMi4zMjdsLTYwLjMzOSA2MC4zMzkgODUuMzMzIDg1LjMzMy04NS4zMzMgODUuMzMzIDYwLjMzOSA2MC4zMzkgMTQ1LjY3My0xNDUuNjczLTE0NS42NzMtMTQ1LjY3M3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxMTsiIGdseXBoLW5hbWU9IndpZGVzY3JlZW4tZXhpdCIgZD0iTTg1My4zMzMgNzQ2LjY2N3YtNTk3LjMzM2gtNjgyLjY2N3Y1OTcuMzMzaDY4Mi42Njd6TTg5NiA4MzJoLTc2OGMtMjMuNTY0IDAtNDIuNjY3LTE5LjEwMy00Mi42NjctNDIuNjY3djAtNjgyLjY2N2MwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGg3NjhjMjMuNTY0IDAgNDIuNjY3IDE5LjEwMyA0Mi42NjcgNDIuNjY3djAgNjgyLjY2N2MwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMjk4LjY2NyAzMDIuMzI3bDE0NS42NzMgMTQ1LjY3My0xNDUuNjczIDE0NS42NzMtNjAuMzM5LTYwLjMzOSA4NS4zMzMtODUuMzMzLTg1LjMzMy04NS4zMzMgNjAuMzM5LTYwLjMzOXpNNzI1LjMzMyAzMDIuMzI3bDYwLjMzOSA2MC4zMzktODUuMzMzIDg1LjMzMyA4NS4zMzMgODUuMzMzLTYwLjMzOSA2MC4zMzktMTQ1LjY3My0xNDUuNjczIDE0NS42NzMtMTQ1LjY3M3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxMjsiIGdseXBoLW5hbWU9IndlYi1mdWxsc2NyZWVuIiBkPSJNODUzLjMzMyA3NDYuNjY3di01OTcuMzMzaC02ODIuNjY3djU5Ny4zMzNoNjgyLjY2N3pNODk2IDgzMmgtNzY4Yy0yMy41NjQgMC00Mi42NjctMTkuMTAzLTQyLjY2Ny00Mi42Njd2MC02ODIuNjY3YzAtMjMuNTY0IDE5LjEwMy00Mi42NjcgNDIuNjY3LTQyLjY2N3YwaDc2OGMyMy41NjQgMCA0Mi42NjcgMTkuMTAzIDQyLjY2NyA0Mi42Njd2MCA2ODIuNjY3YzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3Ywek0zNDEuMzMzIDQ0OHYxMjhoMTI4djg1LjMzM2gtMjEzLjMzM3YtMjEzLjMzM2g4NS4zMzN6TTY4Mi42NjcgNDQ4di0xMjhoLTEyOHYtODUuMzMzaDIxMy4zMzN2MjEzLjMzM2gtODUuMzMzeiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTEzOyIgZ2x5cGgtbmFtZT0id2ViLWZ1bGxzY3JlZW4tZXhpdCIgZD0iTTg1My4zMzMgNzQ2LjY2N3YtNTk3LjMzM2gtNjgyLjY2N3Y1OTcuMzMzaDY4Mi42Njd6TTg5NiA4MzJoLTc2OGMtMjMuNTY0IDAtNDIuNjY3LTE5LjEwMy00Mi42NjctNDIuNjY3djAtNjgyLjY2N2MwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGg3NjhjMjMuNTY0IDAgNDIuNjY3IDE5LjEwMyA0Mi42NjcgNDIuNjY3djAgNjgyLjY2N2MwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMzg0IDY2MS4zMzN2LTg1LjMzM2gtMTI4di04NS4zMzNoMjEzLjMzM3YxNzAuNjY3aC04NS4zMzN6TTY0MCAyMzQuNjY3djg1LjMzM2gxMjh2ODUuMzMzaC0yMTMuMzMzdi0xNzAuNjY3aDg1LjMzM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxNDsiIGdseXBoLW5hbWU9InBpY3R1cmUtaW4tcGljdHVyZSIgZD0iTTQyNi42NjcgMTQ5LjMzM2gtMjU2djU5Ny4zMzNoNjgyLjY2N3YtMjU2aDg1LjMzM3YyOTguNjY3YzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3YwaC03NjhjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTY4Mi42NjdjMC0yMy41NjQgMTkuMTAzLTQyLjY2NyA0Mi42NjctNDIuNjY3djBoMjk4LjY2N3pNODUzLjMzMyAzMjB2LTE3MC42NjdoLTI1NnYxNzAuNjY3aDI1NnpNODk2IDQwNS4zMzNoLTM0MS4zMzNjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTI1NmMwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGgzNDEuMzMzYzIzLjU2NCAwIDQyLjY2NyAxOS4xMDMgNDIuNjY3IDQyLjY2N3YwIDI1NmMwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMzg0IDY2MS4zMzN2LTY3LjY2MWwtOTcuODI2IDk3LjgzNS02MC4zNDgtNjAuMzQ4IDk3LjgzNS05Ny44MjZoLTY3LjY2MXYtODUuMzMzaDIxMy4zMzN2MjEzLjMzM2gtODUuMzMzeiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTE1OyIgZ2x5cGgtbmFtZT0icGljdHVyZS1pbi1waWN0dXJlLWV4aXQiIGQ9Ik00MjYuNjY3IDE0OS4zMzNoLTI1NnY1OTcuMzMzaDY4Mi42Njd2LTI1Nmg4NS4zMzN2Mjk4LjY2N2MwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MGgtNzY4Yy0yMy41NjQgMC00Mi42NjctMTkuMTAzLTQyLjY2Ny00Mi42Njd2MC02ODIuNjY3YzAtMjMuNTY0IDE5LjEwMy00Mi42NjcgNDIuNjY3LTQyLjY2N3YwaDI5OC42Njd6TTg1My4zMzMgMzIwdi0xNzAuNjY3aC0yNTZ2MTcwLjY2N2gyNTZ6TTg5NiA0MDUuMzMzaC0zNDEuMzMzYy0yMy41NjQgMC00Mi42NjctMTkuMTAzLTQyLjY2Ny00Mi42Njd2MC0yNTZjMC0yMy41NjQgMTkuMTAzLTQyLjY2NyA0Mi42NjctNDIuNjY3djBoMzQxLjMzM2MyMy41NjQgMCA0Mi42NjcgMTkuMTAzIDQyLjY2NyA0Mi42Njd2MCAyNTZjMCAyMy41NjQtMTkuMTAzIDQyLjY2Ny00Mi42NjcgNDIuNjY3djB6TTM0MS4zMzMgNDQ4djY3LjY2MWw5Ny44MjYtOTcuODM1IDYwLjM0OCA2MC4zNDgtOTcuODM1IDk3LjgyNmg2Ny42NjF2ODUuMzMzaC0yMTMuMzMzdi0yMTMuMzMzaDg1LjMzM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxZTsiIGdseXBoLW5hbWU9ImZ1bGxzY3JlZW4iIGQ9Ik0xNzAuNjY3IDU3NnYxNzAuNjY3aDE3MC42Njd2ODUuMzMzaC0yNTZ2LTI1Nmg4NS4zMzN6TTY4Mi42NjcgNzQ2LjY2N2gxNzAuNjY3di0xNzAuNjY3aDg1LjMzM3YyNTZoLTI1NnYtODUuMzMzek0zNDEuMzMzIDE0OS4zMzNoLTE3MC42Njd2MTcwLjY2N2gtODUuMzMzdi0yNTZoMjU2djg1LjMzM3pNODUzLjMzMyAzMjB2LTE3MC42NjdoLTE3MC42Njd2LTg1LjMzM2gyNTZ2MjU2aC04NS4zMzN6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MWY7IiBnbHlwaC1uYW1lPSJmdWxsc2NyZWVuLWV4aXQiIGQ9Ik0yNTYgODMydi0xNzAuNjY3aC0xNzAuNjY3di04NS4zMzNoMjU2djI1NmgtODUuMzMzek05MzguNjY3IDY2MS4zMzNoLTE3MC42Njd2MTcwLjY2N2gtODUuMzMzdi0yNTZoMjU2djg1LjMzM3pNODUuMzMzIDIzNC42NjdoMTcwLjY2N3YtMTcwLjY2N2g4NS4zMzN2MjU2aC0yNTZ2LTg1LjMzM3pNNzY4IDY0djE3MC42NjdoMTcwLjY2N3Y4NS4zMzNoLTI1NnYtMjU2aDg1LjMzM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkyMDsiIGdseXBoLW5hbWU9ImRhbm1ha3UiIGQ9Ik04OTYgODMyaC03NjhjLTIzLjU2MS0wLjAwOS00Mi42NTgtMTkuMTA2LTQyLjY2Ny00Mi42NjZ2LTc4OS4zMzRsMTg2LjcwOSAxNDkuMzMzaDYyMy45NTdjMjMuNTYxIDAuMDA5IDQyLjY1OCAxOS4xMDYgNDIuNjY3IDQyLjY2NnY1OTcuMzM0Yy0wLjAwOSAyMy41NjEtMTkuMTA2IDQyLjY1OC00Mi42NjYgNDIuNjY3aC0wLjAwMXpNODUzLjMzMyAyMzQuNjY3aC02MTEuMzI4bC03MS4zMzktNTcuMDg4djU2OS4wODhoNjgyLjY2N3pNMjU2IDY2MS4zMzNoMTI4di04NS4zMzNoLTEyOHY4NS4zMzN6TTQ2OS4zMzMgNjYxLjMzM2gyMTMuMzMzdi04NS4zMzNoLTIxMy4zMzN2ODUuMzMzek0yNTYgNDkwLjY2N2gyNTZ2LTg1LjMzM2gtMjU2djg1LjMzM3pNNTk3LjMzMyA0OTAuNjY3aDE3MC42Njd2LTg1LjMzM2gtMTcwLjY2N3Y4NS4zMzN6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MjE7IiBnbHlwaC1uYW1lPSJkYW5tYWt1LW9mZiIgZD0iTTUxMiAyMzQuNjY3aC0yNjkuOTk1bC03MS4zMzktNTcuMDg4djU2OS4wODhoNjgyLjY2N3YtMjU2aDg1LjMzM3YyOTguNjY3Yy0wLjAwOSAyMy41NjEtMTkuMTA2IDQyLjY1OC00Mi42NjYgNDIuNjY3aC03NjguMDAxYy0yMy41NjEtMC4wMDktNDIuNjU4LTE5LjEwNi00Mi42NjctNDIuNjY2di03ODkuMzM0bDE4Ni43MDkgMTQ5LjMzM2gyMzkuOTU3ek03NjggNDQ4Yy0xMTcuODIxIDAtMjEzLjMzMy05NS41MTMtMjEzLjMzMy0yMTMuMzMzczk1LjUxMy0yMTMuMzMzIDIxMy4zMzMtMjEzLjMzM2MxMTcuODIxIDAgMjEzLjMzMyA5NS41MTMgMjEzLjMzMyAyMTMuMzMzdjBjMCAxMTcuODIxLTk1LjUxMyAyMTMuMzMzLTIxMy4zMzMgMjEzLjMzM3Ywek04OTYgMjM0LjY2N2MtMC4wMjMtMjAuMDI1LTQuNjc3LTM4Ljk1Ny0xMi45NDgtNTUuNzkxbDAuMzMyIDAuNzQ3LTE3MC40MjggMTcwLjQyOGMxNi4xOCA3Ljk2IDM1LjIxOSAxMi42MTYgNTUuMzQ1IDEyLjYxNiA3MC41MjcgMCAxMjcuNy01Ny4xNzMgMTI3LjctMTI3LjcgMC0wLjEwNiAwLTAuMjExIDAtMC4zMTd2MC4wMTZ6TTY0MCAyMzQuNjY3YzAuMDIzIDIwLjAyNSA0LjY3NyAzOC45NTcgMTIuOTQ4IDU1Ljc5MWwtMC4zMzItMC43NDcgMTcwLjQyOC0xNzAuNDI4Yy0xNi4xOC03Ljk2MS0zNS4yMTktMTIuNjE3LTU1LjM0Ni0xMi42MTctNzAuNTI2IDAtMTI3LjY5OCA1Ny4xNzItMTI3LjY5OCAxMjcuNjk4IDAgMC4xMDYgMCAwLjIxMiAwIDAuMzE5di0wLjAxNnpNMjU2IDY2MS4zMzNoMTI4di04NS4zMzNoLTEyOHY4NS4zMzN6TTQ2OS4zMzMgNjYxLjMzM2gyMTMuMzMzdi04NS4zMzNoLTIxMy4zMzN2ODUuMzMzek0yNTYgNDkwLjY2N2gyNTZ2LTg1LjMzM2gtMjU2djg1LjMzM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkyMzsiIGdseXBoLW5hbWU9ImRhbm1ha3Utc2V0dGluZ3MiIGQ9Ik01MTIgMjM0LjY2N2gtMjY5Ljk5NWwtNzEuMzM5LTU3LjA4OHY1NjkuMDg4aDY4Mi42Njd2LTI1Nmg4NS4zMzN2Mjk4LjY2N2MtMC4wMDkgMjMuNTYxLTE5LjEwNiA0Mi42NTgtNDIuNjY2IDQyLjY2N2gtNzY4LjAwMWMtMjMuNTYxLTAuMDA5LTQyLjY1OC0xOS4xMDYtNDIuNjY3LTQyLjY2NnYtNzg5LjMzNGwxODYuNzA5IDE0OS4zMzNoMjM5Ljk1N3pNOTM4LjY2NyAyMzQuNjY3Yy0wLjA0NyAxNi4yNTMtMi4zNjMgMzEuOTQ2LTYuNjQ2IDQ2LjgwNGwwLjI5Ny0xLjIwMyA0MS43NjcgMjQuMTE1LTQyLjY2NyA3My45MDEtNDEuNzAzLTI0LjA3OGMtMjEuMTI5IDIxLjQ3My00Ny44NzcgMzcuMzU1LTc3Ljg2MiA0NS4yNjdsLTEuMTg3IDAuMjY2djQ4LjI2MWgtODUuMzMzdi00OC4yNjFjLTMxLjE3Mi04LjE3OC01Ny45Mi0yNC4wNjAtNzkuMDI3LTQ1LjUxbC0wLjAyMi0wLjAyMi00MS43MDMgMjQuMDc4LTQyLjY2Ny03My45MDEgNDEuNzY4LTI0LjExNWMtNC4wMzAtMTMuNjY0LTYuMzQ5LTI5LjM2Mi02LjM0OS00NS42MDJzMi4zMTktMzEuOTM4IDYuNjQzLTQ2Ljc4MWwtMC4yOTQgMS4xOC00MS43NjgtMjQuMTE1IDQyLjY2Ny03My45MDEgNDEuNzAzIDI0LjA3OGMyMS4xMjktMjEuNDczIDQ3Ljg3Ny0zNy4zNTUgNzcuODYyLTQ1LjI2N2wxLjE4Ny0wLjI2NnYtNDguMjYxaDg1LjMzM3Y0OC4yNjFjMzEuMTcyIDguMTc3IDU3LjkyIDI0LjA2MCA3OS4wMjcgNDUuNTFsMC4wMjIgMC4wMjMgNDEuNzAzLTI0LjA3OCA0Mi42NjcgNzMuOTAxLTQxLjc2OCAyNC4xMTVjMy45ODYgMTMuNjU2IDYuMzAyIDI5LjM0OSA2LjM0OSA0NS41NzV2MC4wMjZ6TTc2OCAxNDkuMzMzYy00Ny4xMjggMC04NS4zMzMgMzguMjA1LTg1LjMzMyA4NS4zMzNzMzguMjA1IDg1LjMzMyA4NS4zMzMgODUuMzMzYzQ3LjEyOCAwIDg1LjMzMy0zOC4yMDUgODUuMzMzLTg1LjMzM3YwYy0wLjA1NS00Ny4xMDYtMzguMjI3LTg1LjI3OS04NS4zMjktODUuMzMzaC0wLjAwNXpNMjU2IDY2MS4zMzNoMTI4di04NS4zMzNoLTEyOHY4NS4zMzN6TTQ2OS4zMzMgNjYxLjMzM2gyMTMuMzMzdi04NS4zMzNoLTIxMy4zMzN2ODUuMzMzek0yNTYgNDkwLjY2N2gyNTZ2LTg1LjMzM2gtMjU2djg1LjMzM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTkyODsiIGdseXBoLW5hbWU9ImFkdmFuY2VkLWRhbm1ha3UiIGQ9Ik00NjkuMzMzIDIzNC42NjdoLTIyNy4zMjhsLTcxLjMzOS01Ny4wODh2NTY5LjA4OGg2ODIuNjY3di0yNTZoODUuMzMzdjI5OC42NjdjLTAuMDA5IDIzLjU2MS0xOS4xMDYgNDIuNjU4LTQyLjY2NiA0Mi42NjdoLTc2OC4wMDFjLTIzLjU2MS0wLjAwOS00Mi42NTgtMTkuMTA2LTQyLjY2Ny00Mi42NjZ2LTc4OS4zMzRsMTg2LjcwOSAxNDkuMzMzaDE5Ny4yOTF6TTc2OCAzMjkuNzg4YzI5LjM0NS0zNC42NTcgNjAuNDYzLTY1Ljc3NiA5My45NjUtOTQuMTY2bDEuMTU2LTAuOTU1Yy0zNC42NTgtMjkuMzQ1LTY1Ljc3Ni02MC40NjMtOTQuMTY3LTkzLjk2NmwtMC45NTQtMS4xNTVjLTI5LjM0NSAzNC42NTctNjAuNDYzIDY1Ljc3Ni05My45NjUgOTQuMTY2bC0xLjE1NiAwLjk1NWMzNC42NTggMjkuMzQ2IDY1Ljc3NiA2MC40NjQgOTQuMTY3IDkzLjk2N2wwLjk1NCAxLjE1NHpNNzY4IDQ3Ni4wMjZ2MGMtNjAuNDYxLTk5LjYyNy0xNDEuNzMyLTE4MC44OTgtMjM4LjI0NS0yMzkuNmwtMy4xMTQtMS43NTljOTkuNjI3LTYwLjQ2MiAxODAuODk4LTE0MS43MzMgMjM5LjYtMjM4LjI0NWwxLjc1OS0zLjExM2M2MC40NjIgOTkuNjI3IDE0MS43MzMgMTgwLjg5OCAyMzguMjQ1IDIzOS42bDMuMTEzIDEuNzU5Yy05OS42MjcgNjAuNDYyLTE4MC44OTggMTQxLjczMy0yMzkuNiAyMzguMjQ1bC0xLjc1OSAzLjExM3pNNzY4LTYuNjkydjB6TTI1NiA2NjEuMzMzaDEyOHYtODUuMzMzaC0xMjh2ODUuMzMzek00NjkuMzMzIDY2MS4zMzNoMjEzLjMzM3YtODUuMzMzaC0yMTMuMzMzdjg1LjMzM3pNMjU2IDQ5MC42NjdoMjU2di04NS4zMzNoLTI1NnY4NS4zMzN6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MmE7IiBnbHlwaC1uYW1lPSJ0ZXh0IiBkPSJNMTcwLjY2NyAxNDkuMzMzaDY4Mi42Njd2LTg1LjMzM2gtNjgyLjY2N3Y4NS4zMzN6TTc3Mi41MDggMTk0LjI1bDc2LjMxNyAzOC4xNjctMjk4LjY2NyA1OTcuMzI5aC03Ni4zMjFsLTI5OC42NjctNTk3LjMyOSA3Ni4zMjUtMzguMTY3IDczLjU0MSAxNDcuMDgzaDM3My45Mjl6TTM2Ny43MDMgNDI2LjY2N2wxNDQuMjk3IDI4OC41OTYgMTQ0LjI5OS0yODguNTk2eiIgLz4NCjxnbHlwaCB1bmljb2RlPSImI3hlOTJmOyIgZ2x5cGgtbmFtZT0ic2VuZC1kYW5tYWt1IiBkPSJNOTA0Ljg4IDQ2Ni42NzJsLTc0NS4yMjggNDExLjgzN2MtMi45ODUgMS42OTQtNi41NTcgMi42OTItMTAuMzYzIDIuNjkyLTExLjc1OCAwLTIxLjI4OS05LjUzMi0yMS4yODktMjEuMjg5IDAtMC4wMjYgMC0wLjA1MyAwLTAuMDc5djAuMDA0LTgyMy42NzNjMC0wLjAyMiAwLTAuMDQ4IDAtMC4wNzQgMC0xMS43NTggOS41MzItMjEuMjg5IDIxLjI4OS0yMS4yODkgMy44MDUgMCA3LjM3NyAwLjk5OCAxMC40NjkgMi43NDhsLTAuMTA2LTAuMDU1IDc0NS4yMjggNDExLjgzNmM2LjYxNyAzLjcwOCAxMS4wMTUgMTAuNjc2IDExLjAxNSAxOC42NzJzLTQuMzk4IDE0Ljk2My0xMC45MDcgMTguNjE2bC0wLjEwNyAwLjA1NXpNMjEzLjMzMyAxNDQuNjU1djI2MC42NzhoMjU2djg1LjMzM2gtMjU2djI2MC42NzlsNTQ4LjkxLTMwMy4zNDV6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MzA7IiBnbHlwaC1uYW1lPSJzZXR0aW5ncyIgZD0iTTQwNS4xNjMgODYxLjA5OWMwLjExLTEuOTg5IDAuMTczLTQuMzE3IDAuMTczLTYuNjU5IDAtNzAuNjg1LTU3LjMwMi0xMjcuOTg3LTEyNy45ODctMTI3Ljk4Ny0yNS44NTggMC00OS45MjQgNy42NjgtNzAuMDUwIDIwLjg1NGwwLjQ4Ny0wLjNjLTQ5LjM5Ny01MC4wNjMtODYuNDg2LTExMi4zOTQtMTA2LjI3OS0xODIuMDA1bC0wLjcyOS0yLjk5N2M0MS44MDYtMjEuNjIgNjkuODg4LTY0LjUzMyA2OS44ODgtMTE0LjAwNXMtMjguMDgyLTkyLjM4Ni02OS4xNzUtMTEzLjY3bC0wLjcxMy0wLjMzNmMyMC41MjItNzIuNjA5IDU3LjYxMS0xMzQuOTQgMTA3LjA1NC0xODUuMDUwbC0wLjA0NiAwLjA0N2MxOS42MzkgMTIuODg3IDQzLjcwNSAyMC41NTUgNjkuNTYzIDIwLjU1NSA3MC42ODUgMCAxMjcuOTg3LTU3LjMwMiAxMjcuOTg3LTEyNy45ODcgMC0yLjM0Mi0wLjA2My00LjY3LTAuMTg3LTYuOTgxbDAuMDE0IDAuMzIyYzMyLjA2MS04LjYxOCA2OC44NzEtMTMuNTY4IDEwNi44MzctMTMuNTY4czc0Ljc3NiA0Ljk1IDEwOS44MTkgMTQuMjRsLTIuOTgyLTAuNjcyYy0wLjExIDEuOTg5LTAuMTczIDQuMzE2LTAuMTczIDYuNjU4IDAgNzAuNjg1IDU3LjMwMiAxMjcuOTg3IDEyNy45ODcgMTI3Ljk4NyAyNS44NTggMCA0OS45MjQtNy42NjggNzAuMDUwLTIwLjg1NGwtMC40ODcgMC4zYzQ5LjM5NyA1MC4wNjQgODYuNDg1IDExMi4zOTQgMTA2LjI3OSAxODIuMDA2bDAuNzI5IDIuOTk3Yy00MS44MDYgMjEuNjItNjkuODg4IDY0LjUzMy02OS44ODggMTE0LjAwNXMyOC4wODIgOTIuMzg2IDY5LjE3NSAxMTMuNjdsMC43MTMgMC4zMzZjLTIwLjUyMyA3Mi42MDktNTcuNjExIDEzNC45NC0xMDcuMDU0IDE4NS4wNTBsMC4wNDYtMC4wNDdjLTE5LjYzOC0xMi44ODYtNDMuNzA1LTIwLjU1NC02OS41NjItMjAuNTU0LTcwLjY4NSAwLTEyNy45ODcgNTcuMzAyLTEyNy45ODcgMTI3Ljk4NyAwIDIuMzQyIDAuMDYzIDQuNjY5IDAuMTg3IDYuOThsLTAuMDE0LTAuMzIyYy0zMi4wNjEgOC42MTgtNjguODcxIDEzLjU2OC0xMDYuODM3IDEzLjU2OHMtNzQuNzc2LTQuOTUtMTA5LjgyLTE0LjI0MWwyLjk4MiAwLjY3MnpNNTQ0IDc4Ny43OTdjMjguODYtODUuODgzIDEwOC42My0xNDYuNjUxIDIwMi41OTItMTQ2LjY1MSAxNS40MDYgMCAzMC40MyAxLjYzNCA0NC45MDkgNC43MzdsLTEuNC0wLjI1MWMxMS42MzYtMTYuMDIzIDIyLjM2OC0zNC4yMjQgMzEuMzE2LTUzLjQyNWwwLjg1NS0yLjA0MmMtMzMuNjgtMzcuNTYtNTQuMjcyLTg3LjQ1OC01NC4yNzItMTQyLjE2NXMyMC41OTItMTA0LjYwNiA1NC40NDktMTQyLjM2NmwtMC4xNzcgMC4yYy05LjgwMy0yMS4yNDItMjAuNTM1LTM5LjQ0NC0zMi44MzctNTYuNDM0bDAuNjY3IDAuOTY3Yy0xMy4wNzkgMi44NTItMjguMTAzIDQuNDg1LTQzLjUwOSA0LjQ4NS05My45NjMgMC0xNzMuNzMyLTYwLjc2OC0yMDIuMTUzLTE0NS4xNDdsLTAuNDM5LTEuNTA0Yy0xMC40OTYtMS4wMjQtMjEuMjQ4LTEuNTM2LTMyLTEuNTM2cy0yMS41MDQgMC41MTItMzIgMS41MzZjLTI4Ljg2IDg1Ljg4My0xMDguNjMgMTQ2LjY1MS0yMDIuNTkyIDE0Ni42NTEtMTUuNDA2IDAtMzAuNDMtMS42MzQtNDQuOTA5LTQuNzM3bDEuNCAwLjI1MWMtMTEuNjM2IDE2LjAyMy0yMi4zNjggMzQuMjI0LTMxLjMxNiA1My40MjVsLTAuODU1IDIuMDQyYzMzLjY4IDM3LjU2IDU0LjI3MiA4Ny40NTggNTQuMjcyIDE0Mi4xNjVzLTIwLjU5MiAxMDQuNjA2LTU0LjQ0OSAxNDIuMzY2bDAuMTc3LTAuMmM5LjgwMyAyMS4yNDIgMjAuNTM1IDM5LjQ0NCAzMi44MzcgNTYuNDM0bC0wLjY2Ny0wLjk2N2MxMy4wNzktMi44NTIgMjguMTAzLTQuNDg1IDQzLjUwOS00LjQ4NSA5My45NjMgMCAxNzMuNzMyIDYwLjc2OCAyMDIuMTUzIDE0NS4xNDdsMC40NCAxLjUwNGMxMC40OTYgMS4wMjQgMjEuMjQ4IDEuNTM2IDMyIDEuNTM2czIxLjUwNC0wLjUxMiAzMi0xLjUzNnpNNTEyIDUzMy4zMzNjNDcuMTI4IDAgODUuMzMzLTM4LjIwNSA4NS4zMzMtODUuMzMzcy0zOC4yMDUtODUuMzMzLTg1LjMzMy04NS4zMzNjLTQ3LjEyOCAwLTg1LjMzMyAzOC4yMDUtODUuMzMzIDg1LjMzM3YwYzAuMDU1IDQ3LjEwNiAzOC4yMjcgODUuMjc4IDg1LjMyOCA4NS4zMzNoMC4wMDV6TTUxMiA2MTguNjY3Yy05NC4yNTcgMC0xNzAuNjY3LTc2LjQxLTE3MC42NjctMTcwLjY2N3M3Ni40MS0xNzAuNjY3IDE3MC42NjctMTcwLjY2N2M5NC4yNTcgMCAxNzAuNjY3IDc2LjQxIDE3MC42NjcgMTcwLjY2N3YwYzAgOTQuMjU3LTc2LjQxIDE3MC42NjctMTcwLjY2NyAxNzAuNjY3djB6IiAvPg0KPGdseXBoIHVuaWNvZGU9IiYjeGU5MzE7IiBnbHlwaC1uYW1lPSJjYXB0aW9uIiBkPSJNODUzLjMzMyA3NDYuNjY3di01OTcuMzMzaC02ODIuNjY3djU5Ny4zMzNoNjgyLjY2N3pNODk2IDgzMmgtNzY4Yy0yMy41NjQgMC00Mi42NjctMTkuMTAzLTQyLjY2Ny00Mi42Njd2MC02ODIuNjY3YzAtMjMuNTY0IDE5LjEwMy00Mi42NjcgNDIuNjY3LTQyLjY2N3YwaDc2OGMyMy41NjQgMCA0Mi42NjcgMTkuMTAzIDQyLjY2NyA0Mi42Njd2MCA2ODIuNjY3YzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3Ywek0zODQgMzYyLjY2N2MtMC4wMTcgMC0wLjAzNyAwLTAuMDU3IDAtNDcuMTI4IDAtODUuMzMzIDM4LjIwNS04NS4zMzMgODUuMzMzczM4LjIwNSA4NS4zMzMgODUuMzMzIDg1LjMzM2MyMy41NzggMCA0NC45MjMtOS41NjMgNjAuMzY3LTI1LjAyMWwwLjAwMS0wLjAwMSA2MC4zNjggNjAuMzY4Yy0zMC44ODUgMzAuODg1LTczLjU1MSA0OS45ODctMTIwLjY3OSA0OS45ODctOTQuMjU3IDAtMTcwLjY2Ny03Ni40MS0xNzAuNjY3LTE3MC42NjdzNzYuNDEtMTcwLjY2NyAxNzAuNjY3LTE3MC42NjdjNDcuMTI4IDAgODkuNzk1IDE5LjEwMyAxMjAuNjggNDkuOTg3djBsLTYwLjM2OCA2MC4zNjhjLTE1LjQwNS0xNS40NTgtMzYuNzE1LTI1LjAyMi02MC4yNTgtMjUuMDIyLTAuMDE5IDAtMC4wMzcgMC0wLjA1NiAwaDAuMDAzek02ODIuNjY3IDM2Mi42NjdjLTAuMDE3IDAtMC4wMzcgMC0wLjA1NyAwLTQ3LjEyOCAwLTg1LjMzMyAzOC4yMDUtODUuMzMzIDg1LjMzM3MzOC4yMDUgODUuMzMzIDg1LjMzMyA4NS4zMzNjMjMuNTc4IDAgNDQuOTIzLTkuNTYzIDYwLjM2Ny0yNS4wMjFsMC4wMDEtMC4wMDEgNjAuMzY4IDYwLjM2OGMtMzAuODg1IDMwLjg4NS03My41NTEgNDkuOTg3LTEyMC42NzkgNDkuOTg3LTk0LjI1NyAwLTE3MC42NjctNzYuNDEtMTcwLjY2Ny0xNzAuNjY3czc2LjQxLTE3MC42NjcgMTcwLjY2Ny0xNzAuNjY3YzQ3LjEyOCAwIDg5Ljc5NSAxOS4xMDMgMTIwLjY4IDQ5Ljk4N3YwbC02MC4zNjggNjAuMzY4Yy0xNS40MDUtMTUuNDU4LTM2LjcxNS0yNS4wMjItNjAuMjU4LTI1LjAyMi0wLjAxOSAwLTAuMDM3IDAtMC4wNTYgMGgwLjAwM3oiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTk0MDsiIGdseXBoLW5hbWU9ImxlZnQtYXJyb3ciIGQ9Ik01MTIgODkyLjMzOWw2MC4zMzktNjAuMzM5LTM0MS4zMzMtMzQxLjMzM2g3MDcuNjYxdi04NS4zMzNoLTcwNy42NjFsMzQxLjMzMy0zNDEuMzMzLTYwLjMzOS02MC4zMzktNDQ0LjMzOSA0NDQuMzM5IDQ0NC4zMzkgNDQ0LjMzOXoiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTk0MTsiIGdseXBoLW5hbWU9InJpZ2h0LWFycm93IiBkPSJNNTEyIDg5Mi4zMzlsLTYwLjMzOS02MC4zMzkgMzQxLjMzMy0zNDEuMzMzaC03MDcuNjYxdi04NS4zMzNoNzA3LjY2MWwtMzQxLjMzMy0zNDEuMzMzIDYwLjMzOS02MC4zMzkgNDQ0LjMzOSA0NDQuMzM5LTQ0NC4zMzkgNDQ0LjMzOXoiIC8+DQo8Z2x5cGggdW5pY29kZT0iJiN4ZTk0NTsiIGdseXBoLW5hbWU9ImNsb3NlIiBkPSJNODgzLjQ5OSA3NTkuMTU5bC02MC4zMzEgNjAuMzM5LTMxMS4xNjgtMzExLjE1OS0zMTEuMTU5IDMxMS4xNTktNjAuMzM5LTYwLjMzOSAzMTEuMTU5LTMxMS4xNTktMzExLjE1OS0zMTEuMTY4IDYwLjMzOS02MC4zMzEgMzExLjE1OSAzMTEuMTU5IDMxMS4xNjgtMzExLjE1OSA2MC4zMzEgNjAuMzMxLTMxMS4xNTkgMzExLjE2OCAzMTEuMTU5IDMxMS4xNTl6IiAvPg0KPC9mb250PjwvZGVmcz48L3N2Zz4=) format("svg");font-weight:400;font-style:normal;font-display:block}[class^=mpicon-],[class*=" mpicon-"]{font-family:mfunsPlayerIcon!important;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mpicon-play:before{content:""}.mpicon-pause:before{content:""}.mpicon-prev:before{content:""}.mpicon-next:before{content:""}.mpicon-loop:before{content:""}.mpicon-loop-off:before{content:""}.mpicon-volume-off:before{content:""}.mpicon-volume:before{content:""}.mpicon-widescreen:before{content:""}.mpicon-widescreen-exit:before{content:""}.mpicon-webscreen:before{content:""}.mpicon-webscreen-exit:before{content:""}.mpicon-pip:before{content:""}.mpicon-pip-exit:before{content:""}.mpicon-fullscreen:before{content:""}.mpicon-fullscreen-exit:before{content:""}.mpicon-danmaku:before{content:""}.mpicon-danmaku-off:before{content:""}.mpicon-danmaku-settings:before{content:""}.mpicon-advanced-danmaku:before{content:""}.mpicon-text:before{content:""}.mpicon-send-danmaku:before{content:""}.mpicon-settings:before{content:""}.mpicon-caption:before{content:""}.mpicon-left-arrow:before{content:""}.mpicon-right-arrow:before{content:""}.mpicon-close:before{content:""}.mfuns-player{-webkit-user-select:none;user-select:none;width:100%;height:100%;font-size:12px;display:flex;flex-direction:column}.mfuns-player-main{position:relative;width:100%;flex-grow:1;overflow:hidden}.mfuns-player-area{position:relative;width:100%;height:100%}.mfuns-player-content{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center;background:black;box-sizing:border-box}.mfuns-player-content video{display:block;width:100%;height:100%}.mfuns-player-head-wrap{position:absolute}.mfuns-player-side-wrap,.mfuns-player-modal-wrap,.mfuns-player-contextmenu-wrap{position:absolute;width:100%;height:100%;top:0;left:0}.mfuns-player-danmaku-wrap{position:absolute;left:0;top:0;width:100%;height:100%}.mfuns-player-danmaku-wrap>div{position:absolute;left:0;top:0;width:100%;height:100%}.mfuns-player-tooltip{position:absolute;left:50%;top:-30px;transform:translate(-50%);white-space:nowrap;display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mfuns-player li{list-style:none}.mfuns-player.is-webscreen{z-index:233333}.mfuns-player.is-webscreen .mfuns-player-main{position:fixed;top:0;bottom:0;left:0;right:0;z-index:233333;height:100%}.mpui{color:#404040}.mpui-input{font-family:inherit;font-size:inherit;height:20px;line-height:20px;border-radius:var(--mp-border-radius, 4px);padding:0 4px;outline:none;border:1px solid;background-color:transparent;color:#404040;border-color:#e6e6e6;transition:all .2s}.mpui-input:hover{border-color:gray}.mpui-input:focus{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-button{font-family:inherit;font-size:inherit;height:22px;line-height:22px;border-radius:var(--mp-border-radius, 4px);padding:0 4px;outline:none;border:1px solid;background-color:transparent;color:#404040;border-color:gray;cursor:pointer;transition:all .2s}.mpui-button:hover{color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7)}.mpui-tooltip{position:absolute;left:50%;top:-30px;transform:translate(-50%);white-space:nowrap;display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mpui-slider{position:relative}.mpui-slider-track{width:4px;height:4px;border-radius:2px;margin:0 auto;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;cursor:pointer;background:#808080}.mpui-slider-bar{background:var(--mp-primary-color, #7b7ff7);border-radius:2px}.mpui-slider-thumb-track{position:relative;width:calc(100% - 12px);height:calc(100% - 12px)}.mpui-slider-thumb{z-index:1;width:12px;height:12px;border-radius:100%;background:var(--mp-primary-color, #7b7ff7)}.mpui-slider-divider{position:absolute;width:100%;display:flex;justify-content:space-between}.mpui-slider-divider-dot{height:4px;width:1px;background-color:#404040;transform:translateY(-50%)}.mpui-picker-item{display:inline-block;padding:0 5px;height:20px;line-height:20px;border-radius:var(--mp-border-radius, 4px);border:transparent solid 1px;transition:color .2s;cursor:pointer}.mpui-picker-item.is-checked{border:transparent solid 1px;border-color:var(--mp-primary-color, #7b7ff7);color:var(--mp-primary-color, #7b7ff7)}.mpui-picker-item:hover,.mpui-picker-item:active{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox{height:22px;cursor:pointer}.mpui-checkbox-icon{position:relative;display:inline-block;vertical-align:middle;margin:4px 0;width:13px;height:13px;border-radius:var(--mp-border-radius, 4px);border:solid;border-width:1px;border-color:gray;box-sizing:border-box;transition:all .2s}.mpui-checkbox-label{position:relative;display:inline-block;vertical-align:middle;line-height:22px;margin:0 2px;transition:all .2s}.mpui-checkbox:hover .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:hover .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:active .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox:active .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-checkbox.is-checked .mpui-checkbox-icon{background-color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7);background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+DQogICAgPHBvbHlnb24gcG9pbnRzPSI0MCA3LjkyOSAyMCAyNy45MjkgMTAgMTcuOTI5IDIuOTI5IDI1IDIwIDQyLjA3MSA0Ny4wNzEgMTUgNDAgNy45MjkiIGZpbGw9IiNGRkYiLz4NCjwvc3ZnPg==);background-repeat:no-repeat;background-size:contain}.mpui-background,.mfuns-player-controls-panel{background-color:var(--mp-bg-light, #ffffff)}.mpui-black,.mfuns-player-danmakubar .mfuns-player-controls-panel,.mpui-dark,.mfuns-player.is-lightoff{color:#ffffffe0}.mpui-black .mpui-input,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-input,.mpui-dark .mpui-input,.mfuns-player.is-lightoff .mpui-input{background-color:transparent;color:#ffffffe0;border-color:#ffffff40}.mpui-black .mpui-input:hover,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-input:hover,.mpui-dark .mpui-input:hover,.mfuns-player.is-lightoff .mpui-input:hover{border-color:#ffffff80}.mpui-black .mpui-input:focus,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-input:focus,.mpui-dark .mpui-input:focus,.mfuns-player.is-lightoff .mpui-input:focus{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-button,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-button,.mpui-dark .mpui-button,.mfuns-player.is-lightoff .mpui-button{background-color:transparent;color:#ffffffe0;border-color:#ffffff80}.mpui-black .mpui-button:hover,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-button:hover,.mpui-dark .mpui-button:hover,.mfuns-player.is-lightoff .mpui-button:hover{color:var(--mp-primary-color, #7b7ff7);border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-slider-track,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-slider-track,.mpui-dark .mpui-slider-track,.mfuns-player.is-lightoff .mpui-slider-track{background:rgba(255,255,255,.5019607843)}.mpui-black .mpui-slider-divider-dot,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-slider-divider-dot,.mpui-dark .mpui-slider-divider-dot,.mfuns-player.is-lightoff .mpui-slider-divider-dot{background-color:#ffffffe0}.mpui-black .mpui-checkbox,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox,.mpui-dark .mpui-checkbox,.mfuns-player.is-lightoff .mpui-checkbox{border-color:#ffffff80}.mpui-black .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mpui-black .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-black .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mpui-black .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-black .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-dark .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mpui-black .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-black .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mpui-black .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-black .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mpui-dark .mpui-checkbox-label,.mpui-dark .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:hover .mfuns-player.is-lightoff .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mpui-black .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-black .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mpui-black .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-black .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-dark .mpui-checkbox-icon,.mpui-dark .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-icon{border-color:var(--mp-primary-color, #7b7ff7)}.mpui-black .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mpui-black .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-black .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-black .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mpui-black .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-black .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mpui-dark .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mfuns-player-danmakubar .mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player-controls-panel .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mpui-dark .mpui-checkbox-label,.mpui-dark .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label,.mfuns-player.is-lightoff .mpui-checkbox:active .mfuns-player.is-lightoff .mpui-checkbox-label{color:var(--mp-primary-color, #7b7ff7)}.mpui-dark .mpui-background,.mfuns-player.is-lightoff .mpui-background,.mpui-dark .mfuns-player-controls-panel,.mfuns-player.is-lightoff .mfuns-player-controls-panel,.mpui-dark.mpui-background,.mpui-background.mfuns-player.is-lightoff,.mpui-dark.mfuns-player-controls-panel,.mfuns-player-controls-panel.mfuns-player.is-lightoff{background-color:var(--mp-bg-dark, #202020)}.mpui-black .mpui-background,.mfuns-player-danmakubar .mfuns-player-controls-panel .mpui-background,.mpui-black .mfuns-player-controls-panel,.mpui-black.mpui-background,.mpui-black.mfuns-player-controls-panel,.mfuns-player-danmakubar .mfuns-player-controls-panel{background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725))}.mfuns-player-danmaku{position:absolute;left:0;right:0;top:0;bottom:0;color:#fff}.mfuns-player-danmaku.is-paused .mfuns-player-danmaku-item{animation-play-state:paused}.mfuns-player-danmaku-top,.mfuns-player-danmaku-bottom{position:absolute;left:50%;text-align:center;visibility:hidden;white-space:pre;will-change:visibility;animation:danmaku-show var(--duration) linear;animation-play-state:running}.mfuns-player-danmaku-item{display:inline-block;-webkit-user-select:none;user-select:none;white-space:pre;text-shadow:rgb(0,0,0) 1px 0px 1px,rgb(0,0,0) 0px 1px 1px,rgb(0,0,0) 0px -1px 1px,rgb(0,0,0) -1px 0px 1px;cursor:default}.mfuns-player-danmaku-roll{position:absolute;left:var(--offset);white-space:pre;will-change:transform;animation:danmaku-roll var(--duration) linear;animation-play-state:running}.mfuns-player-danmaku-reverse{position:absolute;right:var(--offset);white-space:pre;will-change:transform;animation:danmaku-reverse var(--duration) linear;animation-play-state:running}@keyframes danmaku-roll{0%{transform:translate(0)}to{transform:translate(var(--translateX))}}@keyframes danmaku-reverse{0%{transform:translate(0)}to{transform:translate(calc(var(--translateX) * -1))}}@keyframes danmaku-show{0%{visibility:visible}to{visibility:visible}}.mfuns-player-controller-wrap{position:absolute;bottom:-50px;left:0;right:0;height:50px;transition:bottom .4s ease}.mfuns-player-controller-mask{opacity:0;position:absolute;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;bottom:0;left:0;right:0;height:100px;pointer-events:none;transition:opacity .4s ease}.mfuns-player-controller{position:absolute;bottom:0;left:0;right:0;height:50px;margin:0 15px}.mfuns-player-controller-content{height:calc(100% - 20px);position:relative;margin:15px 0 5px;display:flex;justify-content:space-between;align-items:center}.mfuns-player-controller-left{height:100%;max-width:200px;display:flex;align-items:center;flex-shrink:0}.mfuns-player-controller-right{height:100%;min-width:200px;display:flex;justify-content:flex-end;align-items:center;flex-shrink:0}.mfuns-player-controller-center{flex-grow:1}.mfuns-player-controller-center.is-bar{margin:0 60px;max-width:600px}.mfuns-player-controller-top{width:100%;height:14px;position:absolute;top:0;display:flex;align-items:center;cursor:pointer;box-sizing:border-box}.mfuns-player.is-active .mfuns-player-controller-wrap,.mfuns-player.is-start .mfuns-player-controller-wrap{bottom:0}.mfuns-player.is-active .mfuns-player-controller-mask,.mfuns-player.is-start .mfuns-player-controller-mask{opacity:1}.mfuns-player-header{position:absolute;top:-50px;left:0;right:0;height:50px;transition:top .4s ease;pointer-events:none}.mfuns-player-header-mask{opacity:0;position:absolute;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x top;bottom:-30px;left:0;right:0;height:100px;pointer-events:none;transition:opacity .4s ease}.mfuns-player-header-main{position:relative;bottom:0;left:0;right:0;height:50px;margin:0 15px;color:#ffffffe0;display:flex;justify-content:space-between;align-items:center}.mfuns-player-header-left{height:100%;max-width:200px;display:flex;align-items:center;flex-shrink:0}.mfuns-player-header-right{height:100%;min-width:200px;display:flex;justify-content:flex-end;align-items:center;flex-shrink:0}.mfuns-player-header-center{flex-grow:1}.mfuns-player.is-active .mfuns-player-header,.mfuns-player.is-start .mfuns-player-header{top:0}.mfuns-player.is-active .mfuns-player-header-mask,.mfuns-player.is-start .mfuns-player-header-mask{opacity:1}.mfuns-player-controls-button{position:relative;height:30px;font-size:12px;display:flex;justify-content:center;cursor:pointer}.mfuns-player-controls-button-icon{padding:0 7px;transition:transform .3s ease}.mfuns-player-controls-button-icon i{font-size:21px;line-height:30px;display:none}.mfuns-player-controls-button-icon i:nth-child(1){display:block}.mfuns-player-controls-button.is-on .mfuns-player-controls-button-icon i:nth-child(1){display:none}.mfuns-player-controls-button.is-on .mfuns-player-controls-button-icon i:nth-child(2){display:block}.mfuns-player-controls-button-text{font-weight:700;font-size:14px;line-height:30px}.mfuns-player-controls-button:hover .mpui-tooltip,.mfuns-player-controls-button:hover .mfuns-player-controls-panel-wrap{display:block}.mfuns-player-controls-button:hover .mfuns-player-controls-button-icon{transform:translateY(-2px)}.mfuns-player-controls-button:hover .mfuns-player-controls-button-icon:active{transform:translateY(1px)}.mfuns-player-controls-button.is-control .mfuns-player-controls-panel-wrap{display:block}.mfuns-player-controls-button.is-control .mfuns-player-controls-icon{transform:translateY(-2px)}.mfuns-player-controls-panel-wrap{position:absolute;left:50%;bottom:100%;transform:translate(-50%);display:none;cursor:default}.mfuns-player-controls-panel{margin-bottom:20px;border-radius:var(--mp-border-radius, 4px);overflow:hidden}.mfuns-player-videotime{width:90px;text-align:center;font-size:13px;margin:0 5px;cursor:pointer}.mfuns-player-videotime-label{width:100%;white-space:nowrap;text-align:center}.mfuns-player-videotime-input{display:none;width:60px;margin:auto;font-size:13px;text-align:center}.mfuns-player-videotime.is-input .mfuns-player-videotime-label{display:none}.mfuns-player-videotime.is-input .mfuns-player-videotime-input{display:block}.mfuns-player-videotitle{font-size:16px;white-space:nowrap}.mfuns-player-progress{position:relative;width:100%;height:4px;background-color:#ffffff40;transition:height .2s ease}.mfuns-player-progress-played{position:absolute;top:0;left:0;height:100%;background-color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-progress-buffered{position:absolute;top:0;left:0;height:100%;background-color:#ffffff80}.mfuns-player-progress-thumb-track{position:absolute;top:50%;left:0;width:100%;height:0}.mfuns-player-progress-thumb{position:absolute;transform:translate(-50%,-50%) scale(0);width:14px;height:14px;background-color:var(--mp-primary-color, #7b7ff7);border-radius:7px;transition:transform,border;transition-timing-function:ease;transition-duration:.2s;box-sizing:border-box;border:4px solid white}.mfuns-player-progress-preview{position:absolute;top:-12px;width:0;height:0}.mfuns-player-progress-time{position:absolute;left:50%;bottom:0;transform:translate(-50%);display:none;height:20px;line-height:20px;padding:0 4px;font-size:12px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));color:#ffffffe0;border-radius:var(--mp-border-radius, 4px)}.mfuns-player-progress-tip{display:none;position:absolute;top:-10px}.mfuns-player-progress-tip:after{content:"";display:block;position:absolute;bottom:-10px;left:50%;transform:translate(-50%);border:5px solid;border-color:var(--mp-primary-color, #7b7ff7) transparent transparent transparent}.mfuns-player-progress.mfuns-player-progress-active{height:6px}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-thumb{transform:translate(-50%,-50%) scale(1)}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-tip{display:block}.mfuns-player-progress.mfuns-player-progress-active .mfuns-player-progress-time{display:inline-block}.mfuns-player-progress.mfuns-player-progress-dragging .mfuns-player-progress-thumb{border-width:2px}.mfuns-player.mode-solid .mfuns-player-progress{background-color:#e6e6e680}.mfuns-player.mode-solid .mfuns-player-progress-buffered{background-color:var(--mp-primary-color, #7b7ff7);opacity:.25}.mfuns-player.mode-solid .mfuns-player-progress-time{background-color:var(--mp-bg-light, #ffffff);color:#404040}.mfuns-player-side-wrap{display:none}.mfuns-player-side-wrap.is-show{display:block}.mfuns-player-side{position:absolute;right:20px;width:300px;top:50px;height:calc(100% - 120px);background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);color:#ffffffe0}.mfuns-player-side-mask{position:absolute;width:100%;height:100%}.mfuns-player-side-head{height:36px;padding:0 8px;font-size:14px;display:flex;justify-content:space-between}.mfuns-player-side-title{line-height:36px}.mfuns-player-side-content{height:calc(100% - 36px);overflow:hidden}.mfuns-player-side-content>*{position:relative;width:100%;height:100%;display:none}.mfuns-player-side-content>*.is-show{display:block}.mfuns-player-side-close{position:absolute;right:0;cursor:pointer}.mfuns-player-side-close i{padding:0 8px;font-size:21px;line-height:36px}.mfuns-player-side-panel{position:relative;width:100%;height:100%}.mfuns-player-side .mfuns-player-side-panel{display:none}.mfuns-player-side .mfuns-player-side-panel.is-show{display:block}.mfuns-player-modal-wrap{display:none}.mfuns-player-modal-wrap.is-show{display:block}.mfuns-player-modal{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);min-width:200px;min-height:150px;background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);color:#ffffffe0}.mfuns-player-modal-mask{position:absolute;width:100%;height:100%}.mfuns-player-modal-head{position:relative;height:30px;font-size:14px}.mfuns-player-modal-title{position:absolute;width:100%;text-align:center;line-height:36px}.mfuns-player-modal-close{position:absolute;right:0;cursor:pointer}.mfuns-player-modal-close i{padding:0 8px;font-size:21px;line-height:36px}.mfuns-player-modal-content>*{position:relative;width:100%;height:100%;display:none}.mfuns-player-modal-content>*.is-show{display:block}.mfuns-player-modal .mfuns-player-controller-icon{cursor:pointer;font-size:21px;line-height:30px}.mfuns-player-contextmenu-wrap{display:none}.mfuns-player-contextmenu-wrap.is-show{display:block}.mfuns-player-contextmenu{-webkit-user-select:none;user-select:none;position:absolute;min-width:200px;color:#ffffffe0}.mfuns-player-contextmenu li{height:36px;line-height:36px;cursor:pointer;padding:0 10px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mfuns-player-contextmenu li+li{border-top:1px solid rgba(255,255,255,.2509803922)}.mfuns-player-contextmenu li:hover{background-color:#ffffff40}.mfuns-player-contextmenu>ul{background-color:var(--mp-bg-black, rgba(32, 32, 32, .8784313725));border-radius:var(--mp-border-radius, 4px);overflow:hidden;margin-bottom:4px}.mfuns-player-contextmenu>ul:last-child{margin-bottom:0}.mfuns-player-contextmenu-danmaku{max-width:400px}.mfuns-player-contextmenu-danmaku-item{display:flex;justify-content:space-between}.mfuns-player-contextmenu-danmaku-item-content{flex-grow:1}.mfuns-player-contextmenu-danmaku-item-operate{display:flex;flex-shrink:0}.mfuns-player-contextmenu-danmaku-item-operate-btn{padding:0 4px}.mfuns-player-contextmenu-danmaku-item-operate-btn:hover{background-color:#ffffff40}.mfuns-player-footbar{height:40px;width:100%;display:flex;position:relative;bottom:0;left:0;justify-content:space-between;align-items:center;background-color:var(--mp-bg-light, #ffffff);border-top:none;box-sizing:border-box;color:#404040}.mfuns-player.mode-nofootbar .mfuns-player-main{width:100%;height:100%}.mfuns-player.mode-nofootbar .mfuns-player-footbar,.mfuns-player-button-volume .mpicon-volume-off,.mfuns-player-button-volume.is-muted .mpicon-volume{display:none}.mfuns-player-button-volume.is-muted .mpicon-volume-off{display:block}.mfuns-player-button-volume-value{width:100%;text-align:center;padding-bottom:4px}.mfuns-player-button-volume-slider{width:100%;height:60px}.mfuns-player-button-volume .mfuns-player-controls-panel{width:30px;padding:4px 0 6px}.mfuns-player-button-settings .mfuns-player-controls-panel{width:250px;padding:5px 15px}.mfuns-player-button-part{display:none}.mfuns-player-button-part.is-show{display:flex}.mfuns-player-button-quality-list{min-width:50px;height:100%}.mfuns-player-button-quality-item{white-space:nowrap;padding:0 8px;height:30px;line-height:30px;display:flex;cursor:pointer}.mfuns-player-button-quality-item:hover{background-color:#ffffff40}.mfuns-player-button-quality-item.is-selected{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-button-next:hover .mfuns-player-controls-button-icon{transform:translate(2px)}.mfuns-player-button-next:hover .mfuns-player-controls-button-icon:active{transform:translate(-1px)}.mfuns-player-button-prev:hover .mfuns-player-controls-button-icon{transform:translate(-2px)}.mfuns-player-button-prev:hover .mfuns-player-controls-button-icon:active{transform:translate(1px)}.mfuns-player-button-next,.mfuns-player-button-prev{display:flex}.mfuns-player-button-next.is-disabled,.mfuns-player-button-prev.is-disabled{color:#ffffff80;cursor:not-allowed}.mfuns-player-button-next.is-disabled.is-autohide,.mfuns-player-button-prev.is-disabled.is-autohide{display:none}.mfuns-player-button-next.is-disabled:hover .mfuns-player-controls-button-icon,.mfuns-player-button-prev.is-disabled:hover .mfuns-player-controls-button-icon,.mfuns-player-button-next.is-disabled:hover .mfuns-player-controls-button-icon:active,.mfuns-player-button-prev.is-disabled:hover .mfuns-player-controls-button-icon:active{transform:unset}.mfuns-player-button-next.is-hidden,.mfuns-player-button-prev.is-hidden{display:none}.mfuns-player-button-next .mfuns-player-controls-button-icon i,.mfuns-player-button-prev .mfuns-player-controls-button-icon i{font-size:16px}.mfuns-player.is-webscreen .mfuns-player-button-widescreen,.mfuns-player.is-fullscreen .mfuns-player-button-widescreen,.mfuns-player-button-danmakutoggle .mpicon-danmaku{display:none}.mfuns-player-button-danmakutoggle.is-on{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-button-danmakusettings .mfuns-player-controls-panel{width:270px;padding:5px 15px}.mfuns-player-button-danmakusettings .mfuns-player-slider-wrap{width:160px}.mfuns-player-button-danmakustyle .mfuns-player-controls-panel{width:250px;padding:5px 15px}.mfuns-player-danmaku-style-color-input{width:60px}.mfuns-player-danmaku-style-color-preview{width:36px;height:18px;border:2px solid rgba(255,255,255,.6274509804);border-radius:var(--mp-border-radius, 4px);margin-left:8px}.mfuns-player-danmaku-style-color-dropper{margin-left:5px}.mfuns-player-danmaku-style-color-picker{margin-top:8px;margin-left:30px}.mfuns-player-danmaku-style-color-picker .mpui-picker-item{border:none;padding:0}.mfuns-player-danmaku-style-color-picker .mpui-picker-item>div{width:12px;height:12px;border:2px solid rgba(0,0,0,.2509803922);border-radius:var(--mp-border-radius, 4px)}.mfuns-player-danmaku-style-color-picker .mpui-picker-item.is-checked{border:none}.mfuns-player-danmaku-style-color-picker .mpui-picker-item.is-checked>div{border-color:#fff}.mode-solid .mfuns-player-danmaku-style-color-preview{border-color:#00000040}.mode-solid .mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item>div{border-color:#00000020;border-radius:var(--mp-border-radius, 4px)}.mode-solid .mfuns-player-danmaku-style-color-picker .mfuns-player-picker-item.is-checked>div{border-color:#00000080}.mfuns-player-hotkeys-list{padding:5px 0;max-height:200px;overflow-y:auto}.mfuns-player-hotkeys-list-item{height:30px;line-height:30px;text-align:center}.mfuns-player-hotkeys-list-key{display:inline-block;width:80px}.mfuns-player-hotkeys-list-description{display:inline-block;width:180px}.mfuns-player-about{padding:10px}.mfuns-player-about-logo{width:360px;height:60px;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgMjAiPjxwYXRoIGQ9Ik0uODk2LDEzLjc1OTc3di0xMS41MkgzLjQ1NjA1TDcuMzU5ODYsNi44OTYsMTEuMjQ4LDIuMjM5NzVoMi41NzYxN3YxMS41MkgxMS4zMjgxM3YtNy43MjhMNy4zNTk4NiwxMC43Njc1OCwzLjM3Niw2LjA0Nzg1djcuNzExOTJaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTE1LjY5NjI5LDEzLjc1OTc3di0xMGEyLjE4MDU5LDIuMTgwNTksMCwwLDEsLjMxOTgyLTEuMTUxODYsMi40ODIwOSwyLjQ4MjA5LDAsMCwxLC44NDgxNS0uODQ4MTQsMi4yMDk0NSwyLjIwOTQ1LDAsMCwxLDEuMTY4LS4zMTk4M0gyMS41ODRWMy45MDM4MUgxOC4xNDRWNC40OEgyMS41ODRWNi45Mjc3M0gxOC4xNDR2Ni44MzJaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTI0LjA0NzM2LDEzLjQzOTk0YTIuNDEyODUsMi40MTI4NSwwLDAsMS0uODM5ODQtLjg0ODE0LDIuMjIzMzIsMi4yMjMzMiwwLDAsMS0uMzEyLTEuMTUxODZWNC40OGgyLjQ0Nzc1djYuODMxNTRoNC41MTIyMVY0LjQ4aDIuNDQ3NzV2Ni45NmEyLjIyMzMyLDIuMjIzMzIsMCwwLDEtLjMxMiwxLjE1MTg2LDIuNDEyODUsMi40MTI4NSwwLDAsMS0uODM5ODQuODQ4MTQsMi4yMTA2OCwyLjIxMDY4LDAsMCwxLTEuMTY4LjMxOTgzSDI1LjIxNTMzQTIuMjA5NDUsMi4yMDk0NSwwLDAsMSwyNC4wNDczNiwxMy40Mzk5NFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJNMzQuMDMxMjUsMTMuNzU5NzdWNC40OGg3LjA4ODM4YTIuMjEwNzYsMi4yMTA3NiwwLDAsMSwxLjE2OC4zMTk4MiwyLjQxMjg4LDIuNDEyODgsMCwwLDEsLjgzOTg0Ljg0ODE1LDIuMjIzMzEsMi4yMjMzMSwwLDAsMSwuMzEyLDEuMTUxODV2Ni45Nkg0MC45OTE3di02LjgzMkgzNi40Nzk0OXY2LjgzMloiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJNNDUuOTE5OTIsMTMuNDM5OTRhMi40ODIxNSwyLjQ4MjE1LDAsMCwxLS44NDgxNC0uODQ4MTQsMi4xODA2LDIuMTgwNiwwLDAsMS0uMzE5ODMtMS4xNTE4NnYtLjQ2NDM1aDIuNDQ3NzZ2LjMzNTkzaDQuNTEyMnYtLjk2SDQ3LjA3MTc4YTIuMTgwNTksMi4xODA1OSwwLDAsMS0xLjE1MTg2LS4zMTk4MiwyLjQ4MjE4LDIuNDgyMTgsMCwwLDEtLjg0ODE0LS44NDgxNUEyLjE4MDU5LDIuMTgwNTksMCwwLDEsNDQuNzUyLDguMDMxNzRWNi43OTk4QTIuMTgwNTksMi4xODA1OSwwLDAsMSw0NS4wNzE3OCw1LjY0OGEyLjQ4MjE4LDIuNDgyMTgsMCwwLDEsLjg0ODE0LS44NDgxNUEyLjE4MDY4LDIuMTgwNjgsMCwwLDEsNDcuMDcxNzgsNC40OGg0Ljc2ODA2YTIuMjA5NTMsMi4yMDk1MywwLDAsMSwxLjE2OC4zMTk4MkEyLjQ4MjIxLDIuNDgyMjEsMCwwLDEsNTMuODU2LDUuNjQ4YTIuMTgwNTgsMi4xODA1OCwwLDAsMSwuMzE5ODIsMS4xNTE4NXYuNDYzODdINTEuNzExOTFWNi45Mjc3M2gtNC41MTIydi45Nmg0LjY0MDEzYTIuMjA5ODUsMi4yMDk4NSwwLDAsMSwxLjE2OC4zMjAzMSwyLjQ4MDc3LDIuNDgwNzcsMCwwLDEsLjg0ODE1Ljg0NzY1LDIuMTgyMjgsMi4xODIyOCwwLDAsMSwuMzE5ODIsMS4xNTIzNXYxLjIzMTkzQTIuMTgwNTksMi4xODA1OSwwLDAsMSw1My44NTYsMTIuNTkxOGEyLjQ4MjE4LDIuNDgyMTgsMCwwLDEtLjg0ODE1Ljg0ODE0LDIuMjA5NDUsMi4yMDk0NSwwLDAsMS0xLjE2OC4zMTk4M0g0Ny4wNzE3OEEyLjE4MDYsMi4xODA2LDAsMCwxLDQ1LjkxOTkyLDEzLjQzOTk0WiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik02MS4wMDczMiwxMy43NTk3N1YyLjI1NTg2aDkuNjAwMWExLjg0NzQyLDEuODQ3NDIsMCwwLDEsLjk2Nzc4LjI2MzY3LDEuOTgxMiwxLjk4MTIsMCwwLDEsLjY5NjI4LjY5NjI5LDEuODUsMS44NSwwLDAsMSwuMjU1ODYuOTZ2My4zNzZhMS44NSwxLjg1LDAsMCwxLS4yNTU4Ni45NiwxLjk4MTI4LDEuOTgxMjgsMCwwLDEtLjY5NjI4LjY5NjI5LDEuODQ3NDIsMS44NDc0MiwwLDAsMS0uOTY3NzguMjYzNjdoLTguMzA0MnY0LjI4ODA5Wm0xLjkxOTkzLTUuNjAwMWg3LjY4MDE3YS42MTQ4My42MTQ4MywwLDAsMCwuNDM5OTQtLjE3NTc4LjU3NDcuNTc0NywwLDAsMCwuMTg0MDktLjQzMjEzdi0zLjM3NmEuNjI4NTYuNjI4NTYsMCwwLDAtLjYyNC0uNjI0SDYyLjkyNzI1YS42Mjg1NC42Mjg1NCwwLDAsMC0uNjI0LjYyNHYzLjM3NmEuNTc0NzMuNTc0NzMsMCwwLDAsLjE4NDA4LjQzMjEzQS42MTQuNjE0LDAsMCwwLDYyLjkyNzI1LDguMTU5NjdaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTc0LjU2Njg5LDEzLjQ5NTYxYTIuMDE0NTUsMi4wMTQ1NSwwLDAsMS0uNzAzNjEtLjcwMzYyLDEuODQ1LDEuODQ1LDAsMCwxLS4yNjQxNi0uOTY4MjZWMS40Mzk5NGgxLjMxMlYxMS44MjM3M2EuNjI4NTQuNjI4NTQsMCwwLDAsLjYyNC42MjRINzcuMTAzdjEuMzEySDc1LjUzNTE2QTEuODQ1LDEuODQ1LDAsMCwxLDc0LjU2Njg5LDEzLjQ5NTYxWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik04MC4yMDcsMTMuNzU5NzdhMS44NDUsMS44NDUsMCwwLDEtLjk2ODI2LS4yNjQxNiwyLjAxNDQ2LDIuMDE0NDYsMCwwLDEtLjcwMzYxLS43MDM2MiwxLjg0NSwxLjg0NSwwLDAsMS0uMjY0MTYtLjk2ODI2VjguNDYzODdoOC4xMjc5M1Y2LjQxNTUzYS42Mjc3My42Mjc3MywwLDAsMC0uNjI0LS42MjM1NEg3OC4yNzFWNC40OGg3LjUwMzlhMS44NzcsMS44NzcsMCwwLDEsLjk4Mzg5LjI2MzY3LDIuMDIxMjgsMi4wMjEyOCwwLDAsMSwuNzA0MS43MDQxLDEuODQ0NTMsMS44NDQ1MywwLDAsMSwuMjY0MTYuOTY3Nzh2Ny4zNDQyNFptMC0xLjMxMmg2LjE5MTlWOS43NzU4OEg3OS41ODN2Mi4wNDc4NWEuNjI4NTQuNjI4NTQsMCwwLDAsLjYyNC42MjRaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTkwLjkyNjI3LDE3LjQzOTk0VjE2LjExMTgyaDUuNzkyYS42Mjc3Mi42Mjc3MiwwLDAsMCwuNjI0LS42MjR2LTEuNzI4aC02LjE5MTlhMS44NDIsMS44NDIsMCwwLDEtLjk2Nzc3LS4yNjQxNiwyLjAxNTg1LDIuMDE1ODUsMCwwLDEtLjcwNDEtLjcwMzYyLDEuODQ1LDEuODQ1LDAsMCwxLS4yNjQxNi0uOTY4MjZ2LTcuMzEyaDEuMzEydjcuMzEyYS42Mjg1NC42Mjg1NCwwLDAsMCwuNjI0LjYyNGg1LjU2Nzg3YS42Mjc3MS42Mjc3MSwwLDAsMCwuNjI0LS42MjR2LTcuMzEyaDEuMzEyVjE1LjQ4Nzc5YTEuOTIzODUsMS45MjM4NSwwLDAsMS0uMjU1ODYuOTgzODksMS45NTgzMSwxLjk1ODMxLDAsMCwxLS42OTU4LjcwNDEsMS44NzkxLDEuODc5MSwwLDAsMS0uOTg0MzguMjY0MTZaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTEwMC45NjcyOSwxMy40OTU2MWEyLjAxNTg3LDIuMDE1ODcsMCwwLDEtLjcwNDExLS43MDM2MiwxLjg0NSwxLjg0NSwwLDAsMS0uMjY0MTYtLjk2ODI2VjYuNDE1NTNhMS44NDQ1MywxLjg0NDUzLDAsMCwxLC4yNjQxNi0uOTY3NzgsMi4wMjEzMSwyLjAyMTMxLDAsMCwxLC43MDQxMS0uNzA0MSwxLjg0NjExLDEuODQ2MTEsMCwwLDEsLjk2Nzc3LS4yNjM2N2g1LjU2Nzg3YTEuODc4NjgsMS44Nzg2OCwwLDAsMSwuOTg0MzcuMjYzNjcsMi4wMjQsMi4wMjQsMCwwLDEsLjcwMzYyLjcwNDEsMS44NDQ1MywxLjg0NDUzLDAsMCwxLC4yNjQxNi45Njc3OFY5Ljc3NTg4aC04LjE0NHYyLjA0Nzg1YS42Mjg1NC42Mjg1NCwwLDAsMCwuNjI0LjYyNGg3LjUydjEuMzEyaC03LjUyQTEuODQyLDEuODQyLDAsMCwxLDEwMC45NjcyOSwxMy40OTU2MVptLjM0Mzc1LTUuMDMxNzRIMTA4LjEyN1Y2LjQxNTUzYS42Mjc3MS42Mjc3MSwwLDAsMC0uNjI0LS42MjM1NGgtNS41Njc4N2EuNjI3NzEuNjI3NzEsMCwwLDAtLjYyNC42MjM1NFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJNMTExLjAwNjg0LDEzLjc1OTc3VjYuNDE1NTNhMS44NDQ1MywxLjg0NDUzLDAsMCwxLC4yNjQxNi0uOTY3NzgsMi4wMTk4OSwyLjAxOTg5LDAsMCwxLC43MDM2MS0uNzA0MSwxLjg0OTEsMS44NDkxLDAsMCwxLC45NjgyNi0uMjYzNjdoNS4yMTU4MlY1Ljc5MmgtNS4yMTU4MmEuNjI3NzEuNjI3NzEsMCwwLDAtLjYyNC42MjM1NHY3LjM0NDI0WiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==);background-size:cover}.mfuns-player-about a{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-partlist-list{scrollbar-width:thin;height:100%;overflow-y:auto}.mfuns-player-partlist-list::-webkit-scrollbar{width:5px}.mfuns-player-partlist-list::-webkit-scrollbar-thumb{background-color:gray}.mfuns-player-partlist-item{padding:0 8px;height:30px;line-height:30px;display:flex;cursor:pointer}.mfuns-player-partlist-item:hover{background-color:#ffffff40}.mfuns-player-partlist-item.is-selected{color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-partlist-item-id{display:inline-block;width:40px;flex-shrink:0}.mfuns-player-partlist-item-title{display:inline-block;flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mfuns-player-panel-row{display:flex;padding:5px 0}.mfuns-player-row-label{flex-shrink:0;height:22px;line-height:22px;padding-right:10px}.mfuns-player-row-value{height:22px;line-height:22px;padding-left:10px}.mfuns-player-videostatus{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mfuns-player-videostatus-paused{display:none;position:absolute;bottom:60px;right:20px;width:65px;height:55px;background:url(data:image/png;base64,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);background-size:100% 100%}.mfuns-player-videostatus-loading{display:none;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:100px}.mfuns-player-videostatus-loading-icon{width:100%;display:flex;justify-content:center;align-items:center;font-size:16px;font-weight:700;height:35px}.mfuns-player-videostatus-loading-icon>span{width:20px;height:35px;font-size:16px;text-align:center;line-height:16px;color:var(--mp-primary-color, #7b7ff7);animation:loading-float 1.4s ease-in-out infinite;text-shadow:1px 1px #666}.mfuns-player-videostatus-loading-icon>span:nth-child(2){animation-delay:-1.2s}.mfuns-player-videostatus-loading-icon>span:nth-child(3){animation-delay:-1s}.mfuns-player-videostatus-loading-icon>span:nth-child(4){animation-delay:-.8s}.mfuns-player-videostatus-loading-icon>span:nth-child(5){animation-delay:-.6s}.mfuns-player-videostatus-loading-icon>span:nth-child(6){animation-delay:-.4s}.mfuns-player-videostatus-loading-icon>span:nth-child(7){animation-delay:-.2s}.mfuns-player-videostatus-loading-content{width:100%;text-align:center;font-size:14px;font-weight:700;color:#fff;text-shadow:1px 1px #666}.mfuns-player.is-paused .mfuns-player-videostatus-paused,.mfuns-player.is-loading .mfuns-player-videostatus-loading{display:block}@keyframes loading-float{0%,to{height:35px}50%{height:20px}}.mfuns-player-danmakubar{display:flex;flex-grow:1;justify-content:space-between;align-items:center;height:100%}.mfuns-player-danmakubar .mfuns-player-danmakubar-status-loading,.mfuns-player-danmakubar .mfuns-player-danmakubar-status-login{display:none;padding-left:10px}.mfuns-player-danmakubar .mfuns-player-danmakubar-status-login a{color:var(--mp-primary-color, #7b7ff7);cursor:pointer}.mfuns-player-danmakubar .mfuns-player-controller-icon-wrap{padding:0 5px}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input,.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-slot{display:none}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-wrap{background-color:#e6e6e6}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-status-login{display:block}.mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-send{background-color:#aaa;pointer-events:none;cursor:not-allowed}.mpui-dark .mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-wrap,.mfuns-player.is-lightoff .mfuns-player-danmakubar.is-login .mfuns-player-danmakubar-input-wrap{background-color:#ffffff40}.mfuns-player-danmakubar.is-loading .mfuns-player-controls-button{pointer-events:none}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-wrap{background-image:linear-gradient(90deg,#e6e6e6 10%,#f0f0f0 24%,#f6f6f6 32%,#f6f6f6 68%,#f0f0f0 76%,#e6e6e6 90%);background-size:200% 100%;background-position:0% 0%;animation:skeleton-loading 1.4s linear infinite;cursor:not-allowed}.mpui-dark .mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-wrap,.mfuns-player.is-lightoff .mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-wrap{background-image:linear-gradient(90deg,#555 10%,#444 24%,#333 32%,#333 68%,#444 76%,#555 90%);background-size:200% 100%;background-position:0% 0%;animation:skeleton-loading 1.4s linear infinite;cursor:not-allowed}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input,.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-input-slot{display:none}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-status-loading{display:block}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-status-login{display:none}.mfuns-player-danmakubar.is-loading .mfuns-player-danmakubar-send{background-color:#aaa;pointer-events:none;cursor:not-allowed}.mfuns-player-danmakubar-slot,.mfuns-player-danmakubar-input-slot{display:flex;flex-shrink:0}.mfuns-player-danmakubar-input-wrap{display:flex;flex-grow:1;align-items:center;position:relative;height:100%;background-color:#ffffff40;border-radius:var(--mp-border-radius, 4px)}.mfuns-player-danmakubar-input{font-size:13px;flex:5;height:30px;outline:none;border:none;margin-left:5px;color:#ffffffe0;background-color:transparent;box-sizing:border-box}.mfuns-player-danmakubar-input::-webkit-input-placeholder{color:#ffffff80}.mfuns-player-danmakubar-status-loading{font-size:13px;flex:5;height:32px;line-height:32px;color:#999;box-sizing:border-box;display:none}.mfuns-player-danmakubar-status-login{font-size:13px;flex:5;height:32px;line-height:32px;box-sizing:border-box;display:none}.mfuns-player-danmakubar-send{width:60px;display:flex;align-items:center;justify-content:center;height:30px;font-size:12px;color:#fff;background:var(--mp-primary-color, #7b7ff7);border-radius:0 var(--mp-border-radius, 4px) var(--mp-border-radius, 4px) 0;cursor:pointer}.mfuns-player-danmakubar-wrap{height:40px}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar .mfuns-player-controller-icon-wrap{padding:0 7px}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-input-wrap{height:100%;border-left:1px solid #e6e6e6;border-radius:0;background-color:transparent}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-input{font-family:inherit;height:100%;margin-left:5px;color:#404040}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-input::-webkit-input-placeholder{color:gray}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-send{background:var(--mp-primary-color, #7b7ff7);border-radius:var(--mp-border-radius, 4px);margin-right:6px}.mfuns-player-danmakubar-wrap .mfuns-player-danmakubar-send.is-disabled{background:#e6e6e6;color:gray;cursor:not-allowed}@keyframes skeleton-loading{0%{background-position:200% 0%}to{background-position:0% 100%}}.mfuns-player-settings-play,.mfuns-player-settings-others{display:flex;flex-wrap:wrap;gap:0 10px}.mfuns-player-loadingmask{position:absolute;width:100%;height:100%;left:0;top:0;display:none;background:black;flex-direction:column;overflow:hidden;color:#ffffffe0}.mfuns-player-loadingmask.is-show{display:flex}.mfuns-player-loadingmask-info{display:flex;flex-direction:column;justify-content:end;flex-grow:1;padding:8px}.mfuns-player-loadingmask-tips{flex-shrink:0;height:24px;padding:0 8px}.mfuns-player-loadingmask-icon{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.mfuns-player-loadingmask-image{width:96px;height:96px;background:url(data:image/gif;base64,R0lGODdhQABAAHcAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAAQABAAIAAAAAAAAAC/4SPqcvtD6OctNqLs94w+M85H0iNY7iYp6SS6NG6Tby+AO09uMztOdO6qV4mYRF4DIaGxhqCaVBujlEqzFrFWqBZnu9b0X7HZB35jNY+0+yzqB2b4N4+25qrkNrNvxlvTxfAJwgY4ZTyV4jYh8So2Ejo5xiW2FF5NQl5F1ly2YXJ2cV5yOLZBDoKRWpoWmMltWqZuYlKSNMUWjoLupl2Ectb67bVKgOHAfzZu3L7Wzyph0e5q/womZuQbK2t/chtqhEXfE0M16ypa75DzqoOtoidZ467Lk8t2t2+2q3Xo8afr1wmgOCQJSJ4z9m+b+cE/mNYZlkdewndRaRoMWOgjBlt0nGcE46NtZEkS5o8iTKlypUsW7p8qagAACH5BAkKAAAALAAAAABAAEAAgAAAAAAAAAL/hI+py+0Po5y02otl2Dxk3VHd+EGjF51kyajb44asEqNtzc0J3pzHqgPgbDufwajzIX9AZi65Wh6bU1lpiaU6XyxpMxu7WrfDchlmTqtV6LVb3X7zEOl4LXjj9rT4vT7/1xdnJwgSSDNW6Ee0wKdYdAgZ+Uj3tFg52ZeI+LcJeOGJSTT2FTroQGoplKo6YVo1KsO2+nqJqkriApt5y0sb+4ZRmxgs3MrJWAx6LCmZO2vMvOXc6ej6Wktp/UtpIg07sybay2gnF2brfX6WTr7OjqwOD3gXb/6dgt7s7lsBPc6vEJ9h2TJ4Iojvw8CEUsIt9PVPTMNf5aj122Wm0buNHro0cvyYCeRHeXXOdTuJMqXKlSxbunwJM6bMmRAKAAAh+QQJCgAAACwAAAAAQABAAIAAAAAAAAAC/4SPqcvtD6OctNqLZdg8T95pYOg94xadYOmoqOm+bBIHcD0rtc3sZO7j6UaGU+5gNA5XSCLQCVA2oVFpiapCWIvUjDQI9lHC5DKzZU6DIer2jv0+arNwmbxu7/3u6P3izNeX9+cXSDi4JGTYAKiHuDj3GKkImYjnVXh5I9QI1SUiOcV59tUISnk4SqK0dapZteICm7n52oZhailKhksrOhmGGcqVJzub61pLw9o65kuMOruIPFnJ+CxtnfoqLFat7OzWvDwMLD7+i3ceI6iO4+i9LUjX+5l+bV+PTA1dXjHO71igfAEDdouWDR/CKwSfoftnLNHCYw93xSO3LuNCjRoa53Hk9aGMuSDaSpo8iTKlypUsW7p8CXNRAQAh+QQJCgAAACwAAAAAQABAAIAAAAAAAAAC/4SPqcvtD6OctNqLs5ah++mFGxSKZPmNDGqubKsib7rMcGx3bh7EcglAKVgGok8YBCaQReZI2YQ5o7SN83o7TDFQLe/LA4HH5O2wjCaf0uzc+uvzZs+6uLjumNt3vYd+T9eXVwXY8CcnWGhIWMOouOQIiffYOFlpSfmDKYnXVXiYRNPVAjq4qZkIpRoZASplQuRJ4VqlBMfFSsUZ6oZ7isgJpkFriTacyxscdvyrq9xnVkGcmLlrSl0NfG2lhuqHfNkWrd0q3rvYjGpug44d/nJ9HvhWGi/rbH9kZN2efmE2zd+/OQEBAUR2j9u9gO4GwptnT+C7fc/Wretn0dy3jBfi7ozh1TGbyJEkS5o8iTKlypUsW1IoAAA7) center/contain no-repeat;filter:invert(25%) drop-shadow(2px 2px #222);image-rendering:pixelated}.mfuns-player.mpui-white .mfuns-player-loadingmask{background:white;color:#404040}.mfuns-player.mpui-white .mfuns-player-loadingmask-image{filter:invert(10%) drop-shadow(2px 2px #aaa)}.mfuns-player-mini{background-color:#000;position:fixed;width:400px;height:225px;right:40px;bottom:40px;display:none;overflow:hidden}.mfuns-player-mini.is-show{display:block}.mfuns-player.is-lightoff{position:relative;z-index:233333}.mfuns-player-lightoff-mask{display:none;z-index:-10;opacity:.9;background-color:#000;position:fixed;top:0;bottom:0;left:0;right:0}.mfuns-player.is-lightoff .mfuns-player-lightoff-mask{display:block}.mfuns-player .mfuns-player-content{padding:var(--padding, 0)}.mfuns-player.is-widescreen .mfuns-player-video-wrap,.mfuns-player.is-webscreen .mfuns-player-video-wrap,.mfuns-player.is-fullscreen .mfuns-player-video-wrap{padding:0}.mfuns-player-danmakulist{-webkit-user-select:none;user-select:none;width:100%;height:100%;box-sizing:border-box;font-size:12px}.mfuns-player-danmakulist .list-row,.mfuns-player-danmakulist .mfuns-player-danmakulist-head{position:relative;line-height:24px;height:24px;white-space:nowrap}.mfuns-player-danmakulist-head{box-shadow:1px 0 2px #ccc}.mfuns-player-danmakulist-head :hover{background-color:#e6e6e633}.mfuns-player-danmakulist-select{position:absolute;box-sizing:border-box;line-height:24px;height:24px;width:100%;top:0;padding:0 8px;justify-content:space-between;display:none;background:white}.mfuns-player-danmakulist-select.is-show{display:flex}.mfuns-player-danmakulist-container .list-row:hover,.mfuns-player-danmakulist-container .mfuns-player-danmakulist-head:hover{background-color:#e6e6e633}.mfuns-player-danmakulist-container .list-row:hover .list-operate,.mfuns-player-danmakulist-container .mfuns-player-danmakulist-head:hover .list-operate{display:flex}.mfuns-player-danmakulist-container .list-row:hover .col-date,.mfuns-player-danmakulist-container .mfuns-player-danmakulist-head:hover .col-date{visibility:hidden}.mfuns-player-danmakulist-container .list-row.is-selected,.mfuns-player-danmakulist-container .is-selected.mfuns-player-danmakulist-head{color:var(--mp-primary-color, #7b7ff7);background-color:#e6e6e680}.mfuns-player-danmakulist-container .list-row.is-focus,.mfuns-player-danmakulist-container .is-focus.mfuns-player-danmakulist-head{color:var(--mp-primary-color, #7b7ff7);background-color:#e6e6e6}.mfuns-player-danmakulist .list-column,.mfuns-player-danmakulist .list-cell{box-sizing:content-box;display:inline-block;height:100%;padding:0 4px;overflow:hidden}.mfuns-player-danmakulist .list-column.col-time,.mfuns-player-danmakulist .list-cell.col-time{padding-left:8px;width:40px}.mfuns-player-danmakulist .list-column.col-date,.mfuns-player-danmakulist .list-cell.col-date{padding-right:8px;width:90px;text-align:center}.mfuns-player-danmakulist .list-column.col-content,.mfuns-player-danmakulist .list-cell.col-content{width:calc(100% - 162px);text-overflow:ellipsis;white-space:overflow}.mfuns-player-danmakulist .list-operate{position:absolute;right:0;top:0;width:100px;height:100%;display:none;justify-content:flex-end;align-items:center}.mfuns-player-danmakulist .list-operate-btn{cursor:pointer;line-height:20px;margin-left:4px;padding:0 8px;border:1px solid var(--mp-primary-color, #7b7ff7);border-radius:var(--mp-border-radius, 4px);color:var(--mp-primary-color, #7b7ff7)}.mfuns-player-danmakulist-main{position:relative;overflow:hidden;width:100%;height:calc(100% - 40px)}.mfuns-player-danmakulist-container{overflow:hidden;position:absolute;overflow-y:auto;scrollbar-width:thin;top:24px;left:0;width:100%;height:calc(100% - 24px)}.mfuns-player-danmakulist-container::-webkit-scrollbar{width:5px}.mfuns-player-danmakulist-container::-webkit-scrollbar-thumb{background-color:gray}.mfuns-player-danmakulist-status{position:absolute;top:50%;width:100%}.mfuns-player-danmakulist-status div{text-align:center;display:none;color:gray}.mfuns-player-danmakulist-status[data-status=loading] .status-loading-text,.mfuns-player-danmakulist-status[data-status=failed] .status-failed-text,.mfuns-player-danmakulist-status[data-status=empty] .status-empty-text{display:block}.mfuns-player-danmakulist-foot{border-top:1px solid #e6e6e6;display:flex;justify-content:space-between;height:40px}.mfuns-player-danmakulist-foot-left,.mfuns-player-danmakulist-foot-right{display:flex;align-items:center}.mfuns-player-danmakulist-autoscroll{cursor:pointer;padding:4px;margin:0 4px;color:#404040}')),document.head.appendChild(A)}}catch(M){console.error("vite-plugin-css-injected-by-js",M)}})();
