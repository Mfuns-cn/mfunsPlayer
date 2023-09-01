import { DanmakuItem, OperationResult } from "@/types"
import MfunsPlayer from "@/player"
import Danmaku from "."

export default class DanmakuOperate {
  danmaku: Danmaku
  constructor(danmaku: Danmaku) {
    this.danmaku = danmaku
  }
  /** 举报 */
  async report(danmaku: DanmakuItem): Promise<OperationResult> {
    let result = await this.danmaku?.api?.report?.({ api: this.danmaku.api.url, danmaku })
    result ??= {
      ok: false,
      code: 0,
    }
    console.log(this.danmaku)
    console.log(this.danmaku?.api)
    // 操作成功后从弹幕池移除该弹幕
    if (result.ok) {
      this.danmaku.remove([danmaku.id])
    }
    return result
  }
  async delete(danmaku: DanmakuItem[]): Promise<OperationResult> {
    let result = await this.danmaku?.api?.delete?.({ api: this.danmaku.api.url, danmaku })
    result ??= {
      ok: false,
      code: 0,
    }
    // 操作成功后从弹幕池移除该弹幕
    if (result.ok) {
      this.danmaku.remove(danmaku.map((dm) => dm.id))
    }
    return result
  }
  async recall(danmaku: DanmakuItem): Promise<OperationResult> {
    let result = await this.danmaku?.api?.recall?.({ api: this.danmaku.api.url, danmaku })
    result ??= {
      ok: false,
      code: 0,
    }
    if (result.ok) {
      this.danmaku.remove([danmaku.id])
    }
    return result
  }
  async blockUser(user: string | number, flag: boolean): Promise<OperationResult> {
    let result = await this.danmaku?.api?.blockUser?.({ api: this.danmaku.api.url, user, flag })
    result ??= {
      ok: false,
      code: 0,
    }
    // 操作成功后在弹幕池屏蔽该用户
    if (result.ok) {
      this.danmaku.engine.setUserFilter(user, true)
    }
    return result
  }
  async blockContent(content: string, flag: boolean): Promise<OperationResult> {
    let result = await this.danmaku?.api?.blockContent?.({
      api: this.danmaku.api.url,
      content,
      flag,
    })
    result ??= {
      ok: false,
      code: 0,
    }
    // 操作成功后在弹幕池屏蔽该内容
    if (result.ok) {
      this.danmaku.engine.setContentFilter(content, true)
    }
    return result
  }
}
