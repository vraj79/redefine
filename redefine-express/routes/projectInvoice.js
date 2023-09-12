const express = require("express");
const router = express.Router();
const pool = require('../db/conn')

const created = Date.now();
// TABLE NAME - PROJECT BILLING

// Add Project Invoice
router.post('/', async (req, res, next) => {
    const addQuery = `INSERT INTO project_billing (project_id, invoice_id, billed_amount, date, user_id, created, flag) VALUES ("${req.body.project_id}","${req.body.invoice_id}","${req.body.billed_amount}", "${req.body.date}", "${req.body.user}", "${created}","1")`;
    const updateQuery = `update projects set billing_status='${req.body.status}' where id='${req.body.project_id}'`;
    try {
        let results = await pool.query(addQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error occured while processing your request");
            }
            // res.json(rows);
            let results = pool.query(updateQuery, (err, rows, fields) => {
                if (err) {
                    res.send(err);
                    // res.send("An error occured while processing your request");
                }
                // res.json(rows);
                res.send("added");
            });
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})



// Get data with specific id
router.get('/view/:id', async (req, res, next) => {
    const getOne = `SELECT CONCAT_WS(" ", u.firstname, u.lastname) AS name, b.id, b.project_id, b.invoice_id, b.billed_amount, b.date, p.billing_status FROM project_billing as b, users as u, projects as p WHERE b.project_id=${req.params.id} and p.id=${req.params.id} and u.id = b.user_id`;
    console.log(req.params.id);
    try {
        let results = await pool.query(getOne, (err, rows, fields) => {
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


// Delete city
router.delete('/delete/:id', async (req, res, next) => {
    const deleteOne = `DELETE FROM project_billing WHERE id=${req.params.id}`;
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






// Update data with specific id
router.put('/update/:id', async (req, res, next) => {
    console.log(req.params.id);

    // const checkquery = `SELECT id FROM project_billing WHERE project_id=${req.params.id}`;

    // pool.query(checkquery, (err, rows, fields) => {
    //     console.log(rows);
    // });

    const myquery = `UPDATE project_billing SET invoice_id='${req.body.number}', billed_amount='${req.body.amount}',date='${req.body.date}' WHERE project_id=${req.params.id}`;



    try {
        let results = await pool.query(myquery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error occured while processing your request");
            }
            // res.json(rows);
            res.send("updated");
            pool.query(`UPDATE projects SET status='${req.body.status}' and id=${req.params.id}`);
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

module.exports = router;