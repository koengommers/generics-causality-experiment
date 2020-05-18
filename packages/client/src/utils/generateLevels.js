import _ from 'lodash';

const BUILDING_WIDTHS = {
  'single-story-home-1': 6,
  'single-story-home-2': 6,
  'multi-story-home-1': 8,
  'multi-story-home-2': 6,
  'multi-story-home-3': 6,
  'single-story-warehouse': 5,
  'multi-story-warehouse': 5,
  'town-hall': 8,
  'town-hall-clock': 8
}

const FOREGROUND_WIDTHS = {
  'parking': 14,
  'forest': 8
}

const LEVELS_CONFIG = {
  buildings: [{
    images: ['single-story-home-1', 'single-story-home-2'],
    number: 2*3
  }, {
    images: ['multi-story-home-1', 'multi-story-home-2', 'multi-story-home-3'],
    number: 8*3
  }, {
    images: ['single-story-warehouse'],
    number: 7
  }, {
    images: ['multi-story-warehouse'],
    number: 3
  }],
  cars: [{
    sprite: 'green-truck',
    number: 8*2
  }, {
    sprite: 'red-truck',
    number: 2*2
  }, {
    sprite: 'green-car',
    number: 3*2
  }, {
    sprite: 'red-car',
    number: 7*2
  }],
  trees: [{
    sprite: 'small-pink-tree',
    number: 8*2
  }, {
    sprite: 'big-pink-tree',
    number: 2*2
  }, {
    sprite: 'small-green-tree',
    number: 3*3
  }, {
    sprite: 'big-green-tree',
    number: 7*3
  }]
};

function generateBuildings(n) {
  const totalBuildings = _.sumBy(LEVELS_CONFIG.buildings, 'number');
  let buildings = _(LEVELS_CONFIG.buildings)
    .flatMap((building) => _.times(building.number, () => _.sample(building.images)))
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

  const noClock = _.random(n-1);
  return buildings.map((level, i) => {
    level.splice(_.floor(level.length/2), 0, i == noClock ? 'town-hall' : 'town-hall-clock');
    return level
  });
}

function generateForeground(n) {
  // Generate cars
  const carsInLevels = _(LEVELS_CONFIG.cars)
    .flatMap((car) => _.times(car.number, () => car.sprite))
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
    let spots = _.shuffle(_.assign(_.fill(new Array(_.ceil(trees.length / 5)*5), null), trees));
    spots = _.map(spots, (spot) => {
      if (spot) {
        return {
          sprite: spot,
          x: _.random(1*16, 7*16),
          y: _.random(1*16, 3*16)
        }
      }
    })
    return _.map(_.chunk(spots, 5), (x) => _.sortBy(_.compact(x), 'y'));
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
  const buildings = generateBuildings(n);
  const foreground = generateForeground(n);

  return _.map(_.range(n), (i) => {
    const buildingsWidth = _.sumBy(buildings[i], (building) => BUILDING_WIDTHS[building]);
    const foregroundWidth = _.sumBy(foreground[i], (item) => FOREGROUND_WIDTHS[item.type]);
    return {
      width: _.max([buildingsWidth, foregroundWidth]) + 20,
      buildings: buildings[i],
      foreground: foreground[i]
    }
  });
}
