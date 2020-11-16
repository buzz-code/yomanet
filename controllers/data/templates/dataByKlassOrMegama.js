const { Student } = require("../../../models/Student");
const titleUtil = require("../../../helpers/dataUtils/titleUtil");
const queryUtil = require("../../../helpers/dataUtils/queryUtil");
const { getExtensionHeaders, getDataById } = require("../../../helpers/dataUtils/utils");
const { getAggregateByKlassOrMegama } = require("../../../helpers/dataUtils/aggregateUtil");

module.exports = (model, url, title) => ({
    url,
    title: function (filter) {
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
            // if (filter.klass && filter.klass.length && filter.megama && filter.megama.length) {
            //     return { isValid: false, errorMessage: "ניתן לסנן לפי כיתה או לפי מגמה, אך לא שניהם" };
            // }
            return { isValid: true, errorMessage: null };
        }
        return { isValid: false, errorMessage: "חובה לבחור כיתה או מגמה" };
    },
    data: async function (queries, page) {
        const { query, students } = await queryUtil.getQueryWithStudentIds(queries, page);

        const dataById = await getDataById(model, getAggregateByKlassOrMegama(query));

        return students.map((item) => ({
            name: item.name,
            ...dataById[item.identityNumber],
        }));
    },
    headers: async function (data, query, filter, user) {
        const extensionHeaders = await getExtensionHeaders(user, data);
        const headers = [{ label: "שם התלמידה", value: "name", format: "nameWOKlass" }, ...extensionHeaders];
        return headers;
    },
    count: async function (queries) {
        const { studentQuery } = queries;
        return await Student.countDocuments({ $and: studentQuery });
    },
});