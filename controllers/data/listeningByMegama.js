const { YemotPlayback } = require("../../models/YemotPlayback");
const { Student } = require("../../models/Student");
const aggregateByKlassOrMegama = require("./dataUtils/aggregateByKlassOrMegama");
const titleUtil = require("../../helpers/titleUtil");
const queryUtil = require("../../helpers/queryUtil");
const { getExtensionHeaders, getDataById } = require("./dataUtils/utils");
const { getQueryWithStudentIds } = require("../../helpers/queryUtil");

module.exports = {
    url: "/listeningByMegama",
    title: function (filter) {
        return titleUtil.getTitle("דוח האזנה", filter, titleUtil.singleMegama, titleUtil.lesson, titleUtil.dates);
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
        const { query, students } = await getQueryWithStudentIds(queries, page);

        const dataById = await getDataById(YemotPlayback, aggregateByKlassOrMegama(query));

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
