import utils from "./utils.js"

// 滑动条


export class Slider {
    /**
     * 横向滑动条
     *
     * @param {Object} el 需要绑定的dom对象
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @param {Number} step 步长(若不填或为0，则没有步长限制)
     * @param {Number} value 默认值(不填的情况下默认值为0)
     * @param {Object} callbacks 回调函数键值对，分created, start, change, update, end五种状态，分别触发对应函数
     */
    constructor(el, min, max, step, value = 0, callbacks = {}) {
        const THIS = this
        this.el = el
        this.min = Number(min) // 最小值
        this.max = Number(max) // 最大值
        this.step = Number(step) // 步长
        this.value = Number(value) == NaN ? 0 : Number(value)  // 数值
        this.callbacks = callbacks    // 使用的回调函数

        this.track = this.el.querySelector('.slider-track')   // 滑动条轨道
        this.bar = this.track.querySelector('.slider-bar')      // 滑动条痕迹
        this.thumbTrack = this.track.querySelector('.slider-thumb-track')  // 滑块轨道
        this.thumb = this.track.querySelector('.slider-thumb')  // 滑块
        
        this.el.addEventListener(utils.nameMap.dragStart, function (event) {
            const e = event || window.event;
            // 滑块长度
            let trackLength = THIS.track.offsetWidth
            // 滑块可滑动距离
            let nMax = THIS.thumbTrack.offsetWidth
            nMax = nMax ? nMax : trackLength
            // 滑块轨道与总轨道距离差
            let thumbTrackX = (trackLength - nMax) / 2
            // 鼠标X位置
            let clientX = (e.clientX || e.changedTouches[0].clientX)
            // 滑动条位置
            let nLeft = Math.round(utils.getBoundingClientRectViewLeft(this))
            // 计算滑块位置
            let nLength = clientX - nLeft - thumbTrackX
            // 限制滑块移动位置
            nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength
            let value = THIS.step ? Math.round((nLength / nMax) * (THIS.max - THIS.min) / THIS.step) * THIS.step + THIS.min : (nLength / nMax) * (THIS.max - THIS.min) + THIS.min
            if (THIS.callbacks.start) {THIS.callbacks.start(value)}
            // 监测数据更新并执行函数
            if (THIS.value != value) {
                THIS.update(value)
            }

            let mousemoveEvent = function (event) {
                const e = event || window.event;
                // 鼠标移动时取消默认行为，避免选中其他元素或文字
                e.preventDefault()
                // 鼠标X位置
                let clientX = (e.clientX || e.changedTouches[0].clientX)
                // 获取鼠标移动后滑块应该移动到的位置
                let nLength = clientX - nLeft - thumbTrackX
                // 限制滑块移动位置
                nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength

                let value = THIS.step ? Math.round((nLength / nMax) * (THIS.max - THIS.min) / THIS.step) * THIS.step + THIS.min : (nLength / nMax) * (THIS.max - THIS.min) + THIS.min
                // 监测数据更新并执行函数
                if (THIS.value != value) {
                    THIS.update(value)
                }
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            }

            let removeEvent = function () {
                document.removeEventListener(utils.nameMap.dragMove, mousemoveEvent)
                document.removeEventListener(utils.nameMap.dragEnd, removeEvent)
                if (THIS.callbacks.end) {THIS.callbacks.end(value)}
            }

            document.addEventListener(utils.nameMap.dragMove, mousemoveEvent)
            document.addEventListener(utils.nameMap.dragEnd, removeEvent)
        })
        
        // 创建组件后应执行的函数(参数为this)
        if (this.callbacks.created) {this.callbacks.created(this)}
        // 根据数值设置滑块初始位置
        this.update(this.value)
    }
    change(value, ...args) {         // 修改滑动条值，不执行回调函数
        this.value = value <= this.min ? this.min : value >= this.max ? this.max : value
        // 计算滑块位置
        let per = (this.value - this.min) / (this.max - this.min)
        // 修改滑块位置
        this.thumb.style.left = per * 100 + "%"
        // 修改滑动痕迹高度
        this.bar.style.width = per * 100 + "%"
        if (this.callbacks.change) {this.callbacks.change(value, ...args)}
    }
    update(value, ...args) {         // 更新数据并修改滑动条数值
        this.change(value, ...args)
        // 执行相应函数
        if (this.callbacks.update) {this.callbacks.update(value, ...args)}
    }
}

