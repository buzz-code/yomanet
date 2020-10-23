const mongoose = require("mongoose");

const listeningSchema = mongoose.Schema({
    user: { type: String, trim: true },
    extension: { type: String, trim: true },
    listening: { type: String, trim: true },
    phone: { type: String, trim: true },
    identityType: { type: String, trim: true },
    identityNumber: { type: String, trim: true },
    name: { type: String, trim: true },
    hebrew: { type: String, trim: true },
    date: { type: Date },
    startTime: { type: String, trim: true },
    startPoing: { type: String, trim: true },
    endPoint: { type: String, trim: true },
    endTime: { type: String, trim: true },
    seconds: { type: Number },
});

const Listening = mongoose.model("Listening", listeningSchema);

module.exports = { Listening };
