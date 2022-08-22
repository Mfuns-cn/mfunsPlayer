class InfoPanel {
  constructor(player) {
    this.container = player.template.infoPanel;
    this.template = player.template;
    this.video = player.video;
    this.player = player;
    this.template.playerLoad.innerHTML = "播放器初始化... [完成]";
    this.template.infoPanel.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this.template.infoPanelClose.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hide();
    });
  }

  show() {
    this.beginTime = Date.now();
    console.dir(this.player.video);
    this.update();
    this.player.timer.enable("info");
    this.player.timer.enable("fps");
    this.container.classList.remove("mfunsPlayer-info-panel-hide");
  }

  hide() {
    this.player.timer.disable("info");
    this.player.timer.disable("fps");
    this.container.classList.add("mfunsPlayer-info-panel-hide");
  }

  toggle() {
    if (this.container.classList.contains("mfunsPlayer-info-panel-hide")) {
      this.show();
    } else {
      this.hide();
    }
  }

  update() {
    const currentVideo = this.player.currentVideo;
    // this.template.infoVersion.innerHTML = `v${DPLAYER_VERSION} ${GIT_HASH}`;
    this.template.infoVersion.innerHTML = `v2.1.0`;

    this.template.infoType.innerHTML = this.player.options.video[currentVideo].type;
    this.template.infoUrl.innerHTML = this.player.options.video[currentVideo].url;
    this.template.infoResolution.innerHTML = `${this.player.video.videoWidth} x ${this.player.video.videoHeight}`;
    this.template.infoDuration.innerHTML = this.player.video.duration;

    if (this.player.options.danmaku) {
      this.template.infoDanmakuId.innerHTML = this.player.options.video[currentVideo].danId;
      this.template.infoDanmakuApi.innerHTML = this.player.options.danmaku.api;
      this.template.infoDanmakuAmount.innerHTML = this.player.danmaku.dan?.length;
    }
  }

  fps(value) {
    this.template.infoFPS.innerHTML = `${value.toFixed(1)}`;
  }
}

export default InfoPanel;
