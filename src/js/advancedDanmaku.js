import utils from "./utils";
import { MFADE } from "mf-ade";
export default class AdvancedDanmaku {
  constructor(player, data) {
    this.player = player;
    this.data = data;
    this.load();
  }
  load() {
    console.log(this.data);
  }
}
