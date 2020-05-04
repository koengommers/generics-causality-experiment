import Phaser from 'phaser';

import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 384,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [GameScene],
  scale: {
    zoom: 2
  },
  backgroundColor: 0x84dbff
};

export default new Phaser.Game(config);
