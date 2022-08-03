import utils from "./utils";

/** 弹幕列表
 *  
 * */

class DanmakuList {
  constructor(player, el, options = {}) {
    this.player = player;
    this.el = el;
    this.template = this.player.template;
    this.init();
  }
  init() {
    const $ = this.el.querySelector.bind(this.el);
    this.template.danmaku_list_container = $(".mfunsPlayer-danmaku-list-container"); // 弹幕列表容器
    this.template.danmaku_list = $(".mfunsPlayer-danmaku-list"); // 弹幕列表
    this.template.danmaku_list_status = $(".mfunsPlayer-danmaku-list-status"); // 弹幕列表状态

    this.danmakuLoadingFailed = false;
    if (this.player.danmaku.loaded) {
      this.fill(this.player.danmaku.dan);
    } else {
      this.setStatus("loading");
    }
    this.player.on("danmaku_load_end", this.fill.bind(this));
    this.player.on("danmaku_load_start", this.clear.bind(this));
    this.player.on(
      "danmaku_load_failed",
      (() => {
        this.danmakuLoadingFailed = true;
      }).bind(this)
    );
  }
  fill(dan) {
    // 弹幕列表装填
    let danList = "";
    if (this.danmakuLoadingFailed) {
      this.setStatus("failed");
    } else if (!dan.length) {
      this.setStatus("empty");
    } else {
      dan.forEach((danmaku) => {
        let tipText = danmaku.text;
        if (danmaku.type == 9 || danmaku.type == "json") {
          tipText = tipText.replaceAll("\r", "");
          tipText = danmaku.text.length < 400 ? tipText : tipText.slice(0, 400) + "...";
        } else {
          tipText = tipText.replaceAll("\\", "\\\\");
        }
        let row = `
        <div class="list-row" title='${tipText}\n1970-01-01 00:00 @ ${utils.secondToTime(danmaku.time, false)}'>
          <span class="list-cell col-time">${utils.secondToTime(danmaku.time, false)}</span><span class="list-cell col-text" ${(danmaku.type == 9 || danmaku.type == "json") ? 'style="font-weight:600"' : ""}>${tipText}</span><span class="list-cell col-date">${"1970-01-01 00:00"}</span>
        </div>
        `;
        danList += row;
      });
      this.setStatus(true);
      this.template.danmaku_list.innerHTML = danList;
    }
  }
  clear() {
    this.template.danmaku_list.innerHTML = "";
    this.danmakuLoadingFailed = false;
    this.setStatus("loading");
  }
  setStatus(status) {
    this.template.danmaku_list_status.classList.toggle("status-loading", status === "loading");
    this.template.danmaku_list_status.classList.toggle("status-failed", status === "failed");
    this.template.danmaku_list_status.classList.toggle("status-empty", status === "empty");
    console.log("弹幕加载状态" + status);
  }
}

export default DanmakuList