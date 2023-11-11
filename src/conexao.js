// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'market_cubos',
//   password: '010597',
//   port: 5432,
// });

// const query = (text, param) => {
//   return pool.query(text, param);
// };

// module.exports = {
//   query,
// };

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '010597',
    database: 'market_cubos',
  },
});

module.exports = knex;
