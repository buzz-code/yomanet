const dataByKlassAndLesson = require("./templates/dataByKlassAndLesson");

const { YemotPlayback } = require("../../models/YemotPlayback");
const listeningByKlassAndLesson = dataByKlassAndLesson(
    YemotPlayback,
    "/listeningByKlassAndLesson",
    "דוח האזנה",
    "listening"
);

const { YemotConfBridge } = require("../../models/YemotConfBridge");
const confByKlassAndLesson = dataByKlassAndLesson(YemotConfBridge, "/confByKlassAndLesson", "דוח ועידה", "conf");

const { YemotPlayDir } = require("../../models/YemotPlayDir");
const recordByKlassAndLesson = dataByKlassAndLesson(
    YemotPlayDir,
    "/recordByKlassAndLesson",
    "דוח שיעורים מוקלטים",
    "record"
);

module.exports = { listeningByKlassAndLesson, confByKlassAndLesson, recordByKlassAndLesson };
