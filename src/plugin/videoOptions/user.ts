import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";
import { Player } from "@core";

declare module "@core" {
  interface Player {
    userId?: number;
    authorId?: number;
    login?: () => Promise<void>;
  }
  interface PlayerEventMap {
    login: (userId: number) => void;
  }
  interface PlayerOptions {
    userId?: number;
  }
  interface PlayerInvokes {
    login?: () => Promise<number>;
  }
  interface VideoInfo {
    author?: {
      id: number;
    };
  }
}

export default class User extends BasePlugin {
  static pluginName = "user";
  #userId = 0;
  #authorId = 0;

  public invokeLogin?: () => Promise<number>;
  init() {
    this.player.define("userId", { get: () => this.#userId });
    this.player.define("authorId", { get: () => this.#authorId });
    this.player.define("login", () => {
      return this.login();
    });
    this.player.on("videoChange", ({ author }) => {
      if (author?.id != null) {
        this.#authorId = author.id || 0;
      }
    });
  }
  apply(player: Player, options: PlayerOptions): void {
    this.#userId = options.userId || 0;
    this.invokeLogin = options.invoke?.login;
  }
  /** 调用页面登录 */
  async login() {
    await this.invokeLogin?.().then((res) => {
      res != null && this.setUser(res);
    });
  }
  /** 设置用户 */
  async setUser(userId: number) {
    this.#userId = userId;
    this.player.emit("login", userId);
  }
}
