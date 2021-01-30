import { ShaderType } from '../../shaders/shader_manager';
import MiniGameBase from './minigamebase';

export default class Maze extends MiniGameBase {
    constructor() {
        super({ key: 'maze' });
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        //this.shaderManager.enableShader(this.cameras.main, ShaderType.WAVY);
    }

    update() {
        super.update();
    }
}
