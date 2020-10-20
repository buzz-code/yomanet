const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
    fileName: { type: String },
    md5: { type: String },
    createdAt: { type: Date, default: Date.now },
    user: { type: String },
});

const File = mongoose.model("File", fileSchema);

module.exports = { File };
