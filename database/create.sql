# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.15)
# Database: databox_directory
# Generation Time: 2016-09-08 10:21:32 +0000
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

DROP TABLE IF EXISTS `actuator`;

CREATE TABLE `actuator` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `controller_id` int(11) unsigned DEFAULT NULL,
  `driver_id` int(11) unsigned DEFAULT NULL,
  `vendor_id` int(11) unsigned DEFAULT NULL,
  `vendor_code` int(11) DEFAULT NULL,
  `description` int(11) DEFAULT NULL,
  `location` int(11) DEFAULT NULL,
  `actuator_type_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vendor_id` (`vendor_id`,`vendor_code`),
  KEY `controller_id` (`controller_id`),
  KEY `driver_id` (`driver_id`),
  KEY `actuator_type_id` (`actuator_type_id`),
  CONSTRAINT `actuator_ibfk_1` FOREIGN KEY (`controller_id`) REFERENCES `controller` (`id`),
  CONSTRAINT `actuator_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`),
  CONSTRAINT `actuator_ibfk_3` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`),
  CONSTRAINT `actuator_ibfk_4` FOREIGN KEY (`actuator_type_id`) REFERENCES `actuator_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table actuator_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `actuator_type`;

CREATE TABLE `actuator_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table controller
# ------------------------------------------------------------

DROP TABLE IF EXISTS `controller`;

CREATE TABLE `controller` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `description` text,
  `hostname` text,
  `api_endpoint` text,
  `vendor_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vendor_id` (`vendor_id`),
  CONSTRAINT `controller_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table datastore
# ------------------------------------------------------------

DROP TABLE IF EXISTS `datastore`;

CREATE TABLE `datastore` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `description` text,
  `hostname` text,
  `api_url` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table driver
# ------------------------------------------------------------

DROP TABLE IF EXISTS `driver`;

CREATE TABLE `driver` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `description` text,
  `hostname` text,
  `comments` text,
  `vendor_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vendor_id` (`vendor_id`),
  CONSTRAINT `driver_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table sensor
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sensor`;

CREATE TABLE `sensor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `driver_id` int(11) unsigned DEFAULT NULL,
  `sensor_type_id` int(11) unsigned DEFAULT NULL,
  `datastore_id` int(11) unsigned DEFAULT NULL,
  `vendor_id` int(11) unsigned DEFAULT NULL,
  `vendor_code` int(11) DEFAULT NULL,
  `unit` char(11) DEFAULT NULL,
  `short_unit` char(5) DEFAULT '',
  `description` text,
  `location` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vendor_id` (`vendor_id`,`vendor_code`),
  KEY `driver_id` (`driver_id`),
  KEY `sensor_type_id` (`sensor_type_id`),
  KEY `datastore_id` (`datastore_id`),
  CONSTRAINT `sensor_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`),
  CONSTRAINT `sensor_ibfk_2` FOREIGN KEY (`sensor_type_id`) REFERENCES `sensor_type` (`id`),
  CONSTRAINT `sensor_ibfk_3` FOREIGN KEY (`datastore_id`) REFERENCES `datastore` (`id`),
  CONSTRAINT `sensor_ibfk_4` FOREIGN KEY (`vendor_id`) REFERENCES `vendor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table sensor_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sensor_type`;

CREATE TABLE `sensor_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table vendor
# ------------------------------------------------------------

DROP TABLE IF EXISTS `vendor`;

CREATE TABLE `vendor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
