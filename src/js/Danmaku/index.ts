import { DanmakuInterface, DanmakuSource } from "../types"

/** 弹幕模块 */
export default class Danmaku {
  /** 弹幕引擎，用于弹幕绘制 */
  engine: any

  /** 弹幕api */
  api: any

  /** 弹幕列表 */
  list: any

  constructor(player: any) {}

  init() {}

  /** 加载弹幕源 */
  async loadSource({
    url, type, platform, name,
  }: DanmakuSource) {}

  /** 加载弹幕 */
  reload(id: number, addition?: DanmakuSource[]) {}

  /** 添加弹幕到弹幕池 */
  add(dmlist: DanmakuInterface[]) {}

  /** 根据id从弹幕池中移除一条弹幕 */
  remove(id: string | number) {}

  /** 清空弹幕池 */
  clear() {}

  /** 弹幕类型屏蔽 */
  blockType(list: string[]) {}

  /** 弹幕来源屏蔽 */
  blockSource(list: string[]) {}
}

/** 支持下列事件
 *
 */
