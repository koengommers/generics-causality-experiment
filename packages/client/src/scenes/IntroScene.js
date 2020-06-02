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

    element.addListener('click');
    element.on('click', (event) => {
      event.preventDefault();
      if (event.target.id === 'accept') {
        this.scene.start('start-scene');
      } else if (event.target.id === 'reject') {
        const form = document.getElementById('form');
        form.innerHTML = 'Thank you for your interest in this study! Please close this tab in your browser to exit the survey.';
      }
    });
  }
}
