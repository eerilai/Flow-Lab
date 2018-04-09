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
});

app.get('/data', async (req, res) => {
  console.log('getting data');
  const data = await db('arts')
    .innerJoin('art_mode', 'arts.id', 'art_mode.art_id')
    .innerJoin('modes', 'art_mode.mode_id', 'modes.id')
    .then(data => console.log(data));
  // console.log(data);
  res.end();
});

app.post('/addart', async (req, res) => {
  await db('arts').insert({ name: req.body.art });
  res.end();
});

app.post('/addmode', async (req, res) => {
  console.log(req.body);
  try {
    let mId = await db('modes').select('id').where('name', req.body.mode);
    let aId = await db('arts').select('id').where('name', req.body.art);
    console.log(mId);
    if (!mId.length) {
      await db('modes').insert({ name: req.body.mode });
      mId = await db('modes').select('id').where('name', req.body.mode);
    }
    mId = mId[0].id;
    aId = aId[0].id;
    console.log(mId, aId);
    await db('art_mode').insert({ art_id: aId, mode_id: mId }).whereNotExists(function() {
      db('art_mode').select('*').where({ art_id:aId, mode_id:mId });
    });
  } catch (error) {
    console.error(error);
  }
  res.end();
});

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
