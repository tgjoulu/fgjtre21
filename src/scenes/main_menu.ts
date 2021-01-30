export default class MainScene extends Phaser.Scene {
    startText: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        this.startText = this.add
            .text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Start Game', {
                color: '#000000',
                fontSize: '32px',
            })
            .setOrigin(0.5, 0.5)
            .setInteractive();

        this.startText.on('pointerup', () => {
            this.scene.start('MainScene');
        });
    }

    update() {}
}
