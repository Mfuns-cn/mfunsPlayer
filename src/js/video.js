import utils from "./utils";
export function getVideoTime(tem) {
  let max = parseInt(tem.video.duration);
  tem.currentTime.innerText = "00:00";
  tem.total.innerText = utils.secondToTime(max) || "00:00";
  if (isNaN(max)) {
    setTimeout(function () {
      getVideoTime(tem);
    }, 100);
  } else {
    return;
  }
}
