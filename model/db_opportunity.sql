-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 04, 2014 at 05:06 PM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db_opportunity`
--

-- --------------------------------------------------------

--
-- Table structure for table `opportunity`
--

CREATE TABLE IF NOT EXISTS `opportunity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `opportunityname` varchar(255) NOT NULL,
  `cps` text NOT NULL,
  `description` text NOT NULL,
  `markets` text NOT NULL,
  `capabilities_marketcountry` text NOT NULL,
  `capabilities_area` text NOT NULL,
  `customer` varchar(255) NOT NULL,
  `deadline` date NOT NULL,
  `reference_url` text NOT NULL,
  `reference_title` text NOT NULL,
  `usecase_person` text NOT NULL,
  `usecase_doessomething` text NOT NULL,
  `usecase_toachieve` int(11) NOT NULL,
  `roi_range` text NOT NULL,
  `roi_value` text NOT NULL,
  `tvp_range` text NOT NULL,
  `tvp_value` text NOT NULL,
  `enps_range` text NOT NULL,
  `enps_value` text NOT NULL,
  `strategy_range` text NOT NULL,
  `strategy_value` text NOT NULL,
  `rank` int(11) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `PPaaS_Status` varchar(50) NOT NULL DEFAULT 'Request Received',
  `Relevant_APIs_and_capabilities` text NOT NULL,
  `policy1` varchar(20) NOT NULL,
  `policy2` varchar(20) NOT NULL,
  `policy3` varchar(20) NOT NULL,
  `policy4` varchar(20) NOT NULL,
  `policy5` varchar(20) NOT NULL,
  `policy6` varchar(20) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `opportunity`
--

