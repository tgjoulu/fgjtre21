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
        this.load.image('hand', '../assets/hand.png');
        this.load.image('minigameBackground', '../../assets/minigame_bg.png');
        this.load.image('pizzaGameBackground', '../../assets/miniigame_mircro_bg.png');
        this.load.image('minigame_1_bg', '../assets/minigame_1_bg.png');
        this.load.image('miniigame_mircro_bg', '../assets/miniigame_mircro_bg.png');
        this.load.image('hand', '../../assets/hand.png');
        this.load.image('handLine', '../../assets/handline.png');
        this.load.image('trashpile', '../../assets/trashpile.png');

        this.load.image('bag_of_chips', '../assets/bag_of_chips.png');
        this.load.image('bag', '../assets/bag.png');
        this.load.image('banana', '../assets/banana.png');
        this.load.image('can', '../assets/can.png');
        this.load.image('chips', '../assets/chips.png');
        this.load.image('egg', '../assets/egg.png');
        this.load.image('empty_bag_of_chips', '../assets/empty_bag_of_chips.png');
        this.load.image('glove', '../assets/glove.png');
        this.load.image('kebab', '../assets/kebab.png');
        this.load.image('key', '../assets/key.png');
        this.load.image('mask', '../assets/mask.png');
        this.load.image('nobel', '../assets/nobel.png');
        this.load.image('panties', '../assets/panties.png');
        this.load.image('phone', '../assets/phone.png');
        this.load.image('pika', '../assets/pika.png');
        this.load.image('pizza', '../assets/pizza.png');
        this.load.image('rum', '../assets/rum.png');
        this.load.image('shirt', '../assets/shirt.png');
        this.load.image('sock', '../assets/sock.png');
        this.load.image('wallet', '../assets/wallet.png');

        this.load.image('thought_bubble', '../assets/thought_bubble.png');

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
