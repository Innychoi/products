const db = require('../models');

module.exports = {
  getAllProd : function(req, res) {
      db.getAllProd((err, result) => {
        if (err) {
          res.status(404).send();
        } else {
          res.send(result);
        }
      })
    },

    getProdInfo: function (req, res) {
      const productId = req.params.id;
      db.getProdInfo(productId, (err, result) => {
        if (err) {
          res.status(404).send();
        } else {
          res.send(result);
        }
      })
    },

    getStyles: function(req, res) {
      const productId = req.params.id;
      db.getStyles(productId, (err, result) => {
        if (err) {
          res.status(404).send();
        } else {
          res.send(result);
        }
      })
    },

    relatedProd: function(req, res) {
      const productId = req.params.id;
      db.relatedProd(productId, (err, result) => {
        if (err) {
          res.status(404).send();
        } else {
          res.send(result);
        }
      })
    }

}