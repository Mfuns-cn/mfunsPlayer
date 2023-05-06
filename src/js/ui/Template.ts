import MfunsPlayer from "@/player";
import { colorLuminance } from "@/utils";
import { html, render } from "lit-html";
import { classPrefix } from "@/const";
import { PlayerOptions } from "@/types";

const template = () => html`
  <div class="${classPrefix}">
    <div class="${classPrefix}-main">
      <div class="${classPrefix}-video-area">
        <div class="${classPrefix}-video-wrap">
          <video class="${classPrefix}-video"></video>
        </div>
        <div class="${classPrefix}-advanced-danmaku"></div>
        <div class="${classPrefix}-danmaku"></div>
        <div class="${classPrefix}-toast"></div>
        <div class="${classPrefix}-status-volume"></div>
        <div class="${classPrefix}-status-pause"></div>
        <div class="${classPrefix}-modal-wrap"></div>
      </div>
      <div class="${classPrefix}-head-wrap"></div>
      <div class="${classPrefix}-controller-wrap"></div>
      <div class="${classPrefix}-side"></div>
      <div class="${classPrefix}-footbar"></div>
      <div class="${classPrefix}-miniplayer">
        <div class="${classPrefix}-miniplayer-content"></div>
      </div>
    </div>
  </div>
`;

class Template {
  /** 播放器容器 */
  container: HTMLElement;
  /** 播放器主体元素 */
  el!: HTMLElement;
  // 播放器部件
  $main!: HTMLElement;
  $video!: HTMLVideoElement;
  $videoArea!: HTMLElement;
  $videoWrap!: HTMLElement;
  $advancedDanmaku!: HTMLElement;
  $danmaku!: HTMLElement;
  $toast!: HTMLElement;
  $statusVolume!: HTMLElement;
  $statusPause!: HTMLElement;
  $headWrap!: HTMLElement;
  $controllerWrap!: HTMLElement;
  $side!: HTMLElement;
  $footbar!: HTMLElement;
  $miniplayer!: HTMLElement;
  /** 主题色 */
  themeColor!: string;
  /** 绑定了主题变量的DOM元素 */
  private themeElement: HTMLElement[];
  constructor(
    player: MfunsPlayer,
    options: PlayerOptions
  ) {
    this.container = player.container;
    this.themeColor = options.themeColor;
    this.themeColor && this.setThemeColor(options.themeColor);
    this.themeElement = [this.container];
    this.init();
  }
  /** 初始化模板绑定 */
  private init() {
    render(template(), this.container);
    const $ = this.container.querySelector.bind(this.container);
    this.el = $(`.${classPrefix}`)!;
    this.$main = $(`.${classPrefix}-main`)!;
    this.$video = $(`.${classPrefix}-video`)!;
    this.$videoArea = $(`.${classPrefix}-video-area`)!;
    this.$videoWrap = $(`.${classPrefix}-video-wrap`)!;
    this.$advancedDanmaku = $(`.${classPrefix}-video-advanced-danmaku`)!;
    this.$danmaku = $(`.${classPrefix}-video-danmaku`)!;
    this.$toast = $(`.${classPrefix}-video-toast`)!;
    this.$statusVolume = $(`.${classPrefix}-video-status-volume`)!;
    this.$statusPause = $(`.${classPrefix}-video-status-pause`)!;
    this.$headWrap = $(`.${classPrefix}-head-wrap`)!
    this.$controllerWrap = $(`.${classPrefix}-controller-wrap`)!
    this.$side = $(`.${classPrefix}-side`)!
    this.$footbar = $(`.${classPrefix}-footbar`)!
    this.$miniplayer = $(`.${classPrefix}-miniplayer`)!
  }
  /** 为元素绑定主题变量 */
  public addThemeElement(el: HTMLElement) {
    this.themeElement.push(el);
    this.applyThemeColorVar(el, this.themeColor);
  }
  /** 设置主题色 */
  public setThemeColor(color: string) {
    this.themeColor = color;
    this.themeElement.forEach((el) => {
      this.applyThemeColorVar(el, color);
    });
  }
  /** 为元素设置主题色变量 */
  private applyThemeColorVar(el: HTMLElement, color: string) {
    el.style.setProperty("--theme-color", color);
    el.style.setProperty("--theme-color-light", colorLuminance(color, 0.3));
    el.style.setProperty("--theme-color-dark", colorLuminance(color, -0.3));
  }
}
export default Template;
