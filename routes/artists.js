var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

//landing page. Generate artist table
router.get('/', function(req, res) {
  var collection = global.db.collection('artists');
  collection.find().sort({ name: 1 }).toArray(function(err, artists) {
    res.render('templates/artists', {artists: artists});
  });

});

//adding new artists
router.post('/', function(req, res) {
  var collection = global.db.collection('artists');
  collection.save(req.body, function(err, data) {
    var artistID = data.ops[0]._id;
    res.redirect('/artist/' + artistID)
  });

});

//Single artist page.
router.get('/artist/:id', function(req, res){
  var collection = global.db.collection('artists');
  collection.findOne(
    {_id: ObjectID(req.params.id)},
    function(err, artist){
    res.render('templates/oneArtist', {artist: artist});
  })
})

//delete
router.post('/:id/delete', function(req, res) {
  var collection = global.db.collection('artists');
  collection.remove(
    {_id: ObjectID(req.params.id)},
    function(err, data) {
      if(err){
      console.log(err);
      } else {
      res.redirect('/');
      }
    })

});

//edit route
router.get('/artist/:id/edit', function(req, res) {
  var collection = global.db.collection('artists');
  collection.findOne(
    {_id: ObjectID(req.params.id)},
    function(err, artist){
    res.render('templates/artistEdit', {artist: artist});
  })
})

//edit submit
router.post('/artist/:id/edit', function(req, res){
  var collection = global.db.collection('artists');
  collection.update({_id: ObjectID(req.params.id)}, {$set: {
    name: req.body.name,
    genre: req.body.genre,
    bio: req.body.bio
  }}, function(err, response){
    res.redirect('/artist/' + req.params.id );
  });
})




module.exports = router;
