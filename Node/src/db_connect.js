require("dotenv").config();
const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  // host: "localhost",
  // user: "jl55661688",
  // password: "iouccc19931107",
  // database: "mfee09_project",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,

  // kenji
  host: "localhost",
  user: "root",
  password: "",
  database: "mfee09_project",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

// const pool = mysql2.createPool({
//   host: "localhost",
//   user: "jl55661688",
//   password: "iouccc19931107",
//   database: "mfee09_project",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,

  // kenji
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "mfee09_project",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,

  //reckie
  host: "localhost",
  user: "root",
  password: "",
  database: "mfee09_project",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
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
