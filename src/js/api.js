import axios from "axios";
import utils from "./utils";

export default {
  send: (options) => {
    axios
      .post(options.url, options.data)
      .then((response) => {
        const data = response.data;
        if (!data || data.code !== 0) {
          options.error && options.error(data && data.msg);
          return;
        }
        options.success && options.success(data);
      })
      .catch((e) => {
        console.error(e);
        options.error && options.error(e);
      });
  },
  read: (options) => {
    axios
      .get(options.url)
      .then((response) => {
        const data = response.data;
        if (!data) {
          options.error && options.error(data && data.msg);
          return;
        }
        if (options.type === "dplayerDanmaku") {
          options.success &&
            options.success(
              data.data.map((item) => ({
                time: item[0],
                mode: [1, 5, 4, 6][item[1]],
                color: item[2],
                author: item[3],
                text: item[4],
                size: utils.randomFontsize(100),  // 25
                date: 0
              }))
            );
        } else if (options.type === "oldAPI_advancedDanmaku") {
          // 此处为高级弹幕包裹信息
          options.success &&
            options.success(
              data.data.map((item) => {
                let a = JSON.parse(item)
                return {
                  time: a[0].start / 1000 || 0,
                  mode: 8,
                  author: "0",
                  text: item,
                  date: 0
                }
              })
            );
        } else {
          options.success && options.success(data);
        }
      })
      .catch((e) => {
        console.error(e);

        options.error && options.error(e);
      });
  },
};
