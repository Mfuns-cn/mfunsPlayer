import { DanmakuItem } from "./../types";

export interface PlayerEventsMap {
  // --- 视频事件 --- //

  // 同步视频事件
  /** 播放 */
  play: () => void;
  /** 暂停 */
  pause: () => void;
  /** 播放结束 */
  ended: () => void;
  /** 等待状态 */
  waiting: () => void;
  /** 播放状态 */
  playing: () => void;
  /** 进度开始跳转 */
  seeking: (time: number) => void;
  /** 进度跳转成功 */
  seeked: (time: number) => void;
  /** 播放时间更新 */
  timeupdate: (time: number) => void;
  /** 获取缓存 */
  progress: (time: number) => void;
  /** 视频时长改变 */
  durationchange: (time: number) => void;

  /** 音量改变 */
  volumechange: (volume: number, muted: boolean) => void;
  /** 播放速率改变 */
  ratechange: (rate: number) => void;

  // 视频播放属性
  /** 循环状态改变 */
  "change:loop": (flag: boolean) => void;
  /** 视频比例改变 */
  "change:aspectRatio": (ratio: [number, number] | null) => void;
  /** 自动播放状态改变 */
  "change:autoPlay": (ratio: [number, number] | null) => void;

  // --- 播放模式 --- //

  // 视频播放内容更改
  /** 视频更改 */
  video: () => void;
  /** 视频分P更改 */
  part: (part: number) => void;
  /** 视频源更改 */
  source: () => void;

  /** 开始更改分辨率 */
  "change:quality_start": (quality: string) => void;
  /** 完成分辨率更改 */
  "change:quality_end": (quality: string) => void;

  /** 视频开始加载 */
  "video:load_start": () => void;
  /** 视频加载完毕 */
  "video:load_end": () => void;

  // 播放器模式事件
  /** 全屏模式 */
  fullscreen: () => void;
  /** 退出全屏模式 */
  fullscreen_exit: () => void;
  /** 画中画模式 */
  pip: () => void;
  /** 退出画中画模式 */
  pip_exit: () => void;
  /** 宽屏模式 */
  wide: () => void;
  /** 退出宽屏模式 */
  wide_exit: () => void;
  /** 网页全屏模式 */
  webfull: () => void;
  /** 退出网页全屏模式 */
  webfull_exit: () => void;

  // --- 弹幕事件 --- //

  // 弹幕加载
  /** 弹幕开始加载 */
  "danmaku:load_start": () => void;
  /** 弹幕加载完毕 */
  "danmaku:load_end": (dan: DanmakuItem[]) => void;
  /** 弹幕加载失败 */
  "danmaku:load_fail": (err: any) => void;
  /** 附加弹幕开始加载 */
  "danmaku:load_addition_start": (url: string) => void;
  /** 附加弹幕加载完毕 */
  "danmaku:load_addition_end": (url: string, dan: DanmakuItem[]) => void;
  /** 附加弹幕加载失败 */
  "danmaku:load_addition_fail": (url: string, err: any) => void;
  /** 加载新增弹幕 */
  "danmaku:load_new_start": (offset: number | string) => void;
  /** 新增弹幕加载完毕 */
  "danmaku:load_new_end": (offset: number | string, dan: DanmakuItem[]) => void;
  /** 新增弹幕加载失败 */
  "danmaku:load_new_fail": (offset: number | string, err: any) => void;
  /** 获取到高级弹幕 */
  "danmaku:advanced": (mode: number, dan: DanmakuItem[]) => void;

  // 弹幕播放操作
  /** 开启弹幕 */
  "danmaku:on": () => void;
  /** 关闭弹幕 */
  "danmaku:off": () => void;
  /** 弹幕类型屏蔽 */
  "danmaku:filter": (type: string, flag: boolean) => void;

  // 弹幕操作
  /** 发送弹幕 */
  "danmaku:send": () => void;
  /** 发送弹幕成功 */
  "danmaku:send_success": () => void;
  /** 发送弹幕失败 */
  "danmaku:send_fail": () => void;
  /** 弹幕池新增弹幕 */
  "danmaku:add": () => void;
  /** 弹幕池移除弹幕 */
  "danmaku:remove": () => void;
  /** 选中指定弹幕 */
  "danmaku:select": () => void;
  /** 屏蔽用户弹幕 */
  "danmaku:block_user": (user: number | string, flag: boolean) => void;
  /** 屏蔽弹幕内容 */
  "danmaku:block_content": (content: string, flag: boolean) => void;

  // 弹幕播放属性
  /** 弹幕不透明度更改 */
  "change:danmaku_opacity": (value: number) => void;
  /** 弹幕速度更改 */
  "change:danmaku_speed": (value: number) => void;
  /** 弹幕区域更改 */
  "change:danmaku_area": (value: number) => void;
  /** 弹幕大小更改 */
  "change:danmaku_scale": (value: number) => void;
  /** 弹幕字体更改 */
  "change:danmaku_font": (value: string) => void;
  /** 弹幕粗体更改 */
  "change:danmaku_bold": (value: boolean) => void;

  // --- 界面事件 --- //

  /** 显示模态框面板 */
  "modal:show": (id: string) => void;
  /** 隐藏模态框面板 */
  "modal:hide": (id: string) => void;
  /** 显示侧边栏面板 */
  "side:show": (id: string) => void;
  /** 隐藏侧边栏面板 */
  "side:hide": (id: string) => void;
  /** 显示已挂载的侧边栏面板 */
  "side:show_mounted": (id: string) => void;
  /** 触发toast提示 */
  toast: (msg: string) => void;
  /** 播放器视频区域界面大小改变 */
  resize: (size: [number, number]) => void;

  /** 开启关灯模式 */
  darkmode: () => void;
  /** 关闭关灯模式 */
  darkmode_off: () => void;
  /** 开启底栏固定 */
  solid: () => void;
  /** 取消底栏固定 */
  solid_off: () => void;
  /** 显示播放器视频黑边 */
  "change:black_border": (flag: boolean) => void;

  // 其他事件
  "change:danmaku_list_auto_scroll": (flag: boolean) => void;

  /** 用户操作设置项更改 */
  setting: <T extends keyof PlayerSettingsMap>(
    key: T,
    value: PlayerSettingsMap[T],
    save?: boolean
  ) => void;
}

/** 播放器设置值表 */
interface PlayerSettingsMap {
  /** 音量 */
  volume: string;
  /** 循环播放 */
  loop: boolean;
  /** 视频比例 */
  ratio: [number, number] | null;

  /** 视频黑边 */
  blackBorder: boolean;
}

/** 弹幕设置值表 */
interface DanmakuSettingsMap {
  /** 类型屏蔽 */
  filter: string[];
  /** 弹幕不透明度 */
  opacity: number;
  /** 弹幕速度 */
  speed: number;
  /** 弹幕显示区域 */
  area: number;
  /** 弹幕大小 */
  scale: number;
  /** 弹幕字体 */
  font: string;
  /** 字体加粗 */
  bold: boolean;
}
