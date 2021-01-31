import Player from '../objects/player';
import { ShaderManager, ShaderType } from '../shaders/shader_manager';

export default class BadEndingScene extends Phaser.Scene {
    shaderManager: ShaderManager;

    constructor() {
        super({ key: 'BadEnding' });
    }

    create() {
        this.add.image(0, 0, 'end_bg').setScale(4).setOrigin(0, 0);
        this.add.image(410, 330, 'mini_player').setScale(4);
        const lostText = this.physics.add.image(500, 50, 'lost').setScale(4);
        lostText.setOrigin(0.5, 0);
        lostText.setVelocity(0, 880);
        lostText.setBounce(1, 0.2);
        lostText.setCollideWorldBounds(true);

        const car = this.physics.add.image(500, 500, 'car').setScale(4);
        this.physics.accelerateTo(car, 1000, 500, 60, 300, 300);

        const retry = this.add
            .text(this.cameras.main.width - 10, this.cameras.main.height - 10, 'Restart', {
                color: '#FFFFFF',
                fontSize: '32px',
            })
            .setOrigin(1, 1)
            .setInteractive();
        retry.on('pointerup', () => {
            this.scene.remove('MainScene');
            this.scene.start('MainScene');
        });
    }

    update() {}
}
