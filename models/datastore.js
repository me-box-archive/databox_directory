var db = require('../database/db.js')

exports.get_all = function(done) {
  db.get().query("SELECT * FROM datastore", function (err, rows) {
    if (err) 
      return done(err);
    else {
      return done(null, rows);
    }
  })
}
