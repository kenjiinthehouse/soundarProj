-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020-11-16 10:36:03
-- 伺服器版本： 10.4.14-MariaDB
-- PHP 版本： 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `mfee09_project`
--

-- --------------------------------------------------------

--
-- 資料表結構 `members`
--

CREATE TABLE `members` (
  `sid` int(11) NOT NULL,
  `profile_picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` int(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `cardnumber` int(255) DEFAULT NULL,
  `verify` int(255) NOT NULL DEFAULT 0,
  `podcaster` int(255) NOT NULL DEFAULT 0,
  `payingmember` int(255) NOT NULL DEFAULT 0,
  `channel_collect` varchar(255) DEFAULT NULL,
  `audio_collect` varchar(255) DEFAULT NULL,
  `google_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '0',
  `google_name` varchar(255) DEFAULT NULL,
  `google_photo` varchar(255) DEFAULT NULL,
  `gmail` varchar(255) DEFAULT NULL,
  `hashcode` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `members`
--

INSERT INTO `members` (`sid`, `profile_picture`, `account`, `password`, `name`, `nickname`, `gender`, `birthday`, `phone`, `address`, `cardnumber`, `verify`, `podcaster`, `payingmember`, `channel_collect`, `audio_collect`, `google_id`, `google_name`, `google_photo`, `gmail`, `hashcode`, `created_at`) VALUES
(1, '97da1b0c-9552-4d10-95cb-a640cf8fb400.jpg', 'podcasttest168@gmail.com', '123', '林小新', '小新', 1, '2020-11-20', '0975379482', ' 106台北市大安區復興南路一段390號2樓', 123456789, 1, 1, 1, NULL, NULL, '114949074742302435414', 'Po Shen Shen', 'https://lh3.googleusercontent.com/a-/AOh14GjMe4aZZZfQ3MdM_qsqpyHInKI_SICXY43Cpxcu=s96-c', 'podcasttest168@gmail.com', 'c4d3725f-2a1c-446a-9ab0-0ad991dde894', '2020-09-02 15:19:41'),
(2, 'deb48946-148f-475a-a772-cc6123f3a831.jpg', 'michael.sps168@gmail.com', '123', 'michael', 'michael', 1, '2019-11-28', '0977777555', '106台北市大安區復興南路一段390號3樓', 123456789, 1, 1, 1, NULL, NULL, '105049437943505516360', 'Po Shen Shen', 'https://lh4.googleusercontent.com/-r51w2PqI4pU/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck9IBQtOlyF2TKzPqJ8mkwKE6Nyfg/s96-c/photo.jpg', 'michael.sps168@gmail.com', '6c4bc44b-93d2-4ee3-a977-dcfd7e9fcf87', '2020-09-02 15:19:05'),
(3, '4d718e7f-a64d-4165-9986-e37f9bc29185.jpg', 'demo1@gmail.com', 'demo1', 'demo1', 'demo1', 0, '1995-05-06', '0978638752', '106台北市大安區復興南路一段390號4樓', 123456789, 1, 1, 1, NULL, NULL, '0', NULL, NULL, NULL, '70ddc04f-2ce4-4f3a-a431-08b0a20d1815', '2020-09-02 15:24:23'),
(4, '1e585369-0557-473c-8f47-ca6b0aa124e2.png', 'demo2@gmail.com', 'demo2', 'demo2', 'demo2', 1, '2000-03-05', '0999888555', '106台北市大安區復興南路一段390號5樓', 123456789, 1, 1, 0, NULL, NULL, '0', NULL, NULL, NULL, 'af5ba540-a822-4ffe-84ba-43c26f6c5f6f', '2020-09-02 15:24:23'),
(5, 'a6ba3e76-76a2-4b8f-abe8-29f120e474ed.jpg', 'demo3@gmail.com', 'demo3', 'demo3', 'demo3', 1, '2001-10-10', '0987157852', '106台北市大安區復興南路一段390號6樓', 123456789, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, 'd889e35f-40a0-48e4-9196-e99765bb84b6', '2020-09-02 15:27:09'),
(6, NULL, 'test6@gmail.com', 'test6', 'test6', 'test6', 1, '2005-03-02', '0987598321', NULL, 123456789, 1, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, 'a63b4a32-fffc-4008-8554-be953503e117', '2020-09-02 15:29:48'),
(7, NULL, 'test7@gmail.com', 'test7', 'test7', 'test7', 0, '1997-06-08', '0963852741', NULL, 123456789, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, '2809cc6a-ca60-49b2-a5cd-ed47e3751f93', '2020-09-02 15:31:48'),
(8, NULL, 'test8@gmail.com', 'test8', 'test8', 'test8', 1, '2011-11-11', '0965723852', NULL, 123456789, 1, 1, 0, NULL, NULL, '0', NULL, NULL, NULL, '21e607b8-11d6-4e21-9519-c4d8145b5f07', '2020-09-02 15:34:12'),
(9, NULL, 'test9@gmail.com', 'test9', 'test9', 'test9', 1, '2000-03-27', '0963987951', NULL, 123456789, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, '8ab4a770-398a-4197-9dba-fa45a609a707', '2020-09-02 15:36:24'),
(10, NULL, 'test10@gmail.com', 'test10', 'test10', 'test10', 1, '2011-09-01', '0985654147', NULL, 123456789, 1, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, '5af07eae-51a1-4811-8c8b-27605876e97c', '2020-09-02 15:44:48'),
(11, NULL, 'test11@gmail.com', 'test11', 'test11', 'test11', 0, '1988-01-01', '0987635852', NULL, 123456789, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, 'e8b47c68-645a-4ed1-a1b1-8b1703d9d8e1', '2020-09-02 15:46:20'),
(12, NULL, 'abc@yahoo.com.tw', '123456', 'abccc15', 'abceda', 0, '2020-09-25', '0963874592', NULL, 0, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, 'ef3c73c9-ec32-4dfc-9c26-a8237f80babb', '2020-09-08 14:06:13'),
(13, NULL, 'kevin@gmail.com', 'qwertasd', 'kevin', 'kevin', 1, '1993-03-04', '0963987456', NULL, 0, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, '4a069cff-5f91-4860-86c4-171423f7e6a2', '2020-09-08 14:06:13'),
(14, NULL, 'test1@gmail.com', '23455', '傑哥是神', '666', 1, '2020-09-02', '0910984388', NULL, 0, 1, 1, 1, NULL, NULL, '0', NULL, NULL, NULL, '0606ecfb-9216-4cd7-900d-07d2d2fc5cc8', '2020-09-06 22:29:40'),
(17, NULL, 'shin@gmail.com', '12312', '132', '123', 1, '2020-10-01', '0987412581', NULL, 2147483647, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, '4e60a493-ca40-45b1-adca-93afe7b69ea1', '2020-09-09 15:16:57'),
(18, NULL, 'shinder@gmail.com', '12345', '123', '123', 0, '2020-09-25', '0987654321', NULL, 0, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, '32aafab1-2725-4907-9a68-e6e98359d409', '2020-09-09 15:39:40'),
(19, NULL, 'shinder@yahoo.com.tw', '1123456', '132', '老明2', 0, '2020-09-25', '0985236974', NULL, 0, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, '05016cba-b869-4c69-90dd-f65bfa3baf15', '2020-09-09 16:05:00'),
(20, NULL, 'shinder1@gmail.com', '12345', '132', '123', 0, '2020-09-09', '0963852741', NULL, 2147483647, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, '072071e2-1589-473d-bd9a-5bf77e474740', '2020-09-09 16:22:21'),
(21, NULL, '123456@yahoo.com.tw', '12345', '132', '123', 0, '2020-09-10', '0963897123', NULL, 0, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, '133f1fe5-a869-4c64-966e-69af2a55b7ee', '2020-09-09 16:41:06'),
(22, NULL, 'shinder2@gmail.com', '12345', 'test', '123', 0, '2020-09-25', '0987445632', NULL, 0, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, 'c1adb305-8b2d-4679-b512-8f5642ef7ba1', '2020-09-10 08:51:17'),
(23, NULL, 'shinder3@gmail.com', '12345', 'test', '123', 0, '2020-09-25', '0963852741', NULL, 0, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, '287bbeef-ca05-4438-9fb5-a9b1dda33c85', '2020-09-10 08:52:09'),
(24, NULL, 'demo2@gmail.com', 'demo2', 'demo2', 'demo2', 1, '2000-03-05', '0999888555', '106台北市大安區復興南路一段390號5樓', 123456789, 1, 1, 0, NULL, NULL, '0', NULL, NULL, NULL, '2a4bc94d-b9fd-4487-9e09-23a7675cd8d5', '2020-09-02 15:24:23'),
(25, NULL, 'test168@gmail.com', '123321', NULL, 'testtest', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, '6614da3c-7c6b-4a14-a3bc-2cb718444b95', '2020-10-30 13:38:40'),
(26, NULL, 'test321@gmail.com', 'test321', NULL, 'testetst', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, 'e4880da3-a381-4c09-8e56-e5e65f9e72ad', '2020-10-30 13:46:47'),
(29, NULL, '123', '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, 'a0dcbfb0-27f2-4732-9adf-ea33b2a22ce8', '2020-11-05 23:39:26'),
(30, NULL, '12', '', NULL, '', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, 'ce4c0423-9a5a-46db-beaa-0f18c33fb702', '2020-11-05 23:40:15'),
(31, NULL, 'test999@gmail.com', '123456aaa', NULL, '123456', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, 'ea073d3d-6e09-4b72-adfe-a9a429d4a461', '2020-11-05 23:54:13'),
(32, NULL, 'test999@gmail.com', '123456aaa', NULL, '123456', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, NULL, '0', NULL, NULL, NULL, 'f716f7f6-53e4-40b5-8de8-ab20440b8637', '2020-11-05 23:54:26'),
(168, 'https://lh3.googleusercontent.com/a-/AOh14Ggk3U69tMU7UUqq8P2KDEquMPhO6m_u5ZC0D3P9bA=s96-c', 'jl55661688@yahoo.com.tw', NULL, NULL, '張正杰', NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, NULL, '103247920625181445278', '張正杰', 'https://lh3.googleusercontent.com/a-/AOh14Ggk3U69tMU7UUqq8P2KDEquMPhO6m_u5ZC0D3P9bA=s96-c', 'jl55661688@yahoo.com.tw', '400568ff-f73c-479a-9c02-6c1a6cff5510', '2020-11-13 13:52:24');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `members`
--
ALTER TABLE `members`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
