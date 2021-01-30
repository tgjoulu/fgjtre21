import Player from './player';

export default class Thing extends Phaser.GameObjects.Rectangle {
    player: Player;

    constructor(scene: Phaser.Scene, x: number, y: number, player: Player, minigameKey: string) {
        super(scene, x, y, 64, 64, 1, 0.5);
        this.setInteractive();

        this.player = player;

        scene.add.existing(this);

        this.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            if (this.playerIsClose()) {
                this.player.movementDisabled = true;
                scene.scene.launch(minigameKey, {
                    onDestroy: () => {
                        this.player.movementDisabled = false;
                    },
                });
            }
        });
    }

    update() {
        if (this.playerIsClose()) {
            // update highlighting here
        }
    }

    playerIsClose() {
        return Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y) < 75;
    }
}
