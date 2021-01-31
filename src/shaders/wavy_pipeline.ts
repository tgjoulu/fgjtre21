export default class WavyPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    // the unique id of this pipeline
    public static readonly KEY = 'Wavy';

    constructor(game: Phaser.Game) {
        super({
            game: game,
            name: WavyPipeline.KEY,
            renderTarget: true,
            fragShader: `
            precision mediump float;
            uniform float     time;
            uniform float     waveLen;
            uniform float     freq;
            uniform float     speed;
            uniform sampler2D uMainSampler;
            varying vec2 outTexCoord;
            void main(void) {
                vec2 uv = outTexCoord;
                uv.y += (sin((uv.x + (time * speed)) * 6.0) * waveLen) + (sin((uv.x + (time * speed)) * 20.0) * freq);
                uv.x += (cos((uv.y + (time * speed)) * 6.0) * waveLen) + (cos((uv.y + (time * speed)) * 20.0) * freq);
                vec4 texColor = texture2D(uMainSampler, uv);
                gl_FragColor = texColor;
            }`,
        });
    }
}
