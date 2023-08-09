import defaultApiBackend from './api.js';
import utils from './utils.js';
export default (options) => {
    // default options
    const defaultOption = {
        container: options.element || document.getElementsByClassName('mfunsPlayer')[0],
        autoPlay: false, // 自动播放
        autoSwitch: false, // 自动切P
        smallWindow: true, //小窗播放
        draggable: true,
        blackBorder: false, // 开启黑边
        theme: '#7b7ff7',
        loop: false, // 洗脑循环
        muted: false,
        hotkey: true, // 启用快捷键
        userIsLogged: false,
        widescreen: false, // 宽屏模式
        widescreenSwitch: false, // 可切换宽屏模式
        preload: 'metadata',
        volume: 0.7,
        currentVideo: 0,
        apiBackend: defaultApiBackend,
        video: [],

        contextmenu: [],
        mutex: true,
        activity: [],
        callback: {},
        pluginOptions: { hls: {}, flv: {}, dash: {}, webtorrent: {} },
        pickerColors: ['#FE0302', '#FFFF00', '#00CD00', '#00FF00', '#4E6EF2', '#89D5FF', '#7B7FF7', '#757575', '#FFFFFF', '#FB7229'],
    };
    options = Object.assign(defaultOption, options);
    if (options.danmaku) {
        options.danmaku = Object.assign(
            {
                api: '',
                margin: 5,
                opacity: 1,
                shields: [],
                limitArea: 4,
                fontScale: 1,
                speed: 1,
                editor: 1,
                sensitivity: 3,
                danmakuCatch: true,
                showHighEnergy: true,
                keepOutSubtitle: false,
                showDanmaku: true,
            },
            options.danmaku || {}
        );
    }
    options.contextmenu = options.contextmenu.concat([
        {
            text: '视频统计信息',
            click: (player) => {
                player.infoPanel.toggle();
            },
        },
        {
            text: '视频色彩调节',
            click: (player) => {
                player.videoColor.toggle();
            },
        },
        {
            text: '快捷键说明',
            click: (player) => {
                player.hotkey.toggle();
            },
        },
        {
            text: `mfunsPlayer v${MFUNSPLAYER_VERSION}`,
            click: (player) => {
                player.playerInfo.toggle();
            },
        },
    ]);
    return options;
};
