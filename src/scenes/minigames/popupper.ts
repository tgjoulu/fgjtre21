import MiniGameBase from './minigamebase';
import Popup from '../../objects/popup';

export default class Popupper extends MiniGameBase {
    private minDelayMS: number = 200;
    private maxDelayMS: number = 2000;
    private initialAmount: number = 3;
    private border: number = 100;
    private spawnNextTimestamp: number = 0;
    private popupCount: number = 0;
    private maxPopupCount: number = 12;

    constructor() {
        super({ key: 'popupper' });
    }

    create() {
        super.create();
        const bg = this.add
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'minigame_popup_bg')
            .setScale(4);

        for (let i = 0; i < this.initialAmount; ++i) {
            this.forceSpawnPopup();
        }
    }

    update(timestamp: number, dt: number) {
        super.update(timestamp, dt);
        if (this.popupCount == 0) {
            console.log('Popup game BEATEN');
            this.stop(true);
        }
        if (this.spawnPopup(timestamp)) {
            this.setupNextSpawnTime(timestamp);
        }
    }

    private forceSpawnPopup() {
        const randX =
            this.bounds.x + this.border + Math.random() * (this.bounds.width - this.border * 2);
        const randY =
            this.bounds.y + this.border + Math.random() * (this.bounds.height - this.border * 2);
        let popup = new Popup(this, randX, randY);
        popup.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.popupCount--;
            popup.destroy();
        });
        this.popupCount++;
    }

    private spawnPopup(timestamp: number) {
        if (this.popupCount == 0 || this.popupCount >= this.maxPopupCount) {
            return false;
        }
        if (timestamp < this.spawnNextTimestamp) {
            return false;
        }
        this.forceSpawnPopup();
        return true;
    }

    private setupNextSpawnTime(curTime: number) {
        this.spawnNextTimestamp = curTime + Math.random() * (this.maxDelayMS - this.minDelayMS);
    }
}
