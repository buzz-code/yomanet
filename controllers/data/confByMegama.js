const { YemotConfBridge } = require("../../models/YemotConfBridge");
const dataByMegama = require("./templates/dataByMegama");

module.exports = dataByMegama(YemotConfBridge, "/confByMegama", "דוח ועידה");
