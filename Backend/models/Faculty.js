const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const facultyAuthSchema = mongoose.Schema({
    facultyId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required : true,
    }

});

facultyAuthSchema.pre('save', async function(next) // dont use arrow function because this. is not work in arraow function 
{
    try {

        if(!this.isModified("password"))
        {
            next();
        }
        const saltRounds = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, saltRounds);
        
    } catch (error) {
        console.log(error);
        next(error);    
    }
});


// now we can create our custom methods(it is an instant method) like generateToken by using .method

facultyAuthSchema.methods.generateToken = async function()
{
    try {
        // playlode
        return jwt.sign(
            {
                facultyId: this.facultyId,
            },

            // pass signature means secret
            process.env.SECRET,
            // optional session duration
            {
                expiresIn: "15d"
            }
        )

    } catch (error) {
        console.log(error);
    }
}

const FacultyAuth = mongoose.model("FacultyAuth", facultyAuthSchema);
module.exports = FacultyAuth;