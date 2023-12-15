import { DanmakuItem, DanmakuSendItem } from "./types";
import Player from "@/player";
import Danmaku from ".";

export default class DanmakuOperate {
  danmaku: Danmaku;
  player: Player;
  constructor(player: Player) {
    this.player = player;
    this.danmaku = player.plugin.danmaku!;
  }

  /**
   * 发送弹幕
   * @param danmaku 要发送的弹幕
   * @return 操作结果
   * */
  async send(danmaku: DanmakuSendItem): Promise<void> {
    if (!this.danmaku?.api?.send) throw "发送失败";
    return await this.danmaku.api
      .send(danmaku, this.player.videoInfo.danmakuId || 0)
      .then((res) => {
        this.danmaku.add([
          Object.assign(
            {
              id: `send:${Date.now()}`,
              date: Math.floor(Date.now() / 1000),
              user: 0,
            },
            danmaku
          ),
        ]);
        return res;
      })
      .catch((e) => {
        throw e;
      });
  }

  /**
   * 举报弹幕
   * @param danmaku 要举报的弹幕
   * @return 操作结果
   * */
  async report(danmaku: DanmakuItem): Promise<void> {
    if (!this.danmaku?.api?.report) throw "操作失败";
    return await this.danmaku.api
      .report(danmaku)
      .then((res) => {
        // 操作成功后从弹幕池移除该弹幕
        this.danmaku.remove([danmaku.id]);
        return res;
      })
      .catch((e) => {
        throw e;
      });
  }

  /**
   * 删除弹幕
   * @param danmaku 要删除的弹幕
   * @return 操作结果
   * */
  async delete(danmaku: DanmakuItem[]): Promise<void> {
    if (!this.danmaku?.api?.delete) throw "操作失败";
    return await this.danmaku.api
      .delete(danmaku)
      .then((res) => {
        // 操作成功后从弹幕池移除该弹幕
        this.danmaku.remove(danmaku.map((dm) => dm.id));
        return res;
      })
      .catch((e) => {
        throw e;
      });
  }

  /**
   * 删除自己发送的弹幕
   * @param danmaku 要删除的弹幕
   * @return 操作结果
   * */
  async recall(danmaku: DanmakuItem): Promise<void> {
    if (!this.danmaku?.api?.recall) throw "操作失败";
    return await this.danmaku.api
      .recall(danmaku)
      .then((res) => {
        // 操作成功后从弹幕池移除该弹幕
        this.danmaku.remove([danmaku.id]);
        return res;
      })
      .catch((e) => {
        throw e;
      });
  }

  /**
   * 屏蔽用户
   * @param user 用户id
   * @param flag 设置屏蔽状态
   * @return 操作结果
   * */
  async blockUser(user: string | number, flag: boolean): Promise<void> {
    if (!this.danmaku?.api?.blockUser) throw "操作失败";
    return await this.danmaku.api
      .blockUser(user, flag)
      .then(() => {
        // 操作成功后在弹幕池屏蔽该用户
        this.danmaku.engine.setUserFilter(user, flag);
        this.player.emit("danmaku:block_user", user, flag);
      })
      .catch((e) => {
        throw e;
      });
  }

  /**
   * 屏蔽关键词
   * @param content 关键词内容
   * @param flag 设置屏蔽状态
   * @return 操作结果
   * */
  async blockContent(content: string, flag: boolean): Promise<void> {
    if (!this.danmaku?.api?.blockContent) throw "操作失败";
    return await this.danmaku.api
      .blockContent(content, flag)
      .then((res) => {
        this.danmaku.engine.setContentFilter(content, flag);
        this.player.emit("danmaku:block_content", content, flag);
      })
      .catch((e) => {
        throw e;
      });
  }
}
