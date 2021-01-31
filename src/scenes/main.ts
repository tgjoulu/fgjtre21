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

    bed: Thing;
    microwave: Thing;
    trash: Thing;
    computer: Thing;

    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        this.add.image(512, 288, 'bg_layer').setScale(4);

        this.heartbeatSounds = this.registry.get('heartbeatSounds');
        this.heartbeatSounds.setBPM(60);

        this.player = new Player(this, 90, 250);

        // this.fpsText = new FpsText(this);
        // this.pointerText = new PointerPosText(this);

        // save interactive points to a list and loop them here
        // const fridge = new Thing(this, 610, 220, this.player, 'maze');
        // fridge.on('pointerup', () => {
        //     this.heartbeatSounds.increase();
        // });
        this.bed = new Thing(this, 77, 331, this.player, 'maze');

        this.microwave = new Thing(this, 860, 235, this.player, 'pizza');

        this.add.image(410, 480, 'trashpile').setScale(4).setOrigin(0.5, 0.5);
        this.trash = new Thing(this, 410, 480, this.player, 'pile');
        this.computer = new Thing(this, 340, 200, this.player, 'popupper');

        // Failure
        const failTimer = this.time.delayedCall(60000, () => this.gameFail(), [], this);
        const heartBeatTimer = this.time.addEvent({
            delay: 4000, // ms
            callback: () => this.heartbeatSounds.increase(),
            loop: true,
        });
    }

    update() {
        // this.fpsText.update();
        // this.pointerText.update();
        this.player.update();

        if (
            this.bed.isComplete() &&
            this.microwave.isComplete() &&
            this.trash.isComplete() &&
            this.computer.isComplete()
        ) {
            this.gameSuccess();
        }
    }

    gameSuccess() {
        this.heartbeatSounds.stop();
        this.scene.start('GoodEnding');
    }

    gameFail() {
        this.heartbeatSounds.stop();
        this.scene.start('BadEnding');
    }
}
