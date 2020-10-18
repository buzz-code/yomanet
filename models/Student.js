const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    user: { type: String },
    identityNumber: { type: String },
    name: { type: String, trim: true },
    grade: { type: String },
    classNum: { type: String },
    fullName: {
        type: String,
        default: function () {
            return `${this.grade} - ${this.classNum} ${this.name}`;
        },
    },
    fullKlassName: {
        type: String,
        default: function () {
            return `${this.grade}${this.classNum}`;
        },
    },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
