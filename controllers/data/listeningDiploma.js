const { YemotPlayback } = require("../../models/YemotPlayback");
const diploma = require("./templates/diploma");

module.exports = diploma(YemotPlayback, "/listenDiploma", "תעודת האזנה");
