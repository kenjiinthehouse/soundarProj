//comment連結members sql
// SELECT members.sid,members.nickname,members.profile_pictures,article_comment.* FROM article_comment
// LEFT JOIN members ON article_comment.memberId = members.sid
// WHERE 1

const express = require("express");
const moment = require("moment-timezone");
const db = require("./../db_connect");
const router = express.Router();
const app = express();
const cors = require("cors");
//未設置會導致react fetch失敗
app.use(cors());


//取得資料庫裡全部主留言
async function getMsgList(req) {
  const article_sid = req.query.sid;
  const sort = req.query.msgSort;
  let sql = `SELECT members.sid,members.nickname,members.profile_picture,article_comment.* FROM article_comment 
LEFT JOIN members ON article_comment.memberId = members.sid
WHERE (\`article_sid\` =${article_sid}) AND (parentId = 0) `;
  
  const sql_order_default = ` ORDER BY article_comment.sid DESC`;
  const sql_order_popular = ` ORDER BY article_comment.upPoint DESC`;
  
  (sort)? sql += sql_order_popular: sql += sql_order_default; //最新或熱門主留言排序
  const [sqlResult] = await db.query(sql);
  sqlResult.forEach((element) => {
    element.postTime2 = moment(element.postTime).format("YYYY-MM-DD");
  });
  if (sqlResult.length !== 0) {
    // console.log(output.replyRows[0].sid);
    return sqlResult;
  } else {
    return "目前沒有留言";
  }
}

//取得資料庫裡對應主留言sid的子留言
async function getReplyList(req) {
  let replyCmtSql = `SELECT members.sid,members.nickname,members.profile_picture,article_comment.* FROM article_comment 
LEFT JOIN members ON article_comment.memberId = members.sid WHERE  (parentId = ?)`;

  const [replySqlResult] = await db.query(replyCmtSql, [req.params.pid]); 

  replySqlResult.forEach((element) => {
    element.postTime2 = moment(element.postTime).format("YYYY-MM-DD");
  });

  if (replySqlResult.length !== 0) {
    return replySqlResult;
  } else {
    return [{ empty: true }];
  }
}

//取得回應總比數及主留言下的子留言數目
async function getCount(req) {}

// 得到對應專欄的主留言
router.get("/index", async (req, res) => {
  res.send(await getMsgList(req));
  // res.json(sqlResult);
});

// 得到對應主留言的回覆
router.get("/reply/:pid", async (req, res) => {
  res.send(await getReplyList(req));
});

// router.get("/api", async (req, res) => {
//   res.send(await getMsgList(req));
//   // res.json(sqlResult);
// });

// INSERT INTO `msgboard` (`sid`, `parentId`, `memberId`, `nickname`, `content`, `upPoint`, `downPoint`, `accusePoint`, `postTime`)
// VALUES                  (NULL,    DEFAULT,   'Energy',    '黃小貓', '就你說了放手', DEFAULT, DEFAULT, DEFAULT,              NOW());

//對應該篇專欄新增主留言
router.post("/add/msg", async (req, res) => {
  const article_sid = req.body.sid;
  const memberId = req.body.memberId;
  const nickname = req.body.nickname;
  const content = req.body.content;

  const addSql = `INSERT INTO \`article_comment\`(\`sid\`,\`article_sid\`,\`parentId\`,\`memberId\`,\`nickname\`,\`content\`,\`upPoint\`,\`downPoint\`,\`accusePoint\`,\`postTime\`) VALUES(NULL,?,DEFAULT,?,?,?,DEFAULT,DEFAULT,DEFAULT,NOW())`;
  const [{ affectedRows, insertId }] = await db.query(addSql, [
    article_sid,
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

//對應該篇專欄該主留言新增回覆
router.post("/add/reply", async (req, res) => {
  const article_sid = req.body.sid;
  const parentId = req.body.parentId;
  const memberId = req.body.memberId;
  const nickname = req.body.nickname;
  const content = req.body.content;

  const addSql = `INSERT INTO \`article_comment\`(\`sid\`,\`article_sid\`,\`parentId\`,\`memberId\`,\`nickname\`,\`content\`,\`upPoint\`,\`downPoint\`,\`accusePoint\`,\`postTime\`) VALUES(NULL,?,?,?,?,?,DEFAULT,DEFAULT,DEFAULT,NOW())`;
  const [{ affectedRows, insertId }] = await db.query(addSql, [
    article_sid,
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