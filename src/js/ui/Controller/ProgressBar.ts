import { html, render } from "lit-html";
import { PlayerOptions } from "@/types";
import { classPrefix } from "@/const";
import Player from "@/player";
import Controller from ".";
import { secondToTime } from "@/utils";
import Video from "@/Video";

const template = () => html`
  <div class="${classPrefix}-progress-bar">
    <div class="${classPrefix}-progress-bar-buffered"></div>
    <div class="${classPrefix}-progress-bar-played"></div>
    <div class="${classPrefix}-progress-bar-thumb-track">
      <div class="${classPrefix}-progress-bar-thumb"></div>
    </div>
    <div class="${classPrefix}-progress-bar-preview">
      <div class="${classPrefix}-progress-bar-thumbnail"></div>
      <div class="${classPrefix}-progress-bar-time"></div>
    </div>
    <div class="${classPrefix}-progress-bar-tip"></div>
  </div>
`;

/** 进度条 */
export default class ProgressBar {
  controller: Controller;
  player: Player;
  container: HTMLElement;
  el: HTMLElement;
  $buffered: HTMLElement;
  $played: HTMLElement;
  $thumbTrack: HTMLElement;
  $thumb: HTMLElement;
  $preview: HTMLElement;
  $thumbnail: HTMLElement;
  $time: HTMLElement;
  $tip: HTMLElement;
  video: Video;
  /** 轨道长度 */
  private trackLength = 0;
  /** 鼠标与轨道距离 */
  private distance = 0;
  /** 滑块可滑动距离 */
  private nMax = 0;
  /** 滑块轨道位置 */
  private nLeft = 0;
  /** 滑动距离 */
  get nLength(): number {
    const nLength = this.distance - this.thumbTrackX;
    // 限制滑块移动位置
    return nLength >= this.nMax ? this.nMax : nLength <= 0 ? 0 : nLength;
  }
  /** 滑块轨道与总轨道距离差 */
  get thumbTrackX(): number {
    return (this.trackLength - this.nMax) / 2;
  }
  /** 滑动值 */
  get nValue(): number {
    return (this.nLength / this.nMax) * this.video.duration;
  }
  private isDragging = false;
  private isHover = false;
  private isActive = false;

  constructor(controller: Controller, options: PlayerOptions) {
    this.controller = controller;
    this.player = controller.player;
    this.container = controller.$progress;
    render(template(), this.container);

    this.el = this.container.querySelector(`.${classPrefix}-progress-bar`)!;
    this.$buffered = this.el.querySelector(`.${classPrefix}-progress-bar-buffered`)!;
    this.$played = this.el.querySelector(`.${classPrefix}-progress-bar-played`)!;
    this.$thumbTrack = this.el.querySelector(`.${classPrefix}-progress-bar-thumb-track`)!;
    this.$thumb = this.el.querySelector(`.${classPrefix}-progress-bar-thumb`)!;
    this.$preview = this.el.querySelector(`.${classPrefix}-progress-bar-preview`)!;
    this.$thumbnail = this.el.querySelector(`.${classPrefix}-progress-bar-thumbnail`)!;
    this.$time = this.el.querySelector(`.${classPrefix}-progress-bar-time`)!;
    this.$tip = this.el.querySelector(`.${classPrefix}-progress-bar-tip`)!;

    this.video = this.player.video;

    // 点按进度条事件
    this.container.addEventListener("mousedown", (e: MouseEvent) => {
      const { clientX } = e;
      // 更新滑动条位置信息
      this.trackLength = this.el.offsetWidth;
      this.nMax = this.$thumbTrack.offsetWidth || this.trackLength;
      this.nLeft = this.container.getBoundingClientRect().left;
      // 获取鼠标与轨道距离
      this.distance = clientX - this.nLeft;
      this.setBarPlayed(this.nValue);
      this.el.classList.add(`${classPrefix}-progress-bar-dragging`);
      this.isDragging = true;
      document.addEventListener("mousemove", dragMoveEvent);
      document.addEventListener("mouseup", dragEndEvent);
    });

    // 滑动进度条事件
    const dragMoveEvent = (e: MouseEvent) => {
      // 鼠标X位置
      const { clientX } = e;
      // 鼠标移动时取消默认行为，避免选中其他元素或文字
      e.preventDefault();
      e.stopPropagation();
      // 获取鼠标与轨道距离
      this.distance = clientX - this.nLeft;
      this.setBarPlayed(this.nValue);
      // 更新指针显示
      this.updateTip();
      window.getSelection()?.removeAllRanges();
    };

    // 松开进度条事件
    const dragEndEvent = (e: MouseEvent) => {
      e.stopPropagation();
      window.getSelection()?.removeAllRanges();
      document.removeEventListener("mousemove", dragMoveEvent);
      document.removeEventListener("mouseup", dragEndEvent);
      this.el.classList.remove(`${classPrefix}-progress-bar-dragging`);
      this.isDragging = false;
      if (!this.isHover) this.setActive(false);
      // 跳转
      this.player.seek(this.nValue);
      this.player.play();
    };

    // 鼠标离开进度条区域
    this.container.addEventListener("mouseenter", () => {
      this.isHover = true;
      if (!this.isDragging) this.updateTip();
    });
    // 鼠标在进度条区域内移动
    this.container.addEventListener("mousemove", (e: MouseEvent) => {
      // 如果进度条处于拖动状态，则无需重复显示进度条指针
      if (this.isDragging) return;
      // 鼠标X位置
      const { clientX } = e;
      // 更新滑动条位置信息
      this.trackLength = this.el.offsetWidth;
      this.nMax = this.$thumbTrack.offsetWidth || this.trackLength;
      this.nLeft = this.container.getBoundingClientRect().left;
      // 获取鼠标与轨道距离
      this.distance = clientX - this.nLeft;
      // 更新指针显示
      this.updateTip();
    });
    // 鼠标离开进度条区域
    this.container.addEventListener("mouseleave", () => {
      this.isHover = false;
      if (!this.isDragging) this.setActive(false);
    });

    // 视频播放时间更新
    this.player.on("timeupdate", (time) => {
      if (!this.isDragging) this.setBarPlayed(time);
    });

    // 视频缓存更新
    this.player.on("progress", (time) => {
      this.setBarBuffered(time);
    });
  }

  /** 设置已播放进度条位置 */
  public setBarPlayed(time: number) {
    // 计算进度比值
    const per = time / this.video.duration || 0;
    // 修改滑块位置
    this.$thumb.style.left = `${per * 100}%`;
    // 修改滑动痕迹宽度
    this.$played.style.width = `${per * 100}%`;
  }

  /** 设置已播放进度条位置 */
  public setBarBuffered(time: number) {
    // 计算进度比值
    const per = time / this.video.duration || 0;
    // 修改滑动痕迹宽度
    this.$buffered.style.width = `${per * 100}%`;
  }

  /** 设置进度条活跃状态 */
  private setActive(flag: boolean) {
    this.isActive = flag;
    this.el.classList.toggle(`${classPrefix}-progress-bar-active`, flag);
    if (flag) {
      this.controller.setControl(true);
    } else {
      this.controller.setControl(false);
    }
  }

  /** 更新指针位置 */
  public updateTip() {
    if (!this.isActive) this.setActive(true);
    let per = this.distance / this.trackLength;
    per = per >= 1 ? 1 : per <= 0 ? 0 : per;
    this.$tip.style.left = `${per * 100}%`;
    this.$preview.style.left = `${per * 100}%`;
    this.$time.innerText = secondToTime(this.nValue);
  }
}
