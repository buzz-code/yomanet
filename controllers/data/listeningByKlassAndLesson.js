const constants = require("../../helpers/constants");
const moment = require("moment");
const { YemotPlayback } = require("../../models/YemotPlayback");
const { Lesson } = require("../../models/Lesson");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");
const aggregateByKlassAndLesson = require("./dataUtils/aggregateByKlassAndLesson");
const titleUtil = require("../../helpers/titleUtil");

module.exports = {
    url: "/listeningByKlassAndLesson",
    title: function (filter) {
        return titleUtil.getTitle("דוח האזנה", filter, titleUtil.singleKlass, titleUtil.singleLesson, titleUtil.dates);
    },
    query: async function (body, user) {
        const { klass, lesson, fromDate, toDate } = body;

        const query = [{ user: user.name }];
        const studentQuery = [{ user: user.name }];
        if (lesson && lesson.length) query.push({ Folder: new RegExp(lesson.map((item) => item.value).join("|")) });
        if (klass && klass.length)
            studentQuery.push({ fullName: new RegExp(`^(${klass.map((item) => item.value).join("|")}).*`) });
        if (fromDate) query.push({ EnterDate: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) query.push({ EnterDate: { $lte: moment.utc(toDate).toDate() } });

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
        const { query, studentQuery } = queries;
        const students = await Student.find({ $and: studentQuery }, ["identityNumber", "name"], {
            ...getPagingConfig(page),
            sort: { name: 1 },
        }).lean();
        query.push({ EnterId: { $in: students.map((item) => item.identityNumber) } });

        const listenings = await YemotPlayback.aggregate(aggregateByKlassAndLesson(query));
        const listeningById = {};
        listenings.map((item) => (listeningById[item.EnterId] = item));

        return students.map((item) => ({
            name: item.name,
            ...listeningById[item.identityNumber],
            extension: filter.lesson[0].label,
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
