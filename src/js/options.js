import defaultApiBackend from "./api.js";
import utils from "./utils.js";
export default (options) => {
  // default options
  const defaultOption = {
    container: options.element || document.getElementsByClassName("mfunsPlayer")[0],
    autoplay: false,
    autoSwitch: false,
    dragable: true,
    blackBorder: true,
    theme: "#b7daff",
    loop: false,
    hotkey: true,
    preload: "metadata",
    volume: 0.7,
    apiBackend: defaultApiBackend,
    video: {},
    contextmenu: [],
    mutex: true,
    pluginOptions: { hls: {}, flv: {}, dash: {}, webtorrent: {} },
    pickerColors: [
      "#FE0302",
      "#FFFF00",
      "#00CD00",
      "#00FF00",
      "#4E6EF2",
      "#89D5FF",
      "#7B7FF7",
      "#757575",
      "#FFFFFF",
      "#FB7229",
    ],
  };
  options = Object.assign(defaultOption, options);
  if (options.video) {
    !options.video.type && (options.video.type = "auto");
  }
  options.contextmenu = options.contextmenu.concat([
    {
      text: "视频统计信息",
      click: (player) => {},
    },

    {
      text: `mfunsPlayer v2.1.0`,
      link: "https://github.com/Mfuns-cn",
    },
  ]);
  return options;
};
