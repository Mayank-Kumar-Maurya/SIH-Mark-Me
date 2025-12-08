const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.route("/CreateStudent")
    .post(async (req, res) => {
        try {
            let { year, branch, subject, rollno,faceDescriptorCode, lat, log } = req.body;
            console.log(req.body);
            let student = new Student(
                {
                    year,
                    branch,
                    subject,
                    rollno,
                    faceDescriptorCode,
                    lat,
                    log
                });
            let newStudent = await student.save();

            console.log(newStudent);
            res.send("success");
        } catch (error) {
            console.log("err at studCreation", error);
            res.send(error);
        }
    });



module.exports = router;