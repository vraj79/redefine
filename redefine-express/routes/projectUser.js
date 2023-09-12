const express = require("express");
const router = express.Router();
const pool = require('../db/conn')

// Add Team

router.post('/team', async (req, res, next) => {
    console.log(req.body);
    const addQuery = `INSERT INTO project_access (user_id) VALUES ("${req.body.project_id}","${req.body.manager_id}")`;
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

// Get All team managers

router.get('/team/view', async (req, res, next) => {
    const getOne = `SELECT CONCAT_WS(" ", firstname, lastname) AS name, id FROM users where banned=0 ORDER BY name ASC`;
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


// Get team for specific project


// Get data with specific id
router.get('/team/view/:id', async (req, res, next) => {
    console.log(req.params);
    const getOne = `SELECT CONCAT_WS(" ", u.firstname, u.lastname) AS name, pa.scope, pa.id FROM project_access AS pa, users AS u where u.id = pa.user_id and pa.project_id=${req.params.id}`;
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

// Get data with specific id
router.delete('/delete/:id', async (req, res, next) => {
    console.log(req.params);
    const getOne = `DELETE FROM project_access WHERE id=${req.params.id}`;
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