import { ShaderType } from '../../shaders/shader_manager';
import MiniGameBase from './minigamebase';

export default class Pizza extends MiniGameBase {
    private micro: Phaser.GameObjects.Rectangle;
    private hand: Phaser.GameObjects.Rectangle;
    private pizza: Phaser.GameObjects.Rectangle;

    constructor() {
        super({ key: 'pizza' });
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        // Temp rects
        this.micro = this.add.rectangle(this.bounds.x, this.bounds.y, 100, 100, 0x6666ff);
        this.hand = this.add.rectangle(
            this.bounds.x + 100,
            this.bounds.y + 100,
            100,
            100,
            0x1166ff
        );
        this.pizza = this.add.rectangle(
            this.bounds.x + this.bounds.width / 2,
            this.bounds.y + this.bounds.height - 200,
            100,
            100,
            0x666611
        );
    }

    update() {
        super.update();
    }
}
