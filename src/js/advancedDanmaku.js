import utils from "./utils";
import { MfunsAdvancedDanmaku } from "mfuns-advanced-danmaku";


export default class AdvancedDanmaku {
  constructor(player, data) {
    this.player = player;
    this.data = data;
    this.engine = new MfunsAdvancedDanmaku({
      container: this.player.template.advancedDanmaku,
      // 拉取弹幕列表
      getDanmaku: () => {
        return (data)
      },
      // 舞台基本尺寸, 可选
      stageSize: [800, 450],
      // 弹幕舞台resize由播放器控制, 无需自动调整大小
      autoResize: false,
    });
    this.player.on("danmaku_load_end", () => {
      this.engine.resize();
      this.engine.reload();
    })
  }
  play() {
    this.engine.play()
  }
  pause() {
    this.engine.pause()
  }
  seek() {
    this.engine.seek(this.player.video.currentTime * 1000)
  }
  load() {
    
  }
  resize() {
    this.engine.resize()
  }
}
