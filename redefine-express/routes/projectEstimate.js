const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud");
const pool = require("../db/conn");

// pe - projects_estimates_new
// pa - project_access
// u - users
// s - project_estimates_new_to_services

// Estimate code & Id list
// router.get("/details/:id", async (req, res, next) => {
//   console.log(req.params);
//   let getQuery = `SELECT c.name as customer_name, pc.customer_id as customer_id, p.code as project_code, p.title as project_title, CONCAT_WS(u.firstname, u.lastname) AS manager FROM users as u, projects as p, customers as c, project_customers as pc, project_access as pa WHERE c.id=pc.customer_id and p.id = ${req.params.id} and u.id = pa.user_id`;
//   try {
//     let results = await pool.query(
//       `SELECT id FROM projects ORDER BY id DESC LIMIT 0, 1`,
//       (err, rows, fields) => {
//         if (err) {
//           res.send(err);
//           // res.send("An error processing your request");
//         } else {
//           console.log(rows);
//           let pid = rows[0].id + 1;
//           let results = pool.query(
//             `SELECT id FROM project_estimates_new ORDER BY id DESC LIMIT 0, 1`,
//             (err, rows, fields) => {
//               if (err) {
//                 res.send(err);
//                 // res.send("An error processing your request");
//               } else {
//                 let monthArray = [
//                   "jan",
//                   "feb",
//                   "mar",
//                   "apr",
//                   "may",
//                   "june",
//                   "july",
//                   "aug",
//                   "sep",
//                   "oct",
//                   "nov",
//                   "dec",
//                 ];
//                 let code = new Date().getFullYear();
//                 let month = new Date().getMonth();
//                 let created_on = Date.now();
//                 let eid = rows[0].id + 1;
//                 console.log(`${pid}_rmpl_${monthArray[month]}_${code}_${eid}`);
//                 let estimate_no = `${pid}_rmpl_${monthArray[month]}_${code}_${eid}`;
//                 let results = pool.query(getQuery, (err, rows, fields) => {
//                   if (err) {
//                     res.send(err);
//                     // res.send("An error processing your request");
//                   } else {
//                     var datatobesent = rows;
//                     datatobesent[0]["estimate_no"] = estimate_no;
//                     datatobesent[0]["agency_fees"] = 0;
//                     datatobesent[0]["discount"] = 0;
//                     datatobesent[0]["grand_total"] = 0;
//                     datatobesent[0]["price"] = 0;
//                     datatobesent[0]["tax_amount"] = 0;
//                     datatobesent[0]["tax_percent"] = 0;
//                     datatobesent[0]["tax_type"] = 0;
//                     datatobesent[0]["terms"] = "Enter here";
//                     datatobesent[0]["total"] = 0;
//                     res.send(datatobesent);
//                     console.log(datatobesent);
//                   }
//                 });
//               }
//             }
//           );
//         }

//         // const DataReceived = req.body;

//         // `INSERT INTO project_estimates_new(project_id, client, estimate_no, terms, estimate_amount, discount, agency_fees, total, tax_type, tax_percent, tax_amount, grand_total, project_manager_id, created_on, created_by, flag) VALUES ('${DataReceived.estimateDetails.project_id}','${DataReceived.estimateDetails.customer_name}','${DataReceived.estimateDetails.estimate_no}','${DataReceived.estimateDetails.terms}','${DataReceived.estimateDetails.total}','${DataReceived.estimateDetails.discount}','${DataReceived.estimateDetails.agency_fees}','${DataReceived.estimateDetails.total}','${DataReceived.estimateDetails.tax_type}','${DataReceived.estimateDetails.tax_percent}','${DataReceived.estimateDetails.tax_amount}','${DataReceived.estimateDetails.grand_total}','${req.body.user_id}','${date}','${req.body.uid}','0')`;

//         // // Retrive estimate id from above query

//         // const t_price = DataReceived.ServiceDetails.no_of_day * DataReceived.ServiceDetails.service_rate * DataReceived.ServiceDetails.nos;

