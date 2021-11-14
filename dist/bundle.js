/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {


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

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/base.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/base.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".danmaku-containers{\n    position: relative;\n}\n.danmaku-containers  *{\n    box-sizing: border-box;\n}\n.danmaku-containers .stage{\n    position: absolute;\n}\n.danmaku-containers-debug *{\n    border: 1px solid black;\n}\n\n", "",{"version":3,"sources":["webpack://./src/css/base.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;AACtB;AACA;IACI,sBAAsB;AAC1B;AACA;IACI,kBAAkB;AACtB;AACA;IACI,uBAAuB;AAC3B","sourcesContent":[".danmaku-containers{\n    position: relative;\n}\n.danmaku-containers  *{\n    box-sizing: border-box;\n}\n.danmaku-containers .stage{\n    position: absolute;\n}\n.danmaku-containers-debug *{\n    border: 1px solid black;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/css/base.css":
/*!**************************!*\
  !*** ./src/css/base.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./base.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/base.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



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

/***/ "./src/ts/Context/Context.ts":
/*!***********************************!*\
  !*** ./src/ts/Context/Context.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Context": () => (/* binding */ Context)
/* harmony export */ });
/**
 * 全局上下文
 */
var Context = /** @class */ (function () {
    function Context() {
    }
    /**
     * 当前语言
     */
    Context.language = "zh-cn";
    Context.debug = true;
    return Context;
}());



/***/ }),

/***/ "./src/ts/Controller/Controller.ts":
/*!*****************************************!*\
  !*** ./src/ts/Controller/Controller.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var _Context_Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Context/Context */ "./src/ts/Context/Context.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../i18n */ "./src/ts/i18n/index.ts");
/* harmony import */ var _interface_Renderer_RendererFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../interface/Renderer/RendererFactory */ "./src/ts/interface/Renderer/RendererFactory.ts");



/**
 * 控制器 ，统一管理整个弹幕系统
 * 在这里，每种弹幕类型都会得到一个舞台对象，进行渲染
 */
var Controller = /** @class */ (function () {
    function Controller(containers) {
        /**
         * 舞台列表
         */
        this.stageList = [];
        this.containers = containers;
        //获取实时的style对象，当大小发生变化时，会更新自身
        this.canvasStyle = window.getComputedStyle(containers);
        //初始化容器
        this.initContainer();
    }
    /**
     * 获得容器尺寸
     */
    Controller.prototype.getContainersSize = function () {
        return {
            width: parseInt(this.canvasStyle.width),
            height: parseInt(this.canvasStyle.height)
        };
    };
    /**
     * 将一个舞台添加到容器内
     * @param stage 舞台
     * @param index 排列顺序
     * @returns 成功与失败的状态
     */
    Controller.prototype.registStage = function (stage, index) {
        //检查列表中是否存在
        if (this.stageList[index]) {
            return false;
        }
        this.stageList[index] = stage;
        return true;
    };
    /**
     * 将舞台挂载到容器中
     */
    Controller.prototype.mount = function () {
        var _this = this;
        console.log(_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n.t("Start mount stage"));
        //遍历每一个舞台
        this.stageList.forEach(function (stage) {
            //获取一个div
            var div = _this.getDIV();
            //给舞台初始化渲染器
            var render = _interface_Renderer_RendererFactory__WEBPACK_IMPORTED_MODULE_2__.RendererFactory.getRenderInstance("base");
            //将div挂载到渲染器
            render.setCanvasContainer(div);
            //设置舞台渲染器
            stage.stageRenderer(render);
            //更新渲染器内画布样式
            render.updateCanvasStyle(_this.getCanvasStylByStage(stage));
        });
    };
    /**
     * 初始化弹幕容器
     */
    Controller.prototype.initContainer = function () {
        if (_Context_Context__WEBPACK_IMPORTED_MODULE_0__.Context.debug) {
            //debug模式
            this.containers.classList.add("danmaku-containers-debug");
        }
        this.containers.classList.add("danmaku-containers");
    };
    /**
     * 重置尺寸
     */
    Controller.prototype.resize = function () {
        var _this = this;
        //重置舞台的尺寸
        this.stageList.forEach(function (stage) {
            var render = stage.getRenderer();
            if (render) {
                render.updateCanvasStyle(_this.getCanvasStylByStage(stage));
            }
        });
    };
    /**
     * 创建div容器
     */
    Controller.prototype.getDIV = function () {
        var div = document.createElement("div");
        div.classList.add("stage");
        this.containers.appendChild(div);
        return div;
    };
    /**
     * 根据舞台对象创建一个canvasStyle
     * @param stage 舞台对象
     * @returns
     */
    Controller.prototype.getCanvasStylByStage = function (stage) {
        var size = stage.stageSize(this.getContainersSize());
        var color = stage.stageBackgroundColor(this.getContainersSize());
        var pos = stage.stagePosition(this.getContainersSize(), size);
        return { position: pos, color: color, size: size };
    };
    return Controller;
}());



