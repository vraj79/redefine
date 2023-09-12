const express = require("express");
const router = express.Router();
const pool = require('../db/conn')


// Insert data to client Interaction table
router.post('/', async (req, res, next) => {
    const addQuery = `INSERT INTO project_interactions(project_id, user_id, date, type, notes, interaction) VALUES ('${req.body.project_id}','${req.body.user}','${req.body.date}','${req.body.type}','${req.body.notes}','${req.body.interaction}')`;
   
    try {
        console.log("entered upto here");

        let results = await pool.query(addQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error occured while processing your request");
            }
            // res.json(rows);
            res.send("added");
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

// Get data with specific id
router.get('/view/:id', async (req, res, next) => {
const getOne = `SELECT CONCAT_WS(" ", u.firstname, u.lastname) AS name, p.id, p.date, p.type, p.notes, p.interaction FROM users as u, project_interactions as p WHERE p.project_id=${req.params.id} and u.id = p.user_id`;
    console.log(req.params.id);
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


// Delete city
router.delete('/delete/:id', async (req, res, next) => {
    const deleteOne = `DELETE FROM project_interactions WHERE id=${req.params.id}`;
        console.log(req.params.id);
        try {
            let results = await pool.query(deleteOne, (err, rows, fields) => {
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






// Update data with specific id
// router.put('/update/:id', async (req, res, next) => {
//     console.log(req.params.id);

//     const myquery = `UPDATE projects SET project_classification='${req.body.project_classification}', title='${req.body.project_title}',description='${req.body.project_description}',quotation='${req.body.quotation}',start_date='${req.body.start_date}',actual_end_date='${req.body.end_date}',status='${req.body.status}' WHERE id=${req.params.id}`


//     try {
//         let results = await pool.query(myquery, (err, rows, fields) => {
//             if (err) {
//                 // res.send(err);
//                 res.send("An error occured while processing your request");
//             }
//             // res.json(rows);
//             res.send("updated");
//         });
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// })

module.exports = router;