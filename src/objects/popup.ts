export default class Popup extends Phaser.GameObjects.Image {
    private static readonly textures = ['popup1', 'popup2', 'popup3', 'popup4', 'popup5', 'popup6'];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        const tex = Phaser.Math.RND.pick(Popup.textures);
        super(scene, x, y, tex);

        const scale = 4;
        const okButtonShape = new Phaser.Geom.Rectangle(10, 28, 20, 10);
        this.setScale(scale);
        this.setInteractive(okButtonShape, Phaser.Geom.Rectangle.Contains);
        scene.add.existing(this);
    }
}
