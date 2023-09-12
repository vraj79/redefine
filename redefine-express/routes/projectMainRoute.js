const express = require("express");
const router = express.Router();
const pool = require("../db/conn");

// // get data according to group id
router.get("/data/:id", async (req, res) => {
  const { id } = req.params;

  if (id == 1 || id == 10 || id == 11 || id == 14) {
    const getQuery = "SELECT * FROM projects ORDER BY id DESC";

    pool.query(getQuery, (err, rows) => {
      if (err) {
        return res.send({ error: err });
      }
      return res.send({ success: true, projects: rows });
    });
  } else {
    const getQuery = `SELECT project_id FROM project_access WHERE user_id = ${id}`;

    pool.query(getQuery, (err, rows) => {
      if (err) {
        return res.send({ error: err });
      }

      const projectIds = rows.map((row) => row.project_id);
      const projectsQuery = `SELECT * FROM projects WHERE id IN (${projectIds.join(
        ","
      )}) ORDER BY id DESC`; // Change the query to add ORDER BY

      pool.query(projectsQuery, (err, rows) => {
        if (err) {
          return res.send({ error: err });
        }
        return res.send({ success: true, projects: rows });
      });
    });
  }
});

// Get title of one project by id
router.get("/view/:id", async (req, res) => {
  try {
    const query = `SELECT title FROM projects WHERE id=${req.params.id}`;

    let results = await pool.query(query, (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Get all data
router.get("/view2", async (req, res) => {
  try {
    // const query = `SELECT p.id, p.code, p.title, p.status, u.firstname, u.lastname, c.name
    //  FROM projects AS p, project_access AS pa, users AS u, project_customers AS pc, customers as c
    //  WHERE pa.user_id = u.id AND p.id = pc.project_id AND p.id = pa.project_id AND c.id = pc.customer_id order by p.id desc`;
    const query = `SELECT p.id, p.code, p.title, p.status FROM projects AS p order by p.id desc`;
    // const query = `SELECT p.id, p.code, p.title, p.status, u.firstname, u.lastname, c.name FROM projects AS p LEFT JOIN project_customers AS pc ON p.id=pc.project_id LEFT JOIN customers as c ON c.id=pc.customer_id LEFT JOIN project_access AS pa ON p.id = pa.project_id LEFT JOIN users AS u ON pa.user_id = u.id ORDER BY p.id DESC;`
    //  select u.firstname, u.lastname FROM projects AS p, project_access AS pa, users AS u WHERE pa.scope = 'manager' AND pa.user_id = u.id AND p.id = pa.project_id AND p.id = "3155";

    console.log("Perfect new query");
    let results = await pool.query(query, (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Get all data
router.get("/view", async (req, res) => {
  try {
    const query = `SELECT p.id, p.code, p.title, p.quotation, p.status, CONCAT_WS(" ", u.firstname, u.lastname) as user, c.name as customer,  CONCAT_WS(" ", cc.firstname, cc.lastname) as contact, p.billing_status, cit.name as city, p.payment_status, p.purchase_order, p.start_date, p.actual_end_date
         FROM projects AS p, project_access AS pa, users AS u, project_customers AS pc, project_contacts as pcc, customers as c, customer_contacts as cc, project_cities as pcity, cities as cit 
         WHERE pa.scope = 'owner' AND pa.user_id = u.id AND p.id = pc.project_id AND p.id = pa.project_id AND c.id = pc.customer_id  AND cc.id=pcc.customer_contact_id AND pcc.project_customer_id = pc.id AND pcity.project_id = p.id AND cit.id = pcity.city_id order by id desc`;
    //  select u.firstname, u.lastname FROM projects AS p, project_access AS pa, users AS u WHERE pa.scope = 'manager' AND pa.user_id = u.id AND p.id = pa.project_id AND p.id = "3155";

    // res.send("Perfect");
    let results = await pool.query(query, (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
// Get all data
router.post("/filter-view", async (req, res) => {
  // purchase_order , date
  // payment_status
  // var arr = ["billingStatus", "customer_contact_id", "projectCity", "projectExecutive", "projectPayment", "projectStatus"]
  try {
    var myquery = "";
    var myarr = {
      project_status: "p",
      billing_status: "p",
      po_status: "p",
      project_payment: "p",
      customer_contact_id: "pcc",
      city_id: "pcity",
      projectExecutive: "",
      user_id: "u",
      purchase_order: "p",
      customer_id: "c",
    };
    console.log(Object.keys(req.body.filterVal).length);
    for (var i = 0; i < Object.keys(req.body.filterVal).length; i++) {
      console.log(Object.keys(req.body.filterVal)[i]);
      var Key = Object.keys(req.body.filterVal)[i];
      console.log(req.body.filterVal[Key]);

      Value.forEach((val, index) => {
        console.log(Value.length);
        if (
          Key != "projectExecutive" &&
          Key != "customer_contact_id" &&
          Key != "city_id" &&
          Key != "user_id"
        ) {
          console.log("index", index);
          console.log("outerlength", Object.keys(req.body.filterVal).length);
          console.log("outerlength", "i", i);
          // index != Value.length-1
          myquery +=
            index == Value.length - 1
              ? ` ${myarr[Key]}.${Key}=${val.id} AND`
              : ` ${myarr[Key]}.${Key}=${val.id} OR`;
          // myquery += (i == Object.keys(req.body.filterVal).length - 1 && index == Value.length-1) ? `${myarr[Key]}.${Key}=${val.id}` : (index == Value.length-1) ? `${myarr[Key]}.${Key}=${val.id} AND ` :`${myarr[Key]}.${Key}=${val.id} OR `;
        }
      });
    }
    // myquery.pop();
    // myquery = myquery.split(0, myquery.lastIndexOf('AND'));
    // console.log("specchar", myquery);
    // console.log(myquery.split('AND')[1] == []);
    console.log(myquery);
    // req.body.filterVal.forEach(val => {
    //     console.log(val);
    //     console.log(val.length);

    //     // for(var i=0; i<val.length; i++){
    //     //     console.log(val);
    //     // }
    // })

    // SELECT p.id, p.code, p.title, p.status, CONCAT_WS(" ", u.firstname, u.lastname) as user, c.name as customer FROM projects AS p, project_access AS pa, users AS u, project_customers AS pc, project_contacts as pcc, customers as c, customer_contacts as cc, project_cities as pcity, cities as cit WHERE (p.project_status="1" OR p.project_status="5") AND p.billing_status=1 AND p.project_payment=1 AND p.po_status="awaited" AND c.id=313

    const query = `SELECT p.id, p.code, p.title, p.quotation, p.status, CONCAT_WS(" ", u.firstname, u.lastname) as user, c.name as customer,  CONCAT_WS(" ", cc.firstname, cc.lastname) as contact, p.billing_status, cit.name as city, p.payment_status, p.purchase_order, p.start_date, p.actual_end_date
         FROM projects AS p, project_access AS pa, users AS u, project_customers AS pc, project_contacts as pcc, customers as c, customer_contacts as cc, project_cities as pcity, cities as cit 
         WHERE ${myquery} order by id desc`;
    //  select u.firstname, u.lastname FROM projects AS p, project_access AS pa, users AS u WHERE pa.scope = 'manager' AND pa.user_id = u.id AND p.id = pa.project_id AND p.id = "3155";

    // res.send("Perfect");
    let results = await pool.query(query, (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Get data with specific id
router.get("/:id", async (req, res, next) => {
  console.log(req.params.id);
  try {
    let results = await pool.query(
      `SELECT * FROM projects WHERE id=${req.params.id}`,
      (err, rows, fields) => {
        if (err) {
          // res.send(err);
          res.send("An error processing your request");
        }
        res.json(rows);
      }
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Delete project
router.delete("/delete/:id", async (req, res, next) => {
  const myquery = `Delete from projects WHERE id=${req.params.id}`;

  try {
    let results = await pool.query(myquery, (err, rows, fields) => {
      if (err) {
        res.send(err);
        // res.send("An error occured while processing your request");
      }
      // res.json(rows);
      res.send("deleted");
    });
  } catch (e) {
    // console.log(e);
    res.sendStatus(500);
  }
});

// router.post('/', async (req, res, next) => {
//     try {
//         let results = await db.insert(req.body);
//         res.json(results);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// })

module.exports = router;
