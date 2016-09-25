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

exports.register = function(hostname, api_url, done) {

    db.get().query("SELECT * FROM datastore where hostname = ?", hostname, function (err, rows) {
      if (err) 
        return done(err);
      if(rows.length > 0)
          return done(null, rows[0]);
      else{
        db.get().query("INSERT INTO datastore SET ?", 
        {
            "api_url" : api_url, 
            "hostname": hostname
        }, function (err, result) {
            if (err)
              return done(err);
            else
              return done(null, {"id":result.insertId, "api_url": api_url, "hostname": hostname});
        });    
      }
    });
    
};
