const express = require("express");
const moment = require("moment-timezone");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const db = require(__dirname + "/../db_connect2");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const upload2 = require(__dirname + "/../upload-img-module-sa");
const config = {
  service: "gmail",
  auth: {
    user: "podcasttest168@gmail.com",
    pass: "qczvlimepkriuith",
  },
};
const transporter = nodemailer.createTransport(config);

router.post("/login", async (req, res) => {
  const output = {
    body: req.body,
    success: false,
  };
  const sql =
    "SELECT `sid`, `account`, `nickname`,`profile_picture` FROM `members` WHERE account=? AND password=?";

  const [rs] = await db.query(sql, [req.body.account, req.body.password]);

  if (rs.length) {
    output.success = true;

    // output.token={...rs[0]};

    output.token = jwt.sign({ ...rs[0] }, process.env.TOKEN_SECRET);
  }

  res.json(output);
});

router.post("/accountcheck", async (req, res) => {
  const output = {
    body: req.body,
    repeat: false,
    message: "no-repeat",
  };
  const account = req.body.account;

  const sql = "SELECT * FROM `members` WHERE `account`=?";
  const [rs] = await db.query(sql, [account]);
  if (!rs.length) {
    res.json(output);
  } else {
    output.repeat = true;
    output.message = "有重複請重新輸入";
    res.json(output);
  }
});

router.post("/register", async (req, res) => {
  const output = {
    body: req.body,
    success: false,
    message: "",
  };

  const account = req.body.account;
  const password = req.body.password;
  const nickname = req.body.nickname;

  const uuid = uuidv4();

  // const uuid2 = uuid;
  //將註冊內容寫入sql

  const sql =
    "INSERT INTO `members`(`account`, `password`, `nickname`,`hashcode`) VALUES (?,?,?,?)";

  const [{ affectedRows }] = await db.query(sql, [
    account,
    password,
    nickname,
    uuid,
  ]);

  console.log;
  if (!!affectedRows) {
    output.success = true;
    output.message = "新增成功";
  } else {
    output.message = "新增失敗";
  }
  //根據hashcode寄信透過verify開通
  const verify_mail = "http://localhost:5566/member/verify?hash=";
  const url = verify_mail + uuid;

  let mailOptions = {
    // 發件人
    from: "podcasttest168@gmail.com",
    // 主題
    subject: "soundar驗證信", //郵箱主題
    // 收件人
    to: account, //前臺傳過來的郵箱
    // 郵件內容，HTML格式
    // http://localhost:5566/member/verify?hash=
    // text: "用" + code + "作為你的驗證碼", //傳送驗證碼
    text: `請點選${url}完成驗證`, //傳送驗證碼
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      output.message2 = "郵件無法成功發出去，請確認郵件格式是否正確";
      console.log(error);
    } else {
      output.success2 = true;
      output.message2 = "已成功發送密碼重置信件，請查看信箱";
      console.log("Email sent: " + info.response);
      console.log("output", output);
    }
  });

  res.json(output);
});

router.post("/passwordchange", async (req, res) => {
  const output = {
    body: req.body,
    success: false,
    message: "",
  };
  const sid = req.body.sid;

  const password = req.body.password;

  const sql = " UPDATE `members` SET `password`=? WHERE `sid`=?";

  const [{ affectedRows, changedRows }] = await db.query(sql, [password, sid]);

  if (!!changedRows) {
    output.success = true;
    output.message = "修改成功";
  } else {
    output.message = "修改失敗";
  }

  res.json(output);
});
//jwt解碼並回傳
router.post("/jwt", (req, res) => {
  // req.body.token

  // console.log("token",req.body.token)
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function (
    error,
    payload
  ) {
    if (error) {
      res.json({ error: error });
    } else {
      res.json(payload);
    }
  });
});
//開通會員驗證
router.get("/verify", async (req, res) => {
  const hash = req.query.hash;

  const sql = " UPDATE `members` SET `verify`=1 WHERE `hashcode`=?";

  const [{ affectedRows, changedRows }] = await db.query(sql, [hash]);
  const go_back_react = `http://localhost:3000?hash=${hash}`;

  // res.json({
  //   success: !!changedRows,
  //   affectedRows,
  //   changedRows,
  // });

  res.redirect(go_back_react);

  // 6c4bc44b-93d2-4ee3-a977-dcfd7e9fcf87
});
//信箱點完驗證後，導回node->redirect回react
router.get("/reset", async (req, res) => {
  const hash = req.query.hash;

  const sql =
    "SELECT `sid`, `account`, `nickname`,`profile_picture` FROM `members` WHERE `hashcode`=? ";

  const [rs] = await db.query(sql, [hash]);

  const reset_password = "http://localhost:3000/passwordreset?jwt=";

  const token = jwt.sign({ ...rs[0] }, process.env.TOKEN_SECRET);

  const url = reset_password + token;

  res.redirect(url);
});

