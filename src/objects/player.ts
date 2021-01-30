import HeartBeat from './heartbeat';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    // Constants
    readonly playerSpeed = 200;

    targetSprite: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    isWalking: boolean;
    movementDisabled: boolean = false;
    targetLocation: [x: number, y: number];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setTexture('playerSprite');
        this.setScale(4);
        this.body.setSize(15, 30);
        this.body.setOffset(8, 30);

        // Add mouse target
        this.targetSprite = scene.physics.add.image(200, 200, 'targetSprite').setScale(0.06);

        scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (this.movementDisabled) return;
            this.setTarget(pointer.x, pointer.y);
        });

        scene.physics.add.overlap(
            this,
            this.targetSprite,
            (playerTargetCollidier) => {
                this.isWalking = false;
                playerTargetCollidier.body.stop();
            },
            undefined,
            this
        );
    }

    setTarget(x: number, y: number) {
        this.targetLocation = [x, y];
        this.targetSprite.setPosition(x, y);

        this.isWalking = true;
        this.scene.physics.moveToObject(this, this.targetSprite, this.playerSpeed);
    }
}
