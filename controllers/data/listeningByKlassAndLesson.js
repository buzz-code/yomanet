const { YemotPlayback } = require("../../models/YemotPlayback");
const { Student } = require("../../models/Student");
const aggregateByKlassAndLesson = require("./dataUtils/aggregateByKlassAndLesson");
const titleUtil = require("../../helpers/titleUtil");
const queryUtil = require("../../helpers/queryUtil");
const { getQueryWithStudentIds } = require("../../helpers/queryUtil");
const { getDataById } = require("./dataUtils/utils");

module.exports = {
    url: "/listeningByKlassAndLesson",
    title: function (filter) {
        return titleUtil.getTitle("דוח האזנה", filter, titleUtil.singleKlass, titleUtil.singleLesson, titleUtil.dates);
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.lesson, queryUtil.dates);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.klass);

        return { query, studentQuery };
    },
    validate: async function (query, user, filter) {
        if (filter.klass && filter.klass.length && filter.lesson && filter.lesson.length) {
            return { isValid: true, errorMessage: null };
        }
        return {
            isValid: false,
            errorMessage: filter.klass && filter.klass.length ? "חובה לבחור שיעור" : "חובה לבחור כיתה",
        };
    },
    data: async function (queries, page, filter) {
        const { query, students } = await getQueryWithStudentIds(queries, page);

        const dataById = await getDataById(YemotPlayback, aggregateByKlassAndLesson(query));

        return students.map((item) => ({
            name: item.name,
            extension: filter.lesson[0].label,
            ...dataById[item.identityNumber],
        }));
    },
    headers: async function (data, query, body) {
        const keys = new Set();
        data.forEach((item) => {
            for (const key in item) {
                keys.add(key);
            }
        });

        const headers = [
            { label: "שם התלמידה", value: "name", format: "nameWOKlass" },
            { label: "שם השיעור", value: "extension" },
            ...[...keys]
                .filter((item) => item !== "name" && item !== "Folder" && item !== "EnterId")
                .sort()
                .map((item) => ({ value: item, label: item, format: "sec2min" })),
        ];

        return headers;
    },
    count: async function (queries) {
        const { studentQuery } = queries;
        return await Student.countDocuments({ $and: studentQuery });
    },
};
