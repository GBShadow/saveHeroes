import knex from 'knex';

const db = knex({
  client: 'mysql2',
  connection: {
    port: 41890,
    host: 'mysql742.umbler.com',
    user: 'testegustavo',
    password: 'gustavoMAKTUB2021',
    database: 'testegustavo',
  },
  useNullAsDefault: true,
});

export default db;
