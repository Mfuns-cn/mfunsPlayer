import { LoadInfo, VideoInfo } from "@/types";

export interface PlayerHookMap {
  // --- 播放操作 --- //

  /** 开始播放视频 */
  play: void;
  /** 暂停播放视频 */
  pause: void;
  /** 跳转视频 */
  seek: void;

  /** 切换上一个 */
  prev: void;
  /** 切换下一个 */
  next: void;
  /** 视频播放完毕 */
  end: void;

  // --- 加载 --- //
  /** 设置视频 */
  "video.set": VideoInfo;
  /** 设置视频后到加载视频前 */
  "video.beforeLoad": Partial<LoadInfo>;
  /** 加载视频 */
  "video.load": LoadInfo;
}
