const constants = require("../../helpers/constants");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");
const queryUtil = require("../../helpers/dataUtils/queryUtil");

module.exports = {
    url: "/student",
    title: function () {
        return "נתוני תלמידים";
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.name, queryUtil.identityNumber, queryUtil.klass, queryUtil.megama);

        return { $and: query };
    },
    validate: async function (query, user) {
        return { isValid: true, errorMessage: null };
    },
    data: async function (query, page) {
        return Student.find(query, null, { ...getPagingConfig(page), sort: { name: 1 } }).lean();
    },
    headers: async function (data) {
        return constants.studentHeaders;
    },
    count: async function (query) {
        return Student.countDocuments(query);
    },
};
