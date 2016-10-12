var db = require('../database/db.js')

exports.register = function(driver_id, sensor_type_id, datastore_id, vendor_id, vendor_sensor_id, unit, short_unit, description, location, done) {
  
  console.log("REGISTER CALLED!!!!")
  var success = true; 
  var errors = {};

  var insert_data = {
                      "description" : description, 
                      "driver_id": driver_id, 
                      "sensor_type_id" : sensor_type_id, 
                      "datastore_id" : datastore_id, 
                      "vendor_id" : vendor_id, 
                      "vendor_sensor_id" : vendor_sensor_id, 
                      "unit" : unit, 
                      "short_unit" : short_unit, 
                      "location" : location
                    };
  console.log("insert_data", insert_data);
  
  console.log("SELECT * FROM vendor");
  db.get().query("SELECT * FROM vendor where id = ?", vendor_id, function (err, rows) {
    if (err) 
      return done(err);
    if(rows.length == 0) {
        success = false;
        errors.vendor_error = "vendor id does not exist";
        console.log(errors);
    }    
    console.log("SELECT * FROM sensor_type");
    db.get().query("SELECT * FROM sensor_type where id = ?", sensor_type_id, function (err, rows) {
      if (err) 
        return done(err);
      if(rows.length == 0) {
          success = false;
          errors.sensor_type_error = "sensor type id does not exist";
          console.log(errors);
      }
      console.log("SELECT * FROM datastore");
      db.get().query("SELECT * FROM datastore where id = ?", datastore_id, function (err, rows) {
        
        if (err) 
          return done(err);
        console.log(rows);
        if(rows.length == 0) {
            success = false;
            console.log(success);
            errors.datastore_error = "datastore id does not exist";
            console.log(errors);
        }  
        console.log("SELECT * FROM driver");
        db.get().query("SELECT * FROM driver where id = ?", driver_id, function (err, rows) {
          if (err) 
            return done(err);
          if(rows.length == 0) {
              success = false;
              errors.driver_error = "driver id does not exist";
              console.log(errors);
          }
          if(success) {
            console.log("progress");
            db.get().query("SELECT * FROM sensor where vendor_sensor_id = ? AND vendor_id = ?", [vendor_sensor_id, vendor_id], function (err, rows) {
              if (err) 
                return done(err);
              if(rows.length > 0)
                  return done(null, rows[0]);
              else{

                db.get().query("INSERT INTO sensor SET ?", 
                {
                    "description" : description, 
                    "driver_id": driver_id, 
                    "sensor_type_id" : sensor_type_id, 
                    "datastore_id" : datastore_id, 
                    "vendor_id" : vendor_id, 
                    "vendor_sensor_id" : vendor_sensor_id, 
                    "unit" : unit, 
                    "short_unit" : short_unit, 
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
                        "sensor_type_id" : sensor_type_id, 
                        "datastore_id" : datastore_id, 
                        "vendor_id" : vendor_id, 
                        "vendor_sensor_id" : vendor_sensor_id, 
                        "unit" : unit, 
                        "short_unit" : short_unit, 
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
    });
  });
};

exports.get_global_id = function(vendor_sensor_id, vendor_id, done) {
  
  var success = true; 
  var errors = {};

  db.get().query("SELECT * FROM sensor where vendor_sensor_id = ? AND vendor_id = ?", vendor_sensor_id, vendor_id, function (err, rows) {
    if (err) 
      return done(err);
    if(rows.length > 0)
        return done(null, rows[0]);
    else
        return done({"error": "no entry for this sensor, please register sensor"});
    });    
};

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