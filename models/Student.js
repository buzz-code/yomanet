const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    user: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    identityNumber: { type: String, trim: true },
    name: { type: String, trim: true, trim: true },
    grade: { type: String, trim: true },
    classNum: { type: String, trim: true },
    megama: [{ type: String, trim: true }],
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

studentSchema.index({ user: 1 });
studentSchema.index({ user: 1, fullKlassName: 1 });
studentSchema.index({ user: 1, megama: 1 });
studentSchema.index({ user: 1, name: 1 });
studentSchema.index({ user: 1, fullName: 1 });
studentSchema.index({ user: 1, name: 1, fullName: 1 });
studentSchema.index({ user: 1, name: 1, megama: 1 });
studentSchema.index({ user: 1, fullName: 1, megama: 1 });
studentSchema.index({ user: 1, name: 1, fullName: 1, megama: 1 });
studentSchema.index({ user: 1, identityNumber: 1 });
studentSchema.index({ user: 1, megama: 1, identityNumber: 1 });
studentSchema.index({ user: 1, name: 1, identityNumber: 1 });
studentSchema.index({ user: 1, fullName: 1, identityNumber: 1 });
studentSchema.index({ user: 1, name: 1, fullName: 1, identityNumber: 1 });
studentSchema.index({ user: 1, name: 1, megama: 1, identityNumber: 1 });
studentSchema.index({ user: 1, fullName: 1, megama: 1, identityNumber: 1 });
studentSchema.index({ user: 1, name: 1, fullName: 1, megama: 1, identityNumber: 1 });

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
