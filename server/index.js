const express = require('express');
// const axios = require('axios');
const db = require('./models');

const app = express();
// const config = require('../config');

const PORT = 3000 || process.env.PORT;

// app.use(express.static('client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/test', (req, res) => {
  db.getAll((err, result) => {
    if (err) {
      res.status(404).send();
    } else {
      res.status(200).send(result);
    }
  })
})


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});