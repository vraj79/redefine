const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud");
const pool = require("../db/conn");

// Get data
router.get("/view", async (req, res, next) => {
  console.log(req.params.id);
  let getQuery = `SELECT * FROM notifications`;
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
});

// post notifications
router.post("/", (req, res) => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const customDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  console.log(customDateTimeString);

  let insertQuery = `INSERT INTO notifications(title, subtitle, path, timestamp) VALUES ('${req.body.title}', '${req.body.subtitle}', '${req.body.path}', '${customDateTimeString}')`;

  try {
    pool.query(insertQuery, (firstErr, insertedRow) => {
      if (firstErr) {
        return res.send({ error: firstErr });
      }
      if (insertedRow.affectedRows === 1) {
        pool.query(`SELECT * FROM notifications`, (secErr, rows) => {
          if (secErr) {
            return res.send({ error: secErr });
          }
          res.json(rows);
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});

// Delete Notification
router.delete("/delete/:id", async (req, res, next) => {
  const myQuery = `DELETE from notifications WHERE id=${req.params.id}`;

  try {
    pool.query(myQuery, (err, rows) => {
      if (err) {
        return res.send({ error: err });
      }
      if (rows.affectedRows === 1) {
        res.send({ success: true, msg: "Notification Deleted" });
      }
    });
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});

module.exports = router;
