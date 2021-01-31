import MiniGameBase from './minigamebase';

export default class Phone extends MiniGameBase {
    private acceptSliderButton: Phaser.GameObjects.Image;
    private declineSliderButton: Phaser.GameObjects.Image;

    private phoneCall: Phaser.Sound.BaseSound;
    private phoneBusy: Phaser.Sound.BaseSound;
    private callListened: boolean = false;
    private originalBg: any = null;

    constructor() {
        super({ key: 'phone' });
    }

    create() {
        super.create();

        this.originalBg = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'phoneGameBackgroundStart'
        );
        this.originalBg.setScale(4);

        this.declineSliderButton = this.add.image(385, 346, 'declinePhoneSliderButton').setScale(4);
        this.declineSliderButton.setInteractive();
        this.declineSliderButton.on('pointerdown', () => {
            this.phoneCall.stop();
            this.phoneBusy.isPlaying ? null : this.phoneBusy.play();
            this.callListened ? this.goodEnding() : this.badEnding();
        });

        this.acceptSliderButton = this.add.image(333, 270, 'acceptPhoneSliderButton').setScale(4);
        this.acceptSliderButton.setInteractive();
        this.acceptSliderButton.on('pointerdown', this.acceptClickHandler.bind(this));

        this.phoneCall = this.sound.add('phonecall');
        this.phoneBusy = this.sound.add('phone_busy');
    }

    private goodEnding() {
        // TODO: call whatever to relay goodending
        console.log('Phonegame goodending');
        this.stop();
    }

    private badEnding() {
        // TODO: call whatever to relay badending
        console.log('Phonegame badending');
        this.stop();
    }

    private acceptClickHandler() {
        this.originalBg.setVisible(false);
        this.acceptSliderButton.setVisible(false);

        this.declineSliderButton.setPosition(402, 343);
        this.declineSliderButton.setDepth(100);
        this.originalBg = this.add
            .image(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                'phoneGameBackgroundEnd'
            )
            .setScale(4);

        let call = this.phoneCall;
        call.once('complete', (_music) => {
            this.callListened = true;
            this.phoneBusy.play();
        });
        call.play();
    }

    update(timestamp: number, dt: number) {
        super.update(timestamp, dt);
    }
}
