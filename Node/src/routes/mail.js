const express = require("express");
const nodemailer = require("nodemailer");
const db = require(__dirname + "/../db_connect2");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const config = {
  service: "gmail",
  auth: {
    user: "podcasttest168@gmail.com",
    pass: "qczvlimepkriuith",
  },
};

const transporter = nodemailer.createTransport(config);

router.get("/", (req, res) => {
  // res.send("address-book");
  res.redirect("/mailtest1");
});

router.post("/passwordreset", async (req, res) => {
  const output = {
    body: req.body,
    success: false,
    message: "",
  };

  const mail = req.body.mail;

  const sql = "SELECT * FROM `members` WHERE account=?";

  const [rs] = await db.query(sql, [mail]);

  if (!rs.length) {
    output.message = "您輸入的信箱尚未註冊，請重新輸入";
    res.json(output);
  } else {
    const reset_mail = "http://localhost:5566/member/reset?hash=";

    const hash = rs[0].hashcode;

    let url = "";

    url = reset_mail + hash;

    let mailOptions = {
      // 發件人
      from: "podcasttest168@gmail.com",
      // 主題
      subject: "soundar密碼重置", //郵箱主題
      // 收件人
      to: mail, //前臺傳過來的郵箱
      // 郵件內容，HTML格式
      // http://localhost:5566/member/verify?hash=
      // text: "用" + code + "作為你的驗證碼", //傳送驗證碼
      text: `請點選${url}重新設定密碼`, //傳送驗證碼
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        output.message = "郵件無法成功發出去，請確認郵件格式是否正確";
        console.log(error);
      } else {
        output.success = true;
        output.message = "已成功發送密碼重置信件，請查看信箱";
        console.log("Email sent: " + info.response);
        console.log("output", output);
        res.json(output);
      }
    });
  }
});

router.post("/emailcheck", async (req, res) => {
  // SELECT* FROM `admins` WHERE account="Null"
  // uuid1: uuidv4(),

  const output = {
    body: req.body,
    success: false,
    message: "",
  };

  const mail = req.body.mail;

  let code = uuidv4();

  const sql = "SELECT* FROM `members` WHERE account=?";

  const [rs] = await db.query(sql, [mail]);

  const verify_mail = "http://localhost:5566/member/verify?hash=";

  // const hash = rs[0].hashcode;

  console.log("email", mail);

  console.log("rs:", rs);

  if (!rs.length) {
    output.message = "您輸入的信箱尚未註冊，請重新輸入";
    res.json(output);
  } else {
    const hash = rs[0].hashcode;
    url = verify_mail + hash;
    let mailOptions = {
      // 發件人
      from: "podcasttest168@gmail.com",
      // 主題
      subject: "soundar驗證信", //郵箱主題
      // 收件人
      to: mail, //前臺傳過來的郵箱
      // 郵件內容，HTML格式
      // http://localhost:5566/member/verify?hash=
      // text: "用" + code + "作為你的驗證碼", //傳送驗證碼
      text: `請點選${url}完成驗證`, //傳送驗證碼
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        output.message = "郵件無法成功發出去，請確認郵件格式是否正確";
        console.log(error);
      } else {
        output.success = true;
        output.message = "已成功發送驗證碼，請查看信箱";
        console.log("Email sent: " + info.response);
        console.log("output", output);
        res.json(output);
      }
    });
    console.log("output2", output);
    // res.json(output);
  }

  // res.json(output);
});

//activity

router.post("/activitymail", async (req, res) => {
  const output = {
    body: req.body,
    success: false,
    message: "",
  };

  const account = req.body.account;

  let mailOptions = {
    // 發件人
    from: "podcasttest168@gmail.com",
    // 主題
    subject: "soundar訂單確認", //郵箱主題
    // 收件人
    to: account,
    text: `\t訂單編號：20201120001T0001F \n
    \t訂單項目：跟上影音新浪潮｜Podcast企劃+影音內容+影音行銷 \n
    \t訂單方案：早鳥票 \n
    \t訂單數量：1張 \n
    \t訂單金額：TWD$4000 \n
    \t取票方式：台灣全家 FamiPort 取票 \n
    \t付款方式：ATM 虛擬帳號 \n
    \t銀行帳號：(808)9555831823044820 \n
    \t本虛擬帳號僅對應到您的報名資料，請勿重複轉入到同一帳號 \n
    \t分行名稱：玉山銀行營業部 \n
    \t帳戶名稱：Soundar娛樂股份有限公司 \n
    \t請於24小時內完成轉帳，如超過時限，系統將會取消您的訂單。\n
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      output.message = "郵件無法成功發出去，請確認郵件格式是否正確";
      console.log(error);
      res.json(output);
    } else {
      output.success = true;
      output.message = "已成功發送活動訂單，請查看信箱";
      console.log("Email sent: " + info.response);
      console.log("output", output);
      res.json(output);
    }
  });
});

module.exports = router;