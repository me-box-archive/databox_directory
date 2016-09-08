
Definitions. 

* Vendor - a manufacturer or provider of a sensor, datastore and driver
* Datastore - a docker container which is capable of storing sensor data that is passed to it from a driver and provides an api to sensor data
* Driver - a docker container which is capable of receieving / gathering sensor data from hardware or the internet and forwarding it to a datastore
* Actuator - a device or online service which can perform an action 
* Sensor - a device or online service which can produce data 
* Controller  a docker container which provides an api to actuators

This part of the databox platform provides the directory service for the databox.

It is resposible for storing the mapping of:

* Vendors of sensors
* Datastores for sensing drivers
* Drivers for sensors
* Controllers for actuating drivers
* Types of sensors
* Types of actuators
* Sensors / Actuators themselves and metadata including, vendor_id, databox_id, location etc. 

In databox:

* sensors get data into a datastore via a driver
* drivers are provided by vendors 
* datastores are provided by vendors
* a driver must have a vendor and datastore 
* drivers and datastores have a 1-1 mapping
* a driver / vendor / datadstore can have many sensors
* a sensor can only have 1 datastore / driver / vendor
* a sensor must have a vendor, driver, datastore, and type
* a vendor can have multiple sensors and the the vendor_code is unique to the vendor (but not to the databox)
* the id field in the sensor model is unique within databox

For a vendor to be able to get data from thier sensors into a databox datastore they must minimally:

* Be registered as a vendor
* Have registered a datastore 
* Have registerd a driver for the datastore
* Make use of an existing, or register a new unique sensor type

For a vendor to be able to have one of thier actuators made use of through a databox controller

* Be registered as a vendor
* Have registered a controller 
* Have registerd a driver for the controller (this may be the same driver as for the datastore)
* Make use of an existing, or register a new unique actuator_type

Aswell as providing a way for vendors to get data and actuators registered and working with the databox, the directory also serves as a way for application develors to discover sensors and actuators that are usable on the databox system, finding out the databox wide unique identifier for the sensors / actuator along with the host name of the datastore and the api endpoint required to make use of the sensor / acutator

It is envisaged that the controller or datastore itself will provide further instructions upon a OPTIONS request to the root of the endpoint.


For testing purposes this is a self contained moduile which can be built and run using docker-compose, external port can be set in the .yml compose file. The database is seeded with some test valus for evaluation.

The API documentation is as follows: 

	METHOD: GET
	URL: /api/actuator
	Params: none
	Sample response: 
	[
	  {
	    "id": 1,
	    "controller_id": 1,
	    "driver_id": 1,
	    "actuator_type_id": 1,
	    "vendor_id": 2,
	    "vendor_code": "BULB1",
	    "description": "hue multi colour bulb",
	    "location": "Living Room"
	  },
	  {
	    "id": 2,
	    "controller_id": 1,
	    "driver_id": 1,
	    "actuator_type_id": 1,
	    "vendor_id": 2,
	    "vendor_code": "BULB2",
	    "description": "hue multi colour bulb",
	    "location": "Living Room"
	  },
	  {
	    "id": 4,
	    "controller_id": 1,
	    "driver_id": 1,
	    "actuator_type_id": 1,
	    "vendor_id": 2,
	    "vendor_code": "BULB3",
	    "description": "hue multi colour bulb",
	    "location": "Bedroom"
	  }
	]

	METHOD: GET
	URL: /api/actuator_type
	Params: none
	Sample response: 
	[
	  {
	    "id": 1,
	    "description": "Magic Bulb"
	  }
	]

	METHOD: GET
	URL: /api/controller
	Params: none
	Sample response: 
	[
	  {
	    "id": 1,
	    "description": "Hue bulbs actuation controller",
	    "hostname": "controller_huebulbs:8080",
	    "api_endpoint": "/actuate/",
	    "vendor_id": 2
	  }
	]

	METHOD: GET
	URL: /api/datastore
	Params: none
	Sample response: 
	[
	  {
	    "id": 1,
	    "description": "Wireless things time series data store",
	    "hostname": "datastore_wirelessthings:8080",
	    "api_url": "/api/data"
	  },
	  {
	    "id": 2,
	    "description": "Hue bulbs state datastore",
	    "hostname": "datastore_huebulbs:8080",
	    "api_url": "/api/data"
	  }
	]

	METHOD: GET
	URL: /api/driver
	Params: none
	Sample response: 
	[
	  {
	    "id": 1,
	    "description": "Wireless things datastore driver",
	    "hostname": "driver_wirelessthings",
	    "comments": "some throw away comment",
	    "vendor_id": 1
	  },
	  {
	    "id": 2,
	    "description": "Hue bulbs datastore and actuation driver",
	    "hostname": "driver_huebulbs",
	    "comments": "must be insitialised when hub is present",
	    "vendor_id": 2
	  }
	]

	METHOD: GET
	URL: /api/sensor
	Params: none
	Sample response: 
	[
	  {
	    "id": 1,
	    "driver_id": 1,
	    "sensor_type_id": 1,
	    "datastore_id": 1,
	    "vendor_id": 1,
	    "vendor_code": "AATEMP",
	    "unit": "Degrees Cel",
	    "short_unit": "ºC",
	    "description": "Temperature sensor",
	    "location": "Kitchen"
	  },
	  {
	    "id": 4,
	    "driver_id": 1,
	    "sensor_type_id": 1,
	    "datastore_id": 1,
	    "vendor_id": 1,
	    "vendor_code": "ABTEMP",
	    "unit": "Degrees Cel",
	    "short_unit": "ºC",
	    "description": "Temperature sensor",
	    "location": "Bathroom"
	  },
	  {
	    "id": 5,
	    "driver_id": 1,
	    "sensor_type_id": 1,
	    "datastore_id": 1,
	    "vendor_id": 1,
	    "vendor_code": "ACTEMP",
	    "unit": "Degrees Cel",
	    "short_unit": "ºC",
	    "description": "Temperature sensor",
	    "location": "Living Room"
	  }
	]

	METHOD: GET
	URL: /api/sensor_type
	Params: none
	Sample response: 
	[
	  {
	    "id": 1,
	    "description": "Temperature"
	  },
	  {
	    "id": 2,
	    "description": "Humidity"
	  },
	  {
	    "id": 3,
	    "description": "Electrical Power"
	  }
	]

	METHOD: GET
	URL: /api/vendor
	Params: none
	Sample response: 
	[
	  {
	    "id": 1,
	    "description": "Wireless Things"
	  },
	  {
	    "id": 2,
	    "description": "Phillips Hue"
	  }
	]

	METHOD: GET
	URL: /api/vendor/<id>/sensor
	Params: inline id
	Sample response: same as /sensor but only for specified vendor

	METHOD: GET
	URL: /api/vendor/<id>/actuator
	Params: inline id
	Sample response: same as /actuator but only for specified vendor

	METHOD: GET
	URL: /api/vendor/<id>/controller
	Params: inline id
	Sample response: same as /controller but only for specified vendor

	METHOD: GET
	URL: /api/vendor/<id>/datastore
	Params: inline id
	Sample response: same as /datastore but only for specified vendor

	METHOD: GET
	URL: /api/vendor/<id>/driver
	Params: inline id
	Sample response: same as /driver but only for specified vendor

POST requests for registering new entities are under construction




