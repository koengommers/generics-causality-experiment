import Phaser from 'phaser';
import _ from 'lodash';

export default class FormScene extends Phaser.Scene {
  constructor() {
    super('form-scene');
    this.responses = {};
    const genericQuestions = [{
      name: 'generic-trees',
      url: 'survey/question/1'
    }, {
      name: 'generic-vehicles',
      url: 'survey/question/2'
    }, {
      name: 'generic-roofs',
      url: 'survey/question/3'
    }, {
      name: 'generic-people',
      url: 'survey/question/4'
    }];
    const existentialQuestions = [{
      name: 'existential-trees',
      url: 'survey/question/5'
    }, {
      name: 'existential-vehicles',
      url: 'survey/question/6'
    }, {
      name: 'existential-roofs',
      url: 'survey/question/7'
    }, {
      name: 'existential-people',
      url: 'survey/question/8'
    }];
    const probabilityQuestions = [{
      name: 'proportion-people-high',
      url: 'survey/question/9'
    }, {
      name: 'proportion-roofs-high',
      url: 'survey/question/10'
    }, {
      name: 'proportion-trees-low',
      url: 'survey/question/11'
    }, {
      name: 'proportion-vehicles-low',
      url: 'survey/question/12'
    }];
    const otherQuestions = [{
      name: 'feedback',
      url: 'survey/question/13'
    }, {
      name: 'attention',
      url: 'survey/question/14'
    }];
    this.questions = _.concat(_.shuffle(genericQuestions), _.shuffle(existentialQuestions), _.shuffle(probabilityQuestions), otherQuestions);
    this.questions = _.map(this.questions, (question, i) => {
      question.url = `${question.url}?index=${i+1}`;
      return question;
    });
  }

  preload() {
    _.each(this.questions, (question) => {
      this.load.html(question.name, question.url);
    });
  }

  init(props) {
    const { question = 1 } = props;
    this.questionNumber = question;
    this.question = this.questions[question-1];
  }

  create() {
    this.input.keyboard.removeCapture('W,A,D,SPACE,B');

    const element = this.add.dom(this.game.config.width/2, this.game.config.height/2).createFromCache(this.question.name);

    element.addListener('input');
    element.on('input', (event) => {
      const slider = document.getElementById('slider');
      if (slider) {
        const output = document.getElementById('proportion');
        output.innerHTML = slider.value + '%';
      }
    });

    element.addListener('submit');
    element.on('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const response = data.get('response');
      this.responses[this.question.name] = response;
      if (this.questionNumber < this.questions.length) {
        this.scene.restart({ question: this.questionNumber + 1 });
      } else {
        this.submit();
      }
    });
  }

  submit() {
    const urlParams = new URLSearchParams(window.location.search);
    const participationId = urlParams.get('pid');
    fetch('/survey/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        participationId,
        responses: this.responses,
        duration: Date.now() - window.startTime
      })
    }).then((response) => {
      response.json().then((data) => {
        this.scene.start('finish-scene', data);
      });
    });
  }

}
