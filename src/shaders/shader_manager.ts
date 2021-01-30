import GrayscalePipeline from './grayscale_pipeline';
import WavyPipeline from './wavy_pipeline';

export enum ShaderType {
    GRAYSCALE = 0x01,
    WAVY = 0x02,
}

function shaderTypeToKey(type: ShaderType): string {
    switch (type) {
        case ShaderType.GRAYSCALE:
            return GrayscalePipeline.KEY;
        case ShaderType.WAVY:
            return WavyPipeline.KEY;
    }
}

export class ShaderManager {
    pipelineManager: Phaser.Renderer.WebGL.PipelineManager;
    shaderMask: number;

    constructor(game: Phaser.Game) {
        this.shaderMask = 0;
        if (game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
            this.pipelineManager = game.renderer.pipelines;
            this.pipelineManager.addPostPipeline(
                shaderTypeToKey(ShaderType.GRAYSCALE),
                GrayscalePipeline
            );
            this.pipelineManager.addPostPipeline(shaderTypeToKey(ShaderType.WAVY), WavyPipeline);
        }
    }

    enableShader(camera: Phaser.Cameras.Scene2D.Camera, type: ShaderType, resetPipelines = true) {
        if (this.isShaderEnabled(type)) {
            return;
        }
        if (resetPipelines) {
            camera.resetPostPipeline();
            this.shaderMask = 0;
        }
        camera.setPostPipeline(shaderTypeToKey(type));
        this.shaderMask = this.shaderMask | (type as number);
    }

    isShaderEnabled(type: ShaderType): boolean {
        return (this.shaderMask & (type as number)) > 0;
    }

    update(camera: Phaser.Cameras.Scene2D.Camera) {
        if (this.isShaderEnabled(ShaderType.WAVY)) {
            this.updateWavyShader(camera);
        }
    }

    updateWavyShader(camera: Phaser.Cameras.Scene2D.Camera) {
        let shader = camera.getPostPipeline(WavyPipeline);
        if (shader instanceof Phaser.Renderer.WebGL.Pipelines.PostFXPipeline) {
            shader.setTime('time');
            shader.set1f('speed', 0.02);
            shader.set1f('waveLen', 0.02);
            shader.set1f('freq', 0.01);
        }
    }
}
