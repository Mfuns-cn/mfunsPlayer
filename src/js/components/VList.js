// 虚拟列表

export class VList {
  constructor ({el, getData, itemHeight, createItem, overflow=0}) {
    this.el = el        // 需要绑定的DOM对象
    this.content = null // 列表内容容器
    this.data = []      // 列表数据
    this.getData = getData    // 拉取列表数据 () => Object
    this.itemHeight = itemHeight    // 列表项高度
    this.createItem = createItem    // 列表项DOM生成函数 (item, i) => HTMLElement
    this.overflow = overflow      // 溢出范围

    this.renderStart = -1    // 列表渲染起点
    this.renderEnd = -1      // 列表渲染终点
    this.viewStart = 0      // 可视范围起点
    this.viewEnd = 0        // 可视范围终点
    this.throttle = false   // 节流开关

    this.init()
    this.reload()
  }
  init() {
    this.el.classList.add("vlist-container")
    this.content = document.createElement("div")
    this.content.classList.add("vlist-content")
    this.el.appendChild(this.content)

    this.el.addEventListener("scroll", () => {this.handleScroll()})
  }
  reload() {
    this.clear()
    this.data = this.getData()
    console.log(this.data)
    this.renderStart = -1    // 列表渲染起点
    this.renderEnd = -1      // 列表渲染终点
    this.viewStart = 0
    this.viewEnd = 0
    this.throttle = false   // 节流开关
    this.handleScroll()
  }
  handleScroll() {
    if (!this.throttle) {
      let clientH = this.el.clientHeight
      let scrollTop = this.el.scrollTop
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
  render(clientH, scrollTop) {
    // 保存原渲染范围
    let oldRenderStart = this.renderStart
    let oldRenderEnd = this.renderEnd
    // 获取新渲染范围
    this.renderStart = this.getViewStart(scrollTop) - this.overflow
    this.renderEnd = this.getViewEnd(scrollTop, clientH) + this.overflow
    // console.log(`old ${oldRenderStart}-${oldRenderEnd} new ${this.renderStart}-${this.renderEnd}`)
    // 与列表前段比较
    if (this.renderStart < oldRenderStart) {  // 列表前段范围扩张, 添加新列表项
      let beforeItems = document.createDocumentFragment()
      let addFrom = Math.max(this.renderStart, 0)
      let addTo = Math.min(oldRenderStart - 1, this.renderEnd, this.data.length - 1)
      // console.log(`add ${addFrom}-${addTo}`)
      for (let i = addFrom; i <= addTo ; i++) {
        beforeItems.appendChild(this.createItem(this.data[i], i))
        // console.log("add: " + i)
      }
      this.content.insertBefore(beforeItems, this.content.firstElementChild)
    } else {    // 若不扩张, 则删除多余的列表项
      let removeFrom = Math.max(oldRenderStart, 0)
      let removeTo = Math.min(this.renderStart - 1, oldRenderEnd)
      // console.log(`remove ${removeFrom}-${removeTo}`)
      for (let i = removeFrom; i <= removeTo ; i++) {
        this.content.removeChild(this.content.firstElementChild)
        // console.log("remove: " + i)
      }
    }

    // 与列表后段比较
    if (this.renderEnd > oldRenderEnd) {  // 列表后段范围扩张, 添加新列表项
      let afterItems = document.createDocumentFragment()
      let addFrom = Math.max(oldRenderEnd + 1 ,this.renderStart)
      let addTo = Math.min(this.renderEnd, this.data.length - 1)
      // console.log(`add ${addFrom}-${addTo}`)
      for (let i = addFrom; i <= addTo ; i++) {
        afterItems.appendChild(this.createItem(this.data[i], i))
        // console.log("add: " + i)
      }
      this.content.appendChild(afterItems)
    } else {    // 若不扩张, 则删除多余的列表项
      let removeFrom = Math.min(oldRenderEnd, this.data.length - 1)
      let removeTo = Math.max(this.renderEnd + 1, oldRenderStart)
      // console.log(`remove ${removeFrom}-${removeTo}`)
      for (let i = removeFrom; i >= removeTo ; i--) {
        this.content.removeChild(this.content.lastElementChild)
        // console.log("remove: " + i)
      }
    }

    // 设定占位边距
    this.content.style.paddingTop = `${this.renderStart > 0 ? this.renderStart * this.itemHeight : 0}px`
    this.content.style.paddingBottom = `${this.renderEnd < this.data.length - 1 ? (this.data.length - this.renderEnd - 1) * this.itemHeight : 0}px`
  }
  getViewStart(scrollTop) {
    return Math.floor(scrollTop / this.itemHeight)
  }
  getViewEnd(scrollTop, clientH) {
    return Math.ceil((scrollTop + clientH) / this.itemHeight) - 1
  }
  // 清空列表
  clear() {
    this.content.innerHTML = ""
    this.content.style.paddingTop = "0px"
    this.content.style.paddingBottom = "0px"
  }
}