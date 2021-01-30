export default class HeartBeat extends Phaser.Scene {
    constructor() {
        super({ key: 'heartbeatSounds' });
    }

    preload() {
        this.load.audio('heartbeat_audio', [
            '../assets/sound/HB-100bpm.wav',
            // '../assets/sound/HB-120bpm.wav',
            // '../assets/sound/HB-130bpm.wav',
            // '../assets/sound/HB-150bpm.wav',
            // '../assets/sound/HB-160bpm.wav',
            // '../assets/sound/HB-180bpm.wav',
            // '../assets/sound/HB-200bpm.wav',
            // '../assets/sound/HB-210bpm.wav',
        ]);
    }

    create() {
        this.sound.play('heartbeat_audio', {
            loop: true,
        });
    }
}
