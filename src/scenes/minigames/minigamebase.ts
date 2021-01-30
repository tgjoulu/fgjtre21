import 'phaser';
import { ShaderManager, ShaderType } from '../../shaders/shader_manager';

export default class MiniGameBase extends Phaser.Scene {
    onDestroy: Function;
    _shaderManager: ShaderManager;

    constructor(opts: Phaser.Types.Scenes.SettingsConfig) {
        super(opts);
    }

    init({ onDestroy }) {
        this.onDestroy = onDestroy;
    }

    preload() {
        this.load.image('minigameBackground', '../../assets/minigame_bg.png');
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
        this._shaderManager = this.registry.get('shaderManager');
    }

    update() {
        this.shaderManager.update(this.cameras.main);
    }

    get shaderManager(): ShaderManager {
        return this._shaderManager;
    }
}
