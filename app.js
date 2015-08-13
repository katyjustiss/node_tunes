//npm requires
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');

//require routes
var artists = require('./routes/artists');
var albums = require('./routes/albums');
var songs = require('./routes/songs');


app.locals.title = 'Node Tunes';

//access to database variables
if(process.env.NODE_ENV !== 'production') {
  require('./lib/secrets');
}
require('./lib/mongodb');

app.use(bodyParser.urlencoded({extended:false}));

//routes
app.use('/', artists);
app.use('/albums', albums);
app.use('/songs', songs);

app.use(express.static('public'));

//ERROR HANDLING
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
