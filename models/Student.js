const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    identityNumber: { type: String },
    name: { type: String },
    grade: { type: String },
    classNum: { type: String },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
