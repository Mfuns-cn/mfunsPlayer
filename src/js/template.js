import Player from "../../template/player.art";
import utils from "./utils";
class Template {
  constructor(options) {
    this.container = options.container;
    if (options.theme) {
      this.container.style.setProperty("--themeColor", options.theme);
      this.container.style.setProperty("--themeColorLight", utils.colorLuminance(options.theme, 0.3));
      this.container.style.setProperty("--themeColorDark", utils.colorLuminance(options.theme, -0.3));
    }

    options.isFireFox = utils.isFirefox;

    this.init(options);
    this.initHitokoto(options);
  }

  init(options) {
    this.container.innerHTML = Player(options); // 注入播放器DOM
    const $ = this.container.querySelector.bind(this.container);
    const $all = this.container.querySelectorAll.bind(this.container);
    this.mask = $(".mfunsPlayer-mask");
    this.previewMask = $(".mfunsPlayer-preview-mask");
    this.canvas = $(".mfuns_canvas");
    this.video = $(".mfunsPlayer-video");
    this.videoMask = $(".mfunsPlayer-video-mask");
    this.videoWrap = $(".mfunsPlayer-video-wrap");
    this.activityMask = $(".mfunsPlayer-activity-mask");
    this.activity = $(".mfunsPlayer-activity");
    this.activityClose = $(".mfunsPlayer-activity-close");
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
    this.advancedDanmaku = $(".mfunsPlayer-advanced-danmaku");

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
    this.video_autoplay_switch = $(".mfunsPlayer-video-autoPlay-switch"); // 自动开播开关
    this.video_nextpage_switch = $(".mfunsPlayer-video-nextpage-switch"); // 自动换P开关
    this.video_autoSkip_switch = $(".mfunsPlayer-video-autoSkip-switch"); // 自动开播开关
    this.video_borderhidden_switch = $(".mfunsPlayer-video-borderhidden-switch"); // 隐藏黑边开关
    this.video_darkmode_switch = $(".mfunsPlayer-video-darkmode-switch"); // 夜间模式开关
    this.video_mirror_switch = $(".mfunsPlayer-video-mirror-switch"); // 镜像开关
    this.video_color_mask = $(".mfunsPlayer-video-color-mask");
    this.video_color_close = $(".mfunsPlayer-video-color-close");
    this.video_brightness_slider = $(".mfunsPlayer-video-brightness-slider"); //亮度
    this.video_brightness_value = $(".mfunsPlayer-video-brightness-value");
    this.video_contrast_slider = $(".mfunsPlayer-video-contrast-slider"); //对比度
    this.video_contrast_value = $(".mfunsPlayer-video-contrast-value");
    this.video_saturate_slider = $(".mfunsPlayer-video-saturate-slider"); //饱和度
    this.video_saturate_value = $(".mfunsPlayer-video-saturate-value");
    this.video_color_reset = $(".mfunsPlayer-video-color-reset");
    this.video_filter_picker = $(".mfunsPlayer-video-filter-picker");
    this.range = $(".range");
    this.play_btn = $(".mfunsPlayer-controller-play"); // 播放按钮
    this.highEnergyBar = $(".mfunsPlayer-highEnergy-bar");
    this.controllerMask = $(".mfunsPlayer-controller-mask");
    this.controller = $(".mfunsPlayer-controller");
    this.controllerWrap = $(".mfunsPlayer-controller-wrap");
    this.footBar = $(".mfunsPlayer-footBar");
    this.loading = $(".mfunsPlayer-loading-tip");
    this.loadingSpeed = $(".mfunsPlayer-loading-speed");
    this.hitokoto = $(".mfunsPlayer-loading-hitokoto");
    this.hitokotoText = $(".mfunsPlayer-loading-hitokoto-text");
    this.hitokotoFrom = $(".mfunsPlayer-loading-hitokoto-from");
    this.pip_btn = $(".mfunsPlayer-controller-pip"); // 画中画按钮
    this.playerTip = $(".mfunsPlayer-tip-container");
    this.notice = $(".mfunsPlayer-notice");
    this.noticeText = $(".mfunsPlayer-notice-text");
    this.noticeTodo = $(".mfunsPlayer-notice-todo");
    this.noticeClose = $(".mfunsPlayer-notice-close");
    this.skip = $(".mfunsPlayer-skip");
    this.skipText = $(".mfunsPlayer-skip-text");
    this.skipLink = $(".mfunsPlayer-skip-link");
    this.skipClose = $(".mfunsPlayer-skip-close");
    this.playerLoad = $(".mfunsPlayer-player-load-status");
    this.videoLoad = $(".mfunsPlayer-video-load-status");
    this.danmakuLoad = $(".mfunsPlayer-danmaku-load-status");
    this.loadMask = $(".mfunsPlayer-load-mask");
    this.controllerTime = $(".mfunsPlayer-controller-time");
    this.time_label = $(".mfunsPlayer-controller-time-label");
    this.currentTime = $(".mfunsPlaye-video-currentTime");
    this.totalTime = $(".mfunsPlaye-video-totalTime");
    this.time_input = $(".mfunsPlayer-controller-time-input");
    this.toLogin = $(".mfunsPlayer-toLogin");
    this.danmakuTipMask = $(".mfunsPlayer-danmaku-item-tip-mask");
    this.danmakuTipBox = $(".mfunsPlayer-danmaku-item-tip-box");
    this.danmakuTip = $(".mfunsPlayer-danmaku-item-tip");
    this.danmakuPraise = $(".mfunsPlayer-danmaku-item-tip-praise");
    this.danmakuCancel = $(".mfunsPlayer-danmaku-item-tip-cancel");
    this.danmakuCopy = $(".mfunsPlayer-danmaku-item-tip-copy");
    this.danmakuReport = $(".mfunsPlayer-danmaku-item-tip-report");
    this.danmakuReportMask = $(".mfunsPlayer-danmaku-report-mask");
    this.danmakuReportContent = $(".mfunsPlayer-danmaku-report-content");
    this.danmakuReportModelClose = $(".mfunsPlayer-danmaku-report-close");
    this.danmakuEmit = $(".mfunsPlayer-danmaku-emit");
    this.danmakuText = $(".mfunsPlayer-danmaku-text");
    this.danmakuStatusLoading = $(".mfunsPlayer-danmaku-status-loading");
    this.danmakuStyle_btn = $(".mfunsPlayer-controller-danmaku-style"); // 弹幕样式按钮
    this.danmaku_fontsize_picker = $(".mfunsPlayer-danmaku-fontsize-picker");
    this.danmaku_mode_picker = $(".mfunsPlayer-danmaku-mode-picker");
    this.danmaku_color_input = $(".mfunsPlayer-danmaku-color-input");
    this.danmaku_color_preview = $(".mfunsPlayer-danmaku-color-preview");
    this.danmaku_color_picker = $(".mfunsPlayer-danmaku-color-picker");
    this.danmaku_catch_switch = $(".mfunsPlayer-danmaku-catch-switch");
    this.danmaku_highEnergy_switch = $(".mfunsPlayer-danmaku-highEnergy-switch");
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
    this.voice = $(".mfunsPlayer-voice");
    this.voiceValue = $(".mfunsPlayer-voice-value");
  }
  initHitokoto(options) {
    this.hitokotoText.innerHTML = "loading...";
    this.hitokotoFrom.innerHTML = "";
    options.apiBackend.read({
      url: "http://v1.hitokoto.cn?c=a&c=b&c=c",
      success: (res) => {
        this.hitokotoText.innerHTML = res.hitokoto;
        this.hitokotoFrom.innerHTML = `———— 「${res.from}」${res.from_who ?? ""}`;
      },
      error: (err) => {
        console.log(err);
      },
    });
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
