import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('statements', (table) => {
    table.increments('id').primary();
    table
      .integer('client_id')
      .references('clients.id')
      .notNullable()
      .onDelete('CASCADE');
    table.decimal('total', 8, 2).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('statements');
}
