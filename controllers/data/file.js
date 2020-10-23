const constants = require("../../helpers/constants");
const { File } = require("../../models/File");
const { getPagingConfig } = require("../../helpers/normalizer");

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
        return File.find(query, null, getPagingConfig(page)).lean();
    },
    headers: async function (data) {
        return constants.fileHeaders;
    },
    count: async function (query) {
        return File.count(query);
    },
};