/***/ }),

/***/ "./src/ts/i18n/index.ts":
/*!******************************!*\
  !*** ./src/ts/i18n/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i18n": () => (/* binding */ i18n)
/* harmony export */ });
/* harmony import */ var _Context_Context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Context/Context */ "./src/ts/Context/Context.ts");
/* harmony import */ var _zh_cn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./zh-cn */ "./src/ts/i18n/zh-cn.ts");


/**
 * i18n 国际化函数
 */
var i18n = /** @class */ (function () {
    function i18n() {
    }
    /**
     * 获取翻译，如果不存在，则返回自身
     * @param str 需要国际化的字符串
     * @returns 翻译结果
     */
    i18n.t = function (str) {
        //检查字符串是否存在
        if (this.tranTxt[this.language] && this.tranTxt[this.language][str]) {
            return this.tranTxt[this.language][str];
        }
        return str;
    };
    i18n.tranTxt = {
        "zh-cn": _zh_cn__WEBPACK_IMPORTED_MODULE_1__.default
    };
    /**
     * 当前语言
     */
    i18n.language = _Context_Context__WEBPACK_IMPORTED_MODULE_0__.Context.language;
    return i18n;
}());



/***/ }),

/***/ "./src/ts/i18n/zh-cn.ts":
/*!******************************!*\
  !*** ./src/ts/i18n/zh-cn.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    "Containers is null": "容器为空",
    "Start mount stage": "开始挂载舞台",
    "Renderer type is null": "没有找到合适的渲染器"
});


/***/ }),

/***/ "./src/ts/interface/Renderer/BaseRenderer.ts":
/*!***************************************************!*\
  !*** ./src/ts/interface/Renderer/BaseRenderer.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseRenderer": () => (/* binding */ BaseRenderer)
/* harmony export */ });
/* harmony import */ var src_ts_util_UnitTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/ts/util/UnitTools */ "./src/ts/util/UnitTools.ts");

var BaseRenderer = /** @class */ (function () {
    function BaseRenderer() {
    }
    BaseRenderer.prototype.setCanvasContainer = function (canvas) {
        this.canvas = canvas;
        return true;
    };
    BaseRenderer.prototype.updateCanvasStyle = function (style) {
        if (this.canvas) {
            this.canvas.style.width = src_ts_util_UnitTools__WEBPACK_IMPORTED_MODULE_0__.UnitTools.lengthSrting(style.size.width);
            this.canvas.style.height = src_ts_util_UnitTools__WEBPACK_IMPORTED_MODULE_0__.UnitTools.lengthSrting(style.size.height);
            this.canvas.style.left = src_ts_util_UnitTools__WEBPACK_IMPORTED_MODULE_0__.UnitTools.lengthSrting(style.position.x);
            this.canvas.style.top = src_ts_util_UnitTools__WEBPACK_IMPORTED_MODULE_0__.UnitTools.lengthSrting(style.position.y);
            this.canvas.style.backgroundColor = src_ts_util_UnitTools__WEBPACK_IMPORTED_MODULE_0__.UnitTools.colorString(style.color);
            return true;
        }
        else {
            return false;
        }
    };
    return BaseRenderer;
}());



/***/ }),

/***/ "./src/ts/interface/Renderer/RendererFactory.ts":
/*!******************************************************!*\
  !*** ./src/ts/interface/Renderer/RendererFactory.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RendererFactory": () => (/* binding */ RendererFactory)
/* harmony export */ });
/* harmony import */ var src_ts_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/ts/i18n */ "./src/ts/i18n/index.ts");
/* harmony import */ var _BaseRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseRenderer */ "./src/ts/interface/Renderer/BaseRenderer.ts");
/**
 * 简单渲染器工厂
 */


var RendererFactory = /** @class */ (function () {
    function RendererFactory() {
    }
    RendererFactory.getRenderInstance = function (type) {
        if (this.rendererList[type]) {
            return new this.rendererList[type]();
        }
        else {
            throw ReferenceError(src_ts_i18n__WEBPACK_IMPORTED_MODULE_0__.i18n.t("Renderer type is null"));
        }
    };
    RendererFactory.rendererList = {
        base: _BaseRenderer__WEBPACK_IMPORTED_MODULE_1__.BaseRenderer
    };
    return RendererFactory;
}());



/***/ }),

/***/ "./src/ts/interface/Stage/BaseStage.ts":
/*!*********************************************!*\
  !*** ./src/ts/interface/Stage/BaseStage.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseStage": () => (/* binding */ BaseStage)
