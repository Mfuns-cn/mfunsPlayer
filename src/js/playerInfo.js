import { Slider, Picker } from './components/components';
export default class PlayerInfo {
    constructor(player) {
        this.player = player;
        this.player.template.player_info_mask.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        this.player.template.player_info_close.addEventListener('click', () => {
            this.hide();
        });
        this.player.template.player_info_version.innerText = `version ${MFUNSPLAYER_VERSION}`;
    }
    show() {
        this.player.template.player_info_mask.classList.add('show');
    }
    hide() {
        this.player.template.player_info_mask.classList.remove('show');
    }
    toggle() {
        if (this.player.template.player_info_mask.classList.contains('show')) this.hide();
        else this.show();
    }
}
