import MfunsPlayer from "@/player"
import { PlayerOptions, PlayerPlugin } from "@/types"

export class PluginManager {
  player: MfunsPlayer
  list: PlayerPlugin[] = []
  constructor(player: MfunsPlayer, list?: PlayerPlugin[]) {
    this.player = player
    const names: string[] = []
    list?.forEach((plugin) => {
      if (names.indexOf(plugin.id) > -1) {
        return
      } else {
        names.push(plugin.id)
        this.list.push(plugin)
      }
    })
  }
  /** 创建所有插件 */
  pluginCreate(options: PlayerOptions<PlayerPlugin>) {
    this.list.forEach((plugin) => {
      this.player.plugin[plugin.id] = plugin.create?.(this.player, options) || {}
    })
  }
  /** 初始化所有插件 */
  pluginInit(options: PlayerOptions<PlayerPlugin>) {
    this.list.forEach((plugin) => {
      plugin.init?.(this.player, options)
    })
  }
  /** 销毁所有插件 */
  pluginDestory() {
    this.list.forEach((plugin) => {
      plugin.destroy?.(this.player)
    })
  }
}
