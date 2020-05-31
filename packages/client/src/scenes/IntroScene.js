import Phaser from 'phaser';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('intro-scene');
  }

  preload() {
    this.load.html('introduction', 'survey/introduction');
  }

  create() {
    const element = this.add.dom(this.game.config.width/2, this.game.config.height/2).createFromCache('introduction');

    element.addListener('submit');
    element.on('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const consent = data.get('consent');
      if (consent) {
        this.scene.start('start-scene');
      } else {
        const errorElement = document.getElementById('error');
        errorElement.innerHTML = 'If you do not consent you cannot participate in this study. Please close this tab in your browser to exit the survey.'
      }
    });
  }
}
