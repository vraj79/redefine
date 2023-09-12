const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud")
const pool = require('../db/conn')

// Get data
router.get('/view', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT * FROM vendors where flag=1`;
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

// Get data
router.get('/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery =`SELECT * FROM vendors where id=${req.params.id}`;
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

// Update data with specific id
router.post("/", async (req, res, next) => {
  try {
    pool.query(
      `SELECT id FROM vendors ORDER BY id DESC LIMIT 0, 1`,
      (firstErr, rows) => {
        if (firstErr) {
          return res.send({ error: firstErr });
        }
        let cid = 1;
        if (rows.length > 0) {
          cid = rows[0].id + 1;
        }

        // Generate the vendor code
        let code = "Vendor " + cid;

        const currentDate = new Date();
        const createdDate = currentDate
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, "");

        let insertQuery = `INSERT INTO vendors(code, name, contact_name, contact_mobile, email, comments, rating, payment_terms, bank_details,created,modified) VALUES ('${code}','${req.body.name}','${req.body.contact_name}','${req.body.contact_mobile}','${req.body.email}','${req.body.comments}','${req.body.rating}','${req.body.payment_terms}','${req.body.bank_details}','${createdDate}','${createdDate}')`;
        pool.query(insertQuery, (err, insertedRow) => {
          if (err) {
            return res.send({ error: err });
          }
          if (insertedRow.affectedRows === 1) {
            res.json({
              success: true,
              msg: "Vendor added successfuly",
              vendorCode: insertedRow.insertId,
            });
          }
          // res.json(rows);
        });
      }
    );
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});

// Update data with specific id
router.put("/update/:id", async (req, res, next) => {
  let insertQuery = `update vendors set name="${req.body.name}", contact_name="${req.body.contact_name}", email="${req.body.email}", comments="${req.body.comments}", rating="${req.body.rating}", payment_terms="${req.body.payment_terms}", bank_details="${req.body.bank_details}" where id=${req.params.id}`;

  try {
    pool.query(insertQuery, (err, updatedRow) => {
      if (err) {
        return res.send({ error: err });
      }
      if(updatedRow.affectedRows===1){
        res.send({success:true,msg:"Vendor updated successfully"})
      };
    });
  } catch (e) {
    console.log(e);
    res.send({ error: err });
  }
});




// Delete Vendor
router.delete("/delete/:id", async (req, res, next) => {
  const myquery = `Delete from vendors WHERE id=${req.params.id}`;

  try {
    pool.query(myquery, (err, delRow, fields) => {
      if (err) {
        return res.send({ error: err });
      }
      if (delRow.affectedRows === 1) {
        return res.send({ success: true, msg: "Vendor deleted successfully" });
      }
    });
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});

// ===== vendor Branches ======


// Get Branches for particular Vendor
router.get('/branch/viewall/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT v.*, c.name as city FROM vendor_branches as v, cities as c where v.vendor_id=${req.params.id} and c.id=v.city_id`;
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
// Get Branches for particular vendor
router.get('/branch/view/:cid/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery =`SELECT v.*, c.name as city, s.name as state, co.name as country FROM vendor_branches as v, countries as co, states as s, cities as c where v.vendor_id=${req.params.cid} and c.id=v.city_id and s.id=v.state_id and co.id=v.country_id and v.id=${req.params.id}`;
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
        console.log(e);
        res.send({error:e});
    }
})

// Get Branches for particular vendor
router.put('/branch/update/:id', async (req, res, next) => {
    console.log(req.params.id);
    var date = Date.now();
    let updateQuery = `update vendor_branches set type="${req.body.type}", name="${req.body.name}", address_line_1="${req.body.address_line_1}", address_line_2="${req.body.address_line_2}", address_line_3="${req.body.address_line_3}", country_id="${req.body.country_id}", state_id="${req.body.state_id}", city_id="${req.body.city_id}", zipcode="${req.body.zipcode}", phone="${req.body.phone}" where id=${req.params.id}`;

    try {
        let results = await pool.query(updateQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error processing your request");
            }
            // res.send("rows");
            // console.log("rows");
            res.json(rows);
        });
    } catch (e) {
        console.log(e);
        res.send({error:e});
    }
})

