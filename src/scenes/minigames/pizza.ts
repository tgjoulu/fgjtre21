import { ShaderType } from '../../shaders/shader_manager';
import MiniGameBase from './minigamebase';
import { Noise2D, makeNoise2D } from 'open-simplex-noise';

export default class Pizza extends MiniGameBase {
    private micro: Phaser.Geom.Rectangle;
    private handContainer: Phaser.GameObjects.Container;
    private hand: Phaser.GameObjects.Image;
    private pizza: Phaser.GameObjects.Rectangle;
    private clickEnabled: boolean = true;
    private handDir: number = -1;
    private handSpeed: number = 0.4;
    private handShake: number = 20;
    private handBounds: Phaser.Geom.Rectangle;
    private successBounds: { x: number; width: number };
    private pizzaOffset: { x: number; y: number };
    private noise2D: Noise2D;

    constructor() {
        super({ key: 'pizza' });
    }

    create() {
        super.create();

        var bg = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'pizzaGameBackground'
        );
        bg.setScale(4);

        this.micro = new Phaser.Geom.Rectangle(
            this.bounds.x + this.bounds.width / 2 - 95,
            this.bounds.y + this.bounds.height / 2 - 45,
            220,
            150
        );
        this.handContainer = this.add.container(
            this.bounds.x + 50,
            this.bounds.y + this.bounds.height - 70
        );
        this.hand = this.add.image(0, 0, 'hand').setScale(4);
        this.pizzaOffset = { x: -30, y: -25 };
        this.pizza = this.add.rectangle(this.pizzaOffset.x, this.pizzaOffset.y, 50, 50, 0x6666ff);
        this.handContainer.add(this.pizza);
        this.handContainer.add(this.hand);
        this.handBounds = new Phaser.Geom.Rectangle(
            this.bounds.x,
            this.bounds.y + this.bounds.height * 0.7,
            this.bounds.width,
            this.bounds.height * 0.3
        );
        this.noise2D = makeNoise2D(Date.now());
        this.successBounds = { x: this.micro.x, width: 100 };
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (this.clickEnabled) {
                this.resolveClick();
            }
        });
        this.shaderManager.enableShader(this.cameras.main, ShaderType.WAVY);
    }

    update(timestamp: number, dt: number) {
        super.update(timestamp, dt);
        if (this.handDir != 0) {
            this.moveHand(timestamp, dt);
            this.checkHandDir();
        }
    }

    private moveHand(timestamp: number, dt: number) {
        this.handContainer.x += this.handDir * dt * this.handSpeed;
        const yNoise = this.noise2D(this.handContainer.x, this.handContainer.y) * this.handShake;
        const xNoise =
            this.noise2D(this.handContainer.x, this.handContainer.y) * this.handShake * 1.5;
        this.handContainer.y = Math.max(
            this.handBounds.y,
            Math.min(yNoise + this.handContainer.y, this.handBounds.y + this.handBounds.height)
        );
        const xNoiseDir = Math.random() > 0.5 ? this.handDir : -this.handDir;
        this.handContainer.x += Math.abs(xNoise) * xNoiseDir;
    }

    private checkHandDir() {
        if (this.handContainer.x < this.bounds.x) {
            this.handDir = 1;
        } else if (this.handContainer.x > this.bounds.x + this.bounds.width) {
            this.handDir = -1;
        }
    }

    private resolveClick() {
        const halfWidth = this.successBounds.width / 2;
        const pizzaX = this.handContainer.x + this.pizzaOffset.x;
        if (
            pizzaX > this.successBounds.x - halfWidth &&
            pizzaX < this.successBounds.x + halfWidth
        ) {
            console.log('PIZZA GAME SUCCESS');
            this.handDir = 0;
            const moveHandToMicro = this.tweens.add({
                targets: this.handContainer,
                props: {
                    x: { value: this.micro.x + 25, duration: 100, ease: 'Linear' },
                    y: {
                        value: this.micro.y + 15,
                        duration: 1000,
                        ease: 'Quint.easeOut',
                    },
                },
            });
        } else {
            this.cameras.main.shake(100, 0.01);
            // cooldown
            this.clickEnabled = false;
            this.time.delayedCall(500, () => {
                this.enableClick();
            });
        }
    }

    private enableClick() {
        this.clickEnabled = true;
    }
}
