const constants = require("../../helpers/constants");
const moment = require("moment");
const { Lesson } = require("../../models/Lesson");
const { YemotPlayback } = require("../../models/YemotPlayback");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");
const queryUtil = require("../../helpers/queryUtil");

module.exports = {
    url: "/listening",
    title: function () {
        return "נתוני האזנה";
    },
    query: async function (filter, user) {
        const query = queryUtil.getQuery(user, filter, queryUtil.dates, queryUtil.seconds, queryUtil.lesson);
        const studentQuery = queryUtil.getQuery(user, filter, queryUtil.klass, queryUtil.megama, queryUtil.name);

        if (studentQuery.length > 1) {
            const studentIds = await Student.find({ $and: studentQuery }, ["identityNumber"]).lean();
            query.push({ EnterId: { $in: studentIds.map((item) => item.identityNumber) } });
        }

        return { $and: query };
    },
    validate: async function (query, user) {
        return { isValid: true, errorMessage: null };
    },
    data: async function (query, page, filter, user) {
        const results = await YemotPlayback.find(query, null, getPagingConfig(page)).lean();

        const extensions = new Set(results.map((item) => item.extension));
        const lessons = await Lesson.find({ user: user.name, extension: { $in: [...extensions] } }).lean();
        const lessonByExt = {};
        lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
        results.forEach((item) => (item.Folder = lessonByExt[item.Folder] || item.Folder));

        return results;
    },
    headers: async function (data) {
        return constants.yemotPlaybackHeaders;
    },
    count: async function (query) {
        return await YemotPlayback.countDocuments(query);
    },
};
