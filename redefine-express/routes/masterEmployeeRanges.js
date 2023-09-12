const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud")
const pool = require('../db/conn')

// Get data
router.get('/view', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT id, name FROM employee_ranges where flag=1`;
    try {
        let results = await pool.query(getQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error processing your request");
            }
            // res.send("rows");
            // console.log("rows");
            res.json(rows);
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})

// Get data
router.get('/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery =`SELECT name FROM employee_ranges where flag=1 and id=${req.params.id}`;
    try {
        let results = await pool.query(getQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error processing your request");
            }
            // res.send("rows");
            // console.log("rows");
            res.json(rows);
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})


// Update data with specific id
router.post('/', async (req, res, next) => {


    let insertQuery = `INSERT INTO employee_ranges(name) VALUES ('${req.body.name}')`;

    try {
        let results = await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                // res.send(err);
                res.send("An error occured while processing your request");
            }
            // res.json(rows);
            res.send("updated");
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})

// Update data with specific id
router.put('/update/:id', async (req, res, next) => {


    let insertQuery = `update employee_ranges set name='${req.body.name}' where id=${req.params.id}`;

    try {
        let results = await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                // res.send(err);
                res.send("An error occured while processing your request");
            }
            // res.json(rows);
            res.send("updated");
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})




// Delete Service
router.delete('/delete/:id', async (req, res, next) => {

    const myquery = `Delete from employee_ranges WHERE id=${req.params.id}`

    try {
        let results = await pool.query(myquery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error occured while processing your request");
            }
            // res.json(rows);
            res.send("deleted");
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})

module.exports = router;