import 'phaser';

import minigameBg from '../../assets/minigame_bg.png';

export default class MiniGameBase extends Phaser.Scene {
    onDestroy: Function;

    constructor(opts: Phaser.Types.Scenes.SettingsConfig) {
        super(opts);
    }

    init({ onDestroy }) {
        this.onDestroy = onDestroy;
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

        var closeButton = this.add
            .text(this.cameras.main.width, 0, '×', {
                color: '#000000',
                fontSize: '72px',
                backgroundColor: '#FFFFFF',
            })
            .setOrigin(1, 0)
            .setInteractive();
        closeButton.on('pointerup', () => {
            this.onDestroy();
            this.scene.stop();
        });
    }

    update() {}
}
