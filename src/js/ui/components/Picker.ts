import { html, render, TemplateResult } from "lit-html";
import { classPrefix } from "@/config";

const templateWrap = ({
  list,
  template,
}: {
  list: PickerOptionsItem[];
  template?: PickerItemTemplate;
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
`;

/** 选择器函数 */
type PickerItemTemplate = (item: PickerOptionsItem, index?: number) => string | TemplateResult;

interface PickerOptionsItem {
  value: string | number;
  label?: string;
  disabled?: boolean;
  [key: string]: any;
}

interface PickerOptions {
  /** 挂载容器 */
  container: HTMLElement;
  /** 选择列表 */
  list: PickerOptionsItem[];
  /** 选择项标签模板 */
  template?: PickerItemTemplate;
  /** 默认值(不填的情况下默认值为null) */
  value?: string | number | null;
  /** 值更改时触发 */
  onChange?: (value: string | number | null) => void;
  /** 选择某一项时触发 */
  onPick?: (value: string | number | null) => void;
  /** 相等条件 */
  condition?: (item: string, value: string | number | null) => boolean;
}

/** 单选选择器 */
export class Picker implements PickerOptions {
  readonly container: HTMLElement;

  readonly template?: PickerItemTemplate;

  list: PickerOptionsItem[];

  /** 已选值 */
  value: string | number | null;

  onChange?: (value: string | number | null) => void;

  onPick?: (value: string | number | null) => void;

  $el!: HTMLElement;

  /** 相等条件 */
  condition?: (item: string, value: string | number | null) => boolean;

  /** 选择项标签集合 */
  private $items!: NodeListOf<HTMLElement>;

  constructor({ container, value, onChange, onPick, list, template, condition }: PickerOptions) {
    this.container = container;
    this.list = list;
    this.value = value ?? null;
    this.onChange = onChange; // 更新数据时需要执行的函数
    this.onPick = onPick; // 更新数据时需要执行的函数
    this.template = template;
    this.condition = condition;
    this.reload();
  }

  /** 重载，一般用于列表项更改 */
  public reload(value?: string) {
    render(templateWrap({ list: this.list, template: this.template }), this.container);
    this.$el = this.container.querySelector(`.${classPrefix}-picker`)!;
    this.$items = this.$el.querySelectorAll(`.${classPrefix}-picker-item`); // 标签集合
    this.$items.forEach((item) => {
      item.addEventListener("click", () => {
        this.pick(item.getAttribute("data-value"));
      });
    });
    this.setValue(value ?? this.value);
  }

  /** 设置值 */
  public setValue(value: string | number | null) {
    this.$items.forEach((n, i) => {
      if (
        this.condition
          ? this.condition(n.getAttribute("data-value")!, value)
          : n.getAttribute("data-value") == value
      ) {
        n.classList.add("state-picked");
      } else {
        n.classList.remove("state-picked");
      }
    });
    this.value = value;
    this.onChange?.(value);
  }

  /** 点选一个选项 */
  public pick(value: string | null) {
    this.setValue(value);
    this.onPick?.(value);
  }
}
