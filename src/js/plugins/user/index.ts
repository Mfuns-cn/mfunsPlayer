import { BasePlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

declare module "@/player" {
  interface Player {
    userId?: number;
    authorId?: number;
  }
}
declare module "@/types" {
  interface PluginExports {
    user: User;
  }
  interface PlayerEventMap {
    login: (userId: number) => void;
  }
  interface PlayerOptions {
    userId?: number;
    login?: () => Promise<Partial<PlayerOptions> | void>;
  }
}

export default class User extends BasePlugin {
  static pluginName = "user";

  private apiLogin?: () => Promise<Partial<PlayerOptions> | void>;
  created(options: PlayerOptions) {
    this.apiLogin = options.login;
    this.player.on("options_set", ({ userId }) => {
      if (userId != null) {
        this.player.userId = userId;
        this.player.emit("login", userId);
      }
    });
  }
  /** 调用 */
  async login() {
    await this.apiLogin?.().then((res) => {
      res && this.player.emit("options_set", res);
    });
  }
}
