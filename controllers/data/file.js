const constants = require("../../helpers/constants");
const { File } = require("../../models/File");
const { getPagingConfig } = require("../../helpers/utils");
const queryUtil = require("../../helpers/dataUtils/queryUtil");

module.exports = {
    url: "/file",
    title: function () {
        return "קבצים שהועלו";
    },
    query: async function (body, user) {
        const query = queryUtil.getQuery(user);

        return { $and: query };
    },
    validate: async function (query, user) {
        return { isValid: true, errorMessage: null };
    },
    data: async function (query, page) {
        const config = {
            ...getPagingConfig(page),
            sort: { createdAt: -1 },
        };
        return File.find(query, null, config).lean();
    },
    headers: async function (data) {
        return constants.fileHeaders;
    },
    count: async function (query) {
        return File.countDocuments(query);
    },
};
