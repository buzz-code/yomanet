const constants = require("../../helpers/constants");
const { YemotPlayDir } = require("../../models/YemotPlayDir");
const { getPagingConfig } = require("../../helpers/utils");
const queryUtil = require("../../helpers/dataUtils/queryUtil");
const { setExtensionNames } = require("../../helpers/dataUtils/utils");

module.exports = {
    url: "/record",
    title: function () {
        return "נתוני שיעורים מוקלטים";
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.dates, queryUtil.student);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.klass, queryUtil.megama);
        const lessonQuery = queryUtil.getQuery(user, filter, queryUtil.allLessons);

        await queryUtil.filterStudents(query, studentQuery);
        await queryUtil.filterLessons(query, lessonQuery);

        return { $and: query };
    },
    validate: async function (query, user) {
        return { isValid: true, errorMessage: null };
    },
    data: async function (query, page, filter, user) {
        const results = await YemotPlayDir.find(query, null, getPagingConfig(page)).lean();

        await setExtensionNames(results, user);

        return results;
    },
    headers: async function (data) {
        return constants.yemotPlayDirHeaders;
    },
    count: async function (query) {
        return YemotPlayDir.countDocuments(query);
    },
};
