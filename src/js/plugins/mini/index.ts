import { PlayerOptions } from "@/types";
import Player from "@/player";
import { BasePlugin } from "@/plugin";
import { createElement } from "@/utils";
import { classPrefix } from "@/config";
import { Checkbox } from "@/components";

declare module "@/types" {
  interface PlayerOptions {
    mini?: boolean;
  }
  interface PlayerPropertyMap {
    mini: boolean;
  }
}

export default class Mini extends BasePlugin {
  static readonly pluginName = "mini";
  /** 播放器小窗显示状态 */
  private _shown = false;
  /** 播放器小窗拖动状态 */
  private _dragging = false;
  /** 播放器小窗启用状态 */
  private _enabled = false;

  $el: HTMLElement;
  checkbox?: Checkbox;
  constructor(player: Player, options: PlayerOptions) {
    super(player);
    this.$el = createElement("div", { class: `${classPrefix}-mini` });
    this.player.$el.appendChild(this.$el);
    this.player.on("intersection", (isIntersecting) => {
      const disabled = !this._enabled || this.plugin.pip?.status;
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
      player.watch("mini", (flag) => this.checkbox?.setValue(flag));
    }
    if (options.blackBorder) this.toggle(true);
  }
  created() {
    this.$el.addEventListener("click", () => {
      !this._dragging && this.player.toggle();
    });
    // 拖动操作
    this.$el.addEventListener("mousedown", (e) => {
      const { clientX, clientY } = e;
      const { offsetLeft, offsetTop } = this.$el;
      console.log([offsetLeft, offsetTop]);
      const mLeft = clientX - offsetLeft;
      const mTop = clientY - offsetTop;
      const mousemoveHandler = (e: MouseEvent) => {
        this._dragging = true;
        const { clientX, clientY } = e;
        this.$el.style.left = `${clientX - mLeft}px`;
        this.$el.style.top = `${clientY - mTop}px`;
      };
      const mouseupHandler = () => {
        this.$el.removeEventListener("mousemove", mousemoveHandler);
        document.removeEventListener("mouseup", mouseupHandler);
        requestAnimationFrame(() => {
          this._dragging = false;
        });
      };
      this.$el.addEventListener("mousemove", mousemoveHandler);
      document.addEventListener("mouseup", mouseupHandler);
    });

    this.player.on("pip:enter", () => this._hide());
    this.player.on("pip:exit", () => !this.player.intersecting && this._show());
  }
  pluginsReady(options: PlayerOptions) {
    options.mini && this.toggle(true);
  }
  private _show() {
    if (this._shown) return;
    this.player.$area.style.height = `${this.player.$area.clientHeight}px`;
    this.$el.append(...this.player.$area.children);
    this.$el.classList.add("state-show");
    this._shown = true;
  }
  private _hide() {
    if (!this._shown) return;
    this.player.$area.style.height = "";
    this.player.$area.append(...this.$el.children);
    this.$el.classList.remove("state-show");
    this._shown = false;
  }
  /** 播放器小窗启用状态 */
  get enabled() {
    return this._enabled;
  }
  /** 播放器小窗显示状态 */
  get shown() {
    return this._shown;
  }
  toggle(flag: boolean) {
    if (flag) {
      if (this.enabled) return;
      !this.player.intersecting && this._show();
      this.player.emitChange("mini", true);
    } else {
      if (!this.enabled) return;
      this._hide();
      this.player.emitChange("mini", false);
    }

    this._enabled = flag;
  }
}
