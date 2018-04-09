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
  if (req.query.art) {
    res.json(await db('arts').select('mode')
      .innerJoin('art_mode', 'arts.id', 'art_mode.art_id')
      .innerJoin('modes', 'art_mode.mode_id', 'modes.id')
      .where('art', req.query.art)
      .map(x => x.mode));
  } else {
    res.json(await db('arts').select('art').map(x => x.art));
  }
});

app.post('/addart', async (req, res) => {
  await db('arts').insert({ art: req.body.art });
  res.end();
});

app.post('/addmode', async (req, res) => {
  console.log(req.body);
  try {
    let mId = await db('modes').select('id').where('mode', req.body.mode);
    let aId = await db('arts').select('id').where('art', req.body.art);
    console.log(mId);
    if (!mId.length) {
      await db('modes').insert({ mode: req.body.mode });
      mId = await db('modes').select('id').where('mode', req.body.mode);
    }
    mId = mId[0].id;
    aId = aId[0].id;
    console.log(mId, aId);
    await db('art_mode').insert({ art_id: aId, mode_id: mId }).whereNotExists(() => {
      db('art_mode').select('*').where({ art_id: aId, mode_id: mId });
    });
  } catch (error) {
    console.error(error);
  }
  res.end();
});

app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));
