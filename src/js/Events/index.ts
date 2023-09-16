import { PlayerEventsMap } from "./PlayerEventsMap"

export default class Events {
  protected events: Record<string, ((...args: any[]) => void)[]> = {}

  readonly customEventList: string[] = []

  constructor() {}

  /** 添加监听 */
  on<T extends keyof PlayerEventsMap>(name: T, listener: PlayerEventsMap[T]) {
    if (!this.events[name]) {
      this.events[name] = []
    }
    this.events[name].push(listener)
  }

  /** 移除监听 */
  off<T extends keyof PlayerEventsMap>(name: T, listener: PlayerEventsMap[T]) {
    if (!this.events[name]) {
      this.events[name] = []
    }
    const index = this.events[name].indexOf(listener)
    if (index > -1) this.events[name].splice(index, 1)
  }

  /** 触发事件 */
  trigger<T extends keyof PlayerEventsMap>(name: T, ...args: Parameters<PlayerEventsMap[T]>) {
    if (this.events[name] && this.events[name].length) {
      for (let i = 0; i < this.events[name].length; i++) {
        this.events[name][i](...args)
      }
    }
  }
}
