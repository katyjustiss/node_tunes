//npm requires
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');

//require routes
var artists = require('./routes/artists');
var albums = require('./routes/albums');
var songs = require('./routes/songs');

//middlewares
app.use(require('less-middleware')('public'));
app.use(express.static('public'));
app.locals.title = 'Node Tunes';

//routes
app.use('/', artists);
app.use('/albums', albums);
app.use('/songs', songs);

//errors
app.use(function (req, res, next) {
  res.status(403);
  res.send('Unauthorized');
});

app.use(function (err, req, res, next) {
  console.log('ERRRRRRR', err.stack);
  res.status(500).send('My fault');
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
