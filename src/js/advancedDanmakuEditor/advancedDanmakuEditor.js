import AdvancedDanmakuPanelEditor from "./advancedDanmakuPanelEditor";
import AdvancedDanmakuJsonEditor from "./advancedDanmakuJsonEditor";

class AdvancedDanmakuEditor {
  constructor(player, el, options = {}) {
    this.player = player;
    this.el = el;
    const $ = this.el.querySelector.bind(this.el);
    this.view = {       // 视图元素
      editor_panel: $(".mfunsPlayer-ade-panel"),   // 面板编辑器
      editor_json: $(".mfunsPlayer-ade-json"),     // json编辑器
      mode_selector: $(".mfunsPlayer-ade-mode-selector"), // 弹幕编辑模式选择
      label_panel: $(".mfunsPlayer-ade-mode-selector .label-panel"),
      label_json: $(".mfunsPlayer-ade-mode-selector .label-json")
    };
    this.panelEditor = new AdvancedDanmakuPanelEditor(this.player, this.view.editor_panel)
    this.jsonEditor = new AdvancedDanmakuJsonEditor(this.player, this.view.editor_json)
    this.init();
  }
  init() {
    this.view.label_panel.addEventListener("click", () => {
      this.switchEditorMode("panel")
    })
    this.view.label_json.addEventListener("click", () => {
      this.switchEditorMode("json")
      if (!this.jsonEditor.editor) {
        this.jsonEditor.createEditor()
      }
      this.jsonEditor.editor?.focus()
    })
  }
  switchEditorMode(mode) {
    this.el.classList.toggle(`mode-panel`, mode == "panel")
    this.el.classList.toggle("mode-json", mode == "json")
  }
}

export default AdvancedDanmakuEditor