export default class Events {
  protected events: Record<string, ((...args: any) => void)[]> = {}

  readonly playerEventList = [
    // 视频播放
    "play", // 播放
    "pause", // 暂停
    "seeking", // 进度开始跳转
    "seeked", // 进度跳转成功

    "volume_change", // 音量改变
    "rate_change", // 播放速率改变
    "loop", // 开启循环播放
    "loop_off", // 关闭循环播放

    // "time_update", // 播放时间更新
    // "progress", // 缓冲更新

    // 播放模式
    "source_change", // 视频源改变
    "part_change", // 视频分P改变
    "video_change", // 视频改变

    // 播放器模式
    "fullscreen", // 全屏模式
    "fullscreen_exit",
    "pip", // 画中画模式
    "pip_exit",
    "wide", // 宽屏模式
    "wide_exit",
    "webfull", // 网页全屏模式
    "webfull_exit",

    // 弹幕事件
    "danmaku:load_start", // 弹幕开始加载
    "danmaku:load_end", // 弹幕加载完毕
    "danmaku:load_fail", // 弹幕加载失败

    "danmaku:load_addition_start", // 附加弹幕加载完毕
    "danmaku:load_addition_end", // 附加弹幕加载完毕
    "danmaku:load_addition_fail", // 附加弹幕加载失败

    "danmaku:load_new_start", // 加载新增弹幕
    "danmaku:load_new_end", // 新增弹幕加载完毕
    "danmaku:load_new_fail", // 新增弹幕加载失败

    "danmaku:advanced_detected", // 检测到高级弹幕

    "danmaku:show", // 显示弹幕
    "danmaku:hide", // 隐藏弹幕

    "danmaku:send", // 发送弹幕
    "danmaku:send_success", // 发送弹幕成功
    "danmaku:send_fail", // 发送弹幕失败

    // "danmaku:report",     // 举报弹幕
    "danmaku:filter", // 弹幕屏蔽
    "danmaku:add", // 弹幕池新增弹幕

    // 界面事件
    "resize", // 播放器尺寸调整
    "contextmenu:show", // 显示右键菜单
    "contextmenu:hide", // 隐藏右键菜单
    "toast:show", // 显示toast提示
    "toast:hide", // 隐藏toast提示

    "darkmode", // 开启关灯模式
    "darkmode_off", // 关闭关灯模式
    "fixedcontroller", // 开启底栏固定
    "fixedcontroller_off", // 取消底栏固定

    "setting:player", // 播放器设置项更改
    "setting:danmaku", // 弹幕设置项更改
  ]

  readonly customEventList: string[] = []

  constructor() {}

  /** 添加监听 */
  on(name: string, listener: (...args: any) => void) {
    if (this.checkEventName(name) && typeof listener === "function") {
      if (!this.events[name]) {
        this.events[name] = []
      }
      this.events[name].push(listener)
    }
  }

  /** 移除监听 */
  off(name: string, listener: (...args: any) => void) {
    if (this.checkEventName(name) && typeof listener === "function") {
      if (!this.events[name]) {
        this.events[name] = []
      }
      const index = this.events[name].indexOf(listener)
      if (typeof index === "number") this.events[name].splice(index, 1)
    }
  }

  /** 触发事件 */
  trigger(name: string, ...args: any[]) {
    if (this.events[name] && this.events[name].length) {
      for (let i = 0; i < this.events[name].length; i++) {
        this.events[name][i](...args)
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
    }
    return false
  }
}
