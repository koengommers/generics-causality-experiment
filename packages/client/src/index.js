import Phaser from 'phaser';

import LoadScene from './scenes/LoadScene';
import IntroScene from './scenes/IntroScene';
import StartScene from './scenes/StartScene';
import ShowScene from './scenes/ShowScene';
import TownScene from './scenes/TownScene';
import FormScene from './scenes/FormScene';
import FinishScene from './scenes/FinishScene';

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
  scene: [LoadScene, StartScene, IntroScene, ShowScene, TownScene, FormScene, FinishScene],
  scale: {
    zoom: 2
  },
  autoCenter: Phaser.Scale.CENTER_BOTH,
  backgroundColor: '#171515'
};

export default new Phaser.Game(config);
