var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


router.get('/', function(req, res) {
  var collection = global.db.collection('artists');
  collection.find().toArray(function(err, artists) {
    res.render('templates/artists', {artists: artists});
  });

});

router.post('/', function(req, res) {
  var collection = global.db.collection('artists');
  collection.save(req.body, function() {
    res.redirect('/')
    //res.render('templates/artists');
  });

});

// router.delete('/'), function(req, res) {

// }

module.exports = router;
