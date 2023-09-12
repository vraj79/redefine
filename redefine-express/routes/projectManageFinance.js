const express = require("express");
const router = express.Router();
const pool = require('../db/conn')


// Update data with specific id
router.put('/update/:id', async (req, res, next) => {
    const myquery = `UPDATE projects SET  billing_status='${req.body.billing_status}',quotation='${req.body.quotation}' WHERE id=${req.params.id}`

    try {
        pool.query(myquery, (err) => {
            if (err) {
                return res.send({error:err});
            }
            res.json({success:true,msg:"Finance updated"})
        });
    } catch (e) {
        console.log(e);
        res.json({error:e});
    }
})

module.exports = router;