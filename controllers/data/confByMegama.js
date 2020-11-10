const { YemotConfBridge } = require("../../models/YemotConfBridge");
const { Student } = require("../../models/Student");
const titleUtil = require("../../helpers/dataUtils/titleUtil");
const queryUtil = require("../../helpers/dataUtils/queryUtil");
const { getExtensionHeaders, getDataById } = require("../../helpers/dataUtils/utils");
const { getAggregateByKlassOrMegama } = require("../../helpers/dataUtils/aggregateUtil");

module.exports = {
    url: "/confByMegama",
    title: function (filter) {
        return titleUtil.getTitle("דוח ועידה", filter, titleUtil.singleMegama, titleUtil.lesson, titleUtil.dates);
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.dates, queryUtil.lesson);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.megama);

        return { query, studentQuery };
    },
    validate: async function (query, user, filter) {
        if (filter.megama && filter.megama.length) {
            return { isValid: true, errorMessage: null };
        }
        return { isValid: false, errorMessage: "חובה לבחור מגמה" };
    },
    data: async function (queries, page) {
        const { query, students } = await queryUtil.getQueryWithStudentIds(queries, page);

        const dataById = await getDataById(YemotConfBridge, getAggregateByKlassOrMegama(query));

        return students.map((item) => ({
            name: item.name,
            ...dataById[item.identityNumber],
        }));
    },
    headers: async function (data, query, filter, user) {
        const headers = [{ label: "שם התלמידה", value: "name" }, ...getExtensionHeaders(user, data)];

        return headers;
    },
    count: async function (queries) {
        const { studentQuery } = queries;
        return await Student.countDocuments({ $and: studentQuery });
    },
};
