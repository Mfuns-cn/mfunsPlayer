import { LoadInfo, VideoInfo } from "@/types";

export interface PlayerHookMap {
  // --- 播放操作 --- //

  /** 开始播放视频 */
  play: void;
  /** 暂停播放视频 */
  pause: void;
  /** 切换上一个 */
  prev: void;
  /** 切换下一个 */
  next: void;
  /** 可切换到上一个视频 */
  hasPrev: void;
  /** 可切换到下一个视频 */
  hasNext: void;
  /** 跳转视频 */
  seek: void;

  // --- 加载 --- //
  /** 设置视频 */
  setVideo: VideoInfo;
  /** 加载视频 */
  loadVideo: LoadInfo;
  /** 切换视频 */
  switchVideo: LoadInfo;

  // --- 事件触发 --- //

  /** 取消活跃 */
  inactive: void;
  /** 视频播放完毕 */
  end: void;
}
