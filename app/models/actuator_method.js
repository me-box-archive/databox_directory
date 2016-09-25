var db = require('../database/db.js')

exports.get_all = function(done) {
	db.get().query("SELECT * FROM actuator_method", function (err, rows) {
		if (err) 
			return done(err);
		else {
			return done(null, rows);
		}
	});
};

exports.register = function(actuator_id, description, done) {
  var success = true; 
  var errors = {};

  db.get().query("SELECT * FROM actuator where id = ?", actuator_id, function (err, rows) {
    if (err) 
      return done(err);
    if(rows.length == 0) {
        success = false;
        errors.actuator_error = "actuator id does not exist";
    }

	if(success) {
      db.get().query("SELECT * FROM driver WHERE actuator_id = ? AND desription = ?", [actuator_id, description], function (err, rows) {
        if (err) 
          return done(err);
        if(rows.length > 0)
            return done(null, rows[0]);
        else{
          db.get().query("INSERT INTO actuator_method SET ?", 
          {
              "description" : description, 
              "actuator_id": actuator_id
          }, function (err, result) {
              if (err)
                return done(err);
              else
                return done(null, {"id":result.insertId, "description": description, "actuator_id": actuator_id});
          });    
        }
      });
    }
    else {
      return done(errors);
    }   

  });
};