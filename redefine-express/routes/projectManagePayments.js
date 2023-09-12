const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require('../db/conn')




// // Get all Updated payments

router.get('/view/:id', async (req, res, next) => {
    const getAll = `SELECT  CONCAT_WS(" ", u.firstname, u.lastname) AS name, p.id, p.payment_amount, p.date, p.comments FROM project_payments as p, users as u WHERE project_id="${req.params.id}" and u.id = p.user_id`;
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



// Post / insert payment info
router.post('/', async (req, res, next) => {
    const createdOn = Date.now();

    const addQuery = `INSERT INTO project_payments(project_id, payment_amount, date, comments, created, user_id, flag) VALUES ('${req.body.project_id}','${req.body.amount}','${req.body.date}','${req.body.comments}','${createdOn}','${req.body.user}','1')`;


    try {

        // 1) select all the files with same type under same project
        let results = await pool.query(addQuery, (err, rows, fields) => {
            if (err) {
                console.log(err);
                res.send(err);
                // res.send("An error occured while processing your request");
            }
            res.send("added");

            // res.json(rows);
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }


})




// Delete Payment Info
router.delete('/delete/:id', async (req, res, next) => {
    const deleteOne = `DELETE FROM project_payments WHERE id=${req.params.id}`;
    console.log(req.params.id);
    try {
        let results = await pool.query(deleteOne, (err, rows, fields) => {
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




module.exports = router;