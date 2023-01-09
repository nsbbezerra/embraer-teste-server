import knex from 'knex';
import { configs } from '../configs';

const connection = configs.database;

const database = knex({
  client: 'postgresql',
  connection,
  useNullAsDefault: true,
});

export { database };
