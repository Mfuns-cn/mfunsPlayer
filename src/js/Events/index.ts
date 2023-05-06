export default class Events {
  protected events: {[key: string]: ((...args: any) => void)[]} = {}
  readonly playerEventList = [
    // 视频播放
    "play",           // 播放
    "pause",          // 暂停
    // "seek",           // 进度跳转
    // "volume_change",  // 音量改变
    // "rate_change",    // 播放速率改变

    // 播放模式
    "source_change",  // 视频源改变
    "part_change",    // 视频分P改变
    "video_change",   // 视频改变

    // 播放器模式
    "fullscreen",     // 全屏模式
    "fullscreen_exit",
    "pip",            // 画中画模式
    "pip_exit",
    "wide",           // 宽屏模式
    "wide_exit",
    "webfull",        // 网页全屏模式
    "webfull_exit",

    // 弹幕事件
    "danmaku_load_start", // 弹幕开始加载
    "danmaku_load_end",   // 弹幕加载完毕
    "danmaku_load_fail",  // 弹幕加载失败
    "danmaku_show",       // 显示弹幕
    "danmaku_hide",       // 隐藏弹幕
    "danmaku_send",       // 发送弹幕
    // "danmaku_report",     // 举报弹幕
    "danmaku_filter",     // 弹幕屏蔽
    "danmaku_add",        // 弹幕池新增弹幕

    // 界面事件
    "resize",           // 播放器尺寸调整
    "contextmenu_show", // 显示右键菜单
    "contextmenu_hide", // 隐藏右键菜单
    "toast_show",       // 显示toast提示
    "toast_hide",       // 隐藏toast提示
    
    "darkmode",         // 开启关灯模式
    "darkmode_off",     // 关闭关灯模式
    // "fixcontroller",        // 开启底栏固定(未启用)
    // "fixcontroller_off",    // 取消底栏固定(未启用)

    "setting",          // 设置项更改
  ];
  readonly customEventList: string[] = []
  constructor() {
  }
  /** 添加监听 */
  on(name: string, listener: (...args: any) => void) {
    if (this.checkEventName(name) && typeof listener === "function") {
      if (!this.events[name]) {
        this.events[name] = [];
      }
      this.events[name].push(listener);
    }
  }
  /** 移除监听 */
  off(name: string, listener: (...args: any) => void) {
    if (this.checkEventName(name) && typeof listener === "function") {
      if (!this.events[name]) {
        this.events[name] = [];
      }
      const index = this.events[name].indexOf(listener);
      if (typeof index === "number") this.events[name].splice(index, 1);
    }
  }
  /** 触发事件 */
  trigger(name: string, ...args: any[]) {
    if (this.events[name] && this.events[name].length) {
      for (let i = 0; i < this.events[name].length; i++) {
        this.events[name][i](...args);
      }
    }
  }
  /** 注册一个自定义事件 */
  registerCustomEvent(name: string) {
    if (this.checkEventName(name)) return
    this.customEventList.push(name)
  }
  /** 检测事件名是否有效 */
  protected checkEventName(name: string) {
    if (this.playerEventList.indexOf(name) > -1 || this.customEventList.indexOf(name) > -1) {
      return true
    } else {
      return false
    }
  }
}
