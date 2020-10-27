const constants = require("../../helpers/constants");
const { File } = require("../../models/File");
const { getPagingConfig } = require("../../helpers/utils");

module.exports = {
    url: "/file",
    title: function () {
        return "קבצים שהועלו";
    },
    query: async function (body, user) {
        const query = [{ user: user.name }];

        return { $and: query };
    },
    validate: async function (query, user) {
        return true;
    },
    data: async function (query, page) {
        const config = {
            ...getPagingConfig(page),
            sort: { createdAt: -1 }
        }
        return File.find(query, null, config).lean();
    },
    headers: async function (data) {
        return constants.fileHeaders;
    },
    count: async function (query) {
        return File.count(query);
    },
};
