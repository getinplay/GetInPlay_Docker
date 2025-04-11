-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 27, 2025 at 06:04 PM
-- Server version: 10.11.8-MariaDB-0ubuntu0.24.04.1
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `getinplay`
--

-- --------------------------------------------------------

--
-- Table structure for table `book_game`
--

CREATE TABLE `book_game` (
  `id` int(11) NOT NULL,
  `username` varchar(200) NOT NULL,
  `phone_no` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `game_id` int(100) NOT NULL,
  `slot` text NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 1,
  `book_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book_game`
--

INSERT INTO `book_game` (`id`, `username`, `phone_no`, `email`, `game_id`, `slot`, `price`, `deleted`, `book_date`) VALUES
(1, 'bob123', '4768345448', 'bob12@gmail.com', 1, '10:00-10:30AM', 100, 1, '2025-02-06'),
(2, 'alex123', '2437562435', 'alex12@gmail.com', 1, '3:00-4:00PM', 100, 1, '2025-02-06'),
(3, 'abc', '1212121212', 'abc@gmail.com', 1, '7:00-7:30PM', 200, 1, '2025-02-06'),
(4, 'saw', '2354765423', 'saw@gmail.com', 1, '9:00-10:00PM', 100, 1, '2025-02-06'),
(5, 'dadAD', '5443562354', 'dadAD@gmail.com', 1, '10:30-11:00PM', 100, 1, '2025-02-08'),
(6, 'dadAD', '5443562354', 'dadAD@gmail.com', 1, '5:00-6:00PM', 100, 1, '2025-01-08'),
(7, 'dadA', '5443562354', 'dadAD@gmail.com', 1, '10:30-11:00PM', 100, 1, '2025-01-08'),
(8, 'daD', '5443562354', 'dadAD@gmail.com', 1, '5:00-6:00PM', 100, 1, '2025-03-08'),
(9, 'sham123', '1231231231', 'sohan@gmail.com', 2, '12:00-1:00PM', 100, 1, '2025-03-06'),
(28, 'sham123', '1231231231', 'sohan@gmail.com', 1, '3:30-4:00PM', 100, 1, '2025-03-08'),
(29, 'sham123', '1231231231', 'sohan@gmail.com', 1, '2:30-3:00PM', 100, 1, '2025-03-09'),
(44, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '10:00-10:30AM', 100, 1, '2025-03-07'),
(45, 'sham123', '1231231231', 'sohan@gmail.com', 1, '3:00-4:00PM', 100, 1, '2025-03-07'),
(46, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '9:00-10:00PM', 100, 1, '2025-03-07'),
(47, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '10:00-11:00AM', 100, 1, '2025-03-17'),
(48, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '11:30-12:00PM', 100, 1, '2025-03-07'),
(49, 'sham123', '1231231231', 'sohan@gmail.com', 2, '12:30-1:00PM', 100, 1, '2025-03-07'),
(50, 'sham123', '1231231231', 'sohan@gmail.com', 2, '4:00-4:30PM', 100, 1, '2025-03-07'),
(51, 'abc_123', '1212121212', 'sohan.21beitg119@gmail.com', 5, '11:00-11:30AM', 100, 1, '2025-03-07'),
(52, 'swati123', '9345678901', 'swati4@gmail.com', 3, '10:00-10:30AM', 100, 1, '2025-03-09'),
(53, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '1:30-2:00PM', 100, 1, '2025-03-07'),
(54, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '9:00-10:00PM', 100, 1, '2025-03-09'),
(55, 'abc_123', '1212121212', 'sohan.21beitg119@gmail.com', 3, '10:00-10:30AM', 100, 1, '2025-03-07'),
(56, 'sham123', '1231231231', 'sohan@gmail.com', 1, '11:30-12:00PM', 100, 1, '2025-03-08'),
(57, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 5, '4:00-4:30PM', 100, 1, '2025-03-07'),
(58, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 5, '5:30-6:00PM', 100, 1, '2025-03-07'),
(59, 'sham123', '1231231231', 'sohan@gmail.com', 1, '4:00-4:30PM', 100, 1, '2025-03-07'),
(60, 'sham123', '1231231231', 'sohan@gmail.com', 1, '10:30-11:00PM', 100, 1, '2025-03-07'),
(61, 'sham123', '1231231231', 'sohan@gmail.com', 2, '10:00-11:00PM', 100, 1, '2025-03-07'),
(62, 'sham123', '1231231231', 'sohan@gmail.com', 2, '10:00-11:00AM', 100, 1, '2025-03-08'),
(63, 'sham123', '1231231231', 'sohan@gmail.com', 2, '12:30-1:00PM', 100, 1, '2025-03-08'),
(64, 'sham123', '1231231231', 'sohan@gmail.com', 2, '5:30-6:00PM', 100, 1, '2025-03-08'),
(65, 'sham123', '1231231231', 'sohan@gmail.com', 2, '7:30-8:00PM', 100, 1, '2025-03-08'),
(66, 'sohan_1123', '9664691917', 'smitbarot2004@gmail.com', 5, '3:00-3:30PM', 100, 1, '2025-03-07'),
(67, 'sohan_1123', '9664691917', 'smitbarot2004@gmail.com', 5, '8:00-8:30PM', 100, 1, '2025-03-07'),
(68, 'sohan_1123', '9664691917', 'smitbarot2004@gmail.com', 5, '7:00-8:00PM', 100, 1, '2025-03-07'),
(69, 'sohan_1123', '9664691917', 'smitbarot2004@gmail.com', 5, '7:30-8:00PM', 100, 1, '2025-03-07'),
(70, 'sohan_1123', '9664691917', 'smitbarot2004@gmail.com', 5, '10:00-11:00PM', 100, 1, '2025-03-07'),
(71, 'sohan_1123', '9664691917', 'smitbarot2004@gmail.com', 5, '8:00-9:00PM', 100, 1, '2025-03-07'),
(72, 'sohan_1123', '9664691917', 'smitbarot2004@gmail.com', 2, '7:00-8:00PM', 100, 1, '2025-03-07'),
(73, 'sohan_1123', '9664691917', 'smitbarot2004@gmail.com', 2, '8:00-8:30PM', 100, 1, '2025-03-07'),
(74, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '10:00-10:30AM', 100, 1, '2025-03-08'),
(75, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '7:00-7:30PM', 100, 1, '2025-03-07'),
(76, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '10:00-11:00AM', 100, 1, '2025-03-07'),
(77, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '10:30-11:00PM', 100, 1, '2025-03-09'),
(78, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '10:00-10:30AM', 100, 1, '2025-03-09'),
(79, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '4:00-4:30PM', 100, 1, '2025-03-08'),
(80, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 1, '1:30-2:00PM', 100, 1, '2025-03-08'),
(81, 'sohan_1123', '9664691917', 'smitbarot2004@gmail.com', 4, '7:30-8:00PM', 100, 1, '2025-03-09'),
(82, 'sham123', '1231231231', 'sohan@gmail.com', 2, '4:00-4:30PM', 100, 1, '2025-03-08'),
(83, 'sohan_1123', '9664691917', 'smitbarot2004@gmail.com', 5, '9:00-9:30PM', 100, 1, '2025-03-07'),
(84, 'sohan_1123', '9664691917', 'smitbarot2004@gmail.com', 5, '11:00-11:30PM', 100, 1, '2025-03-07'),
(85, 'swati123', '9345678901', 'swati4@gmail.com', 5, '2:00-3:00PM', 100, 1, '2025-03-09'),
(86, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 4, '10:00-10:30AM', 100, 1, '2025-03-10'),
(87, 'getinplay123', '7990153071', 'sohan.21beitg119@gmail.com', 5, '11:00-11:30AM', 100, 1, '2025-03-10'),
(88, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 1, '10:00-11:00AM', 100, 1, '2025-03-10'),
(89, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '3:00-3:30PM', 100, 1, '2025-03-10'),
(90, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '3:00-4:00PM', 100, 1, '2025-03-10'),
(91, 'sham123', '1231231231', 'sohan@gmail.com', 2, '4:00-4:30PM', 100, 1, '2025-03-10'),
(92, 'sham123', '1231231231', 'sohan@gmail.com', 1, '11:30-12:00PM', 100, 1, '2025-03-11'),
(93, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '3:00-4:00PM', 100, 1, '2025-03-11'),
(94, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '4:00-4:30PM', 100, 1, '2025-03-11'),
(95, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '5:30-6:00PM', 100, 1, '2025-03-11'),
(96, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '7:30-8:00PM', 100, 1, '2025-03-11'),
(97, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 3, '8:00-8:30PM', 100, 1, '2025-03-11'),
(98, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 4, '7:00-8:00PM', 100, 1, '2025-03-11'),
(99, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 4, '8:00-8:30PM', 100, 1, '2025-03-11'),
(100, 'sham123', '1231231231', 'sohan@gmail.com', 4, '2:00-3:00PM', 100, 1, '2025-03-13'),
(101, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 4, '3:00-4:00PM', 100, 1, '2025-03-11'),
(102, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '10:30-11:00AM', 100, 1, '2025-03-12'),
(103, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '10:00-11:00AM', 100, 1, '2025-03-12'),
(104, 'sham123', '1231231231', 'sohan@gmail.com', 1, '1:00-2:00PM', 100, 1, '2025-03-12'),
(105, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '8:00-8:30PM', 100, 1, '2025-03-12'),
(106, 'hello', '9876543210', 'sohan1@gmail.com', 1, '11:30-12:00PM', 100, 1, '2025-03-12'),
(107, 'xyz123', '9123456789', 'smit2@gmail.com', 1, '10:00-11:00AM', 100, 1, '2025-03-12'),
(108, 'swati123', '9345678901', 'swati4@gmail.com', 1, '12:00-12:30PM', 100, 1, '2025-03-12'),
(109, 'bob1234', '9456789012', 'abc5@gmail.com', 1, '1:30-2:00PM', 100, 1, '2025-03-12'),
(110, 'bob_123', '9678901234', 'bob7@gmail.com', 1, '2:30-3:00PM', 100, 1, '2025-03-12'),
(111, 'svit124323', '9978901234', 'svit17@gmail.com', 1, '3:30-4:00PM', 100, 1, '2025-03-12'),
(112, 'smit_123', '9056789012', 'smit26@gmail.com', 1, '3:00-4:00PM', 100, 1, '2025-03-12'),
(113, 'sohan_2003', '9045678901', 'sohan25@gmail.com', 1, '4:00-4:30PM', 100, 1, '2025-03-12'),
(114, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 1, '5:00-6:00PM', 100, 1, '2025-03-12'),
(115, 'sham123', '1231231231', 'sohan@gmail.com', 1, '5:30-6:00PM', 100, 1, '2025-03-12'),
(116, 'sham123', '1231231231', 'sohan@gmail.com', 1, '1:00-2:00PM', 100, 1, '2025-03-13'),
(117, 'sham123', '1231231231', 'sohan@gmail.com', 1, '7:00-7:30PM', 100, 1, '2025-03-12'),
(118, 'sham123', '1231231231', 'sohan@gmail.com', 1, '10:30-11:00PM', 100, 1, '2025-03-12'),
(119, 'sham123', '1231231231', 'sohan@gmail.com', 1, '11:30-12:00PM', 100, 1, '2025-03-13'),
(120, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '11:30-12:00PM', 100, 1, '2025-03-17'),
(121, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 1, '4:00-4:30PM', 100, 0, '2025-03-17'),
(122, 'sham123', '1231231231', 'sohan@gmail.com', 2, '11:00-11:30PM', 100, 1, '2025-03-17'),
(123, 'sham123', '1231231231', 'sohan@gmail.com', 2, '7:30-8:00PM', 100, 1, '2025-03-17'),
(124, 'sham123', '1231231231', 'sohan@gmail.com', 2, '7:00-8:00PM', 100, 1, '2025-03-17'),
(125, 'sham123', '1231231231', 'sohan@gmail.com', 2, '10:00-11:00PM', 100, 1, '2025-03-17'),
(126, 'sham123', '1231231231', 'sohan@gmail.com', 2, '3:00-3:30PM', 100, 1, '2025-03-17'),
(127, 'sham123', '1231231231', 'sohan@gmail.com', 2, '3:00-4:00PM', 100, 1, '2025-03-17'),
(128, 'sham123', '1231231231', 'sohan@gmail.com', 2, '1:00-1:30PM', 100, 1, '2025-03-17'),
(129, 'sham123', '1231231231', 'sohan@gmail.com', 2, '5:30-6:00PM', 100, 1, '2025-03-17'),
(130, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 2, '2:00-3:00PM', 100, 1, '2025-03-17'),
(131, 'sham123', '1231231231', 'sohan@gmail.com', 2, '4:00-4:30PM', 100, 1, '2025-03-17'),
(132, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 4, '3:00-4:00PM', 100, 1, '2025-03-17'),
(134, 'sham123', '1231231231', 'sohan@gmail.com', 4, '4:00-4:30PM', 100, 1, '2025-03-17'),
(135, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 4, '10:00-11:00PM', 100, 1, '2025-03-17'),
(137, 'sham123', '1231231231', 'sohan@gmail.com', 3, '8:00-8:30PM', 100, 1, '2025-03-17'),
(138, 'sham123', '1231231231', 'sohan@gmail.com', 3, '11:00-11:30PM', 100, 1, '2025-03-17'),
(139, 'sham123', '1231231231', 'sohan@gmail.com', 1, '5:30-6:00PM', 100, 1, '2025-03-17'),
(140, 'sham123', '1231231231', 'sohan@gmail.com', 3, '10:00-11:00PM', 100, 1, '2025-03-17'),
(141, 'sham123', '1231231231', 'sohan@gmail.com', 3, '3:00-3:30PM', 100, 1, '2025-03-17'),
(142, 'sham123', '1231231231', 'sohan@gmail.com', 3, '9:00-9:30PM', 100, 1, '2025-03-17'),
(143, 'sham123', '1231231231', 'sohan@gmail.com', 3, '5:30-6:00PM', 100, 1, '2025-03-17'),
(144, 'sham123', '1231231231', 'sohan@gmail.com', 8, '10:00-10:30PM', 100, 1, '2025-03-17'),
(145, 'sham123', '1231231231', 'sohan@gmail.com', 8, '9:00-9:30PM', 100, 1, '2025-03-17'),
(146, 'sham123', '1231231231', 'sohan@gmail.com', 1, '3:00-4:00PM', 100, 1, '2025-03-17'),
(147, 'sham123', '1231231231', 'sohan@gmail.com', 1, '3:30-4:00PM', 100, 1, '2025-03-17'),
(148, 'sham123', '1231231231', 'sohan@gmail.com', 8, '12:00-1:00PM', 100, 1, '2025-03-19'),
(149, 'sham123', '1231231231', 'sohan@gmail.com', 8, '4:00-5:00PM', 100, 1, '2025-03-19'),
(150, 'sham123', '1231231231', 'sohan@gmail.com', 8, '4:00-5:00PM', 100, 1, '2025-03-17'),
(157, 'sham123', '1231231231', 'sohan@gmail.com', 2, '8:00-9:00PM', 100, 1, '2025-03-17'),
(158, 'sham123', '1231231231', 'sohan@gmail.com', 2, '9:00-9:30PM', 100, 1, '2025-03-17'),
(171, 'sham123', '1231231231', 'sohan@gmail.com', 8, '4:00-4:30PM', 100, 1, '2025-03-19'),
(178, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 8, '1:30-2:00PM', 100, 1, '2025-03-18'),
(179, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 4, '3:00-4:00PM', 100, 1, '2025-03-18'),
(180, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 4, '4:00-4:30PM', 100, 1, '2025-03-18'),
(181, 'sham123', '1231231231', 'sohan@gmail.com', 4, '5:30-6:00PM', 100, 1, '2025-03-18'),
(182, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 3, '5:30-6:00PM', 100, 1, '2025-03-18'),
(183, 'sham123', '1231231231', 'sohan@gmail.com', 2, '3:00-3:30PM', 100, 1, '2025-03-18'),
(184, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '3:30-4:00PM', 100, 1, '2025-03-18'),
(185, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '1:00-2:00PM', 100, 1, '2025-03-18'),
(186, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '3:00-4:00PM', 100, 1, '2025-03-18'),
(187, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 4, '3:00-3:30PM', 100, 1, '2025-03-18'),
(188, 'sham123', '1231231231', 'sohan@gmail.com', 4, '2:00-3:00PM', 100, 1, '2025-03-18'),
(189, 'sham123', '1231231231', 'sohan@gmail.com', 1, '4:00-4:30PM', 100, 1, '2025-03-18'),
(190, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '5:30-6:00PM', 100, 1, '2025-03-18'),
(191, 'rudrapatel1601', '7863039472', 'rudra@gmail.com', 3, '9:00-9:30PM', 100, 1, '2025-03-18'),
(192, 'rudrapatel1601', '7863039472', 'rudra@gmail.com', 3, '11:00-11:30PM', 100, 1, '2025-03-18'),
(193, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '8:00-9:00PM', 100, 1, '2025-03-18'),
(194, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '8:00-8:30PM', 100, 1, '2025-03-18'),
(195, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 8, '11:00-11:30AM', 100, 1, '2025-03-19'),
(196, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 8, '11:00-12:00PM', 100, 1, '2025-03-19'),
(197, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 8, '11:00-12:00PM', 100, 1, '2025-03-19'),
(198, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '11:30-12:00PM', 100, 1, '2025-03-19'),
(199, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '12:00-12:30PM', 100, 1, '2025-03-19'),
(200, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '10:00-10:30AM', 100, 1, '2025-03-19'),
(201, 'sham123', '1231231231', 'sohan@gmail.com', 1, '5:30-6:00PM', 100, 1, '2025-03-19'),
(202, 'xyz123', '9123456789', 'smit2@gmail.com', 1, '8:00-8:30PM', 100, 1, '2025-03-19'),
(203, 'xyz123', '9123456789', 'smit2@gmail.com', 1, '10:00-11:00AM', 100, 1, '2025-03-19'),
(204, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 8, '4:00-4:30PM', 100, 0, '2025-03-20'),
(205, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 3, '8:00-8:30PM', 100, 1, '2025-03-20'),
(206, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 1, '4:00-4:30PM', 100, 1, '2025-03-19'),
(207, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 2, '5:30-6:00PM', 100, 1, '2025-03-19'),
(208, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 5, '8:00-8:30PM', 100, 1, '2025-03-19'),
(209, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 5, '11:00-11:30PM', 100, 1, '2025-03-19'),
(210, 'sham123', '1231231231', 'sohan@gmail.com', 2, '4:00-4:30PM', 100, 1, '2025-03-20'),
(211, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 3, '9:00-9:30PM', 100, 1, '2025-03-20'),
(212, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 3, '4:00-4:30PM', 100, 1, '2025-03-20'),
(213, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 5, '3:00-3:30PM', 100, 1, '2025-03-20'),
(214, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 5, '11:00-11:30PM', 100, 1, '2025-03-20'),
(219, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 2, '5:30-6:00PM', 100, 1, '2025-03-20'),
(220, 'sham123', '1231231231', 'sohan@gmail.com', 4, '9:00-9:30PM', 100, 1, '2025-03-20'),
(233, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '8:00-9:00PM', 100, 0, '2025-03-21'),
(235, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '8:00-9:00PM', 100, 1, '2025-03-20'),
(239, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '7:30-8:00PM', 100, 1, '2025-03-20'),
(240, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '7:00-8:00PM', 100, 1, '2025-03-20'),
(241, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '8:00-8:30PM', 100, 1, '2025-03-20'),
(242, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '11:00-11:30PM', 100, 1, '2025-03-20'),
(243, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '10:00-11:00PM', 100, 1, '2025-03-20'),
(244, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '3:00-3:30PM', 100, 0, '2025-03-21'),
(245, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '2:00-3:00PM', 100, 0, '2025-03-21'),
(246, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '3:00-4:00PM', 100, 0, '2025-03-21'),
(247, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '4:00-4:30PM', 100, 0, '2025-03-21'),
(248, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '9:00-9:30PM', 100, 0, '2025-03-21'),
(249, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '8:00-8:30PM', 100, 0, '2025-03-21'),
(250, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '7:30-8:00PM', 100, 0, '2025-03-21'),
(251, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '5:30-6:00PM', 100, 0, '2025-03-21'),
(252, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '11:00-11:30PM', 100, 0, '2025-03-21'),
(253, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '10:00-11:00PM', 100, 0, '2025-03-21'),
(262, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 3, '7:30-8:00PM', 100, 0, '2025-03-21'),
(263, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 3, '8:00-8:30PM', 100, 0, '2025-03-21'),
(264, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 3, '10:00-10:30AM', 100, 1, '2025-03-21'),
(265, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 3, '10:00-11:00PM', 100, 0, '2025-03-21'),
(266, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 4, '3:00-4:00PM', 100, 1, '2025-03-21'),
(268, 'sham123', '1231231231', 'sohan@gmail.com', 1, '3:30-4:00PM', 100, 1, '2025-03-21'),
(269, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 2, '7:30-8:00PM', 100, 0, '2025-03-22'),
(270, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 1, '10:00-11:00AM', 150, 0, '2025-03-22'),
(271, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 2, '3:00-4:00PM', 180, 0, '2025-03-22'),
(272, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 1, '1:30-2:00PM', 85, 1, '2025-03-21'),
(273, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '7:00-8:00PM', 100, 0, '2025-03-22'),
(274, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 4, '7:00-8:00PM', 100, 0, '2025-03-23'),
(275, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 2, '2:00-3:00PM', 180, 1, '2025-03-21'),
(276, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 1, '9:00-10:00PM', 150, 0, '2025-03-21'),
(277, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 1, '9:00-10:00PM', 150, 0, '2025-03-21'),
(278, 'sham123', '1231231231', 'sohan@gmail.com', 1, '4:00-4:30PM', 85, 1, '2025-03-21'),
(279, 'sham123', '1231231231', 'sohan@gmail.com', 1, '7:00-7:30PM', 85, 0, '2025-03-21'),
(280, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 1, '10:00-11:00AM', 150, 0, '2025-03-22'),
(281, 'sham123', '1231231231', 'sohan@gmail.com', 1, '1:00-2:00PM', 150, 1, '2025-03-23'),
(282, 'sham123', '1231231231', 'sohan@gmail.com', 1, '12:00-12:30PM', 85, 1, '2025-03-23'),
(283, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 1, '5:30-6:00PM', 85, 1, '2025-03-21'),
(284, 'sham123', '1231231231', 'sohan@gmail.com', 2, '7:30-8:00PM', 100, 1, '2025-03-21'),
(285, 'sham123', '1231231231', 'sohan@gmail.com', 2, '7:00-8:00PM', 180, 1, '2025-03-21'),
(290, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 2, '3:00-3:30PM', 100, 1, '2025-03-24'),
(291, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 2, '12:30-1:00PM', 100, 1, '2025-03-24'),
(294, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 2, '4:00-4:30PM', 100, 1, '2025-03-24'),
(295, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '8:00-8:30PM', 100, 0, '2025-03-25'),
(296, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 2, '8:00-8:30PM', 100, 0, '2025-03-24'),
(297, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 2, '8:00-8:30PM', 100, 0, '2025-03-24'),
(298, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 4, '3:00-3:30PM', 60, 0, '2025-03-24'),
(299, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 2, '7:30-8:00PM', 100, 0, '2025-03-24'),
(300, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 2, '11:00-11:30PM', 100, 0, '2025-03-24'),
(301, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 3, '4:00-4:30PM', 70, 0, '2025-03-24'),
(302, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 8, '1:30-2:00PM', 323, 0, '2025-03-24'),
(303, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 8, '10:00-10:30PM', 323, 0, '2025-03-24'),
(304, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '1:00-1:30PM', 100, 0, '2025-03-24'),
(305, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '9:00-9:30PM', 100, 0, '2025-03-24'),
(306, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 8, '1:30-2:00PM', 323, 1, '2025-03-24'),
(307, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 8, '3:30-4:00PM', 323, 1, '2025-03-24'),
(308, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 8, '4:00-4:30PM', 323, 1, '2025-03-24'),
(311, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '5:30-6:00PM', 85, 0, '2025-03-24'),
(312, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '3:30-4:00PM', 85, 0, '2025-03-24'),
(313, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '8:00-8:30PM', 85, 0, '2025-03-24'),
(314, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '5:30-6:00PM', 85, 0, '2025-03-24'),
(315, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '7:30-8:00PM', 100, 0, '2025-03-24'),
(316, 'swati12', '9347595010', 'abc2431@yopmail.com', 2, '7:30-8:00PM', 100, 0, '2025-03-24'),
(317, 'swati12', '9347595010', 'abc2431@yopmail.com', 2, '7:30-8:00PM', 100, 0, '2025-03-24'),
(318, 'swati12', '9347595010', 'abc2431@yopmail.com', 2, '11:00-11:30PM', 100, 0, '2025-03-24'),
(319, 'swati12', '9347595010', 'abc2431@yopmail.com', 2, '9:00-9:30PM', 100, 0, '2025-03-24'),
(320, 'swati12', '9347595010', 'abc2431@yopmail.com', 2, '5:30-6:00PM', 100, 0, '2025-03-24'),
(321, 'swati12', '9347595010', 'abc2431@yopmail.com', 2, '7:30-8:00PM', 100, 0, '2025-03-24'),
(322, 'swati12', '9347595010', 'abc2431@yopmail.com', 2, '8:00-8:30PM', 100, 0, '2025-03-24'),
(323, 'swati12', '9347595010', 'abc2431@yopmail.com', 8, '6:30-7:00PM', 323, 0, '2025-03-24'),
(324, 'swati12', '9347595010', 'abc2431@yopmail.com', 8, '5:00-5:30PM', 323, 1, '2025-03-24'),
(325, 'swati12', '9347595010', 'abc2431@yopmail.com', 1, '4:00-4:30PM', 85, 1, '2025-03-24'),
(326, 'swati12', '9347595010', 'abc2431@yopmail.com', 1, '7:00-7:30PM', 85, 0, '2025-03-24'),
(327, 'swati12', '9347595010', 'abc2431@yopmail.com', 1, '5:30-6:00PM', 85, 1, '2025-03-24'),
(328, 'qqq', '1234567890', 'abc243@yopmail.com', 1, '3:30-4:00PM', 85, 1, '2025-03-24'),
(329, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '8:00-8:30PM', 100, 1, '2025-03-24'),
(330, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '7:30-8:00PM', 100, 1, '2025-03-24'),
(331, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '10:30-11:00PM', 85, 0, '2025-03-24'),
(332, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '10:30-11:00PM', 85, 0, '2025-03-24'),
(333, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '10:30-11:00PM', 85, 0, '2025-03-24'),
(334, 'xyz123', '9123456789', 'smit2@gmail.com', 1, '8:00-8:30PM', 85, 0, '2025-03-24'),
(335, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '9:00-10:00PM', 150, 0, '2025-03-24'),
(336, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '5:00-6:00PM', 150, 1, '2025-03-24'),
(337, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '10:30-11:00PM', 85, 0, '2025-03-24'),
(338, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '8:00-8:30PM', 85, 0, '2025-03-24'),
(339, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '10:30-11:00PM', 85, 0, '2025-03-24'),
(340, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '7:00-7:30PM', 85, 0, '2025-03-24'),
(341, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '8:00-8:30PM', 85, 0, '2025-03-24'),
(342, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '8:00-8:30PM', 85, 0, '2025-03-24'),
(343, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 3, '8:00-8:30PM', 70, 1, '2025-03-24'),
(344, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 1, '10:30-11:00PM', 85, 0, '2025-03-24'),
(345, 'sohan_1123', '9664691917', 'smitbarot20004@gmail.com', 1, '8:00-8:30PM', 85, 0, '2025-03-24'),
(346, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 8, '10:00-10:30PM', 323, 1, '2025-03-24'),
(347, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '7:00-7:30PM', 85, 1, '2025-03-24'),
(348, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '8:00-8:30PM', 85, 0, '2025-03-24'),
(349, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '10:30-11:00PM', 85, 0, '2025-03-24'),
(350, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '10:00-10:30AM', 85, 1, '2025-03-25'),
(351, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '12:00-12:30PM', 85, 1, '2025-03-25'),
(352, 'swati123', '9999999999', 'abc1243@yopmail.com', 2, '1:00-1:30PM', 100, 1, '2025-03-25'),
(353, 'swati0', '2222222222', 'h@k.com', 1, '11:30-12:00PM', 85, 0, '2025-03-25'),
(354, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 1, '1:30-2:00PM', 85, 1, '2025-03-25'),
(355, 'groot12', '3333333333', 'groot@gmail.com', 1, '11:30-12:00PM', 85, 0, '2025-03-25'),
(356, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '10:30-11:00PM', 85, 0, '2025-03-25'),
(357, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '2:30-3:00PM', 85, 1, '2025-03-25'),
(358, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '4:00-4:30PM', 85, 1, '2025-03-25'),
(359, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '4:00-4:30PM', 100, 1, '2025-03-25'),
(360, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '10:30-11:00PM', 85, 0, '2025-03-25'),
(361, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '7:30-8:00PM', 100, 0, '2025-03-25'),
(362, 'pika12', '1010101010', 'pika@gmail.com', 1, '3:30-4:00PM', 85, 1, '2025-03-25'),
(363, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '11:00-11:30PM', 70, 1, '2025-03-25'),
(364, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '11:00-11:30PM', 70, 1, '2025-03-26'),
(365, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '7:00-8:00PM', 120, 1, '2025-03-26'),
(366, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '5:30-6:00PM', 70, 1, '2025-03-26'),
(367, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '9:00-9:30PM', 70, 1, '2025-03-26'),
(368, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '7:30-8:00PM', 70, 1, '2025-03-26'),
(369, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '3:00-3:30PM', 70, 1, '2025-03-27'),
(370, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '5:30-6:00PM', 70, 1, '2025-03-27'),
(371, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '7:30-8:00PM', 70, 1, '2025-03-27'),
(372, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '11:00-11:30PM', 70, 1, '2025-03-27'),
(373, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '7:00-8:00PM', 120, 1, '2025-03-27'),
(374, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '10:00-11:00PM', 120, 1, '2025-03-27'),
(375, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '8:00-8:30PM', 85, 0, '2025-03-25'),
(376, 'groot12', '3333333333', 'groot@gmail.com', 1, '3:00-4:00PM', 150, 1, '2025-03-25'),
(377, 'swati123', '9999999999', 'abc1243@yopmail.com', 2, '10:00-11:00PM', 180, 0, '2025-03-25'),
(378, 'swati123', '9999999999', 'abc1243@yopmail.com', 2, '8:00-8:30PM', 100, 0, '2025-03-25'),
(379, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '7:00-7:30PM', 85, 0, '2025-03-25'),
(380, 'test123', '1234567899', 'test123@gm.com', 2, '7:30-8:00PM', 100, 1, '2025-03-25'),
(381, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '7:00-7:30PM', 85, 0, '2025-03-26'),
(382, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '4:00-4:30PM', 85, 1, '2025-03-26'),
(383, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 3, '3:00-3:30PM', 70, 0, '2025-03-28'),
(384, 'aayush', '7016839213', 'modiaayush37@gmail.com', 2, '8:00-8:30PM', 100, 0, '2025-03-27'),
(385, 'aayush', '7016839213', 'modiaayush37@gmail.com', 2, '11:00-11:30PM', 100, 0, '2025-03-27'),
(386, 'aayush', '7016839213', 'modiaayush37@gmail.com', 4, '3:00-3:30PM', 60, 1, '2025-03-27'),
(387, 'aayush', '7016839213', 'modiaayush37@gmail.com', 5, '11:00-11:30PM', 100, 1, '2025-03-27'),
(388, 'aayush', '7016839213', 'modiaayush37@gmail.com', 8, '6:30-7:00PM', 323, 1, '2025-03-27'),
(389, 'aayush', '7016839213', 'modiaayush37@gmail.com', 2, '4:00-4:30PM', 100, 1, '2025-03-27'),
(390, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '4:00-4:30PM', 70, 1, '2025-03-29'),
(391, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '5:30-6:00PM', 100, 0, '2025-03-27'),
(392, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '8:00-8:30PM', 100, 0, '2025-03-27'),
(393, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '9:00-9:30PM', 100, 0, '2025-03-27'),
(394, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '3:00-3:30PM', 100, 1, '2025-03-27'),
(395, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '7:30-8:00PM', 100, 0, '2025-03-27'),
(396, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '9:00-9:30PM', 70, 1, '2025-03-27'),
(397, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '8:00-8:30PM', 70, 0, '2025-03-27'),
(398, 'rudra3', '7863034343', 'rudra3@gmail.com', 3, '4:00-4:30PM', 70, 0, '2025-03-27'),
(399, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '7:30-8:00PM', 100, 1, '2025-03-27'),
(400, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '9:00-9:30PM', 100, 1, '2025-03-27'),
(401, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 2, '11:00-11:30PM', 100, 1, '2025-03-27'),
(402, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 2, '4:00-4:30PM', 100, 1, '2025-03-28'),
(403, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 2, '12:30-1:00PM', 100, 1, '2025-03-28'),
(404, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 2, '5:30-6:00PM', 100, 1, '2025-03-28'),
(405, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 2, '7:30-8:00PM', 100, 0, '2025-03-28'),
(406, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 1, '5:30-6:00PM', 85, 1, '2025-03-27'),
(407, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '7:00-7:30PM', 85, 1, '2025-03-27'),
(408, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '8:00-8:30PM', 85, 1, '2025-03-27'),
(409, 'getinplay123', '7990153071', 'sohannn.21beitg119@gmail.com', 1, '10:30-11:00PM', 85, 1, '2025-03-27'),
(410, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 3, '4:00-4:30PM', 70, 1, '2025-03-28'),
(411, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 8, '6:30-7:00PM', 323, 1, '2025-03-28'),
(412, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 8, '3:00-4:00PM', 500, 1, '2025-03-28'),
(413, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 8, '3:00-4:00PM', 500, 1, '2025-03-29'),
(414, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 8, '8:00-9:00PM', 500, 1, '2025-03-29'),
(415, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 8, '4:00-5:00PM', 500, 1, '2025-03-29'),
(416, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 8, '12:00-1:00PM', 500, 1, '2025-03-29'),
(417, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 8, '11:00-12:00PM', 500, 1, '2025-03-29'),
(418, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 8, '4:00-5:00PM', 500, 1, '2025-03-28'),
(419, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 8, '12:00-1:00PM', 500, 1, '2025-03-28'),
(420, 'rudrapatel1601', '7863039472', 'superrudra1601@gmail.com', 8, '8:00-9:00PM', 500, 1, '2025-03-28');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `hour` decimal(10,2) NOT NULL,
  `half_hour` decimal(10,2) NOT NULL,
  `card_image` varchar(100) NOT NULL,
  `slider_image` varchar(100) NOT NULL,
  `slots` text NOT NULL,
  `filter_value` text NOT NULL,
  `deleteval` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`, `hour`, `half_hour`, `card_image`, `slider_image`, `slots`, `filter_value`, `deleteval`) VALUES
(1, '8 ball pool', 150.00, 85.00, 'uploads/pool.png', 'uploads/sliderpool.jpg', '10:00-10:30AM,11:30-12:00PM,10:00-11:00AM,12:00-12:30PM,1:30-2:00PM,2:30-3:00PM,3:30-4:00PM,1:00-2:00PM,3:00-4:00PM,4:00-4:30PM,5:30-6:00PM,7:00-7:30PM,5:00-6:00PM,8:00-8:30PM,10:30-11:00PM,9:00-10:00PM', '30min,30min,1hr,30min,30min,30min,30min,1hr,1hr,30min,30min,30min,1hr,30min,30min,1hr', 1),
(2, 'Snooker', 180.00, 100.00, 'uploads/snooker.jpeg', 'uploads/slidersnooker.jpeg', '10:30-11:00AM,10:00-11:00AM,12:30-1:00PM,1:00-1:30PM,3:00-3:30PM,2:00-3:00PM,3:00-4:00PM,4:00-4:30PM,5:30-6:00PM,7:30-8:00PM,7:00-8:00PM,8:00-8:30PM,9:00-9:30PM,11:00-11:30PM,8:00-9:00PM,10:00-11:00PM', '30min,1hr,30min,30min,30min,1hr,1hr,30min,30min,30min,1hr,30min,30min,30min,1hr,1hr', 1),
(3, 'Badminton', 120.00, 70.00, 'uploads/badminton.jpeg', 'uploads/sliderbadminton.jpg', '10:00-10:30AM,3:00-3:30PM,2:00-3:00PM,3:00-4:00PM,4:00-4:30PM,5:30-6:00PM,7:30-8:00PM,7:00-8:00PM,8:00-8:30PM,9:00-9:30PM,11:00-11:30PM,8:00-9:00PM,10:00-11:00PM', '30min,30min,1hr,1hr,30min,30min,30min,1hr,30min,30min,30min,1hr,1hr', 1),
(4, 'Chess', 100.00, 60.00, 'uploads/chess.jpeg', 'uploads/sliderchess.jpeg', '10:00-10:30AM,3:00-3:30PM,2:00-3:00PM,3:00-4:00PM,4:00-4:30PM,5:30-6:00PM,7:30-8:00PM,7:00-8:00PM,8:00-8:30PM,9:00-9:30PM,11:00-11:30PM,8:00-9:00PM,10:00-11:00PM', '30min,30min,1hr,1hr,30min,30min,30min,1hr,30min,30min,30min,1hr,1hr', 1),
(5, 'Bowling', 180.00, 100.00, 'uploads/bowling.jpeg', 'uploads/sliderbowling.jpg', '11:00-11:30AM,3:00-3:30PM,2:00-3:00PM,3:00-4:00PM,4:00-4:30PM,5:30-6:00PM,7:30-8:00PM,7:00-8:00PM,8:00-8:30PM,9:00-9:30PM,11:00-11:30PM,8:00-9:00PM,10:00-11:00PM', '30min,30min,1hr,1hr,30min,30min,30min,1hr,30min,30min,30min,1hr,1hr', 1),
(6, '00000', 100.00, 50.00, 'uploads/rick.jpg', 'uploads/rick.jpg', '10:00-10:30AM,11:00-11:30AM', '', 0),
(7, 'dip', 120.00, 60.00, 'uploads/Screenshot from 2025-03-05 17-49-01.png', 'uploads/Screenshot from 2025-03-05 17-46-34.png', '10:00-10:30AM', '30min', 0),
(8, 'volleyball', 500.00, 323.00, 'uploads/default_card.jpg', 'uploads/vollyball.jpeg', '10:00-10:30AM,11:00-11:30AM,11:00-12:00PM,12:00-12:30PM,1:30-2:00PM,3:30-4:00PM,12:00-1:00PM,3:00-4:00PM,4:00-4:30PM,5:00-5:30PM,6:30-7:00PM,7:30-8:00PM,4:00-5:00PM,9:00-9:30PM,10:00-10:30PM,8:00-9:00PM', '30min,30min,1hr,30min,30min,30min,1hr,1hr,30min,30min,30min,30min,1hr,30min,30min,1hr', 1),
(9, 'joy', 40.00, 20.00, 'uploads/pool.jpeg', 'uploads/pool.jpeg', '10:00-11:00PM', '1hr', 0),
(10, 'joy', 40.00, 20.00, 'uploads/default_card.jpg', 'uploads/default_slider.jpg', '10:00-10:30AM', '30min', 0),
(11, 'Sudoku', 250.00, 100.00, 'uploads/default_card.jpg', 'uploads/default_slider.jpg', '10:00-10:30AM,11:00-11:30AM,10:00-11:00AM,7:00-7:30PM', '30min,30min,1hr,30min', 1);

-- --------------------------------------------------------

--
-- Table structure for table `membership`
--

CREATE TABLE `membership` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `membership`
--

INSERT INTO `membership` (`id`, `name`) VALUES
(1, 'Basic'),
(2, 'Silver'),
(3, 'Gold');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `star` int(11) NOT NULL,
  `message` text NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `time` time NOT NULL DEFAULT current_timestamp(),
  `deleteval` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `user_id`, `star`, `message`, `date`, `time`, `deleteval`) VALUES
(1, 25, 5, 'The website is user-friendly and easy to navigate. Great design, fast loading, and helpful content. A solid experience overall!', '2025-03-24', '15:23:20', 1),
(2, 42, 4, 'I love how intuitive this website is. Everything is well-organized, and the design is clean. However, a few minor improvements would be great.', '2025-03-24', '15:43:22', 1),
(3, 24, 5, 'Great website! It has everything I need in one place. Fast, responsive, and visually appealing. Just wish there were more interactive features.', '2025-03-24', '15:45:54', 1),
(4, 2, 4, 'A great experience overall. The website is easy to use, but it could benefit from a few design tweaks for better visual appeal and accessibility.', '2025-03-24', '15:46:33', 1),
(11, 42, 2, 'It was an Okay experience. The services are good but the quality of the sports equipment is not the best. I think they need to invest in the equipment', '2025-03-25', '12:38:33', 1),
(17, 42, 4, 'Great Experience', '2025-03-27', '17:18:25', 1);

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` text NOT NULL,
  `phone_no` text NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `username` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `membership_id` int(11) NOT NULL,
  `deleteval` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `full_name`, `email`, `phone_no`, `gender`, `username`, `user_password`, `membership_id`, `deleteval`) VALUES
