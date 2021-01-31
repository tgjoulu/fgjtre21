export default class HeartBeat extends Phaser.Scene {
    currentHBSound: Phaser.Sound.BaseSound;
    currentHB: number = 60;

    constructor() {
        super({ key: 'heartbeatSounds' });
    }

    create() {
        this.currentHBSound = this.sound.add('heartbeat_slow', {
            loop: true,
        });
        this.currentHBSound.play();
        // this.setBPM(60);
    }

    setBPM(bpm: number) {
        this.currentHB = bpm;
        this.currentHBSound.stop();
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
        this.setBPM(Math.max(this.currentHB - 10, 60));
        console.log('increase');
    }

    public stop() {
        this.currentHBSound.stop();
    }
}
