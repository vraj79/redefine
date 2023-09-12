const express = require("express");
const router = express.Router();
const pool = require('../db/conn')


// Update data with specific id
router.put('/update/:id', async (req, res, next) => {
    console.log(req.params.id);

    const myquery = `UPDATE projects SET status='${req.body.status}', status_comments='${req.body.status_comments}' WHERE id=${req.params.id}`


    try {
        let results = await pool.query(myquery, (err, rows, fields) => {
            if (err) {
                // res.send(err);
                res.send("An error occured while processing your request");
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