const express = require("express");
const router = express.Router();
const pool = require("../db/conn");

// Add Customer
router.post("/", async (req, res, next) => {
  console.log(req.body);
  const addQuery = `INSERT INTO project_customers (project_id, customer_id, flag) VALUES ("${req.body.project_id}","${req.body.customer_id}","1")`;
  try {
    let results = await pool.query(addQuery, (err, rows, fields) => {
      if (err) {
        // res.send(err);
        res.send("An error occured while processing your request");
      }

      console.log(rows);
      res.json(rows);
      const est_Query = `UPDATE project_estimates_new SET client='${req.body.customer_id}' WHERE project_id = ${req.body.project_id}`;
      const UpdatEstimate = pool.query(est_Query, (err, rows, fields) => {
        if (err) {
          // res.send(err);
          res.send("An error occured while processing your request");
        }
        console.log("estimate updated");
      });
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// view customer according to project id
router.get("/", async (req, res, next) => {
  // const getOne = `SELECT c.name, c.id FROM customers as c, project_customers as pc where pc.customer_id=c.id`;
  const query = `SELECT pc.project_id AS project_id, c.name AS customer_name
    FROM project_customers pc
    JOIN customers c ON pc.customer_id = c.id`;
  // console.log(req.params.id);
  try {
    let results = await pool.query(query, (err, rows, fields) => {
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
});

// Get all customer names and id from table "customers"
router.get("/view", async (req, res, next) => {
  // const getOne = `SELECT c.name, c.id FROM customers as c, project_customers as pc where pc.customer_id=c.id`;
  const getOne = `SELECT c.name, c.id FROM customers as c`;
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
});

// Get data with specific id
router.get("/view/:id", async (req, res, next) => {
  console.log(req.params);
  const getOne = `SELECT c.name, pc.id FROM project_customers AS pc, customers AS c where c.id = pc.customer_id and pc.project_id=${req.params.id} and pc.flag=1`;
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
});

// Get data with specific id
router.get("/contact/view/:id", async (req, res, next) => {
  console.log(req.params);
  const getOne = `SELECT c.firstname, c.lastname, pc.id FROM project_customers AS pc, customer_contacts AS c where c.customer_id = pc.customer_id and pc.project_id=${req.params.id} and pc.flag=1`;
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
});

// Get data with specific id
router.post("/contact/", async (req, res, next) => {
  console.log(req.params);
  const getOne = `insert into customer_contacts (customer_id, customer_contact_id, project_id) VALUES ("${req.body.customer_id}", "${req.body.customer_contact_id}","${req.body.project_id}")`;
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
});

// Get data with specific id
router.put("/update/:id", async (req, res, next) => {
  console.log(req.params);
  // const getOne = `UPDATE project_customers SET customer_id='${req.body.customer_id}' WHERE id="${req.params.id}" AND project_id="${req.body.project_id}"`;
  const getOne = `UPDATE project_customers SET customer_id='${req.body.customer_id}' WHERE project_id="${req.body.project_id}"`;
  // console.log(req.params.id);
  try {
    let results = await pool.query(getOne, (err, rows, fields) => {
      if (err) {
        res.send(err);
        // res.send("An error processing your request");
      }
      // res.json(rows);
      res.send("updated");
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Delete Customer
router.delete("/delete/:id", async (req, res, next) => {
  const deleteOne = `DELETE FROM project_customers WHERE id=${req.params.id}`;
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
});

module.exports = router;
