/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./template/danmakuAuxiliary.art":
/*!***************************************!*\
  !*** ./template/danmakuAuxiliary.art ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $imports = __webpack_require__(/*! ..\node_modules\art-template\lib\runtime.js */ "./node_modules/art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '';
    $$out += '<div class="mfunsPlayer-danmaku-list-panel">\n    <div class="mfunsPlayer-danmaku-list-wrap">\n        <div class="mfunsPlayer-danmaku-list-head">\n            <span class="list-column col-time">时间</span><span class="list-column col-text">弹幕内容</span><span class="list-column col-date">发送时间</span>\n        </div>\n        <div class="mfunsPlayer-danmaku-list-container">\n            <div class="mfunsPlayer-danmaku-list"></div>\n        </div>\n        <div class="mfunsPlayer-danmaku-list-status">\n            <div class="status-loading-text">弹幕列表装填中\u2026\u2026</div>\n            <div class="status-failed-text">弹幕加载失败 X_X</div>\n            <div class="status-empty-text">还没有弹幕哦\uFF0C快来发弹幕^_^</div>\n        </div>\n    </div>\n    <div class="mfunsPlayer-danmaku-auxiliary-foot">\n        <div class="flex-left"></div>\n        <div class="flex-right">\n            <div class="mfunsPlayer-controller-button mfunsPlayer-ade-button" title="高级弹幕">\n                <i class="mfunsPlayer-controller-icon icon-advanced-danmaku"></i>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="mfunsPlayer-ade-panel" style="display: none">\n    <div class="mfunsPlayer-ade-wrap">\n        <div class="mfunsPlayer-ade-head">高级弹幕编辑器</div>\n        <div class="mfunsPlayer-ade-prebox"></div>\n        <div class="mfunsPlayer-ade-foot">\n            <span class="mfunsPlayer-ade-button mfunsPlayer-ade-clear">清空</span>\n            <span class="mfunsPlayer-ade-button mfunsPlayer-ade-preview">预览</span>\n            <span class="mfunsPlayer-ade-button mfunsPlayer-ade-emit">发送</span>\n        </div>\n    </div>\n    <div class="mfunsPlayer-danmaku-auxiliary-foot">\n        <div class="flex-left">高级弹幕手册</div>\n        <div class="flex-right">\n            <div class="mfunsPlayer-controller-button mfunsPlayer-ade-exit-button" title="返回">\n                <i class="mfunsPlayer-controller-icon icon-left-arrow"></i>\n            </div>\n        </div>\n    </div>\n</div>';
    return $$out;
};

/***/ }),

/***/ "./template/player.art":
/*!*****************************!*\
  !*** ./template/player.art ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $imports = __webpack_require__(/*! ..\node_modules\art-template\lib\runtime.js */ "./node_modules/art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '', $each = $imports.$each, contextmenu = $data.contextmenu, $value = $data.$value, $index = $data.$index, $escape = $imports.$escape, video = $data.video, currentVideo = $data.currentVideo, danmaku = $data.danmaku, $$blocks = arguments[1] || {}, include = function (content) {
            $$out += content;
            return $$out;
        }, isFireFox = $data.isFireFox, pickerColors = $data.pickerColors;
    $$out += '\r\n<div class="mfunsPlayer-video-wrap">\r\n    <div class="mfunsPlayer-mask">\r\n        <div class="mfunsPlayer-menu">\r\n            ';
    $each(contextmenu, function ($value, $index) {
        $$out += '\r\n                <div class="mfunsPlayer-menu-item">\r\n                    <a ';
        if ($value.link) {
            $$out += ' target="_blank"';
        }
        $$out += ' href="';
        $$out += $escape($value.link || 'javascript:void(0);');
        $$out += '">';
        $$out += $escape($value.text);
        $$out += '</a>\r\n                </div>\r\n            ';
    });
    $$out += '\r\n        </div>\r\n    </div>\r\n    <div class="mfunsPlayer-headBar">\r\n        <div class="mfunsPlayer-headBar-title">';
    $$out += $escape(video[currentVideo].title);
    $$out += '</div>\r\n    </div>\r\n    <div class="mfunsPlayer-loading">\r\n        <div></div>\r\n        <p>正在缓冲...</p>\r\n    </div>\r\n    <div class="mfunsPlayer-danmaku"';
    if (danmaku && danmaku.bottm) {
        $$out += ' style="margin:';
        $$out += $escape(danmaku.bottm);
        $$out += 'px 0"';
    }
    $$out += '>\r\n        <div class="mfunsPlayer-danmaku-item mfunsPlayer-danmaku-item--demo"></div>\r\n    </div>\r\n    <div class="mfunsPlayer-video-mask">\r\n        ';
    include(__webpack_require__(/*! ./video.art */ "./template/video.art")(video[currentVideo]));
    $$out += '\r\n    </div>\r\n    \r\n    <div class="mfunsPlayer-notice" ></div>\r\n    <div class="voice"></div>\r\n    \r\n    <div class="advanceDanmaku_pre_box"></div>\r\n    \r\n\r\n    \r\n<div class="mfunsPlayer-controller-mask">\r\n    <div  class="mfunsPlayer-bezel" ></div>\r\n\r\n    <div class="mfunsPlayer-controller">\r\n        <div class="mfunsPlayer-bar-wrap" >\r\n         <div class="mfunsPlayer-bar" >\r\n            <div class="mfunsPlayer-barTime hidden"></div>\r\n            <div class="mfunsPlayer-preview"></div>\r\n            <div class="mfunsPlayer-bufferedBar" ></div>\r\n            <div class="mfunsPlayer-playedBar" >\r\n                <div class="mfunsPlayer-thumb hidden" ></div>\r\n            </div>\r\n          </div>\r\n        </div>\t\r\n        <div class="mfunsPlayer-controller-wrap ">\r\n            <div class="mfunsPlayer-controller-left">\r\n                \r\n                <div class="mfunsPlayer-controller-button mfunsPlayer-controller-play button-paused">\r\n                    <div class="mfunsPlayer-controller-icon icon-play"></div>\r\n                    <div class="mfunsPlayer-controller-icon icon-pause"></div>\r\n                </div>\r\n                ';
    if (video.length > 1) {
        $$out += '\r\n                <div class="mfunsPlayer-controller-button mfunsPlayer-controller-next">\r\n                    <i class="mfunsPlayer-controller-icon icon-next"></i>\r\n                    <div class="mfunsPlayer-controller-tip">下一话</div>\r\n                </div>\r\n                ';
    }
    $$out += '\r\n                <div class="mfunsPlayer-controller-time">\r\n                    <div class="mfunsPlayer-controller-time-label">\r\n                        <span class="currentTime">00:00</span>\r\n                        <span>/</span>\r\n                        <span class="total">00:00</span>\r\n                    </div>\r\n                    <input class="mfunsPlayer-controller-time-input mfunsPlayer-input"/>\r\n                </div>\r\n                <div class="mfunsPlayer-controller-button mfunsPlayer-controller-repeat">\r\n                    <i class="mfunsPlayer-controller-icon icon-repeat"></i>\r\n                    <i class="mfunsPlayer-controller-icon icon-repeat-off"></i>\r\n                    <div class="mfunsPlayer-controller-tip">洗脑循环</div>\r\n                </div>\r\n            </div>\r\n            \r\n            \r\n           \r\n            <div class="mfunsPlayer-controller-right">\r\n               ';
    if (video.length > 1) {
        $$out += '\r\n                <div class="mfunsPlayer-controller-button mfunsPlayer-controller-pagelist">\r\n                    <div class="mfunsPlayer-controller-label mfunsPlayer-pagelist-info">选集</div>\r\n                    <div class="mfunsPlayer-controller-panel-mask mfunsPlayer-pagelist-mask">\r\n                        <div class="mfunsPlayer-controller-panel mfunsPlayer-pagelist-list">\r\n                            ';
        $each(video, function ($value, $index) {
            $$out += '\r\n                            <div class="mfunsPlayer-pagelist-item">';
            $$out += $escape($value.title);
            $$out += '</div>\r\n                            ';
        });
        $$out += '\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                ';
    }
    $$out += '\r\n                <div class="mfunsPlayer-controller-button mfunsPlayer-controller-speed">\r\n                    <div class="mfunsPlayer-controller-label mfunsPlayer-speed-info">倍速</div>\r\n                    <div class="mfunsPlayer-controller-panel-mask mfunsPlayer-speed-mask">\r\n                        <div class="mfunsPlayer-controller-panel mfunsPlayer-speed-list">\r\n                            <div class="mfunsPlayer-speed-item" data-speed="2.0">2.0x</div>\r\n                            <div class="mfunsPlayer-speed-item" data-speed="1.5">1.5x</div>\r\n                            <div class="mfunsPlayer-speed-item" data-speed="1.25">1.25x</div>\r\n                            <div class="mfunsPlayer-speed-item focus" data-speed="1.0">1.0x</div>\r\n                            <div class="mfunsPlayer-speed-item" data-speed="0.75">0.75x</div>\r\n                            <div class="mfunsPlayer-speed-item" data-speed="0.5">0.5x</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class="mfunsPlayer-controller-button mfunsPlayer-controller-volume">\r\n                    <div class="mfunsPlayer-controller-panel-mask mfunsPlayer-controller-volume-mask">\r\n                         <div class="mfunsPlayer-controller-panel mfunsPlayer-controller-volume-wrap">\r\n                            <div class="mfunsPlayer-controller-volume-num"></div>\r\n                            <div class="mfunsPlayer-controller-volume-bar mfunsPlayer-slider">\r\n                                ';
    include(__webpack_require__(/*! ./slider-vertical.art */ "./template/slider-vertical.art")($data));
    $$out += '\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class="mfunsPlayer-controller-volume-icon">\r\n                        <i class="mfunsPlayer-controller-icon icon-volume"></i>\r\n                        <i class="mfunsPlayer-controller-icon icon-volume-off"></i>\r\n                    </div>\r\n                </div>\r\n                <div class="mfunsPlayer-controller-button mfunsPlayer-controller-settings">\r\n                    <i class="mfunsPlayer-controller-icon icon-settings"></i>\r\n                    <div class="mfunsPlayer-controller-panel-mask mfunsPlayer-settings-mask">\r\n                        <div class="mfunsPlayer-controller-panel mfunsPlayer-controller-settings-wrap">\r\n                            <div class="mfunsPlayer-panel-row">\r\n                                <div class="row-title">视频比例</div>\r\n                                <ul class="mfunsPlayer-picker mfunsPlayer-video-scale-picker">\r\n                                    <li class="picker-item" data-value="auto">自动</li>\r\n                                    <li class="picker-item" data-value="4-3">4:3</li>\r\n                                    <li class="picker-item" data-value="16-9">16:9</li>\r\n                                </ul>\r\n                            </div>\r\n                            <div class="mfunsPlayer-panel-row">\r\n                                <div class="mfunsPlayer-switch mfunsPlayer-video-borderhidden-switch">\r\n                                    <div class="mfunsPlayer-switch-checkbox"></div>\r\n                                    <div class="mfunsPlayer-switch-label">隐藏黑边</div>\r\n                                </div>\r\n                                <div class="mfunsPlayer-switch mfunsPlayer-video-nextpage-switch">\r\n                                    <div class="mfunsPlayer-switch-checkbox"></div>\r\n                                    <div class="mfunsPlayer-switch-label">自动换P</div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                ';
    if (!isFireFox) {
        $$out += ' \r\n                <div class="mfunsPlayer-controller-button mfunsPlayer-controller-pip">\r\n                    <i class="mfunsPlayer-controller-icon icon-picture-in-picture"></i>\r\n                    <i class="mfunsPlayer-controller-icon icon-picture-in-picture-exit"></i>\r\n                    <div class="mfunsPlayer-controller-tip">画中画</div>\r\n                </div>\r\n                ';
    }
    $$out += '\r\n                <div class="mfunsPlayer-controller-button mfunsPlayer-controller-webfull">\r\n                    <i class="mfunsPlayer-controller-icon icon-web-fullscreen"></i>\r\n                    <i class="mfunsPlayer-controller-icon icon-web-fullscreen-exit"></i>\r\n                    <div class="mfunsPlayer-controller-tip">网页全屏</div>\r\n                </div>\r\n                <div class="mfunsPlayer-controller-button mfunsPlayer-controller-fullscreen">\r\n                    <i class="mfunsPlayer-controller-icon icon-fullscreen"></i>\r\n                    <i class="mfunsPlayer-controller-icon icon-fullscreen-exit"></i>\r\n                    <div class="mfunsPlayer-controller-tip">进入全屏</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n</div>\r\n\r\n ';
    if (danmaku.api) {
        $$out += '   \r\n<div class="mfunsPlayer-footBar">\r\n    <div class="mfunsPlayer-video-danmaku-details">\r\n        <div class="mfunsPlayer-video-danmaku-count">共0条弹幕</div>\r\n        <!-- <div> <a href="">高级弹幕></a></div> -->\r\n    </div>\r\n    <div class="mfunsPlayer-video-danmaku-root">\r\n        ';
        if (danmaku.showDanmaku) {
            $$out += ' \r\n        <div class="mfunsPlayer-controller-button mfunsPlayer-controller-danmaku-trigger open">\r\n            <i class="mfunsPlayer-controller-icon icon-danmaku"></i>\r\n            <i class="mfunsPlayer-controller-icon icon-danmaku-off"></i>\r\n        </div>\r\n         ';
        } else {
            $$out += '\r\n         <div class="mfunsPlayer-controller-button mfunsPlayer-controller-danmaku-trigger close">\r\n            <i class="mfunsPlayer-controller-icon icon-danmaku"></i>\r\n            <i class="mfunsPlayer-controller-icon icon-danmaku-off"></i>\r\n         </div>\r\n        ';
        }
        $$out += '\r\n        \r\n        \r\n    <div class="mfunsPlayer-controller-button mfunsPlayer-controller-danmaku-settings">\r\n        <i class="mfunsPlayer-controller-icon icon-danmaku-settings"></i>\r\n        <div class="mfunsPlayer-controller-panel-mask mfunsPlayer-danmaku-settings-mask">\r\n            <div class="mfunsPlayer-controller-panel mfunsPlayer-controller-danmaku-settings-wrap">\r\n                <div class="mfunsPlayer-panel-row">\r\n                    <div class="row-title">类型屏蔽</div>\r\n                    <ul class="mfunsPlayer-picker mfunsPlayer-danmaku-filter-picker">\r\n                        <li class="picker-item" data-value="right">滚动</li>\r\n                        <li class="picker-item" data-value="top">顶部</li>\r\n                        <li class="picker-item" data-value="bottom">底部</li>\r\n                        <li class="picker-item" data-value="color">彩色</li>\r\n                        <li class="picker-item" data-value="special">高级</li>\r\n                    </ul>\r\n                </div>\r\n                <div class="mfunsPlayer-panel-row">\r\n                    <div class="row-title">不透明度</div>\r\n                    <div class="mfunsPlayer-danmaku-opacity-slider mfunsPlayer-slider">\r\n                        ';
        include(__webpack_require__(/*! ./slider.art */ "./template/slider.art")($data));
        $$out += '\r\n                    </div>\r\n                    <div class="mfunsPlayer-danmaku-opacity-value row-value">-</div>\r\n                </div>\r\n                <div class="mfunsPlayer-panel-row">\r\n                    <div class="row-title">显示区域</div>\r\n                    <div class="mfunsPlayer-danmaku-showarea-slider mfunsPlayer-slider">\r\n                        ';
        include(__webpack_require__(/*! ./slider.art */ "./template/slider.art")($data));
        $$out += '\r\n                    </div>\r\n                    <div class="mfunsPlayer-danmaku-showarea-value row-value">-</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="input_box">\r\n        <div class="mfunsPlayer-controller-button mfunsPlayer-controller-danmaku-style">\r\n            <i class="mfunsPlayer-controller-icon icon-text"></i>\r\n            <div class="mfunsPlayer-controller-panel-mask mfunsPlayer-danmaku-style-mask">\r\n                <div class="mfunsPlayer-controller-panel mfunsPlayer-controller-danmaku-style-fulloptions-wrap">\r\n                    <div class="mfunsPlayer-panel-row">\r\n                        <div class="row-title">字号</div>\r\n                        <ul class="mfunsPlayer-picker mfunsPlayer-danmaku-fontsize-picker">\r\n                            ';
        if (danmaku.editor == 1) {
            $$out += ' <li class="picker-item" data-value="12">超小</li> ';
        }
        $$out += '\r\n                            <li class="picker-item" data-value="16">小</li>\r\n                            <li class="picker-item picked" data-value="18">标准</li>\r\n                            ';
        if (danmaku.editor == 1) {
            $$out += ' <li class="picker-item" data-value="26">大</li>\r\n                            <li class="picker-item" data-value="34">超大</li>\r\n                            <li class="picker-item" data-value="42">特大</li>\r\n                            ';
        }
        $$out += '\r\n                        </ul>\r\n                    </div>\r\n                    <div class="mfunsPlayer-panel-row">\r\n                        <div class="row-title">类型</div>\r\n                        <ul class="mfunsPlayer-picker mfunsPlayer-danmaku-type-picker">\r\n                            <li class="picker-item" data-value="top">顶部</li>\r\n                            <li class="picker-item" data-value="right">滚动</li>\r\n                            <li class="picker-item" data-value="bottom">底部</li>\r\n                            <li class="picker-item" data-value="left">逆向</li>\r\n                        </ul>\r\n                    </div>\r\n                    <div class="mfunsPlayer-panel-row">\r\n                        <div class="row-title">颜色</div>\r\n                        <input class="mfunsPlayer-danmaku-color-input mfunsPlayer-input" type="text" value="#"/>\r\n                        <div class="mfunsPlayer-danmaku-color-preview"></div>\r\n                    </div>\r\n                    <ul class="mfunsPlayer-danmaku-color-picker">\r\n                        ';
        $each(pickerColors, function ($value, $index) {
            $$out += '\r\n                        <li class="picker-item" data-value="';
            $$out += $escape($value);
            $$out += '" style="background-color:';
            $$out += $escape($value);
            $$out += '"></li>\r\n                        ';
        });
        $$out += '\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <input type="text" autocompleted="new-password" placeholder="喵御宅Mfuns,发射(\u3002\u309Cω\u309C)ノ!" class="mfunsPlayer-danmaku-text" />\r\n        <div class="emit">发送</div>\r\n    </div>\r\n    </div>\r\n</div>\r\n';
    }
    $$out += '\r\n\r\n</div>\r\n';
    return $$out;
};

/***/ }),

/***/ "./template/slider-vertical.art":
/*!**************************************!*\
  !*** ./template/slider-vertical.art ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $imports = __webpack_require__(/*! ..\node_modules\art-template\lib\runtime.js */ "./node_modules/art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '';
    $$out += '<div class="slider-track slider-track-vertical" style="position: absolute; height: 100%; left: 50%; transform: translateX(-50%); display: flex; justify-content: center; align-items: center">\n    <div class="slider-bar slider-bar-vertical" style="position: absolute; bottom: 0px; width: 100%"></div>\n    <div class="slider-thumb-track slider-thumb-track-vertical" style="width:0px;">\n        <div class="slider-thumb slider-thumb-vertical" style="position: absolute; transform: translate(-50%, -50%)"></div>\n    </div>\n</div>\n';
    return $$out;
};

/***/ }),

/***/ "./template/slider.art":
/*!*****************************!*\
  !*** ./template/slider.art ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $imports = __webpack_require__(/*! ..\node_modules\art-template\lib\runtime.js */ "./node_modules/art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '';
    $$out += '<div class="slider-track" style="position: absolute; width: 100%; top: 50%; transform: translateY(-50%); display: flex; justify-content: center; align-items: center">\n    <div class="slider-bar" style="position:absolute; left:0; height:100%"></div>\n    <div class="slider-thumb-track" style="height:0px;">\n        <div class="slider-thumb" style="position:absolute; transform:translate(-50%, -50%)"></div>\n    </div>\n</div>\n';
    return $$out;
};

/***/ }),

/***/ "./template/video.art":
/*!****************************!*\
  !*** ./template/video.art ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $imports = __webpack_require__(/*! ..\node_modules\art-template\lib\runtime.js */ "./node_modules/art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '', enableSubtitle = $data.enableSubtitle, subtitle = $data.subtitle, current = $data.current, airplay = $data.airplay, pic = $data.pic, $escape = $imports.$escape, screenshot = $data.screenshot, preload = $data.preload, url = $data.url;
    var enableSubtitle = subtitle && subtitle.type === 'webvtt';
    $$out += '\r\n<video\r\n    class="mfunsPlayer-video ';
    if (current) {
        $$out += 'mfunsPlayer-video-current';
    }
    $$out += '"\r\n    webkit-playsinline\r\n    ';
    if (airplay) {
        $$out += ' x-webkit-airplay="allow" ';
    }
    $$out += '\r\n    playsinline\r\n    ';
    if (pic) {
        $$out += 'poster="';
        $$out += $escape(pic);
        $$out += '"';
    }
    $$out += '\r\n    ';
    if (screenshot || enableSubtitle) {
        $$out += 'crossorigin="anonymous"';
    }
    $$out += '\r\n    ';
    if (preload) {
        $$out += 'preload="';
        $$out += $escape(preload);
        $$out += '"';
    }
    $$out += '\r\n    ';
    if (url) {
        $$out += 'src="';
        $$out += $escape(url);
        $$out += '"';
    }
    $$out += '\r\n    >\r\n</video>';
    return $$out;
};

/***/ }),

/***/ "./node_modules/art-template/lib/compile/runtime.js":
/*!**********************************************************!*\
  !*** ./node_modules/art-template/lib/compile/runtime.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/*! art-template@runtime | https://github.com/aui/art-template */

var globalThis = typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : {};
var runtime = Object.create(globalThis);
var ESCAPE_REG = /["&'<>]/;
/**
 * 编码模板输出的内容
 * @param  {any}        content
 * @return {string}
 */

runtime.$escape = function (content) {
  return xmlEscape(toString(content));
};
/**
 * 迭代器，支持数组与对象
 * @param {array|Object} data
 * @param {function}     callback
 */


runtime.$each = function (data, callback) {
  if (Array.isArray(data)) {
    for (var i = 0, len = data.length; i < len; i++) {
      callback(data[i], i);
    }
  } else {
    for (var _i in data) {
      callback(data[_i], _i);
    }
  }
}; // 将目标转成字符


function toString(value) {
  if (typeof value !== 'string') {
    if (value === undefined || value === null) {
      value = '';
    } else if (typeof value === 'function') {
      value = toString(value.call(value));
    } else {
      value = JSON.stringify(value);
    }
  }

  return value;
} // 编码 HTML 内容


function xmlEscape(content) {
  var html = '' + content;
  var regexResult = ESCAPE_REG.exec(html);

  if (!regexResult) {
    return content;
  }

  var result = '';
  var i = void 0,
      lastIndex = void 0,
      char = void 0;

  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34:
        char = '&#34;';
        break;

      case 38:
        char = '&#38;';
        break;

      case 39:
        char = '&#39;';
        break;

      case 60:
        char = '&#60;';
        break;

      case 62:
        char = '&#62;';
        break;

      default:
        continue;
    }

    if (lastIndex !== i) {
      result += html.substring(lastIndex, i);
    }

    lastIndex = i + 1;
    result += char;
  }

  if (lastIndex !== i) {
    return result + html.substring(lastIndex, i);
  } else {
    return result;
  }
}

module.exports = runtime;

/***/ }),

/***/ "./node_modules/art-template/lib/runtime.js":
/*!**************************************************!*\
  !*** ./node_modules/art-template/lib/runtime.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./compile/runtime */ "./node_modules/art-template/lib/compile/runtime.js");

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");

var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");

var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");

var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");

var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");

var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;

    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response); // Clean up request

      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        } // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request


        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        } // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'


        setTimeout(onloadend);
      };
    } // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      var transitional = config.transitional || defaults.transitional;

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function (cancel) {
        if (!request) {
          return;
        }

        reject(!cancel || cancel && cancel.type ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);

      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");

var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");

var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios.prototype, context); // Copy context to instance

  utils.extend(instance, context); // Factory for creating new instances

  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults); // Expose Axios class to allow class inheritance

axios.Axios = Axios; // Expose Cancel & CancelToken

axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = __webpack_require__(/*! ./env/data */ "./node_modules/axios/lib/env/data.js").version; // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js"); // Expose isAxiosError

axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");
module.exports = axios; // Allow use of default import syntax in TypeScript

module.exports.default = axios;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this; // eslint-disable-next-line func-names

  this.promise.then(function (cancel) {
    if (!token._listeners) return;
    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }

    token._listeners = null;
  }); // eslint-disable-next-line func-names

  this.promise.then = function (onfulfilled) {
    var _resolve; // eslint-disable-next-line func-names


    var promise = new Promise(function (resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Subscribe to the cancel signal
 */


CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};
/**
 * Unsubscribe from the cancel signal
 */


CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }

  var index = this._listeners.indexOf(listener);

  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");

var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");

var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */

function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  } // filter out skipped interceptors


  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  var newConfig = config;

  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();

    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
module.exports = Axios;

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");

var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */


module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");

var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData.call(config, config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };

  return error;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }

    return source;
  } // eslint-disable-next-line consistent-return


  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  } // eslint-disable-next-line consistent-return


  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  } // eslint-disable-next-line consistent-return


  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  } // eslint-disable-next-line consistent-return


  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };
  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/

  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });
  return data;
};

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");

var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var enhanceError = __webpack_require__(/*! ./core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }

  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {
  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data) || headers && headers['Content-Type'] === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }

          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;

/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = {
  "version": "0.22.0"
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */

module.exports = function isAxiosError(payload) {
  return typeof payload === 'object' && payload.isAxiosError === true;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js"); // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var VERSION = __webpack_require__(/*! ../env/data */ "./node_modules/axios/lib/env/data.js").version;

var validators = {}; // eslint-disable-next-line func-names

['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});
var deprecatedWarnings = {};
/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */

validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  } // eslint-disable-next-line func-names


  return function (value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true; // eslint-disable-next-line no-console

      console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
    }

    return validator ? validator(value, opt, opts) : true;
  };
};
/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */


function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }

  var keys = Object.keys(options);
  var i = keys.length;

  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];

    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);

      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }

      continue;
    }

    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js"); // utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray(val) {
  return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */


function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */


function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */


function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/js/api.js":
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  send: options => {
    axios__WEBPACK_IMPORTED_MODULE_0___default().post(options.url, options.data).then(response => {
      const data = response.data;

      if (!data || data.code !== 0) {
        options.error && options.error(data && data.msg);
        return;
      }

      options.success && options.success(data);
    }).catch(e => {
      console.error(e);
      options.error && options.error();
    });
  },
  read: options => {
    axios__WEBPACK_IMPORTED_MODULE_0___default().get(options.url).then(response => {
      const data = response.data;
      console.log(data);

      if (!data || data.code !== 0) {
        options.error && options.error(data && data.msg);
        return;
      }

      options.success && options.success(data.data.map(item => ({
        time: item[0],
        type: item[1],
        color: item[2],
        author: item[3],
        text: item[4]
      })));
    }).catch(e => {
      console.error(e);
      options.error && options.error();
    });
  }
});

/***/ }),

/***/ "./src/js/bar.js":
/*!***********************!*\
  !*** ./src/js/bar.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Bar {
  constructor(template) {
    this.elements = {};
    this.elements.volume = template.volumePercentage;
    this.elements.played = template.playedBar;
    this.elements.loaded = template.bufferedBar; // this.elements.danmaku = template.danmakuOpacityBar;
  }
  /**
   * Update progress
   *
   * @param {String} type - Point out which bar it is
   * @param {Number} percentage
   * @param {String} direction - Point out the direction of this bar, Should be height or width
   */


  set(type, percentage, direction) {
    percentage = Math.max(percentage, 0);
    percentage = Math.min(percentage, 1);
    this.elements[type].style[direction] = percentage * 100 + "%";
  }

  get(type) {
    return parseFloat(this.elements[type].style.width) / 100;
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bar);

/***/ }),

/***/ "./src/js/components.js":
/*!******************************!*\
  !*** ./src/js/components.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Slider": () => (/* binding */ Slider),
/* harmony export */   "Slider_vertical": () => (/* binding */ Slider_vertical),
/* harmony export */   "Picker": () => (/* binding */ Picker),
/* harmony export */   "MultiPicker": () => (/* binding */ MultiPicker),
/* harmony export */   "Switch": () => (/* binding */ Switch)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");
 // 滑动条

class Slider {
  /**
   * 横向滑动条
   *
   * @param {Object} el 需要绑定的dom对象
   * @param {Number} min 最小值
   * @param {Number} max 最大值
   * @param {Number} step 步长(若不填或为0，则没有步长限制)
   * @param {Number} value 默认值(不填的情况下默认值为0)
   * @param {Object} callbacks 回调函数键值对，分created, start, change, update, end五种状态，分别触发对应函数
   */
  constructor(el, min, max, step, value = 0, callbacks = {}) {
    const THIS = this;
    this.el = el;
    this.min = Number(min); // 最小值

    this.max = Number(max); // 最大值

    this.step = Number(step); // 步长

    this.value = Number(value) == NaN ? value : Number(value); // 数值

    this.callbacks = callbacks; // 使用的回调函数

    this.track = this.el.querySelector(".slider-track"); // 滑动条轨道

    this.bar = this.track.querySelector(".slider-bar"); // 滑动条痕迹

    this.thumbTrack = this.track.querySelector(".slider-thumb-track"); // 滑块轨道

    this.thumb = this.track.querySelector(".slider-thumb"); // 滑块

    this.el.addEventListener(_utils_js__WEBPACK_IMPORTED_MODULE_0__.default.nameMap.dragStart, function (event) {
      const e = event || window.event; // 滑块长度

      let trackLength = THIS.track.offsetWidth; // 滑块可滑动距离

      let nMax = THIS.thumbTrack.offsetWidth;
      nMax = nMax ? nMax : trackLength; // 滑块轨道与总轨道距离差

      let thumbTrackX = (trackLength - nMax) / 2; // 鼠标X位置

      let clientX = e.clientX || e.changedTouches[0].clientX; // 滑动条位置

      let nLeft = Math.round(_utils_js__WEBPACK_IMPORTED_MODULE_0__.default.getBoundingClientRectViewLeft(this)); // 计算滑块位置

      let nLength = clientX - nLeft - thumbTrackX; // 限制滑块移动位置

      nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;
      let value = THIS.step ? Math.round(nLength / nMax * (THIS.max - THIS.min) / THIS.step) * THIS.step + THIS.min : nLength / nMax * (THIS.max - THIS.min) + THIS.min;

      if (THIS.callbacks.start) {
        THIS.callbacks.start(value);
      } // 监测数据更新并执行函数


      if (THIS.value != value) {
        THIS.update(value);
      }

      let mousemoveEvent = function (event) {
        const e = event || window.event; // 鼠标移动时取消默认行为，避免选中其他元素或文字

        e.preventDefault();
        e.stopPropagation(); // 鼠标X位置

        let clientX = e.clientX || e.changedTouches[0].clientX; // 获取鼠标移动后滑块应该移动到的位置

        let nLength = clientX - nLeft - thumbTrackX; // 限制滑块移动位置

        nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;
        let value = THIS.step ? Math.round(nLength / nMax * (THIS.max - THIS.min) / THIS.step) * THIS.step + THIS.min : nLength / nMax * (THIS.max - THIS.min) + THIS.min; // 监测数据更新并执行函数

        if (THIS.value != value) {
          THIS.update(value, true);
        }

        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      };

      let removeEvent = function (event) {
        const e = event || window.event;
        e.stopPropagation();
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        document.removeEventListener(_utils_js__WEBPACK_IMPORTED_MODULE_0__.default.nameMap.dragMove, mousemoveEvent);
        document.removeEventListener(_utils_js__WEBPACK_IMPORTED_MODULE_0__.default.nameMap.dragEnd, removeEvent);

        if (THIS.callbacks.end) {
          THIS.callbacks.end(value);
        }
      };

      document.addEventListener(_utils_js__WEBPACK_IMPORTED_MODULE_0__.default.nameMap.dragMove, mousemoveEvent);
      document.addEventListener(_utils_js__WEBPACK_IMPORTED_MODULE_0__.default.nameMap.dragEnd, removeEvent);
    }); // 创建组件后应执行的函数(参数为this)

    if (this.callbacks.created) {
      this.callbacks.created(this);
    } // 根据数值设置滑块初始位置


    setTimeout(() => {
      this.update(this.value, false);
    }, 0);
  }

  change(value, ...args) {
    // 修改滑动条值，不执行回调函数
    this.value = value <= this.min ? this.min : value >= this.max ? this.max : value; // 计算滑块位置

    let per = (this.value - this.min) / (this.max - this.min); // let per = (this.value - (this.min + 2)) / (this.max - this.min - 4);
    // 修改滑块位置

    this.thumb.style.left = per * 100 + "%"; // 修改滑动痕迹高度

    this.bar.style.width = Math.max(Math.min(per, 1), 0.01) * 100 + "%";

    if (this.callbacks.change) {
      this.callbacks.change(value, ...args);
    }
  }

  update(value, ...args) {
    // 更新数据并修改滑动条数值
    this.change(value, ...args); // 执行相应函数

    if (this.callbacks.update) {
      this.callbacks.update(value, ...args);
    }
  }

}
class Slider_vertical {
  /**
   * 纵向滑动条
   *
   * @param {Object} el 需要绑定的dom对象
   * @param {Number} min 最小值
   * @param {Number} max 最大值
   * @param {Number} step 步长(若不填或为0，则没有步长限制
   * @param {Number} value 默认值(不填的情况下默认值为0)
   * @param {Object} callbacks 回调函数键值对，分created, start, change, update, end五种状态，分别触发对应函数
   */
  constructor(el, min, max, step, value = 0, callbacks = {}) {
    const THIS = this;
    this.el = el;
    this.min = Number(min); // 最小值

    this.max = Number(max); // 最大值

    this.step = Number(step); // 步长

    this.value = Number(value) == NaN ? value : Number(value); // 数值

    this.callbacks = callbacks; // 使用的回调函数

    this.track = this.el.querySelector(".slider-track");
    this.bar = this.track.querySelector(".slider-bar");
    this.thumbTrack = this.track.querySelector(".slider-thumb-track"); // 滑块轨道

    this.thumb = this.track.querySelector(".slider-thumb");
    this.el.addEventListener(_utils_js__WEBPACK_IMPORTED_MODULE_0__.default.nameMap.dragStart, function (event) {
      const e = event || window.event; // 滑块长度

      let trackLength = THIS.track.offsetHeight; // 滑块可滑动距离

      let nMax = THIS.thumbTrack.offsetHeight;
      nMax = nMax ? nMax : trackLength; // 滑块轨道与总轨道距离差

      let thumbTrackY = (trackLength - nMax) / 2; // 鼠标Y位置

      let clientY = e.clientY || e.changedTouches[0].clientY; // 滑动条位置

      let nTop = _utils_js__WEBPACK_IMPORTED_MODULE_0__.default.getElementViewTop(this); // 计算滑块位置

      let nLength = nMax - (clientY - nTop - thumbTrackY); // 限制滑块移动位置

      nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;
      let value = THIS.step ? Math.round(nLength / nMax * (THIS.max - THIS.min) / THIS.step) * THIS.step + THIS.min : nLength / nMax * (THIS.max - THIS.min) + THIS.min;
      let per = (value - (THIS.min + 6)) / (THIS.max - THIS.min - 12);

      if (THIS.callbacks.start) {
        THIS.callbacks.start(value);
      } // 监测数据更新并执行函数


      if (THIS.value != value) {
        THIS.update(value, true);
      } // 修改滑块位置


      THIS.thumb.style.top = (1 - per) * 100 + "%"; // 修改滑动痕迹高度
      // THIS.bar.style.height = per * 100 + "%";

      THIS.bar.style.height = Math.max(Math.min(per, 1), 0) * 100 + "%";

      let mousemoveEvent = function (event) {
        const e = event || window.event; // 鼠标移动时取消默认行为，避免选中其他元素或文字

        e.preventDefault();
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); // 鼠标Y位置

        let clientY = e.clientY || e.changedTouches[0].clientY; // 获取鼠标移动后滑块应该移动到的位置

        let nLength = nMax - (clientY - nTop - thumbTrackY); // 限制滑块移动位置

        nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;
        let value = THIS.step ? Math.round(nLength / nMax * (THIS.max - THIS.min) / THIS.step) * THIS.step + THIS.min : nLength / nMax * (THIS.max - THIS.min) + THIS.min; // 监测数据更新并执行函数

        if (THIS.value != value) {
          THIS.update(value, true);
        }
      };

      let removeEvent = function (event) {
        const e = event || window.event;
        e.preventDefault();
        document.removeEventListener(_utils_js__WEBPACK_IMPORTED_MODULE_0__.default.nameMap.dragMove, mousemoveEvent);
        document.removeEventListener(_utils_js__WEBPACK_IMPORTED_MODULE_0__.default.nameMap.dragEnd, removeEvent);

        if (THIS.callbacks.end) {
          THIS.callbacks.end(value);
        }
      };

      document.addEventListener(_utils_js__WEBPACK_IMPORTED_MODULE_0__.default.nameMap.dragMove, mousemoveEvent);
      document.addEventListener(_utils_js__WEBPACK_IMPORTED_MODULE_0__.default.nameMap.dragEnd, removeEvent);
    }); // 创建组件后应执行的函数(参数为this)

    if (this.callbacks.created) {
      this.callbacks.created(this);
    } // 设置滑块初始位置


