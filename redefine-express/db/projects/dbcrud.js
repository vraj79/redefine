// const pool = require('../conn')

// let chirpdb = {};

// chirpdb.all = () => {
//     return new Promise((resolve, reject) => {
//         pool.query("SELECT * FROM projects_info", (err, result, fields) => {
//                 if(err){
//                     return reject(err);
//                 }
//                 return resolve(result);
//             })
//     })
// }

// chirpdb.one = (id) => {
//     return new Promise((resolve, reject) => {
//         pool.query(`SELECT * FROM projects where id = ?`, [id] , (err, result, fields) => {
//                 if(err){
//                     return reject(err);
//                 }
//                 return resolve(result);
//             })
//     })
// }
// chirpdb.insert = (names) => {
//     // console.log(names.name1);
//     return new Promise((resolve, reject) => {
//         pool.query(`INSERT INTO projects_info (Project_title, Project_description) VALUES ("${names.name1}","${names.name2}")`, (err, result) => {
//                 if(err){
//                     return reject(err);
//                 }
//                 return resolve(result);
//             })
//     })
// }

// module.exports = chirpdb;