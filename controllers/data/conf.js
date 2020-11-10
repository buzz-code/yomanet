const constants = require("../../helpers/constants");
const { YemotConfBridge } = require("../../models/YemotConfBridge");
const { getPagingConfig } = require("../../helpers/utils");
const queryUtil = require("../../helpers/dataUtils/queryUtil");
const { setExtensionNames } = require("../../helpers/dataUtils/utils");

module.exports = {
    url: "/conf",
    title: function () {
        return "נתוני ועידה";
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.dates);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.name, queryUtil.klass, queryUtil.megama);

        await queryUtil.filterStudents(query, studentQuery);

        return { $and: query };
    },
    validate: async function (query, user) {
        return { isValid: true, errorMessage: null };
    },
    data: async function (query, page, filter, user) {
        const results = await YemotConfBridge.find(query, null, getPagingConfig(page)).lean();

        await setExtensionNames(results);

        return results;
    },
    headers: async function (data) {
        return constants.yemotConfBridgeHeaders;
    },
    count: async function (query) {
        return YemotConfBridge.countDocuments(query);
    },
};
