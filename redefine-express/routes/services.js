const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud")
const pool = require('../db/conn')





// ============ RATE CARDS ===============

// Get data 
// router.get('/ratecard/view/:id', async (req, res, next) => {
//     console.log(req.params.id);
//     let getQuery = `SELECT r.element, r.description, r.rate_type, r.rate, s.name, r.client_id, r.name as nid FROM services as s, service_rate_cards as r WHERE r.name = s.id and s.flag = "1" and r.id = ${req.params.id}`;
//     try {
//         let results = await pool.query(getQuery, (err, rows, fields) => {
//             if (err) {
//                 res.send(err);
//                 // res.send("An error processing your request");
//             }
//             // res.send("rows");
//             console.log("rows");
//             res.json(rows);
//         });
//     } catch (e) {
//         // console.log(e);
//         res.sendStatus(500);
//     }
// })



// // Get data 
router.get('/ratecards/view', async (req, res, next) => {
    try {
        const selectQuery = 'SELECT * FROM service_rate_cards';

        await pool.query(selectQuery, (err, rows, fields) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: err });
            } else {
                res.json(rows);
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e });
    }
});

// router.get('/ratecard/view', async (req, res, next) => {
//     console.log(req.params.id);
//     // let getQuery = `SELECT r.id, r.element, r.description, r.rate_type, c.name as client, r.rate, s.name FROM services as s, customers as c, service_rate_cards as r WHERE r.name = s.id and s.flag = "1" and r.client_id = c.id`;
//     let getQuery = `SELECT r.id, r.element, r.description, r.rate_type, r.rate, s.name FROM services as s, service_rate_cards as r WHERE r.name = s.id and s.flag = "1"`;
//     let insertQuery = `INSERT INTO service_rate_cards(name, element, description, rate_type, rate) VALUES ('${req.body.service_name}', '${req.body.element}', '${req.body.description}', '${req.body.rate_type}', '${req.body.rate}')`;
//     try {
//         let results = await pool.query(getQuery, (err, rows, fields) => {
//             if (err) {
//                 res.send(err);
//                 // res.send("An error processing your request");
//             }
//             // res.send("rows");
//             console.log("rows");
//             res.json(rows);
//         });
//     } catch (e) {
//         // console.log(e);
//         res.sendStatus(500);
//     }
// })



// update Rate Card
// router.put('/ratecard/update/:id', async (req, res, next) => {
//     console.log(req.params.id);
//     let insertQuery = `update service_rate_cards set name='${req.body.nid}', element='${req.body.element}', description='${req.body.description}', rate_type='${req.body.rate_type}', rate='${req.body.rate}' where id=${req.params.id}`;

//     try {
//         let results = await pool.query(insertQuery, (err, rows, fields) => {
//             if (err) {
//                 res.send(err);
//                 // res.send("An error processing your request");
//             }
//             // res.send("rows");
//             console.log("rows");
//             res.json(rows);
//         });
//     } catch (e) {
//         // console.log(e);
//         res.sendStatus(500);
//     }
// })



// Create Rate Card


router.post('/ratecard', async (req, res, next) => {
    try {
        const insertQuery = `INSERT INTO service_rate_cards(name, client_id, element, description, rate_type, rate) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [req.body.name, req.body.client_id, req.body.element, req.body.description, req.body.rate_type, req.body.rate];

        await pool.query(insertQuery, values, (err, rows) => {
            if (err) {
                console.error(err);
                return res.json({ error: err });
            } else {
                console.log("Inserted rows:", rows);
                res.json(rows);
            }
        });
    } catch (e) {
        console.error(e);
        res.json({ error: e });
    }
});

// get rate card with particular id
router.get('/ratecard/view/:id', async (req, res, next) => {
    const rateCardId = req.params.id;

    try {
        const selectQuery = `SELECT * FROM service_rate_cards WHERE id = ${rateCardId}`;
        pool.query(selectQuery,(err,rows)=>{
            if(err){
                return res.status(500).json({ error: err });
            }
            res.json({success:true,service_rate_card:rows[0]})
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: error });
    }
});


// update rate card
router.put('/ratecard/update/:id', async (req, res, next) => {
    const rateCardId = req.params.id;
    const { name, client_id, element, description, rate_type, rate } = req.body;

    try {
        const updateQuery = `UPDATE service_rate_cards SET name = ?, client_id = ?, element = ?, description = ?, rate_type = ?, rate = ? WHERE id = ?`;
        const values = [name, client_id, element, description, rate_type, rate, rateCardId];

        pool.query(updateQuery,values,(err,result)=>{

            if (err) {
                return res.json({ error:err });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Rate card not found' });
            }
            res.json({ success:true,msg: 'Rate card updated successfully' });
        });

    } catch (e) {
        console.error(e);
        res.json({ error: e });
    }
});

// delete rate card
router.delete("/ratecard/delete/:id",(req,res)=>{
    try {
        const delQuery=`DELETE FROM service_rate_cards WHERE id=${req.params.id}`;

        const result=pool.query(delQuery,(err,delRow)=>{
            if(err){
                return res.send({error:e})
            }
            if(delRow.affectedRows==1){
                res.send({success:true,msg:"Service Rate Card Deleted!"});
            }
        });
    } catch (error) {
        console.log(error);
        res.send({error})
    }
})






// Get data with specific id
router.get('/view', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT id, name FROM services WHERE flag = "1"`;
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


// post data
router.post('/', async (req, res, next) => {
    let insertQuery = `INSERT INTO services(name, parent, flag) VALUES ('${req.body.name}', '0', '1')`;

    try {
        await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                res.json({error:err})
            }
            res.json({success:true,msg:"Service added successfully"})
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})

// get data with specific id
router.get('/view/:id', async (req, res, next) => {


    let insertQuery = `select name from services where id=${req.params.id}`;

    try {
        let results = await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                // res.send(err);
                res.send("An error occured while processing your request");
            }
            res.json(rows);
            // res.send("updated");
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})

// Update data with specific id
router.put('/update/:id', async (req, res, next) => {


    let insertQuery = `update services set name='${req.body.name}' where id=${req.params.id}`;

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

    const myquery = `Delete from services WHERE id=${req.params.id}`

    try {
        let results = await pool.query(myquery, (err, delRow, fields) => {
            if (err) {
                res.json({error:err});
            }
            if(delRow.affectedRows==1){
                res.json({success:true,msg:"Service Deleted Successfully"});
            }
        });
    } catch (e) {
        res.json({error:e})
    }
})

module.exports = router;