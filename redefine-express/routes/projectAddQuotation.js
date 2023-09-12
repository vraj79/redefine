const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const pool = require('../db/conn')


// TABLE NAME - PROJECT Files, Project

// Upload File

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'quotationFiles');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const filefilter = (req, file, cb) => {
    const allowedFileTypes = ['imgage/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/xls', 'application/csv', 'image/webp'];
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
    const date = Date.now();
    console.log(req.body);
    console.log(req.file);
    const selectQuery = `SELECT quotation_file_id FROM projects WHERE id=${req.body.project_id}`;
    try {
        let results = await pool.query(selectQuery, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.send(err);
                // res.send("An error occured while processing your request");
            }
            console.log(rows[0].quotation_file_id);
            const file_id = rows[0].quotation_file_id;
            const file_uri = `quotationFiles/${req.file.filename}`;
            if (file_id !== null) {
                const updateQuery = `UPDATE project_files SET name="${req.file.filename}",uri="${file_uri}",size="${req.file.size}",created="${date}",user_id="5",flag="${req.body.flag}" WHERE id = ${file_id}`;
                try {
                    let results = pool.query(updateQuery, (err, rows, fields) => {
                        if (err) {
                            // console.log(err);
                            // res.send(err);
                            res.send("An error occured while processing your request");
                        }
                        // res.json(rows);
                       
                        res.send("added");
                    });
                } catch (e) {
                    console.log(e);
                    res.sendStatus(500);
                }
                // console.log("yes")
            }
            else {
                // console.log("No")
                

                const addQuery = `INSERT INTO project_files (project_id, name, uri, type, size, created, user_id, flag) VALUES ("${req.body.project_id}","${req.file.filename}","${file_uri}", "quotation", "${req.file.size}", "${date}", "5", "${req.body.flag}")`;
                try {
                    let results = pool.query(addQuery, (err, rows, fields) => {
                        if (err) {
                            // console.log(err);
                            // res.send(err);
                            res.send("An error occured while processing your request");
                        }
                       
                        res.send("added");
                        const selectId = pool.query(`SELECT id FROM project_files WHERE project_id="${req.body.project_id}" AND type="quotation"`,(err, rows, fields) => {
                            let fileId = rows[0].id;
                            // console.log(fileId);
                        pool.query(`UPDATE projects SET quotation_file_id = "${fileId}" WHERE id=${req.body.project_id}`,(err, rows, fields))
                        })
                   
                      

                    });
                } catch (e) {
                    console.log(e);
                    res.sendStatus(500);
                }
            }

       
        });
    }
    catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

})



module.exports = router;