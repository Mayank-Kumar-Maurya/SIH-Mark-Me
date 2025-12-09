const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const FacultyAuth = require("../models/Faculty");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

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

    router.route("/dashboard")
    .post(async(req, res)=>
    {
        let {rollno} = req.body;
        let resData = await Student.findOne({rollno});
        if(resData)
        {
            res.status(200).json({data: resData});
        }
        else{
            res.status(404).json({msg: "no data found"})
        }  
    });

    router.route("/FacultySignUp")
.post(async(req, res)=>
{
    try {
        let { facultyId, password} = req.body;
        console.log("user", facultyId);
        let userCheck = await FacultyAuth.findOne({facultyId});
        if(userCheck)
        {
            return res.status(400).json({error: "User already exist with this email"});
        }


    // ONE MORE WAY TO USE IT IS SEE MODEL FOLDER USER.JS FILE IN SCHEMA when new user is created their password first hashed and then save to db
    // const saltRounds = 10;
    // password = await bcrypt.hash(password, saltRounds);
   
        let userCreate = await FacultyAuth.create({
            facultyId: facultyId,
            password: password
        });
        console.log("new user", userCreate);
        res.status(201).json({message: "User Registered Successfully", token: await userCreate.generateToken(), userId: userCreate._id});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: `${error}`});
    }
});

    router.route("/FacultyLogin")
    .post(async(req, res)=>
        {
            try {
                let {facultyId, password} = req.body;
                console.log("ans", facultyId);
                let facultyCheck = await FacultyAuth.findOne({facultyId});
                if(facultyCheck)
                {
                    const match = await bcrypt.compare(password, facultyCheck.password);
                    
                    if(match)
                    {
                        console.log("yes match");
                        res.status(200).json({message: "Login Successfully", token: await facultyCheck.generateToken(), facultyId: facultyCheck._id});
                    }
                    else
                    {
                        res.status(401).json({error: "User Email or Password is Incorrect"});
                    }
                }
                else
                res.status(401).json({error: "User does not exist"});
        
            } catch (error) {
                console.log(error);
                res.status(500).json({error: `${error}`});
            }
        })



module.exports = router;