//         // `INSERT INTO project_estimates_new_to_services(estimate_id, service_id, rate_type, service_desc, service_rate, no_of_unit, no_of_day, length, width, height, total_price, created_by, flag, created_on) VALUES ('${eid}','${DataReceived.ServiceDetails.service_id}','${DataReceived.ServiceDetails.rate_type}','${DataReceived.ServiceDetails.service_description}','${DataReceived.ServiceDetails.service_rate}','${DataReceived.ServiceDetails.nos}','${DataReceived.ServiceDetails.no_of_day}','${DataReceived.ServiceDetails.length}','${DataReceived.ServiceDetails.width}','${DataReceived.ServiceDetails.height}','${t_price}','${req.body.uid}','0','${date}')`

//         // project id to be sent from FE

//         // height:"1"
//         // length:"1"
//         // no_of_day:"10"
//         // nos:"10"
//         // rate_type:"1"
//         // s_id:""
//         // service_description:"Test Description"
//         // service_id:"48"
//         // service_rate:"500"
//         // width:"1"

//         // agency_fees:"1000"
//         // "discount:"5""
//         // grand_total:50995
//         // manager:"Dinesh Verma"
//         // price:50995
//         // project_code:"3512_Del_2022"
//         // project_title:"Redefine Project"
//         // tax_amount:5099.5
//         // tax_percent:"10"
//         // tax_type:"cgst_sgst"
//         // terms:"Enter here"
//         // total:50995

//         // agency_fees:"1000"customer_name:"Avaya India Pvt. Ltd."discount:"5"estimate_no:"3553_rmpl_jan_2023_60"grand_total:50995manager:"Dinesh Verma"price:50995project_code:"3512_Del_2022"project_title:"Redefine Project"tax_amount:5099.5tax_percent:"10"tax_type:"cgst_sgst"terms:"Enter here"total:50995

//         // name: "NImish Khare "
//         // user_id: 42

//         // height:"1"
//         // length:"1"
//         // no_of_day:"10"
//         // nos:"10"
//         // rate_type:"1"
//         // s_id:""
//         // service_description:"Test Description"
//         // service_id:"48"
//         // service_rate:"500"
//         // width:"1"
//       }
//     );
//   } catch (e) {
//     // console.log(e);
//     res.sendStatus(500);
//   }
// });

router.get("/details/:id", async (req, res) => {
  try {
    const getQuery = `SELECT * FROM project_estimates_new WHERE id=${req.params.id}`;
    const results = pool.query(getQuery, (err, rows) => {
      if (err) {
        return res.send({ error: err });
      }
      res.send(rows);
    });
  } catch (error) {
    res.send({ error });
  }
});

// router.get('/details/:id', async (req, res, next) => {
//     console.log(req.params.id);
//     let getQuery = `SELECT c.name as customer_name, p.code as project_code, p.title as project_title, CONCAT_WS(" ", u.firstname, u.lastname) AS manager FROM users as u, projects as p, customers as c, project_customers as pc, project_access as pa WHERE c.id=pc.customer_id and p.id = ${req.params.id} and u.id = pa.user_id GROUP BY project_code`;
//     try {
//         let results = await pool.query(getQuery, (err, rows, fields) => {
//             if (err) {
//                 res.send(err);
//                 // res.send("An error processing your request");
//             }
//             res.send(rows);
//             console.log("rows");

//         });
//     } catch (e) {
//         // console.log(e);
//         res.sendStatus(500);
//     }
// })

// Create Estimate Code manually

