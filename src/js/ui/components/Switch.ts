import { createArray, nameMap } from "@/utils";
import { classPrefix } from "@/const";
import { html, render, TemplateResult } from "lit-html";
const templateWrap = ({label, template}: {
  label?: string
  template: SwitchItemTemplate;
}) => html`
  <div class="${classPrefix}-switch">
    ${template(label)}
  </div>
`;

/** 选择器函数 */
type SwitchItemTemplate = (label?: string) => string | TemplateResult

interface SwitchOptions {
  /** 挂载容器 */
  container: HTMLElement
  /** 标签 */
  label?: string;
  /** 不可点选 */
  disabled?: boolean
  /** 开关模板 */
  template: SwitchItemTemplate;
  /** 默认值(不填的情况下默认值为false) */
  value?: boolean;
  /** 值更改时触发 */
  onChange?: (value: boolean) => void;
  /** 切换状态时触发 */
  onToggle?: (value: boolean) => void;
}

/** 开关 */
export class Switch implements SwitchOptions{
  readonly container: HTMLElement;
  readonly template: SwitchItemTemplate;
  onChange?: (value: boolean) => void;
  onToggle?: (value: boolean) => void;
  label?: string
  /** 当前值 */
  value: boolean
  el: HTMLElement
  constructor({container, value = false, onChange, onToggle, template}: SwitchOptions) {
    this.container = container;
    this.value = value;
    this.onChange = onChange; // 更新数据时需要执行的函数
    this.onToggle = onToggle
    this.template = template
    // 注入模板
    render(templateWrap({label: this.label, template: this.template}), this.container)

    this.el = this.container.querySelector(`.${classPrefix}-switch`)!
    this.el.addEventListener("click", () => {
      this.toggle(!this.value);
    });

    this.setValue(this.value);
  }
  /** 设置开关状态 */
  public setValue(value: boolean) {
    this.value = value
    this.el.classList.toggle(`${classPrefix}-switch-on`, value);
    this.onChange?.(value)
  }
  /** 点按开关 */
  public toggle(value: boolean = !this.value) {
    this.setValue(value)
    this.onToggle?.(value)
  }
}
