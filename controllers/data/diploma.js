const diploma = require("./templates/diploma");

const { YemotConfBridge } = require("../../models/YemotConfBridge");
const confDiploma = diploma(YemotConfBridge, "/confDiploma", "תעודת ועידה");

const { YemotPlayback } = require("../../models/YemotPlayback");
const listenDiploma = diploma(YemotPlayback, "/listeningDiploma", "תעודת האזנה");

module.exports = { confDiploma, listenDiploma };