(2, 'smit barot', 'smit2@gmail.com', '9123456789', 'Male', 'xyz123', '$2y$10$aO2wKmuBvXYLZd6ZE0eYW.0oou9p..r2jLd4f70ZWrX8dp7B7VZPu', 2, 1),
(3, 'rudra', 'rudra3@ac.in', '9234567890', 'Female', 'xyzabc', '$2y$10$O92G4gonuWMBKJ75SQrHxeB5GBrvX3nx95BjeWO8RKIxJlYiAf3NG', 1, 0),
(9, 'omen', 'omen9@gmail.com', '9890123456', 'Male', 'omen12', '$2y$10$YtUcZ3dcH9qEEmSYlYd5heYIe92RupiXeVITsjdAQ0mjqlCwmWtFa', 1, 1),
(10, 'sohan aeswf', 'sohan10@gmail.com', '9901234567', 'Male', 'bob123', '$2y$10$kNtCLPr/AdjYW.IX9LyHVumlHdlHfEropk5rd1FrjhBYSXW8JPwa2', 1, 0),
(11, 'sohan', 'sohan11@gmail.com', '9912345678', 'Male', 'bob123', '$2y$10$ZIjzrhFAlADV99lI6Zs9/etEjD0QQal4MWYq5m0JrOGV.iV8Ljy86', 1, 0),
(12, 'sohan', 'sohan12@gmail.com', '9923456789', 'Male', 'bob123', '$2y$10$sounaLpdAh/aFP6tyAH5m.5UCzzafOrucQlVgGvYy8sa1POzDL5EO', 1, 1),
(13, 'aaafg', 'aaafg13@ac.in', '9934567890', 'Female', 'bob1234', '$2y$10$1VdxlZ.RZExS4CEbRSW.9ONy95W7EGPeXG/P9.7kriEFE3F6FE/Xa', 3, 0),
(14, 'awew', 'awew14@gmail.com', '9945678901', 'Male', 'bob12345dff', '$2y$10$QhpdzRMi1M8kV7vZWNPuoONDleYEwjhWObr3umn6ocpcfxpBijL/u', 2, 0),
(15, 'hngnn', 'hngnn15@gmail.com', '9956789012', 'Female', 'bob123', '$2y$10$wRkXjyIfn47PlKnpGwSmLu8HOdFB.T2bjM2V8JXFVMHZB6MLjsBwy', 1, 0),
(16, 'hello', 'hello16@gmail.com', '9967890123', 'Male', 'bob123455', '$2y$10$eC4c6njuz6HSFmCPqrVATeuXaXiHiycsUgyy3HVC8C55fzZqZJwq2', 1, 0),
(17, 'svit', 'svit17@gmail.com', '9978901234', 'Male', 'svit124323', '$2y$10$nDHH72Gz3GoF4TnzBX5CPunrDBc2rSX.7JsbxrYxfjphIs3dMDZHy', 3, 1),
(18, 'swdsws', 'swdsws18@gmail.com', '9989012345', 'Male', 'gfbhdh', '$2y$10$0Sgo85z839m9rdgYtIoNUuGgP6Eb5ZPyu40WpRr.W/pjA1INfEqFK', 1, 0),
(20, 'sohan', 'sohan20@gmail.com', '9990123456', 'Male', 'sohan_11903', '$2y$10$FyIlHc/lyQ5zdIuWxFSlq.NCmzUY8Y0ODl/RQOmITTTU9nR1gIBKC', 3, 0),
(21, 'svit', 'svit21@gmail.com', '9001234567', 'Male', 'svit_123', '$2y$10$9ydE1JE/XJUOy4v1bV3xxO2igSFifBFeW4Xrwv52Yh7ovTU7O6WiW', 1, 0),
(22, 'cdsb', 'cdsb22@gmail.com', '9012345678', 'Male', 'cdsdscssc', '$2y$10$ByhuDcDkZgaSOd8HCjeNHe65XuSuJ8Bhtctl8vPx6XqA.P9iVsewi', 1, 0),
(23, 'awe', 'awe14@gmail.com', '9023456789', 'Male', 'fjjtgyjjtj', '$2y$10$MaZvve7myOhVRtfjXKhkNeIV6yIiNBrRs2clkeZONMEwZlTFpmIHq', 1, 0),
(24, 'swati kumari', 'swati24@gmail.com', '9034567890', 'Female', 'swati_123', '$2y$10$UodaoXKVSJn/VNDaRramjuZmBVLA3Wk6Pxvg3xnVC0YIfjjpDY6bS', 3, 0),
(25, 'sohan prajapati', 'sohan25@gmail.com', '9045678901', 'Male', 'sohan_2003', '$2y$10$5AZjPcde7DAwGmry0mjY6.0glnE0ZRyoC7PBXLW2z/5JLY6N31No6', 2, 0),
(26, 'smit', 'smit26@gmail.com', '9056789012', 'Male', 'smit_123', '$2y$10$QpEtJGDeWg20zpGb44YccOdnZTUEnJJD01yg/uqfZAbn0HX4aEAG.', 2, 0),
(28, 'abc', 'sohan.21beitg119@gmail.com', '1212121212', 'Male', 'abc_123', '$2y$10$QjdDFjkAWN3KxiHVpPYjQewMDVDcXlOI8tnyaPGRWB9IYXD3BWceG', 1, 0),
(39, 'getinplay', 'sohannn.21beitg119@gmail.com', '7990153071', 'Male', 'getinplay123', '$2y$10$PcPkWCQhOYyRvtMxMqtwgOZWal9m5y25IykBF.H925LpRANxeRn.u', 2, 1),
(40, 'sohan', 'smitbarot20004@gmail.com', '9964691910', 'Male', 'sohan_1123', '$2y$10$fb1BQNDpoz9EMlCLbcy0jO1T1v5zUVXvCAy.4/lcXplM0eI7iyeb6', 1, 0),
(41, 'ddd', 'abc243@yopmail.com', '1234567890', 'Female', 'qqq', '$2y$10$3Dl5oE3rrCNmCziWlLE7quAAor5.ErrgirnS0ILKcahXTZf1XDndO', 1, 0),
(42, 'Rudra Patel', 'superrudra1601@gmail.com', '7863039472', 'Male', 'rudrapatel1601', '$2y$10$4/RpoKKN0085wpvODoubZeCx0lyXtkQi3mDI41r07S24TgrKiYXyq', 3, 1),
(43, 'ana', 'ana12@gmail.com', '8766788767', 'Female', 'ana123', '$2y$10$fNT4rmA8HtFc8UaVJI3lieEpvXxcMLcCoFs9QwXXJiA6SW04tfA8S', 1, 0),
(44, 'roy', 'roy12@gmail.com', '2332322323', 'Male', 'roy123', '$2y$10$HxzPYwLdqtx1hFSRAJDlYOggAop5DfQq6qSSOjfyFklrZ4QPj.Bom', 1, 0),
(45, 'roy', 'roy1234@gmail.com', '1223435456', 'Male', 'roy1234', '$2y$10$ZaBDIG3aWlIS6EWYeHbcQ.Dx/eBbhx4EqcWiDPFEu.CBy1N1ROTgy', 1, 0),
(46, 'Swati', 'abc2431@yopmail.com', '9347595010', 'Female', 'swati12', '$2y$10$vsjAnIlG7eHCMm61WlBHNeSjnVlDCotwJIBQaE817jSSNMP1nZhNi', 1, 0),
(47, 'test', 'testmail@gmail.com', '9123456780', 'Male', 'test1234', '$2y$10$oxSh/mGo1beAE3LZupbXZuqOsjIbivcFutNVNGOoZLawsRxmcd6zS', 3, 0),
(51, 'david troy', 'david12@gmail.com', '9964691928', 'Male', 'root', '$2y$10$SlKTD38ZrDWmDwEvH6XzyO7AoIhhwSuGrCapKn.1W.Xkw.ee.o74q', 1, 1),
(52, 'david warner', 'david123@gmail.com', '9877894566', 'Male', 'david1234', '$2y$10$shbT163G2PCjlG6w3wJtbuiewAuJMqn9YWse8CYjSzLNL9uYgLFq2', 1, 1),
(53, 'helloooww', 'h@gmail.com', '7878787889', 'Female', 'hello123456', '$2y$10$sJI/KUcmQTDXIJx5yOQ4bOk3LiwylshsVbKMvmt3Jy3UkMlkQTsqK', 1, 0),
(54, 'Swati', 'abc1243@yopmail.com', '9999999999', 'Female', 'swati123', '$2y$10$Z5heLx.H8WUIZr5valwHpujf6g0P.CRbIarBFKRsva5//FoqYLzui', 2, 1),
(55, 'ppp', 'ppp@gmail.com', '1111111111', 'Male', 'ppp1', '$2y$10$4QstewTNjJ9MB.rnyj1A9uG3jxzvyRBsyiAKitBZdc5k2oAxA4aCS', 1, 0),
(56, 'java', 'java12@gmail.com', '9807564793', 'Male', 'java123', '$2y$10$C./.tTJTpRqJXYKStlOT5uhtZQKd4J8AkT66i3VfxACIzzW.8g6nK', 1, 0),
(57, 'raja', 'smitbarot.raja@gmail.com', '9220413116', 'Male', 'raja9191', '$2y$10$/IbkYf.MtI5oyFwog8.ke.Hf08tTEYJ5D522xeLVtq.AtNvaahrsu', 2, 0),
(58, 'Swati', 'h@k.com', '2222222222', 'Female', 'swati0', '$2y$10$ktkGUqEunczx60BSLQ9WzezBAA6AYFQl.NHOtqsPrDAlgKT.3UAYu', 1, 0),
(59, 'groot', 'groot@gmail.com', '3333333333', 'Male', 'groot12', '$2y$10$tXJJuFSKTHvx5Nj/q/Bl9O1.DcEzmx4rG6z591xXzP2PEDFB6Xi72', 1, 0),
(60, 'Oak', 'oak@gmail.com', '1414141414', 'Male', 'Oak12', '$2y$10$Ytdf4tVeNSAsui/rgJLeveeVYfOytjTvGfvrBZnkAmGY7teP6aLuy', 1, 0),
(61, 'Pikachu', 'pika@gmail.com', '1010101010', 'Male', 'pika12', '$2y$10$ykvxFLjKcA7US0moJiLA1O9dL8pizza08claVVX3r.JjTtG3hw6P.', 1, 0),
(62, 'Rudra Patel', 'rudra2@gmail.com', '7863078630', 'Male', 'rudra2', '$2y$10$PSlXaFLSWPsDFKsAchQwAunHTFZx8heh8/KI5SbFjt.cbWZPbAWTq', 2, 1),
(63, 'Rudra Patel', 'rudra3@gmail.com', '7863034343', 'Male', 'rudra3', '$2y$10$y5TTzRPLT08UQhKBaoxEZe0dynprxCG6A/hDKCt08srwap6JdT9D6', 3, 1),
(64, 'test', 'test123@gm.com', '1234567899', 'Male', 'test123', '$2y$10$Jmi39mY2L.chVK7.CXVzgORb1YaheE6EJC/N6SOs1BZzClBXOTXbe', 3, 0),
(65, 'qwe12', 'smitbarot2dfg0@gmail.com', '1212767654', 'Male', 'smit.barot12', '$2y$10$xoBke6iT1HcmZoawIqhRxO.KRUX6raTN1hmcj1OJHkM0OwylQetQ2', 1, 0),
(66, 'test', 'test@gmail.com', '9756562110', 'Male', 'testuser', '$2y$10$LuS7c/VZI2G3Pw6Loi/hCujhmDQSkyMbshBhRa3in2/oYYxcA44Xe', 1, 0),
(67, 'test', 'test1@gmail.com', '1234567897', 'Male', 'test12345', '$2y$10$TsS4vW8IejTtlKsFWLQE/Ouetop6fubG3BRMHMFfLGiC6O4lcT8Pi', 1, 0),
(68, 'test', 'test@gm.co', '0123456789', 'Male', 'test12344', '$2y$10$H672t/MqvisP4m5lK3hlWOdKKbIKrJhtW1gOskvVlUIowHVDOUqCm', 1, 0),
(69, 'test', 'testest@gmail.com', '9123456799', 'Female', 'test123455', '$2y$10$14VK2xx2yqgvI83j5D1kBuSoHQfmv4Xureh/zBZy5V8CXtKd3lU3O', 1, 0),
(70, 'test', 'test123@gm.co', '9999888877', 'Female', 'test12333', '$2y$10$43lX5TNKzQ4suoUk5HKifePg23nrf0zyBIPzWSVlO/p5w72vwSby2', 1, 0),
(71, 'test1234', 'test123123@gm.com', '5555555555', 'Female', 'test123322', '$2y$10$7kf34hI7zYZcybNwjtCITu8P3A.CPxlWB4RKWrX93KxUmMivaKcn6', 1, 0),
(72, 'rudra', 'rudra12@gmail.com', '5468787987', 'Male', 'rud123', '$2y$10$khExxS/SZex8Y1C1fd6J/O5ajBxDx13XdLb/v1I.Tld8ZxS.nTzn6', 1, 0),
(73, 'rudra', 'rudra5@g.co', '9999998765', 'Male', 'rudra123', '$2y$10$4bMJWidpoR5e.udbiBmhwudhOLUeXr5J1Lj1lw87KR/tAlF47TIB2', 1, 0),
(74, 'aayush', 'modiaayush37@gmail.com', '7016839213', 'Male', 'aayush', '$2y$10$YcFsfnMDI7ddNPIDOQe7cOoPTvzmZ2zkhoci9TmkCFfnyqbful6yS', 2, 1),
(75, 'manish', 'manish@gmail.com', '7016839214', 'Male', 'manish', '$2y$10$tO6SokHZRFtec5ofX56bOee24SWsHa7aWCmij2C6Ei47uED7LK2GS', 1, 1),
(76, 'Swati', 'abc124@yopmail.com', '1010101011', 'Female', 'swati1', '$2y$10$AbqwWefQD.jVJMgpZYAcAufIpiplbHabhKhVYuGKdAIwV6yOmVe2S', 2, 0),
(77, 'Test', 'test1234@gmail.com', '3312331233', 'Male', 'Test122', '$2y$10$LtPuy7eSuP3iMIisBPBQ3.q5qQqYrZFo.HQUKJqbvF.hqeADEsom2', 1, 0),
(78, 'test', 'testttt@g.co', '7711772289', 'Female', 'test12341', '$2y$10$2e3dzXJ3wFnpuAs9ndpd2OIE2pDFG0KCNyTPsA5rfLy0HkwKIAqSG', 1, 0),
(79, 'test1234', 'testttt@g.c', '9875646521', 'Male', 'test1221', '$2y$10$kaqhEdWHzsovCtbFS9iX1OA60lvOdf.GE2Z4wwijx1nWUminAR0au', 1, 0),
(80, 'testtt', 'ty@g.c', '7878787878', 'Male', 'testttt', '$2y$10$rFvifBfuQrKEcWFTVbTTMehctJoiwrsLfcj2yYUUW2xEK7gI4gULG', 1, 0),
(81, 'testtt', 'ghj@ghj.ghj', '7856787878', 'Male', 'testt1tt', '$2y$10$elq62JZydSEkMCCbzdiHUOKH6wgrLm3416ZpOWUgTP1RAYWqaRHrK', 1, 0),
(82, 'testtt', 'ghj@fgh.ghj', '7897897890', 'Male', 'ttttest', '$2y$10$QbouYvnCRlzRhEq4hnDx/OtjocmfwXJ7GW7RT1VwtSseon00HSon2', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `terms`
--

CREATE TABLE `terms` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `deleteval` int(11) NOT NULL DEFAULT 1,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `terms`
--

INSERT INTO `terms` (`id`, `content`, `deleteval`, `updated_at`) VALUES
(1, '<ul>\n<li><strong>Acceptance of Terms</strong> &ndash; Entering the game zone means you agree to follow all rules and regulations.</li>\n<li><strong>Age Restrictions</strong> &ndash; Players under 12 must be accompanied by a guardian. Age-restricted games may require ID verification.</li>\n<li><strong>Booking &amp; Payments</strong> &ndash; Advance booking and full payment are required. No refunds except in special cases approved by management.</li>\n<li><strong>Game Rules &amp; Fair Play</strong> &ndash; Cheating, hacking, or any unfair play is strictly prohibited and may lead to suspension.</li>\n<li><strong>Safety &amp; Conduct</strong> &ndash; Running, pushing, or disruptive behavior is not allowed. Management reserves the right to remove violators.</li>\n<li><strong>Equipment Handling</strong> &ndash; Handle gaming equipment with care. Any damage due to negligence will result in penalties or repair charges.</li>\n<li><strong>Food &amp; Drinks</strong> &ndash; Not allowed inside the gaming area to prevent equipment damage. Use the designated refreshment area.</li>\n</ul>', 1, '2025-03-07 15:28:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book_game`
--
ALTER TABLE `book_game`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_game_id` (`game_id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membership`
--
ALTER TABLE `membership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `terms`
--
ALTER TABLE `terms`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book_game`
--
ALTER TABLE `book_game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=421;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `membership`
--
ALTER TABLE `membership`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `terms`
--
ALTER TABLE `terms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book_game`
--
ALTER TABLE `book_game`
  ADD CONSTRAINT `fk_game_id` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `register` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
