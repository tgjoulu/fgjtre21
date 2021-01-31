export default class RotationPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    // the unique id of this pipeline
    public static readonly KEY = 'Rotation';

    constructor(game: Phaser.Game) {
        super({
            game: game,
            name: RotationPipeline.KEY,
            renderTarget: true,
            fragShader: `
            precision mediump float;
            uniform float     time;
            uniform vec2  resolution;

            uniform sampler2D uMainSampler;
            varying vec2 outTexCoord;
            void main(void) {
                vec2 uv = outTexCoord;
                float center = 0.5;
                vec2 st = vec2(gl_FragCoord.x / resolution.x,gl_FragCoord.y / resolution.y);
                vec2 origin = vec2(st.x - center, st.y - center);
                float dist = distance(st,vec2(center, center)) * 0.2;
                float rot = dist * time * 0.05 * sin(dist * time);
                float s = sin(rot);
                float c = cos(rot);
                uv.x = (origin.x * c + origin.y * s + center);
                uv.y = (origin.y * c - origin.x * s + center);
                vec4 texColor = texture2D(uMainSampler, uv);
                gl_FragColor = texColor;
            }`,
        });
    }
}
