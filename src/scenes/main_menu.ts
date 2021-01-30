import { ShaderManager } from '../shaders/shader_manager';
import MainScene from './scenes/main';

export default class MainScene extends Phaser.Scene {
    startText: Phaser.GameObjects.Text;
    hbSounds: Phaser.Scene;

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
            this.setGlobals();
            this.scene.start('MainScene');
        });

        this.scene.launch('heartbeatSounds');
    }

    update() {}

    setGlobals(): void {
        // TODO if there's preload scene, init there instead
        this.registry.set('shaderManager', new ShaderManager(this.game));
    }
}
