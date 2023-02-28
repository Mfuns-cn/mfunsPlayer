/**
 * 高级弹幕编辑器(代码模式)
*/
let ace = window.ace

class AdvancedDanmakuJsonEditor {
  constructor(player, el, options = {}) {
    this.player = player
    this.el = el
    this.template = this.player.template
    this.editor = null
    this.init()
  }
  init() {
    const $ = this.el.querySelector.bind(this.el);
    this.template.ade_json_prebox = $(".mfunsPlayer-ade-prebox"); // 高级弹幕编辑框
    this.template.ade_json_clear = $(".mfunsPlayer-ade-clear"); // 高级弹幕编辑清除
    this.template.ade_json_preview = $(".mfunsPlayer-ade-preview"); // 高级弹幕编辑预览
    this.template.ade_json_emit = $(".mfunsPlayer-ade-emit"); // 高级弹幕发送

    this.template.ade_json_clear.addEventListener("click", () => {
      this.clear()
    });
    this.template.ade_json_preview.addEventListener("click", () => {
      this.preview()
    });
    this.template.ade_json_emit.addEventListener("click", () => {
      this.send()
    });
  }
  createEditor() {    // 引入编辑器
    if (ace) {
      this.editor = ace.edit(this.template.ade_json_prebox);
      this.editor.session.setOptions({
        mode: "ace/mode/json",
        tabSize: 2,
      });
      this.editor.setValue('[\n  {\n    "type":"text",\n    \n  }\n]');
      this.editor.gotoLine(5, 20)
    } else {
      this.template.ade_json_prebox.innerText = "> 页面未启用ace代码编辑器，无法使用代码编辑"
    }
  }
  preview() {
      let danmaku = {
          content: this.editor?.getValue(),
          time: 0,
          id: `preview-${Date.now()}`
      }
      console.log(danmaku.content)
      if (true) {
          this.player.seek(danmaku.time / 1000)
      }
      window.requestAnimationFrame(() => {
          this.player.advancedDanmaku.engine.playDanmaku(danmaku)
      })
  }
  send() {
      let danmaku = {
        content: this.editor?.getValue(),
        time: 0
      }
      console.log(danmaku.content)
      this.player.advancedDanmaku.engine.addDanmaku(danmaku)
      if (false) {
        this.player.advancedDanmaku.engine.playDanmaku(danmaku)
      }
  }
  clear() {
    this.editor.setValue('');
  }
}
export default AdvancedDanmakuJsonEditor