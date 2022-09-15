# mfunsPlayer 弹幕播放器

自研的弹幕播放器，没啥优点，能用就行 Ծ‸Ծ
>播放器示例地址(施工ing,持续更新)  [https://mfuns-cn.github.io/mfunsPlayer](https://mfuns-cn.github.io/mfunsPlayer)

### 功能

-   主题色设置
-   视频的暂停/播放（快捷键 space）
-   可控进度条
-   全屏/退出全屏(快捷键 F)
-   弹幕展示(支持拓展 bilibili 格式弹幕)
-   弹幕屏蔽及属性控制(快捷键 D)
-   弹幕防挡字幕
-   弹幕举报/复制/撤回
-   发送弹幕(快捷键 Enter)
-   编辑弹幕/高级弹幕(支持换行符\n)
-   音量调节(快捷键 ↑ ↓)
-   一键静音(快捷键 M)
-   洗脑循环
-   快进快退(快捷键 ← →)
-   分 P 切集(快捷键 < >)
-   断点续播
-   关灯模式
-   镜像画面
-   高能进度条(需要自行引入 echarts.js)
-   倍速播放
-   画中画
-   小窗播放
-   视频滤镜
-   视频色彩调整
-   视频暂停展示活动弹窗(可恰饭或站内活动引导)

### 使用方法

1. 下载 dist/mfunsPlayer.min.umd.js 文件,使用 script 标签导入到 目标 html 中
2. npm 包

```
  npm install @mfuns/pc-player
```

-   如果需要编辑高级弹幕，请自行用 script 标签引入 ace.js
    cdn 引入地址:

    > 编辑器：[http://cdn.bootcss.com/ace/1.4.9/ace.js](http://cdn.bootcss.com/ace/1.4.9/ace.js)

    > 语言工具：[http://cdn.bootcss.com/ace/1.4.9/ext-language_tools.js](http://cdn.bootcss.com/ace/1.4.9/ext-language_tools.js)

### 配置代码示例

```js
import mfunsPlayer from "@mfuns/pc-player"
const container = document.querySelector(".content");
//初始化播放器
new mfunsPlayer({
  container, //容器dom
  uid:2333,//用户id
  theme: "#666", //主题色
  autoPlay: false, //自动播放
  autoSkip:true,//断点续播
  autoSwitch: true,//自动切集
  blackBorder: false, // 播放器黑边
  draggable: false, //进度条是否可拖拽
  hotkey: true, //是否启用快捷键
  volume: 0.7, //视频初始音量
  currentVideo: 0, //当前播放视频的下标
  smallWindow:true, //小窗播放
  widescreenSwitch: false, // 宽屏模式是否可用
  widescreen: false, // 宽屏模式
  video: [ //type:ObjectArray
    {
      url: "", //视频链接地址（必传）
      pic: "", //视频预览图链接地址（不传默认为视频第1帧）
      type: "mp4", //视频类型
      title: "", //视频标题（必传）
      danId: 100, //弹幕id(选传)
      advDanId:12,//高级弹幕id(选传)
      thumbnails:""//缩略图(选传)
      danmakuAddition: [  // 附加弹幕文件
        {
          url:"",
          type:""   // 弹幕数据的api处理类型 (不传默认为dplayer-danmaku)
        }
      ],
      lastPosition:56, //上次播放位置
    },
  ],
  //以下为选传配置
  danmaku: {
    api: "", //弹幕接口基准地址
    bottom: "0", //弹幕距离视频底部的距离
    showDanmaku: true, //初始化完成是否自动开启弹幕
    opacity: 0.7, //弹幕透明度(0.1 ~ 1)
    limitArea: 4, //弹幕区域(1.1/4  2.半屏  3.3/4屏  4.不重叠  5.不限 )
    fontScale: 1, //弹幕字体大小缩放(0.5 ~ 1.5)
    speed: 1,//弹幕速度(0.5, 0.75, 1, 1.25, 1.5)
    sensitivity:3.5, //弹幕tip灵敏度(建议 1~10之间 数值越大越灵敏)
    editor: 0, //弹幕样式面板类型，0为普通面板，1为全功能面板(不传默认为普通面板)
    danmakuCatch: false, //开启弹幕捕获模式，鼠标移至弹幕上可暂停该条弹幕移动并显示操作tip
    showHighEnergy: true,//是否显示高能进度条
    keepOutSubtitle:false,//防挡字幕
  },
  //高级弹幕
  advancedDanmaku: {
    api: "", //高级弹幕接口地址
    editor: true, //是否启用编辑器
  },
  //活动&广告
  activity:[
    {
    pic:"",//预览图
    link:""//链接
  },
  ]
  mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
});
```

### 事件绑定

播放器实例对象有on和off两个方法用于事件绑定和解除事件绑定
```js
const mp = new mfunsPlayer({})
const fn = (arg)=>{console.log(arg)}
mp.on("play",fn) //绑定视频play事件
mp.off("play",fn) //解除视频play事件绑定(解除事件绑定时不能使用匿名函数)
```
#### 视频事件

- abort
- canplay
- canplaythrough
- durationchange
- emptied
- ended
- error
- loadeddata
- loadedmetadata
- loadstart
- mozaudioavailable
- pause
- play
- playing
- progress
- ratechange
- seeked
- seeking
- stalled
- suspend
- timeupdate
- volumechange
- waiting

#### 播放器事件

- danmaku_show 
- danmaku_hide
- danmaku_clear
- danmaku_loaded
- danmaku_send
- danmaku_report
- contextmenu_show
- contextmenu_hide
- notice_show
- notice_hide
- toLogin
- destroy
- resize
- fullscreen
- fullscreen_cancel
- webfullscreen
- webfullscreen_cancel
- widescreen
- widescreen_cancel
- danmaku_load_start
- danmaku_load_end
- danmaku_load_failed
- darkmode_on
- darkmode_off
- danmaku_filter 
- setPlayer
- setDanmaku           
- update_video_position

     