    setTimeout(() => {
      this.update(this.value, false);
    }, 0);
  }

  change(value, ...args) {
    // this.value = value <= this.min ? this.min : value >= this.max ? this.max : value;
    this.value = Math.max(Math.min(value, this.max), this.min); // 计算滑块位置

    let per = (this.value - (this.min + 6)) / (this.max - this.min - 12); // 修改滑块位置

    this.thumb.style.top = (1 - per) * 100 + "%"; // 修改滑动痕迹高度

    this.bar.style.height = Math.max(Math.min(per, 1), 0) * 100 + "%";

    if (this.callbacks.change) {
      this.callbacks.change(value, ...args);
    }
  }

  update(value, ...args) {
    this.change(value, ...args); // 执行相应函数

    if (this.callbacks.update) {
      this.callbacks.update(value, ...args);
    }
  }

}
class Picker {
  /**
   * 单选选择器
   *
   * @param {Object} group 需要绑定的选择器容器对象
   * @param {Number} value 默认值(不填的情况下默认值为null)
   * @param {Object} callbacks 回调函数键值对，分created, change, pick三种状态，分别触发对应函数
   */
  constructor(group, value = null, callbacks = {}) {
    const THIS = this;
    this.group = group; // 标签组

    this.items = group.querySelectorAll(".picker-item"); // 标签集合

    this.value = value;
    this.callbacks = callbacks; // 更新数据时需要执行的函数

    this.valueList = [];
    this.items.forEach(item => {
      this.valueList.push(item.getAttribute("data-value"));
      item.addEventListener("click", function () {
        THIS.pick(item.getAttribute("data-value"));
      });
    }); // 创建组件后应执行的函数(参数为this)

    if (this.callbacks.created) {
      this.callbacks.created(this);
    }

    setTimeout(() => {
      this.pick(this.value);
    }, 0);
  }

  change(value, ...args) {
    this.items.forEach((n, i) => {
      if (n.getAttribute("data-value") == value) {
        n.classList.add("picked");
      } else {
        n.classList.remove("picked");
      }
    });
    this.value = value;

    if (this.callbacks.change) {
      this.callbacks.change(value, ...args);
    }
  }

  pick(value, ...args) {
    this.change(value, ...args);

    if (this.callbacks.pick) {
      this.callbacks.pick(value, ...args);
    }
  }

}
class MultiPicker {
  /**
   * 多选选择器
   *
   * @param {Object} group 需要绑定的选择器容器对象
   * @param {Number} value 默认值(不填的情况下默认值为null)
   * @param {Object} callbacks 回调函数键值对，分created, pick, unpick, update四种状态，分别触发对应函数
   */
  constructor(group, value, callbacks = {}) {
    const THIS = this;
    this.group = group; // 标签组

    this.items = group.querySelectorAll(".picker-item"); // 标签集合

    this.value = new Set();
    this.callbacks = callbacks; // 更新数据时需要执行的函数

    this.valueList = [];
    this.domMap = new Map();
    this.items.forEach(item => {
      this.valueList.push(item.getAttribute("data-value"));
      this.domMap.set(item.getAttribute("data-value"), item);
      item.addEventListener("click", function () {
        let val = this.getAttribute("data-value");

        if (THIS.value.has(val)) {
          THIS.unpick(val);
        } else {
          THIS.pick(val);
        }
      });
    }); // 创建组件后应执行的函数(参数为this)

    if (this.callbacks.created) {
      this.callbacks.created(this);
    }

    setTimeout(() => {
      this.pick(this.value);
    }, 0);
  }

  pick(val, ...args) {
    if (typeof val == "string") {
      this.domMap.get(val).classList.add("picked");
      this.value.add(val);

      if (this.callbacks.pick) {
        this.callbacks.pick(val, ...args);
      }
    } else if (typeof val == "array") {
      this.items.forEach(n => {
        this.domMap.get(n).classList.add("picked");
        this.value.add(n);

        if (this.callbacks.pick) {
          this.callbacks.pick(n, ...args);
        }
      });
    }

    if (this.callbacks.update) {
      this.callbacks.update(this.value, ...args);
    }
  }

  unpick(val, ...args) {
    if (typeof val == "string") {
      this.domMap.get(val).classList.remove("picked");
      this.value.delete(val);

      if (this.callbacks.unpick) {
        this.callbacks.unpick(val, ...args);
      }
    } else if (typeof val == "array") {
      this.items.forEach(n => {
        this.domMap.get(n).classList.remove("picked");
        this.value.delete(n);

        if (this.callbacks.unpick) {
          this.callbacks.unpick(n, ...args);
        }
      });
    }

    if (this.callbacks.update) {
      this.callbacks.update(this.value, ...args);
    }
  }

}
class Switch {
  /**
   * 开关
   *
   * @param {Object} group 需要绑定的开关容器对象
   * @param {Boolean} value 默认值(不填的情况下默认值为false)
   * @param {Object} callbacks 回调函数键值对，分created, on, off, update四种状态，分别触发对应函数
   */
  constructor(el, value = false, callbacks = {}) {
    const THIS = this;
    this.el = el;
    this.value = value;
    this.callbacks = callbacks; // 更新数据时需要执行的函数

    this.el.addEventListener("click", () => {
      this.update(!this.value);
    }); // 创建组件后应执行的函数(参数为this)

    if (this.callbacks.created) {
      this.callbacks.created(this);
    }

    setTimeout(() => {
      this.update(this.value);
    }, 0);
  }

  on(...args) {
    this.value = true;
    this.el.classList.add("switch-on");

    if (this.callbacks.on) {
      this.callbacks.on(...args);
    }

    if (this.callbacks.update) {
      this.callbacks.update(...args);
    }
  }

  off(...args) {
    this.value = false;
    this.el.classList.remove("switch-on");

    if (this.callbacks.off) {
      this.callbacks.off(...args);
    }

    if (this.callbacks.update) {
      this.callbacks.update(...args);
    }
  }

  update(value, ...args) {
    if (value) {
      this.on(...args);
    } else {
      this.off(...args);
    }
  }

}

/***/ }),

/***/ "./src/js/contextmenu.js":
/*!*******************************!*\
  !*** ./src/js/contextmenu.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ContextMenu {
  constructor(player) {
    this.player = player;
    this.shown = false;
    this.player.template.menuItem.forEach((item, index) => {
      if (this.player.options.contextmenu[index].click) {
        item.addEventListener("click", () => {
          this.player.options.contextmenu[index].click(this.player);
          this.hide();
        });
      }
    });
    this.player.template.videoWrap.addEventListener("contextmenu", e => {
      if (this.shown) {
        this.hide();
        return;
      }

      this.player.isShowMenu = true;
      const event = e || window.event;
      event.preventDefault();
      const clientRect = this.player.template.videoWrap.getBoundingClientRect();
      this.show(event.clientX - clientRect.left, event.clientY - clientRect.top);
      this.player.template.mask.addEventListener("click", e => {
        this.hide();
      });
    });
  }

  show(x, y) {
    this.player.template.menu.classList.add("mfunsPlayer-menu-show");
    const clientRect = this.player.template.videoWrap.getBoundingClientRect();

    if (x + this.player.template.menu.offsetWidth >= clientRect.width) {
      this.player.template.menu.style.right = clientRect.width - x + "px";
      this.player.template.menu.style.left = "initial";
    } else {
      this.player.template.menu.style.left = x + "px";
      this.player.template.menu.style.right = "initial";
    }

    if (y + this.player.template.menu.offsetHeight >= clientRect.height) {
      this.player.template.menu.style.bottom = clientRect.height - y + "px";
      this.player.template.menu.style.top = "initial";
    } else {
      this.player.template.menu.style.top = y + "px";
      this.player.template.menu.style.bottom = "initial";
    }

    this.player.template.mask.classList.add("mfunsPlayer-mask-show");
    this.shown = true;
    this.player.events.trigger("contextmenu_show");
  }

  hide() {
    this.player.template.mask.classList.remove("mfunsPlayer-mask-show");
    this.player.template.menu.classList.remove("mfunsPlayer-menu-show");
    this.shown = false;
    this.player.events.trigger("contextmenu_hide");
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContextMenu);

/***/ }),

/***/ "./src/js/controller.js":
/*!******************************!*\
  !*** ./src/js/controller.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./src/js/components.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

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
    this.showDanmaku = player.showDanmaku;
    this.danmakuFontsize = 18;
    this.danmakuType = "right";
    this.danmakuColor = "#FFFFFF";
    this.videoScale = false;
    this.player.template.videoWrap.addEventListener("mousemove", () => {
      this.setAutoHide();
    });
    this.player.template.controller.addEventListener("click", event => {
      window.event ? window.event.cancelBubble = true : event.stopPropagation();
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

    if (player.options.video.length > 1) {
      this.initPagelistButton();
    }

    this.initRepeatButton();
    this.initVolumeButton();
    this.initFullButton();
    this.initTroggle();
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
    if (!this.isControl && !this.player.isShowMenu) {
      this.player.toggle();
    } else {
      this.player.isShowMenu = false;
    }
  }

  initPlayedBar() {
    const thumbMove = e => {
      console.log("--------");
      this.isControl = true;
      let percentage = ((e.clientX || e.changedTouches[0].clientX) - _utils__WEBPACK_IMPORTED_MODULE_1__.default.getBoundingClientRectViewLeft(this.player.template.barWrap)) / this.player.template.barWrap.clientWidth;
      percentage = Math.max(percentage, 0);
      percentage = Math.min(percentage, 1);
      this.player.bar.set("played", percentage, "width");
      this.player.template.barTime.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_1__.default.secondToTime(percentage * this.player.video.duration);
      this.player.template.currentTime.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_1__.default.secondToTime(percentage * this.player.video.duration);
    };

    const thumbUp = e => {
      this.player.unableTimeupdate = false;
      document.removeEventListener(_utils__WEBPACK_IMPORTED_MODULE_1__.default.nameMap.dragEnd, thumbUp);
      document.removeEventListener(_utils__WEBPACK_IMPORTED_MODULE_1__.default.nameMap.dragMove, thumbMove);
      let percentage = ((e.clientX || e.changedTouches[0].clientX) - _utils__WEBPACK_IMPORTED_MODULE_1__.default.getBoundingClientRectViewLeft(this.player.template.barWrap)) / this.player.template.barWrap.clientWidth;
      percentage = Math.max(percentage, 0);
      percentage = Math.min(percentage, 1);
      this.player.template.currentTime.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_1__.default.secondToTime(percentage * this.player.video.duration);
      this.player.bar.set("played", percentage, "width");
      this.player.seek(this.player.bar.get("played") * this.player.video.duration);
      setTimeout(() => {
        if (this.controlLeaved) this.isControl = false;
      }, 50);
    };

    this.player.template.barWrap.addEventListener(_utils__WEBPACK_IMPORTED_MODULE_1__.default.nameMap.dragStart, () => {
      // this.player.timer.disable("progress");
      document.addEventListener(_utils__WEBPACK_IMPORTED_MODULE_1__.default.nameMap.dragMove, thumbMove);
      document.addEventListener(_utils__WEBPACK_IMPORTED_MODULE_1__.default.nameMap.dragEnd, thumbUp);
      this.player.unableTimeupdate = true;
    });
    this.player.template.barWrap.addEventListener(_utils__WEBPACK_IMPORTED_MODULE_1__.default.nameMap.dragMove, e => {
      if (this.player.video.duration) {
        const px = this.player.template.barWrap.getBoundingClientRect().left;
        const tx = (e.clientX || e.changedTouches[0].clientX) - px;

        if (tx < 0 || tx > this.player.template.barWrap.offsetWidth) {
          return;
        }

        const time = this.player.video.duration * (tx / this.player.template.barWrap.offsetWidth); // if (utils.isMobile) {
        //   this.thumbnails && this.thumbnails.show();
        // }
        // this.thumbnails && this.thumbnails.move(tx);

        this.player.template.barTime.style.left = `${tx - (time >= 3600 ? 25 : 20)}px`;
        this.player.template.barTime.style.display = "block";
        this.player.template.barTime.innerText = _utils__WEBPACK_IMPORTED_MODULE_1__.default.secondToTime(time);
        this.player.template.barTime.classList.remove("hidden"); // 防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug

        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      }
    });
    this.player.template.barWrap.addEventListener(_utils__WEBPACK_IMPORTED_MODULE_1__.default.nameMap.dragEnd, () => {
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
      this.player.template.time_input.value = _utils__WEBPACK_IMPORTED_MODULE_1__.default.secondToTime(this.player.video.currentTime);
      this.player.template.time_input.focus();
    });
    this.player.template.time_input.addEventListener("blur", () => {
      this.player.template.controllerTime.classList.remove("inputting");
    });
    this.player.template.time_input.addEventListener("keydown", e => {
      var e = e || window.event;

      if (e.keyCode == 13) {
        this.player.template.video.currentTime = _utils__WEBPACK_IMPORTED_MODULE_1__.default.textToSecond(this.player.template.time_input.value); //tem.video.play()

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
      this.player.template.pagelistItem[i].addEventListener("click", event => {
        window.event ? window.event.cancelBubble = true : event.stopPropagation();
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
      this.player.template.speedItem[i].addEventListener("click", event => {
        window.event ? window.event.cancelBubble = true : event.stopPropagation();
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
    const repeatTrigger = () => {
      this.player.template.repeat_btn.classList[`${this.video.loop ? "add" : "remove"}`]("button-repeat");
      this.player.template.repeat_tip.innerText = this.video.loop ? "关闭洗脑循环" : "洗脑循环";
    };

    repeatTrigger();
    this.player.template.repeat_btn.addEventListener("click", () => {
      this.video.loop = !this.video.loop;
      repeatTrigger();
    });
  }

  initVolumeButton() {
    const THIS = this;
    let control;
    this.components.volumeSlider = new _components__WEBPACK_IMPORTED_MODULE_0__.Slider_vertical(this.template.volumeBar, 0, 100, 1, this.player.options.volume * 100, {
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
      },

      end() {
        // 结束滑动条调节（松手）
        // if (!THIS.template.volumeMask.classList.contains("show")) {
        setTimeout(() => {
          THIS.isControl = false;
        }, 50); // }

        THIS.player.template.volumeMask.classList.remove("show");
      }

    });
    this.player.template.volumeIcon.addEventListener("click", event => {
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
    this.components.videoScalePicker = new _components__WEBPACK_IMPORTED_MODULE_0__.Picker(this.template.video_scale_picker, "auto", {
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
      }

    });
    this.components.videoBorderhiddenSwitch = new _components__WEBPACK_IMPORTED_MODULE_0__.Switch(this.template.video_borderhidden_switch, true, {
      on() {
        // 打开开关
        console.log("已隐藏黑边");
      },

      off() {
        // 关闭开关
        console.log("已显示黑边");
      }

    });
    this.components.videoNextpageSwitch = new _components__WEBPACK_IMPORTED_MODULE_0__.Switch(this.template.video_nextpage_switch, true, {
      on() {
        // 打开开关
        console.log("已开启自动换P");
      },

      off() {
        // 关闭开关
        console.log("已关闭自动换P");
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
    const THIS = this;
    this.components.danmakuFilterPicker = new _components__WEBPACK_IMPORTED_MODULE_0__.MultiPicker(this.template.danmaku_filter_picker, null, {
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
      }

    });
    this.components.danmakuOpacitySlider = new _components__WEBPACK_IMPORTED_MODULE_0__.Slider(this.template.danmaku_opacity_slider, 10, 100, 1, THIS.player.danmaku._opacity * 100, {
      start() {
        // 开始调节滑动条（点按）
        console.log("--------");
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
        console.log("mouseup");
        setTimeout(() => {
          THIS.isControl = false;
        }, 50); // }

        THIS.player.template.danmakuSettings_panel.classList.remove("show");
      }

    });
    this.components.danmakuShowareaSlider = new _components__WEBPACK_IMPORTED_MODULE_0__.Slider(this.template.danmaku_showarea_slider, 20, 100, 20, 80, {
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
      }

    });
  }

  initDanmakuStyleButton() {
    const THIS = this;
    this.components.danmakuFontsizePicker = new _components__WEBPACK_IMPORTED_MODULE_0__.Picker(this.template.danmaku_fontsize_picker, this.danmakuFontsize, {
      pick(value) {
        // 有关字体大小值的更改请写在此处
        THIS.danmakuFontsize = value;
        console.log(`已选择字体大小：${THIS.danmakuFontsize}`);
      }

    });
    this.components.danmakuTypePicker = new _components__WEBPACK_IMPORTED_MODULE_0__.Picker(this.template.danmaku_type_picker, this.danmakuType, {
      pick(value) {
        // 有关弹幕模式值的更改请写在此处
        THIS.danmakuType = value;
        console.log(`已选择弹幕模式：${THIS.danmakuType}`);
      }

    });
    this.components.danmakuColorPicker = new _components__WEBPACK_IMPORTED_MODULE_0__.Picker(this.template.danmaku_color_picker, this.danmakuColor, {
      pick(value) {
        if (/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value)) {
          // 有关弹幕颜色值的更改请写在此处
          THIS.danmakuColor = value;
          console.log(`已选择弹幕颜色：${THIS.danmakuColor}`);
          THIS.template.danmaku_color_input.value = value;
          THIS.template.danmaku_color_preview.style["background-color"] = value;

          if (value != value.toUpperCase()) {
            THIS.components.danmakuColorPicker.change(value.toUpperCase());
          }
        }
      }

    });
    this.template.danmaku_color_input.addEventListener("input", function () {
      this.value = "#" + this.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
      THIS.components.danmakuColorPicker.pick(this.value);
    });
    this.template.danmaku_color_preview.addEventListener("click", function () {
      THIS.components.danmakuColorPicker.pick(THIS.danmakuColor);
    });
  }

  initTroggle() {
    if (this.player.template.pip_btn) {
      this.player.template.pip_btn.addEventListener("click", () => {
        if (!document.pictureInPictureElement) {
          //开启
          this.video.requestPictureInPicture().catch(error => {
            console.log(error, "Video failed to enter Picture-in-Picture mode.");
          });
        } else {
          //关闭
          // this.player.pause();
          document.exitPictureInPicture().catch(error => {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Controller);

/***/ }),

/***/ "./src/js/danmaku.js":
/*!***************************!*\
  !*** ./src/js/danmaku.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");


class Danmaku {
  constructor(options) {
    this.options = options;
    this.container = this.options.container;
    this.danTunnel = {
      right: {},
      left: {},
      top: {},
      bottom: {}
    };
    this.danIndex = 0;
    this.dan = [];
    this.showing = this.options.isShow;
    this._opacity = this.options.opacity;
    this._fontScale = this.options.fontScale;
    this._speed = this.options.speed;
    this._limitArea = this.options.limitArea;
    this.events = this.options.events;
    this.topLimit = false;
    this.bottomLimit = false;
    this.leftLimit = false;
    this.rightLimit = false;
    this.colorLimit = false;
    this.advanceLimit = false;
    this.unlimited = this.options.unlimited;
    this.loaded = false; // 弹幕是否加载完毕

    this.paused = true;

    this._measure("");

    this.load();
  }

  load() {
    let apiurl;
    console.log(this.unlimited);

    if (this.options.api.link) {
      apiurl = `${this.options.api.link}`;
    } else {
      apiurl = `${this.options.api.address}/v1/danmaku?id=${this.options.api.id}`;
    }

    const endpoints = (this.options.api.addition || []).slice(0);
    endpoints.push(apiurl);
    this.events && this.events.trigger("danmaku_load_start", endpoints);
    this.loaded = false;

    this._readAllEndpoints(endpoints, results => {
      this.dan = [].concat.apply([], results).sort((a, b) => a.time - b.time);
      window.requestAnimationFrame(() => {
        this.frame();
      });
      this.options.callback(this.dan.length);
      this.events && this.events.trigger("danmaku_load_end", this.dan);
      this.loaded = true;
    });
  }

  reload(newId, newLink = "") {
    this.options.api.id = newId;
    this.options.api.link = newLink;
    this.dan = [];
    this.clear();
    this.load();
  }
  /**
   * Asynchronously read danmaku from all API endpoints
   */


  _readAllEndpoints(endpoints, callback) {
    const results = [];
    let readCount = 0;

    for (let i = 0; i < endpoints.length; ++i) {
      this.options.apiBackend.read({
        url: endpoints[i],
        success: data => {
          results[i] = data;
          ++readCount;

          if (readCount === endpoints.length) {
            callback(results);
          }
        },
        error: msg => {
          this.events && this.events.trigger("danmaku_load_failed");
          this.options.error(msg || "弹幕加载失败");
          results[i] = [];
          ++readCount;

          if (readCount === endpoints.length) {
            callback(results);
          }
        }
      });
    }
  }

  send(dan, callback) {}

  checkShield = dan => {
    let type = typeof dan.type !== "string" ? _utils__WEBPACK_IMPORTED_MODULE_0__.default.number2Type(dan.type) : dan.type;

    if (this[`${type}Limit`]) {
      return false;
    }

    return true;
  };

  frame() {
    if (this.dan.length && !this.paused && this.showing) {
      let item = this.dan[this.danIndex];
      const dan = [];

      while (item && this.options.time() > parseFloat(item.time)) {
        if (this.checkShield(item)) {
          dan.push(item);
        }

        item = this.dan[++this.danIndex];
      }

      if (this.colorLimit) {
        this.draw(dan.filter(el => {
          return el.color === 16777215;
        }));
      } else {
        this.draw(dan);
      }
    }

    window.requestAnimationFrame(() => {
      this.frame();
    });
  }

  limitArea(areaType) {
    //"1/4", "半屏", "3/4", "不重叠", "不限"
    this._limitArea = Math.min(areaType / 4, 1);
    this.unlimited = areaType > 4;
    this.shield("bottom", areaType < 4);
  }

  shield(type, flag = false) {
    this[`${type}Limit`] = flag;
  }

  opacity(percentage) {
    if (percentage !== undefined) {
      const items = this.container.getElementsByClassName("mfunsPlayer-danmaku-item");

      for (let i = 0; i < items.length; i++) {
        items[i].style.opacity = percentage;
      }

      this._opacity = percentage;
      this.events && this.events.trigger("danmaku_opacity", this._opacity);
    }

    return this._opacity;
  }

  size(scale) {
    this.events && this.events.trigger("danmaku_size", this.__fontScale);
    this._fontScale = scale;
    return this._fontScale;
  }

  speed(speed) {
    let speedName;

    if (speed !== undefined) {
      switch (speed) {
        case 0.5:
          speedName = "lowest";
          break;

        case 0.75:
          speedName = "low";
          break;

        case 1:
          speedName = "";
          break;

        case 1.25:
          speedName = "fast";
          break;

        case 1.5:
          speedName = "fastest";
          break;

        default:
          break;
      }

      const items = this.container.getElementsByClassName("mfunsPlayer-danmaku-move");

      for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("subtitle")) return;

        if (!!speedName) {
          items[i].classList.add(speedName);
        }

        if (!!this._speed) {
          items[i].classList.remove(this._speed);
        }
      }
    }

    this._speed = speedName;
  }
  /**
   * Push a danmaku into Player
   *
   * @param {Object Array} dan - {text, color, type}
   * text - danmaku content
   * color - danmaku color, default: `#fff`
   * type - danmaku type, `right` `top` `bottom`, default: `right`
   */


  draw(dan) {
    if (this.showing) {
      const itemHeight = this.options.height;
      const danWidth = this.container.offsetWidth;
      const danHeight = this.container.offsetHeight;
      const itemY = parseInt(danHeight / itemHeight);

      const danItemRight = ele => {
        const eleWidth = ele.offsetWidth || parseInt(ele.style.width);
        const eleRight = ele.getBoundingClientRect().right || this.container.getBoundingClientRect().right + eleWidth;
        return this.container.getBoundingClientRect().right - eleRight;
      };

      const danSpeed = width => (danWidth + width) / 5;

      const getTunnel = (ele, type, width) => {
        const tmp = danWidth / danSpeed(width);

        for (let i = 0; this.unlimited || i < itemY; i++) {
          const item = this.danTunnel[type][i + ""];

          if (item && item.length) {
            if (type !== "right") {
              continue;
            }

            for (let j = 0; j < item.length; j++) {
              const danRight = danItemRight(item[j]) - 10;

              if (danRight <= danWidth - tmp * danSpeed(parseInt(item[j].style.width)) || danRight <= 0) {
                break;
              }

              if (j === item.length - 1) {
                this.danTunnel[type][i + ""].push(ele);
                ele.addEventListener("animationend", () => {
                  this.danTunnel[type][i + ""].splice(0, 1);
                });
                return parseInt(i % (itemY * this._limitArea));
              }
            }
          } else {
            this.danTunnel[type][i + ""] = [ele];
            ele.addEventListener("animationend", () => {
              this.danTunnel[type][i + ""].splice(0, 1);
            });
            return parseInt(i % (itemY * this._limitArea));
          }
        }

        return -1;
      };

      if (Object.prototype.toString.call(dan) !== "[object Array]") {
        dan = [dan];
      }

      const docFragment = document.createDocumentFragment();

      for (let i = 0; i < dan.length; i++) {
        if (typeof dan[i].type !== "string") {
          dan[i].type = _utils__WEBPACK_IMPORTED_MODULE_0__.default.number2Type(dan[i].type);
        }

        dan[i].text.replace(/(\/n)|(\\n)/g, "\n");

        if (!dan[i].color) {
          dan[i].color = 16777215;
        }

        const item = document.createElement("div");

        if (!this.paused) {
          item.classList.add("mfunsPlayer-danmaku-run");
        } else {
          item.classList.remove("mfunsPlayer-danmaku-run");
        }

        item.classList.add("mfunsPlayer-danmaku-item");
        item.classList.add(`mfunsPlayer-danmaku-${dan[i].type}`);

        if (dan[i].border) {
          item.innerHTML = `<span style="border:${dan[i].border}">${dan[i].text}</span>`;
        } else {
          item.innerHTML = dan[i].text;
        }

        item.style.opacity = this._opacity;

        if (typeof dan[i].color !== "string") {
          item.style.color = _utils__WEBPACK_IMPORTED_MODULE_0__.default.number2Color(dan[i].color);
        }

        item.addEventListener("animationend", () => {
          this.container.removeChild(item);
        });

        const itemWidth = this._measure(dan[i].text);

        const isSubtitle = /(\/n)|(\\n)/i.test(dan[i].text);
        let tunnel; // adjust

        switch (dan[i].type) {
          case "right":
            tunnel = getTunnel(item, dan[i].type, itemWidth);

            if (tunnel >= 0 || isSubtitle) {
              item.style.width = itemWidth + 1 + "px";
              item.style.top = (isSubtitle ? 0 : itemHeight * tunnel) + "px";
              item.style.transform = `translateX(-${danWidth}px)`;
            }

            break;

          case "left":
            tunnel = getTunnel(item, dan[i].type, itemWidth);

            if (tunnel >= 0 || isSubtitle) {
              item.style.width = itemWidth + 1 + "px";
              item.style.top = (isSubtitle ? 0 : itemHeight * tunnel) + "px";
              item.style.transform = `translateX(${danWidth}px)`;
            }

            break;

          case "top":
            tunnel = getTunnel(item, dan[i].type);

            if (tunnel >= 0 || isSubtitle) {
              item.style.top = (isSubtitle ? 0 : itemHeight * tunnel) + "px";
            }

            break;

          case "bottom":
            tunnel = getTunnel(item, dan[i].type);

            if (tunnel >= 0 || isSubtitle) {
              item.style.bottom = (isSubtitle ? 0 : itemHeight * tunnel) + "px";
            }

            break;

          default:
            console.error(`Can't handled danmaku type: ${dan[i].type}`);
        }

        if (tunnel >= 0) {
          // move
          item.classList.add("mfunsPlayer-danmaku-move"); // insert

          docFragment.appendChild(item);
        }
      }

      this.container.appendChild(docFragment);
      return docFragment;
    }
  }

  play() {
    this.paused = false;
  }

  pause() {
    this.paused = true;
  }

  _measure(text) {
    if (!this.context) {
      const measureStyle = getComputedStyle(this.container.getElementsByClassName("mfunsPlayer-danmaku-item")[0], null);
      this.context = document.createElement("canvas").getContext("2d");
      this.context.font = measureStyle.getPropertyValue("font");
    }

    return this.context.measureText(text).width;
  }

  seek() {
    this.clear();

    for (let i = 0; i < this.dan.length; i++) {
      if (this.dan[i].time >= this.options.time()) {
        this.danIndex = i;
        break;
      }

      this.danIndex = this.dan.length;
    }
  }

  clear() {
    this.danTunnel = {
      right: {},
      top: {},
      bottom: {}
    };
    this.danIndex = 0;
    this.options.container.innerHTML = "";
    this.events && this.events.trigger("danmaku_clear");
  }

  htmlEncode(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "<br/>");
  }

  resize() {
    const danWidth = this.container.offsetWidth;
    const items = this.container.getElementsByClassName("mfunsPlayer-danmaku-right");

    for (let i = 0; i < items.length; i++) {
      items[i].style.transform = `translateX(-${danWidth}px)`;
    }
  }

  hide() {
    this.showing = false;
    this.pause();
    this.clear();
    this.events && this.events.trigger("danmaku_hide");
  }

  show() {
    this.seek();
    this.showing = true;
    this.play();
    this.events && this.events.trigger("danmaku_show");
  }

  unlimit(boolean) {
    this.unlimited = boolean;
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Danmaku);

/***/ }),

/***/ "./src/js/danmakuAuxiliary.js":
/*!************************************!*\
  !*** ./src/js/danmakuAuxiliary.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _template_danmakuAuxiliary_art__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../template/danmakuAuxiliary.art */ "./template/danmakuAuxiliary.art");
/* harmony import */ var _template_danmakuAuxiliary_art__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_template_danmakuAuxiliary_art__WEBPACK_IMPORTED_MODULE_1__);


/**
 * @param {Object} player 播放器实例
 * @param {Object} el 挂载点
*/

class DanmakuAuxiliary {
  constructor(player, el, options = {}) {
    this.player = player;
    this.el = el;
    this.mount();
  }

  mount() {
    // 挂载
    this.el.classList.add("mfunsPlayer-danmaku-auxiliary");
    this.el.innerHTML = _template_danmakuAuxiliary_art__WEBPACK_IMPORTED_MODULE_1___default()(); // 注入弹幕功能区DOM

    this.initDanmakuList();
    this.initADE();
  }

  initDanmakuList() {
    const $ = this.el.querySelector.bind(this.el);
    this.danmaku_list_panel = $(".mfunsPlayer-danmaku-list-panel"); // 弹幕列表面板

    this.danmaku_list_container = $(".mfunsPlayer-danmaku-list-container"); // 弹幕列表容器

    this.danmaku_list = $(".mfunsPlayer-danmaku-list"); // 弹幕列表

    this.danmaku_list_status = $(".mfunsPlayer-danmaku-list-status"); // 弹幕列表状态

    this.danmakuLoadingFailed = false;

    if (this.player.danmaku.loaded) {
      this.fillDanmakuList(this.player.danmaku.dan);
    } else {
      this.danmakuListStatus("loading");
    }

    this.player.on("danmaku_load_end", this.fillDanmakuList.bind(this));
    this.player.on("danmaku_load_start", this.clearDanmakuList.bind(this));
    this.player.on("danmaku_load_failed", (() => {
      this.danmakuLoadingFailed = true;
    }).bind(this));
  }

  fillDanmakuList(dan) {
    // 弹幕列表装填
    let danList = '';

    if (this.danmakuLoadingFailed) {
      this.danmakuListStatus("failed");
    } else if (!dan.length) {
      this.danmakuListStatus("empty");
    } else {
      dan.forEach(danmaku => {
        let row = `
        <div class="list-row" title="${danmaku.text}\n0000-00-00 00:00 @ ${_utils__WEBPACK_IMPORTED_MODULE_0__.default.secondToTime(danmaku.time, false)}">
          <span class="list-cell col-time">${_utils__WEBPACK_IMPORTED_MODULE_0__.default.secondToTime(danmaku.time, false)}</span><span class="list-cell col-text">${danmaku.text}</span><span class="list-cell col-date">${'00-00-00 00:00'}</span>
        </div>
        `;
        danList += row;
      });
      this.danmakuListStatus(true);
      this.danmaku_list.innerHTML = danList;
    }
  }

  clearDanmakuList() {
    this.danmaku_list.innerHTML = '';
    this.danmakuLoadingFailed = false;
    this.danmakuListStatus("loading");
  }

  danmakuListStatus(status) {
    this.danmaku_list_status.classList.toggle("status-loading", status === "loading");
    this.danmaku_list_status.classList.toggle("status-failed", status === "failed");
    this.danmaku_list_status.classList.toggle("status-empty", status === "empty");
    console.log("弹幕加载状态" + status);
  }

  initADE() {
    const $ = this.el.querySelector.bind(this.el);
    this.ade_panel = $(".mfunsPlayer-ade-panel"); // 高级弹幕编辑器面板(Advanced Danmaku Editor)

    this.ade_prebox = $(".mfunsPlayer-ade-prebox"); // 高级弹幕编辑框

    this.ade_clear = $(".mfunsPlayer-ade-clear"); // 高级弹幕编辑清除

    this.ade_preview = $(".mfunsPlayer-ade-preview"); // 高级弹幕编辑预览

    this.ade_emit = $(".mfunsPlayer-ade-emit"); // 高级弹幕发送

    this.ade_btn = $(".mfunsPlayer-ade-button"); // 高级弹幕面板按钮

    this.ade_exit_btn = $(".mfunsPlayer-ade-exit-button"); // 退出高级弹幕面板按钮

    this.ade_btn.addEventListener('click', this.showADE.bind(this));
    this.ade_exit_btn.addEventListener('click', this.hideADE.bind(this));
    this.ade_clear.addEventListener('click', () => {
      console.log("清空编辑框");
    });
    this.ade_preview.addEventListener('click', () => {
      console.log("高级弹幕预览");
    });
    this.ade_emit.addEventListener('click', () => {
      console.log("发送高级弹幕");
    });
  }

  showADE() {
    this.danmaku_list_panel.style["display"] = "none";
    this.ade_panel.style["display"] = "";
  }

  hideADE() {
    this.danmaku_list_panel.style["display"] = "";
    this.ade_panel.style["display"] = "none";
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DanmakuAuxiliary);

/***/ }),

/***/ "./src/js/events.js":
/*!**************************!*\
  !*** ./src/js/events.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Events {
  constructor() {
    this.events = {};
    this.videoEvents = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "mozaudioavailable", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"];
    this.playerEvents = ["danmaku_show", // 显示弹幕
    "danmaku_hide", // 隐藏弹幕
    "danmaku_clear", "danmaku_loaded", "danmaku_send", // 发送弹幕
    "danmaku_opacity", "contextmenu_show", // 显示右键菜单
    "contextmenu_hide", // 隐藏右键菜单
    "notice_show", "notice_hide", "destroy", "resize", "fullscreen", // 进入全屏模式
    "fullscreen_cancel", // 退出全屏模式
    "webfullscreen", // 进入网页全屏
    "webfullscreen_cancel", // 退出网页全屏
    "danmaku_load_start", // 弹幕开始加载
    "danmaku_load_end", // 弹幕加载完毕
    "danmaku_load_failed" // 弹幕加载失败
    ];
  }

  on(name, callback) {
    if (this.type(name) && typeof callback === "function") {
      if (!this.events[name]) {
        this.events[name] = [];
      }

      this.events[name].push(callback);
    }
  }

  trigger(name, info) {
    if (this.events[name] && this.events[name].length) {
      for (let i = 0; i < this.events[name].length; i++) {
        this.events[name][i](info);
      }
    }
  }

  type(name) {
    if (this.playerEvents.indexOf(name) !== -1) {
      return "player";
    } else if (this.videoEvents.indexOf(name) !== -1) {
      return "video";
    }

    console.error(`Unknown event name: ${name}`);
    return null;
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Events);

/***/ }),

