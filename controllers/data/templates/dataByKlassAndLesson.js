const { Student } = require("../../../models/Student");
const titleUtil = require("../../../helpers/dataUtils/titleUtil");
const queryUtil = require("../../../helpers/dataUtils/queryUtil");
const { getDataById, getLessonInstancesForKlassAndLesson } = require("../../../helpers/dataUtils/utils");
const { getAggregateByKlassAndLesson } = require("../../../helpers/dataUtils/aggregateUtil");
const { getSec2Min } = require("../../../helpers/format");

module.exports = (model, url, title, reportType) => ({
    url,
    title: function (filter) {
        return titleUtil.getTitle(
            title,
            filter,
            titleUtil.singleKlass,
            titleUtil.singleMegama,
            titleUtil.singleLesson,
            titleUtil.dates
        );
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.lesson, queryUtil.dates);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.klass, queryUtil.megama, queryUtil.student);

        return { query, studentQuery };
    },
    validate: async function (query, user, filter) {
        if (
            ((filter.klass && filter.klass.length) || (filter.megama && filter.megama.length)) &&
            filter.lesson &&
            filter.lesson.length
        ) {
            return { isValid: true, errorMessage: null };
        }
        return {
            isValid: false,
            errorMessage:
                (filter.klass && filter.klass.length) || (filter.megama && filter.megama.length)
                    ? "חובה לבחור שיעור"
                    : "חובה לבחור כיתה או מגמה",
        };
    },
    data: async function (queries, page, filter) {
        const { query, students } = await queryUtil.getQueryWithStudentIds(queries, page);

        const dataById = await getDataById(model, getAggregateByKlassAndLesson(query, reportType));

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

        const { fileLengthByKey, lessonTitleByKey, firstListeningByKey } = await getLessonInstancesForKlassAndLesson(
            filter.lesson[0].value,
            keys,
            user,
            reportType
        );

        const headers = [
            { label: "שם התלמידה", value: "name", format: "nameWOKlass" },
            { label: "שם השיעור", value: "extension" },
            ...[...keys]
                .filter((item) => item !== "name" && item !== "extension" && item !== "Folder" && item !== "EnterId")
                .sort()
                .map((item) => ({
                    value: item,
                    label: getHeaderTitle(item, fileLengthByKey, lessonTitleByKey, firstListeningByKey),
                    format: "sec2min",
                })),
        ];

        return headers;
    },
    count: async function (queries) {
        const { studentQuery } = queries;
        return await Student.countDocuments({ $and: studentQuery });
    },
});

function getHeaderTitle(item, fileLengthByKey, lessonTitleByKey, firstListeningByKey) {
    if (lessonTitleByKey[item]) {
        return `${lessonTitleByKey[item]} (${item}) ${firstListeningByKey[item] || ""} - ${getSec2Min(
            fileLengthByKey[item]
        )}`;
    }
    return `${item} ${firstListeningByKey[item]} - ${getSec2Min(fileLengthByKey[item])}`;
}
