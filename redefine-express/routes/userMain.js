const express = require("express");
const router = express.Router();
const db = require("../db/users/db_login");
const pool = require("../db/conn");
const rev = require("../db/reversemd5");
const hash = require("object-hash");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("./otpGenerator");
const nodemailer = require("nodemailer");

// Signup /  Register api

// Get all groups to show under dropdown option
router.get("/new", async (req, res, next) => {
  let groupsQuery = `select * from users where activated=0 AND banned=1`;
  try {
    let results = await pool.query(groupsQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
      }
      res.json(rows);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/view", async (req, res, next) => {
  let groupsQuery = `select * from users`;
  try {
    let results = await pool.query(groupsQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
      }
      res.json(rows);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/view2", async (req, res, next) => {
  try {
    let results = await pool.query(
      `select id, CONCAT_WS(" ", firstname, lastname) as name from users where activated=1 and banned=0`,
      (err, rows, fields) => {
        if (err) {
          res.send(err);
        }
        res.json(rows);
      }
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/view/:id", async (req, res, next) => {
  // let groupsQuery = `select u.firstname, u.lastname, up.phone, u.group_id, u.password, u.email from users as u, user_profiles as up where u.id=${req.params.id} and up.user_id=${req.params.id}`;
  let query = `
    SELECT u.*, up.*
    FROM users AS u
    LEFT JOIN user_profiles AS up ON u.id = up.user_id
    WHERE u.id = ${req.params.id}
  `;
  try {
    let results = await pool.query(query, (err, rows, fields) => {
      if (err) {
        res.send(err);
      }
      res.json(rows);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
// Get all groups to show under dropdown option
router.get("/groups", async (req, res, next) => {
  let groupsQuery = `select id, name from groups where flag="1"`;
  try {
    let results = await pool.query(groupsQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
      }
      res.json(rows);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/activate/:id", async (req, res) => {
  console.log("activate user");
  let registerQuery = `update users set activated="1", banned="0" where id= ${req.params.id}`;
  let SelectQuery = `select email from users where id= ${req.params.id}`;

  try {
    let results = await pool.query(registerQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
      } else {
        let results = pool.query(SelectQuery, (err, rows, fields) => {
          if (err) {
            res.send(err);
          }

          req.header("Access-Control-Allow-Origin", "*");

          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: "developerruchi0@gmail.com",
              pass: "lymrxffytwplmayy",
            },
          });

          let mailOptions = {
            from: "developerruchi0@gmail.com",
            to: rows[0].email,
            subject: "Testing mail",
            html: `<p>Hi,</p>
                            <p>Your profile is verified, Please login !!</p>        
                            `,
          };

          transporter.sendMail(mailOptions, function (error) {
            if (error) {
              console.log(error);
              res.send(error);
            } else {
              console.log("error");
              res.send("Success");
            }
          });
          console.log("Working good");
          res.send("fine");
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/ban/:id", async (req, res) => {
  let registerQuery = `update users set activated="0", banned="1" where id= ${req.params.id}`;

  try {
    let results = await pool.query(registerQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
      }
      if(rows.affectedRows==1){
        res.send({success:true,msg:"User Banned"})
      };
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});
router.put("/unban/:id", async (req, res) => {
  let registerQuery = `update users set activated="1", banned="0" where id= ${req.params.id}`;

  try {
    let results = await pool.query(registerQuery, (err, rows, fields) => {
      if (err) {
        res.send(err);
      }
      if(rows.affectedRows==1){
        res.send({success:true,msg:"User Unbanned"})
      };
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

// router.put("/update/:id", async (req, res) => {
//   let modified_on = Date.now();

//   let registerQuery = `update users set firstname='${req.body.firstname}', lastname='${req.body.lastname}',password='${req.body.password}',email='${req.body.email}',modified='${modified_on}' where id= ${req.params.id}`;

//   try {
//     let results = await pool.query(registerQuery, (err, rows, fields) => {
//       if (err) {
//         res.send(err);
//       }
//       let data = pool.query(
//         `update user_profiles set phone='${req.body.phone}' where user_id=${req.params.id}`,
//         (err, rows, fields) => {
//           if (err) {
//             return res.send(err);
//           }
//           res.json(rows);
//         }
//       );
//       // res.json(rows);
//     });
//   } catch (e) {
//     console.log(e);
//     res.send(e);
//   }
// });

router.put("/update/:id", async (req, res) => {
  // let modified_on = Date.now();

  try {
    // Update the user information
    await new Promise((resolve, reject) => {
      let registerQuery = `UPDATE users SET firstname='${req.body.firstname}', lastname='${req.body.lastname}', password='${req.body.password}', email='${req.body.email}' WHERE id=${req.params.id}`;
      pool.query(registerQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Update the user profile information
    await new Promise((resolve, reject) => {
      let updateProfileQuery = `UPDATE user_profiles SET phone='${req.body.phone}' WHERE user_id=${req.params.id}`;
      pool.query(updateProfileQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Send a response indicating success
    res.json({ message: "User updated successfully." });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "An error occurred." });
  }
});

router.post("/create/", async (req, res) => {
  const currentDate = new Date();

  // Get the current year, month, and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Get the current time
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Create the formatted date string
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  let contactQuery = `INSERT INTO user_profiles(user_id, phone) VALUES ('${req.body.group_id}','${req.body.firstname}')`;

  try {
    let results = pool.query(`SELECT * FROM users`, (err, gettingRow) => {
      if (err) {
        return res.send({ error: err });
      }
      const exists = gettingRow.find((ele) => ele.email === req.body.email);

      if (exists) {
        return res.send({ success: false, msg: "Email already exists!" });
      }

      const lastRow = gettingRow[gettingRow.length - 1];
      const lastId = lastRow.id;

      let registerQuery = `INSERT INTO users(id,group_id, firstname, lastname, password, email, activated, banned, created,username) VALUES ('${
        lastId + 1
      }','${req.body.group_id}','${req.body.firstname}','${
        req.body.lastname
      }','${req.body.password}','${
        req.body.email
      }','0','0','${formattedDate}','')`;

      pool.query(registerQuery, (err, insertingRow) => {
        if (err) {
          return res.send({ error: err });
        }
        if (insertingRow.affectedRows == 1) {
          pool.query(
            `INSERT INTO user_profiles(user_id, phone) VALUES ('${
              lastId + 1
            }','${req.body.phone}')`,
            (err, profiles_rows) => {
              if (err) {
                res.send(err);
              }
              if (profiles_rows.affectedRows == 1) {
                res.send({ success: true, msg: "User added successfully" });
              }
            }
          );
        }
      });
    });
    // let results = await pool.query(registerQuery, (err, rows, fields) => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     // var user_id = rows[0].id;
    //     let data = pool.query(
    //       `SELECT id FROM users ORDER BY id DESC LIMIT 0, 1`,
    //       (err, rows, fields) => {
    //         if (err) {
    //           res.send(err);
    //         }
    //         // res.json(rows);
    //         else {
    //           var user_id = rows[0].id;
    //           let data = pool.query(
    //             `INSERT INTO user_profiles(user_id, phone) VALUES ('${user_id}','${req.body.phone}')`,
    //             (err, rows, fields) => {
    //               if (err) {
    //                 res.send(err);
    //               }
    //               res.json(rows);
    //             }
    //           );
    //           // res.json(rows);
    //         }
    //       }
    //     );
    //   }
    // });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Insert / save all groups

router.post("/register", async (req, res) => {
  console.log("enetereed");
  date2 = new Date();
  const yyyy = date2.getFullYear();
  let mm = date2.getMonth() + 1; // Months start at 0!
  let dd = date2.getDate();
  let created_on = yyyy + "-" + mm + "-" + dd;
  let RegistrationCheck = `SELECT * FROM users WHERE email='${req.body.email}'`;

  try {
    let results = await pool.query(RegistrationCheck, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else if (rows.length > 0) {
        console.log(rows.length, "here 2");
        if (rows[0].activated == "2") {
          console.log("here em");
          return res.json({
            stat: "2",
            verify: "0",
            label: "Oops",
            msg: "Your Profile is already under approval",
          });
        } else if (rows[0].activated == "1") {
          console.log("here ifffh");
          return res.json({
            stat: "1",
            verify: "2",
            label: "Perfect",
            msg: "You're already registered, Please Login",
          });
        } else if (rows[0].activated == "0") {
          return res.json({
            stat: "2",
            verify: "1",
            label: "Perfect",
            msg: "Please verify your Email",
          });
        }
      } else {
        console.log("here 3");
        var otp = generateOTP();
        let registerQuery = `INSERT INTO users(group_id, firstname, lastname, username, password, email, otp, activated, banned, last_ip, created) VALUES ('${req.body.group_id}','${req.body.firstname}','${req.body.lastname}','${req.body.username}','${req.body.password}','${req.body.email}', '${otp}', '0','0','${req.body.last_ip}','${created_on}')`;

        let myresults = pool.query(registerQuery, (err, rows, fields) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log("fine");
            req.header("Access-Control-Allow-Origin", "*");

            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 587,
              auth: {
                user: "developerruchi0@gmail.com",
                pass: "lymrxffytwplmayy",
              },
            });

            let mailOptions = {
              from: "developerruchi0@gmail.com",
              to: req.body.email,
              subject: "Testing mail",
              html: `<p>Hi,</p>
                            <p>Please enter below given OTP to verify your account.<br/>${otp}</p>        
                            `,
            };

            transporter.sendMail(mailOptions, function (error) {
              if (error) {
                console.log(error);
                res.send(error);
              } else {
                console.log("error");
                res.send("Success");
              }
            });
            console.log("Working good");
          }
          res.json({
            stat: "2",
            verify: "1",
            label: "Perfect",
            msg: "Please verify your Email",
          });
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/verify", async (req, res) => {
  const { email, otp } = req.body;
  let selectQuery = `SELECT otp FROM users WHERE email='${req.body.email}'`;
  let updateQuery = `UPDATE users SET activated='2',banned='0' WHERE email='${req.body.email}'`;
  try {
    let results = await pool.query(selectQuery, (err, rows, fields) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(rows[0].otp);
        if (rows[0].otp == otp) {
          let myresults = pool.query(updateQuery, (err, rows, fields) => {
            if (err) {
              console.log(err);
              res.send(err);
            } else {
              res.json({
                stat: "1",
                label: "Verified",
                msg: "Profile is sent for approval",
              });
            }
          });
        } else {
          res.json({ stat: "1", label: "Oops", msg: "Incorrect OTP" });
        }
      }
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Get all data
router.post("/login", async (req, res) => {
  try {
    let results = await pool.query(
      `SELECT * FROM users WHERE email="${req.body.username}"`,
      (err, rows, fields) => {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        if (!err && rows.length !== 0) {
          const creationDate = rows[0].created;

          if (rows[0].password !== req.body.password) {
            res.send("Wrong password");
          } else if (creationDate < sixMonthsAgo) {
            return res.send("Your password is expired!");
          } else {
            const data = jwt.sign(
              {
                message: "Loggedin",
                groupId: rows[0].group_id,
              },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "3d" }
            );

            res.json({
              token: data,
              name: rows[0].firstname,
              groupId: rows[0].group_id,
              id: rows[0].id,
            });
          }
        } else {
          console.log(err);
          res.send("Something went wrong!");
        }
      }
    );
    // res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

const sendVerifyMail = (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "sunilchaudhary7789@gmail.com",
        pass: `bciblvwzclhfnzvv`,
      },
    });

    const mailOptions = {
      from: "sunilchaudhary7789@gmail.com",
      to: email,
      subject: "Password Reset Successful",
      html: `<p>Hi,</p><p>Your password reset is successful.</p><p>Please click here to <a href="http://localhost:3000/session/signin">Login</a> to your redefine account.</p><p>Best Regards,</p><p>Redefine</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Email has been sent:- ${info.response}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//change password
router.post("/change-password", async (req, res) => {
  const email = req.body.email;
  const newPassword = req.body.password;
  // Check if the user exists
  const userQuery = `SELECT * FROM users WHERE email='${email}'`;

  try {
    await pool.query(userQuery, (err, rows, fields) => {
      const newPasswordCreationDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      let oldPassword = rows[0].password;
      if (err) {
        return res.status(501).send({ error: err });
      }

      if (oldPassword === newPassword) {
        return res.send({
          success: false,
          msg: "Entered password is already in use!",
        });
      }

      if (rows.length === 0) {
        return res.json({ success: false, msg: "User not found" });
      }
      // '2022-05-24 12:25:01'
      // Update the user's password
      const updateQuery = `UPDATE users SET password='${newPassword}',created='${newPasswordCreationDate}',modified='${newPasswordCreationDate}' WHERE email='${email}'`;
      pool.query(updateQuery, (err, rows) => {
        if (err) {
          return res.send({ error: err, msg: "Please try again" });
        }
        if (rows.changedRows !== 0) {
          sendVerifyMail(email);

          return res.json({
            success: true,
            msg: "Password changed successfully",
          });
        } else {
          return res.status(401).send({
            error: err,
            msg: "Something went wrong, Please try again!",
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// router.delete("/delete/:id", async (req, res) => {
//   const userId = req.params.id;

//   let deleteQuery = `DELETE FROM users WHERE id = '${userId}'`;

//   try {
//     await pool.query(deleteQuery);
//     res.status(200).send({ success: true, msg: "User Deleted Successfully!" });
//   } catch (e) {
//     console.log(e);
//     res.status(500).send({ success: false, error: e });
//   }
// });

router.delete("/delete/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if the user exists
    let results = await pool.query(
      `SELECT * FROM users WHERE id = '${userId}'`,
      (err, userRow) => {
        if (userRow.length === 0) {
          return res.send({ success: false, msg: "User not found!" });
        }
        let profileResults = pool.query(
          `SELECT * FROM user_profiles WHERE user_id = '${userId}'`,
          (err, profileRow) => {
            if (profileRow.length === 0) {
              pool.query(
                `DELETE FROM users WHERE id = '${userId}'`,
                (err, deletingRow) => {
                  if (err) {
                    return res.send({ error: err });
                  }
                  if (deletingRow.affectedRows === 1) {
                    return res.send({
                      success: true,
                      msg: "User deleted successfully",
                    });
                  }
                }
              );
            } else {
              // Delete the user profile
              pool.query(
                `DELETE FROM user_profiles WHERE user_id = '${userId}'`,
                (err, deletingRow) => {
                  if (err) {
                    return res.send({ error: err });
                  }
                  if (deletingRow.affectedRows === 1) {
                    // Delete the user
                    pool.query(
                      `DELETE FROM users WHERE id = '${userId}'`,
                      (err, deletingRow) => {
                        if (err) {
                          return res.send({ error: err });
                        }
                        if (deletingRow.affectedRows === 1) {
                          return res.send({
                            success: true,
                            msg: "User deleted successfully",
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = router;
