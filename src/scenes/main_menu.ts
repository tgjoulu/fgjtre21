import { ShaderManager } from '../shaders/shader_manager';
import HeartBeat from '../objects/heartbeat';

export default class MainMenuScene extends Phaser.Scene {
    startText: Phaser.GameObjects.Text;
    hbSounds: Phaser.Scene;

    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;
        let progBox = this.add.rectangle(centerX, centerY, 320, 50, 0x222222, 0.8);
        let progBar = this.add.rectangle(centerX - 150, centerY, 0, 40, 0xffffff, 1);

        this.load.on('progress', (value: number) => {
            progBar.width = 300 * value;
        });

        // this.load.on('complete', () => {
        //     progBox.destroy();
        //     progBar.destroy();
        // });

        this.load.image('playerSprite', '../assets/player_static.png');
        this.load.image('targetSprite', '../assets/target.png');
        this.load.image('bg_layer', '../assets/bg_layer.png');
        this.load.image('minigameBackground', '../../assets/minigame_bg.png');

        this.load.audio('heartbeat_slow', '../assets/sound/HB-100bpm.wav');

        this.load.audio('hb-100', '../assets/sound/hb2_100bpm.wav');
        this.load.audio('hb-110', '../assets/sound/hb2_110bpm.wav');
        this.load.audio('hb-120', '../assets/sound/hb2_120bpm.wav');
        this.load.audio('hb-130', '../assets/sound/hb2_130bpm.wav');
        this.load.audio('hb-140', '../assets/sound/hb2_140bpm.wav');
        this.load.audio('hb-150', '../assets/sound/hb2_150bpm.wav');
        this.load.audio('hb-160', '../assets/sound/hb2_160bpm.wav');
        this.load.audio('hb-170', '../assets/sound/hb2_170bpm.wav');
        this.load.audio('hb-180', '../assets/sound/hb2_180bpm.wav');
        this.load.audio('hb-190', '../assets/sound/hb2_190bpm.wav');
        this.load.audio('hb-200', '../assets/sound/hb2_200bpm.wav');
    }

    create() {
        this.createMenu();
    }

    createMenu() {
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
        this.registry.set('shaderManager', new ShaderManager(this.game));
        this.registry.set('heartbeatSounds', this.scene.get('heartbeatSounds') as HeartBeat);
    }
}
