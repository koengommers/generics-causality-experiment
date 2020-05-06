import Phaser from 'phaser';

import playerSprite from '../assets/player.png';
import sidewalkImg from '../assets/sidewalk.png';
import grassImg from '../assets/grass.png';
import house1 from '../assets/house1.png';
import house2 from '../assets/house2.png';
import house3 from '../assets/house3.png';
import house4 from '../assets/house4.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');

    this.levels = [
      ['house1', 'house2', 'house3', 'house4'],
      ['house2', 'house4', 'house3', 'house4'],
      ['house3', 'house2', 'house1', 'house4'],
      ['house1', 'house4', 'house3', 'house1'],
      ['house3', 'house2', 'house4', 'house4']
    ]
    this.houseMargin = 16*6;
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
    this.load.image('sidewalk', sidewalkImg);
    this.load.image('grass', grassImg);
    this.load.image('house1', house1);
    this.load.image('house2', house2);
    this.load.image('house3', house3);
    this.load.image('house4', house4);
  }

  create() {
    this.cameras.main.setBackgroundColor('#84dbff');

    const text = this.add.text(10, 10, `Town ${this.currentLevel}`);
    text.setScrollFactor(0);

    this.createForeground();
    const x = this.createHouses();
    this.player = this.createPlayer();
    this.keys = this.createInput();

    this.levelWidth = x + this.houseMargin;
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.game.config.height);
    this.physics.world.setBounds(0, 0, this.levelWidth, this.game.config.height);

    this.cameras.main.startFollow(this.player, true, undefined, undefined, -32*8, 0);
  }

  createPlayer() {
    const player = this.physics.add.sprite(32, 270, 'player', 1);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 10
    });

    this.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 1 }],
      frameRate: 1,
      repeat: -1
    });

    return player
  }

  createHouses() {
    let x = this.houseMargin;

    this.levels[this.currentLevel-1].forEach((house) => {
      x += this.add.sprite(x, this.game.config.height - 108, house).setOrigin(0, 1).width;
    });

    return x
  }

  createForeground() {
    const sidewalk = this.add.tileSprite(0, this.game.config.height - 48, 1280, 64, 'sidewalk');
    sidewalk.setOrigin(0, 1);

    const grass = this.add.tileSprite(0, this.game.config.height - 48, 1280, 64, 'grass');
    grass.setOrigin(0, 0);
  }

  createInput() {
    return this.input.keyboard.addKeys({
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'a': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
      'd': Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  update() {
    if (this.player.x > this.levelWidth - 32) {
      if (this.currentLevel < this.levels.length) {
        this.scene.restart({ level: this.currentLevel + 1});
      } else {
        this.scene.stop();
      }
    }

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
  }
}
