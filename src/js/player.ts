import { LoadInfo, PluginExports, VideoInfo } from "./types";
import { PluginManager } from "./pluginManager";
import Events from "@/events";
import { PlayerOptions } from "@/types";
import Video from "@/Video";
import Sizing from "@/sizing";
import State from "@/state";
import { PlayerEventMap, PlayerPropertyMap } from "./types/PlayerEventMap";
import { createElement } from "./utils";
import { classPrefix } from "./config";
import Hooks from "./hooks";
/**
 * @event
 */
export class Player {
  static readonly version = MFUNSPLAYER_VERSION;
  static readonly gitHash = GIT_HASH;
  /** 容器 */
  readonly container: HTMLElement;
  /** 播放器元素 */
  readonly $el: HTMLDivElement;
  /** 播放器主要区域 */
  readonly $main: HTMLDivElement;
  /** 播放器视频区域 */
  readonly $area: HTMLDivElement;
  /** 播放器视频容器 */
  readonly $content: HTMLDivElement;
  /** 播放器尺寸模块 */
  protected sizing: Sizing;
  /** 状态控制模块 */
  protected state: State;
  /** 插件管理 */
  protected pluginManager: PluginManager;
  /** 视频模块 */
  protected video: Video;
  /** 事件模块 */
  protected event = new Events();
  /** hook */
  hook = new Hooks();
  /** 插件 */
  plugin: PluginExports = {};
  /** 视频信息 */
  videoInfo: VideoInfo = {};

  constructor(options: PlayerOptions) {
    this.container = options.container;

    this.$el = createElement("div", { class: classPrefix });
    this.$main = this.$el.appendChild(createElement("div", { class: `${classPrefix}-main` }));
    this.$area = this.$main.appendChild(createElement("div", { class: `${classPrefix}-area` }));
    this.$content = this.$area.appendChild(
      createElement("div", { class: `${classPrefix}-content` })
    );

    this.pluginManager = new PluginManager(this);
    this.video = new Video(this, options);

    this.sizing = new Sizing(this, options);
    this.state = new State(this, options);

    // 注册列表中的插件
    this.pluginManager.pluginsRegister(options);

    // 列表中插件注册完毕
    this.pluginManager.pluginsReady(options);

    // 播放器挂载
    this.container.appendChild(this.$el);
    this.pluginManager.playerMounted(options);

    this.setVideo(options.video, options.autoPlay, options.time);
  }

  get $video(): HTMLVideoElement {
    return this.video.$video;
  }

  // --- 播放相关 --- //

  /** 加载视频 */
  public setVideo(info: VideoInfo, play?: boolean, time?: number) {
    this.videoInfo = info;
    this.hook.call("setVideo", info).then((res) => {
      if (res) {
        this.emit("video_change", info);
        if (info.url) {
          this.loadVideo({ url: info.url, type: info.type, play, time });
        } else {
          throw "缺少视频播放信息";
        }
      }
    });
  }

  /** 加载视频 */
  public loadVideo(info: LoadInfo) {
    this.videoInfo.url = info.url;
    this.videoInfo.type = info.type;
    this.hook.call("loadVideo", info).then((res) => {
      if (res) {
        this.video.load(info);
      }
    });
  }

  /** 切换视频 */
  public switchVideo(info: LoadInfo) {
    this.videoInfo.url = info.url;
    this.videoInfo.type = info.type;
    this.hook.call("switchVideo", info).then((res) => {
      if (res) {
        this.video.load({ time: this.time, play: !this.paused, ...info });
      }
    });
  }

  /** 开始播放 */
  public play() {
    this.hook.call("play").then((res) => {
      if (res) this.video.play();
    });
  }

  /** 暂停播放 */
  public pause() {
    this.hook.call("pause").then((res) => {
      if (res) this.video.pause();
    });
  }

