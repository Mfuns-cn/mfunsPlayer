import { Slider, Picker } from "./components";
export default class VideoColor {
  constructor(player) {
    this.player = player;
    this.video = player.video;
    this.filter = {
      brightness: 1,
      saturate: 1,
      contrast: 1,
    };
    this.initBrightness();
    this.initSaturate();
    this.initContrast();
    this.player.template.video_color_mask.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this.player.template.video_color_close.addEventListener("click", () => {
      this.hide();
    });
    this.player.template.video_color_reset.addEventListener("click", (e) => {
      this.reset();
    });
    this.videoFilterPicker = new Picker(this.player.template.video_filter_picker, "none", {
      pick: (value) => {
        const { saturate, contrast, brightness } = this.filter;
        this.player.video.style.filter =
          value || `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
      },
    });
  }
  initBrightness() {
    // 视频亮度调节
    this.brightnessSlider = new Slider(
      this.player.template.video_brightness_slider,
      0,
      250,
      1,
      this.filter.brightness * 100,
      {
        start() {},
        update(value, flag) {},
        change: (value) => {
          const { saturate, contrast } = this.filter;
          this.filter.brightness = value / 100;
          this.player.template.video_brightness_value.innerText = value + "%";
          this.player.video.style.filter = `brightness(${value / 100}) contrast(${contrast}) saturate(${saturate})`;
        },
        end() {
          // 结束滑动条调节（松手）
        },
      }
    );
  }
  initSaturate() {
    // 视频饱和度调节
    this.saturateSlider = new Slider(
      this.player.template.video_saturate_slider,
      0,
      250,
      1,
      this.filter.saturate * 100,
      {
        start() {},
        update(value, flag) {},
        change: (value) => {
          const { brightness, contrast } = this.filter;
          this.filter.saturate = value / 100;
          this.player.template.video_saturate_value.innerText = value + "%";
          this.player.video.style.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${value / 100})`;
        },
        end() {
          // 结束滑动条调节（松手）
        },
      }
    );
  }
  initContrast() {
    // 视频对比度调节
    this.contrastSlider = new Slider(
      this.player.template.video_contrast_slider,
      0,
      250,
      1,
      this.filter.contrast * 100,
      {
        start() {},
        update(value, flag) {},
        change: (value) => {
          const { brightness, saturate } = this.filter;
          this.filter.contrast = value / 100;
          this.player.template.video_contrast_value.innerText = value + "%";
          this.player.video.style.filter = `brightness(${brightness}) contrast(${value / 100}) saturate(${saturate})`;
        },
        end() {
          // 结束滑动条调节（松手）
        },
      }
    );
  }
  reset() {
    this.saturateSlider.update(100);
    this.brightnessSlider.update(100);
    this.contrastSlider.update(100);
  }
  show() {
    this.player.template.video_color_mask.classList.add("show");
  }
  hide() {
    this.player.template.video_color_mask.classList.remove("show");
  }
  toggle() {
    if (this.player.template.video_color_mask.classList.contains("show")) this.hide();
    else this.show();
  }
}
