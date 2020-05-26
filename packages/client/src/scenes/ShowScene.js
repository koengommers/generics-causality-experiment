import Phaser from 'phaser';

export default class ShowScene extends Phaser.Scene {
  constructor() {
    super('show-scene');

    this.objects = [{
      name: 'Car',
      sprite: 'vehicle-car-example'
    }, {
      name: 'Truck',
      sprite: 'vehicle-truck-example'
    }, {
      name: 'Wooden house',
      sprite: 'house-wood-example'
    }, {
      name: 'Brick house',
      sprite: 'house-brick-example'
    }, {
      name: '... tree',
      sprite: 'tree-pink-example'
    }, {
      name: '... tree',
      sprite: 'tree-green-example'
    }, {
      name: 'Man',
      sprite: 'person-man-example'
    }, {
      name: 'Woman',
      sprite: 'person-woman-example'
    }]
  }

  init(props) {
    const { index = 0 } = props;
    this.index = index
    this.object = this.objects[index];
  }

  create() {
    const text = this.add.text(this.game.config.width/2, this.game.config.height/2 + 20, this.object.name, {
      fontSize: '14px',
      color: '#fff'
    });
    text.setOrigin(0.5, 0);

    this.add.sprite(this.game.config.width/2, this.game.config.height/2 - 20, this.object.sprite).setOrigin(0.5, 1);

    const keys = ['W', 'A', 'S', 'D', 'UP', 'LEFT', 'RIGHT', 'DOWN']
    keys.forEach((key) => {
      this.input.keyboard.once(`keydown-${key}`, () => {
        if (this.index < this.objects.length - 1) {
          this.scene.restart({ index: this.index + 1});
        } else {
          this.scene.start('town-scene');
        }
      });
    });
  }
}
