import utils from "./utils";
import DanmakuAuxiliaryTemplate from "../../template/danmakuAuxiliary.art";

/**
 * @param {Object} player 播放器实例
 * @param {Object} el 挂载点
 */
class DanmakuAuxiliary {
  constructor(player, el, options = {}) {
    this.player = player;
    this.el = el;
    this.mount();
  }
  mount() {
    // 挂载
    this.el.classList.add("mfunsPlayer-danmaku-auxiliary");
    this.el.innerHTML = DanmakuAuxiliaryTemplate(); // 注入弹幕功能区DOM
    this.initDanmakuList();
    this.initADE();
  }
  initDanmakuList() {
    const $ = this.el.querySelector.bind(this.el);
    this.danmaku_list_panel = $(".mfunsPlayer-danmaku-list-panel"); // 弹幕列表面板
    this.danmaku_list_container = $(".mfunsPlayer-danmaku-list-container"); // 弹幕列表容器
    this.danmaku_list = $(".mfunsPlayer-danmaku-list"); // 弹幕列表
    this.danmaku_list_status = $(".mfunsPlayer-danmaku-list-status"); // 弹幕列表状态
    this.danmakuLoadingFailed = false;
    if (this.player.danmaku.loaded) {
      this.fillDanmakuList(this.player.danmaku.dan);
    } else {
      this.danmakuListStatus("loading");
    }
    this.player.on("danmaku_load_end", this.fillDanmakuList.bind(this));
    this.player.on("danmaku_load_start", this.clearDanmakuList.bind(this));
    this.player.on(
      "danmaku_load_failed",
      (() => {
        this.danmakuLoadingFailed = true;
      }).bind(this)
    );
  }
  fillDanmakuList(dan) {
    // 弹幕列表装填
    let danList = "";
    if (this.danmakuLoadingFailed) {
      this.danmakuListStatus("failed");
    } else if (!dan.length) {
      this.danmakuListStatus("empty");
    } else {
      dan.forEach((danmaku) => {
        let tipText = danmaku.text
        if (danmaku.mode == 8) {
          tipText = tipText.replaceAll('\r', '')
          tipText = danmaku.text.length < 400 ? tipText : tipText.slice(0, 400) + "..."
        } else {
          tipText = tipText.replaceAll('\\', '\\\\')
        }
        let row = `
        <div class="list-row" title='${tipText}\n1970-01-01 00:00 @ ${utils.secondToTime(danmaku.time, false)}'>
          <span class="list-cell col-time">${utils.secondToTime(
            danmaku.time,
            false
          )}</span><span class="list-cell col-text" ${danmaku.mode > 6?'style="font-weight:600"':''}>${
            tipText
        }</span><span class="list-cell col-date">${"1970-01-01 00:00"}</span>
        </div>
        `;
        danList += row;
      });
      this.danmakuListStatus(true);
      this.danmaku_list.innerHTML = danList;
    }
  }
  clearDanmakuList() {
    this.danmaku_list.innerHTML = "";
    this.danmakuLoadingFailed = false;
    this.danmakuListStatus("loading");
  }
  danmakuListStatus(status) {
    this.danmaku_list_status.classList.toggle("status-loading", status === "loading");
    this.danmaku_list_status.classList.toggle("status-failed", status === "failed");
    this.danmaku_list_status.classList.toggle("status-empty", status === "empty");
    console.log("弹幕加载状态" + status);
  }
  initADE() {
    const $ = this.el.querySelector.bind(this.el);
    this.ade_panel = $(".mfunsPlayer-ade-panel"); // 高级弹幕编辑器面板(Advanced Danmaku Editor)
    this.ade_prebox = $(".mfunsPlayer-ade-prebox"); // 高级弹幕编辑框
    this.ade_clear = $(".mfunsPlayer-ade-clear"); // 高级弹幕编辑清除
    this.ade_preview = $(".mfunsPlayer-ade-preview"); // 高级弹幕编辑预览
    this.ade_emit = $(".mfunsPlayer-ade-emit"); // 高级弹幕发送
    this.ade_btn = $(".mfunsPlayer-ade-button"); // 高级弹幕面板按钮
    this.ade_exit_btn = $(".mfunsPlayer-ade-exit-button"); // 退出高级弹幕面板按钮

    this.ade_btn.addEventListener("click", this.showADE.bind(this));
    this.ade_exit_btn.addEventListener("click", this.hideADE.bind(this));
    this.ade_clear.addEventListener("click", () => {
      console.log("清空编辑框");
    });
    this.ade_preview.addEventListener("click", () => {
      console.log("高级弹幕预览");
    });
    this.ade_emit.addEventListener("click", () => {
      console.log("发送高级弹幕");
    });
  }
  showADE() {
    this.danmaku_list_panel.style["display"] = "none";
    this.ade_panel.style["display"] = "";
  }
  hideADE() {
    this.danmaku_list_panel.style["display"] = "";
    this.ade_panel.style["display"] = "none";
  }
}

export default DanmakuAuxiliary;
