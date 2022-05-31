import utils from "./utils";

class Danmaku {
  constructor(options) {
    this.options = options;
    this.container = this.options.container;
    this.danTunnel = {
      right: {},
      left: {},
      top: {},
      bottom: {},
    };
    this.danIndex = 0;
    this.dan = [];
    this.tunnelHeights = {
      right: [],
      left: [],
      top: [],
      bottom: [],
    };
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

    this._readAllEndpoints(endpoints, (results) => {
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
        success: (data) => {
          results[i] = data;

          ++readCount;
          if (readCount === endpoints.length) {
            callback(results);
          }
        },
        error: (msg) => {
          this.events && this.events.trigger("danmaku_load_failed");
          this.options.error(msg || "弹幕加载失败");
          results[i] = [];
          console.log(msg);
          ++readCount;
          if (readCount === endpoints.length) {
            callback(results);
          }
        },
      });
    }
  }

  send(dan) {
    const danmakuData = {
      time: this.options.time() + 0.52,
      size: dan.size || 18,
      text: dan.text,
      color: dan.color || 16777215,
      type: dan.type || "right",
    };

    const danmaku = {
      text: this.htmlEncode(danmakuData.text),
      color: danmakuData.color,
      size: danmakuData.size,
      type: danmakuData.type,
      isSubtitle: /(\/n)|(\\n)/i.test(danmakuData.text),
      border: `2px solid ${this.options.borderColor}`,
    };
    console.log(danmakuData);
    this.dan.splice(this.danIndex, 0, danmakuData);
    this.danIndex++;

    this.draw(danmaku);
    this.options.sendDanmaku &&
      this.options.sendDanmaku(
        [
          +this.options.time().toFixed(2),
          utils.type2Number(dan.type ?? "right"),
          utils.color2Number(dan.color ?? "#FFFFFF"),
          dan.text,
          +dan.size ?? 18,
        ],
        this.options.videoIndex()
      );
    this.events && this.events.trigger("danmaku_send", danmakuData);
  }
  checkShield = (dan) => {
    let type = typeof dan.type !== "string" ? utils.number2Type(dan.type) : dan.type;
    if (this[`${type}Limit`] && !/(\/n)|(\\n)/i.test(dan.text)) {
      return false;
    }
    return true;
  };
  frame() {
    if (this.dan.length && !this.paused && this.showing) {
      let item = this.dan[this.danIndex];
      const dan = [];
      while (item && this.options.time() > item.time) {
        if (this.checkShield(item)) {
          dan.push(item);
        }
        item = this.dan[++this.danIndex];
      }
      if (this.colorLimit) {
        this.draw(
          dan.filter((el) => {
            return el.color === 16777215;
          })
        );
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
    if (flag) {
      this.clear(type);
      const forbidDanmaku = this.container.querySelectorAll(`.mfunsPlayer-danmaku-${type}`);
      forbidDanmaku.forEach((el) => {
        if (!el.classList.contains("subtitle")) {
          el.innerHTML = "";
        }
      });
    }
    if (type === "color") {
      const items = this.container.querySelectorAll(".mfunsPlayer-danmaku-item");
      items.forEach((el) => {
        if (el.style.color !== "rgb(255, 255, 255)" && !el.classList.contains("subtitle")) {
          el.innerHTML = "";
        }
      });
    }
  }
  opacity(percentage) {
    if (percentage !== undefined) {
      const items = this.container.getElementsByClassName("mfunsPlayer-danmaku-item");
      for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("subtitle")) continue;
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
        if (items[i].classList.contains("subtitle")) continue;
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
  //弹幕绘制
  draw(dan) {
    if (this.showing) {
      const itemHeight = this.options.height * this._fontScale; // 弹幕轨道高度
      const danWidth = this.container.offsetWidth; //弹幕容器宽度
      const danHeight = this.container.offsetHeight; //弹幕容器高度
      const itemY = Math.floor(danHeight / itemHeight); //轨道数量
      // console.log(itemY);
      if (this.tunnelHeights.right !== itemY) this.tunnelHeights.right = utils.createArray(itemY, itemHeight);
      if (this.tunnelHeights.left !== itemY) this.tunnelHeights.left = utils.createArray(itemY, itemHeight);
      if (this.tunnelHeights.top !== itemY) this.tunnelHeights.top = utils.createArray(itemY, itemHeight);
      if (this.tunnelHeights.bottom !== itemY) this.tunnelHeights.bottom = utils.createArray(itemY, itemHeight);
      //弹幕与弹幕容器右侧的距离(滚动弹幕)
      const danItemRight = (ele) => {
        const eleWidth = ele.offsetWidth || parseInt(ele.style.width);
        const eleRight = ele.getBoundingClientRect().right || this.container.getBoundingClientRect().right + eleWidth;
        return this.container.getBoundingClientRect().right - eleRight;
      };
      //弹幕与弹幕容器左侧的距离(逆向弹幕)
      const danItemLeft = (ele) => {
        const eleWidth = ele.clientWidth || parseInt(ele.style.width);
        const eleLeft = ele.getBoundingClientRect().left || this.container.getBoundingClientRect().left + eleWidth;
        return this.container.getBoundingClientRect().left - eleLeft;
      };
      const danSpeed = (width) => (danWidth + width) / 5; //弹幕速度

      //获取弹幕可进入的轨道
      const getTunnel = (ele, type, width) => {
        const tmp = danWidth / danSpeed(width); //弹幕自身完全进入弹幕容器所需要的时间
        for (let i = 0; this.unlimited || i < itemY; i++) {
          const item = this.danTunnel[type][i + ""]; //轨道弹幕组(单轨道内的所有弹幕)
          if (item && item.length) {
            //当前轨道高度
            // this.tunnelHeights[type][i] = Math.max(...item.map((el) => parseInt(el.style.fontSize))) + 7;

            if (type !== "right" && type !== "left") {
              // this.tunnelHeights[type][i] = parseInt(ele.style.fontSize) + 7;
              continue;
            }

            // --------轨道弹幕组弹幕防碰撞检测--------
            for (let j = 0; j < item.length; j++) {
              if (type === "right") {
                const danRight = danItemRight(item[j]) - 10;
                if (danRight <= danWidth - tmp * danSpeed(parseInt(item[j].style.width)) || danRight <= 0) {
                  this.tunnelHeights[type][i] = parseInt(item[j].style.fontSize) + 7;

                  //该情况表示当前轨道有滚动弹幕未完全进入弹幕容器，禁止向该轨道装填弹幕
                  break;
                }
              }
              if (type === "left") {
                const danLeft = danItemLeft(item[j]) - 10;
                this.tunnelHeights[type][i] = parseInt(item[j].style.fontSize) + 7;
                if (danLeft <= danWidth - tmp * danSpeed(parseInt(item[j].style.width)) || danLeft <= 0) {
                  //该情况表示当前轨道有逆向弹幕未完全进入弹幕容器，禁止向该轨道装填弹幕
                  break;
                }
              }
              if (j === item.length - 1) {
                //轨道弹幕组遍历完毕，组内所有弹幕均完全进入容器，可以向该轨道装填弹幕
                this.tunnelHeights[type][i] = parseInt(item[j].style.fontSize) + 7;
                this.danTunnel[type][i + ""].push(ele);
                // ele.addEventListener("animationstart", () => {
                //   this.tunnelHeights[type][i] = parseInt(ele.style.fontSize) + 7;
                // });
                ele.addEventListener("animationend", () => {
                  this.danTunnel[type] !== {} && this.danTunnel[type][i + ""]?.splice(0, 1);
                });
                return i % Math.floor(itemY * this._limitArea);
              }
            }
          } else {
            this.danTunnel[type][i + ""] = [ele];
            ele.addEventListener("animationend", () => {
              this.danTunnel[type] !== {} && this.danTunnel[type][i + ""]?.splice(0, 1);
            });
            return i % Math.floor(itemY * this._limitArea);
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
          dan[i].type = utils.number2Type(dan[i].type);
        }

        if (!dan[i].color) {
          dan[i].color = 16777215;
        }
        if (!dan[i].size) {
          dan[i].size = 18;
        }
        const item = document.createElement("div");
        if (!this.paused) {
          item.classList.add("mfunsPlayer-danmaku-run");
        } else {
          item.classList.remove("mfunsPlayer-danmaku-run");
        }
        item.classList.add("mfunsPlayer-danmaku-item");
        item.classList.add(`mfunsPlayer-danmaku-${dan[i].type}`);
        dan[i].isSubtitle = /(\/n)|(\\n)/i.test(dan[i].text);
        dan[i].isSubtitle && item.classList.add("subtitle");

        // console.log(dan[i].isSubtitle);
        if (dan[i].border) {
          item.innerHTML = `<span style="border:${dan[i].border}">${dan[i].text.replace(/(\/n)|(\\n)/g, "\n")}</span>`;
        } else {
          item.innerHTML = dan[i].text.replace(/(\/n)|(\\n)/g, "\n");
        }
        if (typeof dan[i].color !== "string") {
          item.style.color = utils.number2Color(dan[i].color);
        }
        item.style.opacity = dan[i].isSubtitle ? 1 : this._opacity;
        item.style.fontSize = (+dan[i].size + 3) * (dan[i].isSubtitle ? 1 : this._fontScale) + "px";
        item.style.zIndex = dan[i].isSubtitle ? 100 : 1;
        item.addEventListener("animationend", () => {
          this.container.removeChild(item);
        });

        const itemWidth = this._measure(dan[i].text, +dan[i].size ?? 18);

        let tunnel;

        // adjust
        switch (dan[i].type) {
          case "right":
            tunnel = getTunnel(item, dan[i].type, itemWidth);
            if (tunnel >= 0 || dan[i].isSubtitle) {
              const maxTop = this.tunnelHeights.right.slice(0, itemY).reduce((prev, cur) => prev + cur, 0);
              const top = this.tunnelHeights.right.slice(0, tunnel).reduce((prev, cur) => prev + cur, 0) % maxTop;
              if (top + parseInt(item.style.fontSize) + 7 > danHeight) {
                this.danTunnel[dan[i].type][i + ""]?.pop();
                return;
              }
              // console.log(this.tunnelHeights);

              item.style.width = itemWidth + 1 + "px";
              item.style.top = (dan[i].isSubtitle ? 0 : top) + "px";
              item.style.transform = `translateX(-${danWidth}px)`;
            }
            break;
          case "left":
            tunnel = getTunnel(item, dan[i].type, itemWidth);
            if (tunnel >= 0 || dan[i].isSubtitle) {
              const maxTop = this.tunnelHeights.left.slice(0, itemY).reduce((prev, cur) => prev + cur, 0);
              const top = this.tunnelHeights.left.slice(0, tunnel).reduce((prev, cur) => prev + cur, 0) % maxTop;
              if (top + parseInt(item.style.fontSize) + 7 > danHeight) {
                this.danTunnel[dan[i].type][i + ""]?.pop();
                return;
              }
              item.style.width = itemWidth + 1 + "px";
              item.style.top = (dan[i].isSubtitle ? 0 : top) + "px";
              item.style.transform = `translateX(${danWidth}px)`;
            }
            break;
          case "top":
            tunnel = getTunnel(item, dan[i].type);
            if (tunnel >= 0 || dan[i].isSubtitle) {
              // const maxTop = this.tunnelHeights.top.slice(0, itemY).reduce((prev, cur) => prev + cur, 0);
              // const top = this.tunnelHeights.top.slice(0, tunnel).reduce((prev, cur) => prev + cur, 0) % maxTop;
              let topArr = [];
              const topDan = this.danTunnel.top;
              for (let key in topDan) {
                topArr.push(...topDan[key]);
              }
              const top = topArr
                .map((el) => {
                  return parseInt(el.style.fontSize) + 7;
                })
                .slice(0, tunnel)
                .reduce((prev, cur) => prev + cur, 0);

              if (top + parseInt(item.style.fontSize) + 7 > danHeight) {
                this.danTunnel[dan[i].type][i + ""]?.pop();
                return;
              }
              item.style.top = (dan[i].isSubtitle ? 0 : top) + "px";
            }
            break;
          case "bottom":
            tunnel = getTunnel(item, dan[i].type);
            if (tunnel >= 0 || dan[i].isSubtitle) {
              // const maxBottom = this.tunnelHeights.bottom.slice(0, itemY).reduce((prev, cur) => prev + cur, 0);
              // const bottom =
              //   this.tunnelHeights.bottom.slice(0, tunnel).reduce((prev, cur) => prev + cur, 0) % maxBottom;
              let bottomArr = [];
              const bottomDan = this.danTunnel.bottom;
              for (let key in bottomDan) {
                bottomArr.push(...bottomDan[key]);
              }
              const bottom = bottomArr
                .map((el) => {
                  return parseInt(el.style.fontSize) + 7;
                })
                .slice(0, tunnel)
                .reduce((prev, cur) => prev + cur, 0);

              if (bottom + parseInt(item.style.fontSize) + 7 > danHeight) {
                this.danTunnel[dan[i].type][i + ""]?.pop();
                return;
              }
              item.style.bottom = (dan[i].isSubtitle ? 0 : bottom) + "px";
            }
            break;
          default:
            console.error(`Can't handled danmaku type: ${dan[i].type}`);
        }
        // console.log(tunnel);
        if (tunnel >= 0) {
          // move
          item.classList.add("mfunsPlayer-danmaku-move");
          if (!!this._speed && !dan[i].isSubtitle) {
            item.classList.add(this._speed);
          }
          // insert
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

  _measure(text, size) {
    if (!this.demoDanmaku) {
      this.demoDanmaku = this.container.getElementsByClassName("mfunsPlayer-danmaku-item")[0];
    }
    this.demoDanmaku.style.fontSize = (size + 3) * this._fontScale + "px";

    let measureStyle = getComputedStyle(this.demoDanmaku, false);
    if (!this.context) {
      this.context = document.createElement("canvas").getContext("2d");
    }
    const fontSize = measureStyle.getPropertyValue("font-size");
    const fontWeight = measureStyle.getPropertyValue("font-weight");
    const fontFamily = measureStyle.getPropertyValue("font-family");
    this.context.font = `${fontWeight}  ${fontSize} / ${fontSize} ${fontFamily}`;
    // if (text == `喵御宅Mfuns,发射(。゜ω゜)ノ"!M站`) {
    //   console.log(this.context.measureText(text).width, measureStyle);
    // }
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

  clear(type) {
    if (type) {
      this.danTunnel[type] = {};
      return;
    }
    this.danTunnel = {
      left: {},
      right: {},
      top: {},
      bottom: {},
    };
    this.danIndex = 0;
    this.options.container.innerHTML = "";
    this.options.container.appendChild(this.demoDanmaku);
    this.events && this.events.trigger("danmaku_clear");
  }

  htmlEncode(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
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
  toggle() {
    if (this.showing) {
      this.hide();
    } else {
      this.show();
    }
  }
  unlimit(boolean) {
    this.unlimited = boolean;
  }
}

export default Danmaku;
