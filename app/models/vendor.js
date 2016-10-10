var db = require('../database/db.js');

exports.get_all = function(done) {
  	db.get().query("SELECT * FROM vendor", function (err, rows) {
		if (err) 
	  		return done(err);
		else {
	  		return done(null, rows);
		}
  	});
};

exports.does_vendor_exist = function(id, description, done) {
	console.log("SELECT * FROM vendor where description = " + vendor_description);
	db.get().query("SELECT * FROM vendor where description = ?", vendor_description, function (err, rows) {
		if (err) 
	  		return done(err);
	  	else {
			if(rows.length > 0) {
				return done({"exists":"true"});
			}
	  		else {
	  			return done({"exists":"false"});
	  		}
	  	}
	});
};

exports.register = function(vendor_description, done) {
	console.log("SELECT * FROM vendor where description = " + vendor_description);
  	db.get().query("SELECT * FROM vendor where description = ?", vendor_description, function (err, rows) {
		if (err) 
	  		return done(err);
		else {
			if(rows.length > 0) {
				return done(null, rows[0]);
			}
			else{
				db.get().query("INSERT INTO vendor SET ?", {description : vendor_description}, function (err, result) {
					if (err)
						return done(err);
					else
					return done(null, {"id":result.insertId, "description": vendor_description});
				});
			}
		}
  	});
};