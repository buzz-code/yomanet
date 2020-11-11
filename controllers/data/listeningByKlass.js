const { YemotPlayback } = require("../../models/YemotPlayback");
const dataByKlass = require("./templates/dataByKlass");

module.exports = dataByKlass(YemotPlayback, "/listeningByKlass", "דוח האזנה");
