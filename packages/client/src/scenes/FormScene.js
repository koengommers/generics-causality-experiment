import Phaser from 'phaser';
import _ from 'lodash';

export default class FormScene extends Phaser.Scene {
  constructor() {
    super('form-scene');
    this.responses = {};
    this.questions = 13;
  }

  preload() {
    _.each(_.range(1, this.questions+1), (id) => {
      this.load.html(`question-${id}`, `survey/question/${id}`);
    });
  }

  init(props) {
    const { question = 1 } = props;
    this.question = question;
  }

  create() {
    const element = this.add.dom(this.game.config.width/2, this.game.config.height/2).createFromCache(`question-${this.question}`);

    element.addListener('input');
    element.on('input', (event) => {
      const slider = document.getElementById('slider');
      const output = document.getElementById('proportion');
      output.innerHTML = slider.value + '%';
    });

    element.addListener('submit');
    element.on('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const response = parseInt(data.get('response'));
      if (response) {
        this.responses[this.question] = response;
        if (this.question < this.questions) {
          this.scene.restart({ question: this.question + 1 });
        } else {
          this.submit();
        }
      } else {
        const errorElement = document.getElementById('error');
        errorElement.innerHTML = 'Please fill in an answer to continue.'
      }
    });
  }

  submit() {
    const urlParams = new URLSearchParams(window.location.search);
    const participationId = urlParams.get('pid');
    fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        participationId,
        responses: this.responses
      })
    }).then((response) => {
      response.json().then((data) => {
        this.scene.start('finish-scene', data);
      });
    });
  }

}
