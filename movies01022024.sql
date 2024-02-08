-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: website
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `director` varchar(30) DEFAULT NULL,
  `duration_minutes` int DEFAULT NULL,
  `release_year` int DEFAULT NULL,
  `thumbnail_name` varchar(50) DEFAULT NULL,
  `video_id` varchar(100) DEFAULT NULL,
  UNIQUE KEY `primary_id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Момчето си отива','Людмил Кирков',101,1972,'momcheto_image','_uuhDvvY1_Q'),(2,'Господин за един ден','Николай Волев',87,1983,'gospodin_image','evqlOa5youA'),(3,'Време разделно','Людмил Стайков',267,1988,'vreme_razdelno_image','UCWF9ZJ-ibY'),(4,'Козият рог','Методи Андонов',91,1972,'kozijat_rog_image','kHE2qQuLHy4'),(5,'Да обичаш на инат','Николай Волев',92,1986,'inat_image','1PHqIndDyTI'),(6,'Крадецът на праскови','Въло Радев',79,1964,'kradec_image','7kwmpkXH2Nc'),(7,'Двойникът','Николай Волев',98,1980,'dvoinik_image','1N7wAD5UkKQ'),(8,'Мъжки времена','Едуард Захариев',125,1977,'mujki_image','ITwS-bhDJr4'),(9,'Любимец 13','Владимир Янчев',89,1958,'lubimec_image','aSOp9XhySyM'),(10,'Баш майсторът','Петър Б. Василев',65,1973,'maistor_image','qbe3WrXl5sM');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-01 22:00:04
