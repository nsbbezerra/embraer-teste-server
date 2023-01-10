import * as dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { configs } from './src/configs';

const connection = configs.database;

module.exports = {
  client: 'postgresql',
  connection,
  migrations: {
    tableName: 'knex_migrations',
    directory: `${path.resolve(__dirname, 'src', 'database', 'migrations')}`,
  },
  seeds: {
    directory: `${path.resolve(__dirname, 'src', 'database', 'seeds')}`,
  },
  useNullAsDefault: true,
};
