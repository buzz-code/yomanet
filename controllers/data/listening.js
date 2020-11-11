const constants = require("../../helpers/constants");
const { YemotPlayback } = require("../../models/YemotPlayback");
const { getPagingConfig } = require("../../helpers/utils");
const queryUtil = require("../../helpers/dataUtils/queryUtil");
const { setExtensionNames } = require("../../helpers/dataUtils/utils");

module.exports = {
    url: "/listening",
    title: function () {
        return "נתוני האזנה";
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.dates, queryUtil.seconds, queryUtil.lesson);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.klass, queryUtil.megama, queryUtil.name);

        await queryUtil.filterStudents(query, studentQuery);

        return { $and: query };
    },
    validate: async function (query, user) {
        return { isValid: true, errorMessage: null };
    },
    data: async function (query, page, filter, user) {
        const results = await YemotPlayback.find(query, null, getPagingConfig(page)).lean();

        await setExtensionNames(results, user);

        return results;
    },
    headers: async function (data) {
        return constants.yemotPlaybackHeaders;
    },
    count: async function (query) {
        return await YemotPlayback.countDocuments(query);
    },
};
