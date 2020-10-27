const mongoose = require("mongoose");

const yemotConfBridgeSchema = mongoose.Schema({
    user: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    fileName: { type: String, trim: true },
    Folder: { type: String, trim: true },
    title: { type: String, trim: true },
    Phone: { type: String, trim: true },
    IdType: { type: String, trim: true },
    EnterId: { type: String, trim: true },
    ValName: { type: String, trim: true },
    EnterHebrewDate: { type: String, trim: true },
    EnterDate: { type: Date },
    EnterTime: { type: Date },
    ExitTime: { type: Date },
    ConfBridge: { type: String, trim: true },
    Type: { type: String, trim: true },
    TimeTotal: { type: Number },
});

const YemotConfBridge = mongoose.model("YemotConfBridge", yemotConfBridgeSchema);

module.exports = { YemotConfBridge };
