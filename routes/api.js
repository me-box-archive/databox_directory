var express = require('express');
var router = express.Router();
var actuator_type = require('../models/actuator_type.js');
var actuator = require('../models/actuator.js');
var controller = require('../models/controller.js');
var datastore = require('../models/datastore.js');
var sensor_type = require('../models/sensor_type.js');
var sensor = require('../models/sensor.js');
var vendor = require('../models/vendor.js');


/* GET users listing. */
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

module.exports = router;
