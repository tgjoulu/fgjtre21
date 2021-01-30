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
    'phone',
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
        this.setOrigin(0.5);
        this.setCollideWorldBounds(false);
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
        this.setRandomPosition(this.x - 200, this.y - 150, 200, 200);
    }
}

export default class Pile extends MiniGameBase {
    constructor() {
        super({ key: 'pile' });
    }

    create() {
        super.create();
        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;

        let target = new Romu(this, centerX, centerY, 'phone');
        target.on('pointerdown', () => {
            this.scene.stop();
        });

        let amount = (Phaser.Math.RND.integer() % 10) + 8;
        for (let i = 1; i <= amount; i++) {
            new Romu(this, centerX, centerY);
        }
    }
}
