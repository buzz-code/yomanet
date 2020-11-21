const diploma = require("./templates/diploma");

const { YemotPlayback } = require("../../models/YemotPlayback");
const listenDiploma = diploma(YemotPlayback, "/listeningDiploma", "תעודת האזנה", "listening");

const { YemotConfBridge } = require("../../models/YemotConfBridge");
const confDiploma = diploma(YemotConfBridge, "/confDiploma", "תעודת ועידה", "conf");

const { YemotPlayDir } = require("../../models/YemotPlayDir");
const recordDiploma = diploma(YemotPlayDir, "/recordDiploma", "תעודת שיעורים מוקלטים", "record");

module.exports = { listenDiploma, confDiploma, recordDiploma };
