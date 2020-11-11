const { YemotConfBridge } = require("../../models/YemotConfBridge");
const diploma = require("./templates/diploma");

module.exports = diploma(YemotConfBridge, "/confDiploma", "תעודת ועידה");
