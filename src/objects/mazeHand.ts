export default class MazeHand extends Phaser.Physics.Matter.Sprite {
    readonly maxLength = 70;

    linePoints = [
        new Phaser.Math.Vector2(813, 500),
        new Phaser.Math.Vector2(750, 450),
    ] as Phaser.Math.Vector2[];
    isPointerDown = false;
    isDragging = false;
    isRetracting = false;
    isFailed = false;
    prevPointer = new Phaser.Math.Vector2();
    handRope: Phaser.GameObjects.Rope;
    angle: number;

    constructor(scene: Phaser.Scene, world: Phaser.Physics.Matter.World, x: number, y: number) {
        super(world, x, y, 'hand');

        scene.add.existing(this);
        this.setInteractive();

        this.setTexture('hand');
        this.setScale(4);

        this.setDepth(2);

        this.setCircle(20);

        // Hand Rope
        this.handRope = this.scene.add.rope(813, 500, 'handLine', undefined, this.linePoints, true);

        this.on('pointerdown', (pointer, deltaX, deltaY, deltaZ) => {
            if (!this.isRetracting && !this.isFailed) {
                this.isPointerDown = true;
                this.isDragging = true;

                this.linePoints.push(new Phaser.Math.Vector2(this.x, this.y));
            }
        });

        this.scene.input.on('pointerup', () => {
            if (this.linePoints.length > 2) {
                this.isRetracting = true;
            }
            this.isDragging = false;
            this.isPointerDown = false;
            this.isFailed = false;
        });

        this.scene.input.on('pointermove', (_pointer: Phaser.Input.Pointer) => {
            if (
                this.isPointerDown &&
                this.isDragging &&
                this.linePoints.length < this.maxLength &&
                !this.isRetracting
            ) {
                const x = this.x;
                const y = this.y;

                if (
                    Phaser.Math.Distance.Between(x, y, this.prevPointer.x, this.prevPointer.y) > 10
                ) {
                    const newAngle = Phaser.Math.Angle.BetweenPoints(
                        new Phaser.Math.Vector2(this.prevPointer.x, this.prevPointer.y),
                        new Phaser.Math.Vector2(x, y)
                    );

                    this.angle = newAngle;
                    this.setRotation(newAngle + 1.9);

                    this.prevPointer.x = x;
                    this.prevPointer.y = y;
                    this.linePoints.push(new Phaser.Math.Vector2(x, y));
                    -this.handRope.destroy();
                    this.handRope = this.scene.add.rope(
                        0,
                        0,
                        'handLine',
                        undefined,
                        this.linePoints
                    );
                }
            }
        });

        this.scene.physics.world.on('worldbounds', () => {
            this.startRetract();
        });
    }

    startRetract() {
        this.isRetracting = true;
        this.isPointerDown = false;
        this.isFailed = true;
        this.isDragging = false;
    }

    reset() {
        this.setRotation(0);
        this.setPosition(750, 450);
        this.handRope.destroy();
        this.handRope = this.scene.add.rope(30, 30, 'handLine', undefined, this.linePoints, true);
        this.isRetracting = false;
        this.linePoints = [new Phaser.Math.Vector2(813, 500), new Phaser.Math.Vector2(750, 450)];
    }

    update(dt: number) {
        if (this.isDragging) {
            if (this.linePoints.length < this.maxLength && !this.isRetracting) {
                this.setPosition(this.scene.input.x, this.scene.input.y);
            }
        }
        if (this.isRetracting) {
            this.linePoints.splice(-1, 1);
            -this.handRope.destroy();
            this.handRope = this.scene.add.rope(0, 0, 'handLine', undefined, this.linePoints);

            // Go throught points or reset hand
            if (this.linePoints.length > 2) {
                const nextVector = this.linePoints[this.linePoints.length - 1];

                const newAngle = Phaser.Math.Angle.BetweenPoints(
                    new Phaser.Math.Vector2(nextVector.x, nextVector.y),
                    new Phaser.Math.Vector2(this.prevPointer.x, this.prevPointer.y)
                );

                this.angle = newAngle;
                this.setRotation(newAngle + 1.9);
                this.setPosition(nextVector.x, nextVector.y);
            } else {
                this.reset();
            }
        }
    }
}
