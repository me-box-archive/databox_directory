var db = require('../database/db.js')

exports.get_all = function(done) {
  db.get().query("SELECT * FROM driver", function (err, rows) {
    if (err) 
      return done(err);
    else {
      return done(null, rows);
    }
  })
}

exports.register = function(hostname, description, vendor_id, done) {
  var success = true; 
  var errors = {};

  db.get().query("SELECT * FROM vendor where id = ?", vendor_id, function (err, rows) {
    if (err) 
      return done(err);
    if(rows.length == 0) {
        success = false;
        errors.vendor_error = "vendor id does not exist";
    }    

    if(success) {
      db.get().query("SELECT * FROM driver where hostname = ?", hostname, function (err, rows) {
        if (err) 
          return done(err);
        if(rows.length > 0)
            return done(null, rows[0]);
        else{
          db.get().query("INSERT INTO driver SET ?", 
          {
              "description" : description, 
              "hostname": hostname
          }, function (err, result) {
              if (err)
                return done(err);
              else
                return done(null, {"id":result.insertId, "description": description, "hostname": hostname});
          });    
        }
      });
    }
    else {
      return done(errors);
    }
  });
};

exports.get_by_vendor_id = function(vendor_id, done) {
  db.get().query('SELECT * FROM driver WHERE vendor_id = ?', vendor_id, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
