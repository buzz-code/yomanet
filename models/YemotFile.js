const mongoose = require("mongoose");

const yemotFileSchema = mongoose.Schema({
    user: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    fileName: { type: String, trim: true },
    fullPath: { type: String, trim: true },
    status: { type: String, trim: true },
});

yemotFileSchema.index({ user: 1 });
yemotFileSchema.index({ status: 1 });
yemotFileSchema.index({ user: 1, status: 1 });
yemotFileSchema.index({ user: 1, fullPath: 1 });

const YemotFile = mongoose.model("YemotFile", yemotFileSchema);

module.exports = { YemotFile };
