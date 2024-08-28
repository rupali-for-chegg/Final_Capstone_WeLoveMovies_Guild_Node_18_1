exports.up = function(knex) {
    return knex.schema.createTable('critics', function(table) {
        table.increments('critic_id').primary();
        table.string('organization_name').notNullable();
        table.string('preferred_name').notNullable();
        table.string('surname').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('critics');
};
