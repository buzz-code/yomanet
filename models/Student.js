const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    user: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    identityNumber: { type: String, trim: true },
    name: { type: String, trim: true, trim: true },
    grade: { type: String, trim: true },
    classNum: { type: String, trim: true },
    megama: { type: String, trim: true },
    fullName: {
        type: String,
        trim: true,
        default: function () {
            return `${this.grade} - ${this.classNum} ${this.name}`;
        },
    },
    fullKlassName: {
        type: String,
        trim: true,
        default: function () {
            return `${this.grade}${this.classNum}`;
        },
    },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