router.get("/estimateno", async (req, res, next) => {
  console.log(req.params.id);

  try {
    let results = await pool.query(
      `SELECT id FROM projects ORDER BY id DESC LIMIT 0, 1`,
      (err, rows, fields) => {
        if (err) {
          res.send(err);
          // res.send("An error processing your request");
        } else {
          let pid = rows[0].id + 1;
          let results = pool.query(
            `SELECT id FROM project_estimates_new ORDER BY id DESC LIMIT 0, 1`,
            (err, rows, fields) => {
              if (err) {
                res.send(err);
                // res.send("An error processing your request");
              } else {
                let monthArray = [
                  "jan",
                  "feb",
                  "mar",
                  "apr",
                  "may",
                  "june",
                  "july",
                  "aug",
                  "sep",
                  "oct",
                  "nov",
                  "dec",
                ];
                let code = new Date().getFullYear();
                let month = new Date().getMonth();
                let created_on = Date.now();
                let eid = rows[0].id + 1;
                console.log(`${pid}_rmpl_${monthArray[month]}_${code}_${eid}`);
                res.send(`${pid}_rmpl_${monthArray[month]}_${code}_${eid}`);
              }
            }
          );
        }
      }
    );
  } catch (e) {
    // console.log(e);
    res.sendStatus(500);
  }
});

// get services list linked to estimate id
router.get("/service/list/:id", async (req, res) => {
  const estimate_id = req.params.id;
  const getQuery = `SELECT * FROM techvolopy1_db.project_estimates_new_to_services WHERE estimate_id=${estimate_id}`;
  const results = pool.query(getQuery, (err, rows) => {
    if (err) {
      return res.send({ error: err });
    }
    return res.json({ success: true, services: rows });
  });
});

// Estimate code & Id list
router.get("/list", async (req, res, next) => {
  console.log(req.params.id);
  let getQuery = `SELECT id, estimate_no FROM project_estimates_new`;
  try {
    let results = await pool.query(getQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
        // res.send("An error processing your request");
      }
      res.send(rows);
      console.log("rows");
    });
  } catch (e) {
    // console.log(e);
    res.sendStatus(500);
  }
});

// Get data with specific id
router.get("/getdata/:id", async (req, res, next) => {
  console.log(req.params.id);
  let getQuery = `SELECT pe.id AS estimate_id, pc.customer_id as customer_id, pe.estimate_no AS estimate_no, c.name as customer_name, p.code AS project_code, p.title AS project_title, pe.estimate_amount as price, pe.total as total, pe.discount as discount, pe.agency_fees as agency_fees, pe.grand_total as grand_total, pe.tax_type as tax_type, pe.tax_percent as tax_percent, pe.tax_amount as tax_amount, pe.terms as terms FROM project_estimates_new AS pe, project_customers as pc, customers as c, project_estimates_new_to_services as s, projects as p WHERE p.id = pe.project_id AND c.id = pc.customer_id AND p.id = pc.project_id AND p.id = ${req.params.id} order by pe.id desc  LIMIT 0, 1`;

  let serviceQuery = `SELECT s.id AS s_id, s.service_id AS service_id, ss.name as service_name, s.rate_type as rate_type, s.service_desc AS service_description, s.service_rate AS service_rate, s.no_of_unit AS nos, s.length as length, s.width as width, s.height as height, s.no_of_day as no_of_day FROM project_estimates_new AS pe, project_estimates_new_to_services as s, services as ss, projects as p WHERE p.id = pe.project_id AND pe.id = s.estimate_id AND  ss.id = s.service_id AND s.estimate_id = pe.id AND p.id = ${req.params.id} order by pe.id`;

  let userQuery = `select CONCAT_WS(" ", u.firstname, u.lastname) AS name, u.id AS user_id FROM projects AS p, project_access AS pa, users AS u WHERE pa.user_id = u.id AND pa.scope = "manager" AND p.id = pa.project_id AND u.banned = "0" AND p.id = ${req.params.id};`;

  // let getQuery = `SELECT pe.id AS estimate_id, pe.estimate_no AS estimate_no, c.name as customer_name, p.code AS project_code, p.title AS project_title, s.service_id AS service_id, s.service_desc AS service_description, s.no_of_unit AS nos, s.length as length, s.width as width, s.height as height, s.no_of_day as no_of_day, pe.estimate_amount as price, pe.total as total, pe.discount as discount, pe.agency_fees as agency_fees, pe.grand_total as grand_total, pe.tax_type as tax_type, pe.tax_percent as tax_percent, pe.terms as terms FROM project_estimates_new AS pe, project_customers as pc, customers as c, project_estimates_new_to_services as s, projects as p WHERE p.id = pe.project_id AND pe.id = s.estimate_id AND c.id = pc.customer_id AND p.id = pc.project_id AND p.id = ${req.params.id} order by pe.id desc  LIMIT 0, 1`;
  try {
    let results = await pool.query(getQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
        // res.send("An error processing your request");
      }
      // res.send("rows");
      console.log("rows");
      var dataFound = [];
      dataFound.push({ estimate_info: rows });
      let finaldata = pool.query(userQuery, (err, rows, fields) => {
        dataFound.push({ users: rows });
        let finaldata = pool.query(serviceQuery, (err, rows, fields) => {
          dataFound.push({ services: rows });
          res.json(dataFound);
        });
      });
    });
  } catch (e) {
    // console.log(e);
    res.sendStatus(500);
  }
});

