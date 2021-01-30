import Player from '../objects/player';
import FpsText from '../objects/fpsText';

import playerSpriteImage from '../assets/player_static.png';
import targetSpriteImage from '../assets/target.png';
import { ShaderManager } from '../shaders/shader_manager';

export default class MainScene extends Phaser.Scene {
    fpsText: Phaser.GameObjects.Text;
    player: Player;
    shaderManager: ShaderManager;

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Move these to preload scene when time
        this.load.image('playerSprite', playerSpriteImage);
        this.load.image('targetSprite', targetSpriteImage);
    }

    create() {
        this.player = new Player(this, this.cameras.main.width / 2, 0);
        this.fpsText = new FpsText(this);
        this.player.setCollideWorldBounds(true);
        this.shaderManager = this.registry.get('shaderManager');
        this.shaderManager.setGrayscale(this.cameras.main);
    }

    update() {
        this.fpsText.update();
        this.player.update();
    }
}
