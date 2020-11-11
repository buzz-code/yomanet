const { YemotConfBridge } = require("../../models/YemotConfBridge");
const dataByKlass = require("./templates/dataByKlass");

module.exports = dataByKlass(YemotConfBridge, "/confByKlass", "דוח ועידה");