// Copy data with specific id
router.get("/copy/:id", async (req, res, next) => {
  console.log(req.params.id);
  // let getQuery = `SELECT pe.id AS estimate_id, pe.estimate_no AS estimate_no, c.name as customer_name, p.code AS project_code, p.title AS project_title, pe.estimate_amount as price, pe.total as total, pe.discount as discount, pe.agency_fees as agency_fees, pe.grand_total as grand_total, pe.tax_type as tax_type, pe.tax_percent as tax_percent, pe.tax_amount as tax_amount, pe.terms as terms FROM project_estimates_new AS pe, project_customers as pc, customers as c, project_estimates_new_to_services as s, projects as p WHERE p.id = pe.project_id AND c.id = pc.customer_id AND p.id = pc.project_id AND p.id = ${req.params.id} order by pe.id desc  LIMIT 0, 1`;

  let serviceQuery = `SELECT s.id AS s_id, s.service_id AS service_id, s.service_desc AS service_description, s.service_rate AS service_rate, s.no_of_unit AS nos, s.length as length, s.width as width, s.height as height, s.no_of_day as no_of_day FROM project_estimates_new AS pe, project_estimates_new_to_services as s, projects as p WHERE p.id = pe.project_id AND pe.id = s.estimate_id AND s.estimate_id = pe.id AND p.id = ${req.params.id} order by pe.id`;
  // let userQuery = `select CONCAT_WS(" ", u.firstname, u.lastname) AS name, u.id AS user_id FROM projects AS p, project_access AS pa, users AS u WHERE pa.user_id = u.id AND pa.scope = "manager" AND p.id = pa.project_id AND u.banned = "0" AND p.id = ${req.params.id};`;

  // let getQuery = `SELECT pe.id AS estimate_id, pe.estimate_no AS estimate_no, c.name as customer_name, p.code AS project_code, p.title AS project_title, s.service_id AS service_id, s.service_desc AS service_description, s.no_of_unit AS nos, s.length as length, s.width as width, s.height as height, s.no_of_day as no_of_day, pe.estimate_amount as price, pe.total as total, pe.discount as discount, pe.agency_fees as agency_fees, pe.grand_total as grand_total, pe.tax_type as tax_type, pe.tax_percent as tax_percent, pe.terms as terms FROM project_estimates_new AS pe, project_customers as pc, customers as c, project_estimates_new_to_services as s, projects as p WHERE p.id = pe.project_id AND pe.id = s.estimate_id AND c.id = pc.customer_id AND p.id = pc.project_id AND p.id = ${req.params.id} order by pe.id desc  LIMIT 0, 1`;
  try {
    let results = await pool.query(serviceQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
        // res.send("An error processing your request");
      }
      // res.send("rows");
      console.log("rows");
      var dataFound = [];

      dataFound.push({ services: rows });
      res.json(dataFound);
    });
  } catch (e) {
    // console.log(e);
    res.sendStatus(500);
  }
});

