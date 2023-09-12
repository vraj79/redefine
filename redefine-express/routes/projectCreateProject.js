const express = require("express");
const router = express.Router();
const pool = require('../db/conn')

// 1) Project Info
// 2) Select Customer - Should be skippable
// - Select a customer 
// Options would be
// a) Dropdown for customer selection
// b) 3 buttons - skip, submit & add another Customer
// 3) Select Department and Project Access Level (Team)

// Add Basic Info from step - 1
// router.post('/info', async (req, res, next) => {
//     console.log("req");

//     const PId = await pool.query(`SELECT id FROM projects ORDER BY id DESC LIMIT 0, 1`, (err, rows, fields) => {
//         if (err) {
//             // res.send(err);
//             console.log(err);
//             res.send("An error occured while processing your request");
//         }
//         else {
//         // let code = new Date().getFullYear();
//         let pid = rows[0].id + 1;
//         // just to add data 2023
//         // let pid = req.body.code;
//         // let newpid = rows[0].id + 1;
//         // let created_on = Date.now();


//         // {
//         //     "category": "internal",
//         //     "project_classification": "1",
//         //     "customer_id": "3",
//         //     "title": "Example",
//         //     "description": "description",
//         //     "quotation": "30000",
//         //     "start_date": "16055433",
//         //     "likely_end_date": "16055453",
//         //     "status": "Yet to Start",
//         //     "expected_revenue": "10000"
//         //   }

//         let monthArray = ["jan", "feb", "mar", "apr", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"]
//         let code = new Date().getFullYear();
//         let month = new Date().getMonth();
//         let created_on = Date.now();
//         let eid = rows[0].id + 1;
//         console.log(`${pid}_rmpl_${monthArray[month]}_${code}_${eid}`);
//         let estimate_no = `${pid}_rmpl_${monthArray[month]}_${code}_${eid}`;




//         const addQuery = `INSERT INTO projects(code, category, project_classification, title, description, quotation_price, start_date, likely_end_date, actual_end_date, status, expected_revenue, created, flag, nickname) VALUES ('${pid}_del_${code}','${req.body.category}', '${req.body.project_classification}', '${req.body.title}', '${req.body.description}', '${req.body.quotation_price}', '${req.body.start_date}', '${req.body.likely_end_date}', '${req.body.actual_end_date}', '${req.body.status}', '${req.body.expected_revenue}', '0', '${0}', 'null')`;

//             const InsertData = pool.query(addQuery, (err, rows, fields) => {
//                 if (err) {
//                     res.send(err);
//                     console.log(err);
//                     // res.send("An error occured while processing your request again");
//                 }

//                 else {
//                     // just to add data 2023
//                     // res.json(newpid);
//                     res.json(pid);
//                     let est_Query = pool.query(`SELECT id FROM project_estimates_new ORDER BY id DESC LIMIT 0, 1`, (err, rows, fields) => {
//                         if(err){
//                             console.log(err);
//                         }
//                         let eid = rows[0].id + 1;
//                         const estimateQuery = `INSERT INTO project_estimates_new(project_id, estimate_no, created_by, flag) VALUES ('${pid}','${estimate_no}', '51', '0')`
//                        const ImportQuery =  pool.query(estimateQuery, (err, rows, fields) => {
//                         if(err){
//                             console.log(err);
//                         }
//                         else {
//                             console.log("estimate Imported");
//                         }
//                        })

//                     })
//                 }
//             })


//         }

//     })

// })

