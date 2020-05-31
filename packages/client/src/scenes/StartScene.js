import Phaser from 'phaser';

const INTRO_TEXT = `
Welcome to Fantasiastan! Everything you see here might look familiar, but it is not. Everything is a bit different here. Pay attention to what you see.

Use arrow keys to control the character. Press an arrow key to start.
`;

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('start-scene');
  }

  create() {
    const text = this.add.text(this.game.config.width/2, 10, INTRO_TEXT, {
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
        width: 300
      }
    });
    text.setOrigin(0.5, 0);

    const speaker = this.add.sprite(text.x - text.width/2 + 2, 20, 'police-man').setScale(2);
    speaker.setOrigin(0.5, 0);

    const keys = ['W', 'A', 'S', 'D', 'UP', 'LEFT', 'RIGHT', 'DOWN']
    keys.forEach((key) => {
      this.input.keyboard.once(`keydown-${key}`, () => {
        this.scene.start('show-scene');
      });
    });
  }
}
