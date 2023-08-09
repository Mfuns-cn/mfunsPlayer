import utils from './utils';
// import moment from "moment";
import DanmakuAuxiliaryTemplate from '../../template/danmakuAuxiliary.art';
import DanmakuList from './danmakuList/danmakuList';
import AdvancedDanmakuEditor from './advancedDanmakuEditor/advancedDanmakuEditor';

/**
 * @param {Object} player 播放器实例
 * @param {Object} el 挂载点
 */
class DanmakuAuxiliary {
    constructor(player, el, options = {}) {
        this.options = options;
        this.player = player;
        this.el = el;
        this.template = this.player.template; // DOM模板
        this.mount();
    }
    mount() {
        // 挂载
        this.el.classList.add('mfunsPlayer-danmaku-auxiliary');
        this.el.innerHTML = DanmakuAuxiliaryTemplate(); // 注入弹幕功能区DOM
        const $ = this.el.querySelector.bind(this.el);
        this.template.danmaku_list_wrapper = $('.mfunsPlayer-danmaku-list-wrapper'); // 弹幕列表面板
        this.template.ade_wrapper = $('.mfunsPlayer-ade-wrapper'); // 高级弹幕编辑器面板(Advanced Danmaku Editor)
        this.template.ade_btn = $('.mfunsPlayer-ade-button'); // 高级弹幕面板按钮
        this.template.ade_exit_btn = $('.mfunsPlayer-ade-exit-button'); // 退出高级弹幕面板按钮

        this.danmakuList = new DanmakuList(this.player, this.template.danmaku_list_wrapper, this.options);
        this.advancedDanmakuEditor = new AdvancedDanmakuEditor(this.player, this.template.ade_wrapper, this.options);

        this.template.ade_btn.addEventListener('click', this.showADE.bind(this));
        this.template.ade_exit_btn.addEventListener('click', this.hideADE.bind(this));
    }
    showADE() {
        this.template.danmaku_list_wrapper.style['display'] = 'none';
        this.template.ade_wrapper.style['display'] = '';
    }
    hideADE() {
        this.template.danmaku_list_wrapper.style['display'] = '';
        this.template.ade_wrapper.style['display'] = 'none';
    }
}

export default DanmakuAuxiliary;
