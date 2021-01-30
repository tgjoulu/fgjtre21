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

function shaderTypeToClass(type: ShaderType) {
    switch (type) {
        case ShaderType.GRAYSCALE:
            return GrayscalePipeline;
        case ShaderType.WAVY:
            return WavyPipeline;
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
        if (this.getShader(camera, type)) {
            console.log('Warning: same shader added twice');
            return;
        }
        if (resetPipelines) {
            camera.resetPostPipeline();
            this.shaderMask = 0;
        }
        camera.setPostPipeline(shaderTypeToKey(type));
        this.shaderMask = this.shaderMask | (type as number);
    }

    private getShader(
        camera: Phaser.Cameras.Scene2D.Camera,
        type: ShaderType
    ): Phaser.Renderer.WebGL.Pipelines.PostFXPipeline | null {
        let shader = camera.getPostPipeline(shaderTypeToClass(type));
        if (shader instanceof Phaser.Renderer.WebGL.Pipelines.PostFXPipeline) {
            return shader;
        }
        return null;
    }

    update(camera: Phaser.Cameras.Scene2D.Camera) {
        const wavyShader = this.getShader(camera, ShaderType.WAVY);
        if (wavyShader) {
            this.updateWavyShader(wavyShader);
        }
    }

    updateWavyShader(shader: WavyPipeline) {
        shader.setTime('time');
        shader.set1f('speed', 0.01);
        shader.set1f('waveLen', 0.01);
        shader.set1f('freq', 0.005);
    }
}
