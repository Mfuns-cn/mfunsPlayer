import utils from "./utils";
import { Switch } from "./components/components";
class Danmaku {
  constructor (options, player) {
    this.options = options;
    this.player = player;
    this.createHash = utils.initHash();
    this.tunnelPadding = 6;
    this.container = this.options.container;
    this.danTunnel = {
      right: {},
      left: {},
      top: {},
      bottom: {},
    };
    this.tunnelHeights = {
      right: [],
      left: [],
      top: [],
      bottom: [],
    };
    this.danCount = {
      unknown: 0,
      mfuns: 0,
      bili: 0,
      acfun: 0,
    };
    this.danData = {
      unknown: null,
      mfuns: null,
      bili: null,
      acfun: null,
    };
    this.danIndex = 0;
    this.dan = [];
    this.showing = this.options.isShow;
    this._opacity = this.options.opacity;
    this._fontScale = this.options.fontScale;
    this._speed = this.options.speed;
    // this._speedVal = speed
    this._limitArea = this.options.limitArea;
    this.events = this.options.events;
    this.topLimit = false;
    this.bottomLimit = false;
    this.leftLimit = false;
    this.rightLimit = false;
    this.colorLimit = false;
    this.advanceLimit = false;
    this.mfunsLimit = false;
    this.biliLimit = false;
    this.acfunLimit = false;
    this.unknownLimit = false;
    this.originFilter = new Set();
    this.unlimited = this.options.unlimited;
    this.loaded = false; // 弹幕是否加载完毕
    this.paused = true;
    this.danmakuCheck = false;
    this.danmakuTip = this.player.template.danmakuTip;
    this.danmakuTipBox = this.player.template.danmakuTipBox;
    this.currentX = 0;
    this.currentY = 0;
    this.danmakuCatch = this.options.danmakuCatch; // 是否开启弹幕捕获
    this._measure("");
    this.load();
    this.initDanmakuTips();
  }
  initDanmakuTips() {
    const danmakuTipMaskMove = (e) => {
      if (
        Math.sqrt(Math.pow(e.pageX - this.currentX, 2) + Math.pow(e.pageY - this.currentY, 2)) >
        this.player.options.danmaku.sensitivity ??
        3.5
      ) {
        this.currentX = e.pageX;
        this.currentY = e.pageY;
        return;
      }
      this.currentX = e.pageX;
      this.currentY = e.pageY;
      const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
      const scrollY = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      const items = this.container.getElementsByClassName("mfunsPlayer-danmaku-item");
      for (let i = 0; i < items.length; i++) {
        // if (this.currentLockDanmaku) break;
        const item = items[i];
        const boundingClientRect = item.getBoundingClientRect();
        const danLeft = boundingClientRect.left + scrollX;
        const danRight = boundingClientRect.right + scrollX;
        const danTop = boundingClientRect.top + scrollY;
        const danBottom = boundingClientRect.bottom + scrollY;
        // i == 3 && console.log(danTop, danBottom);
        if (danLeft < e.pageX && e.pageX < danRight && danTop < e.pageY && e.pageY < danBottom) {
          this.currentLockDanmaku = item;
          this.lockDanmakuData = this.getDanmakuData(item.dataset.id);
          if (this.player.options.uid === +this.lockDanmakuData.author) {
            this.player.template.danmakuCancel.classList.add("show");
            this.player.template.danmakuReport.classList.remove("show");
          } else {
            this.player.template.danmakuCancel.classList.remove("show");
            this.player.template.danmakuReport.classList.add("show");
          }
          item.classList.add("lock");
          this.danmakuTip.classList.add("show");
          const itemTop = danTop - this.container.getBoundingClientRect().top - scrollY;
          this.danmakuTip.style.top = itemTop + 5 + "px";
          this.danmakuTip.style.height = 45 + item.offsetHeight + "px";
          if (e.pageX - this.container.getBoundingClientRect().left < 75) {
            this.danmakuTip.style.left = -scrollX;
          } else if (this.container.clientWidth - (e.pageX - this.container.getBoundingClientRect().left) < 75) {
            this.danmakuTip.style.left = "auto";
            this.danmakuTip.style.right = -scrollX;
          } else {
            this.danmakuTip.style.left = e.pageX - this.container.getBoundingClientRect().left - 75 - scrollX + "px";
          }
          break;
        } else {
          item.classList.remove("lock");
          // this.currentLockDanmaku = null;
        }
      }
    };
    // 进入tip，取消监听mask移动
    this.danmakuTip.addEventListener("mouseover", () => {
      this.player.template.danmakuTipMask.removeEventListener("mousemove", danmakuTipMaskMove);
    });
    // 离开tip，恢复监听mask移动
    this.danmakuTip.addEventListener("mouseleave", () => {
      this.danmakuTip.classList.remove("show");
      this.currentLockDanmaku && this.currentLockDanmaku.classList.remove("lock");
      // this.currentLockDanmaku = null;
      this.player.template.danmakuTipMask.addEventListener("mousemove", danmakuTipMaskMove);
    });
    this.player.template.danmakuTipMask.addEventListener("mousemove", danmakuTipMaskMove);
    this.player.template.danmakuTipBox.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    //点赞
    this.player.template.danmakuPraise.addEventListener("click", (e) => { });
    //复制
    this.player.template.danmakuCopy.addEventListener("click", (e) => {
      navigator &&
        navigator.clipboard &&
        navigator.clipboard
          .writeText(this.lockDanmakuData.text)
          .then((res) => {
            this.player.notice("已复制");
            this.danmakuTip.classList.remove("show");
          })
          .catch((err) => {
            console.log(err);
          });
    });
    //撤销
    this.player.template.danmakuCancel.addEventListener("click", (e) => { });
    //举报
    let reportIReason;
    this.player.template.danmakuReport.addEventListener("click", (e) => {
      setTimeout(() => {
        this.currentLockDanmaku && this.currentLockDanmaku.classList.add("lock");
      }, 50);
      //显示弹框
      this.player.template.danmakuReportMask.classList.add("show");
      this.player.template.danmakuReportContent.innerHTML = this.lockDanmakuData.text;
      this.player.template.danmakuReportMask.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      //隐藏弹框
      this.player.template.danmakuReportModelClose.addEventListener("click", (e) => {
        this.currentLockDanmaku && this.currentLockDanmaku.classList.remove("lock");
        this.player.template.danmakuReportMask.classList.remove("show");
        this.player.template.danmakuReportDetail.classList.remove("show");
      });
      //举报选项
      const allReports = this.player.template.danmakuReportMask.querySelectorAll(".mfunsPlayer-switch");
      allReports.forEach((el, index) => {
        if (!this[`reportOption${index}`]) {
          this[`reportOption${index}`] = new Switch({
            el: el,
            value: false,
            onToggle: (value) => {
              if (value) {
                // 打开开关
                for (let i = 0; i < allReports.length; i++) {
                  i !== index && this[`reportOption${i}`].off(1);
                }
                if (el.children[1].innerHTML !== "其他") {
                  reportIReason = el.children[1].innerHTML;
                  this.player.template.danmakuReportDetail.classList.remove("show");
                  this.player.template.danmakuReportSubmit.classList.remove("disable");
                } else {
                  reportIReason = "";
                  this.player.template.danmakuReportDetail.classList.add("show");
                  this.player.template.danmakuReportDetail.value = "";
                }
              } else {
                // 关闭开关
                if (this.player.template.danmakuReportDetail.classList.contains("show"))
                  this.player.template.danmakuReportDetail.classList.remove("show");
                if (!this.player.template.danmakuReportSubmit.classList.contains("disable"))
                  this.player.template.danmakuReportSubmit.classList.add("disable");
              }
            },
          });
        } else {
          this[`reportOption${index}`].off();
        }
      });
      this.player.template.danmakuReportDetail.addEventListener("input", (e) => {
        this.player.template.danmakuReportSubmit.classList[e.target.value.trim() ? "remove" : "add"]("disable");
      });
    });
    //举报提交
    this.player.template.danmakuReportSubmit.addEventListener("click", () => {
      if (this.player.template.danmakuReportSubmit.classList.contains("disable")) return;
      const { author, text, origin } = this.lockDanmakuData;
      const { id } = this.options.api;
      console.log(this.lockDanmakuData);
      const reportData = {
        danId: id ?? null,
        author: author ?? null,
        text,
        reason: reportIReason || this.player.template.danmakuReportDetail.value,
      };

      if (origin === "mfuns") this.player.events.trigger("danmaku_report", reportData);
      else this.player.notice("不能跨站执法哦~");
      this.currentLockDanmaku && this.currentLockDanmaku.classList.remove("lock");
      this.player.template.danmakuReportMask.classList.remove("show");
      this.player.template.danmakuReportDetail.classList.remove("show");
    });
  }
  load() {
    const { address, danmakuAddition, id, otherDanParams, advDanApi } = JSON.parse(JSON.stringify(this.options.api));
    const apiurl = `${address}?id=${id}${otherDanParams}`;
    this.endpoints = danmakuAddition || [];
    const advDanData = [];
    id && address && this.endpoints.push({ url: apiurl, type: "dplayer-danmaku", origin: "mfuns" });
    advDanApi &&
      this.endpoints.push({
        url: `${advDanApi.address}/v1/advdanmaku?id=${advDanApi.id}`,
        type: "mfuns-advDanmaku-oldApi",
      });
    this.events && this.events.trigger("danmaku_load_start", this.endpoints);
    this.player.template.danmakuSource.classList.add("loading");
    this.loaded = false;
    this.endpoints.forEach((el) => {
      if (!el.origin) {
        switch (el.type) {
          case "bili-danmaku":
            el.origin = "bili";
            break;
          case "acfun-danmaku":
            el.origin = "acfun";
            break;
          default:
            el.origin = "unknown";
        }
      }
    });
    this._readAllEndpoints(this.endpoints, (results, loadStatus) => {
      this.player.template.danmakuSource.classList.remove("loading");
      if (!loadStatus) {
        console.log(loadStatus, results);
        this.events && this.events.trigger("danmaku_load_end", []);
        return this.options.error(results);
      } else {
        console.log(results);
        this.dan = [].concat.apply([], results).sort((a, b) => a.time - b.time);
        this.dan.forEach((d) => {
          d.id = this.createHash(8);
          if (d.type == 8) {
            advDanData.push(d.text); // 筛选高级弹幕
          }
          this.danCount[d.origin]++;
        });
        console.log(this.danCount);

        this.events && this.events.trigger("danmaku_load_end", this.dan);
        this.loaded = true;
        window.requestAnimationFrame(() => {
          this.frame();
        });
        this.options.callback(this.dan.length, advDanData);
      }
    });
  }
  //弹幕重载(所有)
  reload(newId, newAdvDanApi, newAddition, newOtherDanParams) {
    this.player.template.danmakuCount.innerHTML = `弹幕装填中...`;
    if (newId) {
      this.options.api.id = newId;
    }
    if (newOtherDanParams) {
      this.options.api.otherDanParams = newOtherDanParams;
    }
    if (newAddition) {
      this.options.api.danmakuAddition = newAddition;
    }
    if (newAdvDanApi) {
      this.options.api.advDanApi = newAdvDanApi;
    }
    ["mfuns", "bili", "acfun", "unknown"].forEach((el) => {
      const currentOrigin = this.player.template[`danmakuSource_${el}`];
      const originCount = currentOrigin.querySelector(".mfunsPlayer-video-danmaku-source-item-count");
      currentOrigin.classList.replace("success", "nodata");
      currentOrigin.classList.replace("error", "nodata");
      originCount.innerHTML = "-";
    });

    this.dan = [];
    this.danCount = {
      unknown: 0,
      mfuns: 0,
      bili: 0,
      acfun: 0,
    };
    this.danData = {
      unknown: null,
      mfuns: null,
      bili: null,
      acfun: null,
    };
    this.clear();
    this.load();
  }
  //重载某一来源的弹幕
  reloadEndPoints(origin) {
    const currentEndPoints = [];
    this.player.template.danmakuCount.innerHTML = `弹幕装填中...`;
    this.endpoints.forEach((el) => {
      if (el.origin === origin) {
        currentEndPoints.push(el);
      }
    });
    console.log(currentEndPoints);
    this.events && this.events.trigger("danmaku_load_start", this.endpoints);
    this._readAllEndpoints(currentEndPoints, (results, loadStatus) => {
      if (!loadStatus) {
        console.log(loadStatus, results);
        this.events && this.events.trigger("danmaku_load_end", []);
        this.options.error(results, true);
      } else {
        console.log(this.danData);
        const { acfun, bili, mfuns, unknown } = this.danData;
        // const
        this.dan = [...(acfun ?? []), ...(bili ?? []), ...(mfuns ?? []), ...(unknown ?? [])].sort(
          (a, b) => a.time - b.time
        );
        this.dan.forEach((d) => {
          d.id = this.createHash(8);
          if (d.type == 8) {
            advDanData.push(d.text); // 筛选高级弹幕
          }
          this.danCount[d.origin]++;
        });
        this.events && this.events.trigger("danmaku_load_end", this.dan);
        this.loaded = true;
        this.options.callback(this.dan.length, null, true);
      }
    });
  }

