import MazeHand from '../../objects/mazeHand';
import { ShaderType } from '../../shaders/shader_manager';
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

        const stuffGroup = this.matter.world.nextGroup();
    }

    update(timestamp: number, dt: number) {
        super.update(timestamp, dt);
        this.hand.update(dt);
    }
}
