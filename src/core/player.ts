import {
  LoadInfo,
  MediaController,
  PlayerPlugins,
  PlayerPropertyDescriptor,
  VideoInfo,
} from "./types";
import { PlayerOptions } from "@/types";
import { PlayerEventMap } from "./types/PlayerEventMap";
import { clamp, createElement } from "./utils";
import { classPrefix } from "./config";
import VideoController from "./module/videoController";
import PluginManager from "./module/pluginManager";
import HookManager from "./module/hookManager";
import ControlsManager from "./module/controlsManager";
import PanelManager from "./module/panelManager";
import MenuManager from "./module/menuManager";
import LoaderManager from "./module/loaderManager";
import EventEmitter from "./module/eventEmitter";
import * as Util from "@/utils";
import * as Component from "@/components";

/**
 * @event
 */
export class Player {
  static readonly version = __MFUNSPLAYER_VERSION__;
  static readonly gitHash = __GIT_HASH__;
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
  /** hook */
  readonly hook = new HookManager();
  /** 控制组件 */
  readonly controls: ControlsManager;
  /** 面板 */
  readonly panel: PanelManager;
  /** 菜单项 */
  readonly menu: MenuManager;
  /** 媒体加载器 */
  readonly loader: LoaderManager;
  /** 插件 */
  readonly plugin: PlayerPlugins = {};
  /** 视频控制 */
  protected _videoController: VideoController;
  /** 插件管理 */
  protected _pluginManager: PluginManager;
  /** 事件机制 */
  protected _eventEmitter = new EventEmitter();
  /** Player类 */
  readonly Player = Player;

  constructor(options: PlayerOptions) {
    this.container = options.container;

    this.$el = createElement("div", { class: `${classPrefix} mpui` });
    this.$main = this.$el.appendChild(createElement("div", { class: `${classPrefix}-main` }));
    this.$area = this.$main.appendChild(createElement("div", { class: `${classPrefix}-area` }));
    this.$content = this.$area.appendChild(
      createElement("div", { class: `${classPrefix}-content` })
    );

    this._pluginManager = new PluginManager(this);
    this._videoController = new VideoController(this, options);
    this.loader = new LoaderManager(this);
    this.controls = new ControlsManager(this);
    this.panel = new PanelManager(this);
    this.menu = new MenuManager(this);

    this.init(options);
  }

  /** 初始化播放器 */
  private async init(options: PlayerOptions) {
    // 状态事件
    this.on("videoChange", () => {
      this.$el.classList.add("is-start");
    });
    this.$el.classList.add("is-paused");
    this.on("play", () => {
      this.$el.classList.remove("is-start");
      this.$el.classList.remove("is-paused");
    });
    this.on("pause", () => {
      this.$el.classList.add("is-paused");
    });
    this.on("waiting", () => {
      this.$el.classList.add("is-loading");
    });
    this.on("playing", () => {
      this.$el.classList.remove("is-loading");
    });

    // 注册列表中的插件
    this._pluginManager.pluginsRegister(options);

    // 播放器挂载
    this.container.appendChild(this.$el);
    this._pluginManager.playerMounted();

    this.emit("mounted");

    // 装载视频
    this._videoController.set(options.video, options.autoPlay, options.time);
  }

  /** 播放器视频元素 */
  get $video(): HTMLVideoElement {
    return this._videoController.$el;
  }

  /** 获取视频信息 */
  getVideoInfo() {
    return this._videoController.getVideoInfo();
  }

  /** 获取媒体信息 */
  getMediaInfo() {
    return this._videoController.getMediaInfo();
  }

  /** 获取播放器的媒体元素 */
  getMediaElement(): HTMLVideoElement {
    return this._videoController.$el;
  }

  /** 绑定媒体元素 */
  attachMediaElement(el: HTMLVideoElement) {
    this._videoController.bind(el);
  }

  /** 获取媒体控制实例 */
  getMediaController(): MediaController | null {
    return this._videoController.mediaController;
  }

  /** 绑定媒体控制实例 */
  attachMediaController(controller: MediaController) {
    this._videoController.mediaController = controller;
    this._videoController.bind(controller.mediaElement);
  }

  /** 设置视频内容 */
  setVideo(info: VideoInfo, play?: boolean, time?: number) {
    return this._videoController.set(info, play, time);
  }

  /** 加载视频源 */
  loadVideo(info: LoadInfo) {
    return this._videoController.load(info);
  }

  // --- 播放切换控制 --- //

  /** 切换上一个 */
  public prev() {
    this.hook.call("prev");
  }

  /** 切换下一个 */
  public next() {
    this.hook.call("next");
  }

  // --- 视频播放控制 --- //

  /** 当前播放器暂停状态 */
  get paused() {
    return this.$video.paused;
  }

  /** 当前播放时间 */
  public get currentTime() {
    return this.$video.currentTime;
  }

  /** 当前播放总时间 */
  public get duration() {
    return this.$video.duration;
  }

  /** 当前播放音量 */
  public get volume() {
    return this.$video.volume;
  }

  /** 当前静音状态 */
  public get muted() {
    return this.$video.muted;
  }

  /** 当前播放速度 */
  public get playbackRate() {
    return this.$video.playbackRate;
  }

  /** 当前视频循环 */
  public get loop() {
    return this.$video.loop;
  }

  /** 开始播放 */
  public play() {
    this.hook.call("play").then((res) => {
      if (res) this.$video.play();
    });
  }

  /** 暂停播放 */
  public pause() {
    this.hook.call("pause").then((res) => {
      if (res) this.$video.pause();
    });
  }

  /** 跳转
   * @param time 跳转时间点（秒）
   */
  public seek(time: number) {
    this.hook.call("seek").then((res) => {
      if (res) {
        this.$video.currentTime = clamp(time, 0, this.$video.duration);
      }
    });
  }

  /** 设置音量
   * @param volume 音量（0-1）
   */
  public setVolume(volume: number) {
    this.$video.volume = clamp(volume, 0, 1);
  }

  /** 静音 */
  public setMuted(flag: boolean) {
    this.$video.muted = flag;
  }

  /** 设置倍速 */
  public setPlaybackRate(value: number) {
    this.$video.playbackRate = value;
  }

  /** 设置视频循环 */
  public setLoop(flag: boolean) {
    this.$video.loop = flag;
    this.emit("loopChange", flag);
  }

  // --- 事件 --- //

  /** 监听事件 */
  public on<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    this._eventEmitter.on(name, listener);
  }

  /** 取消监听事件 */
  public off<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    this._eventEmitter.off(name, listener);
  }

  /** 一次性监听事件 */
  public once<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    this._eventEmitter.once(name, listener);
  }

  /** 发送事件 */
  public emit<T extends keyof PlayerEventMap>(name: T, ...args: Parameters<PlayerEventMap[T]>) {
    this._eventEmitter.emit(name, ...args);
  }

  /** 定义属性或方法 */
  public define<T extends keyof Player>(
    name: Player[T] extends Function | undefined ? T : never,
    item: Function
  ): void;
  public define<T extends keyof Player>(name: T, item: PlayerPropertyDescriptor<Player[T]>): void;
  public define(name: string, item: Function | PropertyDescriptor) {
    Object.defineProperty(this, name, typeof item == "function" ? { value: item } : item);
  }

  /** 抛出错误 */
  public throw(err: Error) {
    console.error(err);
    this.emit("error", err);
  }

  /** 播放器销毁 */
  public destroy() {
    // 所有插件执行destroy函数
    this._pluginManager.destroy();
  }
}

export default Player;
