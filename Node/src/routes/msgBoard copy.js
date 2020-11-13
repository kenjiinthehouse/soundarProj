const express = require("express");
// const db = require("./../db_connect");
const db = require(__dirname + '/../db_connect2');
const router = express.Router();





router.get("/api", async (req, res) => {
  const output = {
    page: 0,
    perPage: 10,
    totalRows: 0,
    totalPage: 0,
    rows: [],
  };

//   const [result1] = await db.query(
//     "SELECT COUNT(1) totalRows FROM msgboard"
//   );
//   res.json(result1);
  const [[{ totalRows }]] = await db.query(
    "SELECT COUNT(1) totalRows FROM msgboard"
  );
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

    let sql = `SELECT * FROM msgboard ORDER BY sid DESC LIMIT ${
      (output.page - 1) * output.perPage
    },${output.perPage}`;

    const [result2] = await db.query(sql);
    output.rows = result2;
  }

  res.json(output);
});

router.get("/", (req, res) => {
  res.render("msgBoard.ejs");
});

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
