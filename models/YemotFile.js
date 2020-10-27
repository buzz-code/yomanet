const mongoose = require("mongoose");

const yemotFileSchema = mongoose.Schema({
    user: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    fileName: { type: String, trim: true },
    fullPath: { type: String, trim: true },
    status: { type: String, trim: true },
});

const YemotFile = mongoose.model("YemotFile", yemotFileSchema);

module.exports = { YemotFile };
