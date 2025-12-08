const mongoose = require("mongoose");

const facultyAuthSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required : true,
    }

});

const FacultyAuth = mongoose.model("FacultyAuth", facultyAuthSchema);
module.exports = FacultyAuth;