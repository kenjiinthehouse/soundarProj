require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');

const multer = require('multer');
const getPostData = multer();
const uploadAudio = require('./../jay_modules/upload_audio_module');
const upload_audio_img = require('./../jay_modules/upload_audio_img');

const { v4: uuidv4 } = require('uuid');
// const db = require(__dirname + '/../db_connect');
const db = require(__dirname + '/../db_connect2')

const router = express.Router();
const cors = require('cors');


app.use(cors());

router.get('/', (req, res) => {
    res.send('podcaster_dashboard');
});


// 播客個人頻道資料
router.get('/channel_info/api/:podcaster_id?', async (req, res) => {

    const sql = "SELECT * FROM `podcast_channel_info` WHERE podcaster_id=?";
    const [results] = await db.query(sql, [req.params.podcaster_id]);
    res.send(results);
});


//create channel
router.post('/create_channel/api', async (req, res) => {
    const sql = "INSERT INTO `podcast_channel_info`(`podcaster_id`) VALUES (?)";
    const [results] = await db.query(sql, [req.body.podcaster_id]);    

    res.send(results);
});


// 修改頻道資料
router.post('/channel_info/edit/api', upload_audio_img.single('podcaster_img'), async (req, res) => {

    const sql = "UPDATE `podcast_channel_info` SET `podcaster_img`=?,`channel_title`=?,`podcaster_description`=?,`channel_catagory`=?,`owner_email`=?,`channel_summary`=?,`channel_subtitle`=?,`channel_rss_link`=? WHERE `podcaster_id`=?";
    const { podcaster_img, podcaster_id, channel_title, podcaster_description, channel_catagory, owner_email, channel_summary, channel_subtitle, channel_rss_link } = { ...req.body };
    const new_podcaster_img = (req.file) ? req.file.filename : podcaster_img;
    const [results] = await db.query(sql, [new_podcaster_img, channel_title, podcaster_description, channel_catagory, owner_email, channel_summary, channel_subtitle, channel_rss_link, podcaster_id]);    //要以陣列送進去

    res.send(results);
});


// 播客頻道所有單集
router.get('/channel_audio/api/:podcaster_id?', async (req, res) => {

    const sql = "SELECT a.`channel_title`,a.`podcaster_img`,b.* FROM `podcast_channel_info` AS a left join `podcast_audio` AS b on a.`podcaster_id`=b.`podcaster_id` WHERE a.`podcaster_id` =? ORDER BY `sid` DESC";
    const [results] = await db.query(sql, [req.params.podcaster_id]);
    res.send(results);
});

// 新增單集
router.post('/channel_audio/add/api', uploadAudio.single('audio_file'), async (req, res) => {
    console.log('有近新增node');
    const sql = "INSERT INTO `podcast_audio`( `podcaster_id`, `audio_file`, `audio_title`, `audio_content`, `audio_content_snippet`, `pubDate`) VALUES (?,?,?,?,?,NOW())";

    const { podcaster_id, audio_file, audio_title, audio_content, audio_content_snippet } = { ...req.body };
    const [results] = await db.query(sql, [podcaster_id, req.file.filename, audio_title, audio_content, audio_content_snippet]);

    res.json([req.file, req.body]);
});


// 刪除單集
router.get('/channel_audio/delete/api/:sid?', async (req, res) => {

    const sql = "DELETE FROM `podcast_audio` WHERE `sid`=?";
    const [results] = await db.query(sql, [req.params.sid]);

    res.json([`delete sid=${req.params.sid}`]);
});


// 修改單集
router.post('/channel_audio/edit/api/', uploadAudio.single('audio_file'), async (req, res) => {

    if (req.file) {
        const sql = "UPDATE `podcast_audio` SET `audio_file`=?,`audio_title`=?,`audio_content`=?,`audio_content_snippet`=? WHERE `sid`=?";
        const { audio_file, audio_title, audio_content, audio_content_snippet, sid } = { ...req.body };
        const [results] = await db.query(sql, [req.file.filename, audio_title, audio_content, audio_content_snippet, sid]);
    } else {
        const sql = "UPDATE `podcast_audio` SET `audio_title`=?,`audio_content`=?,`audio_content_snippet`=? WHERE `sid`=?";
        const { audio_file, audio_title, audio_content, audio_content_snippet, sid } = { ...req.body };
        const [results] = await db.query(sql, [audio_title, audio_content, audio_content_snippet, sid]);
    };


    res.json([req.body, req.file]);
});


module.exports = router;
