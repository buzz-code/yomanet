const dataByKlassOrMegama = require("./templates/dataByKlassOrMegama");

const { YemotConfBridge } = require("../../models/YemotConfBridge");
const confByKlassOrMegama = dataByKlassOrMegama(YemotConfBridge, "/confByKlassOrMegama", "דוח ועידה");

const { YemotPlayback } = require("../../models/YemotPlayback");
const listeningByKlassOrMegama = dataByKlassOrMegama(YemotPlayback, "/listeningByKlassOrMegama", "דוח האזנה");

module.exports = { confByKlassOrMegama, listeningByKlassOrMegama };
