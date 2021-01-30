import 'phaser';
import { ShaderManager, ShaderType } from '../../shaders/shader_manager';

export default class MiniGameBase extends Phaser.Scene {
    onDestroy: Function;
    _shaderManager: ShaderManager;
    _bounds: Phaser.Geom.Rectangle;

    constructor(opts: Phaser.Types.Scenes.SettingsConfig) {
        super(opts);
        this._bounds = new Phaser.Geom.Rectangle(200, 79, 620, 420);
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

    update(timestamp: number, dt: number) {
        this.shaderManager.update(this.cameras.main);
    }

    get shaderManager(): ShaderManager {
        return this._shaderManager;
    }

    get bounds(): Phaser.Geom.Rectangle {
        return this._bounds;
    }
}
