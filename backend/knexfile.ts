import path from 'path';

module.exports = {
  client: 'postgres',
  connection: {
    port: 5432,
    host: 'localhost',
    user: 'postgres',
    password: 'docker',
    database: 'saveheros_db',
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  useNullAsDefault: true,
};
