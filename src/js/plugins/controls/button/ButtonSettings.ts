import { html, render } from "lit-html";
import { Picker } from "@/components";
import Player from "@/player";
import { classPrefix } from "@/config";
import { PlayerOptions } from "@/types";
import { ControlsPlugin } from "@/plugin";

const template = html`
  <div class="${classPrefix}-controls-button ${classPrefix}-button_settings">
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
  $icon: HTMLElement;
  $panel: HTMLElement;

  pickerRate!: Picker;
  pickerScale!: Picker;

  constructor(player: Player, options: PlayerOptions) {
    const fragment = new DocumentFragment();
    render(template, fragment);
    super(player, options, {
      name: "buttonSettings",
      defaultOptions: {
        container: (p) => p.plugin.controller?.$right,
        order: 2,
      },
      el: fragment.querySelector(`.${classPrefix}-controls-button`)!,
    });

    this.$icon = this.$(`.${classPrefix}-controls-button-icon`)!;
    this.$panel = this.$(`.${classPrefix}-controls-panel`)!;
  }

  created(options: PlayerOptions) {
    this.$panel.appendChild(this.plugin.settings!.$el);
  }
}
