import MazeHand from '../../objects/mazeHand';
import { ShaderType } from '../../shaders/shader_manager';
import { GameObjectOverrideWithSetCollisionGroup } from '../../typings';
import MiniGameBase from './minigamebase';

export default class Maze extends MiniGameBase {
    hand: MazeHand;
    constructor() {
        super({
            key: 'maze',
            physics: {
                matter: {
                    debug: true,
                    gravity: {
                        x: 0,
                        y: 0,
                    },
                },
            },
        });
    }

    create() {
        super.create();
        //this.shaderManager.enableShader(this.cameras.main, ShaderType.WAVY);
        const bg = this.add
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'minigame_1_bg')
            .setScale(4);

        this.hand = new MazeHand(this, this.matter.world, 750, 450);
        this.input.setDraggable(this.hand);

        // Spotlight on hand?
        this.shaderManager.enableShader(this.cameras.main, ShaderType.LIGHT);
        this.shaderManager.setLightShaderTarget(this.cameras.main, this.hand);
        this.initObstacles();
        const key = this.matter.add
            .image(255, 131, 'key', undefined, {
                label: 'Key',
                isStatic: true,
                vertices: [
                    new Phaser.Math.Vector2(-20, -10),
                    new Phaser.Math.Vector2(16, -10),
                    new Phaser.Math.Vector2(16, 8),
                    new Phaser.Math.Vector2(-20, 8),
                ],
            })
            .setOrigin(0.5, 0.5)
            .setScale(4);
    }

    update(timestamp: number, dt: number) {
        super.update(timestamp, dt);
        this.hand.update(dt);
    }

    initObstacles() {
        const can1 = this.matter.add
            .image(203, 405, 'can', undefined, {
                label: 'obstacle',
                isStatic: true,
                vertices: [
                    new Phaser.Math.Vector2(0, -8),
                    new Phaser.Math.Vector2(16, -8),
                    new Phaser.Math.Vector2(16, 20),
                    new Phaser.Math.Vector2(0, 20),
                ],
            })
            .setScale(4);
        const can2 = this.matter.add
            .image(657, 253, 'can', undefined, {
                label: 'obstacle',
                isStatic: true,
                vertices: [
                    new Phaser.Math.Vector2(0, -8),
                    new Phaser.Math.Vector2(16, -8),
                    new Phaser.Math.Vector2(16, 15),
                    new Phaser.Math.Vector2(0, 15),
                ],
            })
            .setScale(4);
        const bagOfChips = this.matter.add
            .image(510, 423, 'bag_of_chips', undefined, {
                label: 'obstacle',
                isStatic: true,
                vertices: [
                    new Phaser.Math.Vector2(-30, -12),
                    new Phaser.Math.Vector2(16, -12),
                    new Phaser.Math.Vector2(16, 10),
                    new Phaser.Math.Vector2(-30, 10),
                ],
            })
            .setScale(4);
        const chips = this.matter.add
            .image(321, 429, 'chips', undefined, {
                label: 'obstacle',
                isStatic: true,
                vertices: [
                    new Phaser.Math.Vector2(0, 0),
                    new Phaser.Math.Vector2(45, 0),
                    new Phaser.Math.Vector2(45, 20),
                    new Phaser.Math.Vector2(0, 20),
                ],
            })
            .setScale(4);
        const sock = this.matter.add
            .image(149, 285, 'sock', undefined, {
                label: 'obstacle',
                isStatic: true,
                vertices: [
                    new Phaser.Math.Vector2(0, 0),
                    new Phaser.Math.Vector2(45, 0),
                    new Phaser.Math.Vector2(45, 30),
                    new Phaser.Math.Vector2(0, 30),
                ],
            })
            .setAngle(78)
            .setScale(4);
        const panties = this.matter.add
            .image(381, 249, 'panties', undefined, {
                label: 'obstacle',
                isStatic: true,
                vertices: [
                    new Phaser.Math.Vector2(0, 0),
                    new Phaser.Math.Vector2(45, 0),
                    new Phaser.Math.Vector2(35, 20),
                    new Phaser.Math.Vector2(15, 20),
                ],
            })
            .setOrigin(0.5, 0.5)
            .setScale(4);
        const banana1 = this.matter.add
            .image(440, 168, 'banana', undefined, {
                label: 'obstacle',
                isStatic: true,
                vertices: [
                    new Phaser.Math.Vector2(0, 0),
                    new Phaser.Math.Vector2(45, 0),
                    new Phaser.Math.Vector2(45, 20),
                    new Phaser.Math.Vector2(0, 20),
                ],
            })
            .setAngle(13)
            .setScale(4);
        const banana2 = this.matter.add
            .image(450, 100, 'banana', undefined, {
                label: 'obstacle',
                isStatic: true,
                vertices: [
                    new Phaser.Math.Vector2(0, 0),
                    new Phaser.Math.Vector2(45, 0),
                    new Phaser.Math.Vector2(45, 20),
                    new Phaser.Math.Vector2(0, 20),
                ],
            })
            .setScale(4);

        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if (bodyA.label === 'Circle Body' && bodyB.label == 'obstacle') {
                this.hand.startRetract();
            }

            if (bodyA.label === 'Circle Body' && bodyB.label == 'Key') {
                console.log('VOITIT AASI!');
            }
        });
    }
}
