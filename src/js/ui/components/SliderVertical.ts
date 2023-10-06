import { html, render } from "lit-html";
import { classPrefix } from "@/const";

const template = () => html`
  <div
    class="${classPrefix}-slider ${classPrefix}-slider-vertical"
    style="position: relative; width: 100%; height: 100%"
  >
    <div
      class="${classPrefix}-slider-track"
      style="
        position: absolute;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center
      "
    >
      <div
        class="${classPrefix}-slider-bar"
        style="position: absolute; bottom: 0; width: 100%"
      ></div>
      <div class="${classPrefix}-slider-thumb-track" style="width: 0px">
        <div
          class="${classPrefix}-slider-thumb"
          style="position: absolute; transform: translate(-50%, -50%)"
        ></div>
      </div>
    </div>
  </div>
`;

interface SliderVerticalOptions {
  /** 挂载容器 */
  container: HTMLElement;
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
  /** 步长(若不填或为0，则没有步长限制) */
  step?: number;
  /** 默认值(不填的情况下默认值为0) */
  value?: number;
  /** 数值更改时触发 */
  onChange?: (value: number) => void;
  /** 拖动引发数值更改时触发 */
  onDrag?: (value: number) => void;
  /** 开始拖动时触发 */
  onDragStart?: (value: number) => void;
  /** 结束拖动时触发 */
  onDragEnd?: (value: number) => void;
}

/** 横向滑动条 */
export class SliderVertical implements SliderVerticalOptions {
  readonly container: HTMLElement;
  readonly min: number;
  readonly max: number;
  /** 步长 */
  readonly step: number;
  /** 数值 */
  value: number;
  onChange?: (value: number) => void;
  onDragStart?: (value: number) => void;
  onDragEnd?: (value: number) => void;
  onDrag?: (value: number) => void;
  // 部件
  el: HTMLElement;
  $track: HTMLElement;
  $bar: HTMLElement;
  $thumbTrack: HTMLElement;
  $thumb: HTMLElement;

  constructor({
    container,
    min,
    max,
    step,
    value = 0,
    onChange,
    onDragStart,
    onDragEnd,
    onDrag,
  }: SliderVerticalOptions) {
    this.container = container;
    this.min = min;
    this.max = max;
    this.step = step || 0;
    this.value = isNaN(value) ? value : Number(value);
    this.onChange = onChange;
    this.onDragStart = onDragStart;
    this.onDragEnd = onDragEnd;
    this.onDrag = onDrag;

    render(template(), container);

    this.el = this.container.querySelector(`.${classPrefix}-slider`)!;
    this.$track = this.el.querySelector(`.${classPrefix}-slider-track`)!; // 滑动条轨道
    this.$bar = this.$track.querySelector(`.${classPrefix}-slider-bar`)!; // 滑动条痕迹
    this.$thumbTrack = this.$track.querySelector(`.${classPrefix}-slider-thumb-track`)!; // 滑块轨道
    this.$thumb = this.$track.querySelector(`.${classPrefix}-slider-thumb`)!; // 滑块

    // 滑动条事件
    // 点击鼠标事件
    this.el.addEventListener("mousedown", (event: MouseEvent) => {
      const e: MouseEvent = event;
      // 鼠标Y位置
      const { clientY } = e;
      // 滑块长度
      const trackLength = this.$track.offsetHeight;
      // 滑块可滑动距离
      let nMax = this.$thumbTrack.offsetHeight;
      nMax = nMax || trackLength;
      // 滑块轨道与总轨道距离差
      const thumbTrackY = (trackLength - nMax) / 2;
      // 滑动条位置
      const nTop = this.el.getBoundingClientRect().top;
      // 计算滑块位置
      let nLength = nMax - (clientY - nTop - thumbTrackY);
      // 限制滑块移动位置
      nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;
      const value = this.step
        ? Math.round(((nLength / nMax) * (this.max - this.min)) / this.step) * this.step + this.min
        : (nLength / nMax) * (this.max - this.min) + this.min;
      // 开始滑动事件
      this.onDragStart?.(value);
      // 监测数据更新并执行函数
      if (this.value != value) {
        this.drag(value);
      }

      const mousemoveEvent = (event: MouseEvent) => {
        const e: MouseEvent = event;
        // 鼠标X位置
        const { clientY } = e;
        // 鼠标移动时取消默认行为，避免选中其他元素或文字
        e.preventDefault();
        e.stopPropagation();
        // 获取鼠标移动后滑块应该移动到的位置
        let nLength = nMax - (clientY - nTop - thumbTrackY);
        // 限制滑块移动位置
        nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;

        const value = this.step
          ? Math.round(((nLength / nMax) * (this.max - this.min)) / this.step) * this.step +
            this.min
          : (nLength / nMax) * (this.max - this.min) + this.min;
        // 监测数据更新并执行函数
        if (this.value != value) {
          this.drag(value);
        }
        window.getSelection()?.removeAllRanges();
      };
      const removeEvent = (event: MouseEvent) => {
        const e: MouseEvent = event;
        e.stopPropagation();
        window.getSelection()?.removeAllRanges();
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
  setValue(value: number) {
    // this.value = value <= this.min ? this.min : value >= this.max ? this.max : value;
    this.value = Math.max(Math.min(value, this.max), this.min);
    // 计算滑块位置
    const per = (this.value - this.min) / (this.max - this.min);
    // 修改滑块位置
    this.$thumb.style.top = `${(1 - per) * 100}%`;
    // 修改滑动痕迹高度
    this.$bar.style.height = `${Math.max(Math.min(per, 1), 0) * 100}%`;
    // 执行相应函数
    this.onChange?.(value);
  }

  /** 拖动滑动条到特定的值 */
  private drag(value: number) {
    this.setValue(value);
    // 触发拖动事件
    this.onDrag?.(this.value);
  }
}