/***/ "./src/js/fullscreen.js":
/*!******************************!*\
  !*** ./src/js/fullscreen.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");


class FullScreen {
  constructor(player) {
    this.player = player;
    this.lastScrollPosition = {
      left: 0,
      top: 0
    };
    this.singleVideo = !!(this.player.options.video.length > 1) ? 1 : 0;
    this.player.events.on("webfullscreen", () => {
      this.player.resize();
    });
    this.player.events.on("webfullscreen_cancel", () => {
      this.player.resize();
      _utils__WEBPACK_IMPORTED_MODULE_0__.default.setScrollPosition(this.lastScrollPosition);
    });

    const fullscreenchange = () => {
      this.player.resize();

      if (this.isFullScreen("browser")) {
        this.player.events.trigger("fullscreen");
      } else {
        _utils__WEBPACK_IMPORTED_MODULE_0__.default.setScrollPosition(this.lastScrollPosition);
        this.player.events.trigger("fullscreen_cancel");
      }
    };

    const docfullscreenchange = () => {
      const fullEle = document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;

      if (fullEle && fullEle !== this.player.template.videoWrap) {
        return;
      }

      this.player.resize();

      if (fullEle) {
        this.player.events.trigger("fullscreen");
      } else {
        _utils__WEBPACK_IMPORTED_MODULE_0__.default.setScrollPosition(this.lastScrollPosition);
        this.player.events.trigger("fullscreen_cancel");
      }
    };

    if (/Firefox/.test(navigator.userAgent)) {
      document.addEventListener("mozfullscreenchange", docfullscreenchange);
      document.addEventListener("fullscreenchange", docfullscreenchange);
    } else {
      this.player.template.videoWrap.addEventListener("fullscreenchange", fullscreenchange);
      this.player.template.videoWrap.addEventListener("webkitfullscreenchange", fullscreenchange);
      document.addEventListener("msfullscreenchange", docfullscreenchange);
      document.addEventListener("MSFullscreenChange", docfullscreenchange);
    }
  }

  isFullScreen(type = "browser") {
    switch (type) {
      case "browser":
        return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);

      case "web":
        return this.player.template.videoWrap.classList.contains("mfunsPlayer-web-fullscreen");
    }
  }

  handleFullscrren(type) {
    const danmakuRoot = this.player.template.danmakuRoot;

    if (danmakuRoot && !this.isFullScreen(type)) {
      this.player.template.footBar.removeChild(danmakuRoot);
      this.player.template.controllerWrap.appendChild(danmakuRoot);
    }
  }

  request(type = "browser") {
    const anotherType = type === "browser" ? "web" : "browser";
    const anotherTypeOn = this.isFullScreen(anotherType);

    if (!anotherTypeOn) {
      this.lastScrollPosition = _utils__WEBPACK_IMPORTED_MODULE_0__.default.getScrollPosition();
    } else {
      this.cancel(anotherType);
    } // if (this.player.template.danmaku_btn.className === "mfunsPlayer-video-danmaku-button open") {
    //   this.danmakuOpend = true;
    // }


    switch (type) {
      case "browser":
        if (this.player.template.videoWrap.requestFullscreen) {
          this.player.template.videoWrap.requestFullscreen();
        } else if (this.player.template.videoWrap.mozRequestFullScreen) {
          this.player.template.videoWrap.mozRequestFullScreen();
        } else if (this.player.template.videoWrap.webkitRequestFullscreen) {
          this.player.template.videoWrap.webkitRequestFullscreen();
        } else if (this.player.template.videoWrap.webkitEnterFullscreen) {
          // Safari for iOS
          this.player.template.videoWrap.webkitEnterFullscreen();
        } else if (this.player.template.videoWrap.webkitEnterFullScreen) {
          this.player.template.videoWrap.webkitEnterFullScreen();
        }

        this.player.template.fullscreen_tip.innerText = "退出全屏";
        this.player.template.webfull_btn.classList.add("hide");
        this.handleFullscrren();
        this.player.events.trigger("browserfullscreen");
        break;

      case "web":
        this.player.template.videoWrap.classList.add("mfunsPlayer-web-fullscreen");
        document.body.classList.add("mfunsPlayer-web-fullscreen-fix");
        this.player.template.webfull_tip.innerText = "退出网页全屏";
        this.handleFullscrren();
        this.player.events.trigger("webfullscreen");
        break;
    }
  }

  handleExitFullscreen(type) {
    const danmakuRoot = this.player.template.danmakuRoot;

    if (danmakuRoot && this.isFullScreen(type)) {
      this.player.template.controllerWrap.removeChild(danmakuRoot);
      this.player.template.footBar.appendChild(danmakuRoot);
    }
  }

  cancel(type = "browser") {
    switch (type) {
      case "browser":
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.webkitCancelFullscreen) {
          document.webkitCancelFullscreen();
        } else if (document.msCancelFullScreen) {
          document.msCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }

        this.handleExitFullscreen("browser");
        this.player.template.webfull_btn.classList.remove("hide");

        if (!!this.player.template.tipItem.length) {
          this.player.template.fullscreen_tip.innerText = "进入全屏";
        }

        break;

      case "web":
        this.handleExitFullscreen("web");
        this.player.template.videoWrap.classList.remove("mfunsPlayer-web-fullscreen");
        document.body.classList.remove("mfunsPlayer-web-fullscreen-fix");
        this.player.template.webfull_tip.innerText = "网页全屏";
        this.player.events.trigger("webfullscreen");
        break;
    }
  }

  toggle(type = "browser") {
    if (this.isFullScreen(type)) {
      this.cancel(type);
    } else {
      this.request(type);
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FullScreen);

/***/ }),

/***/ "./src/js/hotKey.js":
/*!**************************!*\
  !*** ./src/js/hotKey.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HotKey)
/* harmony export */ });
class HotKey {
  constructor(player) {
    window.onresize = () => {
      if (!player.fullScreen.isFullScreen("browser") && !player.fullScreen.isFullScreen("web")) {
        player.fullScreen.cancel("browser");
        const danmakuRoot = player.template.danmakuRoot;

        if ([...player.template.controllerWrap.childNodes].indexOf(danmakuRoot) > -1) {
          player.template.controllerWrap.removeChild(danmakuRoot);
          player.template.footBar.appendChild(danmakuRoot);
        }
      }
    };

    if (player.options.hotkey) {
      document.addEventListener("keydown", e => {
        console.log(e);

        if (player.focus) {
          const tag = document.activeElement.tagName.toUpperCase();
          const editable = document.activeElement.getAttribute("contenteditable");

          if (tag !== "INPUT" && tag !== "TEXTAREA" && editable !== "" && editable !== "true") {
            const event = e || window.event;
            let percentage;

            switch (event.keyCode) {
              case 27:
                player.fullScreen.cancel("web");
                break;

              case 32:
                event.preventDefault();
                player.toggle();
                break;

              case 37:
                event.preventDefault();

                if (!player.options.dragable) {
                  break;
                }

                player.seek(player.video.currentTime - 5);
                player.controller.setAutoHide();
                break;

              case 39:
                event.preventDefault();

                if (!player.options.dragable) {
                  break;
                }

                player.seek(player.video.currentTime + 5);
                player.controller.setAutoHide();
                break;

              case 38:
                event.preventDefault();
                percentage = player.volume() + 0.1;
                player.volume(percentage);
                break;

              case 40:
                event.preventDefault();
                percentage = player.volume() - 0.1;
                player.volume(percentage);
                break;
            }
          }
        }
      });
    }
  }

  checkFull() {
    let isFull = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    if (isFull === undefined) isFull = false;
    return isFull;
  }

}

/***/ }),

/***/ "./src/js/options.js":
/*!***************************!*\
  !*** ./src/js/options.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/js/api.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (options => {
  // default options
  const defaultOption = {
    container: options.element || document.getElementsByClassName("mfunsPlayer")[0],
    autoPlay: false,
    dragable: true,
    blackBorder: true,
    theme: "#b7daff",
    loop: false,
    hotkey: true,
    preload: "metadata",
    volume: 0.7,
    apiBackend: _api_js__WEBPACK_IMPORTED_MODULE_0__.default,
    video: {},
    contextmenu: [],
    mutex: true,
    pluginOptions: {
      hls: {},
      flv: {},
      dash: {},
      webtorrent: {}
    },
    pickerColors: ["#FE0302", "#FFFF00", "#00CD00", "#00FF00", "#4E6EF2", "#89D5FF", "#7B7FF7", "#757575", "#FFFFFF", "#FB7229"]
  };
  options = Object.assign(defaultOption, options);

  if (options.video) {
    !options.video.type && (options.video.type = "auto");
  }

  options.contextmenu = options.contextmenu.concat([{
    text: "视频统计信息",
    click: player => {}
  }, {
    text: `mfunsPlayer v2.1.0`,
    link: "https://github.com/Mfuns-cn"
  }]);
  return options;
});

/***/ }),

/***/ "./src/js/player.js":
/*!**************************!*\
  !*** ./src/js/player.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mfunsPlayer)
/* harmony export */ });
/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bar */ "./src/js/bar.js");
/* harmony import */ var _fullscreen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fullscreen */ "./src/js/fullscreen.js");
/* harmony import */ var _danmaku__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./danmaku */ "./src/js/danmaku.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options */ "./src/js/options.js");
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timer */ "./src/js/timer.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controller */ "./src/js/controller.js");
/* harmony import */ var _hotKey__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hotKey */ "./src/js/hotKey.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./events */ "./src/js/events.js");
/* harmony import */ var _contextmenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contextmenu */ "./src/js/contextmenu.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./template */ "./src/js/template.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./video */ "./src/js/video.js");
/* harmony import */ var _danmakuAuxiliary__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./danmakuAuxiliary */ "./src/js/danmakuAuxiliary.js");













let index = 0;
const instances = [];
class mfunsPlayer {
  constructor(options) {
    this.options = (0,_options__WEBPACK_IMPORTED_MODULE_3__.default)(options);
    this.template = new _template__WEBPACK_IMPORTED_MODULE_9__.default(this.options);
    this.events = new _events__WEBPACK_IMPORTED_MODULE_7__.default();
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
    this.bar = new _bar__WEBPACK_IMPORTED_MODULE_0__.default(this.template);
    this.danmakuAuxiliary = null;

    if (this.options.danmaku) {
      this.showDanmaku = options.danmaku.showDanmaku;
      this.danmakuOptions = {
        container: this.template.danmaku,
        opacity: this.options.danmaku.opacity,
        callback: length => {
          this.template.danmakuCount.innerHTML = `共 ${length} 条弹幕`;
        },
        error: msg => {
          this.notice(msg);
        },
        apiBackend: this.options.apiBackend,
        borderColor: this.options.theme,
        height: this.arrow ? 24 : 30,
        time: () => this.video.currentTime,
        isShow: this.showDanmaku,
        unlimited: false,
        api: {
          link: this.options.video[this.options.currentVideo].danLink,
          id: this.options.video[this.options.currentVideo].danId,
          address: this.options.danmaku.api,
          token: this.options.danmaku.token
        },
        events: this.events
      };
      this.danmaku = new _danmaku__WEBPACK_IMPORTED_MODULE_2__.default(this.danmakuOptions);
    }

    this.controller = new _controller__WEBPACK_IMPORTED_MODULE_5__.default(this);
    this.timer = new _timer__WEBPACK_IMPORTED_MODULE_4__.default(this);
    this.fullScreen = new _fullscreen__WEBPACK_IMPORTED_MODULE_1__.default(this);
    this.contextMenu = new _contextmenu__WEBPACK_IMPORTED_MODULE_8__.default(this);
    this.hotkey = new _hotKey__WEBPACK_IMPORTED_MODULE_6__.default(this);
    this.initVideo(this.video, this.options.video.type);
    this.arrow = this.container.offsetWidth <= 500;
    this.options.autoplay && this.play();
    if (this.options.playCallback) this.playCallback = options.playCallback;
    if (this.options.pauseCallback) this.pauseCallback = options.pauseCallback;
    if (this.options.endedCallback) this.endedCallback = options.endedCallback;
    document.addEventListener("click", () => {
      this.focus = false;
    }, true);
    this.container.addEventListener("click", () => {
      this.focus = true;
    }, true);
    this.rescale = this.rescale.bind(this);
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
    } // this.isPlayEnd = false;


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
            const flvPlayer = window.flvjs.createPlayer(Object.assign(this.options.pluginOptions.flv.mediaDataSource || {}, {
              type: "flv",
              url: video.src
            }), this.options.pluginOptions.flv.config);
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
              once: true
            });
            client.add(torrentId, torrent => {
              const file = torrent.files.find(file => file.name.endsWith(".mp4"));
              file.renderTo(this.video, {
                autoplay: this.options.autoplay,
                controls: false
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
      this.isSwitched && this.play();
      this.isSwitched = false;
    });
    this.on("loadstart", () => {
      this.notice("正在加载视频内容...", true);
      this.template.loading.classList.add("show");
      this.videoLoaded = false;
    });
    this.on("error", () => {
      this.notice("视频播放失败，请检查网络情况", true);
      this.template.loading.classList.remove("show");
    });
    this.on("loadedmetadata", () => {
      this.template.loading.classList.remove("show");
      this.notice("视频加载完成", false);
      this.videoLoaded = true;
      (0,_video__WEBPACK_IMPORTED_MODULE_11__.getVideoTime)(this.template);
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
        this.template.currentTime.innerText = _utils__WEBPACK_IMPORTED_MODULE_10__.default.secondToTime(ct);
      }
    });
    this.on("ended", () => {
      this.bar.set("played", 1, "width");
      if (this.endedCallback) this.endedCallback(this.video.currentTime);
      this.playEnd = true;
    });
    this.on("seeking", () => {
      this.danmaku.seek();
    });

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
      console.log(this.components);
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
    this.danmaku && this.danmaku.resize();

    if (this.controller.thumbnails) {
      this.controller.thumbnails.resize(160, this.video.videoHeight / this.video.videoWidth * 160, this.template.barWrap.offsetWidth);
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
      this.video.style.height = `${hscale / wscale * 100}%`;
    } else {
      this.video.style.height = `100%`;
      this.video.style.width = `${wscale / hscale * 100}%`;
    }
  }

  notice(text, alive = false, time = 2000, opacity = 0.8) {
    this.template.notice.innerHTML = text;
    this.template.notice.style.opacity = opacity;

    if (this.noticeTime) {
      clearTimeout(this.noticeTime);
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
    this.danmakuAuxiliary = new _danmakuAuxiliary__WEBPACK_IMPORTED_MODULE_12__.default(this, el);
  }

}

/***/ }),

/***/ "./src/js/template.js":
/*!****************************!*\
  !*** ./src/js/template.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _template_player_art__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../template/player.art */ "./template/player.art");
/* harmony import */ var _template_player_art__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_template_player_art__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");



class Template {
  constructor(options) {
    this.container = options.container;
    options.isFireFox = _utils__WEBPACK_IMPORTED_MODULE_1__.default.isFirefox;
    this.init(options);

    if (!options.blackBorder) {
      this.videoMask.style.height = "100%";
      this.bezel.style.bottom = "50px";
    }

    this.videoWrap.style.height = (this.videoWrap.clientWidth * 9 / 16 + (options.blackBorder ? 100 : 0)).toFixed(2) + "px";
  }

  init(options) {
    this.container.innerHTML = _template_player_art__WEBPACK_IMPORTED_MODULE_0___default()(options); // 注入播放器DOM

    const $ = this.container.querySelector.bind(this.container);
    const $all = this.container.querySelectorAll.bind(this.container);
    this.mask = $(".mfunsPlayer-mask");
    this.canvas = $(".mfuns_canvas");
    this.video = $(".mfunsPlayer-video");
    this.videoMask = $(".mfunsPlayer-video-mask");
    this.videoWrap = $(".mfunsPlayer-video-wrap");
    this.emit = $(".emit");
    this.fullButton = $(".mfunsPlayer-controller-fullButton");
    this.danmakuRoot = $(".mfunsPlayer-video-danmaku-root");
    this.menu = $(".mfunsPlayer-menu");
    this.menuItem = $all(".mfunsPlayer-menu-item");
    this.danmaku = $(".mfunsPlayer-danmaku");
    this.danmakuCount = $(".mfunsPlayer-video-danmaku-count");
    this.danmaku_btn = $(".mfunsPlayer-controller-danmaku-trigger"); // 弹幕开关

    this.danmakuSettings_btn = $(".mfunsPlayer-controller-danmaku-settings"); // 弹幕设置

    this.danmakuSettings_panel = $(".mfunsPlayer-danmaku-settings-mask");
    this.danmaku_filter_picker = $(".mfunsPlayer-danmaku-filter-picker"); // 类型屏蔽选择器

    this.danmaku_opacity_slider = $(".mfunsPlayer-danmaku-opacity-slider"); // 不透明度滑动条

    this.danmaku_opacity_value = $(".mfunsPlayer-danmaku-opacity-value"); // 不透明度显示

    this.danmaku_showarea_slider = $(".mfunsPlayer-danmaku-showarea-slider"); // 显示区域滑动条

    this.danmaku_showarea_value = $(".mfunsPlayer-danmaku-showarea-value"); // 显示区域显示

    this.text = $(".mfunsPlayer-danmaku-text");
    this.headBar = $(".mfunsPlayer-headBar");
    this.headTitle = $(".mfunsPlayer-headBar-title");
    this.barWrap = $(".mfunsPlayer-bar-wrap");
    this.bar = $(".mfunsPlayer-bar");
    this.playedBar = $(".mfunsPlayer-playedBar");
    this.bufferedBar = $(".mfunsPlayer-bufferedBar");
    this.thumb = $(".mfunsPlayer-thumb");
    this.barTime = $(".mfunsPlayer-barTime");
    this.bezel = $(".mfunsPlayer-bezel");
    this.tipItem = $all(".mfunsPlayer-controller-tip");
    this.speedInfo = $(".mfunsPlayer-speed-info");
    this.speedItem = $all(".mfunsPlayer-speed-item");
    this.next_btn = $(".mfunsPlayer-controller-next"); // 下一个按钮

    this.repeat_btn = $(".mfunsPlayer-controller-repeat"); // 洗脑循环按钮

    this.repeat_tip = $(".mfunsPlayer-controller-repeat .mfunsPlayer-controller-tip"); // 洗脑循环提示

    this.pagelistItem = $all(".mfunsPlayer-pagelist-item");
    this.volume_btn = $(".mfunsPlayer-controller-volume"); // 音量按钮

    this.volumeMask = $(".mfunsPlayer-controller-volume-mask");
    this.volumeBarWrap = $(".mfunsPlayer-controller-volume-wrap");
    this.volumeBar = $(".mfunsPlayer-controller-volume-bar");
    this.volumeNum = $(".mfunsPlayer-controller-volume-num");
    this.volumePercentage = $(".mfunsPlayer-controller-volume-percentage");
    this.volumeIcon = $(".mfunsPlayer-controller-volume-icon");
    this.webfull_btn = $(".mfunsPlayer-controller-webfull"); // 网页全屏按钮

    this.webfull_tip = $(".mfunsPlayer-controller-webfull .mfunsPlayer-controller-tip"); // 网页全屏提示

    this.fullscreen_btn = $(".mfunsPlayer-controller-fullscreen"); // 全屏按钮

    this.fullscreen_tip = $(".mfunsPlayer-controller-fullscreen .mfunsPlayer-controller-tip"); // 全屏提示

    this.browserFullButtonIcon = $(".mfunsPlayer-controller-full-icon");
    this.settings_btn = $(".mfunsPlayer-controller-settings");
    this.video_scale_picker = $(".mfunsPlayer-video-scale-picker"); // 视频比例选择器

    this.video_borderhidden_switch = $(".mfunsPlayer-video-borderhidden-switch"); // 隐藏黑边开关

    this.video_nextpage_switch = $(".mfunsPlayer-video-nextpage-switch"); // 自动换P开关
    // this.switch_btn = $(".switch");

    this.range = $(".range");
    this.play_btn = $(".mfunsPlayer-controller-play"); // 播放按钮

    this.controllerMask = $(".mfunsPlayer-controller-mask");
    this.controller = $(".mfunsPlayer-controller");
    this.controllerWrap = $(".mfunsPlayer-controller-wrap");
    this.footBar = $(".mfunsPlayer-footBar");
    this.loading = $(".mfunsPlayer-loading");
    this.load = $(".loader_box");
    this.pip_btn = $(".mfunsPlayer-controller-pip"); // 画中画按钮

    this.notice = $(".mfunsPlayer-notice");
    this.controllerTime = $(".mfunsPlayer-controller-time");
    this.time_label = $(".mfunsPlayer-controller-time-label");
    this.currentTime = $(".currentTime");
    this.total = $(".total");
    this.time_input = $(".mfunsPlayer-controller-time-input");
    this.headOfList = $(".headOfList");
    this.footOfList = $(".footOfList");
    this.closeList = $(".closeList_btn");
    this.advancedDanmaku_btn = $(".advancedDanmaku_btn");
    this.advancePre = $(".advanceDanmaku_pre_box");
    this.ade_mask = $(".advanceDanmakuEditor_mask");
    this.editor_clear = $(".editor_clear");
    this.editor_preview = $(".editor_preview");
    this.editor_emit = $(".editor_emit");
    this.danmakuEditor = $(".danmakuEditor");
    this.danmakuStyle_btn = $(".mfunsPlayer-controller-danmaku-style"); // 弹幕样式按钮

    this.danmaku_fontsize_picker = $(".mfunsPlayer-danmaku-fontsize-picker");
    this.danmaku_type_picker = $(".mfunsPlayer-danmaku-type-picker");
    this.danmaku_color_input = $(".mfunsPlayer-danmaku-color-input");
    this.danmaku_color_preview = $(".mfunsPlayer-danmaku-color-preview");
    this.danmaku_color_picker = $(".mfunsPlayer-danmaku-color-picker");
    this.voice = $(".voice");
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Template);

/***/ }),

/***/ "./src/js/timer.js":
/*!*************************!*\
  !*** ./src/js/timer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Timer {
  constructor(player) {
    this.player = player;

    window.requestAnimationFrame = (() => window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    })();

    this.types = ["loading", "info", "fps"];
    this.init();
  }

  init() {
    this.types.map(item => {
      if (item !== "fps") {
        this[`init${item}Checker`]();
      }

      return item;
    });
  }

  initloadingChecker() {
    let lastPlayPos = 0;
    let currentPlayPos = 0;
    let bufferingDetected = false;
    this.loadingChecker = setInterval(() => {
      if (this.enableloadingChecker && !this.player.video.paused) {
        // whether the video is buffering
        currentPlayPos = this.player.video.currentTime;

        if (!bufferingDetected && currentPlayPos === lastPlayPos) {
          this.player.template.loading.classList.add("show");
          this.player.container.classList.add("mfunsPlayer-loading");
          this.player.danmaku.pause();
          bufferingDetected = true;
        }

        if (bufferingDetected && currentPlayPos > lastPlayPos) {
          this.player.template.loading.classList.remove("show");
          this.player.container.classList.remove("mfunsPlayer-loading");
          this.player.danmaku.play();
          bufferingDetected = false;
        }

        lastPlayPos = currentPlayPos;
      }
    }, 100);
  }

  initfpsChecker() {
    window.requestAnimationFrame(() => {
      if (this.enablefpsChecker) {
        this.initfpsChecker();

        if (!this.fpsStart) {
          this.fpsStart = new Date();
          this.fpsIndex = 0;
        } else {
          this.fpsIndex++;
          const fpsCurrent = new Date();

          if (fpsCurrent - this.fpsStart > 1000) {
            this.player.infoPanel.fps(this.fpsIndex / (fpsCurrent - this.fpsStart) * 1000);
            this.fpsStart = new Date();
            this.fpsIndex = 0;
          }
        }
      } else {
        this.fpsStart = 0;
        this.fpsIndex = 0;
      }
    });
  }

  initinfoChecker() {
    this.infoChecker = setInterval(() => {
      if (this.enableinfoChecker) {
        this.player.infoPanel.update();
      }
    }, 1000);
  }

  enable(type) {
    this[`enable${type}Checker`] = true;

    if (type === "fps") {
      this.initfpsChecker();
    }
  }

  disable(type) {
    this[`enable${type}Checker`] = false;
  }

  destroy() {
    this.types.map(item => {
      this[`enable${item}Checker`] = false;
      this[`${item}Checker`] && clearInterval(this[`${item}Checker`]);
      return item;
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timer);

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

    if (second === 0 || second === Infinity || second.toString() === "NaN") {
      return "00:00";
    }

    const add0 = num => num < 10 ? "0" + num : "" + num;

    const hour = Math.floor(second / 3600);
    const min = Math.floor((second - hour * 3600) / 60);
    const sec = Math.floor(second - hour * 3600 - min * 60);

    if (showHour) {
      return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(":");
    } else {
      return [hour * 60 + min, sec].map(add0).join(":");
    }
  },

  /**
   * 将时间文本转换为秒数
   *
   * @param {String} str 冒号分隔的时间文本，支持全角冒号
   * @return {Number} second
   */
  textToSecond: str => {
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
  getElementViewLeft: element => {
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
  getElementViewTop: element => {
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
    const scrollTop = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

    if (element.getBoundingClientRect) {
      if (typeof this.getBoundingClientRectViewLeft.offset !== "number") {
        let temp = document.createElement("div");
        temp.style.cssText = "position:absolute;top:0;left:0;";
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
      top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
  },

  setScrollPosition({
    left = 0,
    top = 0
  }) {
    if (this.isFirefox) {
      document.documentElement.scrollLeft = left;
      document.documentElement.scrollTop = top;
    } else {
      window.scrollTo(left, top);
    }
  },

  isFirefox: /firefox/i.test(window.navigator.userAgent),
  isChrome: /chrome/i.test(window.navigator.userAgent),
  storage: {
    set: (key, value) => {
      localStorage.setItem(key, value);
    },
    get: key => localStorage.getItem(key)
  },
  nameMap: {
    dragStart: isMobile ? "touchstart" : "mousedown",
    dragMove: isMobile ? "touchmove" : "mousemove",
    dragEnd: isMobile ? "touchend" : "mouseup"
  },
  color2Number: color => {
    if (color[0] === "#") {
      color = color.substr(1);
    }

    if (color.length === 3) {
      color = `${color[0]}${color[0]}${color[1]}${color[1]}${color[2]}${color[2]}`;
    }

    return parseInt(color, 16) + 0x000000 & 0xffffff;
  },
  number2Color: number => "#" + ("00000" + number.toString(16)).slice(-6),
  number2Type: number => {
    switch (number) {
      case 0:
        return "right";

      case 1:
        return "top";

      case 2:
        return "bottom";

      default:
        return "right";
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (utils);

/***/ }),

/***/ "./src/js/video.js":
/*!*************************!*\
  !*** ./src/js/video.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getVideoTime": () => (/* binding */ getVideoTime)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

function getVideoTime(tem) {
  let max = parseInt(tem.video.duration);
  tem.currentTime.innerText = "00:00";
  tem.total.innerText = _utils__WEBPACK_IMPORTED_MODULE_0__.default.secondToTime(max) || "00:00";

  if (isNaN(max)) {
    setTimeout(function () {
      getVideoTime(tem);
    }, 100);
  } else {
    return;
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/index.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/index.scss ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icon_mask_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icon/mask.png */ "./src/icon/mask.png");
/* harmony import */ var _icon_pause_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../icon/pause.png */ "./src/icon/pause.png");
/* harmony import */ var _icon_play_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../icon/play.png */ "./src/icon/play.png");
/* harmony import */ var _icon_loading_gif__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../icon/loading.gif */ "./src/icon/loading.gif");
/* harmony import */ var _icon_control_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../icon/control.png */ "./src/icon/control.png");
/* harmony import */ var _icon_fonts_mfunsPlayerIcon_eot_dkb9ab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../icon/fonts/mfunsPlayerIcon.eot?dkb9ab */ "./src/icon/fonts/mfunsPlayerIcon.eot?dkb9ab");
/* harmony import */ var _icon_fonts_mfunsPlayerIcon_ttf_dkb9ab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../icon/fonts/mfunsPlayerIcon.ttf?dkb9ab */ "./src/icon/fonts/mfunsPlayerIcon.ttf?dkb9ab");
/* harmony import */ var _icon_fonts_mfunsPlayerIcon_woff_dkb9ab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../icon/fonts/mfunsPlayerIcon.woff?dkb9ab */ "./src/icon/fonts/mfunsPlayerIcon.woff?dkb9ab");
/* harmony import */ var _icon_fonts_mfunsPlayerIcon_svg_dkb9ab__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../icon/fonts/mfunsPlayerIcon.svg?dkb9ab */ "./src/icon/fonts/mfunsPlayerIcon.svg?dkb9ab");
// Imports












