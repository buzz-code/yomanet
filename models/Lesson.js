const mongoose = require("mongoose");

const lessonSchema = mongoose.Schema({
    user: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    extension: { type: String, trim: true },
    messageName: { type: String, trim: true },
});

lessonSchema.index({ user: 1 });
lessonSchema.index({ user: 1, extension: 1 });
lessonSchema.index({ user: 1, messageName: 1 });
lessonSchema.index({ user: 1, extension: 1, messageName: 1 });

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = { Lesson };
