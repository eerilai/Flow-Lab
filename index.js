require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./database/index.js');


const app = express();
app.use(express.static(path.join(__dirname, './client/dist')));

app.get('/', (req, res) => {
  db.qModes.then((modes) => {
    console.log(modes.rows);
    res.json(modes.rows);
  });
});

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
