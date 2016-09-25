var express = require('express');
var router = express.Router();
var actuator_type = require('../models/actuator_type.js');
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
  var vendor_description = req.body.description;
  vendor.register(vendor_description,function(err, data) {
    if(err) {
      console.log("there has been an error");
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
  var actuator_type_description = req.body.description;
  actuator_type.register(actuator_type_description,function(err, data) {
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
