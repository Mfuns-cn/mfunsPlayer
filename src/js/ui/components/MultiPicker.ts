import { html, render, TemplateResult } from "lit-html"
import { classPrefix } from "@/const"

const templateWrap = ({
  list,
  template,
}: {
  list: PickerOptionsItem[]
  template?: PickerItemTemplate
}) => html`
  <ul class="${classPrefix}-picker">
    ${list.map(
      (item, index) => html`
        <li class="${classPrefix}-picker-item" data-value="${item.value}">
          ${template?.(item, index) || item.label || item.value}
        </li>
      `
    )}
  </ul>
`

/** 选择器函数 */
type PickerItemTemplate = (item: PickerOptionsItem, index?: number) => string | TemplateResult

interface PickerOptionsItem {
  value: string
  label?: string
  disabled?: boolean
  [key: string]: any
}

interface MultiPickerOptions {
  /** 绑定的dom对象 */
  container: HTMLElement
  /** 选择列表 */
  list: PickerOptionsItem[]
  /** 选择项标签模板 */
  template?: PickerItemTemplate
  /** 默认值(不填的情况下默认值为[]) */
  value?: string[]
  /** 值更改时触发 */
  onChange?: (value: string[]) => void
  /** 选择/取消选择某一项时触发 */
  onToggle?: (value: string, flag: boolean) => void
}

/** 多项选择器 */
export class MultiPicker implements MultiPickerOptions {
  readonly container: HTMLElement

  readonly template?: PickerItemTemplate

  list: PickerOptionsItem[]

  valueSet: Set<string>

  /** 已选值 */
  get value() {
    return [...this.valueSet]
  }

  onChange?: (value: string[]) => void

  onToggle?: (value: string, flag: boolean) => void

  el!: HTMLElement

  /** 选择项标签集合 */
  private $items!: NodeListOf<HTMLElement>

  constructor({ container, value = [], list, onChange, onToggle }: MultiPickerOptions) {
    this.container = container
    this.list = list
    this.valueSet = new Set(value)
    this.onChange = onChange // 更新数据时需要执行的函数
    this.onToggle = onToggle // 更新数据时需要执行的函数
    this.reload()
  }

  /** 重载，一般用于列表项更改 */
  public reload(value?: string[]) {
    render(templateWrap({ list: this.list, template: this.template }), this.container)
    this.el = this.container.querySelector(`.${classPrefix}-picker`)!
    this.$items = this.el.querySelectorAll(`.${classPrefix}-picker-item`) // 标签集合
    this.$items.forEach((item) => {
      item.addEventListener("click", () => {
        this.toggle(item.getAttribute("data-value")!)
      })
    })
    this.setValue(value ?? this.value)
  }

  /** 设置值 */
  public setValue(value: string[]) {
    this.valueSet = new Set(value)
    this.$items.forEach((n, i) => {
      if (this.valueSet.has(n.getAttribute("data-value")!)) {
        n.classList.add("state-picked")
      } else {
        n.classList.remove("state-picked")
      }
    })
    this.onChange?.(value)
  }

  /** 切换一个选项的选择状态 */
  public toggle(value: string, flag?: boolean) {
    const b = flag == null ? !this.valueSet.has(value) : flag
    if (b) {
      this.valueSet.add(value)
    } else {
      this.valueSet.delete(value)
    }
    this.$items.forEach((n, i) => {
      if (n.getAttribute("data-value") == value) {
        n.classList.toggle("state-picked", b)
      }
    })
    this.onChange?.(this.value)
    this.onToggle?.(value, b)
  }
}
