const { YemotPlayback } = require("../../models/YemotPlayback");
const dataByMegama = require("./templates/dataByMegama");

module.exports = dataByMegama(YemotPlayback, "/listeningByMegama", "דוח האזנה");
