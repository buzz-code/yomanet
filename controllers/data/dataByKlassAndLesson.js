const dataByKlassAndLesson = require("./templates/dataByKlassAndLesson");

const { YemotConfBridge } = require("../../models/YemotConfBridge");
const confByKlassAndLesson = dataByKlassAndLesson(YemotConfBridge, "/confByKlassAndLesson", "דוח ועידה", "conf");

const { YemotPlayback } = require("../../models/YemotPlayback");
const listeningByKlassAndLesson = dataByKlassAndLesson(
    YemotPlayback,
    "/listeningByKlassAndLesson",
    "דוח האזנה",
    "listening"
);

const { YemotPlayDir } = require("../../models/YemotPlayDir");
const recordByKlassAndLesson = dataByKlassAndLesson(
    YemotPlayDir,
    "/recordByKlassAndLesson",
    "דוח שיעורים מוקלטים",
    "record"
);

module.exports = { confByKlassAndLesson, listeningByKlassAndLesson, recordByKlassAndLesson };
