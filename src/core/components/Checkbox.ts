import { html, render } from "lit-html";

const templateWrap = ({ label }: { label?: string }) => html`
  <div class="mpui-checkbox">
    <div class="mpui-checkbox-icon"></div>
    <div class="mpui-checkbox-label">${label}</div>
  </div>
`;

interface CheckboxOptions {
  /** 挂载容器 */
  container: HTMLElement;
  /** 标签 */
  label?: string;
  /** 不可点选 */
  disabled?: boolean;
  /** 默认值(不填的情况下默认值为false) */
  value?: boolean;
  /** 值更改时触发 */
  onChange?: (value: boolean) => void;
  /** 切换状态时触发 */
  onToggle?: (value: boolean) => void;
}

/** 开关 */
export class Checkbox implements CheckboxOptions {
  readonly container: HTMLElement;

  onChange?: (value: boolean) => void;

  onToggle?: (value: boolean) => void;

  label?: string;

  /** 当前值 */
  value: boolean;

  $el: HTMLElement;

  constructor({ container, value = false, onChange, onToggle, label }: CheckboxOptions) {
    this.container = container;
    this.value = value;
    this.onChange = onChange; // 更新数据时需要执行的函数
    this.onToggle = onToggle;
    this.label = label;
    // 注入模板
    render(templateWrap({ label: this.label }), this.container);

    this.$el = this.container.querySelector(".mpui-checkbox")!;
    this.$el.addEventListener("click", () => {
      this.toggle();
    });

    this.setValue(this.value);
  }

  /** 设置开关状态 */
  public setValue(value: boolean) {
    this.value = value;
    this.$el.classList.toggle("is-checked", value);
    this.onChange?.(value);
  }

  /** 点按开关 */
  public toggle(value = !this.value) {
    this.setValue(value);
    this.onToggle?.(value);
  }
}