router.get("/all", async (req, res, next) => {

  let getQuery = `SELECT * FROM project_estimates_new`;
  try {
    await pool.query(getQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
        // res.send("An error processing your request");
      }

      res.json(rows);
    });
  } catch (e) {
    // console.log(e);
    res.send(e);
  }
});

router.get("/all/:id", async (req, res, next) => {
  console.log(req.params.id);

  let getQuery = `SELECT * FROM project_estimates_new WHERE project_id="${req.params.id}"`;
  try {
    let results = await pool.query(getQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
        // res.send("An error processing your request");
      }

      res.json(rows);
    });
  } catch (e) {
    // console.log(e);
    res.sendStatus(500);
  }
});



// add estimate data
router.post("/", async (req, res, next) => {
  const { servicesInfo, estimateInfo } = req.body;
  const {
    project_id,
    clientId,
    estimate_no,
    terms,
    estimate_amount,
    discount,
    agency_fees,
    total,
    tax_type,
    tax_percent,
    tax_amount,
    grand_total,
    project_manager_id,
    user_id,
  } = estimateInfo;

  const InsertQueryEstimate = `INSERT INTO project_estimates_new(project_id, client, estimate_no, terms, estimate_amount, discount, agency_fees, total, tax_type, tax_percent, tax_amount, grand_total, project_manager_id, created_on, created_by, flag) VALUES ('${project_id}','${clientId}','${estimate_no}','${terms}','${estimate_amount}','${discount}','${agency_fees}','${total}','${tax_type}','${tax_percent===""?0:tax_percent}','${tax_amount}','${grand_total}','${project_manager_id}','${servicesInfo[0].created_on}','${user_id}','1')`;

  try {
    let results = await pool.query(
      InsertQueryEstimate,
      (err, init_estimate_rows, fields) => {
        if (err) {
          return res.send({ error: err, message: "Please try again!" });
        }

        let results2 = pool.query(
          `SELECT id FROM project_estimates_new ORDER BY id DESC LIMIT 0, 1`,
          (err, estimate_rows) => {
            if (err) {
              return res.send({ error: err, message: "Please try again!" });
            }

            const estimate_id = estimate_rows[0].id;
            servicesInfo.forEach((service) => {
              let results3 = pool.query(
                `INSERT INTO project_estimates_new_to_services(estimate_id, service_id, rate_type, service_desc, service_rate, no_of_unit, no_of_day, length, width, height, total_price, created_by, flag, created_on) VALUES ('${estimate_id}','${
                  service.service_id
                }','${service.rate_type}','${service.service_desc}','${
                  service.service_rate
                }','${service.no_of_unit}','${service.no_of_day}','${
                  service.length === "" ? 0 : service.length
                }','${service.width === "" ? 0 : service.width}','${
                  service.height === "" ? 0 : service.height
                }','${service.total_price}','${user_id}','0','${
                  service.created_on
                }')`,
                (err) => {
                  if (err) {
                    return res.send({
                      error: err,
                      message: "Please try again!",
                    });
                  }
                }
              );
            });
          }
        );
      }
    );
    return res.json({ success: true });
  } catch (e) {
    return res.send({ error: e });
  }
});

