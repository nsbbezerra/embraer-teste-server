import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('clients').del();

  // Inserts seed entries
  await knex('clients').insert({ name: 'John Doe', balance: '10000' });
}
