require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const db = require(__dirname + "/db_connect");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//reckie區
app.use('/products',require(__dirname + '/routes/products'));

//sa區
app.use("/mail", require(__dirname + "/routes/mail"));
app.use("/google", require(__dirname + "/routes/google"));
app.use("/member", require(__dirname + "/routes/member"));
app.use("/member_collection", require(__dirname + "/routes/member_collection"));

//Ruby區
app.use("/coupon", require(__dirname + "/routes/coupon-api").router);
app.use("/order", require(__dirname + "/routes/order-api"));
app.use("/comment", require(__dirname + "/routes/comment-api"));

//Jen 區
//article
app.use("/article", require(__dirname + "/routes/article"));
//article-comment
app.use("/article/comment", require(__dirname + "/routes/article_comment"));

//尚潔區
app.use("/activity", require(__dirname + "/routes/activity"));
app.use("/studio", require(__dirname + "/routes/studio"));
app.use("/ticket_order", require(__dirname + "/routes/ticket_order"));
app.use("/rent_order", require(__dirname + "/routes/rent_order"));

//小杰區
app.use(
  "/podcaster_dashboard",
  require(__dirname + "/routes/podcaster_dashboard")
);
app.use("/explore", require(__dirname + "/routes/explore"));

// kenji 區留言板
app.use('/msg', require(__dirname + '/routes/msgBoard'));


app.get("/", function (req, res) {
  res.send("已開啟express");
});

app.get("/try-db", (req, res) => {
  db.query("SELECT * FROM products LIMIT 5").then(([results]) => {
    res.json(results);
  });
});

app.use(express.static(__dirname + "/../public/"));

app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404-找不到網頁");
});

app.listen(5566, function () {
  console.log("啟動 server 偵聽埠號 5566");
});
