const constants = require("../../helpers/constants");
const moment = require("moment");
const { YemotPlayback } = require("../../models/YemotPlayback");
const { Lesson } = require("../../models/Lesson");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");
const aggregateByKlassOrMegama = require("./dataUtils/aggregateByKlassOrMegama");
const titleUtil = require("../../helpers/titleUtil");
const queryUtil = require("../../helpers/queryUtil");

module.exports = {
    url: "/listeningByKlass",
    title: function (filter) {
        return titleUtil.getTitle("דוח האזנה", filter, titleUtil.singleKlass, titleUtil.lesson, titleUtil.dates);
    },
    query: async function (body, user) {
        const { klass, lesson, fromDate, toDate } = body;

        const query = queryUtil.getQuery(user);
        const studentQuery = queryUtil.getQuery(user);
        queryUtil.klass(filter, studentQuery);
        queryUtil.dates(filter, query);
        queryUtil.lesson(filter, query);

        return { query, studentQuery };
    },
    validate: async function (query, user, filter) {
        if (filter.klass && filter.klass.length) {
            return { isValid: true, errorMessage: null };
        }
        return { isValid: false, errorMessage: "חובה לבחור כיתה" };
    },
    data: async function (queries, page) {
        const { query, studentQuery } = queries;
        const students = await Student.find({ $and: studentQuery }, ["identityNumber", "name"], {
            ...getPagingConfig(page),
            sort: { name: 1 },
        }).lean();
        query.push({ EnterId: { $in: students.map((item) => item.identityNumber) } });

        const listenings = await YemotPlayback.aggregate(aggregateByKlassOrMegama(query));
        const listeningById = {};
        listenings.map((item) => (listeningById[item.EnterId] = item));

        return students.map((item) => ({
            name: item.name,
            ...listeningById[item.identityNumber],
        }));
    },
    headers: async function (data, query, filter, user) {
        const keys = new Set();
        data.forEach((item) => {
            for (const key in item) {
                keys.add(key);
            }
        });

        const lessons = await Lesson.find({ user: user.name, extension: { $in: [...keys] } }).lean();
        const lessonByExt = {};
        lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));

        const headers = [
            { label: "שם התלמידה", value: "name", format: "nameWOKlass" },
            ...[...keys]
                .filter((item) => item !== "name" && item !== "EnterId")
                .sort()
                .map((item) => ({ value: item, label: lessonByExt[item] || item, format: "sec2min" })),
        ];

        return headers;
    },
    count: async function (queries) {
        const { studentQuery } = queries;
        return await Student.countDocuments({ $and: studentQuery });
    },
};
