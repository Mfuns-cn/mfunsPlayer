import { createArray, nameMap } from '@/utils';
import { classPrefix } from '@/const';
import { html, render } from "lit-html";
const template = ({divider}: {divider: number}) => html`
<div class="${classPrefix}-slider ${classPrefix}-slider-horizontal" style="position: relative; width: 100%; height: 100%">
  <div
    class="${classPrefix}-slider-track"
    style="
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <div class="${classPrefix}-slider-bar" style="position: absolute; left: 0; height: 100%"></div>
    <div class="${classPrefix}-slider-thumb-track" style="height: 0px">
      <div class="${classPrefix}-slider-thumb" style="position: absolute; transform: translate(-50%, -50%)"></div>
      ${divider ? html`
        <ul class="${classPrefix}-slider-divider">
          ${createArray(divider, html`<li class="${classPrefix}-slider-divider-dot"></li>`)}
        </ul>
      ` : ''}
    </div>
  </div> 
</div>`;

interface SliderOptions {
  /** 挂载容器 */
  container: HTMLElement
  /** 最小值 */
  min: number
  /** 最大值 */
  max: number
  /** 步长(若不填或为0，则没有步长限制) */
  step?: number
  /** 分割线 */
  divider?: number | boolean
  /** 默认值(不填的情况下默认值为0) */
  value?: number
  /** 数值更改时触发 */
  onChange?: (value: number) => void
  /** 拖动引发数值更改时触发 */
  onDrag?: (value: number) => void
  /** 开始拖动时触发 */
  onDragStart?: (value: number) => void
  /** 结束拖动时触发 */
  onDragEnd?: (value: number) => void
}

/** 横向滑动条 */
export class Slider implements SliderOptions {
  readonly container: HTMLElement;
  readonly min: number;
  readonly max: number;
  /** 步长 */
  readonly step: number;
  /** 分割线 */
  readonly divider: number;
  /** 数值 */
  value: number;
  onChange?: (value: number) => void;
  onDragStart?: (value: number) => void;
  onDragEnd?: (value: number) => void;
  onDrag?: (value: number) => void;
  // 部件
  el: HTMLElement
  $track: HTMLElement
  $bar: HTMLElement
  $thumbTrack: HTMLElement
  $thumb: HTMLElement
  constructor({
    container,
    min,
    max,
    step,
    divider = 0,
    value = 0,
    onChange,
    onDragStart,
    onDragEnd,
    onDrag,
  }: SliderOptions) {
    this.container = container;
    this.min = min;
    this.max = max;
    this.step = step || 0;
    this.divider = divider ? typeof divider == "boolean" ? this.step : divider : 0
    this.value = isNaN(value) ? value : Number(value);
    this.onChange = onChange;
    this.onDragStart = onDragStart;
    this.onDragEnd = onDragEnd;
    this.onDrag = onDrag;

    render(template({divider: this.divider}), container)

    this.el = this.container.querySelector(`.${classPrefix}-slider`)!;
    this.$track = this.el.querySelector(`.${classPrefix}-slider-track`)!; // 滑动条轨道
    this.$bar = this.$track.querySelector(`.${classPrefix}-slider-bar`)!; // 滑动条痕迹
    this.$thumbTrack = this.$track.querySelector(`.${classPrefix}-slider-thumb-track`)!; // 滑块轨道
    this.$thumb = this.$track.querySelector(`.${classPrefix}-slider-thumb`)!; // 滑块

    // 滑动条事件
    this.el.addEventListener("mousedown", (event: MouseEvent) => {
      const e: MouseEvent = event;
      // 鼠标X位置
      let clientX = e.clientX;
      // 滑块长度
      let trackLength = this.$track.offsetWidth;
      // 滑块可滑动距离
      let nMax = this.$thumbTrack.offsetWidth;
      nMax = nMax ? nMax : trackLength;
      // 滑块轨道与总轨道距离差
      let thumbTrackX = (trackLength - nMax) / 2;
      // 滑动条位置
      let nLeft = this.el.getBoundingClientRect().left;
      // 计算滑块位置
      let nLength = clientX - nLeft - thumbTrackX;
      // 限制滑块移动位置
      nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;
      let value = this.step
        ? Math.round(((nLength / nMax) * (this.max - this.min)) / this.step) *
            this.step +
          this.min
        : (nLength / nMax) * (this.max - this.min) + this.min;
      // 开始滑动事件
      this.onDragStart?.(value);
      // 监测数据更新并执行函数
      if (this.value != value) {
        this.drag(value);
      }

      let mousemoveEvent = (event: MouseEvent) => {
        const e: MouseEvent = event;
        // 鼠标X位置
        let clientX = e.clientX
        // 鼠标移动时取消默认行为，避免选中其他元素或文字
        e.preventDefault();
        e.stopPropagation();
        // 获取鼠标移动后滑块应该移动到的位置
        let nLength = clientX - nLeft - thumbTrackX;
        // 限制滑块移动位置
        nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;

        let value = this.step
          ? Math.round(((nLength / nMax) * (this.max - this.min)) / this.step) *
              this.step +
            this.min
          : (nLength / nMax) * (this.max - this.min) + this.min;
        // 监测数据更新并执行函数
        if (this.value != value) {
          this.drag(value);
        }
        window.getSelection()?.removeAllRanges()
      };

      let removeEvent = (event: MouseEvent) => {
        const e: MouseEvent = event;
        e.stopPropagation();
        window.getSelection()?.removeAllRanges()
        document.removeEventListener("mousemove", mousemoveEvent);
        document.removeEventListener("mouseup", removeEvent);
        this.onDragEnd?.(value);
      };

      document.addEventListener("mousemove", mousemoveEvent);
      document.addEventListener("mouseup", removeEvent);
    });

    // 设置滑块初始位置
    this.setValue(this.value);
  }
  /** 设置滑动条值 */
  public setValue(value: number) {
    this.value =
      value <= this.min ? this.min : value >= this.max ? this.max : value;
    // 计算滑块位置
    let per = (this.value - this.min) / (this.max - this.min);
    // 修改滑块位置
    this.$thumb.style.left = per * 100 + "%";
    // 修改滑动痕迹高度
    this.$bar.style.width = per * 100 + "%";
    // 触发数据更改事件
    this.onChange?.(this.value);
  }
  /** 拖动滑动条到特定的值 */
  public drag(value: number) {
    this.setValue(value);
    // 触发拖动事件
    this.onDrag?.(this.value);
  }
}
