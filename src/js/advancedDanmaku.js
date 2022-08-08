import utils from "./utils";
import { MfunsPosDanmaku } from "mfuns-pos-danmaku";


export default class AdvancedDanmaku {
  constructor(player, data) {
    this.player = player;
    this.data = data;
    this.posDanmaku = new MfunsPosDanmaku({
      container: this.player.template.advancedDanmaku,
      // 拉取弹幕列表
      getDanmaku: () => {
        return (data)
      },
      // 舞台基本尺寸, 可选
      stageSize: [1920, 1080]
    });
    this.player.on("danmaku_load_end", () => {
      this.posDanmaku.resize();
      this.posDanmaku.reload();
    })
  }
  play() {
    this.posDanmaku.play()
  }
  pause() {
    this.posDanmaku.pause()
  }
  seek() {
    this.posDanmaku.seek(this.player.video.currentTime * 1000)
  }
  load() {
    
  }
}
