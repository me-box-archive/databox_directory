var express = require('express');
var router = express.Router();
var actuator_type = require('../models/actuator_type.js');
var actuator_method = require('../models/actuator_method.js')
var actuator = require('../models/actuator.js');
var controller = require('../models/controller.js');
var datastore = require('../models/datastore.js');
var sensor_type = require('../models/sensor_type.js');
var sensor = require('../models/sensor.js');
var vendor = require('../models/vendor.js');
var driver = require('../models/driver.js');

router.get('/actuator_type', function(req, res, next) {
  actuator_type.get_all(function(err, data) {
  	if(err) {
  		console.log("there has been an error");
  		res.send(err);
  	}
  	else {
  		res.send(data);
  	}
  });
});

router.get('/sensor', function(req, res, next) {
  sensor.get_all(function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.get('/actuator', function(req, res, next) {
  actuator.get_all(function(err, data) {
  	if(err) {
  		console.log("there has been an error");
  		res.send(err);
  	}
  	else {
  		res.send(data);
  	}
  });
});

router.get('/controller', function(req, res, next) {
  
  controller.get_all(function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.get('/datastore', function(req, res, next) {
  datastore.get_all(function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/datastore/get_id', function(req, res, next) {
  var hostname = req.body.hostname;
  datastore.get_id(hostname, function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});


router.get('/driver', function(req, res, next) {
  driver.get_all(function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

// GET sensor_type methods

router.get('/sensor_type', function(req, res, next) {
  
  sensor_type.get_all(function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.get('/sensor_type/:id/sensor', function(req, res, next) {
  var vendor_id = req.params.id;
  sensor.get_by_sensor_type_id(vendor_id,function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});



// GET vendor methods

router.get('/vendor', function(req, res, next) {
  vendor.get_all(function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.get('/vendor/:id/sensor', function(req, res, next) {
  var vendor_id = req.params.id;
  sensor.get_by_vendor_id(vendor_id,function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.get('/vendor/:id/actuator', function(req, res, next) {
  var vendor_id = req.params.id;
  actuator.get_by_vendor_id(vendor_id,function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.get('/vendor/:id/controller', function(req, res, next) {
  var vendor_id = req.params.id;
  controller.get_by_vendor_id(vendor_id,function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.get('/vendor/:id/datastore', function(req, res, next) {
  var vendor_id = req.params.id;
  datastore.get_by_vendor_id(vendor_id,function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.get('/vendor/:id/driver', function(req, res, next) {
  var vendor_id = req.params.id;
  driver.get_by_vendor_id(vendor_id,function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/vendor/register', function(req, res, next) {
  console.log(req);
  console.log(res);
  var vendor_description = req.body.description;
  vendor.register(vendor_description,function(err, data) {
    if(err) {
      console.log("[/vendor/register] there has been an error");
      console.log(err);
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/sensor_type/register', function(req, res, next) {
  var sensor_type_description = req.body.description;
  sensor_type.register(sensor_type_description,function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/actuator_type/register', function(req, res, next) {
  var description = req.body.description;
  actuator_type.register(description,function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/datastore/register', function(req, res, next) {
  var datastore_hostname = req.body.hostname;
  var datastore_api_url = req.body.api_url;

  datastore.register(datastore_hostname, datastore_api_url, function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/driver/register', function(req, res, next) {
  var driver_hostname = req.body.hostname;
  var driver_description = req.body.description;
  var vendor_id = req.body.vendor_id;

  driver.register(driver_hostname, driver_description, vendor_id, function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/sensor/register', function(req, res, next) {
  var driver_id = req.body.driver_id;
  var sensor_type_id = req.body.sensor_type_id;
  var datastore_id = req.body.datastore_id;
  var vendor_sensor_id = req.body.vendor_sensor_id;
  var unit = req.body.unit;
  var short_unit = req.body.short_unit;
  var description = req.body.description;
  var location = req.body.location;
  var vendor_id = req.body.vendor_id;


  console.log(req.body);
  sensor.register(driver_id, sensor_type_id, datastore_id, vendor_id, vendor_sensor_id, unit, short_unit, description, location, function(err, data) {
    if(err) {
      console.log("there has been an error",err);
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/actuator/register', function(req, res, next) {
  var driver_id = req.body.driver_id;
  var actuator_type_id = req.body.actuator_type_id;
  var controller_id = req.body.controllerdatastore_id;
  var vendor_actuator_id = req.body.vendor_actuator_id;
  var description = req.body.description;
  var location = req.body.location;
  var vendor_id = req.body.vendor_id;

  sensor.register(driver_id, actuator_type_id, controller_id, vendor_id, vendor_actuator_id, description, location, function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/actuator_method/register', function(req, res, next) {
  var actuator_id = req.body.actuator_id;
  var description = req.body.description;

  actuator_method.register(actuator_id, description, function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/controller/register', function(req, res, next) {
  var hostname = req.body.hostname;
  var api_url = req.body.api_url;

  controller.register(hostname, api_url, function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/datastore/register', function(req, res, next) {
  var hostname = req.body.hostname;
  var api_url = req.body.api_url;

  datastore.register(hostname, api_url, function(err, data) {
    if(err) {
      console.log("there has been an error");
      res.send(err);
    }
    else {
      res.send(data);
    }
  });
});

module.exports = router;
