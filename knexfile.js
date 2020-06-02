module.exports = {
  //knex is our query builder library

  development: {
    client: 'sqlite3', // allows us to intergrate with the database
    connection: {
      filename: './data/projects.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  // needed when using foreign keys
  pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
    }
  }

};