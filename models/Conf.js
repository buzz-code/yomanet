const mongoose = require("mongoose");

const confSchema = mongoose.Schema({
    user: { type: String },
    extension: { type: String },
    extensionName: { type: String },
    phone: { type: String },
    identityType: { type: String },
    identityNumber: { type: String },
    name: { type: String },
    hebrew: { type: String },
    date: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
    totalTime: { type: String },
    confRoom: { type: String },
    enterType: { type: String },
});

const Conf = mongoose.model("Conf", confSchema);

module.exports = { Conf };
