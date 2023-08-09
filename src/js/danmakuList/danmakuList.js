import utils from '../utils';
import { VList } from '../components/VList';
import DanmakuListItem from './danmakuListItem';

/** 弹幕列表
 *
 * */

class DanmakuList {
    constructor(player, el, options = {}) {
        this.player = player;
        this.el = el;
        this.template = this.player.template;
        this.data = []; // 源数据
        this.listData = []; // 列表数据
        this.sortedBy = 'time'; // 排序方式
        this.sortReverse = false; // 倒序(从大到小排列)
        this.typeFilter = new Set(); // 类型屏蔽
        this.originFilter = new Set(); // 来源屏蔽
        this.autoScroll = options.danmakuListAutoScroll || false; // 弹幕列表自动滚动
        this.init();
    }
    init() {
        const $ = this.el.querySelector.bind(this.el);
        this.template.danmaku_list_col_time = $('.mfunsPlayer-danmaku-list-head .col-time'); // 时间列
        this.template.danmaku_list_col_text = $('.mfunsPlayer-danmaku-list-head .col-text'); // 内容列
        this.template.danmaku_list_col_date = $('.mfunsPlayer-danmaku-list-head .col-date'); // 日期列
        this.template.danmaku_list_container = $('.mfunsPlayer-danmaku-list-container'); // 弹幕列表容器
        this.template.danmaku_list_status = $('.mfunsPlayer-danmaku-list-status'); // 弹幕列表状态

        this.template.danmaku_list_autoscroll = $('.mfunsPlayer-danmaku-list-autoscroll');

        this.template.danmaku_list_col_time.onclick = () => {
            this.setAutoScroll(false);
            if (this.sortedBy == 'time') {
                this.sort('time', !this.sortReverse);
            } else {
                this.sort('time', false);
            }
        };
        this.template.danmaku_list_col_date.onclick = () => {
            this.setAutoScroll(false);
            if (this.sortedBy == 'date') {
                this.sort('date', !this.sortReverse);
            } else {
                this.sort('date', false);
            }
        };

        this.template.danmaku_list_autoscroll.onclick = () => {
            this.setAutoScroll(!this.autoScroll);
        };

        this.list = new VList({
            el: this.template.danmaku_list_container,
            getData: () => {
                return this.listData;
            },
            itemHeight: 24,
            createItem: (danmaku, i) => new DanmakuListItem(this.player, danmaku, i).el,
            overflow: 5,
        });

        this.danmakuLoadingFailed = false;
        if (this.player.danmaku.loaded) {
            this.fill(this.player.danmaku.dan);
        } else {
            this.setStatus('loading');
        }
        this.player.on('danmaku_load_end', this.fill.bind(this));
        this.player.on('danmaku_load_start', this.clear.bind(this));
        this.player.on(
            'danmaku_load_failed',
            (() => {
                this.danmakuLoadingFailed = true;
            }).bind(this)
        );

        this.player.on('danmaku_filter', ({ key, value }) => {
            if (key == 'type') {
                this.typeFilter = new Set(value);
            } else if (key == 'origin') {
                this.originFilter = new Set(value);
            }
            this.reload();
        });

        this.player.on('timeupdate', () => {
            if (this.autoScroll) {
                this.locateByTime(this.player.video.currentTime);
            }
        });

        this.list.el.addEventListener('wheel', () => {
            this.setAutoScroll(false);
        });
        this.list.el.addEventListener('mousedown', () => {
            this.setAutoScroll(false);
        });
        this.setAutoScroll(this.autoScroll);
    }
    fill(dan) {
        this.data = dan;
        // 弹幕列表装填
        if (this.danmakuLoadingFailed) {
            this.setStatus('failed');
        } else if (!this.data.length) {
            this.setStatus('empty');
        } else {
            this.reload();
            this.setStatus(true);
        }
    }
    sort(sortedBy = this.sortedBy, reverse = this.sortReverse) {
        // 弹幕列表排序
        this.sortedBy = sortedBy;
        this.sortReverse = reverse;
        this.listData.sort((a, b) => {
            // 排序
            return this.sortReverse ? b[this.sortedBy] - a[this.sortedBy] : a[this.sortedBy] - b[this.sortedBy];
        });
        this.list.reload();
    }
    reload() {
        // 重载弹幕列表
        let colorFilter = this.typeFilter.has('color');
        let specialFilter = this.typeFilter.has('special');
        this.listData = this.data.filter((item) => {
            return !(
                (
                    this.originFilter.has(item.origin) || // 来源屏蔽
                    this.typeFilter.has(item.type) || // 类型屏蔽
                    (colorFilter && item.color != 16777215) || // 彩色屏蔽
                    (specialFilter && item.mode > 6)
                ) // 特殊弹幕屏蔽
            );
        });
        this.listData.sort((a, b) => {
            // 排序
            return this.sortReverse ? b[this.sortedBy] - a[this.sortedBy] : a[this.sortedBy] - b[this.sortedBy];
        });
        this.list.reload();
        if (this.autoScroll) {
            this.locateByTime(this.player.video.currentTime);
        }
    }
    clear() {
        // 清空弹幕列表
        this.list.clear();
        this.danmakuLoadingFailed = false;
        this.setStatus('loading');
    }
    setStatus(status) {
        this.template.danmaku_list_status.classList.toggle('status-loading', status === 'loading');
        this.template.danmaku_list_status.classList.toggle('status-failed', status === 'failed');
        this.template.danmaku_list_status.classList.toggle('status-empty', status === 'empty');
        console.log('弹幕加载状态' + status);
    }
    locateByTime(time) {
        let viewEnd = this.list.viewEnd;
        if (this.listData[viewEnd]?.time > time) {
            // 如果列表可视区域最后一项的时间超过当前时间, 则重头开始遍历, 否则从列表可视区域最后一项遍历
            viewEnd = 0;
        }
        while (this.listData[viewEnd + 1]?.time <= time) {
            // 遍历并检测下一项弹幕时间是否超过当前时间, 若超过, 则以当前弹幕为定位点
            viewEnd++;
        }
        this.list.locateEnd(viewEnd);
    }
    setAutoScroll(bool) {
        // 设置自动滚动
        this.autoScroll = bool;
        if (bool) {
            this.sort('time', false);
            this.locateByTime(this.player.video.currentTime);
        }
        this.template.danmaku_list_autoscroll.innerText = `列表滚动[${bool ? '开' : '关'}]`;
    }
}

export default DanmakuList;
