const constants = require("../../helpers/constants");
const { getPagingConfig } = require("../../helpers/utils");

module.exports = {
    url: "/sample",
    title: function () {
        return "sample";
    },
    query: async function (body, user) {
        return {};
    },
    validate: async function (query, user) {
        return { isValid: true, errorMessage: null };
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
