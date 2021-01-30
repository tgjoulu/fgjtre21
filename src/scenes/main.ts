import Player from '../objects/player';
import FpsText from '../objects/fpsText';
import PointerPosText from '../objects/pointerPosText';
import Thing from '../objects/thing';
import { ShaderManager, ShaderType } from '../shaders/shader_manager';

import playerSpriteImage from '../assets/player_static.png';
import targetSpriteImage from '../assets/target.png';
import bgLayerImage from '../assets/bg_layer.png';

export default class MainScene extends Phaser.Scene {
    fpsText: Phaser.GameObjects.Text;
    pointerText: Phaser.GameObjects.Text;
    player: Player;
    shaderManager: ShaderManager;

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Move these to preload scene when time
        this.load.image('playerSprite', playerSpriteImage);
        this.load.image('targetSprite', targetSpriteImage);
        this.load.image('bg_layer', bgLayerImage);
    }

    create() {
        this.add.image(512, 288, 'bg_layer').setScale(4);

        this.player = new Player(this, 90, 250);
        this.fpsText = new FpsText(this);
        this.player.setCollideWorldBounds(true);
        this.shaderManager = this.registry.get('shaderManager');
        this.shaderManager.enableShader(this.cameras.main, ShaderType.WAVY);
        this.shaderManager.enableShader(this.cameras.main, ShaderType.GRAYSCALE, false);
        this.pointerText = new PointerPosText(this);

        // save interactive points to a list and loop them here
        const fridge = new Thing(this, 610, 220, this.player, 'maze');
    }

    update() {
        this.fpsText.update();
        this.pointerText.update();
        this.player.update();
        this.shaderManager.update(this.cameras.main);
    }
}
