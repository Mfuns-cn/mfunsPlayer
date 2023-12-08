import { PlayerEventMap } from "@/types";

export default class Events {
  protected events: Record<string, ((...args: any[]) => void)[]> = {};

  readonly customEventList: string[] = [];

  /** 添加监听 */
  on<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(listener);
  }

  /** 添加一次性监听 */
  once<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    const func = (...args: any[]) => {
      (listener as (...args: any[]) => void)(...args);
      this.off(name, func);
    };
    this.on(name, func);
  }

  /** 移除监听 */
  off<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    const index = this.events[name].indexOf(listener);
    if (index > -1) this.events[name].splice(index, 1);
  }

  /** 触发事件 */
  emit<T extends keyof PlayerEventMap>(name: T, ...args: Parameters<PlayerEventMap[T]>) {
    if (this.events[name] && this.events[name].length) {
      for (let i = 0; i < this.events[name].length; i++) {
        this.events[name][i](...args);
      }
    }
  }
}
