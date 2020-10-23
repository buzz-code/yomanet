const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
    user: { type: String, trim: true },
    extension: { type: String, trim: true },
    messageName: { type: String, trim: true },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = { Lesson };
