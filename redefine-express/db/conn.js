const mysql = require('mysql');

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "techvolopy1_db",
    connectionLimit: 10
});

// const pool = mysql.createPool({
//     host: "51.79.205.255",
//     user: "techvolopy1_usr",
//     password: "G@#2aI6$MpD&GK",
//     database: "techvolopy1_db",
//     connectionLimit: 10
// });

module.exports = pool;