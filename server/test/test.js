var { expect } = require('chai');
const { Pool, Client } = require('pg')
var request = require('supertest');
const pool = require('../models');
var app = require('../');
var controller = require('../controller');
var schema = require('../models');
// var port = 4568;
const sendRequest = async () => {
  return await request(app)
    .get(`/products`)
    .send();
}

const sendProductRequest = async (id) => {
  return await request(app)
    .get(`/products/${id}`)
    .send();
}

describe('SDC', function() {

  after(function() { app.close(); });

  describe('/products', function() {

    beforeEach(() => {});

    it('send status', async function() {
      const response = await sendRequest();
      expect(response.status).to.eql(200);
    });

  });

  describe('/products/id', function() {

    beforeEach(() => {});

    it('send get status', async function() {
      const response = await sendProductRequest(10);
      expect(response.status).to.eql(200);
      expect(response.body).to.be.an('Object');
    });
    it('send object back', async function() {
      const response = await sendProductRequest(10);
      expect(response.body).to.be.an('Object');
    });

  });

});
