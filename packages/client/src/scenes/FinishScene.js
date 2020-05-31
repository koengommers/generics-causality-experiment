import Phaser from 'phaser';

export default class FinishScene extends Phaser.Scene {
  constructor() {
    super('finish-scene');
  }

  init(props) {
    this.completionCode = props.completionCode;
  }

  preload() {
    this.load.html('finish', `survey/finish/${this.completionCode}`);
  }

  create() {
    this.add.dom(this.game.config.width/2, this.game.config.height/2).createFromCache('finish');
  }
}
