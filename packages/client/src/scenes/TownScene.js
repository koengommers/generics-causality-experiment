import Phaser from 'phaser';
import _ from "lodash";

import generateLevels from '../utils/generateLevels';

export default class TownScene extends Phaser.Scene {
  constructor() {
    super('town-scene');

    this.levels = generateLevels(5);
  }

  init(props) {
    const { level = 1 } = props;
    this.currentLevel = level;
    this.level = this.levels[level-1];
    this.finished = false;
  }

  create() {
    this.cameras.main.setBackgroundColor('#84dbff');

    const ground = this.createGround();
    this.createLevel();
    this.createPause();

    this.player = this.createPlayer();
    this.keys = this.createInput();

    this.physics.add.collider(this.player, ground);

    this.cameras.main.setBounds(0, 0, this.level.width*16, this.game.config.height);
    this.physics.world.setBounds(0, 0, this.level.width*16, this.game.config.height);

    this.cameras.main.startFollow(this.player, true, undefined, undefined, -16*16, 0);
    // this.cameras.main.fadeIn(1000, 23, 21, 21);
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
    this.createPeople();

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
          this.add.sprite(treeX, y, tree.sprite).setOrigin(0.5, 1).depth = 1;
        });
        x += 8;
      }
    });
  }

  createPeople() {
    this.people = this.physics.add.group();

    this.level.people.forEach((personSprite) => {
      const person = this.people.create(_.random(16, (this.level.width-1)*16), this.game.config.height - 56, personSprite).setOrigin(0.5, 1);
      person.body.setAllowGravity(false);
      person.setCollideWorldBounds(true);
      person.setVelocityX(_.random(-45, 45));
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

  createPause() {
    const texts = {
      2: `
We hope you are enjoying exploring Farland!
Remember that in Farland, the green pointy trees are called truce trees and the pink round trees are called naple trees. Also, the brown houses are wooden houses and the white houses are brick houses.

Click to continue.
      `,
      4: `
You only have two towns left to visit! 
Just to remind you, in Farland, the trucks have a large open back and the cars have a small closed trunk. Also, women like to wear their hair long and the men wear red vests.

Click to continue.
      `
    }
    if (this.currentLevel === 2 || this.currentLevel === 4) {
      const overlay = this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x171515, 0.8);
      overlay.setOrigin(0, 0);
      overlay.setScrollFactor(0);
      overlay.depth = 2;

      const text = this.add.text(this.game.config.width/2, this.game.config.height/2, texts[this.currentLevel], {
        fontSize: '14px',
        backgroundColor: '#fff',
        color: '#222',
        padding: {
          top: 10,
          left: 30,
          right: 10,
          bottom: 10
        },
        wordWrap: {
          width: 400
        }
      });
      text.setOrigin(0.5, 0.5);
      text.setScrollFactor(0);
      text.depth = 2;

      const speaker = this.add.sprite(text.x - text.width/2 + 2, text.y - text.height/2 + 10, 'police-man').setScale(2);
      speaker.setOrigin(0.5, 0);
      speaker.depth = 2;

      this.scene.pause();
      this.game.canvas.addEventListener('mousedown', () => {
        speaker.destroy();
        text.destroy();
        overlay.destroy();
        this.scene.resume();
      });
    }
  }

  update() {
    this.checkFinish();
    this.updatePlayer();

    this.people.getChildren().forEach(person => {
      if (Math.random() < 0.01) {
        person.setVelocityX(_.random(-45, 45));
      }
      if (person.body.velocity.x < 0) {
        person.setFlipX(true);
      } else {
        person.setFlipX(false);
      }
    })
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
