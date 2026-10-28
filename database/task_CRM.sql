CREATE DATABASE  IF NOT EXISTS `crm_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `crm_db`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: crm_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'SkillConnect','9876543210'),(2,'SkillConnect Pvt Ltd','9876543210'),(3,'SkillConnect Pvt Ltd','9876543210'),(4,'SkillConnect Pvt Ltd','9876543210'),(5,'SkillConnect Pvt Ltd','9876543210'),(6,'SkillConnect Pvt Ltd','9876543210'),(7,'SkillConnect Pvt Ltd','9876543210'),(8,'SkillConnect Pvt Ltd','9876543210'),(9,'SkillConnect Pvt Ltd','9876543210'),(10,'SkillConnect Pvt Ltd','9876543210'),(11,'leamss','+91 7083057910'),(12,'Kayy','12345677'),(13,'Kayy','12345677'),(14,'Kayy','12345677'),(15,'Kayy','12345677'),(16,'Kayy','123485677'),(17,'guuu','7890'),(18,'hay','1234'),(19,'hay','1234'),(20,'hay','1234'),(21,'wqd','7890'),(22,'hjhsx','89000628'),(23,'hjhsx','89000628'),(24,'hjhsx','89000628'),(25,'hjhsx','89000628'),(26,'swara','1234'),(27,'skillconnect','9833698684'),(28,'alex','123'),(29,'leamss','+91 7083057910'),(30,'M','7890'),(31,'hy','7890'),(32,'arcon','12312345'),(33,'k','1234567890'),(34,'h','123'),(35,'k','01234567788'),(36,'k','123'),(37,'k','123'),(38,'k','1233'),(39,'k','123'),(40,'k','123445');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `module` varchar(50) NOT NULL,
  `action` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'Tickets','view','2026-01-03 06:39:47'),(2,'Tickets','create','2026-01-03 06:39:47'),(3,'Tickets','edit','2026-01-03 06:39:47'),(4,'Tickets','delete','2026-01-03 06:39:47');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (1,1),(2,1),(1,2),(2,2),(1,3),(2,3),(1,4);
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','2026-01-03 06:29:45'),(2,'Support_Agent','2026-01-03 06:29:45');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (15,'Sakshi','Patil','sakshi31077@gmail.com','7083057910','Admin','ACTIVE','2026-01-06 04:57:03'),(17,'Manali','Patkar','manalipatkar12@gmail.com','1256774','Support Agent','ACTIVE','2026-01-06 05:24:34'),(22,'swara','waikul','swarawaikul12@gmail.com','123','Admin','ACTIVE','2026-01-07 11:32:10'),(23,'sakshi','nikum','sakshi12@gmail.com','123','Support Agent','ACTIVE','2026-01-07 12:06:55'),(24,'sakshi','pawar','pawar12@gmail.com','123','Admin','ACTIVE','2026-01-07 12:11:17'),(25,'Manali','Patil','patil12@gmail.com','123','Support Agent','ACTIVE','2026-01-07 12:33:37');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_activity_logs`
--

DROP TABLE IF EXISTS `ticket_activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  `old_value` text,
  `new_value` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ticket_activity_logs_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`),
  CONSTRAINT `ticket_activity_logs_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_activity_logs`
--

