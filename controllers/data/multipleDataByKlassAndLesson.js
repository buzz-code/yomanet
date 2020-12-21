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

const multipleListeningPercentByKlassAndLesson = multipleDataByKlassAndLesson(
    "/multipleListeningPercentByKlassAndLesson",
    "דוח האזנה מרובה - אחוזים",
    listeningByKlassAndLesson,
    "listening",
    true
);

const multipleConfPercentByKlassAndLesson = multipleDataByKlassAndLesson(
    "/multipleConfPercentByKlassAndLesson",
    "דוח ועידה מרובה - אחוזים",
    confByKlassAndLesson,
    "conf",
    true
);

const multipleRecordPercentByKlassAndLesson = multipleDataByKlassAndLesson(
    "/multipleRecordPercentByKlassAndLesson",
    "דוח שיעורים מוקלטים מרובה - אחוזים",
    recordByKlassAndLesson,
    "record",
    true
);

module.exports = {
    multipleListeningByKlassAndLesson,
    multipleConfByKlassAndLesson,
    multipleRecordByKlassAndLesson,
    multipleListeningPercentByKlassAndLesson,
    multipleConfPercentByKlassAndLesson,
    multipleRecordPercentByKlassAndLesson,
};
