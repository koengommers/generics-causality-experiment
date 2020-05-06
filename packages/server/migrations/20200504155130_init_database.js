
exports.up = async function(knex) {
  await knex.schema.createTable('submissions', function (table) {
    table.increments('id').primary();
    table.integer('response');
    table.string('participationId', 255);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('submissions');
};
