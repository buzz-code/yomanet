const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
    user: { type: String },
    extension: { type: String },
    messageName: { type: String },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = { Lesson };
