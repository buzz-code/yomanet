const moment = require("moment");

function getTitle(prefix, filter, ...titleParts) {
    return [prefix, ...titleParts.map((item) => item(filter))].join("");
}

function singleKlass({ klass }) {
    let title = " לכיתה ";
    title += klass.map((item) => item.label).join("");
    return title;
}

function singleMegama({ megama }) {
    let title = " למגמה ";
    title += megama.map((item) => item.label).join("");
    return title;
}

function singleLesson({ lesson }) {
    let title = "";
    if (lesson && lesson.length) title += " לשיעור " + lesson.map((item) => item.label).join("");
    return title;
}

function klass({ klass }) {
    let title = "";
    if (klass && klass.length && klass.length <= 5) title += " לכיתות " + klass.map((item) => item.label).join("");
    return title;
}

function megama({ megama }) {
    let title = "";
    if (megama && megama.length && megama.length <= 5) title += " למגמות " + megama.map((item) => item.label).join("");
    return title;
}

function lesson({ lesson }) {
    let title = "";
    if (lesson && lesson.length && lesson.length <= 5)
        title += " לשיעורים " + lesson.map((item) => item.label).join(",");
    return title;
}

function dates({ fromDate, toDate }) {
    let title = "";
    if (fromDate) title += " מתאריך " + moment.utc(fromDate).format("DD-MM-YYYY");
    if (toDate) title += " עד תאריך " + moment.utc(toDate).format("DD-MM-YYYY");
    return title;
}

module.exports = {
    getTitle,
    singleKlass,
    singleMegama,
    singleLesson,
    klass,
    megama,
    lesson,
    dates,
};
