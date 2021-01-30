export default class HeartBeat extends Phaser.Scene {
    constructor() {
        super({ key: 'heartbeatSounds' });
    }

    create() {
        this.sound.play('heartbeat_slow', {
            loop: true,
        });
    }
}
