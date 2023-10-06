import { classPrefix } from "@/const";
import type { buttonSettings } from "@/plugins/button";
import { EmptyObject, PlayerPlugin } from "@/types";
import { Checkbox } from "@/ui/components";
import "./style.scss";

const name = "blackBorder";

export type PluginBlackBorder = PlayerPlugin<
  typeof name,
  EmptyObject,
  { toggle: (flag: boolean) => void; value: boolean },
  ReturnType<typeof buttonSettings>
>;

/** 视频黑边插件 */
const pluginBlackBorder = ({ padding }: { padding: string }): PluginBlackBorder => {
  return {
    name,
    create: (player) => {
      console.log("player.plugin.buttonSettings");
      let flag = false;
      const plugin = {
        toggle: (v: boolean) => {
          flag = v;
          if (v) {
            player.template.$videoWrap.style.setProperty("--padding", padding);
          } else {
            player.template.$videoWrap.style.setProperty("--padding", "");
          }
          player.events.trigger("change:black_border", v);
          player.events.trigger("setting", "blackBorder", v);
        },
        get value() {
          return flag;
        },
      };
      if (player.plugin.buttonSettings) {
        const container = document.createElement("div");
        new Checkbox({
          container,
          value: !plugin.value,
          onToggle: (val) => {
            plugin.toggle(!val);
          },
          label: "隐藏黑边",
        });
        player.plugin.buttonSettings.$others.appendChild(container);
      }
      return plugin;
    },
  };
};

export default pluginBlackBorder;
