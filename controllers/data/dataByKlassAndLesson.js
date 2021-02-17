const { Student } = require("../../models/Student");
const titleUtil = require("../../helpers/dataUtils/titleUtil");
const queryUtil = require("../../helpers/dataUtils/queryUtil");
const { getDataById, getLessonInstancesForKlassAndLesson, getHeaderTitle } = require("../../helpers/dataUtils/utils");
const { getAggregateByKlassAndLesson } = require("../../helpers/dataUtils/aggregateUtil");
const { YemotPlayback } = require("../../models/YemotPlayback");
const { YemotConfBridge } = require("../../models/YemotConfBridge");
const { YemotPlayDir } = require("../../models/YemotPlayDir");

module.exports = {
    url: "/dataByKlassAndLesson/:type",
    title: function (filter, query, params) {
        const { title } = moduleMapping[params.type];
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
    data: async function (queries, page, filter, user, params) {
        const { model, groupField } = moduleMapping[params.type];

        const { query, students } = await queryUtil.getQueryWithStudentIds(queries, page);
        console.log('query', query)
        const dataById = await getDataById(model, getAggregateByKlassAndLesson(query, groupField));

        return students.map((item) => ({
            name: item.name,
            extension: filter.lesson[0].label,
            ...dataById[item.identityNumber],
        }));
    },
    headers: async function (data, query, filter, user, params) {
        const { groupField } = moduleMapping[params.type];
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
            groupField,
            params.type
        );

        const headers = [
            { label: "שם התלמידה", value: "name", format: "nameWOKlass" },
            { label: "שם השיעור", value: "extension" },
            ...[...keys]
                .filter((item) => item !== "name" && item !== "extension" && item !== "Folder" && item !== "EnterId")
                .sort()
                .map((item) => ({
                    value: item,
                    label: getHeaderTitle(
                        item,
                        groupField,
                        null,
                        fileLengthByKey,
                        lessonTitleByKey,
                        firstListeningByKey
                    ),
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

const moduleMapping = {
    listening: {
        model: YemotPlayback,
        title: "דוח האזנה",
        groupField: "current",
    },
    conf: {
        model: YemotConfBridge,
        title: "דוח ועידה",
        groupField: "enterDate",
    },
    record: {
        model: YemotPlayDir,
        title: "דוח שיעורים מוקלטים",
        groupField: "enterDate",
    },
    listeningByDate: {
        model: YemotPlayback,
        title: "דוח האזנה",
        groupField: "enterDate",
    },
};
