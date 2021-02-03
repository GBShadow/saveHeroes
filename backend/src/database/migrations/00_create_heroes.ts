import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('heroes', table => {
    table.increments('id').primary();
    table.string('name').unique().notNullable();
    table.string('short_description').notNullable();
    table.string('complete_description').notNullable();
    table.string('url_image').notNullable();

    table
      .timestamp('created_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();

    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('heroes');
}
