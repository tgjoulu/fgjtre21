import GrayscalePipeline from './grayscale_pipeline';

export class ShaderManager {
    pipelineManager: Phaser.Renderer.WebGL.PipelineManager;
    constructor(game: Phaser.Game) {
        if (game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
            this.pipelineManager = game.renderer.pipelines;
            this.pipelineManager.addPostPipeline(GrayscalePipeline.KEY, GrayscalePipeline);
        }
    }

    setGrayscale(camera: Phaser.Cameras.Scene2D.Camera) {
        camera.resetPostPipeline();
        camera.setPostPipeline(GrayscalePipeline.KEY);
    }
}
