const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.route("/CreateStudent")
    .post(async (req, res) => {
        try {
            let { year2, branch2, subject2, rollno,faceDescriptorCode, lat, log } = req.body;
            console.log("hello", req.body);
            console.log(year2)
            let student = new Student(
                {
                    year: year2,
                    branch: branch2,
                    // subject: sub,
                    rollno: rollno,
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