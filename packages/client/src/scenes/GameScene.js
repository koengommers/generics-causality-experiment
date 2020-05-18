import Phaser from 'phaser';

import generateLevels from '../utils/generateLevels';

import playerSprite from '../assets/player.png';
import playerJumpSprite from '../assets/player-jump.png';
import catSprite from '../assets/cat.png';
import sidewalkImg from '../assets/sidewalk.png';
import grassImg from '../assets/grass.png';
import singleStoryHome1 from '../assets/single-story-home-1.png';
import singleStoryHome2 from '../assets/single-story-home-2.png';
import multiStoryHome1 from '../assets/multi-story-home-1.png';
import multiStoryHome2 from '../assets/multi-story-home-2.png';
import multiStoryHome3 from '../assets/multi-story-home-3.png';
import singleStoryWarehouse from '../assets/single-story-warehouse.png';
import multiStoryWarehouse from '../assets/multi-story-warehouse.png';
import parkingLot from '../assets/parking-lot.png';
import greenCar from '../assets/green-car.png';
import greenTruck from '../assets/green-truck.png';
import redCar from '../assets/red-car.png';
import redTruck from '../assets/red-truck.png';
import smallGreenTree from '../assets/small-green-tree.png';
import bigGreenTree from '../assets/big-green-tree.png';
import smallPinkTree from '../assets/small-pink-tree.png';
import bigPinkTree from '../assets/big-pink-tree.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');

    this.levels = generateLevels(5);
  }

  init(props) {
    const { level = 1 } = props;
    this.currentLevel = level;
    this.level = this.levels[level-1];
    this.finished = false;
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
    this.load.spritesheet('cat', catSprite, {
      frameWidth: 15,
      frameHeight: 16,
      spacing: 2
    });
    this.load.image('sidewalk', sidewalkImg);
    this.load.image('grass', grassImg);
    this.load.image('single-story-home-1', singleStoryHome1);
    this.load.image('single-story-home-2', singleStoryHome2);
    this.load.image('multi-story-home-1', multiStoryHome1);
    this.load.image('multi-story-home-2', multiStoryHome2);
    this.load.image('multi-story-home-3', multiStoryHome3);
    this.load.image('single-story-warehouse', singleStoryWarehouse);
    this.load.image('multi-story-warehouse', multiStoryWarehouse);
    this.load.image('parking-lot', parkingLot);
    this.load.image('green-car', greenCar);
    this.load.image('green-truck', greenTruck);
    this.load.image('red-car', redCar);
    this.load.image('red-truck', redTruck);
    this.load.image('small-green-tree', smallGreenTree);
    this.load.image('big-green-tree', bigGreenTree);
    this.load.image('small-pink-tree', smallPinkTree);
    this.load.image('big-pink-tree', bigPinkTree);
  }

  create() {
    this.cameras.main.setBackgroundColor('#84dbff');

    const ground = this.createGround();
    this.createLevel();

    this.player = this.createPlayer();
    this.keys = this.createInput();

    this.physics.add.collider(this.player, ground);

    this.cameras.main.setBounds(0, 0, this.level.width*16, this.game.config.height);
    this.physics.world.setBounds(0, 0, this.level.width*16, this.game.config.height);

    this.cameras.main.startFollow(this.player, true, undefined, undefined, -16*16, 0);
    this.cameras.main.fadeIn(1000, 23, 21, 21);
  }

  createPlayer() {
    const player = this.physics.add.sprite(32, 270, 'player', 1);
    player.setCollideWorldBounds(true);
    player.setOffset(0, -10);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 10
    });

    this.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 0 }],
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'jump',
      frames: [{ key: 'player-jump', frame: 0 }],
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: 'fall',
      frames: [{ key: 'player-jump', frame: 1 }],
      frameRate: 1,
      repeat: -1
    });

    return player;
  }

  createGround() {
    const ground = this.physics.add.staticGroup();

    ['grass', 'sidewalk'].forEach((spriteName, i) => {
      const sprite = this.add.tileSprite(0, this.game.config.height - 48, this.level.width*16, 64, spriteName).setOrigin(0, i);
      ground.add(sprite);
    });

    return ground;
  }

  createLevel() {
    this.createBuildings();
    this.createForeground();

    const text = this.add.text(10, 10, `Town ${this.currentLevel}`);
    text.setScrollFactor(0);
  }

  createBuildings() {
    let x = 16*6;

    this.level.buildings.forEach((building) => {
      x += this.add.sprite(x, this.game.config.height - 108, building).setOrigin(0, 1).width;
    });
  }

  createForeground() {
    let x = 6;

    this.level.foreground.forEach(item => {
      if (item.type === 'parking') {
        this.add.sprite((x+2)*16, this.game.config.height, 'parking-lot').setOrigin(0, 1);
        item.cars.forEach((car, i) => {
          if (car) {
            const carX = (x + (i < 2 ? 4.5 : 9.5))*16;
            const y = this.game.config.height - (i % 2 ? 2 : 24);
            const sprite = this.add.sprite(carX, y, car).setOrigin(0.5, 1);
            if (i >= 2) {
              sprite.setFlipX(true);
            }
          }
        });
        x += 14;
      } else if (item.type === 'forest') {
        item.trees.forEach((tree) => {
          const treeX = x*16 + tree.x;
          const y = this.game.config.height - 3*16 + tree.y;
          this.add.sprite(treeX, y, tree.sprite).setOrigin(0.5, 1);
        });
        x += 8;
      }
    });
  }

  createInput() {
    return this.input.keyboard.addKeys({
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'a': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
      'd': Phaser.Input.Keyboard.KeyCodes.D,
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'w': Phaser.Input.Keyboard.KeyCodes.W,
      'space': Phaser.Input.Keyboard.KeyCodes.SPACE
    });
  }

  update() {
    this.checkFinish();
    this.updatePlayer();
  }

  checkFinish() {
    if (
      this.player.x > (this.level.width - 10)*16
      && !this.finished
    ) {
      this.finished = true;
      this.cameras.main.fadeOut(1000, 23, 21, 21);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        if (this.currentLevel < this.levels.length) {
          this.scene.restart({ level: this.currentLevel + 1});
        } else {
          this.scene.start('form-scene');
        }
      });
    }
  }

  updatePlayer() {
    const velocity = 80;

    if (this.keys.left.isDown || this.keys.a.isDown) {
      this.player.setVelocityX(-velocity);
      this.player.anims.play('run', true);
      this.player.setFlipX(true);
    } else if (this.keys.right.isDown || this.keys.d.isDown) {
      this.player.setVelocityX(velocity);
      this.player.anims.play('run', true);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }

    if (
      (this.keys.up.isDown || this.keys.w.isDown || this.keys.space.isDown)
      && this.player.body.onFloor()
    ) {
      this.player.setVelocityY(-150);
    }

    if (this.player.body.velocity.y < 0) {
      this.player.anims.play('jump');
    } else if (this.player.body.velocity.y > 0) {
      this.player.anims.play('fall');
    }
  }
}