var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_icon_mask_png__WEBPACK_IMPORTED_MODULE_3__.default);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_icon_pause_png__WEBPACK_IMPORTED_MODULE_4__.default);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_icon_play_png__WEBPACK_IMPORTED_MODULE_5__.default);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_icon_loading_gif__WEBPACK_IMPORTED_MODULE_6__.default);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_icon_control_png__WEBPACK_IMPORTED_MODULE_7__.default);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_icon_fonts_mfunsPlayerIcon_eot_dkb9ab__WEBPACK_IMPORTED_MODULE_8__.default);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_icon_fonts_mfunsPlayerIcon_eot_dkb9ab__WEBPACK_IMPORTED_MODULE_8__.default, { hash: "#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_icon_fonts_mfunsPlayerIcon_ttf_dkb9ab__WEBPACK_IMPORTED_MODULE_9__.default);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_icon_fonts_mfunsPlayerIcon_woff_dkb9ab__WEBPACK_IMPORTED_MODULE_10__.default);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_icon_fonts_mfunsPlayerIcon_svg_dkb9ab__WEBPACK_IMPORTED_MODULE_11__.default, { hash: "#mfunsPlayerIcon" });
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".mfunsPlayer-controller-mask {\n  width: 100%;\n  height: 100px;\n  position: absolute;\n  bottom: 0;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") repeat-x bottom;\n  transition: all .3s ease-in-out;\n  z-index: 103; }\n  .mfunsPlayer-controller-mask.hide {\n    opacity: 0; }\n  .mfunsPlayer-controller-mask .mfunsPlayer-bezel {\n    float: right;\n    margin-top: -10px;\n    margin-right: 20px;\n    width: 65px;\n    height: 55px;\n    cursor: pointer;\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-size: 100% 100%;\n    z-index: 1000; }\n    .mfunsPlayer-controller-mask .mfunsPlayer-bezel.bezel_play {\n      background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n      background-size: 100% 100%; }\n  .mfunsPlayer-controller-mask .mfunsPlayer-controller {\n    height: 45px;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    padding: 0 15px;\n    z-index: 11;\n    color: #fff; }\n    .mfunsPlayer-controller-mask .mfunsPlayer-controller.hide {\n      display: none; }\n    .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-button {\n      padding: 0 7px;\n      color: #fff; }\n    .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap {\n      height: calc(100% - 15px);\n      position: relative;\n      margin: 10px 0 5px;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      z-index: 10; }\n      .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-tip {\n        position: absolute;\n        bottom: 140%;\n        padding: 2px 4px;\n        max-width: 70px;\n        white-space: nowrap;\n        height: 20px;\n        line-height: 20px;\n        background: rgba(28, 28, 28, 0.9);\n        transition: all .2s ease-in-out;\n        transform: scale(0);\n        border-radius: 2px;\n        font-size: 10px;\n        opacity: 0;\n        z-index: 1001; }\n      .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-button:hover .mfunsPlayer-controller-tip {\n        transform: scale(1);\n        opacity: 1; }\n      .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left {\n        max-width: 200px;\n        display: flex;\n        align-items: center; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left .mfunsPlayer-controller-play .icon-play {\n          display: none; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left .mfunsPlayer-controller-play.button-paused .icon-play {\n          display: block; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left .mfunsPlayer-controller-play.button-paused .icon-pause {\n          display: none; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left .mfunsPlayer-controller-next .icon-next {\n          font-size: 16px; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left .mfunsPlayer-controller-time {\n          width: 90px;\n          text-align: center;\n          font-size: 13px;\n          margin: 0 5px; }\n          .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left .mfunsPlayer-controller-time .mfunsPlayer-controller-time-input {\n            display: none;\n            width: 60px;\n            margin: auto;\n            font-size: 13px;\n            text-align: center; }\n          .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left .mfunsPlayer-controller-time .mfunsPlayer-controller-time-label {\n            width: 100%;\n            white-space: nowrap;\n            text-align: center; }\n          .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left .mfunsPlayer-controller-time.inputting .mfunsPlayer-controller-time-input {\n            display: block; }\n          .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left .mfunsPlayer-controller-time.inputting .mfunsPlayer-controller-time-label {\n            display: none; }\n      .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-repeat .icon-repeat {\n        display: none; }\n      .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-repeat.button-repeat .icon-repeat-off {\n        display: none; }\n      .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-repeat.button-repeat .icon-repeat {\n        display: block; }\n      .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right {\n        height: 100%;\n        min-width: 200px;\n        display: flex;\n        justify-content: flex-end;\n        align-items: center; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-pagelist {\n          cursor: pointer; }\n          .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-pagelist:hover .mfunsPlayer-pagelist-mask {\n            display: block; }\n          .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-pagelist .mfunsPlayer-pagelist-mask .mfunsPlayer-pagelist-list {\n            max-height: 300px;\n            overflow-y: auto;\n            font-weight: 400;\n            border-radius: 2px;\n            background: rgba(28, 28, 28, 0.9);\n            padding: 5px 0;\n            transition: all .3s ease-in-out;\n            color: #fff; }\n            .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-pagelist .mfunsPlayer-pagelist-mask .mfunsPlayer-pagelist-list .mfunsPlayer-pagelist-item {\n              width: 320px;\n              white-space: nowrap;\n              text-overflow: ellipsis;\n              overflow: hidden;\n              height: 30px;\n              box-sizing: border-box;\n              cursor: pointer;\n              line-height: 30px;\n              padding: 0 15px; }\n              .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-pagelist .mfunsPlayer-pagelist-mask .mfunsPlayer-pagelist-list .mfunsPlayer-pagelist-item:hover {\n                background-color: rgba(255, 255, 255, 0.1); }\n              .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-pagelist .mfunsPlayer-pagelist-mask .mfunsPlayer-pagelist-list .mfunsPlayer-pagelist-item.focus {\n                color: #7b7ff7;\n                padding: 0 15px 0 30px;\n                position: relative; }\n                .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-pagelist .mfunsPlayer-pagelist-mask .mfunsPlayer-pagelist-list .mfunsPlayer-pagelist-item.focus::before {\n                  content: \"\";\n                  position: absolute;\n                  top: 10px;\n                  left: 15px;\n                  border-color: transparent transparent transparent #7b7ff7;\n                  border-style: solid;\n                  border-width: 5px 8px; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-speed {\n          width: 40px; }\n          .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-speed:hover .mfunsPlayer-speed-mask {\n            display: block; }\n          .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-speed .mfunsPlayer-speed-mask .mfunsPlayer-speed-list {\n            font-weight: 400;\n            width: 80px; }\n            .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-speed .mfunsPlayer-speed-mask .mfunsPlayer-speed-list .mfunsPlayer-speed-item {\n              height: 30px;\n              box-sizing: border-box;\n              text-align: center;\n              cursor: pointer;\n              line-height: 30px; }\n              .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-speed .mfunsPlayer-speed-mask .mfunsPlayer-speed-list .mfunsPlayer-speed-item.focus {\n                color: #7b7ff7; }\n              .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-speed .mfunsPlayer-speed-mask .mfunsPlayer-speed-list .mfunsPlayer-speed-item:hover {\n                background-color: rgba(255, 255, 255, 0.1); }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-volume:hover .mfunsPlayer-controller-volume-mask {\n          display: block; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-volume .mfunsPlayer-controller-volume-icon .icon-volume-off {\n          display: none; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-volume .mfunsPlayer-controller-volume-icon.button-volume-off .icon-volume-off {\n          display: block; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-volume .mfunsPlayer-controller-volume-icon.button-volume-off .icon-volume {\n          display: none; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-volume .mfunsPlayer-controller-volume-mask .mfunsPlayer-controller-volume-wrap {\n          width: 32px;\n          height: 100px; }\n          .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-volume .mfunsPlayer-controller-volume-mask .mfunsPlayer-controller-volume-wrap .mfunsPlayer-controller-volume-num {\n            color: #e5e9ef;\n            width: 100%;\n            text-align: center;\n            font-size: 12px;\n            height: 28px;\n            line-height: 28px;\n            margin-bottom: 2px; }\n          .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-volume .mfunsPlayer-controller-volume-mask .mfunsPlayer-controller-volume-wrap .mfunsPlayer-controller-volume-bar {\n            width: 100%;\n            height: 60px;\n            position: relative;\n            cursor: pointer; }\n            .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-volume .mfunsPlayer-controller-volume-mask .mfunsPlayer-controller-volume-wrap .mfunsPlayer-controller-volume-bar .slider-bar {\n              background: #7b7ff7; }\n            .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-volume .mfunsPlayer-controller-volume-mask .mfunsPlayer-controller-volume-wrap .mfunsPlayer-controller-volume-bar .slider-thumb {\n              background: #7b7ff7; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-settings .mfunsPlayer-settings-mask .mfunsPlayer-controller-settings-wrap {\n          font-size: 12px;\n          width: 200px; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-settings .mfunsPlayer-settings-mask .row-title {\n          width: 60px; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-settings .mfunsPlayer-settings-mask .mfunsPlayer-picker {\n          display: inline-block; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-settings .mfunsPlayer-settings-mask .mfunsPlayer-switch {\n          width: 80px; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-pip .icon-picture-in-picture-exit {\n          display: none; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-pip.button-picture-in-picture .icon-picture-in-picture {\n          display: none; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-pip.button-picture-in-picture .icon-picture-in-picture-exit {\n          display: block; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-webfull.hide {\n          display: none; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-webfull .icon-web-fullscreen-exit {\n          display: none; }\n        .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-fullscreen .icon-fullscreen-exit {\n          display: none; }\n\n.mfunsPlayer-video-danmaku-root {\n  display: flex;\n  flex-grow: 1;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2px;\n  height: 100%; }\n  .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-button {\n    padding: 0 5px; }\n  .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-icon {\n    color: #999; }\n  .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-trigger .icon-danmaku {\n    color: #42e2f4; }\n  .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-trigger.open .icon-danmaku-off {\n    display: none; }\n  .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-trigger.close .icon-danmaku {\n    display: none; }\n  .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-settings .mfunsPlayer-danmaku-settings-mask .mfunsPlayer-controller-danmaku-settings-wrap {\n    font-size: 12px;\n    width: 280px; }\n  .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-settings .mfunsPlayer-danmaku-settings-mask .row-title {\n    width: 60px; }\n  .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-settings .mfunsPlayer-danmaku-settings-mask .row-value {\n    width: 40px;\n    text-align: right; }\n  .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-settings .mfunsPlayer-danmaku-settings-mask .mfunsPlayer-picker {\n    display: inline-block; }\n  .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-settings .mfunsPlayer-danmaku-settings-mask .mfunsPlayer-slider {\n    position: relative;\n    width: 160px;\n    cursor: pointer; }\n  .mfunsPlayer-video-danmaku-root .input_box {\n    display: flex;\n    flex-grow: 1;\n    align-items: center;\n    position: relative;\n    height: 100%;\n    border-left: 1px solid #e7e7e7;\n    margin-left: 5px;\n    background: rgba(255, 255, 255, 0.35); }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style:hover .mfunsPlayer-danmaku-style-mask {\n      display: block; }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .icon-text:hover {\n      color: #7b7ff7; }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-controller-danmaku-style-fulloptions-wrap {\n      font-size: 12px;\n      width: 280px; }\n      .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-controller-danmaku-style-fulloptions-wrap .mfunsPlayer-danmaku-color-picker {\n        width: auto; }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-controller-danmaku-style-wrap {\n      font-size: 12px;\n      width: 180px; }\n      .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-controller-danmaku-style-wrap .mfunsPlayer-danmaku-color-picker {\n        width: 120px; }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .row-title {\n      width: 40px; }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-control-panel-danmaku-style {\n      text-align: left;\n      height: 150px;\n      width: 180px;\n      padding-top: 5px; }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-danmaku-fontsize-picker, .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-danmaku-type-picker {\n      display: inline-block;\n      line-height: 0; }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-control-panel-danmaku-style .row-title {\n      width: 40px; }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-danmaku-color-input {\n      display: inline-block;\n      width: 60px; }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-danmaku-color-preview {\n      display: inline-block;\n      width: 36px;\n      height: 18px;\n      line-height: 20px;\n      margin-left: 5px;\n      border-radius: 2px;\n      border: 2px solid #FFFFFFA0; }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-danmaku-color-picker {\n      margin: 10px auto 5px;\n      text-align: center;\n      line-height: 0; }\n      .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-danmaku-color-picker .picker-item {\n        display: inline-block;\n        margin-bottom: 4px;\n        width: 14px;\n        height: 14px;\n        border-radius: 2px;\n        border: 2px solid #00000040;\n        cursor: pointer; }\n        .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-controller-danmaku-style .mfunsPlayer-danmaku-style-mask .mfunsPlayer-danmaku-color-picker .picker-item.picked {\n          border-color: #FFF; }\n    .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-danmaku-text {\n      flex: 5;\n      height: 100%;\n      outline: none;\n      border: none;\n      margin-left: 5px;\n      color: #999;\n      background-color: transparent;\n      box-sizing: border-box; }\n      .mfunsPlayer-video-danmaku-root .input_box .mfunsPlayer-danmaku-text::-webkit-input-placeholder {\n        color: #999; }\n    .mfunsPlayer-video-danmaku-root .input_box .emit {\n      width: 60px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      height: 32px;\n      font-size: 12px;\n      color: #fff;\n      background: #7b7ff7;\n      border-radius: 2px;\n      cursor: pointer; }\n\n.mfunsPlayer .mfunsPlayer-controller-button, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-controller-button {\n  position: relative;\n  height: 30px;\n  font-size: 12px;\n  display: flex;\n  justify-content: center;\n  cursor: pointer; }\n  .mfunsPlayer .mfunsPlayer-controller-button .mfunsPlayer-controller-icon, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-controller-button .mfunsPlayer-controller-icon {\n    font-size: 21px;\n    line-height: 30px; }\n  .mfunsPlayer .mfunsPlayer-controller-button .mfunsPlayer-controller-label, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-controller-button .mfunsPlayer-controller-label {\n    font-size: 14px;\n    line-height: 30px;\n    font-weight: 600; }\n  .mfunsPlayer .mfunsPlayer-controller-button:hover .mfunsPlayer-controller-panel-mask, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-controller-button:hover .mfunsPlayer-controller-panel-mask {\n    display: block; }\n\n.mfunsPlayer .mfunsPlayer-controller-panel-mask, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-controller-panel-mask {\n  position: absolute;\n  padding-bottom: 15px;\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  z-index: 200;\n  display: none; }\n  .mfunsPlayer .mfunsPlayer-controller-panel-mask.show, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-controller-panel-mask.show {\n    display: block; }\n  .mfunsPlayer .mfunsPlayer-controller-panel-mask:hover, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-controller-panel-mask:hover {\n    display: block; }\n  .mfunsPlayer .mfunsPlayer-controller-panel-mask .mfunsPlayer-controller-panel, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-controller-panel-mask .mfunsPlayer-controller-panel {\n    cursor: default;\n    overflow: hidden;\n    background: rgba(21, 21, 21, 0.9);\n    color: #FFFFFF;\n    border-radius: 2px;\n    font-size: 13px; }\n    .mfunsPlayer .mfunsPlayer-controller-panel-mask .mfunsPlayer-controller-panel .mfunsPlayer-panel-row, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-controller-panel-mask .mfunsPlayer-controller-panel .mfunsPlayer-panel-row {\n      display: flex;\n      margin: 5px 10px 10px; }\n      .mfunsPlayer .mfunsPlayer-controller-panel-mask .mfunsPlayer-controller-panel .mfunsPlayer-panel-row .row-title, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-controller-panel-mask .mfunsPlayer-controller-panel .mfunsPlayer-panel-row .row-title {\n        color: #FFFFFFA0;\n        height: 22px;\n        line-height: 22px; }\n      .mfunsPlayer .mfunsPlayer-controller-panel-mask .mfunsPlayer-controller-panel .mfunsPlayer-panel-row .row-value, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-controller-panel-mask .mfunsPlayer-controller-panel .mfunsPlayer-panel-row .row-value {\n        height: 22px;\n        line-height: 22px;\n        color: #FFFFFFE0; }\n\n.mfunsPlayer {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  position: relative;\n  box-sizing: content-box;\n  line-height: 1; }\n  .mfunsPlayer.mfunsPlayer-playing .mfunsPlayer-danmaku .mfunsPlayer-danmaku-move {\n    animation-play-state: running; }\n  .mfunsPlayer.mfunsPlayer-loading .mfunsPlayer-danmaku,\n  .mfunsPlayer.mfunsPlayer-loading .mfunsPlayer-danmaku-move, .mfunsPlayer.mfunsPlayer-paused .mfunsPlayer-danmaku,\n  .mfunsPlayer.mfunsPlayer-paused .mfunsPlayer-danmaku-move {\n    animation-play-state: paused !important; }\n  .mfunsPlayer.mfunsPlayer-web-fullscreen-fix {\n    position: fixed;\n    top: 0;\n    left: 0;\n    margin: 0;\n    padding: 0; }\n  .mfunsPlayer .mfunsPlayer-headBar {\n    width: 100%;\n    height: 100px;\n    line-height: 50px;\n    position: absolute;\n    top: 0;\n    left: 0;\n    color: #fff;\n    display: flex;\n    padding: 0 20px;\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") repeat-x top;\n    transition: all .3s ease-in-out;\n    z-index: 103; }\n    .mfunsPlayer .mfunsPlayer-headBar.hide {\n      opacity: 0; }\n    .mfunsPlayer .mfunsPlayer-headBar .mfunsPlayer-headBar-title {\n      width: calc(100% - 40px);\n      height: 50px;\n      line-height: 50px;\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis; }\n  .mfunsPlayer.mfunsPlayer-hide-controller .mfunsPlayer-controller-mask {\n    opacity: 0;\n    transform: translateY(100%); }\n  .mfunsPlayer.mfunsPlayer-hide-controller .mfunsPlayer-video-wrap {\n    cursor: none; }\n  .mfunsPlayer.mfunsPlayer-hide-controller .mfunsPlayer-headBar {\n    opacity: 0;\n    transform: translateY(-100%); }\n  .mfunsPlayer.mfunsPlayer-show-controller .mfunsPlayer-controller-mask {\n    opacity: 1; }\n\n.advanceDanmaku_box {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 999; }\n\n.advanceDanmaku_pre_box {\n  z-index: 1000;\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.mfunsPlayer-video-wrap {\n  width: 100%;\n  height: calc(100% - 50px);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #000;\n  background-size: 100% 100%;\n  position: relative;\n  z-index: 103;\n  overflow: hidden; }\n  .mfunsPlayer-video-wrap .mfunsPlayer-mask {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 105;\n    display: none; }\n    .mfunsPlayer-video-wrap .mfunsPlayer-mask.mfunsPlayer-mask-show {\n      display: block; }\n  .mfunsPlayer-video-wrap .mfunsPlayer-loading {\n    width: 80px;\n    height: 70px;\n    border-radius: 4px;\n    text-align: center;\n    font-weight: 600;\n    font-size: 15px;\n    background: rgba(255, 255, 255, 0.8);\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    margin: auto;\n    display: none;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    z-index: 999;\n    cursor: default; }\n    .mfunsPlayer-video-wrap .mfunsPlayer-loading.show {\n      display: flex; }\n    .mfunsPlayer-video-wrap .mfunsPlayer-loading div {\n      width: 30px;\n      height: 30px;\n      background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n      background-size: 100% 100%; }\n  .mfunsPlayer-video-wrap .mfunsPlayer-video-mask {\n    width: 100%;\n    height: calc(100% - 100px);\n    position: relative;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 9;\n    background: #000; }\n    .mfunsPlayer-video-wrap .mfunsPlayer-video-mask video {\n      display: block;\n      width: 100%;\n      max-height: 100%; }\n  .mfunsPlayer-video-wrap .mfunsPlayer-notice {\n    padding: 0 5px;\n    height: 30px;\n    line-height: 30px;\n    text-align: center;\n    font-size: 15px;\n    background: #000;\n    color: #fff;\n    position: absolute;\n    border-radius: 4px;\n    left: 20px;\n    bottom: 55px;\n    z-index: 99999;\n    white-space: pre; }\n\n.voice {\n  width: 120px;\n  height: 60px;\n  border-radius: 4px;\n  line-height: 60px;\n  text-align: center;\n  font-weight: 600;\n  font-size: 18px;\n  background: rgba(255, 255, 255, 0.8);\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  margin: auto;\n  display: none;\n  z-index: 999;\n  cursor: default; }\n\n.mfunsPlayer-danmaku {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  font-size: 22px;\n  color: #fff;\n  z-index: 102; }\n\n@media screen and (max-width: 600px) {\n  .mfunsPlayer-danmaku {\n    font-size: 14px; } }\n\n.mfunsPlayer-danmaku-top,\n.mfunsPlayer-danmaku-bottom {\n  position: absolute;\n  width: 100%;\n  text-align: center;\n  visibility: hidden;\n  white-space: pre; }\n\n.mfunsPlayer-danmaku-top.mfunsPlayer-danmaku-move,\n.mfunsPlayer-danmaku-bottom.mfunsPlayer-danmaku-move {\n  will-change: visibility;\n  animation: danmaku-center 4s linear;\n  animation-play-state: paused; }\n\n.mfunsPlayer-danmaku-top.mfunsPlayer-danmaku-move,\n.mfunsPlayer-danmaku-bottom.mfunsPlayer-danmaku-move.mfunsPlayer-danmaku-run {\n  animation-play-state: running; }\n\n.mfunsPlayer-danmaku-item {\n  display: inline-block;\n  pointer-events: none;\n  user-select: none;\n  cursor: default;\n  white-space: pre;\n  font-weight: 600;\n  font-family: SimHei, \"Microsoft JhengHei\", Arial, Helvetica, sans-serif;\n  text-shadow: black 1px 0px 1px, black 0px 1px 1px, black 0px -1px 1px, black -1px 0px 1px; }\n\n.mfunsPlayer-danmaku--demo {\n  position: absolute;\n  visibility: hidden; }\n\n.mfunsPlayer-danmaku-right {\n  position: absolute;\n  right: 0;\n  white-space: pre;\n  transform: translateX(100%); }\n  .mfunsPlayer-danmaku-right.mfunsPlayer-danmaku-move {\n    will-change: transform;\n    animation: danmaku 5s linear; }\n    .mfunsPlayer-danmaku-right.mfunsPlayer-danmaku-move.low {\n      animation: danmaku 7.5s linear; }\n    .mfunsPlayer-danmaku-right.mfunsPlayer-danmaku-move.lowest {\n      animation: danmaku 10s linear; }\n    .mfunsPlayer-danmaku-right.mfunsPlayer-danmaku-move.fast {\n      animation: danmaku 3s linear; }\n    .mfunsPlayer-danmaku-right.mfunsPlayer-danmaku-move.fastest {\n      animation: danmaku 2s linear; }\n\n@keyframes danmaku {\n  from {\n    transform: translateX(100%); } }\n\n@keyframes danmaku-center {\n  from {\n    visibility: visible; }\n  to {\n    visibility: visible; } }\n\n.danmakuEditor {\n  width: 180px;\n  height: 150px;\n  background: #333;\n  position: absolute;\n  z-index: 99999;\n  border-radius: 4px;\n  display: none; }\n\n.danmaku_type {\n  overflow: hidden;\n  width: 150px;\n  height: 20px;\n  margin: 20px auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #fff;\n  border-radius: 2px;\n  cursor: pointer; }\n\n.danmaku_type div {\n  width: 50px;\n  height: 20px;\n  line-height: 20px;\n  text-align: center;\n  font-size: 13px;\n  border-right: 1px solid #fff;\n  color: #fff;\n  overflow: hidden; }\n\n.danmaku_type .focus {\n  color: #000;\n  background: #f6f6f6; }\n\n.danmaku_type :last-child {\n  border: none; }\n\n.danmaku_color {\n  width: 85%;\n  height: 80px;\n  margin: 20px auto;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  cursor: pointer; }\n\n.danmaku_color i {\n  width: 20px;\n  height: 20px;\n  margin-right: 8px;\n  background: #fff;\n  border-radius: 50%;\n  border: 2px solid .333; }\n\n.danmaku_color :nth-child(5n) {\n  margin-right: 0; }\n\n.danmaku_color .focus {\n  border: 2px solid #f5f5f5; }\n\n.advanceDanmakuEditor_mask {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 9998;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  display: none; }\n\n.advanceDanmakuEditor {\n  width: 80%;\n  height: 80%;\n  margin: 3% auto;\n  background: #333;\n  border-radius: 2px;\n  position: relative;\n  padding: 2%;\n  border: 1px solid .555;\n  animation: down 0.35s; }\n\n.danmuku_link {\n  height: 30px;\n  margin: 2% 0 0 3%; }\n\n.danmuku_link a {\n  color: #7B7FF7; }\n\n.exit_edit {\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  line-height: 25px;\n  top: 0;\n  right: 0;\n  font-size: 20px;\n  cursor: pointer;\n  color: #fff; }\n\n.exit_edit:hover {\n  color: red; }\n\n.editor_title {\n  width: 100%;\n  height: 30px;\n  line-height: 30px;\n  padding-left: 3%;\n  font-weight: 600;\n  color: #fff; }\n\n#danmaku_code {\n  width: 94%;\n  height: 78%;\n  border: 1px solid .000;\n  margin: 0 auto; }\n\n.editor_footer {\n  width: 94%;\n  margin: 1% auto; }\n\n/* .btn_box{\r\n\twidth: 40%;\r\n\theight: 20px;\r\n} */\n.editor_btn {\n  margin-left: 10px;\n  width: 40px;\n  height: 20px;\n  float: right;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 14px;\n  color: #fff;\n  border-radius: 3px;\n  cursor: pointer; }\n\n.editor_clear {\n  background: #EB2626; }\n\n.editor_preview {\n  background: #74D064; }\n\n.editor_emit {\n  background: #7B7FF7; }\n\n.mfunsPlayer-bar-wrap {\n  z-index: 5;\n  width: calc(100% - 30px);\n  height: 3px;\n  padding: 5px 0;\n  position: absolute;\n  top: 0;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  box-sizing: border-box; }\n\n.mfunsPlayer-bar {\n  width: 100%;\n  height: 3px;\n  background: rgba(255, 255, 255, 0.2);\n  position: relative; }\n\n.mfunsPlayer-barTime {\n  position: absolute;\n  top: -30px;\n  border-radius: 2px;\n  padding: 4px 6px;\n  background-color: rgba(0, 0, 0, 0.62);\n  color: #fff;\n  font-size: 12px;\n  text-align: center;\n  opacity: 1;\n  /* transition: opacity .1s ease-in-out; */\n  word-wrap: normal;\n  word-break: normal;\n  z-index: 2;\n  pointer-events: none; }\n  .mfunsPlayer-barTime::after {\n    content: '';\n    display: block;\n    position: absolute;\n    bottom: -10px;\n    left: 50%;\n    transform: translateX(-50%);\n    border: 4px solid;\n    border-color: #7b7ff7 transparent transparent transparent; }\n\n.mfunsPlayer-barTime.hidden {\n  opacity: 0; }\n\n.mfunsPlayer-preview {\n  position: absolute; }\n\n.mfunsPlayer-thumb {\n  width: 11px;\n  height: 11px;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n  border-radius: 50%;\n  background-size: 100% 100%;\n  position: absolute;\n  top: -4px;\n  right: 5px;\n  margin-right: -10px;\n  transition: all .3s ease-in-out;\n  transform: scale(1);\n  cursor: pointer;\n  z-index: 8; }\n  .mfunsPlayer-thumb.hidden {\n    transform: scale(0); }\n\n.mfunsPlayer-bufferedBar {\n  position: absolute;\n  left: 0;\n  top: 0;\n  background: rgba(255, 255, 255, 0.3);\n  width: 0;\n  height: 100%; }\n\n.mfunsPlayer-playedBar {\n  position: absolute;\n  left: 0;\n  top: 0;\n  background: #369;\n  width: 0;\n  height: 100%; }\n\n.mfunsPlayer-menu {\n  position: absolute;\n  width: 170px;\n  border-radius: 2px;\n  background: rgba(28, 28, 28, 0.85);\n  padding: 5px 0;\n  overflow: hidden;\n  z-index: 10;\n  display: none; }\n\n.mfunsPlayer-menu.mfunsPlayer-menu-show {\n  display: block; }\n\n.mfunsPlayer-menu-item {\n  height: 30px;\n  box-sizing: border-box;\n  cursor: pointer; }\n\n.mfunsPlayer-menu-item :hover {\n  background-color: rgba(255, 255, 255, 0.1); }\n\n.mfunsPlayer-menu-item > a {\n  text-decoration: none;\n  display: inline-block;\n  padding: 0 10px;\n  line-height: 30px;\n  color: #eee;\n  font-size: 13px;\n  font-weight: 600;\n  display: inline-block;\n  vertical-align: middle;\n  width: 100%;\n  box-sizing: border-box;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden; }\n\n.mfunsPlayer-footBar {\n  height: 40px;\n  width: 100%;\n  display: flex;\n  position: relative;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 15px;\n  background-color: #fff;\n  box-sizing: border-box; }\n  .mfunsPlayer-footBar .mfunsPlayer-video-danmaku-details {\n    font-size: 13px;\n    padding-right: 5px; }\n    .mfunsPlayer-footBar .mfunsPlayer-video-danmaku-details .mfunsPlayer-video-danmaku-count {\n      color: #666; }\n\n.mfunsPlayer-video-wrap:-webkit-full-screen, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen {\n  width: 100%;\n  height: 100%;\n  background: #000;\n  position: fixed;\n  z-index: 100000;\n  left: 0;\n  top: 0;\n  margin: 0;\n  padding: 0;\n  transform: translate(0, 0); }\n  .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-notice, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-notice {\n    bottom: 80px; }\n  .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-video-mask, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-video-mask {\n    height: 100%; }\n  .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-bezel, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-bezel {\n    margin-top: -30px; }\n  .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root {\n    width: 40%;\n    height: 30px;\n    position: absolute;\n    left: 50%;\n    transform: translateX(-50%); }\n    .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .input_box, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .input_box {\n      border: none;\n      border-radius: 2px; }\n    .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-button, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-button {\n      padding: 0 5px; }\n    .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-style .icon-text, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-style .icon-text {\n      color: #f5f5f5; }\n      .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-style .icon-text:hover, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-style .icon-text:hover {\n        color: #9c9ffb; }\n    .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-settings .icon-danmaku-settings, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-controller-danmaku-settings .icon-danmaku-settings {\n      color: #f5f5f5; }\n    .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-danmaku-text, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-danmaku-text {\n      border: none;\n      color: #f5f5f5; }\n      .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-danmaku-text::-webkit-input-placeholder, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .mfunsPlayer-danmaku-text::-webkit-input-placeholder {\n        color: #fff; }\n    .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .emit, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-video-danmaku-root .emit {\n      height: 100%;\n      border-radius: 0 2px 2px 0; }\n  .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-controller, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-controller {\n    height: 60px; }\n    .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-video-danmaku-root, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-video-danmaku-root {\n      display: flex; }\n    .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-left {\n      width: auto;\n      padding-right: 16px; }\n    .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-fullscreen .icon-fullscreen, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-fullscreen .icon-fullscreen {\n      display: none; }\n    .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-fullscreen .icon-fullscreen-exit, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-wrap .mfunsPlayer-controller-right .mfunsPlayer-controller-fullscreen .icon-fullscreen-exit {\n      display: block; }\n  .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-danmaku .mfunsPlayer-danmaku-top.mfunsPlayer-danmaku-move, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-danmaku .mfunsPlayer-danmaku-top.mfunsPlayer-danmaku-move,\n  .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-danmaku .mfunsPlayer-danmaku-bottom.mfunsPlayer-danmaku-move,\n  .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-danmaku .mfunsPlayer-danmaku-bottom.mfunsPlayer-danmaku-move {\n    animation: danmaku-center 5s linear;\n    animation-play-state: inherit; }\n  .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-danmaku .mfunsPlayer-danmaku-right.mfunsPlayer-danmaku-move, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-danmaku .mfunsPlayer-danmaku-right.mfunsPlayer-danmaku-move {\n    animation: danmaku 8s linear;\n    animation-play-state: inherit; }\n  .mfunsPlayer-video-wrap:-webkit-full-screen .mfunsPlayer-controller-button, .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-button {\n    padding: 0 10px; }\n\n.mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen {\n  position: fixed;\n  z-index: 100000;\n  left: 0;\n  top: 0;\n  width: 100% !important;\n  height: 100% !important; }\n  .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-controller {\n    height: 60px; }\n    .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-right .mfunsPlayer-controller-webfull .icon-web-fullscreen {\n      display: none; }\n    .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-right .mfunsPlayer-controller-webfull .icon-web-fullscreen-exit {\n      display: block; }\n    .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-fullscreen .icon-fullscreen {\n      display: block !important; }\n    .mfunsPlayer-video-wrap.mfunsPlayer-web-fullscreen .mfunsPlayer-controller-mask .mfunsPlayer-controller .mfunsPlayer-controller-fullscreen .icon-fullscreen-exit {\n      display: none !important; }\n\n.mfunsPlayer .mfunsPlayer-slider .slider-track {\n  width: 2px;\n  height: 2px;\n  border-radius: 1px;\n  background: #e5e9ef;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: center;\n  cursor: pointer; }\n\n.mfunsPlayer .mfunsPlayer-slider .slider-bar {\n  background: #7b7ff7;\n  border-radius: 2px;\n  cursor: pointer; }\n\n.mfunsPlayer .mfunsPlayer-slider .slider-thumb-track {\n  position: relative;\n  width: calc(100% - 12px);\n  height: calc(100% - 12px); }\n\n.mfunsPlayer .mfunsPlayer-slider .slider-thumb {\n  width: 12px;\n  height: 12px;\n  border-radius: 100%;\n  background: #7b7ff7;\n  z-index: 2; }\n\n.mfunsPlayer .mfunsPlayer-picker .picker-item {\n  display: inline-block;\n  padding: 0 5px;\n  height: 20px;\n  line-height: 20px;\n  border-radius: 2px;\n  border: transparent solid 1px;\n  transition: color .2s;\n  cursor: pointer; }\n  .mfunsPlayer .mfunsPlayer-picker .picker-item.picked {\n    border: transparent solid 1px;\n    border-color: #7b7ff7;\n    color: #7b7ff7; }\n  .mfunsPlayer .mfunsPlayer-picker .picker-item:hover {\n    color: #9c9ffb; }\n  .mfunsPlayer .mfunsPlayer-picker .picker-item:active {\n    color: #7b7ff7; }\n\n.mfunsPlayer .mfunsPlayer-switch {\n  height: 22px; }\n  .mfunsPlayer .mfunsPlayer-switch .mfunsPlayer-switch-checkbox {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    margin: 4px 0;\n    width: 13px;\n    height: 13px;\n    border-radius: 2px;\n    border: solid;\n    border-width: 1px;\n    border-color: #FFFFFFA0;\n    box-sizing: border-box;\n    transition: all .2s; }\n  .mfunsPlayer .mfunsPlayer-switch .mfunsPlayer-switch-label {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    line-height: 22px;\n    margin: 0 2px;\n    transition: all .2s; }\n  .mfunsPlayer .mfunsPlayer-switch:hover .mfunsPlayer-switch-checkbox {\n    border-color: #9c9ffb; }\n  .mfunsPlayer .mfunsPlayer-switch:hover .mfunsPlayer-switch-label {\n    color: #9c9ffb; }\n  .mfunsPlayer .mfunsPlayer-switch:active .mfunsPlayer-switch-checkbox {\n    border-color: #7b7ff7; }\n  .mfunsPlayer .mfunsPlayer-switch:active .mfunsPlayer-switch-label {\n    color: #7b7ff7; }\n  .mfunsPlayer .mfunsPlayer-switch.switch-on .mfunsPlayer-switch-checkbox {\n    background-color: #7b7ff7;\n    border-color: #7b7ff7;\n    background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+DQogICAgPHBvbHlnb24gcG9pbnRzPSI0MCA3LjkyOSAyMCAyNy45MjkgMTAgMTcuOTI5IDIuOTI5IDI1IDIwIDQyLjA3MSA0Ny4wNzEgMTUgNDAgNy45MjkiIGZpbGw9IiNGRkYiLz4NCjwvc3ZnPg==\");\n    background-repeat: no-repeat;\n    background-size: contain; }\n\n.mfunsPlayer .mfunsPlayer-input {\n  height: 20px;\n  line-height: 20px;\n  padding: 0 4px;\n  border: 1px solid #C0C0C0;\n  background-color: transparent;\n  font-size: 12px;\n  color: #404040;\n  border-radius: 2px;\n  outline: none; }\n\n.mfunsPlayer .mfunsPlayer-controller-panel .mfunsPlayer-input, .mfunsPlayer .mfunsPlayer-controller .mfunsPlayer-input {\n  border-color: #FFFFFFA0;\n  color: #FFFFFFE0; }\n\n.mfunsPlayer-danmaku-auxiliary {\n  font-size: 12px; }\n  .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel {\n    height: 100%; }\n    .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .mfunsPlayer-danmaku-list-head, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .list-row {\n      line-height: 24px;\n      height: 24px;\n      white-space: nowrap; }\n    .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .list-column, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .list-cell {\n      display: inline-block;\n      height: 100%;\n      padding: 0 4px;\n      overflow: hidden; }\n      .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .list-column.col-time, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .list-cell.col-time {\n        padding-left: 8px;\n        width: 40px; }\n      .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .list-column.col-date, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .list-cell.col-date {\n        padding-right: 8px;\n        width: 90px; }\n      .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .list-column.col-text, .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .list-cell.col-text {\n        width: calc(100% - 162px);\n        text-overflow: ellipsis;\n        white-space: overflow; }\n    .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .mfunsPlayer-danmaku-list-wrap {\n      position: relative;\n      overflow: hidden;\n      width: 100%;\n      height: calc(100% - 40px); }\n      .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .mfunsPlayer-danmaku-list-wrap .mfunsPlayer-danmaku-list-container {\n        overflow: hidden;\n        position: absolute;\n        overflow-y: auto;\n        scrollbar-width: thin;\n        top: 24px;\n        left: 0;\n        width: 100%;\n        height: calc(100% - 24px); }\n        .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .mfunsPlayer-danmaku-list-wrap .mfunsPlayer-danmaku-list-container::-webkit-scrollbar {\n          width: 5px; }\n        .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .mfunsPlayer-danmaku-list-wrap .mfunsPlayer-danmaku-list-container::-webkit-scrollbar-thumb {\n          background-color: #808080; }\n      .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .mfunsPlayer-danmaku-list-wrap .mfunsPlayer-danmaku-list-status {\n        position: absolute;\n        top: 50%;\n        width: 100%; }\n        .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .mfunsPlayer-danmaku-list-wrap .mfunsPlayer-danmaku-list-status div {\n          text-align: center;\n          display: none;\n          color: #808080; }\n        .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .mfunsPlayer-danmaku-list-wrap .mfunsPlayer-danmaku-list-status.status-loading .status-loading-text {\n          display: block; }\n        .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .mfunsPlayer-danmaku-list-wrap .mfunsPlayer-danmaku-list-status.status-failed .status-failed-text {\n          display: block; }\n        .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-list-panel .mfunsPlayer-danmaku-list-wrap .mfunsPlayer-danmaku-list-status.status-empty .status-empty-text {\n          display: block; }\n  .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-ade-panel {\n    height: 100%; }\n    .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-ade-panel .mfunsPlayer-ade-wrap {\n      height: calc(100% - 40px);\n      padding: 0 8px; }\n    .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-ade-panel .mfunsPlayer-ade-head {\n      height: 30px;\n      line-height: 30px;\n      font-weight: bold; }\n    .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-ade-panel .mfunsPlayer-ade-prebox {\n      height: calc(100% - 70px);\n      border: 1px solid #C0C0C0;\n      border-radius: 2px; }\n    .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-ade-panel .mfunsPlayer-ade-foot {\n      margin-top: 6px;\n      height: 24px;\n      user-select: none; }\n      .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-ade-panel .mfunsPlayer-ade-foot .mfunsPlayer-ade-button {\n        cursor: pointer;\n        height: 22px;\n        line-height: 22px;\n        padding: 0 5px;\n        display: inline-block;\n        border-radius: 2px;\n        border: 1px solid #808080;\n        color: #808080; }\n      .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-ade-panel .mfunsPlayer-ade-foot .mfunsPlayer-ade-emit {\n        border: 1px solid #7b7ff7;\n        color: #7b7ff7; }\n  .mfunsPlayer-danmaku-auxiliary .mfunsPlayer-danmaku-auxiliary-foot {\n    display: flex;\n    align-items: center;\n    height: 40px;\n    justify-content: space-between;\n    box-sizing: border-box;\n    border-top: 1px solid #e7e7e7;\n    padding: 0 8px;\n    color: #808080; }\n\n@font-face {\n  font-family: 'mfunsPlayerIcon';\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") format(\"embedded-opentype\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format(\"truetype\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format(\"woff\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + ") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n  font-display: block; }\n\n[class^=\"icon-\"], [class*=\" icon-\"] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'mfunsPlayerIcon' !important;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.icon-play:before {\n  content: \"\\e900\"; }\n\n.icon-pause:before {\n  content: \"\\e901\"; }\n\n.icon-prev:before {\n  content: \"\\e902\"; }\n\n.icon-next:before {\n  content: \"\\e903\"; }\n\n.icon-repeat:before {\n  content: \"\\e904\"; }\n\n.icon-repeat-off:before {\n  content: \"\\e905\"; }\n\n.icon-volume-off:before {\n  content: \"\\e90c\"; }\n\n.icon-volume:before {\n  content: \"\\e90f\"; }\n\n.icon-widescreen:before {\n  content: \"\\e910\"; }\n\n.icon-widescreen-exit:before {\n  content: \"\\e911\"; }\n\n.icon-web-fullscreen:before {\n  content: \"\\e912\"; }\n\n.icon-web-fullscreen-exit:before {\n  content: \"\\e913\"; }\n\n.icon-picture-in-picture:before {\n  content: \"\\e914\"; }\n\n.icon-picture-in-picture-exit:before {\n  content: \"\\e915\"; }\n\n.icon-fullscreen:before {\n  content: \"\\e91e\"; }\n\n.icon-fullscreen-exit:before {\n  content: \"\\e91f\"; }\n\n.icon-danmaku:before {\n  content: \"\\e920\"; }\n\n.icon-danmaku-off:before {\n  content: \"\\e921\"; }\n\n.icon-danmaku-settings:before {\n  content: \"\\e923\"; }\n\n.icon-advanced-danmaku:before {\n  content: \"\\e928\"; }\n\n.icon-text:before {\n  content: \"\\e92a\"; }\n\n.icon-send-danmaku:before {\n  content: \"\\e92f\"; }\n\n.icon-settings:before {\n  content: \"\\e930\"; }\n\n.icon-caption:before {\n  content: \"\\e931\"; }\n\n.icon-left-arrow:before {\n  content: \"\\e940\"; }\n\n.icon-right-arrow:before {\n  content: \"\\e941\"; }\n\n.icon-close:before {\n  content: \"\\e945\"; }\n\n@keyframes close {\n  from {\n    margin-left: 12px; }\n  to {\n    margin-left: 2px; } }\n\n@keyframes open {\n  from {\n    margin-left: 2px; }\n  to {\n    margin-left: 12px; } }\n\n@keyframes expand {\n  from {\n    right: -40%; }\n  to {\n    right: 0; } }\n\n@keyframes retract {\n  from {\n    right: 0; }\n  to {\n    right: -40%; } }\n\n@keyframes down {\n  from {\n    margin-top: -5%;\n    opacity: 0; }\n  to {\n    margin-top: 3%;\n    opacity: 1; } }\n\n@keyframes up {\n  from {\n    margin-top: 3%;\n    opacity: 1; }\n  to {\n    margin-top: -5%;\n    opacity: 0; } }\n", "",{"version":3,"sources":["webpack://./src/css/controller.scss","webpack://./src/css/theme.scss","webpack://./src/css/player.scss","webpack://./src/css/video.scss","webpack://./src/css/danmaku.scss","webpack://./src/css/editor.css","webpack://./src/css/index.scss","webpack://./src/css/loader.scss","webpack://./src/css/menu.scss","webpack://./src/css/footBar.scss","webpack://./src/css/fullscreen.scss","webpack://./src/css/components.scss","webpack://./src/css/danmakuAuxiliary.scss","webpack://./src/css/font-icon.css"],"names":[],"mappings":"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","sourcesContent":["@import './theme';\r\n\r\n.mfunsPlayer-controller-mask{\r\n\twidth: 100%;\r\n\theight: 100px;\r\n\tposition: absolute;\r\n\tbottom: 0;\r\n\tbackground: url(\"../icon/mask.png\") repeat-x bottom;\r\n\ttransition: all .3s ease-in-out;\r\n\t\r\n\tz-index: 103;\r\n\t&.hide{\r\n\t   opacity: 0;\r\n\t}\r\n\r\n\t.mfunsPlayer-bezel {\r\n\t\tfloat:right;\r\n\t\tmargin-top: -10px;\r\n\t\tmargin-right: 20px;\r\n\t\twidth: 65px;\r\n\t\theight: 55px;\r\n\t\tcursor: pointer;\r\n\t\tbackground: url(../icon/pause.png);\r\n\t\tbackground-size: 100% 100%;\r\n\t\tz-index: 1000;\r\n\t\t&.bezel_play {\r\n\t\t\tbackground: url(../icon/play.png); \r\n\t\t\tbackground-size: 100% 100%;\r\n\t\t}\r\n\t}\r\n\t.mfunsPlayer-controller {\r\n\t\theight: 45px;\r\n\t\tposition: absolute;\r\n\t\tbottom: 0;\r\n\t\tleft: 0;\r\n\t\tright: 0;\r\n\t\tpadding: 0 15px;\r\n\t\tz-index: 11;\r\n\t\tcolor: #fff;\r\n\t\t&.hide{\r\n\t\t\tdisplay: none;\r\n\t\t}\r\n\r\n\t\t.mfunsPlayer-controller-button {\r\n\t\t\tpadding: 0 7px;\r\n\t\t\tcolor: #fff;\r\n\t\t}\r\n        \r\n\t\t.mfunsPlayer-controller-wrap {\r\n\t\t\theight: calc(100% - 15px);\r\n\t\t\t//line-height: calc(100% - 15px);\r\n\t\t\tposition: relative;\r\n\t\t\tmargin: 10px 0 5px;\r\n\t\t\tdisplay: flex;\r\n\t\t\tjustify-content: space-between;\r\n\t\t\talign-items: center;\r\n\t\t\tz-index: 10;\r\n\t\t    .mfunsPlayer-controller-tip{\r\n\t\t\t\tposition: absolute;\r\n\t\t\t\tbottom: 140%;\r\n\t\t\t\tpadding:2px 4px;\r\n\t\t\t\tmax-width: 70px;\r\n\t\t\t\twhite-space: nowrap;\r\n\t\t\t\theight: 20px;\r\n\t\t\t\tline-height: 20px;\r\n\t\t\t\tbackground: rgba(28, 28, 28, 0.9);\r\n\t\t\t\ttransition: all .2s ease-in-out;\r\n\t\t\t\ttransform: scale(0);\r\n\t\t\t\tborder-radius: $theme-border-radius;\r\n\t\t\t\tfont-size: 10px;\r\n\t\t\t\topacity: 0;\r\n\t\t\t\tz-index: 1001;\r\n\t\t\t}\r\n\t\t\t.mfunsPlayer-controller-button:hover{\r\n\t\t\t\t.mfunsPlayer-controller-tip{\r\n\t\t\t\t\ttransform: scale(1);\r\n\t\t\t\t\topacity: 1;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\t.mfunsPlayer-controller-left {\r\n\t\t\t\tmax-width:200px ;\r\n\t\t\t\tdisplay: flex;\r\n\t\t\t\talign-items: center;\r\n\t\t\t\t.mfunsPlayer-controller-play {\r\n\t\t\t\t\t.icon-play {\r\n\t\t\t\t\t\tdisplay: none;\r\n\t\t\t\t\t}\r\n\t\t\t\t\t&.button-paused {\r\n\t\t\t\t\t\t.icon-play {\r\n\t\t\t\t\t\t\tdisplay: block;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t.icon-pause {\r\n\t\t\t\t\t\t\tdisplay: none;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\t.mfunsPlayer-controller-next{\r\n\t\t\t\t\t.icon-next {\r\n\t\t\t\t\t\tfont-size: 16px;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\t.mfunsPlayer-controller-time {\r\n\t\t\t\t\twidth: 90px;\r\n\t\t\t\t\ttext-align: center;\r\n\t\t\t\t\tfont-size: 13px;\r\n\t\t\t\t\tmargin: 0 5px;\r\n\t\t\t\t\t.mfunsPlayer-controller-time-input{\r\n\t\t\t\t\t\tdisplay: none;\r\n\t\t\t\t\t\twidth: 60px;\r\n\t\t\t\t\t\tmargin: auto;\r\n\t\t\t\t\t\tfont-size: 13px;\r\n\t\t\t\t\t\ttext-align: center;\r\n\t\t\t\t\t}\r\n\t\t\t\t\t.mfunsPlayer-controller-time-label{\r\n\t\t\t\t\t\twidth: 100%;\r\n\t\t\t\t\t\twhite-space:nowrap;\r\n\t\t\t\t\t\ttext-align: center;\r\n\t\t\t\t\t}\r\n\t\t\t\t\t&.inputting {\r\n\t\t\t\t\t\t.mfunsPlayer-controller-time-input{\r\n\t\t\t\t\t\t\tdisplay: block;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t.mfunsPlayer-controller-time-label{\r\n\t\t\t\t\t\t\tdisplay: none;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\t//洗脑循环\r\n\t\t\t.mfunsPlayer-controller-repeat{\r\n\t\t\t\t.icon-repeat{\r\n\t\t\t\t\tdisplay: none;\r\n\t\t\t\t}\r\n\t\t\t\t&.button-repeat {\r\n\t\t\t\t\t.icon-repeat-off{\r\n\t\t\t\t\t\tdisplay: none;\r\n\t\t\t\t\t}\r\n\t\t\t\t\t.icon-repeat{\r\n\t\t\t\t\t\tdisplay: block;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n          \r\n\r\n  //控制器右功能键\r\n\t\t\t\r\n\t\t\t.mfunsPlayer-controller-right {\r\n\t\t\t\theight: 100%;\r\n\t\t\t\tmin-width: 200px;\r\n\t\t\t\tdisplay: flex;\r\n\t\t\t\tjustify-content: flex-end;\r\n\t\t\t\talign-items: center;\r\n\t\t\t\t//选集\r\n                .mfunsPlayer-controller-pagelist{\r\n\t\t\t\t\tcursor: pointer;\r\n\t\t\t\t\t&:hover  {\r\n\t\t\t\t\t\t.mfunsPlayer-pagelist-mask {\r\n\t\t\t\t\t\t\tdisplay: block;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n                    .mfunsPlayer-pagelist-mask {\r\n\t\t\t\t\t\t.mfunsPlayer-pagelist-list {\r\n\t\t\t\t\t\t\tmax-height: 300px;\r\n\t\t\t\t\t\t\toverflow-y: auto;\r\n\t\t\t\t\t\t\tfont-weight: 400;\r\n\t\t\t\t\t\t\tborder-radius: $theme-border-radius;\r\n\t\t\t\t\t\t\tbackground: rgba(28, 28, 28, 0.9);\r\n\t\t\t\t\t\t\tpadding: 5px 0;\r\n\t\t\t\t\t\t\ttransition: all .3s ease-in-out;\r\n\t\t\t\t\t\t\tcolor: #fff;\r\n\t\t\t\t\t\t\t.mfunsPlayer-pagelist-item {\r\n\t\t\t\t\t\t\t\twidth: 320px;\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\twhite-space: nowrap;\r\n\t\t\t\t\t\t\t\ttext-overflow: ellipsis;\r\n\t\t\t\t\t\t\t\toverflow: hidden;\r\n\t\t\t\t\t\t\t\theight: 30px;\r\n\t\t\t\t\t\t\t\tbox-sizing: border-box;\r\n\t\t\t\t\t\t\t\tcursor: pointer;\r\n\t\t\t\t\t\t\t\tline-height: 30px;\r\n\t\t\t\t\t\t\t\tpadding: 0 15px;\r\n\t\t\t\t\t\t\t\t&:hover{\r\n\t\t\t\t\t\t\t\t background-color: rgba(255, 255, 255, .1);\r\n\t\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t\t&.focus{\r\n\t\t\t\t\t\t\t\t\tcolor: $theme-color;\r\n\t\t\t\t\t\t\t\t\tpadding:0 15px 0 30px ;\r\n\t\t\t\t\t\t\t\t\tposition: relative;\r\n\t\t\t\t\t\t\t\t\t&::before{\r\n\t\t\t\t\t\t\t\t\t content: \"\";\r\n\t\t\t\t\t\t\t\t\t position: absolute;\r\n\t\t\t\t\t\t\t\t\t top: 10px;\r\n\t\t\t\t\t\t\t\t\t left: 15px;\r\n\t\t\t\t\t\t\t\t\t border-color: transparent transparent transparent $theme-color;\r\n\t\t\t\t\t\t\t\t\t border-style: solid;\r\n\t\t\t\t\t\t\t\t\t border-width: 5px 8px;\t\r\n\t\t\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t    }\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\r\n\t\t\t\t//倍速\r\n                .mfunsPlayer-controller-speed {\r\n\t\t\t\t\twidth: 40px;\r\n\t\t\t\t\t&:hover{\r\n\t\t\t\t\t  .mfunsPlayer-speed-mask  {\r\n\t\t\t\t\t\tdisplay: block;\r\n\t\t\t\t\t }\r\n\t\t\t\t\t}\r\n                    .mfunsPlayer-speed-mask {\r\n\t\t\t\t\t\t// 浮动面板通用样式已移动\r\n\t\t\t\t\t\t// .mfunsPlayer-controller-panel-mask\r\n                        .mfunsPlayer-speed-list {\r\n\t\t\t\t\t\t\tfont-weight: 400;\r\n\t\t\t\t\t\t\twidth: 80px;\r\n\t\t\t\t\t\t\t.mfunsPlayer-speed-item {\r\n\t\t\t\t\t\t\t\theight: 30px;\r\n\t\t\t\t\t\t\t\tbox-sizing: border-box;\r\n\t\t\t\t\t\t\t\ttext-align: center;\r\n\t\t\t\t\t\t\t\tcursor: pointer;\r\n\t\t\t\t\t\t\t\tline-height: 30px;\r\n\t\t\t\t\t\t\t\t&.focus{\r\n\t\t\t\t\t\t\t\t\tcolor: $theme-color;\r\n\t\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t\t&:hover {\r\n\t\t\t\t\t\t\t\t\tbackground-color: rgba(255, 255, 255, .1);\r\n\t\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\t//音量\r\n\t\t\t\t.mfunsPlayer-controller-volume{\r\n\t\t\t\t\t&:hover{\r\n\t\t\t\t\t\t.mfunsPlayer-controller-volume-mask{\r\n\t\t\t\t\t\t\tdisplay: block;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t\t.mfunsPlayer-controller-volume-icon{\r\n\t\t\t\t\t\t.icon-volume-off {\r\n\t\t\t\t\t\t\tdisplay: none;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t&.button-volume-off {\r\n\t\t\t\t\t\t\t.icon-volume-off {\r\n\t\t\t\t\t\t\t\tdisplay: block;\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t.icon-volume {\r\n\t\t\t\t\t\t\t\tdisplay: none;\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t\t.mfunsPlayer-controller-volume-mask{\r\n\t\t\t\t\t\t// 浮动面板通用样式已移动\r\n\t\t\t\t\t\t// .mfunsPlayer-controller-panel-mask\r\n\t\t\t\t\t\t.mfunsPlayer-controller-volume-wrap{\r\n\t\t\t\t\t\t\twidth: 32px;\r\n\t\t\t\t\t\t\theight: 100px;\r\n\t\t\t\t\t\t\t.mfunsPlayer-controller-volume-num{\r\n\t\t\t\t\t\t\t\tcolor: #e5e9ef;\r\n\t\t\t\t\t\t\t\twidth: 100%;\r\n\t\t\t\t\t\t\t\ttext-align: center;\r\n\t\t\t\t\t\t\t\tfont-size: 12px;\r\n\t\t\t\t\t\t\t\theight: 28px;\r\n\t\t\t\t\t\t\t\tline-height: 28px;\r\n\t\t\t\t\t\t\t\tmargin-bottom: 2px;\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t.mfunsPlayer-controller-volume-bar{\r\n\t\t\t\t\t\t\t\twidth: 100%;\r\n\t\t\t\t\t\t\t\theight: 60px;\r\n\t\t\t\t\t\t\t\tposition: relative;\r\n\t\t\t\t\t\t\t\tcursor: pointer;\r\n\t\t\t\t\t\t\t\t// .slider-track{\r\n\t\t\t\t\t\t\t\t// \tbackground: #fff;\r\n\t\t\t\t\t\t\t\t// }\r\n\t\t\t\t\t\t\t\t.slider-bar{\r\n\t\t\t\t\t\t\t\t\tbackground: $theme-color;\r\n\t\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t\t.slider-thumb{\r\n\t\t\t\t\t\t\t\t\tbackground: $theme-color;\r\n\t\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n               \r\n\t\t\t\t//设置\r\n\t\t\t\t.mfunsPlayer-controller-settings{\r\n\t\t\t\t\t.mfunsPlayer-settings-mask {\r\n\t\t\t\t\t\t.mfunsPlayer-controller-settings-wrap{\r\n\t\t\t\t\t\t\tfont-size: 12px;\r\n\t\t\t\t\t\t\twidth: 200px;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t.row-title{\r\n\t\t\t\t\t\t\twidth: 60px;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t.mfunsPlayer-picker {\r\n\t\t\t\t\t\t\tdisplay: inline-block;\r\n\t\t\t\t\t\t\t//line-height: 0;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t.mfunsPlayer-switch{\r\n\t\t\t\t\t\t\twidth: 80px;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\r\n\t\t\t\t//画中画\r\n                .mfunsPlayer-controller-pip{\r\n\t\t\t\t\t.icon-picture-in-picture-exit{\r\n\t\t\t\t\t\tdisplay: none;\r\n\t\t\t\t\t}\r\n\t\t\t\t\t&.button-picture-in-picture {\r\n\t\t\t\t\t\t.icon-picture-in-picture{\r\n\t\t\t\t\t\t\tdisplay: none;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t.icon-picture-in-picture-exit{\r\n\t\t\t\t\t\t\tdisplay: block;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n                //网页全屏\r\n\t\t\t\t.mfunsPlayer-controller-webfull{\r\n\t\t\t\t\t&.hide{\r\n                       display: none;\r\n\t\t\t\t\t}\r\n                    .icon-web-fullscreen-exit {\r\n                        display: none;\r\n                    }\r\n\t\t\t\t}\r\n\t\t\t\t//全屏\r\n                .mfunsPlayer-controller-fullscreen{\r\n\t\t\t\t\t.icon-fullscreen-exit {\r\n\t\t\t\t\t\tdisplay: none;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n\r\n\r\n.mfunsPlayer-video-danmaku-root {\r\n\tdisplay: flex;\r\n\tflex-grow:1;\r\n\tjustify-content: space-between;\r\n\talign-items: center;\r\n\tpadding: 2px;\r\n\theight: 100%;\r\n\t.mfunsPlayer-controller-button {\r\n\t\tpadding: 0 5px;\r\n\t}\r\n\t.mfunsPlayer-controller-icon{\r\n\t\tcolor: #999;\r\n\t}\r\n\t.mfunsPlayer-controller-danmaku-trigger {\r\n\t\t.icon-danmaku{\r\n\t\t\tcolor: rgb(66, 226, 244);\r\n\t\t}\r\n\t\t&.open{\r\n\t\t\t.icon-danmaku-off{\r\n\t\t\t\tdisplay: none;\r\n\t\t\t}\r\n\t\t}\r\n\t\t&.close{\r\n\t\t\t.icon-danmaku{\r\n\t\t\t\tdisplay: none;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t\r\n\t\r\n\t.mfunsPlayer-controller-danmaku-settings{\r\n\t\t.mfunsPlayer-danmaku-settings-mask {\r\n\t\t\t.mfunsPlayer-controller-danmaku-settings-wrap{\r\n\t\t\t\tfont-size: 12px;\r\n\t\t\t\twidth: 280px;\r\n\t\t\t}\r\n\t\t\t.row-title{\r\n\t\t\t\twidth: 60px;\r\n\t\t\t}\r\n\t\t\t.row-value{\r\n\t\t\t\twidth: 40px;\r\n\t\t\t\ttext-align: right;\r\n\t\t\t}\r\n\t\t\t.mfunsPlayer-picker {\r\n\t\t\t\tdisplay: inline-block;\r\n\t\t\t\t//line-height: 0;\r\n\t\t\t}\r\n\t\t\t.mfunsPlayer-slider{\r\n\t\t\t\tposition: relative;\r\n\t\t\t\twidth: 160px;\r\n\t\t\t\tcursor: pointer;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t\r\n    .input_box {\r\n\t\tdisplay: flex;\r\n\t\tflex-grow: 1;\r\n\t\talign-items: center;\r\n\t\tposition: relative;\r\n\t\theight: 100%;\r\n\t\tborder-left: 1px solid #e7e7e7;\r\n\t\tmargin-left: 5px;\r\n\t\tbackground: hsla(0,0%,100%,.35);\r\n\t\t.mfunsPlayer-controller-danmaku-style {\r\n\t\t\t&:hover{\r\n\t\t\t\t.mfunsPlayer-danmaku-style-mask {\r\n\t\t\t\t\tdisplay: block;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\t.icon-text {\r\n\t\t\t\t&:hover{\r\n\t\t\t\t\tcolor: $theme-color;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t\t.mfunsPlayer-danmaku-style-mask {\r\n\t\t\t\t.mfunsPlayer-controller-danmaku-style-fulloptions-wrap{\r\n\t\t\t\t\tfont-size: 12px;\r\n\t\t\t\t\twidth: 280px;\r\n\t\t\t\t\t.mfunsPlayer-danmaku-color-picker {\r\n\t\t\t\t\t\twidth: auto;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\t.mfunsPlayer-controller-danmaku-style-wrap{\r\n\t\t\t\t\tfont-size: 12px;\r\n\t\t\t\t\twidth: 180px;\r\n\t\t\t\t\t.mfunsPlayer-danmaku-color-picker {\r\n\t\t\t\t\t\twidth: 120px;\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\t.row-title{\r\n\t\t\t\t\twidth: 40px;\r\n\t\t\t\t}\r\n\t\t\t\t.mfunsPlayer-control-panel-danmaku-style{\r\n\t\t\t\t\ttext-align: left;\r\n\t\t\t\t\theight: 150px;\r\n\t\t\t\t\twidth: 180px;\r\n\t\t\t\t\tpadding-top: 5px;\r\n\t\t\t\t}\r\n\t\t\t\t.mfunsPlayer-danmaku-fontsize-picker, .mfunsPlayer-danmaku-type-picker {\r\n\t\t\t\t\tdisplay: inline-block;\r\n\t\t\t\t\tline-height: 0;\r\n\t\t\t\t}\r\n\t\t\t\t.mfunsPlayer-control-panel-danmaku-style .row-title {\r\n\t\t\t\t\twidth: 40px;\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t\t.mfunsPlayer-danmaku-color-input{\r\n\t\t\t\t\tdisplay: inline-block;\r\n\t\t\t\t\twidth: 60px;\r\n\t\t\t\t}\r\n\t\t\t\t.mfunsPlayer-danmaku-color-preview{\r\n\t\t\t\t\tdisplay: inline-block;\r\n\t\t\t\t\twidth: 36px;\r\n\t\t\t\t\theight: 18px;\r\n\t\t\t\t\tline-height: 20px;\r\n\t\t\t\t\tmargin-left: 5px;\r\n\t\t\t\t\tborder-radius: $theme-border-radius;\r\n\t\t\t\t\tborder: 2px solid #FFFFFFA0;\r\n\t\t\t\t}\r\n\t\t\t\t.mfunsPlayer-danmaku-color-picker{\r\n\t\t\t\t\tmargin: 10px auto 5px;\r\n\t\t\t\t\ttext-align: center;\r\n\t\t\t\t\tline-height: 0;\r\n\t\t\t\t\t.picker-item {\r\n\t\t\t\t\t\tdisplay: inline-block;\r\n\t\t\t\t\t\tmargin-bottom: 4px;\r\n\t\t\t\t\t\twidth: 14px;\r\n\t\t\t\t\t\theight: 14px;\r\n\t\t\t\t\t\tborder-radius: $theme-border-radius;\r\n\t\t\t\t\t\tborder: 2px solid #00000040;\r\n\t\t\t\t\t\tcursor: pointer;\r\n\t\t\t\t\t\t&.picked {\r\n\t\t\t\t\t\t\tborder-color: #FFF;\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\t\r\n\t\t\t}\r\n\t\t}\r\n\t\t\r\n\t\t.mfunsPlayer-danmaku-text {\r\n\t\t\tflex: 5;\r\n\t\t\theight: 100%;\r\n\t\t\toutline: none;\r\n\t\t\tborder: none;\r\n\t\t\tmargin-left: 5px;\r\n\t\t\tcolor: #999;\r\n\t\t\tbackground-color: transparent;\r\n\t\t\tbox-sizing: border-box;\r\n\t\t\t&::-webkit-input-placeholder{\r\n\t\t\t\tcolor: #999;\r\n\t\t\t}\r\n\t\t}\r\n\t\t.emit {\r\n\t\t\twidth: 60px;\r\n\t\t\tdisplay: flex;\r\n\t\t\talign-items: center;\r\n\t\t\tjustify-content: center;\r\n\t\t\theight: 32px;\r\n\t\t\tfont-size: 12px;\r\n\t\t\tcolor: #fff;\r\n\t\t\tbackground: $theme-color;\r\n\t\t\tborder-radius: $theme-border-radius;\r\n\t\t\tcursor: pointer;\r\n\t\t}\r\n    }\r\n    \r\n}\r\n\r\n.mfunsPlayer, .mfunsPlayer-danmaku-auxiliary {\r\n\t.mfunsPlayer-controller-button {\t\t\t// 按钮\r\n\t\tposition: relative;\r\n\t\theight: 30px;\r\n\t\tfont-size: 12px;\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: center;\r\n\t\tcursor: pointer;\r\n\t\t.mfunsPlayer-controller-icon {\r\n\t\t\tfont-size: 21px;\r\n\t\t\tline-height: 30px;\r\n\t\t}\r\n\t\t.mfunsPlayer-controller-label {\r\n\t\t\tfont-size: 14px;\r\n\t\t\tline-height: 30px;\r\n\t\t\tfont-weight: 600;\r\n\t\t}\r\n\t\t&:hover{\r\n\t\t\t.mfunsPlayer-controller-panel-mask {\r\n\t\t\t\tdisplay: block;\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\t.mfunsPlayer-controller-panel-mask {\t\t// 浮动面板遮罩\r\n\t\tposition: absolute;\r\n\t\tpadding-bottom: 15px;\r\n\t\tbottom: 100%;\r\n\t\tleft:50%;\r\n\t\ttransform: translateX(-50%);\r\n\t\tz-index: 200;\r\n\t\tdisplay: none;\r\n\t\t&.show{\r\n\t\t\tdisplay: block;\r\n\t\t}\r\n\t\t&:hover{\r\n\t\t\tdisplay: block;\r\n\t\t}\r\n\t\t.mfunsPlayer-controller-panel {\t\t\t// 浮动面板\r\n\t\t\tcursor: default;\r\n\t\t\toverflow: hidden;\r\n\t\t\tbackground: rgba(21,21,21,.9);\r\n\t\t\tcolor: #FFFFFF;\r\n\t\t\tborder-radius: $theme-border-radius;\r\n\t\t\tfont-size: 13px;\r\n\t\t\t.mfunsPlayer-panel-row{\r\n\t\t\t\tdisplay: flex;\r\n\t\t\t\tmargin: 5px 10px 10px;\r\n\t\t\t\t.row-title{\r\n\t\t\t\t\tcolor: $translucent-light-white;\r\n\t\t\t\t\theight: 22px;\r\n\t\t\t\t\tline-height: 22px;\r\n\t\t\t\t}\r\n\t\t\t\t.row-value{\r\n\t\t\t\t\theight: 22px;\r\n\t\t\t\t\tline-height: 22px;\r\n\t\t\t\t\tcolor: $translucent-white;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n","$theme-color: #7b7ff7;                  // 主题色\n$theme-color-light: #9c9ffb;            // 主题色(浅)\n$translucent-black: #202020A0;          // 半透明黑色(用于面板)\n$text-black: #404040;                   // 黑色(用于文字)\n$text-grey: #808080;                    // 灰色(用于文字)\n$light-grey: #C0C0C0;                   // 灰色(用于淡色)\n$translucent-white: #FFFFFFE0;          // 半透明白色(用于文字)\n$translucent-light-white: #FFFFFFA0;    // 半透明白色(用于淡色)\n$theme-border-radius: 2px;              // 圆角大小",".mfunsPlayer{\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\tposition: relative;\r\n\tbox-sizing: content-box;\r\n    // overflow: hidden;\r\n    line-height: 1;\r\n    \r\n    \r\n    &.mfunsPlayer-playing {\r\n        .mfunsPlayer-danmaku .mfunsPlayer-danmaku-move {\r\n            animation-play-state: running;\r\n        }\r\n    }\r\n    &.mfunsPlayer-loading,\r\n    &.mfunsPlayer-paused {\r\n        .mfunsPlayer-danmaku,\r\n        .mfunsPlayer-danmaku-move {\r\n            animation-play-state: paused !important;\r\n        }\r\n    }\r\n    &.mfunsPlayer-web-fullscreen-fix {\r\n        position: fixed;\r\n        top: 0;\r\n        left: 0;\r\n        margin: 0;\r\n        padding: 0;\r\n    }\r\n    .mfunsPlayer-headBar{\r\n        width:100% ;\r\n        height: 100px;\r\n        line-height: 50px;\r\n        position: absolute;\r\n        top: 0;\r\n        left: 0;\r\n        color:#fff;\r\n        display: flex;\r\n        padding: 0 20px;\r\n        background: url(\"../icon/mask.png\") repeat-x top;\r\n        transition: all .3s ease-in-out;\r\n        z-index: 103;\r\n        &.hide{\r\n            opacity: 0;\r\n        }\r\n        .mfunsPlayer-headBar-title{\r\n            width: calc(100% - 40px);\r\n            height: 50px;\r\n            line-height: 50px;\r\n            overflow: hidden;\r\n            white-space: nowrap;\r\n            text-overflow: ellipsis;\r\n        }\r\n    }\r\n    &.mfunsPlayer-hide-controller {\r\n        .mfunsPlayer-controller-mask {\r\n            opacity: 0;\r\n            transform: translateY(100%);\r\n        }\r\n        .mfunsPlayer-video-wrap{\r\n            cursor: none;\r\n        }\r\n        .mfunsPlayer-headBar{\r\n            opacity: 0;\r\n            transform: translateY(-100%);\r\n        }\r\n    }\r\n    &.mfunsPlayer-show-controller {\r\n        .mfunsPlayer-controller-mask {\r\n            opacity: 1;\r\n        }\r\n    }   \r\n}\r\n\r\n.advanceDanmaku_box{\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tz-index: 999;\r\n}\r\n.advanceDanmaku_pre_box{\r\n\tz-index: 1000;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n}\r\n","\r\n\r\n.mfunsPlayer-video-wrap {\r\n\twidth: 100%;\r\n\theight:calc(100% - 50px) ;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\tbackground: #000;\r\n\tbackground-size: 100% 100%;\r\n\tposition: relative;\r\n\tz-index: 103;\r\n\toverflow: hidden;\r\n    \r\n\t.mfunsPlayer-mask {\r\n\t\tposition: absolute;\r\n\t\ttop: 0;\r\n\t\tbottom: 0;\r\n\t\tleft: 0;\r\n\t\tright: 0;\r\n\t\tz-index: 105;\r\n\t\tdisplay: none;\r\n\t\t&.mfunsPlayer-mask-show{\r\n\t\t display: block;\r\n\t\t}\r\n\t}\r\n\t.mfunsPlayer-loading {\r\n\t\twidth: 80px;\r\n\t\theight: 70px;\r\n\t\tborder-radius: 4px;\r\n\t\ttext-align: center;\r\n\t\tfont-weight: 600;\r\n\t\tfont-size: 15px;\r\n\t\tbackground: rgba(255, 255, 255, 0.8);\r\n\t\tposition: absolute;\r\n\t\tleft: 50%;\r\n\t\ttop: 50%;\r\n\t\ttransform: translate(-50%, -50%);\r\n\t\tmargin: auto;\r\n\t\tdisplay: none;\r\n\t\tflex-direction: column;\r\n\t\tjustify-content: center;\r\n\t\talign-items: center;\r\n\t\tz-index: 999;\r\n\t\tcursor: default;\r\n\t\t&.show{\r\n\t\tdisplay: flex;\r\n\t\t}\r\n\t\tdiv {\r\n\t\t\twidth: 30px;\r\n\t\t\theight: 30px;\r\n\t\t\tbackground: url(../icon/loading.gif);\r\n\t\t\tbackground-size: 100% 100%;\r\n\t\t}\r\n\t\t\r\n\t}\r\n\t.mfunsPlayer-video-mask{\r\n\t\twidth: 100%;\r\n\t\theight:calc(100% - 100px) ;\r\n\t\tposition:relative;\r\n\t\tdisplay: flex;\r\n\t\tjustify-content: center;\r\n\t\talign-items: center;\r\n\t\tz-index: 9;\r\n\t\tbackground: #000;\r\n\t\tvideo{\r\n\t\t\tdisplay: block;\r\n\t\t\twidth: 100%;\r\n\t\t\tmax-height: 100%;\r\n\t\t}\r\n\t\r\n\t\t\r\n\t\t\r\n\t\t\r\n\t}\r\n    .mfunsPlayer-notice {\r\n\t\tpadding: 0 5px;\r\n\t\theight: 30px;\r\n\t\tline-height: 30px;\r\n\t\ttext-align: center;\r\n\t\tfont-size: 15px;\r\n\t\tbackground: #000;\r\n\t\tcolor: #fff;\r\n\t\tposition: absolute;\r\n\t\tborder-radius: 4px;\r\n\t\tleft: 20px;\r\n\t\tbottom:55px;\r\n\t\tz-index: 99999;\r\n\t\twhite-space:pre;\r\n\t}\r\n\t\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.voice {\r\n\twidth: 120px;\r\n\theight: 60px;\r\n\tborder-radius: 4px;\r\n\tline-height: 60px;\r\n\ttext-align: center;\r\n\tfont-weight: 600;\r\n\tfont-size: 18px;\r\n\tbackground: rgba(255, 255, 255, 0.8);\r\n\tposition: absolute;\r\n\tleft: 50%;\r\n\ttop: 50%;\r\n\ttransform: translate(-50%, -50%);\r\n\tmargin: auto;\r\n\tdisplay: none;\r\n\tz-index: 999;\r\n\tcursor: default;\r\n}\r\n",".mfunsPlayer-danmaku {\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    font-size: 22px;\n    color: #fff;\n    z-index: 102;\n}\n@media screen and (max-width: 600px) {\n    .mfunsPlayer-danmaku {\n       font-size:14px;\n    }\n}\n.mfunsPlayer-danmaku-top,\n    .mfunsPlayer-danmaku-bottom {\n        position: absolute;\n        width: 100%;\n        text-align: center;\n        visibility: hidden;\n        white-space: pre;\n    }\n.mfunsPlayer-danmaku-top.mfunsPlayer-danmaku-move,\n.mfunsPlayer-danmaku-bottom.mfunsPlayer-danmaku-move{\n            will-change: visibility;\n            animation: danmaku-center 4s linear;\n            animation-play-state: paused;\n    }\n.mfunsPlayer-danmaku-top.mfunsPlayer-danmaku-move,\n.mfunsPlayer-danmaku-bottom.mfunsPlayer-danmaku-move.mfunsPlayer-danmaku-run{\n            animation-play-state: running;\n    }\n.mfunsPlayer-danmaku-item {\n    display: inline-block;\n    pointer-events: none;\n    user-select: none;\n    cursor: default;\n    white-space: pre;\n    font-weight: 600;\n    font-family: SimHei, \"Microsoft JhengHei\", Arial, Helvetica, sans-serif;\n    text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;\n}\n.mfunsPlayer-danmaku--demo {\n    position: absolute;\n    visibility: hidden;\n}\n\n.mfunsPlayer-danmaku-right{\n    position: absolute;\n    right: 0;\n    white-space: pre;\n    transform: translateX(100%);\n    &.mfunsPlayer-danmaku-move {\n    will-change: transform;\n    animation: danmaku 5s linear;\n    &.low{\n        animation: danmaku 7.5s linear;\n        // animation-play-state: paused;\n    }\n    &.lowest{\n        animation: danmaku 10s linear;\n        // animation-play-state: paused;\n    }\n    &.fast{\n        animation: danmaku 3s linear;\n        // animation-play-state: paused;\n    }\n    &.fastest{\n        animation: danmaku 2s linear;\n        // animation-play-state: paused;\n    }\n  }\n}\n@keyframes danmaku {\n        from {\n            transform: translateX(100%);\n        }\n    }\n@keyframes danmaku-center {\n    from {\n        visibility: visible;\n    }\n    to {\n        visibility: visible;\n    }\n}",".danmakuEditor {\r\n\twidth: 180px;\r\n\theight: 150px;\r\n\tbackground: #333;\r\n\tposition: absolute;\r\n\tz-index: 99999;\r\n\tborder-radius: 4px;\r\n\tdisplay: none;\r\n}\r\n\r\n.danmaku_type {\r\n\toverflow: hidden;\r\n\twidth: 150px;\r\n\theight: 20px;\r\n\tmargin: 20px auto;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tborder: 1px solid #fff;\r\n\tborder-radius: 2px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.danmaku_type div{\r\n\twidth: 50px;\r\n\theight: 20px;\r\n\tline-height: 20px;\r\n\ttext-align: center;\r\n\tfont-size: 13px;\r\n\tborder-right: 1px solid #fff;\r\n\tcolor: #fff;\r\n\toverflow: hidden;\r\n}\r\n\r\n.danmaku_type .focus {\r\n\tcolor: #000;\r\n\tbackground: #f6f6f6;\r\n}\r\n\r\n.danmaku_type :last-child {\r\n\tborder: none;\r\n}\r\n\r\n.danmaku_color {\r\n\twidth: 85%;\r\n\theight: 80px;\r\n\tmargin: 20px auto;\r\n\tdisplay: flex;\r\n\tjustify-content: space-between;\r\n\talign-items: center;\r\n\tflex-wrap: wrap;\r\n\tcursor: pointer;\r\n}\r\n\r\n.danmaku_color i {\r\n\twidth: 20px;\r\n\theight: 20px;\r\n\tmargin-right: 8px;\r\n\tbackground: #fff;\r\n\tborder-radius: 50%;\r\n\tborder: 2px solid .333;\r\n}\r\n\r\n.danmaku_color :nth-child(5n) {\r\n\tmargin-right: 0;\r\n}\r\n\r\n.danmaku_color .focus {\r\n\tborder: 2px solid #f5f5f5;\r\n}\r\n.advanceDanmakuEditor_mask{\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tz-index: 9998;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tbackground: rgba(0,0,0,0.8);\r\n\tdisplay: none;\r\n\t\r\n}\r\n.advanceDanmakuEditor{\r\n\twidth: 80%;\r\n\theight: 80%;\r\n\tmargin: 3% auto;\r\n\tbackground: #333;\r\n\tborder-radius: 2px;\r\n\tposition: relative;\r\n\tpadding: 2%;\r\n\tborder:1px solid .555;\r\n\tanimation: down 0.35s;\r\n}\r\n.danmuku_link{\r\n\theight: 30px;\r\n\tmargin:2% 0 0 3%;\r\n}\r\n.danmuku_link a{\r\n\tcolor: #7B7FF7;\r\n}\r\n.exit_edit{\r\n\tposition: absolute;\r\n\twidth: 25px;\r\n\theight: 25px;\r\n\tline-height: 25px;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tfont-size: 20px;\r\n\tcursor: pointer;\r\n\tcolor: #fff;\r\n}\r\n.exit_edit:hover{\r\n\tcolor: red;\r\n}\r\n.editor_title{\r\n\twidth: 100%;\r\n\theight: 30px;\r\n\tline-height: 30px;\r\n\tpadding-left: 3%;\r\n\tfont-weight: 600;\r\n\tcolor: #fff;\r\n}\r\n#danmaku_code{\r\n\twidth: 94%;\r\n\theight: 78%;\r\n\tborder: 1px solid .000;\r\n\tmargin: 0 auto;\r\n}\r\n.editor_footer{\r\n\twidth: 94%;\r\n    margin: 1% auto;\t\r\n\t\r\n}\r\n/* .btn_box{\r\n\twidth: 40%;\r\n\theight: 20px;\r\n} */\r\n.editor_btn{\r\n\tmargin-left: 10px;\r\n\twidth: 40px;\r\n\theight: 20px;\r\n\tfloat: right;\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\tfont-size: 14px;\r\n\tcolor: #fff;\r\n\tborder-radius: 3px;\r\n\tcursor: pointer;\r\n\t\r\n}\r\n\r\n.editor_clear{\r\n  background: #EB2626;\t\r\n}\r\n.editor_preview{\r\n  background: #74D064;\r\n}\r\n.editor_emit{\r\n background: #7B7FF7;\r\n}","@import './controller';\r\n@import './player';\r\n@import './video';\r\n@import './danmaku';\r\n@import './editor';\r\n@import './loader';\r\n@import './menu';\r\n@import \"./footBar\";\r\n@import './fullscreen';\r\n@import './components';\r\n@import './danmakuAuxiliary';\r\n@import './font-icon';\r\n\r\n@keyframes close {\r\n\tfrom {\r\n\t\tmargin-left: 12px;\r\n\t}\r\n\r\n\tto {\r\n\t\tmargin-left: 2px;\r\n\t}\r\n}\r\n\r\n@keyframes open {\r\n\tfrom {\r\n\t\tmargin-left: 2px;\r\n\t}\r\n\r\n\tto {\r\n\t\tmargin-left: 12px;\r\n\t}\r\n}\r\n\r\n@keyframes expand{\r\n\tfrom {\r\n\t\tright: -40%;\r\n\t}\r\n\r\n\tto {\r\n\t\tright: 0;\r\n\t}\r\n}\r\n@keyframes retract{\r\n\tfrom {\r\n\t\tright: 0;\r\n\t}\r\n\r\n\tto {\r\n\t\tright: -40%;\r\n\t}\r\n}\r\n\r\n@keyframes down{\r\n\tfrom{\r\n\t\tmargin-top: -5%;\r\n\t\topacity: 0;\r\n\t}\r\n\tto{\r\n\t\tmargin-top: 3%;\r\n\t\topacity: 1;\r\n\t}\r\n}\r\n\r\n@keyframes up{\r\n\tfrom{\r\n\t\tmargin-top: 3%;\r\n\t\topacity: 1;\r\n\t}\r\n\tto{\r\n\t\tmargin-top: -5%;\r\n\t\topacity: 0;\r\n\t}\r\n}","@import './theme';\r\n\r\n.mfunsPlayer-bar-wrap {\r\n\tz-index: 5;\r\n\twidth: calc(100% - 30px);\r\n\theight: 3px;\r\n\tpadding: 5px 0;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tcursor: pointer;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.mfunsPlayer-bar{\r\n\twidth: 100%;\r\n\theight: 3px;\r\n\tbackground: hsla(0,0%,100%,.2);\r\n\tposition: relative;\r\n}\r\n\r\n.mfunsPlayer-barTime{\r\n\tposition: absolute;\r\n\ttop: -30px;\r\n\tborder-radius: $theme-border-radius;\r\n    padding: 4px 6px;\r\n    background-color: rgba(0,0,0,.62);\r\n    color: #fff;\r\n    font-size: 12px;\r\n    text-align: center;\r\n    opacity: 1;\r\n    /* transition: opacity .1s ease-in-out; */\r\n    word-wrap: normal;\r\n    word-break: normal;\r\n    z-index: 2;\r\n    pointer-events: none;\r\n\t&::after {\r\n\t\tcontent: '';\r\n\t\tdisplay: block;\r\n\t\tposition: absolute;\r\n\t\tbottom: -10px;\r\n\t\tleft: 50%;\r\n\t\ttransform: translateX(-50%);\r\n\t\tborder: 4px solid;\r\n\t\tborder-color: $theme-color transparent transparent transparent;\r\n\t}\r\n}\r\n.mfunsPlayer-barTime.hidden{\r\n\topacity: 0;\r\n}\r\n.mfunsPlayer-preview{\r\n\tposition: absolute;\r\n}\r\n.mfunsPlayer-thumb {\r\n\twidth: 11px;\r\n\theight: 11px;\r\n\tbackground: url(../icon/control.png);\r\n\t// background: #00a1d6;\r\n\tborder-radius: 50%;\r\n\tbackground-size: 100% 100%;\r\n\tposition: absolute;\r\n\ttop: -4px;\r\n\tright:5px;\r\n\tmargin-right: -10px;\r\n\ttransition: all .3s ease-in-out;\r\n    transform: scale(1);\r\n\tcursor: pointer;\r\n\tz-index: 8;\r\n\t&.hidden{\r\n\ttransform: scale(0);\r\n    }\r\n}\r\n.mfunsPlayer-bufferedBar{\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tbackground: hsla(0,0%,100%,.3);\r\n\twidth: 0;\r\n\theight: 100%;\r\n}\r\n.mfunsPlayer-playedBar {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tbackground: #369;\r\n\twidth: 0;\r\n\theight: 100%;\r\n}\r\n","@import './theme.scss';\n\n.mfunsPlayer-menu {\n    position: absolute;\n    width: 170px;\n    border-radius: $theme-border-radius;\n    background: rgba(28, 28, 28, 0.85);\n    padding: 5px 0;\n    overflow: hidden;\n    z-index: 10;\n    display: none;\n}\n\n.mfunsPlayer-menu.mfunsPlayer-menu-show {\n    display: block;\n}\n\n.mfunsPlayer-menu-item {\n    height: 30px;\n    box-sizing: border-box;\n    cursor: pointer;\n   \n    \n}\n.mfunsPlayer-menu-item :hover {\n    background-color: rgba(255, 255, 255, .1);\n}\n\n.mfunsPlayer-menu-item >a {\n    text-decoration: none;\n    display: inline-block;\n    padding: 0 10px;\n    line-height: 30px;\n    color: #eee;\n    font-size: 13px;\n    font-weight: 600;\n    display: inline-block;\n    vertical-align: middle;\n    width: 100%;\n    box-sizing: border-box;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n   \n}\n",".mfunsPlayer-footBar{\r\n    height: 40px;\r\n    width: 100%;\r\n    display: flex;\r\n    position: relative;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    padding: 0 15px;\r\n    background-color: #fff;\r\n    box-sizing: border-box;\r\n    .mfunsPlayer-video-danmaku-details{\r\n        font-size: 13px;\r\n        padding-right: 5px;\r\n        .mfunsPlayer-video-danmaku-count{\r\n            color: #666\r\n        }\r\n    }\r\n}","@import './theme';\r\n\r\n.mfunsPlayer-video-wrap {\r\n    &:-webkit-full-screen {\r\n        width: 100%;\r\n        height: 100%;\r\n        background: #000;\r\n        position: fixed;\r\n        z-index: 100000;\r\n        left: 0;\r\n        top: 0;\r\n        margin: 0;\r\n        padding: 0;\r\n        transform: translate(0, 0);\r\n        .mfunsPlayer-notice{\r\n            bottom:80px\r\n        }\r\n        .mfunsPlayer-video-mask{\r\n            height: 100%;\r\n        }\r\n        .mfunsPlayer-controller-mask{\r\n           .mfunsPlayer-bezel{\r\n               margin-top: -30px;\r\n            }\r\n            .mfunsPlayer-video-danmaku-root{\r\n                width: 40%;\r\n                height: 30px;\r\n                position: absolute;\r\n                left: 50%;\r\n                transform: translateX(-50%);\r\n                .input_box{\r\n                    border :none;\r\n                    border-radius: $theme-border-radius;\r\n                }\r\n                .mfunsPlayer-controller-button {\r\n                    padding: 0 5px;\r\n                }\r\n                .mfunsPlayer-controller-danmaku-style{\r\n                    .icon-text {\r\n                        color: #f5f5f5;\r\n                        &:hover{\r\n                            color: $theme-color-light;\r\n                        }\r\n                    }\r\n                }\r\n                .mfunsPlayer-controller-danmaku-settings{\r\n                    .icon-danmaku-settings {\r\n                        color: #f5f5f5;\r\n                    }\r\n                }\r\n                .mfunsPlayer-danmaku-text{\r\n                    border: none;\r\n\t                color: #f5f5f5;\r\n                    &::-webkit-input-placeholder{\r\n                        color: #fff;\r\n                    }\r\n                }\r\n                .emit{\r\n                    height: 100%;\r\n                    border-radius:0 $theme-border-radius $theme-border-radius 0;\r\n                }\r\n            }\r\n            .mfunsPlayer-controller{\r\n                height: 60px;\r\n                .mfunsPlayer-controller-wrap{\r\n                    .mfunsPlayer-video-danmaku-root{\r\n                            display: flex;\r\n                    }\r\n                    .mfunsPlayer-controller-left{\r\n                        width: auto;\r\n                        padding-right: 16px;\r\n                    }\r\n                    .mfunsPlayer-controller-right {\r\n                        .mfunsPlayer-controller-fullscreen{\r\n                            .icon-fullscreen {\r\n                                display: none;\r\n                            }\r\n                            .icon-fullscreen-exit {\r\n                                display: block;\r\n                            }\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n            \r\n        }\r\n        \r\n        .mfunsPlayer-danmaku {\r\n                .mfunsPlayer-danmaku-top,\r\n                .mfunsPlayer-danmaku-bottom {\r\n                    &.mfunsPlayer-danmaku-move {\r\n                        animation: danmaku-center 5s linear;\r\n                        animation-play-state: inherit;\r\n                    }\r\n                }\r\n                .mfunsPlayer-danmaku-right {\r\n                    &.mfunsPlayer-danmaku-move {\r\n                        animation: danmaku 8s linear;\r\n                        animation-play-state: inherit;\r\n                    }\r\n                }\r\n            }\r\n            .mfunsPlayer-controller-button {\t\t\t// 按钮\r\n                padding: 0 10px;\r\n            }\r\n    }\r\n    &.mfunsPlayer-web-fullscreen{\r\n        @extend :-webkit-full-screen;\r\n        position: fixed;\r\n        z-index: 100000;\r\n        left: 0;\r\n        top:0;\r\n        width: 100% !important;\r\n        height: 100% !important;\r\n        .mfunsPlayer-controller-mask{ \r\n            .mfunsPlayer-controller{\r\n                height: 60px;\r\n                .mfunsPlayer-controller-right{\r\n                    .mfunsPlayer-controller-webfull{\r\n                        .icon-web-fullscreen {\r\n                            display: none;\r\n                        }\r\n                        .icon-web-fullscreen-exit {\r\n                            display: block;\r\n                        }\r\n                    }\r\n                }\r\n                .mfunsPlayer-controller-fullscreen{\r\n                    .icon-fullscreen {\r\n                        display: block !important;\r\n                    }\r\n                    .icon-fullscreen-exit {\r\n                        display: none !important;\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n}","@import './theme';\n\n.mfunsPlayer {\n    .mfunsPlayer-slider {       // 滑动条形态样式\n        .slider-track{\n            width: 2px;\n            height: 2px;\n            border-radius: 1px;\n            background: #e5e9ef;\n            margin: 0 auto;\n            display: flex;\n            flex-direction: column;\n            justify-content: flex-end;\n            align-items: center;\n            cursor: pointer;\n        }\n        .slider-bar{\n            background: $theme-color;\n            border-radius: 2px;\n            cursor: pointer;\n        }\n        .slider-thumb-track{\n            position: relative;\n            width: calc(100% - 12px);\n            height: calc(100% - 12px);\n        }\n        .slider-thumb{\n            width: 12px;\n            height: 12px;\n            border-radius: 100%;\n            background: $theme-color;\n            z-index: 2;\n        }\n    }\n    .mfunsPlayer-picker{\n        .picker-item{\n            display: inline-block;\n            padding: 0 5px;\n            height: 20px;\n            line-height: 20px;\n            border-radius: 2px;\n            border: transparent solid 1px;\n            transition: color .2s;\n            cursor: pointer;\n            &.picked{\n                border: transparent solid 1px;\n                border-color: $theme-color;\n                color: $theme-color;\n            }\n            &:hover{\n                color: $theme-color-light;\n            }\n            &:active{\n                color: $theme-color;\n            }\n        }\n    } \n    .mfunsPlayer-switch{\n        height: 22px;\n        .mfunsPlayer-switch-checkbox{\n            position: relative;\n            display: inline-block;\n            vertical-align: middle;\n            margin: 4px 0;\n            width: 13px;\n            height: 13px;\n            border-radius: $theme-border-radius;\n            border: solid;\n            border-width: 1px;\n            border-color: $translucent-light-white;\n            box-sizing: border-box;\n            transition: all .2s;\n        }\n        .mfunsPlayer-switch-label{\n            position: relative;\n            display: inline-block;\n            vertical-align: middle;\n            line-height: 22px;\n            margin: 0 2px;\n            transition: all .2s;\n        }\n        &:hover{\n            .mfunsPlayer-switch-checkbox{\n                border-color: $theme-color-light;\n            }\n            .mfunsPlayer-switch-label{\n                color: $theme-color-light;\n            }\n        }\n        &:active{\n            .mfunsPlayer-switch-checkbox{\n                border-color: $theme-color;\n            }\n            .mfunsPlayer-switch-label{\n                color: $theme-color;\n            }\n        }\n        &.switch-on{\n            .mfunsPlayer-switch-checkbox{\n                background-color: $theme-color;\n                border-color: $theme-color;\n                background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+DQogICAgPHBvbHlnb24gcG9pbnRzPSI0MCA3LjkyOSAyMCAyNy45MjkgMTAgMTcuOTI5IDIuOTI5IDI1IDIwIDQyLjA3MSA0Ny4wNzEgMTUgNDAgNy45MjkiIGZpbGw9IiNGRkYiLz4NCjwvc3ZnPg==');\n                background-repeat: no-repeat;\n                background-size: contain;\n            }\n        }\n    }\n    \n\n    .mfunsPlayer-input {\n        height: 20px;\n        line-height: 20px;\n        padding: 0 4px;\n        border: 1px solid $light-grey;\n        background-color: transparent;\n        font-size: 12px;\n        color: $text-black;\n        border-radius: $theme-border-radius;\n        outline: none;\n    }\n    \n    .mfunsPlayer-controller-panel, .mfunsPlayer-controller {\n        .mfunsPlayer-input {\n            border-color: $translucent-light-white;\n            color: $translucent-white;\n        }\n    }\n}","@import './theme';\n\n.mfunsPlayer-danmaku-auxiliary {\n\tfont-size: 12px;\n\t.mfunsPlayer-danmaku-list-panel {\n\t\theight: 100%;\n\t\t.mfunsPlayer-danmaku-list-head, .list-row {\n\t\t\tline-height: 24px;\n\t\t\theight: 24px;\n\t\t\twhite-space: nowrap;\n\t\t}\n\t\t.list-column, .list-cell {\n\t\t\tdisplay: inline-block;\n\t\t\theight: 100%;\n\t\t\tpadding: 0 4px;\n\t\t\toverflow:hidden;\n\t\t\t&.col-time {\n\t\t\t\tpadding-left: 8px;\n\t\t\t\twidth: 40px;\n\t\t\t}\n\t\t\t&.col-date {\n\t\t\t\tpadding-right: 8px;\n\t\t\t\twidth: 90px;\n\t\t\t}\n\t\t\t&.col-text {\n\t\t\t\twidth: calc(100% - 162px);\n\t\t\t\ttext-overflow: ellipsis;\n\t\t\t\twhite-space:overflow;\n\t\t\t}\n\t\t}\n\t\t.mfunsPlayer-danmaku-list-wrap {\n\t\t\tposition: relative;\n\t\t\toverflow: hidden;\n\t\t\twidth: 100%;\n\t\t\theight: calc(100% - 40px);\n\t\t\t.mfunsPlayer-danmaku-list-container {\n\t\t\t\toverflow: hidden;\n\t\t\t\tposition: absolute;\n\t\t\t\toverflow-y: auto;\n\t\t\t\tscrollbar-width: thin;\n\t\t\t\ttop: 24px;\n\t\t\t\tleft: 0;\n\t\t\t\twidth: 100%;\n\t\t\t\theight: calc(100% - 24px);\n\t\t\t\t&::-webkit-scrollbar {\n\t\t\t\t\twidth: 5px;\n\t\t\t\t\t\n\t\t\t\t}\n\t\t\t\t&::-webkit-scrollbar-thumb {\n\t\t\t\t\tbackground-color: $text-grey;\n\t\t\t\t}\n\t\t\t}\n\t\t\t.mfunsPlayer-danmaku-list-status {\n                position: absolute;\n                top: 50%;\n                width: 100%;\n                div {\n                    text-align: center;\n                    display: none;\n                    color: $text-grey;\n                }\n                &.status-loading {\n                    .status-loading-text {\n                        display: block;\n                    }\n                }\n                &.status-failed {\n                    .status-failed-text {\n                        display: block;\n                    }\n                }\n                &.status-empty {\n                    .status-empty-text {\n                        display: block;\n                    }\n                }\n\t\t\t}\n\t\t}\n\t}\n\t.mfunsPlayer-ade-panel {\n\t\theight: 100%;\n\t\t.mfunsPlayer-ade-wrap {\n\t\t\theight: calc(100% - 40px);\n\t\t\tpadding: 0 8px;\n\t\t}\n\t\t.mfunsPlayer-ade-head {\n\t\t\theight: 30px;\n\t\t\tline-height: 30px;\n\t\t\tfont-weight: bold;\n\t\t}\n\t\t.mfunsPlayer-ade-prebox {\n\t\t\theight: calc(100% - 70px);\n\t\t\tborder: 1px solid $light-grey;\n\t\t\tborder-radius: $theme-border-radius;\n\t\t}\n\t\t.mfunsPlayer-ade-foot {\n\t\t\tmargin-top: 6px;\n\t\t\theight: 24px;\n\t\t\tuser-select: none;\n\t\t\t.mfunsPlayer-ade-button {\n\t\t\t\tcursor: pointer;\n\t\t\t\theight: 22px;\n\t\t\t\tline-height: 22px;\n\t\t\t\tpadding: 0 5px;\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tborder-radius: $theme-border-radius;\n\t\t\t\tborder: 1px solid $text-grey;\n\t\t\t\tcolor: $text-grey;\n\t\t\t}\n\t\t\t.mfunsPlayer-ade-emit {\n\t\t\t\tborder: 1px solid $theme-color;\n\t\t\t\tcolor: $theme-color;\n\t\t\t}\n\t\t}\n\t}\n\t.mfunsPlayer-danmaku-auxiliary-foot {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\theight: 40px;\n\t\tjustify-content: space-between;\n\t\tbox-sizing: border-box;\n\t\tborder-top: 1px solid #e7e7e7;\n\t\tpadding: 0 8px;\n\t\tcolor: $text-grey;\n\t}\n}\n","@font-face {\n  font-family: 'mfunsPlayerIcon';\n  src:  url('../icon/fonts/mfunsPlayerIcon.eot?dkb9ab');\n  src:  url('../icon/fonts/mfunsPlayerIcon.eot?dkb9ab#iefix') format('embedded-opentype'),\n    url('../icon/fonts/mfunsPlayerIcon.ttf?dkb9ab') format('truetype'),\n    url('../icon/fonts/mfunsPlayerIcon.woff?dkb9ab') format('woff'),\n    url('../icon/fonts/mfunsPlayerIcon.svg?dkb9ab#mfunsPlayerIcon') format('svg');\n  font-weight: normal;\n  font-style: normal;\n  font-display: block;\n}\n\n[class^=\"icon-\"], [class*=\" icon-\"] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'mfunsPlayerIcon' !important;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-play:before {\n  content: \"\\e900\";\n}\n.icon-pause:before {\n  content: \"\\e901\";\n}\n.icon-prev:before {\n  content: \"\\e902\";\n}\n.icon-next:before {\n  content: \"\\e903\";\n}\n.icon-repeat:before {\n  content: \"\\e904\";\n}\n.icon-repeat-off:before {\n  content: \"\\e905\";\n}\n.icon-volume-off:before {\n  content: \"\\e90c\";\n}\n.icon-volume:before {\n  content: \"\\e90f\";\n}\n\n.icon-widescreen:before {\n  content: \"\\e910\";\n}\n.icon-widescreen-exit:before {\n  content: \"\\e911\";\n}\n.icon-web-fullscreen:before {\n  content: \"\\e912\";\n}\n.icon-web-fullscreen-exit:before {\n  content: \"\\e913\";\n}\n.icon-picture-in-picture:before {\n  content: \"\\e914\";\n}\n.icon-picture-in-picture-exit:before {\n  content: \"\\e915\";\n}\n.icon-fullscreen:before {\n  content: \"\\e91e\";\n}\n.icon-fullscreen-exit:before {\n  content: \"\\e91f\";\n}\n\n.icon-danmaku:before {\n  content: \"\\e920\";\n}\n.icon-danmaku-off:before {\n  content: \"\\e921\";\n}\n.icon-danmaku-settings:before {\n  content: \"\\e923\";\n}\n.icon-advanced-danmaku:before {\n  content: \"\\e928\";\n}\n.icon-text:before {\n  content: \"\\e92a\";\n}\n.icon-send-danmaku:before {\n  content: \"\\e92f\";\n}\n\n.icon-settings:before {\n  content: \"\\e930\";\n}\n.icon-caption:before {\n  content: \"\\e931\";\n}\n\n.icon-left-arrow:before {\n  content: \"\\e940\";\n}\n.icon-right-arrow:before {\n  content: \"\\e941\";\n}\n.icon-close:before {\n  content: \"\\e945\";\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/css/index.scss":
/*!****************************!*\
  !*** ./src/css/index.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/css/index.scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/icon/fonts/mfunsPlayerIcon.eot?dkb9ab":
/*!***************************************************!*\
  !*** ./src/icon/fonts/mfunsPlayerIcon.eot?dkb9ab ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:application/vnd.ms-fontobject;base64,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");

/***/ }),