/* harmony export */ });
var BaseStage = /** @class */ (function () {
    function BaseStage() {
    }
    BaseStage.prototype.stageSize = function (containersSize) {
        return {
            width: containersSize.width * 0.8,
            height: containersSize.height * 0.3
        };
    };
    BaseStage.prototype.stagePosition = function (containersSize, stageSize) {
        return {
            x: (containersSize.width - stageSize.width) / 2,
            y: containersSize.height - stageSize.height
        };
    };
    BaseStage.prototype.stageBackgroundColor = function () {
        return { r: 0, g: 0, b: 0, a: 1 };
    };
    BaseStage.prototype.stageRenderer = function (render) {
        this.renderer = render;
        return true;
    };
    BaseStage.prototype.getRenderer = function () {
        return this.renderer;
    };
    return BaseStage;
}());



/***/ }),

/***/ "./src/ts/util/UnitTools.ts":
/*!**********************************!*\
  !*** ./src/ts/util/UnitTools.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnitTools": () => (/* binding */ UnitTools)
/* harmony export */ });
var UnitTools = /** @class */ (function () {
    function UnitTools() {
    }
    /**
     * 拼接带单位的长度字符串
     * @param num 长度
     * @returns
     */
    UnitTools.lengthSrting = function (num) {
        return num + "px";
    };
    /**
     * 拼接rgba()颜色字符串
     * @param color 颜色
     * @returns
     */
    UnitTools.colorString = function (color) {
        return "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
    };
    return UnitTools;
}());



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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_base_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/base.css */ "./src/css/base.css");
/* harmony import */ var _Controller_Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controller/Controller */ "./src/ts/Controller/Controller.ts");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18n */ "./src/ts/i18n/index.ts");
/* harmony import */ var _interface_Stage_BaseStage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interface/Stage/BaseStage */ "./src/ts/interface/Stage/BaseStage.ts");




