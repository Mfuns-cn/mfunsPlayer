/**
 * 高级弹幕编辑器(代码模式)
*/
let ace = window.ace

class AdvancedDanmakuJsonEditor {
  constructor(player, el, options = {}) {
    this.player = player
    this.el = el
    this.template = this.player.template
    this.init()
  }
  init() {
    const $ = this.el.querySelector.bind(this.el);
    this.template.ade_json_prebox = $(".mfunsPlayer-ade-prebox"); // 高级弹幕编辑框
    this.template.ade_json_clear = $(".mfunsPlayer-ade-clear"); // 高级弹幕编辑清除
    this.template.ade_json_preview = $(".mfunsPlayer-ade-preview"); // 高级弹幕编辑预览
    this.template.ade_json_emit = $(".mfunsPlayer-ade-emit"); // 高级弹幕发送

    this.template.ade_json_clear.addEventListener("click", () => {
      console.log("清空编辑框");
    });
    this.template.ade_json_preview.addEventListener("click", () => {
      console.log("高级弹幕预览");
    });
    this.template.ade_json_emit.addEventListener("click", () => {
      console.log("发送高级弹幕");
    });
  }
  createEditor() {    // 引入编辑器
    if (ace) {
      this.editor = ace.edit(this.template.ade_json_prebox);
      this.editor.session.setOptions({
        mode: "ace/mode/json",
        tabSize: 2,
      });
      this.editor.setValue ('[\n  {\n    "type":"text",\n    "start":0\n    \n  }\n]');
      this.editor.gotoLine(5, 20)
    }
  }
  clear() {
    
  }
}
export default AdvancedDanmakuJsonEditor