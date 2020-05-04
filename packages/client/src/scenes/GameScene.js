import Phaser from 'phaser';

import playerSprite from '../assets/player.png';
import sidewalkImg from '../assets/sidewalk.png';
import grassImg from '../assets/grass.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
  }

  preload() {
    this.load.spritesheet('player', playerSprite, {
      frameWidth: 14,
      frameHeight: 24,
      spacing: 2
    });
    this.load.image('sidewalk', sidewalkImg);
    this.load.image('grass', grassImg);
  }

  create() {
    this.cameras.main.setBounds(0, 0, 640 * 2, 384);
    this.physics.world.setBounds(0, 0, 640 * 2, 384);

    this.createForeground();
    this.player = this.createPlayer();
    this.keys = this.createWasdKeys();

    this.cameras.main.startFollow(this.player, true, undefined, undefined, -32*8, 0);
  }

  createPlayer() {
    const player = this.physics.add.sprite(32, 280, 'player', 1);
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

  createForeground() {
    const sidewalk = this.add.tileSprite(0, 350, 1280, 64, 'sidewalk');
    sidewalk.setOrigin(0, 1);

    const grass = this.add.tileSprite(0, 350, 1280, 64, 'grass');
    grass.setOrigin(0, 0);
  }

  createWasdKeys() {
    return this.input.keyboard.addKeys({
      'jump': Phaser.Input.Keyboard.KeyCodes.W,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'crouch': Phaser.Input.Keyboard.KeyCodes.S,
      'right': Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  update() {
    const velocity = 80

    if (this.keys.left.isDown) {
      this.player.setVelocityX(-velocity);
      this.player.anims.play('run', true);
      this.player.setFlipX(true);
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(velocity);
      this.player.anims.play('run', true);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }
  }

}