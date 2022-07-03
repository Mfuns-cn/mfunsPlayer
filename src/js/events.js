class Events {
  constructor() {
    this.events = {};

    this.videoEvents = [
      "abort",
      "canplay",
      "canplaythrough",
      "durationchange",
      "emptied",
      "ended",
      "error",
      "loadeddata",
      "loadedmetadata",
      "loadstart",
      "mozaudioavailable",
      "pause",
      "play",
      "playing",
      "progress",
      "ratechange",
      "seeked",
      "seeking",
      "stalled",
      "suspend",
      "timeupdate",
      "volumechange",
      "waiting",
    ];
    this.playerEvents = [
      "danmaku_show", // 显示弹幕
      "danmaku_hide", // 隐藏弹幕
      "danmaku_clear",
      "danmaku_loaded",
      "danmaku_send", // 发送弹幕
      "danmaku_report", // 举报弹幕
      "danmaku_opacity",
      "contextmenu_show", // 显示右键菜单
      "contextmenu_hide", // 隐藏右键菜单
      "notice_show",
      "notice_hide",
      "destroy",
      "resize",
      "fullscreen", // 进入全屏模式
      "fullscreen_cancel", // 退出全屏模式
      "webfullscreen", // 进入网页全屏
      "webfullscreen_cancel", // 退出网页全屏
      "widescreen", // 宽屏模式
      "widescreen_cancel", // 退出宽屏

      "danmaku_load_start", // 弹幕开始加载
      "danmaku_load_end", // 弹幕加载完毕
      "danmaku_load_failed", // 弹幕加载失败

      "darkmode_on", // 开启关灯模式
      "darkmode_off", // 关闭关灯模式
      // "fixcontroller_on",     // 开启底栏固定(未启用)
      // "fixcontroller_off",    // 取消底栏固定(未启用)
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

  trigger(name, ...args) {
    if (this.events[name] && this.events[name].length) {
      for (let i = 0; i < this.events[name].length; i++) {
        this.events[name][i](...args);
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

export default Events;
