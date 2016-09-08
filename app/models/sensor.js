var db = require('../database/db.js')

exports.create = function(confined_dive_id, description, ssi_diver_number) {
  var values = [userId, text, new Date().toISOString()]
  // check all values are compeleted
  // check existnce of vendor ids
  // flag error if vendor id doesnt exist
  // compile error message
  // if no error then attempt insert
  // else return error message
  db.get().query('INSERT INTO sensor (NULL, text, date) VALUES(?, ?, ?)', values, function(err, result) {
    if (err) 
      return done(err);
    done(null, result.insertId)
  })
}

exports.get_all = function(done) {
  db.get().query("SELECT * FROM sensor", function (err, rows) {
    if (err) 
      return done(err);
    else {
      return done(null, rows);
    }
  })
}

exports.get_by_vendor_id = function(vendor_id, done) {
  console.log("vendor id is: " + vendor_id);
  db.get().query('SELECT * FROM sensor WHERE vendor_id = ?', vendor_id, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.get_by_sensor_type_id = function(vendor_id, done) {
  console.log("vendor id is: " + vendor_id);
  db.get().query('SELECT * FROM sensor WHERE sensor_type_id = ?', vendor_id, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}