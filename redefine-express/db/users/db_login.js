const pool = require('../conn')

let chirpdb = {};

// chirpdb.all = () => {
//     return new Promise((resolve, reject) => {
//         pool.query("SELECT * FROM users", (err, result, fields) => {
//                 if(err){
//                     return reject(err);
//                 }
//                 return resolve(result);
//             })
//     })
// }



// Get username & password from database

chirpdb.one = (req) => {
    return new Promise((resolve, reject) => {
        console.log(req.body.username);
        pool.query(`SELECT * FROM users WHERE email=${req.body.username}`, (err, result, fields) => {
            if(err){
                return reject(err);
            }
            // else if(result.password !== req.body.password){
            //     return resolve("Wrong Passsword!!!");
            // }
               else{ 
                return resolve(result);
               }
            })
    })
}
// chirpdb.insert = (data) => {
//     // console.log(names.name1);
//     return new Promise((resolve, reject) => {
//         pool.query(`INSERT INTO users (firstname, lastname, username, password, email, group_id) VALUES ("${data.firstname}","${data.lastname}","${data.username}","${data.password}","${data.email}","${data.group_id}")`, (err, result) => {
//                 if(err){
//                     return reject(err);
//                 }
//                 return resolve(result);
//             })
//     })
// }
// chirpdb.update = (data, id) => {
//     // console.log(names.name1);
//     return new Promise((resolve, reject) => {
//         pool.query(`UPDATE users SET group_id=${data.group_id},firstname=${data.firstname},lastname=${data.lastname},username=${data.username},password=${data.password},email=${data.email} WHERE id=${id}`, (err, result) => {
//                 if(err){
//                     return reject(err);
//                 }
//                 return resolve(result);
//             })
//     })
// }

module.exports = chirpdb;