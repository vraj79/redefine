const express = require("express");
const router = express.Router();
const db = require("../db/projects/dbcrud")
const pool = require('../db/conn')
const nodemailer = require('nodemailer');




// Update data with specific id
router.post('/', async (req, res, next) => {


    req.header('Access-Control-Allow-Origin', '*');

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: "developerruchi0@gmail.com",
            pass: "lymrxffytwplmayy"
        }
    });

    let mailOptions = {
        from: 'developerruchi0@gmail.com',
        to: req.body.email,
        subject: "Testing mail",
        html:
            `<h2>Hello User,</h2>
        <p>Test Email</p>        
        `
    }

    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log("error");
            res.send("Success")
        }
    })
    res.send("Working good");
})

module.exports = router;