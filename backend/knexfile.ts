import path from 'path';

module.exports = {
  client: 'mysql2',
  connection: {
    port: 41890,
    host: 'mysql742.umbler.com',
    user: 'testegustavo',
    password: 'gustavoMAKTUB2021',
    database: 'testegustavo',
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  useNullAsDefault: true,
};
