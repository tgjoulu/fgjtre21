import MiniGameBase from './minigamebase';

let stuff = [
    'bag_of_chips',
    'bag',
    'banana',
    'can',
    'chips',
    'egg',
    'empty_bag_of_chips',
    'glove',
    'kebab',
    'mask',
    'nobel',
    'panties',
    'pika',
    'pizza',
    'rum',
    'shirt',
    'sock',
    'wallet',
];

class Romu extends Phaser.Physics.Arcade.Sprite {
    parent: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, texture?: string) {
        super(scene, x, y, Phaser.Math.RND.uuid());

        this.parent = scene;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(4);
        this.setOrigin(0.5, 0.5);
        this.setCollideWorldBounds(true);
        this.setBounce(0.8);
        this.body.setSize(32, 32);
        this.body.setOffset(16, 16);

        if (!texture) {
            this.randomize();
        } else {
            this.setTexture(texture);
        }

        this.setInteractive({ draggable: true });

        this.on('drag', (pointer, dragX, dragY) => {
            let speed = Phaser.Math.Distance.BetweenPoints(this, pointer);
            scene.physics.moveTo(this, dragX, dragY, speed);
        });
    }

    public randomize() {
        this.setTexture(Phaser.Math.RND.pick(stuff));
        this.setRotation(Phaser.Math.RND.rotation());
        this.setRandomPosition(this.x - 200, this.y - 150, 300, 250);
    }
}

export default class Pile extends MiniGameBase {
    hand: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'pile' });
    }

    create() {
        super.create();
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;

        this.hand = this.add
            .image(centerX, this.cameras.main.height - 50, 'hand')
            .setDepth(1000)
            .setOrigin(0.1, 0.1)
            .setScale(4);

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            this.hand.setPosition(pointer.x, pointer.y);
        });

        let target = new Romu(this, centerX, centerY, 'phone');
        target.on('pointerdown', () => {
            // this.scene.launch('vastaa_luuriin');
            this.scene.stop();
        });

        let amount = (Phaser.Math.RND.integer() % 10) + 8;
        for (let i = 1; i <= amount; i++) {
            new Romu(this, centerX, centerY);
        }
    }
}
