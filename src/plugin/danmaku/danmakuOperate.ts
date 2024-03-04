import { DanmakuItem, DanmakuSendItem } from "./types";
import Player from "@/player";
import Danmaku from "./danmaku";
import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

declare module "@core" {
  interface PlayerPlugins {
    danmakuOperate?: DanmakuOperate;
  }
}

/** 弹幕操作
 *
 * 负责对弹幕进行api相关操作
 *
 * 前置插件: `danmaku`
 */

export default class DanmakuOperate extends BasePlugin {
  static readonly pluginName = "danmakuOperate";

  get danmaku() {
    return this.player.danmaku;
  }
  get invoke() {
    return this.player.danmaku?.invoke || {};
  }

  /**
   * 发送弹幕
   * @param danmaku 要发送的弹幕
   * @return 操作结果
   * */
  async send(danmaku: DanmakuSendItem): Promise<void> {
    if (!this.invoke.send) throw "发送失败";
    return await this.invoke
      .send(danmaku, this.player.getVideoInfo())
      .then((res) => {
        this.danmaku!.add(
          [
            Object.assign(
              {
                id: `send:${Date.now()}`,
                date: Math.floor(Date.now() / 1000),
                user: this.player.userId || 0,
                fromHere: true,
              },
              danmaku
            ),
          ],
          true
        );
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
    if (!this.invoke.report) throw "操作失败";
    return await this.invoke
      .report(danmaku, this.player.getVideoInfo())
      .then((res) => {
        // 操作成功后从弹幕池移除该弹幕
        this.danmaku!.remove([danmaku]);
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
    if (!this.invoke.delete) throw "操作失败";
    return await this.invoke
      .delete(danmaku, this.player.getVideoInfo())
      .then((res) => {
        // 操作成功后从弹幕池移除该弹幕
        this.danmaku!.remove(danmaku);
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
    if (!this.invoke.recall) throw "操作失败";
    return await this.invoke
      .recall(danmaku, this.player.getVideoInfo())
      .then((res) => {
        // 操作成功后从弹幕池移除该弹幕
        this.danmaku!.remove([danmaku]);
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
    if (!this.invoke.blockUser) throw "操作失败";
    return await this.invoke
      .blockUser(user, flag)
      .then(() => {
        this.player.emit("danmaku:blockUser", user, flag);
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
    if (!this.invoke.blockContent) throw "操作失败";
    return await this.invoke
      .blockContent(content, flag)
      .then((res) => {
        this.player.emit("danmaku:blockContent", content, flag);
      })
      .catch((e) => {
        throw e;
      });
  }
}