/***/ "./src/icon/fonts/mfunsPlayerIcon.ttf?dkb9ab":
/*!***************************************************!*\
  !*** ./src/icon/fonts/mfunsPlayerIcon.ttf?dkb9ab ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:font/ttf;base64,AAEAAAALAIAAAwAwT1MvMg8SBl0AAAC8AAAAYGNtYXCOdI8QAAABHAAAAJxnYXNwAAAAEAAAAbgAAAAIZ2x5ZjGp5B8AAAHAAAAP8GhlYWQe4jvaAAARsAAAADZoaGVhB7MD4AAAEegAAAAkaG10eHIACeUAABIMAAAAfGxvY2Ey+Db8AAASiAAAAEBtYXhwACcAvAAAEsgAAAAgbmFtZfhmZrEAABLoAAAB5nBvc3QAAwAAAAAU0AAAACAAAwPuAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpRQPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAgAAAABwAEAADAAwAAQAg6QXpDOkV6SHpI+ko6SrpMelB6UX//f//AAAAAAAg6QDpDOkP6R7pI+ko6SrpL+lA6UX//f//AAH/4xcEFv4W/Bb0FvMW7xbuFuoW3BbZAAMAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAKsAJAOAA1wAIgAAEzgBMSIGFTgBOQEROAExFBYzMjY3MQE+ATU0JicxAS4BIzHVERkZEQYLBQKACQwMCf2ABQsGA1wZEf0cERkDAwFxBhMMDBMGAXEDAwAAAAIAqwArA1UDVQAQACEAAAEzMhYVERQGKwEiJjURNDYzITMyFhURFAYrASImNRE0NjMC1VYRGRkRVhEZGRH+AFYRGRkRVhEZGREDVRkR/SoRGRkRAtYRGRkR/SoRGRkRAtYRGQACAIAAMwOAA00AJgA2AAABOAExMhYVOAE5ARE4ATEUBiM4ATkBIiYnMQEuATU0NjcxAT4BMzEFMzIWFREUBisBIiY1ETQ2A1USGRkSBw4F/kQHCQkHAbwFDgf9VlUSGRkSVRIZGQNNGRH9OhEZBQQBYwYRCgoRBgFjBAUNGRL9VhIZGRICqhIZAAAAAAIAgAAzA4ADTQAmADYAABM4ATEiBhU4ATkBETgBMRQWMzgBOQEyNjcxAT4BNTQmJzEBLgEjMQUzMhYVERQGKwEiJjURNDarEhkZEgcOBQG8BwkJB/5EBQ4HAlVVEhkZElUSGRkDTRkR/ToRGQUEAWMGEQoKEQYBYwQFDRkS/VYSGRkSAqoSGQACABkAawPnAxUAFAApAAATIRUnBxc3JwcRNCYjMSEiBhUxFTMBITUXNycHFzcRFBYzMSEyNjUxNSPVAlYrPJGSPCsZEv1WEhlVAlb9qis8kZI8KxkSAqoSGVUCwO4qPJKSPCoBGREZGRFW/ivuKjySkjwq/ucRGRkRVgAAAwAZAE0D5wM0AA4AHQAiAAABBxE0JiMxIRUhFScHFzcBNRc3JwcXNxEUFjMxITUBNwEHAQOrKxkS/isBqys8kZL87is8kZI8KxkSAdX+DD0Cqz39VQH8KgEZERlV7io8kpL/AO4qPJKSPCr+5xEZVQI3PP1WPAKqAAAAAAMAKwAbA8kDZQALABEAHQAAASMiBhURFBY7AQURAycjETM3BScHJwcXBxc3FzcnAR7JERkZEckBN1XIuLjIAck8YmI9YmI9YmI8YgKVGRH+qhEZ0ANK/VWGAQCGpDxiYjxiYjxiYjxiAAAAAAQAKwAbA9UDZQALABEAKQBJAAABIyIGFREUFjsBBREDJyMRMzcTOAExFAYHMRc+ATU0JicxBx4BFTgBOQEzOAExFAYHMRc2Nz4BNzY1NCcuAScmJzEHHgEVOAE5AQEeyREZGRHJATdVyLi4yNUhHTwpLy8pPB0hqzw1PSAZGiMKCQkKIxoZID01PAKVGRH+qhEZ0ANK/VWGAQCG/vosTh08KG0+Pm0oPB1OLFCLND0gJiVULi4xMS4uVCUmID00i1AAAAAEAFUAQAOrA0AAAwAXAB4AJQAAAREhESUhIgYVMREUFjMxITI2NTERNCYjASc3FwcXByEnNyc3FwcDVf1WAtX9ABIZGRIDABIZGRL+AJKSPFVVPAEAPFVVPJKSAuv9qgJWVRkS/VYSGRkSAqoSGf3ukpI9VVU9PVVVPZKSAAAAAAQAVQBAA6sDQAADABcAHgAlAAABESERJSEiBhUxERQWMzEhMjY1MRE0JiMBNycHFwcXITcnNycHFwNV/VYC1f0AEhkZEgMAEhkZEv2rkZE9VlY9Aao9VlY9kZEC6/2qAlZVGRL9VhIZGRICqhIZ/e6Skj1VVT09VVU9kpIAAAAABABVAEADqwNAAAMAFwAeACQAAAERIRElISIGFTERFBYzMSEyNjUxETQmIwE1MzUjFTMhFSMVMzUDVf1WAtX9ABIZGRIDABIZGRL91YDVVQFWgNUC6/2qAlZVGRL9VhIZGRICqhIZ/oCAVdWAVdUAAAQAVQBAA6sDQAADABcAHgAlAAABESERJSEiBhUxERQWMzEhMjY1MRE0JiMFFSMVMzUjATUzNSMVMwNV/VYC1f0AEhkZEgMAEhkZEv4AgNVVAQCA1VUC6/2qAlZVGRL9VhIZGRICqhIZq1VVqv5WVVWqAAAABABVAEADqwNAABUAGQAtADcAACUhESERMxE0JiMxISIGFTERFBYzMSEBFSE1JSEiBhUxERQWMzEhMjY1MRE0JiMBFScHFyMVMzUjAav/AAKqVhkS/QASGRkSASsBqv8AASv+qxIZGRIBVRIZGRL+AGI8YkTVVZUCVv8AASoSGRkS/VYSGQEAq6tVGRH/ABIZGRIBABEZAQBDYj1iVdUAAAQAVQBAA6sDQAAVABkALQA3AAAlIREhETMRNCYjMSEiBhUxERQWMzEhARUhNSUhIgYVMREUFjMxITI2NTERNCYjJTUXNyczNSMVMwGr/wACqlYZEv0AEhkZEgErAar/AAEr/qsSGRkSAVUSGRkS/dViPWJD1VWVAlb/AAEqEhkZEv1WEhkBAKurVRkR/wASGRkSAQARGStEYjxiVdUAAAAEAFUAQAOrA0AABQALABEAFwAAEzUzNSERJTMVMxEhASM1IxEhARUjFSERq6r/AAJWqlb/AP6qqlYBAAIAqgEAAkCrVf8Aq6sBAP1Vq/8AAQCrVQEAAAAABABVAEADqwNAAAYADQAUABoAAAEVIxUhESMFIzUjESE1ATMVMxEhFQU1MzUhEQEAqwEAVQKrq1UBAPyqq1X/AAKrq/8AA0CrVQEAq6v/AFX+VqsBAFWrq1X/AAAGAFUAAAOrA0AADwAUABkAHgAjACgAAAEhIgYVETchMjY1ETQmIzEDIQcRIQUzFSM1OwEVIzUHIRUhNSEzFSM1A4D9ABIZuwJwEhkZEiv9nUcCqv2rgIDV1tbVAQD/AAFVq6sDQBkS/OuVGRICVRIZ/as5AjlWVVVVVapWVlZWAAcAVQAAA9UDQAARAC8APwBPAFQAWQBeAAAlIQcRIREzETQmIyEiBhURNzMBIgcOAQcGFRQXHgEXFjMyNz4BNzY1MTQnLgEnJiMXFAYHNSc+ATMyFhU4ATkBITQ2NzEXDgEjIiY1MDQ5AQEzFSM1OwEVIzUHIRUhNQIA/vJHAqpWGRL9ABIZu/ABACwnJzoREBAROicnLCwnJzoREBAROicnLIAHBqoMHA81S/8ABwaqDBwPNUv+gICA1dbW1QEA/wDrOQI5/wABKhIZGRL865UBKxEROScnLC0mJzoREREROicmLSwnJzkREdUPHA0BqgYHSzUPHAyrBgZKNQEBqlVVVVWqVlYAAAYAVQAAA84DQAARAEMAUgBXAFwAYQAAJSEHESERMxE0JiMhIgYVETczJTQmJxU3JwcuAS8BNSMVDgEHMScHFw4BFRQWFzUHFzceARczFTM1PgE3MRc3Jz4BNTEHIiY1NDYzMhYVMRQGIzEBMxUjNTsBFSM1ByEVITUCAP7yRwKqVhkS/QASGbvwAasEAyorKRAoFgFWFygQKSsqAwQEAyorKRAoFgFWFygQKSsqAwSrIzIyIyMyMiP+AICA1dbW1QEA/wDrOQI5/wABKhIZGRL865VWDBcLARhKGBAYBQEwMAYYEBhKGAoXDA0XCwEYShgQFwYxMQYXEBhKGAoXDVYyJCMyMiMkMgIAVVVVVapWVgAAAAYAVf/5A/EDQAARACEAQwBIAE0AUgAAJSMHESERMxE0JiMhIgYVETczJR4BHwEOAQ8BLgEvAT4BNzcxBgcOAQcGDwEWFx4BFxYfATY3PgE3Nj8BJicuAScmLwElMxUjNTsBFSM1ByEVITUB1eNHAqpWGRL9ABIZu8UBKxYvGQEaLxUBFi8ZARovFQEXGhs8ISEkAyUiIjwaGhYCFxobPCEhJAMlIiI8GhoWAv4AgIDV1tbVAQD/AOs5Ajn/AAEqEhkZEvzrlbUaLxUBFi8ZARouFgEWLxmTJSIiPBobFgEXGhs8ISElAyYiIT0aGhYCFhsaPCEiJAO5VVVVVapWVgADAKsAQANVAz4ABAAMAA8AADchFSE1JTcBIwEXNyElGwGrAqr9VgJaTP7VTP7VTEoBdv61kJCVVVUtJgJW/aomk1YBIP7gAAACAIAADwOUA3EAHgAlAAAJAS4BIyIGFTgBOQEROAExFBYzMjY3FQE+ATU0JicxAREhNSERAQOJ/RcDBQMJDAwJAwUDAukFBgYF/UwBAP8AAiUB0wGcAQEMCfzICQwBAgEBnAMKBgYKA/6+AQRWAQT+0QAAAAQAZQAVA5sDawBUAJsAqgC5AAABHAEVFAYjIiYnMw4BDwEeARUUBgcxHgEXMT4BMzIWFRwBFTEeATMyNjcHPAE1NDYzMhYXIz4BPwEuATU0NjcxLgEnMQ4BIyImNTwBNTEuASMiBgc3Fx4BMzI2NyMeAR8BDgEVFBYXMQ4BBzcuASMiBgcVBiIjKgEnLgEjIgYHMy4BLwE+ATU0JicxPgE3Bx4BMzI2NzU2MjM6ARcHMhYVFAYjIiY1MTQ2MzE1IgYVFBYzMjY1MTQmIzEBlUs1EyQPASU3DgEfJycfDzclDyMTNUsYNxwcOBoDSzUTJA8BJTcOAR8nJx8PNyUPIxM1Sxg3HBw4GgOLFm5HCxcLAgkQBgEZHR0ZBxAKAQoWC0duFggQCAgQCBZuRwsXCgEJEAYBGR0dGQcQCgEKFgtHbhYIEAgIEAggIzIyIyMyMiNHZGRHR2RkRwNdAQQCNUsLCiZcNAMQPSUlPRA2XSYKC0s1AgQBBwcIBwEBBAI1SwsKJlw0AxA9JSU9EDZdJgoLSzUCBAEHBwgHAUlBUgMCDBsPAhxJKSlJHBAcDQEDAlI/AgEBQVIDAgwbDwIcSSkpSRwQHA0BAwJSPwIBAf8yIyMyMiMjMlZkR0dkZEdHZAAAAAAEAFUAQAOrA0AAAwAXADsAXwAAAREhESUhIgYVMREUFjMxITI2NTERNCYjATgBMSImNTQ2MzIWFzE3LgEjIgYVFBYzMjY3MScOASM4ATkBITgBMSImNTQ2MzIWFzE3LgEjIgYVFBYzMjY3MScOASM4ATkBA1X9VgLV/QASGRkSAwASGRkS/gAjMjIjEh8LPRc/I0dkZEcjPxc9Cx8SASskMjIkER8MPBc+I0dkZEcjPhc8DB8RAuv9qgJWVRkS/VYSGRkSAqoSGf4rMiMjMg0MPRcbZEdHZBsXPQwNMiMjMg0MPRcbZEdHZBsXPQwNAAABAEQABAOrA3wACQAAARcBIRUhAQcJAQIAPP6rAsT9PAFVPP5EAbwDfDz+q1b+qzwBvAG8AAAAAAEAVQAEA7wDfAAJAAABBwEhFSEBFwkBAgA8AVX9PALE/qs8Abz+RAN8PP6rVv6rPAG8AbwAAAAAAQCNAE0DcwMzAAsAAAEnCQEHCQEXCQE3AQNzPP7J/sk8ATf+yTwBNwE3PP7JAvc8/skBNzz+yf7JPAE3/sk8ATcAAAABAAAAAQAAF5jaN18PPPUACwQAAAAAAN3o+7QAAAAA3ej7tAAA//kD8QN8AAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAPxAAEAAAAAAAAAAAAAAAAAAAAfBAAAAAAAAAAAAAAAAgAAAAQAAKsEAACrBAAAgAQAAIAEAAAZBAAAGQQAACsEAAArBAAAVQQAAFUEAABVBAAAVQQAAFUEAABVBAAAVQQAAFUEAABVBAAAVQQAAFUEAABVBAAAqwQAAIAEAABlBAAAVQQAAEQEAABVBAAAjQAAAAAACgAUAB4ATAB+AMQBCAFGAYQBugIcAlwCnALUAw4DXgOuA9oECARIBMwFVgXWBfoGNAcmB54HugfWB/gAAQAAAB8AugAHAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAA8AAAABAAAAAAACAAcAqAABAAAAAAADAA8ATgABAAAAAAAEAA8AvQABAAAAAAAFAAsALQABAAAAAAAGAA8AewABAAAAAAAKABoA6gADAAEECQABAB4ADwADAAEECQACAA4ArwADAAEECQADAB4AXQADAAEECQAEAB4AzAADAAEECQAFABYAOAADAAEECQAGAB4AigADAAEECQAKADQBBG1mdW5zUGxheWVySWNvbgBtAGYAdQBuAHMAUABsAGEAeQBlAHIASQBjAG8AblZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMG1mdW5zUGxheWVySWNvbgBtAGYAdQBuAHMAUABsAGEAeQBlAHIASQBjAG8Abm1mdW5zUGxheWVySWNvbgBtAGYAdQBuAHMAUABsAGEAeQBlAHIASQBjAG8AblJlZ3VsYXIAUgBlAGcAdQBsAGEAcm1mdW5zUGxheWVySWNvbgBtAGYAdQBuAHMAUABsAGEAeQBlAHIASQBjAG8AbkZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=");

/***/ }),

