/** 虚拟列表 */

export class VirtualList<T> {
  /** 需要绑定的DOM对象 */
  el: HTMLElement
  $content: HTMLElement
  /** 列表数据 */
  data: T[] = []
  /** 拉取列表数据 () => Object */
  getData: () => T[]
  /** 列表项高度 */
  itemHeight: number
  /** 列表项DOM生成函数 */
  createItem: (item: T, i: number, array: T[]) => HTMLElement
  /** 溢出范围 */
  overflow: number

  /** 列表渲染起点 */
  renderStart = -1
  /** 列表渲染终点 */
  renderEnd = -1
  /** 可视范围起点 */
  viewStart = 0
  /** 可视范围终点 */
  viewEnd = 0
  /** 节流开关 */
  throttle = false
  /** 已清空状态 */
  cleared = false
  constructor({
    el,
    getData,
    itemHeight,
    createItem,
    overflow = 0,
  }: {
    el: HTMLElement
    getData: () => T[]
    itemHeight: number
    createItem: (item: T, i: number, array: T[]) => HTMLElement
    overflow?: number
  }) {
    this.el = el
    this.getData = getData
    this.itemHeight = itemHeight
    this.createItem = createItem
    this.overflow = overflow

    this.renderStart = -1
    this.renderEnd = -1
    this.viewStart = 0
    this.viewEnd = 0
    this.throttle = false
    this.cleared = false

    this.el.classList.add("vlist-container")
    this.$content = document.createElement("div")
    this.$content.classList.add("vlist-content")
    this.el.appendChild(this.$content)

    this.el.addEventListener("scroll", () => {
      this.cleared || this.handleScroll()
    })

    this.reload()
  }
  /** 重载列表 */
  reload() {
    this.clear()
    this.data = this.getData()
    console.log(this.data)
    this.renderStart = -1
    this.renderEnd = -1
    this.viewStart = 0
    this.viewEnd = 0
    this.throttle = false
    this.handleScroll()
    this.cleared = false
  }
  /** 更新列表 */
  update() {
    this.data = this.getData()
    this.handleScroll()
  }
  handleScroll() {
    if (!this.throttle) {
      const clientH = this.el.clientHeight
      const scrollTop = this.el.scrollTop
      this.viewStart = this.getViewStart(scrollTop)
      this.viewEnd = this.getViewEnd(scrollTop, clientH)
      if (this.viewStart <= this.renderStart || this.viewEnd >= this.renderEnd) {
        this.render(clientH, scrollTop)
        // console.log(`${this.renderStart} - ${this.renderEnd}`)
      }
      // console.log(`${scrollTop} + ${clientH} @ ${this.viewStart} - ${this.viewEnd} # ${this.renderStart} - ${this.renderEnd}`)
    } else {
      // console.log("none")
    }
  }
  render(clientH: number, scrollTop: number) {
    // 保存原渲染范围
    const oldRenderStart = this.renderStart
    const oldRenderEnd = this.renderEnd
    // 获取新渲染范围
    this.renderStart = this.getViewStart(scrollTop) - this.overflow
    this.renderEnd = this.getViewEnd(scrollTop, clientH) + this.overflow
    // console.log(`old ${oldRenderStart}-${oldRenderEnd} new ${this.renderStart}-${this.renderEnd}`)
    // 与列表前段比较
    if (this.renderStart < oldRenderStart) {
      // 列表前段范围扩张, 添加新列表项
      const beforeItems = document.createDocumentFragment()
      const addFrom = Math.max(this.renderStart, 0)
      const addTo = Math.min(oldRenderStart - 1, this.renderEnd, this.data.length - 1)
      // console.log(`add ${addFrom}-${addTo}`)
      for (let i = addFrom; i <= addTo; i++) {
        beforeItems.appendChild(this.createItem(this.data[i], i, this.data))
        // console.log("add: " + i)
      }
      this.$content.insertBefore(beforeItems, this.$content.firstElementChild)
    } else {
      // 若不扩张, 则删除多余的列表项
      const removeFrom = Math.max(oldRenderStart, 0)
      const removeTo = Math.min(this.renderStart - 1, oldRenderEnd)
      // console.log(`remove ${removeFrom}-${removeTo}`)
      for (let i = removeFrom; i <= removeTo; i++) {
        const child = this.$content.firstElementChild
        child && this.$content.removeChild(child)
      }
    }

    // 与列表后段比较
    if (this.renderEnd > oldRenderEnd) {
      // 列表后段范围扩张, 添加新列表项
      const afterItems = document.createDocumentFragment()
      const addFrom = Math.max(oldRenderEnd + 1, this.renderStart)
      const addTo = Math.min(this.renderEnd, this.data.length - 1)
      // console.log(`add ${addFrom}-${addTo}`)
      for (let i = addFrom; i <= addTo; i++) {
        afterItems.appendChild(this.createItem(this.data[i], i, this.data))
        // console.log("add: " + i)
      }
      this.$content.appendChild(afterItems)
    } else {
      // 若不扩张, 则删除多余的列表项
      const removeFrom = Math.min(oldRenderEnd, this.data.length - 1)
      const removeTo = Math.max(this.renderEnd + 1, oldRenderStart)
      // console.log(`remove ${removeFrom}-${removeTo}`)
      for (let i = removeFrom; i >= removeTo; i--) {
        const child = this.$content.lastElementChild
        child && this.$content.removeChild(child)
        // console.log("remove: " + i)
      }
    }

    // 设定占位边距
    this.$content.style.paddingTop = `${
      this.renderStart > 0 ? this.renderStart * this.itemHeight : 0
    }px`
    this.$content.style.paddingBottom = `${
      this.renderEnd < this.data.length - 1
        ? (this.data.length - this.renderEnd - 1) * this.itemHeight
        : 0
    }px`
  }
  getViewStart(scrollTop: number) {
    return Math.floor(scrollTop / this.itemHeight)
  }
  getViewEnd(scrollTop: number, clientH: number) {
    return Math.ceil((scrollTop + clientH) / this.itemHeight) - 1
  }
  // 清空列表
  clear() {
    this.data = []
    this.$content.innerHTML = ""
    this.$content.style.paddingTop = "0px"
    this.$content.style.paddingBottom = "0px"
    this.cleared = true
  }
  locateStart(n: number) {
    // 定位到某项开头
    this.el.scrollTo({
      top: n * this.itemHeight,
      behavior: "auto",
    })
  }
  locateEnd(n: number) {
    // 定位到某项末尾
    this.el.scrollTo({
      top: n * this.itemHeight - this.el.clientHeight,
      behavior: "auto",
    })
  }
}
