import Phaser from 'phaser';

export default class FormScene extends Phaser.Scene {
  constructor() {
    super('form-scene');
  }

  preload() {
    this.load.html('form', 'form.html');
  }

  create() {
    const element = this.add.dom(this.game.config.width/2, this.game.config.height/2).createFromCache('form');

    element.addListener('submit');

    element.on('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.target)
      const response = parseInt(data.get('response'))
      this.submit(response);
    });
  }

  submit(response) {
    const urlParams = new URLSearchParams(window.location.search);
    const participationId = urlParams.get('pid');
    fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        participationId,
        response
      })
    });
  }

}
