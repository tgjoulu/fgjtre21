export default class HeartBeat extends Phaser.Scene {
    currentHBSound: Phaser.Sound.BaseSound;
    currentHB: number;

    constructor() {
        super({ key: 'heartbeatSounds' });
    }

    preload() {
        this.load.audio('hb-100', '../assets/sound/hb2_100bpm.wav');
        this.load.audio('hb-110', '../assets/sound/hb2_110bpm.wav');
        this.load.audio('hb-120', '../assets/sound/hb2_120bpm.wav');
        this.load.audio('hb-130', '../assets/sound/hb2_130bpm.wav');
        this.load.audio('hb-140', '../assets/sound/hb2_140bpm.wav');
        this.load.audio('hb-150', '../assets/sound/hb2_150bpm.wav');
        this.load.audio('hb-160', '../assets/sound/hb2_160bpm.wav');
        this.load.audio('hb-170', '../assets/sound/hb2_170bpm.wav');
        this.load.audio('hb-180', '../assets/sound/hb2_180bpm.wav');
        this.load.audio('hb-190', '../assets/sound/hb2_190bpm.wav');
        this.load.audio('hb-200', '../assets/sound/hb2_200bpm.wav');
    }

    create() {
        this.setBPM(100);
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
