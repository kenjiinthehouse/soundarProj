require("dotenv").config();
const mysql2 = require("mysql2");

const pool = mysql2.createPool({
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0534b02... 統整後調整畫面
  // host: "localhost",
  // user: "jl55661688",
  // password: "iouccc19931107",
  // database: "mfee09_project",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

  // kenji
  host: "localhost",
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  user: "root",
  password: "",
  database: "pd_test",
=======
  user: "chieh",
  password: "chieh",
=======
  user: "root",
  password: "",
>>>>>>> 67393c7... 搬運工/kenji
=======
  user: "root",
  password: "",
>>>>>>> fb78227... Navbar 施工/kenji
=======
  host: "localhost",
  user: "jl55661688",
  password: "iouccc19931107",
>>>>>>> d89c774... 完成未登入提示
=======
  user: "jl55661688",
  password: "iouccc19931107",
>>>>>>> be0d526... 挑整loading位置
=======

  //reckie
  host: "localhost",
  user: "root",
  password: "",
<<<<<<< HEAD
>>>>>>> 0534b02... 統整後調整畫面
  database: "mfee09_project",
>>>>>>> 9b50b81... chieh1112
=======
  database: "pd_test",
>>>>>>> 9098e52... 統整調整2
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  // kenji
=======
>>>>>>> 29142c5... 整合product 錄音室、活動分類
=======
>>>>>>> cfc7970... ripple css/navbar member collapese
  // host: "localhost",
  // user: "jl55661688",
  // password: "iouccc19931107",
  // database: "mfee09_project",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,

  // kenji
<<<<<<< HEAD
=======
  host: "localhost",
  user: "root",
  password: "",
  database: "mfee09_project",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  //reckie
>>>>>>> cfc7970... ripple css/navbar member collapese
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "mfee09_project",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
<<<<<<< HEAD
=======
>>>>>>> 8cedc1b... 新增product api 搜尋、排序、篩選、分類
=======
=======
>>>>>>> 29142c5... 整合product 錄音室、活動分類

  //reckie
=======
>>>>>>> 84c7c5d... 完成節目收藏同步 (尚未有功能)
  host: "localhost",
  user: "chieh",
  password: "chieh",
  database: "mfee09_project",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 4f4744f... 新增product 篩選搜尋分類 react
=======
>>>>>>> 29142c5... 整合product 錄音室、活動分類
=======

  //reckie
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "mfee09_project",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
>>>>>>> 84c7c5d... 完成節目收藏同步 (尚未有功能)
});

// const pool = mysql2.createPool({
//   host: "localhost",
//   user: "jl55661688",
//   password: "iouccc19931107",
//   database: "mfee09_project",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// const pool = mysql2.createPool({
//   host: "localhost",
//   user: "root",
//   password: "admin",
//   database: "mfee0902",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });
// const pool = mysql2.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

module.exports = pool.promise();
