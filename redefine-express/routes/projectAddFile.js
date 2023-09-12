
const { count } = require("console");
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const pool = require('../db/conn')


// TABLE NAME - PROJECT BILLING

// Upload File

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadFiles');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
        // cb(null, Date.now() + path.extname(file.originalname))
    }
})

const filefilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'image/webp'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

const upload = multer({ storage, filefilter })

// Upload file over



// Add Filename to database along with other data







router.post('/', upload.single('file'), async (req, res) => {
    if(req.file==null){
        console.log("no file is given");
        res.send(null);
    }
    else{
    console.log("file is given and trying to get added");
    console.log(req.file);
    const file_uri = `uploadFiles/${req.file.filename}`;
    const date = Date.now();

    // Define all queries and add to separate variables 
    const addQuery = `INSERT INTO project_files (project_id, name, uri, type, size, created, user_id, flag) VALUES ("${req.body.project_id}","${req.file.filename}","${file_uri}", "${req.body.file_type}", "${req.file.size}", "${date}", "5", "${req.body.flag}")`;
    // const getQuery = `SELECT * FROM project_files WHERE project_id = ${req.body.project_id} AND type = "${req.body.file_type}"`;

    try {

                // 1) select all the files with same type under same project
                let results = await pool.query(addQuery, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.send(err);
                // res.send("An error occured while processing your request");
            }
            // else {      
                      
            //             pool.query(addQuery, (err, rows, fields) => {
                        console.log(rows.insertId);
                        res.json(rows.insertId);

                    // });
                    
                // if (rows.length > 0) {
                //     rows.forEach((item, index) => {
                //         // 2) Update flag = 1 to flag = 0 in that particular row
                //         pool.query(`UPDATE project_files SET flag = "0" where id="${item.id}"`);
                //         // console.log(item);
                //     })
                //     pool.query(addQuery, (err, rows, fields) => {
                //         res.sendStatus(rows.insertId);

                //     });

                // }
                // else {
                //     pool.query(addQuery, (err, rows, fields) => {
                //         res.sendStatus(rows.insertId);
                //     });
                    

                // }
                
            // }
            
            // res.json(rows);
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    }
})

module.exports = router;