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
        switch (options.type) {
          case "dplayer-danmaku":
            // case:"mfuns-danmaku":
            options.success &&
              options.success(
                data.data.map((item) => ({
                  time: item[0],
                  type: utils.number2Type(item[1]),
                  color: item[2],
                  author: item[3],
                  text: item[4],
                  size: item[5] ?? 25,
                  date: item[6] ?? 0,
                  origin: options.origin ?? "unknown",
                }))
              );
            break;
          case "mfuns-advDanmaku-oldApi":
            // 此处为高级弹幕包裹信息
            options.success &&
              options.success(
                data.data.map((item) => {
                  let a = JSON.parse(item);
                  return {
                    time: a[0].start / 1000 || 0,
                    type: 9,
                    mode: 9,
                    author: "0",
                    text: item,
                    date: 0,
                  };
                })
              );
            break;
          case "bili-danmaku":
            const convertToDp = (xmlData) => {
              let dan = [];
              const xmlDoc = new DOMParser().parseFromString(xmlData, "text/xml");
              //获取xml文档的所有子节点
              const nodeList = xmlDoc.childNodes;
              const generate = (nodeList) => {
                for (let i = 0; i < nodeList.length; i++) {
                  const cur_node = nodeList[i];
                  if (cur_node?.attributes?.length && i > 0) {
                    const data = cur_node.attributes[0].nodeValue.split(",");
                    data.push(cur_node.innerHTML);
                    dan.push(data);
                  } else if (cur_node.childNodes.length > 0) {
                    generate(cur_node.childNodes);
                  }
                }
              };
              generate(nodeList);
              return dan.map((el) => {
                return [+el[0], +el[1], +el[3], el[6], el[8], +el[2], +el[4]];
              });
            };
            options.success &&
              options.success(
                convertToDp(data).map((item) => ({
                  time: item[0],
                  type: utils.number2Type(item[1], true),
                  color: item[2],
                  author: item[3],
                  text: item[4],
                  size: item[5] ?? 25,
                  date: item[6] ?? 0,
                  origin: "bili",
                }))
              );
            break;
          case "acfun-danmaku":
            break;
          default:
            options.success && options.success(data);
        }
      })
      .catch((e) => {
        console.error(e);

        options.error && options.error(e);
      });
  },
};
