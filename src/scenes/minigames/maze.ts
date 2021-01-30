import MazeHand from '../../objects/mazeHand';
import { ShaderType } from '../../shaders/shader_manager';
import MiniGameBase from './minigamebase';

export default class Maze extends MiniGameBase {
    constructor() {
        super({ key: 'maze' });
    }

    preload() {
        super.preload();
        this.load.image('mazeBackground', '../../assets/minigame_1_bg.png');
        this.load.image('hand', '../../assets/hand.png');
        this.load.image('handLine', '../../assets/handline.png');
    }

    create() {
        super.create();
        //this.shaderManager.enableShader(this.cameras.main, ShaderType.WAVY);
        const bg = this.add
            .image(
                this.cameras.main.width / 2 + 58,
                this.cameras.main.height / 2 + 33,
                'mazeBackground'
            )
            .setScale(4);

        const hand = new MazeHand(this, 750, 450);
        this.input.setDraggable(hand);
    }

    update() {
        super.update();
    }
}
