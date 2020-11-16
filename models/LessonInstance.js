const mongoose = require("mongoose");

const lessonInstanceSchema = mongoose.Schema({
    user: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    Folder: { type: String, trim: true },
    Current: { type: String, trim: true },
    FileLength: { type: Number },
    LongestListening: { type: Number },
});

lessonInstanceSchema.index({ user: 1 });
lessonInstanceSchema.index({ user: 1, Folder: 1 });
lessonInstanceSchema.index({ user: 1, Current: 1 });
lessonInstanceSchema.index({ user: 1, Folder: 1, Current: 1 });

const LessonInstance = mongoose.model("LessonInstance", lessonInstanceSchema);

module.exports = { LessonInstance };
