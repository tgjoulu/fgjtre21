import 'phaser';

import MainScene from './scenes/main';
import MainMenuScene from './scenes/main_menu';
import * as MiniGames from './scenes/minigames';
import HeartBeat from './objects/heartbeat';
import GoodEnding from './scenes/good_ending';

const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 576;

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    render: {
        pixelArt: true,
    },
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    scene: [
        MainMenuScene,
        MainScene,
        MiniGames.Maze,
        MiniGames.Pizza,
        HeartBeat,
        MiniGames.Pile,
        MiniGames.Popupper,
        GoodEnding,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    title: 'Degen After',
};

window.addEventListener('load', () => {
    const game = new Phaser.Game(config);
});
