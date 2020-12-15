const multipleDataByKlassAndLesson = require("./templates/multipleDataByKlassAndLesson");
const { listeningByKlassAndLesson, confByKlassAndLesson } = require("./dataByKlassAndLesson");

const multipleListeningByKlassAndLesson = multipleDataByKlassAndLesson(
    "/multipleListeningByKlassAndLesson",
    "דוח האזנה מרובה",
    listeningByKlassAndLesson,
    "listening"
);

const multipleConfByKlassAndLesson = multipleDataByKlassAndLesson(
    "/multipleConfByKlassAndLesson",
    "דוח ועידה מרובה",
    confByKlassAndLesson,
    "conf"
);

module.exports = { multipleListeningByKlassAndLesson, multipleConfByKlassAndLesson };
