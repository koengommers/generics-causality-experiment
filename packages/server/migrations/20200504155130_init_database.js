
exports.up = async function(knex) {
  await knex.schema.createTable('submissions', function (table) {
    table.increments('id').primary();
    table.string('participationId', 255);
    table.string('completionCode', 255);
    table.datetime('submittedAt').defaultTo(knex.fn.now());
    table.integer('timeTaken');
    table.integer('generic-1');
    table.integer('generic-2');
    table.integer('generic-3');
    table.integer('generic-4');
    table.integer('existential-1');
    table.integer('existential-2');
    table.integer('existential-3');
    table.integer('existential-4');
    table.integer('probability-1');
    table.integer('probability-2');
    table.integer('probability-3');
    table.integer('probability-4');
    table.text('feedback');
    table.integer('attention');
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('submissions');
};
