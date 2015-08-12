var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

router.get('/', function(req, res) {
    res.render('templates/albums');
});

router.get('/search', function(req, res) {
  var collection = global.db.collection('artists');
  var artistName = new RegExp(req.query.name,"i");
  collection.find({name: artistName}, function(err, cursor) {
    cursor.toArray(function(err, artists) {
      res.send(artists);
    })
    //res.render('templates/artists');
  });

});

router.post('/new', function(req,res) {
  var collection = global.db.collection('albums');
  var album = {
    album: req.body.album,
    artist: ObjectID(req.body.selected)
  };
  collection.save(album, function(err, data) {
    console.log(data.ops[0].artist) //ops: array with obj
     //ops: [ { album: 'Please Please Me',
       //artist: 55ca12515745d4a7febf4bbb,
       //_id: 55cba299448af19de5d07abd } ] }
    var artistID = data.ops[0].artist;
    var albumID = data.ops[0]._id;
    res.redirect('/')
      //want to redirect to specific page?
  })
});



module.exports = router;