export class Slider_vertical {
    /**
     * 纵向滑动条
     *
     * @param {Object} el 需要绑定的dom对象
     * @param {Number} min 最小值
     * @param {Number} max 最大值
     * @param {Number} step 步长(若不填或为0，则没有步长限制
     * @param {Number} value 默认值(不填的情况下默认值为0)
     * @param {Object} callbacks 回调函数键值对，分created, start, change, update, end五种状态，分别触发对应函数
     */
    constructor(el, min, max, step, value = 0, callbacks = {}) {
        const THIS = this
        this.el = el
        this.min = Number(min) // 最小值
        this.max = Number(max) // 最大值
        this.step = Number(step) // 步长
        this.value = Number(value) == NaN ? 0 : Number(value)  // 数值
        this.callbacks = callbacks    // 使用的回调函数

        this.track = this.el.querySelector('.slider-track')
        this.bar = this.track.querySelector('.slider-bar')
        this.thumbTrack = this.track.querySelector('.slider-thumb-track')  // 滑块轨道
        this.thumb = this.track.querySelector('.slider-thumb')
        
        this.el.addEventListener(utils.nameMap.dragStart, function (event) {
            const e = event || window.event;
            // 滑块长度
            let trackLength = THIS.track.offsetHeight
            // 滑块可滑动距离
            let nMax = THIS.thumbTrack.offsetHeight
            nMax = nMax ? nMax : trackLength
            // 滑块轨道与总轨道距离差
            let thumbTrackY = (trackLength - nMax) / 2
            // 鼠标Y位置
            let clientY = (e.clientY || e.changedTouches[0].clientY)
            // 滑动条位置
            let nTop = utils.getElementViewTop(this)
            // 计算滑块位置
            let nLength = nMax - (clientY - nTop - thumbTrackY)
            // 限制滑块移动位置
            nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength
            let value = THIS.step ? Math.round((nLength / nMax) * (THIS.max - THIS.min) / THIS.step) * THIS.step + THIS.min : (nLength / nMax) * (THIS.max - THIS.min) + THIS.min
            let per = (value - THIS.min) / (THIS.max - THIS.min)
            if (THIS.callbacks.start) {THIS.callbacks.start(value)}
            // 监测数据更新并执行函数
            if (THIS.value != value) {
                THIS.update(value)
            }

            // 修改滑块位置
            THIS.thumb.style.top = (1 - per) * 100 + "%"
            // 修改滑动痕迹高度
            THIS.bar.style.height = per * 100 + "%"

            
            let mousemoveEvent = function (event) {
                const e = event || window.event;
                // 鼠标移动时取消默认行为，避免选中其他元素或文字
                e.preventDefault()
                // 鼠标Y位置
                let clientY = (e.clientY || e.changedTouches[0].clientY)
                // 获取鼠标移动后滑块应该移动到的位置
                let nLength = nMax - (clientY - nTop - thumbTrackY)
                // 限制滑块移动位置
                nLength = nLength >= nMax ? nMax : nLength <= 0 ? 0 : nLength

                let value = THIS.step ? Math.round((nLength / nMax) * (THIS.max - THIS.min) / THIS.step) * THIS.step + THIS.min : (nLength / nMax) * (THIS.max - THIS.min) + THIS.min
                // 监测数据更新并执行函数
                if (THIS.value != value) {
                    THIS.update(value)
                }
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            }

            let removeEvent = function () {
                document.removeEventListener(utils.nameMap.dragMove, mousemoveEvent)
                document.removeEventListener(utils.nameMap.dragEnd, removeEvent)
                if (THIS.callbacks.end) {THIS.callbacks.end(value)}
            }

            document.addEventListener(utils.nameMap.dragMove, mousemoveEvent)
            document.addEventListener(utils.nameMap.dragEnd, removeEvent)
        })
        // 创建组件后应执行的函数(参数为this)
        if (this.callbacks.created) {this.callbacks.created(this)}
        // 设置滑块初始位置
        this.update(value)
    }
    change(value, ...args) {
        this.value = value <= this.min ? this.min : value >= this.max ? this.max : value
        // 计算滑块位置
        let per = (this.value - this.min) / (this.max - this.min)
        // 修改滑块位置
        this.thumb.style.top = (1 - per) * 100 + "%"
        // 修改滑动痕迹高度
        this.bar.style.height = per * 100 + "%"
        if (this.callbacks.change) {this.callbacks.change(value, ...args)}
    }
    update(value, ...args) {
        this.change(value, ...args)
        // 执行相应函数
        if (this.callbacks.update) {this.callbacks.update(value, ...args)}
    }
}


 export class Picker {
    /**
     * 单选选择器
     *
     * @param {Object} group 需要绑定的选择器容器对象
     * @param {Number} value 默认值(不填的情况下默认值为null)
     * @param {Object} callbacks 回调函数键值对，分created, change, pick三种状态，分别触发对应函数
     */
    constructor (group, value = null ,callbacks = {}) {
        const THIS = this
        this.group = group    // 标签组
        this.items = group.querySelectorAll(".picker-item")       // 标签集合
        this.value = value
        this.callbacks = callbacks    // 更新数据时需要执行的函数
        this.valueList = []
        this.items.forEach(item => {
            this.valueList.push(item.getAttribute('data-value'))
            item.addEventListener('click', function(){
                THIS.pick(item.getAttribute('data-value'))
            })
        });
        // 创建组件后应执行的函数(参数为this)
        if (this.callbacks.created) {this.callbacks.created(this)}
        this.pick(this.value)
    }
    change(value, ...args) {
        this.items.forEach((n, i) => {
            if (n.getAttribute('data-value') == value) {
                n.classList.add('picked')
            } else {
                n.classList.remove('picked')
            }
        })
        this.value = value
        if (this.callbacks.change) {this.callbacks.change(value, ...args)}
    }
    pick(value, ...args) {
        this.change(value, ...args)
        if (this.callbacks.pick) {this.callbacks.pick(value, ...args)}
    }
}


