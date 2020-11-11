const dataByMegama = require("./templates/dataByMegama");

const { YemotConfBridge } = require("../../models/YemotConfBridge");
const confByMegama = dataByMegama(YemotConfBridge, "/confByMegama", "דוח ועידה");

const { YemotPlayback } = require("../../models/YemotPlayback");
const listeningByMegama = dataByMegama(YemotPlayback, "/listeningByMegama", "דוח האזנה");

module.exports = { confByMegama, listeningByMegama };