router.post("/branch", (req, res) => {
  const currentDate = new Date();
  const date = currentDate.toISOString().slice(0, 10).replace(/-/g, "");

  let insertQuery = `INSERT INTO vendor_branches(type, vendor_id, name, address_line_1, address_line_2, address_line_3, country_id, state_id, city_id, phone, created, zipcode, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  let insertValues = [
    req.body.type,
    req.body.vendor_id,
    req.body.name,
    req.body.address_line_1,
    req.body.address_line_2,
    req.body.address_line_3,
    req.body.country_id,
    req.body.state_id,
    req.body.city_id,
    req.body.phone,
    date,
    req.body.zipcode,
    date,
  ];

  try {
    pool.query(insertQuery, insertValues, (err, insertedRow) => {
      if (err) {
        return res.send({ error: err });
      }
      if (insertedRow.affectedRows === 1) {
        res.send({ success: true, msg: "Vendor Branch Created"});
      }
    });
  } catch (e) {
    console.log(e);
    res.send({ error: e });
  }
});
  

// Delete vendor branches
router.delete("/branch/delete/:id", async (req, res) => {
  const myquery = `DELETE FROM vendor_branches WHERE id=?`;
  const deleteId = req.params.id;

  try {
    let results = await pool.query(myquery, [deleteId]);

    if (results.affectedRows === 0) {
      res.send({ success: false, msg: "Branch not found" });
    } else {
      res.send({ success: true, msg: "Branch deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ error: err });
  }
});
  

// ====================================================================================================
// === vendor Contacts ===


// Get contacts for particular vendor
router.get('/contact/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery =`SELECT v.*, c.name as city FROM vendor_contacts as v, cities as c, vendor_branches as b where v.vendor_id=${req.params.id} and c.id = b.city_id and v.vendor_branch_id=b.id`;
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

// Get contacts for particular vendor
router.get('/contact/view/:cid/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery =`SELECT v.*, c.name as city, d.name as designation_level, vb.name as branch FROM vendor_branches as vb, designation_levels as d, vendor_contacts as v, cities as c, vendor_branches as b where v.vendor_id=${req.params.cid} and v.id=${req.params.id} and c.id = b.city_id and v.vendor_branch_id=b.id and d.id=v.designation_level_id and vb.id = v.vendor_branch_id`;
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


// Update contacts for particular vendor
router.put('/contact/update/:id', async (req, res, next) => {
    console.log(req.params.id);
    let updateQuery = `update vendor_contacts set salutation='${req.body.salutation}', firstname='${req.body.firstname}', lastname='${req.body.lastname}', designation_level_id='${req.body.designation_level_id}', designation='${req.body.designation}', landline_number='${req.body.landline_number}', mobile_number_1='${req.body.mobile_number_1}', mobile_number_2='${req.body.mobile_number_2}', official_email='${req.body.official_email}', personal_email='${req.body.personal_email}', gender='${req.body.gender}' where id=${req.params.id}`;

    try {
        let results = await pool.query(updateQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
            }
            res.json(rows);
        });
    } catch (e) {
        res.sendStatus(500);
    }
})

router.post('/contact/', async (req, res, next) => {
    let insertQuery = `INSERT INTO vendor_contacts(salutation, firstname, lastname,designation_level_id,designation,landline_number,mobile_number_1,mobile_number_2,official_email,department,gender,residential_address, created) VALUES ('${req.body.salutation}', '${req.body.firstname}', '${req.body.lastname},'${req.body.designation_level_id}','${req.body.designation}', '${req.body.landline_number}','${req.body.mobile_number_1}', '${req.body.mobile_number_2}','${req.body.official_email}','${req.body.department}', '${req.body.gender}','${req.body.residential_address}', '${date}')`;

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

router.delete('/contact/:id', async (req, res, next) => {

    const myquery = `Delete from vendor_contacts WHERE id=${req.params.id}`

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
})


// Vendor Services

// ====================================================================================================
// === Customer Contacts ===


// Get contacts for particular Customer
router.get('/services/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT s.name, vs.* FROM vendor_services as vs, services as s where vs.service_id= s.id and vs.vendor_id=${req.params.id}`;
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

router.get('/contact/view/:cid/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT c.id, c.salutation, c.firstname, c.lastname, c.dob, c.designation_level_id, c.designation, c.landline_number, c.mobile_number_1, c.mobile_number_2, c.official_email, c.personal_email, c.department, c.gender, c.residential_address, c.customer_branch_id FROM customer_contacts as c, customer_branches as b where c.id=${req.params.id} and c.customer_id = ${req.params.cid}`;
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



// Update contacts for particular Customer
router.put('/contact/update/:id', async (req, res, next) => {
    let date = Date.now();

    console.log(req.params.id);
    let updateQuery = `update customer_contacts set salutation='${req.body.salutation}', firstname='${req.body.firstname}', lastname='${req.body.lastname}', dob='${req.body.dob}', designation_level_id='${req.body.designation_level_id}', designation='${req.body.designation}', landline_number='${req.body.landline_number}', mobile_number_1='${req.body.mobile_number_1}', mobile_number_2='${req.body.mobile_number_2}', official_email='${req.body.official_email}', department='${req.body.department}', gender='${req.body.gender}', residential_address='${req.body.residential_address}', modifed='${date}', customer_branch_id='${req.body.customer_branch_id}' where id=${req.params.id}`;

    try {
        let results = await pool.query(updateQuery, (err, rows, fields) => {
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


router.post('/contact/', async (req, res, next) => {
    let date = Date.now();

    let insertQuery = `INSERT INTO customer_contacts(salutation, firstname, lastname,dob,designation_level_id,designation,landline_number,mobile_number_1,mobile_number_2,official_email,department,gender,residential_address, created, customer_id, customer_branch_id) VALUES ('${req.body.salutation}', '${req.body.firstname}', '${req.body.lastname}','${req.body.dob}', '${req.body.designation_level_id}','${req.body.designation}', '${req.body.landline_number}','${req.body.mobile_number_1}', '${req.body.mobile_number_2}','${req.body.official_email}','${req.body.department}', '${req.body.gender}','${req.body.residential_address}', '${date}', '${req.body.customer_id}', '${req.body.customer_branch_id}')`;

    try {
        let results = await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error occured while processing your request");
            }
            res.json(rows);
            // res.send("updated");
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})

// Delete Service

router.delete('/contact/:id', async (req, res, next) => {

    const myquery = `Delete from customer_contacts WHERE id=${req.params.id}`

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
})

// Customer Access
router.get('/access/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT CONCAT_WS(" ", u.firstname, u.lastname) AS name, a.id FROM customer_access as a, users as u where a.customer_id=${req.params.id} and u.id = a.user_id`;
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

// Customer Access
router.post('/access/', async (req, res, next) => {
    var date = Date.now();
    console.log(req.params.id);
    let getQuery = `INSERT INTO customer_access (customer_id, user_id, scope, created) VALUES ('${req.body.customer_id}','${req.body.user_id}', 'manager','${date}')`;
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
// Customer Access
router.delete('/access/delete/:id', async (req, res, next) => {
    var date = new Date();
    console.log(req.params.id);
    let getQuery = `DELETE FROM customer_access WHERE id=${req.params.id}`;
    try {
        let results = await pool.query(getQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error processing your request");
            }
            // res.send("rows");
            // console.log("rows");
            res.json("deleted");
        });
    } catch (e) {
        // console.log(e);
        res.sendStatus(500);
    }
})


// Get contacts for particular Customer
router.get('/zones/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT c.name as city, s.name as state, vz.zone, vc.city_id, vs.state_id FROM vendor_zones as vz, vendor_cities as vc, vendor_states as vs, states as s, cities as c where c.id=vc.city_id and s.id=vs.state_id and vz.vendor_id=${req.params.id} and vz.vendor_id=vc.vendor_id and vz.vendor_id=vs.vendor_id`;
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


// Vendor Service 


router.get('/services/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT vs.id, s.name FROM vendor_services as vs, services as s WHERE s.id = vs.service_id and vs.vendor_id=${req.params.id}`;
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


router.post('/services/', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `INSERT INTO vendor_services(vendor_id, service_id) VALUES ('${req.body.vendor_id}','${req.body.service_id}')`;
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


router.delete('/services/delete/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `DELETE FROM vendor_services WHERE id=${req.params.id}`;
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


// ======  Vendor Rate Cards  =======


// Get data 
router.get('/ratecard/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT * from vendor_rates WHERE id = ${req.params.id}`;
    try {
        let results = await pool.query(getQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error processing your request");
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



// Get data 
router.get('/ratecard/view', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT r.*, v.name as vendor, s.name as service, c.name as city FROM cities as c, services as s, vendors as v, vendor_rates as r WHERE r.service_id = s.id and c.id=r.city_id and v.id = r.vendor_id`;
    try {
        let results = await pool.query(getQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error processing your request");
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

// Get data 
router.delete('/ratecard/delete/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `DELETE FROM vendor_rates WHERE id=${req.params.id}`;
    try {
        let results = await pool.query(getQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error processing your request");
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



// Create Rate Card
router.put('/ratecard/update/:id', async (req, res, next) => {
    console.log(req.params.id);
    let insertQuery = `update vendor_rates set service_id='${req.body.service_id}', element='${req.body.element}', description='${req.body.description}', rate_type='${req.body.rate_type}', rate='${req.body.rate}',city_id='${req.body.city_id}',vendor_id='${req.body.vendor_id}'  where id=${req.params.id}`;

    try {
        let results = await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error processing your request");
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



// Create Rate Card
router.post('/ratecard/', async (req, res, next) => {
    console.log(req.params.id);
    let insertQuery = `INSERT INTO vendor_rates(service_id, element, description, rate_type, rate, city_id, vendor_id) VALUES ('${req.body.service_id}', '${req.body.element}', '${req.body.description}', '${req.body.rate_type}', '${req.body.rate}', '${req.body.city_id}', '${req.body.vendor_id}')`;

    try {
        let results = await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error processing your request");
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




module.exports = router;