const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
    user: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    extension: { type: String, trim: true },
    messageName: { type: String, trim: true },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = { Lesson };
