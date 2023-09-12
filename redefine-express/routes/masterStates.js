const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud")
const pool = require('../db/conn')

// Get data
router.get('/view', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT s.name as state, s.id, s.iso_code, c.name as country FROM states as s, countries as c where s.flag=1 and c.id = s.country_id`;
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
    let getQuery = `SELECT s.name, s.zone, s.id, s.iso_code, c.id as country FROM states as s, countries as c where s.flag=1 and s.id=${req.params.id}`;
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


    let insertQuery = `INSERT INTO states(name, iso_code, country_id, zone) VALUES ('${req.body.name}', '${req.body.iso_code}', '${req.body.country}', '${req.body.zone}')`;

    try {
        let results = await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error occured while processing your request");
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


    let insertQuery = `update states set name='${req.body.name}', iso_code='${req.body.iso_code}', country_id='${req.body.country}', zone='${req.body.zone}' where id=${req.params.id}`;

    try {
        let results = await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error occured while processing your request");
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

    const myquery = `Delete from states WHERE id=${req.params.id}`

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