  /**
   * Asynchronously read danmaku from all API this.endpoints
   */
  _readAllEndpoints(endpoints, callback) {
    const allRequests = endpoints.map((link) => {
      return new Promise((resolve, reject) => {
        this.options.apiBackend.read({
          url: link.url,
          type: link.type,
          origin: link.origin,
          success: (data) => {
            this.danData[`${link.origin}`] = data;
            const currentOrigin = this.player.template[`danmakuSource_${link.origin}`];
            const originCount = currentOrigin.querySelector(".mfunsPlayer-video-danmaku-source-item-count");
            const originOperate = currentOrigin.querySelector(".mfunsPlayer-video-danmaku-source-item-operate");
            currentOrigin.classList.replace("nodata", "success");
            currentOrigin.classList.replace("error", "success");
            originCount.innerHTML = data.length;
            originOperate.onclick = () => {
              if (currentOrigin.classList.contains("forbidden")) {
                // 解除弹幕来源屏蔽
                currentOrigin.classList.replace("forbidden", "success");
                console.log(currentOrigin.classList);
                this[`${link.origin}Limit`] = false;
                this.originFilter.delete(link.origin);
                this.events &&
                  this.events.trigger("danmaku_filter", {
                    key: "origin",
                    value: [...this.originFilter],
                  });
              } else {
                // 弹幕来源屏蔽
                currentOrigin.classList.replace("success", "forbidden");
                console.log(currentOrigin.classList);
                this[`${link.origin}Limit`] = true;
                const items = this.container.querySelectorAll(".mfunsPlayer-danmaku-item");
                items.forEach((el) => {
                  if (el.dataset.origin === link.origin) {
                    el.innerHTML = "";
                  }
                });
                this.originFilter.add(link.origin);
                this.events &&
                  this.events.trigger("danmaku_filter", {
                    key: "origin",
                    value: [...this.originFilter],
                  });
              }
            };
            resolve(data);
          },
          error: (error) => {
            const currentOrigin = this.player.template[`danmakuSource_${link.origin}`];
            const originOperate = currentOrigin.querySelector(".mfunsPlayer-video-danmaku-source-item-operate");
            currentOrigin.classList.replace("nodata", "error");
            originOperate.addEventListener("click", () => {
              this.reloadEndPoints(link.origin);
            });
            reject(error);
          },
        });
      });
    });
    Promise.all([...allRequests])
      .then((res) => {
        callback(res, 1);
      })
      .catch((err) => {
        console.log(err);
        callback(err, 0, origin);
      });
  }

