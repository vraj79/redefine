const express = require("express");
const router = express.Router();
const db = require("../db/users/dbaccounting")
const pool = require('../db/conn')

// Get all data
router.get('/view', async (req,res) => {
    try {
        let results = await pool.query('SELECT * FROM users WHERE group_id="1"', (err, rows, fields) => {
            if(!err){
                // console.log("err");
                // console.log(rows);
                res.json(rows);
            }
            else{
                console.log(err);
            }

        });
        // res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

// Get data with specific id
router.get('/:id', async (req,res,next) => {
    try {
        let results = await db.one(req.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

// 
router.get('/:id', async (req,res,next) => {
    try {
        let results = await db.one(req.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})
router.post('/create', async (req,res,next) => {
    try {
        let results = await db.insert(req.body);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})
router.post('/update/:id', async (req,res,next) => {
    try {
        let results = await db.update(req.body);
        res.send('id: ' + req.params.id);
        res.json(results);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
})

module.exports = router;