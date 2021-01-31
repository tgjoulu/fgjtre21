import MazeHand from '../../objects/mazeHand';
import { ShaderType } from '../../shaders/shader_manager';
import MiniGameBase from './minigamebase';

export default class Maze extends MiniGameBase {
    constructor() {
        super({ key: 'maze' });
    }

    create() {
        super.create();
        const bg = this.add
            .image(
                this.cameras.main.width / 2 + 58,
                this.cameras.main.height / 2 + 33,
                'minigame_1_bg'
            )
            .setScale(4);

        const hand = new MazeHand(this, 750, 450);
        this.input.setDraggable(hand);
        // Spotlight on hand?
        // this.shaderManager.enableShader(this.cameras.main, ShaderType.LIGHT);
        // this.shaderManager.setLightShaderTarget(this.cameras.main, hand);
    }

    update(timestamp: number, dt: number) {
        super.update(timestamp, dt);
    }
}