  send(dan) {
    const newDanmakuId = this.createHash(8);
    const danmakuData = {
      time: this.options.time() + 0.2,
      size: dan.size || 25,
      author: this.player.options.uid,
      id: newDanmakuId,
      text: dan.text,
      color: dan.color || 16777215,
      type: dan.type || "right",
    };

    const danmaku = {
      text: this.htmlEncode(danmakuData.text),
      color: danmakuData.color,
      size: danmakuData.size,
      type: danmakuData.type,
      id: newDanmakuId,
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
          +dan.size ?? 25,
        ],
        this.options.videoIndex()
      );
    this.events && this.events.trigger("danmaku_send", danmakuData);
  }
  checkShield = (dan) => {
    let type = typeof dan.type !== "string" ? utils.number2Type(dan.type) : dan.type;
    let origin = dan.origin;
    if ((this[`${type}Limit`] || this[`${origin}Limit`]) && !/(\/n)|(\\n)/i.test(dan.text)) {
      return false;
    }
    return true;
  };
  getDanmakuData(id) {
    let dan;
    for (let i = 0; i < this.dan.length; i++) {
      if (this.dan[i].id === id) {
        dan = this.dan[i];
        break;
      }
    }
    return dan;
  }
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
    // this.seek();
    if (areaType === "keepOutSubtitle") {
      this.keepOutSubtitle = true;
      this.container.style.bottom = "20%";
      return;
    } else if (areaType === "notKeepOutSubtitle") {
      this.keepOutSubtitle = false;
      this.container.style.bottom = "0";
      return;
    }
    //"1/4", "半屏", "3/4", "不重叠", "不限"
    this._limitArea = Math.min(areaType / 4, 1);
    this.shield("bottom", areaType < 4);
    this.unlimited = areaType > 4;
    this.events &&
      this.events.trigger("setDanmaku", {
        key: "limitArea",
        value: areaType,
      });
  }
  shield(type, flag = false) {
    console.log(type, flag);
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
    if (type === "special") {
    }
    let filterArr = [];
    const allType = ["top", "bottom", "left", "right", "color", "special"];
    allType.forEach((el) => {
      if (this[`${el}Limit`]) {
        filterArr.push(el);
      }
    });
    this.events &&
      this.events.trigger("setDanmaku", {
        key: "shields",
        value: filterArr,
      });
    this.events &&
      this.events.trigger("danmaku_filter", {
        key: "type",
        value: filterArr,
      });
  }
  opacity(percentage) {
    if (percentage !== undefined) {
      const items = this.container.getElementsByClassName("mfunsPlayer-danmaku-item");
      for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains("subtitle")) continue;
        items[i].style.opacity = percentage;
      }
      this._opacity = percentage;

      this.events &&
        this.events.trigger("setDanmaku", {
          key: "opacity",
          value: percentage,
        });
    }
    return this._opacity;
  }
  size(scale) {
    this._fontScale = scale;
    this.events &&
      this.events.trigger("setDanmaku", {
        key: "fontScale",
        value: Number(scale.toFixed(2)),
      });
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
    this._speedVal = speed;
    this.events &&
      this.events.trigger("setDanmaku", {
        key: "speed",
        value: speed,
      });
  }
  //弹幕绘制
  draw(dan) {
    if (this.showing) {
      const itemHeight = this.options.height * this._fontScale; // 弹幕轨道高度
      const danWidth = this.container.offsetWidth; //弹幕容器宽度
      const danHeight = this.container.offsetHeight * this._limitArea; //弹幕容器高度
      const itemY = Math.floor(danHeight / itemHeight); //轨道数量
      // console.log(itemY);
      if (this.tunnelHeights.right.length !== itemY) this.tunnelHeights.right = utils.createArray(itemY, itemHeight);
      if (this.tunnelHeights.left.length !== itemY) this.tunnelHeights.left = utils.createArray(itemY, itemHeight);
      if (this.tunnelHeights.top.length !== itemY) this.tunnelHeights.top = utils.createArray(itemY, itemHeight);
      if (this.tunnelHeights.bottom.length !== itemY) this.tunnelHeights.bottom = utils.createArray(itemY, itemHeight);
      //弹幕与弹幕容器右侧的距离(滚动弹幕)
      const danItemRight = (ele, istest) => {
        const eleWidth = ele.offsetWidth || parseInt(ele.style.width);
        const eleRight = ele.getBoundingClientRect().right || this.container.getBoundingClientRect().right + eleWidth;
        if (istest) {
          console.dir(ele.offsetWidth);
        }
        return this.container.getBoundingClientRect().right - eleRight;
      };
      //弹幕与弹幕容器左侧的距离(逆向弹幕)
      const danItemLeft = (ele) => {
        const eleWidth = ele.clientWidth || parseInt(ele.style.width);
        const eleLeft = ele.getBoundingClientRect().left || this.container.getBoundingClientRect().left + eleWidth;
        return this.container.getBoundingClientRect().left - eleLeft;
      };
      //弹幕速度
      const danSpeed = (width) =>
        ((danWidth + width) / this.player.fullScreen.isFullScreen() ? 8 : 5) * (this._speedVal ?? 1);
      const realDOMTunnel = (type, i) => {
        // if (type !== "right" && type !== "left") {
        //   return;
        // }
        return [...this.container.querySelectorAll(`.mfunsPlayer-danmaku-${type}`)].filter(
          (el) => el.dataset.tunnel === `${i}`
        );
      };
      //获取弹幕可进入的轨道
      const getTunnel = (ele, type, width) => {
        const tmp = danWidth / danSpeed(width); //弹幕自身完全进入弹幕容器所需要的时间
        for (let i = 0; this.unlimited || i < itemY; i++) {
          const DOMTunnel = realDOMTunnel(type, i);
          let item = this.danTunnel[type][i + ""]; //轨道弹幕组(单轨道内的所有弹幕)
          this.danTunnel[type][i + ""] = DOMTunnel;
          // if (fixTunnel(type, i)) {
          //   break;
          // }
          if (itemY < i) console.log("-------", i);
          if (item && item.length) {
            if (type !== "right" && type !== "left") {
              continue;
            }
            if (item.length !== DOMTunnel.length) {
              item = DOMTunnel;
            }
            // --------轨道弹幕组弹幕防碰撞检测--------//
            for (let j = 0; j < item.length; j++) {
              if (type === "right") {
                const danRight = danItemRight(item[j]) - 10;
                if (danRight <= 0) {
                  this.tunnelHeights[type][i] =
                    parseInt(this.miniMode ? 16 : item[j].style.fontSize) + this.tunnelPadding;
                  //该情况表示当前轨道有滚动弹幕未完全进入弹幕容器，禁止向该轨道装填弹幕
                  break;
                }
              }
              if (type === "left") {
                const danLeft = danItemLeft(item[j]) - 10;
                this.tunnelHeights[type][i] = parseInt(item[j].style.fontSize) + this.tunnelPadding;
                if (danLeft <= danWidth - tmp * danSpeed(parseInt(item[j].style.width)) || danLeft <= 0) {
                  //该情况表示当前轨道有逆向弹幕未完全进入弹幕容器，禁止向该轨道装填弹幕
                  break;
                }
              }
              if (j === item.length - 1) {
                //轨道弹幕组遍历完毕，组内所有弹幕均完全进入容器，可以向该轨道装填弹幕
                this.tunnelHeights[type][i] =
                  parseInt(this.miniMode ? 16 : item[j].style.fontSize) + this.tunnelPadding;

                this.danTunnel[type][i + ""].push(ele);
                ele.addEventListener("animationend", () => {
                  const index = this.danTunnel[type][i + ""]?.indexOf(ele);
                  this.danTunnel[type] !== {} && this.danTunnel[type][i + ""]?.splice(index, 1);
                });
                return i;
              }
            }
          } else {
            if (Array.isArray(this.danTunnel[type][i + ""])) {
              this.danTunnel[type][i + ""].push(ele);
            } else {
              this.danTunnel[type][i + ""] = [ele];
            }

            ele.addEventListener("animationend", () => {
              const index = this.danTunnel[type][i + ""]?.indexOf(ele);
              this.danTunnel[type] !== {} && this.danTunnel[type][i + ""]?.splice(index, 1);
            });
            return i;
          }
          // console.log("hhhhhhh", this.danIndex % itemY, type);
          // if (this.unlimited) return this.danIndex % itemY;
        }
        return -1;
      };

      if (Object.prototype.toString.call(dan) !== "[object Array]") {
        dan = [dan];
      }

      const docFragment = document.createDocumentFragment();

      for (let i = 0; i < dan.length; i++) {
        if (dan[i].type >= 7) {
          continue;
        }
        // if (typeof dan[i].type !== "string") {
        //   dan[i].type = utils.number2Type(dan[i].type);
        // }
        if (!dan[i].color) {
          dan[i].color = 16777215;
        }
        if (!dan[i].size) {
          dan[i].size = 25;
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
        if (dan[i].border) {
          item.innerHTML = `<span style="border:${dan[i].border}">${dan[i].text.replace(/(\/n)|(\\n)/g, "\n")}</span>`;
        } else {
          item.innerHTML = `<span>${dan[i].text.replace(/(\/n)|(\\n)/g, "\n")}</span>`;
        }
        if (typeof dan[i].color !== "string") {
          item.style.color = utils.number2Color(dan[i].color);
        }
        item.style.opacity = this._opacity;
        item.style.fontSize = +dan[i].size * (dan[i].isSubtitle ? 1 : this._fontScale) + "px";
        item.addEventListener("animationend", () => {
          if ([...this.container.children].indexOf(item) > -1) this.container.removeChild(item);
        });

        const itemWidth = this._measure(dan[i].text, +dan[i].size ?? 25);

        let tunnel;
        let realTunnel;
        // adjust
        switch (dan[i].type) {
          case "right":
            realTunnel = getTunnel(item, dan[i].type, itemWidth);
            tunnel = realTunnel % itemY;
            // console.log(tunnel);
            if (tunnel >= 0 || dan[i].isSubtitle) {
              const maxTop = this.tunnelHeights.right.slice(0, itemY).reduce((prev, cur) => prev + cur, 0);
              const top = this.tunnelHeights.right.slice(0, tunnel).reduce((prev, cur) => prev + cur, 0) % maxTop;
              // console.log(top, tunnel);
              if (top + parseInt(item.style.fontSize) + this.tunnelPadding > danHeight) {
                this.danTunnel[dan[i].type][i + ""]?.pop();
                return;
              }
              item.dataset.tunnel = realTunnel;
              item.dataset.origin = dan[i].origin;
              // item.classList[this.miniMode ? "add" : "remove"]("fast");
              item.style.width = itemWidth + 1 + "px";
              item.style.top = (dan[i].isSubtitle ? 0 : top) + "px";
              item.style.transform = `translateX(-${danWidth}px)`;
            }
            break;
          case "left":
            if (this.miniMode) return;
            realTunnel = getTunnel(item, dan[i].type, itemWidth);
            tunnel = realTunnel % itemY;
            if (tunnel >= 0 || dan[i].isSubtitle) {
              const maxTop = this.tunnelHeights.left.slice(0, itemY).reduce((prev, cur) => prev + cur, 0);
              const top = this.tunnelHeights.left.slice(0, tunnel).reduce((prev, cur) => prev + cur, 0) % maxTop;
              if (top + parseInt(item.style.fontSize) + this.tunnelPadding > danHeight) {
                this.danTunnel[dan[i].type][i + ""]?.pop();
                return;
              }
              item.dataset.tunnel = realTunnel;
              item.dataset.origin = dan[i].origin;
              item.style.width = itemWidth + 1 + "px";
              item.style.top = (dan[i].isSubtitle ? 0 : top) + "px";
              item.style.transform = `translateX(${danWidth}px)`;
            }
            break;
          case "top":
            if (this.miniMode) return;
            tunnel = getTunnel(item, dan[i].type) % itemY;
            if (tunnel >= 0 || dan[i].isSubtitle) {
              let topArr = [];
              const topDan = this.danTunnel.top;
              for (let key in topDan) {
                topArr.push(...topDan[key]);
              }
              const top = topArr
                .map((el) => {
                  return parseInt(el.style.fontSize) + this.tunnelPadding;
                })
                .slice(0, tunnel)
                .reduce((prev, cur) => prev + cur, 0);

              if (top + parseInt(item.style.fontSize) + this.tunnelPadding > danHeight) {
                this.danTunnel[dan[i].type][i + ""]?.pop();
                return;
              }
              item.dataset.tunnel = tunnel;
              item.dataset.origin = dan[i].origin;
              item.style.width = itemWidth + 1 + "px";
              item.style.marginLeft = `-${(itemWidth + 1) * 0.5}px`;
              item.style.top = (dan[i].isSubtitle ? 0 : top) + "px";
            }
            break;
          case "bottom":
            if (this.miniMode) return;
            tunnel = getTunnel(item, dan[i].type) % itemY;
            if (tunnel >= 0 || dan[i].isSubtitle) {
              let bottomArr = [];
              const bottomDan = this.danTunnel.bottom;
              for (let key in bottomDan) {
                bottomArr.push(...bottomDan[key]);
              }
              const bottom = bottomArr
                .map((el) => {
                  return parseInt(el.style.fontSize) + this.tunnelPadding;
                })
                .slice(0, tunnel)
                .reduce((prev, cur) => prev + cur, 0);

              if (bottom + parseInt(item.style.fontSize) + this.tunnelPadding > danHeight) {
                this.danTunnel[dan[i].type][i + ""]?.pop();
                return;
              }
              item.dataset.tunnel = tunnel;
              item.dataset.origin = dan[i].origin;
              item.style.width = itemWidth + 1 + "px";
              item.style.marginLeft = `-${(itemWidth + 1) * 0.5}px`;
              item.style.bottom = (dan[i].isSubtitle ? 0 : bottom) + "px";
            }
            break;
          default:
            console.error(`无法处理的弹幕模式: ${dan[i].type}`);
        }
        if (tunnel >= 0) {
          // move
          item.classList.add("mfunsPlayer-danmaku-move");
          item.dataset.id = dan[i].id;

          if (!!this._speed && !dan[i].isSubtitle) {
            item.classList.add(this._speed);
          }
          // insert
          this.container.appendChild(item);
          // docFragment.appendChild(item);
        }
      }

      // this.container.appendChild(docFragment);

      return docFragment;
    }
  }
  removeDanmakuCheck() {
    this.lockDanmaku && this.lockDanmaku.classList.remove("lock");
    this.player.template.danmakuTip.classList.remove("show");
    this.lockDanmaku.dataset.moved = 0;
    this.lockDanmaku.style.zIndex = "auto";
    this.container.style.cursor = "none";
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
    this.demoDanmaku.style.fontSize = (this.miniMode ? 16 : size) * this._fontScale + "px";

    let measureStyle = getComputedStyle(this.demoDanmaku, false);
    if (!this.context) {
      this.context = document.createElement("canvas").getContext("2d");
    }
    const fontSize = measureStyle.getPropertyValue("font-size");
    const fontWeight = measureStyle.getPropertyValue("font-weight");
    const fontFamily = measureStyle.getPropertyValue("font-family");
    this.context.font =
      measureStyle.getPropertyValue("font") ?? `${fontWeight}  ${fontSize} / ${fontSize} ${fontFamily}`;
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
    console.log("clear");
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
    this.events &&
      this.events.trigger("setDanmaku", {
        key: "show",
        value: false,
      });
  }

  show() {
    this.seek();
    this.showing = true;
    this.play();
    this.events && this.events.trigger("danmaku_show");
    this.events &&
      this.events.trigger("setDanmaku", {
        key: "show",
        value: true,
      });
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
  mini(flag) {
    this.miniMode = flag;
    this.options.height = flag ? 22 : 28;
  }
}

export default Danmaku;
