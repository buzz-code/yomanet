const mongoose = require("mongoose");

const confSchema = mongoose.Schema({
    user: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    extension: { type: String, trim: true },
    extensionName: { type: String, trim: true },
    phone: { type: String, trim: true },
    identityType: { type: String, trim: true },
    identityNumber: { type: String, trim: true },
    name: { type: String, trim: true },
    hebrew: { type: String, trim: true },
    date: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date },
    seconds: { type: Number },
    confRoom: { type: String, trim: true },
    enterType: { type: String, trim: true },
});

const Conf = mongoose.model("Conf", confSchema);

module.exports = { Conf };
