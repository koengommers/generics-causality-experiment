import Phaser from 'phaser';

import playerSprite from '../assets/player.png';
import playerJumpSprite from '../assets/player-jump.png';
import sidewalkImg from '../assets/sidewalk.png';
import grassImg from '../assets/grass.png';
import parkingLot from '../assets/parking-lot.png';
import policeMan from '../assets/police-man.png';

import houseBrickDotted1 from '../assets/subjects/house-brick-dotted-1.png';
import houseBrickDotted2 from '../assets/subjects/house-brick-dotted-2.png';
import houseBrickGray from '../assets/subjects/house-brick-gray.png';
import houseBrickTiles1 from '../assets/subjects/house-brick-tiles-1.png';
import houseBrickTiles2 from '../assets/subjects/house-brick-tiles-2.png';
import houseWoodDotted1 from '../assets/subjects/house-wood-dotted-1.png';
import houseWoodDotted2 from '../assets/subjects/house-wood-dotted-2.png';
import houseWoodGray from '../assets/subjects/house-wood-gray.png';
import houseWoodTiles1 from '../assets/subjects/house-wood-tiles-1.png';
import houseWoodTiles2 from '../assets/subjects/house-wood-tiles-2.png';
import personManBlue from '../assets/subjects/person-man-blue.png';
import personManGray from '../assets/subjects/person-man-gray.png';
import personManGreen from '../assets/subjects/person-man-green.png';
import personWomanBlue from '../assets/subjects/person-woman-blue.png';
import personWomanGray from '../assets/subjects/person-woman-gray.png';
import personWomanGreen from '../assets/subjects/person-woman-green.png';
import treeGreenLarge from '../assets/subjects/tree-green-large.png';
import treeGreenLargeGray from '../assets/subjects/tree-green-large-gray.png';
import treeGreenSmall from '../assets/subjects/tree-green-small.png';
import treeGreenSmallGray from '../assets/subjects/tree-green-small-gray.png';
import treePinkLarge from '../assets/subjects/tree-pink-large.png';
import treePinkLargeGray from '../assets/subjects/tree-pink-large-gray.png';
import treePinkSmall from '../assets/subjects/tree-pink-small.png';
import treePinkSmallGray from '../assets/subjects/tree-pink-small-gray.png';
import vehicleCarGold from '../assets/subjects/vehicle-car-gold.png';
import vehicleCarGray from '../assets/subjects/vehicle-car-gray.png';
import vehicleCarGreen from '../assets/subjects/vehicle-car-green.png';
import vehicleCarRed from '../assets/subjects/vehicle-car-red.png';
import vehicleTruckGold from '../assets/subjects/vehicle-truck-gold.png';
import vehicleTruckGray from '../assets/subjects/vehicle-truck-gray.png';
import vehicleTruckGreen from '../assets/subjects/vehicle-truck-green.png';
import vehicleTruckRed from '../assets/subjects/vehicle-truck-red.png';

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
    this.load.image('parking-lot', parkingLot);
    this.load.image('police-man', policeMan);

    this.load.image('house-brick-dotted-1', houseBrickDotted1);
    this.load.image('house-brick-dotted-2', houseBrickDotted2);
    this.load.image('house-brick-gray', houseBrickGray);
    this.load.image('house-brick-tiles-1', houseBrickTiles1);
    this.load.image('house-brick-tiles-2', houseBrickTiles2);
    this.load.image('house-wood-dotted-1', houseWoodDotted1);
    this.load.image('house-wood-dotted-2', houseWoodDotted2);
    this.load.image('house-wood-gray', houseWoodGray);
    this.load.image('house-wood-tiles-1', houseWoodTiles1);
    this.load.image('house-wood-tiles-2', houseWoodTiles2);
    this.load.image('person-man-blue', personManBlue);
    this.load.image('person-man-gray', personManGray);
    this.load.image('person-man-green', personManGreen);
    this.load.image('person-woman-blue', personWomanBlue);
    this.load.image('person-woman-gray', personWomanGray);
    this.load.image('person-woman-green', personWomanGreen);
    this.load.image('tree-green-large', treeGreenLarge);
    this.load.image('tree-green-large-gray', treeGreenLargeGray);
    this.load.image('tree-green-small', treeGreenSmall);
    this.load.image('tree-green-small-gray', treeGreenSmallGray);
    this.load.image('tree-pink-large', treePinkLarge);
    this.load.image('tree-pink-large-gray', treePinkLargeGray);
    this.load.image('tree-pink-small', treePinkSmall);
    this.load.image('tree-pink-small-gray', treePinkSmallGray);
    this.load.image('vehicle-car-gold', vehicleCarGold);
    this.load.image('vehicle-car-gray', vehicleCarGray);
    this.load.image('vehicle-car-green', vehicleCarGreen);
    this.load.image('vehicle-car-red', vehicleCarRed);
    this.load.image('vehicle-truck-gold', vehicleTruckGold);
    this.load.image('vehicle-truck-gray', vehicleTruckGray);
    this.load.image('vehicle-truck-green', vehicleTruckGreen);
    this.load.image('vehicle-truck-red', vehicleTruckRed);
  }

  create() {
    this.scene.start('intro-scene')
  }
}
