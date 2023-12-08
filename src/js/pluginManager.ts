import Player from "@/player";
import { PlayerOptions, Plugin, PluginConstructor } from "@/types";

export class PluginManager {
  player: Player;
  get plugin() {
    return this.player.plugin as unknown as Record<string, Plugin>;
  }
  private initialized = false;
  constructor(player: Player) {
    this.player = player;
  }
  /** 注册插件 */
  register(PluginCon: PluginConstructor, options: PlayerOptions) {
    const plugin = new PluginCon(this.player, options);
    plugin.created?.(options);
    if (this.initialized) {
      plugin.pluginsReady?.(options);
      plugin.playerMounted?.(options);
      plugin.videoInited?.(options);
    }
  }
  /** 批量注册插件 */
  pluginsRegister(options: PlayerOptions) {
    options.plugins?.forEach((PluginCon) => {
      const plugin = new PluginCon(this.player, options);
      this.plugin[PluginCon.pluginName] = plugin;
      plugin.created?.(options);
    });
  }
  /** 所有插件注册完毕后执行 */
  pluginsReady(options: PlayerOptions) {
    if (this.initialized) return;
    for (const name in this.plugin) {
      const plugin = this.plugin[name];
      plugin.pluginsReady?.(options);
    }
    this.initialized = true;
  }
  /** 播放器挂载后执行 */
  playerMounted(options: PlayerOptions) {
    for (const name in this.plugin) {
      const plugin = this.plugin[name];
      plugin.playerMounted?.(options);
    }
  }
  /** 销毁所有插件 */
  destroy() {
    for (const name in this.plugin) {
      const plugin = this.plugin[name];
      plugin.destroy?.();
    }
  }
}