// update data with specific id
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { servicesInfo, estimateInfo } = req.body;
  const {
    project_id,
    clientId,
    estimate_no,
    terms,
    estimate_amount,
    discount,
    agency_fees,
    total,
    tax_type,
    tax_percent,
    tax_amount,
    grand_total,
    project_manager_id,
    user_id,
  } = estimateInfo;

  const updateQueryEstimate = `UPDATE project_estimates_new SET terms='${terms}', estimate_amount='${estimate_amount}', discount='${discount}', agency_fees='${agency_fees}', total='${total}', tax_type='${tax_type}', tax_percent='${tax_percent}', tax_amount='${tax_amount}', grand_total='${grand_total}', flag='1' WHERE id='${id}'`;

  try {
    let results = await pool.query(updateQueryEstimate, (err) => {
      if (err) {
        return res.send({ error: err, message: "Please try again!" });
      }
      // Get all existing service IDs for the estimate
      const existingServiceIds = servicesInfo.map(service => service.id).filter(id => id);

      // Delete services that are not found in the existingServiceIds array
      let deleteServiceQuery = `DELETE FROM project_estimates_new_to_services WHERE estimate_id='${id}' AND id NOT IN (${existingServiceIds.join(",")})`;
      pool.query(deleteServiceQuery, (err, deleteResult) => {
        if (err) {
          return res.send({ error: err, message: "Please try again!" });
        }
        console.log(deleteResult);
      });

      // Update or insert services
      servicesInfo.forEach((service) => {
        if (service.id) {
          let updateServiceQuery = `UPDATE project_estimates_new_to_services SET service_id='${service.service_id}', rate_type='${service.rate_type}', service_desc='${service.service_desc}', service_rate='${service.service_rate}', no_of_unit='${service.no_of_unit}', no_of_day='${service.no_of_day}', length='${service.length}', width='${service.width}', height='${service.height}', total_price='${service.total_price}', flag='0' WHERE estimate_id='${id}' AND id='${service.id}'`;
          pool.query(updateServiceQuery, (err, updateResult) => {
            if (err) {
              return res.send({ error: err, message: "Please try again!" });
            }
            console.log(updateResult);
          });
        }
      });
    });

    console.log(results);
    return res.json({ success: true });
    // Update servicesInfo in the estimateInfo object
  } catch (e) {
    return res.send({ error: e });
  }
});


// ==== Get data for specific estimate =====

// Get data with specific id
router.get("/getdata/:id/:eid", async (req, res, next) => {
  console.log(req.params.id);
  let getQuery = `SELECT pe.id AS estimate_id,CONCAT_WS(" ", u.firstname, u.lastname) AS manager, pe.estimate_no AS estimate_no, c.name as customer_name, p.code AS project_code, pc.customer_id as customer_id, p.title AS project_title, pe.estimate_amount as price, pe.total as total, pe.discount as discount, pe.agency_fees as agency_fees, pe.grand_total as grand_total, pe.tax_type as tax_type, pe.tax_percent as tax_percent, pe.tax_amount as tax_amount, pe.terms as terms FROM project_estimates_new AS pe,users AS u, project_customers as pc, customers as c, project_estimates_new_to_services as s, projects as p WHERE p.id = pe.project_id AND c.id = pc.customer_id AND p.id = pc.project_id AND p.id = ${req.params.id} and pe.id=${req.params.eid} and pe.project_manager_id = u.id order by pe.id desc LIMIT 0, 1`;

  let serviceQuery = `SELECT s.id AS s_id, s.service_id AS service_id, ss.name as service_name, s.rate_type as rate_type, s.service_desc AS service_description, s.service_rate AS service_rate, s.no_of_unit AS nos, s.length as length, s.width as width, s.height as height, s.no_of_day as no_of_day FROM project_estimates_new AS pe, project_estimates_new_to_services as s, services as ss, projects as p WHERE p.id = pe.project_id AND pe.id = s.estimate_id AND  ss.id = s.service_id AND s.estimate_id = ${req.params.eid} AND p.id = ${req.params.id} order by pe.id`;

  let userQuery = `select CONCAT_WS(" ", u.firstname, u.lastname) AS name, u.id AS user_id FROM projects AS p, project_access AS pa, users AS u WHERE pa.user_id = u.id AND pa.scope = "manager" AND p.id = pa.project_id AND u.banned = "0" AND p.id = ${req.params.id};`;

  try {
    let results = await pool.query(getQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
        // res.send("An error processing your request");
      }
      // res.send("rows");
      console.log("rows");
      var dataFound = [];
      dataFound.push({ estimate_info: rows });
      let finaldata = pool.query(userQuery, (err, rows, fields) => {
        dataFound.push({ users: rows });
        let finaldata = pool.query(serviceQuery, (err, rows, fields) => {
          dataFound.push({ services: rows });
          res.json(dataFound);
        });
      });
    });
  } catch (e) {
    // console.log(e);
    res.sendStatus(500);
  }
});

