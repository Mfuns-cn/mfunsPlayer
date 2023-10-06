import { DanmakuItem, DanmakuSendItem, OperationResult } from "@/types";
import Player from "@/player";
import Danmaku from ".";

export default class DanmakuOperate {
  danmaku: Danmaku;
  player: Player;
  constructor(danmaku: Danmaku) {
    this.danmaku = danmaku;
    this.player = danmaku.player;
  }

  /**
   * 发送弹幕
   * @param danmaku 要发送的弹幕
   * @return 操作结果
   * */
  async send(danmaku: DanmakuSendItem): Promise<OperationResult> {
    let result = await this.danmaku?.api?.send?.({
      api: this.danmaku.api.url,
      id: this.player.video.list[this.player.video.part].danmakuId || 0,
      danmaku,
    });
    result ??= {
      success: false,
      message: "发送失败",
    };
    // 操作成功后将弹幕添加到弹幕池
    if (result.success) {
      this.danmaku.add([
        Object.assign(
          {
            id: `send:${Date.now()}`,
            date: Math.floor(Date.now() / 1000),
            user: this.player.userId,
          },
          danmaku
        ),
      ]);
    }
    return result;
  }

  /**
   * 举报弹幕
   * @param danmaku 要举报的弹幕
   * @return 操作结果
   * */
  async report(danmaku: DanmakuItem): Promise<OperationResult> {
    let result = await this.danmaku?.api?.report?.({ api: this.danmaku.api.url, danmaku });
    result ??= {
      success: false,
      message: "操作失败",
    };
    // 操作成功后从弹幕池移除该弹幕
    if (result.success) {
      this.danmaku.remove([danmaku.id]);
    }
    return result;
  }

  /**
   * 删除弹幕
   * @param danmaku 要删除的弹幕
   * @return 操作结果
   * */
  async delete(danmaku: DanmakuItem[]): Promise<OperationResult> {
    let result = await this.danmaku?.api?.delete?.({ api: this.danmaku.api.url, danmaku });
    result ??= {
      success: false,
      message: "操作失败",
    };
    // 操作成功后从弹幕池移除该弹幕
    if (result.success) {
      this.danmaku.remove(danmaku.map((dm) => dm.id));
    }
    return result;
  }

  /**
   * 删除自己发送的弹幕
   * @param danmaku 要删除的弹幕
   * @return 操作结果
   * */
  async recall(danmaku: DanmakuItem): Promise<OperationResult> {
    let result = await this.danmaku?.api?.recall?.({ api: this.danmaku.api.url, danmaku });
    result ??= {
      success: false,
      message: "操作失败",
    };
    if (result.success) {
      this.danmaku.remove([danmaku.id]);
    }
    return result;
  }

  /**
   * 屏蔽用户
   * @param user 用户id
   * @param flag 设置屏蔽状态
   * @return 操作结果
   * */
  async blockUser(user: string | number, flag: boolean): Promise<OperationResult> {
    let result = await this.danmaku?.api?.blockUser?.({ api: this.danmaku.api.url, user, flag });
    result ??= {
      success: false,
      message: "操作失败",
    };
    // 操作成功后在弹幕池屏蔽该用户
    if (result.success) {
      this.danmaku.engine.setUserFilter(user, flag);
      this.player.events.trigger("danmaku:block_user", user, flag);
    }
    return result;
  }

  /**
   * 屏蔽关键词
   * @param content 关键词内容
   * @param flag 设置屏蔽状态
   * @return 操作结果
   * */
  async blockContent(content: string, flag: boolean): Promise<OperationResult> {
    let result = await this.danmaku?.api?.blockContent?.({
      api: this.danmaku.api.url,
      content,
      flag,
    });
    result ??= {
      success: false,
      message: "操作失败",
    };
    // 操作成功后在弹幕池屏蔽该内容
    if (result.success) {
      this.danmaku.engine.setContentFilter(content, flag);
      this.player.events.trigger("danmaku:block_content", content, flag);
    }
    return result;
  }
}
