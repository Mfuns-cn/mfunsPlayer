import utils from "./utils";
import { VList } from "./components/VList";

/** 弹幕列表
 *  
 * */

class DanmakuList {
  constructor(player, el, options = {}) {
    this.player = player;
    this.el = el;
    this.template = this.player.template;
    this.data = []
    this.init();
  }
  init() {
    const $ = this.el.querySelector.bind(this.el);
    this.template.danmaku_list_container = $(".mfunsPlayer-danmaku-list-container"); // 弹幕列表容器
    this.template.danmaku_list_status = $(".mfunsPlayer-danmaku-list-status"); // 弹幕列表状态

    this.list = new VList({
      el: this.template.danmaku_list_container,
      getData: () => { return this.data },
      itemHeight: 24,
      createItem: (danmaku, i) => {
        let tipText = danmaku.text;
        let listItem = document.createElement("div")
        listItem.className = "list-row"
        listItem.title = `${tipText}\n${
          danmaku.date ? utils.formatterDate(new Date(danmaku.date * 1000), "YYYY-MM-DD HH:mm:ss") : "-"
        } @ ${utils.secondToTime(danmaku.time, false)}`
        listItem.setAttribute("data-index", i)
        listItem.innerHTML = `
          <span class="list-cell col-time">${utils.secondToTime(
            danmaku.time,
            false
          )}</span><span class="list-cell col-text" ${
            danmaku.mode > 6 ? 'style="font-weight:600"' : ""
          }>${tipText}</span><span class="list-cell col-date">${
            danmaku.date ? utils.formatterDate(new Date(danmaku.date * 1000), "YYYY-MM-DD HH:mm:ss") : "-"
          }</span>`
        return listItem
      },
      overflow: 5
    })
    
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
    if (this.danmakuLoadingFailed) {
      this.setStatus("failed");
    } else if (!dan.length) {
      this.setStatus("empty");
    } else {
      this.data = dan
      this.list.reload()
      this.setStatus(true);
    }
  }
  clear() {
    this.list.clear()
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