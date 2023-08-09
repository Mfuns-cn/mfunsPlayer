import utils from "../utils.js";

// 滑动条

export class Slider {
  /**
   * 横向滑动条
   * @param {Object} attr
   * @param {HTMLElement} attr.el 需要绑定的dom对象
   * @param {number} attr.min 最小值
   * @param {number} attr.max 最大值
   * @param {number} attr.step 步长(若不填或为0，则没有步长限制)
   * @param {number} attr.value 默认值(不填的情况下默认值为0)
   * @param {Function} attr.onChange 数值更改时触发
   * @param {Function} attr.onDrag 拖动引发数值更改时触发
   * @param {Function} attr.onDragStart 开始拖动时触发
   * @param {Function} attr.onDragEnd 结束拖动时触发
   */
  constructor({el, min, max, step, value = 0, onChange, onDragStart, onDragEnd, onDrag}) {
    this.el = el;
    this.min = Number(min); // 最小值
    this.max = Number(max); // 最大值
    this.step = Number(step); // 步长
    this.value = Number(value) == NaN ? value : Number(value); // 数值
    this.onChange = onChange
    this.onDragStart = onDragStart
    this.onDragEnd = onDragEnd
    this.onDrag = onDrag

    this.track = this.el.querySelector(".slider-track"); // 滑动条轨道
    this.bar = this.track.querySelector(".slider-bar"); // 滑动条痕迹
    this.thumbTrack = this.track.querySelector(".slider-thumb-track"); // 滑块轨道
    this.thumb = this.track.querySelector(".slider-thumb"); // 滑块

    // 滑动条事件
    this.el.addEventListener(utils.nameMap.dragStart, (event) => {
      const e = event || window.event;
      // 滑块长度
      let trackLength = this.track.offsetWidth;
      // 滑块可滑动距离
      let nMax = this.thumbTrack.offsetWidth;
      nMax = nMax ? nMax : trackLength;
      // 滑块轨道与总轨道距离差
      let thumbTrackX = (trackLength - nMax) / 2;
      // 鼠标X位置
      let clientX = e.clientX || e.changedTouches[0].clientX;
      // 滑动条位置
      let nLeft = this.el.getBoundingClientRect().left;
      // 计算滑块位置
      let nLength = clientX - nLeft - thumbTrackX;
      // 限制滑块移动位置
      nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;
      let value = this.step
        ? Math.round(((nLength / nMax) * (this.max - this.min)) / this.step) * this.step + this.min
        : (nLength / nMax) * (this.max - this.min) + this.min;
      this.onDragStart?.(value);
      // 监测数据更新并执行函数
      if (this.value != value) {
        this.drag(value);
      }

      let mousemoveEvent = (event) => {
        const e = event || window.event;
        // 鼠标移动时取消默认行为，避免选中其他元素或文字
        e.preventDefault();
        e.stopPropagation();
        // 鼠标X位置
        let clientX = e.clientX || e.changedTouches[0].clientX;
        // 获取鼠标移动后滑块应该移动到的位置
        let nLength = clientX - nLeft - thumbTrackX;
        // 限制滑块移动位置
        nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;

        let value = this.step
          ? Math.round(((nLength / nMax) * (this.max - this.min)) / this.step) * this.step + this.min
          : (nLength / nMax) * (this.max - this.min) + this.min;
        // 监测数据更新并执行函数
        if (this.value != value) {
          this.drag(value);
        }
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
      };

      let removeEvent = (event) => {
        const e = event || window.event;
        e.stopPropagation();
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        document.removeEventListener(utils.nameMap.dragMove, mousemoveEvent);
        document.removeEventListener(utils.nameMap.dragEnd, removeEvent);
        this.onDragEnd?.(value);
      };

      document.addEventListener(utils.nameMap.dragMove, mousemoveEvent);
      document.addEventListener(utils.nameMap.dragEnd, removeEvent);
    });

    // 根据数值设置滑块初始位置
    setTimeout(() => {
      this.setValue(this.value);
    }, 0);
  }
  /** 设置滑动条值 */
  setValue(value) {
    this.value = value <= this.min ? this.min : value >= this.max ? this.max : value;
    // 计算滑块位置
    // let per = (this.value - this.min) / (this.max - this.min);
    let per = (this.value - (this.min + 2)) / (this.max - this.min - 4);
    // 修改滑块位置
    this.thumb.style.left = per * 100 + "%";
    // 修改滑动痕迹高度
    this.bar.style.width = Math.max(Math.min(per, 1), 0.01) * 100 + "%";
    // 触发数据更改事件
    this.onChange?.(this.value);
  }
  /** 拖动滑动条到特定的值 */
  drag(value) {
    this.setValue(value)
    // 触发拖动事件
    this.onDrag?.(this.value)
  }
}

