
exports.up = function(knex) {
  return knex.schema.table('submissions', table => {
    table.renameColumn('timeTaken', 'duration');
    table.renameColumn('generic-1', 'generic-trees');
    table.renameColumn('generic-2', 'generic-vehicles');
    table.renameColumn('generic-3', 'generic-roofs');
    table.renameColumn('generic-4', 'generic-people');
    table.renameColumn('existential-1', 'existential-trees');
    table.renameColumn('existential-2', 'existential-vehicles');
    table.renameColumn('existential-3', 'existential-roofs');
    table.renameColumn('existential-4', 'existential-people');
    table.renameColumn('probability-1', 'proportion-people-high');
    table.renameColumn('probability-2', 'proportion-roofs-high');
    table.renameColumn('probability-3', 'proportion-trees-low');
    table.renameColumn('probability-4', 'proportion-vehicles-low');
  });
};

exports.down = function(knex) {
  return knex.schema.table('submissions', table => {
    table.renameColumn('duration', 'timeTaken');
    table.renameColumn('generic-trees', 'generic-1');
    table.renameColumn('generic-vehicles', 'generic-2');
    table.renameColumn('generic-roofs', 'generic-3');
    table.renameColumn('generic-people', 'generic-4');
    table.renameColumn('existential-trees', 'existential-1');
    table.renameColumn('existential-vehicles', 'existential-2');
    table.renameColumn('existential-roofs', 'existential-3');
    table.renameColumn('existential-people', 'existential-4');
    table.renameColumn('proportion-people-high', 'probability-1');
    table.renameColumn('proportion-roofs-high', 'probability-2');
    table.renameColumn('proportion-trees-low', 'probability-3');
    table.renameColumn('proportion-vehicles-low', 'probability-4');
  });
};
