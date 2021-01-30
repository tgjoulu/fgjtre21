export default class MazeHand extends Phaser.Physics.Arcade.Sprite {
    linePoints = [
        new Phaser.Math.Vector2(813, 500),
        new Phaser.Math.Vector2(750, 450),
    ] as Phaser.Math.Vector2[];
    isPointerDown = false;
    isDragging = false;
    prevPointer = new Phaser.Math.Vector2();
    handRope: Phaser.GameObjects.Rope;
    angle: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setTexture('hand');
        this.setScale(4);
        this.body.setSize(10, 20);
        this.body.setOffset(0, 0);
        this.setDepth(2);
        this.setOrigin(0.5, 0.5);

        this.setInteractive({ draggable: true });
        this.input.draggable = true;

        // Hand Rope
        this.handRope = this.scene.add.rope(0, 0, 'handLine', undefined, this.linePoints, true);

        // Events
        this.on('drag', (_pointer, dragX, dragY) => {
            this.isDragging = true;
            this.setPosition(dragX, dragY);
        });
        this.on('dragend', () => {
            this.isDragging = false;
        });

        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.isPointerDown = true;

            if (this.isDragging) {
                this.linePoints.push(new Phaser.Math.Vector2(this.x, this.y));
            }
        });

        this.scene.input.on('pointerup', () => {
            this.isPointerDown = false;
        });

        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (this.isPointerDown && this.isDragging) {
                const x = pointer.x;
                const y = pointer.y;

                if (
                    Phaser.Math.Distance.Between(x, y, this.prevPointer.x, this.prevPointer.y) > 10
                ) {
                    // const newAngle =
                    //     Math.atan2(this.prevPointer.x - x, this.prevPointer.y - y) + 45;
                    const newAngle = Phaser.Math.Angle.BetweenPoints(
                        new Phaser.Math.Vector2(this.prevPointer.x, this.prevPointer.y),
                        new Phaser.Math.Vector2(x, y)
                    );

                    this.angle = newAngle;
                    this.setRotation(newAngle + 1.9);

                    this.prevPointer.x = x;
                    this.prevPointer.y = y;
                    this.linePoints.push(new Phaser.Math.Vector2(this.x - 15, this.y - 30));
                    -this.handRope.destroy();
                    this.handRope = this.scene.add.rope(
                        10,
                        30,
                        'handLine',
                        undefined,
                        this.linePoints
                    );
                }
            }
        });
    }

    update() {
        this.handRope.setDirty();
    }
}
