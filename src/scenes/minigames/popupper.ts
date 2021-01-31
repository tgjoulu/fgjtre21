import MiniGameBase from './minigamebase';
import Popup from '../../objects/popup';

export default class Popupper extends MiniGameBase {
    private minDelayMS: number = 500;
    private maxDelayMS: number = 3000;
    private initialAmount: number = 3;
    private border: number = 100;
    private spawnNextTimestamp: number = 0;
    private popups: Popup[];

    constructor() {
        super({ key: 'popupper' });
    }

    create() {
        super.create();
        const bg = this.add
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'minigame_1_bg')
            .setScale(4);

        this.popups = [];
        for (let i = 0; i < this.initialAmount; ++i) {
            this.spawnPopup(99999);
        }
    }

    update(timestamp: number, dt: number) {
        super.update(timestamp, dt);
        if (this.spawnPopup(timestamp)) {
            this.spawnNextTimestamp =
                timestamp + Math.random() * (this.maxDelayMS - this.minDelayMS);
        }
    }

    spawnPopup(timestamp: number) {
        if (timestamp >= this.spawnNextTimestamp) {
            const randX =
                this.bounds.x + this.border + Math.random() * (this.bounds.width - this.border * 2);
            const randY =
                this.bounds.y +
                this.border +
                Math.random() * (this.bounds.height - this.border * 2);
            this.popups.push(new Popup(this, randX, randY));
            return true;
        }
        return false;
    }
}