export class SliderVertical {
  /**
   * 横向滑动条
   * @param {Object} attr
   * @param {HTMLElement} attr.el 需要绑定的dom对象
   * @param {number} attr.min 最小值
   * @param {number} attr.max 最大值
   * @param {number} attr.step 步长(若不填或为0，则没有步长限制)
   * @param {number} attr.value 默认值(不填的情况下默认值为0)
   * @param {Function} attr.onChange 数值更改时触发
   * @param {Function} attr.onDrag 拖动引发数值更改时触发
   * @param {Function} attr.onDragStart 开始拖动时触发
   * @param {Function} attr.onDragEnd 结束拖动时触发
   */
  constructor({el, min, max, step, value = 0, onChange, onDragStart, onDragEnd, onDrag}) {
    this.el = el;
    this.min = Number(min); // 最小值
    this.max = Number(max); // 最大值
    this.step = Number(step); // 步长
    this.value = Number(value) == NaN ? value : Number(value); // 数值
    this.onChange = onChange
    this.onDragStart = onDragStart
    this.onDragEnd = onDragEnd
    this.onDrag = onDrag

    this.track = this.el.querySelector(".slider-track");
    this.bar = this.track.querySelector(".slider-bar");
    this.thumbTrack = this.track.querySelector(".slider-thumb-track"); // 滑块轨道
    this.thumb = this.track.querySelector(".slider-thumb");

    // 点击鼠标事件
    this.el.addEventListener(utils.nameMap.dragStart, (event) => {
      const e = event || window.event;
      // 滑块长度
      let trackLength = this.track.offsetHeight;
      // 滑块可滑动距离
      let nMax = this.thumbTrack.offsetHeight;
      nMax = nMax ? nMax : trackLength;
      // 滑块轨道与总轨道距离差
      let thumbTrackY = (trackLength - nMax) / 2;
      // 鼠标Y位置
      let clientY = e.clientY || e.changedTouches[0].clientY;
      // 滑动条位置
      let nTop = this.el.getBoundingClientRect().top;
      // 计算滑块位置
      let nLength = nMax - (clientY - nTop - thumbTrackY);
      // 限制滑块移动位置
      nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;
      let value = this.step
        ? Math.round(((nLength / nMax) * (this.max - this.min)) / this.step) * this.step + this.min
        : (nLength / nMax) * (this.max - this.min) + this.min;
      let per = (value - (this.min + 6)) / (this.max - this.min - 12);
      // 开始滑动事件
      this.onDragStart?.(value);
      // 监测数据更新并执行函数
      if (this.value != value) {
        this.drag(value);
      }

      // 修改滑块位置
      this.thumb.style.top = (1 - per) * 100 + "%";
      // 修改滑动痕迹高度
      // this.bar.style.height = per * 100 + "%";
      this.bar.style.height = Math.max(Math.min(per, 1), 0) * 100 + "%";

      let mousemoveEvent = (event) => {
        const e = event || window.event;
        // 鼠标移动时取消默认行为，避免选中其他元素或文字
        e.preventDefault();
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        // 鼠标Y位置
        let clientY = e.clientY || e.changedTouches[0].clientY;
        // 获取鼠标移动后滑块应该移动到的位置
        let nLength = nMax - (clientY - nTop - thumbTrackY);
        // 限制滑块移动位置
        nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength;

        let value = this.step
          ? Math.round(((nLength / nMax) * (this.max - this.min)) / this.step) * this.step + this.min
          : (nLength / nMax) * (this.max - this.min) + this.min;
        // 监测数据更新并执行函数
        if (this.value != value) {
          this.drag(value);
        }
      };
      let removeEvent = (event) => {
        const e = event || window.event;
        e.preventDefault();

        document.removeEventListener(utils.nameMap.dragMove, mousemoveEvent);
        document.removeEventListener(utils.nameMap.dragEnd, removeEvent);
        this.onDragEnd?.(value);
      };

      document.addEventListener(utils.nameMap.dragMove, mousemoveEvent);
      document.addEventListener(utils.nameMap.dragEnd, removeEvent);
    });
    // 设置滑块初始位置
    setTimeout(() => {
      this.setValue(this.value);
    }, 0);
  }
  /** 设置滑动条值 */
  setValue(value) {
    // this.value = value <= this.min ? this.min : value >= this.max ? this.max : value;
    this.value = Math.max(Math.min(value, this.max), this.min);
    // 计算滑块位置
    let per = (this.value - (this.min + 6)) / (this.max - this.min - 12);
    // 修改滑块位置
    this.thumb.style.top = (1 - per) * 100 + "%";
    // 修改滑动痕迹高度
    this.bar.style.height = Math.max(Math.min(per, 1), 0) * 100 + "%";
    // 执行相应函数
    this.onChange?.(value);
  }
  /** 拖动滑动条到特定的值 */
  drag(value) {
    this.setValue(value)
    // 触发拖动事件
    this.onDrag?.(this.value)
  }
}

