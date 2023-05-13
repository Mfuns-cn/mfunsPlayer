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
          ${template?.(item, index) || item.label}
        </li>
      `,
  )}
  </ul>
`

/** 选择器函数 */
type PickerItemTemplate = (item: PickerOptionsItem, index?: number) => string | TemplateResult

interface PickerOptionsItem {
  value: string
  label: string
  disabled?: boolean
  [key: string]: any
}

interface PickerOptions {
  /** 挂载容器 */
  container: HTMLElement
  /** 选择列表 */
  list: PickerOptionsItem[]
  /** 选择项标签模板 */
  template?: PickerItemTemplate
  /** 默认值(不填的情况下默认值为null) */
  value?: string | null
  /** 值更改时触发 */
  onChange?: (value: string | null) => void
  /** 选择某一项时触发 */
  onPick?: (value: string | null) => void
}

/** 单选选择器 */
export class Picker implements PickerOptions {
  readonly container: HTMLElement

  readonly template?: PickerItemTemplate

  list: PickerOptionsItem[]

  /** 已选值 */
  value: string | null

  onChange?: (value: string | null) => void

  onPick?: (value: string | null) => void

  el!: HTMLElement

  /** 选择项标签集合 */
  private $items!: NodeListOf<HTMLElement>

  constructor({
    container, value, onChange, onPick, list,
  }: PickerOptions) {
    this.container = container
    this.list = list
    this.value = value || null
    this.onChange = onChange // 更新数据时需要执行的函数
    this.onPick = onPick // 更新数据时需要执行的函数
    this.reload()
  }

  /** 重载，一般用于列表项更改 */
  public reload(value?: string) {
    render(templateWrap({ list: this.list, template: this.template }), this.el)
    this.el = this.container.querySelector(`.${classPrefix}-picker`)!
    this.$items = this.el.querySelectorAll(`.${classPrefix}-picker-item`) // 标签集合
    this.$items.forEach((item) => {
      item.addEventListener("click", () => {
        this.pick(item.getAttribute("data-value"))
      })
    })
    this.setValue(value || this.value)
  }

  /** 设置值 */
  public setValue(value: string | null) {
    this.$items.forEach((n, i) => {
      if (n.getAttribute("data-value") == value) {
        n.classList.add(`${classPrefix}-picker-item-picked`)
      } else {
        n.classList.remove(`${classPrefix}-picker-item-picked`)
      }
    })
    this.value = value
    this.onChange?.(value)
  }

  /** 点选一个选项 */
  public pick(value: string | null) {
    this.setValue(value)
    this.onPick?.(value)
  }
}
