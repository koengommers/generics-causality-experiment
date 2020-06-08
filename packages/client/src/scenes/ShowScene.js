import Phaser from 'phaser';
import _ from 'lodash';

export default class ShowScene extends Phaser.Scene {
  constructor() {
    super('show-scene');

    this.groups = [{
      text: `
There are a few things you should know about Farland before we begin.

Let’s start with the trees: The trees that grow in Farland are either truce trees or naple trees. Biologists explain their differences in size by their sensitivity to nitrogen in the soil.
      `,
      objects: [{
        name: 'Truce trees',
        sprites: ['tree-green-small', 'tree-green-large']
      }, {
        name: 'Naple trees',
        sprites: ['tree-pink-small', 'tree-pink-large']
      }],
      scale: 2
    }, {
      text: `
Here is what the people living in Farland tend to look like. Because of a genetic mutation, you might notice that men and women in this country have interesting skin colors.
      `,
      objects: [{
        name: 'Men',
        sprites: ['person-man-green', 'person-man-blue']
      }, {
        name: 'Women',
        sprites: ['person-woman-green', 'person-woman-blue']
      }],
      scale: 2
    }, {
      text: `
In Farland, there are both brick houses and wooden houses. As you'll see, their roofs are decorated in a variety of patterns.
      `,
      objects: [{
        name: 'Brick houses',
        sprites: ['house-brick-tiles-1', 'house-brick-dotted-2']
      }, {
        name: 'Wooden houses',
        sprites: ['house-wood-tiles-2', 'house-wood-dotted-1']
      }],
      scale: 1
    }, {
      text: `
The automotive industry in Farland produces both cars and trucks, which are painted in a range of different colors.
      `,
      objects: [{
        name: 'Cars',
        sprites: ['vehicle-car-red', 'vehicle-car-gold']
      }, {
        name: 'Trucks',
        sprites: ['vehicle-truck-red', 'vehicle-truck-gold']
      }],
      scale: 1
    }];
  }

  init(props) {
    const { index = 0 } = props;
    this.index = index
    this.group = this.groups[index];
  }

  create() {
    const text = this.add.text(this.game.config.width/2, 10, this.group.text, {
      fontSize: '12px',
      color: '#fff',
      wordWrap: {
        width: 400
      }
    });
    text.setOrigin(0.5, 0);

    const objectHeight = _.max(_.flatMap(this.group.objects, (object) => {
      return _.map(object.sprites, (sprite) => {
        const texture = this.textures.get(sprite);
        this.textures.get(sprite).cutH
        return texture.frames[texture.firstFrame].cutHeight
      });
    }));
    const centerY = (text.y + text.height) + ((this.game.config.height - 25) - (text.y + text.height))/2 + (objectHeight + 34)/2 - 34;

    this.group.objects.forEach((object, index) => {
      const centerX = this.game.config.width/2 + 160*(index ? 1 : -1);

      object.sprites.forEach((sprite, index) => {
        this.add.sprite(centerX + (index ? 10 : -10), centerY - 10, sprite).setOrigin(index ? 0 : 1, 1).setScale(this.group.scale);
      })
      this.add.text(centerX, centerY + 10, object.name, {
        fontSize: '18px',
        color: '#fff'
      }).setOrigin(0.5, 0);
    });

    this.add.text(this.game.config.width/2, this.game.config.height-10, 'Click to continue.', {
      fontSize: '12px',
      color: '#fff',
    }).setOrigin(0.5, 1);
    this.input.on('pointerdown', () => {
      if (this.index < this.groups.length - 1) {
        this.scene.restart({ index: this.index + 1});
      } else {
        this.scene.start('town-scene');
      }
    });
  }
}
