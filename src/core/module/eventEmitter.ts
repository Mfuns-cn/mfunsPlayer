import { PlayerEventMap } from "@/types";

export default class EventEmitter {
  protected listeners: Record<string, ((...args: any[]) => void)[]> = {};
  protected onceListeners: Record<string, ((...args: any[]) => void)[]> = {};

  readonly customEventList: string[] = [];

  /** 添加监听 */
  on<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    this.listeners[name].push(listener);
  }

  /** 添加一次性监听 */
  once<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    if (!this.onceListeners[name]) {
      this.onceListeners[name] = [];
    }
    this.onceListeners[name].push(listener);
  }

  /** 移除监听 */
  off<T extends keyof PlayerEventMap>(name: T, listener: PlayerEventMap[T]) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    const index = this.listeners[name].indexOf(listener);
    if (index > -1) this.listeners[name].splice(index, 1);
  }

  /** 触发事件 */
  emit<T extends keyof PlayerEventMap>(name: T, ...args: Parameters<PlayerEventMap[T]>) {
    if (this.listeners[name]?.length) {
      for (let i = 0; i < this.listeners[name].length; i++) {
        this.listeners[name][i](...args);
      }
    }
    if (this.onceListeners[name]?.length) {
      for (let i = 0; i < this.onceListeners[name].length; i++) {
        this.onceListeners[name][i](...args);
      }
      this.onceListeners[name] = [];
    }
  }
}