export class Picker {
  /**
   * 单选选择器
   * @param {Object} attr
   * @param {HTMLElement} attr.el 需要绑定的选择器容器对象
   * @param {string} attr.value 默认值(不填的情况下默认值为null)
   * @param {Function} attr.onChange 值更改时触发
   * @param {Function} attr.onPick 选择某一项时触发
   */
  constructor({el, value = null, onChange, onPick}) {
    this.el = el; // 标签组
    this.items = el.querySelectorAll(".picker-item"); // 标签集合
    this.value = value;
    this.onChange = onChange; // 更新数据时需要执行的函数
    this.onPick = onPick; // 更新数据时需要执行的函数
    this.valueList = [];
    this.items.forEach((item) => {
      this.valueList.push(item.getAttribute("data-value"));
      item.addEventListener("click", () => {
        this.pick(item.getAttribute("data-value"), true);
      });
    });
    setTimeout(() => {
      this.setValue(this.value, false);
    }, 0);
  }
  setValue(value) {
    this.items.forEach((n, i) => {
      if (n.getAttribute("data-value") == value) {
        n.classList.add("picked");
      } else {
        n.classList.remove("picked");
      }
    });
    this.value = value;
    this.onChange?.(value);
  }
  pick(value) {
    this.setValue(value)
    this.onPick?.(value)
  }
}

export class MultiPicker {
  /**
   * 多选选择器
   *
   * @param {Object} attr
   * @param {HTMLElement} attr.el 需要绑定的选择器容器对象
   * @param {Array} attr.value 默认值(不填的情况下默认值为[])
   * @param {Function} attr.onChange 值更改时触发
   * @param {Function} attr.onPick 选择/取消选择某一项时触发
   */
  constructor({el, value = [], onChange, onItemChange, onPick}) {
    this.el = el; // 标签组
    this.items = el.querySelectorAll(".picker-item"); // 标签集合
    this.valueSet = new Set(value);
    this.onChange = onChange; // 更新数据时需要执行的函数
    this.onItemChange = onItemChange; // 更新数据时需要执行的函数
    this.onPick = onPick
    this.valueList = [];  // 所有值
    this.domMap = new Map();
    // 设置值
    this.items.forEach((item) => {
      this.valueList.push(item.getAttribute("data-value"));
      this.domMap.set(item.getAttribute("data-value"), item);
      item.addEventListener("click", () => {
        let val = item.getAttribute("data-value");
        if (this.valueSet.has(val)) {
          this.unpick(val);
        } else {
          this.pick(val);
        }
      });
    });
    setTimeout(() => {
      this.setValue(this.value, false);
    }, 0);
  }
  get value() {
    return [...this.valueSet]
  }
  pick(val) {
    this.domMap.get(val).classList.add("picked");
    this.valueSet.add(val);
    this.onChange?.(this.value);
    this.onPick?.(val, true);
  }
  /** 取消选择 */
  unpick(val) {
    this.domMap.get(val).classList.remove("picked");
    this.valueSet.delete(val);
    this.onChange?.(this.value);
    this.onPick?.(val, false);
  }
  /** 设置值 */
  setValue(value) {
    this.valueSet = new Set(value)
    this.valueList.forEach((n) => {
      if (this.valueSet.has(n)) {
        this.domMap.get(n).classList.add("picked")
      } else {
        this.domMap.get(n).classList.remove("picked")
      }
    });
    this.onChange?.(value)
  }
}

export class Switch {
  /**
   * 开关
   *
   * @param {Object} el 需要绑定的开关容器对象
   * @param {boolean} value 默认值(不填的情况下默认值为false)
   * @param {Object} onChange 值更改时触发
   * @param {Object} onToggle 切换状态时触发
   */
  constructor({el, value = false, onChange, onToggle}) {
    this.el = el;
    this.value = value;
    this.onChange = onChange; // 更新数据时需要执行的函数
    this.onToggle = onToggle
    this.el.addEventListener("click", () => {
      this.toggle(!this.value);
    });
    setTimeout(() => {
      this.setValue(this.value);
    }, 0);
  }
  setValue(value) {
    this.value = value
    this.el.classList.toggle("switch-on", value);
    this.onChange?.(value)
  }
  toggle(value) {
    this.setValue(value)
    this.onToggle?.(value)
  }
}
