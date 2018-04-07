const { Pool, Client } = require('pg');

const connectionString = process.env.PGCONNECTION;

const pool = new Pool({
  connectionString,
});

const qArts = pool.query('SELECT name FROM arts');
const qModes = pool.query('SELECT name FROM modes');

// const client = new Client({
//   connectionString,
// });

module.exports = {
  pool,
  qArts,
  qModes,
};
