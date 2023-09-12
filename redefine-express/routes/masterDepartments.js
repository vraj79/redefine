const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud")
const pool = require('../db/conn')

// Get data
router.get("/view", async (req, res, next) => {
  try {
    const departmentsData = await new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM departments`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const groupsData = await new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM \`groups\``, (err, result) => {
        // Use backticks around 'groups'
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.send({ departmentsData, groupsData });
  } catch (error) {
    res.send({
      error: error.message || "An error occurred while fetching data.",
    });
  }
});



// get data with manager name
router.get("/view/:id", async (req, res, next) => {
  try {
    const departmentData = await new Promise((resolve, reject) => {
      const query = `
      SELECT d.id, d.name AS name, d.slug,d.manager_group_id, g.name AS group_name, d.mandatory
      FROM departments d
      LEFT JOIN \`groups\` g ON d.manager_group_id = g.id WHERE d.id=${req.params.id}
      `;
      
      pool.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.send({ departmentData });
  } catch (error) {
    res.send({ error: error.message || 'An error occurred while fetching data.' });
  }
});

// Get data
// router.get('/view/:id', async (req, res, next) => {
//     console.log(req.params.id);
//     let getQuery = `SELECT d.name, d.slug, d.mandatory, d.manager_group_id as manager FROM departments as d, groups as g where d.flag=1 and g.id = d.manager_group_id and d.id=${req.params.id}`;
//     try {
//         let results = await pool.query(getQuery, (err, rows, fields) => {
//             if (err) {
//                 res.send(err);
//                 // res.send("An error processing your request");
//             }
//             // res.send("rows");
//             // console.log("rows");
//             res.json(rows);
//         });
//     } catch (e) {
//         // console.log(e);
//         res.sendStatus(500);
//     }
// })

// Update data with specific id
router.post("/", async (req, res, next) => {
  let insertQuery = `INSERT INTO departments(name, slug, mandatory, manager_group_id) VALUES ('${req.body.name}', '${req.body.slug}', '${req.body.mandatory}', '${req.body.manager}')`;

  try {
    let results = await pool.query(insertQuery, (err, rows) => {
      if (err) {
        return res.send({
          error: err || "An error occurred while posting data.",
        });
      }
      if (rows.affectedRows === 1) {
        res.send({ success: true, msg: "Department Created Successfully" });
      }
    });
  } catch (e) {
    console.log(e);
    res.send({
      error: error.message || "An error occurred while posting data.",
    });
  }
});

// Update data with specific id
router.put("/update/:id", async (req, res) => {
  let insertQuery = `update departments set name='${req.body.name}', slug='${req.body.slug}', mandatory='${req.body.mandatory}', manager_group_id='${req.body.manager_group_id}' where id=${req.params.id}`;

  try {
    pool.query(insertQuery, (err, rows) => {
      if (err) {
        return res.send({
          error: err || "An error occurred while updating data.",
        });
      }
      if (rows.affectedRows === 1) {
        res.send({ success: true, msg: "Department Updated Successfully" });
      }
    });
  } catch (e) {
    console.log(e);
    res.send({
      error: error.message || "An error occurred while updating data.",
    });
  }
});




// Delete Service
router.delete("/delete/:id", async (req, res, next) => {
  const myquery = `Delete from departments WHERE id=${req.params.id}`;

  try {
    pool.query(myquery, (err, rows) => {
      if (err) {
        return res.send({
          error: err || "An error occurred while deleting data.",
        });
      }
      if (rows.affectedRows === 1) {
        res.send({ success: true, msg: "Department Deleted Successfully" });
      }
    });
  } catch (e) {
    console.log(e);
    res.send({
      error: error.message || "An error occurred while deleting data.",
    });
  }
});

module.exports = router;