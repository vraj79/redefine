const express = require("express");
const router = express.Router();
const pool = require('../db/conn')

// Get all cities

router.get('/viewall', async (req, res, next) => {
    console.log(req.body);
    const addQuery = `SELECT id, name FROM cities WHERE flag="1"`;
    try {
        let results = await pool.query(addQuery, (err, rows, fields) => {
            if (err) {
                // res.send(err);
                res.send("An error occured while processing your request");
            }
            // console.log(rows);
            res.json(rows);
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})
// Get cities for a project

router.get('/view/:id', async (req, res, next) => {
    console.log(req.body);
    const addQuery = `SELECT pc.id, c.name, pc.execution_date FROM cities as c, project_cities as pc WHERE pc.project_id = ${req.params.id} and pc.city_id = c.id`;
    try {
        let results = await pool.query(addQuery, (err, rows, fields) => {
            if (err) {
                // res.send(err);
                res.send("An error occured while processing your request");
            }
            // console.log(rows);
            res.json(rows);
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

// Add city

router.post('/', async (req, res, next) => {
    console.log(req.body);
    const addQuery = `INSERT INTO project_cities(project_id, city_id, execution_date, flag) VALUES ('${req.body.project_id}','${req.body.city_id}','${req.body.execution_date}','2')`;
    try {
        let results = await pool.query(addQuery, (err, rows, fields) => {
            if (err) {
                // res.send(err);
                res.send("An error occured while processing your request");
            }
            console.log(rows);
            res.json(rows);
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})


// Delete data with specific id
router.delete('/delete/:id', async (req, res, next) => {
    console.log(req.params);
    const getOne = `DELETE FROM project_cities WHERE id=${req.params.id}`;
    // console.log(req.params.id);
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



module.exports = router;