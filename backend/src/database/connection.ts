import knex from 'knex';

const db = knex({
  client: 'postgres',
  connection: {
    port: 5432,
    host: 'localhost',
    user: 'postgres',
    password: 'docker',
    database: 'saveheros_db',
  },
  useNullAsDefault: true,
});

export default db;