LOCK TABLES `ticket_activity_logs` WRITE;
/*!40000 ALTER TABLE `ticket_activity_logs` DISABLE KEYS */;
INSERT INTO `ticket_activity_logs` VALUES (1,21,NULL,'Manali Patkar','TICKET_CREATED',NULL,'Undo','2026-01-07 05:23:44'),(2,22,NULL,'Manali Patkar','TICKET_CREATED',NULL,'Undo','2026-01-07 05:25:03'),(3,23,NULL,'Manali','TICKET_CREATED',NULL,'dkwekn','2026-01-07 05:25:38'),(4,23,21,'Admin','TICKET_ASSIGNED','17','17','2026-01-07 05:55:12'),(5,23,21,'Admin','TICKET_ASSIGNED','17','17','2026-01-07 05:55:13'),(6,23,21,'Admin','TICKET_ASSIGNED','17','17','2026-01-07 05:55:14'),(7,23,21,'Admin','TICKET_ASSIGNED','17','17','2026-01-07 05:55:14'),(8,23,21,'Admin','TICKET_ASSIGNED','17','17','2026-01-07 05:55:14'),(9,23,21,'Admin','TICKET_ASSIGNED','17','17','2026-01-07 05:55:14'),(10,23,21,'Admin','TICKET_ASSIGNED','17','17','2026-01-07 05:55:16'),(11,23,21,'Admin','TICKET_ASSIGNED','17','17','2026-01-07 05:55:17'),(12,23,21,'Admin','TICKET_ASSIGNED','17','17','2026-01-07 05:55:17'),(13,23,21,'Admin','STATUS_CHANGED','OPEN','RESOLVED','2026-01-07 05:58:15'),(14,23,21,'Admin','STATUS_CHANGED','RESOLVED','RESOLVED','2026-01-07 05:58:16'),(15,23,21,'Admin','STATUS_CHANGED','RESOLVED','RESOLVED','2026-01-07 05:58:16'),(16,23,21,'Admin','STATUS_CHANGED','RESOLVED','RESOLVED','2026-01-07 05:58:35'),(17,23,21,'Admin','STATUS_CHANGED','RESOLVED','RESOLVED','2026-01-07 05:58:36'),(18,23,21,'Admin','STATUS_CHANGED','RESOLVED','RESOLVED','2026-01-07 05:58:36'),(19,23,21,'Admin','STATUS_CHANGED','RESOLVED','RESOLVED','2026-01-07 05:58:36'),(20,21,21,'Unknown','STATUS_CHANGED','OPEN','RESOLVED','2026-01-07 06:09:49'),(21,24,NULL,'swara','TICKET_CREATED',NULL,'undo','2026-01-07 12:39:45'),(22,24,26,'Unknown','TICKET_ASSIGNED',NULL,'17','2026-01-07 12:49:28'),(23,24,26,'Unknown','STATUS_CHANGED','OPEN','RESOLVED','2026-01-07 12:50:09');
/*!40000 ALTER TABLE `ticket_activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_replies`
--

DROP TABLE IF EXISTS `ticket_replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_id` int NOT NULL,
  `sender_type` enum('STAFF','USER') DEFAULT 'STAFF',
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `attachment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ticket_id` (`ticket_id`),
  CONSTRAINT `ticket_replies_ibfk_1` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_replies`
--

LOCK TABLES `ticket_replies` WRITE;
/*!40000 ALTER TABLE `ticket_replies` DISABLE KEYS */;
INSERT INTO `ticket_replies` VALUES (1,3,'STAFF','heyyy','2026-01-06 11:11:29',NULL),(2,3,'STAFF','hiii','2026-01-06 11:13:23',NULL),(3,2,'STAFF','heyy','2026-01-06 11:13:41',NULL),(4,2,'STAFF','skjxn','2026-01-06 11:22:21',NULL),(5,2,'STAFF','heyy','2026-01-06 11:42:51','1767699771360-ChatGPT Image Jan 2, 2026, 06_26_30 PM.png'),(6,3,'STAFF','<p>huiii</p>','2026-01-06 12:50:50',NULL),(7,1,'STAFF','<p>heyyy</p>','2026-01-06 12:56:55',NULL),(8,2,'STAFF','<p>heyyy<strong>heyy</strong></p>','2026-01-06 12:57:15',NULL),(9,24,'STAFF','<p>hello</p>','2026-01-07 12:50:30',NULL);
/*!40000 ALTER TABLE `ticket_replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ticket_number` varchar(50) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `priority` enum('Low','Medium','High') DEFAULT 'Medium',
  `phone` varchar(20) DEFAULT NULL,
  `message` text,
  `attachment` varchar(255) DEFAULT NULL,
  `status` enum('OPEN','IN_PROGRESS','RESOLVED','CLOSED') DEFAULT 'OPEN',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `assigned_to` int DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ticket_number` (`ticket_number`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,'TKT-5E1214FB',NULL,NULL,NULL,'Support',NULL,NULL,NULL,NULL,'OPEN','2026-01-06 10:00:49',NULL,'2026-01-06 10:22:33'),(2,'TKT-3CEA426E','Unable to Login','Manali Patkar','manalipatkar02@gmail.com','Technical','High','7083057910','Unable',NULL,'CLOSED','2026-01-06 10:02:34',17,'2026-01-06 10:47:43'),(3,'TKT-EA5E0800','UKIQ','manali','test@example.com','Sales','Medium','1234567','fvdv f','1767696446092-ChatGPT Image Jan 2, 2026, 06_26_30 PM.png','RESOLVED','2026-01-06 10:47:26',17,'2026-01-06 12:03:45'),(4,'TKT-295D2D99','UKIQ','manali','manalipatkar02@gmail.com','Support','Medium','7083057910','cibadhcdjhck',NULL,'OPEN','2026-01-07 04:54:02',NULL,'2026-01-07 04:54:02'),(5,'TKT-15D34CAB','UKIQ','manali','manalipatkar02@gmail.com','Support','Medium','7083057910','cibadhcdjhck',NULL,'OPEN','2026-01-07 04:54:04',NULL,'2026-01-07 04:54:04'),(6,'TKT-D3052E08','UKIQ','manali','manalipatkar02@gmail.com','Support','Medium','7083057910','cibadhcdjhck',NULL,'OPEN','2026-01-07 04:54:06',NULL,'2026-01-07 04:54:06'),(7,'TKT-A20984B3','UKIQ','manali','manalipatkar02@gmail.com','Support','Medium','7083057910','cibadhcdjhck',NULL,'OPEN','2026-01-07 04:54:06',NULL,'2026-01-07 04:54:06'),(8,'TKT-5934BE82','UKIQ','manali','manalipatkar02@gmail.com','Support','Medium','7083057910','cibadhcdjhck',NULL,'OPEN','2026-01-07 04:54:06',NULL,'2026-01-07 04:54:06'),(9,'TKT-F1F5F6BB','UKIQ','manali','manalipatkar02@gmail.com','Support','Medium','7083057910','cibadhcdjhck',NULL,'OPEN','2026-01-07 04:54:07',NULL,'2026-01-07 04:54:07'),(10,'TKT-0349C2DE','UKIQ','manali','manalipatkar02@gmail.com','Support','Medium','7083057910','cibadhcdjhck',NULL,'OPEN','2026-01-07 04:54:07',NULL,'2026-01-07 04:54:07'),(11,'TKT-9A2FF4DD','UKIQ','manali','manalipatkar02@gmail.com','Support','Medium','7083057910','cibadhcdjhck',NULL,'OPEN','2026-01-07 04:54:08',NULL,'2026-01-07 04:54:08'),(12,'TKT-147AEAB5','UKIQ','manali','manalipatkar02@gmail.com','Support','Medium','7083057910','cibadhcdjhck',NULL,'OPEN','2026-01-07 04:54:16',NULL,'2026-01-07 04:54:16'),(13,'TKT-1EE79C7E','UKIQ','manali','manalipatkar02@gmail.com','Support','Medium','7083057910','cibadhcdjhck',NULL,'OPEN','2026-01-07 04:54:17',NULL,'2026-01-07 04:54:17'),(14,'TKT-F26DD29B','Undo','Manali','manalipatkar12@gmail.com','Technical','High','7083057910','xckjdsjclkdschkld',NULL,'OPEN','2026-01-07 05:07:11',NULL,'2026-01-07 05:07:11'),(15,'TKT-FC84CEBD','Undo','Manali','manalipatkar12@gmail.com','Technical','High','7083057910','xckjdsjclkdschkld',NULL,'OPEN','2026-01-07 05:07:13',NULL,'2026-01-07 05:07:13'),(16,'TKT-65C027F0','Undo','Manali','manalipatkar12@gmail.com','Technical','High','7083057910','xckjdsjclkdschkld',NULL,'OPEN','2026-01-07 05:08:59',NULL,'2026-01-07 05:08:59'),(17,'TKT-F7B79A35','Undo','Manali','manalipatkar12@gmail.com','Technical','High','7083057910','xckjdsjclkdschkld',NULL,'OPEN','2026-01-07 05:16:39',NULL,'2026-01-07 05:16:39'),(18,'TKT-93364F4F','Undo','Manali','manalipatkar12@gmail.com','Technical','High','7083057910','xckjdsjclkdschkld',NULL,'OPEN','2026-01-07 05:16:40',NULL,'2026-01-07 05:16:40'),(19,'TKT-50949C6E','kjd','sclkwn,','wedkewjckxl@gmail.com','Support','Medium','67890930','wdxwx',NULL,'OPEN','2026-01-07 05:17:04',NULL,'2026-01-07 05:17:04'),(20,'TKT-29140E51','kjd','sclkwn,','wedkewjckxl@gmail.com','Support','Medium','67890930','wdxwx',NULL,'OPEN','2026-01-07 05:17:05',NULL,'2026-01-07 05:17:05'),(21,'TKT-4E81F7E3','Undo','Manali Patkar','manalipatkar02@gmail.com','Billing','Medium','7083057910','wqdkjh',NULL,'RESOLVED','2026-01-07 05:23:44',NULL,'2026-01-07 06:09:49'),(22,'TKT-8CFC6E13','Undo','Manali Patkar','manalipatkar02@gmail.com','Billing','Medium','7083057910','wqdkjh',NULL,'IN_PROGRESS','2026-01-07 05:25:03',NULL,'2026-01-07 06:07:43'),(23,'TKT-C5B92109','dkwekn','Manali','manalipatkar12@gmail.com','Support','Medium','7083057910','dgbnkcnjajdklkdwmnd',NULL,'RESOLVED','2026-01-07 05:25:38',17,'2026-01-07 05:58:15'),(24,'TKT-4E037775','undo','swara','swara12@gmail.com','Sales','Medium','123','sdsacsdc',NULL,'RESOLVED','2026-01-07 12:39:44',17,'2026-01-07 12:50:09');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `company_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `company_id` (`company_id`),
  KEY `fk_user_role` (`role_id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Manali','Patkar','manali.patkar@test.com','9876543210','$2b$10$OQieB.oGktvSBZ6kMeoqwOCxdHmzQmAPTpa7sa1.zjSMz0/VOKit6',8,'2025-12-31 19:08:21',NULL,NULL,NULL),(3,'Swara','Patkar','Swara.patkar@test.com','9876543210','$2b$10$ECrfAqOxG4hl/DnWV43RL.LIVsIKEedOkEPX3MMRiDoNVvsR/OeUy',10,'2025-12-31 19:22:39',NULL,NULL,NULL),(4,'sakshi','Patkar','vrushabhshirke21@gmail.com','+91 7083057910','$2b$10$2ipVFVhIBHFZ4IkPa74gcuHeIrB6JM0Th8UYzEJqxVK2sVAl2Tcdy',11,'2025-12-31 19:40:23',NULL,NULL,NULL),(5,'Rutika','Patkar','rutika@gmail.com','12345677','$2b$10$HtzpcxFaFBDPqlXXqG5xVeDnLrXCrmh5C5VRbh5MnexHgNgzHfCPG',15,'2026-01-01 10:27:06',NULL,NULL,NULL),(6,'amar','Patkar','amar@gmail.com','123485677','$2b$10$cbAPJdF5AA0gVRXVTGz/.u2wyhE4sTWnwWepznnow7bmOzbcf7Na2',16,'2026-01-01 10:30:09',NULL,NULL,NULL),(7,'durgesh','Bapat','durgesh@gmail.com','7890','$2b$10$xifCApQoYo4OIut9st3Y1.lkUbA98LZevy.6/VeYl05tqvWaUWOZ2',17,'2026-01-01 11:13:56',NULL,NULL,NULL),(8,'sakshi','Bapat','durgeshgmail.com','1234','$2b$10$Cd56SJVoPneA2IzbMY/cuOcPGxC3TUM4bTx3AzGt.VIR9aNJS92LO',18,'2026-01-01 11:37:25',NULL,NULL,NULL),(9,'heyy','Bapat','durgeshmail.com','1234','$2b$10$qT4gYaOteNIjEcHJFOq3AuCgMLF4RaZCueSyCm0/5g5szna03xa8C',19,'2026-01-01 11:39:22',NULL,NULL,NULL),(10,'heyy','Bapat','durgeshmal.com','1234','$2b$10$MqsqB4NiNCZpFMU1H367j.Z9O/fk8g8EDhANTXW4WBAsTI4yRROnu',20,'2026-01-01 11:41:33','640349da208223d0fa83a387457f4735748668eaabd0fcd2cebe9d12d284bc27','2026-01-02 12:52:41',NULL),(11,'Manali','Patkar','manaloi@gmail.com','7890','$2b$10$/EXJoYX/a9Yn4rB01w5l5OiWRxt1Jy8UB9GGXknlU/7GhltJ6SVcO',21,'2026-01-01 13:01:27',NULL,NULL,NULL),(12,'dada','dada','dada@gmail.com','89000628','$2b$10$YdIo2EWus4GGaDe99T7ylunCTZXaH4/mybmdIajmh2UlhVqs7KS76',25,'2026-01-01 17:13:13','51bca890e2685f7b1021cbfde71de487b0af14f5768101b0719b8f89959ca3e0','2026-01-01 23:46:35',NULL),(13,'Swara','Waikul','swara12@gmail.com','1234','$2b$10$bQoDSrX/.pEwrAFIDHDNlu0L.SDmZs4Bs/Mk50uOge3dnf8h6GuJu',26,'2026-01-02 05:54:34',NULL,NULL,NULL),(14,'Sakshi','Patil','sakshipatil3107@gmail.com','9833698684','$2b$10$YiTYb0/c8kWYPq87nm0l9uwYtyTrzyqSqgUL0iYAodFftsj.eq1vq',27,'2026-01-02 07:10:37',NULL,NULL,NULL),(15,'alex','patel','alex12@gmail.com','123','$2b$10$AkiCq2a9q8mNuSOL9kir1OAGivXKkUoPRnA4X51zErNK22Df35cf6',28,'2026-01-02 11:11:31',NULL,NULL,NULL),(16,'Shrutii','Patkar','manalipatkar12@gmail.com','+91 7083057910','$2b$10$Kd4eHtGOKdXC5xYFkPs4mu5X0iW0n4xgo.kwONQN0Zkgnwqr0DUBq',29,'2026-01-03 04:20:10',NULL,NULL,2),(17,'shriya','Patkar','manali@gmail.com','7890','$2b$10$TBLJ4h3j4tyDNtxH4yR5POSPgGTQLtNxqVpAR741qiFDPGtLkXPTG',30,'2026-01-03 05:32:38',NULL,NULL,NULL),(18,'meghana','ghag','manalipatkar02@gmail.com','7890','$2b$10$OtiQEfV4CBu60TJBEAUUD.dwLXB1XlQ6/eA65poiGf.hRxv6PWNDy',31,'2026-01-03 05:36:59',NULL,NULL,NULL),(19,'Shreya ','Sakhare','shreya@gmail.com','12312345','$2b$10$1hZYgVUXUCT9Oy5aiM7QxOfnv/r9swkf8iSpfssoZVuYQA9ZYrBMi',32,'2026-01-03 05:39:07',NULL,NULL,NULL),(20,'Swara','Patkar','Swara12234@gmail.com','1234567890','$2b$10$coR346xjGMweMKITB1J/7e5t1yPtRyujwYU7BDRCuPoD9vXoz9u2W',33,'2026-01-06 05:30:43',NULL,NULL,NULL),(21,'Prassana ','Ghag','ghag123@gmail.com','123','$2b$10$W09DAx9jZfza0PkYa7m6MeAGOZSEA9k8ZLZ8x05yrS3wvO.pETzCq',34,'2026-01-06 10:13:39',NULL,NULL,NULL),(22,'Manali','Patkar','ghahj12@gmail.com','01234567788','$2b$10$zDcj.SrctXOgOEOa9PUNrOHnXXz/GqrUjcteRzLPg5WmUlsXNUexq',35,'2026-01-07 06:54:59',NULL,NULL,NULL),(23,'swara','waikul','swarawaikul12@gmail.com','123','$2b$10$KWVHIuCq.dSglBF4gsofPu8WtSsC2pHaRLPSc7QtXPneoKBSLC4qG',36,'2026-01-07 11:51:04',NULL,NULL,1),(24,'Sakshi','Nikum','sakshi12@gmail.com','123','$2b$10$woT5wtELAHdQ8MsT/Ag6ue0UCFNT03XTY2EIeyJHQBpgJoFo/hoxC',37,'2026-01-07 12:05:41',NULL,NULL,NULL),(25,'sakshi','pawar','pawar12@gmail.com','1233','$2b$10$4UfhdYQY5gA3jN6XlJzBte/YEGZ2L87ABjhb4c0suHeh3n6.0VyXm',38,'2026-01-07 12:12:24',NULL,NULL,NULL),(26,'Manali','Patkar','manali32@gmail.com','123','$2b$10$HqcKqfWU0hP6IpYnIMHyr.iD0evLfpW/V.vUvaK2ubkeiMtaf5KT.',39,'2026-01-07 12:31:57',NULL,NULL,1),(27,'Sakshi','Patil','sakshi123@gmail.com','123445','$2b$10$XLAnzR3Ii.4U/n0cEyAKse91T6ZgPYKFgjbee9jPNOzqGaSoTX726',40,'2026-01-08 04:57:01',NULL,NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-08 11:34:04
