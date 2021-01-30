export default class PointerPosText extends Phaser.GameObjects.Text {
    pointerX: integer;
    pointerY: integer;

    constructor(scene: Phaser.Scene) {
        super(scene, scene.cameras.main.width - 10, 10, '', { color: 'black', fontSize: '28px' });
        scene.add.existing(this);
        this.setOrigin(1, 0);
        scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            this.pointerX = Math.floor(pointer.x);
            this.pointerY = Math.floor(pointer.y);
        });
    }

    public update() {
        this.setText(`pointer: (${this.pointerX}, ${this.pointerY})`);
    }
}
