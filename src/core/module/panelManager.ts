import Player from "@/player";
import { IPanel, UIOptionsItem } from "@/plugin";
import { PlayerHookMap } from "@/types";

export default class PanelManager {
  protected list = new Map<string, IPanel>();
  player: Player;

  constructor(player: Player) {
    this.player = player;
  }
  /** 注册面板 */
  register(name: string, panel: IPanel | (new (player: Player) => IPanel)) {
    this.list.set(name, typeof panel == "function" ? this.build(panel) : panel);
  }

  /** 移除面板 */
  unregister<T extends keyof PlayerHookMap>(name: T) {
    this.list.delete(name);
  }

  /** 获取面板 */
  get(panel: UIOptionsItem<IPanel>): IPanel | undefined {
    switch (typeof panel) {
      case "object":
        return panel;
      case "function":
        return this.build(panel);
      default:
        return this.list.get(panel);
    }
  }

  /** 创建面板 */
  build(func: new (player: Player) => IPanel) {
    const panel = new func(this.player);
    panel.init?.(this.player);
    panel.ready?.(this.player);
    panel.mounted?.(this.player);
    return panel;
  }
}
