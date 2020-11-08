const mongoose = require("mongoose");

const yemotPlaybackSchema = mongoose.Schema({
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
    PositionPlay: { type: Number },
    PositionStop: { type: Number },
    ExitTime: { type: Date },
    TimeTotal: { type: Number },
});

yemotPlaybackSchema.index({ user: 1 });
yemotPlaybackSchema.index({ user: 1, EnterId: 1 });
yemotPlaybackSchema.index({ user: 1, EnterDate: 1 });
yemotPlaybackSchema.index({ user: 1, Folder: 1 });
yemotPlaybackSchema.index({ user: 1, Folder: 1, EnterId: 1 });
yemotPlaybackSchema.index({ user: 1, Folder: 1, EnterDate: 1 });
yemotPlaybackSchema.index({ user: 1, EnterId: 1, EnterDate: 1 });
yemotPlaybackSchema.index({ user: 1, Folder: 1, EnterId: 1, EnterDate: 1 });
yemotPlaybackSchema.index({ user: 1, TimeTotal: 1 });
yemotPlaybackSchema.index({ user: 1, EnterId: 1, TimeTotal: 1 });
yemotPlaybackSchema.index({ user: 1, EnterDate: 1, TimeTotal: 1 });
yemotPlaybackSchema.index({ user: 1, Folder: 1, TimeTotal: 1 });
yemotPlaybackSchema.index({ user: 1, Folder: 1, EnterId: 1, TimeTotal: 1 });
yemotPlaybackSchema.index({ user: 1, Folder: 1, EnterDate: 1, TimeTotal: 1 });
yemotPlaybackSchema.index({ user: 1, EnterId: 1, EnterDate: 1, TimeTotal: 1 });
yemotPlaybackSchema.index({ user: 1, Folder: 1, EnterId: 1, EnterDate: 1, TimeTotal: 1 });

const YemotPlayback = mongoose.model("YemotPlayback", yemotPlaybackSchema);

module.exports = { YemotPlayback };