// router.post('/', async (req, res, next) => {
//     console.log(req.body);
//     let created_on = Date.now();
//     console.log(created_on);
//     let total_price = req.body.service_rate * req.body.no_of_day * req.body.nos;

//     let userGetQuery = `select scope from project_access WHERE user_id = ${req.body.user_id} AND project_id = ${req.body.project_id}`;

//     let userUpdateQuery = `update project_access set scope = "manager" WHERE user_id = ${req.body.user_id} AND p.id = ${req.params.project_id}`;

//     // let serviceInsertQuery = `INSERT INTO project_estimates_new_to_services (estimate_id, service_id, service_desc, service_rate, no_of_unit, no_of_day, length, width, height, total_price, created_by, flag, created_on) values('${s.estimate_id}', '${s.service_id}','${s.service_description}','${s.service_rate}','${s.nos}','${s.no_of_day}','${s.length}','${s.width}','${s.height}','${total_price}','${s.creator_id}','1','${created_on}')`;

//     // let checkQueryExists = `SELECT TOP 1 products.id FROM project_estimates_new_to_services WHERE id = id='${req.body.s_id}';`

//     // let serviceUpdateQuery = `UPDATE project_estimates_new_to_services set service_id = '${req.body.service_id}', service_desc = '${req.body.service_description}', no_of_unit =  '${req.body.nos}', length = '${req.body.length}', width = '${req.body.width}', height = '${req.body.height}', no_of_day = '${req.body.no_of_day}', service_rate = '${req.body.service_rate}', total_price = '${total_price}', flag='1', modified_on = '${created_on}', created_by='${req.body.creator_id}' where id='${req.body.s_id}' and estimate_id='${req.body.estimate_id}'`;

//     let estimateQuery = `UPDATE project_estimates_new set estimate_amount = '${req.body.price}', total = '${req.body.total}', discount =  '${req.body.discount}', agency_fees = '${req.body.agency_fees}', grand_total = '${req.body.grand_total}', tax_type = '${req.body.tax_type}', tax_percent = '${req.body.tax_percent}', tax_amount = '${req.body.tax_amount}', terms = '${req.body.terms}', flag='1', created_by='${req.body.creator_id}' where id='${req.body.estimate_id}'`;

//     try {
//         let results = await pool.query(estimateQuery, (err, rows, fields) => {
//             console.log(req.body.serviceData);
//             console.log(req.body.userData);
//             console.log(req.body.estimateData);
//             if (err) {
//                 res.send(err);
//                 // res.send("An error occured while processing your request");
//             }
//             console.log("Estimate Query Executed", rows);

//             let estimate = pool.query(estimateQuery, (err, rows, fields) => {
//                 console.log("post1")
//                 req.body.servicesInfo.forEach((s, index) => {
//                     let getService = pool.query(`SELECT id WHERE id='${s.s_id}'`, (err, rows, fields) => {
//                         if (rows) {
//                             let postService = pool.query(`INSERT INTO project_estimates_new_to_services (estimate_id, service_id, service_desc, service_rate, no_of_unit, no_of_day, length, width, height, total_price, created_by, flag, created_on) values('${req.body.estimateInfo[0].estimate_id}', '${s.service_id}','${s.service_description}','${s.service_rate}','${s.nos}','${s.no_of_day}','${s.length}','${s.width}','${s.height}','${total_price}','50','1','${created_on}')`, (err, rows, fields) => {
//                                 if (err) {
//                                     console.log(err);
//                                 }
//                                 console.log("Service query insert ", rows)
//                             })
//                         }
//                         let postService = pool.query(`UPDATE project_estimates_new_to_services set service_id = '${req.body.service_id}', service_desc = '${req.body.service_description}', no_of_unit =  '${req.body.nos}', length = '${req.body.length}', width = '${req.body.width}', height = '${req.body.height}', no_of_day = '${req.body.no_of_day}', service_rate = '${req.body.service_rate}', total_price = '${total_price}', flag='1', modified_on = '${created_on}', created_by='${req.body.creator_id}' where id='${req.body.s_id}' and estimate_id='${req.body.estimateInfo[0].estimate_id}'`, (err, rows, fields) => {
//                             if (err) {
//                                 console.log(err);
//                             }
//                             console.log("Service query update ", rows)
//                         })
//                     })

