import utils from "./utils";

export default class HighEnergy {
  constructor(player) {
    this.player = player;
    this.video = player.video;
    this.container = this.player.template.highEnergyBar;
    this.option = {};
    this.slice = 100;
    this.Xdata = utils.createArray(this.slice).map((el, index) => {
      return index + "";
    });
    this.Ydata = utils.createArray(this.slice).map(() => {
      return 0;
    });
    this.isShow = player.options.danmaku.showHighEnergy;
    window.echarts && this.init();
  }
  getData() {
    this.danmaku = this.player.danmaku.dan;
    const danSlice = this.video.duration / this.slice;
    this.Xdata.forEach((el, index) => {
      this.danmaku.forEach((dan) => {
        if (index * danSlice < +dan.time && +dan.time < (index + 1) * danSlice) {
          this.Ydata[index]++;
          // console.log("111111");
        }
      });
    });
    this.Ydata.forEach((el, index) => {
      this.Ydata[index] = Math.min(el + 15, 100);
    });
    console.log(this.Ydata);
  }
  init() {
    this.getData();
    this.highEnergyBar = window.echarts.init(this.container);

    this.option = {
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: this.Xdata,
          show: false,
        },
      ],
      yAxis: [
        {
          show: false,
          type: "value",
        },
      ],
      series: [
        {
          type: "line",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.3,
            color: "#f5f5f5",
          },
          emphasis: {
            focus: "series",
          },
          data: this.Ydata,
        },
      ],
    };
    this.highEnergyBar.setOption(this.option);
  }
  show() {
    this.container.classList.add("show");
    this.isShow = true;
  }
  hide() {
    this.container.classList.remove("show");
    this.isShow = false;
  }
  reload() {
    this.Ydata = utils.createArray(this.slice).map(() => {
      return 0;
    });
    this.getData();
    this.option.series[0].data = this.Ydata;
    console.log(this.option);
    this.highEnergyBar.setOption(this.option);
    this.resize();
  }
  resize() {
    this.highEnergyBar.resize();
  }
}
