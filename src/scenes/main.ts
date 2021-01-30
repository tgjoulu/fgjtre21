import Player from '../objects/player';
import FpsText from '../objects/fpsText';
import PointerPosText from '../objects/pointerPosText';
import Thing from '../objects/thing';

export default class MainScene extends Phaser.Scene {
    fpsText: Phaser.GameObjects.Text;
    pointerText: Phaser.GameObjects.Text;
    player: Player;

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        // Move these to preload scene when time
        this.load.image('playerSprite', '../assets/player_static.png');
        this.load.image('targetSprite', '../assets/target.png');
        this.load.image('bg_layer', '../assets/bg_layer.png');
    }

    create() {
        this.add.image(512, 288, 'bg_layer').setScale(4);

        this.player = new Player(this, 90, 250);

        this.fpsText = new FpsText(this);
        this.pointerText = new PointerPosText(this);

        // save interactive points to a list and loop them here
        const fridge = new Thing(this, 610, 220, this.player, 'maze');
    }

    update() {
        this.fpsText.update();
        this.pointerText.update();
        this.player.update();
    }
}
