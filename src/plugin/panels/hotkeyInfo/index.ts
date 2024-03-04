import Player from "@/player";
import { classPrefix } from "@/config";
import { html, render } from "lit-html";
import { PanelPlugin } from "@/plugin";

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

interface HotkeyInfoListItem {
  key: string;
  description: string;
}

/** 快捷键信息面板 */
export default class HotkeyInfo extends PanelPlugin {
  static pluginName = "hotkeyInfo";
  name = "hotkeyInfo";
  title = "快捷键说明";
  constructor(player: Player) {
    const hotkeyInfoList = [
      { key: "Space", description: "播放/暂停" },
      { key: "→", description: "快进5秒" },
      { key: "←", description: "快退5秒" },
      { key: "↑", description: "音量增加10%" },
      { key: "↓", description: "音量降低10%" },
    ];
    const fragment = new DocumentFragment();
    render(template(hotkeyInfoList), fragment);
    super(player, fragment.querySelector(`.${classPrefix}-hotkeys`)!);
  }
}
