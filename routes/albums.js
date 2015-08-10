var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res) {
  //var collection = global.db.collection('artists');
    res.render('templates/albums');
});

module.exports = router;
