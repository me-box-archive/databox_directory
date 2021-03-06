var db = require('../database/db.js')

exports.register = function(driver_id, actuator_type_id, controller_id, vendor_id, vendor_actuator_id, description, location, done) {
  
  var success = true; 
  var errors = {};

  db.get().query("SELECT * FROM vendor where id = ?", vendor_id, function (err, rows) {
    if (err) 
      return done(err);
    if(rows.length == 0) {
        success = false;
        errors.vendor_error = "vendor id does not exist";
    }    

    db.get().query("SELECT * FROM actuator_type where id = ?", actuator_type_id, function (err, rows) {
      if (err) 
        return done(err);
      if(rows.length == 0) {
          success = false;
          errors.sensor_type_error = "actuator type id does not exist";
      }
      /*db.get().query("SELECT * FROM controller where id = ?", controller_id, function (err, rows) {
        
        if (err) 
          return done(err);
        console.log(rows);
        if(rows.length == 0) {
            success = false;
            console.log(success);
            errors.datastore_error = "controller id does not exist";
        }*/  
        db.get().query("SELECT * FROM driver where id = ?", driver_id, function (err, rows) {
          if (err) 
            return done(err);
          if(rows.length == 0) {
              success = false;
              errors.driver_error = "driver id does not exist";
          }
          if(success) {
            db.get().query("SELECT * FROM actuator where vendor_actuator_id = ? AND vendor_id = ? AND actuator_type_id = ?", [vendor_actuator_id, vendor_id, actuator_type_id], function (err, rows) {
              if (err) 
                return done(err);
              if(rows.length > 0)
                  return done(null, rows[0]);
              else{

                db.get().query("INSERT INTO actuator SET ?", 
                {
                    "description" : description, 
                    "driver_id": driver_id, 
                    "actuator_type_id" : actuator_type_id, 
                    "controller_id" : controller_id, 
                    "vendor_id" : vendor_id, 
                    "vendor_actuator_id" : vendor_actuator_id, 
                    "location" : location
                }, function (err, result) {
                    if (err)
                      return done(err);
                    else
                      return done(null, 
                    {
                        "id":result.insertId, 
                        "description" : description, 
                        "driver_id": driver_id, 
                        "actuator_type_id" : actuator_type_id, 
                        "controller_id" : controller_id, 
                        "vendor_id" : vendor_id, 
                        "vendor_actuator_id" : vendor_actuator_id, 
                        "location" : location
                    });
                });    
              }
            });
          }
          else {
            return done(null,errors);
          }
        });
      });
    //});
  });
};

exports.get_driver_hostname = function (actuator_id,done) {
  console.log("get_driver_hostname for " + actuator_id)
  db.get().query("SELECT * FROM actuator WHERE id = ?", [actuator_id], function (err, rows) {
    if (err) {
      return done(err);
    } else if (rows.length < 1) {
          return done({Error:"no actuator found for id=" + actuator_id});
    } else {
      var driver_id = rows[0].driver_id;
      db.get().query("SELECT * FROM driver WHERE id = ?", [driver_id], function (err, rows) {
        if (err) {
          return done(err);
        } else if (rows.length < 1) {
          return done({Error:"no driver found"});
        } else {
          return done(null, {hostname:rows[0].hostname});
        }
      })
    }
  })
}

exports.get_all = function(done) {
  db.get().query("SELECT * FROM actuator", function (err, rows) {
    if (err) 
      return done(err);
    else {
      return done(null, rows);
    }
  })
}

exports.get_by_vendor_id = function(vendor_id, done) {
  db.get().query('SELECT actuator.id, driver_id, actuator_type_id ,vendor_id, vendor_actuator_id, actuator.description, location, actuator_type.description as actuator_type FROM actuator LEFT JOIN actuator_type ON actuator.actuator_type_id = actuator_type.id where vendor_id = ?', vendor_id, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}
