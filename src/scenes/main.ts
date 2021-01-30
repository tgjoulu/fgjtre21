import Player from '../objects/player';
import FpsText from '../objects/fpsText';
import PointerPosText from '../objects/pointerPosText';
import Thing from '../objects/thing';
import { ShaderManager, ShaderType } from '../shaders/shader_manager';
import HeartBeat from '../objects/heartbeat';

export default class MainScene extends Phaser.Scene {
    fpsText: Phaser.GameObjects.Text;
    pointerText: Phaser.GameObjects.Text;
    player: Player;
    shaderManager: ShaderManager;
    heartbeatSounds: HeartBeat;

    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        this.add.image(512, 288, 'bg_layer').setScale(4);

        this.heartbeatSounds = this.registry.get('heartbeatSounds');

        this.player = new Player(this, 90, 250);

        this.fpsText = new FpsText(this);

        this.shaderManager = this.registry.get('shaderManager');
        //this.shaderManager.enableShader(this.cameras.main, ShaderType.WAVY);
        //this.shaderManager.enableShader(this.cameras.main, ShaderType.GRAYSCALE, false);
        this.pointerText = new PointerPosText(this);

        // save interactive points to a list and loop them here
        const fridge = new Thing(this, 610, 220, this.player, 'maze');
        fridge.on('pointerup', () => {
            this.heartbeatSounds.increase();
        });
        const bed = new Thing(this, 77, 331, this.player, 'maze');

        const microwave = new Thing(this, 860, 235, this.player, 'pizza');
    }

    update() {
        this.fpsText.update();
        this.pointerText.update();
        this.player.update();
        this.shaderManager.update(this.cameras.main);
    }
}
