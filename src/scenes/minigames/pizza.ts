import { ShaderType } from '../../shaders/shader_manager';
import MiniGameBase from './minigamebase';
import { Noise2D, makeNoise2D } from 'open-simplex-noise';

export default class Pizza extends MiniGameBase {
    private micro: Phaser.GameObjects.Rectangle;
    private handContainer: Phaser.GameObjects.Container;
    private hand: Phaser.GameObjects.Rectangle;
    private pizza: Phaser.GameObjects.Rectangle;
    private handDir: number = -1;
    private handSpeed: number = 0.5;
    private handShake: number = 20;
    private handBounds: Phaser.Geom.Rectangle;
    private noise2D: Noise2D;

    constructor() {
        super({ key: 'pizza' });
    }

    create() {
        super.create();
        // Temp rects
        this.micro = this.add.rectangle(
            this.bounds.x + this.bounds.width / 2,
            this.bounds.y + this.bounds.height / 2,
            100,
            100,
            0x1166ff
        );
        this.handContainer = this.add.container(
            this.bounds.x + 50,
            this.bounds.y + this.bounds.height - 70
        );
        this.hand = this.add.rectangle(0, 0, 100, 100, 0x666611);
        this.pizza = this.add.rectangle(0, -50, 50, 50, 0x6666ff);
        this.handContainer.add(this.hand);
        this.handContainer.add(this.pizza);
        this.handBounds = new Phaser.Geom.Rectangle(
            this.bounds.x,
            this.bounds.y + this.bounds.height * 0.7,
            this.bounds.width,
            this.bounds.height * 0.3
        );
        this.noise2D = makeNoise2D(Date.now());
    }

    update(timestamp: number, dt: number) {
        super.update(timestamp, dt);
        this.moveHand(timestamp, dt);
        this.handContainer.y;
        this.checkHandDir();
    }

    private moveHand(timestamp: number, dt: number) {
        this.handContainer.x += this.handDir * dt * this.handSpeed;
        const yNoise = this.noise2D(this.handContainer.x, this.handContainer.y) * this.handShake;
        const xNoise = this.noise2D(this.handContainer.x, this.handContainer.y) * this.handShake;
        this.handContainer.y = Math.max(
            this.handBounds.y,
            Math.min(yNoise + this.handContainer.y, this.handBounds.y + this.handBounds.height)
        );
        this.handContainer.x += xNoise;
    }

    private checkHandDir() {
        if (this.handContainer.x < this.bounds.x) {
            this.handDir = 1;
        } else if (this.handContainer.x > this.bounds.x + this.bounds.width) {
            this.handDir = -1;
        }
    }
}