router.post("/info", async (req, res, next) => {
  try {
    pool.query(
      `SELECT id FROM projects ORDER BY id DESC LIMIT 0, 1`,
      (firtsErr, firstRows) => {
        if (firtsErr) {
          return res.send({ error: firtsErr });
        }
        if (firstRows.length === 0) {
          return res
            .status(500)
            .send("An error occurred while processing your request");
        }

        let code = new Date().getFullYear();
        const project_id = firstRows[0].id + 1;
        const addQuery = `
        INSERT INTO projects (code, category, project_classification, title, description, quotation_price, start_date, likely_end_date, actual_end_date, status, expected_revenue, created, flag, nickname)
        VALUES ('${project_id}_del_${code}', '${req.body.category}', '${req.body.project_classification}', '${req.body.title}', '${req.body.description}', '${req.body.quotation_price}', '${req.body.start_date}', '${req.body.likely_end_date}', '${req.body.actual_end_date}', '${req.body.status}', '${req.body.expected_revenue}', '0', '0', 'null')
      `;

        pool.query(addQuery, (secErr, insertingProject) => {
          if (secErr) {
            return res.send({ error: secErr });
          }
          console.log(insertingProject);
          if (insertingProject.affectedRows === 0) {
            return res
              .status(500)
              .send("An error occurred while processing your request");
          }

          return res.send({
            success: true,
            msg: "Project added successfully",
            project_id,
          });
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while processing your request");
  }
});
  



// Update Basic Info

// Add Basic Info from step - 1
router.put('/updateinfo/:id', async (req, res, next) => {
    console.log("req");

    const PId = await pool.query(`SELECT id FROM projects ORDER BY id DESC LIMIT 0, 1`, (err, rows, fields) => {
        if (err) {
            // res.send(err);
            res.send("An error occured while processing your request");
        }
        else {
        let code = new Date().getFullYear();
        let pid = rows[0].id + 1;
        let created_on = Date.now();


        const updateQuery = `update projects set category='${req.body.category}', project_classification='${req.body.project_classification}', title='${req.body.title}', description='${req.body.description}', quotation='${req.body.quotation}', start_date='${req.body.start_date}', likely_end_date='${req.body.likely_end_date}', expected_revenue='${req.body.expected_revenue}', modified="0", flag='2' where id=${req.params.id}`;

            const UpdateData = pool.query(updateQuery, (err, rows, fields) => {
                if (err) {
                    res.send(err);
                    console.log(err);
                    // res.send("An error occured while processing your request again");
                }

                else {
                    res.json(pid);
                    let est_Query = pool.query(`SELECT id FROM project_estimates_new ORDER BY id DESC LIMIT 0, 1`, (err, rows, fields) => {
                        if(err){
                            console.log(err);
                        }
                        let eid = rows[0].id + 1;
                        const estimateQuery = `INSERT INTO project_estimates_new(project_id, estimate_no, created_on, created_by, flag) VALUES ('${pid}','${pid}_rmpl_nov_2022_${code}_${eid}', '0', '51', '0')`
                       const ImportQuery =  pool.query(estimateQuery, (err, rows, fields) => {
                        if(err){
                            console.log(err);
                        }
                        else {
                            console.log("estimate Imported");
                        }
                       })

                    })
                }
            })


        }

    })

})

// Add Customer

// Add Basic Info from step - 1
router.put('/saveproject/:id', async (req, res, next) => {
    console.log("req");

    const updateQuery = `UPDATE projects SET flag='2' WHERE id=${req.params.id}`;

    const PId = await pool.query(updateQuery, (err, rows, fields) => {
        if (err) {
            // res.send(err);
            res.send("An error occured while processing your request");
        }
        else {
        // let code = new Date().getFullYear();
        // let pid = rows[0].id + 1;
        // let created_on = Date.now();
        res.send("perfect");
        }


        // {
        //     "category": "internal",
        //     "project_classification": "1",
        //     "customer_id": "3",
        //     "title": "Example",
        //     "description": "description",
        //     "quotation": "30000",
        //     "start_date": "16055433",
        //     "likely_end_date": "16055453",
        //     "status": "Yet to Start",
        //     "expected_revenue": "10000"
        //   }


        // const addQuery = `INSERT INTO projects(code, category, project_classification, title, description, quotation, start_date, likely_end_date, status, expected_revenue, created, flag) VALUES ('${pid}_del_${code}','${req.body.category}', '${req.body.project_classification}', '${req.body.title}', '${req.body.description}', '${req.body.quotation}', '${req.body.start_date}', '${req.body.likely_end_date}', '${req.body.status}', '${req.body.expected_revenue}', '${created_on}', '${0}')`;

        //     const InsertData = pool.query(addQuery, (err, rows, fields) => {
        //         if (err) {
        //             res.send(err);
        //             console.log(err);
        //             // res.send("An error occured while processing your request again");
        //         }

        //         else {
        //             res.json(pid);
        //         }
        //     })


        // }

    })

})


// Add Team

router.post('/team', async (req, res, next) => {
    console.log(req.body);
    const addQuery = `INSERT INTO project_access (project_id, user_id, scope) VALUES ("${req.body.project_id}","${req.body.manager_id}","${req.body.scope}")`;
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



// Edit Team 

// router.post('/team', async (req, res, next) => {
//     console.log(req.body);
//     const addQuery = `INSERT INTO project_access (project_id, user_id) VALUES ("${req.body.project_id}","${req.body.manager_id}")`;
//     try {
//         let results = await pool.query(addQuery, (err, rows, fields) => {
//             if (err) {
//                 // res.send(err);
//                 res.send("An error occured while processing your request");
//             }
//             console.log(rows);
//             res.json(rows);
//         });
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// })


// pe.estimate_no AS estimate_no, 

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
router.get('/name/id', async (req, res, next) => {
    const getOne=`SELECT
    CONCAT(users.firstname, ' ', users.lastname) AS name,
    project_access.project_id
FROM
    project_access
JOIN
    users ON project_access.user_id = users.id;
`
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
router.get('/team/view/:id', async (req, res, next) => {
    const getOne=`SELECT pa.user_id, CONCAT_WS(" ", u.firstname, u.lastname) AS name
    FROM project_access AS pa
    JOIN users AS u ON u.id = pa.user_id
    WHERE pa.project_id = ${req.params.id};`
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