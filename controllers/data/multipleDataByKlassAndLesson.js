const multipleDataByKlassAndLesson = require("./templates/multipleDataByKlassAndLesson");
const { listeningByKlassAndLesson, confByKlassAndLesson, recordByKlassAndLesson } = require("./dataByKlassAndLesson");

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

const multipleRecordByKlassAndLesson = multipleDataByKlassAndLesson(
    "/multipleRecordByKlassAndLesson",
    "דוח שיעורים מוקלטים מרובה",
    recordByKlassAndLesson,
    "record"
);

module.exports = { multipleListeningByKlassAndLesson, multipleConfByKlassAndLesson, multipleRecordByKlassAndLesson };
