const constants = require("../../helpers/constants");
const moment = require("moment");
const { YemotConfBridge } = require("../../models/YemotConfBridge");
const { Lesson } = require("../../models/Lesson");
const { Student } = require("../../models/Student");
const { getPagingConfig } = require("../../helpers/utils");
const queryUtil = require("../../helpers/queryUtil");

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
    data: async function (query, page, fiter, user) {
        const results = await YemotConfBridge.find(query, null, getPagingConfig(page)).lean();

        const extensions = new Set(results.map((item) => item.extension));
        const lessons = await Lesson.find({ user: user.name, extension: { $in: [...extensions] } }).lean();
        const lessonByExt = {};
        lessons.forEach((item) => (lessonByExt[item.extension] = item.messageName));
        results.forEach((item) => (item.Folder = lessonByExt[item.Folder] || item.Folder));

        return results;
    },
    headers: async function (data) {
        return constants.yemotConfBridgeHeaders;
    },
    count: async function (query) {
        return YemotConfBridge.countDocuments(query);
    },
};
