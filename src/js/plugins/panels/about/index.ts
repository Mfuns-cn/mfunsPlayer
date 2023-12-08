import Player from "@/player";
import { classPrefix, developers, repositoryLink } from "@/config";
import { html, render } from "lit-html";
import { PanelPlugin } from "@/plugin";
import { PlayerOptions } from "@/types";

const template = () => html`
  <div class="${classPrefix}-about">
    <div class="${classPrefix}-about-logo"></div>
    <div class="${classPrefix}-about-version">version ${Player.version}-${Player.gitHash}</div>
    <div>github: <a href="${repositoryLink}" target="_blank">mfuns-cn/mfunsPlayer</a></div>
    <div>开发者</div>
    <ul class="${classPrefix}-about-developers">
      ${developers.map(
        ({ name, link }) => html`
          <li>
            <a href="${link}" target="_blank">${name}</a>
          </li>
        `
      )}
      <li></li>
    </ul>
  </div>
`;

declare module "@/types" {
  interface PluginExports {
    about?: About;
  }
}

export default class About extends PanelPlugin {
  static pluginName = "about";
  title = "关于";
  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template(), fragment);

    super(player, options, {
      name: "about",
      defaultOptions: { mount: (player) => player.plugin.modal },
      el: fragment.querySelector(`.${classPrefix}-about`)!,
    });
  }
}
