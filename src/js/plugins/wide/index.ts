import { EmptyObject, PlayerPlugin } from "@/types";
import ButtonWide from "./ButtonWide";

const name = "wide";

export type PluginWide = PlayerPlugin<
  typeof name,
  EmptyObject,
  {
    /** 进入宽屏模式 */
    enter: () => void;
    /** 退出宽屏模式 */
    exit: () => void;
    /** 当前状态 */
    status: boolean;
  }
>;

/** 宽屏模式插件 */

const pluginWide = (): PluginWide => {
  let button: ButtonWide;
  let isWide = false;
  return {
    name,
    create: (player, options) => {
      button = new ButtonWide(player, player.controller.$right, 8);
      const plugin = {
        button,
        enter: () => {
          player.template.el.classList.add("mode-wide");
          player.events.trigger("wide");
          isWide = true;
        },
        exit: () => {
          player.template.el.classList.remove("mode-wide");
          player.events.trigger("wide_exit");
          isWide = false;
        },
        get status() {
          return isWide;
        },
      };
      options.mode?.wide && plugin.enter();
      return plugin;
    },
  };
};

export default pluginWide;