/***/ "./src/icon/fonts/mfunsPlayerIcon.woff?dkb9ab":
/*!****************************************************!*\
  !*** ./src/icon/fonts/mfunsPlayerIcon.woff?dkb9ab ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:font/woff;base64,d09GRgABAAAAABU8AAsAAAAAFPAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIGXWNtYXAAAAFoAAAAnAAAAJyOdI8QZ2FzcAAAAgQAAAAIAAAACAAAABBnbHlmAAACDAAAD/AAAA/wMankH2hlYWQAABH8AAAANgAAADYe4jvaaGhlYQAAEjQAAAAkAAAAJAezA+BobXR4AAASWAAAAHwAAAB8cgAJ5WxvY2EAABLUAAAAQAAAAEAy+Db8bWF4cAAAExQAAAAgAAAAIAAnALxuYW1lAAATNAAAAeYAAAHm+GZmsXBvc3QAABUcAAAAIAAAACAAAwAAAAMD7gGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6UUDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEAIAAAAAcABAAAwAMAAEAIOkF6QzpFekh6SPpKOkq6THpQelF//3//wAAAAAAIOkA6QzpD+ke6SPpKOkq6S/pQOlF//3//wAB/+MXBBb+FvwW9BbzFu8W7hbqFtwW2QADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQCrACQDgANcACIAABM4ATEiBhU4ATkBETgBMRQWMzI2NzEBPgE1NCYnMQEuASMx1REZGREGCwUCgAkMDAn9gAULBgNcGRH9HBEZAwMBcQYTDAwTBgFxAwMAAAACAKsAKwNVA1UAEAAhAAABMzIWFREUBisBIiY1ETQ2MyEzMhYVERQGKwEiJjURNDYzAtVWERkZEVYRGRkR/gBWERkZEVYRGRkRA1UZEf0qERkZEQLWERkZEf0qERkZEQLWERkAAgCAADMDgANNACYANgAAATgBMTIWFTgBOQEROAExFAYjOAE5ASImJzEBLgE1NDY3MQE+ATMxBTMyFhURFAYrASImNRE0NgNVEhkZEgcOBf5EBwkJBwG8BQ4H/VZVEhkZElUSGRkDTRkR/ToRGQUEAWMGEQoKEQYBYwQFDRkS/VYSGRkSAqoSGQAAAAACAIAAMwOAA00AJgA2AAATOAExIgYVOAE5ARE4ATEUFjM4ATkBMjY3MQE+ATU0JicxAS4BIzEFMzIWFREUBisBIiY1ETQ2qxIZGRIHDgUBvAcJCQf+RAUOBwJVVRIZGRJVEhkZA00ZEf06ERkFBAFjBhEKChEGAWMEBQ0ZEv1WEhkZEgKqEhkAAgAZAGsD5wMVABQAKQAAEyEVJwcXNycHETQmIzEhIgYVMRUzASE1FzcnBxc3ERQWMzEhMjY1MTUj1QJWKzyRkjwrGRL9VhIZVQJW/aorPJGSPCsZEgKqEhlVAsDuKjySkjwqARkRGRkRVv4r7io8kpI8Kv7nERkZEVYAAAMAGQBNA+cDNAAOAB0AIgAAAQcRNCYjMSEVIRUnBxc3ATUXNycHFzcRFBYzMSE1ATcBBwEDqysZEv4rAasrPJGS/O4rPJGSPCsZEgHV/gw9Aqs9/VUB/CoBGREZVe4qPJKS/wDuKjySkjwq/ucRGVUCNzz9VjwCqgAAAAADACsAGwPJA2UACwARAB0AAAEjIgYVERQWOwEFEQMnIxEzNwUnBycHFwcXNxc3JwEeyREZGRHJATdVyLi4yAHJPGJiPWJiPWJiPGIClRkR/qoRGdADSv1VhgEAhqQ8YmI8YmI8YmI8YgAAAAAEACsAGwPVA2UACwARACkASQAAASMiBhURFBY7AQURAycjETM3EzgBMRQGBzEXPgE1NCYnMQceARU4ATkBMzgBMRQGBzEXNjc+ATc2NTQnLgEnJicxBx4BFTgBOQEBHskRGRkRyQE3Vci4uMjVIR08KS8vKTwdIas8NT0gGRojCgkJCiMaGSA9NTwClRkR/qoRGdADSv1VhgEAhv76LE4dPChtPj5tKDwdTixQizQ9ICYlVC4uMTEuLlQlJiA9NItQAAAABABVAEADqwNAAAMAFwAeACUAAAERIRElISIGFTERFBYzMSEyNjUxETQmIwEnNxcHFwchJzcnNxcHA1X9VgLV/QASGRkSAwASGRkS/gCSkjxVVTwBADxVVTySkgLr/aoCVlUZEv1WEhkZEgKqEhn97pKSPVVVPT1VVT2SkgAAAAAEAFUAQAOrA0AAAwAXAB4AJQAAAREhESUhIgYVMREUFjMxITI2NTERNCYjATcnBxcHFyE3JzcnBxcDVf1WAtX9ABIZGRIDABIZGRL9q5GRPVZWPQGqPVZWPZGRAuv9qgJWVRkS/VYSGRkSAqoSGf3ukpI9VVU9PVVVPZKSAAAAAAQAVQBAA6sDQAADABcAHgAkAAABESERJSEiBhUxERQWMzEhMjY1MRE0JiMBNTM1IxUzIRUjFTM1A1X9VgLV/QASGRkSAwASGRkS/dWA1VUBVoDVAuv9qgJWVRkS/VYSGRkSAqoSGf6AgFXVgFXVAAAEAFUAQAOrA0AAAwAXAB4AJQAAAREhESUhIgYVMREUFjMxITI2NTERNCYjBRUjFTM1IwE1MzUjFTMDVf1WAtX9ABIZGRIDABIZGRL+AIDVVQEAgNVVAuv9qgJWVRkS/VYSGRkSAqoSGatVVar+VlVVqgAAAAQAVQBAA6sDQAAVABkALQA3AAAlIREhETMRNCYjMSEiBhUxERQWMzEhARUhNSUhIgYVMREUFjMxITI2NTERNCYjARUnBxcjFTM1IwGr/wACqlYZEv0AEhkZEgErAar/AAEr/qsSGRkSAVUSGRkS/gBiPGJE1VWVAlb/AAEqEhkZEv1WEhkBAKurVRkR/wASGRkSAQARGQEAQ2I9YlXVAAAEAFUAQAOrA0AAFQAZAC0ANwAAJSERIREzETQmIzEhIgYVMREUFjMxIQEVITUlISIGFTERFBYzMSEyNjUxETQmIyU1FzcnMzUjFTMBq/8AAqpWGRL9ABIZGRIBKwGq/wABK/6rEhkZEgFVEhkZEv3VYj1iQ9VVlQJW/wABKhIZGRL9VhIZAQCrq1UZEf8AEhkZEgEAERkrRGI8YlXVAAAABABVAEADqwNAAAUACwARABcAABM1MzUhESUzFTMRIQEjNSMRIQEVIxUhEauq/wACVqpW/wD+qqpWAQACAKoBAAJAq1X/AKurAQD9Vav/AAEAq1UBAAAAAAQAVQBAA6sDQAAGAA0AFAAaAAABFSMVIREjBSM1IxEhNQEzFTMRIRUFNTM1IREBAKsBAFUCq6tVAQD8qqtV/wACq6v/AANAq1UBAKur/wBV/larAQBVq6tV/wAABgBVAAADqwNAAA8AFAAZAB4AIwAoAAABISIGFRE3ITI2NRE0JiMxAyEHESEFMxUjNTsBFSM1ByEVITUhMxUjNQOA/QASGbsCcBIZGRIr/Z1HAqr9q4CA1dbW1QEA/wABVaurA0AZEvzrlRkSAlUSGf2rOQI5VlVVVVWqVlZWVgAHAFUAAAPVA0AAEQAvAD8ATwBUAFkAXgAAJSEHESERMxE0JiMhIgYVETczASIHDgEHBhUUFx4BFxYzMjc+ATc2NTE0Jy4BJyYjFxQGBzUnPgEzMhYVOAE5ASE0NjcxFw4BIyImNTA0OQEBMxUjNTsBFSM1ByEVITUCAP7yRwKqVhkS/QASGbvwAQAsJyc6ERAQETonJywsJyc6ERAQETonJyyABwaqDBwPNUv/AAcGqgwcDzVL/oCAgNXW1tUBAP8A6zkCOf8AASoSGRkS/OuVASsRETknJywtJic6ERERETonJi0sJyc5ERHVDxwNAaoGB0s1DxwMqwYGSjUBAapVVVVVqlZWAAAGAFUAAAPOA0AAEQBDAFIAVwBcAGEAACUhBxEhETMRNCYjISIGFRE3MyU0JicVNycHLgEvATUjFQ4BBzEnBxcOARUUFhc1Bxc3HgEXMxUzNT4BNzEXNyc+ATUxByImNTQ2MzIWFTEUBiMxATMVIzU7ARUjNQchFSE1AgD+8kcCqlYZEv0AEhm78AGrBAMqKykQKBYBVhcoECkrKgMEBAMqKykQKBYBVhcoECkrKgMEqyMyMiMjMjIj/gCAgNXW1tUBAP8A6zkCOf8AASoSGRkS/OuVVgwXCwEYShgQGAUBMDAGGBAYShgKFwwNFwsBGEoYEBcGMTEGFxAYShgKFw1WMiQjMjIjJDICAFVVVVWqVlYAAAAGAFX/+QPxA0AAEQAhAEMASABNAFIAACUjBxEhETMRNCYjISIGFRE3MyUeAR8BDgEPAS4BLwE+ATc3MQYHDgEHBg8BFhceARcWHwE2Nz4BNzY/ASYnLgEnJi8BJTMVIzU7ARUjNQchFSE1AdXjRwKqVhkS/QASGbvFASsWLxkBGi8VARYvGQEaLxUBFxobPCEhJAMlIiI8GhoWAhcaGzwhISQDJSIiPBoaFgL+AICA1dbW1QEA/wDrOQI5/wABKhIZGRL865W1Gi8VARYvGQEaLhYBFi8ZkyUiIjwaGxYBFxobPCEhJQMmIiE9GhoWAhYbGjwhIiQDuVVVVVWqVlYAAwCrAEADVQM+AAQADAAPAAA3IRUhNSU3ASMBFzchJRsBqwKq/VYCWkz+1Uz+1UxKAXb+tZCQlVVVLSYCVv2qJpNWASD+4AAAAgCAAA8DlANxAB4AJQAACQEuASMiBhU4ATkBETgBMRQWMzI2NxUBPgE1NCYnMQERITUhEQEDif0XAwUDCQwMCQMFAwLpBQYGBf1MAQD/AAIlAdMBnAEBDAn8yAkMAQIBAZwDCgYGCgP+vgEEVgEE/tEAAAAEAGUAFQObA2sAVACbAKoAuQAAARwBFRQGIyImJzMOAQ8BHgEVFAYHMR4BFzE+ATMyFhUcARUxHgEzMjY3BzwBNTQ2MzIWFyM+AT8BLgE1NDY3MS4BJzEOASMiJjU8ATUxLgEjIgYHNxceATMyNjcjHgEfAQ4BFRQWFzEOAQc3LgEjIgYHFQYiIyoBJy4BIyIGBzMuAS8BPgE1NCYnMT4BNwceATMyNjc1NjIzOgEXBzIWFRQGIyImNTE0NjMxNSIGFRQWMzI2NTE0JiMxAZVLNRMkDwElNw4BHycnHw83JQ8jEzVLGDccHDgaA0s1EyQPASU3DgEfJycfDzclDyMTNUsYNxwcOBoDixZuRwsXCwIJEAYBGR0dGQcQCgEKFgtHbhYIEAgIEAgWbkcLFwoBCRAGARkdHRkHEAoBChYLR24WCBAICBAIICMyMiMjMjIjR2RkR0dkZEcDXQEEAjVLCwomXDQDED0lJT0QNl0mCgtLNQIEAQcHCAcBAQQCNUsLCiZcNAMQPSUlPRA2XSYKC0s1AgQBBwcIBwFJQVIDAgwbDwIcSSkpSRwQHA0BAwJSPwIBAUFSAwIMGw8CHEkpKUkcEBwNAQMCUj8CAQH/MiMjMjIjIzJWZEdHZGRHR2QAAAAABABVAEADqwNAAAMAFwA7AF8AAAERIRElISIGFTERFBYzMSEyNjUxETQmIwE4ATEiJjU0NjMyFhcxNy4BIyIGFRQWMzI2NzEnDgEjOAE5ASE4ATEiJjU0NjMyFhcxNy4BIyIGFRQWMzI2NzEnDgEjOAE5AQNV/VYC1f0AEhkZEgMAEhkZEv4AIzIyIxIfCz0XPyNHZGRHIz8XPQsfEgErJDIyJBEfDDwXPiNHZGRHIz4XPAwfEQLr/aoCVlUZEv1WEhkZEgKqEhn+KzIjIzINDD0XG2RHR2QbFz0MDTIjIzINDD0XG2RHR2QbFz0MDQAAAQBEAAQDqwN8AAkAAAEXASEVIQEHCQECADz+qwLE/TwBVTz+RAG8A3w8/qtW/qs8AbwBvAAAAAABAFUABAO8A3wACQAAAQcBIRUhARcJAQIAPAFV/TwCxP6rPAG8/kQDfDz+q1b+qzwBvAG8AAAAAAEAjQBNA3MDMwALAAABJwkBBwkBFwkBNwEDczz+yf7JPAE3/sk8ATcBNzz+yQL3PP7JATc8/sn+yTwBN/7JPAE3AAAAAQAAAAEAABeY2jdfDzz1AAsEAAAAAADd6Pu0AAAAAN3o+7QAAP/5A/EDfAAAAAgAAgAAAAAAAAABAAADwP/AAAAEAAAAAAAD8QABAAAAAAAAAAAAAAAAAAAAHwQAAAAAAAAAAAAAAAIAAAAEAACrBAAAqwQAAIAEAACABAAAGQQAABkEAAArBAAAKwQAAFUEAABVBAAAVQQAAFUEAABVBAAAVQQAAFUEAABVBAAAVQQAAFUEAABVBAAAVQQAAKsEAACABAAAZQQAAFUEAABEBAAAVQQAAI0AAAAAAAoAFAAeAEwAfgDEAQgBRgGEAboCHAJcApwC1AMOA14DrgPaBAgESATMBVYF1gX6BjQHJgeeB7oH1gf4AAEAAAAfALoABwAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAPAAAAAQAAAAAAAgAHAKgAAQAAAAAAAwAPAE4AAQAAAAAABAAPAL0AAQAAAAAABQALAC0AAQAAAAAABgAPAHsAAQAAAAAACgAaAOoAAwABBAkAAQAeAA8AAwABBAkAAgAOAK8AAwABBAkAAwAeAF0AAwABBAkABAAeAMwAAwABBAkABQAWADgAAwABBAkABgAeAIoAAwABBAkACgA0AQRtZnVuc1BsYXllckljb24AbQBmAHUAbgBzAFAAbABhAHkAZQByAEkAYwBvAG5WZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADBtZnVuc1BsYXllckljb24AbQBmAHUAbgBzAFAAbABhAHkAZQByAEkAYwBvAG5tZnVuc1BsYXllckljb24AbQBmAHUAbgBzAFAAbABhAHkAZQByAEkAYwBvAG5SZWd1bGFyAFIAZQBnAHUAbABhAHJtZnVuc1BsYXllckljb24AbQBmAHUAbgBzAFAAbABhAHkAZQByAEkAYwBvAG5Gb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

/***/ }),

