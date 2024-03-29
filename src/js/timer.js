import utils from "./utils";
class Timer {
  constructor(player) {
    this.player = player;

    window.requestAnimationFrame = (() =>
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      })();

    this.types = ["loading", "info", "fps", "download"];

    this.init();
  }

  init() {
    this.types.map((item) => {
      if (item !== "fps") {
        this[`init${item}Checker`]();
      }
      return item;
    });
  }

  initloadingChecker() {
    let lastPlayPos = 0;
    let currentPlayPos = 0;
    let bufferingDetected = false;
    this.loadingChecker = setInterval(() => {
      if (this.enableloadingChecker && !this.player.video.paused) {
        // whether the video is buffering
        currentPlayPos = this.player.video.currentTime;
        // console.log(currentPlayPos, lastPlayPos);
        if (!bufferingDetected && currentPlayPos === lastPlayPos) {
          this.enabledownloadChecker = utils.isChrome;
          this.player.template.loading.classList.add("show");
          this.player.container.classList.add("mfunsPlayer-loading");
          this.player.danmaku && this.player.danmaku.pause();
          bufferingDetected = true;
        }
        if (bufferingDetected && currentPlayPos > lastPlayPos) {
          this.enabledownloadChecker = false;
          this.player.template.loading.classList.remove("show");
          this.player.container.classList.remove("mfunsPlayer-loading");
          this.player.danmaku && this.player.danmaku.play();
          bufferingDetected = false;
        }
        lastPlayPos = currentPlayPos;
      }
    }, 100);
  }

  initfpsChecker() {
    window.requestAnimationFrame(() => {
      if (this.enablefpsChecker) {
        this.initfpsChecker();
        if (!this.fpsStart) {
          this.fpsStart = new Date();
          this.fpsIndex = 0;
        } else {
          this.fpsIndex++;
          const fpsCurrent = new Date();
          if (fpsCurrent - this.fpsStart > 1000) {
            this.player.infoPanel.fps((this.fpsIndex / (fpsCurrent - this.fpsStart)) * 1000);
            this.fpsStart = new Date();
            this.fpsIndex = 0;
          }
        }
      } else {
        this.fpsStart = 0;
        this.fpsIndex = 0;
      }
    });
  }

  initinfoChecker() {
    this.infoChecker = setInterval(() => {
      if (this.enableinfoChecker) {
        this.player.infoPanel.update();
      }
    }, 1000);
  }
  initdownloadChecker() {
    let lastPlayerLoaded = 0;
    let currentPlayerLoaded = 0;
    this.downloadChecker = setInterval(() => {
      if (this.enabledownloadChecker) {
        const { webkitVideoDecodedByteCount: videoLoaded, webkitAudioDecodedByteCount: audioLoaded } =
          this.player.video;
        currentPlayerLoaded = videoLoaded + audioLoaded;
        const downlaodSpeed = parseInt(Math.max(currentPlayerLoaded - lastPlayerLoaded, 0) / 1024);
        this.player.template.loadingSpeed.innerHTML = `${
          downlaodSpeed > 1000 ? (downlaodSpeed / 1024).toFixed(2) + "MB/s" : downlaodSpeed + "KB/s"
        } `;
        lastPlayerLoaded = currentPlayerLoaded;
      }
    }, 500);
  }
  enable(type) {
    this[`enable${type}Checker`] = true;
    if (type === "fps") {
      this.initfpsChecker();
    }
  }

  disable(type) {
    this[`enable${type}Checker`] = false;
  }

  destroy() {
    this.types.map((item) => {
      this[`enable${item}Checker`] = false;
      this[`${item}Checker`] && clearInterval(this[`${item}Checker`]);
      return item;
    });
  }
}

export default Timer;
