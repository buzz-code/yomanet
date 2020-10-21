const constants = require("../../helpers/constants");
const moment = require("moment");
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
        const { fromDate, toDate, name } = body;

        if (fromDate) query.push({ date: { $gte: moment.utc(fromDate).toDate() } });
        if (toDate) query.push({ date: { $lte: moment.utc(toDate).toDate() } });
        if (name) query.push({ name: new RegExp(name) });

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