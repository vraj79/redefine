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

router.get('/view/:id', async (req, res, next) => {
    const getAll = `SELECT CONCAT_WS(" ", u.firstname, u.lastname) AS name, po.number, po.id, po.value, po.date FROM users as u, project_purchase_orders as po WHERE project_id="${req.params.id}" and u.id = po.user_id`;
    // console.log(req.params.id);
    try {
        let results = await pool.query(getAll, (err, rows, fields) => {
            if (err) {
                // res.send(err);
                res.send("An error processing your request");
            }
            res.json(rows);
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})


// Post Project data
router.post('/', async (req, res, next) => {
    const createdOn = Date.now();

    const getQuery = `SELECT * FROM project_purchase_orders WHERE project_id = ${req.body.project_id}`;

    const addQuery = `INSERT INTO project_purchase_orders(project_id, number, project_file_id, value, date, created, user_id, flag) VALUES ('${req.body.project_id}','${req.body.number}','${req.body.projectFileId}','${req.body.value}','${req.body.date}','${createdOn}','${req.body.user}','1')`;


    const updateStatusQuery = `UPDATE projects SET purchase_order='${req.body.purchase_order}', modified='${createdOn}' WHERE id=${req.body.project_id}`;

    try {

        // 1) select all the files with same type under same project
        let results = await pool.query(addQuery, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.send(err);
                // res.send("An error occured while processing your request");
            }

            let updateQueries = pool.query(updateStatusQuery, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                    // res.send("An error occured while processing your request");
                }
                res.send("perfect");


                // else {

                // if (rows.length > 0) {
                //     rows.forEach((item, index) => {
                //         // 2) Update flag = 1 to flag = 0 in that particular row
                //         pool.query(`UPDATE project_purchase_orders SET flag = "0" where id="${item.id}"`);
                //         // console.log(item);
                //     })
                //     pool.query(addQuery, (err, rows, fields) => {
                //         pool.query(updateStatusQuery, (err, rows, fields) => {
                //             res.sendStatus(200);

                //         })

                //     });

                // }
                // else {
                //     pool.query(addQuery, (err, rows, fields) => {
                //         res.sendStatus(rows.insertId);
                //     });


                // }

                // }

                // res.json(rows);
            })
            });
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }


    })


// Delete Specific PO

router.delete('/delete/:id', async (req, res, next) => {
    const deleteOne = `DELETE FROM project_purchase_orders WHERE id='${req.params.id}'`;
    console.log(req.params.id);
    try {
        let results = await pool.query(deleteOne, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error processing your request");
            }
            res.json(rows);
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
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




module.exports = router;