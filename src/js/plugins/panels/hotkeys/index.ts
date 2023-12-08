import Player from "@/player";
import { classPrefix } from "@/config";
import { html, render } from "lit-html";
import { PanelPlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

const template = (list: HotkeyInfoListItem[]) => html`
  <div class="${classPrefix}-hotkeys">
    <div class="${classPrefix}-hotkeys-list">
      ${list.map(
        ({ key, description }) => html`
          <div class="${classPrefix}-hotkeys-list-item">
            <div class="${classPrefix}-hotkeys-list-key">${key}</div>
            <div class="${classPrefix}-hotkeys-list-description">${description}</div>
          </div>
        `
      )}
    </div>
  </div>
`;

declare module "@/types" {
  interface PluginExports {
    hotkeys?: Hotkeys;
  }
}

interface HotkeyInfoListItem {
  key: string;
  description: string;
}

export default class Hotkeys extends PanelPlugin {
  static pluginName = "hotkeys";
  title = "快捷键说明";
  constructor(player: Player, options: PlayerOptions) {
    const hotkeyInfoList = [
      { key: "Space", description: "播放/暂停" },
      { key: "→", description: "快进5秒" },
      { key: "←", description: "快退5秒" },
      { key: "↑", description: "音量增加10%" },
      { key: "↓", description: "音量降低10%" },
    ];
    const fragment = new DocumentFragment();
    render(template(hotkeyInfoList), fragment);
    super(player, options, {
      name: "hotkeys",
      defaultOptions: { mount: (player) => player.plugin.modal },
      el: fragment.querySelector(`.${classPrefix}-hotkeys`)!,
    });
  }
}