var MfunsDanMaku = /** @class */ (function () {
    function MfunsDanMaku() {
    }
    MfunsDanMaku.prototype.main = function (config) {
        //类型检查
        if (!config.containers) {
            throw ReferenceError(_i18n__WEBPACK_IMPORTED_MODULE_2__.i18n.t("Containers is null"));
        }
        var c = new _Controller_Controller__WEBPACK_IMPORTED_MODULE_1__.Controller(config.containers);
        c.registStage(new _interface_Stage_BaseStage__WEBPACK_IMPORTED_MODULE_3__.BaseStage(), 1);
        c.mount();
        //监听大小变化
        window.addEventListener("resize", function () {
            c.resize();
        });
    };
    return MfunsDanMaku;
}());
//添加进全局
if (globalThis) {
    globalThis.MfunsDanMaku = MfunsDanMaku;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MfunsDanMaku);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYW5tYWt1Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9kYW5tYWt1Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vZGFubWFrdS8uL3NyYy9jc3MvYmFzZS5jc3MiLCJ3ZWJwYWNrOi8vZGFubWFrdS8uL3NyYy9jc3MvYmFzZS5jc3M/NmI2YyIsIndlYnBhY2s6Ly9kYW5tYWt1Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2Rhbm1ha3UvLi9zcmMvdHMvQ29udGV4dC9Db250ZXh0LnRzIiwid2VicGFjazovL2Rhbm1ha3UvLi9zcmMvdHMvQ29udHJvbGxlci9Db250cm9sbGVyLnRzIiwid2VicGFjazovL2Rhbm1ha3UvLi9zcmMvdHMvaTE4bi9pbmRleC50cyIsIndlYnBhY2s6Ly9kYW5tYWt1Ly4vc3JjL3RzL2kxOG4vemgtY24udHMiLCJ3ZWJwYWNrOi8vZGFubWFrdS8uL3NyYy90cy9pbnRlcmZhY2UvUmVuZGVyZXIvQmFzZVJlbmRlcmVyLnRzIiwid2VicGFjazovL2Rhbm1ha3UvLi9zcmMvdHMvaW50ZXJmYWNlL1JlbmRlcmVyL1JlbmRlcmVyRmFjdG9yeS50cyIsIndlYnBhY2s6Ly9kYW5tYWt1Ly4vc3JjL3RzL2ludGVyZmFjZS9TdGFnZS9CYXNlU3RhZ2UudHMiLCJ3ZWJwYWNrOi8vZGFubWFrdS8uL3NyYy90cy91dGlsL1VuaXRUb29scy50cyIsIndlYnBhY2s6Ly9kYW5tYWt1L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Rhbm1ha3Uvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZGFubWFrdS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZGFubWFrdS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Rhbm1ha3Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kYW5tYWt1Ly4vc3JjL3RzL2luZGV4LnRzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwibGlzdCIsInRvU3RyaW5nIiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJjb25jYXQiLCJqb2luIiwiaSIsIm1vZHVsZXMiLCJtZWRpYVF1ZXJ5IiwiZGVkdXBlIiwiYWxyZWFkeUltcG9ydGVkTW9kdWxlcyIsImxlbmd0aCIsImlkIiwiX2kiLCJwdXNoIiwiX3NsaWNlZFRvQXJyYXkiLCJhcnIiLCJfYXJyYXlXaXRoSG9sZXMiLCJfaXRlcmFibGVUb0FycmF5TGltaXQiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJfbm9uSXRlcmFibGVSZXN0IiwiVHlwZUVycm9yIiwibyIsIm1pbkxlbiIsIl9hcnJheUxpa2VUb0FycmF5IiwibiIsIk9iamVjdCIsInByb3RvdHlwZSIsImNhbGwiLCJzbGljZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsIkFycmF5IiwiZnJvbSIsInRlc3QiLCJsZW4iLCJhcnIyIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwidW5kZWZpbmVkIiwiX3MiLCJuZXh0IiwiZG9uZSIsInZhbHVlIiwiZXJyIiwiaXNBcnJheSIsIl9pdGVtIiwiY3NzTWFwcGluZyIsImJ0b2EiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIiwic291cmNlTWFwcGluZyIsInNvdXJjZVVSTHMiLCJzb3VyY2VzIiwic291cmNlIiwic291cmNlUm9vdCJdLCJtYXBw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Q0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQzFDLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxpRUFBUyxFQUFFLEVBQUMsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxLQUFLLEVBQUU7UUFFVCxRQUFRO1FBQ1IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBQztZQUM3QixDQUFDLENBQUMsTUFBTSxFQUFFO1FBQ2QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQztBQUNELE9BQU87QUFDUCxJQUFJLFVBQVUsRUFBRTtJQUNaLFVBQVUsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0NBQzFDO0FBQ0QsaUVBQWUsWUFBWSxFQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8ICEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKSB7XG4gIHZhciBfaXRlbSA9IF9zbGljZWRUb0FycmF5KGl0ZW0sIDQpLFxuICAgICAgY29udGVudCA9IF9pdGVtWzFdLFxuICAgICAgY3NzTWFwcGluZyA9IF9pdGVtWzNdO1xuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLmRhbm1ha3UtY29udGFpbmVyc3tcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG4uZGFubWFrdS1jb250YWluZXJzICAqe1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZGFubWFrdS1jb250YWluZXJzIC5zdGFnZXtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbn1cXG4uZGFubWFrdS1jb250YWluZXJzLWRlYnVnICp7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvY3NzL2Jhc2UuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxzQkFBc0I7QUFDMUI7QUFDQTtJQUNJLGtCQUFrQjtBQUN0QjtBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5kYW5tYWt1LWNvbnRhaW5lcnN7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLmRhbm1ha3UtY29udGFpbmVycyAgKntcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmRhbm1ha3UtY29udGFpbmVycyAuc3RhZ2V7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG59XFxuLmRhbm1ha3UtY29udGFpbmVycy1kZWJ1ZyAqe1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsImltcG9ydCBhcGkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgICAgICAgIGltcG9ydCBjb250ZW50IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vYmFzZS5jc3NcIjtcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB2YXIgYXR0cmlidXRlcyA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLm1lZGlhID8gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKS5jb25jYXQob2JqLmNzcywgXCJ9XCIpIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGlhJyk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGUuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXIgc2luZ2xldG9uQ291bnRlciA9IDA7XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgc3R5bGU7XG4gIHZhciB1cGRhdGU7XG4gIHZhciByZW1vdmU7XG5cbiAgaWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG4gICAgc3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZSA9IGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlKG9iaik7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTsgLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4gIC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcblxuICBpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG4gIH1cblxuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG5ld0xpc3QpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRG9tW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRvbVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRvbS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIi8qKlxuICog5YWo5bGA5LiK5LiL5paHXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250ZXh0e1xuICAgIC8qKlxuICAgICAqIOW9k+WJjeivreiogFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGFuZ3VhZ2U6c3RyaW5nID0gXCJ6aC1jblwiO1xuICAgIHB1YmxpYyBzdGF0aWMgZGVidWcgPSB0cnVlO1xufVxuXG4iLCJcbmltcG9ydCB7IFNpemVJbnRlcmZhY2UgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL1N0eWxlL1NpemVJbnRlcmZhY2VcIjtcbmltcG9ydCB7IFN0YWdlSW50ZXJmYWNlIH0gZnJvbSBcIi4uL2ludGVyZmFjZS9TdGFnZS9TdGFnZUludGVyZmFjZVwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCIuLi9Db250ZXh0L0NvbnRleHRcIjtcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi4vaTE4blwiO1xuaW1wb3J0IHsgY2FudmFzU3R5bGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL1N0eWxlL0NhbnZhc1N0eWxlXCI7XG5pbXBvcnQgeyBSZW5kZXJlckZhY3RvcnkgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL1JlbmRlcmVyL1JlbmRlcmVyRmFjdG9yeVwiO1xuXG4vKipcbiAqIOaOp+WItuWZqCDvvIznu5/kuIDnrqHnkIbmlbTkuKrlvLnluZXns7vnu59cbiAqIOWcqOi/memHjO+8jOavj+enjeW8ueW5leexu+Wei+mDveS8muW+l+WIsOS4gOS4quiInuWPsOWvueixoe+8jOi/m+ihjOa4suafk1xuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciB7XG4gICAgLyoqXG4gICAgICog55S75biD5a+56LGhXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNvbnRhaW5lcnM6IEhUTUxFbGVtZW50O1xuICAgIC8qKlxuICAgICAqIOWunuaXtueahENzc+agt+W8j+ihqFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjYW52YXNTdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbjtcbiAgICAvKipcbiAgICAgKiDoiJ7lj7DliJfooahcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgc3RhZ2VMaXN0OiBTdGFnZUludGVyZmFjZVtdID0gW107XG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyczogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJzID0gY29udGFpbmVyc1xuICAgICAgICAvL+iOt+WPluWunuaXtueahHN0eWxl5a+56LGh77yM5b2T5aSn5bCP5Y+R55Sf5Y+Y5YyW5pe277yM5Lya5pu05paw6Ieq6LqrXG4gICAgICAgIHRoaXMuY2FudmFzU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXJzKTtcbiAgICAgICAgLy/liJ3lp4vljJblrrnlmahcbiAgICAgICAgdGhpcy5pbml0Q29udGFpbmVyKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflvpflrrnlmajlsLrlr7hcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q29udGFpbmVyc1NpemUoKTogU2l6ZUludGVyZmFjZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogcGFyc2VJbnQodGhpcy5jYW52YXNTdHlsZS53aWR0aCksXG4gICAgICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KHRoaXMuY2FudmFzU3R5bGUuaGVpZ2h0KVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOWwhuS4gOS4quiInuWPsOa3u+WKoOWIsOWuueWZqOWGhVxuICAgICAqIEBwYXJhbSBzdGFnZSDoiJ7lj7BcbiAgICAgKiBAcGFyYW0gaW5kZXgg5o6S5YiX6aG65bqPXG4gICAgICogQHJldHVybnMg5oiQ5Yqf5LiO5aSx6LSl55qE54q25oCBXG4gICAgICovXG4gICAgcHVibGljIHJlZ2lzdFN0YWdlKHN0YWdlOiBTdGFnZUludGVyZmFjZSwgaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICAvL+ajgOafpeWIl+ihqOS4reaYr+WQpuWtmOWcqFxuICAgICAgICBpZiAodGhpcy5zdGFnZUxpc3RbaW5kZXhdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGFnZUxpc3RbaW5kZXhdID0gc3RhZ2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDlsIboiJ7lj7DmjILovb3liLDlrrnlmajkuK1cbiAgICAgKi9cbiAgICBwdWJsaWMgbW91bnQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGkxOG4udChcIlN0YXJ0IG1vdW50IHN0YWdlXCIpKTtcbiAgICAgICAgLy/pgY3ljobmr4/kuIDkuKroiJ7lj7BcbiAgICAgICAgdGhpcy5zdGFnZUxpc3QuZm9yRWFjaCgoc3RhZ2UpID0+IHtcbiAgICAgICAgICAgIC8v6I635Y+W5LiA5LiqZGl2XG4gICAgICAgICAgICBsZXQgZGl2ID0gdGhpcy5nZXRESVYoKVxuICAgICAgICAgICAgLy/nu5noiJ7lj7DliJ3lp4vljJbmuLLmn5PlmahcbiAgICAgICAgICAgIGxldCByZW5kZXIgPSBSZW5kZXJlckZhY3RvcnkuZ2V0UmVuZGVySW5zdGFuY2UoXCJiYXNlXCIpO1xuICAgICAgICAgICAgLy/lsIZkaXbmjILovb3liLDmuLLmn5PlmahcbiAgICAgICAgICAgIHJlbmRlci5zZXRDYW52YXNDb250YWluZXIoZGl2KVxuICAgICAgICAgICAgLy/orr7nva7oiJ7lj7DmuLLmn5PlmahcbiAgICAgICAgICAgIHN0YWdlLnN0YWdlUmVuZGVyZXIocmVuZGVyKTtcbiAgICAgICAgICAgIC8v5pu05paw5riy5p+T5Zmo5YaF55S75biD5qC35byPXG4gICAgICAgICAgICByZW5kZXIudXBkYXRlQ2FudmFzU3R5bGUodGhpcy5nZXRDYW52YXNTdHlsQnlTdGFnZShzdGFnZSkpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5Yid5aeL5YyW5by55bmV5a655ZmoXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGluaXRDb250YWluZXIoKSB7XG4gICAgICAgIGlmIChDb250ZXh0LmRlYnVnKSB7XG4gICAgICAgICAgICAvL2RlYnVn5qih5byPXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lcnMuY2xhc3NMaXN0LmFkZChcImRhbm1ha3UtY29udGFpbmVycy1kZWJ1Z1wiKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGFpbmVycy5jbGFzc0xpc3QuYWRkKFwiZGFubWFrdS1jb250YWluZXJzXCIpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6YeN572u5bC65a+4XG4gICAgICovXG4gICAgcHVibGljIHJlc2l6ZSgpe1xuICAgICAgICAvL+mHjee9ruiInuWPsOeahOWwuuWvuFxuICAgICAgICB0aGlzLnN0YWdlTGlzdC5mb3JFYWNoKChzdGFnZSk9PntcbiAgICAgICAgICAgIGxldCByZW5kZXIgPSBzdGFnZS5nZXRSZW5kZXJlcigpXG4gICAgICAgICAgICBpZiggcmVuZGVyICl7XG4gICAgICAgICAgICAgICAgcmVuZGVyLnVwZGF0ZUNhbnZhc1N0eWxlKHRoaXMuZ2V0Q2FudmFzU3R5bEJ5U3RhZ2Uoc3RhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgLyoqXG4gICAgICog5Yib5bu6ZGl25a655ZmoIFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRESVYoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJzdGFnZVwiKVxuICAgICAgICB0aGlzLmNvbnRhaW5lcnMuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmoLnmja7oiJ7lj7Dlr7nosaHliJvlu7rkuIDkuKpjYW52YXNTdHlsZVxuICAgICAqIEBwYXJhbSBzdGFnZSDoiJ7lj7Dlr7nosaFcbiAgICAgKiBAcmV0dXJucyBcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgZ2V0Q2FudmFzU3R5bEJ5U3RhZ2Uoc3RhZ2U6IFN0YWdlSW50ZXJmYWNlKTogY2FudmFzU3R5bGUge1xuICAgICAgICBsZXQgc2l6ZSA9IHN0YWdlLnN0YWdlU2l6ZSh0aGlzLmdldENvbnRhaW5lcnNTaXplKCkpXG4gICAgICAgIGxldCBjb2xvciA9IHN0YWdlLnN0YWdlQmFja2dyb3VuZENvbG9yKHRoaXMuZ2V0Q29udGFpbmVyc1NpemUoKSlcbiAgICAgICAgbGV0IHBvcyA9IHN0YWdlLnN0YWdlUG9zaXRpb24odGhpcy5nZXRDb250YWluZXJzU2l6ZSgpLCBzaXplKVxuICAgICAgICByZXR1cm4geyBwb3NpdGlvbjogcG9zLCBjb2xvcjogY29sb3IsIHNpemU6IHNpemUgfVxuICAgIH1cblxufSIsImltcG9ydCB7IENvbnRleHQgfSBmcm9tIFwiLi4vQ29udGV4dC9Db250ZXh0XCI7XG5pbXBvcnQgemhDbiBmcm9tIFwiLi96aC1jblwiO1xuLyoqXG4gKiBpMThuIOWbvemZheWMluWHveaVsFxuICovXG5leHBvcnQgY2xhc3MgaTE4biB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgdHJhblR4dCA9IHtcbiAgICAgICAgXCJ6aC1jblwiOiB6aENuXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW9k+WJjeivreiogFxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIGxhbmd1YWdlOiBzdHJpbmcgPSBDb250ZXh0Lmxhbmd1YWdlO1xuICAgIC8qKlxuICAgICAqIOiOt+WPlue/u+ivke+8jOWmguaenOS4jeWtmOWcqO+8jOWImei/lOWbnuiHqui6q1xuICAgICAqIEBwYXJhbSBzdHIg6ZyA6KaB5Zu96ZmF5YyW55qE5a2X56ym5LiyXG4gICAgICogQHJldHVybnMg57+76K+R57uT5p6cXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgLy/mo4Dmn6XlrZfnrKbkuLLmmK/lkKblrZjlnKhcbiAgICAgICAgaWYgKHRoaXMudHJhblR4dFt0aGlzLmxhbmd1YWdlXSAmJiB0aGlzLnRyYW5UeHRbdGhpcy5sYW5ndWFnZV1bc3RyXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhblR4dFt0aGlzLmxhbmd1YWdlXVtzdHJdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBcIkNvbnRhaW5lcnMgaXMgbnVsbFwiIDogXCLlrrnlmajkuLrnqbpcIixcbiAgICBcIlN0YXJ0IG1vdW50IHN0YWdlXCIgOiBcIuW8gOWni+aMgui9veiInuWPsFwiLFxuICAgIFwiUmVuZGVyZXIgdHlwZSBpcyBudWxsXCI6IFwi5rKh5pyJ5om+5Yiw5ZCI6YCC55qE5riy5p+T5ZmoXCJcbn0iLCJcbmltcG9ydCB7IFVuaXRUb29scyB9IGZyb20gXCJzcmMvdHMvdXRpbC9Vbml0VG9vbHNcIjtcbmltcG9ydCB7IGNhbnZhc1N0eWxlIH0gZnJvbSBcIi4uL1N0eWxlL0NhbnZhc1N0eWxlXCI7XG5pbXBvcnQgeyBSZW5kZXJlckludGVyZmFjZSB9IGZyb20gXCIuL1JlbmRlcmVySW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBCYXNlUmVuZGVyZXIgaW1wbGVtZW50cyBSZW5kZXJlckludGVyZmFjZXtcbiAgICBwcm90ZWN0ZWQgY2FudmFzPzpIVE1MRWxlbWVudFxuICAgIHNldENhbnZhc0NvbnRhaW5lcihjYW52YXM6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHVwZGF0ZUNhbnZhc1N0eWxlKHN0eWxlOiBjYW52YXNTdHlsZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZih0aGlzLmNhbnZhcyl7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IFVuaXRUb29scy5sZW5ndGhTcnRpbmcoc3R5bGUuc2l6ZS53aWR0aCk7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBVbml0VG9vbHMubGVuZ3RoU3J0aW5nKHN0eWxlLnNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLmxlZnQgPSBVbml0VG9vbHMubGVuZ3RoU3J0aW5nKHN0eWxlLnBvc2l0aW9uLngpXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS50b3AgPSBVbml0VG9vbHMubGVuZ3RoU3J0aW5nKHN0eWxlLnBvc2l0aW9uLnkpXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBVbml0VG9vbHMuY29sb3JTdHJpbmcoc3R5bGUuY29sb3IpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9ICBcbiAgICB9XG59IiwiLyoqXG4gKiDnroDljZXmuLLmn5Plmajlt6XljoJcbiAqL1xuXG5pbXBvcnQgeyBpMThuIH0gZnJvbSBcInNyYy90cy9pMThuXCI7XG5pbXBvcnQgeyBCYXNlUmVuZGVyZXIgfSBmcm9tIFwiLi9CYXNlUmVuZGVyZXJcIjtcbmltcG9ydCB7IFJlbmRlcmVySW50ZXJmYWNlIH0gZnJvbSBcIi4vUmVuZGVyZXJJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyRmFjdG9yeXtcbiAgICBzdGF0aWMgcmVuZGVyZXJMaXN0ID0ge1xuICAgICAgICBiYXNlOkJhc2VSZW5kZXJlclxuICAgIH1cbiAgICBzdGF0aWMgZ2V0UmVuZGVySW5zdGFuY2UodHlwZTpzdHJpbmcpOlJlbmRlcmVySW50ZXJmYWNle1xuICAgICAgICBpZiAodGhpcy5yZW5kZXJlckxpc3RbdHlwZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcy5yZW5kZXJlckxpc3RbdHlwZV0oKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRocm93IFJlZmVyZW5jZUVycm9yKGkxOG4udChcIlJlbmRlcmVyIHR5cGUgaXMgbnVsbFwiKSlcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBSZW5kZXJlckludGVyZmFjZSB9IGZyb20gXCIuLi9SZW5kZXJlci9SZW5kZXJlckludGVyZmFjZVwiO1xuaW1wb3J0IHsgQ29sb3JJbnRlcmZhY2UgfSBmcm9tIFwiLi4vU3R5bGUvQ29sb3JJbnRlcmZhY2VcIjtcbmltcG9ydCB7IFBvc2l0aW9uSW50ZXJmYWNlIH0gZnJvbSBcIi4uL1N0eWxlL1Bvc2l0aW9uSW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBTaXplSW50ZXJmYWNlIH0gZnJvbSBcIi4uL1N0eWxlL1NpemVJbnRlcmZhY2VcIjtcbmltcG9ydCB7IFN0YWdlSW50ZXJmYWNlIH0gZnJvbSBcIi4vU3RhZ2VJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIEJhc2VTdGFnZSBpbXBsZW1lbnRzIFN0YWdlSW50ZXJmYWNlIHtcblxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXJJbnRlcmZhY2U7XG4gICAgc3RhZ2VTaXplKGNvbnRhaW5lcnNTaXplOiBTaXplSW50ZXJmYWNlKTogU2l6ZUludGVyZmFjZSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogY29udGFpbmVyc1NpemUud2lkdGggKiAwLjgsXG4gICAgICAgICAgICBoZWlnaHQ6IGNvbnRhaW5lcnNTaXplLmhlaWdodCAqIDAuM1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YWdlUG9zaXRpb24oY29udGFpbmVyc1NpemU6IFNpemVJbnRlcmZhY2UsIHN0YWdlU2l6ZTogU2l6ZUludGVyZmFjZSk6IFBvc2l0aW9uSW50ZXJmYWNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IChjb250YWluZXJzU2l6ZS53aWR0aCAtIHN0YWdlU2l6ZS53aWR0aCkgLyAyLFxuICAgICAgICAgICAgeTogY29udGFpbmVyc1NpemUuaGVpZ2h0IC0gc3RhZ2VTaXplLmhlaWdodFxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YWdlQmFja2dyb3VuZENvbG9yKCk6IENvbG9ySW50ZXJmYWNlIHtcbiAgICAgICAgcmV0dXJuIHsgcjogMCwgZzogMCwgYjogMCwgYTogMSB9XG4gICAgfVxuICAgIHN0YWdlUmVuZGVyZXIocmVuZGVyOiBSZW5kZXJlckludGVyZmFjZSk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBnZXRSZW5kZXJlcigpOiBSZW5kZXJlckludGVyZmFjZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyXG4gICAgfVxuXG5cbn0iLCJpbXBvcnQgeyBDb2xvckludGVyZmFjZSB9IGZyb20gXCIuLi9pbnRlcmZhY2UvU3R5bGUvQ29sb3JJbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIFVuaXRUb29sc3tcbiAgICAvKipcbiAgICAgKiDmi7zmjqXluKbljZXkvY3nmoTplb/luqblrZfnrKbkuLJcbiAgICAgKiBAcGFyYW0gbnVtIOmVv+W6plxuICAgICAqIEByZXR1cm5zIFxuICAgICAqL1xuICAgIHN0YXRpYyBsZW5ndGhTcnRpbmcobnVtOm51bWJlcik6c3RyaW5ne1xuICAgICAgICByZXR1cm4gbnVtICsgXCJweFwiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmi7zmjqVyZ2JhKCnpopzoibLlrZfnrKbkuLJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6aKc6ImyXG4gICAgICogQHJldHVybnMgXG4gICAgICovXG4gICAgc3RhdGljIGNvbG9yU3RyaW5nKGNvbG9yOkNvbG9ySW50ZXJmYWNlKTpzdHJpbmd7XG4gICAgICAgIHJldHVybiBcInJnYmEoXCIgKyBjb2xvci5yICsgXCIsXCIgKyBjb2xvci5nICsgXCIsXCIgKyBjb2xvci5iICsgXCIsXCIgKyBjb2xvci5hICsgXCIpXCJcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4uL2Nzcy9iYXNlLmNzc1wiO1xuaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJy4vQ29udHJvbGxlci9Db250cm9sbGVyJztcbmltcG9ydCB7IGkxOG4gfSBmcm9tIFwiLi9pMThuXCJcbmltcG9ydCB7IEluaXRDb25maWdJbnRlcmZhY2UgfSBmcm9tIFwiLi9pbnRlcmZhY2UvSW5pdENvbmZpZ0ludGVyZmFjZVwiO1xuaW1wb3J0IHsgQmFzZVN0YWdlIH0gZnJvbSBcIi4vaW50ZXJmYWNlL1N0YWdlL0Jhc2VTdGFnZVwiO1xuY2xhc3MgTWZ1bnNEYW5NYWt1IHtcbiAgICBtYWluKGNvbmZpZzpJbml0Q29uZmlnSW50ZXJmYWNlKSB7XG4gICAgICAgIC8v57G75Z6L5qOA5p+lXG4gICAgICAgIGlmICghY29uZmlnLmNvbnRhaW5lcnMpIHtcbiAgICAgICAgICAgIHRocm93IFJlZmVyZW5jZUVycm9yKGkxOG4udChcIkNvbnRhaW5lcnMgaXMgbnVsbFwiKSlcbiAgICAgICAgfVxuICAgICAgICAgbGV0IGMgPSAgbmV3IENvbnRyb2xsZXIoY29uZmlnLmNvbnRhaW5lcnMpXG4gICAgICAgICBjLnJlZ2lzdFN0YWdlKG5ldyBCYXNlU3RhZ2UoKSwxKVxuICAgICAgICAgYy5tb3VudCgpXG5cbiAgICAgICAgIC8v55uR5ZCs5aSn5bCP5Y+Y5YyWXG4gICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCgpPT57XG4gICAgICAgICAgICAgYy5yZXNpemUoKVxuICAgICAgICAgfSlcbiAgICB9XG59XG4vL+a3u+WKoOi/m+WFqOWxgFxuaWYgKGdsb2JhbFRoaXMpIHtcbiAgICBnbG9iYWxUaGlzLk1mdW5zRGFuTWFrdSA9IE1mdW5zRGFuTWFrdTtcbn1cbmV4cG9ydCBkZWZhdWx0IE1mdW5zRGFuTWFrdTsiXSwic291cmNlUm9vdCI6IiJ9