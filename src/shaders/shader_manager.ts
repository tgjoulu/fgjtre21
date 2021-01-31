import GrayscalePipeline from './grayscale_pipeline';
import LightPipeline from './light_pipeline';
import RotationPipeline from './rotation_pipeline';
import WavyPipeline from './wavy_pipeline';

export enum ShaderType {
    GRAYSCALE,
    WAVY,
    LIGHT,
    ROTATION,
}

function shaderTypeToKey(type: ShaderType): string {
    switch (type) {
        case ShaderType.GRAYSCALE:
            return GrayscalePipeline.KEY;
        case ShaderType.WAVY:
            return WavyPipeline.KEY;
        case ShaderType.LIGHT:
            return LightPipeline.KEY;
        case ShaderType.ROTATION:
            return RotationPipeline.KEY;
    }
}

function shaderTypeToClass(type: ShaderType) {
    switch (type) {
        case ShaderType.GRAYSCALE:
            return GrayscalePipeline;
        case ShaderType.WAVY:
            return WavyPipeline;
        case ShaderType.LIGHT:
            return LightPipeline;
        case ShaderType.ROTATION:
            return RotationPipeline;
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
            this.pipelineManager.addPostPipeline(shaderTypeToKey(ShaderType.LIGHT), LightPipeline);
            this.pipelineManager.addPostPipeline(
                shaderTypeToKey(ShaderType.ROTATION),
                RotationPipeline
            );
        }
    }

    enableShader(camera: Phaser.Cameras.Scene2D.Camera, type: ShaderType, resetPipelines = true) {
        if (this.getShader(camera, type)) {
            console.log('Warning: same shader added twice');
            return;
        }
        if (resetPipelines) {
            camera.resetPostPipeline();
            camera.setPipelineData('followTarget', null);
        }
        camera.setPostPipeline(shaderTypeToKey(type));
    }

    setLightShaderTarget(
        camera: Phaser.Cameras.Scene2D.Camera,
        target: Phaser.GameObjects.Components.Transform
    ) {
        camera.setPipelineData('followTarget', target);
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

    update(camera: Phaser.Cameras.Scene2D.Camera, pointer: Phaser.Input.Pointer) {
        const wavyShader = this.getShader(camera, ShaderType.WAVY);
        if (wavyShader) {
            this.updateWavyShader(wavyShader);
        }
        const lightShader = this.getShader(camera, ShaderType.LIGHT);
        if (lightShader) {
            this.updateLightShader(lightShader, pointer, camera.pipelineData['followTarget']);
        }
        const rotationShader = this.getShader(camera, ShaderType.ROTATION);
        if (rotationShader) {
            this.updateRotationShader(rotationShader);
        }
    }

    private updateWavyShader(shader: WavyPipeline) {
        shader.setTime('time');
        // No need to adjust on every update, but could scale to heartbeat
        shader.set1f('speed', 0.01);
        shader.set1f('waveLen', 0.01);
        shader.set1f('freq', 0.005);
    }

    private updateRotationShader(shader: RotationPipeline) {
        shader.setTime('time');
        // No need to adjust on every update, but could scale to heartbeat
        shader.set2f('resolution', 1024, 576);
    }

    private updateLightShader(
        shader: LightPipeline,
        pointer: Phaser.Input.Pointer,
        followTarget: Phaser.GameObjects.Components.Transform | null
    ) {
        let x = pointer.x;
        let y = pointer.y;
        if (followTarget) {
            x = followTarget.x;
            y = followTarget.y;
        }
        shader.set1f('tx', x / 576);
        shader.set1f('ty', 1 - y / 576);
        // No need to adjust on every update, but could scale to heartbeat
        shader.set1f('r', 0.15);
        shader.set2f('resolution', 576, 576);
    }
}
