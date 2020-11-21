const mongoose = require("mongoose");

const yemotPlayDirSchema = mongoose.Schema({
    user: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    fileName: { type: String, trim: true },
    Folder: { type: String, trim: true },
    Current: { type: String, trim: true },
    Phone: { type: String, trim: true },
    IdType: { type: String, trim: true },
    EnterId: { type: String, trim: true },
    ValName: { type: String, trim: true },
    EnterHebrewDate: { type: String, trim: true },
    EnterDate: { type: Date },
    EnterTime: { type: Date },
    ExitTime: { type: Date },
    TimeTotal: { type: Number },
    FileLength: { type: Number },
});

yemotPlayDirSchema.index({ user: 1 });
yemotPlayDirSchema.index({ user: 1, EnterId: 1 });
yemotPlayDirSchema.index({ user: 1, EnterDate: 1 });
yemotPlayDirSchema.index({ user: 1, Folder: 1 });
yemotPlayDirSchema.index({ user: 1, Folder: 1, EnterId: 1 });
yemotPlayDirSchema.index({ user: 1, Folder: 1, EnterDate: 1 });
yemotPlayDirSchema.index({ user: 1, EnterId: 1, EnterDate: 1 });
yemotPlayDirSchema.index({ user: 1, Folder: 1, EnterId: 1, EnterDate: 1 });

const YemotPlayDir = mongoose.model("YemotPlayDir", yemotPlayDirSchema);

module.exports = { YemotPlayDir };
