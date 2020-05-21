import Phaser from 'phaser';

import playerSprite from '../assets/player.png';
import playerJumpSprite from '../assets/player-jump.png';
import sidewalkImg from '../assets/sidewalk.png';
import grassImg from '../assets/grass.png';
import singleStoryHome1 from '../assets/single-story-home-1.png';
import singleStoryHome2 from '../assets/single-story-home-2.png';
import parkingLot from '../assets/parking-lot.png';
import greenCar from '../assets/green-car.png';
import greenTruck from '../assets/green-truck.png';
import redCar from '../assets/red-car.png';
import redTruck from '../assets/red-truck.png';
import smallGreenTree from '../assets/small-green-tree.png';
import bigGreenTree from '../assets/big-green-tree.png';
import smallPinkTree from '../assets/small-pink-tree.png';
import bigPinkTree from '../assets/big-pink-tree.png';
import person from '../assets/person.png';
import personBlue from '../assets/person-blue.png';
import policeMan from '../assets/police-man.png';

export default class LoadScene extends Phaser.Scene {
  constructor() {
    super('load-scene');
  }

  preload() {
    this.load.spritesheet('player', playerSprite, {
      frameWidth: 14,
      frameHeight: 24,
      spacing: 2
    });
    this.load.spritesheet('player-jump', playerJumpSprite, {
      frameWidth: 14,
      frameHeight: 24,
      spacing: 2
    });
    this.load.image('sidewalk', sidewalkImg);
    this.load.image('grass', grassImg);
    this.load.image('single-story-home-1', singleStoryHome1);
    this.load.image('single-story-home-2', singleStoryHome2);
    this.load.image('parking-lot', parkingLot);
    this.load.image('green-car', greenCar);
    this.load.image('green-truck', greenTruck);
    this.load.image('red-car', redCar);
    this.load.image('red-truck', redTruck);
    this.load.image('small-green-tree', smallGreenTree);
    this.load.image('big-green-tree', bigGreenTree);
    this.load.image('small-pink-tree', smallPinkTree);
    this.load.image('big-pink-tree', bigPinkTree);
    this.load.image('person', person);
    this.load.image('person-blue', personBlue);
    this.load.image('police-man', policeMan);
  }

  create() {
    this.scene.start('intro-scene')
  }
}