/***/ "./src/icon/control.png":
/*!******************************!*\
  !*** ./src/icon/control.png ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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");

/***/ }),

/***/ "./src/icon/fonts/mfunsPlayerIcon.svg?dkb9ab":
/*!***************************************************!*\
  !*** ./src/icon/fonts/mfunsPlayerIcon.svg?dkb9ab ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8bWV0YWRhdGE+R2VuZXJhdGVkIGJ5IEljb01vb248L21ldGFkYXRhPgo8ZGVmcz4KPGZvbnQgaWQ9Im1mdW5zUGxheWVySWNvbiIgaG9yaXotYWR2LXg9IjEwMjQiPgo8Zm9udC1mYWNlIHVuaXRzLXBlci1lbT0iMTAyNCIgYXNjZW50PSI5NjAiIGRlc2NlbnQ9Ii02NCIgLz4KPG1pc3NpbmctZ2x5cGggaG9yaXotYWR2LXg9IjEwMjQiIC8+CjxnbHlwaCB1bmljb2RlPSImI3gyMDsiIGhvcml6LWFkdi14PSI1MTIiIGQ9IiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGU5MDA7IiBnbHlwaC1uYW1lPSJwbGF5IiBkPSJNMjEzLjM5OCA4NjAuMjM1Yy0wLjAwNCAwLTAuMDA4IDAtMC4wMTMgMC0yMy41OTMgMC00Mi43MTktMTkuMTI2LTQyLjcxOS00Mi43MTkgMC0wLjAwNCAwLTAuMDA4IDAtMC4wMTJ2MC4wMDEtNzM5LjAwOWMwLTAuMDQ1IDAtMC4wOTggMC0wLjE1MSAwLTIzLjUxNiAxOS4wNjQtNDIuNTggNDIuNTgtNDIuNTggNy44OTIgMCAxNS4yODIgMi4xNDcgMjEuNjE5IDUuODg5bC0wLjE5OC0wLjEwOCA2NDAgMzY5LjUwNGMxMi44NDMgNy41MTUgMjEuMzMzIDIxLjI0MSAyMS4zMzMgMzYuOTUxcy04LjQ5IDI5LjQzNi0yMS4xMzIgMzYuODQybC0wLjIwMSAwLjEwOS02NDAgMzY5LjUwNGMtNi4wOTIgMy42MTktMTMuNDI4IDUuNzY0LTIxLjI2NCA1Ljc4aC0wLjAwNXoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTAxOyIgZ2x5cGgtbmFtZT0icGF1c2UiIGQ9Ik03MjUuMzMzIDg1My4zMzNoODUuMzMzYzIzLjU2NCAwIDQyLjY2Ny0xOS4xMDMgNDIuNjY3LTQyLjY2N3YtNzI1LjMzM2MwLTIzLjU2NC0xOS4xMDMtNDIuNjY3LTQyLjY2Ny00Mi42NjdoLTg1LjMzM2MtMjMuNTY0IDAtNDIuNjY3IDE5LjEwMy00Mi42NjcgNDIuNjY3djcyNS4zMzNjMCAyMy41NjQgMTkuMTAzIDQyLjY2NyA0Mi42NjcgNDIuNjY3ek0yMTMuMzMzIDg1My4zMzNoODUuMzMzYzIzLjU2NCAwIDQyLjY2Ny0xOS4xMDMgNDIuNjY3LTQyLjY2N3YtNzI1LjMzM2MwLTIzLjU2NC0xOS4xMDMtNDIuNjY3LTQyLjY2Ny00Mi42NjdoLTg1LjMzM2MtMjMuNTY0IDAtNDIuNjY3IDE5LjEwMy00Mi42NjcgNDIuNjY3djcyNS4zMzNjMCAyMy41NjQgMTkuMTAzIDQyLjY2NyA0Mi42NjcgNDIuNjY3eiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGU5MDI7IiBnbHlwaC1uYW1lPSJwcmV2IiBkPSJNODUzLjEzIDg0NS40MmMwLjA1MyAwIDAuMTE2IDAgMC4xNzkgMCAyMy41NzcgMCA0Mi42OTEtMTkuMTEzIDQyLjY5MS00Mi42OTEgMC0wLjAyMCAwLTAuMDQwIDAtMC4wNjB2MC4wMDMtNzA5LjM0NWMwLTAuMDE2IDAtMC4wMzUgMC0wLjA1NCAwLTIzLjU3OS0xOS4xMTUtNDIuNjkzLTQyLjY5My00Mi42OTMtMC4wNjIgMC0wLjEyNCAwLTAuMTg2IDBoMC4wMTBjLTEwLjA2MSAwLjAxNi0xOS4yOSAzLjU2OC0yNi41MTMgOS40NzlsMC4wNzUtMC4wNTktNDQzLjY2OSAzNTQuNjczYy05LjgwNCA3Ljg4NS0xNi4wMjUgMTkuODc5LTE2LjAyNSAzMy4zMjdzNi4yMjEgMjUuNDQyIDE1Ljk0MyAzMy4yNjJsMC4wODMgMC4wNjQgNDQzLjY2OSAzNTQuNjczYzcuMTQ5IDUuODUyIDE2LjM3NyA5LjQwMyAyNi40MzUgOS40MmgwLjAwNHpNMTcwLjY2NiA4MzJoODUuMzMzYzIzLjU2NCAwIDQyLjY2Ny0xOS4xMDMgNDIuNjY3LTQyLjY2N3YtNjgyLjY2NmMwLTIzLjU2NC0xOS4xMDMtNDIuNjY3LTQyLjY2Ny00Mi42NjdoLTg1LjMzM2MtMjMuNTY0IDAtNDIuNjY3IDE5LjEwMy00Mi42NjcgNDIuNjY3djY4Mi42NjZjMCAyMy41NjQgMTkuMTAzIDQyLjY2NyA0Mi42NjcgNDIuNjY3eiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGU5MDM7IiBnbHlwaC1uYW1lPSJuZXh0IiBkPSJNMTcwLjg3IDg0NS40MmMtMC4wNTMgMC0wLjExNiAwLTAuMTc5IDAtMjMuNTc3IDAtNDIuNjkxLTE5LjExMy00Mi42OTEtNDIuNjkxIDAtMC4wMjAgMC0wLjA0MCAwLTAuMDYwdjAuMDAzLTcwOS4zNDVjMC0wLjAxNiAwLTAuMDM1IDAtMC4wNTQgMC0yMy41NzkgMTkuMTE1LTQyLjY5MyA0Mi42OTMtNDIuNjkzIDAuMDYyIDAgMC4xMjQgMCAwLjE4NiAwaC0wLjAxMGMxMC4wNjEgMC4wMTYgMTkuMjkgMy41NjggMjYuNTEzIDkuNDc5bC0wLjA3NS0wLjA1OSA0NDMuNjY5IDM1NC42NzNjOS44MDQgNy44ODUgMTYuMDI1IDE5Ljg3OSAxNi4wMjUgMzMuMzI3cy02LjIyMSAyNS40NDItMTUuOTQzIDMzLjI2MmwtMC4wODMgMC4wNjQtNDQzLjY2OSAzNTQuNjczYy03LjE0OSA1Ljg1Mi0xNi4zNzcgOS40MDMtMjYuNDM1IDkuNDJoLTAuMDA0ek03NjggODMyaDg1LjMzM2MyMy41NjQgMCA0Mi42NjctMTkuMTAzIDQyLjY2Ny00Mi42Njd2LTY4Mi42NjdjMC0yMy41NjQtMTkuMTAzLTQyLjY2Ny00Mi42NjctNDIuNjY3aC04NS4zMzNjLTIzLjU2NCAwLTQyLjY2NyAxOS4xMDMtNDIuNjY3IDQyLjY2N3Y2ODIuNjY3YzAgMjMuNTY0IDE5LjEwMyA0Mi42NjcgNDIuNjY3IDQyLjY2N3oiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTA0OyIgZ2x5cGgtbmFtZT0icmVwZWF0IiBkPSJNMjEzLjMzMyA3MDRoNTk3LjMzM3YtMjM4LjMyNWwtNDIuNjY3IDQyLjY2Ny02MC4zNDItNjAuMzQyIDE0NS42NzUtMTQ1LjY3NSAxNDUuNjc1IDE0NS42NzUtNjAuMzQyIDYwLjM0Mi00Mi42NjctNDIuNjY3djI4MC45OTJjMCAyMy41NjQtMTkuMTAzIDQyLjY2Ny00Mi42NjcgNDIuNjY3djBoLTY4Mi42NjdjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTg1LjMzM2g4NS4zMzN6TTgxMC42NjcgMTkyaC01OTcuMzMzdjIzOC4zMjVsNDIuNjY3LTQyLjY2NyA2MC4zNDIgNjAuMzQyLTE0NS42NzUgMTQ1LjY3NS0xNDUuNjc1LTE0NS42NzUgNjAuMzQyLTYwLjM0MiA0Mi42NjcgNDIuNjY3di0yODAuOTkyYzAtMjMuNTY0IDE5LjEwMy00Mi42NjcgNDIuNjY3LTQyLjY2N3YwaDY4Mi42NjdjMjMuNTY0IDAgNDIuNjY3IDE5LjEwMyA0Mi42NjcgNDIuNjY3djAgODUuMzMzaC04NS4zMzN6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTkwNTsiIGdseXBoLW5hbWU9InJlcGVhdC1vZmYiIGQ9Ik05MzguNjY3IDUwOC4zNDJsLTQyLjY2Ny00Mi42Njd2MjgwLjk5MmMwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MGgtNDY5LjMzM3YtODUuMzMzaDQyNi42Njd2LTIzOC4zMjVsLTQyLjY2NyA0Mi42NjctNjAuMzQyLTYwLjM0MiAxNDUuNjc1LTE0NS42NzUgMTQ1LjY3NSAxNDUuNjc1ek0yMTMuMzMzIDE5MnYyMzguMzI1bDQyLjY2Ny00Mi42NjcgNjAuMzQyIDYwLjM0Mi0xNDUuNjc1IDE0NS42NzUtMTQ1LjY3NS0xNDUuNjc1IDYwLjM0Mi02MC4zNDIgNDIuNjY3IDQyLjY2N3YtMjgwLjk5MmMwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGg0NjkuMzMzdjg1LjMzM3pNMTQwLjQ5NiA3NTkuMTYybDYwLjMzNyA2MC4zMzggNjgyLjY3MS02ODIuNjYyLTYwLjMzNy02MC4zMzgtNjgyLjY3MSA2ODIuNjYyeiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGU5MGM7IiBnbHlwaC1uYW1lPSJ2b2x1bWUtb2ZmIiBkPSJNMjg1Ljc4MSA2NjEuMzMzaC0yMDAuNDQ4Yy0yMy41NjEtMC4wMDktNDIuNjU4LTE5LjEwNi00Mi42NjctNDIuNjY2di0zNDEuMzM0YzAuMDA5LTIzLjU2MSAxOS4xMDYtNDIuNjU4IDQyLjY2Ni00Mi42NjdoMjAwLjQ0OWwzMTEuNTUyLTIwNy43MDF2ODQyLjA2OXpNNTEyIDE4Ni4zNjhsLTIwMC40NDggMTMzLjYzMmgtMTgzLjU1MnYyNTZoMTgzLjU1MmwyMDAuNDQ4IDEzMy42MzJ6TTk2OC44MzIgNTQ1LjgyNmwtNjAuMzMxIDYwLjM0OC05Ny44MzUtOTcuODM1LTk3LjgzNSA5Ny44MzUtNjAuMzMxLTYwLjM0OCA5Ny44MjYtOTcuODI2LTk3LjgyNi05Ny44MzUgNjAuMzMxLTYwLjMzMSA5Ny44MzUgOTcuODM1IDk3LjgzNS05Ny44MzUgNjAuMzMxIDYwLjMzMS05Ny44MjYgOTcuODM1IDk3LjgyNiA5Ny44MjZ6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTkwZjsiIGdseXBoLW5hbWU9InZvbHVtZSIgZD0iTTI4NS43ODEgNjYxLjMzM2gtMjAwLjQ0OGMtMjMuNTYxLTAuMDA5LTQyLjY1OC0xOS4xMDYtNDIuNjY3LTQyLjY2NnYtMzQxLjMzNGMwLjAwOS0yMy41NjEgMTkuMTA2LTQyLjY1OCA0Mi42NjYtNDIuNjY3aDIwMC40NDlsMzExLjU1Mi0yMDcuNzAxdjg0Mi4wNjl6TTUxMiAxODYuMzY4bC0yMDAuNDQ4IDEzMy42MzJoLTE4My41NTJ2MjU2aDE4My41NTJsMjAwLjQ0OCAxMzMuNjMyek03MjUuMzMzIDQ0OGMwLTAuMDQwIDAtMC4wODcgMC0wLjEzNCAwLTU4Ljg1OS0yMy45MTEtMTEyLjEzMy02Mi41NDktMTUwLjYzOWwtMC4wMDYtMC4wMDYgNjAuNDEtNjAuNDFjNTQuMDQ4IDU0LjA0OCA4Ny40NzggMTI4LjcxNSA4Ny40NzggMjExLjE4OXMtMzMuNDI5IDE1Ny4xNDEtODcuNDc4IDIxMS4xODl2MGwtNjAuNDEtNjAuNDFjMzguNjQ0LTM4LjUxMiA2Mi41NTUtOTEuNzg2IDYyLjU1NS0xNTAuNjQ1IDAtMC4wNDcgMC0wLjA5NCAwLTAuMTQxdjAuMDA3ek04OTYgNDQ4YzAtMC4wNzEgMC0wLjE1NiAwLTAuMjQxIDAtMTA1Ljk0Ni00My4wMzktMjAxLjgzOS0xMTIuNTg4LTI3MS4xNWwtMC4wMTEtMC4wMTEgNjAuNDY3LTYwLjQ2N2M4NC45MzMgODQuOTMzIDEzNy40NjUgMjAyLjI2NiAxMzcuNDY1IDMzMS44NjlzLTUyLjUzMiAyNDYuOTM2LTEzNy40NjUgMzMxLjg2OXYwbC02MC40NjctNjAuNDY3YzY5LjU1OS02OS4zMjEgMTEyLjU5OC0xNjUuMjE1IDExMi41OTgtMjcxLjE2IDAtMC4wODUgMC0wLjE3IDAtMC4yNTR2MC4wMTN6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxMDsiIGdseXBoLW5hbWU9IndpZGVzY3JlZW4iIGQ9Ik04NTMuMzMzIDc0Ni42Njd2LTU5Ny4zMzNoLTY4Mi42Njd2NTk3LjMzM2g2ODIuNjY3ek04OTYgODMyaC03NjhjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTY4Mi42NjdjMC0yMy41NjQgMTkuMTAzLTQyLjY2NyA0Mi42NjctNDIuNjY3djBoNzY4YzIzLjU2NCAwIDQyLjY2NyAxOS4xMDMgNDIuNjY3IDQyLjY2N3YwIDY4Mi42NjdjMCAyMy41NjQtMTkuMTAzIDQyLjY2Ny00Mi42NjcgNDIuNjY3djB6TTM4NCAzMDIuMzI3bC0xNDUuNjczIDE0NS42NzMgMTQ1LjY3MyAxNDUuNjczIDYwLjMzOS02MC4zMzktODUuMzMzLTg1LjMzMyA4NS4zMzMtODUuMzMzLTYwLjMzOS02MC4zMzl6TTY0MCAzMDIuMzI3bC02MC4zMzkgNjAuMzM5IDg1LjMzMyA4NS4zMzMtODUuMzMzIDg1LjMzMyA2MC4zMzkgNjAuMzM5IDE0NS42NzMtMTQ1LjY3My0xNDUuNjczLTE0NS42NzN6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxMTsiIGdseXBoLW5hbWU9IndpZGVzY3JlZW4tZXhpdCIgZD0iTTg1My4zMzMgNzQ2LjY2N3YtNTk3LjMzM2gtNjgyLjY2N3Y1OTcuMzMzaDY4Mi42Njd6TTg5NiA4MzJoLTc2OGMtMjMuNTY0IDAtNDIuNjY3LTE5LjEwMy00Mi42NjctNDIuNjY3djAtNjgyLjY2N2MwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGg3NjhjMjMuNTY0IDAgNDIuNjY3IDE5LjEwMyA0Mi42NjcgNDIuNjY3djAgNjgyLjY2N2MwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMjk4LjY2NyAzMDIuMzI3bDE0NS42NzMgMTQ1LjY3My0xNDUuNjczIDE0NS42NzMtNjAuMzM5LTYwLjMzOSA4NS4zMzMtODUuMzMzLTg1LjMzMy04NS4zMzMgNjAuMzM5LTYwLjMzOXpNNzI1LjMzMyAzMDIuMzI3bDYwLjMzOSA2MC4zMzktODUuMzMzIDg1LjMzMyA4NS4zMzMgODUuMzMzLTYwLjMzOSA2MC4zMzktMTQ1LjY3My0xNDUuNjczIDE0NS42NzMtMTQ1LjY3M3oiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTEyOyIgZ2x5cGgtbmFtZT0id2ViLWZ1bGxzY3JlZW4iIGQ9Ik04NTMuMzMzIDc0Ni42Njd2LTU5Ny4zMzNoLTY4Mi42Njd2NTk3LjMzM2g2ODIuNjY3ek04OTYgODMyaC03NjhjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTY4Mi42NjdjMC0yMy41NjQgMTkuMTAzLTQyLjY2NyA0Mi42NjctNDIuNjY3djBoNzY4YzIzLjU2NCAwIDQyLjY2NyAxOS4xMDMgNDIuNjY3IDQyLjY2N3YwIDY4Mi42NjdjMCAyMy41NjQtMTkuMTAzIDQyLjY2Ny00Mi42NjcgNDIuNjY3djB6TTM0MS4zMzMgNDQ4djEyOGgxMjh2ODUuMzMzaC0yMTMuMzMzdi0yMTMuMzMzaDg1LjMzM3pNNjgyLjY2NyA0NDh2LTEyOGgtMTI4di04NS4zMzNoMjEzLjMzM3YyMTMuMzMzaC04NS4zMzN6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxMzsiIGdseXBoLW5hbWU9IndlYi1mdWxsc2NyZWVuLWV4aXQiIGQ9Ik04NTMuMzMzIDc0Ni42Njd2LTU5Ny4zMzNoLTY4Mi42Njd2NTk3LjMzM2g2ODIuNjY3ek04OTYgODMyaC03NjhjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTY4Mi42NjdjMC0yMy41NjQgMTkuMTAzLTQyLjY2NyA0Mi42NjctNDIuNjY3djBoNzY4YzIzLjU2NCAwIDQyLjY2NyAxOS4xMDMgNDIuNjY3IDQyLjY2N3YwIDY4Mi42NjdjMCAyMy41NjQtMTkuMTAzIDQyLjY2Ny00Mi42NjcgNDIuNjY3djB6TTM4NCA2NjEuMzMzdi04NS4zMzNoLTEyOHYtODUuMzMzaDIxMy4zMzN2MTcwLjY2N2gtODUuMzMzek02NDAgMjM0LjY2N3Y4NS4zMzNoMTI4djg1LjMzM2gtMjEzLjMzM3YtMTcwLjY2N2g4NS4zMzN6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTkxNDsiIGdseXBoLW5hbWU9InBpY3R1cmUtaW4tcGljdHVyZSIgZD0iTTQyNi42NjcgMTQ5LjMzM2gtMjU2djU5Ny4zMzNoNjgyLjY2N3YtMjU2aDg1LjMzM3YyOTguNjY3YzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3YwaC03NjhjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTY4Mi42NjdjMC0yMy41NjQgMTkuMTAzLTQyLjY2NyA0Mi42NjctNDIuNjY3djBoMjk4LjY2N3pNODUzLjMzMyAzMjB2LTE3MC42NjdoLTI1NnYxNzAuNjY3aDI1NnpNODk2IDQwNS4zMzNoLTM0MS4zMzNjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTI1NmMwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGgzNDEuMzMzYzIzLjU2NCAwIDQyLjY2NyAxOS4xMDMgNDIuNjY3IDQyLjY2N3YwIDI1NmMwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMzg0IDY2MS4zMzN2LTY3LjY2MWwtOTcuODI2IDk3LjgzNS02MC4zNDgtNjAuMzQ4IDk3LjgzNS05Ny44MjZoLTY3LjY2MXYtODUuMzMzaDIxMy4zMzN2MjEzLjMzM2gtODUuMzMzeiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGU5MTU7IiBnbHlwaC1uYW1lPSJwaWN0dXJlLWluLXBpY3R1cmUtZXhpdCIgZD0iTTQyNi42NjcgMTQ5LjMzM2gtMjU2djU5Ny4zMzNoNjgyLjY2N3YtMjU2aDg1LjMzM3YyOTguNjY3YzAgMjMuNTY0LTE5LjEwMyA0Mi42NjctNDIuNjY3IDQyLjY2N3YwaC03NjhjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTY4Mi42NjdjMC0yMy41NjQgMTkuMTAzLTQyLjY2NyA0Mi42NjctNDIuNjY3djBoMjk4LjY2N3pNODUzLjMzMyAzMjB2LTE3MC42NjdoLTI1NnYxNzAuNjY3aDI1NnpNODk2IDQwNS4zMzNoLTM0MS4zMzNjLTIzLjU2NCAwLTQyLjY2Ny0xOS4xMDMtNDIuNjY3LTQyLjY2N3YwLTI1NmMwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGgzNDEuMzMzYzIzLjU2NCAwIDQyLjY2NyAxOS4xMDMgNDIuNjY3IDQyLjY2N3YwIDI1NmMwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMzQxLjMzMyA0NDh2NjcuNjYxbDk3LjgyNi05Ny44MzUgNjAuMzQ4IDYwLjM0OC05Ny44MzUgOTcuODI2aDY3LjY2MXY4NS4zMzNoLTIxMy4zMzN2LTIxMy4zMzNoODUuMzMzeiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGU5MWU7IiBnbHlwaC1uYW1lPSJmdWxsc2NyZWVuIiBkPSJNMTcwLjY2NyA1NzZ2MTcwLjY2N2gxNzAuNjY3djg1LjMzM2gtMjU2di0yNTZoODUuMzMzek02ODIuNjY3IDc0Ni42NjdoMTcwLjY2N3YtMTcwLjY2N2g4NS4zMzN2MjU2aC0yNTZ2LTg1LjMzM3pNMzQxLjMzMyAxNDkuMzMzaC0xNzAuNjY3djE3MC42NjdoLTg1LjMzM3YtMjU2aDI1NnY4NS4zMzN6TTg1My4zMzMgMzIwdi0xNzAuNjY3aC0xNzAuNjY3di04NS4zMzNoMjU2djI1NmgtODUuMzMzeiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGU5MWY7IiBnbHlwaC1uYW1lPSJmdWxsc2NyZWVuLWV4aXQiIGQ9Ik0yNTYgODMydi0xNzAuNjY3aC0xNzAuNjY3di04NS4zMzNoMjU2djI1NmgtODUuMzMzek05MzguNjY3IDY2MS4zMzNoLTE3MC42Njd2MTcwLjY2N2gtODUuMzMzdi0yNTZoMjU2djg1LjMzM3pNODUuMzMzIDIzNC42NjdoMTcwLjY2N3YtMTcwLjY2N2g4NS4zMzN2MjU2aC0yNTZ2LTg1LjMzM3pNNzY4IDY0djE3MC42NjdoMTcwLjY2N3Y4NS4zMzNoLTI1NnYtMjU2aDg1LjMzM3oiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTIwOyIgZ2x5cGgtbmFtZT0iZGFubWFrdSIgZD0iTTg5NiA4MzJoLTc2OGMtMjMuNTYxLTAuMDA5LTQyLjY1OC0xOS4xMDYtNDIuNjY3LTQyLjY2NnYtNzg5LjMzNGwxODYuNzA5IDE0OS4zMzNoNjIzLjk1N2MyMy41NjEgMC4wMDkgNDIuNjU4IDE5LjEwNiA0Mi42NjcgNDIuNjY2djU5Ny4zMzRjLTAuMDA5IDIzLjU2MS0xOS4xMDYgNDIuNjU4LTQyLjY2NiA0Mi42NjdoLTAuMDAxek04NTMuMzMzIDIzNC42NjdoLTYxMS4zMjhsLTcxLjMzOS01Ny4wODh2NTY5LjA4OGg2ODIuNjY3ek0yNTYgNjYxLjMzM2gxMjh2LTg1LjMzM2gtMTI4djg1LjMzM3pNNDY5LjMzMyA2NjEuMzMzaDIxMy4zMzN2LTg1LjMzM2gtMjEzLjMzM3Y4NS4zMzN6TTI1NiA0OTAuNjY3aDI1NnYtODUuMzMzaC0yNTZ2ODUuMzMzek01OTcuMzMzIDQ5MC42NjdoMTcwLjY2N3YtODUuMzMzaC0xNzAuNjY3djg1LjMzM3oiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTIxOyIgZ2x5cGgtbmFtZT0iZGFubWFrdS1vZmYiIGQ9Ik01MTIgMjM0LjY2N2gtMjY5Ljk5NWwtNzEuMzM5LTU3LjA4OHY1NjkuMDg4aDY4Mi42Njd2LTI1Nmg4NS4zMzN2Mjk4LjY2N2MtMC4wMDkgMjMuNTYxLTE5LjEwNiA0Mi42NTgtNDIuNjY2IDQyLjY2N2gtNzY4LjAwMWMtMjMuNTYxLTAuMDA5LTQyLjY1OC0xOS4xMDYtNDIuNjY3LTQyLjY2NnYtNzg5LjMzNGwxODYuNzA5IDE0OS4zMzNoMjM5Ljk1N3pNNzY4IDQ0OGMtMTE3LjgyMSAwLTIxMy4zMzMtOTUuNTEzLTIxMy4zMzMtMjEzLjMzM3M5NS41MTMtMjEzLjMzMyAyMTMuMzMzLTIxMy4zMzNjMTE3LjgyMSAwIDIxMy4zMzMgOTUuNTEzIDIxMy4zMzMgMjEzLjMzM3YwYzAgMTE3LjgyMS05NS41MTMgMjEzLjMzMy0yMTMuMzMzIDIxMy4zMzN2MHpNODk2IDIzNC42NjdjLTAuMDIzLTIwLjAyNS00LjY3Ny0zOC45NTctMTIuOTQ4LTU1Ljc5MWwwLjMzMiAwLjc0Ny0xNzAuNDI4IDE3MC40MjhjMTYuMTggNy45NiAzNS4yMTkgMTIuNjE2IDU1LjM0NSAxMi42MTYgNzAuNTI3IDAgMTI3LjctNTcuMTczIDEyNy43LTEyNy43IDAtMC4xMDYgMC0wLjIxMSAwLTAuMzE3djAuMDE2ek02NDAgMjM0LjY2N2MwLjAyMyAyMC4wMjUgNC42NzcgMzguOTU3IDEyLjk0OCA1NS43OTFsLTAuMzMyLTAuNzQ3IDE3MC40MjgtMTcwLjQyOGMtMTYuMTgtNy45NjEtMzUuMjE5LTEyLjYxNy01NS4zNDYtMTIuNjE3LTcwLjUyNiAwLTEyNy42OTggNTcuMTcyLTEyNy42OTggMTI3LjY5OCAwIDAuMTA2IDAgMC4yMTIgMCAwLjMxOXYtMC4wMTZ6TTI1NiA2NjEuMzMzaDEyOHYtODUuMzMzaC0xMjh2ODUuMzMzek00NjkuMzMzIDY2MS4zMzNoMjEzLjMzM3YtODUuMzMzaC0yMTMuMzMzdjg1LjMzM3pNMjU2IDQ5MC42NjdoMjU2di04NS4zMzNoLTI1NnY4NS4zMzN6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTkyMzsiIGdseXBoLW5hbWU9ImRhbm1ha3Utc2V0dGluZ3MiIGQ9Ik01MTIgMjM0LjY2N2gtMjY5Ljk5NWwtNzEuMzM5LTU3LjA4OHY1NjkuMDg4aDY4Mi42Njd2LTI1Nmg4NS4zMzN2Mjk4LjY2N2MtMC4wMDkgMjMuNTYxLTE5LjEwNiA0Mi42NTgtNDIuNjY2IDQyLjY2N2gtNzY4LjAwMWMtMjMuNTYxLTAuMDA5LTQyLjY1OC0xOS4xMDYtNDIuNjY3LTQyLjY2NnYtNzg5LjMzNGwxODYuNzA5IDE0OS4zMzNoMjM5Ljk1N3pNOTM4LjY2NyAyMzQuNjY3Yy0wLjA0NyAxNi4yNTMtMi4zNjMgMzEuOTQ2LTYuNjQ2IDQ2LjgwNGwwLjI5Ny0xLjIwMyA0MS43NjcgMjQuMTE1LTQyLjY2NyA3My45MDEtNDEuNzAzLTI0LjA3OGMtMjEuMTI5IDIxLjQ3My00Ny44NzcgMzcuMzU1LTc3Ljg2MiA0NS4yNjdsLTEuMTg3IDAuMjY2djQ4LjI2MWgtODUuMzMzdi00OC4yNjFjLTMxLjE3Mi04LjE3OC01Ny45Mi0yNC4wNjAtNzkuMDI3LTQ1LjUxbC0wLjAyMi0wLjAyMi00MS43MDMgMjQuMDc4LTQyLjY2Ny03My45MDEgNDEuNzY4LTI0LjExNWMtNC4wMzAtMTMuNjY0LTYuMzQ5LTI5LjM2Mi02LjM0OS00NS42MDJzMi4zMTktMzEuOTM4IDYuNjQzLTQ2Ljc4MWwtMC4yOTQgMS4xOC00MS43NjgtMjQuMTE1IDQyLjY2Ny03My45MDEgNDEuNzAzIDI0LjA3OGMyMS4xMjktMjEuNDczIDQ3Ljg3Ny0zNy4zNTUgNzcuODYyLTQ1LjI2N2wxLjE4Ny0wLjI2NnYtNDguMjYxaDg1LjMzM3Y0OC4yNjFjMzEuMTcyIDguMTc3IDU3LjkyIDI0LjA2MCA3OS4wMjcgNDUuNTFsMC4wMjIgMC4wMjMgNDEuNzAzLTI0LjA3OCA0Mi42NjcgNzMuOTAxLTQxLjc2OCAyNC4xMTVjMy45ODYgMTMuNjU2IDYuMzAyIDI5LjM0OSA2LjM0OSA0NS41NzV2MC4wMjZ6TTc2OCAxNDkuMzMzYy00Ny4xMjggMC04NS4zMzMgMzguMjA1LTg1LjMzMyA4NS4zMzNzMzguMjA1IDg1LjMzMyA4NS4zMzMgODUuMzMzYzQ3LjEyOCAwIDg1LjMzMy0zOC4yMDUgODUuMzMzLTg1LjMzM3YwYy0wLjA1NS00Ny4xMDYtMzguMjI3LTg1LjI3OS04NS4zMjktODUuMzMzaC0wLjAwNXpNMjU2IDY2MS4zMzNoMTI4di04NS4zMzNoLTEyOHY4NS4zMzN6TTQ2OS4zMzMgNjYxLjMzM2gyMTMuMzMzdi04NS4zMzNoLTIxMy4zMzN2ODUuMzMzek0yNTYgNDkwLjY2N2gyNTZ2LTg1LjMzM2gtMjU2djg1LjMzM3oiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTI4OyIgZ2x5cGgtbmFtZT0iYWR2YW5jZWQtZGFubWFrdSIgZD0iTTQ2OS4zMzMgMjM0LjY2N2gtMjI3LjMyOGwtNzEuMzM5LTU3LjA4OHY1NjkuMDg4aDY4Mi42Njd2LTI1Nmg4NS4zMzN2Mjk4LjY2N2MtMC4wMDkgMjMuNTYxLTE5LjEwNiA0Mi42NTgtNDIuNjY2IDQyLjY2N2gtNzY4LjAwMWMtMjMuNTYxLTAuMDA5LTQyLjY1OC0xOS4xMDYtNDIuNjY3LTQyLjY2NnYtNzg5LjMzNGwxODYuNzA5IDE0OS4zMzNoMTk3LjI5MXpNNzY4IDMyOS43ODhjMjkuMzQ1LTM0LjY1NyA2MC40NjMtNjUuNzc2IDkzLjk2NS05NC4xNjZsMS4xNTYtMC45NTVjLTM0LjY1OC0yOS4zNDUtNjUuNzc2LTYwLjQ2My05NC4xNjctOTMuOTY2bC0wLjk1NC0xLjE1NWMtMjkuMzQ1IDM0LjY1Ny02MC40NjMgNjUuNzc2LTkzLjk2NSA5NC4xNjZsLTEuMTU2IDAuOTU1YzM0LjY1OCAyOS4zNDYgNjUuNzc2IDYwLjQ2NCA5NC4xNjcgOTMuOTY3bDAuOTU0IDEuMTU0ek03NjggNDc2LjAyNnYwYy02MC40NjEtOTkuNjI3LTE0MS43MzItMTgwLjg5OC0yMzguMjQ1LTIzOS42bC0zLjExNC0xLjc1OWM5OS42MjctNjAuNDYyIDE4MC44OTgtMTQxLjczMyAyMzkuNi0yMzguMjQ1bDEuNzU5LTMuMTEzYzYwLjQ2MiA5OS42MjcgMTQxLjczMyAxODAuODk4IDIzOC4yNDUgMjM5LjZsMy4xMTMgMS43NTljLTk5LjYyNyA2MC40NjItMTgwLjg5OCAxNDEuNzMzLTIzOS42IDIzOC4yNDVsLTEuNzU5IDMuMTEzek03NjgtNi42OTJ2MHpNMjU2IDY2MS4zMzNoMTI4di04NS4zMzNoLTEyOHY4NS4zMzN6TTQ2OS4zMzMgNjYxLjMzM2gyMTMuMzMzdi04NS4zMzNoLTIxMy4zMzN2ODUuMzMzek0yNTYgNDkwLjY2N2gyNTZ2LTg1LjMzM2gtMjU2djg1LjMzM3oiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTJhOyIgZ2x5cGgtbmFtZT0idGV4dCIgZD0iTTE3MC42NjcgMTQ5LjMzM2g2ODIuNjY3di04NS4zMzNoLTY4Mi42Njd2ODUuMzMzek03NzIuNTA4IDE5NC4yNWw3Ni4zMTcgMzguMTY3LTI5OC42NjcgNTk3LjMyOWgtNzYuMzIxbC0yOTguNjY3LTU5Ny4zMjkgNzYuMzI1LTM4LjE2NyA3My41NDEgMTQ3LjA4M2gzNzMuOTI5ek0zNjcuNzAzIDQyNi42NjdsMTQ0LjI5NyAyODguNTk2IDE0NC4yOTktMjg4LjU5NnoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTJmOyIgZ2x5cGgtbmFtZT0ic2VuZC1kYW5tYWt1IiBkPSJNOTA0Ljg4IDQ2Ni42NzJsLTc0NS4yMjggNDExLjgzN2MtMi45ODUgMS42OTQtNi41NTcgMi42OTItMTAuMzYzIDIuNjkyLTExLjc1OCAwLTIxLjI4OS05LjUzMi0yMS4yODktMjEuMjg5IDAtMC4wMjYgMC0wLjA1MyAwLTAuMDc5djAuMDA0LTgyMy42NzNjMC0wLjAyMiAwLTAuMDQ4IDAtMC4wNzQgMC0xMS43NTggOS41MzItMjEuMjg5IDIxLjI4OS0yMS4yODkgMy44MDUgMCA3LjM3NyAwLjk5OCAxMC40NjkgMi43NDhsLTAuMTA2LTAuMDU1IDc0NS4yMjggNDExLjgzNmM2LjYxNyAzLjcwOCAxMS4wMTUgMTAuNjc2IDExLjAxNSAxOC42NzJzLTQuMzk4IDE0Ljk2My0xMC45MDcgMTguNjE2bC0wLjEwNyAwLjA1NXpNMjEzLjMzMyAxNDQuNjU1djI2MC42NzhoMjU2djg1LjMzM2gtMjU2djI2MC42NzlsNTQ4LjkxLTMwMy4zNDV6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTkzMDsiIGdseXBoLW5hbWU9InNldHRpbmdzIiBkPSJNNDA1LjE2MyA4NjEuMDk5YzAuMTEtMS45ODkgMC4xNzMtNC4zMTcgMC4xNzMtNi42NTkgMC03MC42ODUtNTcuMzAyLTEyNy45ODctMTI3Ljk4Ny0xMjcuOTg3LTI1Ljg1OCAwLTQ5LjkyNCA3LjY2OC03MC4wNTAgMjAuODU0bDAuNDg3LTAuM2MtNDkuMzk3LTUwLjA2My04Ni40ODYtMTEyLjM5NC0xMDYuMjc5LTE4Mi4wMDVsLTAuNzI5LTIuOTk3YzQxLjgwNi0yMS42MiA2OS44ODgtNjQuNTMzIDY5Ljg4OC0xMTQuMDA1cy0yOC4wODItOTIuMzg2LTY5LjE3NS0xMTMuNjdsLTAuNzEzLTAuMzM2YzIwLjUyMi03Mi42MDkgNTcuNjExLTEzNC45NCAxMDcuMDU0LTE4NS4wNTBsLTAuMDQ2IDAuMDQ3YzE5LjYzOSAxMi44ODcgNDMuNzA1IDIwLjU1NSA2OS41NjMgMjAuNTU1IDcwLjY4NSAwIDEyNy45ODctNTcuMzAyIDEyNy45ODctMTI3Ljk4NyAwLTIuMzQyLTAuMDYzLTQuNjctMC4xODctNi45ODFsMC4wMTQgMC4zMjJjMzIuMDYxLTguNjE4IDY4Ljg3MS0xMy41NjggMTA2LjgzNy0xMy41NjhzNzQuNzc2IDQuOTUgMTA5LjgxOSAxNC4yNGwtMi45ODItMC42NzJjLTAuMTEgMS45ODktMC4xNzMgNC4zMTYtMC4xNzMgNi42NTggMCA3MC42ODUgNTcuMzAyIDEyNy45ODcgMTI3Ljk4NyAxMjcuOTg3IDI1Ljg1OCAwIDQ5LjkyNC03LjY2OCA3MC4wNTAtMjAuODU0bC0wLjQ4NyAwLjNjNDkuMzk3IDUwLjA2NCA4Ni40ODUgMTEyLjM5NCAxMDYuMjc5IDE4Mi4wMDZsMC43MjkgMi45OTdjLTQxLjgwNiAyMS42Mi02OS44ODggNjQuNTMzLTY5Ljg4OCAxMTQuMDA1czI4LjA4MiA5Mi4zODYgNjkuMTc1IDExMy42N2wwLjcxMyAwLjMzNmMtMjAuNTIzIDcyLjYwOS01Ny42MTEgMTM0Ljk0LTEwNy4wNTQgMTg1LjA1MGwwLjA0Ni0wLjA0N2MtMTkuNjM4LTEyLjg4Ni00My43MDUtMjAuNTU0LTY5LjU2Mi0yMC41NTQtNzAuNjg1IDAtMTI3Ljk4NyA1Ny4zMDItMTI3Ljk4NyAxMjcuOTg3IDAgMi4zNDIgMC4wNjMgNC42NjkgMC4xODcgNi45OGwtMC4wMTQtMC4zMjJjLTMyLjA2MSA4LjYxOC02OC44NzEgMTMuNTY4LTEwNi44MzcgMTMuNTY4cy03NC43NzYtNC45NS0xMDkuODItMTQuMjQxbDIuOTgyIDAuNjcyek01NDQgNzg3Ljc5N2MyOC44Ni04NS44ODMgMTA4LjYzLTE0Ni42NTEgMjAyLjU5Mi0xNDYuNjUxIDE1LjQwNiAwIDMwLjQzIDEuNjM0IDQ0LjkwOSA0LjczN2wtMS40LTAuMjUxYzExLjYzNi0xNi4wMjMgMjIuMzY4LTM0LjIyNCAzMS4zMTYtNTMuNDI1bDAuODU1LTIuMDQyYy0zMy42OC0zNy41Ni01NC4yNzItODcuNDU4LTU0LjI3Mi0xNDIuMTY1czIwLjU5Mi0xMDQuNjA2IDU0LjQ0OS0xNDIuMzY2bC0wLjE3NyAwLjJjLTkuODAzLTIxLjI0Mi0yMC41MzUtMzkuNDQ0LTMyLjgzNy01Ni40MzRsMC42NjcgMC45NjdjLTEzLjA3OSAyLjg1Mi0yOC4xMDMgNC40ODUtNDMuNTA5IDQuNDg1LTkzLjk2MyAwLTE3My43MzItNjAuNzY4LTIwMi4xNTMtMTQ1LjE0N2wtMC40MzktMS41MDRjLTEwLjQ5Ni0xLjAyNC0yMS4yNDgtMS41MzYtMzItMS41MzZzLTIxLjUwNCAwLjUxMi0zMiAxLjUzNmMtMjguODYgODUuODgzLTEwOC42MyAxNDYuNjUxLTIwMi41OTIgMTQ2LjY1MS0xNS40MDYgMC0zMC40My0xLjYzNC00NC45MDktNC43MzdsMS40IDAuMjUxYy0xMS42MzYgMTYuMDIzLTIyLjM2OCAzNC4yMjQtMzEuMzE2IDUzLjQyNWwtMC44NTUgMi4wNDJjMzMuNjggMzcuNTYgNTQuMjcyIDg3LjQ1OCA1NC4yNzIgMTQyLjE2NXMtMjAuNTkyIDEwNC42MDYtNTQuNDQ5IDE0Mi4zNjZsMC4xNzctMC4yYzkuODAzIDIxLjI0MiAyMC41MzUgMzkuNDQ0IDMyLjgzNyA1Ni40MzRsLTAuNjY3LTAuOTY3YzEzLjA3OS0yLjg1MiAyOC4xMDMtNC40ODUgNDMuNTA5LTQuNDg1IDkzLjk2MyAwIDE3My43MzIgNjAuNzY4IDIwMi4xNTMgMTQ1LjE0N2wwLjQ0IDEuNTA0YzEwLjQ5NiAxLjAyNCAyMS4yNDggMS41MzYgMzIgMS41MzZzMjEuNTA0LTAuNTEyIDMyLTEuNTM2ek01MTIgNTMzLjMzM2M0Ny4xMjggMCA4NS4zMzMtMzguMjA1IDg1LjMzMy04NS4zMzNzLTM4LjIwNS04NS4zMzMtODUuMzMzLTg1LjMzM2MtNDcuMTI4IDAtODUuMzMzIDM4LjIwNS04NS4zMzMgODUuMzMzdjBjMC4wNTUgNDcuMTA2IDM4LjIyNyA4NS4yNzggODUuMzI4IDg1LjMzM2gwLjAwNXpNNTEyIDYxOC42NjdjLTk0LjI1NyAwLTE3MC42NjctNzYuNDEtMTcwLjY2Ny0xNzAuNjY3czc2LjQxLTE3MC42NjcgMTcwLjY2Ny0xNzAuNjY3Yzk0LjI1NyAwIDE3MC42NjcgNzYuNDEgMTcwLjY2NyAxNzAuNjY3djBjMCA5NC4yNTctNzYuNDEgMTcwLjY2Ny0xNzAuNjY3IDE3MC42Njd2MHoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTMxOyIgZ2x5cGgtbmFtZT0iY2FwdGlvbiIgZD0iTTg1My4zMzMgNzQ2LjY2N3YtNTk3LjMzM2gtNjgyLjY2N3Y1OTcuMzMzaDY4Mi42Njd6TTg5NiA4MzJoLTc2OGMtMjMuNTY0IDAtNDIuNjY3LTE5LjEwMy00Mi42NjctNDIuNjY3djAtNjgyLjY2N2MwLTIzLjU2NCAxOS4xMDMtNDIuNjY3IDQyLjY2Ny00Mi42Njd2MGg3NjhjMjMuNTY0IDAgNDIuNjY3IDE5LjEwMyA0Mi42NjcgNDIuNjY3djAgNjgyLjY2N2MwIDIzLjU2NC0xOS4xMDMgNDIuNjY3LTQyLjY2NyA0Mi42Njd2MHpNMzg0IDM2Mi42NjdjLTAuMDE3IDAtMC4wMzcgMC0wLjA1NyAwLTQ3LjEyOCAwLTg1LjMzMyAzOC4yMDUtODUuMzMzIDg1LjMzM3MzOC4yMDUgODUuMzMzIDg1LjMzMyA4NS4zMzNjMjMuNTc4IDAgNDQuOTIzLTkuNTYzIDYwLjM2Ny0yNS4wMjFsMC4wMDEtMC4wMDEgNjAuMzY4IDYwLjM2OGMtMzAuODg1IDMwLjg4NS03My41NTEgNDkuOTg3LTEyMC42NzkgNDkuOTg3LTk0LjI1NyAwLTE3MC42NjctNzYuNDEtMTcwLjY2Ny0xNzAuNjY3czc2LjQxLTE3MC42NjcgMTcwLjY2Ny0xNzAuNjY3YzQ3LjEyOCAwIDg5Ljc5NSAxOS4xMDMgMTIwLjY4IDQ5Ljk4N3YwbC02MC4zNjggNjAuMzY4Yy0xNS40MDUtMTUuNDU4LTM2LjcxNS0yNS4wMjItNjAuMjU4LTI1LjAyMi0wLjAxOSAwLTAuMDM3IDAtMC4wNTYgMGgwLjAwM3pNNjgyLjY2NyAzNjIuNjY3Yy0wLjAxNyAwLTAuMDM3IDAtMC4wNTcgMC00Ny4xMjggMC04NS4zMzMgMzguMjA1LTg1LjMzMyA4NS4zMzNzMzguMjA1IDg1LjMzMyA4NS4zMzMgODUuMzMzYzIzLjU3OCAwIDQ0LjkyMy05LjU2MyA2MC4zNjctMjUuMDIxbDAuMDAxLTAuMDAxIDYwLjM2OCA2MC4zNjhjLTMwLjg4NSAzMC44ODUtNzMuNTUxIDQ5Ljk4Ny0xMjAuNjc5IDQ5Ljk4Ny05NC4yNTcgMC0xNzAuNjY3LTc2LjQxLTE3MC42NjctMTcwLjY2N3M3Ni40MS0xNzAuNjY3IDE3MC42NjctMTcwLjY2N2M0Ny4xMjggMCA4OS43OTUgMTkuMTAzIDEyMC42OCA0OS45ODd2MGwtNjAuMzY4IDYwLjM2OGMtMTUuNDA1LTE1LjQ1OC0zNi43MTUtMjUuMDIyLTYwLjI1OC0yNS4wMjItMC4wMTkgMC0wLjAzNyAwLTAuMDU2IDBoMC4wMDN6IiAvPgo8Z2x5cGggdW5pY29kZT0iJiN4ZTk0MDsiIGdseXBoLW5hbWU9ImxlZnQtYXJyb3ciIGQ9Ik01MTIgODkyLjMzOWw2MC4zMzktNjAuMzM5LTM0MS4zMzMtMzQxLjMzM2g3MDcuNjYxdi04NS4zMzNoLTcwNy42NjFsMzQxLjMzMy0zNDEuMzMzLTYwLjMzOS02MC4zMzktNDQ0LjMzOSA0NDQuMzM5IDQ0NC4zMzkgNDQ0LjMzOXoiIC8+CjxnbHlwaCB1bmljb2RlPSImI3hlOTQxOyIgZ2x5cGgtbmFtZT0icmlnaHQtYXJyb3ciIGQ9Ik01MTIgODkyLjMzOWwtNjAuMzM5LTYwLjMzOSAzNDEuMzMzLTM0MS4zMzNoLTcwNy42NjF2LTg1LjMzM2g3MDcuNjYxbC0zNDEuMzMzLTM0MS4zMzMgNjAuMzM5LTYwLjMzOSA0NDQuMzM5IDQ0NC4zMzktNDQ0LjMzOSA0NDQuMzM5eiIgLz4KPGdseXBoIHVuaWNvZGU9IiYjeGU5NDU7IiBnbHlwaC1uYW1lPSJjbG9zZSIgZD0iTTg4My40OTkgNzU5LjE1OWwtNjAuMzMxIDYwLjMzOS0zMTEuMTY4LTMxMS4xNTktMzExLjE1OSAzMTEuMTU5LTYwLjMzOS02MC4zMzkgMzExLjE1OS0zMTEuMTU5LTMxMS4xNTktMzExLjE2OCA2MC4zMzktNjAuMzMxIDMxMS4xNTkgMzExLjE1OSAzMTEuMTY4LTMxMS4xNTkgNjAuMzMxIDYwLjMzMS0zMTEuMTU5IDMxMS4xNjggMzExLjE1OSAzMTEuMTU5eiIgLz4KPC9mb250PjwvZGVmcz48L3N2Zz4=");

/***/ }),

