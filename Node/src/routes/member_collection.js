const express = require("express");
const moment = require("moment-timezone");
const db = require(__dirname + "/../db_connect2");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const fs = require("fs");
const multer = require("multer");
// var request = require("request");
// var progress = require("request-progress");

// SELECT a.`member_id` AS sid ,a.`audio_id` ,a.`created_at`,b.audio_file AS musicSrc,b.audio_title AS name,c.channel_title AS singer,c.podcaster_img AS cover FROM `audio_collection` AS a LEFT JOIN podcast_audio AS b ON a.`audio_id`=b.sid LEFT JOIN podcast_channel_info AS c ON b.podcaster_id=c.podcaster_id WHERE a.`member_id`=2
router.post("/audio_collection", async (req, res) => {
  const output = {
    body: req.body,
    // success: false,
    message: "",
  };

  const sid = req.body.sid;

  const sql =
    "SELECT a.`member_id` AS sid ,a.`audio_id` ,a.`created_at`,b.audio_file AS musicSrc,b.audio_title AS name,b.podcaster_id,c.channel_title AS singer,c.podcaster_img AS cover ,c.channel_catagory FROM `audio_collection` AS a LEFT JOIN podcast_audio AS b ON a.`audio_id`=b.sid LEFT JOIN podcast_channel_info AS c ON b.podcaster_id=c.podcaster_id WHERE a.`member_id`=? ORDER BY `created_at` DESC";
  const [rs] = await db.query(sql, [sid]);

  output.rs = [...rs];

  output.rs.forEach((e) => {
    e.created_at = moment(e.created_at).format("YYYY-MM-DD");
  });

  //   const created_at = output.rs.created_at;
  //   output.rs.created_at = moment(created_at).format("YYYY-MM-DD");

  res.json(output);
});

router.post("/delete_audio", async (req, res) => {
  const sql =
    "DELETE FROM `audio_collection` WHERE `member_id`=? AND `audio_id`=?";

  const member_id = req.body.sid;
  const audio_id = req.body.audio_id;
  const [rs] = await db.query(sql, [member_id, audio_id]);
  res.json(rs);
});

router.post("/add_audio", async (req, res) => {
  // INSERT INTO `audio_collection`(`member_id`, `audio_id`) VALUES (5,5)
  const sql =
    "INSERT INTO `audio_collection`(`member_id`, `audio_id`) VALUES (?,?)";
  const sid = req.body.sid;
  const audio_id = req.body.audio_id;
  const [{ affectedRows }] = await db.query(sql, [sid, audio_id]);

  res.json({
    success: !!affectedRows,
    affectedRows,
  });
});

router.post("/channel_collection", async (req, res) => {
  const output = {
    body: req.body,
    success: false,
    message: "",
  };
  // const sql =
  //   "SELECT a.`member_id`,a.`channel_id`,b.channel_title,b.podcaster_img as channel_img FROM `channel_collection` as a LEFT JOIN podcast_channel_info as b on a.`channel_id`=b.sid WHERE `member_id`=?";
  const sql =
    "SELECT a.`member_id`,a.`channel_id`,b.channel_title,b.podcaster_img as channel_img ,b.channel_catagory FROM `channel_collection` as a LEFT JOIN podcast_channel_info as b on a.`channel_id`=b.sid WHERE `member_id`=?";

  const sid = req.body.sid;

  const [rs] = await db.query(sql, [sid]);

  if (rs.length) {
    output.success = true;
  }
  output.rs = [...rs];

  res.json(output);
});

router.post("/add_channel", async (req, res) => {
  const sql =
    "INSERT INTO `channel_collection`(`member_id`, `channel_id`) VALUES (?,?)";
  const sid = req.body.sid;
  const channel_id = req.body.channel_id;
  const [{ affectedRows }] = await db.query(sql, [sid, channel_id]);

  res.json({
    success: !!affectedRows,
    affectedRows,
  });
});

router.post("/delete_channel", async (req, res) => {
  const sql =
    "DELETE FROM `channel_collection` WHERE `member_id`=? AND `channel_id`=?";
  const member_id = req.body.sid;
  const channel_id = req.body.channel_id;
  const [rs] = await db.query(sql, [member_id, channel_id]);
  res.json(rs);
});

//檔案下載
const download = async function (link, name) {
  const url = link;
  // const path = Path.resolve(__dirname, "images", "code.jpg");
  const writer = fs.createWriteStream(
    __dirname + `/../../../reactproj/public/music/${name}.mp3`
  );

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

router.post("/download", async (req, res) => {
  const output = {
    body: req.body,
    // success: false,
    name: "",
  };

  const url = req.body.link;
  const name = uuidv4();
  // console.log(" i am here",url);
  await download(url, name);
  // console.log(" i am here again");
  output.name = name;
  res.json(output);
});

//用於節目收藏愛心顯示
router.post("/collect", multer().none(), async (req, res) => {
  const output = {
    body: req.body,
    success: false,
    name: "",
  };

  const sid = req.body.sid;

  const sql = "SELECT `audio_id` FROM `audio_collection` where `member_id` =?";

  const [rs] = await db.query(sql, [sid]);

  if (rs.length) {
    output.success = true;
  }
  output.rs = [...rs];

  const newrs = [];

  output.rs.map((item, index) => {
    newrs.push(item.audio_id);
  });

  output.rs = newrs;

  res.json(output);
});

//channel追蹤顯示array
router.post("/channel_array", async (req, res) => {
  const output = {
    body: req.body,
    success: false,
    name: "",
  };

  const sid = req.body.sid;

  const sql =
    "SELECT `channel_id` FROM `channel_collection` WHERE `member_id`= ?";

  const [rs] = await db.query(sql, [sid]);

  if (rs.length) {
    output.success = true;
  }
  output.rs = [...rs];

  const newrs = [];

  output.rs.map((item, index) => {
    newrs.push(item.channel_id);
  });

  output.rs = newrs;

  res.json(output);
});

module.exports = router;

// DELETE FROM `audio_collection` WHERE `member_id`=2 AND `audio_id`=2

// https://anchor.fm/s/1ea77470/podcast/play/20720496/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-9-6%2F1cddbbc6-8a6c-ac55-6acd-3a1bcc12e43c.mp3

// public/music/test.mp3
