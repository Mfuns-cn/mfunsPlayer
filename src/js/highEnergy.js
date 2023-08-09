import utils from './utils';

export default class HighEnergy {
    constructor(player) {
        this.player = player;
        this.video = player.video;
        this.container = this.player.template.highEnergyBar;
        this.option = {};
        this.slice = 100;
        this.Xdata = utils.createArray(this.slice).map((el, index) => {
            return index + '';
        });
        this.Ydata = utils.createArray(this.slice).map(() => {
            return 0;
        });
        this.isShow = player.options.danmaku.showHighEnergy;
        if (window.echarts) this.init();
        else player.notice("Error: Can't find Echarts");
    }
    getData() {
        this.danmaku = this.player.danmaku.dan;
        const danSlice = this.video.duration / this.slice;
        this.Xdata.forEach((el, index) => {
            this.danmaku.forEach((dan) => {
                if (index * danSlice < +dan.time && +dan.time < (index + 1) * danSlice) {
                    this.Ydata[index]++;
                }
            });
        });
        const max = Math.max(...this.Ydata);
        const min = Math.min(...this.Ydata);
        const thorn = (max - min) / 5;
        console.log('单位弹幕量极值分别为：', max, min);
        this.Ydata.forEach((el, index) => {
            this.Ydata[index] = Math.max(thorn, el);
            if (Math.abs(this.Ydata[index + 1] - el) <= thorn && index !== this.Ydata.length - 1) {
                this.Ydata[index + 1] = parseInt((el + this.Ydata[index + 1]) / 2);
            }
        });
        console.log(this.Ydata);
    }
    init() {
        this.getData();
        const themeColor = this.player.template?.container.style.getPropertyValue('--themeColor');
        // console.log(utils.hex2Rgb(themeColor, 0.4));
        if (!this.highEnergyBar) {
            this.highEnergyBar = window.echarts.init(this.container);
        }

        this.option = {
            grid: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
            visualMap: {
                type: 'piecewise',
                show: false,
                dimension: 0,
                seriesIndex: 0,
                pieces: [
                    {
                        gt: 0,
                        lt: 0,
                        color: utils.hex2Rgb(themeColor, 0.4),
                    },
                    {
                        gt: 0,
                        lt: this.slice - 1,
                        color: 'rgba(245, 245, 245, 0.4)',
                    },
                ],
            },

            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: this.Xdata,
                    show: false,
                },
            ],
            yAxis: [
                {
                    show: false,
                    type: 'value',
                },
            ],
            series: [
                {
                    type: 'line',
                    smooth: 0.4,
                    lineStyle: {
                        width: 0,
                    },
                    showSymbol: false,
                    areaStyle: {
                        // opacity: 0.3,
                        // color: "#f5f5f5",
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: this.Ydata,
                },
            ],
        };
        this.highEnergyBar.setOption(this.option);
    }
    show() {
        this.container.classList.add('show');
        this.resize();
        this.isShow = true;
    }
    hide() {
        this.container.classList.remove('show');
        this.isShow = false;
    }
    update(rate) {
        if (isNaN(rate)) return;
        const percent = Math.floor(rate * this.slice);
        this.option.visualMap.pieces[0].lt = Math.min(percent, this.slice - 1);
        this.option.visualMap.pieces[1].gt = Math.min(percent, this.slice - 1);
        this.highEnergyBar.setOption(this.option);
        this.resize();
    }
    reload(rate) {
        this.Ydata = utils.createArray(this.slice).map(() => {
            return 0;
        });
        this.init();
        rate && this.update(rate);
        this.resize();
    }

    resize() {
        this.highEnergyBar.resize();
    }
}
