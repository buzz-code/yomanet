const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    fileName: { type: String, trim: true },
    md5: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: String, trim: true },
});

fileSchema.index({ user: 1 });
fileSchema.index({ user: 1, md5: 1 });

const File = mongoose.model("File", fileSchema);

module.exports = { File };
