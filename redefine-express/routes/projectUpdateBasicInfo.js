const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud")
const pool = require('../db/conn')


// Get data with specific id
router.get('/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    try {
        let results = await pool.query(`SELECT * FROM projects WHERE id=${req.params.id}`, (err, rows, fields) => {
            if (err) {
                // res.send(err);
                res.send("An error processing your request");
            }
            // res.send("rows");
            console.log("rows");
            res.json(rows);
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})





// Update data with specific id
router.put('/update/:id', async (req, res, next) => {

    const myquery = `UPDATE projects SET category='${req.body.category}', project_classification='${req.body.project_classification}', title='${req.body.title}', description='${req.body.description}', quotation='${req.body.quotation}', start_date='${req.body.start_date}', actual_end_date='${req.body.actual_end_date}', expected_revenue='${req.body.expected_revenue}', status='${req.body.status}', quotation_price='${req.body.quotation_price}', purchase_order='${req.body.purchase_order}' WHERE id=${req.params.id}`;

    try {
        pool.query(myquery, (err, rows, fields) => {
            if (err) {
                return res.json({error:err});
            }
            res.json({success:true,msg:"Project updated"})
        });
    } catch (e) {
        console.log(e);
        res.send({error:e});
    }
})

module.exports = router;