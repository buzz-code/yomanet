const mongoose = require("mongoose");

const listeningSchema = mongoose.Schema({
    extension: { type: String },
    listening: { type: String },
    phone: { type: String },
    identityType: { type: String },
    identityNumber: { type: String },
    name: { type: String },
    hebrew: { type: String },
    date: { type: Date },
    startTime: { type: String },
    startPoing: { type: String },
    endPoint: { type: String },
    endTime: { type: String },
    seconds: { type: Number },
});

const Listening = mongoose.model("Listening", listeningSchema);

module.exports = { Listening };
