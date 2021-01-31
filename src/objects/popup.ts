export default class Popup extends Phaser.GameObjects.Image {
    private static readonly textures = ['kebab', 'pizza'];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        const tex = Phaser.Math.RND.pick(Popup.textures);
        super(scene, x, y, tex);
        scene.add.existing(this);
    }
}
