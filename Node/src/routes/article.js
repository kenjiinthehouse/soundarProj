const express = require("express");
const db = require(__dirname + "/../db_connect");
const moment = require("moment-timezone");
const jwt = require("jsonwebtoken");
const upload_module = require(__dirname + "/../upload_module");
const app = express();
const router = express.Router();
const cors = require("cors");

//未設置會導致react fetch失敗
app.use(cors());

//article
// router.get("/", (req, res) => {
//   res.redirect("/article/list");
// });

//article api
async function getListData(req) {
  const output = {
    page: 0,
    perPage: 5,
    totalRows: 0,
    totalPages: 0,
    rows: [],
    pages: [],
  };

  // totalRows(設定各種條件篩選)
  const search = req.query.search;
  const category = req.query.category;
  const tags = req.query.tags;
  const sort = req.query.sort;
  let total_totalRows = `SELECT COUNT(1) totalRows FROM article WHERE 1 `;
  const category_set = `AND (article_category = '${category}')`;
  const tags_set = `AND (article_tags LIKE '%${tags}%')`;
  const search_set = `AND ((article_title LIKE '%${search}%') OR (article_content LIKE '%${search}%'))`;

  tags ? (total_totalRows += tags_set) : total_totalRows;
  category ? (total_totalRows += category_set) : total_totalRows;
  search ? (total_totalRows += search_set) : total_totalRows;

  const [[{ totalRows }]] = await db.query(total_totalRows);

  // 利用totalRows與設定單頁筆數計算總頁數
  if (totalRows === 0) output.totalRows = totalRows;
  if (totalRows > 0) {
    let page = parseInt(req.query.page) || 1;
    output.totalRows = totalRows;
    output.totalPages = Math.ceil(totalRows / output.perPage);

    if (page < 1) {
      output.page = 1;
    } else if (page > output.totalPages) {
      output.page = output.totalPages;
    } else {
      output.page = page;
    }

    //頁碼處理:(目的地頁 前後各留兩個頁碼)
    (function (page, totalPages, prevNum) {
      let beginPage, endPage;
      if (totalPages <= prevNum * 2 + 1) {
        beginPage = 1;
        endPage = totalPages;
      } else if (page - 1 < prevNum) {
        beginPage = 1;
        endPage = prevNum * 2 + 1;
      } else if (totalPages - page < prevNum) {
        beginPage = totalPages - (prevNum * 2 + 1) + 1;
        endPage = totalPages;
      } else {
        beginPage = page - prevNum;
        endPage = page + prevNum;
      }

      //將開始頁到結束頁作為pages陣列
      for (let i = beginPage; i <= endPage; i++) {
        output.pages.push(i);
      }
    })(page, output.totalPages, 2);

    // rows (設定各種條件篩選)
    let sql = `SELECT * FROM article WHERE 1 `;
    const sql_order_default = ` ORDER BY sid DESC LIMIT ${
      (output.page - 1) * output.perPage
    },${output.perPage}`;
    const sql_order_popular = ` ORDER BY article_clicks DESC LIMIT ${
      (output.page - 1) * output.perPage
    },${output.perPage}`;

    tags ? (sql += tags_set) : sql;
    category ? (sql += category_set) : sql;
    search ? (sql += search_set) : sql;
    sort ? (sql += sql_order_popular) : (sql += sql_order_default); //預設按發表排序為未設置排序(false)

    const [rows] = await db.query(sql);

    // 轉換日期格式
    rows.forEach((element) => {
      element.article_created_at = moment(element.article_created_at).format(
        "YYYY-MM-DD"
      );
    });

    output.rows = rows;
  }
  return output;
}

//article list(R)
router.get("/", async (req, res) => {
  const output = await getListData(req);
  const rows = output.rows;
  const pages = output.pages;
  res.json([rows, pages, output]); //分別取得rows,pages陣列json以及totalPages(finalPage)
  // res.json(await getListData(req));
});

//article detail(R)
router.get("/:sid?", async (req, res) => {
  const sql = "SELECT * FROM article WHERE sid=?";
  const [results] = await db.query(sql, [req.params.sid]);

  const sql_pre = "SELECT * FROM article WHERE sid<? ORDER BY sid DESC LIMIT 1"; //default(ASEC)
  const [pre] = await db.query(sql_pre, [req.params.sid]);
  if (pre.length) {
    results[0].pre_sid = pre[0].sid;
    results[0].pre_title = pre[0].article_title;
  } else {
    results[0].pre_sid = 0;
  }
  // pre.length ? (results[0].pre_sid = pre[0].sid) : 0;
  const sql_next = "SELECT * FROM article WHERE sid>? LIMIT 1";
  const [next] = await db.query(sql_next, [req.params.sid]);

  if (next.length) {
    results[0].next_sid = next[0].sid;
    results[0].next_title = next[0].article_title;
  } else {
    results[0].next_sid = 0;
  }
  // next.length ? (results[0].next_sid = next[0].sid) : 0;
  // res.json(results[0]);
  // console.log(results);
  res.send(results);
});

//article add(C)
router.post("/add", upload_module.none(), async (req, res) => {
  const data = { ...req.body };
  const sql = `INSERT INTO \`article\` set ?`;
  const [{ affectedRows, insertId }] = await db.query(sql, [data]);

  res.json({
    //success:aff->1,fail:aff->0
    success: !!affectedRows,
    affectedRows,
    insertId,
  });
});

//article edit(U)
router.get("/edit/:sid", async (req, res) => {
  const sql = "SELECT * FROM article WHERE sid=?";

  const [results] = await db.query(sql, [req.params.sid]);
  if (!results.length) return res.redirect("/article/list");

  res.json(results[0]);
});

router.post("/edit/:sid", upload_module.none(), async (req, res) => {
  const data = { ...req.body };
  const sql = "UPDATE `article` SET ? WHERE `sid` =?";
  const [{ affectedRows, changedRows }] = await db.query(sql, [
    data,
    req.params.sid,
  ]);

  res.json({
    success: !!changedRows,
    affectedRows,
    changedRows,
  });
});

//article delete(D)
router.delete("/delete/:sid", async (req, res) => {
  const sql = "DELETE FROM `article` WHERE `sid`=?";
  const [results] = await db.query(sql, [req.params.sid]);

  res.json(results);
});

// app.use('/:sid/comment', require(__dirname + '/article_comment'));

module.exports = router;