/***/ "./src/icon/loading.gif":
/*!******************************!*\
  !*** ./src/icon/loading.gif ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/gif;base64,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");

/***/ }),

/***/ "./src/icon/mask.png":
/*!***************************!*\
  !*** ./src/icon/mask.png ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/icon/pause.png":
/*!****************************!*\
  !*** ./src/icon/pause.png ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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XJxCSQAAAAAAsLaqqip9+9vfNn75y1+qv79/yrYjTsJPRskGIOT8E0LOMFq7du3hH/7whzfffPPN06kGAAAAAADxZf/+/frqV79qvPbaa1Py/ISc8YdiIKxyc3OrX3755dbjx49vJuAEAAAAACA+bd++Xa+++qr5zDPPmEuWLKEgiLh47OQMnBNyiFMgfL7yla+c/Lu/+7tlGRkZiVQDAAAAAABI76zE/r3vfc/47ne/K0nyeDxTti0W6/AcDLifFu/nGSEnQnbbbbcdevbZZ1eXlpamUw0AAAAAAHAlx44d0xNPPGEcO3ZsyoJOQk7rIuRESH72s5813nvvvXOTklg0HQAAAAAAXNvAwIB+/OMf68tf/rLR1tY26c9PyGld8Rhy+uN8/8Oh/9577z35/e9/f3V+fj7pJgAAAAAAGJeamhp96UtfMn75y1/K5/NNyTZYLPD8WsD9/y8ezykWHsK4/frXv3Y+//zz6wk4AQAAAADARCxZskQ///nPzaefftqcNWsWBUHICDkRtL179x632+3De/fuLaYaAAAAAAAgVB/+8Ie1b98+884776QYCEm8DNc+F3B/IYd9/H7yk580fehDH5pDJQAAAAAAQCR897vf1Ze//GXD6XRO+nNbbOh6bsB9V7ycP3Ry4ppWrlz5VmNj4zABJwAAAAAAiKTHHntMv//9781NmzZRDIwbISeu6lvf+lbdsWPH1syZMyeZagAAAAAAgEi79dZb9Zvf/Mb8/Oc/TzEwLlYerr484H4VhzpoZn5+fsPvfve77PXr12dTDgAAAAAAMBWee+45fe5znzOam5unbBssMIw9bhoc6eTEu9x+++0nT506VUzACQAAAAAAptL73/9+hq8jaIScGPP44483vPTSSzcXFhYmUQ0AAAAAADDVli9frueff9586KGHKAauycrD1Uc4vMHJyMjo+fGPf6y77747i2oAAAAAAIBo9O1vf1v/9E//ZPT390/J88fo0PXXA+5vt/L5QSdnnJs1a5bjtddeSyHgBAAAAAAA0ezv//7v9V//9V9mQUEBxcCfIeSMYxs2bOg4cuRI9po1a6ZRDQAAAAAAEO3e97736X//93/NBQsWUAy8i9WGq58PuD+fw3t1e/fudTz99NO5eXl5FAMAAAAAAMSU2tpaPfLII8bhw4en5PljdOh64Chej9XOCTo549Bn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");

/***/ }),

/***/ "./src/icon/play.png":
/*!***************************!*\
  !*** ./src/icon/play.png ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,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ifpRJFHTrLy8fPd3v/vdyHXXXddQW1vrJSIAAAAAALhHLBbTjh07dO+995r77rtP+/btS3sfSKKSRM00kqh/MdNp3yIUaREtLy/ffdttt5mrr756XHl5OfOdAgAAAADgcu+9957uu+8+c//992v37t2KxzPzK/M8TKo+4rSfZRRmBknUvyCJmiaVlZXv/fCHP7SuueaahtLSUg8RAQAAAAAgu7S3t+uBBx7Q3Xffbdra2tL++SRRkW4kUaUipz3stCT1UiNWVFTU9u///u+xL33pS5NKSkqIMwAAAAAAWW7nzp269957zS9/+Uvt37+fOVNT7wan/SWjL71IopJETYvvf//7b33rW99qGjNmjI9oAAAAAACQW7Zv36577rnH/OpXv1JnZ2faP58kKlKNJKrU47RFhCK5xy9jTOe111677Qc/+MGcsWPHFhASAAAAAABy26ZNm3THHXeYRx99VEePHs1YP/IgqTrLaZsZdelBEpUkakqcffbZL/3yl7+cM3v27BJjGGYAAAAAAOSLeDyu1atX64c//KH505/+lJE+kERFsuVzdutZp13KMDh9Ho+nVZLKysq6fve731Vdeuml9UQFAAAAAID81dvbq0ceeUS33nqr2bp1q+LxeNr7kMPJ1JjTBp02wohLLeb/RNLccssth3ft2nUGCVQAAAAAAFBcXKxrr71WK1eutG+66SaFQiGCgqyVj5Won3fa/2LzJ8XAxz72sXX33XffmZMnT2ZKBAAAAAAAcEJr167VzTffbFavXq1oNJqRPuRgZWq7045jhKUWlagYtVAo1Pzggw/uX7Vq1cdIoAIAAAAAgKEsWrRIjz/+uP3Tn/7UrqurIyDIKlYerWuFpEJJayRdLR6qdTqOfupTn1q/YsWKWQsXLqywLIuIAAAAAACAU/L5fDrrrLO0bNkyHTx40LS0tKR1rlTjyKGQhpzFJ+liSc8zylKDSlSMSElJSfNjjz3W+dBDDy2qqqryEREAAAAAADBS06dP129+8xv7V7/6lV1fz6NV4H75VI151GkL2OyjMnDFFVdsuueee+bV1NT4CQcAAAAAAEiGLVu26MYbbzQrVqxgrtTTN8tpmxlZyUUlKk4pGAy+99vf/vbAI488spAEKgAAAAAASKbp06fr4Ycftm+//Xa7vLycgMCV8qES9RGnvZrNPXwej+eQJM2ZM2fH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zbqLDpKow8SXC5AZPT092r59u1atWqU//OEPZv369aP+mWPi50+7d+/WK6+8orKyMnPmmWfq4x//uP1Xf/VXamxspCIPrnXw4EG9/fbbWrlypVm1apWam5sHq01Hqru7W93d3dq+fbtWrlxp6urqtGjRIl1++eX2kiVL1NDQoGAwSNCBFOnu7tbWrVv13HPPmVWrVmnHjh3DvQmScuFwWDt27NCqVatUWFho/H6/PXfuXI4JSdDb26u3335br7zyivbt25d1/X///fe1fv16TZs2TQ0NDZwzJdnAwIA6Ozu1c+dOrV+/Xps2bTLvvPOOWltb9f777w9O1zOS69dEdWppaamqq6vNhAkTNHv2bM2aNcuePn26xo4dOzhtBwB3IPfkbiRRh4k770D62LatI0eOaM+ePVqxYoXuv/9+8+abbyZ9zrCuri49//zzevnll81///d/68tf/rJ96aWXauzYsSoqKuILDBmXmPvs3Xff1dNPP20effRRvfPOO0n9jGg0qra2NrW1ten5558355xzjq655hp7yZIlqqmpGXw4BdWpQHKEw2EdOHBAL774olasWKHW1taMVaAO1cedO3dqxYoVCgaDJhQK2U1NTZwPn+bIHv8AACAASURBVKZ9+/bppZdeMlu3bs3Kn2sODAyotbVVr732mpk1a5ZdXV2tUCjE+VISvocPHz6snTt3asOGDVq3bp3ZsGGDWltb1d3dPerzX9u2B+dM7e7uVltbm9577z29/fbbamxsNPPmzdPZZ59tz549W7W1tYPf98yBDGT+WjiPWPnY4f+VrSt/LDPEt79lWbr++utVV1fHHg2kQXt7ux5++GHdfvvt5te//rVpbW1N6cVGLBZTe3u7Vq9ebTZv3mwikYjq6+tVUlLCxkDG9PX1aevWrXrggQd05513msceeyzllUt9fX3avn27Xn75ZbN9+3ZjWZZqamoUDAa5SAaSIBwOq7OzUy+//LJ+//vfm82bN4+6ojzVYrGYenp6dPToUZWUlKiuro6KtdPQ3d2tdevW6X/+53/M9u3bFQ6Hs3I9EpWQlZWVmjhxokpLS7nJdprfu3v37tXatWv11FNPmWeeecasW7dOra2t6unpSfpTuvv7+wfnWG1tbVV7e7vp7+8ffBgVU/oAmbdx40Y9+eST+XLifVvicJgtHSaJ6jhVEvW6665TfX09ezSQQpFIRNu2bdOdd95pfvKTn5jm5uaknzwOJRqNaseOHVq7dq3p6ekxkyZNUmlpKZU3SCvbttXT06PXXntNd955p3nggQfMjh070la1lKgE37p1q958801j27YaGhpUXFzMhRWQhATGpk2b9Lvf/c688sor6uzsdHV/E4nUSCRi6urqNGbMGBUWFnJTZRRxbG9v19NPP21efPHFUU9L5JZ1icViKioqMo2Njaqrq+MhnaOIYeK7dufOnVq9erWeeOIJ88ILL2jbtm3q6OhI6fmvbdsaGBjQ4cOHtX//fu3du9ccOXLEWJalkpISBQIBxWIxzn+BDNmwYUM+JVFvdVqSqNmGJCqQWT09PXr11Vf1gx/8wDz44IM6cuRIxvrS19enN954Qzt27DD19fWqqqoa/IkTkGp79+7VM888o9tvv92sWLEiY/MkWpaljo4Obdy40XR0dJja2lqVl5fL5/OxkYBR2rVrl5588knzzDPPaN++fa7/yZ4xRgMDAzp69KiCwaCZOHGiysvL+bnvCA0MDOitt97S73//e9PS0jL4NPVsFY/HZVmW6urqmE9+FBI3S7ds2aJVq1bpqaeeMq+//rr27duX9KmrhuLxeDQwMKBDhw5p79696urqMl6vV2VlZSopKSGJCmTI66+/rqeffpokqksl48h4sySjHE6ixmIxffOb3+Tn/ECK9PT06LnnntOPfvQjs2rVqhFNmp/KC4StW7dq+/btprq6Wg0NDSRSkVKxWExtbW169NFH9bOf/cy88cYbGU2wxONxxeNxHTlyRNu2bdPBgwdNbW2tampqSKQCI5R4uvmrr76qRx55xLS0tGTFz7lt2x6sWotEIho7dqzGjx+v4uJiNuoIdHV16c9//rNWrlxpDhw44IrznGSMi9LSUjN9+nRVVVWRcBvm97xt2+ru7lZzc7Oee+45Pfvss2bz5s0prz4dajtGo1F1dHTo/fffV0dHh/F6vaqoqFBxcTHbFciAtWvX6g9/+EO+JFH/TVJc0kC2dJjbyMPg9/v5AgFSpLu7WytWrND3v/99k+wH5iTDyy+/rI6ODiPJvvTSS5knFSmze/duPfLII/rpT39qdu3a5boEwJNPPqnu7m5z44032osXL+ZJ3cAIRKNR7d27V6+++qrZtm2b6x4kdSrhcFjvvfeeXnnlFTN79my7tLRUBQUFbNhh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b5xxxhlZT09P4cbW09MTZ5xxRtbb2+tEM/YbbldXzJs3L0488cQoYv/cAw44IE488cSYPn26kw0AAE0o2bMFuiJneUlJ1Abp7wZ790Zw+umnx1FHHVW4sR111FFx+umne5AODb2P7LvvvnHKKadkhxxySKHGNnPmzDj++OPjhBNOcKIBAKBJRX4gcxFIojYaKD1RYa/MmzcvXvva1xbqC4kkSeK1r31tYXtc0nq9vb2xaNGiePnLX16oce2zzz5x0kknZXPnznWSAQCARlTqW27IDAKTYtasWfHmN785mz9/fmHGNH/+/Hjzm9+czZo1ywmmYQsXLoyzzjor22+//QoxnlqtFkcccUSceeaZoa0FAAA0L8syQehgkqgN0hMV9t5xxx0XS5YsKcx4lixZEscdd5wTy4TMmjUrfud3fide97rXFaIy+8ADD4zzzjsvW7x4sdY3AACwF0qWRM3qW25IogKTZvbs2XH++ednixYtyv1YFi1aFOeff342e/ZsJ5YJqVQqccghh8TrX//63Fdm9/T0xLHHHhtnnHFGqMgGAACKTBJ1AoteYO+voxNOOCGWLl2a6wcxVavVWLp0aZxwwgleG5iw0QdMvfrVr443vOENuR7HggUL4i1veUt2+OGHO7EAALCXhoaGSjXc+pYbkqgNkiiB1thnn33i/PPPz1796lfndgyvfvWr4/zzz8/22WcfJ5SmHXroofHGN74xO/7443N5/HPmzIkzzzwzzjjjjJg5c6YTCgAAe0nuqbO1Ioma1LfCStM0RkZGzBZokWOPPTY+8IEPZIcddljujv2www6LD3zgA9mxxx7rRLJXent747TTTou3ve1t2YIFC3J37CeddFK8/e1vz4444gi9UAEAoAU8j6ezqURtQK1Wk0SFFuru7o6zzz473vOe92QzZszIzXHPmDEj3vOe92Rnn312dHd3O5HstXnz5sX5558fF1xwQfT09OTimCuVSixatCiWLl2anXzyyU4iAAC0SJ7b3pVBK5KouXuaVlODLNcT0qDt5syZE0uWLInLLrssF8mjnp6euOyyy2LJkiUxZ84cJ5CWfECqVqtxyCGHxNKlS7OLL744arVa535g6OqKrq6uWLRoUfzJn/xJdvbZZ8f06dOdSAAAoBmV+pYbKlEnsHgEWmvhwoVx6aWXZhdffHFHJ1J7enri4osvjksvvTRbuHChE0dLTZ8+PY4//vhYunRpdtZZZ3X0sS5YsCDe+ta3xgUXXBDz5s1z8gAAoIVUonb4+RGCxkiiQnuuq8MPPzz+5//8n1m1Wk2+8Y1vxJYtWzrqGGfOnBkXX3xx/I//8T88gZy2mT59epx88snxp3/6p1m1Wk1uueWWGBgY6IhjG21uf/DBB8c73vGOeMc73pEtWLBAH1QAAGixoaGhMg03d4k2SVQTGabc0UcfHX/xF3+RHXzwwfHZz3426ZRE6syZM+PDH/5wtnTp0vit3/otJ4q2z7fTTjst5syZk82bNy/5+te/Htu3b++IYzviiCPigx/8YHb++efH/PnznSwAAGgDhQqdTRK1QXqiQvtUKpVYvHhxvOtd74oDDjgg+8IXvpA88MADU3pMxx13XLz3ve/NLrjggjjooIOcJCblA9OsWbPixBNPjA9+8IPZ/Pnzk3/7t3+LJ554YsqOacaMGfGa17wm/tt/+2/Z6173uth///19sAMAgDYpWe4pd09wl0RtkNv5of0WLFgQS5cujUMOOST7yle+ktx8882Tfnv/zJkz45xzzolLLrkkO/PMM2PmzJlODJOqp6cnjjzyyHjve9+bHXroofH1r389+dnPfjbpVamHHHJI/N7v/V4sWbIke8UrXhG9vb1ODgAAUFp5SqI2WvrSlrS9JCpMwkVer8R7wxveEIceemj2ute9Lr785S8n999/fwwODrb1b0+bNi1OOOGEuPTSS7MzzjgjjjjiiI5+UjrF1tPTEwcffHBceOGFcfTRR2c333xzct1118Xjjz/e1vYySZLE3Llz47TTToslS5Zkp556aixevNgJAQCASdDOStQOrHIdztv5UYnagDRNBQEmUa1WiyOOOCIOPvjgePWrX53dfvvtcc011yS/+MUvWl6N19vbG8cff3z80R/9Ufaa17wmFi1aFL29vRKodIS5c+fGySefHIcffnj2+te/Pm699dbkP/7jP+Lxxx9v+YOnDjjggDj11FPjD/7gD7KTTjopFi5cGDNmzHASAABgkoyMjAhCB2tFErVVzdHa/XsyExnyo1arRa1Wi5e//OVx2GGHxWtf+9ps2bJl8dOf/jRZtmxZPP/8800nVHt7e2P//feP008/PU477bTs9NNPj9/6rd+KWbNmCTwdZ9q0aXHggQfGPvvsE8ccc0x27rnnxui1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ICpRW2DFihVlawoMAAAAwATcd9990d/fLxA51c4k6rX1rfA2b94cd999t9kEAAAAwG4tW7asTO0gh+vbYH3LPZWoLfL9738/0dMCAAAAgJd64YUX4tZbbxWIHGtnEvXr9a2jteppY8uWLVOSDQAAAMBveOyxx+Kpp54q05BX17fCUInaIuvWrYuHHnpIIAAAAAD4NT/84Q8jTVOByLF2JlHvrW+lMDg4GLfddpsZBQAAAMCL0jSN7373u2VrA/nF+lYYKlFbJMuyuOmmm5KBgQHBAAAAACAiIlatWhUPPvigQORcO5OoaX0bfRpX4T344IPx5JNPmlUAAAAARETE3XffHRs3bizbsK+tb4WhErWFtmzZEnfeeadAAAAAABARET/84Q8TUci/yUiiPlTfSuE73/lOMjIyYmYBAAAAlFx/f3/cfPPNuTvurK6Zf1rfflXfCkMlaovdfvvtsX79eoEAAAAAKLk777wznn32WYEogMlIon6qvnWkvcis71ZfX1/85Cc/MbMAAAAASu6mm25KhoaGyjTk7fWtcFSittjIyEh85zvf0esCAAAAoMQ2bdoU3/3ud6OFtXtMoeok/I2byhTQLMvilltuiaeffjoOOuggMwwAAACghO66665YuXJl2Yb95aIOTCVqG6xfvz5+9KMfCQQAAABASd1www3uVC6QyTyZaX1f7chAJElLY3HOOefEDTfckFWrVbMMAAAAoESeeeaZeNWrXpWsXbs2l8e/F88P+u36vnAluCpR2+TOO++MJ598UiAAAAAASubOO++MZ599ViAKZDKTqMvqWyls3rw5brzxRjMMAAAAoGS++tWvJsPDw2UaclbfVkYBq1AjVKK2b+ZkWXzta19LtmzZIhgAAAAAJfHoo4/GD37wA4EomMlMon6svpXGAw88EPfee69ZBgAAAFAS3/72t2Pz5s25PPasrol/+lR9KyyVqG2Upml885vfTJrvxQsAAABAXmzevDn+9V//NRGJ4pmKkzo8hX97/IAkSUuPa99994177703O+SQQ8w2AAAAgAL7/ve/H7/3e7+XDA4O5vL4s+YrAZfW99cU9dyqRG2zvr6+uP766wUCAAAAoMDSNI0vfvGLuU2gMrapqAZ9tr4/oCMD0uJK1IiIY489NpYtW5bNnTvXjAMAAAAooPvvvz9OP/30XD9kfC8qUXvr+4Gi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");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/js/player.js");
/* harmony import */ var _css_index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/index.scss */ "./src/css/index.scss");



if (globalThis) {
  globalThis.mfunsPlayer = _player__WEBPACK_IMPORTED_MODULE_0__.default;
  console.log(`${"\n"} %c mfunsPlayer v2.2.0 %c https://github.com/Mfuns-cn ${"\n"}${"\n"}`, "color: #fff; background: #7b7ff7; padding:5px 0;", "background: #f5f5f5; padding:5px 0;");
}
})();

/******/ })()
;
//# sourceMappingURL=mfunsPlayer.js.map