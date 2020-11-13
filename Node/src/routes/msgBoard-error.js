
const express = require('express');
const moment = require('moment-timezone');
// const db = require('./../db_connect');
const db = require('./../db_connect2');

const router = express.Router();

//取得資料庫裡全部主留言
const output = {
  page: 0,
  perPage: 10,
  totalRows: 0,
  totalPage: 0,
  rows: [],
  replyRows: [],
};
async function getMsgList(req) {
  const [[{ totalRows }]] = await db.query(
    'SELECT COUNT(1) totalRows FROM msgboard'
  );
  // console.log(totalRows)
  if (totalRows > 0) {
    let page = parseInt(req.query.page) || 1;
    output.totalRows = totalRows;
    output.totalPage = Math.ceil(totalRows / output.perPage);
    if (page < 1) {
      output.page = 1;
    } else if (page > output.totalPage) {
      output.page = output.totalPage;
    } else {
      output.page = page;
    }

    let sql = `SELECT * FROM msgboard WHERE parentId = 0 ORDER BY sid DESC LIMIT ${
      (output.page - 1) * output.perPage
    },${output.perPage}`;
    let replyCmtSql = `SELECT * FROM msgboard  WHERE parentId = 22 `;

    const [sqlResult] = await db.query(sql);

    const [result3] = await db.query(replyCmtSql);

    sqlResult.forEach((element) => {
      element.postTime2 = moment(element.postTime).format('YYYY-MM-DD');
    });
    result3.forEach((element) => {
      element.postTime2 = moment(element.postTime).format('YYYY-MM-DD');
    });

    output.rows = sqlResult;
    output.replyRows = result3;
  }

  if (output.rows.length !== 0) {
    // console.log(output.replyRows[0].sid);
    return output;
  } else {
    return '目前沒有留言';
  }
}

//根據前端送來的sid搜尋比對資料庫裡附隨主留言的留言 sid = parentId
// const replyCmtOutput = {
//   rCmtPage: 0, // 回應元件的頁數
//   rCmtPerPage: 10, //回應元件每頁幾筆留言
//   rCmtTotalRows: 0, //回應元件共有幾筆留言
//   rCmtTotalPage: 0, //回應元件共有幾頁
//   replyCmtRows: [], //回應
// };

async function getReplyList(req) {
  // let replyCmtSql = `SELECT * FROM msgboard WHERE parentId = ? ORDER BY sid DESC LIMIT ${
  //   (replyCmtOutput.rCmtPage - 1) * replyCmtOutput.rCmtPage
  // },${replyCmtOutput.rCmtPage}`;

  let replyCmtSql = `SELECT * FROM msgboard WHERE parentId = ?`;

  const [replySqlResult] = await db.query(replyCmtSql, [req.params.sid]);

  replySqlResult.forEach((element) => {
    element.postTime2 = moment(element.postTime).format('YYYY-MM-DD');
  });

  replyCmtOutput.replyCmtRows = replySqlResult;
  if (replyCmtOutput.replyCmtRows.length !== 0) {
    return replyCmtOutput;
  } else {
    return '目前沒有回應的留言5555';
  }
}

// TODO:這邊有問題 
// async function getReplyList(req) {
//   const [
//     [{ rCmtTotalRows }],
//   ] = await db.query(
//     'SELECT COUNT(1) replyTotalRows FROM msgboard WHERE parentId = ?',
//     [req.params.sid]
//   );
//   console.log(rCmtTotalRows);
//   if (rCmtTotalRows > 0) {
//     let rCmtPage = parseInt(req.query.rCmtPage) || 1;
//     replyCmtOutput.rCmtTotalRows = rCmtTotalRows;
//     replyCmtOutput.rCmtTotalPage = Math.ceil(
//       rCmtTotalRows / replyCmtOutput.rCmtPerPage
//     );
//     if (rCmtPage < 1) {
//       replyCmtOutput.rCmtPage = 1;
//     } else if (rCmtPage > replyCmtOutput.rCmtTotalPage) {
//       replyCmtOutput.rCmtPage = replyCmtOutput.rCmtTotalPage;
//     } else {
//       replyCmtOutput.rCmtPage = rCmtPage;
//     }

//     // let replyCmtSql = `SELECT * FROM msgboard WHERE parentId = ? ORDER BY sid DESC LIMIT ${
//     //   (replyCmtOutput.rCmtPage - 1) * replyCmtOutput.rCmtPage
//     // },${replyCmtOutput.rCmtPage}`;

//     let replyCmtSql = `SELECT * FROM msgboard WHERE parentId = ?`;

//     const [replySqlResult] = await db.query(replyCmtSql, [req.params.sid]);

//     replySqlResult.forEach((element) => {
//       element.postTime2 = moment(element.postTime).format('YYYY-MM-DD');
//     });

//     replyCmtOutput.replyCmtRows = replySqlResult;
//   }

//   if (replyCmtOutput.replyCmtRows.length !== 0) {
//     return replyCmtOutput;
//   } else {
//     return '目前沒有回應的留言5555';
//   }
// }


// TODO: NODE EJS畫面呈現
// 輸出全部主留言  //session還未實現
// router.get('/', async (req, res) => {
//   const output = await getMsgList(req);
//   if (req.session.admin) {
//     res.render('msgBoard.ejs', output);
//   } else {
//     res.render('msgBoard.ejs', output);
//   }
// });

// TODO: FOR REACT
router.get('/', async (req, res) => {
  res.send(await getMsgList(req));
  // res.json(sqlResult);
});

// http://localhost:7788/address-book/edit/139
router.get('/reply/:sid', async (req, res) => {
  res.json(await getReplyList(req));
});

router.get('/api', async (req, res) => {
  res.send(await getMsgList(req));
  // res.json(sqlResult);
});

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

module.exports = router;

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
