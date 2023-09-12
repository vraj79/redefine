const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud")
const pool = require('../db/conn')

// Get data
router.get('/view', async (req, res, next) => {
    console.log("here", req.params.id);
    let getQuery = `SELECT * FROM privileges where flag=1`;
    try {
        let results = await pool.query(getQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
            }
            res.json(rows);
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

// Get data
router.get('/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT * FROM privileges where flag=1 and id=${req.params.id}`;
    try {
        let results = await pool.query(getQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
            }
            res.json(rows);
        });
    } catch (e) {
        console.log(e);
        res.send({error:e});
    }
})



// ===========  Group Privilege ============

// Get group data
router.get('/group/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT privilege_id as privilege FROM privileges_groups where group_id=${req.params.id}`;
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

router.put('/group/update/:id', async (req, res, next) => {
console.log(req.body[0].privilege);
console.log(req.params.id, "here");
    // var SelectedData = await pool.query(`SELECT privilege_id as privilege FROM privileges_groups where group_id=${req.params.id}`)

    let updateQuery = `update privileges_groups set privilege_id='${req.body.privilege}' where group_id=${req.params.id}`;

    let insertQuery = `INSERT INTO privileges_groups(privilege_id, group_id) VALUES ('${req.body.privilege}', '${req.body.id}')`;

    // let mixedQuery = `INSERT INTO privileges_groups (privilege_id, group_id) VALUES('${req.body[i].privilege}','${req.params.id}') ON DUPLICATE KEY UPDATE privilege_id='${req.body[i].privilege}'`;

    var arraylength = req.body.length;
    try {
        req.body.forEach((s, index) =>{
            // var SelectedData = pool.query(`SELECT privilege_id as privilege, id FROM privileges_groups where group_id=${req.params.id}`, (err, rows, fields) => {
            //     if(rows){

            //     }

            // });
            console.log("req.body[i].privilege", s.privilege);
            let results = pool.query(`INSERT INTO privileges_groups (privilege_id, group_id) VALUES('${s.privilege}','${req.params.id}') ON DUPLICATE KEY UPDATE privilege_id='${s.privilege}'`, (err, rows, fields) => {
                if (err) {
                    res.send(err);
                    // res.send("An error occured while processing your request");
                }
                console.log("got it")
            });
        })
        
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})


// ===========  Group Privilege ============


// Update data with specific id
router.post('/', async (req, res, next) => {


    let insertQuery = `INSERT INTO privileges(name, slug, description) VALUES ('${req.body.name}', '${req.body.slug}', '${req.body.description}')`;

    try {
        let results = await pool.query(insertQuery, (err) => {
            if (err) {
                // res.send(err);
                res.send("An error occured while processing your request");
            }
            res.json({success:true,msg:"Group added successfully"})
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})

// Update data with specific id
router.put('/update/:id', async (req, res, next) => {


    let insertQuery = `update privileges set name='${req.body.name}', slug='${req.body.slug}', description='${req.body.description}' where id=${req.params.id}`;

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



// Flag data with specific id
router.put('/delete/:id', async (req, res, next) => {


    let insertQuery = `update privileges set flag='2' where id=${req.params.id}`;

    try {
        let results = await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                // res.send(err);
                res.send("An error occured while processing your request");
            }
            // res.json(rows);
            res.send("deleted");
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})


// Delete - Delete is not working because of Key constraints
router.delete('/delete/:id', async (req, res, next) => {

    const myquery = `Delete from privileges WHERE id=${req.params.id}`

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