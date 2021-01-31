import Player from './player';

export default class Thing extends Phaser.GameObjects.Rectangle {
    player: Player;
    parentScene: Phaser.Scene;
    completed: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, player: Player, minigameKey: string) {
        super(scene, x, y, 64, 64, 1, 0.5);
        this.parentScene = scene;
        this.setInteractive();

        this.player = player;

        scene.add.existing(this);

        this.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            if (this.playerIsClose()) {
                this.parentScene.input.enabled = false;
                let newScene = scene.scene.get(minigameKey);
                newScene.events.on('onComplete', () => {
                    this.completed = true;
                    this.emit('onComplete');
                });

                scene.scene.launch(minigameKey, {
                    onDestroy: () => {
                        this.parentScene.input.enabled = true;
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

    isComplete(): boolean {
        return this.completed;
    }

    playerIsClose() {
        return Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y) < 75;
    }
}
