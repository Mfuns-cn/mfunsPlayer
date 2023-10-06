import Player from "@/player";
import { classPrefix, developers, repositoryLink } from "@/const";
import { html, render } from "lit-html";

const template = (list: HotkeyInfo[]) => html`
  <div class="${classPrefix}-modal-panel ${classPrefix}-hotkey">
    <div class="${classPrefix}-hotkey-list">
      ${list.map(
        ({ key, description }) => html`
          <div class="${classPrefix}-hotkey-list-item">
            <div class="${classPrefix}-hotkey-list-key">${key}</div>
            <div class="${classPrefix}-hotkey-list-description">${description}</div>
          </div>
        `
      )}
    </div>
  </div>
`;

interface HotkeyInfo {
  key: string;
  description: string;
}

export default class ModalHotkey {
  title = "快捷键说明";
  el: HTMLElement;
  constructor() {
    const hotkeyInfoList = [
      { key: "Space", description: "播放/暂停" },
      { key: "→", description: "快进5秒" },
      { key: "←", description: "快退5秒" },
      { key: "↑", description: "音量增加10%" },
      { key: "↓", description: "音量降低10%" },
    ];

    const fragment = new DocumentFragment();
    render(template(hotkeyInfoList), fragment);
    this.el = fragment.querySelector(`.${classPrefix}-modal-panel`)!;
  }
}
