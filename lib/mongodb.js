var mongo = require('mongodb').MongoClient;

//don't want to connect if already connected
if(!global.db) {
  var url = process.env.MONGODB_URL;
  mongo.connect(url, function(err, db) {
    global.db = db;
  });
}
