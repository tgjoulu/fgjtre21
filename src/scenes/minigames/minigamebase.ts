import 'phaser';

import minigameBg from '../../assets/minigame_bg.png';

export default class MiniGameBase extends Phaser.Scene {
    constructor(opts: Phaser.Types.Scenes.SettingsConfig) {
        super(opts);
    }

    preload() {
        this.load.image('minigameBackground', minigameBg);
    }

    create() {
        // create background/border
        var bg = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'minigameBackground'
        );
        bg.setScale(4);
    }

    update() {}
}
