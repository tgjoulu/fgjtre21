import { PhysicGraphics } from './physicGraphics';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    // Constants
    readonly playerSpeed = 400;
    readonly debugTarget = false;

    targetGraphic: Phaser.GameObjects.Graphics;
    isWalking: boolean;
    targetLocation: [x: number, y: number];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');
        scene.add.existing(this);

        // Walking animation
        const playerWalkingAnimation = this.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('walking', {}),
            frameRate: 16,
        });

        // Textures
        this.setTexture('playerSprite');
        this.setScale(4);
        this.flipX = true;

        // Physics
        scene.physics.add.existing(this);
        this.body.setSize(15, 30);
        this.body.setOffset(8, 30);
        this.setCollideWorldBounds(true);
        (this.body as Phaser.Physics.Arcade.Body).onWorldBounds = true;

        (this.body as Phaser.Physics.Arcade.Body).setBoundsRectangle(
            new Phaser.Geom.Rectangle(0, 220, 1024, 400)
        );

        // Add mouse target
        this.targetGraphic = scene.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1,
            },
            fillStyle: {
                color: 0xffffff,
                alpha: 1,
            },
        });
        scene.physics.world.enable(this.targetGraphic);

        this.targetGraphic.fillRect(0, 0, 20, 20);
        (this.targetGraphic as PhysicGraphics).body.setSize(20, 20);

        this.targetGraphic.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.setTarget(pointer.x, pointer.y);
        });

        // When player collidies with target
        scene.physics.add.overlap(
            this,
            this.targetGraphic,
            (playerTargetCollidier) => {
                this.isWalking = false;
                playerTargetCollidier.body.stop();
                this.stop();
            },
            undefined,
            this
        );

        // Stop velocity when hitting world bounds
        this.scene.physics.world.on('worldbounds', () => {
            this.setVelocity(0);
            this.stop();
        });
    }

    setTarget(x: number, y: number) {
        this.targetLocation = [x, y];
        this.targetGraphic.setPosition(x, y);

        this.isWalking = true;
        this.play({ key: 'walk', repeat: -1, repeatDelay: 20 });

        this.scene.physics.moveToObject(this, this.targetGraphic, this.playerSpeed);

        // Flip players X according to target X
        if (x < this.x) {
            this.flipX = true;
        } else {
            this.flipX = false;
        }
    }
}
