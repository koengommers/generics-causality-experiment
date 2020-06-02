import Phaser from 'phaser';

const INTRO_TEXT = `
Welcome to Farland! 
In this study, we would like you to learn about the country of Farland. Everything is a bit different here, so please pay attention to what you see. You will be able to explore the five main towns in the country and then we will ask you some questions about what you observed during your visit. 

Before we start, please maximize this page on your browser so that it is in full screen and make sure that you can, as much as possible, do the rest of the study in a calm environment without distractions or interruptions. 

During the study, use the arrow keys to control the character. Press an arrow key to start.
`;


export default class StartScene extends Phaser.Scene {
  constructor() {
    super('start-scene');
  }

  init() {
    window.startTime = Date.now();
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
        width: 400
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
