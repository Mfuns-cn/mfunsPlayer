import utils from '../utils';

class DanmakuListItem {
    constructor(player, danmaku, index) {
        this.player = player;
        this.danmaku = danmaku;
        this.index = index;
        this.el;
        this.col_time;
        this.col_text;
        this.col_date;
        this.list_operations;
        this.button_like;
        this.button_report;
        this.button_delete;

        this.init();
    }
    init() {
        // 列表元素
        let danmaku = this.danmaku;
        this.el = document.createElement('div');
        this.el.className = 'list-row';
        this.el.setAttribute('data-index', this.index);
        this.el.setAttribute('data-mode', this.danmaku.mode);
        this.el.title = `${danmaku.text}\n${danmaku.date ? utils.formatterDate(new Date(danmaku.date * 1000), 'YYYY-MM-DD HH:mm:ss') : '-'} @ ${utils.secondToTime(danmaku.time, false)}`;
        this.el.ondblclick = (e) => {
            // 双击列表项时跳转到对应的时间点 (双击按钮不会发生跳转)
            e.target.classList.contains('list-action') || this.seek();
        };
        // 时间列
        this.col_time = document.createElement('span');
        this.col_time.classList.add('list-cell', 'col-time');
        this.col_time.innerText = utils.secondToTime(danmaku.time, false);
        this.el.appendChild(this.col_time);
        // 内容列
        this.col_text = document.createElement('span');
        this.col_text.classList.add('list-cell', 'col-text');
        this.col_text.innerText = danmaku.text;
        this.el.appendChild(this.col_text);
        // 日期列
        this.col_date = document.createElement('span');
        this.col_date.classList.add('list-cell', 'col-date');
        this.col_date.innerText = danmaku.date ? utils.formatterDate(new Date(danmaku.date * 1000), 'YY-MM-DD HH:mm') : '-';
        this.el.appendChild(this.col_date);

        // 弹幕操作
        this.list_operations = document.createElement('div');
        this.list_operations.className = 'list-operations';
        this.el.appendChild(this.list_operations);
        // 点赞
        this.action_like = document.createElement('span');
        this.action_like.classList.add('list-action', 'action-like');
        this.action_like.innerText = '[点赞]';
        this.action_like.onclick = () => {
            this.like();
        };
        this.list_operations.appendChild(this.action_like);
        // 举报
        this.action_report = document.createElement('span');
        this.action_report.classList.add('list-action', 'action-report');
        this.action_report.innerText = '[举报]';
        this.action_report.onclick = () => {
            this.report();
        };
        this.list_operations.appendChild(this.action_report);
    }
    like() {
        console.log(`[mfuns-player] 点赞弹幕 id-${this.danmaku.id} 内容: ${this.danmaku.text}`);
    }
    report() {
        console.log(`[mfuns-player] 举报弹幕 id-${this.danmaku.id} 内容: ${this.danmaku.text}`);
    }
    seek() {
        this.player.seek(this.danmaku.time);
        this.player.play();
    }
}

export default DanmakuListItem;
