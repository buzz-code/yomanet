const { request } = require("express");
const constants = require("../../helpers/constants");
const { Conf } = require("../../models/Conf");
const { Lesson } = require("../../models/Lesson");
const { getPagingConfig } = require("../../helpers/normalizer");

module.exports = {
    url: "/conf",
    title: function () {
        return "נתוני ועידה";
    },
    query: async function (body, user) {
        const query = [{ user: user.name }];

        return { $and: query };
    },
    validate: async function (query, user) {
        return true;
    },
    data: async function (query, page) {
        const results = await Conf.find(query, null, getPagingConfig(page)).lean();

        const extensions = new Set(results.map((item) => item.extension));
        const lessons = await Lesson.find({ extension: { $in: [...extensions] } }).lean();
        const lessonByExt = {};
        lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
        results.forEach((item) => (item.extension = lessonByExt[item.extension] || item.extension));

        return results;
    },
    headers: async function (data) {
        return constants.confHeaders;
    },
    count: async function (query) {
        return Conf.count(query);
    },
};
