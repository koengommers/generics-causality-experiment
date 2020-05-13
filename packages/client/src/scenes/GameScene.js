import Phaser from 'phaser';
import _ from 'lodash';

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
import greenTree from '../assets/green-tree.png';
import pinkTree from '../assets/pink-tree.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');

    this.levels = this.divideBuildings(5, [{
      images: ['single-story-home-1', 'single-story-home-2'],
      number: 2*3
    }, {
      images: ['multi-story-home-1', 'multi-story-home-2', 'multi-story-home-3'],
      number: 8*3
    }, {
      images: ['single-story-warehouse'],
      number: 7
    }, {
      images: ['multi-story-warehouse'],
      number: 3
    }]);
    this.houseMargin = 16*6;
  }

  divideBuildings(nTowns, buildings) {
    const totalBuildings = _.sumBy(buildings, 'number');
    const chunks = _(buildings)
      .flatMap((building) => _.times(building.number, () => _.sample(building.images)))
      .shuffle()
      .chunk(_.floor(totalBuildings / nTowns))
      .value();
    if (chunks.length > nTowns) {
      const leftovers = _.last(chunks);
      return _.shuffle(_.map(_.take(chunks, nTowns), (chunk, i) => {
        if (i < leftovers.length) {
          return chunk.concat([leftovers[i]]);
        }
        return chunk;
      }));
    }
    return chunks;
  }

  init(props) {
    const { level = 1 } = props;
    this.currentLevel = level;
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
    this.load.image('green-tree', greenTree);
    this.load.image('pink-tree', pinkTree);
  }

  create() {
    this.cameras.main.setBackgroundColor('#84dbff');

    const foreground = this.createForeground();
    const x = this.createHouses();
    this.player = this.createPlayer();
    this.createParkingLot();
    this.car = this.createCar();
    this.keys = this.createInput();
    this.createTrees();
    this.cat = this.createCat();

    this.physics.add.collider(this.player, foreground);

    this.levelWidth = x + this.houseMargin;
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.game.config.height);
    this.physics.world.setBounds(0, 0, this.levelWidth, this.game.config.height);

    const text = this.add.text(10, 10, `Town ${this.currentLevel}`);
    text.setScrollFactor(0);

    this.cameras.main.startFollow(this.player, true, undefined, undefined, -32*8, 0);
    this.cameras.main.fadeIn(2000);
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

  createCar() {
    const car = this.physics.add.sprite(-32, 312, 'green-car');
    car.setOrigin(0.5, 1);
    car.body.setAllowGravity(false);

    return car;
  }

  createCat() {
    const cat = this.physics.add.sprite(600, this.game.config.height - 30, 'cat', 1);
    cat.body.setAllowGravity(false);
    
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('cat'),
      frameRate: 10,
      repeat: -1
    });

    cat.anims.play('walk');

    return cat;
  }

  createParkingLot() {
    this.add.sprite(16*17, this.game.config.height, 'parking-lot').setOrigin(0, 1);
    this.add.sprite(16*19.5, this.game.config.height - 24, 'red-truck').setOrigin(0.5, 1);
    this.add.sprite(16*19.5, this.game.config.height - 2, 'red-car').setOrigin(0.5, 1);
    this.add.sprite(16*24.5, this.game.config.height - 24, 'green-car').setOrigin(0.5, 1).setFlipX(true);
    this.add.sprite(16*24.5, this.game.config.height - 2, 'green-truck').setOrigin(0.5, 1).setFlipX(true);
  }

  createHouses() {
    let x = this.houseMargin;

    this.levels[this.currentLevel-1].forEach((house) => {
      x += this.add.sprite(x, this.game.config.height - 108, house).setOrigin(0, 1).width;
    });

    return x;
  }

  createTrees() {
    this.add.sprite(200, 360, 'green-tree').setOrigin(0.5, 1);
    this.add.sprite(230, 380, 'green-tree').setOrigin(0.5, 1);
    this.add.sprite(500, 360, 'pink-tree').setOrigin(0.5, 1);
    this.add.sprite(180, 370, 'pink-tree').setOrigin(0.5, 1);
    this.add.sprite(480, 380, 'green-tree').setOrigin(0.5, 1);
  }

  createForeground() {
    const foreground = this.physics.add.staticGroup()

    const sidewalk = this.add.tileSprite(0, this.game.config.height - 48, 1280, 64, 'sidewalk');
    sidewalk.setOrigin(0, 1);
    foreground.add(sidewalk);

    const grass = this.add.tileSprite(0, this.game.config.height - 48, 1280, 64, 'grass');
    grass.setOrigin(0, 0);
    foreground.add(grass);

    return foreground;
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
    if (this.cat.x <= 600) {
      this.cat.setVelocityX(30);
      this.cat.setFlipX(false);
    } else if (this.cat.x > 700) {
      this.cat.setVelocityX(-30);
      this.cat.setFlipX(true);
    }

    if (this.player.x > this.levelWidth - 32) {
      this.cameras.main.fadeOut(2000);
      if (this.currentLevel < this.levels.length) {
        this.scene.restart({ level: this.currentLevel + 1});
      } else {
        this.scene.start('form-scene');
      }
    }

    const velocity = 80;

    if (this.player.x > (1/8)*this.levelWidth) {
      this.car.setVelocityX(velocity*2);
    }

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
      (this.keys.up.isDown || this.keys.w.isDown || this.keys.space.isDown) &&
      this.player.body.onFloor()
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
