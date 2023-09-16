const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud")
const pool = require('../db/conn')

// Get data
router.get('/view', async (req, res, next) => {
    // let getQuery = `SELECT * FROM techvolopy1_db.groups where flag=1`;
    let getQuery = `SELECT * FROM techvolopy1_db.groups`;
    try {
        let results = await pool.query(getQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
            }
            res.status(200).send(rows);
        });
    } catch (e) {
        console.log(e);
        res.status(501).send({error:e})
    }
})

// Get data
router.get('/view/:id', async (req, res, next) => {
    let getQuery = `SELECT * FROM \`groups\` WHERE id=${req.params.id}`;
    try {
        pool.query(getQuery, (err, rows) => {
            if (err) {
                return res.send({errror:err});
            }
            res.json({success:true,groups:rows})
        });
    } catch (e) {
        console.log(e);
        res.json({error:e});
    }
})


// Update data with specific id
router.post('/', async (req, res, next) => {

    let insertQuery = `INSERT INTO \`groups\` (name, slug, level) VALUES ('${req.body.name}', '${req.body.slug}', '${req.body.level}')`;

    try {
        pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                return res.json({error:err})
            }
            res.json({success:true,msg:"Group added"});
        });
    } catch (e) {
        console.log(e);
        res.json({error:e});
    }
})

// Update data with specific id
router.put('/update/:id', async (req, res, next) => {


    let insertQuery = `update \`groups\` set name='${req.body.name}', slug='${req.body.slug}', level='${req.body.level}' where id=${req.params.id}`;

    try {
        pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                return res.json({error:err});
            }
            res.send({success:true,msg:"Group updated"})
        });
    } catch (e) {
        console.log(e);
        res.send({error:e});
    }
})



// // Flag data with specific id
// router.put('/delete/:id', async (req, res, next) => {


//     let insertQuery = `update groups set flag='2' where id=${req.params.id}`;

//     try {
//         let results = await pool.query(insertQuery, (err, rows, fields) => {
//             if (err) {
//                 // res.send(err);
//                 res.send("An error occured while processing your request");
//             }
//             // res.json(rows);
//             res.send("deleted");
//         });
//     } catch (e) {
//         // console.log(e);
//         res.sendStatus(500);
//     }
// })


// Delete - Delete is not working because of Key constraints
router.delete('/delete/:id', async (req, res, next) => {

    const myquery = `DELETE FROM \`groups\` WHERE id=${req.params.id}`;

    try {
        pool.query(myquery, (err) => {
            if (err) {
                return res.json({errro:err});
            }
            res.json({success:true,msg:"Group deleted"})
        });
    } catch (e) {
        console.log(e);
        res.json({error:e});
    }
})

module.exports = router;