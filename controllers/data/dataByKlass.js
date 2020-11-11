const dataByKlass = require("./templates/dataByKlass");

const { YemotConfBridge } = require("../../models/YemotConfBridge");
const confByKlass = dataByKlass(YemotConfBridge, "/confByKlass", "דוח ועידה");

const { YemotPlayback } = require("../../models/YemotPlayback");
const listeningByKlass = dataByKlass(YemotPlayback, "/listeningByKlass", "דוח האזנה");

module.exports = { confByKlass, listeningByKlass };
