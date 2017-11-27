var express = require('express');
var path = require('path');
var router = express.Router();
var bdb = require('./bdb')

router.get('/', function (req, res, next) {
  res.send('MTF BigchainDB API is up!')
});

router.post('/assets', function (req, res, next) {
  if (req.body.passPhrase) {
    bdb.create(req.body.asset, req.body.metadata, req.body.passPhrase)
      .then((txs) => {
        res.status = 200
        res.send(txs)
      })
      .catch((err) => {
        res.status = 500
        res.send(err)
      })
  } else {
    res.status = 400
    res.send('Bad request')
  }
});

router.get('/assets', function (req, res, next) {
  bdb.search()
  .then((txs) => {
    res.status = 200
    res.send(txs)
  })
  .catch((err) => {
    res.status = 500
    res.send(err)
  })
});

module.exports = router;
