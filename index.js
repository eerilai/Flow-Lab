require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./database/config.js');
const bodyParser = require('body-parser');


const app = express();
app.use(express.static(path.join(__dirname, './client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end();
});

app.get('/modes', (req, res) => {
  if (req.query.q) {
    const q = 'SELECT m.name FROM modes m JOIN arts_modes am ON m.mode_id = am.mode_id JOIN  ';
    db.pool.query(q);
  } else {
    db.qModes.then(rows => res.json(rows));
  }
});

app.get('/arts', (req, res) => {
  db.qArts.then(arts => res.json(arts));
});

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
