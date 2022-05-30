import Player from "../../template/player.art";
import utils from "./utils";
class Template {
  constructor(options) {
    this.container = options.container;
    if (options.theme) {
      document.getElementsByTagName("body")[0].style.setProperty("--themeColor", options.theme);
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--themeColorLight", utils.colorLuminance(options.theme, 0.3));
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--themeColorDark", utils.colorLuminance(options.theme, -0.3));
    }

    options.isFireFox = utils.isFirefox;
    this.init(options);
    this.buildVideo(options.blackBorder);
  }

  init(options) {
    this.container.innerHTML = Player(options); // 注入播放器DOM
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
    this.danmaku_btn = $(".mfunsPlayer-controller-danmaku-trigger"); // 弹幕开关
    this.danmakuSettings_btn = $(".mfunsPlayer-controller-danmaku-settings"); // 弹幕设置
    this.danmakuSettings_panel = $(".mfunsPlayer-danmaku-settings-mask");
    this.danmaku_filter_picker = $(".mfunsPlayer-danmaku-filter-picker"); // 类型屏蔽选择器
    this.danmaku_opacity_slider = $(".mfunsPlayer-danmaku-opacity-slider"); // 不透明度滑动条
    this.danmaku_opacity_value = $(".mfunsPlayer-danmaku-opacity-value"); // 不透明度显示
    this.danmaku_showarea_slider = $(".mfunsPlayer-danmaku-showarea-slider"); // 显示区域滑动条
    this.danmaku_showarea_value = $(".mfunsPlayer-danmaku-showarea-value"); // 显示区域显示
    this.danmaku_size_slider = $(".mfunsPlayer-danmaku-size-slider"); // 弹幕大小滑动条
    this.danmaku_size_value = $(".mfunsPlayer-danmaku-size-value"); // 弹幕大小显示
    this.danmaku_speed_slider = $(".mfunsPlayer-danmaku-speed-slider"); // 弹幕速度滑动条
    this.danmaku_speed_value = $(".mfunsPlayer-danmaku-speed-value"); // 弹幕速度显示

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
    this.next_btn = $(".mfunsPlayer-controller-next"); // 下一个按钮
    this.repeat_btn = $(".mfunsPlayer-controller-repeat"); // 洗脑循环按钮
    this.repeat_tip = $(".mfunsPlayer-controller-repeat .mfunsPlayer-controller-tip"); // 洗脑循环提示
    this.pagelistItem = $all(".mfunsPlayer-pagelist-item");
    this.volume_btn = $(".mfunsPlayer-controller-volume"); // 音量按钮
    this.volumeMask = $(".mfunsPlayer-controller-volume-mask");
    this.volumeBarWrap = $(".mfunsPlayer-controller-volume-wrap");
    this.volumeBar = $(".mfunsPlayer-controller-volume-bar");
    this.volumeNum = $(".mfunsPlayer-controller-volume-num");
    this.volumePercentage = $(".mfunsPlayer-controller-volume-percentage");
    this.volumeIcon = $(".mfunsPlayer-controller-volume-icon");
    this.widescreen_btn = $(".mfunsPlayer-controller-widescreen"); // 宽屏模式按钮
    this.widescreen_tip = $(".mfunsPlayer-controller-widescreen .mfunsPlayer-controller-tip"); // 宽屏模式提示
    this.webfull_btn = $(".mfunsPlayer-controller-webfull"); // 网页全屏按钮
    this.webfull_tip = $(".mfunsPlayer-controller-webfull .mfunsPlayer-controller-tip"); // 网页全屏提示
    this.fullscreen_btn = $(".mfunsPlayer-controller-fullscreen"); // 全屏按钮
    this.fullscreen_tip = $(".mfunsPlayer-controller-fullscreen .mfunsPlayer-controller-tip"); // 全屏提示
    this.browserFullButtonIcon = $(".mfunsPlayer-controller-full-icon");
    this.settings_btn = $(".mfunsPlayer-controller-settings");
    this.video_scale_picker = $(".mfunsPlayer-video-scale-picker"); // 视频比例选择器
    this.video_autoplay_switch = $(".mfunsPlayer-video-autoplay-switch"); // 自动开播开关
    this.video_nextpage_switch = $(".mfunsPlayer-video-nextpage-switch"); // 自动换P开关
    this.video_borderhidden_switch = $(".mfunsPlayer-video-borderhidden-switch"); // 隐藏黑边开关
    this.video_darkmode_switch = $(".mfunsPlayer-video-darkmode-switch"); // 夜间模式开关
    this.range = $(".range");
    this.play_btn = $(".mfunsPlayer-controller-play"); // 播放按钮
    this.controllerMask = $(".mfunsPlayer-controller-mask");
    this.controller = $(".mfunsPlayer-controller");
    this.controllerWrap = $(".mfunsPlayer-controller-wrap");
    this.footBar = $(".mfunsPlayer-footBar");
    this.loading = $(".mfunsPlayer-loading");
    this.loadingSpeed = $(".mfunsPlayer-loading-speed");
    this.load = $(".loader_box");
    this.pip_btn = $(".mfunsPlayer-controller-pip"); // 画中画按钮
    this.notice = $(".mfunsPlayer-notice");
    this.noticeText = $(".mfunsPlayer-notice-text");
    this.noticeTodo = $(".mfunsPlayer-notice-todo");
    this.noticeClose = $(".mfunsPlayer-notice-close");
    this.controllerTime = $(".mfunsPlayer-controller-time");
    this.time_label = $(".mfunsPlayer-controller-time-label");
    this.currentTime = $(".mfunsPlaye-video-currentTime");
    this.totalTime = $(".mfunsPlaye-video-totalTime");
    this.time_input = $(".mfunsPlayer-controller-time-input");
    this.headOfList = $(".headOfList");
    this.footOfList = $(".footOfList");
    this.closeList = $(".closeList_btn");
    // this.advancedDanmaku_btn = $(".advancedDanmaku_btn");
    // this.advancePre = $(".advanceDanmaku_pre_box");
    // this.ade_mask = $(".advanceDanmakuEditor_mask");
    // this.editor_clear = $(".editor_clear");
    // this.editor_preview = $(".editor_preview");
    // this.editor_emit = $(".editor_emit");
    // this.danmakuEditor = $(".danmakuEditor");
    this.danmakuEmit = $(".mfunsPlayer-danmaku-emit");
    this.danmakuText = $(".mfunsPlayer-danmaku-text");
    this.danmakuStyle_btn = $(".mfunsPlayer-controller-danmaku-style"); // 弹幕样式按钮
    this.danmaku_fontsize_picker = $(".mfunsPlayer-danmaku-fontsize-picker");
    this.danmaku_type_picker = $(".mfunsPlayer-danmaku-type-picker");
    this.danmaku_color_input = $(".mfunsPlayer-danmaku-color-input");
    this.danmaku_color_preview = $(".mfunsPlayer-danmaku-color-preview");
    this.danmaku_color_picker = $(".mfunsPlayer-danmaku-color-picker");
    this.infoPanel = $(".mfunsPlayer-info-panel");
    this.infoPanelClose = $(".mfunsPlayer-info-panel-close");
    this.infoVersion = $(".mfunsPlayer-info-panel-item-version .mfunsPlayer-info-panel-item-data");
    this.infoFPS = $(".mfunsPlayer-info-panel-item-fps .mfunsPlayer-info-panel-item-data");
    this.infoType = $(".mfunsPlayer-info-panel-item-type .mfunsPlayer-info-panel-item-data");
    this.infoUrl = $(".mfunsPlayer-info-panel-item-url .mfunsPlayer-info-panel-item-data");
    this.infoResolution = $(".mfunsPlayer-info-panel-item-resolution .mfunsPlayer-info-panel-item-data");
    this.infoDuration = $(".mfunsPlayer-info-panel-item-duration .mfunsPlayer-info-panel-item-data");
    this.infoDanmakuId = $(".mfunsPlayer-info-panel-item-danmaku-id .mfunsPlayer-info-panel-item-data");
    this.infoDanmakuApi = $(".mfunsPlayer-info-panel-item-danmaku-api .mfunsPlayer-info-panel-item-data");
    this.infoDanmakuAmount = $(".mfunsPlayer-info-panel-item-danmaku-amount .mfunsPlayer-info-panel-item-data");
    this.hotkeyPanel = $(".mfunsPlayer-hotkey-panel");
    this.hotkeyPanelClose = $(".mfunsPlayer-hotkey-panel-close");
    this.voice = $(".voice");
  }
  buildVideo(hasBlackborder) {
    if (!hasBlackborder) {
      this.videoMask.classList.add("noborder");
      this.bezel.classList.add("noborder");
    } else {
      this.videoMask.classList.remove("noborder");
      this.bezel.classList.remove("noborder");
    }
    this.videoWrap.style.height =
      ((this.container.clientWidth * 9) / 16 + (hasBlackborder ? 100 : 0)).toFixed(2) + "px";
  }
}
export default Template;
