-- phpMyAdmin SQL Dump
-- version 4.4.15
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-05-05 21:37:39
-- 服务器版本： 10.1.8-MariaDB
-- PHP Version: 5.4.45

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book`
--

-- --------------------------------------------------------

--
-- 表的结构 `booking`
--

CREATE TABLE IF NOT EXISTS `booking` (
  `bname` varchar(20) NOT NULL,
  `lname` varchar(16) NOT NULL,
  `tname` varchar(8) NOT NULL,
  `class` varchar(16) NOT NULL,
  `num` int(2) NOT NULL,
  `bprice` int(6) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `booking`
--

INSERT INTO `booking` (`bname`, `lname`, `tname`, `class`, `num`, `bprice`) VALUES
('图解HTTP', '计算机网络', '陈生', '软件2班', 10, 690),
('算法', '算法设计', '陈生', '软件2班', 20, 600);

-- --------------------------------------------------------

--
-- 表的结构 `lesson`
--

CREATE TABLE IF NOT EXISTS `lesson` (
  `lnumber` int(2) NOT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `ltype` varchar(8) DEFAULT NULL,
  `credit` int(2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `lesson`
--

INSERT INTO `lesson` (`lnumber`, `lname`, `ltype`, `credit`) VALUES
(1, '计算机网络', '必修', 4),
(11, 'node.js', '选修', 2),
(5, '网页设计与制作', '选修', 2);

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `snumber` bigint(12) NOT NULL,
  `sname` varchar(8) DEFAULT NULL,
  `ssex` varchar(4) DEFAULT NULL,
  `sdepartment` varchar(16) DEFAULT NULL,
  `class` varchar(16) DEFAULT NULL,
  `spassword` varchar(6) NOT NULL DEFAULT '123456'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `student`
--

INSERT INTO `student` (`snumber`, `sname`, `ssex`, `sdepartment`, `class`, `spassword`) VALUES
(201510098249, '钟涛', '男', '计算机工程学院', '软件2班', '123456');

-- --------------------------------------------------------

--
-- 表的结构 `teacher`
--

CREATE TABLE IF NOT EXISTS `teacher` (
  `tnumber` bigint(12) NOT NULL,
  `tname` varchar(8) DEFAULT NULL,
  `tsex` varchar(4) DEFAULT NULL,
  `tdepartment` varchar(16) DEFAULT NULL,
  `power` varchar(4) NOT NULL DEFAULT 'yes',
  `tpassword` varchar(6) NOT NULL DEFAULT '012345'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `teacher`
--

INSERT INTO `teacher` (`tnumber`, `tname`, `tsex`, `tdepartment`, `power`, `tpassword`) VALUES
(201510098250, '陈生', '男', '计算机工程学院', 'yes', '012345');

-- --------------------------------------------------------

--
-- 表的结构 `teaching`
--

CREATE TABLE IF NOT EXISTS `teaching` (
  `isbn` bigint(13) NOT NULL,
  `bookname` varchar(24) NOT NULL,
  `publish` varchar(20) NOT NULL,
  `author` varchar(16) NOT NULL,
  `tprice` int(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `teaching`
--

INSERT INTO `teaching` (`isbn`, `bookname`, `publish`, `author`, `tprice`) VALUES
(9787115351531, '图解HTTP', '人民邮电出版社', '【日】上野宣', 49),
(9787115380333, 'Node与Express开发', '人民邮电出版社', 'Ethan Brown', 69);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bname`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`lnumber`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`snumber`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`tnumber`);

--
-- Indexes for table `teaching`
--
ALTER TABLE `teaching`
  ADD PRIMARY KEY (`isbn`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
