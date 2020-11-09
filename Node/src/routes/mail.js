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

// router.post("/api/email", async (req, res) => {
//   const output = {
//     body: req.body,
//     success: false,
//     message: "",
//   };

//   let email = req.body.email; //剛剛從前臺傳過來的郵箱
//   let user_name = req.body.user_name; //剛剛從前臺傳過來使用者名稱
//   let code = createSixNum();
//   let date = new Date(); //獲取當前時間

//   let isLive = "no";

//   const sql =
//     "SELECT `sid`, `account`, `code` FROM `membertest` WHERE account=? AND name=?";
//   const [rs] = await db.query(sql, [email, user_name]);
//   if (rs.length) {
//     output.success = false;
//     output.message = "帳號已經存在";
//     res.json(output);
//   } else {
//     output.success = true;
//     output.message = "帳號可行";
//     let mailOptions = {
//       // 發件人
//       from: "podcasttest168@gmail.com",
//       // 主題
//       subject: "接受憑證", //郵箱主題
//       // 收件人
//       to: email, //前臺傳過來的郵箱
//       // 郵件內容，HTML格式
//       text: "用" + code + "作為你的驗證碼", //傳送驗證碼
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     }); //傳送郵件
//   }

//   res.json(req.body);
// });

// router.get("/mailtest1", (req, res) => {
//   res.render("mailtest1", { name: "mic" });
// });

module.exports = router;

// module.exports = function (mail) {
//   transporter.sendMail(mail, function (error, info) {
//     if (error) {
//       return console.log(error);
//     }
//     console.log("mail sent:", info.response);
//   });
// };
