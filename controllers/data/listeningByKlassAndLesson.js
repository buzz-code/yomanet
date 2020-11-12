const { YemotPlayback } = require("../../models/YemotPlayback");
const { Student } = require("../../models/Student");
const titleUtil = require("../../helpers/dataUtils/titleUtil");
const queryUtil = require("../../helpers/dataUtils/queryUtil");
const { getDataById } = require("../../helpers/dataUtils/utils");
const { getAggregateByKlassAndLesson } = require("../../helpers/dataUtils/aggregateUtil");
const { LessonInstance } = require("../../models/LessonInstance");
const { getSec2Min } = require("../../helpers/format");

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
        const { query, students } = await queryUtil.getQueryWithStudentIds(queries, page);

        const dataById = await getDataById(YemotPlayback, getAggregateByKlassAndLesson(query));

        return students.map((item) => ({
            name: item.name,
            extension: filter.lesson[0].label,
            ...dataById[item.identityNumber],
        }));
    },
    headers: async function (data, query, filter, user) {
        const keys = new Set();
        data.forEach((item) => {
            for (const key in item) {
                keys.add(key);
            }
        });

        const fileLengths = await LessonInstance.find(
            {
                user: user.name,
                Folder: filter.lesson[0].value,
                Current: { $in: [...keys] },
            },
            ["Current", "FileLength"]
        ).lean();
        const fileLengthByKey = {};
        fileLengths.forEach((item) => (fileLengthByKey[item.Current] = item.FileLength));

        const headers = [
            { label: "שם התלמידה", value: "name", format: "nameWOKlass" },
            { label: "שם השיעור", value: "extension" },
            ...[...keys]
                .filter((item) => item !== "name" && item !== "extension" && item !== "Folder" && item !== "EnterId")
                .sort()
                .map((item) => ({
                    value: item,
                    label: `${item} - ${getSec2Min(fileLengthByKey[item])}`,
                    format: "sec2min",
                })),
        ];

        return headers;
    },
    count: async function (queries) {
        const { studentQuery } = queries;
        return await Student.countDocuments({ $and: studentQuery });
    },
};
