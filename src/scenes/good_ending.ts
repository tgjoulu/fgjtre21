import Player from '../objects/player';
import { ShaderManager, ShaderType } from '../shaders/shader_manager';
import HeartBeat from '../objects/heartbeat';

export default class GoodEndingScene extends Phaser.Scene {
    fpsText: Phaser.GameObjects.Text;
    pointerText: Phaser.GameObjects.Text;
    player: Player;
    shaderManager: ShaderManager;
    heartbeatSounds: HeartBeat;

    constructor() {
        super({ key: 'GoodEnding' });
    }

    create() {
        this.add.image(0, 0, 'end_bg').setScale(4).setOrigin(0, 0);
        const wonText = this.physics.add.image(500, 50, 'won').setScale(4);
        wonText.setOrigin(0.5, 0);
        wonText.setVelocity(0, 880);
        wonText.setBounce(1, 0.2);
        wonText.setCollideWorldBounds(true);

        const car = this.physics.add.image(500, 500, 'car').setScale(4);
        this.physics.accelerateTo(car, 1000, 500, 60, 300, 300);
    }

    update() {}
}
