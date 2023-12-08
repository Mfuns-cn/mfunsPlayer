import { TemplateResult, html as litHtml, render as litRender } from "lit-html";

const isMobile = /mobile/i.test(window.navigator.userAgent);

/** 创建特定长度的填充数组 */
export const createArray = <T>(count: number, val: T) => Array.from({ length: count }, () => val);

/** 获取全屏元素 */
export const getFullscreenElement = (): HTMLElement | null =>
  document.fullscreenElement ||
  (document as any).mozFullScreenElement ||
  (document as any).webkitFullscreenElement ||
  (document as any).msFullscreenElement ||
  null;

/** 是否支持全屏 */
export const fullScreenEnabled: boolean =
  document.fullscreenEnabled ||
  (document as any).webkitFullscreenEnabled ||
  (document as any).mozFullScreenEnabled ||
  (document as any).msFullscreenEnabled ||
  false;

/** 是否支持画中画 */
export const pictureInPictureEnabled = document.pictureInPictureEnabled;

/**
 * 将时间文本转换为秒数
 *
 * @param {String} str 冒号分隔的时间文本，支持全角冒号
 * @return {Number} second
 */
export const timeToSecond = (str: string): number => {
  const arr = str.split(/[:：]/).slice(-3);
  const sec = parseInt(arr[arr.length - 1]) || 0;
  const min = parseInt(arr[arr.length - 2]) || 0;
  const hour = parseInt(arr[arr.length - 3]) || 0;
  return sec + min * 60 + hour * 3600;
};

/**
 * 防抖
 * @param {Function} fn 需要防抖处理的函数
 * @param {number} delay 防抖延迟执行时间
 * @param {boolean} immediate 是否立即执行一次
 */
export const debounce = (fn: (...args: unknown[]) => void, delay: number, immediate = false) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let isInvoke = false;
  const f = function (this: unknown, ...args: unknown[]) {
    if (timer) clearTimeout(timer);
    if (immediate && !isInvoke) {
      fn.apply(this, args);
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        clearTimeout(timer!);
        timer = null;
        isInvoke = false;
      }, delay);
    }
  };
  /*   f.clear = () => {
    if (timer) clearTimeout(timer);
  }; */
  return f;
};

/** 创建元素 */
export function createElement<T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  attributes?: Record<string, string>
) {
  const el = document.createElement(tagName);
  if (attributes) {
    for (const name in attributes) {
      el.setAttribute(name, attributes[name]);
    }
  }
  return el;
}

/**
 * 节流
 * @param {Function} fn 需要节流处理的函数
 * @param {number} wait 执行一次后需要等待的时间
 */
export const throttle = (fn: (...args: unknown[]) => void, wait: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: unknown[]) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        clearTimeout(timer!);
        timer = null;
      }, wait);
    }
  };
};

// === 未完全重构 ==========

/**
 * 将秒数转换为时间文本
 *
 * @param {Number} second
 * @param {Boolean} showHour
 * @return {String} 00:00 or 00:00:00
 */
export const secondToTime = (second: number, showHour = true) => {
  second = second || 0;
  if (second === 0 || second === Infinity || second.toString() === "NaN") {
    return "00:00";
  }
  const add0 = (num: number) => (num < 10 ? `0${num}` : `${num}`);
  const hour = Math.floor(second / 3600);
  const min = Math.floor((second - hour * 3600) / 60);
  const sec = Math.floor(second - hour * 3600 - min * 60);
  if (showHour) {
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(":");
  }
  return [hour * 60 + min, sec].map(add0).join(":");
};

export const storage = {
  set: (key: string, value: any) => {
    localStorage.setItem(key, value);
  },

  get: (key: string) => localStorage.getItem(key),
};

export const nameMap = {
  dragStart: isMobile ? "touchstart" : "mousedown",
  dragMove: isMobile ? "touchmove" : "mousemove",
  dragEnd: isMobile ? "touchend" : "mouseup",
};
export const colorLuminance = (hex: string, lum: number) => {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  let rgb = "#";
  let c;
  let i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += `00${c}`.substr(c.length);
  }

  return rgb;
};

export const hex2Rgb = (str: string, opacity: number) => {
  // 16进制转rgb
  const reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if (!reg.test(str)) {
    return;
  }
  let newStr = str.toLowerCase().replace(/#/g, "");
  const len = newStr.length;
  if (len == 3) {
    let t = "";
    for (let i = 0; i < len; i++) {
      t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1));
    }
    newStr = t;
  }
  const arr = []; // 将字符串分隔，两个两个的分隔
  for (let i = 0; i < 6; i += 2) {
    const s = newStr.slice(i, i + 2);
    arr.push(parseInt(`0x${s}`));
  }
  if (opacity) return `rgba(${arr.join(",")},${opacity})`;
  return `rgb(${arr.join(",")})`;
};
export const rgb2Hex = (str: string) => {
  // rgb转16进制
  const reg = /^(rgb|RGB)/;
  if (!reg.test(str)) {
    return;
  }
  const arr = str.slice(4, str.length - 1).split(",");
  let color = "#";
  for (let i = 0; i < arr.length; i++) {
    let t = Number(arr[i]).toString(16);
    if (t == "0") {
      // 如果为“0”的话，需要补0操作,否则只有5位数
      t += "0";
    }
    color += t;
  }
  return color;
};
export const color2Number = (color: string) => {
  if (color[0] === "#") {
    color = color.substr(1);
  }
  if (color.length === 3) {
    color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`;
  }
  return (parseInt(color, 16) + 0x000000) & 0xffffff;
};

export const number2Color = (number: number) => `#${`00000${number.toString(16)}`.slice(-6)}`;
export const initHash = () => {
  let count = 100;

  return function (hashLength: number) {
    if (!hashLength || typeof Number(hashLength) !== "number") {
      return;
    }
    const ar = [
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
      "z",
    ];
    const hs = [];
    const hl = Number(hashLength);
    const al = ar.length;
    for (let i = 0; i < hl; i++) {
      hs.push(ar[Math.floor(Math.random() * al)]);
    }
    count++;
    return `${hs.join("")}${count}`;
  };
};
export const randomFontsize = (range: number) => {
  const allSize = [16, 18, 25, 36, 45, 64];
  const random = Math.floor(Math.random() * range);
  return allSize[random];
};

const dateFormatMap = {
  yyyy: (d: Date) => d.getFullYear().toString(),
  yy: (d: Date) => d.getFullYear().toString().slice(-2),
  MM: (d: Date) => (d.getMonth() + 1).toString().padStart(2, "0"),
  dd: (d: Date) => d.getDate().toString().padStart(2, "0"),
  HH: (d: Date) => d.getHours().toString().padStart(2, "0"),
  mm: (d: Date) => d.getMinutes().toString().padStart(2, "0"),
  ss: (d: Date) => d.getSeconds().toString().padStart(2, "0"),
};

// date: 时间对象, pattern: 日期格式
export const dateFormat = (date: Date, format: string) => {
  return format.replace(/yyyy|yy|MM|dd|HH|mm|ss/g, (match) =>
    dateFormatMap[match as keyof typeof dateFormatMap]?.(date)
  );
};
