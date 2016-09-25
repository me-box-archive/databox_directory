var db = require('../database/db.js')

exports.get_all = function(done) {
	db.get().query("SELECT * FROM sensor_type", function (err, rows) {
		if (err) 
			return done(err);
		else {
			return done(null, rows);
		}
	});
};

exports.register = function(sensor_type_description, done) {
  	db.get().query("SELECT * FROM sensor_type where description = ?", sensor_type_description, function (err, rows) {
		if (err) 
	  		return done(err);
		else {
			if(rows.length > 0) {
				return done(null, rows[0]);
			}
			else{
				db.get().query("INSERT INTO sensor_type SET ?", {description : sensor_type_description}, function (err, result) {
					if (err)
						return done(err);
					else
					return done(null, {"id":result.insertId, "description": sensor_type_description});
				});
			}
		}
  	});
};