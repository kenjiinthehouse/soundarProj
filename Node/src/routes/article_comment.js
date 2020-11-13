const express = require('express');
// const db = require(__dirname + '/../db_connect');
const db = require(__dirname + '/../db_connect2');
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken');
const router = express.Router();

//article-comment list 
// router.get('/', (req, res) => {
//     res.redirect('/comment');
// });

//article-comment api
async function getCommentListData(req) {
    const output = {
        page: 0,
        perPage: 5,
        totalRows:0,
        totalPages:0,
        rows: [],
        pages:[]
    }

    //first-deal with rows/pages
    const article_sid = req.params.a_sid;
    const parent_sid = req.params.p_sid;
    // console.log(article_sid);
    // 對應文章的留言(totoalRows) 留言+回覆總數量
    let t_totalRows = `SELECT COUNT(1) totalRows FROM article_comment WHERE (article_sid = ${article_sid}) `;
    // parent_sid ? (t_totalRows += ` AND (parentId = ${parent_sid})`): t_totalRows;
    
//     const [[{ totalRows }]] = await db.query(t_totalRows);
//     // console.log(totalRows);

//     if (totalRows > 0) {
//         let page = parseInt(req.query.page) || 1;
//         output.totalRows = totalRows;
//         output.totalPages = Math.ceil(totalRows / output.perPage);

//         if (page < 1) {
//             output.page = 1;
//         } else if (page > output.totalPages) {
//             output.page = output.totalPages;
//         } else {
//             output.page = page;
//         }

//         //pagination(show 5 pages)
//         if (output.totalPages < 5) {
//             for (let i = 0; i < output.totalPages.length; i++) {
//                 output.pages.push(i);
//             }
//         } else {
//             const frontPages = [];
//             const backPages = [];
//             //add pages from front
//             for (let i = output.page - 2; i < output.totalPages; i++) {
//                 if (i >= 1) frontPages.push(i);
//                 if (frontPages.length >= 5) break;
//             }

//             //add pages from back
//             for (let i = output.page + 2; i < output.totalPages; i--) {
//                 if (i <= output.totalPages) backPages.unshift(i);
//                 if (backPages.length >= 5) break;
//             }
//         }

//         //second-deal with dataRows(latest/popular)
//         // const articleSid = req.params.sid;
//         let sql = `SELECT * FROM article_comment WHERE article_sid = ${article_sid} `;
//         parent_sid ? (sql += ` AND (parentId = ${parent_sid})`): sql;
//         const sql_order_default = ` ORDER BY sid DESC LIMIT ${(output.page - 1) * output.perPage},${output.perPage}`;
//         const sql_order_popular = ` ORDER BY upPoints DESC LIMIT ${(output.page - 1) * output.perPage},${output.perPage}`;

//         const sort = req.body.sort;
//         if (!!sort && sort === '熱門留言') {
//             sql += sql_order_popular;
//         } else {
//             sql += sql_order_default;
//         }
//             const [rows] = await db.query(sql);
//             output.rows = rows;
//     }
//     return output;
// }

// async function getReplyListData(req) {
//     const output = {
//         // page: 0,
//         // perPage: 5,
//         totalRows:0,
//         // totalPages:0,
//         rows: [],
//         // pages:[]
//     }

     
//         //deal with dataRows(latest/popular)
//         const article_sid = req.params.a_sid;
//         const parent_sid = req.params.p_sid;
//         let sql = `SELECT * FROM article_comment WHERE (article_sid = ${article_sid}) AND (parentId = ${parent_sid})`;
//         const sql_order_default = ` ORDER BY sid DESC`;
//         const sql_order_popular = ` ORDER BY upPoints DESC`;

//         const sort = req.body.sort;
//         if (!!sort && sort === '熱門留言') {
//             sql += sql_order_popular;
//         } else {
//             sql += sql_order_default;
//         }
//             const [rows] = await db.query(sql);
//             output.rows = rows;
//     return output;
// }


// //article-comment list(R)
// router.get('/:a_sid/', async (req, res) => {
//     const output = await getCommentListData(req);
//     res.json(await getCommentListData(req));
// })

// //article-comment-reply list(R)
// router.get('/:a_sid/:p_sid?', async (req, res) => {
//     const output = await getReplyListData(req);
//     res.json(await getReplyListData(req));
// })



// //article-comment add(C)
// // router.get('/add', (req, res) => {
    
// // })

// router.post('/:a_sid/add', async (req, res) => {
//     const data = { ...req.body };
//     const sql = `INSERT INTO \`article_comment\` set ?`;
//     const [{ affectedRows, insertId }] = await db.query(sql, [data]);

//     res.json({
//         //success:aff->1,fail:aff->0
//         success: !!affectedRows,
//         affectedRows,
//         insertId
//     });
// })

// //article-comment-reply add(C)
// // router.get('/add', (req, res) => {
    
// // })

// router.post('/:a_sid/:p_sid/add', async (req, res) => {
//     const data = { ...req.body };
//     const sql = `INSERT INTO \`article_comment\` set ?`;
//     const [{ affectedRows, insertId }] = await db.query(sql, [data]);

//     res.json({
//         //success:aff->1,fail:aff->0
//         success: !!affectedRows,
//         affectedRows,
//         insertId
//     });
// })

//article edit(U)
// router.get('/edit/:sid', async (req, res) => {
//     const sql = "SELECT * FROM article_comment WHERE sid=?";

//     const [results] = await db.query(sql, [req.params.sid]);
//     if (!results.length) return res.redirect('/article_comment/list');

//     res.json(results[0]);
// })

// router.post('/edit/:sid', async (req, res) => {
//     const data = { ...req.body };
//     const sql = await db.query(sql, [data, req, params.sid]);

//     res.json({
//         success: !!changedRows,
//         affectedRows,
//         changedRows
//     });
// })

//article delete(D)
// router.delete('/delete/:sid', async (req, res) => {
//     const sql = "DELETE DROM `article_comment` WHERE `sid`=?";
//     const [results] = await db.query(sql, [req.params.sid]);

//     res.json(results);
// })


//comment連結members sql
// SELECT members.sid,members.nickname,members.profile_pictures,article_comment.* FROM article_comment 
// LEFT JOIN members ON article_comment.memberId = members.sid
// WHERE 1
//module.exports = router;

const express = require("express");
const moment = require("moment-timezone");
const db = require("./../db_connect");
const router = express.Router();

//取得資料庫裡全部主留言
async function getMsgList(req) {
  let sql = `SELECT members.sid,members.nickname,members.profile_picture,article_comment.* FROM article_comment 
LEFT JOIN members ON article_comment.memberId = members.sid
WHERE parentId = 0 ORDER BY article_comment.sid DESC`;
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
LEFT JOIN members ON article_comment.memberId = members.sid WHERE parentId = ?`;

  const [replySqlResult] = await db.query(replyCmtSql, [req.params.sid]);

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

// TODO: FOR REACT
router.get("/", async (req, res) => {
  res.send(await getMsgList(req));
  // res.json(sqlResult);
});

// http://localhost:7788/address-book/edit/139
router.get("/reply/:sid", async (req, res) => {
  res.send(await getReplyList(req));
});

router.get("/api", async (req, res) => {
  res.send(await getMsgList(req));
  // res.json(sqlResult);
});

// INSERT INTO `msgboard` (`sid`, `parentId`, `memberId`, `nickname`, `content`, `upPoint`, `downPoint`, `accusePoint`, `postTime`)
// VALUES                  (NULL,    DEFAULT,   'Energy',    '黃小貓', '就你說了放手', DEFAULT, DEFAULT, DEFAULT,              NOW());
router.post("/add", async (req, res) => {
  const memberId = req.body.memberId;
  const nickname = req.body.nickname;
  const content = req.body.content;

  const addSql =
    "INSERT INTO `article_comment` VALUES(NULL,DEFAULT,?,?,?,DEFAULT,DEFAULT,DEFAULT,NOW())";
  const [{ affectedRows, insertId }] = await db.query(addSql, [
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

router.post("/add/reply", async (req, res) => {
  const parentId = req.body.parentId;
  const memberId = req.body.memberId;
  const nickname = req.body.nickname;
  const content = req.body.content;

  const addSql =
    "INSERT INTO `article_comment` VALUES(NULL,?,?,?,?,DEFAULT,DEFAULT,DEFAULT,NOW())";
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