router.post("/getmember", async (req, res) => {
  // console.log("sid", req.body.sid);
  const output = {};
  const sid = req.body.sid;
  const sql =
    "SELECT `profile_picture`,`account`,`name` ,`nickname`,`gender`,`birthday`,`phone`,`address`,`payingmember`,`podcaster`FROM `members` WHERE `sid`=?";
  const [rs] = await db.query(sql, [sid]);
  output.rs = { ...rs[0] };
  if (output.rs.birthday) {
    const birthday = output.rs.birthday;
    output.rs.birthday = moment(birthday).format("YYYY-MM-DD");
  }
  res.json(output);
});

router.post("/updatemember", async (req, res) => {
  const output = {
    body: req.body,
    success: false,
    message: "",
  };

  // name nickname gender birthday phone address podcaster payingmember sid
  name = req.body.name;
  nickname = req.body.nickname;
  gender = req.body.gender;
  birthday = req.body.birthday;
  phone = req.body.phone;
  address = req.body.address;
  podcaster = req.body.podcaster;
  payingmember = req.body.payingmember;
  sid = req.body.sid;

  console.log("podcaster", podcaster);
  console.log("payingmember", payingmember);

  const sql =
    "UPDATE `members` SET `name`=?,`nickname`=?,`gender`=?,`birthday`=?,`phone`=?,`address`=?,`podcaster`=?,`payingmember`=? WHERE sid=?";

  const [{ affectedRows, changedRows }] = await db.query(sql, [
    name,
    nickname,
    gender,
    birthday,
    phone,
    address,
    podcaster,
    payingmember,
    sid,
  ]);

  if (!!changedRows) {
    output.success = true;
    output.message = "修改成功";
  } else {
    output.message = "修改失敗";
  }

  res.json(output);
});

// app.post("/try-upload2", upload2.single("avatar"), (req, res) => {
//   console.log("req", req.body.sid);
//   res.json(req.file);
// });

router.post("/picture-upload", upload2.single("avatar"), async (req, res) => {
  const output = {
    success: false,
    message: "",
  };
  console.log("req", req.body.sid);

  sid = req.body.sid;

  const sql = "UPDATE `members` SET `profile_picture`=? WHERE sid=?";

  const [{ affectedRows, changedRows }] = await db.query(sql, [
    req.file.filename,
    sid,
  ]);

  if (!!changedRows) {
    output.success = true;
    output.message = "修改成功";
  } else {
    output.message = "修改失敗";
  }

  res.json(output);
});

router.post("/picture-jwt", async (req, res) => {
  const output = {
    body: req.body,
    success: false,
  };
  const sid = req.body.sid;
  const sql =
    "SELECT `sid`, `account`, `nickname`,`profile_picture` FROM `members` WHERE  `sid`=?";
  const [rs] = await db.query(sql, [sid]);
  if (rs.length) {
    output.success = true;

    // output.token={...rs[0]};

    output.token = jwt.sign({ ...rs[0] }, process.env.TOKEN_SECRET);

    output.source = { ...rs[0] };
  }
  res.json(output);
});

// r2.forEach((e1) => {
//   e1.birthday2 = moment(e1.birthday2).format("YYYY-MM-DD");
// });

// output.rows = r2;

module.exports = router;
