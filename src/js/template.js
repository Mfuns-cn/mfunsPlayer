import Player from "../../template/player.art";
import DanmakuAuxiliary from "../../template/danmakuAuxiliary.art";
import utils from "./utils";
class Template {
  constructor(options) {
    this.container = options.container;
    this.danmakuAuxiliary = options.danmaku.auxiliary;
    options.isFireFox = utils.isFirefox;
    this.init(options);
    if (!options.blackBorder) {
      this.videoMask.style.height = "100%";
      this.bezel.style.bottom = "50px";
    }
    this.videoWrap.style.height =
      ((this.videoWrap.clientWidth * 9) / 16 + (options.blackBorder ? 100 : 0)).toFixed(2) + "px";
  }
  init(options) {
    this.container.innerHTML = Player(options);   // 注入播放器DOM
    const $ = this.container.querySelector.bind(this.container);
    const $all = this.container.querySelectorAll.bind(this.container);
    this.mask = $(".mfunsPlayer-mask");
    this.canvas = $(".mfuns_canvas");
    this.video = $(".mfunsPlayer-video");
    this.videoMask = $(".mfunsPlayer-video-mask");
    this.videoWrap = $(".mfunsPlayer-video-wrap");
    this.emit = $(".emit");
    this.fullButton = $(".mfunsPlayer-controller-fullButton");
    this.danmakuRoot = $(".mfunsPlayer-video-danmaku-root");
    this.menu = $(".mfunsPlayer-menu");
    this.menuItem = $all(".mfunsPlayer-menu-item");
    this.danmaku = $(".mfunsPlayer-danmaku");
    this.danmakuCount = $(".mfunsPlayer-video-danmaku-count");
    this.danmaku_btn = $(".mfunsPlayer-controller-danmaku-trigger");        // 弹幕开关
    this.danmakuSettings_btn = $(".mfunsPlayer-controller-danmaku-settings");     // 弹幕设置
    this.danmakuSettings_panel = $(".mfunsPlayer-danmaku-settings-mask");
    this.danmaku_filter_picker = $(".mfunsPlayer-danmaku-filter-picker");     // 类型屏蔽选择器
    this.danmaku_opacity_slider = $(".mfunsPlayer-danmaku-opacity-slider")    // 不透明度滑动条
    this.danmaku_opacity_value = $(".mfunsPlayer-danmaku-opacity-value")      // 不透明度显示
    this.danmaku_showarea_slider = $(".mfunsPlayer-danmaku-showarea-slider")  // 显示区域滑动条
    this.danmaku_showarea_value = $(".mfunsPlayer-danmaku-showarea-value")     // 显示区域显示
    this.text = $(".mfunsPlayer-danmaku-text");
    this.headBar = $(".mfunsPlayer-headBar");
    this.headTitle = $(".mfunsPlayer-headBar-title");
    this.barWrap = $(".mfunsPlayer-bar-wrap");
    this.bar = $(".mfunsPlayer-bar");
    this.playedBar = $(".mfunsPlayer-playedBar");
    this.bufferedBar = $(".mfunsPlayer-bufferedBar");
    this.thumb = $(".mfunsPlayer-thumb");
    this.barTime = $(".mfunsPlayer-barTime");
    this.bezel = $(".mfunsPlayer-bezel");
    this.tipItem = $all(".mfunsPlayer-controller-tip");
    this.speedInfo = $(".mfunsPlayer-speed-info");
    this.speedItem = $all(".mfunsPlayer-speed-item");
    this.next_btn = $(".mfunsPlayer-controller-next");  // 下一个按钮
    this.repeat_btn = $(".mfunsPlayer-controller-repeat");  // 洗脑循环按钮
    this.repeat_tip = $(".mfunsPlayer-controller-repeat .mfunsPlayer-controller-tip");  // 洗脑循环提示
    this.pagelistItem = $all(".mfunsPlayer-pagelist-item");
    this.volume_btn = $(".mfunsPlayer-controller-volume");  // 音量按钮
    this.volumeMask = $(".mfunsPlayer-controller-volume-mask");
    this.volumeBarWrap = $(".mfunsPlayer-controller-volume-wrap");
    this.volumeBar = $(".mfunsPlayer-controller-volume-bar");
    this.volumeNum = $(".mfunsPlayer-controller-volume-num");
    this.volumePercentage = $(".mfunsPlayer-controller-volume-percentage");
    this.volumeIcon = $(".mfunsPlayer-controller-volume-icon");
    this.webfull_btn = $(".mfunsPlayer-controller-webfull");  // 网页全屏按钮
    this.webfull_tip = $(".mfunsPlayer-controller-webfull .mfunsPlayer-controller-tip");  // 网页全屏提示
    this.fullscreen_btn = $(".mfunsPlayer-controller-fullscreen"); // 全屏按钮
    this.fullscreen_tip = $(".mfunsPlayer-controller-fullscreen .mfunsPlayer-controller-tip");  // 全屏提示
    this.browserFullButtonIcon = $(".mfunsPlayer-controller-full-icon");
    this.settings_btn = $(".mfunsPlayer-controller-settings")
    this.video_scale_picker = $(".mfunsPlayer-video-scale-picker")  // 视频比例选择器
    this.video_borderhidden_switch = $(".mfunsPlayer-video-borderhidden-switch")  // 隐藏黑边开关
    this.video_nextpage_switch = $(".mfunsPlayer-video-nextpage-switch")  // 自动换P开关
    // this.switch_btn = $(".switch");
    this.range = $(".range");
    this.play_btn = $(".mfunsPlayer-controller-play");  // 播放按钮
    this.controllerMask = $(".mfunsPlayer-controller-mask");
    this.controller = $(".mfunsPlayer-controller");
    this.controllerWrap = $(".mfunsPlayer-controller-wrap");
    this.footBar = $(".mfunsPlayer-footBar");
    this.loading = $(".mfunsPlayer-loading");
    this.load = $(".loader_box");
    this.pip_btn = $(".mfunsPlayer-controller-pip");  // 画中画按钮
    this.notice = $(".mfunsPlayer-notice");
    this.controllerTime = $(".mfunsPlayer-controller-time");
    this.time_label = $(".mfunsPlayer-controller-time-label");
    this.currentTime = $(".currentTime");
    this.total = $(".total");
    this.time_input = $(".mfunsPlayer-controller-time-input");
    this.headOfList = $(".headOfList");
    this.footOfList = $(".footOfList");
    this.closeList = $(".closeList_btn");
    this.advancedDanmaku_btn = $(".advancedDanmaku_btn");
    this.advancePre = $(".advanceDanmaku_pre_box");
    this.ade_mask = $(".advanceDanmakuEditor_mask");
    this.editor_clear = $(".editor_clear");
    this.editor_preview = $(".editor_preview");
    this.editor_emit = $(".editor_emit");
    this.danmakuEditor = $(".danmakuEditor");
    this.danmakuStyle_btn = $(".mfunsPlayer-controller-danmaku-style");  // 弹幕样式按钮
    this.danmaku_fontsize_picker = $(".mfunsPlayer-danmaku-fontsize-picker");
    this.danmaku_type_picker = $(".mfunsPlayer-danmaku-type-picker");
    this.danmaku_color_input = $(".mfunsPlayer-danmaku-color-input");
    this.danmaku_color_preview = $(".mfunsPlayer-danmaku-color-preview");
    this.danmaku_color_picker = $(".mfunsPlayer-danmaku-color-picker");
    this.voice = $(".voice");
    if (this.danmakuAuxiliary) {
      this.danmakuAuxiliary.classList.add("mfunsPlayer-danmaku-auxiliary")
      this.danmakuAuxiliary.innerHTML = DanmakuAuxiliary(options)  // 注入弹幕功能区DOM
      this.danmaku_list_panel = this.danmakuAuxiliary.querySelector(".mfunsPlayer-danmaku-list-panel")  // 弹幕列表面板
      this.danmaku_list_container = this.danmakuAuxiliary.querySelector(".mfunsPlayer-danmaku-list-container") // 弹幕列表容器
      this.danmaku_list = this.danmakuAuxiliary.querySelector(".mfunsPlayer-danmaku-list")    // 弹幕列表
      this.ade_panel = this.danmakuAuxiliary.querySelector(".mfunsPlayer-ade-panel")              // 高级弹幕编辑器面板(Advanced Danmaku Editor)
      this.ade_prebox = this.danmakuAuxiliary.querySelector(".mfunsPlayer-ade-prebox")         // 高级弹幕编辑框
      this.ade_clear = this.danmakuAuxiliary.querySelector(".mfunsPlayer-ade-clear")          // 高级弹幕编辑清除
      this.ade_preview = this.danmakuAuxiliary.querySelector(".mfunsPlayer-ade-preview")        // 高级弹幕编辑预览
      this.ade_emit = this.danmakuAuxiliary.querySelector(".mfunsPlayer-ade-emit")           // 高级弹幕发送
      this.ade_btn = this.danmakuAuxiliary.querySelector(".mfunsPlayer-ade-button")           // 高级弹幕面板按钮
      this.ade_exit_btn = this.danmakuAuxiliary.querySelector(".mfunsPlayer-ade-exit-button") // 退出高级弹幕面板按钮
    };
  }
}
export default Template;
