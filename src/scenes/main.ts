import Player from '../objects/player';
import FpsText from '../objects/fpsText';

import playerSpriteImage from '../assets/player_static.png';
import targetSpriteImage from '../assets/target.png';
import bgLayerImage from '../assets/bg_layer.png';

export default class MainScene extends Phaser.Scene {
    fpsText: Phaser.GameObjects.Text;
    player: Player;

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
        this.add.image(440, 250, 'bg_layer').setScale(4);

        this.player = new Player(this, this.cameras.main.width / 2, 0);
        this.fpsText = new FpsText(this);
        this.player.setCollideWorldBounds(true);
    }

    update() {
        this.fpsText.update();
        this.player.update();
    }
}
