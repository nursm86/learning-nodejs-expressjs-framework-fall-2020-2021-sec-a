-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2020 at 11:07 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_rent`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(10) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `user_id` int(10) NOT NULL,
  `Description` text NOT NULL,
  `updatedDate` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `Title`, `user_id`, `Description`, `updatedDate`) VALUES
(1, 'Best Service ', 8, 'This is best online car services I have every enjoyed. I recommended this to all. ', '2020-11-26'),
(2, 'Good Experience', 3, 'We had a very pleasant experience. The driver was very well behaved. We enjoy the travel.', '2020-11-25'),
(3, 'Recommended Service', 8, 'I loved the service. Driver was very helpful. The Online histories are clear. I enjoyed the service very much.', '2020-11-27');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `rentprice` double NOT NULL,
  `type` varchar(20) NOT NULL,
  `image` varchar(200) NOT NULL,
  `availability` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `name`, `description`, `rentprice`, `type`, `image`, `availability`) VALUES
(1, 'Transpo_G70_TA-518126', 'This is a very delightful car where you will be available to enjoy a beautiful ride.  ', 5000, 'Private Car', 'https://media.wired.com/photos/5d09594a62bcb0c9752779d9/1:1/w_1500,h_1500,c_limit/Transpo_G70_TA-518126.jpg ', 1),
(3, 'COROLLA FIELDER X', 'This is a very comfortable car. You will enjoy your ride certainly.  ', 1500, 'Private Car', 'https://www.picknbuy24.com/photo/0120307013/01.jpg/resize/640x480?202003191004     ', 1),
(4, 'Toyota Noah', 'Shei raam moja              ', 2500, 'NOAH', 'https://global.toyota/pages/models/images/20191018/kv/noah_w1920_01.jpg            ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `rents`
--

CREATE TABLE `rents` (
  `id` int(5) NOT NULL,
  `car_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `rentingDate` text NOT NULL,
  `p_method` varchar(10) NOT NULL,
  `total_price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rents`
--

INSERT INTO `rents` (`id`, `car_id`, `user_id`, `rentingDate`, `p_method`, `total_price`) VALUES
(2, 4, 8, '2020-11-27', '0', 2500),
(3, 1, 3, '2020-11-27', '1', 5000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `contactno` varchar(15) NOT NULL,
  `address` varchar(200) NOT NULL,
  `type` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `contactno`, `address`, `type`) VALUES
(1, 'nur', '1 ', 'Md. Nur Islam', '01622114901', 'Dhalpur,Jatrabari, Dhaka', 0),
(3, 'nur2', '1', 'Md.Nur Islam', '01622114901', 'Dhalpur , jatrabari', 1),
(4, 'nur3', '1', 'Md.Nur Islam', '01622114901', 'Jatrabari, Dhaka', 1),
(5, 'nura', '1', 'Md.Nur Islam', '01622114901', 'Khalekuzzaman goli new apartment', 0),
(8, 'nur1', '1', 'Md.Nur Islam', '01622114901', 'Jatrabari, Dhaka', 1),
(9, 'nur11', '1', 'Md.Nur Islam', '01622114901', 'kuratoli,Dhaka', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rents`
--
ALTER TABLE `rents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rents`
--
ALTER TABLE `rents`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
