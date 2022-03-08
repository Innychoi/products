require('newrelic');
const express = require('express');
// const axios = require('axios');
const controller = require('./controller');

const app = express();
// const config = require('../config');

const PORT = 3000 || process.env.PORT;

// app.use(express.static('client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/products', controller.getAllProd);
app.get('/products/:id', controller.getProdInfo);
app.get('/products/:id/styles', controller.getStyles);
app.get('/products/:id/related', controller.relatedProd);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;