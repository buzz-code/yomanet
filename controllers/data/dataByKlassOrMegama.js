const { Student } = require("../../models/Student");
const titleUtil = require("../../helpers/dataUtils/titleUtil");
const queryUtil = require("../../helpers/dataUtils/queryUtil");
const { getExtensionHeaders, getDataById, getLessonInstancesForDiploma } = require("../../helpers/dataUtils/utils");
const { getAggregateByKlassOrMegama } = require("../../helpers/dataUtils/aggregateUtil");
const { YemotPlayback } = require("../../models/YemotPlayback");
const { YemotConfBridge } = require("../../models/YemotConfBridge");
const { YemotPlayDir } = require("../../models/YemotPlayDir");
const { getSec2Min } = require("../../helpers/format");

module.exports = {
    url: "/dataByKlassOrMegama/:type",
    title: function (filter, query, params) {
        const { title } = moduleMapping[params.type];
        return titleUtil.getTitle(
            title,
            filter,
            titleUtil.singleKlass,
            titleUtil.singleMegama,
            titleUtil.lesson,
            titleUtil.dates
        );
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.dates, queryUtil.lesson);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.klass, queryUtil.megama);
        const lessonQuery = queryUtil.getQuery(user, filter, queryUtil.allLessons);

        await queryUtil.filterLessons(query, lessonQuery);

        return { query, studentQuery };
    },
    validate: async function (query, user, filter) {
        if ((filter.klass && filter.klass.length) || (filter.megama && filter.megama.length)) {
            return { isValid: true, errorMessage: null };
        }
        return { isValid: false, errorMessage: "חובה לבחור כיתה או מגמה" };
    },
    data: async function (queries, page, filter, user, params) {
        const { model } = moduleMapping[params.type];

        const { query, students } = await queryUtil.getQueryWithStudentIds(queries, page);
        const dataById = await getDataById(model, getAggregateByKlassOrMegama(query));

        return students.map((item) => ({
            name: item.name,
            ...dataById[item.identityNumber],
        }));
    },
    headers: async function (data, query, filter, user, params) {
        const { groupField } = moduleMapping[params.type];
        const extensionHeaders = await getExtensionHeaders(user, data);
        const lessonIds = extensionHeaders.map(item => item.value);
        const lessonInstances = await getLessonInstancesForDiploma(lessonIds, user, {}, groupField, params.type);
        const extensionsWithLength = extensionHeaders.map(({ value, label, ...rest }) => ({
            ...rest,
            value,
            label: label + " " + getSec2Min(lessonInstances[value].map((_, len) => len).reduce((a, b) => a + b, 0))
        }))
        const headers = [{ label: "שם התלמידה", value: "name", format: "nameWOKlass" }, ...extensionsWithLength];
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
};