  /** 切换播放/暂停状态 */
  public toggle() {
    if (this.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  /** 切换上一个 */
  public prev() {
    this.hook.call("prev");
  }

  /** 切换下一个 */
  public next() {
    this.hook.call("next");
  }

  /** 当前播放器暂停状态 */
  get paused() {
    return this.video.paused;
  }

  /** 跳转
   * @param time 跳转时间点（秒）
   */
  public seek(time: number) {
    this.hook.call("seek").then((res) => {
      if (res) this.video.seek(time);
    });
  }

  /** 设置音量
   * @param volume 音量（0-1）
   */
  public setVolume(volume: number) {
    this.video.setVolume(volume);
  }

  /**
   * 静音
   */
  public mute() {
    this.video.setMute(true);
  }

  /**
   * 取消静音
   */
  public unmute() {
    this.video.setMute(false);
  }

  /** 设置倍速 */
  public setPlaybackRate(value: number) {
    this.video.setPlaybackRate(value);
  }

  /** 设置视频循环 */
  public setLoop(flag: boolean) {
    this.video.setLoop(flag);
  }
  /** 设置视频循环 */
  public setRatio(value: [number, number] | null) {
    this.video.setRatio(value);
  }

  /** 当前播放时间 */
  public get time() {
    return this.video.currentTime;
  }

  /** 当前播放总时间 */
  public get duration() {
    return this.video.duration;
  }

  /** 当前播放音量 */
  public get volume() {
    return this.video.volume;
  }

  /** 当前静音状态 */
  public get muted() {
    return this.video.muted;
  }

  /** 当前静音状态 */
  public get loop() {
    return this.video.loop;
  }

  /** 当前播放速度 */
  public get playbackRate() {
    return this.video.playbackRate;
  }

  // --- 尺寸模式相关 ---//

  /** 播放器进入全屏 */
  public enterFullscreen() {
    this.sizing.fullscreen.enter();
  }

  /** 播放器退出全屏 */
  public exitFullscreen() {
    this.sizing.fullscreen.exit();
  }

  /** 当前播放器是否处于全屏模式 */
  get isFullscreen() {
    return this.sizing.fullscreen.status;
  }

  /** 播放器进入网页全屏 */
  public enterWebfull() {
    this.sizing.webfull.enter();
  }

  /** 播放器退出网页全屏 */
  public exitWebfull() {
    this.sizing.webfull.exit();
  }

  /** 当前播放器是否处于网页全屏模式 */
  get isWebfull() {
    return this.sizing.webfull.status;
  }

  /** 播放器进入画中画模式 */
  public enterPip() {
    this.sizing.pip.enter();
  }

  /** 播放器退出画中画模式 */
  public exitPip() {
    this.sizing.pip.exit();
  }

  /** 当前播放器是否处于画中画模式 */
  get isPip() {
    return this.sizing.pip.status;
  }

  // --- 播放器状态控制 --- //

  /** 播放器进入聚焦状态 */
  public focus() {
    this.state.focus();
  }
  /** 播放器取消聚焦状态 */
  public blur() {
    this.state.blur();
  }
  /** 当前播放器聚焦状态 */
  get focused() {
    return this.state.focused;
  }
  /** 播放器进入活跃状态 */
  public setActive() {
    this.state.setActive();
  }
  /** 播放器取消活跃状态 */
  public removeActive() {
    this.state.removeActive();
  }

  /** 当前播放器活跃状态 */
  get active() {
    return this.state.active;
  }
  /** 播放器进入控制状态 */
  set controlled(val: boolean) {
    this.state.controlled = val;
  }
  /** 播放器取消控制状态 */
  get controlled() {
    return this.state.controlled;
  }

  // --- 事件 --- //

  /** 绑定新的视频元素 */
  public bindVideo(el: HTMLVideoElement) {
    this.video.$video = el;
    this.video.detachEvent();
    this.video.attachEvent(el);
  }

  /** 监听事件 */
  public on<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    this.event.on(name, listener);
  }

  /** 取消监听事件 */
  public off<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    this.event.off(name, listener);
  }

  /** 一次性监听事件 */
  public once<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    this.event.once(name, listener);
  }

  /** 发送事件 */
  public emit<T extends keyof PlayerEventMap>(name: T, ...args: Parameters<PlayerEventMap[T]>) {
    this.event.emit(name, ...args);
  }

  /** 发送属性变化 */
  public emitChange<T extends keyof PlayerPropertyMap>(name: T, value: PlayerPropertyMap[T]) {
    this.event.emit("change", name, value);
    this.event.emit(`change:${name}` as any, value);
  }

  /** 监听属性变化 */
  public watch<T extends keyof PlayerPropertyMap>(
    name: T,
    listener: (value: PlayerPropertyMap[T]) => any
  ) {
    this.event.on(`change:${name}` as any, listener);
  }

  /** 取消监听属性变化 */
  public unwatch<T extends keyof PlayerPropertyMap>(
    name: T,
    listener: (value: PlayerPropertyMap[T]) => any
  ) {
    this.event.off(`change:${name}` as any, listener);
  }

  /** 播放器销毁 */
  public destroy() {
    // 所有插件执行destroy函数
    this.pluginManager.destroy();
  }
}

export default Player;
