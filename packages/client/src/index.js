import Phaser from 'phaser';

import GameScene from './scenes/GameScene';
import FormScene from './scenes/FormScene';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser',
  width: 640,
  height: 384,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  dom: {
    createContainer: true
  },
  scene: [GameScene, FormScene],
  scale: {
    zoom: 2
  }
};

export default new Phaser.Game(config);
