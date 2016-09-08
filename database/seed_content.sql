# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.15)
# Database: databox_directory
# Generation Time: 2016-09-08 13:06:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table actuator
# ------------------------------------------------------------

LOCK TABLES `actuator` WRITE;
/*!40000 ALTER TABLE `actuator` DISABLE KEYS */;

INSERT INTO `actuator` (`id`, `controller_id`, `driver_id`, `actuator_type_id`, `vendor_id`, `vendor_code`, `description`, `location`)
VALUES
	(1,1,1,1,2,'BULB1','hue multi colour bulb','Living Room'),
	(2,1,1,1,2,'BULB2','hue multi colour bulb','Living Room'),
	(4,1,1,1,2,'BULB3','hue multi colour bulb','Bedroom');

/*!40000 ALTER TABLE `actuator` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table actuator_type
# ------------------------------------------------------------

LOCK TABLES `actuator_type` WRITE;
/*!40000 ALTER TABLE `actuator_type` DISABLE KEYS */;

INSERT INTO `actuator_type` (`id`, `description`)
VALUES
	(1,'Magic Bulb');

/*!40000 ALTER TABLE `actuator_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table controller
# ------------------------------------------------------------

LOCK TABLES `controller` WRITE;
/*!40000 ALTER TABLE `controller` DISABLE KEYS */;

INSERT INTO `controller` (`id`, `description`, `hostname`, `api_endpoint`, `vendor_id`)
VALUES
	(1,'Hue bulbs actuation controller','controller_huebulbs:8080','/actuate/',2);

/*!40000 ALTER TABLE `controller` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table datastore
# ------------------------------------------------------------

LOCK TABLES `datastore` WRITE;
/*!40000 ALTER TABLE `datastore` DISABLE KEYS */;

INSERT INTO `datastore` (`id`, `description`, `hostname`, `api_url`)
VALUES
	(1,'Wireless things time series data store','datastore_wirelessthings:8080','/api/data'),
	(2,'Hue bulbs state datastore','datastore_huebulbs:8080','/api/data');

/*!40000 ALTER TABLE `datastore` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table driver
# ------------------------------------------------------------

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;

INSERT INTO `driver` (`id`, `description`, `hostname`, `comments`, `vendor_id`)
VALUES
	(1,'Wireless things datastore driver','driver_wirelessthings','some throw away comment',1),
	(2,'Hue bulbs datastore and actuation driver','driver_huebulbs','must be insitialised when hub is present',2);

/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sensor
# ------------------------------------------------------------

LOCK TABLES `sensor` WRITE;
/*!40000 ALTER TABLE `sensor` DISABLE KEYS */;

INSERT INTO `sensor` (`id`, `driver_id`, `sensor_type_id`, `datastore_id`, `vendor_id`, `vendor_code`, `unit`, `short_unit`, `description`, `location`)
VALUES
	(1,1,1,1,1,'AATEMP','Degrees Cel','ºC','Temperature sensor','Kitchen'),
	(4,1,1,1,1,'ABTEMP','Degrees Cel','ºC','Temperature sensor','Bathroom'),
	(5,1,1,1,1,'ACTEMP','Degrees Cel','ºC','Temperature sensor','Living Room');

/*!40000 ALTER TABLE `sensor` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sensor_type
# ------------------------------------------------------------

LOCK TABLES `sensor_type` WRITE;
/*!40000 ALTER TABLE `sensor_type` DISABLE KEYS */;

INSERT INTO `sensor_type` (`id`, `description`)
VALUES
	(1,'Temperature'),
	(2,'Humidity'),
	(3,'Electrical Power');

/*!40000 ALTER TABLE `sensor_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table vendor
# ------------------------------------------------------------

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;

INSERT INTO `vendor` (`id`, `description`)
VALUES
	(1,'Wireless Things'),
	(2,'Phillips Hue');

/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
