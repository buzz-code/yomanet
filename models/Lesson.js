const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
    extension: { type: String },
    messageName: { type: String },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = { Lesson };
