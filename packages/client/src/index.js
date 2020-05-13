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
      gravity: { y: 300 }
    }
  },
  dom: {
    createContainer: true
  },
  scene: [GameScene, FormScene],
  scale: {
    zoom: 2
  },
  autoCenter: Phaser.Scale.CENTER_BOTH,
  backgroundColor: '#171515'
};

export default new Phaser.Game(config);
