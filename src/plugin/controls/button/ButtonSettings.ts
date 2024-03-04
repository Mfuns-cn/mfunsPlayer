import { html, render } from "lit-html";
import Player from "@/player";
import { classPrefix } from "@/config";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button-settings">
    <div class="${classPrefix}-controls-button-icon">
      <i class="mpicon-settings"></i>
    </div>
    <div class="${classPrefix}-controls-panel-wrap">
      <div class="${classPrefix}-controls-panel"></div>
    </div>
  </div>
`;

export default class ButtonSettings extends ControlsPlugin {
  static pluginName = "buttonSettings";
  name = "settings";
  $icon: HTMLElement;
  $panel: HTMLElement;

  constructor(player: Player) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, fragment.querySelector(`.${classPrefix}-controls-button`)!);

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$panel = this.$(`.${classPrefix}-controls-panel`)!;
  }

  ready() {
    const settings = this.player.panel.get("settings");
    settings?.mount(this.$panel);
  }
}
