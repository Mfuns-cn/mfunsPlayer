import Player from "@/player";
import { PlayerOptions, IPlugin, PluginConstructor } from "@/types";

export default class PluginManager {
  player: Player;
  get plugin() {
    return this.player.plugin as unknown as Record<string, IPlugin>;
  }
  private initialized = false;
  constructor(player: Player) {
    this.player = player;
  }
  /** 注册插件 */
  register(pluginItem: PluginConstructor | IPlugin, options: PlayerOptions) {
    const plugin: IPlugin =
      typeof pluginItem == "function" ? new pluginItem(this.player) : pluginItem;
    plugin.init?.(this.player);
    if (pluginItem.pluginName) (this.player.plugin as any)[pluginItem.pluginName] = plugin;
    console.log(pluginItem.pluginName);
    plugin.apply?.(this.player, options);
    if (this.initialized) {
      plugin.ready?.(this.player);
      plugin.mounted?.(this.player);
    }
  }
  /** 批量注册插件 */
  pluginsRegister(options: PlayerOptions) {
    options.plugins?.forEach((pluginItem) => {
      this.register(pluginItem, options);
    });
    this.pluginsReady();
  }
  /** 所有插件注册完毕后执行 */
  pluginsReady() {
    if (this.initialized) return;
    for (const name in this.plugin) {
      const plugin = this.plugin[name];
      plugin.ready?.(this.player);
    }
    this.initialized = true;
  }
  /** 播放器挂载后执行 */
  playerMounted() {
    for (const name in this.plugin) {
      const plugin = this.plugin[name];
      plugin.mounted?.(this.player);
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
