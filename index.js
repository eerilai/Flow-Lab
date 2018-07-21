require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
app.use(express.static(path.join(__dirname, './client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end();
});

app.listen(3000, () => console.log(`Server listening on port 3000`));
