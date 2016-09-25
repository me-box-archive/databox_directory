var db = require('../database/db.js')

exports.get_all = function(done) {
	db.get().query("SELECT * FROM actuator_type", function (err, rows) {
		if (err) 
			return done(err);
		else {
			return done(null, rows);
		}
	});
};

exports.register = function(actuator_type_description, done) {
  	db.get().query("SELECT * FROM actuator_type where description = ?", actuator_type_description, function (err, rows) {
		if (err) 
	  		return done(err);
		else {
			if(rows.length > 0) {
				return done(null, rows[0]);
			}
			else{
				db.get().query("INSERT INTO actuator_type SET ?", {description : actuator_type_description}, function (err, result) {
					if (err)
						return done(err);
					else
					return done(null, {"id":result.insertId, "description": actuator_type_description});
				});
			}
		}
  	});
};