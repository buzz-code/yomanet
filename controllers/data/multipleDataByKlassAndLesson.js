const queryUtil = require("../../helpers/dataUtils/queryUtil");
const { promiseAllSerial } = require("../../helpers/utils");
const { Lesson } = require("../../models/Lesson");
const { listeningByKlassAndLesson } = require("./dataByKlassAndLesson");

module.exports = {
    isMultiple: true,
    url: "/multipleListeningByKlassAndLesson",
    title: function (filter, { lessons }) {
        return lessons.map((item) => {
            const itemFilter = { ...filter, lesson: [{ label: item.displayName || item.messageName }] };
            return listeningByKlassAndLesson.title(itemFilter);
        });
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.dates);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.klass, queryUtil.megama, queryUtil.student);
        const lessonQuery = queryUtil.getQuery(user, filter, queryUtil.allLessons);
        if (!filter.allLessons && filter.lesson) {
            lessonQuery.push({ extension: new RegExp(`^(${filter.lesson.map((item) => item.value).join("|")})$`) });
        }
        const lessons = await Lesson.find({ $and: lessonQuery }, ["extension", "messageName", "displayName"]);

        return { query, studentQuery, lessons };
    },
    validate: async function (query, user, filter) {
        if (!(filter.klass && filter.klass.length) && !(filter.megama && filter.megama.length)) {
            return { isValid: false, errorMessage: "חובה לבחור כיתה או מגמה" };
        }
        if (!(filter.lesson && filter.lesson.length) && !filter.allLessons) {
            return { isValid: false, errorMessage: "חובה לבחור שיעור, או לסמן את כל השיעורים המתאימים" };
        }
        if (filter.format !== "PDF" && filter.format !== "EXCEL") {
            return { isValid: false, errorMessage: "להנפקת הדוחות לחצו על הכפתור Pdf או Excel" };
        }
        return { isValid: true, errorMessage: null };
    },
    data: async function (queries, page, filter, user) {
        const { query, studentQuery, lessons } = queries;
        const dataPromise = lessons.map(async (item) => {
            const dataQuery = [...query, { Folder: new RegExp(`^${item.extension}$`) }];
            const filter = { lesson: [{ label: item.displayName || item.messageName }] };
            return listeningByKlassAndLesson.data({ query: dataQuery, studentQuery }, page, filter);
        });
        const data = await promiseAllSerial(dataPromise);
        return data;
    },
    headers: async function (data, { lessons, ...queries }, filter, user) {
        const headersPromise = data.map(async (item, index) => {
            const filter = { lesson: [{ label: lessons[index].displayName || lessons[index].messageName }] };
            return listeningByKlassAndLesson.headers(item, queries, filter, user);
        });
        const headers = await promiseAllSerial(headersPromise);
        return headers;
    },
    count: async function (query) {
        return 0;
    },
};
