export default class HeartBeat extends Phaser.Scene {
    currentHBSound: Phaser.Sound.BaseSound;
    currentHB: number = 100;

    constructor() {
        super({ key: 'heartbeatSounds' });
    }

    create() {
        this.currentHBSound = this.sound.add('heartbeat_slow', {
            loop: true,
        });
        this.currentHBSound.play();
    }

    setBPM(bpm: number) {
        this.currentHB = bpm;
        this.currentHBSound = this.sound.add(`hb-${bpm}`, {
            loop: true,
        });
        this.currentHBSound.play();
    }

    public increase() {
        this.currentHBSound.stop();
        this.setBPM(Math.min(this.currentHB + 10, 200));
        console.log('increase');
    }

    public decrease() {
        this.currentHBSound.stop();
        this.setBPM(Math.max(this.currentHB - 10, 100));
        console.log('increase');
    }
}
