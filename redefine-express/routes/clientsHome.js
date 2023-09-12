const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud")
const pool = require('../db/conn')

// Get data
router.get('/view', async (req, res, next) => {
    console.log(req.params.id);
    // let getQuery = `SELECT * FROM customers where flag=1 order by id desc`;
    let getQuery = `SELECT * FROM customers order by id desc`;
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
    let getQuery = `SELECT * FROM customers where id=${req.params.id}`;
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
router.post('/', async (req, res, next) => {
    console.log(req.body);
    try {
        let data = await pool.query(`SELECT id FROM customers ORDER BY id DESC LIMIT 0, 1`, (err, rows, fields) => {
            let cid = rows[0].id + 1;
            let code = "C" + cid;
            
            let insertQuery = `INSERT INTO customers(code, name,phone_number_1, phone_number_2, fax_number_1, email, industry_type_id_1, industry_type_id_2, turnover_range_id, employee_range_id, company_type,created,modified) VALUES ('${code}','${req.body.name}','${req.body.phone_number_1}','${req.body.phone_number_2}','${req.body.fax_number_1}','${req.body.email}','${req.body.industry_type_id_1}','${req.body.industry_type_id_2}','${req.body.turnover_range_id}','${req.body.employee_range_id}','${req.body.company_type}',${Date.now().toString().substring(10)},${Date.now().toString().substring(10)})`;
            let results = pool.query(insertQuery, (err, rows) => {
                if (err) {
                    return res.send(err);
                }
                if(rows.affectedRows==1){
                    res.send({success:true,msg:"Customer Addded"})
                }
            });
        });
    } catch (e) {
        console.log(e);
        res.send(e);
    }
})

// Update data with specific id
router.put('/update/:id', async (req, res, next) => {


    let insertQuery = `update customers set name='${req.body.name}', group_name='${req.body.group_name}', abbreviation='${req.body.abbreviation}', phone_number_1='${req.body.phone_number_1}', phone_number_2='${req.body.phone_number_2}', phone_number_3='${req.body.phone_number_3}', fax_number_1='${req.body.fax_number_1}', fax_number_2='${req.body.fax_number_2}', email='${req.body.email}', industry_type_id_1='${req.body.industry_type_id_1}', industry_type_id_2='${req.body.industry_type_id_2}', industry_type_id_3='${req.body.industry_type_id_3}', turnover_range_id='${req.body.turnover_range_id}', employee_range_id='${req.body.employee_range_id}', company_type='${req.body.company_type}' where id=${req.params.id}`;

    try {
        let results = await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error occured while processing your request");
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
router.delete('/delete/:id', async (req, res, next) => {

    const myquery = `Delete from customers WHERE id=${req.params.id}`

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

// ===== Customer Branches ======


// Get Branches for particular Customer
router.get('/branch/view/:cid/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT * FROM customer_branches where customer_id=${req.params.cid} and id =${req.params.id}`;
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



// Get Branches for particular Customer
router.get('/branch/viewall/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT * FROM customer_branches where customer_id=${req.params.id}`;
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

// Get Branches for particular Customer
router.put('/branch/update/:id', async (req, res, next) => {
    let date = Date.now();

    console.log(req.params.id);
    let updateQuery = `update customer_branches set type='${req.body.type}', name='${req.body.name}', address_line_1='${req.body.address_line_1}', address_line_2='${req.body.address_line_2}', address_line_3='${req.body.address_line_3}', country_id='${req.body.country_id}', state_id='${req.body.state_id}', city_id='${req.body.city_id}', zipcode='${req.body.zipcode}', phone='${req.body.phone}', modified='${date}' where id='${req.params.id}'`;

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

router.post('/branch/', async (req, res, next) => {
    let date = Date.now();

    let insertQuery = `INSERT INTO customer_branches(type, customer_id, name, address_line_1,address_line_2,address_line_3,country_id,state_id,city_id,phone, created, zipcode) VALUES ('${req.body.type}', '${req.body.customer_id}', '${req.body.name}','${req.body.address_line_1}', '${req.body.address_line_2}','${req.body.address_line_3}', '${req.body.country_id}','${req.body.state_id}', '${req.body.city_id}','${req.body.phone}', '${date}', '${req.body.zipcode}')`;

    try {
        let results = await pool.query(insertQuery, (err, rows, fields) => {
            if (err) {
                res.send(err);
                // res.send("An error occured while processing your request");
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

router.delete('/branch/delete/:id', async (req, res, next) => {

    const myquery = `Delete from customer_branches WHERE id=${req.params.id}`

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

// ====================================================================================================
// === Customer Contacts ===


// Get contacts for particular Customer
router.get('/contact/view/:id', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT c.id, c.customer_id, c.salutation, c.firstname, c.lastname, c.dob, c.designation_level_id, c.designation, c.landline_number, c.mobile_number_1, c.mobile_number_2, c.official_email, c.personal_email, c.department, c.gender, c.residential_address, b.name as branch FROM customer_contacts as c, customer_branches as b where c.customer_id=${req.params.id} and c.customer_id=b.customer_id`;
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

// Get All contacts
router.get('/contact/view', async (req, res, next) => {
    console.log(req.params.id);
    let getQuery = `SELECT id, CONCAT_WS(" ", firstname, lastname) AS name FROM customer_contacts`;
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
    let getQuery = `SELECT v.*, c.name as city, d.name as designation_level, vb.name as branch FROM customer_branches as vb, designation_levels as d, customer_contacts as v, cities as c, customer_branches as b where v.customer_id=${req.params.cid} and v.id=${req.params.id} and c.id = b.city_id and v.customer_branch_id=b.id and d.id=v.designation_level_id and vb.id = v.customer_branch_id`;
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


module.exports = router;