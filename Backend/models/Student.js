const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
    {
        year: {
            type: Number,
            required: true
        },
        branch: {
            type: String,
            required: true,
        },
        rollno: {
            type: Number,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        attendance: {
            type: Number,
            default: 0,
        },
        faceDescriptorCode: {
            type: [String],
            // required: true,
        }
    }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;