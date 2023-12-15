# mfuns-player 弹幕播放器

可插件化配置的播放器。


### 使用方法

待补充


### 配置选项
⚠️ 注意：播放器实例化过程会操作部分 DOM，请务必在页面加载完成后（window.onload(原生 JS)，mounted(Vue)，componentDidMount(React)）进行实例化操作，否则部分功能会出现问题



```js
import mfunsPlayer from "@mfuns/pc-player"
const container = document.querySelector(".content");
//初始化播放器
window.onload = function(){
 new mfunsPlayer({
  container, // 容器
  theme: {  // 主题色
    primaryColor: "#666"
  }, 
  autoPlay: false, //自动播放
  autoSkip:true,  //断点续播
  autoPart: true, //自动切P
  blackBorder: false, // 播放器黑边
  volume: 0.7, // 视频初始音量
  video: {
    /** 分P视频配置 */
    list: [
    {
      url: "", //视频链接地址
      type: "mp4", //视频类型
      title: "", //视频标题
      danmakuId: 100, //弹幕id
      danmakuAddition: [  // 附加弹幕文件
        {
          url: "",
          type: ""   // 弹幕数据格式 
        }
      ],
    },
  ]},
});
}
```
更多配置详见各插件的PlayerOptions接口。