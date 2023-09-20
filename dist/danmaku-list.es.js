const Y = (n, t = !0) => {
  if (n = n || 0, n === 0 || n === 1 / 0 || n.toString() === "NaN")
    return "00:00";
  const e = (l) => l < 10 ? `0${l}` : `${l}`, i = Math.floor(n / 3600), s = Math.floor((n - i * 3600) / 60), r = Math.floor(n - i * 3600 - s * 60);
  return t ? (i > 0 ? [i, s, r] : [s, r]).map(e).join(":") : [i * 60 + s, r].map(e).join(":");
}, b = {
  yyyy: (n) => n.getFullYear().toString(),
  yy: (n) => n.getFullYear().toString().slice(-2),
  MM: (n) => (n.getMonth() + 1).toString().padStart(2, "0"),
  dd: (n) => n.getDate().toString().padStart(2, "0"),
  HH: (n) => n.getHours().toString().padStart(2, "0"),
  mm: (n) => n.getMinutes().toString().padStart(2, "0"),
  ss: (n) => n.getSeconds().toString().padStart(2, "0")
}, G = (n, t) => t.replace(
  /yy|yyyy|MM|dd|HH|mm|ss/g,
  (e) => {
    var i;
    return (i = b[e]) == null ? void 0 : i.call(b, n);
  }
), v = "mfuns-player";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var B;
const k = window, _ = k.trustedTypes, L = _ ? _.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, D = "$lit$", p = `lit$${(Math.random() + "").slice(9)}$`, q = "?" + p, J = `<${q}>`, f = document, H = () => f.createComment(""), w = (n) => n === null || typeof n != "object" && typeof n != "function", O = Array.isArray, K = (n) => O(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", I = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, V = /-->/g, F = />/g, g = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), U = /'/g, P = /"/g, W = /^(?:script|style|textarea|title)$/i, Q = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), C = Q(1), x = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), R = /* @__PURE__ */ new WeakMap(), A = f.createTreeWalker(f, 129, null, !1);
function z(n, t) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return L !== void 0 ? L.createHTML(t) : t;
}
const tt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : "", l = S;
  for (let a = 0; a < e; a++) {
    const o = n[a];
    let h, d, c = -1, $ = 0;
    for (; $ < o.length && (l.lastIndex = $, d = l.exec(o), d !== null); )
      $ = l.lastIndex, l === S ? d[1] === "!--" ? l = V : d[1] !== void 0 ? l = F : d[2] !== void 0 ? (W.test(d[2]) && (s = RegExp("</" + d[2], "g")), l = g) : d[3] !== void 0 && (l = g) : l === g ? d[0] === ">" ? (l = s ?? S, c = -1) : d[1] === void 0 ? c = -2 : (c = l.lastIndex - d[2].length, h = d[1], l = d[3] === void 0 ? g : d[3] === '"' ? P : U) : l === P || l === U ? l = g : l === V || l === F ? l = S : (l = g, s = void 0);
    const m = l === g && n[a + 1].startsWith("/>") ? " " : "";
    r += l === S ? o + J : c >= 0 ? (i.push(h), o.slice(0, c) + D + o.slice(c) + p + m) : o + p + (c === -2 ? (i.push(void 0), a) : m);
  }
  return [z(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class E {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, l = 0;
    const a = t.length - 1, o = this.parts, [h, d] = tt(t, e);
    if (this.el = E.createElement(h, i), A.currentNode = this.el.content, e === 2) {
      const c = this.el.content, $ = c.firstChild;
      $.remove(), c.append(...$.childNodes);
    }
    for (; (s = A.nextNode()) !== null && o.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const c = [];
          for (const $ of s.getAttributeNames())
            if ($.endsWith(D) || $.startsWith(p)) {
              const m = d[l++];
              if (c.push($), m !== void 0) {
                const X = s.getAttribute(m.toLowerCase() + D).split(p), T = /([.?@])?(.*)/.exec(m);
                o.push({ type: 1, index: r, name: T[2], strings: X, ctor: T[1] === "." ? it : T[1] === "?" ? nt : T[1] === "@" ? lt : N });
              } else
                o.push({ type: 6, index: r });
            }
          for (const $ of c)
            s.removeAttribute($);
        }
        if (W.test(s.tagName)) {
          const c = s.textContent.split(p), $ = c.length - 1;
          if ($ > 0) {
            s.textContent = _ ? _.emptyScript : "";
            for (let m = 0; m < $; m++)
              s.append(c[m], H()), A.nextNode(), o.push({ type: 2, index: ++r });
            s.append(c[$], H());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === q)
          o.push({ type: 2, index: r });
        else {
          let c = -1;
          for (; (c = s.data.indexOf(p, c + 1)) !== -1; )
            o.push({ type: 7, index: r }), c += p.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = f.createElement("template");
    return i.innerHTML = t, i;
  }
}
function y(n, t, e = n, i) {
  var s, r, l, a;
  if (t === x)
    return t;
  let o = i !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[i] : e._$Cl;
  const h = w(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== h && ((r = o == null ? void 0 : o._$AO) === null || r === void 0 || r.call(o, !1), h === void 0 ? o = void 0 : (o = new h(n), o._$AT(n, e, i)), i !== void 0 ? ((l = (a = e)._$Co) !== null && l !== void 0 ? l : a._$Co = [])[i] = o : e._$Cl = o), o !== void 0 && (t = y(n, o._$AS(n, t.values), o, i)), t;
}
class et {
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
    const { el: { content: i }, parts: s } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : f).importNode(i, !0);
    A.currentNode = r;
    let l = A.nextNode(), a = 0, o = 0, h = s[0];
    for (; h !== void 0; ) {
      if (a === h.index) {
        let d;
        h.type === 2 ? d = new M(l, l.nextSibling, this, t) : h.type === 1 ? d = new h.ctor(l, h.name, h.strings, this, t) : h.type === 6 && (d = new rt(l, this, t)), this._$AV.push(d), h = s[++o];
      }
      a !== (h == null ? void 0 : h.index) && (l = A.nextNode(), a++);
    }
    return A.currentNode = f, r;
  }
  v(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class M {
  constructor(t, e, i, s) {
    var r;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cp = (r = s == null ? void 0 : s.isConnected) === null || r === void 0 || r;
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
    t = y(this, t, e), w(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== x && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : K(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== u && w(this._$AH) ? this._$AA.nextSibling.data = t : this.$(f.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var e;
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = E.createElement(z(s.h, s.h[0]), this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.v(i);
    else {
      const l = new et(r, this), a = l.u(this.options);
      l.v(i), this.$(a), this._$AH = l;
    }
  }
  _$AC(t) {
    let e = R.get(t.strings);
    return e === void 0 && R.set(t.strings, e = new E(t)), e;
  }
  T(t) {
    O(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t)
      s === e.length ? e.push(i = new M(this.k(H()), this.k(H()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cp = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class N {
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let l = !1;
    if (r === void 0)
      t = y(this, t, e, 0), l = !w(t) || t !== this._$AH && t !== x, l && (this._$AH = t);
    else {
      const a = t;
      let o, h;
      for (t = r[0], o = 0; o < r.length - 1; o++)
        h = y(this, a[i + o], e, o), h === x && (h = this._$AH[o]), l || (l = !w(h) || h !== this._$AH[o]), h === u ? t = u : t !== u && (t += (h ?? "") + r[o + 1]), this._$AH[o] = h;
    }
    l && !s && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class it extends N {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const st = _ ? _.emptyScript : "";
class nt extends N {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== u ? this.element.setAttribute(this.name, st) : this.element.removeAttribute(this.name);
  }
}
class lt extends N {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = y(this, t, e, 0)) !== null && i !== void 0 ? i : u) === x)
      return;
    const s = this._$AH, r = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, l = t !== u && (s === u || r);
    r && this.element.removeEventListener(this.name, this, s), l && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class rt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    y(this, t);
  }
}
const j = k.litHtmlPolyfillSupport;
j == null || j(E, M), ((B = k.litHtmlVersions) !== null && B !== void 0 ? B : k.litHtmlVersions = []).push("2.8.0");
const Z = (n, t, e) => {
  var i, s;
  const r = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let l = r._$litPart$;
  if (l === void 0) {
    const a = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    r._$litPart$ = l = new M(t.insertBefore(H(), a), a, void 0, e ?? {});
  }
  return l._$AI(n), l;
};
class ot {
  constructor({
    el: t,
    getData: e,
    itemHeight: i,
    createItem: s,
    overflow: r = 0
  }) {
    this.data = [], this.renderStart = -1, this.renderEnd = -1, this.viewStart = 0, this.viewEnd = 0, this.throttle = !1, this.cleared = !1, this.el = t, this.getData = e, this.itemHeight = i, this.createItem = s, this.overflow = r, this.renderStart = -1, this.renderEnd = -1, this.viewStart = 0, this.viewEnd = 0, this.throttle = !1, this.cleared = !1, this.el.classList.add("vlist-container"), this.$content = document.createElement("div"), this.$content.classList.add("vlist-content"), this.el.appendChild(this.$content), this.el.addEventListener("scroll", () => {
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
      const t = this.el.clientHeight, e = this.el.scrollTop;
      this.viewStart = this.getViewStart(e), this.viewEnd = this.getViewEnd(e, t), (this.viewStart <= this.renderStart || this.viewEnd >= this.renderEnd) && this.render(t, e);
    }
  }
  render(t, e) {
    const i = this.renderStart, s = this.renderEnd;
    if (this.renderStart = this.getViewStart(e) - this.overflow, this.renderEnd = this.getViewEnd(e, t) + this.overflow, this.renderStart < i) {
      const r = document.createDocumentFragment(), l = Math.max(this.renderStart, 0), a = Math.min(i - 1, this.renderEnd, this.data.length - 1);
      for (let o = l; o <= a; o++)
        r.appendChild(this.createItem(this.data[o], o, this.data));
      this.$content.insertBefore(r, this.$content.firstElementChild);
    } else {
      const r = Math.max(i, 0), l = Math.min(this.renderStart - 1, s);
      for (let a = r; a <= l; a++) {
        const o = this.$content.firstElementChild;
        o && this.$content.removeChild(o);
      }
    }
    if (this.renderEnd > s) {
      const r = document.createDocumentFragment(), l = Math.max(s + 1, this.renderStart), a = Math.min(this.renderEnd, this.data.length - 1);
      for (let o = l; o <= a; o++)
        r.appendChild(this.createItem(this.data[o], o, this.data));
      this.$content.appendChild(r);
    } else {
      const r = Math.min(s, this.data.length - 1), l = Math.max(this.renderEnd + 1, i);
      for (let a = r; a >= l; a--) {
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
    this.el.scrollTo({
      top: t * this.itemHeight,
      behavior: "auto"
    });
  }
  locateEnd(t) {
    this.el.scrollTo({
      top: t * this.itemHeight - this.el.clientHeight,
      behavior: "auto"
    });
  }
}
const at = (n) => C`
  <div class="${v}-side-panel ${v}-danmaku-list">
    <div class="${v}-danmaku-list-main">
      <div class="${v}-danmaku-list-head">
        <div class="list-column col-time" @click=${n.time}>时间</div>
        <div class="list-column col-content" @click=${n.content}>弹幕内容</div>
        <div class="list-column col-date" @click=${n.date}>发送时间</div>
      </div>
      <div class="${v}-danmaku-list-container">
        <div class="${v}-danmaku-list-list"></div>
      </div>
      <div class="${v}-danmaku-list-status">
        <div class="status-loading-text">弹幕列表装填中……</div>
        <div class="status-failed-text">弹幕加载失败 X_X</div>
        <div class="status-empty-text">还没有弹幕哦，快来发弹幕^_^</div>
      </div>
    </div>
    <div class="${v}-danmaku-auxiliary-foot"></div>
  </div>
`, ht = (n, t, e) => {
  const i = C`
    <div class="list-row" data-index="${t}" data-mode="${n.mode}">
      <div class="list-cell col-time">${Y(n.time)}</div>
      <div class="list-cell col-content">${n.content}</div>
      <div class="list-cell col-date">
        ${n.date ? G(new Date(n.date * 1e3), "yy-MM-dd HH:mm") : "-"}
      </div>
      ${e.length ? C` <div class="list-operate">
            ${e(n).map(
    ([r, l]) => C`<div
                class="list-operate-btn"
                @click=${() => {
      l(n);
    }}
              >
                ${r}
              </div>`
  )}
          </div>` : ""}
    </div>
  `, s = new DocumentFragment();
  return Z(i, s), s.firstElementChild;
};
class dt {
  constructor(t) {
    this.data = [], this.sortedBy = "time", this.sortOrder = -1, this.autoScroll = !0, this.mounted = !1, this.player = t;
    const e = new DocumentFragment();
    Z(at({ time: () => {
    }, content: () => {
    }, date: () => {
    } }), e), this.el = e.querySelector(`.${v}-danmaku-list`), this.$container = e.querySelector(`.${v}-danmaku-list-container`), this.$status = e.querySelector(`.${v}-danmaku-list-status`), this.$colTime = e.querySelector(".col-time"), this.$colDate = e.querySelector(".col-date"), this.$colContent = e.querySelector(".col-content"), this.$colTime.onclick = () => {
      this.setAutoScroll(!1), this.sortedBy == "time" ? this.sort("time", -this.sortOrder) : this.sort("time", 1);
    }, this.$colDate.onclick = () => {
      this.setAutoScroll(!1), this.sortedBy == "date" ? this.sort("date", -this.sortOrder) : this.sort("date", 1);
    };
  }
  init() {
    const t = this.player.danmaku.api, e = this.player.danmaku.operate;
    this.list = new ot({
      el: this.$container,
      getData: () => this.data,
      itemHeight: 24,
      createItem: (i, s) => ht(i, s, (r) => {
        const l = r.user == this.player.userId;
        return [
          [
            "举报",
            (a) => {
              e.report(a);
            },
            !l && (t == null ? void 0 : t.report)
          ],
          [
            "屏蔽",
            (a) => {
              e.blockUser(a.user, !0);
            },
            !l && (t == null ? void 0 : t.blockUser)
          ],
          [
            "撤回",
            (a) => {
              e.recall(a);
            },
            l && (t == null ? void 0 : t.recall)
          ]
        ].filter((a) => a[2]);
      }),
      overflow: 5
    }), this.list.el.addEventListener("wheel", () => {
      this.setAutoScroll(!1);
    }), this.list.el.addEventListener("mousedown", () => {
      this.setAutoScroll(!1);
    }), this.setAutoScroll(this.autoScroll), this.player.on("part", () => {
      this.clear();
    }), this.player.on("danmaku:load_end", (i) => {
      this.fill(i);
    }), this.player.on("danmaku:load_addition_end", (i, s) => {
      this.fill(s);
    }), this.player.on("timeupdate", (i) => {
      this.autoScroll && this.locateByTime(i);
    });
  }
  /** 弹幕列表排序 */
  sort(t, e = 1) {
    this.sortedBy = t, this.sortOrder = e, this.data.sort((i, s) => {
      const r = i[this.sortedBy], l = s[this.sortedBy];
      return r > l ? e : r == l ? 0 : -e;
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
    var i, s;
    let e = this.list.viewEnd;
    for (((i = this.data[e]) == null ? void 0 : i.time) > t && (e = 0); ((s = this.data[e + 1]) == null ? void 0 : s.time) <= t; )
      e++;
    this.list.locateEnd(e);
  }
  setAutoScroll(t) {
    this.autoScroll = t, t && (this.sort("time"), this.locateByTime(this.player.time));
  }
}
const ct = () => {
  let n;
  return {
    id: "danmakuList",
    create: (t) => (n = new dt(t), {
      el: n.el
    }),
    init: (t) => {
      n.init();
    },
    destroy: (t) => {
    }
  };
};
export {
  ct as default
};
//# sourceMappingURL=danmaku-list.es.js.map
