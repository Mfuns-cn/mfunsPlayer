import AdvancedDanmakuPosEditor from "./AdvancedDanmakuPosEditor";
import AdvancedDanmakuJsonEditor from "./advancedDanmakuJsonEditor";

class AdvancedDanmakuEditor {
  constructor(player, el, options = {}) {
    this.player = player;
    this.el = el;
    this.template = this.player.template;
    this.init();
  }
  init() {
    const $ = this.el.querySelector.bind(this.el);
    this.template.ade_pos = $(".mfunsPlayer-ade-pos")    // M7高级弹幕编辑器
    this.template.ade_json = $(".mfunsPlayer-ade-json")  // json弹幕编辑器
    this.template.ade_mode_selector = $(".mfunsPlayer-ade-mode-selector")  // 弹幕模式选择

    this.template.ade_label_pos = $(".mfunsPlayer-ade-mode-selector .label-pos")
    this.template.ade_label_json = $(".mfunsPlayer-ade-mode-selector .label-json")

    this.PosEditor = new AdvancedDanmakuPosEditor(this.player, this.template.ade_pos)
    this.jsonEditor = new AdvancedDanmakuJsonEditor(this.player, this.template.ade_json)

    this.template.ade_label_pos.addEventListener("click", () => {
      this.switchMode(7)
    })
    this.template.ade_label_json.addEventListener("click", () => {
      this.switchMode(9)
      if (!this.jsonEditor.editor) {
        this.jsonEditor.createEditor()
      }
      this.jsonEditor.editor?.focus()
    })
  }
  switchMode(mode) {
    this.el.classList.toggle("mode-pos", mode == 7)
    this.el.classList.toggle("mode-script", mode == 8)
    this.el.classList.toggle("mode-json", mode == 9)
  }
}

export default AdvancedDanmakuEditor