export class MultiPicker {
    /**
     * 多选选择器
     *
     * @param {Object} group 需要绑定的选择器容器对象
     * @param {Number} value 默认值(不填的情况下默认值为null)
     * @param {Object} callbacks 回调函数键值对，分created, pick, unpick, update四种状态，分别触发对应函数
     */
    constructor (group, value ,callbacks = {}) {
        const THIS = this
        this.group = group    // 标签组
        this.items = group.querySelectorAll(".picker-item")       // 标签集合
        this.value = new Set()
        this.callbacks = callbacks    // 更新数据时需要执行的函数
        this.valueList = []
        this.domMap = new Map()
        this.items.forEach(item => {
            this.valueList.push(item.getAttribute('data-value'))
            this.domMap.set(item.getAttribute('data-value'), item)
            item.addEventListener('click', function(){
                let val = this.getAttribute('data-value')
                if (THIS.value.has(val)) {
                    THIS.unpick(val)
                } else {
                    THIS.pick(val)
                }
            })
        });
        // 创建组件后应执行的函数(参数为this)
        if (this.callbacks.created) {this.callbacks.created(this)}
        this.pick(value)
    }
    pick(val, ...args) {
        if(typeof(val) == "string") {
            this.domMap.get(val).classList.add('picked')
            this.value.add(val)
            if (this.callbacks.pick) {this.callbacks.pick(val, ...args)}
        } else if (typeof(val) == "array") {
            this.items.forEach((n) => {
                this.domMap.get(n).classList.add('picked')
                this.value.add(n)
                if (this.callbacks.pick) {this.callbacks.pick(n, ...args)}
            })
        }
        if (this.callbacks.update) {this.callbacks.update(this.value, ...args)}
    }
    unpick(val, ...args) {
        if(typeof(val) == "string") {
            this.domMap.get(val).classList.remove('picked')
            this.value.delete(val)
            if (this.callbacks.unpick) {this.callbacks.unpick(val, ...args)}
        } else if (typeof(val) == "array") {
            this.items.forEach((n) => {
                this.domMap.get(n).classList.remove('picked')
                this.value.delete(n)
                if (this.callbacks.unpick) {this.callbacks.unpick(n, ...args)}
            })
        }
        if (this.callbacks.update) {this.callbacks.update(this.value, ...args)}
    }
}