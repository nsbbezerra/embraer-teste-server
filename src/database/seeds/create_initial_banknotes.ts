import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('banknotes').del();

  // Inserts seed entries
  await knex('banknotes').insert([
    { banknoteValue: 100, amount: 1000 },
    { banknoteValue: 50, amount: 1000 },
    { banknoteValue: 20, amount: 1000 },
    { banknoteValue: 10, amount: 1000 },
  ]);
}
