import { PlayerOptions } from "@/types";
import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { createElement } from "@/utils";
import { classPrefix } from "@/config";
import { Checkbox } from "@/components";

declare module "@core" {
  interface PlayerOptions {
    mini?: boolean;
  }
  interface PlayerEventMap {
    miniChange: (flag: boolean) => void;
  }
}

/** 小窗播放器 */

export default class Mini extends BasePlugin {
  static readonly pluginName = "mini";
  /** 播放器小窗显示状态 */
  #shown = false;
  /** 播放器小窗拖动状态 */
  #dragging = false;
  /** 播放器小窗启用状态 */
  #enabled = false;

  $el: HTMLElement;
  checkbox?: Checkbox;
  constructor(player: Player) {
    super(player);
    this.$el = createElement("div", { class: `${classPrefix}-mini` });
    this.player.$el.appendChild(this.$el);
    this.player.on("intersection", (isIntersecting) => {
      const disabled = !this.#enabled || this.player.isPip;
      if (isIntersecting) {
        !disabled && this._hide();
      } else {
        !disabled && this._show();
      }
      console.log(isIntersecting);
    });
    if (player.plugin.buttonSettings) {
      const container = document.createElement("div");
      this.checkbox = new Checkbox({
        container,
        value: this.enabled,
        onToggle: (val) => {
          this.toggle(val);
        },
        label: "小窗模式",
      });
      player.plugin.settings?.$others.appendChild(container);
      player.on("miniChange", (flag) => this.checkbox?.setValue(flag));
    }
  }

  apply(player: Player, options: PlayerOptions): void {
    if (options.mini) this.#enabled = true;
  }

  init() {
    this.$el.addEventListener("click", () => {
      !this.#dragging && (this.player.paused ? this.player.play : this.player.pause());
    });
    // 拖动操作
    this.$el.addEventListener("mousedown", (e) => {
      const { clientX, clientY } = e;
      const { offsetLeft, offsetTop } = this.$el;
      console.log([offsetLeft, offsetTop]);
      const mLeft = clientX - offsetLeft;
      const mTop = clientY - offsetTop;
      const mousemoveHandler = (e: MouseEvent) => {
        this.#dragging = true;
        const { clientX, clientY } = e;
        this.$el.style.left = `${clientX - mLeft}px`;
        this.$el.style.top = `${clientY - mTop}px`;
      };
      const mouseupHandler = () => {
        this.$el.removeEventListener("mousemove", mousemoveHandler);
        document.removeEventListener("mouseup", mouseupHandler);
        requestAnimationFrame(() => {
          this.#dragging = false;
        });
      };
      this.$el.addEventListener("mousemove", mousemoveHandler);
      document.addEventListener("mouseup", mouseupHandler);
    });

    this.player.on("enterpictureinpicture", () => this._hide());
    this.player.on("leavepictureinpicture", () => !this.player.isIntersecting && this._show());
  }

  ready() {
    this.enabled && this.toggle(true);
  }

  private _show() {
    if (this.#shown) return;
    this.player.$area.style.height = `${this.player.$area.clientHeight}px`;
    this.$el.append(...this.player.$area.children);
    this.$el.classList.add("is-show");
    this.#shown = true;
  }
  private _hide() {
    if (!this.#shown) return;
    this.player.$area.style.height = "";
    this.player.$area.append(...this.$el.children);
    this.$el.classList.remove("is-show");
    this.#shown = false;
  }
  /** 播放器小窗启用状态 */
  get enabled() {
    return this.#enabled;
  }
  /** 播放器小窗显示状态 */
  get shown() {
    return this.#shown;
  }
  toggle(flag: boolean) {
    if (flag) {
      if (this.enabled) return;
      this.player.isIntersecting == false && this._show();
      this.player.emit("miniChange", true);
    } else {
      if (!this.enabled) return;
      this._hide();
      this.player.emit("miniChange", false);
    }

    this.#enabled = flag;
  }
}
