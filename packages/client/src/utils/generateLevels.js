import _ from 'lodash';

const BACKGROUND_WIDTHS = {
  'house-wood-dotted-1': 6,
  'house-wood-dotted-2': 6,
  'house-wood-tiles-1': 6,
  'house-wood-tiles-2': 6,
  'house-brick-dotted-1': 6,
  'house-brick-dotted-2': 8,
  'house-brick-tiles-1': 6,
  'house-brick-tiles-2': 8,
  'park': 10
}

const FOREGROUND_WIDTHS = {
  'parking': 14,
  'forest': 8
}

const LEVELS_CONFIG = {
  buildings: [{
    sprite: ['house-wood-dotted-1', 'house-wood-dotted-2'],
    number: 8*4
  }, {
    sprite: ['house-wood-tiles-1', 'house-wood-tiles-2'],
    number: 2*4
  }, {
    sprite: ['house-brick-dotted-1', 'house-brick-dotted-2'],
    number: 2*4
  }, {
    sprite: ['house-brick-tiles-1', 'house-brick-tiles-2'],
    number: 8*4
  }],
  cars: [{
    sprite: ['vehicle-truck-yellow'],
    number: 8*4
  }, {
    sprite: ['vehicle-truck-red'],
    number: 2*4
  }, {
    sprite: ['vehicle-car-yellow'],
    number: 2*4
  }, {
    sprite: ['vehicle-car-red'],
    number: 8*4
  }],
  trees: [{
    sprite: 'tree-pink-small',
    number: 8*4
  }, {
    sprite: 'tree-pink-large',
    number: 2*4
  }, {
    sprite: 'tree-green-small',
    number: 2*4
  }, {
    sprite: 'tree-green-large',
    number: 8*4
  }],
  people: [{
    sprite: 'person-man-blue',
    number: 8*4
  }, {
    sprite: 'person-man-green',
    number: 2*4
  }, {
    sprite: 'person-woman-blue',
    number: 2*4
  }, {
    sprite: 'person-woman-green',
    number: 8*4
  }]
};

function generateBackground(n) {
  const totalBuildings = _.sumBy(LEVELS_CONFIG.buildings, 'number');
  let buildings = _(LEVELS_CONFIG.buildings)
    .flatMap((building) => _.times(building.number, () => _.sample(building.sprite)))
    .shuffle()
    .chunk(_.floor(totalBuildings / n))
    .value();
  if (buildings.length > n) {
    const leftovers = _.last(buildings);
    buildings = _.shuffle(_.map(_.take(buildings, n), (chunk, i) => {
      if (i < leftovers.length) {
        return chunk.concat([leftovers[i]]);
      }
      return chunk;
    }));
  }

  const totalPeople = _.sumBy(LEVELS_CONFIG.people, 'number');
  let people = _(LEVELS_CONFIG.people)
    .flatMap((people) => _.times(people.number, () => people.sprite))
    .shuffle()
    .chunk(_.floor(totalPeople / n))
    .value();
  if (people.length > n) {
    const leftovers = _.last(people);
    people = _.shuffle(_.map(_.take(people, n), (chunk, i) => {
      if (i < leftovers.length) {
        return chunk.concat([leftovers[i]]);
      }
      return chunk;
    }));
  }
  people = people.map((level) => {
    const parks = _.shuffle(_.assign(_.fill(new Array(_.ceil(level.length / 6)*6), null), level));
    return _.chunk(parks, 6);
  });

  return _.zipWith(buildings, people, (houses, parks) => {
    const background = _.map(houses, building => ({ type: 'building', building }));
    parks.forEach(park => {
      background.splice(_.random(1, background.length-1), 0, { type: 'park', people: park });
    });
    return background;
  });
}

function generateForeground(n) {
  // Generate cars
  const carsInLevels = _(LEVELS_CONFIG.cars)
    .flatMap((car) => _.times(car.number, () => _.sample(car.sprite)))
    .shuffle()
    .groupBy(() => _.random(0, n-1))
    .values()
    .value();
  const carParks = carsInLevels.map((cars) => {
    const spots = _.shuffle(_.assign(_.fill(new Array(_.ceil(cars.length / 4)*4), null), cars));
    return _.chunk(spots, 4);
  });

  // Generate trees
  const treesInLevels = _(LEVELS_CONFIG.trees)
  .flatMap((tree) => _.times(tree.number, () => tree.sprite))
  .shuffle()
  .groupBy(() => _.random(0, n-1))
  .values()
  .value();
  const forests = treesInLevels.map((trees) => {
    const treesInLevel = _.shuffle(_.assign(_.fill(new Array(_.ceil(trees.length / 5)*5), null), trees));
    return _.map(_.chunk(treesInLevel, 5), (chunk) => {
      const spots = _.shuffle(_.range(1, 8));
      const forest = _.map(chunk, (tree, i) => {
        if (tree) {
          return {
            sprite: tree,
            x: spots[i]*16,
            y: _.random(1*16, 3*16)
          }
        }
      });
      return _.sortBy(_.compact(forest), 'y')
    });
  });

  return _.zipWith(carParks, forests, (lots, forest) => {
    return _(lots)
      .map((cars) => ({ type: 'parking', cars}))
      .concat(_.map(forest, (trees) => ({ type: 'forest', trees})))
      .shuffle()
      .value();
  });
}

export default function generateLevels(n) {
  const background = generateBackground(n);
  const foreground = generateForeground(n);
  return _.map(_.range(n), (i) => {
    const backgroundWidth = _.sumBy(background[i], (item) => BACKGROUND_WIDTHS[item.type === 'building' ? item.building : item.type]);
    const foregroundWidth = _.sumBy(foreground[i], (item) => FOREGROUND_WIDTHS[item.type]);
    return {
      width: _.max([backgroundWidth, foregroundWidth]) + 20,
      background: background[i],
      foreground: foreground[i]
    }
  });
}
