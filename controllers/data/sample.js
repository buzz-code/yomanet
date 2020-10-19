const constants = require("../../helpers/constants");
const { getPagingConfig } = require("../../helpers/normalizer");

module.exports = {
    url: "/sample",
    title: function () {
        return "sample";
    },
    query: async function (body, user) {
        return {};
    },
    validate: async function (query, user) {
        return true;
    },
    data: async function (query, page) {
        return [];
    },
    headers: async function (data) {
        return [];
    },
    count: async function (query) {
        return 0;
    },
};