//                 });
//                 req.body.tobedeleted.forEach((d) => {
//                     let removeotherservices = pool.query(`DELETE FROM project_estimates_new_to_services WHERE id='${d}'`, (err, rows, fields) => {
//                         if (err) {
//                             console.log(err);
//                         }
//                         else {
//                             console.log("deleted");
//                         }
//                     })
//                 })

//                 // let user = pool.query(userGetQuery, (err, rows, fields) => {
//                 //     if (rows[0].scope != "owner" && rows[0].scope != "manager") {
//                 //         let postUser = pool.query(userUpdateQuery, (err, rows, fields) => {
//                 //             res.json(rows);
//                 //         })
//                 //     }
//                 //     else {
//                 //         console.log("already a manager");
//                 //     }
//                 // })
//             })

//             res.json(rows);

//         });
//     }

// creator_id

// if(userData)

// try {
//     let results = await pool.query(userGetQuery, (err, rows, fields) => {
//         if (err) {
//             res.send(err);
//             // res.send("An error occured while processing your request");
//         }
//         if(rows[0].scope != "owner" && rows[0].scope != "manager") {
//             let postUser = pool.query(userUpdateQuery, (err, rows, fields) => {
//                 res.json(rows);
//             })
//         }
//         else{
//             res.send("already a manager");
//         }
//         // res.json(rows[0].scope);
//         // res.send("updated");
//     });
// }

//     let checkQuery = `
//     // service

//    s.service_id AS service_id, s.service_desc AS service_description, s.no_of_unit AS nos, s.length as length, s.width as width, s.height as height, s.no_of_day as no_of_day,

// //    pe

//   update project_estimates_new set estimate_amount = ${req.body.estimate_amount}, total = ${req.body.total}, discount =${req.body.discount} , agency_fees = ${req.body.agency_fees}, grand_total = ${req.body.grand_total}, tax_type = ${req.body.tax_type}, tax_percent = ${req.body.tax_percent}, terms = ${req.body.terms}

//    FROM project_estimates_new AS pe, project_customers as pc, customers as c, project_estimates_new_to_services as s, projects as p WHERE p.id = pe.project_id AND pe.id = s.estimate_id AND c.id = pc.customer_id AND p.id = pc.project_id AND p.id = ${req.params.id} order by pe.id desc  LIMIT 0, 1`;

//     const myquery = `BEGIN;
//                         INSERT INTO users (username, password)
//                             VALUES('test', 'test');
//                         INSERT INTO profiles (userid, bio, homepage)
//                             VALUES(LAST_INSERT_ID(),'Hello world!', 'http://www.stackoverflow.com');
//                     COMMIT;`

//     catch (e) {
//         // console.log(e);
//         res.sendStatus(500);
//     }
// })

// Update data with specific id
router.put("/update/:id", async (req, res, next) => {
  const myquery = `UPDATE projects SET category='${req.body.category}',project_classification='${req.body.project_classification}', title='${req.body.title}',description='${req.body.description}',quotation='${req.body.quotation}',start_date='${req.body.start_date}',actual_end_date='${req.body.actual_end_date}',status='${req.body.status}' WHERE id=${req.params.id}`;

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
    // console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
