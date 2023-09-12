const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud")
const pool = require('../db/conn')


// Get data with specific id
router.get('/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    try {
        let results = await pool.query(`SELECT * FROM project_departments WHERE project_id=${req.params.id}`, (err, rows, fields) => {
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


// Get data with specific id from table departments
router.get('/view', async (req, res, next) => {
    console.log(req.params.id);
    try {
        let results = await pool.query(`SELECT name, id FROM departments where flag=1 ORDER BY name ASC`, (err, rows, fields) => {
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


// Post Data
router.post('/', async (req, res, next) => {
    console.log(req.body);
    const addQuery = `INSERT INTO project_departments (project_id, department_id, status) VALUES ("${req.body.project_id}","${req.body.department_id}","0")`;
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



// Update data with specific id
router.put('/update/:id', async (req, res, next) => {
    console.log(req.params.id);
    const updateQuery = `UPDATE project_departments SET department_id=${req.body.department_id} WHERE project_id=${req.params.id}`;

    try {
        let results = await pool.query(updateQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error occured while processing your request");
            }
            // res.json(rows);
            res.send("updated");
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

module.exports = router;