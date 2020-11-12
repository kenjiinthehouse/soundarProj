require("dotenv").config();
const mysql2 = require("mysql2");

const pool = mysql2.createPool({
<<<<<<< HEAD
  // host: "localhost",
  // user: "jl55661688",
  // password: "iouccc19931107",
  // database: "mfee09_project",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
<<<<<<< HEAD
<<<<<<< HEAD

  // kenji
  host: "localhost",
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
  database: "mfee09_project",
>>>>>>> 9b50b81... chieh1112
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  // kenji
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "mfee09_project",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,

  //reckie
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "mfee09_project",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
=======
>>>>>>> 8cedc1b... 新增product api 搜尋、排序、篩選、分類
=======

  //reckie
  host: "localhost",
  user: "root",
  password: "",
  database: "mfee09_project",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
>>>>>>> 4f4744f... 新增product 篩選搜尋分類 react
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
