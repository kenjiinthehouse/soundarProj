const express = require('express');
const moment = require('moment-timezone');
// const db = require('./../db_connect');
const db = require('./../db_connect2');
const router = express.Router();

//取得資料庫裡全部主留言
async function getMsgList(req) {
  let sql = `SELECT * FROM msgboard WHERE parentId = 0 ORDER BY sid DESC`;
  const [sqlResult] = await db.query(sql);
  sqlResult.forEach((element) => {
    element.postTime2 = moment(element.postTime).format('YYYY-MM-DD');
  });
  if (sqlResult.length !== 0) {
    // console.log(output.replyRows[0].sid);
    return sqlResult;
  } else {
    return '目前沒有留言';
  }
}

//取得資料庫裡對應主留言sid的子留言
async function getReplyList(req) {
  let replyCmtSql = `SELECT * FROM msgboard WHERE parentId = ?`;

  const [replySqlResult] = await db.query(replyCmtSql, [req.params.sid]);

  replySqlResult.forEach((element) => {
    element.postTime2 = moment(element.postTime).format('YYYY-MM-DD');
  });
  if (replySqlResult.length !== 0) {
    return replySqlResult;
  } else {
    return [{ empty: true }];
  }
}

//取得回應總比數及主留言下的子留言數目
async function getCount(req) {}

// TODO: FOR REACT
router.get('/', async (req, res) => {
  res.send(await getMsgList(req));
  // res.json(sqlResult);
});

// http://localhost:7788/address-book/edit/139
router.get('/reply/:sid', async (req, res) => {
  res.send(await getReplyList(req));
});

router.get('/api', async (req, res) => {
  res.send(await getMsgList(req));
  // res.json(sqlResult);
});

// INSERT INTO `msgboard` (`sid`, `parentId`, `memberId`, `nickname`, `content`, `upPoint`, `downPoint`, `accusePoint`, `postTime`)
// VALUES                  (NULL,    DEFAULT,   'Energy',    '黃小貓', '就你說了放手', DEFAULT, DEFAULT, DEFAULT,              NOW());
router.post('/add', async (req, res) => {
  const memberId=req.body.memberId;
  const nickname=req.body.nickname;
  const content=req.body.content;

  const addSql =
    'INSERT INTO `msgboard` VALUES(NULL,DEFAULT,?,?,?,DEFAULT,DEFAULT,DEFAULT,NOW())';
  const [{ affectedRows, insertId }] = await db.query(addSql, [memberId,nickname,content]);
  // [{"fieldCount":0,"affectedRows":1,"insertId":860,"info":"","serverStatus":2,"warningStatus":1},null]

  res.json({
    success: !!affectedRows,
    affectedRows,
    insertId,
  });
});

router.post('/add/reply', async (req, res) => {
  const parentId = req.body.parentId;
  const memberId = req.body.memberId;
  const nickname = req.body.nickname;
  const content = req.body.content;

  const addSql =
    'INSERT INTO `msgboard` VALUES(NULL,?,?,?,?,DEFAULT,DEFAULT,DEFAULT,NOW())';
  const [{ affectedRows, insertId }] = await db.query(addSql, [
    parentId,
    memberId,
    nickname,
    content,
  ]);
  // [{"fieldCount":0,"affectedRows":1,"insertId":860,"info":"","serverStatus":2,"warningStatus":1},null]

  res.json({
    success: !!affectedRows,
    affectedRows,
    insertId,
  });
});


module.exports = router;



// //當 url 是 /post/:id 時, 取得某一筆資料
// app.get('/post/:id', function(req, res, next){
//   //取得 post.json 資料夾
//   res.locals.posts.forEach(function(post){
//     //從 url 取得 id 參數與 posts.json 裡的 id
//     if (req.params.id === post.id){
//       //顯示參數為  url 中 id 的 post.id, 那麼顯示部分資料
//       res.render('post.ejs', { post: post });
//     }
//   })
// });

/* RESTful API
    列表
    /api/ GET
    新增
    /api/ POST
    呈現單筆
    /api/:sid GET
    修改單筆
    /api/:sid PUT
    刪除單筆
    /api/:sid DELETE
 */
/*
    列表  /list
        列表呈現 GET
    新增  /add
        表單呈現 GET, 接收資料 POST
    修改  /edit/:sid
        修改的表單呈現 GET, 接收資料 POST
    修改  /del/:sid
        POST
 */

/* RESTful API
    列表
    /api/ GET
    新增
    /api/ POST
    呈現單筆
    /api/:sid GET
    修改單筆
    /api/:sid PUT
    刪除單筆
    /api/:sid DELETE
 */
/*
    列表  /list
        列表呈現 GET
    新增  /add
        表單呈現 GET, 接收資料 POST
    修改  /edit/:sid
        修改的表單呈現 GET, 接收資料 POST
    修改  /del/:sid
        POST
 */
