var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

// router.get('/', function(req, res) {
//     res.render('templates/artists');
// });

router.get('/', function(req, res) {
  var collection = global.db.collection('artists');

  collection.find().toArray(function(err, artists) {
    formattedArtists = artists.map(function(artist) { //modifying the data obj
      return {
        _id: artist._id,
        name: artist.name,
        genre: artist.genre,
        bio: artist.bio
      };
    });
    res.render('templates/artists', {artists: formattedArtists});
  });

});


router.post('/', function(req, res) {
  var collection = global.db.collection('artists');
  collection.save(req.body, function() {
    res.redirect('/')
    //res.render('templates/artists');
  });

});


module.exports = router;
