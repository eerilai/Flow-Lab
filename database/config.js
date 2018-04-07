const db = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
});
// Toggle to reset tables on server reboot
//
db.schema.dropTableIfExists('art_mode')
  .then(() => console.log('arts_mode refreshing'))
  .catch(() => console.log('arts_mode persists'));
db.schema.dropTableIfExists('arts')
  .then(() => console.log('arts refreshing'))
  .catch(() => console.log('arts persists'));
db.schema.dropTableIfExists('modes')
  .then(() => console.log('modes refreshing'))
  .catch(() => console.log('modes persists'));
//
// Arts table
db.schema.createTable('arts', (arts) => {
  arts.increments('art_id');
  arts.text('name');
}).then(() => console.log('new arts table created'))
  .catch(() => console.log('arts already exists'));
// Modes table
db.schema.createTable('modes', (modes) => {
  modes.increments('mode_id');
  modes.text('name');
}).then(() => console.log('new modes table created'))
  .catch(() => console.log('modes already exists'));
// Arts/Modes Join table
db.schema.createTable('art_mode', (join) => {
  join.integer('art_id');
  join.integer('mode_id');
  join.foreign('art_id').references('arts.art_id');
  join.foreign('mode_id').references('modes.mode_id');
}).then(() => console.log('new join table created'))
  .catch(() => console.log('art_mode already exists'));

module.exports = db;
