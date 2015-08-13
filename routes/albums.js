var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res) {
    res.render('templates/albums');
});

router.get('/search', function(req, res) {
  var collection = global.db.collection('artists');
  var artistName = new RegExp(req.query.name,"i"); //try {name: {$regex: req.query.name}}
  collection.find({name: artistName}, function(err, cursor) {
    cursor.toArray(function(err, artists) {
      res.send(artists);
    })
  });

});

router.post('/new', function(req,res) {
  var collection = global.db.collection('albums');
  var album = {
    album: req.body.album,
    artist: ObjectID(req.body.selected)
  };
  collection.save(album, function(err, data) {
    var artistID = data.ops[0].artist; //only need these if redirecting to a page that uses in url
    var albumID = data.ops[0]._id;
    res.redirect('/')
      //want to redirect to specific page?
  })
});



module.exports = router;
