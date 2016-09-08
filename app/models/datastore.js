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

exports.get_by_vendor_id = function(vendor_id, done) {
  db.get().query('SELECT * FROM datastore WHERE vendor_id = ?', vendor_id, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
