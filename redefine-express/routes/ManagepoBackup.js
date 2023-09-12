const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require('../db/conn')




// // Get PO status

// router.get('/view-status/:id', async (req, res, next) => {
//     const getAll = `SELECT purchase_order FROM projects WHERE id=${req.params.id}`;
//     console.log(req.params.id);
//     try {
//         let results = await pool.query(getAll, (err, rows, fields) => {
//             if (err) {
//                 // res.send(err);
//                 res.send("An error processing your request");
//             }
//             res.json(rows);
//         });
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// })





// // Get all Updated POs

// // router.get('/view', async (req, res, next) => {
// //     const getAll = `SELECT purchase_order, created_on, start_date, likely_end_date, actual_end_date, status, status_comments, bde, pm_user_id, director_rating, pe_user_id, expected_revenue, total_po_value, margin, billing_status, billed_amount, payment_status, amount_received, amount_outstanding, target_value, target_achieved, comments_value, team_lead, created, flag, modified FROM projects WHERE 1`;
// //         console.log(req.params.id);
// //         try {
// //             let results = await pool.query(getAll, (err, rows, fields) => {
// //                 if (err) {
// //                     // res.send(err);
// //                     res.send("An error processing your request");
// //                 }
// //                 res.json(rows);
// //             });
// //         } catch (e) {
// //             console.log(e);
// //             res.sendStatus(500);
// //         }
// //     })



// Upload File

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'poFiles');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + path.extname(file.originalname))
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


// Add Vendors to Project
router.post('/', upload.single('file'), (req, res, next) => {
    const date = Date.now();
    const file_uri = `poFiles/${req.file.filename}`;


    const addQuery = `INSERT INTO project_files (project_id, name, uri, type, size, created, user_id, flag) VALUES ("${req.body.project_id}","${req.file.filename}","${file_uri}", "quotation", "${req.file.size}", "${date}", "5", "${req.body.flag}")`;

    let results = pool.query(addQuery, (err, rows, fields) => {
        if (err) {
            // console.log(err);
            // res.send(err);
            res.send("An error occured while processing your request");
        }

        res.send("added");
        const selectId = pool.query(`SELECT id FROM project_files WHERE project_id="${req.body.project_id}" AND type="po"`, (err, rows, fields) => {
            let fileId = rows[0].id;
            // console.log(fileId);
            // pool.query(`UPDATE project_purchase_orders SET project_file_id = "${fileId}" WHERE id=${req.body.project_id}`,(err, rows, fields))
            let insertPOStatus = pool.query(`UPDATE project SET purchase_order = ${req.body.purchase_order} WHERE id = ${req.body.project_id}`);
            let insertAllPoData = `INSERT INTO project_purchase_orders (project_id, number, project_file_id, value, date, user_id) VALUES ("${req.body.project_id}", "${req.body.number}", "${project_file_id}", "${req.body.value}", "${date}", "5")`
            try {


                let results = pool.query(insertAllPoData, (err, rows, fields) => {
                    if (err) {
                        res.send(err);
                        // res.send("An error occured while processing your request");
                    }
                    // res.json(rows);
                    res.send("added");
                });
            } catch (e) {
                console.log(e);
                res.sendStatus(500);
            }



        })


    })


})



//     // Get data with specific id
//     // router.get('/view/:id', async (req, res, next) => {
//     // const getOne = `SELECT * FROM project_cities WHERE id=${req.params.id}`;
//     //     console.log(req.params.id);
//     //     try {
//     //         let results = await pool.query(getOne, (err, rows, fields) => {
//     //             if (err) {
//     //                 // res.send(err);
//     //                 res.send("An error processing your request");
//     //             }
//     //             res.json(rows);
//     //         });
//     //     } catch (e) {
//     //         console.log(e);
//     //         res.sendStatus(500);
//     //     }
//     // })


//     // // Delete city
//     // router.delete('/delete/:id', async (req, res, next) => {
//     //     const deleteOne = `DELETE FROM project_cities WHERE id=${req.params.id}`;
//     //         console.log(req.params.id);
//     //         try {
//     //             let results = await pool.query(deleteOne, (err, rows, fields) => {
//     //                 if (err) {
//     //                     // res.send(err);
//     //                     res.send("An error processing your request");
//     //                 }
//     //                 res.json(rows);
//     //             });
//     //         } catch (e) {
//     //             console.log(e);
//     //             res.sendStatus(500);
//     //         }
//     //     })
















router.post('/', upload.single('file'), async (req, res) => {
    const file_uri = `uploadFiles/${req.file.filename}`;
    const date = Date.now();
    console.log(req.body);
    console.log(req.file);





    // Insert file query
    const addQuery = `INSERT INTO project_files (project_id, name, uri, type, size, created, user_id, flag) VALUES ("${req.body.project_id}","${req.file.filename}","${file_uri}", "${req.body.file_type}", "${req.file.size}", "${date}", "5", "1")`;
    // const getQuery = `SELECT * FROM project_files WHERE project_id = ${req.body.project_id} AND type = "${req.body.file_type}"`;
    try {

        // 1) Insert the file
        let results = await pool.query(addQuery, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.send(err);
                // res.send("An error occured while processing your request");
            }
            else {
                console.log(fields)
                console.log(rows)
                console.log("check " + rows.length)
                // 2) select all the files with same type under same project
                const getQuery = `SELECT * FROM project_files WHERE project_id = ${req.body.project_id} AND type = "${req.body.file_type}"`;
                pool.query(getQuery, (err, rows, fields) => {
                    if (rows.length > 1) {
                        rows.forEach((item, index) => {
                            // 3) Update flag = 1 to flag = 0 in that particular row
                            pool.query(`UPDATE project_files SET flag = "0" where id="${item.id}"`);
                            console.log(item);
                        })
                    }
                })
                
            }


            // res.json(rows);
            res.send("added");
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})















    module.exports = router;