const isMobile = /mobile/i.test(window.navigator.userAgent);
const utils = {
    /**
     * Parse second to time string 将秒数转换为时间文本
     *
     * @param {Number} second
     * @param {Boolean} showHour
     * @return {String} 00:00 or 00:00:00
     */
    secondToTime: (second, showHour = true) => {
        second = second || 0;
        if (second === 0 || second === Infinity || second.toString() === 'NaN') {
            return '00:00';
        }
        const add0 = (num) => (num < 10 ? '0' + num : '' + num);
        const hour = Math.floor(second / 3600);
        const min = Math.floor((second - hour * 3600) / 60);
        const sec = Math.floor(second - hour * 3600 - min * 60);
        if (showHour) {
            return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
        } else {
            return [hour * 60 + min, sec].map(add0).join(':');
        }
    },
    //防抖
    debounce: (fn = () => {}, delay = 200) => {
        let timer;
        return function (...args) {
            const event = args[args.length - 1];
            if (timer) {
                clearTimeout(timer);
            }
            if (event && typeof event.persist === 'function') {
                event.persist();
            }
            let _this = this;
            timer = setTimeout(() => {
                fn.apply(_this, args);
                clearTimeout(timer);
                timer = null;
            }, delay);
        };
    },
    //节流
    throttle: (fn, wait) => {
        let timer = null;
        return function () {
            let context = this;
            let args = arguments;
            if (!timer) {
                timer = setTimeout(function () {
                    fn.apply(context, args);
                    clearTimeout(timer);
                    timer = null;
                }, wait);
            }
        };
    },
    /**
     * 将时间文本转换为秒数
     *
     * @param {String} str 冒号分隔的时间文本，支持全角冒号
     * @return {Number} second
     */
    textToSecond: (str) => {
        let arr = str.split(/[:：]/).slice(-3);
        let sec = parseInt(arr[arr.length - 1]);
        let min = parseInt(arr[arr.length - 2]);
        let hour = parseInt(arr[arr.length - 3]);
        sec = sec ? sec : 0;
        min = min ? min : 0;
        hour = hour ? hour : 0;
        return sec + min * 60 + hour * 3600;
    },
    /**
     * control play progress
     */
    // get element's view position
    getElementViewLeft: (element) => {
        let actualLeft = element.offsetLeft;
        let current = element.offsetParent;
        const elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
        } else {
            while (current !== null && current !== element) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
        }
        return actualLeft - elementScrollLeft;
    },
    getElementViewTop: (element) => {
        let actualTop = element.offsetTop;
        let current = element.offsetParent;
        const elementScrollTop = document.body.scrollTop + document.documentElement.scrollTop;
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            while (current !== null) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            return actualTop - elementScrollTop;
        } else {
            while (current !== null && current !== element) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            return actualTop;
        }
    },
    /**
    * optimize control play progress

    * optimize get element's view position,for float dialog video player
    * getBoundingClientRect 在 IE8 及以下返回的值缺失 width、height 值
    * getBoundingClientRect 在 Firefox 11 及以下返回的值会把 transform 的值也包含进去
    * getBoundingClientRect 在 Opera 10.5 及以下返回的值缺失 width、height 值
    */
    getBoundingClientRectViewLeft(element) {
        const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + ((document.documentElement && document.documentElement.scrollTop) || 0);

        if (element.getBoundingClientRect) {
            if (typeof this.getBoundingClientRectViewLeft.offset !== 'number') {
                let temp = document.createElement('div');
                temp.style.cssText = 'position:absolute;top:0;left:0;';
                document.body.appendChild(temp);
                this.getBoundingClientRectViewLeft.offset = -temp.getBoundingClientRect().top - scrollTop;
                document.body.removeChild(temp);
                temp = null;
            }
            const rect = element.getBoundingClientRect();
            const offset = this.getBoundingClientRectViewLeft.offset;

            return rect.left + offset;
        } else {
            // not support getBoundingClientRect
            return this.getElementViewLeft(element);
        }
    },

    getScrollPosition() {
        return {
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        };
    },

    setScrollPosition({ left = 0, top = 0 }) {
        if (this.isFirefox) {
            document.documentElement.scrollLeft = left;
            document.documentElement.scrollTop = top;
        } else {
            window.scrollTo(left, top);
        }
    },
    isFirefox: /firefox/i.test(window.navigator.userAgent),
    isChrome: /chrome/i.test(window.navigator.userAgent),
    createArray: (count, val) => Array.from({ length: count }, (_, k) => k).map(() => val),
    storage: {
        set: (key, value) => {
            localStorage.setItem(key, value);
        },

        get: (key) => localStorage.getItem(key),
    },

    nameMap: {
        dragStart: isMobile ? 'touchstart' : 'mousedown',
        dragMove: isMobile ? 'touchmove' : 'mousemove',
        dragEnd: isMobile ? 'touchend' : 'mouseup',
    },
    colorLuminance(hex, lum) {
        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = '#',
            c,
            i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
            rgb += ('00' + c).substr(c.length);
        }

        return rgb;
    },

    hex2Rgb(str, opacity) {
        //16进制转rgb
        var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        if (!reg.test(str)) {
            return;
        }
        let newStr = str.toLowerCase().replace(/\#/g, '');
        let len = newStr.length;
        if (len == 3) {
            let t = '';
            for (var i = 0; i < len; i++) {
                t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1));
            }
            newStr = t;
        }
        let arr = []; //将字符串分隔，两个两个的分隔
        for (var i = 0; i < 6; i = i + 2) {
            let s = newStr.slice(i, i + 2);
            arr.push(parseInt('0x' + s));
        }
        if (opacity) return 'rgba(' + arr.join(',') + ',' + opacity + ')';
        return 'rgb(' + arr.join(',') + ')';
    },
    rgb2Hex(str) {
        //rgb转16进制
        let reg = /^(rgb|RGB)/;
        if (!reg.test(str)) {
            return;
        }
        var arr = str.slice(4, str.length - 1).split(',');
        let color = '#';
        for (var i = 0; i < arr.length; i++) {
            var t = Number(arr[i]).toString(16);
            if (t == '0') {
                //如果为“0”的话，需要补0操作,否则只有5位数
                t = t + '0';
            }
            color += t;
        }
        return color;
    },
    color2Number: (color) => {
        if (color[0] === '#') {
            color = color.substr(1);
        }
        if (color.length === 3) {
            color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`;
        }
        return (parseInt(color, 16) + 0x000000) & 0xffffff;
    },

    number2Color: (number) => '#' + ('00000' + number.toString(16)).slice(-6),
    danmakuSpeed2Number: (speed) => {
        switch (speed) {
            case '极慢':
                return 0.5;
            case '较慢':
                return 0.75;
            case '适中':
                return 1;
            case '较快':
                return 1.25;
            case '极快':
                return 1.5;
            default:
                return 1;
        }
    },
    number2danmakuSpeed: (number) => {
        switch (number) {
            case 0.5:
                return '极慢';
            case 0.75:
                return '较慢';
            case 1:
                return '适中';
            case 1.25:
                return '较快';
            case 1.5:
                return '极快';
            default:
                return '适中';
        }
    },
    number2Type: (number, biliMode) => {
        switch (number) {
            case 0:
                return 'right';
            case 1:
                return biliMode ? 'right' : 'top';
            case 2:
                return 'bottom';
            case 3:
                return 'left';
            case 4:
                return 'bottom';
            case 5:
                return 'top';
            case 6:
                return 'left';
            case 7:
                return 'special';
            case 8:
                return 'script';
            case 9:
                return 'json';
            default:
                return 'right';
        }
    },
    type2Number: (type) => {
        switch (type) {
            case 'right':
                return 0;
            case 'top':
                return 1;
            case 'bottom':
                return 2;
            case 'left':
                return 3;
            case 'special':
                return 7;
            case 'script':
                return 8;
            case 'json':
                return 9;
            default:
                return 0;
        }
    },
    report2Num: new Map([
        ['违法违禁', 0],
        ['人身攻击', 1],
        ['色情低俗', 2],
        ['政治敏感', 3],
        ['恶意刷屏', 4],
        ['引战', 5],
        ['侵犯隐私', 6],
        ['垃圾广告', 7],
        ['其他', 8],
    ]),
    initHash() {
        let count = 100;

        return function (hashLength) {
            if (!hashLength || typeof Number(hashLength) != 'number') {
                return;
            }
            let ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            let hs = [];
            let hl = Number(hashLength);
            let al = ar.length;
            for (let i = 0; i < hl; i++) {
                hs.push(ar[Math.floor(Math.random() * al)]);
            }
            count++;
            return hs.join('') + `${count}`;
        };
    },
    randomFontsize: (range) => {
        const allSize = [16, 18, 25, 36, 45, 64];
        const random = Math.floor(Math.random() * range);
        return allSize[random];
    },

    // date: 时间对象, pattern: 日期格式
    formatterDate(date, pattern) {
        Date.prototype.format = function (fmt) {
            // debugger;
            let o = {
                'M+': this.getMonth() + 1, // 月份
                'D+': this.getDate(), // 日
                'H+': this.getHours(), // 小时
                'm+': this.getMinutes(), // 分
                's+': this.getSeconds(), // 秒
                'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
                S: this.getMilliseconds(), // 毫秒
            };
            if (/(Y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (let k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
                }
            }
            return fmt;
        };
        let ts = date.getTime();
        let d = new Date(ts).format('YYYY-MM-DD HH:mm:ss'); // 默认日期时间格式 YYYY-MM-DD HH:mm:ss
        if (pattern) {
            d = new Date(ts).format(pattern);
        }
        return d.toLocaleString();
    },
    getVideoResolution(el) {
        let resolution;
        const vHeight = el.videoHeight;
        if (vHeight < 480) {
            resolution = '360P';
        } else if (vHeight >= 480 && vHeight < 720) {
            resolution = '480P';
        } else if (vHeight >= 720 && vHeight < 1080) {
            resolution = '720P';
        } else if (vHeight >= 1080 && vHeight < 1440) {
            resolution = '1080P';
        } else if (vHeight >= 1440 && vHeight <= 2048) {
            resolution = '2K';
        } else if (vHeight > 2048) {
            resolution = '4K';
        } else {
            resolution = '清晰度';
        }

        return resolution;
    },
    resolutionMap: new Map([
        ['360P', '流畅'],
        ['480P', '清晰'],
        ['720P', '标清'],
        ['1080P', '高清'],
        ['2K', ''],
        ['4K', ''],
    ]),
};

export default utils;
